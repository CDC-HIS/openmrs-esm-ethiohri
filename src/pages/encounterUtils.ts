import { getObsFromEncounter } from "@ohri/openmrs-esm-ohri-commons-lib/src/index";
import {
  EthiopicCalendar,
  toCalendar,
  CalendarDate,
} from "@internationalized/date";

export function getData(
  encounter: any,
  conceptId: string,
  isDate: boolean = false
) {
  if (isDate) {
    return gregToEth(getObsFromEncounter(encounter, conceptId, isDate));
  } else {
    return getObsFromEncounter(encounter, conceptId, isDate);
  }
}

function gregToEth(gregdate) {
  if (!gregdate) return null;
  let dmy = new Date(gregdate.toString())
    .toLocaleDateString("en-US")
    .split("/");
  if (dmy.length == 3) {
    let year = parseInt(dmy[2], 10);
    let month = parseInt(dmy[0], 10);
    let day = parseInt(dmy[1], 10);
    let gregorianDate = new CalendarDate(year, month, day);
    let ethiopianDate = toCalendar(gregorianDate, new EthiopicCalendar());
    let finalDate =
      ethiopianDate.year +
      "-" +
      formatDigit(ethiopianDate.month) +
      "-" +
      formatDigit(ethiopianDate.day);
    return finalDate;
  } else return "--";
}

function formatDigit(number) {
  return parseInt(number, 10).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}
