import { openmrsFetch } from "@openmrs/esm-framework";
import useSWR from "swr";

export function useEncounter(pageSize?: number, pageNumber?: number) {
  const startIndex = (pageNumber - 1) * pageSize;

  const url = `/ws/rest/v1/transfer?totalCount=true&limit=${pageSize}&startIndex=${startIndex}`;

  const {
    data: response,
    error,
    isLoading,
    mutate,
  } = useSWR<{ data: any }, Error>(url, openmrsFetch);

  return {
    encounters: response?.data?.results,
    total: response?.data?.totalCount,
    isLoading,
    isError: error,
    mutate,
  };
}
