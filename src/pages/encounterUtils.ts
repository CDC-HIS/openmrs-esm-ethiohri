import { getObsFromEncounter } from "openmrs-esm-ohri-commons-lib/src/index";

export function getData(
  encounter: any,
  conceptId: string,
  isDate: boolean = false
) {
  if (isDate) {
    return gregToEth(
      new Date(getObsFromEncounter(encounter, conceptId, isDate))
        .toLocaleDateString("en-US")
        .toString()
    );
  } else {
    return getObsFromEncounter(encounter, conceptId, isDate);
  }
}

function gregToEth(gregdate) {
  if (!gregdate) return null;
  var dmy;
  dmy = gregdate.split("-"); // first try the - separator
  if (dmy.length != 3) dmy = gregdate.split("/"); // then try the / separator
  if (dmy.length != 3)
    dmy = new Date(gregdate).toLocaleDateString("en-US").toString().split("/");
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
