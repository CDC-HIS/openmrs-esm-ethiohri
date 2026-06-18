import { formatDate, parseDate } from "@openmrs/esm-framework";

export const formatDateVal = (
  date: string | number | null | undefined,
): string => {
  if (!date) return "-";

  let parsed: Date;

  if (typeof date === "number") {
    // if it's a timestamp
    parsed = new Date(date);
  } else if (typeof date === "string") {
    // if it's a string
    parsed = parseDate(date);
  } else {
    return "-";
  }

  // check if the date is valid
  if (!parsed || isNaN(parsed.getTime())) {
    return "-";
  }

  return formatDate(parsed, { mode: "wide", noToday: true, time: false });
};
