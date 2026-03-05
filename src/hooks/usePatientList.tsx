import React, { useEffect, useState } from "react";
import useSWRImmutable from "swr";
import { ConfigurableLink, openmrsFetch } from "@openmrs/esm-framework";
import dayjs from "dayjs";
import capitalize from "lodash/capitalize";
import { OverflowMenu } from "@carbon/react";
import {
  AddPatientToListOverflowMenuItem,
  FhirPatientResponse,
} from "@ohri/openmrs-esm-ohri-commons-lib";
import {
  FOLLOWUP_ENCOUNTER_TYPE,
  FOLLOWUP_STATUS,
  MRN_UUID,
  UAN_UUID,
} from "../../src/constants";

function getPatientIdentifier(resource: any, identifierUuid: string): string {
  const idObj = resource.identifier?.find((id: any) =>
    id.type?.coding?.some((coding: any) => coding.code === identifierUuid)
  );
  return idObj?.value || "";
}

export function usePatientList(
  offSet: number,
  pageSize: number,
  searchTerm?: string
) {
  const url = `/ws/fhir2/R4/Patient?_getpagesoffset=${offSet}&_count=${pageSize}${
    searchTerm ? `&name=${searchTerm}` : ""
  }&_summary=data&_sort=given`;

  const [paginatedPatientRows, setPaginatedPatientRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const { data, error, isLoading } = useSWRImmutable<
    { data: FhirPatientResponse },
    Error
  >(url, openmrsFetch);

  // Fetch the last follow-up status
  async function fetchFollowupData(patientUuid: string): Promise<{
    followupStatus: string;
  }> {
    try {
      const encounterRes = await openmrsFetch(
        `/ws/rest/v1/encounter?patient=${patientUuid}&encounterType=${FOLLOWUP_ENCOUNTER_TYPE}&v=custom:(obs:(value,concept:(uuid)))&limit=1&order=desc`
      );

      const obs = encounterRes?.data?.results?.[0]?.obs || [];

      const statusObs = obs.find((o) => o.concept?.uuid === FOLLOWUP_STATUS);

      const rawStatus = statusObs?.value?.display || "";
      const formattedStatus = (() => {
        switch (rawStatus) {
          case "Loss to follow-up (LTFU)":
            return "Lost";
          case "Ran away":
            return "Drop";
          case "Restart medication":
            return "Restart";
          case "Stop all":
            return "Stop";
          case "Transferred out":
            return "TO";
          default:
            return rawStatus;
        }
      })();

      return {
        followupStatus: formattedStatus,
      };
    } catch (e) {
      console.error(
        `Failed to load follow-up encounter data for patient ${patientUuid}`,
        e
      );
      return {
        followupStatus: "",
      };
    }
  }

  useEffect(() => {
    async function loadPatientRows() {
      if (data) {
        const patientRows = await Promise.all(
          data?.data?.entry?.map(async (patient) => {
            const patientResource = patient?.resource;
            const patientName =
              patientResource?.name?.[0].given.join(" ") +
              " " +
              patientResource?.name?.[0].family;

            const getPatientLink = () => (
              <ConfigurableLink
                to={`/openmrs/spa/patient/${patientResource?.id}/chart`}
                style={{ textDecoration: "inherit" }}
              >
                {patientName}
              </ConfigurableLink>
            );

            const patientActions = (
              <OverflowMenu flipped>
                <AddPatientToListOverflowMenuItem
                  patientUuid={patientResource?.id}
                  excludeCohorts={["Post-Test Counselling"]}
                />
              </OverflowMenu>
            );
            const { followupStatus } = await fetchFollowupData(
              patientResource?.id
            );
            const mrn = getPatientIdentifier(patientResource, MRN_UUID);
            const uan = getPatientIdentifier(patientResource, UAN_UUID);

            return {
              id: patientResource?.id,
              name: patientName,
              patientLink: getPatientLink(),
              gender: capitalize(patientResource?.gender),
              birthDate: patientResource?.birthDate,
              age: dayjs().diff(dayjs(patientResource?.birthDate), "year"),
              mrn,
              uan,
              lastFollowupStatus: followupStatus,
              actions: patientActions,
            };
          })
        );
        setTotalCount(data?.data.total);
        setPaginatedPatientRows(patientRows);
      }
    }

    loadPatientRows();
  }, [data]);

  return {
    patients: paginatedPatientRows,
    error,
    isLoading: isLoading || !data,
    total: totalCount,
  };
}
