!(function ($) {
  function EthiopianCalendar(a) {
    this.local = this.regionalOptions[a || ""] || this.regionalOptions[""];
  }
  (EthiopianCalendar.prototype = new $.calendars.baseCalendar()),
    $.extend(EthiopianCalendar.prototype, {
      name: "Ethiopian",
      jdEpoch: 1724220.5,
      daysPerMonth: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 5],
      hasYearZero: !1,
      minMonth: 1,
      firstMonth: 1,
      minDay: 1,
      regionalOptions: {
        "": {
          name: "Ethiopian",
          epochs: ["BEE", "EE"],
          monthNames: [
            "Meskerem",
            "Tikemet",
            "Hidar",
            "Tahesas",
            "Tir",
            "Yekatit",
            "Megabit",
            "Miazia",
            "Genbot",
            "Sene",
            "Hamle",
            "Nehase",
            "Pagume",
          ],
          monthNamesShort: [
            "Mes",
            "Tik",
            "Hid",
            "Tah",
            "Tir",
            "Yek",
            "Meg",
            "Mia",
            "Gen",
            "Sen",
            "Ham",
            "Neh",
            "Pag",
          ],
          dayNames: [
            "Ehud",
            "Segno",
            "Maksegno",
            "Irob",
            "Hamus",
            "Arb",
            "Kidame",
          ],
          dayNamesShort: ["Ehu", "Seg", "Mak", "Iro", "Ham", "Arb", "Kid"],
          dayNamesMin: ["Eh", "Se", "Ma", "Ir", "Ha", "Ar", "Ki"],
          dateFormat: "dd/mm/yyyy",
          firstDay: 0,
          isRTL: !1,
        },
      },
      leapYear: function (a) {
        var b = this._validate(
            a,
            this.minMonth,
            this.minDay,
            $.calendars.local.invalidYear
          ),
          a = b.year() + (b.year() < 0 ? 1 : 0);
        return a % 4 === 3 || a % 4 === -1;
      },
      monthsInYear: function (a) {
        return (
          this._validate(
            a,
            this.minMonth,
            this.minDay,
            $.calendars.local.invalidYear ||
              $.calendars.regionalOptions[""].invalidYear
          ),
          13
        );
      },
      weekOfYear: function (a, b, c) {
        var d = this.newDate(a, b, c);
        return (
          d.add(-d.dayOfWeek(), "d"), Math.floor((d.dayOfYear() - 1) / 7) + 1
        );
      },
      daysInMonth: function (a, b) {
        var c = this._validate(
          a,
          b,
          this.minDay,
          $.calendars.local.invalidMonth
        );
        return (
          this.daysPerMonth[c.month() - 1] +
          (13 === c.month() && this.leapYear(c.year()) ? 1 : 0)
        );
      },
      weekDay: function (a, b, c) {
        return (this.dayOfWeek(a, b, c) || 7) < 6;
      },
      toJD: function (a, b, c) {
        var d = this._validate(a, b, c, $.calendars.local.invalidDate);
        return (
          (a = d.year()),
          a < 0 && a++,
          d.day() +
            30 * (d.month() - 1) +
            365 * (a - 1) +
            Math.floor(a / 4) +
            this.jdEpoch -
            1
        );
      },
      fromJD: function (a) {
        var c = Math.floor(a) + 0.5 - this.jdEpoch,
          b = Math.floor((c - Math.floor((c + 366) / 1461)) / 365) + 1;
        b <= 0 && b--, (c = Math.floor(a) + 0.5 - this.newDate(b, 1, 1).toJD());
        var d = Math.floor(c / 30) + 1,
          e = c - 30 * (d - 1) + 1;
        return this.newDate(b, d, e);
      },
    }),
    ($.calendars.calendars.ethiopian = EthiopianCalendar);
})(jQuery);
