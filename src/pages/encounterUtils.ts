import { getObsFromEncounter } from "openmrs-esm-ohri-commons-lib/src/index";

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
  var dmy;
  dmy = new Date(gregdate.toString()).toLocaleDateString("en-US").split("/");
  if (dmy.length == 3) {
    // @ts-ignore
    var appdate = ($ as any).calendars
      .instance("gregorian")
      .newDate(
        parseInt(dmy[2], 10),
        parseInt(dmy[0], 10),
        parseInt(dmy[1], 10)
      );
    // @ts-ignore
    var jd = ($ as any).calendars.instance("gregorian").toJD(appdate);
    // @ts-ignore
    var appdateet = ($ as any).calendars.instance("ethiopian").fromJD(jd);
    // @ts-ignore
    var appdateetstr = ($ as any).calendars
      .instance("ethiopian")
      .formatDate("dd/mm/yyyy", appdateet);
    return appdateetstr;
  } else return null;
}
