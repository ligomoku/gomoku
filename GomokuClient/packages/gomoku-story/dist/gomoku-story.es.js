var Oc = Object.defineProperty;
var Nc = (e, t, r) => t in e ? Oc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Jo = (e, t, r) => Nc(e, typeof t != "symbol" ? t + "" : t, r);
import * as d from "react";
import Pe, { useState as Fe, useEffect as Tr, useRef as Qo, useCallback as es, forwardRef as vt, createElement as Ae, useLayoutEffect as _c, memo as jc, useMemo as Hs, Fragment as Ac } from "react";
import * as qt from "react-dom";
import Zn from "react-dom";
function Dc(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function n() {
      return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var o = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(r, n, o.get ? o : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), r;
}
var Pn = { exports: {} }, Wt = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ts;
function Mc() {
  if (ts) return Wt;
  ts = 1;
  var e = Pe, t = Symbol.for("react.element"), r = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, o = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, s = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(i, l, u) {
    var f, p = {}, h = null, v = null;
    u !== void 0 && (h = "" + u), l.key !== void 0 && (h = "" + l.key), l.ref !== void 0 && (v = l.ref);
    for (f in l) n.call(l, f) && !s.hasOwnProperty(f) && (p[f] = l[f]);
    if (i && i.defaultProps) for (f in l = i.defaultProps, l) p[f] === void 0 && (p[f] = l[f]);
    return { $$typeof: t, type: i, key: h, ref: v, props: p, _owner: o.current };
  }
  return Wt.Fragment = r, Wt.jsx = a, Wt.jsxs = a, Wt;
}
var zt = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rs;
function kc() {
  return rs || (rs = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Pe, t = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), s = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), w = Symbol.iterator, m = "@@iterator";
    function g(x) {
      if (x === null || typeof x != "object")
        return null;
      var N = w && x[w] || x[m];
      return typeof N == "function" ? N : null;
    }
    var S = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function b(x) {
      {
        for (var N = arguments.length, I = new Array(N > 1 ? N - 1 : 0), Q = 1; Q < N; Q++)
          I[Q - 1] = arguments[Q];
        y("error", x, I);
      }
    }
    function y(x, N, I) {
      {
        var Q = S.ReactDebugCurrentFrame, le = Q.getStackAddendum();
        le !== "" && (N += "%s", I = I.concat([le]));
        var fe = I.map(function(ie) {
          return String(ie);
        });
        fe.unshift("Warning: " + N), Function.prototype.apply.call(console[x], console, fe);
      }
    }
    var E = !1, C = !1, T = !1, R = !1, k = !1, M;
    M = Symbol.for("react.module.reference");
    function W(x) {
      return !!(typeof x == "string" || typeof x == "function" || x === n || x === s || k || x === o || x === u || x === f || R || x === v || E || C || T || typeof x == "object" && x !== null && (x.$$typeof === h || x.$$typeof === p || x.$$typeof === a || x.$$typeof === i || x.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      x.$$typeof === M || x.getModuleId !== void 0));
    }
    function L(x, N, I) {
      var Q = x.displayName;
      if (Q)
        return Q;
      var le = N.displayName || N.name || "";
      return le !== "" ? I + "(" + le + ")" : I;
    }
    function D(x) {
      return x.displayName || "Context";
    }
    function V(x) {
      if (x == null)
        return null;
      if (typeof x.tag == "number" && b("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof x == "function")
        return x.displayName || x.name || null;
      if (typeof x == "string")
        return x;
      switch (x) {
        case n:
          return "Fragment";
        case r:
          return "Portal";
        case s:
          return "Profiler";
        case o:
          return "StrictMode";
        case u:
          return "Suspense";
        case f:
          return "SuspenseList";
      }
      if (typeof x == "object")
        switch (x.$$typeof) {
          case i:
            var N = x;
            return D(N) + ".Consumer";
          case a:
            var I = x;
            return D(I._context) + ".Provider";
          case l:
            return L(x, x.render, "ForwardRef");
          case p:
            var Q = x.displayName || null;
            return Q !== null ? Q : V(x.type) || "Memo";
          case h: {
            var le = x, fe = le._payload, ie = le._init;
            try {
              return V(ie(fe));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var _ = Object.assign, U = 0, F, H, $, G, P, j, J;
    function X() {
    }
    X.__reactDisabledLog = !0;
    function Y() {
      {
        if (U === 0) {
          F = console.log, H = console.info, $ = console.warn, G = console.error, P = console.group, j = console.groupCollapsed, J = console.groupEnd;
          var x = {
            configurable: !0,
            enumerable: !0,
            value: X,
            writable: !0
          };
          Object.defineProperties(console, {
            info: x,
            log: x,
            warn: x,
            error: x,
            group: x,
            groupCollapsed: x,
            groupEnd: x
          });
        }
        U++;
      }
    }
    function re() {
      {
        if (U--, U === 0) {
          var x = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: _({}, x, {
              value: F
            }),
            info: _({}, x, {
              value: H
            }),
            warn: _({}, x, {
              value: $
            }),
            error: _({}, x, {
              value: G
            }),
            group: _({}, x, {
              value: P
            }),
            groupCollapsed: _({}, x, {
              value: j
            }),
            groupEnd: _({}, x, {
              value: J
            })
          });
        }
        U < 0 && b("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var q = S.ReactCurrentDispatcher, A;
    function B(x, N, I) {
      {
        if (A === void 0)
          try {
            throw Error();
          } catch (le) {
            var Q = le.stack.trim().match(/\n( *(at )?)/);
            A = Q && Q[1] || "";
          }
        return `
` + A + x;
      }
    }
    var K = !1, z;
    {
      var ee = typeof WeakMap == "function" ? WeakMap : Map;
      z = new ee();
    }
    function O(x, N) {
      if (!x || K)
        return "";
      {
        var I = z.get(x);
        if (I !== void 0)
          return I;
      }
      var Q;
      K = !0;
      var le = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var fe;
      fe = q.current, q.current = null, Y();
      try {
        if (N) {
          var ie = function() {
            throw Error();
          };
          if (Object.defineProperty(ie.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(ie, []);
            } catch (Ee) {
              Q = Ee;
            }
            Reflect.construct(x, [], ie);
          } else {
            try {
              ie.call();
            } catch (Ee) {
              Q = Ee;
            }
            x.call(ie.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ee) {
            Q = Ee;
          }
          x();
        }
      } catch (Ee) {
        if (Ee && Q && typeof Ee.stack == "string") {
          for (var se = Ee.stack.split(`
`), Se = Q.stack.split(`
`), ge = se.length - 1, ve = Se.length - 1; ge >= 1 && ve >= 0 && se[ge] !== Se[ve]; )
            ve--;
          for (; ge >= 1 && ve >= 0; ge--, ve--)
            if (se[ge] !== Se[ve]) {
              if (ge !== 1 || ve !== 1)
                do
                  if (ge--, ve--, ve < 0 || se[ge] !== Se[ve]) {
                    var De = `
` + se[ge].replace(" at new ", " at ");
                    return x.displayName && De.includes("<anonymous>") && (De = De.replace("<anonymous>", x.displayName)), typeof x == "function" && z.set(x, De), De;
                  }
                while (ge >= 1 && ve >= 0);
              break;
            }
        }
      } finally {
        K = !1, q.current = fe, re(), Error.prepareStackTrace = le;
      }
      var xt = x ? x.displayName || x.name : "", ft = xt ? B(xt) : "";
      return typeof x == "function" && z.set(x, ft), ft;
    }
    function pe(x, N, I) {
      return O(x, !1);
    }
    function ye(x) {
      var N = x.prototype;
      return !!(N && N.isReactComponent);
    }
    function Te(x, N, I) {
      if (x == null)
        return "";
      if (typeof x == "function")
        return O(x, ye(x));
      if (typeof x == "string")
        return B(x);
      switch (x) {
        case u:
          return B("Suspense");
        case f:
          return B("SuspenseList");
      }
      if (typeof x == "object")
        switch (x.$$typeof) {
          case l:
            return pe(x.render);
          case p:
            return Te(x.type, N, I);
          case h: {
            var Q = x, le = Q._payload, fe = Q._init;
            try {
              return Te(fe(le), N, I);
            } catch {
            }
          }
        }
      return "";
    }
    var Ie = Object.prototype.hasOwnProperty, tt = {}, or = S.ReactDebugCurrentFrame;
    function qe(x) {
      if (x) {
        var N = x._owner, I = Te(x.type, x._source, N ? N.type : null);
        or.setExtraStackFrame(I);
      } else
        or.setExtraStackFrame(null);
    }
    function ac(x, N, I, Q, le) {
      {
        var fe = Function.call.bind(Ie);
        for (var ie in x)
          if (fe(x, ie)) {
            var se = void 0;
            try {
              if (typeof x[ie] != "function") {
                var Se = Error((Q || "React class") + ": " + I + " type `" + ie + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof x[ie] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Se.name = "Invariant Violation", Se;
              }
              se = x[ie](N, ie, Q, I, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (ge) {
              se = ge;
            }
            se && !(se instanceof Error) && (qe(le), b("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Q || "React class", I, ie, typeof se), qe(null)), se instanceof Error && !(se.message in tt) && (tt[se.message] = !0, qe(le), b("Failed %s type: %s", I, se.message), qe(null));
          }
      }
    }
    var ic = Array.isArray;
    function qr(x) {
      return ic(x);
    }
    function lc(x) {
      {
        var N = typeof Symbol == "function" && Symbol.toStringTag, I = N && x[Symbol.toStringTag] || x.constructor.name || "Object";
        return I;
      }
    }
    function cc(x) {
      try {
        return zo(x), !1;
      } catch {
        return !0;
      }
    }
    function zo(x) {
      return "" + x;
    }
    function Bo(x) {
      if (cc(x))
        return b("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", lc(x)), zo(x);
    }
    var Ft = S.ReactCurrentOwner, uc = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Vo, Ho, Zr;
    Zr = {};
    function dc(x) {
      if (Ie.call(x, "ref")) {
        var N = Object.getOwnPropertyDescriptor(x, "ref").get;
        if (N && N.isReactWarning)
          return !1;
      }
      return x.ref !== void 0;
    }
    function fc(x) {
      if (Ie.call(x, "key")) {
        var N = Object.getOwnPropertyDescriptor(x, "key").get;
        if (N && N.isReactWarning)
          return !1;
      }
      return x.key !== void 0;
    }
    function pc(x, N) {
      if (typeof x.ref == "string" && Ft.current && N && Ft.current.stateNode !== N) {
        var I = V(Ft.current.type);
        Zr[I] || (b('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', V(Ft.current.type), x.ref), Zr[I] = !0);
      }
    }
    function mc(x, N) {
      {
        var I = function() {
          Vo || (Vo = !0, b("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", N));
        };
        I.isReactWarning = !0, Object.defineProperty(x, "key", {
          get: I,
          configurable: !0
        });
      }
    }
    function hc(x, N) {
      {
        var I = function() {
          Ho || (Ho = !0, b("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", N));
        };
        I.isReactWarning = !0, Object.defineProperty(x, "ref", {
          get: I,
          configurable: !0
        });
      }
    }
    var gc = function(x, N, I, Q, le, fe, ie) {
      var se = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: x,
        key: N,
        ref: I,
        props: ie,
        // Record the component responsible for creating this element.
        _owner: fe
      };
      return se._store = {}, Object.defineProperty(se._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(se, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Q
      }), Object.defineProperty(se, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: le
      }), Object.freeze && (Object.freeze(se.props), Object.freeze(se)), se;
    };
    function vc(x, N, I, Q, le) {
      {
        var fe, ie = {}, se = null, Se = null;
        I !== void 0 && (Bo(I), se = "" + I), fc(N) && (Bo(N.key), se = "" + N.key), dc(N) && (Se = N.ref, pc(N, le));
        for (fe in N)
          Ie.call(N, fe) && !uc.hasOwnProperty(fe) && (ie[fe] = N[fe]);
        if (x && x.defaultProps) {
          var ge = x.defaultProps;
          for (fe in ge)
            ie[fe] === void 0 && (ie[fe] = ge[fe]);
        }
        if (se || Se) {
          var ve = typeof x == "function" ? x.displayName || x.name || "Unknown" : x;
          se && mc(ie, ve), Se && hc(ie, ve);
        }
        return gc(x, se, Se, le, Q, Ft.current, ie);
      }
    }
    var Jr = S.ReactCurrentOwner, Uo = S.ReactDebugCurrentFrame;
    function yt(x) {
      if (x) {
        var N = x._owner, I = Te(x.type, x._source, N ? N.type : null);
        Uo.setExtraStackFrame(I);
      } else
        Uo.setExtraStackFrame(null);
    }
    var Qr;
    Qr = !1;
    function en(x) {
      return typeof x == "object" && x !== null && x.$$typeof === t;
    }
    function Yo() {
      {
        if (Jr.current) {
          var x = V(Jr.current.type);
          if (x)
            return `

Check the render method of \`` + x + "`.";
        }
        return "";
      }
    }
    function bc(x) {
      return "";
    }
    var Xo = {};
    function yc(x) {
      {
        var N = Yo();
        if (!N) {
          var I = typeof x == "string" ? x : x.displayName || x.name;
          I && (N = `

Check the top-level render call using <` + I + ">.");
        }
        return N;
      }
    }
    function Ko(x, N) {
      {
        if (!x._store || x._store.validated || x.key != null)
          return;
        x._store.validated = !0;
        var I = yc(N);
        if (Xo[I])
          return;
        Xo[I] = !0;
        var Q = "";
        x && x._owner && x._owner !== Jr.current && (Q = " It was passed a child from " + V(x._owner.type) + "."), yt(x), b('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', I, Q), yt(null);
      }
    }
    function Go(x, N) {
      {
        if (typeof x != "object")
          return;
        if (qr(x))
          for (var I = 0; I < x.length; I++) {
            var Q = x[I];
            en(Q) && Ko(Q, N);
          }
        else if (en(x))
          x._store && (x._store.validated = !0);
        else if (x) {
          var le = g(x);
          if (typeof le == "function" && le !== x.entries)
            for (var fe = le.call(x), ie; !(ie = fe.next()).done; )
              en(ie.value) && Ko(ie.value, N);
        }
      }
    }
    function xc(x) {
      {
        var N = x.type;
        if (N == null || typeof N == "string")
          return;
        var I;
        if (typeof N == "function")
          I = N.propTypes;
        else if (typeof N == "object" && (N.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        N.$$typeof === p))
          I = N.propTypes;
        else
          return;
        if (I) {
          var Q = V(N);
          ac(I, x.props, "prop", Q, x);
        } else if (N.PropTypes !== void 0 && !Qr) {
          Qr = !0;
          var le = V(N);
          b("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", le || "Unknown");
        }
        typeof N.getDefaultProps == "function" && !N.getDefaultProps.isReactClassApproved && b("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function wc(x) {
      {
        for (var N = Object.keys(x.props), I = 0; I < N.length; I++) {
          var Q = N[I];
          if (Q !== "children" && Q !== "key") {
            yt(x), b("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Q), yt(null);
            break;
          }
        }
        x.ref !== null && (yt(x), b("Invalid attribute `ref` supplied to `React.Fragment`."), yt(null));
      }
    }
    var qo = {};
    function Zo(x, N, I, Q, le, fe) {
      {
        var ie = W(x);
        if (!ie) {
          var se = "";
          (x === void 0 || typeof x == "object" && x !== null && Object.keys(x).length === 0) && (se += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Se = bc();
          Se ? se += Se : se += Yo();
          var ge;
          x === null ? ge = "null" : qr(x) ? ge = "array" : x !== void 0 && x.$$typeof === t ? (ge = "<" + (V(x.type) || "Unknown") + " />", se = " Did you accidentally export a JSX literal instead of a component?") : ge = typeof x, b("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ge, se);
        }
        var ve = vc(x, N, I, le, fe);
        if (ve == null)
          return ve;
        if (ie) {
          var De = N.children;
          if (De !== void 0)
            if (Q)
              if (qr(De)) {
                for (var xt = 0; xt < De.length; xt++)
                  Go(De[xt], x);
                Object.freeze && Object.freeze(De);
              } else
                b("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Go(De, x);
        }
        if (Ie.call(N, "key")) {
          var ft = V(x), Ee = Object.keys(N).filter(function(Tc) {
            return Tc !== "key";
          }), tn = Ee.length > 0 ? "{key: someKey, " + Ee.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!qo[ft + tn]) {
            var Pc = Ee.length > 0 ? "{" + Ee.join(": ..., ") + ": ...}" : "{}";
            b(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, tn, ft, Pc, ft), qo[ft + tn] = !0;
          }
        }
        return x === n ? wc(ve) : xc(ve), ve;
      }
    }
    function Sc(x, N, I) {
      return Zo(x, N, I, !0);
    }
    function Cc(x, N, I) {
      return Zo(x, N, I, !1);
    }
    var Ec = Cc, Rc = Sc;
    zt.Fragment = n, zt.jsx = Ec, zt.jsxs = Rc;
  }()), zt;
}
process.env.NODE_ENV === "production" ? Pn.exports = Mc() : Pn.exports = kc();
var c = Pn.exports;
function Us(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) for (t = 0; t < e.length; t++) e[t] && (r = Us(e[t])) && (n && (n += " "), n += r);
  else for (t in e) e[t] && (n && (n += " "), n += t);
  return n;
}
function Ic() {
  for (var e, t, r = 0, n = ""; r < arguments.length; ) (e = arguments[r++]) && (t = Us(e)) && (n && (n += " "), n += t);
  return n;
}
const ns = (e) => typeof e == "boolean" ? "".concat(e) : e === 0 ? "0" : e, os = Ic, Ys = (e, t) => (r) => {
  var n;
  if ((t == null ? void 0 : t.variants) == null) return os(e, r == null ? void 0 : r.class, r == null ? void 0 : r.className);
  const { variants: o, defaultVariants: s } = t, a = Object.keys(o).map((u) => {
    const f = r == null ? void 0 : r[u], p = s == null ? void 0 : s[u];
    if (f === null) return null;
    const h = ns(f) || ns(p);
    return o[u][h];
  }), i = r && Object.entries(r).reduce((u, f) => {
    let [p, h] = f;
    return h === void 0 || (u[p] = h), u;
  }, {}), l = t == null || (n = t.compoundVariants) === null || n === void 0 ? void 0 : n.reduce((u, f) => {
    let { class: p, className: h, ...v } = f;
    return Object.entries(v).every((w) => {
      let [m, g] = w;
      return Array.isArray(g) ? g.includes({
        ...s,
        ...i
      }[m]) : {
        ...s,
        ...i
      }[m] === g;
    }) ? [
      ...u,
      p,
      h
    ] : u;
  }, []);
  return os(e, a, l, r == null ? void 0 : r.class, r == null ? void 0 : r.className);
};
var Jn = { exports: {} }, Zt = {}, Or = { exports: {} }, Xs = {}, Tn = { exports: {} }, On = { exports: {} }, ce = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ss;
function Lc() {
  if (ss) return ce;
  ss = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, s = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, i = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, h = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, w = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, g = e ? Symbol.for("react.fundamental") : 60117, S = e ? Symbol.for("react.responder") : 60118, b = e ? Symbol.for("react.scope") : 60119;
  function y(C) {
    if (typeof C == "object" && C !== null) {
      var T = C.$$typeof;
      switch (T) {
        case t:
          switch (C = C.type, C) {
            case l:
            case u:
            case n:
            case s:
            case o:
            case p:
              return C;
            default:
              switch (C = C && C.$$typeof, C) {
                case i:
                case f:
                case w:
                case v:
                case a:
                  return C;
                default:
                  return T;
              }
          }
        case r:
          return T;
      }
    }
  }
  function E(C) {
    return y(C) === u;
  }
  return ce.AsyncMode = l, ce.ConcurrentMode = u, ce.ContextConsumer = i, ce.ContextProvider = a, ce.Element = t, ce.ForwardRef = f, ce.Fragment = n, ce.Lazy = w, ce.Memo = v, ce.Portal = r, ce.Profiler = s, ce.StrictMode = o, ce.Suspense = p, ce.isAsyncMode = function(C) {
    return E(C) || y(C) === l;
  }, ce.isConcurrentMode = E, ce.isContextConsumer = function(C) {
    return y(C) === i;
  }, ce.isContextProvider = function(C) {
    return y(C) === a;
  }, ce.isElement = function(C) {
    return typeof C == "object" && C !== null && C.$$typeof === t;
  }, ce.isForwardRef = function(C) {
    return y(C) === f;
  }, ce.isFragment = function(C) {
    return y(C) === n;
  }, ce.isLazy = function(C) {
    return y(C) === w;
  }, ce.isMemo = function(C) {
    return y(C) === v;
  }, ce.isPortal = function(C) {
    return y(C) === r;
  }, ce.isProfiler = function(C) {
    return y(C) === s;
  }, ce.isStrictMode = function(C) {
    return y(C) === o;
  }, ce.isSuspense = function(C) {
    return y(C) === p;
  }, ce.isValidElementType = function(C) {
    return typeof C == "string" || typeof C == "function" || C === n || C === u || C === s || C === o || C === p || C === h || typeof C == "object" && C !== null && (C.$$typeof === w || C.$$typeof === v || C.$$typeof === a || C.$$typeof === i || C.$$typeof === f || C.$$typeof === g || C.$$typeof === S || C.$$typeof === b || C.$$typeof === m);
  }, ce.typeOf = y, ce;
}
var ue = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var as;
function $c() {
  return as || (as = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, s = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, i = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, h = e ? Symbol.for("react.suspense_list") : 60120, v = e ? Symbol.for("react.memo") : 60115, w = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, g = e ? Symbol.for("react.fundamental") : 60117, S = e ? Symbol.for("react.responder") : 60118, b = e ? Symbol.for("react.scope") : 60119;
    function y(O) {
      return typeof O == "string" || typeof O == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      O === n || O === u || O === s || O === o || O === p || O === h || typeof O == "object" && O !== null && (O.$$typeof === w || O.$$typeof === v || O.$$typeof === a || O.$$typeof === i || O.$$typeof === f || O.$$typeof === g || O.$$typeof === S || O.$$typeof === b || O.$$typeof === m);
    }
    function E(O) {
      if (typeof O == "object" && O !== null) {
        var pe = O.$$typeof;
        switch (pe) {
          case t:
            var ye = O.type;
            switch (ye) {
              case l:
              case u:
              case n:
              case s:
              case o:
              case p:
                return ye;
              default:
                var Te = ye && ye.$$typeof;
                switch (Te) {
                  case i:
                  case f:
                  case w:
                  case v:
                  case a:
                    return Te;
                  default:
                    return pe;
                }
            }
          case r:
            return pe;
        }
      }
    }
    var C = l, T = u, R = i, k = a, M = t, W = f, L = n, D = w, V = v, _ = r, U = s, F = o, H = p, $ = !1;
    function G(O) {
      return $ || ($ = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), P(O) || E(O) === l;
    }
    function P(O) {
      return E(O) === u;
    }
    function j(O) {
      return E(O) === i;
    }
    function J(O) {
      return E(O) === a;
    }
    function X(O) {
      return typeof O == "object" && O !== null && O.$$typeof === t;
    }
    function Y(O) {
      return E(O) === f;
    }
    function re(O) {
      return E(O) === n;
    }
    function q(O) {
      return E(O) === w;
    }
    function A(O) {
      return E(O) === v;
    }
    function B(O) {
      return E(O) === r;
    }
    function K(O) {
      return E(O) === s;
    }
    function z(O) {
      return E(O) === o;
    }
    function ee(O) {
      return E(O) === p;
    }
    ue.AsyncMode = C, ue.ConcurrentMode = T, ue.ContextConsumer = R, ue.ContextProvider = k, ue.Element = M, ue.ForwardRef = W, ue.Fragment = L, ue.Lazy = D, ue.Memo = V, ue.Portal = _, ue.Profiler = U, ue.StrictMode = F, ue.Suspense = H, ue.isAsyncMode = G, ue.isConcurrentMode = P, ue.isContextConsumer = j, ue.isContextProvider = J, ue.isElement = X, ue.isForwardRef = Y, ue.isFragment = re, ue.isLazy = q, ue.isMemo = A, ue.isPortal = B, ue.isProfiler = K, ue.isStrictMode = z, ue.isSuspense = ee, ue.isValidElementType = y, ue.typeOf = E;
  }()), ue;
}
process.env.NODE_ENV === "production" ? On.exports = Lc() : On.exports = $c();
var Ks = On.exports;
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var rn, is;
function Fc() {
  if (is) return rn;
  is = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
  function n(s) {
    if (s == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(s);
  }
  function o() {
    try {
      if (!Object.assign)
        return !1;
      var s = new String("abc");
      if (s[5] = "de", Object.getOwnPropertyNames(s)[0] === "5")
        return !1;
      for (var a = {}, i = 0; i < 10; i++)
        a["_" + String.fromCharCode(i)] = i;
      var l = Object.getOwnPropertyNames(a).map(function(f) {
        return a[f];
      });
      if (l.join("") !== "0123456789")
        return !1;
      var u = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(f) {
        u[f] = f;
      }), Object.keys(Object.assign({}, u)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return rn = o() ? Object.assign : function(s, a) {
    for (var i, l = n(s), u, f = 1; f < arguments.length; f++) {
      i = Object(arguments[f]);
      for (var p in i)
        t.call(i, p) && (l[p] = i[p]);
      if (e) {
        u = e(i);
        for (var h = 0; h < u.length; h++)
          r.call(i, u[h]) && (l[u[h]] = i[u[h]]);
      }
    }
    return l;
  }, rn;
}
var nn, ls;
function Qn() {
  if (ls) return nn;
  ls = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return nn = e, nn;
}
var on, cs;
function Gs() {
  return cs || (cs = 1, on = Function.call.bind(Object.prototype.hasOwnProperty)), on;
}
var sn, us;
function Wc() {
  if (us) return sn;
  us = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Qn(), r = {}, n = Gs();
    e = function(s) {
      var a = "Warning: " + s;
      typeof console < "u" && console.error(a);
      try {
        throw new Error(a);
      } catch {
      }
    };
  }
  function o(s, a, i, l, u) {
    if (process.env.NODE_ENV !== "production") {
      for (var f in s)
        if (n(s, f)) {
          var p;
          try {
            if (typeof s[f] != "function") {
              var h = Error(
                (l || "React class") + ": " + i + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof s[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw h.name = "Invariant Violation", h;
            }
            p = s[f](a, f, l, i, null, t);
          } catch (w) {
            p = w;
          }
          if (p && !(p instanceof Error) && e(
            (l || "React class") + ": type specification of " + i + " `" + f + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof p + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), p instanceof Error && !(p.message in r)) {
            r[p.message] = !0;
            var v = u ? u() : "";
            e(
              "Failed " + i + " type: " + p.message + (v ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, sn = o, sn;
}
var an, ds;
function zc() {
  if (ds) return an;
  ds = 1;
  var e = Ks, t = Fc(), r = Qn(), n = Gs(), o = Wc(), s = function() {
  };
  process.env.NODE_ENV !== "production" && (s = function(i) {
    var l = "Warning: " + i;
    typeof console < "u" && console.error(l);
    try {
      throw new Error(l);
    } catch {
    }
  });
  function a() {
    return null;
  }
  return an = function(i, l) {
    var u = typeof Symbol == "function" && Symbol.iterator, f = "@@iterator";
    function p(P) {
      var j = P && (u && P[u] || P[f]);
      if (typeof j == "function")
        return j;
    }
    var h = "<<anonymous>>", v = {
      array: S("array"),
      bigint: S("bigint"),
      bool: S("boolean"),
      func: S("function"),
      number: S("number"),
      object: S("object"),
      string: S("string"),
      symbol: S("symbol"),
      any: b(),
      arrayOf: y,
      element: E(),
      elementType: C(),
      instanceOf: T,
      node: W(),
      objectOf: k,
      oneOf: R,
      oneOfType: M,
      shape: D,
      exact: V
    };
    function w(P, j) {
      return P === j ? P !== 0 || 1 / P === 1 / j : P !== P && j !== j;
    }
    function m(P, j) {
      this.message = P, this.data = j && typeof j == "object" ? j : {}, this.stack = "";
    }
    m.prototype = Error.prototype;
    function g(P) {
      if (process.env.NODE_ENV !== "production")
        var j = {}, J = 0;
      function X(re, q, A, B, K, z, ee) {
        if (B = B || h, z = z || A, ee !== r) {
          if (l) {
            var O = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw O.name = "Invariant Violation", O;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var pe = B + ":" + A;
            !j[pe] && // Avoid spamming the console because they are often not actionable except for lib authors
            J < 3 && (s(
              "You are manually calling a React.PropTypes validation function for the `" + z + "` prop on `" + B + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), j[pe] = !0, J++);
          }
        }
        return q[A] == null ? re ? q[A] === null ? new m("The " + K + " `" + z + "` is marked as required " + ("in `" + B + "`, but its value is `null`.")) : new m("The " + K + " `" + z + "` is marked as required in " + ("`" + B + "`, but its value is `undefined`.")) : null : P(q, A, B, K, z);
      }
      var Y = X.bind(null, !1);
      return Y.isRequired = X.bind(null, !0), Y;
    }
    function S(P) {
      function j(J, X, Y, re, q, A) {
        var B = J[X], K = F(B);
        if (K !== P) {
          var z = H(B);
          return new m(
            "Invalid " + re + " `" + q + "` of type " + ("`" + z + "` supplied to `" + Y + "`, expected ") + ("`" + P + "`."),
            { expectedType: P }
          );
        }
        return null;
      }
      return g(j);
    }
    function b() {
      return g(a);
    }
    function y(P) {
      function j(J, X, Y, re, q) {
        if (typeof P != "function")
          return new m("Property `" + q + "` of component `" + Y + "` has invalid PropType notation inside arrayOf.");
        var A = J[X];
        if (!Array.isArray(A)) {
          var B = F(A);
          return new m("Invalid " + re + " `" + q + "` of type " + ("`" + B + "` supplied to `" + Y + "`, expected an array."));
        }
        for (var K = 0; K < A.length; K++) {
          var z = P(A, K, Y, re, q + "[" + K + "]", r);
          if (z instanceof Error)
            return z;
        }
        return null;
      }
      return g(j);
    }
    function E() {
      function P(j, J, X, Y, re) {
        var q = j[J];
        if (!i(q)) {
          var A = F(q);
          return new m("Invalid " + Y + " `" + re + "` of type " + ("`" + A + "` supplied to `" + X + "`, expected a single ReactElement."));
        }
        return null;
      }
      return g(P);
    }
    function C() {
      function P(j, J, X, Y, re) {
        var q = j[J];
        if (!e.isValidElementType(q)) {
          var A = F(q);
          return new m("Invalid " + Y + " `" + re + "` of type " + ("`" + A + "` supplied to `" + X + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return g(P);
    }
    function T(P) {
      function j(J, X, Y, re, q) {
        if (!(J[X] instanceof P)) {
          var A = P.name || h, B = G(J[X]);
          return new m("Invalid " + re + " `" + q + "` of type " + ("`" + B + "` supplied to `" + Y + "`, expected ") + ("instance of `" + A + "`."));
        }
        return null;
      }
      return g(j);
    }
    function R(P) {
      if (!Array.isArray(P))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? s(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : s("Invalid argument supplied to oneOf, expected an array.")), a;
      function j(J, X, Y, re, q) {
        for (var A = J[X], B = 0; B < P.length; B++)
          if (w(A, P[B]))
            return null;
        var K = JSON.stringify(P, function(ee, O) {
          var pe = H(O);
          return pe === "symbol" ? String(O) : O;
        });
        return new m("Invalid " + re + " `" + q + "` of value `" + String(A) + "` " + ("supplied to `" + Y + "`, expected one of " + K + "."));
      }
      return g(j);
    }
    function k(P) {
      function j(J, X, Y, re, q) {
        if (typeof P != "function")
          return new m("Property `" + q + "` of component `" + Y + "` has invalid PropType notation inside objectOf.");
        var A = J[X], B = F(A);
        if (B !== "object")
          return new m("Invalid " + re + " `" + q + "` of type " + ("`" + B + "` supplied to `" + Y + "`, expected an object."));
        for (var K in A)
          if (n(A, K)) {
            var z = P(A, K, Y, re, q + "." + K, r);
            if (z instanceof Error)
              return z;
          }
        return null;
      }
      return g(j);
    }
    function M(P) {
      if (!Array.isArray(P))
        return process.env.NODE_ENV !== "production" && s("Invalid argument supplied to oneOfType, expected an instance of array."), a;
      for (var j = 0; j < P.length; j++) {
        var J = P[j];
        if (typeof J != "function")
          return s(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + $(J) + " at index " + j + "."
          ), a;
      }
      function X(Y, re, q, A, B) {
        for (var K = [], z = 0; z < P.length; z++) {
          var ee = P[z], O = ee(Y, re, q, A, B, r);
          if (O == null)
            return null;
          O.data && n(O.data, "expectedType") && K.push(O.data.expectedType);
        }
        var pe = K.length > 0 ? ", expected one of type [" + K.join(", ") + "]" : "";
        return new m("Invalid " + A + " `" + B + "` supplied to " + ("`" + q + "`" + pe + "."));
      }
      return g(X);
    }
    function W() {
      function P(j, J, X, Y, re) {
        return _(j[J]) ? null : new m("Invalid " + Y + " `" + re + "` supplied to " + ("`" + X + "`, expected a ReactNode."));
      }
      return g(P);
    }
    function L(P, j, J, X, Y) {
      return new m(
        (P || "React class") + ": " + j + " type `" + J + "." + X + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + Y + "`."
      );
    }
    function D(P) {
      function j(J, X, Y, re, q) {
        var A = J[X], B = F(A);
        if (B !== "object")
          return new m("Invalid " + re + " `" + q + "` of type `" + B + "` " + ("supplied to `" + Y + "`, expected `object`."));
        for (var K in P) {
          var z = P[K];
          if (typeof z != "function")
            return L(Y, re, q, K, H(z));
          var ee = z(A, K, Y, re, q + "." + K, r);
          if (ee)
            return ee;
        }
        return null;
      }
      return g(j);
    }
    function V(P) {
      function j(J, X, Y, re, q) {
        var A = J[X], B = F(A);
        if (B !== "object")
          return new m("Invalid " + re + " `" + q + "` of type `" + B + "` " + ("supplied to `" + Y + "`, expected `object`."));
        var K = t({}, J[X], P);
        for (var z in K) {
          var ee = P[z];
          if (n(P, z) && typeof ee != "function")
            return L(Y, re, q, z, H(ee));
          if (!ee)
            return new m(
              "Invalid " + re + " `" + q + "` key `" + z + "` supplied to `" + Y + "`.\nBad object: " + JSON.stringify(J[X], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(P), null, "  ")
            );
          var O = ee(A, z, Y, re, q + "." + z, r);
          if (O)
            return O;
        }
        return null;
      }
      return g(j);
    }
    function _(P) {
      switch (typeof P) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !P;
        case "object":
          if (Array.isArray(P))
            return P.every(_);
          if (P === null || i(P))
            return !0;
          var j = p(P);
          if (j) {
            var J = j.call(P), X;
            if (j !== P.entries) {
              for (; !(X = J.next()).done; )
                if (!_(X.value))
                  return !1;
            } else
              for (; !(X = J.next()).done; ) {
                var Y = X.value;
                if (Y && !_(Y[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function U(P, j) {
      return P === "symbol" ? !0 : j ? j["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && j instanceof Symbol : !1;
    }
    function F(P) {
      var j = typeof P;
      return Array.isArray(P) ? "array" : P instanceof RegExp ? "object" : U(j, P) ? "symbol" : j;
    }
    function H(P) {
      if (typeof P > "u" || P === null)
        return "" + P;
      var j = F(P);
      if (j === "object") {
        if (P instanceof Date)
          return "date";
        if (P instanceof RegExp)
          return "regexp";
      }
      return j;
    }
    function $(P) {
      var j = H(P);
      switch (j) {
        case "array":
        case "object":
          return "an " + j;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + j;
        default:
          return j;
      }
    }
    function G(P) {
      return !P.constructor || !P.constructor.name ? h : P.constructor.name;
    }
    return v.checkPropTypes = o, v.resetWarningCache = o.resetWarningCache, v.PropTypes = v, v;
  }, an;
}
var ln, fs;
function Bc() {
  if (fs) return ln;
  fs = 1;
  var e = Qn();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, ln = function() {
    function n(a, i, l, u, f, p) {
      if (p !== e) {
        var h = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw h.name = "Invariant Violation", h;
      }
    }
    n.isRequired = n;
    function o() {
      return n;
    }
    var s = {
      array: n,
      bigint: n,
      bool: n,
      func: n,
      number: n,
      object: n,
      string: n,
      symbol: n,
      any: n,
      arrayOf: o,
      element: n,
      elementType: n,
      instanceOf: o,
      node: n,
      objectOf: o,
      oneOf: o,
      oneOfType: o,
      shape: o,
      exact: o,
      checkPropTypes: r,
      resetWarningCache: t
    };
    return s.PropTypes = s, s;
  }, ln;
}
if (process.env.NODE_ENV !== "production") {
  var Vc = Ks, Hc = !0;
  Tn.exports = zc()(Vc.isElement, Hc);
} else
  Tn.exports = Bc()();
var Nr = Tn.exports;
function qs(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) for (t = 0; t < e.length; t++) e[t] && (r = qs(e[t])) && (n && (n += " "), n += r);
  else for (t in e) e[t] && (n && (n += " "), n += t);
  return n;
}
function ps() {
  for (var e, t, r = 0, n = ""; r < arguments.length; ) (e = arguments[r++]) && (t = qs(e)) && (n && (n += " "), n += t);
  return n;
}
const Uc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clsx: ps,
  default: ps
}, Symbol.toStringTag, { value: "Module" })), Yc = /* @__PURE__ */ Dc(Uc);
var he = {}, Ye = {};
Object.defineProperty(Ye, "__esModule", {
  value: !0
});
Ye.dontSetMe = Zc;
Ye.findInArray = Xc;
Ye.int = qc;
Ye.isFunction = Kc;
Ye.isNum = Gc;
function Xc(e, t) {
  for (let r = 0, n = e.length; r < n; r++)
    if (t.apply(t, [e[r], r, e])) return e[r];
}
function Kc(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Function]";
}
function Gc(e) {
  return typeof e == "number" && !isNaN(e);
}
function qc(e) {
  return parseInt(e, 10);
}
function Zc(e, t, r) {
  if (e[t])
    return new Error("Invalid prop ".concat(t, " passed to ").concat(r, " - do not set this, set it on the child."));
}
var bt = {};
Object.defineProperty(bt, "__esModule", {
  value: !0
});
bt.browserPrefixToKey = Js;
bt.browserPrefixToStyle = Jc;
bt.default = void 0;
bt.getPrefix = Zs;
const cn = ["Moz", "Webkit", "O", "ms"];
function Zs() {
  var e;
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "transform";
  if (typeof window > "u") return "";
  const r = (e = window.document) === null || e === void 0 || (e = e.documentElement) === null || e === void 0 ? void 0 : e.style;
  if (!r || t in r) return "";
  for (let n = 0; n < cn.length; n++)
    if (Js(t, cn[n]) in r) return cn[n];
  return "";
}
function Js(e, t) {
  return t ? "".concat(t).concat(Qc(e)) : e;
}
function Jc(e, t) {
  return t ? "-".concat(t.toLowerCase(), "-").concat(e) : e;
}
function Qc(e) {
  let t = "", r = !0;
  for (let n = 0; n < e.length; n++)
    r ? (t += e[n].toUpperCase(), r = !1) : e[n] === "-" ? r = !0 : t += e[n];
  return t;
}
bt.default = Zs();
Object.defineProperty(he, "__esModule", {
  value: !0
});
he.addClassName = ta;
he.addEvent = ru;
he.addUserSelectStyles = pu;
he.createCSSTransform = cu;
he.createSVGTransform = uu;
he.getTouch = du;
he.getTouchIdentifier = fu;
he.getTranslation = eo;
he.innerHeight = au;
he.innerWidth = iu;
he.matchesSelector = ea;
he.matchesSelectorAndParentsTo = tu;
he.offsetXYFromParent = lu;
he.outerHeight = ou;
he.outerWidth = su;
he.removeClassName = ra;
he.removeEvent = nu;
he.removeUserSelectStyles = mu;
var _e = Ye, ms = eu(bt);
function Qs(e) {
  if (typeof WeakMap != "function") return null;
  var t = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap();
  return (Qs = function(n) {
    return n ? r : t;
  })(e);
}
function eu(e, t) {
  if (e && e.__esModule)
    return e;
  if (e === null || typeof e != "object" && typeof e != "function")
    return { default: e };
  var r = Qs(t);
  if (r && r.has(e))
    return r.get(e);
  var n = {}, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var s in e)
    if (s !== "default" && Object.prototype.hasOwnProperty.call(e, s)) {
      var a = o ? Object.getOwnPropertyDescriptor(e, s) : null;
      a && (a.get || a.set) ? Object.defineProperty(n, s, a) : n[s] = e[s];
    }
  return n.default = e, r && r.set(e, n), n;
}
let sr = "";
function ea(e, t) {
  return sr || (sr = (0, _e.findInArray)(["matches", "webkitMatchesSelector", "mozMatchesSelector", "msMatchesSelector", "oMatchesSelector"], function(r) {
    return (0, _e.isFunction)(e[r]);
  })), (0, _e.isFunction)(e[sr]) ? e[sr](t) : !1;
}
function tu(e, t, r) {
  let n = e;
  do {
    if (ea(n, t)) return !0;
    if (n === r) return !1;
    n = n.parentNode;
  } while (n);
  return !1;
}
function ru(e, t, r, n) {
  if (!e) return;
  const o = {
    capture: !0,
    ...n
  };
  e.addEventListener ? e.addEventListener(t, r, o) : e.attachEvent ? e.attachEvent("on" + t, r) : e["on" + t] = r;
}
function nu(e, t, r, n) {
  if (!e) return;
  const o = {
    capture: !0,
    ...n
  };
  e.removeEventListener ? e.removeEventListener(t, r, o) : e.detachEvent ? e.detachEvent("on" + t, r) : e["on" + t] = null;
}
function ou(e) {
  let t = e.clientHeight;
  const r = e.ownerDocument.defaultView.getComputedStyle(e);
  return t += (0, _e.int)(r.borderTopWidth), t += (0, _e.int)(r.borderBottomWidth), t;
}
function su(e) {
  let t = e.clientWidth;
  const r = e.ownerDocument.defaultView.getComputedStyle(e);
  return t += (0, _e.int)(r.borderLeftWidth), t += (0, _e.int)(r.borderRightWidth), t;
}
function au(e) {
  let t = e.clientHeight;
  const r = e.ownerDocument.defaultView.getComputedStyle(e);
  return t -= (0, _e.int)(r.paddingTop), t -= (0, _e.int)(r.paddingBottom), t;
}
function iu(e) {
  let t = e.clientWidth;
  const r = e.ownerDocument.defaultView.getComputedStyle(e);
  return t -= (0, _e.int)(r.paddingLeft), t -= (0, _e.int)(r.paddingRight), t;
}
function lu(e, t, r) {
  const o = t === t.ownerDocument.body ? {
    left: 0,
    top: 0
  } : t.getBoundingClientRect(), s = (e.clientX + t.scrollLeft - o.left) / r, a = (e.clientY + t.scrollTop - o.top) / r;
  return {
    x: s,
    y: a
  };
}
function cu(e, t) {
  const r = eo(e, t, "px");
  return {
    [(0, ms.browserPrefixToKey)("transform", ms.default)]: r
  };
}
function uu(e, t) {
  return eo(e, t, "");
}
function eo(e, t, r) {
  let {
    x: n,
    y: o
  } = e, s = "translate(".concat(n).concat(r, ",").concat(o).concat(r, ")");
  if (t) {
    const a = "".concat(typeof t.x == "string" ? t.x : t.x + r), i = "".concat(typeof t.y == "string" ? t.y : t.y + r);
    s = "translate(".concat(a, ", ").concat(i, ")") + s;
  }
  return s;
}
function du(e, t) {
  return e.targetTouches && (0, _e.findInArray)(e.targetTouches, (r) => t === r.identifier) || e.changedTouches && (0, _e.findInArray)(e.changedTouches, (r) => t === r.identifier);
}
function fu(e) {
  if (e.targetTouches && e.targetTouches[0]) return e.targetTouches[0].identifier;
  if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0].identifier;
}
function pu(e) {
  if (!e) return;
  let t = e.getElementById("react-draggable-style-el");
  t || (t = e.createElement("style"), t.type = "text/css", t.id = "react-draggable-style-el", t.innerHTML = `.react-draggable-transparent-selection *::-moz-selection {all: inherit;}
`, t.innerHTML += `.react-draggable-transparent-selection *::selection {all: inherit;}
`, e.getElementsByTagName("head")[0].appendChild(t)), e.body && ta(e.body, "react-draggable-transparent-selection");
}
function mu(e) {
  if (e)
    try {
      if (e.body && ra(e.body, "react-draggable-transparent-selection"), e.selection)
        e.selection.empty();
      else {
        const t = (e.defaultView || window).getSelection();
        t && t.type !== "Caret" && t.removeAllRanges();
      }
    } catch {
    }
}
function ta(e, t) {
  e.classList ? e.classList.add(t) : e.className.match(new RegExp("(?:^|\\s)".concat(t, "(?!\\S)"))) || (e.className += " ".concat(t));
}
function ra(e, t) {
  e.classList ? e.classList.remove(t) : e.className = e.className.replace(new RegExp("(?:^|\\s)".concat(t, "(?!\\S)"), "g"), "");
}
var Xe = {};
Object.defineProperty(Xe, "__esModule", {
  value: !0
});
Xe.canDragX = vu;
Xe.canDragY = bu;
Xe.createCoreData = xu;
Xe.createDraggableData = wu;
Xe.getBoundPosition = hu;
Xe.getControlPosition = yu;
Xe.snapToGrid = gu;
var Oe = Ye, Et = he;
function hu(e, t, r) {
  if (!e.props.bounds) return [t, r];
  let {
    bounds: n
  } = e.props;
  n = typeof n == "string" ? n : Su(n);
  const o = to(e);
  if (typeof n == "string") {
    const {
      ownerDocument: s
    } = o, a = s.defaultView;
    let i;
    if (n === "parent" ? i = o.parentNode : i = s.querySelector(n), !(i instanceof a.HTMLElement))
      throw new Error('Bounds selector "' + n + '" could not find an element.');
    const l = i, u = a.getComputedStyle(o), f = a.getComputedStyle(l);
    n = {
      left: -o.offsetLeft + (0, Oe.int)(f.paddingLeft) + (0, Oe.int)(u.marginLeft),
      top: -o.offsetTop + (0, Oe.int)(f.paddingTop) + (0, Oe.int)(u.marginTop),
      right: (0, Et.innerWidth)(l) - (0, Et.outerWidth)(o) - o.offsetLeft + (0, Oe.int)(f.paddingRight) - (0, Oe.int)(u.marginRight),
      bottom: (0, Et.innerHeight)(l) - (0, Et.outerHeight)(o) - o.offsetTop + (0, Oe.int)(f.paddingBottom) - (0, Oe.int)(u.marginBottom)
    };
  }
  return (0, Oe.isNum)(n.right) && (t = Math.min(t, n.right)), (0, Oe.isNum)(n.bottom) && (r = Math.min(r, n.bottom)), (0, Oe.isNum)(n.left) && (t = Math.max(t, n.left)), (0, Oe.isNum)(n.top) && (r = Math.max(r, n.top)), [t, r];
}
function gu(e, t, r) {
  const n = Math.round(t / e[0]) * e[0], o = Math.round(r / e[1]) * e[1];
  return [n, o];
}
function vu(e) {
  return e.props.axis === "both" || e.props.axis === "x";
}
function bu(e) {
  return e.props.axis === "both" || e.props.axis === "y";
}
function yu(e, t, r) {
  const n = typeof t == "number" ? (0, Et.getTouch)(e, t) : null;
  if (typeof t == "number" && !n) return null;
  const o = to(r), s = r.props.offsetParent || o.offsetParent || o.ownerDocument.body;
  return (0, Et.offsetXYFromParent)(n || e, s, r.props.scale);
}
function xu(e, t, r) {
  const n = !(0, Oe.isNum)(e.lastX), o = to(e);
  return n ? {
    node: o,
    deltaX: 0,
    deltaY: 0,
    lastX: t,
    lastY: r,
    x: t,
    y: r
  } : {
    node: o,
    deltaX: t - e.lastX,
    deltaY: r - e.lastY,
    lastX: e.lastX,
    lastY: e.lastY,
    x: t,
    y: r
  };
}
function wu(e, t) {
  const r = e.props.scale;
  return {
    node: t.node,
    x: e.state.x + t.deltaX / r,
    y: e.state.y + t.deltaY / r,
    deltaX: t.deltaX / r,
    deltaY: t.deltaY / r,
    lastX: e.state.x,
    lastY: e.state.y
  };
}
function Su(e) {
  return {
    left: e.left,
    top: e.top,
    right: e.right,
    bottom: e.bottom
  };
}
function to(e) {
  const t = e.findDOMNode();
  if (!t)
    throw new Error("<DraggableCore>: Unmounted during event!");
  return t;
}
var _r = {}, jr = {};
Object.defineProperty(jr, "__esModule", {
  value: !0
});
jr.default = Cu;
function Cu() {
}
Object.defineProperty(_r, "__esModule", {
  value: !0
});
_r.default = void 0;
var un = Ru(Pe), Re = ro(Nr), Eu = ro(Zn), we = he, rt = Xe, dn = Ye, Bt = ro(jr);
function ro(e) {
  return e && e.__esModule ? e : { default: e };
}
function na(e) {
  if (typeof WeakMap != "function") return null;
  var t = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap();
  return (na = function(n) {
    return n ? r : t;
  })(e);
}
function Ru(e, t) {
  if (e && e.__esModule)
    return e;
  if (e === null || typeof e != "object" && typeof e != "function")
    return { default: e };
  var r = na(t);
  if (r && r.has(e))
    return r.get(e);
  var n = {}, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var s in e)
    if (s !== "default" && Object.prototype.hasOwnProperty.call(e, s)) {
      var a = o ? Object.getOwnPropertyDescriptor(e, s) : null;
      a && (a.get || a.set) ? Object.defineProperty(n, s, a) : n[s] = e[s];
    }
  return n.default = e, r && r.set(e, n), n;
}
function Ce(e, t, r) {
  return t = Pu(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Pu(e) {
  var t = Tu(e, "string");
  return typeof t == "symbol" ? t : String(t);
}
function Tu(e, t) {
  if (typeof e != "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
const Le = {
  touch: {
    start: "touchstart",
    move: "touchmove",
    stop: "touchend"
  },
  mouse: {
    start: "mousedown",
    move: "mousemove",
    stop: "mouseup"
  }
};
let nt = Le.mouse, Ar = class extends un.Component {
  constructor() {
    super(...arguments), Ce(this, "dragging", !1), Ce(this, "lastX", NaN), Ce(this, "lastY", NaN), Ce(this, "touchIdentifier", null), Ce(this, "mounted", !1), Ce(this, "handleDragStart", (t) => {
      if (this.props.onMouseDown(t), !this.props.allowAnyClick && typeof t.button == "number" && t.button !== 0) return !1;
      const r = this.findDOMNode();
      if (!r || !r.ownerDocument || !r.ownerDocument.body)
        throw new Error("<DraggableCore> not mounted on DragStart!");
      const {
        ownerDocument: n
      } = r;
      if (this.props.disabled || !(t.target instanceof n.defaultView.Node) || this.props.handle && !(0, we.matchesSelectorAndParentsTo)(t.target, this.props.handle, r) || this.props.cancel && (0, we.matchesSelectorAndParentsTo)(t.target, this.props.cancel, r))
        return;
      t.type === "touchstart" && t.preventDefault();
      const o = (0, we.getTouchIdentifier)(t);
      this.touchIdentifier = o;
      const s = (0, rt.getControlPosition)(t, o, this);
      if (s == null) return;
      const {
        x: a,
        y: i
      } = s, l = (0, rt.createCoreData)(this, a, i);
      (0, Bt.default)("DraggableCore: handleDragStart: %j", l), (0, Bt.default)("calling", this.props.onStart), !(this.props.onStart(t, l) === !1 || this.mounted === !1) && (this.props.enableUserSelectHack && (0, we.addUserSelectStyles)(n), this.dragging = !0, this.lastX = a, this.lastY = i, (0, we.addEvent)(n, nt.move, this.handleDrag), (0, we.addEvent)(n, nt.stop, this.handleDragStop));
    }), Ce(this, "handleDrag", (t) => {
      const r = (0, rt.getControlPosition)(t, this.touchIdentifier, this);
      if (r == null) return;
      let {
        x: n,
        y: o
      } = r;
      if (Array.isArray(this.props.grid)) {
        let i = n - this.lastX, l = o - this.lastY;
        if ([i, l] = (0, rt.snapToGrid)(this.props.grid, i, l), !i && !l) return;
        n = this.lastX + i, o = this.lastY + l;
      }
      const s = (0, rt.createCoreData)(this, n, o);
      if ((0, Bt.default)("DraggableCore: handleDrag: %j", s), this.props.onDrag(t, s) === !1 || this.mounted === !1) {
        try {
          this.handleDragStop(new MouseEvent("mouseup"));
        } catch {
          const l = document.createEvent("MouseEvents");
          l.initMouseEvent("mouseup", !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), this.handleDragStop(l);
        }
        return;
      }
      this.lastX = n, this.lastY = o;
    }), Ce(this, "handleDragStop", (t) => {
      if (!this.dragging) return;
      const r = (0, rt.getControlPosition)(t, this.touchIdentifier, this);
      if (r == null) return;
      let {
        x: n,
        y: o
      } = r;
      if (Array.isArray(this.props.grid)) {
        let l = n - this.lastX || 0, u = o - this.lastY || 0;
        [l, u] = (0, rt.snapToGrid)(this.props.grid, l, u), n = this.lastX + l, o = this.lastY + u;
      }
      const s = (0, rt.createCoreData)(this, n, o);
      if (this.props.onStop(t, s) === !1 || this.mounted === !1) return !1;
      const i = this.findDOMNode();
      i && this.props.enableUserSelectHack && (0, we.removeUserSelectStyles)(i.ownerDocument), (0, Bt.default)("DraggableCore: handleDragStop: %j", s), this.dragging = !1, this.lastX = NaN, this.lastY = NaN, i && ((0, Bt.default)("DraggableCore: Removing handlers"), (0, we.removeEvent)(i.ownerDocument, nt.move, this.handleDrag), (0, we.removeEvent)(i.ownerDocument, nt.stop, this.handleDragStop));
    }), Ce(this, "onMouseDown", (t) => (nt = Le.mouse, this.handleDragStart(t))), Ce(this, "onMouseUp", (t) => (nt = Le.mouse, this.handleDragStop(t))), Ce(this, "onTouchStart", (t) => (nt = Le.touch, this.handleDragStart(t))), Ce(this, "onTouchEnd", (t) => (nt = Le.touch, this.handleDragStop(t)));
  }
  componentDidMount() {
    this.mounted = !0;
    const t = this.findDOMNode();
    t && (0, we.addEvent)(t, Le.touch.start, this.onTouchStart, {
      passive: !1
    });
  }
  componentWillUnmount() {
    this.mounted = !1;
    const t = this.findDOMNode();
    if (t) {
      const {
        ownerDocument: r
      } = t;
      (0, we.removeEvent)(r, Le.mouse.move, this.handleDrag), (0, we.removeEvent)(r, Le.touch.move, this.handleDrag), (0, we.removeEvent)(r, Le.mouse.stop, this.handleDragStop), (0, we.removeEvent)(r, Le.touch.stop, this.handleDragStop), (0, we.removeEvent)(t, Le.touch.start, this.onTouchStart, {
        passive: !1
      }), this.props.enableUserSelectHack && (0, we.removeUserSelectStyles)(r);
    }
  }
  // React Strict Mode compatibility: if `nodeRef` is passed, we will use it instead of trying to find
  // the underlying DOM node ourselves. See the README for more information.
  findDOMNode() {
    var t, r;
    return (t = this.props) !== null && t !== void 0 && t.nodeRef ? (r = this.props) === null || r === void 0 || (r = r.nodeRef) === null || r === void 0 ? void 0 : r.current : Eu.default.findDOMNode(this);
  }
  render() {
    return /* @__PURE__ */ un.cloneElement(un.Children.only(this.props.children), {
      // Note: mouseMove handler is attached to document so it will still function
      // when the user drags quickly and leaves the bounds of the element.
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      // onTouchStart is added on `componentDidMount` so they can be added with
      // {passive: false}, which allows it to cancel. See
      // https://developers.google.com/web/updates/2017/01/scrolling-intervention
      onTouchEnd: this.onTouchEnd
    });
  }
};
_r.default = Ar;
Ce(Ar, "displayName", "DraggableCore");
Ce(Ar, "propTypes", {
  /**
   * `allowAnyClick` allows dragging using any mouse button.
   * By default, we only accept the left button.
   *
   * Defaults to `false`.
   */
  allowAnyClick: Re.default.bool,
  children: Re.default.node.isRequired,
  /**
   * `disabled`, if true, stops the <Draggable> from dragging. All handlers,
   * with the exception of `onMouseDown`, will not fire.
   */
  disabled: Re.default.bool,
  /**
   * By default, we add 'user-select:none' attributes to the document body
   * to prevent ugly text selection during drag. If this is causing problems
   * for your app, set this to `false`.
   */
  enableUserSelectHack: Re.default.bool,
  /**
   * `offsetParent`, if set, uses the passed DOM node to compute drag offsets
   * instead of using the parent node.
   */
  offsetParent: function(e, t) {
    if (e[t] && e[t].nodeType !== 1)
      throw new Error("Draggable's offsetParent must be a DOM Node.");
  },
  /**
   * `grid` specifies the x and y that dragging should snap to.
   */
  grid: Re.default.arrayOf(Re.default.number),
  /**
   * `handle` specifies a selector to be used as the handle that initiates drag.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *         return (
   *            <Draggable handle=".handle">
   *              <div>
   *                  <div className="handle">Click me to drag</div>
   *                  <div>This is some other content</div>
   *              </div>
   *           </Draggable>
   *         );
   *       }
   *   });
   * ```
   */
  handle: Re.default.string,
  /**
   * `cancel` specifies a selector to be used to prevent drag initialization.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *           return(
   *               <Draggable cancel=".cancel">
   *                   <div>
   *                     <div className="cancel">You can't drag from here</div>
   *                     <div>Dragging here works fine</div>
   *                   </div>
   *               </Draggable>
   *           );
   *       }
   *   });
   * ```
   */
  cancel: Re.default.string,
  /* If running in React Strict mode, ReactDOM.findDOMNode() is deprecated.
   * Unfortunately, in order for <Draggable> to work properly, we need raw access
   * to the underlying DOM node. If you want to avoid the warning, pass a `nodeRef`
   * as in this example:
   *
   * function MyComponent() {
   *   const nodeRef = React.useRef(null);
   *   return (
   *     <Draggable nodeRef={nodeRef}>
   *       <div ref={nodeRef}>Example Target</div>
   *     </Draggable>
   *   );
   * }
   *
   * This can be used for arbitrarily nested components, so long as the ref ends up
   * pointing to the actual child DOM node and not a custom component.
   */
  nodeRef: Re.default.object,
  /**
   * Called when dragging starts.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onStart: Re.default.func,
  /**
   * Called while dragging.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onDrag: Re.default.func,
  /**
   * Called when dragging stops.
   * If this function returns the boolean false, the drag will remain active.
   */
  onStop: Re.default.func,
  /**
   * A workaround option which can be passed if onMouseDown needs to be accessed,
   * since it'll always be blocked (as there is internal use of onMouseDown)
   */
  onMouseDown: Re.default.func,
  /**
   * `scale`, if set, applies scaling while dragging an element
   */
  scale: Re.default.number,
  /**
   * These properties should be defined on the child, not here.
   */
  className: dn.dontSetMe,
  style: dn.dontSetMe,
  transform: dn.dontSetMe
});
Ce(Ar, "defaultProps", {
  allowAnyClick: !1,
  // by default only accept left click
  disabled: !1,
  enableUserSelectHack: !0,
  onStart: function() {
  },
  onDrag: function() {
  },
  onStop: function() {
  },
  onMouseDown: function() {
  },
  scale: 1
});
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), Object.defineProperty(e, "DraggableCore", {
    enumerable: !0,
    get: function() {
      return l.default;
    }
  }), e.default = void 0;
  var t = h(Pe), r = f(Nr), n = f(Zn), o = f(Yc), s = he, a = Xe, i = Ye, l = f(_r), u = f(jr);
  function f(b) {
    return b && b.__esModule ? b : { default: b };
  }
  function p(b) {
    if (typeof WeakMap != "function") return null;
    var y = /* @__PURE__ */ new WeakMap(), E = /* @__PURE__ */ new WeakMap();
    return (p = function(C) {
      return C ? E : y;
    })(b);
  }
  function h(b, y) {
    if (b && b.__esModule)
      return b;
    if (b === null || typeof b != "object" && typeof b != "function")
      return { default: b };
    var E = p(y);
    if (E && E.has(b))
      return E.get(b);
    var C = {}, T = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var R in b)
      if (R !== "default" && Object.prototype.hasOwnProperty.call(b, R)) {
        var k = T ? Object.getOwnPropertyDescriptor(b, R) : null;
        k && (k.get || k.set) ? Object.defineProperty(C, R, k) : C[R] = b[R];
      }
    return C.default = b, E && E.set(b, C), C;
  }
  function v() {
    return v = Object.assign ? Object.assign.bind() : function(b) {
      for (var y = 1; y < arguments.length; y++) {
        var E = arguments[y];
        for (var C in E)
          Object.prototype.hasOwnProperty.call(E, C) && (b[C] = E[C]);
      }
      return b;
    }, v.apply(this, arguments);
  }
  function w(b, y, E) {
    return y = m(y), y in b ? Object.defineProperty(b, y, { value: E, enumerable: !0, configurable: !0, writable: !0 }) : b[y] = E, b;
  }
  function m(b) {
    var y = g(b, "string");
    return typeof y == "symbol" ? y : String(y);
  }
  function g(b, y) {
    if (typeof b != "object" || b === null) return b;
    var E = b[Symbol.toPrimitive];
    if (E !== void 0) {
      var C = E.call(b, y || "default");
      if (typeof C != "object") return C;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (y === "string" ? String : Number)(b);
  }
  class S extends t.Component {
    // React 16.3+
    // Arity (props, state)
    static getDerivedStateFromProps(y, E) {
      let {
        position: C
      } = y, {
        prevPropsPosition: T
      } = E;
      return C && (!T || C.x !== T.x || C.y !== T.y) ? ((0, u.default)("Draggable: getDerivedStateFromProps %j", {
        position: C,
        prevPropsPosition: T
      }), {
        x: C.x,
        y: C.y,
        prevPropsPosition: {
          ...C
        }
      }) : null;
    }
    constructor(y) {
      super(y), w(this, "onDragStart", (E, C) => {
        if ((0, u.default)("Draggable: onDragStart: %j", C), this.props.onStart(E, (0, a.createDraggableData)(this, C)) === !1) return !1;
        this.setState({
          dragging: !0,
          dragged: !0
        });
      }), w(this, "onDrag", (E, C) => {
        if (!this.state.dragging) return !1;
        (0, u.default)("Draggable: onDrag: %j", C);
        const T = (0, a.createDraggableData)(this, C), R = {
          x: T.x,
          y: T.y,
          slackX: 0,
          slackY: 0
        };
        if (this.props.bounds) {
          const {
            x: M,
            y: W
          } = R;
          R.x += this.state.slackX, R.y += this.state.slackY;
          const [L, D] = (0, a.getBoundPosition)(this, R.x, R.y);
          R.x = L, R.y = D, R.slackX = this.state.slackX + (M - R.x), R.slackY = this.state.slackY + (W - R.y), T.x = R.x, T.y = R.y, T.deltaX = R.x - this.state.x, T.deltaY = R.y - this.state.y;
        }
        if (this.props.onDrag(E, T) === !1) return !1;
        this.setState(R);
      }), w(this, "onDragStop", (E, C) => {
        if (!this.state.dragging || this.props.onStop(E, (0, a.createDraggableData)(this, C)) === !1) return !1;
        (0, u.default)("Draggable: onDragStop: %j", C);
        const R = {
          dragging: !1,
          slackX: 0,
          slackY: 0
        };
        if (!!this.props.position) {
          const {
            x: M,
            y: W
          } = this.props.position;
          R.x = M, R.y = W;
        }
        this.setState(R);
      }), this.state = {
        // Whether or not we are currently dragging.
        dragging: !1,
        // Whether or not we have been dragged before.
        dragged: !1,
        // Current transform x and y.
        x: y.position ? y.position.x : y.defaultPosition.x,
        y: y.position ? y.position.y : y.defaultPosition.y,
        prevPropsPosition: {
          ...y.position
        },
        // Used for compensating for out-of-bounds drags
        slackX: 0,
        slackY: 0,
        // Can only determine if SVG after mounting
        isElementSVG: !1
      }, y.position && !(y.onDrag || y.onStop) && console.warn("A `position` was applied to this <Draggable>, without drag handlers. This will make this component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the `position` of this element.");
    }
    componentDidMount() {
      typeof window.SVGElement < "u" && this.findDOMNode() instanceof window.SVGElement && this.setState({
        isElementSVG: !0
      });
    }
    componentWillUnmount() {
      this.setState({
        dragging: !1
      });
    }
    // React Strict Mode compatibility: if `nodeRef` is passed, we will use it instead of trying to find
    // the underlying DOM node ourselves. See the README for more information.
    findDOMNode() {
      var y, E;
      return (y = (E = this.props) === null || E === void 0 || (E = E.nodeRef) === null || E === void 0 ? void 0 : E.current) !== null && y !== void 0 ? y : n.default.findDOMNode(this);
    }
    render() {
      const {
        axis: y,
        bounds: E,
        children: C,
        defaultPosition: T,
        defaultClassName: R,
        defaultClassNameDragging: k,
        defaultClassNameDragged: M,
        position: W,
        positionOffset: L,
        scale: D,
        ...V
      } = this.props;
      let _ = {}, U = null;
      const H = !!!W || this.state.dragging, $ = W || T, G = {
        // Set left if horizontal drag is enabled
        x: (0, a.canDragX)(this) && H ? this.state.x : $.x,
        // Set top if vertical drag is enabled
        y: (0, a.canDragY)(this) && H ? this.state.y : $.y
      };
      this.state.isElementSVG ? U = (0, s.createSVGTransform)(G, L) : _ = (0, s.createCSSTransform)(G, L);
      const P = (0, o.default)(C.props.className || "", R, {
        [k]: this.state.dragging,
        [M]: this.state.dragged
      });
      return /* @__PURE__ */ t.createElement(l.default, v({}, V, {
        onStart: this.onDragStart,
        onDrag: this.onDrag,
        onStop: this.onDragStop
      }), /* @__PURE__ */ t.cloneElement(t.Children.only(C), {
        className: P,
        style: {
          ...C.props.style,
          ..._
        },
        transform: U
      }));
    }
  }
  e.default = S, w(S, "displayName", "Draggable"), w(S, "propTypes", {
    // Accepts all props <DraggableCore> accepts.
    ...l.default.propTypes,
    /**
     * `axis` determines which axis the draggable can move.
     *
     *  Note that all callbacks will still return data as normal. This only
     *  controls flushing to the DOM.
     *
     * 'both' allows movement horizontally and vertically.
     * 'x' limits movement to horizontal axis.
     * 'y' limits movement to vertical axis.
     * 'none' limits all movement.
     *
     * Defaults to 'both'.
     */
    axis: r.default.oneOf(["both", "x", "y", "none"]),
    /**
     * `bounds` determines the range of movement available to the element.
     * Available values are:
     *
     * 'parent' restricts movement within the Draggable's parent node.
     *
     * Alternatively, pass an object with the following properties, all of which are optional:
     *
     * {left: LEFT_BOUND, right: RIGHT_BOUND, bottom: BOTTOM_BOUND, top: TOP_BOUND}
     *
     * All values are in px.
     *
     * Example:
     *
     * ```jsx
     *   let App = React.createClass({
     *       render: function () {
     *         return (
     *            <Draggable bounds={{right: 300, bottom: 300}}>
     *              <div>Content</div>
     *           </Draggable>
     *         );
     *       }
     *   });
     * ```
     */
    bounds: r.default.oneOfType([r.default.shape({
      left: r.default.number,
      right: r.default.number,
      top: r.default.number,
      bottom: r.default.number
    }), r.default.string, r.default.oneOf([!1])]),
    defaultClassName: r.default.string,
    defaultClassNameDragging: r.default.string,
    defaultClassNameDragged: r.default.string,
    /**
     * `defaultPosition` specifies the x and y that the dragged item should start at
     *
     * Example:
     *
     * ```jsx
     *      let App = React.createClass({
     *          render: function () {
     *              return (
     *                  <Draggable defaultPosition={{x: 25, y: 25}}>
     *                      <div>I start with transformX: 25px and transformY: 25px;</div>
     *                  </Draggable>
     *              );
     *          }
     *      });
     * ```
     */
    defaultPosition: r.default.shape({
      x: r.default.number,
      y: r.default.number
    }),
    positionOffset: r.default.shape({
      x: r.default.oneOfType([r.default.number, r.default.string]),
      y: r.default.oneOfType([r.default.number, r.default.string])
    }),
    /**
     * `position`, if present, defines the current position of the element.
     *
     *  This is similar to how form elements in React work - if no `position` is supplied, the component
     *  is uncontrolled.
     *
     * Example:
     *
     * ```jsx
     *      let App = React.createClass({
     *          render: function () {
     *              return (
     *                  <Draggable position={{x: 25, y: 25}}>
     *                      <div>I start with transformX: 25px and transformY: 25px;</div>
     *                  </Draggable>
     *              );
     *          }
     *      });
     * ```
     */
    position: r.default.shape({
      x: r.default.number,
      y: r.default.number
    }),
    /**
     * These properties should be defined on the child, not here.
     */
    className: i.dontSetMe,
    style: i.dontSetMe,
    transform: i.dontSetMe
  }), w(S, "defaultProps", {
    ...l.default.defaultProps,
    axis: "both",
    bounds: !1,
    defaultClassName: "react-draggable",
    defaultClassNameDragging: "react-draggable-dragging",
    defaultClassNameDragged: "react-draggable-dragged",
    defaultPosition: {
      x: 0,
      y: 0
    },
    scale: 1
  });
})(Xs);
const {
  default: oa,
  DraggableCore: Ou
} = Xs;
Or.exports = oa;
Or.exports.default = oa;
Or.exports.DraggableCore = Ou;
var Nu = Or.exports, no = {};
no.__esModule = !0;
no.cloneElement = ku;
var _u = ju(Pe);
function ju(e) {
  return e && e.__esModule ? e : { default: e };
}
function hs(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function gs(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? hs(Object(r), !0).forEach(function(n) {
      Au(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : hs(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Au(e, t, r) {
  return t = Du(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Du(e) {
  var t = Mu(e, "string");
  return typeof t == "symbol" ? t : String(t);
}
function Mu(e, t) {
  if (typeof e != "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function ku(e, t) {
  return t.style && e.props.style && (t.style = gs(gs({}, e.props.style), t.style)), t.className && e.props.className && (t.className = e.props.className + " " + t.className), /* @__PURE__ */ _u.default.cloneElement(e, t);
}
var Jt = {};
Jt.__esModule = !0;
Jt.resizableProps = void 0;
var ne = Iu(Nr);
function Iu(e) {
  return e && e.__esModule ? e : { default: e };
}
var Lu = {
  /*
  * Restricts resizing to a particular axis (default: 'both')
  * 'both' - allows resizing by width or height
  * 'x' - only allows the width to be changed
  * 'y' - only allows the height to be changed
  * 'none' - disables resizing altogether
  * */
  axis: ne.default.oneOf(["both", "x", "y", "none"]),
  className: ne.default.string,
  /*
  * Require that one and only one child be present.
  * */
  children: ne.default.element.isRequired,
  /*
  * These will be passed wholesale to react-draggable's DraggableCore
  * */
  draggableOpts: ne.default.shape({
    allowAnyClick: ne.default.bool,
    cancel: ne.default.string,
    children: ne.default.node,
    disabled: ne.default.bool,
    enableUserSelectHack: ne.default.bool,
    offsetParent: ne.default.node,
    grid: ne.default.arrayOf(ne.default.number),
    handle: ne.default.string,
    nodeRef: ne.default.object,
    onStart: ne.default.func,
    onDrag: ne.default.func,
    onStop: ne.default.func,
    onMouseDown: ne.default.func,
    scale: ne.default.number
  }),
  /*
  * Initial height
  * */
  height: function() {
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
      r[n] = arguments[n];
    var o = r[0];
    if (o.axis === "both" || o.axis === "y") {
      var s;
      return (s = ne.default.number).isRequired.apply(s, r);
    }
    return ne.default.number.apply(ne.default, r);
  },
  /*
  * Customize cursor resize handle
  * */
  handle: ne.default.oneOfType([ne.default.node, ne.default.func]),
  /*
  * If you change this, be sure to update your css
  * */
  handleSize: ne.default.arrayOf(ne.default.number),
  lockAspectRatio: ne.default.bool,
  /*
  * Max X & Y measure
  * */
  maxConstraints: ne.default.arrayOf(ne.default.number),
  /*
  * Min X & Y measure
  * */
  minConstraints: ne.default.arrayOf(ne.default.number),
  /*
  * Called on stop resize event
  * */
  onResizeStop: ne.default.func,
  /*
  * Called on start resize event
  * */
  onResizeStart: ne.default.func,
  /*
  * Called on resize event
  * */
  onResize: ne.default.func,
  /*
  * Defines which resize handles should be rendered (default: 'se')
  * 's' - South handle (bottom-center)
  * 'w' - West handle (left-center)
  * 'e' - East handle (right-center)
  * 'n' - North handle (top-center)
  * 'sw' - Southwest handle (bottom-left)
  * 'nw' - Northwest handle (top-left)
  * 'se' - Southeast handle (bottom-right)
  * 'ne' - Northeast handle (top-center)
  * */
  resizeHandles: ne.default.arrayOf(ne.default.oneOf(["s", "w", "e", "n", "sw", "nw", "se", "ne"])),
  /*
  * If `transform: scale(n)` is set on the parent, this should be set to `n`.
  * */
  transformScale: ne.default.number,
  /*
   * Initial width
   */
  width: function() {
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
      r[n] = arguments[n];
    var o = r[0];
    if (o.axis === "both" || o.axis === "x") {
      var s;
      return (s = ne.default.number).isRequired.apply(s, r);
    }
    return ne.default.number.apply(ne.default, r);
  }
};
Jt.resizableProps = Lu;
Zt.__esModule = !0;
Zt.default = void 0;
var Vt = Bu(Pe), $u = Nu, Fu = no, Wu = Jt, zu = ["children", "className", "draggableOpts", "width", "height", "handle", "handleSize", "lockAspectRatio", "axis", "minConstraints", "maxConstraints", "onResize", "onResizeStop", "onResizeStart", "resizeHandles", "transformScale"];
function sa(e) {
  if (typeof WeakMap != "function") return null;
  var t = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap();
  return (sa = function(o) {
    return o ? r : t;
  })(e);
}
function Bu(e, t) {
  if (e && e.__esModule)
    return e;
  if (e === null || typeof e != "object" && typeof e != "function")
    return { default: e };
  var r = sa(t);
  if (r && r.has(e))
    return r.get(e);
  var n = {}, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var s in e)
    if (s !== "default" && Object.prototype.hasOwnProperty.call(e, s)) {
      var a = o ? Object.getOwnPropertyDescriptor(e, s) : null;
      a && (a.get || a.set) ? Object.defineProperty(n, s, a) : n[s] = e[s];
    }
  return n.default = e, r && r.set(e, n), n;
}
function Nn() {
  return Nn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Nn.apply(this, arguments);
}
function Vu(e, t) {
  if (e == null) return {};
  var r = {}, n = Object.keys(e), o, s;
  for (s = 0; s < n.length; s++)
    o = n[s], !(t.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
function vs(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function fn(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? vs(Object(r), !0).forEach(function(n) {
      Hu(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : vs(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Hu(e, t, r) {
  return t = Uu(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Uu(e) {
  var t = Yu(e, "string");
  return typeof t == "symbol" ? t : String(t);
}
function Yu(e, t) {
  if (typeof e != "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Xu(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, _n(e, t);
}
function _n(e, t) {
  return _n = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, o) {
    return n.__proto__ = o, n;
  }, _n(e, t);
}
var oo = /* @__PURE__ */ function(e) {
  Xu(t, e);
  function t() {
    for (var n, o = arguments.length, s = new Array(o), a = 0; a < o; a++)
      s[a] = arguments[a];
    return n = e.call.apply(e, [this].concat(s)) || this, n.handleRefs = {}, n.lastHandleRect = null, n.slack = null, n;
  }
  var r = t.prototype;
  return r.componentWillUnmount = function() {
    this.resetData();
  }, r.resetData = function() {
    this.lastHandleRect = this.slack = null;
  }, r.runConstraints = function(o, s) {
    var a = this.props, i = a.minConstraints, l = a.maxConstraints, u = a.lockAspectRatio;
    if (!i && !l && !u) return [o, s];
    if (u) {
      var f = this.props.width / this.props.height, p = o - this.props.width, h = s - this.props.height;
      Math.abs(p) > Math.abs(h * f) ? s = o / f : o = s * f;
    }
    var v = o, w = s, m = this.slack || [0, 0], g = m[0], S = m[1];
    return o += g, s += S, i && (o = Math.max(i[0], o), s = Math.max(i[1], s)), l && (o = Math.min(l[0], o), s = Math.min(l[1], s)), this.slack = [g + (v - o), S + (w - s)], [o, s];
  }, r.resizeHandler = function(o, s) {
    var a = this;
    return function(i, l) {
      var u = l.node, f = l.deltaX, p = l.deltaY;
      o === "onResizeStart" && a.resetData();
      var h = (a.props.axis === "both" || a.props.axis === "x") && s !== "n" && s !== "s", v = (a.props.axis === "both" || a.props.axis === "y") && s !== "e" && s !== "w";
      if (!(!h && !v)) {
        var w = s[0], m = s[s.length - 1], g = u.getBoundingClientRect();
        if (a.lastHandleRect != null) {
          if (m === "w") {
            var S = g.left - a.lastHandleRect.left;
            f += S;
          }
          if (w === "n") {
            var b = g.top - a.lastHandleRect.top;
            p += b;
          }
        }
        a.lastHandleRect = g, m === "w" && (f = -f), w === "n" && (p = -p);
        var y = a.props.width + (h ? f / a.props.transformScale : 0), E = a.props.height + (v ? p / a.props.transformScale : 0), C = a.runConstraints(y, E);
        y = C[0], E = C[1];
        var T = y !== a.props.width || E !== a.props.height, R = typeof a.props[o] == "function" ? a.props[o] : null, k = o === "onResize" && !T;
        R && !k && (i.persist == null || i.persist(), R(i, {
          node: u,
          size: {
            width: y,
            height: E
          },
          handle: s
        })), o === "onResizeStop" && a.resetData();
      }
    };
  }, r.renderResizeHandle = function(o, s) {
    var a = this.props.handle;
    if (!a)
      return /* @__PURE__ */ Vt.createElement("span", {
        className: "react-resizable-handle react-resizable-handle-" + o,
        ref: s
      });
    if (typeof a == "function")
      return a(o, s);
    var i = typeof a.type == "string", l = fn({
      ref: s
    }, i ? {} : {
      handleAxis: o
    });
    return /* @__PURE__ */ Vt.cloneElement(a, l);
  }, r.render = function() {
    var o = this, s = this.props, a = s.children, i = s.className, l = s.draggableOpts;
    s.width, s.height, s.handle, s.handleSize, s.lockAspectRatio, s.axis, s.minConstraints, s.maxConstraints, s.onResize, s.onResizeStop, s.onResizeStart;
    var u = s.resizeHandles;
    s.transformScale;
    var f = Vu(s, zu);
    return (0, Fu.cloneElement)(a, fn(fn({}, f), {}, {
      className: (i ? i + " " : "") + "react-resizable",
      children: [].concat(a.props.children, u.map(function(p) {
        var h, v = (h = o.handleRefs[p]) != null ? h : o.handleRefs[p] = /* @__PURE__ */ Vt.createRef();
        return /* @__PURE__ */ Vt.createElement($u.DraggableCore, Nn({}, l, {
          nodeRef: v,
          key: "resizableHandle-" + p,
          onStop: o.resizeHandler("onResizeStop", p),
          onStart: o.resizeHandler("onResizeStart", p),
          onDrag: o.resizeHandler("onResize", p)
        }), o.renderResizeHandle(p, v));
      }))
    }));
  }, t;
}(Vt.Component);
Zt.default = oo;
oo.propTypes = Wu.resizableProps;
oo.defaultProps = {
  axis: "both",
  handleSize: [20, 20],
  lockAspectRatio: !1,
  minConstraints: [20, 20],
  maxConstraints: [1 / 0, 1 / 0],
  resizeHandles: ["se"],
  transformScale: 1
};
var Dr = {};
Dr.__esModule = !0;
Dr.default = void 0;
var pn = Ju(Pe), Ku = aa(Nr), Gu = aa(Zt), qu = Jt, Zu = ["handle", "handleSize", "onResize", "onResizeStart", "onResizeStop", "draggableOpts", "minConstraints", "maxConstraints", "lockAspectRatio", "axis", "width", "height", "resizeHandles", "style", "transformScale"];
function aa(e) {
  return e && e.__esModule ? e : { default: e };
}
function ia(e) {
  if (typeof WeakMap != "function") return null;
  var t = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap();
  return (ia = function(o) {
    return o ? r : t;
  })(e);
}
function Ju(e, t) {
  if (e && e.__esModule)
    return e;
  if (e === null || typeof e != "object" && typeof e != "function")
    return { default: e };
  var r = ia(t);
  if (r && r.has(e))
    return r.get(e);
  var n = {}, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var s in e)
    if (s !== "default" && Object.prototype.hasOwnProperty.call(e, s)) {
      var a = o ? Object.getOwnPropertyDescriptor(e, s) : null;
      a && (a.get || a.set) ? Object.defineProperty(n, s, a) : n[s] = e[s];
    }
  return n.default = e, r && r.set(e, n), n;
}
function jn() {
  return jn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, jn.apply(this, arguments);
}
function bs(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function gr(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? bs(Object(r), !0).forEach(function(n) {
      Qu(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : bs(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Qu(e, t, r) {
  return t = ed(t), t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function ed(e) {
  var t = td(e, "string");
  return typeof t == "symbol" ? t : String(t);
}
function td(e, t) {
  if (typeof e != "object" || e === null) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t || "default");
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function rd(e, t) {
  if (e == null) return {};
  var r = {}, n = Object.keys(e), o, s;
  for (s = 0; s < n.length; s++)
    o = n[s], !(t.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
function nd(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, An(e, t);
}
function An(e, t) {
  return An = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, o) {
    return n.__proto__ = o, n;
  }, An(e, t);
}
var la = /* @__PURE__ */ function(e) {
  nd(t, e);
  function t() {
    for (var n, o = arguments.length, s = new Array(o), a = 0; a < o; a++)
      s[a] = arguments[a];
    return n = e.call.apply(e, [this].concat(s)) || this, n.state = {
      width: n.props.width,
      height: n.props.height,
      propsWidth: n.props.width,
      propsHeight: n.props.height
    }, n.onResize = function(i, l) {
      var u = l.size;
      n.props.onResize ? (i.persist == null || i.persist(), n.setState(u, function() {
        return n.props.onResize && n.props.onResize(i, l);
      })) : n.setState(u);
    }, n;
  }
  t.getDerivedStateFromProps = function(o, s) {
    return s.propsWidth !== o.width || s.propsHeight !== o.height ? {
      width: o.width,
      height: o.height,
      propsWidth: o.width,
      propsHeight: o.height
    } : null;
  };
  var r = t.prototype;
  return r.render = function() {
    var o = this.props, s = o.handle, a = o.handleSize;
    o.onResize;
    var i = o.onResizeStart, l = o.onResizeStop, u = o.draggableOpts, f = o.minConstraints, p = o.maxConstraints, h = o.lockAspectRatio, v = o.axis;
    o.width, o.height;
    var w = o.resizeHandles, m = o.style, g = o.transformScale, S = rd(o, Zu);
    return /* @__PURE__ */ pn.createElement(Gu.default, {
      axis: v,
      draggableOpts: u,
      handle: s,
      handleSize: a,
      height: this.state.height,
      lockAspectRatio: h,
      maxConstraints: p,
      minConstraints: f,
      onResizeStart: i,
      onResize: this.onResize,
      onResizeStop: l,
      resizeHandles: w,
      transformScale: g,
      width: this.state.width
    }, /* @__PURE__ */ pn.createElement("div", jn({}, S, {
      style: gr(gr({}, m), {}, {
        width: this.state.width + "px",
        height: this.state.height + "px"
      })
    })));
  }, t;
}(pn.Component);
Dr.default = la;
la.propTypes = gr(gr({}, qu.resizableProps), {}, {
  children: Ku.default.element
});
Jn.exports = function() {
  throw new Error("Don't instantiate Resizable directly! Use require('react-resizable').Resizable");
};
Jn.exports.Resizable = Zt.default;
var od = Jn.exports.ResizableBox = Dr.default;
const sd = {
  default: 768,
  mobile: 1488
}, ca = (e = sd.default) => {
  const [t, r] = Fe(!1);
  return Tr(() => {
    const n = window.matchMedia(`(max-width: ${e}px)`);
    r(n.matches);
    const o = () => r(n.matches);
    return window.addEventListener("resize", o), () => window.removeEventListener("resize", o);
  }, [e]), t;
}, ua = (e) => {
  if (!e) return [];
  const t = e.split("/");
  return e.split("/").slice(0, t.length - 2).map(
    (n) => n.split("").map((o) => o === "X" ? "black" : o === "O" ? "white" : null)
  );
};
function da(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (r = da(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function ad() {
  for (var e, t, r = 0, n = "", o = arguments.length; r < o; r++) (e = arguments[r]) && (t = da(e)) && (n && (n += " "), n += t);
  return n;
}
const so = "-", id = (e) => {
  const t = cd(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: n
  } = e;
  return {
    getClassGroupId: (a) => {
      const i = a.split(so);
      return i[0] === "" && i.length !== 1 && i.shift(), fa(i, t) || ld(a);
    },
    getConflictingClassGroupIds: (a, i) => {
      const l = r[a] || [];
      return i && n[a] ? [...l, ...n[a]] : l;
    }
  };
}, fa = (e, t) => {
  var a;
  if (e.length === 0)
    return t.classGroupId;
  const r = e[0], n = t.nextPart.get(r), o = n ? fa(e.slice(1), n) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const s = e.join(so);
  return (a = t.validators.find(({
    validator: i
  }) => i(s))) == null ? void 0 : a.classGroupId;
}, ys = /^\[(.+)\]$/, ld = (e) => {
  if (ys.test(e)) {
    const t = ys.exec(e)[1], r = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (r)
      return "arbitrary.." + r;
  }
}, cd = (e) => {
  const {
    theme: t,
    prefix: r
  } = e, n = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return dd(Object.entries(e.classGroups), r).forEach(([s, a]) => {
    Dn(a, n, s, t);
  }), n;
}, Dn = (e, t, r, n) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const s = o === "" ? t : xs(t, o);
      s.classGroupId = r;
      return;
    }
    if (typeof o == "function") {
      if (ud(o)) {
        Dn(o(n), t, r, n);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: r
      });
      return;
    }
    Object.entries(o).forEach(([s, a]) => {
      Dn(a, xs(t, s), r, n);
    });
  });
}, xs = (e, t) => {
  let r = e;
  return t.split(so).forEach((n) => {
    r.nextPart.has(n) || r.nextPart.set(n, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), r = r.nextPart.get(n);
  }), r;
}, ud = (e) => e.isThemeGetter, dd = (e, t) => t ? e.map(([r, n]) => {
  const o = n.map((s) => typeof s == "string" ? t + s : typeof s == "object" ? Object.fromEntries(Object.entries(s).map(([a, i]) => [t + a, i])) : s);
  return [r, o];
}) : e, fd = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  const o = (s, a) => {
    r.set(s, a), t++, t > e && (t = 0, n = r, r = /* @__PURE__ */ new Map());
  };
  return {
    get(s) {
      let a = r.get(s);
      if (a !== void 0)
        return a;
      if ((a = n.get(s)) !== void 0)
        return o(s, a), a;
    },
    set(s, a) {
      r.has(s) ? r.set(s, a) : o(s, a);
    }
  };
}, pa = "!", pd = (e) => {
  const {
    separator: t,
    experimentalParseClassName: r
  } = e, n = t.length === 1, o = t[0], s = t.length, a = (i) => {
    const l = [];
    let u = 0, f = 0, p;
    for (let g = 0; g < i.length; g++) {
      let S = i[g];
      if (u === 0) {
        if (S === o && (n || i.slice(g, g + s) === t)) {
          l.push(i.slice(f, g)), f = g + s;
          continue;
        }
        if (S === "/") {
          p = g;
          continue;
        }
      }
      S === "[" ? u++ : S === "]" && u--;
    }
    const h = l.length === 0 ? i : i.substring(f), v = h.startsWith(pa), w = v ? h.substring(1) : h, m = p && p > f ? p - f : void 0;
    return {
      modifiers: l,
      hasImportantModifier: v,
      baseClassName: w,
      maybePostfixModifierPosition: m
    };
  };
  return r ? (i) => r({
    className: i,
    parseClassName: a
  }) : a;
}, md = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let r = [];
  return e.forEach((n) => {
    n[0] === "[" ? (t.push(...r.sort(), n), r = []) : r.push(n);
  }), t.push(...r.sort()), t;
}, hd = (e) => ({
  cache: fd(e.cacheSize),
  parseClassName: pd(e),
  ...id(e)
}), gd = /\s+/, vd = (e, t) => {
  const {
    parseClassName: r,
    getClassGroupId: n,
    getConflictingClassGroupIds: o
  } = t, s = [], a = e.trim().split(gd);
  let i = "";
  for (let l = a.length - 1; l >= 0; l -= 1) {
    const u = a[l], {
      modifiers: f,
      hasImportantModifier: p,
      baseClassName: h,
      maybePostfixModifierPosition: v
    } = r(u);
    let w = !!v, m = n(w ? h.substring(0, v) : h);
    if (!m) {
      if (!w) {
        i = u + (i.length > 0 ? " " + i : i);
        continue;
      }
      if (m = n(h), !m) {
        i = u + (i.length > 0 ? " " + i : i);
        continue;
      }
      w = !1;
    }
    const g = md(f).join(":"), S = p ? g + pa : g, b = S + m;
    if (s.includes(b))
      continue;
    s.push(b);
    const y = o(m, w);
    for (let E = 0; E < y.length; ++E) {
      const C = y[E];
      s.push(S + C);
    }
    i = u + (i.length > 0 ? " " + i : i);
  }
  return i;
};
function bd() {
  let e = 0, t, r, n = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (r = ma(t)) && (n && (n += " "), n += r);
  return n;
}
const ma = (e) => {
  if (typeof e == "string")
    return e;
  let t, r = "";
  for (let n = 0; n < e.length; n++)
    e[n] && (t = ma(e[n])) && (r && (r += " "), r += t);
  return r;
};
function yd(e, ...t) {
  let r, n, o, s = a;
  function a(l) {
    const u = t.reduce((f, p) => p(f), e());
    return r = hd(u), n = r.cache.get, o = r.cache.set, s = i, i(l);
  }
  function i(l) {
    const u = n(l);
    if (u)
      return u;
    const f = vd(l, r);
    return o(l, f), f;
  }
  return function() {
    return s(bd.apply(null, arguments));
  };
}
const me = (e) => {
  const t = (r) => r[e] || [];
  return t.isThemeGetter = !0, t;
}, ha = /^\[(?:([a-z-]+):)?(.+)\]$/i, xd = /^\d+\/\d+$/, wd = /* @__PURE__ */ new Set(["px", "full", "screen"]), Sd = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Cd = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Ed = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Rd = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Pd = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Ze = (e) => Rt(e) || wd.has(e) || xd.test(e), ot = (e) => Dt(e, "length", Md), Rt = (e) => !!e && !Number.isNaN(Number(e)), mn = (e) => Dt(e, "number", Rt), Ht = (e) => !!e && Number.isInteger(Number(e)), Td = (e) => e.endsWith("%") && Rt(e.slice(0, -1)), oe = (e) => ha.test(e), st = (e) => Sd.test(e), Od = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Nd = (e) => Dt(e, Od, ga), _d = (e) => Dt(e, "position", ga), jd = /* @__PURE__ */ new Set(["image", "url"]), Ad = (e) => Dt(e, jd, Id), Dd = (e) => Dt(e, "", kd), Ut = () => !0, Dt = (e, t, r) => {
  const n = ha.exec(e);
  return n ? n[1] ? typeof t == "string" ? n[1] === t : t.has(n[1]) : r(n[2]) : !1;
}, Md = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Cd.test(e) && !Ed.test(e)
), ga = () => !1, kd = (e) => Rd.test(e), Id = (e) => Pd.test(e), Ld = () => {
  const e = me("colors"), t = me("spacing"), r = me("blur"), n = me("brightness"), o = me("borderColor"), s = me("borderRadius"), a = me("borderSpacing"), i = me("borderWidth"), l = me("contrast"), u = me("grayscale"), f = me("hueRotate"), p = me("invert"), h = me("gap"), v = me("gradientColorStops"), w = me("gradientColorStopPositions"), m = me("inset"), g = me("margin"), S = me("opacity"), b = me("padding"), y = me("saturate"), E = me("scale"), C = me("sepia"), T = me("skew"), R = me("space"), k = me("translate"), M = () => ["auto", "contain", "none"], W = () => ["auto", "hidden", "clip", "visible", "scroll"], L = () => ["auto", oe, t], D = () => [oe, t], V = () => ["", Ze, ot], _ = () => ["auto", Rt, oe], U = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], F = () => ["solid", "dashed", "dotted", "double", "none"], H = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], $ = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], G = () => ["", "0", oe], P = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], j = () => [Rt, oe];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [Ut],
      spacing: [Ze, ot],
      blur: ["none", "", st, oe],
      brightness: j(),
      borderColor: [e],
      borderRadius: ["none", "", "full", st, oe],
      borderSpacing: D(),
      borderWidth: V(),
      contrast: j(),
      grayscale: G(),
      hueRotate: j(),
      invert: G(),
      gap: D(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Td, ot],
      inset: L(),
      margin: L(),
      opacity: j(),
      padding: D(),
      saturate: j(),
      scale: j(),
      sepia: G(),
      skew: j(),
      space: D(),
      translate: D()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", oe]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [st]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": P()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": P()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...U(), oe]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: W()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": W()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": W()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: M()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": M()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": M()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [m]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [m]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [m]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [m]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [m]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [m]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [m]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [m]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [m]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", Ht, oe]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: L()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", oe]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: G()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: G()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", Ht, oe]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [Ut]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", Ht, oe]
        }, oe]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": _()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": _()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [Ut]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [Ht, oe]
        }, oe]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": _()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": _()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", oe]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", oe]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [h]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [h]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [h]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...$()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...$(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...$(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [b]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [b]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [b]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [b]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [b]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [b]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [b]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [b]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [b]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [g]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [g]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [g]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [g]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [g]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [g]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [g]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [g]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [g]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [R]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [R]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", oe, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [oe, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [oe, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [st]
        }, st]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [oe, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [oe, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [oe, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [oe, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", st, ot]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", mn]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Ut]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", oe]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", Rt, mn]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", Ze, oe]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", oe]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", oe]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [e]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [S]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [e]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [S]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...F(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", Ze, ot]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", Ze, oe]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [e]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: D()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", oe]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", oe]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [S]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...U(), _d]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", Nd]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Ad]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [e]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [w]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [w]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [w]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [v]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [v]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [v]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [s]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [s]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [s]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [s]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [s]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [s]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [s]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [s]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [s]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [s]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [s]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [s]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [s]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [s]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [s]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [i]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [i]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [i]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [i]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [i]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [i]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [i]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [i]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [i]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [S]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...F(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [i]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [i]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [S]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: F()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [o]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [o]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [o]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [o]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [o]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [o]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [o]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [o]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [o]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [o]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...F()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [Ze, oe]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [Ze, ot]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [e]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: V()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [e]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [S]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [Ze, ot]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", st, Dd]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [Ut]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [S]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...H(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": H()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [r]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [n]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [l]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", st, oe]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [u]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [f]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [p]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [y]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [C]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [r]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [n]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [l]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [u]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [f]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [p]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [S]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [y]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [C]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [a]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [a]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [a]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", oe]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: j()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", oe]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: j()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", oe]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [E]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [E]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [E]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [Ht, oe]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [k]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [k]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [T]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [T]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", oe]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", e]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", oe]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [e]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": D()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": D()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": D()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": D()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": D()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": D()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": D()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": D()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": D()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": D()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": D()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": D()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": D()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": D()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": D()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": D()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": D()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": D()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", oe]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [e, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [Ze, ot, mn]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [e, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, $d = /* @__PURE__ */ yd(Ld), de = (...e) => $d(ad(e));
class Fd {
  constructor(t) {
    Jo(this, "board");
    this.board = t;
  }
  countTotal(t, r) {
    const n = this.board[t.y][t.x];
    let o = 0;
    for (let s = t.y + r.y, a = t.x + r.x; s >= 0 && s < this.board.length && a >= 0 && a < this.board[0].length && this.board[s][a] === n; s += r.y, a += r.x)
      o++;
    return o;
  }
  findWinner(t) {
    if (this.countTotal(t, { y: 1, x: 0 }) + this.countTotal(t, { y: -1, x: 0 }) >= 4 || this.countTotal(t, { y: 0, x: 1 }) + this.countTotal(t, { y: 0, x: -1 }) >= 4 || this.countTotal(t, { y: 1, x: 1 }) + this.countTotal(t, { y: -1, x: -1 }) >= 4 || this.countTotal(t, { y: 1, x: -1 }) + this.countTotal(t, { y: -1, x: 1 }) >= 4)
      return this.board[t.y][t.x];
    if (this.board.every((r) => r.every((n) => n)))
      return "draw";
  }
}
const qg = (e) => {
  const [t, r] = Fe(
    () => ua(e.gen)
  ), [n, o] = Fe(
    e.movesHistory[e.movesCount]
  ), [s, a] = Fe(void 0), i = Qo(void 0), l = Qo(void 0);
  Tr(() => {
    if (i.current === void 0 || l.current === void 0) return;
    const h = new Fd(
      t.map((v) => v.map((w) => w === null ? "" : w))
    ).findWinner({
      x: i.current,
      y: l.current
    });
    a(h);
  }, [t]);
  const u = es(
    (p, h) => {
      const { x: v, y: w } = p;
      i.current = v, l.current = w, r(
        (m) => m.map((g, S) => S !== v ? g : g.map((b, y) => y !== w ? b : h))
      ), o(p);
    },
    []
  ), f = es(
    (p, h) => {
      const { x: v, y: w } = p;
      r(
        (m) => m.map((g, S) => S !== v ? g : g.map((b, y) => y !== w ? b : null))
      ), o(h);
    },
    []
  );
  return {
    tiles: t,
    lastTile: n,
    winner: s,
    addTile: u,
    removeTile: f
  };
};
function Wd(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function va(...e) {
  return (t) => e.forEach((r) => Wd(r, t));
}
function ae(...e) {
  return d.useCallback(va(...e), e);
}
var pt = d.forwardRef((e, t) => {
  const { children: r, ...n } = e, o = d.Children.toArray(r), s = o.find(Bd);
  if (s) {
    const a = s.props.children, i = o.map((l) => l === s ? d.Children.count(a) > 1 ? d.Children.only(null) : d.isValidElement(a) ? a.props.children : null : l);
    return /* @__PURE__ */ c.jsx(Mn, { ...n, ref: t, children: d.isValidElement(a) ? d.cloneElement(a, void 0, i) : null });
  }
  return /* @__PURE__ */ c.jsx(Mn, { ...n, ref: t, children: r });
});
pt.displayName = "Slot";
var Mn = d.forwardRef((e, t) => {
  const { children: r, ...n } = e;
  if (d.isValidElement(r)) {
    const o = Hd(r);
    return d.cloneElement(r, {
      ...Vd(n, r.props),
      // @ts-ignore
      ref: t ? va(t, o) : o
    });
  }
  return d.Children.count(r) > 1 ? d.Children.only(null) : null;
});
Mn.displayName = "SlotClone";
var zd = ({ children: e }) => /* @__PURE__ */ c.jsx(c.Fragment, { children: e });
function Bd(e) {
  return d.isValidElement(e) && e.type === zd;
}
function Vd(e, t) {
  const r = { ...t };
  for (const n in t) {
    const o = e[n], s = t[n];
    /^on[A-Z]/.test(n) ? o && s ? r[n] = (...i) => {
      s(...i), o(...i);
    } : o && (r[n] = o) : n === "style" ? r[n] = { ...o, ...s } : n === "className" && (r[n] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...r };
}
function Hd(e) {
  var n, o;
  let t = (n = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : n.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
const Ud = Ys(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Nt = d.forwardRef(
  ({
    className: e,
    variant: t,
    size: r,
    asChild: n = !1,
    loading: o = !1,
    children: s,
    ...a
  }, i) => {
    const l = n ? pt : "button";
    return /* @__PURE__ */ c.jsxs(
      l,
      {
        className: de(Ud({ variant: t, size: r, className: e }), "relative"),
        ref: i,
        disabled: o || a.disabled,
        ...a,
        children: [
          o ? /* @__PURE__ */ c.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ c.jsx(
            Gr,
            {
              size: r === "sm" ? "sm" : r === "lg" ? "lg" : "md"
            }
          ) }) : null,
          /* @__PURE__ */ c.jsx("span", { className: o ? "opacity-0" : "flex items-center", children: s })
        ]
      }
    );
  }
);
Nt.displayName = "Button";
const Qt = d.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ c.jsx(
  "div",
  {
    ref: r,
    className: de(
      "bg-card text-card-foreground rounded-xl border shadow",
      e
    ),
    ...t
  }
));
Qt.displayName = "Card";
const ba = d.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ c.jsx(
  "div",
  {
    ref: r,
    className: de("flex flex-col space-y-1.5 p-6", e),
    ...t
  }
));
ba.displayName = "CardHeader";
const ya = d.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ c.jsx(
  "h3",
  {
    ref: r,
    className: de("font-semibold leading-none tracking-tight", e),
    ...t
  }
));
ya.displayName = "CardTitle";
const xa = d.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ c.jsx(
  "p",
  {
    ref: r,
    className: de("text-muted-foreground text-sm", e),
    ...t
  }
));
xa.displayName = "CardDescription";
const er = d.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ c.jsx("div", { ref: r, className: de("p-6 pt-0", e), ...t }));
er.displayName = "CardContent";
const wa = d.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ c.jsx(
  "div",
  {
    ref: r,
    className: de("flex items-center p-6 pt-0", e),
    ...t
  }
));
wa.displayName = "CardFooter";
const Yd = ({
  title: e,
  secondaryTitle: t,
  text: r,
  acceptButtonText: n,
  declineButtonText: o,
  onAccept: s,
  onDecline: a
}) => {
  const [i, l] = Fe(!0), u = () => {
    l(!0), s();
  }, f = () => {
    l(!1), a();
  };
  return i ? /* @__PURE__ */ c.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm", children: /* @__PURE__ */ c.jsxs(Qt, { className: "w-full max-w-md border-gray-800 bg-[#2A2A2A]", children: [
    /* @__PURE__ */ c.jsxs(ba, { className: "space-y-1", children: [
      /* @__PURE__ */ c.jsx(ya, { className: "text-2xl text-gray-100", children: e }),
      /* @__PURE__ */ c.jsx(xa, { className: "text-gray-400", children: t })
    ] }),
    /* @__PURE__ */ c.jsx(er, { children: /* @__PURE__ */ c.jsx("p", { className: "text-sm text-gray-300", children: r }) }),
    /* @__PURE__ */ c.jsxs(wa, { className: "flex gap-2", children: [
      /* @__PURE__ */ c.jsx(
        Nt,
        {
          className: "flex-1 bg-[#98C379] font-medium text-black hover:bg-[#89b46c]",
          size: "lg",
          onClick: u,
          children: n
        }
      ),
      /* @__PURE__ */ c.jsx(
        Nt,
        {
          className: "flex-1 bg-gray-700 text-gray-100 hover:bg-gray-600",
          size: "lg",
          variant: "outline",
          onClick: f,
          children: o
        }
      )
    ] })
  ] }) }) : null;
};
Yd.displayName = "AlertDialog";
const Xd = d.forwardRef(
  ({ className: e, type: t, ...r }, n) => /* @__PURE__ */ c.jsx(
    "input",
    {
      type: t,
      className: de(
        "border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ref: n,
      ...r
    }
  )
);
Xd.displayName = "Input";
const Zg = ({ isVisible: e }) => e ? /* @__PURE__ */ c.jsx(
  "div",
  {
    className: de(
      "fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    ),
    children: /* @__PURE__ */ c.jsx(Gr, { size: "lg", className: "text-white" })
  }
) : null;
var Kd = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "span",
  "svg",
  "ul"
], te = Kd.reduce((e, t) => {
  const r = d.forwardRef((n, o) => {
    const { asChild: s, ...a } = n, i = s ? pt : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ c.jsx(i, { ...a, ref: o });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Sa(e, t) {
  e && qt.flushSync(() => e.dispatchEvent(t));
}
var xe = globalThis != null && globalThis.document ? d.useLayoutEffect : () => {
};
function Gd(e, t) {
  return d.useReducer((r, n) => t[r][n] ?? r, e);
}
var et = (e) => {
  const { present: t, children: r } = e, n = qd(t), o = typeof r == "function" ? r({ present: n.isPresent }) : d.Children.only(r), s = ae(n.ref, Zd(o));
  return typeof r == "function" || n.isPresent ? d.cloneElement(o, { ref: s }) : null;
};
et.displayName = "Presence";
function qd(e) {
  const [t, r] = d.useState(), n = d.useRef({}), o = d.useRef(e), s = d.useRef("none"), a = e ? "mounted" : "unmounted", [i, l] = Gd(a, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return d.useEffect(() => {
    const u = ar(n.current);
    s.current = i === "mounted" ? u : "none";
  }, [i]), xe(() => {
    const u = n.current, f = o.current;
    if (f !== e) {
      const h = s.current, v = ar(u);
      e ? l("MOUNT") : v === "none" || (u == null ? void 0 : u.display) === "none" ? l("UNMOUNT") : l(f && h !== v ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, l]), xe(() => {
    if (t) {
      let u;
      const f = t.ownerDocument.defaultView ?? window, p = (v) => {
        const m = ar(n.current).includes(v.animationName);
        if (v.target === t && m && (l("ANIMATION_END"), !o.current)) {
          const g = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = f.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = g);
          });
        }
      }, h = (v) => {
        v.target === t && (s.current = ar(n.current));
      };
      return t.addEventListener("animationstart", h), t.addEventListener("animationcancel", p), t.addEventListener("animationend", p), () => {
        f.clearTimeout(u), t.removeEventListener("animationstart", h), t.removeEventListener("animationcancel", p), t.removeEventListener("animationend", p);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(i),
    ref: d.useCallback((u) => {
      u && (n.current = getComputedStyle(u)), r(u);
    }, [])
  };
}
function ar(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function Zd(e) {
  var n, o;
  let t = (n = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : n.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
function Jd(e, t) {
  const r = d.createContext(t), n = (s) => {
    const { children: a, ...i } = s, l = d.useMemo(() => i, Object.values(i));
    return /* @__PURE__ */ c.jsx(r.Provider, { value: l, children: a });
  };
  n.displayName = e + "Provider";
  function o(s) {
    const a = d.useContext(r);
    if (a) return a;
    if (t !== void 0) return t;
    throw new Error(`\`${s}\` must be used within \`${e}\``);
  }
  return [n, o];
}
function Mt(e, t = []) {
  let r = [];
  function n(s, a) {
    const i = d.createContext(a), l = r.length;
    r = [...r, a];
    const u = (p) => {
      var S;
      const { scope: h, children: v, ...w } = p, m = ((S = h == null ? void 0 : h[e]) == null ? void 0 : S[l]) || i, g = d.useMemo(() => w, Object.values(w));
      return /* @__PURE__ */ c.jsx(m.Provider, { value: g, children: v });
    };
    u.displayName = s + "Provider";
    function f(p, h) {
      var m;
      const v = ((m = h == null ? void 0 : h[e]) == null ? void 0 : m[l]) || i, w = d.useContext(v);
      if (w) return w;
      if (a !== void 0) return a;
      throw new Error(`\`${p}\` must be used within \`${s}\``);
    }
    return [u, f];
  }
  const o = () => {
    const s = r.map((a) => d.createContext(a));
    return function(i) {
      const l = (i == null ? void 0 : i[e]) || s;
      return d.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: l } }),
        [i, l]
      );
    };
  };
  return o.scopeName = e, [n, Qd(o, ...t)];
}
function Qd(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const r = () => {
    const n = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(s) {
      const a = n.reduce((i, { useScope: l, scopeName: u }) => {
        const p = l(s)[`__scope${u}`];
        return { ...i, ...p };
      }, {});
      return d.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return r.scopeName = t.scopeName, r;
}
function be(e) {
  const t = d.useRef(e);
  return d.useEffect(() => {
    t.current = e;
  }), d.useMemo(() => (...r) => {
    var n;
    return (n = t.current) == null ? void 0 : n.call(t, ...r);
  }, []);
}
var ef = d.createContext(void 0);
function ao(e) {
  const t = d.useContext(ef);
  return e || t || "ltr";
}
function Xt(e, [t, r]) {
  return Math.min(r, Math.max(t, e));
}
function Z(e, t, { checkForDefaultPrevented: r = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), r === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
function tf(e, t) {
  return d.useReducer((r, n) => t[r][n] ?? r, e);
}
var io = "ScrollArea", [Ca, Jg] = Mt(io), [rf, Me] = Ca(io), Ea = d.forwardRef(
  (e, t) => {
    const {
      __scopeScrollArea: r,
      type: n = "hover",
      dir: o,
      scrollHideDelay: s = 600,
      ...a
    } = e, [i, l] = d.useState(null), [u, f] = d.useState(null), [p, h] = d.useState(null), [v, w] = d.useState(null), [m, g] = d.useState(null), [S, b] = d.useState(0), [y, E] = d.useState(0), [C, T] = d.useState(!1), [R, k] = d.useState(!1), M = ae(t, (L) => l(L)), W = ao(o);
    return /* @__PURE__ */ c.jsx(
      rf,
      {
        scope: r,
        type: n,
        dir: W,
        scrollHideDelay: s,
        scrollArea: i,
        viewport: u,
        onViewportChange: f,
        content: p,
        onContentChange: h,
        scrollbarX: v,
        onScrollbarXChange: w,
        scrollbarXEnabled: C,
        onScrollbarXEnabledChange: T,
        scrollbarY: m,
        onScrollbarYChange: g,
        scrollbarYEnabled: R,
        onScrollbarYEnabledChange: k,
        onCornerWidthChange: b,
        onCornerHeightChange: E,
        children: /* @__PURE__ */ c.jsx(
          te.div,
          {
            dir: W,
            ...a,
            ref: M,
            style: {
              position: "relative",
              // Pass corner sizes as CSS vars to reduce re-renders of context consumers
              "--radix-scroll-area-corner-width": S + "px",
              "--radix-scroll-area-corner-height": y + "px",
              ...e.style
            }
          }
        )
      }
    );
  }
);
Ea.displayName = io;
var Ra = "ScrollAreaViewport", Pa = d.forwardRef(
  (e, t) => {
    const { __scopeScrollArea: r, children: n, nonce: o, ...s } = e, a = Me(Ra, r), i = d.useRef(null), l = ae(t, i, a.onViewportChange);
    return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: o
        }
      ),
      /* @__PURE__ */ c.jsx(
        te.div,
        {
          "data-radix-scroll-area-viewport": "",
          ...s,
          ref: l,
          style: {
            /**
             * We don't support `visible` because the intention is to have at least one scrollbar
             * if this component is used and `visible` will behave like `auto` in that case
             * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
             *
             * We don't handle `auto` because the intention is for the native implementation
             * to be hidden if using this component. We just want to ensure the node is scrollable
             * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
             * the browser from having to work out whether to render native scrollbars or not,
             * we tell it to with the intention of hiding them in CSS.
             */
            overflowX: a.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: a.scrollbarYEnabled ? "scroll" : "hidden",
            ...e.style
          },
          children: /* @__PURE__ */ c.jsx("div", { ref: a.onContentChange, style: { minWidth: "100%", display: "table" }, children: n })
        }
      )
    ] });
  }
);
Pa.displayName = Ra;
var Ke = "ScrollAreaScrollbar", lo = d.forwardRef(
  (e, t) => {
    const { forceMount: r, ...n } = e, o = Me(Ke, e.__scopeScrollArea), { onScrollbarXEnabledChange: s, onScrollbarYEnabledChange: a } = o, i = e.orientation === "horizontal";
    return d.useEffect(() => (i ? s(!0) : a(!0), () => {
      i ? s(!1) : a(!1);
    }), [i, s, a]), o.type === "hover" ? /* @__PURE__ */ c.jsx(nf, { ...n, ref: t, forceMount: r }) : o.type === "scroll" ? /* @__PURE__ */ c.jsx(of, { ...n, ref: t, forceMount: r }) : o.type === "auto" ? /* @__PURE__ */ c.jsx(Ta, { ...n, ref: t, forceMount: r }) : o.type === "always" ? /* @__PURE__ */ c.jsx(co, { ...n, ref: t }) : null;
  }
);
lo.displayName = Ke;
var nf = d.forwardRef((e, t) => {
  const { forceMount: r, ...n } = e, o = Me(Ke, e.__scopeScrollArea), [s, a] = d.useState(!1);
  return d.useEffect(() => {
    const i = o.scrollArea;
    let l = 0;
    if (i) {
      const u = () => {
        window.clearTimeout(l), a(!0);
      }, f = () => {
        l = window.setTimeout(() => a(!1), o.scrollHideDelay);
      };
      return i.addEventListener("pointerenter", u), i.addEventListener("pointerleave", f), () => {
        window.clearTimeout(l), i.removeEventListener("pointerenter", u), i.removeEventListener("pointerleave", f);
      };
    }
  }, [o.scrollArea, o.scrollHideDelay]), /* @__PURE__ */ c.jsx(et, { present: r || s, children: /* @__PURE__ */ c.jsx(
    Ta,
    {
      "data-state": s ? "visible" : "hidden",
      ...n,
      ref: t
    }
  ) });
}), of = d.forwardRef((e, t) => {
  const { forceMount: r, ...n } = e, o = Me(Ke, e.__scopeScrollArea), s = e.orientation === "horizontal", a = kr(() => l("SCROLL_END"), 100), [i, l] = tf("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle"
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  return d.useEffect(() => {
    if (i === "idle") {
      const u = window.setTimeout(() => l("HIDE"), o.scrollHideDelay);
      return () => window.clearTimeout(u);
    }
  }, [i, o.scrollHideDelay, l]), d.useEffect(() => {
    const u = o.viewport, f = s ? "scrollLeft" : "scrollTop";
    if (u) {
      let p = u[f];
      const h = () => {
        const v = u[f];
        p !== v && (l("SCROLL"), a()), p = v;
      };
      return u.addEventListener("scroll", h), () => u.removeEventListener("scroll", h);
    }
  }, [o.viewport, s, l, a]), /* @__PURE__ */ c.jsx(et, { present: r || i !== "hidden", children: /* @__PURE__ */ c.jsx(
    co,
    {
      "data-state": i === "hidden" ? "hidden" : "visible",
      ...n,
      ref: t,
      onPointerEnter: Z(e.onPointerEnter, () => l("POINTER_ENTER")),
      onPointerLeave: Z(e.onPointerLeave, () => l("POINTER_LEAVE"))
    }
  ) });
}), Ta = d.forwardRef((e, t) => {
  const r = Me(Ke, e.__scopeScrollArea), { forceMount: n, ...o } = e, [s, a] = d.useState(!1), i = e.orientation === "horizontal", l = kr(() => {
    if (r.viewport) {
      const u = r.viewport.offsetWidth < r.viewport.scrollWidth, f = r.viewport.offsetHeight < r.viewport.scrollHeight;
      a(i ? u : f);
    }
  }, 10);
  return _t(r.viewport, l), _t(r.content, l), /* @__PURE__ */ c.jsx(et, { present: n || s, children: /* @__PURE__ */ c.jsx(
    co,
    {
      "data-state": s ? "visible" : "hidden",
      ...o,
      ref: t
    }
  ) });
}), co = d.forwardRef((e, t) => {
  const { orientation: r = "vertical", ...n } = e, o = Me(Ke, e.__scopeScrollArea), s = d.useRef(null), a = d.useRef(0), [i, l] = d.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  }), u = Aa(i.viewport, i.content), f = {
    ...n,
    sizes: i,
    onSizesChange: l,
    hasThumb: u > 0 && u < 1,
    onThumbChange: (h) => s.current = h,
    onThumbPointerUp: () => a.current = 0,
    onThumbPointerDown: (h) => a.current = h
  };
  function p(h, v) {
    return df(h, a.current, i, v);
  }
  return r === "horizontal" ? /* @__PURE__ */ c.jsx(
    sf,
    {
      ...f,
      ref: t,
      onThumbPositionChange: () => {
        if (o.viewport && s.current) {
          const h = o.viewport.scrollLeft, v = ws(h, i, o.dir);
          s.current.style.transform = `translate3d(${v}px, 0, 0)`;
        }
      },
      onWheelScroll: (h) => {
        o.viewport && (o.viewport.scrollLeft = h);
      },
      onDragScroll: (h) => {
        o.viewport && (o.viewport.scrollLeft = p(h, o.dir));
      }
    }
  ) : r === "vertical" ? /* @__PURE__ */ c.jsx(
    af,
    {
      ...f,
      ref: t,
      onThumbPositionChange: () => {
        if (o.viewport && s.current) {
          const h = o.viewport.scrollTop, v = ws(h, i);
          s.current.style.transform = `translate3d(0, ${v}px, 0)`;
        }
      },
      onWheelScroll: (h) => {
        o.viewport && (o.viewport.scrollTop = h);
      },
      onDragScroll: (h) => {
        o.viewport && (o.viewport.scrollTop = p(h));
      }
    }
  ) : null;
}), sf = d.forwardRef((e, t) => {
  const { sizes: r, onSizesChange: n, ...o } = e, s = Me(Ke, e.__scopeScrollArea), [a, i] = d.useState(), l = d.useRef(null), u = ae(t, l, s.onScrollbarXChange);
  return d.useEffect(() => {
    l.current && i(getComputedStyle(l.current));
  }, [l]), /* @__PURE__ */ c.jsx(
    Na,
    {
      "data-orientation": "horizontal",
      ...o,
      ref: u,
      sizes: r,
      style: {
        bottom: 0,
        left: s.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: s.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        "--radix-scroll-area-thumb-width": Mr(r) + "px",
        ...e.style
      },
      onThumbPointerDown: (f) => e.onThumbPointerDown(f.x),
      onDragScroll: (f) => e.onDragScroll(f.x),
      onWheelScroll: (f, p) => {
        if (s.viewport) {
          const h = s.viewport.scrollLeft + f.deltaX;
          e.onWheelScroll(h), Ma(h, p) && f.preventDefault();
        }
      },
      onResize: () => {
        l.current && s.viewport && a && n({
          content: s.viewport.scrollWidth,
          viewport: s.viewport.offsetWidth,
          scrollbar: {
            size: l.current.clientWidth,
            paddingStart: br(a.paddingLeft),
            paddingEnd: br(a.paddingRight)
          }
        });
      }
    }
  );
}), af = d.forwardRef((e, t) => {
  const { sizes: r, onSizesChange: n, ...o } = e, s = Me(Ke, e.__scopeScrollArea), [a, i] = d.useState(), l = d.useRef(null), u = ae(t, l, s.onScrollbarYChange);
  return d.useEffect(() => {
    l.current && i(getComputedStyle(l.current));
  }, [l]), /* @__PURE__ */ c.jsx(
    Na,
    {
      "data-orientation": "vertical",
      ...o,
      ref: u,
      sizes: r,
      style: {
        top: 0,
        right: s.dir === "ltr" ? 0 : void 0,
        left: s.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        "--radix-scroll-area-thumb-height": Mr(r) + "px",
        ...e.style
      },
      onThumbPointerDown: (f) => e.onThumbPointerDown(f.y),
      onDragScroll: (f) => e.onDragScroll(f.y),
      onWheelScroll: (f, p) => {
        if (s.viewport) {
          const h = s.viewport.scrollTop + f.deltaY;
          e.onWheelScroll(h), Ma(h, p) && f.preventDefault();
        }
      },
      onResize: () => {
        l.current && s.viewport && a && n({
          content: s.viewport.scrollHeight,
          viewport: s.viewport.offsetHeight,
          scrollbar: {
            size: l.current.clientHeight,
            paddingStart: br(a.paddingTop),
            paddingEnd: br(a.paddingBottom)
          }
        });
      }
    }
  );
}), [lf, Oa] = Ca(Ke), Na = d.forwardRef((e, t) => {
  const {
    __scopeScrollArea: r,
    sizes: n,
    hasThumb: o,
    onThumbChange: s,
    onThumbPointerUp: a,
    onThumbPointerDown: i,
    onThumbPositionChange: l,
    onDragScroll: u,
    onWheelScroll: f,
    onResize: p,
    ...h
  } = e, v = Me(Ke, r), [w, m] = d.useState(null), g = ae(t, (M) => m(M)), S = d.useRef(null), b = d.useRef(""), y = v.viewport, E = n.content - n.viewport, C = be(f), T = be(l), R = kr(p, 10);
  function k(M) {
    if (S.current) {
      const W = M.clientX - S.current.left, L = M.clientY - S.current.top;
      u({ x: W, y: L });
    }
  }
  return d.useEffect(() => {
    const M = (W) => {
      const L = W.target;
      (w == null ? void 0 : w.contains(L)) && C(W, E);
    };
    return document.addEventListener("wheel", M, { passive: !1 }), () => document.removeEventListener("wheel", M, { passive: !1 });
  }, [y, w, E, C]), d.useEffect(T, [n, T]), _t(w, R), _t(v.content, R), /* @__PURE__ */ c.jsx(
    lf,
    {
      scope: r,
      scrollbar: w,
      hasThumb: o,
      onThumbChange: be(s),
      onThumbPointerUp: be(a),
      onThumbPositionChange: T,
      onThumbPointerDown: be(i),
      children: /* @__PURE__ */ c.jsx(
        te.div,
        {
          ...h,
          ref: g,
          style: { position: "absolute", ...h.style },
          onPointerDown: Z(e.onPointerDown, (M) => {
            M.button === 0 && (M.target.setPointerCapture(M.pointerId), S.current = w.getBoundingClientRect(), b.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", v.viewport && (v.viewport.style.scrollBehavior = "auto"), k(M));
          }),
          onPointerMove: Z(e.onPointerMove, k),
          onPointerUp: Z(e.onPointerUp, (M) => {
            const W = M.target;
            W.hasPointerCapture(M.pointerId) && W.releasePointerCapture(M.pointerId), document.body.style.webkitUserSelect = b.current, v.viewport && (v.viewport.style.scrollBehavior = ""), S.current = null;
          })
        }
      )
    }
  );
}), vr = "ScrollAreaThumb", _a = d.forwardRef(
  (e, t) => {
    const { forceMount: r, ...n } = e, o = Oa(vr, e.__scopeScrollArea);
    return /* @__PURE__ */ c.jsx(et, { present: r || o.hasThumb, children: /* @__PURE__ */ c.jsx(cf, { ref: t, ...n }) });
  }
), cf = d.forwardRef(
  (e, t) => {
    const { __scopeScrollArea: r, style: n, ...o } = e, s = Me(vr, r), a = Oa(vr, r), { onThumbPositionChange: i } = a, l = ae(
      t,
      (p) => a.onThumbChange(p)
    ), u = d.useRef(), f = kr(() => {
      u.current && (u.current(), u.current = void 0);
    }, 100);
    return d.useEffect(() => {
      const p = s.viewport;
      if (p) {
        const h = () => {
          if (f(), !u.current) {
            const v = ff(p, i);
            u.current = v, i();
          }
        };
        return i(), p.addEventListener("scroll", h), () => p.removeEventListener("scroll", h);
      }
    }, [s.viewport, f, i]), /* @__PURE__ */ c.jsx(
      te.div,
      {
        "data-state": a.hasThumb ? "visible" : "hidden",
        ...o,
        ref: l,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...n
        },
        onPointerDownCapture: Z(e.onPointerDownCapture, (p) => {
          const v = p.target.getBoundingClientRect(), w = p.clientX - v.left, m = p.clientY - v.top;
          a.onThumbPointerDown({ x: w, y: m });
        }),
        onPointerUp: Z(e.onPointerUp, a.onThumbPointerUp)
      }
    );
  }
);
_a.displayName = vr;
var uo = "ScrollAreaCorner", ja = d.forwardRef(
  (e, t) => {
    const r = Me(uo, e.__scopeScrollArea), n = !!(r.scrollbarX && r.scrollbarY);
    return r.type !== "scroll" && n ? /* @__PURE__ */ c.jsx(uf, { ...e, ref: t }) : null;
  }
);
ja.displayName = uo;
var uf = d.forwardRef((e, t) => {
  const { __scopeScrollArea: r, ...n } = e, o = Me(uo, r), [s, a] = d.useState(0), [i, l] = d.useState(0), u = !!(s && i);
  return _t(o.scrollbarX, () => {
    var p;
    const f = ((p = o.scrollbarX) == null ? void 0 : p.offsetHeight) || 0;
    o.onCornerHeightChange(f), l(f);
  }), _t(o.scrollbarY, () => {
    var p;
    const f = ((p = o.scrollbarY) == null ? void 0 : p.offsetWidth) || 0;
    o.onCornerWidthChange(f), a(f);
  }), u ? /* @__PURE__ */ c.jsx(
    te.div,
    {
      ...n,
      ref: t,
      style: {
        width: s,
        height: i,
        position: "absolute",
        right: o.dir === "ltr" ? 0 : void 0,
        left: o.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...e.style
      }
    }
  ) : null;
});
function br(e) {
  return e ? parseInt(e, 10) : 0;
}
function Aa(e, t) {
  const r = e / t;
  return isNaN(r) ? 0 : r;
}
function Mr(e) {
  const t = Aa(e.viewport, e.content), r = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, n = (e.scrollbar.size - r) * t;
  return Math.max(n, 18);
}
function df(e, t, r, n = "ltr") {
  const o = Mr(r), s = o / 2, a = t || s, i = o - a, l = r.scrollbar.paddingStart + a, u = r.scrollbar.size - r.scrollbar.paddingEnd - i, f = r.content - r.viewport, p = n === "ltr" ? [0, f] : [f * -1, 0];
  return Da([l, u], p)(e);
}
function ws(e, t, r = "ltr") {
  const n = Mr(t), o = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, s = t.scrollbar.size - o, a = t.content - t.viewport, i = s - n, l = r === "ltr" ? [0, a] : [a * -1, 0], u = Xt(e, l);
  return Da([0, a], [0, i])(u);
}
function Da(e, t) {
  return (r) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const n = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + n * (r - e[0]);
  };
}
function Ma(e, t) {
  return e > 0 && e < t;
}
var ff = (e, t = () => {
}) => {
  let r = { left: e.scrollLeft, top: e.scrollTop }, n = 0;
  return function o() {
    const s = { left: e.scrollLeft, top: e.scrollTop }, a = r.left !== s.left, i = r.top !== s.top;
    (a || i) && t(), r = s, n = window.requestAnimationFrame(o);
  }(), () => window.cancelAnimationFrame(n);
};
function kr(e, t) {
  const r = be(e), n = d.useRef(0);
  return d.useEffect(() => () => window.clearTimeout(n.current), []), d.useCallback(() => {
    window.clearTimeout(n.current), n.current = window.setTimeout(r, t);
  }, [r, t]);
}
function _t(e, t) {
  const r = be(t);
  xe(() => {
    let n = 0;
    if (e) {
      const o = new ResizeObserver(() => {
        cancelAnimationFrame(n), n = window.requestAnimationFrame(r);
      });
      return o.observe(e), () => {
        window.cancelAnimationFrame(n), o.unobserve(e);
      };
    }
  }, [e, r]);
}
var ka = Ea, pf = Pa, mf = ja;
const hf = d.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ c.jsxs(
  ka,
  {
    ref: n,
    className: de("relative overflow-hidden", e),
    ...r,
    children: [
      /* @__PURE__ */ c.jsx(pf, { className: "h-full w-full rounded-[inherit]", children: t }),
      /* @__PURE__ */ c.jsx(Ia, {}),
      /* @__PURE__ */ c.jsx(mf, {})
    ]
  }
));
hf.displayName = ka.displayName;
const Ia = d.forwardRef(({ className: e, orientation: t = "vertical", ...r }, n) => /* @__PURE__ */ c.jsx(
  lo,
  {
    ref: n,
    orientation: t,
    className: de(
      "flex touch-none select-none transition-colors",
      t === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      t === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      e
    ),
    ...r,
    children: /* @__PURE__ */ c.jsx(_a, { className: "bg-border relative flex-1 rounded-full" })
  }
));
Ia.displayName = lo.displayName;
function jt({
  prop: e,
  defaultProp: t,
  onChange: r = () => {
  }
}) {
  const [n, o] = gf({ defaultProp: t, onChange: r }), s = e !== void 0, a = s ? e : n, i = be(r), l = d.useCallback(
    (u) => {
      if (s) {
        const p = typeof u == "function" ? u(e) : u;
        p !== e && i(p);
      } else
        o(u);
    },
    [s, e, o, i]
  );
  return [a, l];
}
function gf({
  defaultProp: e,
  onChange: t
}) {
  const r = d.useState(e), [n] = r, o = d.useRef(n), s = be(t);
  return d.useEffect(() => {
    o.current !== n && (s(n), o.current = n);
  }, [n, o, s]), r;
}
function fo(e) {
  const t = d.useRef({ value: e, previous: e });
  return d.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
function po(e) {
  const [t, r] = d.useState(void 0);
  return xe(() => {
    if (e) {
      r({ width: e.offsetWidth, height: e.offsetHeight });
      const n = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const s = o[0];
        let a, i;
        if ("borderBoxSize" in s) {
          const l = s.borderBoxSize, u = Array.isArray(l) ? l[0] : l;
          a = u.inlineSize, i = u.blockSize;
        } else
          a = e.offsetWidth, i = e.offsetHeight;
        r({ width: a, height: i });
      });
      return n.observe(e, { box: "border-box" }), () => n.unobserve(e);
    } else
      r(void 0);
  }, [e]), t;
}
function vf(e, t = []) {
  let r = [];
  function n(s, a) {
    const i = d.createContext(a), l = r.length;
    r = [...r, a];
    function u(p) {
      const { scope: h, children: v, ...w } = p, m = (h == null ? void 0 : h[e][l]) || i, g = d.useMemo(() => w, Object.values(w));
      return /* @__PURE__ */ c.jsx(m.Provider, { value: g, children: v });
    }
    function f(p, h) {
      const v = (h == null ? void 0 : h[e][l]) || i, w = d.useContext(v);
      if (w) return w;
      if (a !== void 0) return a;
      throw new Error(`\`${p}\` must be used within \`${s}\``);
    }
    return u.displayName = s + "Provider", [u, f];
  }
  const o = () => {
    const s = r.map((a) => d.createContext(a));
    return function(i) {
      const l = (i == null ? void 0 : i[e]) || s;
      return d.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: l } }),
        [i, l]
      );
    };
  };
  return o.scopeName = e, [n, bf(o, ...t)];
}
function bf(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const r = () => {
    const n = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(s) {
      const a = n.reduce((i, { useScope: l, scopeName: u }) => {
        const p = l(s)[`__scope${u}`];
        return { ...i, ...p };
      }, {});
      return d.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return r.scopeName = t.scopeName, r;
}
function mo(e) {
  const t = e + "CollectionProvider", [r, n] = vf(t), [o, s] = r(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), a = (v) => {
    const { scope: w, children: m } = v, g = Pe.useRef(null), S = Pe.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ c.jsx(o, { scope: w, itemMap: S, collectionRef: g, children: m });
  };
  a.displayName = t;
  const i = e + "CollectionSlot", l = Pe.forwardRef(
    (v, w) => {
      const { scope: m, children: g } = v, S = s(i, m), b = ae(w, S.collectionRef);
      return /* @__PURE__ */ c.jsx(pt, { ref: b, children: g });
    }
  );
  l.displayName = i;
  const u = e + "CollectionItemSlot", f = "data-radix-collection-item", p = Pe.forwardRef(
    (v, w) => {
      const { scope: m, children: g, ...S } = v, b = Pe.useRef(null), y = ae(w, b), E = s(u, m);
      return Pe.useEffect(() => (E.itemMap.set(b, { ref: b, ...S }), () => void E.itemMap.delete(b))), /* @__PURE__ */ c.jsx(pt, { [f]: "", ref: y, children: g });
    }
  );
  p.displayName = u;
  function h(v) {
    const w = s(e + "CollectionConsumer", v);
    return Pe.useCallback(() => {
      const g = w.collectionRef.current;
      if (!g) return [];
      const S = Array.from(g.querySelectorAll(`[${f}]`));
      return Array.from(w.itemMap.values()).sort(
        (E, C) => S.indexOf(E.ref.current) - S.indexOf(C.ref.current)
      );
    }, [w.collectionRef, w.itemMap]);
  }
  return [
    { Provider: a, Slot: l, ItemSlot: p },
    h,
    n
  ];
}
var La = ["PageUp", "PageDown"], $a = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], Fa = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
}, kt = "Slider", [kn, yf, xf] = mo(kt), [Wa, Qg] = Mt(kt, [
  xf
]), [wf, Ir] = Wa(kt), za = d.forwardRef(
  (e, t) => {
    const {
      name: r,
      min: n = 0,
      max: o = 100,
      step: s = 1,
      orientation: a = "horizontal",
      disabled: i = !1,
      minStepsBetweenThumbs: l = 0,
      defaultValue: u = [n],
      value: f,
      onValueChange: p = () => {
      },
      onValueCommit: h = () => {
      },
      inverted: v = !1,
      form: w,
      ...m
    } = e, g = d.useRef(/* @__PURE__ */ new Set()), S = d.useRef(0), y = a === "horizontal" ? Sf : Cf, [E = [], C] = jt({
      prop: f,
      defaultProp: u,
      onChange: (L) => {
        var V;
        (V = [...g.current][S.current]) == null || V.focus(), p(L);
      }
    }), T = d.useRef(E);
    function R(L) {
      const D = Of(E, L);
      W(L, D);
    }
    function k(L) {
      W(L, S.current);
    }
    function M() {
      const L = T.current[S.current];
      E[S.current] !== L && h(E);
    }
    function W(L, D, { commit: V } = { commit: !1 }) {
      const _ = Af(s), U = Df(Math.round((L - n) / s) * s + n, _), F = Xt(U, [n, o]);
      C((H = []) => {
        const $ = Pf(H, F, D);
        if (jf($, l * s)) {
          S.current = $.indexOf(F);
          const G = String($) !== String(H);
          return G && V && h($), G ? $ : H;
        } else
          return H;
      });
    }
    return /* @__PURE__ */ c.jsx(
      wf,
      {
        scope: e.__scopeSlider,
        name: r,
        disabled: i,
        min: n,
        max: o,
        valueIndexToChangeRef: S,
        thumbs: g.current,
        values: E,
        orientation: a,
        form: w,
        children: /* @__PURE__ */ c.jsx(kn.Provider, { scope: e.__scopeSlider, children: /* @__PURE__ */ c.jsx(kn.Slot, { scope: e.__scopeSlider, children: /* @__PURE__ */ c.jsx(
          y,
          {
            "aria-disabled": i,
            "data-disabled": i ? "" : void 0,
            ...m,
            ref: t,
            onPointerDown: Z(m.onPointerDown, () => {
              i || (T.current = E);
            }),
            min: n,
            max: o,
            inverted: v,
            onSlideStart: i ? void 0 : R,
            onSlideMove: i ? void 0 : k,
            onSlideEnd: i ? void 0 : M,
            onHomeKeyDown: () => !i && W(n, 0, { commit: !0 }),
            onEndKeyDown: () => !i && W(o, E.length - 1, { commit: !0 }),
            onStepKeyDown: ({ event: L, direction: D }) => {
              if (!i) {
                const U = La.includes(L.key) || L.shiftKey && $a.includes(L.key) ? 10 : 1, F = S.current, H = E[F], $ = s * U * D;
                W(H + $, F, { commit: !0 });
              }
            }
          }
        ) }) })
      }
    );
  }
);
za.displayName = kt;
var [Ba, Va] = Wa(kt, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
}), Sf = d.forwardRef(
  (e, t) => {
    const {
      min: r,
      max: n,
      dir: o,
      inverted: s,
      onSlideStart: a,
      onSlideMove: i,
      onSlideEnd: l,
      onStepKeyDown: u,
      ...f
    } = e, [p, h] = d.useState(null), v = ae(t, (y) => h(y)), w = d.useRef(), m = ao(o), g = m === "ltr", S = g && !s || !g && s;
    function b(y) {
      const E = w.current || p.getBoundingClientRect(), C = [0, E.width], R = ho(C, S ? [r, n] : [n, r]);
      return w.current = E, R(y - E.left);
    }
    return /* @__PURE__ */ c.jsx(
      Ba,
      {
        scope: e.__scopeSlider,
        startEdge: S ? "left" : "right",
        endEdge: S ? "right" : "left",
        direction: S ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ c.jsx(
          Ha,
          {
            dir: m,
            "data-orientation": "horizontal",
            ...f,
            ref: v,
            style: {
              ...f.style,
              "--radix-slider-thumb-transform": "translateX(-50%)"
            },
            onSlideStart: (y) => {
              const E = b(y.clientX);
              a == null || a(E);
            },
            onSlideMove: (y) => {
              const E = b(y.clientX);
              i == null || i(E);
            },
            onSlideEnd: () => {
              w.current = void 0, l == null || l();
            },
            onStepKeyDown: (y) => {
              const C = Fa[S ? "from-left" : "from-right"].includes(y.key);
              u == null || u({ event: y, direction: C ? -1 : 1 });
            }
          }
        )
      }
    );
  }
), Cf = d.forwardRef(
  (e, t) => {
    const {
      min: r,
      max: n,
      inverted: o,
      onSlideStart: s,
      onSlideMove: a,
      onSlideEnd: i,
      onStepKeyDown: l,
      ...u
    } = e, f = d.useRef(null), p = ae(t, f), h = d.useRef(), v = !o;
    function w(m) {
      const g = h.current || f.current.getBoundingClientRect(), S = [0, g.height], y = ho(S, v ? [n, r] : [r, n]);
      return h.current = g, y(m - g.top);
    }
    return /* @__PURE__ */ c.jsx(
      Ba,
      {
        scope: e.__scopeSlider,
        startEdge: v ? "bottom" : "top",
        endEdge: v ? "top" : "bottom",
        size: "height",
        direction: v ? 1 : -1,
        children: /* @__PURE__ */ c.jsx(
          Ha,
          {
            "data-orientation": "vertical",
            ...u,
            ref: p,
            style: {
              ...u.style,
              "--radix-slider-thumb-transform": "translateY(50%)"
            },
            onSlideStart: (m) => {
              const g = w(m.clientY);
              s == null || s(g);
            },
            onSlideMove: (m) => {
              const g = w(m.clientY);
              a == null || a(g);
            },
            onSlideEnd: () => {
              h.current = void 0, i == null || i();
            },
            onStepKeyDown: (m) => {
              const S = Fa[v ? "from-bottom" : "from-top"].includes(m.key);
              l == null || l({ event: m, direction: S ? -1 : 1 });
            }
          }
        )
      }
    );
  }
), Ha = d.forwardRef(
  (e, t) => {
    const {
      __scopeSlider: r,
      onSlideStart: n,
      onSlideMove: o,
      onSlideEnd: s,
      onHomeKeyDown: a,
      onEndKeyDown: i,
      onStepKeyDown: l,
      ...u
    } = e, f = Ir(kt, r);
    return /* @__PURE__ */ c.jsx(
      te.span,
      {
        ...u,
        ref: t,
        onKeyDown: Z(e.onKeyDown, (p) => {
          p.key === "Home" ? (a(p), p.preventDefault()) : p.key === "End" ? (i(p), p.preventDefault()) : La.concat($a).includes(p.key) && (l(p), p.preventDefault());
        }),
        onPointerDown: Z(e.onPointerDown, (p) => {
          const h = p.target;
          h.setPointerCapture(p.pointerId), p.preventDefault(), f.thumbs.has(h) ? h.focus() : n(p);
        }),
        onPointerMove: Z(e.onPointerMove, (p) => {
          p.target.hasPointerCapture(p.pointerId) && o(p);
        }),
        onPointerUp: Z(e.onPointerUp, (p) => {
          const h = p.target;
          h.hasPointerCapture(p.pointerId) && (h.releasePointerCapture(p.pointerId), s(p));
        })
      }
    );
  }
), Ua = "SliderTrack", Ya = d.forwardRef(
  (e, t) => {
    const { __scopeSlider: r, ...n } = e, o = Ir(Ua, r);
    return /* @__PURE__ */ c.jsx(
      te.span,
      {
        "data-disabled": o.disabled ? "" : void 0,
        "data-orientation": o.orientation,
        ...n,
        ref: t
      }
    );
  }
);
Ya.displayName = Ua;
var In = "SliderRange", Xa = d.forwardRef(
  (e, t) => {
    const { __scopeSlider: r, ...n } = e, o = Ir(In, r), s = Va(In, r), a = d.useRef(null), i = ae(t, a), l = o.values.length, u = o.values.map(
      (h) => Ga(h, o.min, o.max)
    ), f = l > 1 ? Math.min(...u) : 0, p = 100 - Math.max(...u);
    return /* @__PURE__ */ c.jsx(
      te.span,
      {
        "data-orientation": o.orientation,
        "data-disabled": o.disabled ? "" : void 0,
        ...n,
        ref: i,
        style: {
          ...e.style,
          [s.startEdge]: f + "%",
          [s.endEdge]: p + "%"
        }
      }
    );
  }
);
Xa.displayName = In;
var Ln = "SliderThumb", Ka = d.forwardRef(
  (e, t) => {
    const r = yf(e.__scopeSlider), [n, o] = d.useState(null), s = ae(t, (i) => o(i)), a = d.useMemo(
      () => n ? r().findIndex((i) => i.ref.current === n) : -1,
      [r, n]
    );
    return /* @__PURE__ */ c.jsx(Ef, { ...e, ref: s, index: a });
  }
), Ef = d.forwardRef(
  (e, t) => {
    const { __scopeSlider: r, index: n, name: o, ...s } = e, a = Ir(Ln, r), i = Va(Ln, r), [l, u] = d.useState(null), f = ae(t, (b) => u(b)), p = l ? a.form || !!l.closest("form") : !0, h = po(l), v = a.values[n], w = v === void 0 ? 0 : Ga(v, a.min, a.max), m = Tf(n, a.values.length), g = h == null ? void 0 : h[i.size], S = g ? Nf(g, w, i.direction) : 0;
    return d.useEffect(() => {
      if (l)
        return a.thumbs.add(l), () => {
          a.thumbs.delete(l);
        };
    }, [l, a.thumbs]), /* @__PURE__ */ c.jsxs(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [i.startEdge]: `calc(${w}% + ${S}px)`
        },
        children: [
          /* @__PURE__ */ c.jsx(kn.ItemSlot, { scope: e.__scopeSlider, children: /* @__PURE__ */ c.jsx(
            te.span,
            {
              role: "slider",
              "aria-label": e["aria-label"] || m,
              "aria-valuemin": a.min,
              "aria-valuenow": v,
              "aria-valuemax": a.max,
              "aria-orientation": a.orientation,
              "data-orientation": a.orientation,
              "data-disabled": a.disabled ? "" : void 0,
              tabIndex: a.disabled ? void 0 : 0,
              ...s,
              ref: f,
              style: v === void 0 ? { display: "none" } : e.style,
              onFocus: Z(e.onFocus, () => {
                a.valueIndexToChangeRef.current = n;
              })
            }
          ) }),
          p && /* @__PURE__ */ c.jsx(
            Rf,
            {
              name: o ?? (a.name ? a.name + (a.values.length > 1 ? "[]" : "") : void 0),
              form: a.form,
              value: v
            },
            n
          )
        ]
      }
    );
  }
);
Ka.displayName = Ln;
var Rf = (e) => {
  const { value: t, ...r } = e, n = d.useRef(null), o = fo(t);
  return d.useEffect(() => {
    const s = n.current, a = window.HTMLInputElement.prototype, l = Object.getOwnPropertyDescriptor(a, "value").set;
    if (o !== t && l) {
      const u = new Event("input", { bubbles: !0 });
      l.call(s, t), s.dispatchEvent(u);
    }
  }, [o, t]), /* @__PURE__ */ c.jsx("input", { style: { display: "none" }, ...r, ref: n, defaultValue: t });
};
function Pf(e = [], t, r) {
  const n = [...e];
  return n[r] = t, n.sort((o, s) => o - s);
}
function Ga(e, t, r) {
  const s = 100 / (r - t) * (e - t);
  return Xt(s, [0, 100]);
}
function Tf(e, t) {
  return t > 2 ? `Value ${e + 1} of ${t}` : t === 2 ? ["Minimum", "Maximum"][e] : void 0;
}
function Of(e, t) {
  if (e.length === 1) return 0;
  const r = e.map((o) => Math.abs(o - t)), n = Math.min(...r);
  return r.indexOf(n);
}
function Nf(e, t, r) {
  const n = e / 2, s = ho([0, 50], [0, n]);
  return (n - s(t) * r) * r;
}
function _f(e) {
  return e.slice(0, -1).map((t, r) => e[r + 1] - t);
}
function jf(e, t) {
  if (t > 0) {
    const r = _f(e);
    return Math.min(...r) >= t;
  }
  return !0;
}
function ho(e, t) {
  return (r) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const n = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + n * (r - e[0]);
  };
}
function Af(e) {
  return (String(e).split(".")[1] || "").length;
}
function Df(e, t) {
  const r = Math.pow(10, t);
  return Math.round(e * r) / r;
}
var qa = za, Mf = Ya, kf = Xa, If = Ka;
const Za = d.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ c.jsxs(
  qa,
  {
    ref: r,
    className: de(
      "relative flex w-full touch-none select-none items-center",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ c.jsx(Mf, { className: "bg-primary/20 relative h-1.5 w-full grow overflow-hidden rounded-full", children: /* @__PURE__ */ c.jsx(kf, { className: "bg-primary absolute h-full" }) }),
      /* @__PURE__ */ c.jsx(If, { className: "border-primary/50 bg-background focus-visible:ring-ring block h-4 w-4 rounded-full border shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50" })
    ]
  }
));
Za.displayName = qa.displayName;
function Lf(e, t = globalThis == null ? void 0 : globalThis.document) {
  const r = be(e);
  d.useEffect(() => {
    const n = (o) => {
      o.key === "Escape" && r(o);
    };
    return t.addEventListener("keydown", n, { capture: !0 }), () => t.removeEventListener("keydown", n, { capture: !0 });
  }, [r, t]);
}
var $f = "DismissableLayer", $n = "dismissableLayer.update", Ff = "dismissableLayer.pointerDownOutside", Wf = "dismissableLayer.focusOutside", Ss, Ja = d.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Lr = d.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: r = !1,
      onEscapeKeyDown: n,
      onPointerDownOutside: o,
      onFocusOutside: s,
      onInteractOutside: a,
      onDismiss: i,
      ...l
    } = e, u = d.useContext(Ja), [f, p] = d.useState(null), h = (f == null ? void 0 : f.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, v] = d.useState({}), w = ae(t, (R) => p(R)), m = Array.from(u.layers), [g] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), S = m.indexOf(g), b = f ? m.indexOf(f) : -1, y = u.layersWithOutsidePointerEventsDisabled.size > 0, E = b >= S, C = Bf((R) => {
      const k = R.target, M = [...u.branches].some((W) => W.contains(k));
      !E || M || (o == null || o(R), a == null || a(R), R.defaultPrevented || i == null || i());
    }, h), T = Vf((R) => {
      const k = R.target;
      [...u.branches].some((W) => W.contains(k)) || (s == null || s(R), a == null || a(R), R.defaultPrevented || i == null || i());
    }, h);
    return Lf((R) => {
      b === u.layers.size - 1 && (n == null || n(R), !R.defaultPrevented && i && (R.preventDefault(), i()));
    }, h), d.useEffect(() => {
      if (f)
        return r && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (Ss = h.body.style.pointerEvents, h.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(f)), u.layers.add(f), Cs(), () => {
          r && u.layersWithOutsidePointerEventsDisabled.size === 1 && (h.body.style.pointerEvents = Ss);
        };
    }, [f, h, r, u]), d.useEffect(() => () => {
      f && (u.layers.delete(f), u.layersWithOutsidePointerEventsDisabled.delete(f), Cs());
    }, [f, u]), d.useEffect(() => {
      const R = () => v({});
      return document.addEventListener($n, R), () => document.removeEventListener($n, R);
    }, []), /* @__PURE__ */ c.jsx(
      te.div,
      {
        ...l,
        ref: w,
        style: {
          pointerEvents: y ? E ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: Z(e.onFocusCapture, T.onFocusCapture),
        onBlurCapture: Z(e.onBlurCapture, T.onBlurCapture),
        onPointerDownCapture: Z(
          e.onPointerDownCapture,
          C.onPointerDownCapture
        )
      }
    );
  }
);
Lr.displayName = $f;
var zf = "DismissableLayerBranch", Qa = d.forwardRef((e, t) => {
  const r = d.useContext(Ja), n = d.useRef(null), o = ae(t, n);
  return d.useEffect(() => {
    const s = n.current;
    if (s)
      return r.branches.add(s), () => {
        r.branches.delete(s);
      };
  }, [r.branches]), /* @__PURE__ */ c.jsx(te.div, { ...e, ref: o });
});
Qa.displayName = zf;
function Bf(e, t = globalThis == null ? void 0 : globalThis.document) {
  const r = be(e), n = d.useRef(!1), o = d.useRef(() => {
  });
  return d.useEffect(() => {
    const s = (i) => {
      if (i.target && !n.current) {
        let l = function() {
          ei(
            Ff,
            r,
            u,
            { discrete: !0 }
          );
        };
        const u = { originalEvent: i };
        i.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = l, t.addEventListener("click", o.current, { once: !0 })) : l();
      } else
        t.removeEventListener("click", o.current);
      n.current = !1;
    }, a = window.setTimeout(() => {
      t.addEventListener("pointerdown", s);
    }, 0);
    return () => {
      window.clearTimeout(a), t.removeEventListener("pointerdown", s), t.removeEventListener("click", o.current);
    };
  }, [t, r]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => n.current = !0
  };
}
function Vf(e, t = globalThis == null ? void 0 : globalThis.document) {
  const r = be(e), n = d.useRef(!1);
  return d.useEffect(() => {
    const o = (s) => {
      s.target && !n.current && ei(Wf, r, { originalEvent: s }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, r]), {
    onFocusCapture: () => n.current = !0,
    onBlurCapture: () => n.current = !1
  };
}
function Cs() {
  const e = new CustomEvent($n);
  document.dispatchEvent(e);
}
function ei(e, t, r, { discrete: n }) {
  const o = r.originalEvent.target, s = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: r });
  t && o.addEventListener(e, t, { once: !0 }), n ? Sa(o, s) : o.dispatchEvent(s);
}
var Hf = Lr, Uf = Qa, Yf = "Portal", $r = d.forwardRef((e, t) => {
  var i;
  const { container: r, ...n } = e, [o, s] = d.useState(!1);
  xe(() => s(!0), []);
  const a = r || o && ((i = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : i.body);
  return a ? Zn.createPortal(/* @__PURE__ */ c.jsx(te.div, { ...n, ref: t }), a) : null;
});
$r.displayName = Yf;
var Xf = "VisuallyHidden", Fr = d.forwardRef(
  (e, t) => /* @__PURE__ */ c.jsx(
    te.span,
    {
      ...e,
      ref: t,
      style: {
        // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
        position: "absolute",
        border: 0,
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        wordWrap: "normal",
        ...e.style
      }
    }
  )
);
Fr.displayName = Xf;
var go = "ToastProvider", [vo, Kf, Gf] = mo("Toast"), [ti, ev] = Mt("Toast", [Gf]), [qf, Wr] = ti(go), ri = (e) => {
  const {
    __scopeToast: t,
    label: r = "Notification",
    duration: n = 5e3,
    swipeDirection: o = "right",
    swipeThreshold: s = 50,
    children: a
  } = e, [i, l] = d.useState(null), [u, f] = d.useState(0), p = d.useRef(!1), h = d.useRef(!1);
  return r.trim() || console.error(
    `Invalid prop \`label\` supplied to \`${go}\`. Expected non-empty \`string\`.`
  ), /* @__PURE__ */ c.jsx(vo.Provider, { scope: t, children: /* @__PURE__ */ c.jsx(
    qf,
    {
      scope: t,
      label: r,
      duration: n,
      swipeDirection: o,
      swipeThreshold: s,
      toastCount: u,
      viewport: i,
      onViewportChange: l,
      onToastAdd: d.useCallback(() => f((v) => v + 1), []),
      onToastRemove: d.useCallback(() => f((v) => v - 1), []),
      isFocusedToastEscapeKeyDownRef: p,
      isClosePausedRef: h,
      children: a
    }
  ) });
};
ri.displayName = go;
var ni = "ToastViewport", Zf = ["F8"], Fn = "toast.viewportPause", Wn = "toast.viewportResume", oi = d.forwardRef(
  (e, t) => {
    const {
      __scopeToast: r,
      hotkey: n = Zf,
      label: o = "Notifications ({hotkey})",
      ...s
    } = e, a = Wr(ni, r), i = Kf(r), l = d.useRef(null), u = d.useRef(null), f = d.useRef(null), p = d.useRef(null), h = ae(t, p, a.onViewportChange), v = n.join("+").replace(/Key/g, "").replace(/Digit/g, ""), w = a.toastCount > 0;
    d.useEffect(() => {
      const g = (S) => {
        var y;
        n.length !== 0 && n.every((E) => S[E] || S.code === E) && ((y = p.current) == null || y.focus());
      };
      return document.addEventListener("keydown", g), () => document.removeEventListener("keydown", g);
    }, [n]), d.useEffect(() => {
      const g = l.current, S = p.current;
      if (w && g && S) {
        const b = () => {
          if (!a.isClosePausedRef.current) {
            const T = new CustomEvent(Fn);
            S.dispatchEvent(T), a.isClosePausedRef.current = !0;
          }
        }, y = () => {
          if (a.isClosePausedRef.current) {
            const T = new CustomEvent(Wn);
            S.dispatchEvent(T), a.isClosePausedRef.current = !1;
          }
        }, E = (T) => {
          !g.contains(T.relatedTarget) && y();
        }, C = () => {
          g.contains(document.activeElement) || y();
        };
        return g.addEventListener("focusin", b), g.addEventListener("focusout", E), g.addEventListener("pointermove", b), g.addEventListener("pointerleave", C), window.addEventListener("blur", b), window.addEventListener("focus", y), () => {
          g.removeEventListener("focusin", b), g.removeEventListener("focusout", E), g.removeEventListener("pointermove", b), g.removeEventListener("pointerleave", C), window.removeEventListener("blur", b), window.removeEventListener("focus", y);
        };
      }
    }, [w, a.isClosePausedRef]);
    const m = d.useCallback(
      ({ tabbingDirection: g }) => {
        const b = i().map((y) => {
          const E = y.ref.current, C = [E, ...dp(E)];
          return g === "forwards" ? C : C.reverse();
        });
        return (g === "forwards" ? b.reverse() : b).flat();
      },
      [i]
    );
    return d.useEffect(() => {
      const g = p.current;
      if (g) {
        const S = (b) => {
          var C, T, R;
          const y = b.altKey || b.ctrlKey || b.metaKey;
          if (b.key === "Tab" && !y) {
            const k = document.activeElement, M = b.shiftKey;
            if (b.target === g && M) {
              (C = u.current) == null || C.focus();
              return;
            }
            const D = m({ tabbingDirection: M ? "backwards" : "forwards" }), V = D.findIndex((_) => _ === k);
            hn(D.slice(V + 1)) ? b.preventDefault() : M ? (T = u.current) == null || T.focus() : (R = f.current) == null || R.focus();
          }
        };
        return g.addEventListener("keydown", S), () => g.removeEventListener("keydown", S);
      }
    }, [i, m]), /* @__PURE__ */ c.jsxs(
      Uf,
      {
        ref: l,
        role: "region",
        "aria-label": o.replace("{hotkey}", v),
        tabIndex: -1,
        style: { pointerEvents: w ? void 0 : "none" },
        children: [
          w && /* @__PURE__ */ c.jsx(
            zn,
            {
              ref: u,
              onFocusFromOutsideViewport: () => {
                const g = m({
                  tabbingDirection: "forwards"
                });
                hn(g);
              }
            }
          ),
          /* @__PURE__ */ c.jsx(vo.Slot, { scope: r, children: /* @__PURE__ */ c.jsx(te.ol, { tabIndex: -1, ...s, ref: h }) }),
          w && /* @__PURE__ */ c.jsx(
            zn,
            {
              ref: f,
              onFocusFromOutsideViewport: () => {
                const g = m({
                  tabbingDirection: "backwards"
                });
                hn(g);
              }
            }
          )
        ]
      }
    );
  }
);
oi.displayName = ni;
var si = "ToastFocusProxy", zn = d.forwardRef(
  (e, t) => {
    const { __scopeToast: r, onFocusFromOutsideViewport: n, ...o } = e, s = Wr(si, r);
    return /* @__PURE__ */ c.jsx(
      Fr,
      {
        "aria-hidden": !0,
        tabIndex: 0,
        ...o,
        ref: t,
        style: { position: "fixed" },
        onFocus: (a) => {
          var u;
          const i = a.relatedTarget;
          !((u = s.viewport) != null && u.contains(i)) && n();
        }
      }
    );
  }
);
zn.displayName = si;
var zr = "Toast", Jf = "toast.swipeStart", Qf = "toast.swipeMove", ep = "toast.swipeCancel", tp = "toast.swipeEnd", ai = d.forwardRef(
  (e, t) => {
    const { forceMount: r, open: n, defaultOpen: o, onOpenChange: s, ...a } = e, [i = !0, l] = jt({
      prop: n,
      defaultProp: o,
      onChange: s
    });
    return /* @__PURE__ */ c.jsx(et, { present: r || i, children: /* @__PURE__ */ c.jsx(
      op,
      {
        open: i,
        ...a,
        ref: t,
        onClose: () => l(!1),
        onPause: be(e.onPause),
        onResume: be(e.onResume),
        onSwipeStart: Z(e.onSwipeStart, (u) => {
          u.currentTarget.setAttribute("data-swipe", "start");
        }),
        onSwipeMove: Z(e.onSwipeMove, (u) => {
          const { x: f, y: p } = u.detail.delta;
          u.currentTarget.setAttribute("data-swipe", "move"), u.currentTarget.style.setProperty("--radix-toast-swipe-move-x", `${f}px`), u.currentTarget.style.setProperty("--radix-toast-swipe-move-y", `${p}px`);
        }),
        onSwipeCancel: Z(e.onSwipeCancel, (u) => {
          u.currentTarget.setAttribute("data-swipe", "cancel"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"), u.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"), u.currentTarget.style.removeProperty("--radix-toast-swipe-end-y");
        }),
        onSwipeEnd: Z(e.onSwipeEnd, (u) => {
          const { x: f, y: p } = u.detail.delta;
          u.currentTarget.setAttribute("data-swipe", "end"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"), u.currentTarget.style.setProperty("--radix-toast-swipe-end-x", `${f}px`), u.currentTarget.style.setProperty("--radix-toast-swipe-end-y", `${p}px`), l(!1);
        })
      }
    ) });
  }
);
ai.displayName = zr;
var [rp, np] = ti(zr, {
  onClose() {
  }
}), op = d.forwardRef(
  (e, t) => {
    const {
      __scopeToast: r,
      type: n = "foreground",
      duration: o,
      open: s,
      onClose: a,
      onEscapeKeyDown: i,
      onPause: l,
      onResume: u,
      onSwipeStart: f,
      onSwipeMove: p,
      onSwipeCancel: h,
      onSwipeEnd: v,
      ...w
    } = e, m = Wr(zr, r), [g, S] = d.useState(null), b = ae(t, (_) => S(_)), y = d.useRef(null), E = d.useRef(null), C = o || m.duration, T = d.useRef(0), R = d.useRef(C), k = d.useRef(0), { onToastAdd: M, onToastRemove: W } = m, L = be(() => {
      var U;
      (g == null ? void 0 : g.contains(document.activeElement)) && ((U = m.viewport) == null || U.focus()), a();
    }), D = d.useCallback(
      (_) => {
        !_ || _ === 1 / 0 || (window.clearTimeout(k.current), T.current = (/* @__PURE__ */ new Date()).getTime(), k.current = window.setTimeout(L, _));
      },
      [L]
    );
    d.useEffect(() => {
      const _ = m.viewport;
      if (_) {
        const U = () => {
          D(R.current), u == null || u();
        }, F = () => {
          const H = (/* @__PURE__ */ new Date()).getTime() - T.current;
          R.current = R.current - H, window.clearTimeout(k.current), l == null || l();
        };
        return _.addEventListener(Fn, F), _.addEventListener(Wn, U), () => {
          _.removeEventListener(Fn, F), _.removeEventListener(Wn, U);
        };
      }
    }, [m.viewport, C, l, u, D]), d.useEffect(() => {
      s && !m.isClosePausedRef.current && D(C);
    }, [s, C, m.isClosePausedRef, D]), d.useEffect(() => (M(), () => W()), [M, W]);
    const V = d.useMemo(() => g ? pi(g) : null, [g]);
    return m.viewport ? /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      V && /* @__PURE__ */ c.jsx(
        sp,
        {
          __scopeToast: r,
          role: "status",
          "aria-live": n === "foreground" ? "assertive" : "polite",
          "aria-atomic": !0,
          children: V
        }
      ),
      /* @__PURE__ */ c.jsx(rp, { scope: r, onClose: L, children: qt.createPortal(
        /* @__PURE__ */ c.jsx(vo.ItemSlot, { scope: r, children: /* @__PURE__ */ c.jsx(
          Hf,
          {
            asChild: !0,
            onEscapeKeyDown: Z(i, () => {
              m.isFocusedToastEscapeKeyDownRef.current || L(), m.isFocusedToastEscapeKeyDownRef.current = !1;
            }),
            children: /* @__PURE__ */ c.jsx(
              te.li,
              {
                role: "status",
                "aria-live": "off",
                "aria-atomic": !0,
                tabIndex: 0,
                "data-state": s ? "open" : "closed",
                "data-swipe-direction": m.swipeDirection,
                ...w,
                ref: b,
                style: { userSelect: "none", touchAction: "none", ...e.style },
                onKeyDown: Z(e.onKeyDown, (_) => {
                  _.key === "Escape" && (i == null || i(_.nativeEvent), _.nativeEvent.defaultPrevented || (m.isFocusedToastEscapeKeyDownRef.current = !0, L()));
                }),
                onPointerDown: Z(e.onPointerDown, (_) => {
                  _.button === 0 && (y.current = { x: _.clientX, y: _.clientY });
                }),
                onPointerMove: Z(e.onPointerMove, (_) => {
                  if (!y.current) return;
                  const U = _.clientX - y.current.x, F = _.clientY - y.current.y, H = !!E.current, $ = ["left", "right"].includes(m.swipeDirection), G = ["left", "up"].includes(m.swipeDirection) ? Math.min : Math.max, P = $ ? G(0, U) : 0, j = $ ? 0 : G(0, F), J = _.pointerType === "touch" ? 10 : 2, X = { x: P, y: j }, Y = { originalEvent: _, delta: X };
                  H ? (E.current = X, ir(Qf, p, Y, {
                    discrete: !1
                  })) : Es(X, m.swipeDirection, J) ? (E.current = X, ir(Jf, f, Y, {
                    discrete: !1
                  }), _.target.setPointerCapture(_.pointerId)) : (Math.abs(U) > J || Math.abs(F) > J) && (y.current = null);
                }),
                onPointerUp: Z(e.onPointerUp, (_) => {
                  const U = E.current, F = _.target;
                  if (F.hasPointerCapture(_.pointerId) && F.releasePointerCapture(_.pointerId), E.current = null, y.current = null, U) {
                    const H = _.currentTarget, $ = { originalEvent: _, delta: U };
                    Es(U, m.swipeDirection, m.swipeThreshold) ? ir(tp, v, $, {
                      discrete: !0
                    }) : ir(
                      ep,
                      h,
                      $,
                      {
                        discrete: !0
                      }
                    ), H.addEventListener("click", (G) => G.preventDefault(), {
                      once: !0
                    });
                  }
                })
              }
            )
          }
        ) }),
        m.viewport
      ) })
    ] }) : null;
  }
), sp = (e) => {
  const { __scopeToast: t, children: r, ...n } = e, o = Wr(zr, t), [s, a] = d.useState(!1), [i, l] = d.useState(!1);
  return cp(() => a(!0)), d.useEffect(() => {
    const u = window.setTimeout(() => l(!0), 1e3);
    return () => window.clearTimeout(u);
  }, []), i ? null : /* @__PURE__ */ c.jsx($r, { asChild: !0, children: /* @__PURE__ */ c.jsx(Fr, { ...n, children: s && /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    o.label,
    " ",
    r
  ] }) }) });
}, ap = "ToastTitle", ii = d.forwardRef(
  (e, t) => {
    const { __scopeToast: r, ...n } = e;
    return /* @__PURE__ */ c.jsx(te.div, { ...n, ref: t });
  }
);
ii.displayName = ap;
var ip = "ToastDescription", lp = d.forwardRef(
  (e, t) => {
    const { __scopeToast: r, ...n } = e;
    return /* @__PURE__ */ c.jsx(te.div, { ...n, ref: t });
  }
);
lp.displayName = ip;
var li = "ToastAction", ci = d.forwardRef(
  (e, t) => {
    const { altText: r, ...n } = e;
    return r.trim() ? /* @__PURE__ */ c.jsx(fi, { altText: r, asChild: !0, children: /* @__PURE__ */ c.jsx(di, { ...n, ref: t }) }) : (console.error(
      `Invalid prop \`altText\` supplied to \`${li}\`. Expected non-empty \`string\`.`
    ), null);
  }
);
ci.displayName = li;
var ui = "ToastClose", di = d.forwardRef(
  (e, t) => {
    const { __scopeToast: r, ...n } = e, o = np(ui, r);
    return /* @__PURE__ */ c.jsx(fi, { asChild: !0, children: /* @__PURE__ */ c.jsx(
      te.button,
      {
        type: "button",
        ...n,
        ref: t,
        onClick: Z(e.onClick, o.onClose)
      }
    ) });
  }
);
di.displayName = ui;
var fi = d.forwardRef((e, t) => {
  const { __scopeToast: r, altText: n, ...o } = e;
  return /* @__PURE__ */ c.jsx(
    te.div,
    {
      "data-radix-toast-announce-exclude": "",
      "data-radix-toast-announce-alt": n || void 0,
      ...o,
      ref: t
    }
  );
});
function pi(e) {
  const t = [];
  return Array.from(e.childNodes).forEach((n) => {
    if (n.nodeType === n.TEXT_NODE && n.textContent && t.push(n.textContent), up(n)) {
      const o = n.ariaHidden || n.hidden || n.style.display === "none", s = n.dataset.radixToastAnnounceExclude === "";
      if (!o)
        if (s) {
          const a = n.dataset.radixToastAnnounceAlt;
          a && t.push(a);
        } else
          t.push(...pi(n));
    }
  }), t;
}
function ir(e, t, r, { discrete: n }) {
  const o = r.originalEvent.currentTarget, s = new CustomEvent(e, { bubbles: !0, cancelable: !0, detail: r });
  t && o.addEventListener(e, t, { once: !0 }), n ? Sa(o, s) : o.dispatchEvent(s);
}
var Es = (e, t, r = 0) => {
  const n = Math.abs(e.x), o = Math.abs(e.y), s = n > o;
  return t === "left" || t === "right" ? s && n > r : !s && o > r;
};
function cp(e = () => {
}) {
  const t = be(e);
  xe(() => {
    let r = 0, n = 0;
    return r = window.requestAnimationFrame(() => n = window.requestAnimationFrame(t)), () => {
      window.cancelAnimationFrame(r), window.cancelAnimationFrame(n);
    };
  }, [t]);
}
function up(e) {
  return e.nodeType === e.ELEMENT_NODE;
}
function dp(e) {
  const t = [], r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => {
      const o = n.tagName === "INPUT" && n.type === "hidden";
      return n.disabled || n.hidden || o ? NodeFilter.FILTER_SKIP : n.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; r.nextNode(); ) t.push(r.currentNode);
  return t;
}
function hn(e) {
  const t = document.activeElement;
  return e.some((r) => r === t ? !0 : (r.focus(), document.activeElement !== t));
}
var fp = ri, pp = oi, mp = ai, hp = ii, gp = ci;
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vp = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), mi = (...e) => e.filter((t, r, n) => !!t && t.trim() !== "" && n.indexOf(t) === r).join(" ").trim();
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var bp = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yp = vt(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: r = 2,
    absoluteStrokeWidth: n,
    className: o = "",
    children: s,
    iconNode: a,
    ...i
  }, l) => Ae(
    "svg",
    {
      ref: l,
      ...bp,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: n ? Number(r) * 24 / Number(t) : r,
      className: mi("lucide", o),
      ...i
    },
    [
      ...a.map(([u, f]) => Ae(u, f)),
      ...Array.isArray(s) ? s : [s]
    ]
  )
);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ke = (e, t) => {
  const r = vt(
    ({ className: n, ...o }, s) => Ae(yp, {
      ref: s,
      iconNode: t,
      className: mi(`lucide-${vp(e)}`, n),
      ...o
    })
  );
  return r.displayName = `${e}`, r;
};
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xp = ke("ChevronLeft", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wp = ke("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sp = ke("Clock", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cp = ke("Ellipsis", [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ep = ke("FastForward", [
  ["polygon", { points: "13 19 22 12 13 5 13 19", key: "587y9g" }],
  ["polygon", { points: "2 19 11 12 2 5 2 19", key: "3pweh0" }]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hi = ke("Flag", [
  ["path", { d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z", key: "i9b6wo" }],
  ["line", { x1: "4", x2: "4", y1: "22", y2: "15", key: "1cm3nv" }]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gi = ke("Repeat1", [
  ["path", { d: "m17 2 4 4-4 4", key: "nntrym" }],
  ["path", { d: "M3 11v-1a4 4 0 0 1 4-4h14", key: "84bu3i" }],
  ["path", { d: "m7 22-4-4 4-4", key: "1wqhfi" }],
  ["path", { d: "M21 13v1a4 4 0 0 1-4 4H3", key: "1rx37r" }],
  ["path", { d: "M11 10h1v4", key: "70cz1p" }]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rp = ke("Rewind", [
  ["polygon", { points: "11 19 2 12 11 5 11 19", key: "14yba5" }],
  ["polygon", { points: "22 19 13 12 22 5 22 19", key: "1pi1cj" }]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pp = ke("SkipBack", [
  ["polygon", { points: "19 20 9 12 19 4 19 20", key: "o2sva" }],
  ["line", { x1: "5", x2: "5", y1: "19", y2: "5", key: "1ocqjk" }]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tp = ke("SkipForward", [
  ["polygon", { points: "5 4 15 12 5 20 5 4", key: "16p6eg" }],
  ["line", { x1: "19", x2: "19", y1: "5", y2: "19", key: "futhcm" }]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vi = ke("Undo", [
  ["path", { d: "M3 7v6h6", key: "1v2h90" }],
  ["path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13", key: "1r6uu6" }]
]);
/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bo = ke("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
let yr = null;
const tv = {
  show: (e, t = "info") => {
    yr && yr({ open: !0, message: e, type: t });
  }
}, rv = ({ children: e }) => {
  const [t, r] = Fe({
    open: !1,
    message: "",
    type: "info"
  });
  Tr(() => (yr = r, () => {
    yr = null;
  }), []);
  const n = (o) => {
    switch (o) {
      case "error":
        return "border-red-500";
      case "warning":
        return "border-yellow-500";
      case "success":
        return "border-green-500";
      case "info":
      default:
        return "border-blue-500";
    }
  };
  return /* @__PURE__ */ c.jsxs(fp, { swipeDirection: "right", duration: 5e3, children: [
    e,
    /* @__PURE__ */ c.jsx(
      mp,
      {
        open: t.open,
        duration: 5e3,
        onOpenChange: (o) => r((s) => ({ ...s, open: o })),
        className: "animate-in fade-in slide-in-from-top-4 fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-[600px] -translate-x-1/2",
        children: /* @__PURE__ */ c.jsxs(
          "div",
          {
            className: `rounded-lg border bg-[#202020] p-6 text-[#e0e0e0] shadow-lg ${n(t.type)} flex items-center justify-between`,
            children: [
              /* @__PURE__ */ c.jsx(hp, { className: "pr-8 text-lg font-light leading-tight", children: t.message }),
              /* @__PURE__ */ c.jsx(gp, { asChild: !0, altText: "Close", children: /* @__PURE__ */ c.jsx(
                "button",
                {
                  onClick: () => r((o) => ({ ...o, open: !1 })),
                  className: "rounded-full p-1 text-[#e0e0e0] transition-colors hover:bg-white/10 hover:text-white",
                  "aria-label": "Close notification",
                  children: /* @__PURE__ */ c.jsx(bo, { className: "h-6 w-6" })
                }
              ) })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ c.jsx(pp, { className: "fixed bottom-0 left-1/2 z-50 mb-20 flex w-full max-w-sm -translate-x-1/2 transform list-none flex-col gap-2 p-6 outline-none" })
  ] });
};
var yo = "Switch", [Op, nv] = Mt(yo), [Np, _p] = Op(yo), bi = d.forwardRef(
  (e, t) => {
    const {
      __scopeSwitch: r,
      name: n,
      checked: o,
      defaultChecked: s,
      required: a,
      disabled: i,
      value: l = "on",
      onCheckedChange: u,
      form: f,
      ...p
    } = e, [h, v] = d.useState(null), w = ae(t, (y) => v(y)), m = d.useRef(!1), g = h ? f || !!h.closest("form") : !0, [S = !1, b] = jt({
      prop: o,
      defaultProp: s,
      onChange: u
    });
    return /* @__PURE__ */ c.jsxs(Np, { scope: r, checked: S, disabled: i, children: [
      /* @__PURE__ */ c.jsx(
        te.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": S,
          "aria-required": a,
          "data-state": wi(S),
          "data-disabled": i ? "" : void 0,
          disabled: i,
          value: l,
          ...p,
          ref: w,
          onClick: Z(e.onClick, (y) => {
            b((E) => !E), g && (m.current = y.isPropagationStopped(), m.current || y.stopPropagation());
          })
        }
      ),
      g && /* @__PURE__ */ c.jsx(
        jp,
        {
          control: h,
          bubbles: !m.current,
          name: n,
          value: l,
          checked: S,
          required: a,
          disabled: i,
          form: f,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
bi.displayName = yo;
var yi = "SwitchThumb", xi = d.forwardRef(
  (e, t) => {
    const { __scopeSwitch: r, ...n } = e, o = _p(yi, r);
    return /* @__PURE__ */ c.jsx(
      te.span,
      {
        "data-state": wi(o.checked),
        "data-disabled": o.disabled ? "" : void 0,
        ...n,
        ref: t
      }
    );
  }
);
xi.displayName = yi;
var jp = (e) => {
  const { control: t, checked: r, bubbles: n = !0, ...o } = e, s = d.useRef(null), a = fo(r), i = po(t);
  return d.useEffect(() => {
    const l = s.current, u = window.HTMLInputElement.prototype, p = Object.getOwnPropertyDescriptor(u, "checked").set;
    if (a !== r && p) {
      const h = new Event("click", { bubbles: n });
      p.call(l, r), l.dispatchEvent(h);
    }
  }, [a, r, n]), /* @__PURE__ */ c.jsx(
    "input",
    {
      type: "checkbox",
      "aria-hidden": !0,
      defaultChecked: r,
      ...o,
      tabIndex: -1,
      ref: s,
      style: {
        ...e.style,
        ...i,
        position: "absolute",
        pointerEvents: "none",
        opacity: 0,
        margin: 0
      }
    }
  );
};
function wi(e) {
  return e ? "checked" : "unchecked";
}
var Si = bi, Ap = xi;
const Dp = d.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ c.jsx(
  Si,
  {
    className: de(
      "focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-input peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      e
    ),
    ...t,
    ref: r,
    children: /* @__PURE__ */ c.jsx(
      Ap,
      {
        className: de(
          "bg-background pointer-events-none block h-4 w-4 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Dp.displayName = Si.displayName;
var Mp = d.useId || (() => {
}), kp = 0;
function Pt(e) {
  const [t, r] = d.useState(Mp());
  return xe(() => {
    r((n) => n ?? String(kp++));
  }, [e]), t ? `radix-${t}` : "";
}
var gn = "focusScope.autoFocusOnMount", vn = "focusScope.autoFocusOnUnmount", Rs = { bubbles: !1, cancelable: !0 }, Ip = "FocusScope", xo = d.forwardRef((e, t) => {
  const {
    loop: r = !1,
    trapped: n = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: s,
    ...a
  } = e, [i, l] = d.useState(null), u = be(o), f = be(s), p = d.useRef(null), h = ae(t, (m) => l(m)), v = d.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  d.useEffect(() => {
    if (n) {
      let m = function(y) {
        if (v.paused || !i) return;
        const E = y.target;
        i.contains(E) ? p.current = E : at(p.current, { select: !0 });
      }, g = function(y) {
        if (v.paused || !i) return;
        const E = y.relatedTarget;
        E !== null && (i.contains(E) || at(p.current, { select: !0 }));
      }, S = function(y) {
        if (document.activeElement === document.body)
          for (const C of y)
            C.removedNodes.length > 0 && at(i);
      };
      document.addEventListener("focusin", m), document.addEventListener("focusout", g);
      const b = new MutationObserver(S);
      return i && b.observe(i, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", m), document.removeEventListener("focusout", g), b.disconnect();
      };
    }
  }, [n, i, v.paused]), d.useEffect(() => {
    if (i) {
      Ts.add(v);
      const m = document.activeElement;
      if (!i.contains(m)) {
        const S = new CustomEvent(gn, Rs);
        i.addEventListener(gn, u), i.dispatchEvent(S), S.defaultPrevented || (Lp(Bp(Ci(i)), { select: !0 }), document.activeElement === m && at(i));
      }
      return () => {
        i.removeEventListener(gn, u), setTimeout(() => {
          const S = new CustomEvent(vn, Rs);
          i.addEventListener(vn, f), i.dispatchEvent(S), S.defaultPrevented || at(m ?? document.body, { select: !0 }), i.removeEventListener(vn, f), Ts.remove(v);
        }, 0);
      };
    }
  }, [i, u, f, v]);
  const w = d.useCallback(
    (m) => {
      if (!r && !n || v.paused) return;
      const g = m.key === "Tab" && !m.altKey && !m.ctrlKey && !m.metaKey, S = document.activeElement;
      if (g && S) {
        const b = m.currentTarget, [y, E] = $p(b);
        y && E ? !m.shiftKey && S === E ? (m.preventDefault(), r && at(y, { select: !0 })) : m.shiftKey && S === y && (m.preventDefault(), r && at(E, { select: !0 })) : S === b && m.preventDefault();
      }
    },
    [r, n, v.paused]
  );
  return /* @__PURE__ */ c.jsx(te.div, { tabIndex: -1, ...a, ref: h, onKeyDown: w });
});
xo.displayName = Ip;
function Lp(e, { select: t = !1 } = {}) {
  const r = document.activeElement;
  for (const n of e)
    if (at(n, { select: t }), document.activeElement !== r) return;
}
function $p(e) {
  const t = Ci(e), r = Ps(t, e), n = Ps(t.reverse(), e);
  return [r, n];
}
function Ci(e) {
  const t = [], r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => {
      const o = n.tagName === "INPUT" && n.type === "hidden";
      return n.disabled || n.hidden || o ? NodeFilter.FILTER_SKIP : n.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; r.nextNode(); ) t.push(r.currentNode);
  return t;
}
function Ps(e, t) {
  for (const r of e)
    if (!Fp(r, { upTo: t })) return r;
}
function Fp(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Wp(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function at(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const r = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== r && Wp(e) && t && e.select();
  }
}
var Ts = zp();
function zp() {
  let e = [];
  return {
    add(t) {
      const r = e[0];
      t !== r && (r == null || r.pause()), e = Os(e, t), e.unshift(t);
    },
    remove(t) {
      var r;
      e = Os(e, t), (r = e[0]) == null || r.resume();
    }
  };
}
function Os(e, t) {
  const r = [...e], n = r.indexOf(t);
  return n !== -1 && r.splice(n, 1), r;
}
function Bp(e) {
  return e.filter((t) => t.tagName !== "A");
}
var bn = 0;
function Ei() {
  d.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Ns()), document.body.insertAdjacentElement("beforeend", e[1] ?? Ns()), bn++, () => {
      bn === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), bn--;
    };
  }, []);
}
function Ns() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Ve = function() {
  return Ve = Object.assign || function(t) {
    for (var r, n = 1, o = arguments.length; n < o; n++) {
      r = arguments[n];
      for (var s in r) Object.prototype.hasOwnProperty.call(r, s) && (t[s] = r[s]);
    }
    return t;
  }, Ve.apply(this, arguments);
};
function Ri(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, n = Object.getOwnPropertySymbols(e); o < n.length; o++)
      t.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[o]) && (r[n[o]] = e[n[o]]);
  return r;
}
function Vp(e, t, r) {
  if (r || arguments.length === 2) for (var n = 0, o = t.length, s; n < o; n++)
    (s || !(n in t)) && (s || (s = Array.prototype.slice.call(t, 0, n)), s[n] = t[n]);
  return e.concat(s || Array.prototype.slice.call(t));
}
var pr = "right-scroll-bar-position", mr = "width-before-scroll-bar", Hp = "with-scroll-bars-hidden", Up = "--removed-body-scroll-bar-size";
function yn(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Yp(e, t) {
  var r = Fe(function() {
    return {
      // value
      value: e,
      // last callback
      callback: t,
      // "memoized" public interface
      facade: {
        get current() {
          return r.value;
        },
        set current(n) {
          var o = r.value;
          o !== n && (r.value = n, r.callback(n, o));
        }
      }
    };
  })[0];
  return r.callback = t, r.facade;
}
var Xp = typeof window < "u" ? d.useLayoutEffect : d.useEffect, _s = /* @__PURE__ */ new WeakMap();
function Kp(e, t) {
  var r = Yp(null, function(n) {
    return e.forEach(function(o) {
      return yn(o, n);
    });
  });
  return Xp(function() {
    var n = _s.get(r);
    if (n) {
      var o = new Set(n), s = new Set(e), a = r.current;
      o.forEach(function(i) {
        s.has(i) || yn(i, null);
      }), s.forEach(function(i) {
        o.has(i) || yn(i, a);
      });
    }
    _s.set(r, e);
  }, [e]), r;
}
function Gp(e) {
  return e;
}
function qp(e, t) {
  t === void 0 && (t = Gp);
  var r = [], n = !1, o = {
    read: function() {
      if (n)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return r.length ? r[r.length - 1] : e;
    },
    useMedium: function(s) {
      var a = t(s, n);
      return r.push(a), function() {
        r = r.filter(function(i) {
          return i !== a;
        });
      };
    },
    assignSyncMedium: function(s) {
      for (n = !0; r.length; ) {
        var a = r;
        r = [], a.forEach(s);
      }
      r = {
        push: function(i) {
          return s(i);
        },
        filter: function() {
          return r;
        }
      };
    },
    assignMedium: function(s) {
      n = !0;
      var a = [];
      if (r.length) {
        var i = r;
        r = [], i.forEach(s), a = r;
      }
      var l = function() {
        var f = a;
        a = [], f.forEach(s);
      }, u = function() {
        return Promise.resolve().then(l);
      };
      u(), r = {
        push: function(f) {
          a.push(f), u();
        },
        filter: function(f) {
          return a = a.filter(f), r;
        }
      };
    }
  };
  return o;
}
function Zp(e) {
  e === void 0 && (e = {});
  var t = qp(null);
  return t.options = Ve({ async: !0, ssr: !1 }, e), t;
}
var Pi = function(e) {
  var t = e.sideCar, r = Ri(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var n = t.read();
  if (!n)
    throw new Error("Sidecar medium not found");
  return d.createElement(n, Ve({}, r));
};
Pi.isSideCarExport = !0;
function Jp(e, t) {
  return e.useMedium(t), Pi;
}
var Ti = Zp(), xn = function() {
}, Br = d.forwardRef(function(e, t) {
  var r = d.useRef(null), n = d.useState({
    onScrollCapture: xn,
    onWheelCapture: xn,
    onTouchMoveCapture: xn
  }), o = n[0], s = n[1], a = e.forwardProps, i = e.children, l = e.className, u = e.removeScrollBar, f = e.enabled, p = e.shards, h = e.sideCar, v = e.noIsolation, w = e.inert, m = e.allowPinchZoom, g = e.as, S = g === void 0 ? "div" : g, b = e.gapMode, y = Ri(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), E = h, C = Kp([r, t]), T = Ve(Ve({}, y), o);
  return d.createElement(
    d.Fragment,
    null,
    f && d.createElement(E, { sideCar: Ti, removeScrollBar: u, shards: p, noIsolation: v, inert: w, setCallbacks: s, allowPinchZoom: !!m, lockRef: r, gapMode: b }),
    a ? d.cloneElement(d.Children.only(i), Ve(Ve({}, T), { ref: C })) : d.createElement(S, Ve({}, T, { className: l, ref: C }), i)
  );
});
Br.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Br.classNames = {
  fullWidth: mr,
  zeroRight: pr
};
var Qp = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function em() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Qp();
  return t && e.setAttribute("nonce", t), e;
}
function tm(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function rm(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var nm = function() {
  var e = 0, t = null;
  return {
    add: function(r) {
      e == 0 && (t = em()) && (tm(t, r), rm(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, om = function() {
  var e = nm();
  return function(t, r) {
    d.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && r]);
  };
}, Oi = function() {
  var e = om(), t = function(r) {
    var n = r.styles, o = r.dynamic;
    return e(n, o), null;
  };
  return t;
}, sm = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, wn = function(e) {
  return parseInt(e || "", 10) || 0;
}, am = function(e) {
  var t = window.getComputedStyle(document.body), r = t[e === "padding" ? "paddingLeft" : "marginLeft"], n = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [wn(r), wn(n), wn(o)];
}, im = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return sm;
  var t = am(e), r = document.documentElement.clientWidth, n = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, n - r + t[2] - t[0])
  };
}, lm = Oi(), Tt = "data-scroll-locked", cm = function(e, t, r, n) {
  var o = e.left, s = e.top, a = e.right, i = e.gap;
  return r === void 0 && (r = "margin"), `
  .`.concat(Hp, ` {
   overflow: hidden `).concat(n, `;
   padding-right: `).concat(i, "px ").concat(n, `;
  }
  body[`).concat(Tt, `] {
    overflow: hidden `).concat(n, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(n, ";"),
    r === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(s, `px;
    padding-right: `).concat(a, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i, "px ").concat(n, `;
    `),
    r === "padding" && "padding-right: ".concat(i, "px ").concat(n, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(pr, ` {
    right: `).concat(i, "px ").concat(n, `;
  }
  
  .`).concat(mr, ` {
    margin-right: `).concat(i, "px ").concat(n, `;
  }
  
  .`).concat(pr, " .").concat(pr, ` {
    right: 0 `).concat(n, `;
  }
  
  .`).concat(mr, " .").concat(mr, ` {
    margin-right: 0 `).concat(n, `;
  }
  
  body[`).concat(Tt, `] {
    `).concat(Up, ": ").concat(i, `px;
  }
`);
}, js = function() {
  var e = parseInt(document.body.getAttribute(Tt) || "0", 10);
  return isFinite(e) ? e : 0;
}, um = function() {
  d.useEffect(function() {
    return document.body.setAttribute(Tt, (js() + 1).toString()), function() {
      var e = js() - 1;
      e <= 0 ? document.body.removeAttribute(Tt) : document.body.setAttribute(Tt, e.toString());
    };
  }, []);
}, dm = function(e) {
  var t = e.noRelative, r = e.noImportant, n = e.gapMode, o = n === void 0 ? "margin" : n;
  um();
  var s = d.useMemo(function() {
    return im(o);
  }, [o]);
  return d.createElement(lm, { styles: cm(s, !t, o, r ? "" : "!important") });
}, Bn = !1;
if (typeof window < "u")
  try {
    var lr = Object.defineProperty({}, "passive", {
      get: function() {
        return Bn = !0, !0;
      }
    });
    window.addEventListener("test", lr, lr), window.removeEventListener("test", lr, lr);
  } catch {
    Bn = !1;
  }
var wt = Bn ? { passive: !1 } : !1, fm = function(e) {
  return e.tagName === "TEXTAREA";
}, Ni = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var r = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    r[t] !== "hidden" && // contains scroll inside self
    !(r.overflowY === r.overflowX && !fm(e) && r[t] === "visible")
  );
}, pm = function(e) {
  return Ni(e, "overflowY");
}, mm = function(e) {
  return Ni(e, "overflowX");
}, As = function(e, t) {
  var r = t.ownerDocument, n = t;
  do {
    typeof ShadowRoot < "u" && n instanceof ShadowRoot && (n = n.host);
    var o = _i(e, n);
    if (o) {
      var s = ji(e, n), a = s[1], i = s[2];
      if (a > i)
        return !0;
    }
    n = n.parentNode;
  } while (n && n !== r.body);
  return !1;
}, hm = function(e) {
  var t = e.scrollTop, r = e.scrollHeight, n = e.clientHeight;
  return [
    t,
    r,
    n
  ];
}, gm = function(e) {
  var t = e.scrollLeft, r = e.scrollWidth, n = e.clientWidth;
  return [
    t,
    r,
    n
  ];
}, _i = function(e, t) {
  return e === "v" ? pm(t) : mm(t);
}, ji = function(e, t) {
  return e === "v" ? hm(t) : gm(t);
}, vm = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, bm = function(e, t, r, n, o) {
  var s = vm(e, window.getComputedStyle(t).direction), a = s * n, i = r.target, l = t.contains(i), u = !1, f = a > 0, p = 0, h = 0;
  do {
    var v = ji(e, i), w = v[0], m = v[1], g = v[2], S = m - g - s * w;
    (w || S) && _i(e, i) && (p += S, h += w), i instanceof ShadowRoot ? i = i.host : i = i.parentNode;
  } while (
    // portaled content
    !l && i !== document.body || // self content
    l && (t.contains(i) || t === i)
  );
  return (f && (Math.abs(p) < 1 || !o) || !f && (Math.abs(h) < 1 || !o)) && (u = !0), u;
}, cr = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Ds = function(e) {
  return [e.deltaX, e.deltaY];
}, Ms = function(e) {
  return e && "current" in e ? e.current : e;
}, ym = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, xm = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, wm = 0, St = [];
function Sm(e) {
  var t = d.useRef([]), r = d.useRef([0, 0]), n = d.useRef(), o = d.useState(wm++)[0], s = d.useState(Oi)[0], a = d.useRef(e);
  d.useEffect(function() {
    a.current = e;
  }, [e]), d.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var m = Vp([e.lockRef.current], (e.shards || []).map(Ms), !0).filter(Boolean);
      return m.forEach(function(g) {
        return g.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), m.forEach(function(g) {
          return g.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var i = d.useCallback(function(m, g) {
    if ("touches" in m && m.touches.length === 2 || m.type === "wheel" && m.ctrlKey)
      return !a.current.allowPinchZoom;
    var S = cr(m), b = r.current, y = "deltaX" in m ? m.deltaX : b[0] - S[0], E = "deltaY" in m ? m.deltaY : b[1] - S[1], C, T = m.target, R = Math.abs(y) > Math.abs(E) ? "h" : "v";
    if ("touches" in m && R === "h" && T.type === "range")
      return !1;
    var k = As(R, T);
    if (!k)
      return !0;
    if (k ? C = R : (C = R === "v" ? "h" : "v", k = As(R, T)), !k)
      return !1;
    if (!n.current && "changedTouches" in m && (y || E) && (n.current = C), !C)
      return !0;
    var M = n.current || C;
    return bm(M, g, m, M === "h" ? y : E, !0);
  }, []), l = d.useCallback(function(m) {
    var g = m;
    if (!(!St.length || St[St.length - 1] !== s)) {
      var S = "deltaY" in g ? Ds(g) : cr(g), b = t.current.filter(function(C) {
        return C.name === g.type && (C.target === g.target || g.target === C.shadowParent) && ym(C.delta, S);
      })[0];
      if (b && b.should) {
        g.cancelable && g.preventDefault();
        return;
      }
      if (!b) {
        var y = (a.current.shards || []).map(Ms).filter(Boolean).filter(function(C) {
          return C.contains(g.target);
        }), E = y.length > 0 ? i(g, y[0]) : !a.current.noIsolation;
        E && g.cancelable && g.preventDefault();
      }
    }
  }, []), u = d.useCallback(function(m, g, S, b) {
    var y = { name: m, delta: g, target: S, should: b, shadowParent: Cm(S) };
    t.current.push(y), setTimeout(function() {
      t.current = t.current.filter(function(E) {
        return E !== y;
      });
    }, 1);
  }, []), f = d.useCallback(function(m) {
    r.current = cr(m), n.current = void 0;
  }, []), p = d.useCallback(function(m) {
    u(m.type, Ds(m), m.target, i(m, e.lockRef.current));
  }, []), h = d.useCallback(function(m) {
    u(m.type, cr(m), m.target, i(m, e.lockRef.current));
  }, []);
  d.useEffect(function() {
    return St.push(s), e.setCallbacks({
      onScrollCapture: p,
      onWheelCapture: p,
      onTouchMoveCapture: h
    }), document.addEventListener("wheel", l, wt), document.addEventListener("touchmove", l, wt), document.addEventListener("touchstart", f, wt), function() {
      St = St.filter(function(m) {
        return m !== s;
      }), document.removeEventListener("wheel", l, wt), document.removeEventListener("touchmove", l, wt), document.removeEventListener("touchstart", f, wt);
    };
  }, []);
  var v = e.removeScrollBar, w = e.inert;
  return d.createElement(
    d.Fragment,
    null,
    w ? d.createElement(s, { styles: xm(o) }) : null,
    v ? d.createElement(dm, { gapMode: e.gapMode }) : null
  );
}
function Cm(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Em = Jp(Ti, Sm);
var wo = d.forwardRef(function(e, t) {
  return d.createElement(Br, Ve({}, e, { ref: t, sideCar: Em }));
});
wo.classNames = Br.classNames;
var Rm = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Ct = /* @__PURE__ */ new WeakMap(), ur = /* @__PURE__ */ new WeakMap(), dr = {}, Sn = 0, Ai = function(e) {
  return e && (e.host || Ai(e.parentNode));
}, Pm = function(e, t) {
  return t.map(function(r) {
    if (e.contains(r))
      return r;
    var n = Ai(r);
    return n && e.contains(n) ? n : (console.error("aria-hidden", r, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(r) {
    return !!r;
  });
}, Tm = function(e, t, r, n) {
  var o = Pm(t, Array.isArray(e) ? e : [e]);
  dr[r] || (dr[r] = /* @__PURE__ */ new WeakMap());
  var s = dr[r], a = [], i = /* @__PURE__ */ new Set(), l = new Set(o), u = function(p) {
    !p || i.has(p) || (i.add(p), u(p.parentNode));
  };
  o.forEach(u);
  var f = function(p) {
    !p || l.has(p) || Array.prototype.forEach.call(p.children, function(h) {
      if (i.has(h))
        f(h);
      else
        try {
          var v = h.getAttribute(n), w = v !== null && v !== "false", m = (Ct.get(h) || 0) + 1, g = (s.get(h) || 0) + 1;
          Ct.set(h, m), s.set(h, g), a.push(h), m === 1 && w && ur.set(h, !0), g === 1 && h.setAttribute(r, "true"), w || h.setAttribute(n, "true");
        } catch (S) {
          console.error("aria-hidden: cannot operate on ", h, S);
        }
    });
  };
  return f(t), i.clear(), Sn++, function() {
    a.forEach(function(p) {
      var h = Ct.get(p) - 1, v = s.get(p) - 1;
      Ct.set(p, h), s.set(p, v), h || (ur.has(p) || p.removeAttribute(n), ur.delete(p)), v || p.removeAttribute(r);
    }), Sn--, Sn || (Ct = /* @__PURE__ */ new WeakMap(), Ct = /* @__PURE__ */ new WeakMap(), ur = /* @__PURE__ */ new WeakMap(), dr = {});
  };
}, Di = function(e, t, r) {
  r === void 0 && (r = "data-aria-hidden");
  var n = Array.from(Array.isArray(e) ? e : [e]), o = Rm(e);
  return o ? (n.push.apply(n, Array.from(o.querySelectorAll("[aria-live]"))), Tm(n, o, r, "aria-hidden")) : function() {
    return null;
  };
}, So = "Dialog", [Mi, ov] = Mt(So), [Om, Be] = Mi(So), ki = (e) => {
  const {
    __scopeDialog: t,
    children: r,
    open: n,
    defaultOpen: o,
    onOpenChange: s,
    modal: a = !0
  } = e, i = d.useRef(null), l = d.useRef(null), [u = !1, f] = jt({
    prop: n,
    defaultProp: o,
    onChange: s
  });
  return /* @__PURE__ */ c.jsx(
    Om,
    {
      scope: t,
      triggerRef: i,
      contentRef: l,
      contentId: Pt(),
      titleId: Pt(),
      descriptionId: Pt(),
      open: u,
      onOpenChange: f,
      onOpenToggle: d.useCallback(() => f((p) => !p), [f]),
      modal: a,
      children: r
    }
  );
};
ki.displayName = So;
var Ii = "DialogTrigger", Li = d.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = Be(Ii, r), s = ae(t, o.triggerRef);
    return /* @__PURE__ */ c.jsx(
      te.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Ro(o.open),
        ...n,
        ref: s,
        onClick: Z(e.onClick, o.onOpenToggle)
      }
    );
  }
);
Li.displayName = Ii;
var Co = "DialogPortal", [Nm, $i] = Mi(Co, {
  forceMount: void 0
}), Fi = (e) => {
  const { __scopeDialog: t, forceMount: r, children: n, container: o } = e, s = Be(Co, t);
  return /* @__PURE__ */ c.jsx(Nm, { scope: t, forceMount: r, children: d.Children.map(n, (a) => /* @__PURE__ */ c.jsx(et, { present: r || s.open, children: /* @__PURE__ */ c.jsx($r, { asChild: !0, container: o, children: a }) })) });
};
Fi.displayName = Co;
var xr = "DialogOverlay", Wi = d.forwardRef(
  (e, t) => {
    const r = $i(xr, e.__scopeDialog), { forceMount: n = r.forceMount, ...o } = e, s = Be(xr, e.__scopeDialog);
    return s.modal ? /* @__PURE__ */ c.jsx(et, { present: n || s.open, children: /* @__PURE__ */ c.jsx(_m, { ...o, ref: t }) }) : null;
  }
);
Wi.displayName = xr;
var _m = d.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = Be(xr, r);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ c.jsx(wo, { as: pt, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ c.jsx(
        te.div,
        {
          "data-state": Ro(o.open),
          ...n,
          ref: t,
          style: { pointerEvents: "auto", ...n.style }
        }
      ) })
    );
  }
), mt = "DialogContent", zi = d.forwardRef(
  (e, t) => {
    const r = $i(mt, e.__scopeDialog), { forceMount: n = r.forceMount, ...o } = e, s = Be(mt, e.__scopeDialog);
    return /* @__PURE__ */ c.jsx(et, { present: n || s.open, children: s.modal ? /* @__PURE__ */ c.jsx(jm, { ...o, ref: t }) : /* @__PURE__ */ c.jsx(Am, { ...o, ref: t }) });
  }
);
zi.displayName = mt;
var jm = d.forwardRef(
  (e, t) => {
    const r = Be(mt, e.__scopeDialog), n = d.useRef(null), o = ae(t, r.contentRef, n);
    return d.useEffect(() => {
      const s = n.current;
      if (s) return Di(s);
    }, []), /* @__PURE__ */ c.jsx(
      Bi,
      {
        ...e,
        ref: o,
        trapFocus: r.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: Z(e.onCloseAutoFocus, (s) => {
          var a;
          s.preventDefault(), (a = r.triggerRef.current) == null || a.focus();
        }),
        onPointerDownOutside: Z(e.onPointerDownOutside, (s) => {
          const a = s.detail.originalEvent, i = a.button === 0 && a.ctrlKey === !0;
          (a.button === 2 || i) && s.preventDefault();
        }),
        onFocusOutside: Z(
          e.onFocusOutside,
          (s) => s.preventDefault()
        )
      }
    );
  }
), Am = d.forwardRef(
  (e, t) => {
    const r = Be(mt, e.__scopeDialog), n = d.useRef(!1), o = d.useRef(!1);
    return /* @__PURE__ */ c.jsx(
      Bi,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (s) => {
          var a, i;
          (a = e.onCloseAutoFocus) == null || a.call(e, s), s.defaultPrevented || (n.current || (i = r.triggerRef.current) == null || i.focus(), s.preventDefault()), n.current = !1, o.current = !1;
        },
        onInteractOutside: (s) => {
          var l, u;
          (l = e.onInteractOutside) == null || l.call(e, s), s.defaultPrevented || (n.current = !0, s.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const a = s.target;
          ((u = r.triggerRef.current) == null ? void 0 : u.contains(a)) && s.preventDefault(), s.detail.originalEvent.type === "focusin" && o.current && s.preventDefault();
        }
      }
    );
  }
), Bi = d.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, trapFocus: n, onOpenAutoFocus: o, onCloseAutoFocus: s, ...a } = e, i = Be(mt, r), l = d.useRef(null), u = ae(t, l);
    return Ei(), /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx(
        xo,
        {
          asChild: !0,
          loop: !0,
          trapped: n,
          onMountAutoFocus: o,
          onUnmountAutoFocus: s,
          children: /* @__PURE__ */ c.jsx(
            Lr,
            {
              role: "dialog",
              id: i.contentId,
              "aria-describedby": i.descriptionId,
              "aria-labelledby": i.titleId,
              "data-state": Ro(i.open),
              ...a,
              ref: u,
              onDismiss: () => i.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
        /* @__PURE__ */ c.jsx(Dm, { titleId: i.titleId }),
        /* @__PURE__ */ c.jsx(km, { contentRef: l, descriptionId: i.descriptionId })
      ] })
    ] });
  }
), Eo = "DialogTitle", Vi = d.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = Be(Eo, r);
    return /* @__PURE__ */ c.jsx(te.h2, { id: o.titleId, ...n, ref: t });
  }
);
Vi.displayName = Eo;
var Hi = "DialogDescription", Ui = d.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = Be(Hi, r);
    return /* @__PURE__ */ c.jsx(te.p, { id: o.descriptionId, ...n, ref: t });
  }
);
Ui.displayName = Hi;
var Yi = "DialogClose", Xi = d.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = Be(Yi, r);
    return /* @__PURE__ */ c.jsx(
      te.button,
      {
        type: "button",
        ...n,
        ref: t,
        onClick: Z(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
Xi.displayName = Yi;
function Ro(e) {
  return e ? "open" : "closed";
}
var Ki = "DialogTitleWarning", [sv, Gi] = Jd(Ki, {
  contentName: mt,
  titleName: Eo,
  docsSlug: "dialog"
}), Dm = ({ titleId: e }) => {
  const t = Gi(Ki), r = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return d.useEffect(() => {
    e && (document.getElementById(e) || console.error(r));
  }, [r, e]), null;
}, Mm = "DialogDescriptionWarning", km = ({ contentRef: e, descriptionId: t }) => {
  const n = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Gi(Mm).contentName}}.`;
  return d.useEffect(() => {
    var s;
    const o = (s = e.current) == null ? void 0 : s.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(n));
  }, [n, e, t]), null;
}, qi = ki, Im = Li, Zi = Fi, Po = Wi, To = zi, Oo = Vi, No = Ui, _o = Xi;
function tr(e, t) {
  if (e == null) return {};
  var r = {}, n = Object.keys(e), o, s;
  for (s = 0; s < n.length; s++)
    o = n[s], !(t.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
var Lm = ["color"], $m = /* @__PURE__ */ vt(function(e, t) {
  var r = e.color, n = r === void 0 ? "currentColor" : r, o = tr(e, Lm);
  return Ae("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, o, {
    ref: t
  }), Ae("path", {
    d: "M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z",
    fill: n,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}), Fm = ["color"], Wm = /* @__PURE__ */ vt(function(e, t) {
  var r = e.color, n = r === void 0 ? "currentColor" : r, o = tr(e, Fm);
  return Ae("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, o, {
    ref: t
  }), Ae("path", {
    d: "M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z",
    fill: n,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}), zm = ["color"], Bm = /* @__PURE__ */ vt(function(e, t) {
  var r = e.color, n = r === void 0 ? "currentColor" : r, o = tr(e, zm);
  return Ae("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, o, {
    ref: t
  }), Ae("path", {
    d: "M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",
    fill: n,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}), Vm = ["color"], Hm = /* @__PURE__ */ vt(function(e, t) {
  var r = e.color, n = r === void 0 ? "currentColor" : r, o = tr(e, Vm);
  return Ae("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, o, {
    ref: t
  }), Ae("path", {
    d: "M3.13523 8.84197C3.3241 9.04343 3.64052 9.05363 3.84197 8.86477L7.5 5.43536L11.158 8.86477C11.3595 9.05363 11.6759 9.04343 11.8648 8.84197C12.0536 8.64051 12.0434 8.32409 11.842 8.13523L7.84197 4.38523C7.64964 4.20492 7.35036 4.20492 7.15803 4.38523L3.15803 8.13523C2.95657 8.32409 2.94637 8.64051 3.13523 8.84197Z",
    fill: n,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
}), Um = ["color"], Ji = /* @__PURE__ */ vt(function(e, t) {
  var r = e.color, n = r === void 0 ? "currentColor" : r, o = tr(e, Um);
  return Ae("svg", Object.assign({
    width: "15",
    height: "15",
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, o, {
    ref: t
  }), Ae("path", {
    d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
    fill: n,
    fillRule: "evenodd",
    clipRule: "evenodd"
  }));
});
const av = qi, iv = Im, Ym = Zi, lv = _o, Qi = d.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ c.jsx(
  Po,
  {
    ref: r,
    className: de(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
      e
    ),
    ...t
  }
));
Qi.displayName = Po.displayName;
const Xm = d.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ c.jsxs(Ym, { children: [
  /* @__PURE__ */ c.jsx(Qi, {}),
  /* @__PURE__ */ c.jsxs(
    To,
    {
      ref: n,
      className: de(
        "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg",
        e
      ),
      ...r,
      children: [
        t,
        /* @__PURE__ */ c.jsxs(_o, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none", children: [
          /* @__PURE__ */ c.jsx(Ji, { className: "h-4 w-4" }),
          /* @__PURE__ */ c.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
Xm.displayName = To.displayName;
const Km = ({
  className: e,
  ...t
}) => /* @__PURE__ */ c.jsx(
  "div",
  {
    className: de(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      e
    ),
    ...t
  }
);
Km.displayName = "DialogHeader";
const Gm = ({
  className: e,
  ...t
}) => /* @__PURE__ */ c.jsx(
  "div",
  {
    className: de(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      e
    ),
    ...t
  }
);
Gm.displayName = "DialogFooter";
const qm = d.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ c.jsx(
  Oo,
  {
    ref: r,
    className: de(
      "text-lg font-semibold leading-none tracking-tight",
      e
    ),
    ...t
  }
));
qm.displayName = Oo.displayName;
const Zm = d.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ c.jsx(
  No,
  {
    ref: r,
    className: de("text-muted-foreground text-sm", e),
    ...t
  }
));
Zm.displayName = No.displayName;
const Jm = ["top", "right", "bottom", "left"], it = Math.min, Ne = Math.max, wr = Math.round, fr = Math.floor, He = (e) => ({
  x: e,
  y: e
}), Qm = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, eh = {
  start: "end",
  end: "start"
};
function Vn(e, t, r) {
  return Ne(e, it(t, r));
}
function Je(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Qe(e) {
  return e.split("-")[0];
}
function It(e) {
  return e.split("-")[1];
}
function jo(e) {
  return e === "x" ? "y" : "x";
}
function Ao(e) {
  return e === "y" ? "height" : "width";
}
function lt(e) {
  return ["top", "bottom"].includes(Qe(e)) ? "y" : "x";
}
function Do(e) {
  return jo(lt(e));
}
function th(e, t, r) {
  r === void 0 && (r = !1);
  const n = It(e), o = Do(e), s = Ao(o);
  let a = o === "x" ? n === (r ? "end" : "start") ? "right" : "left" : n === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (a = Sr(a)), [a, Sr(a)];
}
function rh(e) {
  const t = Sr(e);
  return [Hn(e), t, Hn(t)];
}
function Hn(e) {
  return e.replace(/start|end/g, (t) => eh[t]);
}
function nh(e, t, r) {
  const n = ["left", "right"], o = ["right", "left"], s = ["top", "bottom"], a = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return r ? t ? o : n : t ? n : o;
    case "left":
    case "right":
      return t ? s : a;
    default:
      return [];
  }
}
function oh(e, t, r, n) {
  const o = It(e);
  let s = nh(Qe(e), r === "start", n);
  return o && (s = s.map((a) => a + "-" + o), t && (s = s.concat(s.map(Hn)))), s;
}
function Sr(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Qm[t]);
}
function sh(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function el(e) {
  return typeof e != "number" ? sh(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Cr(e) {
  const {
    x: t,
    y: r,
    width: n,
    height: o
  } = e;
  return {
    width: n,
    height: o,
    top: r,
    left: t,
    right: t + n,
    bottom: r + o,
    x: t,
    y: r
  };
}
function ks(e, t, r) {
  let {
    reference: n,
    floating: o
  } = e;
  const s = lt(t), a = Do(t), i = Ao(a), l = Qe(t), u = s === "y", f = n.x + n.width / 2 - o.width / 2, p = n.y + n.height / 2 - o.height / 2, h = n[i] / 2 - o[i] / 2;
  let v;
  switch (l) {
    case "top":
      v = {
        x: f,
        y: n.y - o.height
      };
      break;
    case "bottom":
      v = {
        x: f,
        y: n.y + n.height
      };
      break;
    case "right":
      v = {
        x: n.x + n.width,
        y: p
      };
      break;
    case "left":
      v = {
        x: n.x - o.width,
        y: p
      };
      break;
    default:
      v = {
        x: n.x,
        y: n.y
      };
  }
  switch (It(t)) {
    case "start":
      v[a] -= h * (r && u ? -1 : 1);
      break;
    case "end":
      v[a] += h * (r && u ? -1 : 1);
      break;
  }
  return v;
}
const ah = async (e, t, r) => {
  const {
    placement: n = "bottom",
    strategy: o = "absolute",
    middleware: s = [],
    platform: a
  } = r, i = s.filter(Boolean), l = await (a.isRTL == null ? void 0 : a.isRTL(t));
  let u = await a.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: f,
    y: p
  } = ks(u, n, l), h = n, v = {}, w = 0;
  for (let m = 0; m < i.length; m++) {
    const {
      name: g,
      fn: S
    } = i[m], {
      x: b,
      y,
      data: E,
      reset: C
    } = await S({
      x: f,
      y: p,
      initialPlacement: n,
      placement: h,
      strategy: o,
      middlewareData: v,
      rects: u,
      platform: a,
      elements: {
        reference: e,
        floating: t
      }
    });
    f = b ?? f, p = y ?? p, v = {
      ...v,
      [g]: {
        ...v[g],
        ...E
      }
    }, C && w <= 50 && (w++, typeof C == "object" && (C.placement && (h = C.placement), C.rects && (u = C.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : C.rects), {
      x: f,
      y: p
    } = ks(u, h, l)), m = -1);
  }
  return {
    x: f,
    y: p,
    placement: h,
    strategy: o,
    middlewareData: v
  };
};
async function Kt(e, t) {
  var r;
  t === void 0 && (t = {});
  const {
    x: n,
    y: o,
    platform: s,
    rects: a,
    elements: i,
    strategy: l
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: f = "viewport",
    elementContext: p = "floating",
    altBoundary: h = !1,
    padding: v = 0
  } = Je(t, e), w = el(v), g = i[h ? p === "floating" ? "reference" : "floating" : p], S = Cr(await s.getClippingRect({
    element: (r = await (s.isElement == null ? void 0 : s.isElement(g))) == null || r ? g : g.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(i.floating)),
    boundary: u,
    rootBoundary: f,
    strategy: l
  })), b = p === "floating" ? {
    x: n,
    y: o,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, y = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(i.floating)), E = await (s.isElement == null ? void 0 : s.isElement(y)) ? await (s.getScale == null ? void 0 : s.getScale(y)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, C = Cr(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: i,
    rect: b,
    offsetParent: y,
    strategy: l
  }) : b);
  return {
    top: (S.top - C.top + w.top) / E.y,
    bottom: (C.bottom - S.bottom + w.bottom) / E.y,
    left: (S.left - C.left + w.left) / E.x,
    right: (C.right - S.right + w.right) / E.x
  };
}
const ih = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: r,
      y: n,
      placement: o,
      rects: s,
      platform: a,
      elements: i,
      middlewareData: l
    } = t, {
      element: u,
      padding: f = 0
    } = Je(e, t) || {};
    if (u == null)
      return {};
    const p = el(f), h = {
      x: r,
      y: n
    }, v = Do(o), w = Ao(v), m = await a.getDimensions(u), g = v === "y", S = g ? "top" : "left", b = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", E = s.reference[w] + s.reference[v] - h[v] - s.floating[w], C = h[v] - s.reference[v], T = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(u));
    let R = T ? T[y] : 0;
    (!R || !await (a.isElement == null ? void 0 : a.isElement(T))) && (R = i.floating[y] || s.floating[w]);
    const k = E / 2 - C / 2, M = R / 2 - m[w] / 2 - 1, W = it(p[S], M), L = it(p[b], M), D = W, V = R - m[w] - L, _ = R / 2 - m[w] / 2 + k, U = Vn(D, _, V), F = !l.arrow && It(o) != null && _ !== U && s.reference[w] / 2 - (_ < D ? W : L) - m[w] / 2 < 0, H = F ? _ < D ? _ - D : _ - V : 0;
    return {
      [v]: h[v] + H,
      data: {
        [v]: U,
        centerOffset: _ - U - H,
        ...F && {
          alignmentOffset: H
        }
      },
      reset: F
    };
  }
}), lh = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var r, n;
      const {
        placement: o,
        middlewareData: s,
        rects: a,
        initialPlacement: i,
        platform: l,
        elements: u
      } = t, {
        mainAxis: f = !0,
        crossAxis: p = !0,
        fallbackPlacements: h,
        fallbackStrategy: v = "bestFit",
        fallbackAxisSideDirection: w = "none",
        flipAlignment: m = !0,
        ...g
      } = Je(e, t);
      if ((r = s.arrow) != null && r.alignmentOffset)
        return {};
      const S = Qe(o), b = lt(i), y = Qe(i) === i, E = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)), C = h || (y || !m ? [Sr(i)] : rh(i)), T = w !== "none";
      !h && T && C.push(...oh(i, m, w, E));
      const R = [i, ...C], k = await Kt(t, g), M = [];
      let W = ((n = s.flip) == null ? void 0 : n.overflows) || [];
      if (f && M.push(k[S]), p) {
        const _ = th(o, a, E);
        M.push(k[_[0]], k[_[1]]);
      }
      if (W = [...W, {
        placement: o,
        overflows: M
      }], !M.every((_) => _ <= 0)) {
        var L, D;
        const _ = (((L = s.flip) == null ? void 0 : L.index) || 0) + 1, U = R[_];
        if (U)
          return {
            data: {
              index: _,
              overflows: W
            },
            reset: {
              placement: U
            }
          };
        let F = (D = W.filter((H) => H.overflows[0] <= 0).sort((H, $) => H.overflows[1] - $.overflows[1])[0]) == null ? void 0 : D.placement;
        if (!F)
          switch (v) {
            case "bestFit": {
              var V;
              const H = (V = W.filter(($) => {
                if (T) {
                  const G = lt($.placement);
                  return G === b || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  G === "y";
                }
                return !0;
              }).map(($) => [$.placement, $.overflows.filter((G) => G > 0).reduce((G, P) => G + P, 0)]).sort(($, G) => $[1] - G[1])[0]) == null ? void 0 : V[0];
              H && (F = H);
              break;
            }
            case "initialPlacement":
              F = i;
              break;
          }
        if (o !== F)
          return {
            reset: {
              placement: F
            }
          };
      }
      return {};
    }
  };
};
function Is(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Ls(e) {
  return Jm.some((t) => e[t] >= 0);
}
const ch = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: r
      } = t, {
        strategy: n = "referenceHidden",
        ...o
      } = Je(e, t);
      switch (n) {
        case "referenceHidden": {
          const s = await Kt(t, {
            ...o,
            elementContext: "reference"
          }), a = Is(s, r.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: Ls(a)
            }
          };
        }
        case "escaped": {
          const s = await Kt(t, {
            ...o,
            altBoundary: !0
          }), a = Is(s, r.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: Ls(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function uh(e, t) {
  const {
    placement: r,
    platform: n,
    elements: o
  } = e, s = await (n.isRTL == null ? void 0 : n.isRTL(o.floating)), a = Qe(r), i = It(r), l = lt(r) === "y", u = ["left", "top"].includes(a) ? -1 : 1, f = s && l ? -1 : 1, p = Je(t, e);
  let {
    mainAxis: h,
    crossAxis: v,
    alignmentAxis: w
  } = typeof p == "number" ? {
    mainAxis: p,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: p.mainAxis || 0,
    crossAxis: p.crossAxis || 0,
    alignmentAxis: p.alignmentAxis
  };
  return i && typeof w == "number" && (v = i === "end" ? w * -1 : w), l ? {
    x: v * f,
    y: h * u
  } : {
    x: h * u,
    y: v * f
  };
}
const dh = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var r, n;
      const {
        x: o,
        y: s,
        placement: a,
        middlewareData: i
      } = t, l = await uh(t, e);
      return a === ((r = i.offset) == null ? void 0 : r.placement) && (n = i.arrow) != null && n.alignmentOffset ? {} : {
        x: o + l.x,
        y: s + l.y,
        data: {
          ...l,
          placement: a
        }
      };
    }
  };
}, fh = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: r,
        y: n,
        placement: o
      } = t, {
        mainAxis: s = !0,
        crossAxis: a = !1,
        limiter: i = {
          fn: (g) => {
            let {
              x: S,
              y: b
            } = g;
            return {
              x: S,
              y: b
            };
          }
        },
        ...l
      } = Je(e, t), u = {
        x: r,
        y: n
      }, f = await Kt(t, l), p = lt(Qe(o)), h = jo(p);
      let v = u[h], w = u[p];
      if (s) {
        const g = h === "y" ? "top" : "left", S = h === "y" ? "bottom" : "right", b = v + f[g], y = v - f[S];
        v = Vn(b, v, y);
      }
      if (a) {
        const g = p === "y" ? "top" : "left", S = p === "y" ? "bottom" : "right", b = w + f[g], y = w - f[S];
        w = Vn(b, w, y);
      }
      const m = i.fn({
        ...t,
        [h]: v,
        [p]: w
      });
      return {
        ...m,
        data: {
          x: m.x - r,
          y: m.y - n,
          enabled: {
            [h]: s,
            [p]: a
          }
        }
      };
    }
  };
}, ph = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: r,
        y: n,
        placement: o,
        rects: s,
        middlewareData: a
      } = t, {
        offset: i = 0,
        mainAxis: l = !0,
        crossAxis: u = !0
      } = Je(e, t), f = {
        x: r,
        y: n
      }, p = lt(o), h = jo(p);
      let v = f[h], w = f[p];
      const m = Je(i, t), g = typeof m == "number" ? {
        mainAxis: m,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...m
      };
      if (l) {
        const y = h === "y" ? "height" : "width", E = s.reference[h] - s.floating[y] + g.mainAxis, C = s.reference[h] + s.reference[y] - g.mainAxis;
        v < E ? v = E : v > C && (v = C);
      }
      if (u) {
        var S, b;
        const y = h === "y" ? "width" : "height", E = ["top", "left"].includes(Qe(o)), C = s.reference[p] - s.floating[y] + (E && ((S = a.offset) == null ? void 0 : S[p]) || 0) + (E ? 0 : g.crossAxis), T = s.reference[p] + s.reference[y] + (E ? 0 : ((b = a.offset) == null ? void 0 : b[p]) || 0) - (E ? g.crossAxis : 0);
        w < C ? w = C : w > T && (w = T);
      }
      return {
        [h]: v,
        [p]: w
      };
    }
  };
}, mh = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var r, n;
      const {
        placement: o,
        rects: s,
        platform: a,
        elements: i
      } = t, {
        apply: l = () => {
        },
        ...u
      } = Je(e, t), f = await Kt(t, u), p = Qe(o), h = It(o), v = lt(o) === "y", {
        width: w,
        height: m
      } = s.floating;
      let g, S;
      p === "top" || p === "bottom" ? (g = p, S = h === (await (a.isRTL == null ? void 0 : a.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (S = p, g = h === "end" ? "top" : "bottom");
      const b = m - f.top - f.bottom, y = w - f.left - f.right, E = it(m - f[g], b), C = it(w - f[S], y), T = !t.middlewareData.shift;
      let R = E, k = C;
      if ((r = t.middlewareData.shift) != null && r.enabled.x && (k = y), (n = t.middlewareData.shift) != null && n.enabled.y && (R = b), T && !h) {
        const W = Ne(f.left, 0), L = Ne(f.right, 0), D = Ne(f.top, 0), V = Ne(f.bottom, 0);
        v ? k = w - 2 * (W !== 0 || L !== 0 ? W + L : Ne(f.left, f.right)) : R = m - 2 * (D !== 0 || V !== 0 ? D + V : Ne(f.top, f.bottom));
      }
      await l({
        ...t,
        availableWidth: k,
        availableHeight: R
      });
      const M = await a.getDimensions(i.floating);
      return w !== M.width || m !== M.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Vr() {
  return typeof window < "u";
}
function Lt(e) {
  return tl(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function je(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ge(e) {
  var t;
  return (t = (tl(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function tl(e) {
  return Vr() ? e instanceof Node || e instanceof je(e).Node : !1;
}
function We(e) {
  return Vr() ? e instanceof Element || e instanceof je(e).Element : !1;
}
function Ue(e) {
  return Vr() ? e instanceof HTMLElement || e instanceof je(e).HTMLElement : !1;
}
function $s(e) {
  return !Vr() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof je(e).ShadowRoot;
}
function rr(e) {
  const {
    overflow: t,
    overflowX: r,
    overflowY: n,
    display: o
  } = ze(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + n + r) && !["inline", "contents"].includes(o);
}
function hh(e) {
  return ["table", "td", "th"].includes(Lt(e));
}
function Hr(e) {
  return [":popover-open", ":modal"].some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
function Mo(e) {
  const t = ko(), r = We(e) ? ze(e) : e;
  return r.transform !== "none" || r.perspective !== "none" || (r.containerType ? r.containerType !== "normal" : !1) || !t && (r.backdropFilter ? r.backdropFilter !== "none" : !1) || !t && (r.filter ? r.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((n) => (r.willChange || "").includes(n)) || ["paint", "layout", "strict", "content"].some((n) => (r.contain || "").includes(n));
}
function gh(e) {
  let t = ct(e);
  for (; Ue(t) && !At(t); ) {
    if (Mo(t))
      return t;
    if (Hr(t))
      return null;
    t = ct(t);
  }
  return null;
}
function ko() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function At(e) {
  return ["html", "body", "#document"].includes(Lt(e));
}
function ze(e) {
  return je(e).getComputedStyle(e);
}
function Ur(e) {
  return We(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function ct(e) {
  if (Lt(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    $s(e) && e.host || // Fallback.
    Ge(e)
  );
  return $s(t) ? t.host : t;
}
function rl(e) {
  const t = ct(e);
  return At(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Ue(t) && rr(t) ? t : rl(t);
}
function Gt(e, t, r) {
  var n;
  t === void 0 && (t = []), r === void 0 && (r = !0);
  const o = rl(e), s = o === ((n = e.ownerDocument) == null ? void 0 : n.body), a = je(o);
  if (s) {
    const i = Un(a);
    return t.concat(a, a.visualViewport || [], rr(o) ? o : [], i && r ? Gt(i) : []);
  }
  return t.concat(o, Gt(o, [], r));
}
function Un(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function nl(e) {
  const t = ze(e);
  let r = parseFloat(t.width) || 0, n = parseFloat(t.height) || 0;
  const o = Ue(e), s = o ? e.offsetWidth : r, a = o ? e.offsetHeight : n, i = wr(r) !== s || wr(n) !== a;
  return i && (r = s, n = a), {
    width: r,
    height: n,
    $: i
  };
}
function Io(e) {
  return We(e) ? e : e.contextElement;
}
function Ot(e) {
  const t = Io(e);
  if (!Ue(t))
    return He(1);
  const r = t.getBoundingClientRect(), {
    width: n,
    height: o,
    $: s
  } = nl(t);
  let a = (s ? wr(r.width) : r.width) / n, i = (s ? wr(r.height) : r.height) / o;
  return (!a || !Number.isFinite(a)) && (a = 1), (!i || !Number.isFinite(i)) && (i = 1), {
    x: a,
    y: i
  };
}
const vh = /* @__PURE__ */ He(0);
function ol(e) {
  const t = je(e);
  return !ko() || !t.visualViewport ? vh : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function bh(e, t, r) {
  return t === void 0 && (t = !1), !r || t && r !== je(e) ? !1 : t;
}
function ht(e, t, r, n) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  const o = e.getBoundingClientRect(), s = Io(e);
  let a = He(1);
  t && (n ? We(n) && (a = Ot(n)) : a = Ot(e));
  const i = bh(s, r, n) ? ol(s) : He(0);
  let l = (o.left + i.x) / a.x, u = (o.top + i.y) / a.y, f = o.width / a.x, p = o.height / a.y;
  if (s) {
    const h = je(s), v = n && We(n) ? je(n) : n;
    let w = h, m = Un(w);
    for (; m && n && v !== w; ) {
      const g = Ot(m), S = m.getBoundingClientRect(), b = ze(m), y = S.left + (m.clientLeft + parseFloat(b.paddingLeft)) * g.x, E = S.top + (m.clientTop + parseFloat(b.paddingTop)) * g.y;
      l *= g.x, u *= g.y, f *= g.x, p *= g.y, l += y, u += E, w = je(m), m = Un(w);
    }
  }
  return Cr({
    width: f,
    height: p,
    x: l,
    y: u
  });
}
function Lo(e, t) {
  const r = Ur(e).scrollLeft;
  return t ? t.left + r : ht(Ge(e)).left + r;
}
function sl(e, t, r) {
  r === void 0 && (r = !1);
  const n = e.getBoundingClientRect(), o = n.left + t.scrollLeft - (r ? 0 : (
    // RTL <body> scrollbar.
    Lo(e, n)
  )), s = n.top + t.scrollTop;
  return {
    x: o,
    y: s
  };
}
function yh(e) {
  let {
    elements: t,
    rect: r,
    offsetParent: n,
    strategy: o
  } = e;
  const s = o === "fixed", a = Ge(n), i = t ? Hr(t.floating) : !1;
  if (n === a || i && s)
    return r;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = He(1);
  const f = He(0), p = Ue(n);
  if ((p || !p && !s) && ((Lt(n) !== "body" || rr(a)) && (l = Ur(n)), Ue(n))) {
    const v = ht(n);
    u = Ot(n), f.x = v.x + n.clientLeft, f.y = v.y + n.clientTop;
  }
  const h = a && !p && !s ? sl(a, l, !0) : He(0);
  return {
    width: r.width * u.x,
    height: r.height * u.y,
    x: r.x * u.x - l.scrollLeft * u.x + f.x + h.x,
    y: r.y * u.y - l.scrollTop * u.y + f.y + h.y
  };
}
function xh(e) {
  return Array.from(e.getClientRects());
}
function wh(e) {
  const t = Ge(e), r = Ur(e), n = e.ownerDocument.body, o = Ne(t.scrollWidth, t.clientWidth, n.scrollWidth, n.clientWidth), s = Ne(t.scrollHeight, t.clientHeight, n.scrollHeight, n.clientHeight);
  let a = -r.scrollLeft + Lo(e);
  const i = -r.scrollTop;
  return ze(n).direction === "rtl" && (a += Ne(t.clientWidth, n.clientWidth) - o), {
    width: o,
    height: s,
    x: a,
    y: i
  };
}
function Sh(e, t) {
  const r = je(e), n = Ge(e), o = r.visualViewport;
  let s = n.clientWidth, a = n.clientHeight, i = 0, l = 0;
  if (o) {
    s = o.width, a = o.height;
    const u = ko();
    (!u || u && t === "fixed") && (i = o.offsetLeft, l = o.offsetTop);
  }
  return {
    width: s,
    height: a,
    x: i,
    y: l
  };
}
function Ch(e, t) {
  const r = ht(e, !0, t === "fixed"), n = r.top + e.clientTop, o = r.left + e.clientLeft, s = Ue(e) ? Ot(e) : He(1), a = e.clientWidth * s.x, i = e.clientHeight * s.y, l = o * s.x, u = n * s.y;
  return {
    width: a,
    height: i,
    x: l,
    y: u
  };
}
function Fs(e, t, r) {
  let n;
  if (t === "viewport")
    n = Sh(e, r);
  else if (t === "document")
    n = wh(Ge(e));
  else if (We(t))
    n = Ch(t, r);
  else {
    const o = ol(e);
    n = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return Cr(n);
}
function al(e, t) {
  const r = ct(e);
  return r === t || !We(r) || At(r) ? !1 : ze(r).position === "fixed" || al(r, t);
}
function Eh(e, t) {
  const r = t.get(e);
  if (r)
    return r;
  let n = Gt(e, [], !1).filter((i) => We(i) && Lt(i) !== "body"), o = null;
  const s = ze(e).position === "fixed";
  let a = s ? ct(e) : e;
  for (; We(a) && !At(a); ) {
    const i = ze(a), l = Mo(a);
    !l && i.position === "fixed" && (o = null), (s ? !l && !o : !l && i.position === "static" && !!o && ["absolute", "fixed"].includes(o.position) || rr(a) && !l && al(e, a)) ? n = n.filter((f) => f !== a) : o = i, a = ct(a);
  }
  return t.set(e, n), n;
}
function Rh(e) {
  let {
    element: t,
    boundary: r,
    rootBoundary: n,
    strategy: o
  } = e;
  const a = [...r === "clippingAncestors" ? Hr(t) ? [] : Eh(t, this._c) : [].concat(r), n], i = a[0], l = a.reduce((u, f) => {
    const p = Fs(t, f, o);
    return u.top = Ne(p.top, u.top), u.right = it(p.right, u.right), u.bottom = it(p.bottom, u.bottom), u.left = Ne(p.left, u.left), u;
  }, Fs(t, i, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Ph(e) {
  const {
    width: t,
    height: r
  } = nl(e);
  return {
    width: t,
    height: r
  };
}
function Th(e, t, r) {
  const n = Ue(t), o = Ge(t), s = r === "fixed", a = ht(e, !0, s, t);
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = He(0);
  if (n || !n && !s)
    if ((Lt(t) !== "body" || rr(o)) && (i = Ur(t)), n) {
      const h = ht(t, !0, s, t);
      l.x = h.x + t.clientLeft, l.y = h.y + t.clientTop;
    } else o && (l.x = Lo(o));
  const u = o && !n && !s ? sl(o, i) : He(0), f = a.left + i.scrollLeft - l.x - u.x, p = a.top + i.scrollTop - l.y - u.y;
  return {
    x: f,
    y: p,
    width: a.width,
    height: a.height
  };
}
function Cn(e) {
  return ze(e).position === "static";
}
function Ws(e, t) {
  if (!Ue(e) || ze(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let r = e.offsetParent;
  return Ge(e) === r && (r = r.ownerDocument.body), r;
}
function il(e, t) {
  const r = je(e);
  if (Hr(e))
    return r;
  if (!Ue(e)) {
    let o = ct(e);
    for (; o && !At(o); ) {
      if (We(o) && !Cn(o))
        return o;
      o = ct(o);
    }
    return r;
  }
  let n = Ws(e, t);
  for (; n && hh(n) && Cn(n); )
    n = Ws(n, t);
  return n && At(n) && Cn(n) && !Mo(n) ? r : n || gh(e) || r;
}
const Oh = async function(e) {
  const t = this.getOffsetParent || il, r = this.getDimensions, n = await r(e.floating);
  return {
    reference: Th(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: n.width,
      height: n.height
    }
  };
};
function Nh(e) {
  return ze(e).direction === "rtl";
}
const _h = {
  convertOffsetParentRelativeRectToViewportRelativeRect: yh,
  getDocumentElement: Ge,
  getClippingRect: Rh,
  getOffsetParent: il,
  getElementRects: Oh,
  getClientRects: xh,
  getDimensions: Ph,
  getScale: Ot,
  isElement: We,
  isRTL: Nh
};
function jh(e, t) {
  let r = null, n;
  const o = Ge(e);
  function s() {
    var i;
    clearTimeout(n), (i = r) == null || i.disconnect(), r = null;
  }
  function a(i, l) {
    i === void 0 && (i = !1), l === void 0 && (l = 1), s();
    const {
      left: u,
      top: f,
      width: p,
      height: h
    } = e.getBoundingClientRect();
    if (i || t(), !p || !h)
      return;
    const v = fr(f), w = fr(o.clientWidth - (u + p)), m = fr(o.clientHeight - (f + h)), g = fr(u), b = {
      rootMargin: -v + "px " + -w + "px " + -m + "px " + -g + "px",
      threshold: Ne(0, it(1, l)) || 1
    };
    let y = !0;
    function E(C) {
      const T = C[0].intersectionRatio;
      if (T !== l) {
        if (!y)
          return a();
        T ? a(!1, T) : n = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      y = !1;
    }
    try {
      r = new IntersectionObserver(E, {
        ...b,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      r = new IntersectionObserver(E, b);
    }
    r.observe(e);
  }
  return a(!0), s;
}
function Ah(e, t, r, n) {
  n === void 0 && (n = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: i = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = n, u = Io(e), f = o || s ? [...u ? Gt(u) : [], ...Gt(t)] : [];
  f.forEach((S) => {
    o && S.addEventListener("scroll", r, {
      passive: !0
    }), s && S.addEventListener("resize", r);
  });
  const p = u && i ? jh(u, r) : null;
  let h = -1, v = null;
  a && (v = new ResizeObserver((S) => {
    let [b] = S;
    b && b.target === u && v && (v.unobserve(t), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
      var y;
      (y = v) == null || y.observe(t);
    })), r();
  }), u && !l && v.observe(u), v.observe(t));
  let w, m = l ? ht(e) : null;
  l && g();
  function g() {
    const S = ht(e);
    m && (S.x !== m.x || S.y !== m.y || S.width !== m.width || S.height !== m.height) && r(), m = S, w = requestAnimationFrame(g);
  }
  return r(), () => {
    var S;
    f.forEach((b) => {
      o && b.removeEventListener("scroll", r), s && b.removeEventListener("resize", r);
    }), p == null || p(), (S = v) == null || S.disconnect(), v = null, l && cancelAnimationFrame(w);
  };
}
const Dh = dh, Mh = fh, kh = lh, Ih = mh, Lh = ch, zs = ih, $h = ph, Fh = (e, t, r) => {
  const n = /* @__PURE__ */ new Map(), o = {
    platform: _h,
    ...r
  }, s = {
    ...o.platform,
    _c: n
  };
  return ah(e, t, {
    ...o,
    platform: s
  });
};
var hr = typeof document < "u" ? _c : Tr;
function Er(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let r, n, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (r = e.length, r !== t.length) return !1;
      for (n = r; n-- !== 0; )
        if (!Er(e[n], t[n]))
          return !1;
      return !0;
    }
    if (o = Object.keys(e), r = o.length, r !== Object.keys(t).length)
      return !1;
    for (n = r; n-- !== 0; )
      if (!{}.hasOwnProperty.call(t, o[n]))
        return !1;
    for (n = r; n-- !== 0; ) {
      const s = o[n];
      if (!(s === "_owner" && e.$$typeof) && !Er(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function ll(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Bs(e, t) {
  const r = ll(e);
  return Math.round(t * r) / r;
}
function En(e) {
  const t = d.useRef(e);
  return hr(() => {
    t.current = e;
  }), t;
}
function Wh(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: r = "absolute",
    middleware: n = [],
    platform: o,
    elements: {
      reference: s,
      floating: a
    } = {},
    transform: i = !0,
    whileElementsMounted: l,
    open: u
  } = e, [f, p] = d.useState({
    x: 0,
    y: 0,
    strategy: r,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [h, v] = d.useState(n);
  Er(h, n) || v(n);
  const [w, m] = d.useState(null), [g, S] = d.useState(null), b = d.useCallback(($) => {
    $ !== T.current && (T.current = $, m($));
  }, []), y = d.useCallback(($) => {
    $ !== R.current && (R.current = $, S($));
  }, []), E = s || w, C = a || g, T = d.useRef(null), R = d.useRef(null), k = d.useRef(f), M = l != null, W = En(l), L = En(o), D = En(u), V = d.useCallback(() => {
    if (!T.current || !R.current)
      return;
    const $ = {
      placement: t,
      strategy: r,
      middleware: h
    };
    L.current && ($.platform = L.current), Fh(T.current, R.current, $).then((G) => {
      const P = {
        ...G,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: D.current !== !1
      };
      _.current && !Er(k.current, P) && (k.current = P, qt.flushSync(() => {
        p(P);
      }));
    });
  }, [h, t, r, L, D]);
  hr(() => {
    u === !1 && k.current.isPositioned && (k.current.isPositioned = !1, p(($) => ({
      ...$,
      isPositioned: !1
    })));
  }, [u]);
  const _ = d.useRef(!1);
  hr(() => (_.current = !0, () => {
    _.current = !1;
  }), []), hr(() => {
    if (E && (T.current = E), C && (R.current = C), E && C) {
      if (W.current)
        return W.current(E, C, V);
      V();
    }
  }, [E, C, V, W, M]);
  const U = d.useMemo(() => ({
    reference: T,
    floating: R,
    setReference: b,
    setFloating: y
  }), [b, y]), F = d.useMemo(() => ({
    reference: E,
    floating: C
  }), [E, C]), H = d.useMemo(() => {
    const $ = {
      position: r,
      left: 0,
      top: 0
    };
    if (!F.floating)
      return $;
    const G = Bs(F.floating, f.x), P = Bs(F.floating, f.y);
    return i ? {
      ...$,
      transform: "translate(" + G + "px, " + P + "px)",
      ...ll(F.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: r,
      left: G,
      top: P
    };
  }, [r, i, F.floating, f.x, f.y]);
  return d.useMemo(() => ({
    ...f,
    update: V,
    refs: U,
    elements: F,
    floatingStyles: H
  }), [f, V, U, F, H]);
}
const zh = (e) => {
  function t(r) {
    return {}.hasOwnProperty.call(r, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(r) {
      const {
        element: n,
        padding: o
      } = typeof e == "function" ? e(r) : e;
      return n && t(n) ? n.current != null ? zs({
        element: n.current,
        padding: o
      }).fn(r) : {} : n ? zs({
        element: n,
        padding: o
      }).fn(r) : {};
    }
  };
}, Bh = (e, t) => ({
  ...Dh(e),
  options: [e, t]
}), Vh = (e, t) => ({
  ...Mh(e),
  options: [e, t]
}), Hh = (e, t) => ({
  ...$h(e),
  options: [e, t]
}), Uh = (e, t) => ({
  ...kh(e),
  options: [e, t]
}), Yh = (e, t) => ({
  ...Ih(e),
  options: [e, t]
}), Xh = (e, t) => ({
  ...Lh(e),
  options: [e, t]
}), Kh = (e, t) => ({
  ...zh(e),
  options: [e, t]
});
var Gh = "Arrow", cl = d.forwardRef((e, t) => {
  const { children: r, width: n = 10, height: o = 5, ...s } = e;
  return /* @__PURE__ */ c.jsx(
    te.svg,
    {
      ...s,
      ref: t,
      width: n,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? r : /* @__PURE__ */ c.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
cl.displayName = Gh;
var qh = cl;
function Zh(e, t = []) {
  let r = [];
  function n(s, a) {
    const i = d.createContext(a), l = r.length;
    r = [...r, a];
    function u(p) {
      const { scope: h, children: v, ...w } = p, m = (h == null ? void 0 : h[e][l]) || i, g = d.useMemo(() => w, Object.values(w));
      return /* @__PURE__ */ c.jsx(m.Provider, { value: g, children: v });
    }
    function f(p, h) {
      const v = (h == null ? void 0 : h[e][l]) || i, w = d.useContext(v);
      if (w) return w;
      if (a !== void 0) return a;
      throw new Error(`\`${p}\` must be used within \`${s}\``);
    }
    return u.displayName = s + "Provider", [u, f];
  }
  const o = () => {
    const s = r.map((a) => d.createContext(a));
    return function(i) {
      const l = (i == null ? void 0 : i[e]) || s;
      return d.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: l } }),
        [i, l]
      );
    };
  };
  return o.scopeName = e, [n, Jh(o, ...t)];
}
function Jh(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const r = () => {
    const n = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(s) {
      const a = n.reduce((i, { useScope: l, scopeName: u }) => {
        const p = l(s)[`__scope${u}`];
        return { ...i, ...p };
      }, {});
      return d.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return r.scopeName = t.scopeName, r;
}
var $o = "Popper", [ul, dl] = Zh($o), [Qh, fl] = ul($o), pl = (e) => {
  const { __scopePopper: t, children: r } = e, [n, o] = d.useState(null);
  return /* @__PURE__ */ c.jsx(Qh, { scope: t, anchor: n, onAnchorChange: o, children: r });
};
pl.displayName = $o;
var ml = "PopperAnchor", hl = d.forwardRef(
  (e, t) => {
    const { __scopePopper: r, virtualRef: n, ...o } = e, s = fl(ml, r), a = d.useRef(null), i = ae(t, a);
    return d.useEffect(() => {
      s.onAnchorChange((n == null ? void 0 : n.current) || a.current);
    }), n ? null : /* @__PURE__ */ c.jsx(te.div, { ...o, ref: i });
  }
);
hl.displayName = ml;
var Fo = "PopperContent", [eg, tg] = ul(Fo), gl = d.forwardRef(
  (e, t) => {
    var A, B, K, z, ee, O;
    const {
      __scopePopper: r,
      side: n = "bottom",
      sideOffset: o = 0,
      align: s = "center",
      alignOffset: a = 0,
      arrowPadding: i = 0,
      avoidCollisions: l = !0,
      collisionBoundary: u = [],
      collisionPadding: f = 0,
      sticky: p = "partial",
      hideWhenDetached: h = !1,
      updatePositionStrategy: v = "optimized",
      onPlaced: w,
      ...m
    } = e, g = fl(Fo, r), [S, b] = d.useState(null), y = ae(t, (pe) => b(pe)), [E, C] = d.useState(null), T = po(E), R = (T == null ? void 0 : T.width) ?? 0, k = (T == null ? void 0 : T.height) ?? 0, M = n + (s !== "center" ? "-" + s : ""), W = typeof f == "number" ? f : { top: 0, right: 0, bottom: 0, left: 0, ...f }, L = Array.isArray(u) ? u : [u], D = L.length > 0, V = {
      padding: W,
      boundary: L.filter(ng),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: D
    }, { refs: _, floatingStyles: U, placement: F, isPositioned: H, middlewareData: $ } = Wh({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: M,
      whileElementsMounted: (...pe) => Ah(...pe, {
        animationFrame: v === "always"
      }),
      elements: {
        reference: g.anchor
      },
      middleware: [
        Bh({ mainAxis: o + k, alignmentAxis: a }),
        l && Vh({
          mainAxis: !0,
          crossAxis: !1,
          limiter: p === "partial" ? Hh() : void 0,
          ...V
        }),
        l && Uh({ ...V }),
        Yh({
          ...V,
          apply: ({ elements: pe, rects: ye, availableWidth: Te, availableHeight: Ie }) => {
            const { width: tt, height: or } = ye.reference, qe = pe.floating.style;
            qe.setProperty("--radix-popper-available-width", `${Te}px`), qe.setProperty("--radix-popper-available-height", `${Ie}px`), qe.setProperty("--radix-popper-anchor-width", `${tt}px`), qe.setProperty("--radix-popper-anchor-height", `${or}px`);
          }
        }),
        E && Kh({ element: E, padding: i }),
        og({ arrowWidth: R, arrowHeight: k }),
        h && Xh({ strategy: "referenceHidden", ...V })
      ]
    }), [G, P] = yl(F), j = be(w);
    xe(() => {
      H && (j == null || j());
    }, [H, j]);
    const J = (A = $.arrow) == null ? void 0 : A.x, X = (B = $.arrow) == null ? void 0 : B.y, Y = ((K = $.arrow) == null ? void 0 : K.centerOffset) !== 0, [re, q] = d.useState();
    return xe(() => {
      S && q(window.getComputedStyle(S).zIndex);
    }, [S]), /* @__PURE__ */ c.jsx(
      "div",
      {
        ref: _.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...U,
          transform: H ? U.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: re,
          "--radix-popper-transform-origin": [
            (z = $.transformOrigin) == null ? void 0 : z.x,
            (ee = $.transformOrigin) == null ? void 0 : ee.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((O = $.hide) == null ? void 0 : O.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ c.jsx(
          eg,
          {
            scope: r,
            placedSide: G,
            onArrowChange: C,
            arrowX: J,
            arrowY: X,
            shouldHideArrow: Y,
            children: /* @__PURE__ */ c.jsx(
              te.div,
              {
                "data-side": G,
                "data-align": P,
                ...m,
                ref: y,
                style: {
                  ...m.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: H ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
gl.displayName = Fo;
var vl = "PopperArrow", rg = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, bl = d.forwardRef(function(t, r) {
  const { __scopePopper: n, ...o } = t, s = tg(vl, n), a = rg[s.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ c.jsx(
      "span",
      {
        ref: s.onArrowChange,
        style: {
          position: "absolute",
          left: s.arrowX,
          top: s.arrowY,
          [a]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[s.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[s.placedSide],
          visibility: s.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ c.jsx(
          qh,
          {
            ...o,
            ref: r,
            style: {
              ...o.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
bl.displayName = vl;
function ng(e) {
  return e !== null;
}
var og = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var g, S, b;
    const { placement: r, rects: n, middlewareData: o } = t, a = ((g = o.arrow) == null ? void 0 : g.centerOffset) !== 0, i = a ? 0 : e.arrowWidth, l = a ? 0 : e.arrowHeight, [u, f] = yl(r), p = { start: "0%", center: "50%", end: "100%" }[f], h = (((S = o.arrow) == null ? void 0 : S.x) ?? 0) + i / 2, v = (((b = o.arrow) == null ? void 0 : b.y) ?? 0) + l / 2;
    let w = "", m = "";
    return u === "bottom" ? (w = a ? p : `${h}px`, m = `${-l}px`) : u === "top" ? (w = a ? p : `${h}px`, m = `${n.floating.height + l}px`) : u === "right" ? (w = `${-l}px`, m = a ? p : `${v}px`) : u === "left" && (w = `${n.floating.width + l}px`, m = a ? p : `${v}px`), { data: { x: w, y: m } };
  }
});
function yl(e) {
  const [t, r = "center"] = e.split("-");
  return [t, r];
}
var sg = pl, ag = hl, ig = gl, lg = bl, cg = [" ", "Enter", "ArrowUp", "ArrowDown"], ug = [" ", "Enter"], nr = "Select", [Yr, Xr, dg] = mo(nr), [$t, cv] = Mt(nr, [
  dg,
  dl
]), Kr = dl(), [fg, ut] = $t(nr), [pg, mg] = $t(nr), xl = (e) => {
  const {
    __scopeSelect: t,
    children: r,
    open: n,
    defaultOpen: o,
    onOpenChange: s,
    value: a,
    defaultValue: i,
    onValueChange: l,
    dir: u,
    name: f,
    autoComplete: p,
    disabled: h,
    required: v,
    form: w
  } = e, m = Kr(t), [g, S] = d.useState(null), [b, y] = d.useState(null), [E, C] = d.useState(!1), T = ao(u), [R = !1, k] = jt({
    prop: n,
    defaultProp: o,
    onChange: s
  }), [M, W] = jt({
    prop: a,
    defaultProp: i,
    onChange: l
  }), L = d.useRef(null), D = g ? w || !!g.closest("form") : !0, [V, _] = d.useState(/* @__PURE__ */ new Set()), U = Array.from(V).map((F) => F.props.value).join(";");
  return /* @__PURE__ */ c.jsx(sg, { ...m, children: /* @__PURE__ */ c.jsxs(
    fg,
    {
      required: v,
      scope: t,
      trigger: g,
      onTriggerChange: S,
      valueNode: b,
      onValueNodeChange: y,
      valueNodeHasChildren: E,
      onValueNodeHasChildrenChange: C,
      contentId: Pt(),
      value: M,
      onValueChange: W,
      open: R,
      onOpenChange: k,
      dir: T,
      triggerPointerDownPosRef: L,
      disabled: h,
      children: [
        /* @__PURE__ */ c.jsx(Yr.Provider, { scope: t, children: /* @__PURE__ */ c.jsx(
          pg,
          {
            scope: e.__scopeSelect,
            onNativeOptionAdd: d.useCallback((F) => {
              _((H) => new Set(H).add(F));
            }, []),
            onNativeOptionRemove: d.useCallback((F) => {
              _((H) => {
                const $ = new Set(H);
                return $.delete(F), $;
              });
            }, []),
            children: r
          }
        ) }),
        D ? /* @__PURE__ */ c.jsxs(
          Yl,
          {
            "aria-hidden": !0,
            required: v,
            tabIndex: -1,
            name: f,
            autoComplete: p,
            value: M,
            onChange: (F) => W(F.target.value),
            disabled: h,
            form: w,
            children: [
              M === void 0 ? /* @__PURE__ */ c.jsx("option", { value: "" }) : null,
              Array.from(V)
            ]
          },
          U
        ) : null
      ]
    }
  ) });
};
xl.displayName = nr;
var wl = "SelectTrigger", Sl = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, disabled: n = !1, ...o } = e, s = Kr(r), a = ut(wl, r), i = a.disabled || n, l = ae(t, a.onTriggerChange), u = Xr(r), f = d.useRef("touch"), [p, h, v] = Xl((m) => {
      const g = u().filter((y) => !y.disabled), S = g.find((y) => y.value === a.value), b = Kl(g, m, S);
      b !== void 0 && a.onValueChange(b.value);
    }), w = (m) => {
      i || (a.onOpenChange(!0), v()), m && (a.triggerPointerDownPosRef.current = {
        x: Math.round(m.pageX),
        y: Math.round(m.pageY)
      });
    };
    return /* @__PURE__ */ c.jsx(ag, { asChild: !0, ...s, children: /* @__PURE__ */ c.jsx(
      te.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": a.contentId,
        "aria-expanded": a.open,
        "aria-required": a.required,
        "aria-autocomplete": "none",
        dir: a.dir,
        "data-state": a.open ? "open" : "closed",
        disabled: i,
        "data-disabled": i ? "" : void 0,
        "data-placeholder": Ul(a.value) ? "" : void 0,
        ...o,
        ref: l,
        onClick: Z(o.onClick, (m) => {
          m.currentTarget.focus(), f.current !== "mouse" && w(m);
        }),
        onPointerDown: Z(o.onPointerDown, (m) => {
          f.current = m.pointerType;
          const g = m.target;
          g.hasPointerCapture(m.pointerId) && g.releasePointerCapture(m.pointerId), m.button === 0 && m.ctrlKey === !1 && m.pointerType === "mouse" && (w(m), m.preventDefault());
        }),
        onKeyDown: Z(o.onKeyDown, (m) => {
          const g = p.current !== "";
          !(m.ctrlKey || m.altKey || m.metaKey) && m.key.length === 1 && h(m.key), !(g && m.key === " ") && cg.includes(m.key) && (w(), m.preventDefault());
        })
      }
    ) });
  }
);
Sl.displayName = wl;
var Cl = "SelectValue", El = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, className: n, style: o, children: s, placeholder: a = "", ...i } = e, l = ut(Cl, r), { onValueNodeHasChildrenChange: u } = l, f = s !== void 0, p = ae(t, l.onValueNodeChange);
    return xe(() => {
      u(f);
    }, [u, f]), /* @__PURE__ */ c.jsx(
      te.span,
      {
        ...i,
        ref: p,
        style: { pointerEvents: "none" },
        children: Ul(l.value) ? /* @__PURE__ */ c.jsx(c.Fragment, { children: a }) : s
      }
    );
  }
);
El.displayName = Cl;
var hg = "SelectIcon", Rl = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, children: n, ...o } = e;
    return /* @__PURE__ */ c.jsx(te.span, { "aria-hidden": !0, ...o, ref: t, children: n || "▼" });
  }
);
Rl.displayName = hg;
var gg = "SelectPortal", Pl = (e) => /* @__PURE__ */ c.jsx($r, { asChild: !0, ...e });
Pl.displayName = gg;
var gt = "SelectContent", Tl = d.forwardRef(
  (e, t) => {
    const r = ut(gt, e.__scopeSelect), [n, o] = d.useState();
    if (xe(() => {
      o(new DocumentFragment());
    }, []), !r.open) {
      const s = n;
      return s ? qt.createPortal(
        /* @__PURE__ */ c.jsx(Ol, { scope: e.__scopeSelect, children: /* @__PURE__ */ c.jsx(Yr.Slot, { scope: e.__scopeSelect, children: /* @__PURE__ */ c.jsx("div", { children: e.children }) }) }),
        s
      ) : null;
    }
    return /* @__PURE__ */ c.jsx(Nl, { ...e, ref: t });
  }
);
Tl.displayName = gt;
var $e = 10, [Ol, dt] = $t(gt), vg = "SelectContentImpl", Nl = d.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: r,
      position: n = "item-aligned",
      onCloseAutoFocus: o,
      onEscapeKeyDown: s,
      onPointerDownOutside: a,
      //
      // PopperContent props
      side: i,
      sideOffset: l,
      align: u,
      alignOffset: f,
      arrowPadding: p,
      collisionBoundary: h,
      collisionPadding: v,
      sticky: w,
      hideWhenDetached: m,
      avoidCollisions: g,
      //
      ...S
    } = e, b = ut(gt, r), [y, E] = d.useState(null), [C, T] = d.useState(null), R = ae(t, (A) => E(A)), [k, M] = d.useState(null), [W, L] = d.useState(
      null
    ), D = Xr(r), [V, _] = d.useState(!1), U = d.useRef(!1);
    d.useEffect(() => {
      if (y) return Di(y);
    }, [y]), Ei();
    const F = d.useCallback(
      (A) => {
        const [B, ...K] = D().map((O) => O.ref.current), [z] = K.slice(-1), ee = document.activeElement;
        for (const O of A)
          if (O === ee || (O == null || O.scrollIntoView({ block: "nearest" }), O === B && C && (C.scrollTop = 0), O === z && C && (C.scrollTop = C.scrollHeight), O == null || O.focus(), document.activeElement !== ee)) return;
      },
      [D, C]
    ), H = d.useCallback(
      () => F([k, y]),
      [F, k, y]
    );
    d.useEffect(() => {
      V && H();
    }, [V, H]);
    const { onOpenChange: $, triggerPointerDownPosRef: G } = b;
    d.useEffect(() => {
      if (y) {
        let A = { x: 0, y: 0 };
        const B = (z) => {
          var ee, O;
          A = {
            x: Math.abs(Math.round(z.pageX) - (((ee = G.current) == null ? void 0 : ee.x) ?? 0)),
            y: Math.abs(Math.round(z.pageY) - (((O = G.current) == null ? void 0 : O.y) ?? 0))
          };
        }, K = (z) => {
          A.x <= 10 && A.y <= 10 ? z.preventDefault() : y.contains(z.target) || $(!1), document.removeEventListener("pointermove", B), G.current = null;
        };
        return G.current !== null && (document.addEventListener("pointermove", B), document.addEventListener("pointerup", K, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", B), document.removeEventListener("pointerup", K, { capture: !0 });
        };
      }
    }, [y, $, G]), d.useEffect(() => {
      const A = () => $(!1);
      return window.addEventListener("blur", A), window.addEventListener("resize", A), () => {
        window.removeEventListener("blur", A), window.removeEventListener("resize", A);
      };
    }, [$]);
    const [P, j] = Xl((A) => {
      const B = D().filter((ee) => !ee.disabled), K = B.find((ee) => ee.ref.current === document.activeElement), z = Kl(B, A, K);
      z && setTimeout(() => z.ref.current.focus());
    }), J = d.useCallback(
      (A, B, K) => {
        const z = !U.current && !K;
        (b.value !== void 0 && b.value === B || z) && (M(A), z && (U.current = !0));
      },
      [b.value]
    ), X = d.useCallback(() => y == null ? void 0 : y.focus(), [y]), Y = d.useCallback(
      (A, B, K) => {
        const z = !U.current && !K;
        (b.value !== void 0 && b.value === B || z) && L(A);
      },
      [b.value]
    ), re = n === "popper" ? Yn : _l, q = re === Yn ? {
      side: i,
      sideOffset: l,
      align: u,
      alignOffset: f,
      arrowPadding: p,
      collisionBoundary: h,
      collisionPadding: v,
      sticky: w,
      hideWhenDetached: m,
      avoidCollisions: g
    } : {};
    return /* @__PURE__ */ c.jsx(
      Ol,
      {
        scope: r,
        content: y,
        viewport: C,
        onViewportChange: T,
        itemRefCallback: J,
        selectedItem: k,
        onItemLeave: X,
        itemTextRefCallback: Y,
        focusSelectedItem: H,
        selectedItemText: W,
        position: n,
        isPositioned: V,
        searchRef: P,
        children: /* @__PURE__ */ c.jsx(wo, { as: pt, allowPinchZoom: !0, children: /* @__PURE__ */ c.jsx(
          xo,
          {
            asChild: !0,
            trapped: b.open,
            onMountAutoFocus: (A) => {
              A.preventDefault();
            },
            onUnmountAutoFocus: Z(o, (A) => {
              var B;
              (B = b.trigger) == null || B.focus({ preventScroll: !0 }), A.preventDefault();
            }),
            children: /* @__PURE__ */ c.jsx(
              Lr,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: s,
                onPointerDownOutside: a,
                onFocusOutside: (A) => A.preventDefault(),
                onDismiss: () => b.onOpenChange(!1),
                children: /* @__PURE__ */ c.jsx(
                  re,
                  {
                    role: "listbox",
                    id: b.contentId,
                    "data-state": b.open ? "open" : "closed",
                    dir: b.dir,
                    onContextMenu: (A) => A.preventDefault(),
                    ...S,
                    ...q,
                    onPlaced: () => _(!0),
                    ref: R,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...S.style
                    },
                    onKeyDown: Z(S.onKeyDown, (A) => {
                      const B = A.ctrlKey || A.altKey || A.metaKey;
                      if (A.key === "Tab" && A.preventDefault(), !B && A.key.length === 1 && j(A.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(A.key)) {
                        let z = D().filter((ee) => !ee.disabled).map((ee) => ee.ref.current);
                        if (["ArrowUp", "End"].includes(A.key) && (z = z.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(A.key)) {
                          const ee = A.target, O = z.indexOf(ee);
                          z = z.slice(O + 1);
                        }
                        setTimeout(() => F(z)), A.preventDefault();
                      }
                    })
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
Nl.displayName = vg;
var bg = "SelectItemAlignedPosition", _l = d.forwardRef((e, t) => {
  const { __scopeSelect: r, onPlaced: n, ...o } = e, s = ut(gt, r), a = dt(gt, r), [i, l] = d.useState(null), [u, f] = d.useState(null), p = ae(t, (R) => f(R)), h = Xr(r), v = d.useRef(!1), w = d.useRef(!0), { viewport: m, selectedItem: g, selectedItemText: S, focusSelectedItem: b } = a, y = d.useCallback(() => {
    if (s.trigger && s.valueNode && i && u && m && g && S) {
      const R = s.trigger.getBoundingClientRect(), k = u.getBoundingClientRect(), M = s.valueNode.getBoundingClientRect(), W = S.getBoundingClientRect();
      if (s.dir !== "rtl") {
        const ee = W.left - k.left, O = M.left - ee, pe = R.left - O, ye = R.width + pe, Te = Math.max(ye, k.width), Ie = window.innerWidth - $e, tt = Xt(O, [
          $e,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max($e, Ie - Te)
        ]);
        i.style.minWidth = ye + "px", i.style.left = tt + "px";
      } else {
        const ee = k.right - W.right, O = window.innerWidth - M.right - ee, pe = window.innerWidth - R.right - O, ye = R.width + pe, Te = Math.max(ye, k.width), Ie = window.innerWidth - $e, tt = Xt(O, [
          $e,
          Math.max($e, Ie - Te)
        ]);
        i.style.minWidth = ye + "px", i.style.right = tt + "px";
      }
      const L = h(), D = window.innerHeight - $e * 2, V = m.scrollHeight, _ = window.getComputedStyle(u), U = parseInt(_.borderTopWidth, 10), F = parseInt(_.paddingTop, 10), H = parseInt(_.borderBottomWidth, 10), $ = parseInt(_.paddingBottom, 10), G = U + F + V + $ + H, P = Math.min(g.offsetHeight * 5, G), j = window.getComputedStyle(m), J = parseInt(j.paddingTop, 10), X = parseInt(j.paddingBottom, 10), Y = R.top + R.height / 2 - $e, re = D - Y, q = g.offsetHeight / 2, A = g.offsetTop + q, B = U + F + A, K = G - B;
      if (B <= Y) {
        const ee = L.length > 0 && g === L[L.length - 1].ref.current;
        i.style.bottom = "0px";
        const O = u.clientHeight - m.offsetTop - m.offsetHeight, pe = Math.max(
          re,
          q + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (ee ? X : 0) + O + H
        ), ye = B + pe;
        i.style.height = ye + "px";
      } else {
        const ee = L.length > 0 && g === L[0].ref.current;
        i.style.top = "0px";
        const pe = Math.max(
          Y,
          U + m.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (ee ? J : 0) + q
        ) + K;
        i.style.height = pe + "px", m.scrollTop = B - Y + m.offsetTop;
      }
      i.style.margin = `${$e}px 0`, i.style.minHeight = P + "px", i.style.maxHeight = D + "px", n == null || n(), requestAnimationFrame(() => v.current = !0);
    }
  }, [
    h,
    s.trigger,
    s.valueNode,
    i,
    u,
    m,
    g,
    S,
    s.dir,
    n
  ]);
  xe(() => y(), [y]);
  const [E, C] = d.useState();
  xe(() => {
    u && C(window.getComputedStyle(u).zIndex);
  }, [u]);
  const T = d.useCallback(
    (R) => {
      R && w.current === !0 && (y(), b == null || b(), w.current = !1);
    },
    [y, b]
  );
  return /* @__PURE__ */ c.jsx(
    xg,
    {
      scope: r,
      contentWrapper: i,
      shouldExpandOnScrollRef: v,
      onScrollButtonChange: T,
      children: /* @__PURE__ */ c.jsx(
        "div",
        {
          ref: l,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: E
          },
          children: /* @__PURE__ */ c.jsx(
            te.div,
            {
              ...o,
              ref: p,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...o.style
              }
            }
          )
        }
      )
    }
  );
});
_l.displayName = bg;
var yg = "SelectPopperPosition", Yn = d.forwardRef((e, t) => {
  const {
    __scopeSelect: r,
    align: n = "start",
    collisionPadding: o = $e,
    ...s
  } = e, a = Kr(r);
  return /* @__PURE__ */ c.jsx(
    ig,
    {
      ...a,
      ...s,
      ref: t,
      align: n,
      collisionPadding: o,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...s.style,
        "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width": "var(--radix-popper-available-width)",
        "--radix-select-content-available-height": "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
Yn.displayName = yg;
var [xg, Wo] = $t(gt, {}), Xn = "SelectViewport", jl = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, nonce: n, ...o } = e, s = dt(Xn, r), a = Wo(Xn, r), i = ae(t, s.onViewportChange), l = d.useRef(0);
    return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: n
        }
      ),
      /* @__PURE__ */ c.jsx(Yr.Slot, { scope: r, children: /* @__PURE__ */ c.jsx(
        te.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...o,
          ref: i,
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: "hidden auto",
            ...o.style
          },
          onScroll: Z(o.onScroll, (u) => {
            const f = u.currentTarget, { contentWrapper: p, shouldExpandOnScrollRef: h } = a;
            if (h != null && h.current && p) {
              const v = Math.abs(l.current - f.scrollTop);
              if (v > 0) {
                const w = window.innerHeight - $e * 2, m = parseFloat(p.style.minHeight), g = parseFloat(p.style.height), S = Math.max(m, g);
                if (S < w) {
                  const b = S + v, y = Math.min(w, b), E = b - y;
                  p.style.height = y + "px", p.style.bottom === "0px" && (f.scrollTop = E > 0 ? E : 0, p.style.justifyContent = "flex-end");
                }
              }
            }
            l.current = f.scrollTop;
          })
        }
      ) })
    ] });
  }
);
jl.displayName = Xn;
var Al = "SelectGroup", [wg, Sg] = $t(Al), Dl = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, ...n } = e, o = Pt();
    return /* @__PURE__ */ c.jsx(wg, { scope: r, id: o, children: /* @__PURE__ */ c.jsx(te.div, { role: "group", "aria-labelledby": o, ...n, ref: t }) });
  }
);
Dl.displayName = Al;
var Ml = "SelectLabel", kl = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, ...n } = e, o = Sg(Ml, r);
    return /* @__PURE__ */ c.jsx(te.div, { id: o.id, ...n, ref: t });
  }
);
kl.displayName = Ml;
var Rr = "SelectItem", [Cg, Il] = $t(Rr), Ll = d.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: r,
      value: n,
      disabled: o = !1,
      textValue: s,
      ...a
    } = e, i = ut(Rr, r), l = dt(Rr, r), u = i.value === n, [f, p] = d.useState(s ?? ""), [h, v] = d.useState(!1), w = ae(
      t,
      (b) => {
        var y;
        return (y = l.itemRefCallback) == null ? void 0 : y.call(l, b, n, o);
      }
    ), m = Pt(), g = d.useRef("touch"), S = () => {
      o || (i.onValueChange(n), i.onOpenChange(!1));
    };
    if (n === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ c.jsx(
      Cg,
      {
        scope: r,
        value: n,
        disabled: o,
        textId: m,
        isSelected: u,
        onItemTextChange: d.useCallback((b) => {
          p((y) => y || ((b == null ? void 0 : b.textContent) ?? "").trim());
        }, []),
        children: /* @__PURE__ */ c.jsx(
          Yr.ItemSlot,
          {
            scope: r,
            value: n,
            disabled: o,
            textValue: f,
            children: /* @__PURE__ */ c.jsx(
              te.div,
              {
                role: "option",
                "aria-labelledby": m,
                "data-highlighted": h ? "" : void 0,
                "aria-selected": u && h,
                "data-state": u ? "checked" : "unchecked",
                "aria-disabled": o || void 0,
                "data-disabled": o ? "" : void 0,
                tabIndex: o ? void 0 : -1,
                ...a,
                ref: w,
                onFocus: Z(a.onFocus, () => v(!0)),
                onBlur: Z(a.onBlur, () => v(!1)),
                onClick: Z(a.onClick, () => {
                  g.current !== "mouse" && S();
                }),
                onPointerUp: Z(a.onPointerUp, () => {
                  g.current === "mouse" && S();
                }),
                onPointerDown: Z(a.onPointerDown, (b) => {
                  g.current = b.pointerType;
                }),
                onPointerMove: Z(a.onPointerMove, (b) => {
                  var y;
                  g.current = b.pointerType, o ? (y = l.onItemLeave) == null || y.call(l) : g.current === "mouse" && b.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: Z(a.onPointerLeave, (b) => {
                  var y;
                  b.currentTarget === document.activeElement && ((y = l.onItemLeave) == null || y.call(l));
                }),
                onKeyDown: Z(a.onKeyDown, (b) => {
                  var E;
                  ((E = l.searchRef) == null ? void 0 : E.current) !== "" && b.key === " " || (ug.includes(b.key) && S(), b.key === " " && b.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
Ll.displayName = Rr;
var Yt = "SelectItemText", $l = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, className: n, style: o, ...s } = e, a = ut(Yt, r), i = dt(Yt, r), l = Il(Yt, r), u = mg(Yt, r), [f, p] = d.useState(null), h = ae(
      t,
      (S) => p(S),
      l.onItemTextChange,
      (S) => {
        var b;
        return (b = i.itemTextRefCallback) == null ? void 0 : b.call(i, S, l.value, l.disabled);
      }
    ), v = f == null ? void 0 : f.textContent, w = d.useMemo(
      () => /* @__PURE__ */ c.jsx("option", { value: l.value, disabled: l.disabled, children: v }, l.value),
      [l.disabled, l.value, v]
    ), { onNativeOptionAdd: m, onNativeOptionRemove: g } = u;
    return xe(() => (m(w), () => g(w)), [m, g, w]), /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
      /* @__PURE__ */ c.jsx(te.span, { id: l.textId, ...s, ref: h }),
      l.isSelected && a.valueNode && !a.valueNodeHasChildren ? qt.createPortal(s.children, a.valueNode) : null
    ] });
  }
);
$l.displayName = Yt;
var Fl = "SelectItemIndicator", Wl = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, ...n } = e;
    return Il(Fl, r).isSelected ? /* @__PURE__ */ c.jsx(te.span, { "aria-hidden": !0, ...n, ref: t }) : null;
  }
);
Wl.displayName = Fl;
var Kn = "SelectScrollUpButton", zl = d.forwardRef((e, t) => {
  const r = dt(Kn, e.__scopeSelect), n = Wo(Kn, e.__scopeSelect), [o, s] = d.useState(!1), a = ae(t, n.onScrollButtonChange);
  return xe(() => {
    if (r.viewport && r.isPositioned) {
      let i = function() {
        const u = l.scrollTop > 0;
        s(u);
      };
      const l = r.viewport;
      return i(), l.addEventListener("scroll", i), () => l.removeEventListener("scroll", i);
    }
  }, [r.viewport, r.isPositioned]), o ? /* @__PURE__ */ c.jsx(
    Vl,
    {
      ...e,
      ref: a,
      onAutoScroll: () => {
        const { viewport: i, selectedItem: l } = r;
        i && l && (i.scrollTop = i.scrollTop - l.offsetHeight);
      }
    }
  ) : null;
});
zl.displayName = Kn;
var Gn = "SelectScrollDownButton", Bl = d.forwardRef((e, t) => {
  const r = dt(Gn, e.__scopeSelect), n = Wo(Gn, e.__scopeSelect), [o, s] = d.useState(!1), a = ae(t, n.onScrollButtonChange);
  return xe(() => {
    if (r.viewport && r.isPositioned) {
      let i = function() {
        const u = l.scrollHeight - l.clientHeight, f = Math.ceil(l.scrollTop) < u;
        s(f);
      };
      const l = r.viewport;
      return i(), l.addEventListener("scroll", i), () => l.removeEventListener("scroll", i);
    }
  }, [r.viewport, r.isPositioned]), o ? /* @__PURE__ */ c.jsx(
    Vl,
    {
      ...e,
      ref: a,
      onAutoScroll: () => {
        const { viewport: i, selectedItem: l } = r;
        i && l && (i.scrollTop = i.scrollTop + l.offsetHeight);
      }
    }
  ) : null;
});
Bl.displayName = Gn;
var Vl = d.forwardRef((e, t) => {
  const { __scopeSelect: r, onAutoScroll: n, ...o } = e, s = dt("SelectScrollButton", r), a = d.useRef(null), i = Xr(r), l = d.useCallback(() => {
    a.current !== null && (window.clearInterval(a.current), a.current = null);
  }, []);
  return d.useEffect(() => () => l(), [l]), xe(() => {
    var f;
    const u = i().find((p) => p.ref.current === document.activeElement);
    (f = u == null ? void 0 : u.ref.current) == null || f.scrollIntoView({ block: "nearest" });
  }, [i]), /* @__PURE__ */ c.jsx(
    te.div,
    {
      "aria-hidden": !0,
      ...o,
      ref: t,
      style: { flexShrink: 0, ...o.style },
      onPointerDown: Z(o.onPointerDown, () => {
        a.current === null && (a.current = window.setInterval(n, 50));
      }),
      onPointerMove: Z(o.onPointerMove, () => {
        var u;
        (u = s.onItemLeave) == null || u.call(s), a.current === null && (a.current = window.setInterval(n, 50));
      }),
      onPointerLeave: Z(o.onPointerLeave, () => {
        l();
      })
    }
  );
}), Eg = "SelectSeparator", Hl = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, ...n } = e;
    return /* @__PURE__ */ c.jsx(te.div, { "aria-hidden": !0, ...n, ref: t });
  }
);
Hl.displayName = Eg;
var qn = "SelectArrow", Rg = d.forwardRef(
  (e, t) => {
    const { __scopeSelect: r, ...n } = e, o = Kr(r), s = ut(qn, r), a = dt(qn, r);
    return s.open && a.position === "popper" ? /* @__PURE__ */ c.jsx(lg, { ...o, ...n, ref: t }) : null;
  }
);
Rg.displayName = qn;
function Ul(e) {
  return e === "" || e === void 0;
}
var Yl = d.forwardRef(
  (e, t) => {
    const { value: r, ...n } = e, o = d.useRef(null), s = ae(t, o), a = fo(r);
    return d.useEffect(() => {
      const i = o.current, l = window.HTMLSelectElement.prototype, f = Object.getOwnPropertyDescriptor(
        l,
        "value"
      ).set;
      if (a !== r && f) {
        const p = new Event("change", { bubbles: !0 });
        f.call(i, r), i.dispatchEvent(p);
      }
    }, [a, r]), /* @__PURE__ */ c.jsx(Fr, { asChild: !0, children: /* @__PURE__ */ c.jsx("select", { ...n, ref: s, defaultValue: r }) });
  }
);
Yl.displayName = "BubbleSelect";
function Xl(e) {
  const t = be(e), r = d.useRef(""), n = d.useRef(0), o = d.useCallback(
    (a) => {
      const i = r.current + a;
      t(i), function l(u) {
        r.current = u, window.clearTimeout(n.current), u !== "" && (n.current = window.setTimeout(() => l(""), 1e3));
      }(i);
    },
    [t]
  ), s = d.useCallback(() => {
    r.current = "", window.clearTimeout(n.current);
  }, []);
  return d.useEffect(() => () => window.clearTimeout(n.current), []), [r, o, s];
}
function Kl(e, t, r) {
  const o = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, s = r ? e.indexOf(r) : -1;
  let a = Pg(e, Math.max(s, 0));
  o.length === 1 && (a = a.filter((u) => u !== r));
  const l = a.find(
    (u) => u.textValue.toLowerCase().startsWith(o.toLowerCase())
  );
  return l !== r ? l : void 0;
}
function Pg(e, t) {
  return e.map((r, n) => e[(t + n) % e.length]);
}
var Tg = xl, Gl = Sl, Og = El, Ng = Rl, _g = Pl, ql = Tl, jg = jl, Ag = Dl, Zl = kl, Jl = Ll, Dg = $l, Mg = Wl, Ql = zl, ec = Bl, tc = Hl;
const uv = Tg, dv = Ag, fv = Og, kg = d.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ c.jsxs(
  Gl,
  {
    ref: n,
    className: de(
      "border-input ring-offset-background placeholder:text-muted-foreground focus:ring-ring flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      e
    ),
    ...r,
    children: [
      t,
      /* @__PURE__ */ c.jsx(Ng, { asChild: !0, children: /* @__PURE__ */ c.jsx($m, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
kg.displayName = Gl.displayName;
const rc = d.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ c.jsx(
  Ql,
  {
    ref: r,
    className: de(
      "flex cursor-default items-center justify-center py-1",
      e
    ),
    ...t,
    children: /* @__PURE__ */ c.jsx(Hm, {})
  }
));
rc.displayName = Ql.displayName;
const nc = d.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ c.jsx(
  ec,
  {
    ref: r,
    className: de(
      "flex cursor-default items-center justify-center py-1",
      e
    ),
    ...t,
    children: /* @__PURE__ */ c.jsx(Bm, {})
  }
));
nc.displayName = ec.displayName;
const Ig = d.forwardRef(({ className: e, children: t, position: r = "popper", ...n }, o) => /* @__PURE__ */ c.jsx(_g, { children: /* @__PURE__ */ c.jsxs(
  ql,
  {
    ref: o,
    className: de(
      "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border shadow-md",
      r === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      e
    ),
    position: r,
    ...n,
    children: [
      /* @__PURE__ */ c.jsx(rc, {}),
      /* @__PURE__ */ c.jsx(
        jg,
        {
          className: de(
            "p-1",
            r === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ c.jsx(nc, {})
    ]
  }
) }));
Ig.displayName = ql.displayName;
const Lg = d.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ c.jsx(
  Zl,
  {
    ref: r,
    className: de("px-2 py-1.5 text-sm font-semibold", e),
    ...t
  }
));
Lg.displayName = Zl.displayName;
const $g = d.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ c.jsxs(
  Jl,
  {
    ref: n,
    className: de(
      "focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ c.jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ c.jsx(Mg, { children: /* @__PURE__ */ c.jsx(Wm, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ c.jsx(Dg, { children: t })
    ]
  }
));
$g.displayName = Jl.displayName;
const Fg = d.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ c.jsx(
  tc,
  {
    ref: r,
    className: de("bg-muted -mx-1 my-1 h-px", e),
    ...t
  }
));
Fg.displayName = tc.displayName;
const Gr = ({ size: e = "md", className: t }) => {
  const r = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };
  return /* @__PURE__ */ c.jsx(
    "div",
    {
      className: de("relative", r[e], t),
      "aria-label": "Loading",
      children: [0, 1, 2].map((n) => /* @__PURE__ */ c.jsx(
        "svg",
        {
          className: "absolute inset-0 animate-spin",
          style: {
            animationDuration: "1s",
            animationDelay: `${n * 0.1}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite"
          },
          viewBox: "0 0 50 50",
          children: /* @__PURE__ */ c.jsx(
            "circle",
            {
              className: "text-primary",
              cx: "25",
              cy: "25",
              r: "20",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "5",
              strokeLinecap: "round",
              strokeDasharray: "60 60",
              strokeDashoffset: "60"
            }
          )
        },
        n
      ))
    }
  );
};
Gr.displayName = "Spinner";
const Wg = jc(
  ({
    xIndex: e,
    yIndex: t,
    col: r,
    lastTile: n,
    onTileClick: o,
    showAnnotations: s,
    winningSequence: a
  }) => {
    const i = e === (n == null ? void 0 : n.x) && t === (n == null ? void 0 : n.y), l = a == null ? void 0 : a.some(
      (u) => u.x === e && u.y === t
    );
    return r !== null ? /* @__PURE__ */ c.jsxs(
      "div",
      {
        className: `relative flex items-center justify-center border border-black ${i ? "bg-amber-400" : ""} ${l ? "bg-amber-200" : ""} `,
        children: [
          /* @__PURE__ */ c.jsx(
            "div",
            {
              className: zg({
                color: r === "black" ? "black" : "white"
              })
            }
          ),
          s && /* @__PURE__ */ c.jsx("div", { className: "absolute left-0 top-0 text-xs text-gray-700", children: `x${e} y${t}` })
        ]
      },
      `${e}-${t}`
    ) : /* @__PURE__ */ c.jsx(
      "div",
      {
        className: "relative flex items-center justify-center border border-black",
        onClick: () => {
          console.debug("Tile clicked: x=", e, "y=", t), o(e, t);
        },
        children: s && /* @__PURE__ */ c.jsx("div", { className: "absolute left-0 top-0 text-xs text-gray-700", children: `x${e} y${t}` })
      },
      `${e}-${t}`
    );
  },
  (e, t) => {
    var r, n, o, s, a, i;
    return e.col === t.col && ((r = e.lastTile) == null ? void 0 : r.x) === ((n = t.lastTile) == null ? void 0 : n.x) && ((o = e.lastTile) == null ? void 0 : o.y) === ((s = t.lastTile) == null ? void 0 : s.y) && e.xIndex === t.xIndex && e.yIndex === t.yIndex && e.showAnnotations === t.showAnnotations && e.onTileClick === t.onTileClick && //TODO: check if we need to do JSON.stringify here
    ((a = e.winningSequence) == null ? void 0 : a.length) === ((i = t.winningSequence) == null ? void 0 : i.length);
  }
), zg = Ys("rounded-full h-[90%] w-[90%]", {
  variants: {
    color: {
      black: "bg-black",
      white: "bg-white"
    }
  },
  defaultVariants: {
    color: "white"
  }
}), Bg = ({
  size: e,
  onTileClick: t,
  tiles: r,
  lastTile: n,
  style: o,
  winningSequence: s
}) => {
  const a = ca(1488), [i, l] = Fe(window.innerWidth / 2.2), [u, f] = Fe(!1), p = Hs(
    () => r.map(
      (m, g) => m.map((S, b) => /* @__PURE__ */ c.jsx(
        Wg,
        {
          xIndex: g,
          yIndex: b,
          col: S,
          lastTile: n,
          onTileClick: t,
          showAnnotations: u,
          winningSequence: s
        },
        `${g}-${b}`
      ))
    ),
    [r, n, t, u, s]
  ), h = i / e, v = a ? 100 : 80, w = a ? [300, 300] : [400, 400];
  return a ? /* @__PURE__ */ c.jsx("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ c.jsx("div", { className: "rounded-lg bg-[#ba8c63] shadow-md", style: o, children: /* @__PURE__ */ c.jsx(
    "div",
    {
      className: "grid rounded-lg",
      style: {
        gridTemplateColumns: `repeat(${e}, ${v / e}vmin)`,
        gridTemplateRows: `repeat(${e}, ${v / e}vmin)`
      },
      children: p
    }
  ) }) }) : /* @__PURE__ */ c.jsx(
    od,
    {
      width: i,
      height: i,
      onResize: (m, { size: g }) => {
        l(g.width);
      },
      resizeHandles: ["se"],
      minConstraints: [w[0], w[1]],
      children: /* @__PURE__ */ c.jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ c.jsx(
          "div",
          {
            className: "rounded-lg bg-[#ba8c63] shadow-md",
            style: { width: "100%", height: "100%" },
            children: /* @__PURE__ */ c.jsx(
              "div",
              {
                className: "grid rounded-lg",
                style: {
                  gridTemplateColumns: `repeat(${e}, ${h}px)`,
                  gridTemplateRows: `repeat(${e}, ${h}px)`
                },
                children: p
              }
            )
          }
        ),
        /* @__PURE__ */ c.jsx("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ c.jsx(
          Nt,
          {
            onClick: () => f(!u),
            className: "focus-visible:ring-ring relative mt-4 inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border-[#3e3e3e] bg-[#3e3e3e] px-4 py-2 text-base font-medium text-[#bababa] shadow transition-colors hover:bg-[#4a4a4a] focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",
            children: u && !a ? "Hide Annotations" : "Show Annotations"
          }
        ) })
      ] })
    }
  );
}, pv = ({ gen: e, lastTile: t }) => {
  const r = Hs(() => ua(e), [e]), n = r.length, o = (s, a) => {
    console.debug("Clicked tile at:", s, a);
  };
  return /* @__PURE__ */ c.jsx("div", { className: "p-4", children: /* @__PURE__ */ c.jsx(
    Bg,
    {
      size: n,
      tiles: r,
      onTileClick: o,
      lastTile: t,
      winningSequence: null
    }
  ) });
}, mv = ({
  games: e = [],
  onGameClick: t,
  noGamesText: r,
  onGameClickLoading: n = !1
}) => /* @__PURE__ */ c.jsx("div", { className: "mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4", children: e.length > 0 ? e.map((o) => {
  var s;
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      onClick: () => t(o),
      className: "relative cursor-pointer",
      children: [
        /* @__PURE__ */ c.jsx(Qt, { className: "border-[#2b2b2b] bg-[#2b2b2b] hover:bg-[#3e3e3e]", children: /* @__PURE__ */ c.jsxs(er, { className: "p-4 sm:p-6", children: [
          /* @__PURE__ */ c.jsx("div", { className: "aspect-w-16 aspect-h-9 mb-4 bg-[#3e3e3e]" }),
          /* @__PURE__ */ c.jsx("h3", { className: "text-xl font-bold text-[#bababa] sm:text-2xl", children: ((s = o.opponent) == null ? void 0 : s.userName) ?? o.gameId.slice(0, 6) }),
          /* @__PURE__ */ c.jsx("p", { className: "truncate text-base text-[#999999] sm:text-lg", children: o.gameId })
        ] }) }),
        n && /* @__PURE__ */ c.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/50", children: /* @__PURE__ */ c.jsx(Gr, { size: "md", className: "text-white" }) })
      ]
    },
    o.gameId
  );
}) : /* @__PURE__ */ c.jsx("span", { children: r }) }), Vs = 13, Vg = 19, oc = ({
  //TODO: extend to accept board size as custom prop in order to pass from interval to slider
  isOpen: e,
  onClose: t,
  onCreate: r,
  isLoading: n
}) => {
  const [o, s] = Fe(Vs);
  return /* @__PURE__ */ c.jsx(qi, { open: e, onOpenChange: t, children: /* @__PURE__ */ c.jsxs(Zi, { children: [
    /* @__PURE__ */ c.jsx(Po, { className: "bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" }),
    /* @__PURE__ */ c.jsxs(To, { className: "data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-[#2b2b2b] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none", children: [
      /* @__PURE__ */ c.jsx(Oo, { className: "m-0 text-[17px] font-medium text-[#bababa]", children: "Create a game" }),
      /* @__PURE__ */ c.jsx(No, { className: "mb-5 mt-2.5 text-[15px] leading-normal text-[#999999]", children: "Set up your game preferences here" }),
      /* @__PURE__ */ c.jsx("div", { className: "grid gap-4 py-4", children: /* @__PURE__ */ c.jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [
        /* @__PURE__ */ c.jsx(
          "label",
          {
            htmlFor: "minutes",
            className: "mb-26 text-right text-[#bababa]",
            style: {
              //TODO: check for flex stabilization
              marginBottom: 27
            },
            children: "Board size"
          }
        ),
        /* @__PURE__ */ c.jsxs("div", { className: "col-span-3", children: [
          /* @__PURE__ */ c.jsx(
            Za,
            {
              id: "boardSize",
              min: Vs,
              max: Vg,
              step: 2,
              value: [o],
              onValueChange: (a) => s(a[0])
            }
          ),
          /* @__PURE__ */ c.jsx("div", { className: "mt-1 text-center text-[#bababa]", children: o })
        ] })
      ] }) }),
      /* @__PURE__ */ c.jsx(
        Nt,
        {
          className: "w-full bg-[#629924] text-white hover:bg-[#58881f]",
          onClick: () => r(o),
          disabled: n,
          loading: n,
          children: "Create game"
        }
      ),
      /* @__PURE__ */ c.jsx(_o, { asChild: !0, children: /* @__PURE__ */ c.jsx(
        "button",
        {
          className: "focus:shadow-violet7 absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-[#f0f0f0] hover:bg-[#f0f0f0] focus:shadow-[0_0_0_2px] focus:outline-none",
          "aria-label": "Close",
          children: /* @__PURE__ */ c.jsx(Ji, {})
        }
      ) })
    ] })
  ] }) });
};
oc.displayName = "GameCreator";
const sc = ({
  children: e,
  timeControl: t,
  onCreateGame: r,
  isLoading: n
}) => {
  const [o, s] = Fe(!1), a = () => s(!0), i = () => s(!1), l = (u) => {
    r(u, t);
  };
  return /* @__PURE__ */ c.jsxs(c.Fragment, { children: [
    /* @__PURE__ */ c.jsx("div", { onClick: a, children: e }),
    /* @__PURE__ */ c.jsx(
      oc,
      {
        isOpen: o,
        onClose: i,
        onCreate: l,
        isLoading: n
      }
    )
  ] });
}, Rn = ({
  onClick: e,
  text: t,
  loading: r
}) => /* @__PURE__ */ c.jsx(
  Nt,
  {
    onClick: e,
    loading: r,
    className: "h-12 w-full border-[#3e3e3e] bg-[#3e3e3e] text-base text-[#bababa] hover:bg-[#4a4a4a] sm:h-14 sm:text-xl",
    children: t
  }
), hv = ({
  onCreateGame: e,
  onPlayWithFriendClick: t,
  onPlayWithAIClick: r,
  createGameText: n,
  playWithFriendText: o,
  playWithAIText: s,
  isLoadingCreateGame: a = !1,
  isLoadingPlayWithFriend: i = !1,
  isLoadingPlayWithAI: l = !1
}) => /* @__PURE__ */ c.jsxs("div", { className: "space-y-4 sm:space-y-6", children: [
  /* @__PURE__ */ c.jsx(
    sc,
    {
      onCreateGame: e,
      isLoading: a,
      children: /* @__PURE__ */ c.jsx(Rn, { text: n, loading: a })
    }
  ),
  /* @__PURE__ */ c.jsx(
    Rn,
    {
      onClick: t,
      text: o,
      loading: i
    }
  ),
  /* @__PURE__ */ c.jsx(
    Rn,
    {
      onClick: r,
      text: s,
      loading: l
    }
  )
] }), gv = ({
  gameType: e,
  players: t
}) => {
  const r = ca(1488);
  return /* @__PURE__ */ c.jsxs(
    "div",
    {
      className: "max-w-xs rounded-lg bg-[#2b2b2b] p-3 text-white",
      style: {
        maxWidth: r ? "100%" : "350px",
        minWidth: r ? "100%" : "350px"
      },
      children: [
        /* @__PURE__ */ c.jsxs("div", { className: "mb-2 flex items-center", children: [
          /* @__PURE__ */ c.jsxs(
            "svg",
            {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              className: "mr-2 h-5 w-5 text-[#b0b0b0]",
              children: [
                /* @__PURE__ */ c.jsx("circle", { cx: "12", cy: "12", r: "10" }),
                /* @__PURE__ */ c.jsx("path", { d: "M4.93 4.93l4.24 4.24" })
              ]
            }
          ),
          /* @__PURE__ */ c.jsx("span", { className: "text-sm text-[#b0b0b0]", children: e })
        ] }),
        /* @__PURE__ */ c.jsx("div", { className: "space-y-2", children: t.map((n, o) => /* @__PURE__ */ c.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ c.jsx(
            "div",
            {
              className: `mr-2 h-2 w-2 rounded-full ${n.isCurrentPlayer ? "bg-[#7cb342]" : "border border-[#b0b0b0]"}`
            }
          ),
          /* @__PURE__ */ c.jsx("span", { className: "mr-1 font-medium text-[#ff9800]", children: n.title }),
          /* @__PURE__ */ c.jsx("span", { className: "mr-1", children: n.name }),
          n.isCurrentPlayer && /* @__PURE__ */ c.jsx("span", { className: "mr-1 text-red-500" }),
          /* @__PURE__ */ c.jsxs("span", { className: "text-[#b0b0b0]", children: [
            "(",
            n.rating,
            ")"
          ] })
        ] }, o)) })
      ]
    }
  );
}, Hg = ({
  gameTypes: e,
  onCreateGame: t,
  isLoading: r
}) => /* @__PURE__ */ c.jsx("div", { className: "grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6", children: e.map((n, o) => /* @__PURE__ */ c.jsx(
  sc,
  {
    timeControl: n.timeControl,
    onCreateGame: t,
    isLoading: r,
    children: /* @__PURE__ */ c.jsx(Qt, { className: "cursor-pointer border-[#2b2b2b] bg-[#2b2b2b] transition-colors hover:bg-[#3e3e3e]", children: /* @__PURE__ */ c.jsxs(er, { className: "p-4 text-center sm:p-6", children: [
      /* @__PURE__ */ c.jsx("h3", { className: "text-xl font-bold text-[#bababa] sm:text-3xl", children: n.timeLabel }),
      /* @__PURE__ */ c.jsx("p", { className: "truncate text-sm text-[#999999] sm:text-xl", children: n.type }),
      /* @__PURE__ */ c.jsxs("p", { className: "text-xs text-[#999999] sm:text-lg", children: [
        "Board size: ",
        n.boardSize,
        " "
      ] })
    ] }) })
  },
  o
)) });
Hg.displayName = "TimeControls";
const Ug = ({
  title: e,
  items: t,
  onItemClick: r,
  noItemsText: n
}) => /* @__PURE__ */ c.jsx(Qt, { className: "mb-6 border-[#2b2b2b] bg-[#2b2b2b]", children: /* @__PURE__ */ c.jsxs(er, { className: "p-4 sm:p-6", children: [
  /* @__PURE__ */ c.jsx("h2", { className: "mb-4 text-xl font-bold text-[#bababa] sm:text-2xl", children: e }),
  /* @__PURE__ */ c.jsx("ul", { className: "max-h-64 space-y-4 overflow-y-auto text-[#bababa]", children: t && (t == null ? void 0 : t.length) > 0 ? t == null ? void 0 : t.map((o, s) => /* @__PURE__ */ c.jsxs(
    "li",
    {
      className: "flex cursor-pointer items-center rounded p-2 transition-colors hover:bg-[#3b3b3b]",
      onClick: () => r == null ? void 0 : r(o),
      children: [
        o.icon,
        /* @__PURE__ */ c.jsx("span", { className: "ml-2 text-base sm:text-xl", children: o.title })
      ]
    },
    o.title + s
  )) : /* @__PURE__ */ c.jsx("span", { children: n }) })
] }) });
Ug.displayName = "SectionList";
const vv = ({
  playersOnlineText: e,
  gamesInPlayText: t
}) => /* @__PURE__ */ c.jsxs("div", { className: "mt-6 text-center", children: [
  /* @__PURE__ */ c.jsx("p", { className: "text-base sm:text-xl", children: e }),
  /* @__PURE__ */ c.jsx("p", { className: "text-base sm:text-xl", children: t })
] }), bv = ({
  moves: e,
  clock: t,
  players: r,
  onUndo: n,
  onSkip: o,
  onFlag: s,
  onReset: a,
  onRematch: i
}) => {
  var l, u;
  return /* @__PURE__ */ c.jsxs("div", { className: "w-[300px] rounded-lg bg-[#2e2a24] p-2 font-sans text-white", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
      (t == null ? void 0 : t.black) && /* @__PURE__ */ c.jsx("div", { className: "font-mono text-5xl", children: Pr(t.black > 0 ? t.black : 0) }),
      (t == null ? void 0 : t.black) && /* @__PURE__ */ c.jsx("button", { className: "rounded bg-[#3d3733] p-1 text-[#b0b0b0]", children: /* @__PURE__ */ c.jsx(Sp, { className: "h-6 w-6" }) })
    ] }),
    /* @__PURE__ */ c.jsxs("div", { className: "mb-2 rounded bg-[#363330] p-2", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ c.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ c.jsx(
            "div",
            {
              className: "mr-2 h-2 w-2 rounded-full",
              style: { backgroundColor: "black" }
            }
          ),
          /* @__PURE__ */ c.jsx("span", { className: "text-sm", children: (l = r.black) == null ? void 0 : l.userName })
        ] }),
        /* @__PURE__ */ c.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ c.jsx("div", { className: "mr-0.5 h-3 w-1 rounded-sm bg-[#7cb342]" }),
          /* @__PURE__ */ c.jsx("div", { className: "mr-0.5 h-4 w-1 rounded-sm bg-[#7cb342]" }),
          /* @__PURE__ */ c.jsx("div", { className: "mr-0.5 h-5 w-1 rounded-sm bg-[#7cb342]" }),
          /* @__PURE__ */ c.jsx("div", { className: "mr-2 h-6 w-1 rounded-sm bg-[#7cb342]" })
        ] })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "mt-2 flex justify-between", children: [
        /* @__PURE__ */ c.jsx(
          Rp,
          {
            className: "h-5 w-5 text-[#b0b0b0]",
            onClick: () => o("back")
          }
        ),
        /* @__PURE__ */ c.jsx(
          Pp,
          {
            className: "h-5 w-5 text-[#b0b0b0]",
            onClick: () => o("back")
          }
        ),
        /* @__PURE__ */ c.jsx(
          Tp,
          {
            className: "h-5 w-5 text-[#b0b0b0]",
            onClick: () => o("forward")
          }
        ),
        /* @__PURE__ */ c.jsx(
          Ep,
          {
            className: "h-5 w-5 text-[#b0b0b0]",
            onClick: () => o("forward")
          }
        ),
        /* @__PURE__ */ c.jsx(
          gi,
          {
            className: "h-5 w-5 text-[#b0b0b0]",
            onClick: () => i()
          }
        ),
        /* @__PURE__ */ c.jsx(Cp, { className: "h-5 w-5 text-[#b0b0b0]" })
      ] })
    ] }),
    e.length === 0 ? /* @__PURE__ */ c.jsxs("div", { className: "mb-2 flex items-center rounded bg-[#363330] p-2", children: [
      /* @__PURE__ */ c.jsx("div", { className: "mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#b0b0b0]", children: /* @__PURE__ */ c.jsx("span", { className: "text-xl font-bold text-[#363330]", children: "i" }) }),
      /* @__PURE__ */ c.jsxs("div", { children: [
        /* @__PURE__ */ c.jsx("div", { className: "text-sm", children: !r.black && !r.white && "Game will starts soon" }),
        /* @__PURE__ */ c.jsx("div", { className: "text-lg font-bold", children: !r.black && !r.white && "Wait for your opponent" })
      ] })
    ] }) : /* @__PURE__ */ c.jsx("div", { className: "mb-2 max-h-[100px] overflow-y-auto rounded bg-[#363330] p-2", children: /* @__PURE__ */ c.jsx("div", { className: "grid grid-cols-3 gap-2 text-sm", children: e.map((f, p) => /* @__PURE__ */ c.jsxs(Ac, { children: [
      /* @__PURE__ */ c.jsxs("div", { className: "text-[#b0b0b0]", children: [
        p + 1,
        "."
      ] }),
      /* @__PURE__ */ c.jsx("div", { className: p % 2 === 0 ? "font-bold" : "", children: f }),
      /* @__PURE__ */ c.jsx("div", { className: p % 2 === 0 ? "text-black" : "text-white", children: "●" })
    ] }, p)) }) }),
    /* @__PURE__ */ c.jsxs("div", { className: "mb-2 flex justify-between", children: [
      /* @__PURE__ */ c.jsx("button", { className: "rounded bg-[#363330] p-2", onClick: a, children: /* @__PURE__ */ c.jsx(bo, { className: "h-5 w-5 text-[#b0b0b0]" }) }),
      /* @__PURE__ */ c.jsx("button", { className: "rounded bg-[#363330] p-2", onClick: n, children: /* @__PURE__ */ c.jsx(vi, { className: "h-5 w-5 text-[#b0b0b0]" }) }),
      /* @__PURE__ */ c.jsx("button", { className: "rounded bg-[#363330] p-2", onClick: s, children: /* @__PURE__ */ c.jsx(hi, { className: "h-5 w-5 text-[#b0b0b0]" }) })
    ] }),
    /* @__PURE__ */ c.jsx("div", { className: "mb-2 rounded bg-[#363330] p-2", children: /* @__PURE__ */ c.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ c.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ c.jsx(
          "div",
          {
            className: "mr-2 h-2 w-2 rounded-full",
            style: { backgroundColor: "white" }
          }
        ),
        /* @__PURE__ */ c.jsx("span", { className: "text-sm", children: (u = r.white) == null ? void 0 : u.userName })
      ] }),
      /* @__PURE__ */ c.jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ c.jsx("div", { className: "mr-0.5 h-3 w-1 rounded-sm bg-[#7cb342]" }),
        /* @__PURE__ */ c.jsx("div", { className: "mr-0.5 h-4 w-1 rounded-sm bg-[#7cb342]" }),
        /* @__PURE__ */ c.jsx("div", { className: "mr-0.5 h-5 w-1 rounded-sm bg-[#7cb342]" }),
        /* @__PURE__ */ c.jsx("div", { className: "mr-2 h-6 w-1 rounded-sm bg-[#7cb342]" })
      ] })
    ] }) }),
    e.length === 0 ? /* @__PURE__ */ c.jsx("div", { className: "rounded bg-[#7cb342] py-2 text-center text-sm", children: "17 seconds to play the first move" }) : /* @__PURE__ */ c.jsx(
      "button",
      {
        className: "w-full rounded bg-[#7cb342] py-2 text-center text-sm",
        onClick: () => alert("Add move clicked"),
        children: "Add move"
      }
    ),
    (t == null ? void 0 : t.white) && /* @__PURE__ */ c.jsx("div", { className: "mt-2 text-center font-mono text-5xl", children: Pr(t.white > 0 ? t.white : 0) })
  ] });
}, Pr = (e) => `${Math.floor(e / 60).toString().padStart(2, "0")}:${Math.floor(e % 60).toString().padStart(2, "0")}`, yv = ({
  moves: e,
  player: t,
  onUndo: r,
  onSkip: n,
  onFlag: o,
  onReset: s,
  onRematch: a,
  timeLeft: i,
  opponentView: l
}) => l ? /* @__PURE__ */ c.jsx("div", { className: "w-full max-w-md rounded-lg bg-[#2e2a24] p-2 font-mono text-white", children: /* @__PURE__ */ c.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
  /* @__PURE__ */ c.jsxs("div", { className: "flex items-center", children: [
    /* @__PURE__ */ c.jsx(
      "span",
      {
        className: "mr-2 h-3 w-3 rounded-full",
        style: { backgroundColor: t == null ? void 0 : t.color }
      }
    ),
    /* @__PURE__ */ c.jsx("span", { className: "font-bold text-[#ffa600]", children: t == null ? void 0 : t.userName })
  ] }),
  i && /* @__PURE__ */ c.jsx("div", { className: "bg-[#3d3733] px-2 py-1 text-4xl font-bold", children: Pr(i > 0 ? i : 0) })
] }) }) : /* @__PURE__ */ c.jsxs("div", { className: "w-full max-w-md rounded-lg bg-[#2e2a24] p-2 font-mono text-white", children: [
  /* @__PURE__ */ c.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
    /* @__PURE__ */ c.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ c.jsx(
        "span",
        {
          className: "mr-2 h-3 w-3 rounded-full",
          style: { backgroundColor: t == null ? void 0 : t.color }
        }
      ),
      /* @__PURE__ */ c.jsx("span", { className: "font-bold text-[#ffa600]", children: t == null ? void 0 : t.userName })
    ] }),
    i && /* @__PURE__ */ c.jsx("div", { className: "bg-[#3d3733] px-2 py-1 text-4xl font-bold", children: Pr(i > 0 ? i : 0) })
  ] }),
  /* @__PURE__ */ c.jsxs("div", { className: "mb-2 flex items-center rounded bg-[#363330] text-sm", children: [
    /* @__PURE__ */ c.jsx(
      xp,
      {
        className: "text-[#b0b0b0]",
        onClick: () => n("back")
      }
    ),
    /* @__PURE__ */ c.jsx("div", { className: "flex-1 overflow-x-auto whitespace-nowrap px-2 py-1", children: e.length > 0 ? e.map((u, f) => /* @__PURE__ */ c.jsx("span", { className: "mr-2 text-[#ffa600]", children: u }, f)) : /* @__PURE__ */ c.jsx("span", { children: !t && "Game will starts soon. Wait for your opponent" }) }),
    /* @__PURE__ */ c.jsx(
      wp,
      {
        className: "text-[#b0b0b0]",
        onClick: () => n("forward")
      }
    )
  ] }),
  /* @__PURE__ */ c.jsxs("div", { className: "mb-2 flex justify-between", children: [
    /* @__PURE__ */ c.jsx("button", { className: "rounded bg-[#363330] p-2", onClick: s, children: /* @__PURE__ */ c.jsx(bo, { className: "h-5 w-5 text-[#b0b0b0]" }) }),
    /* @__PURE__ */ c.jsx("button", { className: "rounded bg-[#363330] p-2", onClick: r, children: /* @__PURE__ */ c.jsx(vi, { className: "h-5 w-5 text-[#b0b0b0]" }) }),
    /* @__PURE__ */ c.jsx("button", { className: "rounded bg-[#363330] p-2", onClick: o, children: /* @__PURE__ */ c.jsx(hi, { className: "h-5 w-5 text-[#b0b0b0]" }) }),
    /* @__PURE__ */ c.jsx("button", { className: "rounded bg-[#363330] p-2", onClick: a, children: /* @__PURE__ */ c.jsx(gi, { className: "h-5 w-5 text-[#b0b0b0]" }) })
  ] }),
  e.length < 0 && /* @__PURE__ */ c.jsx("div", { className: "mt-2 w-full rounded bg-[#7cb342] py-2 text-center text-sm", children: "Waiting for first move..." })
] });
export {
  Yd as AlertDialog,
  Bg as Board,
  Fd as BoardGame,
  Nt as Button,
  Qt as Card,
  er as CardContent,
  xa as CardDescription,
  wa as CardFooter,
  ba as CardHeader,
  ya as CardTitle,
  av as Dialog,
  lv as DialogClose,
  Xm as DialogContent,
  Zm as DialogDescription,
  Gm as DialogFooter,
  Km as DialogHeader,
  Qi as DialogOverlay,
  Ym as DialogPortal,
  qm as DialogTitle,
  iv as DialogTrigger,
  mv as FeaturedBoxes,
  oc as GameCreator,
  sc as GameCreatorButton,
  hv as GameOptionsButtons,
  gv as GamePlayersInfo,
  pv as GamePreview,
  bv as GameTime,
  yv as GameTimeMobile,
  Xd as Input,
  Zg as LoadingOverlay,
  vv as OnlinePlayersInfo,
  hf as ScrollArea,
  Ia as ScrollBar,
  Ug as SectionList,
  uv as Select,
  Ig as SelectContent,
  dv as SelectGroup,
  $g as SelectItem,
  Lg as SelectLabel,
  nc as SelectScrollDownButton,
  rc as SelectScrollUpButton,
  Fg as SelectSeparator,
  kg as SelectTrigger,
  fv as SelectValue,
  Za as Slider,
  Gr as Spinner,
  Dp as Switch,
  Hg as TimeControls,
  rv as ToasterProvider,
  de as cn,
  ua as genParser,
  Pr as secondsToString,
  tv as toaster,
  ca as useMobileDesign,
  qg as useTiles
};
