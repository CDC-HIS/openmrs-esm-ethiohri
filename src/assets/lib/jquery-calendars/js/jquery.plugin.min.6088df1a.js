!(function () {
  var j = !1;
  (window.JQClass = function () {}),
    (JQClass.classes = {}),
    (JQClass.extend = function extender(f) {
      function JQClass() {
        !j && this._init && this._init.apply(this, arguments);
      }
      var g = this.prototype;
      j = !0;
      var h = new this();
      j = !1;
      for (var i in f)
        h[i] =
          "function" == typeof f[i] && "function" == typeof g[i]
            ? (function (d, e) {
                return function () {
                  var b = this._super;
                  this._super = function (a) {
                    return g[d].apply(this, a || []);
                  };
                  var c = e.apply(this, arguments);
                  return (this._super = b), c;
                };
              })(i, f[i])
            : f[i];
      return (
        (JQClass.prototype = h),
        (JQClass.prototype.constructor = JQClass),
        (JQClass.extend = extender),
        JQClass
      );
    });
})(),
  (function ($) {
    function camelCase(c) {
      return c.replace(/-([a-z])/g, function (a, b) {
        return b.toUpperCase();
      });
    }
    (JQClass.classes.JQPlugin = JQClass.extend({
      name: "plugin",
      defaultOptions: {},
      regionalOptions: {},
      _getters: [],
      _getMarker: function () {
        return "is-" + this.name;
      },
      _init: function () {
        $.extend(
          this.defaultOptions,
          (this.regionalOptions && this.regionalOptions[""]) || {}
        );
        var c = camelCase(this.name);
        ($[c] = this),
          ($.fn[c] = function (a) {
            var b = Array.prototype.slice.call(arguments, 1);
            return $[c]._isNotChained(a, b)
              ? $[c][a].apply($[c], [this[0]].concat(b))
              : this.each(function () {
                  if ("string" == typeof a) {
                    if ("_" === a[0] || !$[c][a]) throw "Unknown method: " + a;
                    $[c][a].apply($[c], [this].concat(b));
                  } else $[c]._attach(this, a);
                });
          });
      },
      setDefaults: function (a) {
        $.extend(this.defaultOptions, a || {});
      },
      _isNotChained: function (a, b) {
        return (
          ("option" === a &&
            (0 === b.length || (1 === b.length && "string" == typeof b[0]))) ||
          $.inArray(a, this._getters) > -1
        );
      },
      _attach: function (a, b) {
        if (((a = $(a)), !a.hasClass(this._getMarker()))) {
          a.addClass(this._getMarker()),
            (b = $.extend(
              {},
              this.defaultOptions,
              this._getMetadata(a),
              b || {}
            ));
          var c = $.extend(
            { name: this.name, elem: a, options: b },
            this._instSettings(a, b)
          );
          a.data(this.name, c), this._postAttach(a, c), this.option(a, b);
        }
      },
      _instSettings: function (a, b) {
        return {};
      },
      _postAttach: function (a, b) {},
      _getMetadata: function (d) {
        try {
          var f = d.data(this.name.toLowerCase()) || "";
          (f = f.replace(/'/g, '"')),
            (f = f.replace(/([a-zA-Z0-9]+):/g, function (a, b, i) {
              var c = f.substring(0, i).match(/"/g);
              return c && c.length % 2 !== 0 ? b + ":" : '"' + b + '":';
            })),
            (f = $.parseJSON("{" + f + "}"));
          for (var g in f) {
            var h = f[g];
            "string" == typeof h &&
              h.match(/^new Date\((.*)\)$/) &&
              (f[g] = eval(h));
          }
          return f;
        } catch (e) {
          return {};
        }
      },
      _getInst: function (a) {
        return $(a).data(this.name) || {};
      },
      option: function (a, b, c) {
        a = $(a);
        var d = a.data(this.name);
        if (!b || ("string" == typeof b && null == c)) {
          var e = (d || {}).options;
          return e && b ? e[b] : e;
        }
        if (a.hasClass(this._getMarker())) {
          var e = b || {};
          "string" == typeof b && ((e = {}), (e[b] = c)),
            this._optionsChanged(a, d, e),
            $.extend(d.options, e);
        }
      },
      _optionsChanged: function (a, b, c) {},
      destroy: function (a) {
        (a = $(a)),
          a.hasClass(this._getMarker()) &&
            (this._preDestroy(a, this._getInst(a)),
            a.removeData(this.name).removeClass(this._getMarker()));
      },
      _preDestroy: function (a, b) {},
    })),
      ($.JQPlugin = {
        createPlugin: function (a, b) {
          "object" == typeof a && ((b = a), (a = "JQPlugin")),
            (a = camelCase(a));
          var c = camelCase(b.name);
          (JQClass.classes[c] = JQClass.classes[a].extend(b)),
            new JQClass.classes[c]();
        },
      });
  })(jQuery);
