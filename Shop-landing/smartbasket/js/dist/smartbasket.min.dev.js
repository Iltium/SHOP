"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

document.addEventListener("DOMContentLoaded", function () {
  var t,
    a,
    e,
    s = s || {};
  s.scope = {}, s.findInternal = function (t, a, e) {
    t instanceof String && (t = String(t));

    for (var s = t.length, r = 0; r < s; r++) {
      var n = t[r];
      if (a.call(e, n, r, t)) return {
        i: r,
        v: n
      };
    }

    return {
      i: -1,
      v: void 0
    };
  }, s.ASSUME_ES5 = !1, s.ASSUME_NO_NATIVE_MAP = !1, s.ASSUME_NO_NATIVE_SET = !1, s.SIMPLE_FROUND_POLYFILL = !1, s.defineProperty = s.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (t, a, e) {
    t != Array.prototype && t != Object.prototype && (t[a] = e.value);
  }, s.getGlobal = function (t) {
    return "undefined" != typeof window && window === t ? t : "undefined" != typeof global && null != global ? global : t;
  }, s.global = s.getGlobal(this), s.polyfill = function (t, a, e, r) {
    if (a) {
      for (e = s.global, t = t.split("."), r = 0; r < t.length - 1; r++) {
        var n = t[r];
        n in e || (e[n] = {}), e = e[n];
      }

      (a = a(r = e[t = t[t.length - 1]])) != r && null != a && s.defineProperty(e, t, {
        configurable: !0,
        writable: !0,
        value: a
      });
    }
  }, s.polyfill("Array.prototype.find", function (t) {
    return t || function (t, a) {
      return s.findInternal(this, t, a).v;
    };
  }, "es6", "es3"), t = function t(_t) {
    var a = function a(_a, e, s) {
      var r = {
        invalid: [],
        getCaret: function getCaret() {
          try {
            var t = 0,
              e = _a.get(0),
              s = document.selection,
              n = e.selectionStart;

            if (s && -1 === navigator.appVersion.indexOf("MSIE 10")) {
              var i = s.createRange();
              i.moveStart("character", -r.val().length), t = i.text.length;
            } else (n || "0" === n) && (t = n);

            return t;
          } catch (t) { }
        },
        setCaret: function setCaret(t) {
          try {
            if (_a.is(":focus")) {
              var e = _a.get(0);

              if (e.setSelectionRange) e.setSelectionRange(t, t); else {
                var s = e.createTextRange();
                s.collapse(!0), s.moveEnd("character", t), s.moveStart("character", t), s.select();
              }
            }
          } catch (t) { }
        },
        events: function events() {
          _a.on("keydown.mask", function (t) {
            _a.data("mask-keycode", t.keyCode || t.which), _a.data("mask-previus-value", _a.val()), _a.data("mask-previus-caret-pos", r.getCaret()), r.maskDigitPosMapOld = r.maskDigitPosMap;
          }).on(_t.jMaskGlobals.useInput ? "input.mask" : "keyup.mask", r.behaviour).on("paste.mask drop.mask", function () {
            setTimeout(function () {
              _a.keydown().keyup();
            }, 100);
          }).on("change.mask", function () {
            _a.data("changed", !0);
          }).on("blur.mask", function () {
            o === r.val() || _a.data("changed") || _a.trigger("change"), _a.data("changed", !1);
          }).on("blur.mask", function () {
            o = r.val();
          }).on("focus.mask", function (a) {
            !0 === s.selectOnFocus && _t(a.target).select();
          }).on("focusout.mask", function () {
            s.clearIfNotMatch && !n.test(r.val()) && r.val("");
          });
        },
        getRegexMask: function getRegexMask() {
          for (var t, a, s, r, n = [], o = 0; o < e.length; o++) {
            (t = i.translation[e.charAt(o)]) ? (a = t.pattern.toString().replace(/.{1}$|^.{1}/g, ""), s = t.optional, (t = t.recursive) ? (n.push(e.charAt(o)), r = {
              digit: e.charAt(o),
              pattern: a
            }) : n.push(s || t ? a + "?" : a)) : n.push(e.charAt(o).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
          }

          return n = n.join(""), r && (n = n.replace(new RegExp("(" + r.digit + "(.*" + r.digit + ")?)"), "($1)?").replace(new RegExp(r.digit, "g"), r.pattern)), new RegExp(n);
        },
        destroyEvents: function destroyEvents() {
          _a.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "));
        },
        val: function val(t) {
          var e = _a.is("input") ? "val" : "text";
          return 0 < arguments.length ? (_a[e]() !== t && _a[e](t), e = _a) : e = _a[e](), e;
        },
        calculateCaretPosition: function calculateCaretPosition(t) {
          var e = r.getMasked(),
            s = r.getCaret();

          if (t !== e) {
            var n = _a.data("mask-previus-caret-pos") || 0;
            e = e.length;
            var i,
              o = t.length,
              l = t = 0,
              c = 0,
              p = 0;

            for (i = s; i < e && r.maskDigitPosMap[i]; i++) {
              l++;
            }

            for (i = s - 1; 0 <= i && r.maskDigitPosMap[i]; i--) {
              t++;
            }

            for (i = s - 1; 0 <= i; i--) {
              r.maskDigitPosMap[i] && c++;
            }

            for (i = n - 1; 0 <= i; i--) {
              r.maskDigitPosMapOld[i] && p++;
            }

            s > o ? s = 10 * e : n >= s && n !== o ? r.maskDigitPosMapOld[s] || (n = s, s = s - (p - c) - t, r.maskDigitPosMap[s] && (s = n)) : s > n && (s = s + (c - p) + l);
          }

          return s;
        },
        behaviour: function behaviour(e) {
          e = e || window.event, r.invalid = [];

          var s = _a.data("mask-keycode");

          if (-1 === _t.inArray(s, i.byPassKeys)) {
            s = r.getMasked();
            var n = r.getCaret(),
              o = _a.data("mask-previus-value") || "";
            return setTimeout(function () {
              r.setCaret(r.calculateCaretPosition(o));
            }, _t.jMaskGlobals.keyStrokeCompensation), r.val(s), r.setCaret(n), r.callbacks(e);
          }
        },
        getMasked: function getMasked(t, a) {
          var n,
            o = [],
            l = void 0 === a ? r.val() : a + "",
            c = 0,
            p = e.length,
            d = 0,
            u = l.length,
            m = 1,
            k = "push",
            b = -1,
            f = 0;

          if (a = [], s.reverse) {
            k = "unshift", m = -1;
            var v = 0;
            c = p - 1, d = u - 1;

            var _ = function _() {
              return -1 < c && -1 < d;
            };
          } else v = p - 1, _ = function _() {
            return c < p && d < u;
          };

          for (; _();) {
            var h = e.charAt(c),
              g = l.charAt(d),
              y = i.translation[h];
            y ? (g.match(y.pattern) ? (o[k](g), y.recursive && (-1 === b ? b = c : c === v && c !== b && (c = b - m), v === b && (c -= m)), c += m) : g === n ? (f--, n = void 0) : y.optional ? (c += m, d -= m) : y.fallback ? (o[k](y.fallback), c += m, d -= m) : r.invalid.push({
              p: d,
              v: g,
              e: y.pattern
            }), d += m) : (t || o[k](h), g === h ? (a.push(d), d += m) : (n = h, a.push(d + f), f++), c += m);
          }

          return t = e.charAt(v), p !== u + 1 || i.translation[t] || o.push(t), o = o.join(""), r.mapMaskdigitPositions(o, a, u), o;
        },
        mapMaskdigitPositions: function mapMaskdigitPositions(t, a, e) {
          for (t = s.reverse ? t.length - e : 0, r.maskDigitPosMap = {}, e = 0; e < a.length; e++) {
            r.maskDigitPosMap[a[e] + t] = 1;
          }
        },
        callbacks: function callbacks(t) {
          var n = r.val(),
            i = n !== o,
            l = [n, t, _a, s],
            c = function c(t, a, e) {
              "function" == typeof s[t] && a && s[t].apply(this, e);
            };

          c("onChange", !0 === i, l), c("onKeyPress", !0 === i, l), c("onComplete", n.length === e.length, l), c("onInvalid", 0 < r.invalid.length, [n, t, _a, r.invalid, s]);
        }
      };
      _a = _t(_a);
      var n,
        i = this,
        o = r.val();
      e = "function" == typeof e ? e(r.val(), void 0, _a, s) : e, i.mask = e, i.options = s, i.remove = function () {
        var t = r.getCaret();
        return i.options.placeholder && _a.removeAttr("placeholder"), _a.data("mask-maxlength") && _a.removeAttr("maxlength"), r.destroyEvents(), r.val(i.getCleanVal()), r.setCaret(t), _a;
      }, i.getCleanVal = function () {
        return r.getMasked(!0);
      }, i.getMaskedVal = function (t) {
        return r.getMasked(!1, t);
      }, i.init = function (o) {
        if (o = o || !1, s = s || {}, i.clearIfNotMatch = _t.jMaskGlobals.clearIfNotMatch, i.byPassKeys = _t.jMaskGlobals.byPassKeys, i.translation = _t.extend({}, _t.jMaskGlobals.translation, s.translation), i = _t.extend(!0, {}, i, s), n = r.getRegexMask(), o) r.events(), r.val(r.getMasked()); else {
          s.placeholder && _a.attr("placeholder", s.placeholder), _a.data("mask") && _a.attr("autocomplete", "off"), o = 0;

          for (var l = !0; o < e.length; o++) {
            var c = i.translation[e.charAt(o)];

            if (c && c.recursive) {
              l = !1;
              break;
            }
          }

          l && _a.attr("maxlength", e.length).data("mask-maxlength", !0), r.destroyEvents(), r.events(), o = r.getCaret(), r.val(r.getMasked()), r.setCaret(o);
        }
      }, i.init(!_a.is("input"));
    };

    _t.maskWatchers = {};

    var e = function e() {
      var e = _t(this),
        r = {},
        n = e.attr("data-mask");

      if (e.attr("data-mask-reverse") && (r.reverse = !0), e.attr("data-mask-clearifnotmatch") && (r.clearIfNotMatch = !0), "true" === e.attr("data-mask-selectonfocus") && (r.selectOnFocus = !0), s(e, n, r)) return e.data("mask", new a(this, n, r));
    },
      s = function s(a, e, _s) {
        _s = _s || {};

        var r = _t(a).data("mask"),
          n = JSON.stringify;

        a = _t(a).val() || _t(a).text();

        try {
          return "function" == typeof e && (e = e(a)), "object" != _typeof(r) || n(r.options) !== n(_s) || r.mask !== e;
        } catch (t) { }
      },
      r = function r(t) {
        var a = document.createElement("div"),
          e = (t = "on" + t) in a;
        return e || (a.setAttribute(t, "return;"), e = "function" == typeof a[t]), e;
      };

    _t.fn.mask = function (e, r) {
      r = r || {};
      var n = this.selector,
        i = _t.jMaskGlobals,
        o = i.watchInterval;
      i = r.watchInputs || i.watchInputs;

      var l = function l() {
        if (s(this, e, r)) return _t(this).data("mask", new a(this, e, r));
      };

      return _t(this).each(l), n && "" !== n && i && (clearInterval(_t.maskWatchers[n]), _t.maskWatchers[n] = setInterval(function () {
        _t(document).find(n).each(l);
      }, o)), this;
    }, _t.fn.masked = function (t) {
      return this.data("mask").getMaskedVal(t);
    }, _t.fn.unmask = function () {
      return clearInterval(_t.maskWatchers[this.selector]), delete _t.maskWatchers[this.selector], this.each(function () {
        var a = _t(this).data("mask");

        a && a.remove().removeData("mask");
      });
    }, _t.fn.cleanVal = function () {
      return this.data("mask").getCleanVal();
    }, _t.applyDataMask = function (a) {
      ((a = a || _t.jMaskGlobals.maskElements) instanceof _t ? a : _t(a)).filter(_t.jMaskGlobals.dataMaskAttr).each(e);
    }, r = {
      maskElements: "input,td,span,div",
      dataMaskAttr: "*[data-mask]",
      dataMask: !0,
      watchInterval: 300,
      watchInputs: !0,
      keyStrokeCompensation: 10,
      useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && r("input"),
      watchDataMask: !1,
      byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
      translation: {
        0: {
          pattern: /\d/
        },
        9: {
          pattern: /\d/,
          optional: !0
        },
        "#": {
          pattern: /\d/,
          recursive: !0
        },
        A: {
          pattern: /[a-zA-Z0-9]/
        },
        S: {
          pattern: /[a-zA-Z]/
        }
      }
    }, _t.jMaskGlobals = _t.jMaskGlobals || {}, (r = _t.jMaskGlobals = _t.extend(!0, {}, r, _t.jMaskGlobals)).dataMask && _t.applyDataMask(), setInterval(function () {
      _t.jMaskGlobals.watchDataMask && _t.applyDataMask();
    }, r.watchInterval);
  }, a = window.jQuery, e = window.Zepto, "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" == typeof Meteor ? module.exports = t(require("jquery")) : t(a || e);
}), document.addEventListener("DOMContentLoaded", function () {
  var t, a, e;
  t = jQuery, a = {
    productElement: "product__element",
    buttonAddToBasket: "product__add-to-cart-button",
    countryCode: "+38",
    smartBasketCurrency: "₴",
    productQuantityWrapper: !1,
    productPrice: !1,
    productSize: !1,
    smartBasketMinArea: "header__basket-min",
    smartBasketMinIconPath: "/smartbasket/img/shopping-basket-wight.svg",
    smartBasketMinText: !1,
    telIsRequired: !0,
    emailIsRequired: !1,
    nameIsRequired: !0,
    localStorageName: "basketItems",
    yaCounter: {
      counterID: "",
      targetID: ""
    }
  }, e = {
    getProducts: function getProducts() {
      return JSON.parse(localStorage.getItem(a.localStorageName));
    },
    setProducts: function setProducts(t) {
      var e = JSON.stringify(t, "", 4);
      return localStorage.setItem(a.localStorageName, e), !1;
    },
    deleteProducts: function deleteProducts(a, s) {
      var r = t("<button>").attr({
        "class": "smart-basket__product-delete"
      }).html('<span class="smart-basket__delete-icon">×</span>');
      return r.click(function (r) {
        r.preventDefault();
        var n = t(this).data("sbProductDelete");
        delete a[n], e.setProducts(a), t(this).parents("." + s.attr("class")).remove(), e.getSmartBasketMinState(a, "updateSmartBasketMin"), e.commonResult(a, "updateCommonResult");
      }), r;
    },
    showProducts: function showProducts(s) {
      var r = t("<form>").attr({
        "class": "smart-basket__form",
        method: "POST",
        id: "smart-basket__form",
        enctype: "multipart/form-data"
      }),
        n = t("<div>").attr({
          "class": "smart-basket__product-item"
        }),
        i = t("<div>").attr({
          "class": "smart-basket__product-id"
        }).text("ID"),
        o = t("<div>").attr({
          "class": "smart-basket__product-name"
        }).text("Товар"),
        l = t("<div>").attr({
          "class": "smart-basket__product-quantity smart-basket__product-quantity_header"
        }).text("Кол-во"),
        c = t("<span>").attr({
          "class": "smart-basket__info-icon"
        }).text("?"),
        p = t("<button>").attr({
          "class": "smart-basket__info-msgs-close"
        }).text("×"),
        d = t("<span>").attr({
          "class": "smart-basket__info-msgs"
        }).html("Цена за 1 товар или услугу").append(p),
        u = t("<div>").attr({
          "class": "smart-basket__product-price"
        }).html("\u0426\u0435\u043D\u0430 / ".concat(a.smartBasketCurrency)).append(c).append(d);
      c.click(function () {
        d.fadeToggle();
      }), p.click(function (t) {
        t.preventDefault(), d.fadeToggle();
      });
      var m = t("<div>").attr({
        "class": "smart-basket__product-price-common"
      }).html("\u041E\u0431\u0449\u0430\u044F \u0446\u0435\u043D\u0430 / ".concat(a.smartBasketCurrency)),
        k = t("<div>").attr({
          "class": "smart-basket__product-delete"
        }).text("Удалить");
      n.append(o).append(i).append(u).append(l).append(m).append(k), r.append(n);

      var _loop = function _loop(_n) {
        var i = t("<div>").attr({
          "class": "smart-basket__product-item"
        }),
          o = t("<div>").attr({
            "class": "smart-basket__product-id"
          }),
          l = t("<input>").attr({
            "class": "smart-basket__input",
            type: "hidden"
          }),
          c = t("<div>").attr({
            "class": "smart-basket__product-name"
          }),
          p = t("<input>").attr({
            "class": "smart-basket__input",
            type: "hidden"
          }),
          d = t("<input>").attr({
            "class": "smart-basket__input",
            type: "hidden"
          }),
          u = t("<input>").attr({
            "class": "smart-basket__input",
            type: "hidden"
          }),
          m = t("<div>").attr({
            "class": "smart-basket__product-quantity"
          }),
          k = t("<input>").attr({
            "class": "smart-basket__input",
            type: "hidden"
          }),
          b = t("<button>").attr({
            "class": "smart-basket__add-item"
          }).text("+"),
          f = t("<button>").attr({
            "class": "smart-basket__remove-item"
          }).text("-"),
          v = t("<input>").attr({
            "class": "smart-basket__product-quantity-state",
            type: "number",
            min: "1",
            step: "1",
            pattern: "^[0-9]"
          });
        a.productQuantityWrapper || (b.attr({
          disabled: "disabled"
        }), f.attr({
          disabled: "disabled"
        }), v.attr({
          disabled: "disabled"
        })), m.append(f).append(v).append(b);

        var _ = t("<div>").attr({
          "class": "smart-basket__product-price"
        }),
          h = t("<input>").attr({
            "class": "smart-basket__input",
            type: "hidden"
          }),
          g = t("<div>").attr({
            "class": "smart-basket__product-price-common"
          }),
          y = t("<input>").attr({
            "class": "smart-basket__input"
          }),
          M = e.deleteProducts(s, i);

        for (var _a2 in s[_n]) {
          if ("sbId" === _a2 && (o.html(s[_n][_a2]), l.val(s[_n][_a2]), p.attr({
            name: s[_n][_a2] + "[productName]"
          }), d.attr({
            name: s[_n][_a2] + "[productSize]"
          }), l.attr({
            name: s[_n][_a2] + "[productId]"
          }), k.attr({
            name: s[_n][_a2] + "[productQuantity]"
          }), v.attr({
            "data-sb-id": s[_n][_a2]
          }), b.attr({
            "data-sb-id": s[_n][_a2]
          }), f.attr({
            "data-sb-id": s[_n][_a2]
          }), h.attr({
            name: s[_n][_a2] + "[productPrice]"
          }), y.attr({
            name: s[_n][_a2] + "[productPriceCommon]"
          }), u.attr({
            name: s[_n][_a2] + "[productImg]"
          }), M.attr({
            "data-sb-product-delete": s[_n][_a2]
          })), "sbImg" === _a2) {
            var _e = t("<img>").attr({
              src: s[_n][_a2],
              width: 60
            });

            u.val(s[_n][_a2]), c.append(_e);
          }

          if ("sbName" === _a2 && (c.append("<span>".concat(s[_n][_a2], "</span>")), p.val(s[_n][_a2])), "sbSize" === _a2 && void 0 !== s[_n][_a2] && (c.children("span").append("<span class=\"smart-basket__product-size\"> \u0420\u0430\u0437\u043C\u0435\u0440: ".concat(s[_n][_a2], "</span>")), d.val(s[_n][_a2])), "sbPrice" === _a2 && (_.html(s[_n][_a2]), h.val(s[_n][_a2])), "sbPriceCommon" === _a2) {
            var _t2 = +s[_n][_a2];

            y.val(+_t2.toFixed(2));
          }

          "sbQuantity" === _a2 && (v.val(s[_n][_a2]), k.val(s[_n][_a2]));
        }

        f.click(function (a) {
          a.preventDefault();
          var r = t(this).data("sbId"),
            n = +v.val(),
            i = +h.val(),
            o = i * n;
          n > 1 && (o = i * --n, k.val(n), e.updateBasket(s, r, n, o), e.getSmartBasketMinState(s, "updateSmartBasketMin"), e.commonResult(s, "updateCommonResult")), h.val(i), y.val(+o.toFixed(2)), v.val(n);
        }), b.click(function (a) {
          a.preventDefault();
          var r = t(this).data("sbId"),
            n = +v.val(),
            i = +h.val(),
            o = i * n;
          n >= 1 ? (o = i * ++n, k.val(n), e.updateBasket(s, r, n, o), e.getSmartBasketMinState(s, "updateSmartBasketMin"), e.commonResult(s, "updateCommonResult")) : n = 1, h.val(i), y.val(+o.toFixed(2)), v.val(n);
        }), o.append(l), c.append(u), c.append(p), c.append(d), m.append(k), _.append(h), g.append(y), r.append(i.append(c).append(o).append(_).append(m).append(g).append(M));
      };

      for (var _n in s) {
        _loop(_n);
      }

      return r.append(e.commonResult(s)), r.append(e.userForm()), r;
    },
    stateBasket: function stateBasket() {
      var s,
        r,
        n,
        i,
        o = e.getProducts() || {},
        l = t("<div>").attr({
          "class": "smart-basket"
        }),
        c = t("." + a.buttonAddToBasket);

      if (localStorage.getItem(a.localStorageName), l.append(e.showProducts(o)), a.productQuantityWrapper) {
        var _e2 = t("<div>").attr({
          "class": "smart-basket__quantity-item"
        });

        var _o = t("<button>").attr({
          "class": "smart-basket__add-item"
        }).html("+"),
          _l = t("<button>").attr({
            "class": "smart-basket__remove-item"
          }).html("-");

        s = t("<input>").attr({
          "class": "smart-basket__product-quantity-state",
          min: "1",
          step: "1",
          pattern: "^[0-9]",
          value: "1"
        }), _e2.append(_l).append(s).append(_o), _o.click(function (e) {
          e.preventDefault(), r = t(this).parents("." + a.productElement).find("." + s.attr("class")), n = t(this).parents("." + a.productElement).find("." + a.buttonAddToBasket), (i = +t(this).parents("." + a.productElement).find("." + s.attr("class")).val()) >= 1 ? (i++, r.val(i), n.attr("data-sb-product-quantity", i)) : (r.val(1), n.attr("data-sb-product-quantity", 1));
        }), _l.click(function (e) {
          e.preventDefault(), r = t(this).parents("." + a.productElement).find("." + s.attr("class")), n = t(this).parents("." + a.productElement).find("." + a.buttonAddToBasket), (i = +t(this).parents("." + a.productElement).find("." + s.attr("class")).val()) > 1 ? (i--, r.val(i), n.attr("data-sb-product-quantity", i)) : (r.val(1), n.attr("data-sb-product-quantity", 1));
        }), t("." + a.productQuantityWrapper).append(_e2);
      }

      if (a.productSize && a.productPrice) {
        var _e3 = t("." + a.productSize);

        t("." + a.productElement).find("." + a.productSize + ":first-child").addClass(a.productSize + "_active"), _e3.click(function (e) {
          e.preventDefault(), t(this).parents("." + a.productElement).find("." + a.productSize).removeClass(a.productSize + "_active"), t(this).addClass(a.productSize + "_active");
          var s = t(this).parents("." + a.productElement).find("." + a.buttonAddToBasket),
            r = t(this).parents("." + a.productElement).find("." + a.productPrice),
            n = t(this).attr("data-sb-curent-size");
          console.log(n);
          var i = t(this).attr("data-sb-curent-price"),
            o = t(this).attr("data-sb-curent-id-or-vendor-code");
          console.log(o), s.attr({
            "data-sb-product-price": i,
            "data-sb-product-size": n,
            "data-sb-id-or-vendor-code": o
          }), r.html(i);
        });
      } else console.log("Заполните параметры productSize и productPrice");

      return e.getSmartBasketMinState(o), c.click(function () {
        var _this = this;

        var r = e.getProducts() || {},
          n = t(this).attr("data-sb-id-or-vendor-code");

        if (void 0 !== r[n]) {
          var _a3 = t(this).html();

          return t(this).text("Товар уже в корзине"), t("body").append(e.alertBlock("alreadyAdded")), setTimeout(function () {
            t(_this).html(_a3);
          }, 1500), !1;
        }

        {
          var _i = {};
          _i.sbId = n, _i.sbImg = t(this).data("sbProductImg"), _i.sbName = t(this).data("sbProductName"), a.productSize && a.productPrice && (_i.sbSize = t(this).attr("data-sb-product-size")), _i.sbQuantity = a.productQuantityWrapper ? t(this).parents("." + a.productElement).find("." + s.attr("class")).val() : +t(this).data("sbProductQuantity"), _i.sbPrice = +t(this).attr("data-sb-product-price"), _i.sbPrice.toFixed(2), a.productQuantityWrapper ? (_i.sbPriceCommon = +t(this).attr("data-sb-product-price") * t(this).parents("." + a.productElement).find("." + s.attr("class")).val(), _i.sbPriceCommon.toFixed(2)) : (_i.sbPriceCommon = +t(this).attr("data-sb-product-price") * +t(this).data("sbProductQuantity"), _i.sbPriceCommon.toFixed(2)), r[n] = _i, e.setProducts(r), l.empty(), l.append(e.showProducts(r)), e.getSmartBasketMinState(r, "updateSmartBasketMin"), e.commonResult(r, "updateCommonResult"), t("body").append(e.alertBlock("inBasket"));
        }
      }), l;
    },
    commonResult: function commonResult(e, s, r) {
      var n = 0,
        i = 0,
        o = t("<div>").attr({
          "class": "smart-basket__empty-title"
        }).text("Корзина пуста. Вы не добавили ни одного товара").fadeOut(),
        l = t("<div>").attr({
          "class": "smart-basket__success-title"
        }).text("Заказ принят. Ожидайте звонка").css("display", "none"),
        c = t("<div>").attr({
          "class": "smart-basket__result-common"
        }),
        p = t("<div>").attr({
          "class": "smart-basket__price-common"
        }),
        d = t("<div>").attr({
          "class": "smart-basket__quantity-common"
        });

      for (var _t3 in e) {
        for (var _a4 in e[_t3]) {
          "sbQuantity" === _a4 && (n += +e[_t3][_a4]), "sbPriceCommon" === _a4 && (i += +e[_t3][_a4]);
        }
      }

      if (0 == +n ? o.fadeIn() : o.fadeOut(), r) t("." + l.attr("class")).css("display", "block"), setTimeout(function () {
        t("." + l.attr("class")).css("display", "none"), t("." + o.attr("class")).css("display", "block");
      }, 3e3); else {
        if (!s) return d.html("<span>\u0412\u0441\u0435\u0433\u043E \u0442\u043E\u0432\u0430\u0440\u043E\u0432: </span> ".concat(n)), p.html("<span>\u041E\u0431\u0449\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C: </span> <input name=\"finalPrice\" class=\"smart-basket__total-cost\" type=\"text\" value=\"".concat(i.toFixed(2), " ").concat(a.smartBasketCurrency, "\">")), c.append(o).append(l).append(d).append(p), c;
        0 == +n && t("." + o.attr("class")).css("display", "block"), t("." + d.attr("class")).html("<span>Всего товаров: </span> "), t("." + d.attr("class")).html("<span>\u0412\u0441\u0435\u0433\u043E \u0442\u043E\u0432\u0430\u0440\u043E\u0432: </span> ".concat(n)), t("." + p.attr("class")).html("<span>Общая стоимость: </span> "), t("." + p.attr("class")).html("<span>\u041E\u0431\u0449\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C: </span> <input name=\"finalPrice\" class=\"smart-basket__total-cost\" type=\"text\" value=\"".concat(i.toFixed(2), " ").concat(a.smartBasketCurrency, "\">"));
      }
    },
    getSmartBasketMinState: function getSmartBasketMinState(s, r) {
      var n = 0;

      for (var _t4 in s) {
        for (var _a5 in s[_t4]) {
          "sbQuantity" === _a5 && (n += +s[_t4][_a5]);
        }
      }

      var i = t("<button>").attr({
        "class": "smart-basket__min"
      });
      a.smartBasketMinText && i.prepend("<span class=\"smart-basket__min-text\">".concat(a.smartBasketMinText, "</span> "));
      var o = t("<img>").attr({
        "class": "smart-basket__min-icon",
        src: a.smartBasketMinIconPath,
        width: 0,
        alt: ""
      }),
        l = t("<span>").attr({
          "class": "smart-basket__min-count"
        });
      r ? (t("." + l.attr("class")).html(""), t("." + l.attr("class")).html(n)) : (l.html(n), t("." + a.smartBasketMinArea).append(i.append(o).append(l))), e.getModalBasket(i, s);
    },
    updateBasket: function updateBasket(t, a, s, r) {
      var n = 0,
        i = 0;

      for (var o in t) {
        if (o === a) {
          var _n2 = 0,
            _i2 = {};

          for (var _a6 in t[o]) {
            _i2.sbId = t[o].sbId, _i2.sbImg = t[o].sbImg, _i2.sbName = t[o].sbName, _i2.sbSize = t[o].sbSize, _i2.sbPrice = t[o].sbPrice, "sbPriceCommon" == _a6 && (_i2.sbPriceCommon = r.toFixed(2)), "sbQuantity" == _a6 && (_i2.sbQuantity = s, _n2 += s);
          }

          t[a] = _i2, e.setProducts(t);
        }

        for (var _a7 in t[o]) {
          "sbQuantity" === _a7 && (n += t[o][_a7]), "sbPriceCommon" === _a7 && (i += +t[o][_a7]);
        }
      }
    },
    userForm: function userForm() {
      var s = t("<div>").attr({
        "class": "smart-basket__user-form"
      }),
        r = t("<div>").attr({
          "class": "smart-basket__user-info"
        }),
        n = t("<div>").attr({
          "class": "smart-basket__input-wrapper"
        }),
        i = t("<input>").attr({
          "class": "smart-basket__user-input",
          type: "text",
          placeholder: "Введите имя",
          name: "userName",
          required: !0
        });
      n.append(i);
      var o = t("<div>").attr({
        "class": "smart-basket__input-wrapper"
      }),
        l = t("<input>").attr({
          "class": "smart-basket__user-input",
          type: "tel",
          placeholder: "Введите телефон",
          name: "userTel",
          required: a.telIsRequired
        }).mask(a.countryCode + "(000)000-00-00");
      o.append(l);
      var c = t("<div>").attr({
        "class": "smart-basket__input-wrapper"
      }),
        p = t("<input>").attr({
          "class": "smart-basket__user-input",
          type: "email",
          placeholder: "Введите e-mail",
          name: "userEmail",
          required: a.emailIsRequired
        });

      if (c.append(p), a.agreement.isRequired) {
        var d = t("<div>").attr({
          "class": "smart-basket__agreement-wrapper"
        });

        var _e4 = t("<label>").attr({
          "class": "smart-basket__label-agreement",
          "for": "smart-basket__input-agreement"
        }),
          _s2 = t("<input>").attr({
            type: "checkbox",
            name: "agreement",
            "class": "smart-basket__input-agreement",
            id: "smart-basket__input-agreement",
            checked: a.agreement.isChecked,
            value: "Я принимаю условия пользовательского соглашения"
          }),
          _r = null;

        _r = a.agreement.isLink ? t("<a>").attr({
          "class": "smart-basket__link-agreement",
          href: a.agreement.isLink,
          target: "_blank",
          rel: "nofollow"
        }) : t("<span>").attr({
          "class": "smart-basket__link-agreement"
        }), _s2.is(":checked") ? _r.text("Я принимаю условия пользовательского соглашения") : _r.text("Я не принимаю условия пользовательского соглашения"), _e4.click(function () {
          _s2.is(":checked") ? (_r.text("Я не принимаю условия пользовательского соглашения"), _s2.val("Я не принимаю условия пользовательского соглашения"), m.attr({
            disabled: "disabled"
          }), d.addClass("smart-basket__input-wrapper_error")) : (_r.text("Я принимаю условия пользовательского соглашения"), _s2.val("Я принимаю условия пользовательского соглашения"), m.attr({
            disabled: !1
          }), d.removeClass("smart-basket__input-wrapper_error"));
        }), d.append(_s2).append(_e4).append(_r);
      }

      var u = t("<button>").attr({
        "class": "smart-basket__close-form"
      }).text("Продолжить покупки");
      e.closeModalBasket(u);
      var m = t("<button>").attr({
        "class": "smart-basket__send-form",
        form: "smart-basket__form",
        type: "submit"
      }).text("Сделать заказ"),
        k = t("<div>").attr({
          "class": "smart-basket__footer"
        });
      r.append(n).append(o).append(c), a.agreement.isChecked && r.append(d), k.append(u).append(m), s.append(r).append(k), m.click(function (t) {
        t.preventDefault();
        var s = e.getProducts() || {};

        function r(t) {
          for (var _a8 in t) {
            return !1;
          }

          return !0;
        }

        if (a.nameIsRequired && a.telIsRequired && a.emailIsRequired) {
          if ("" === l.val() || "" === i.val() || "" === p.val() || r(s)) return "" === l.val() && l.parent().addClass("smart-basket__input-wrapper_error"), "" === i.val() && i.parent().addClass("smart-basket__input-wrapper_error"), "" === p.val() && p.parent().addClass("smart-basket__input-wrapper_error"), !1;
          e.sendCart();
        } else if (a.telIsRequired || a.emailIsRequired) {
          if ("" === i.val() || !("" !== l.val() && a.telIsRequired || "" !== p.val() && a.emailIsRequired) || r(s)) return "" === l.val() && a.telIsRequired && l.parent().addClass("smart-basket__input-wrapper_error"), "" === p.val() && a.emailIsRequired && p.parent().addClass("smart-basket__input-wrapper_error"), "" === i.val() && i.parent().addClass("smart-basket__input-wrapper_error"), !1;
          e.sendCart();
        }
      });

      var b = function b(a) {
        a.focus(function () {
          t(this).parent().addClass("smart-basket__input-wrapper_focus");
        }), a.blur(function () {
          t(this).parent().removeClass("smart-basket__input-wrapper_focus"), "" === this.value && t(this).parent().addClass("smart-basket__input-wrapper_error");
        }), a.parent().on("input", function () {
          t(this).removeClass("smart-basket__input-wrapper_error");
        }), a.change(function () {
          t(this).parent().removeClass("smart-basket__input-wrapper_error"), t(this).parent().addClass("smart-basket__input-wrapper_focus");
        });
      };

      return b(i), a.telIsRequired && b(l), a.emailIsRequired && b(p), s;
    },
    getModalBasket: function getModalBasket(a, s) {
      e.commonResult(s, "updateCommonResult"), a.click(function (a) {
        a.preventDefault(), t(".smart-basket").toggleClass("smart-basket_active"), t("body").css("overflow", "hidden");
      });
    },
    closeModalBasket: function closeModalBasket(a) {
      a.click(function (a) {
        a.preventDefault(), t(".smart-basket").toggleClass("smart-basket_active"), t("body").css("overflow", "auto");
      });
    },
    sendCart: function sendCart() {
      var s = t("#smart-basket__form")[0],
        r = new FormData(s);
      t.ajax({
        url: "/smartbasket/php/smartbasket.php",
        type: "POST",
        data: r,
        processData: !1,
        contentType: !1,
        beforeSend: function beforeSend() { },
        success: function success(t) { },
        complete: function complete(s) {
          t(".smart-basket__product-item:not(:first)").remove();
          var r = e.getProducts() || {};
          e.commonResult(r, "", "submitEvent"), localStorage.clear(), "" !== a.yaCounter.counterID && "" !== a.yaCounter.targetID && ym(a.yaCounter.counterID, "reachGoal", a.yaCounter.targetID), setTimeout(function () {
            t(".smart-basket").toggleClass("smart-basket_active"), t("body").css("overflow", "auto");
          }, 3e3), setTimeout(function () {
            r = e.getProducts() || {}, e.commonResult(r, "updateCommonResult"), e.getSmartBasketMinState(r, "updateSmartBasketMin"), e.showProducts(r);
          }, 4e3);
        }
      });
    },
    alertBlock: function alertBlock(a) {
      var s = t("<div>").attr({
        "class": "smart-basket__alert-wrapper"
      }),
        r = t("<div>").attr({
          "class": "smart-basket__alert"
        }),
        n = t("<div>").attr({
          "class": "smart-basket__alert-icon"
        }),
        i = t("<div>").attr({
          "class": "smart-basket__alert-text"
        }),
        o = t("<div>").attr({
          "class": "smart-basket__alert-footer"
        }),
        l = t("<button>").attr({
          "class": "smart-basket__alert-button smart-basket__alert-button_close"
        }).text("Продолжить покупки"),
        c = t("<button>").attr({
          "class": "smart-basket__alert-button smart-basket__alert-button_by"
        }).text("В корзину");
      l.click(function () {
        t(this).parents("." + s.attr("class")).remove();
      }), c.click(function () {
        t(this).parents("." + s.attr("class")).remove();
      });
      var p = e.getProducts() || {};
      return e.getModalBasket(c, p), "inBasket" === a && (n.html('\n\t\t\t\t<svg class="" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">\n         <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>\n         <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>\n\t\t\t\t</svg>'), i.text("Товар добавлен в корзину")), "alreadyAdded" === a && (n.html('\n\t\t\t\t<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">\n          <circle class="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>\n          <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>\n          <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>\n\t\t\t\t</svg>\n\t\t\t\t'), i.append("Товар уже добавлен в корзину")), o.append(l).append(c), s.append(r.append(n).append(i).append(o)), s;
    },
    init: function init(s) {
      t.extend(a, s);
      return this.each(function () {
        t(this).append(e.stateBasket());
      });
    }
  }, t.fn.smbasket = function (a) {
    return e[a] ? e[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != _typeof(a) && a ? void t.error("Метод " + a + " не найден") : e.init.apply(this, arguments);
  };
});