"use client";

import React, { forwardRef } from "react";
import type { LabData, PatientRecord } from "../../utils/types";
import { formatDateVal } from "../../utils/getData";

interface Props {
  data: PatientRecord;
}

const ArtTransferForm = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        background: "white",
        color: "black",
        padding: "40px",
        width: "210mm",
        minHeight: "297mm",
        margin: "0 auto",
        fontSize: "14px",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
          {" "}
          HIV CARE / ART TRANSFER AND REFERRAL FORM
        </h2>
        <img
          src={window?.spaBase + "/ethiohri_logo_dark.svg"}
          alt="Logo"
          height={50}
        />
      </header>
      <hr />
      <div style={gridStyle(2)}>
        <Section title="Patient Information">
          <Field label="Full Name" value={data?.fullName} />
          <Field label="Age" value={data?.age} />
          <Field label="Sex" value={data?.sex === "f" ? "Female" : "Male"} />
          <Field label="Region" value={data?.region} />
          <Field label="Zone" value={data?.zone} />
          <Field label="Woreda/Subcity" value={data?.woreda} />
          <Field label="Kebele" value={data?.kebele} />
          <Field label="Mobile" value={data?.mobile} />
        </Section>
        <Section title="Referral Information">
          <Field label="Referral No" value={data?.referralNo} />
          <Field label="Card No" value={data?.cardNo} />
          <Field label="Unique ART No" value={data?.uniqueArtNo} />
          <Field label="Date (E.C)" value={formatDateVal(data?.referralDate)} />
          <Field label="Transferring Facility" value={data?.fromFacility} />
          <Field label="Referred To" value={data?.toFacility} />
        </Section>
      </div>

      {/* HIV & ART */}
      <div style={gridStyle(2)}>
        <Section title="HIV & ART Information">
          <Field
            label="Date Confirmed HIV+"
            value={formatDateVal(data?.hivConfirmedDate)}
          />
          <Field label="Why Eligible for ART" value={data?.artEligibility} />
          <Field
            label="Date ART Started"
            value={formatDateVal(data?.artStartDate)}
          />
          <Field
            label="Original 1st Line Regimen"
            value={data?.originalRegimen}
          />
          <Field label="Current Regimen" value={data?.currentRegimen} />
          <Field label="Reason for Changing ART" value={data?.reasonChange} />
          {/* <Field label="Side Effects" value={data?.sideEffects} />
        <Field label="Rx Failure" value={data?.rxFailure} /> */}
        </Section>
        <Section title="PMTCT Information">
          <Field label="Mother PMTCT Care" value={data?.motherPmctCare} />
          <Field
            label="Mother PMTCT Booking Date"
            value={formatDateVal(data?.motherPmctBookingDate)}
          />
          <Field label="Child PMTCT Care" value={data?.childPmctCare} />
          <Field
            label="Child PMTCT Enrollment Date"
            value={formatDateVal(data?.childPmctEnrollmentDate)}
          />
          <Field label="ARV used for PMTCT" value={data?.arvUsedForPmct} />
        </Section>
      </div>
      <div style={gridStyle(2)}>
        <Section title="Medication Cotrimoxazole & INH">
          <Field label="Cotrimoxazole" value={data?.cotrim} />
          <Field
            label="Cotrimoxazole Start Date"
            value={formatDateVal(data?.cotrimStartDate)}
          />
          <Field
            label="Cotrimoxazole Stop Date"
            value={formatDateVal(data?.cotrimStopDate)}
          />
          <Field label="INH" value={data?.inh} />
          <Field
            label="INH Start Date"
            value={formatDateVal(data?.inhStartDate)}
          />
          <Field
            label="INH Completed Date"
            value={formatDateVal(data?.inhCompletedDate)}
          />
          <Field
            label="INH Discontinued Date"
            value={formatDateVal(data?.inhDiscontinuedDate)}
          />
        </Section>
        <Section title="Medication TB & Fluconazole">
          <Field label="TB Rx" value={data?.tbRx} />
          <Field
            label="TB Rx Start Date"
            value={formatDateVal(data?.tbRxStartDate)}
          />
          <Field
            label="TB Rx Completed Date"
            value={formatDateVal(data?.tbRxCompletedDate)}
          />
          <Field
            label="TB Rx Discontinued Date"
            value={formatDateVal(data?.tbRxDiscontinuedDate)}
          />
          <Field label="Fluconazole" value={data?.flucon} />
          <Field
            label="Fluconazole Start Date"
            value={formatDateVal(data?.fluconStartDate)}
          />
          <Field
            label="Fluconazole Stop Date"
            value={formatDateVal(data?.fluconStopDate)}
          />
        </Section>
      </div>

      {/* ---------------- ART Adherence ---------------- */}
      <Section title="ART Adherence">
        <Field label="ART Adherence" value={data?.artAdherence} />
      </Section>

      {/* LAB TABLE */}
      <Section title="Lab Summary">
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "12px",
          }}
        >
          <thead>
            <tr>
              {[
                "",
                "LFT",
                "RFT",
                "Creatine",
                "TLC",
                "CD4",
                "Viral Load",
                "Weight",
                "Height",
                "BMI",
                "WHO Stage",
                "Functional Status",
              ].map((h, i) => (
                <th key={i} style={tableCellStyle(true)}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <LabRow title="Baseline" data={data?.baseline} />
            <LabRow title="Current" data={data?.current} />
          </tbody>
        </table>
      </Section>

      {/* TRANSFER */}
      <Section title="Reason for Transfer">
        <p>{data?.transferReason ?? "-"}</p>
      </Section>

      {/* CLINICIAN */}
      <Section title="Transferring Clinician">
        <div style={gridStyle(3)}>
          <Field label="Name" value={data?.clinicianName} />
          <Field label="Telephone" value={data?.clinicianPhone} />
          <Field label="Email" value={data?.clinicianEmail} />
          <div>
            <span style={{ fontWeight: 600 }}>Signature</span>
            <div
              style={{
                borderBottom: "1px solid black",
                height: "24px",
              }}
            />
          </div>
        </div>
      </Section>
      <hr />
      <div style={gridStyle(2)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Use the Intake and follow up forms to fill this form </span>
          <span>Use E.C in dd/mm/yy format for all dates </span>
          <span>For current regimen please record month of change </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Age record </span>
          <span>Months for children &lt;5 yrs </span>
          <span>Completed years for =`&gt;`5 yrs </span>
        </div>
        {/* <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>Tr ART Vrn 98 </span>
          <span>ORIGINAL </span>
        </div> */}
      </div>
    </div>
  );
});

export default ArtTransferForm;

/* ---------------- Helper Styles ---------------- */

const gridStyle = (cols: number) => ({
  display: "grid",
  gridTemplateColumns: `repeat(${cols}, 1fr)`,
  gap: "12px",
  // marginBottom: '6px',
});

const tableCellStyle = (bold = false) => ({
  border: "1px solid black",
  padding: "4px",
  fontWeight: bold ? "bold" : "normal",
  textAlign: "left" as const,
});

/* ---------------- Components ---------------- */

const Section = ({ title, children }: any) => (
  <div style={{ marginTop: "5px" }}>
    <h2
      style={{
        fontWeight: "bold",
        // marginBottom: '8px',
      }}
    >
      {title}
    </h2>
    {children}
  </div>
);

const Field = ({ label, value, width = "150px" }: any) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginBottom: "4px",
    }}
  >
    <label
      style={{ fontWeight: 600, marginRight: "8px", whiteSpace: "nowrap" }}
    >
      {label}:
    </label>
    <div
      style={{
        borderBottom: "1px solid black",
        minHeight: "20px",
        width, // fixed width for underline
        display: "inline-block",
      }}
    >
      {value || "\u00A0"} {/* non-breaking space to keep the line visible */}
    </div>
  </div>
);

interface LabRowProps {
  title: string;
  data?: LabData;
}
const LabRow = ({ title, data }: LabRowProps) => (
  <tr>
    <td style={tableCellStyle(true)}>{title}</td>
    <td style={tableCellStyle()}>{data?.LFT_AST}</td>
    <td style={tableCellStyle()}>{data?.LFT_ALT}</td>
    <td style={tableCellStyle()}>{data?.Creatine}</td>
    <td style={tableCellStyle()}>{data?.TLC}</td>
    <td style={tableCellStyle()}>{data?.CD4}</td>
    <td style={tableCellStyle()}>{data?.Viral_Load}</td>
    <td style={tableCellStyle()}>{data?.Weight}</td>
    <td style={tableCellStyle()}>{data?.Height}</td>
    <td style={tableCellStyle()}>{data?.BMI}</td>
    <td style={tableCellStyle()}>{data?.WHO_Stage}</td>
    <td style={tableCellStyle()}>{data?.Func_Status}</td>
  </tr>
);
