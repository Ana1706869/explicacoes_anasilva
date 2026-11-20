var Xw = (e) => {
  throw TypeError(e);
};
var ka = (e, t, r) =>
  t.has(e)
    ? Xw("Cannot add the same private member more than once")
    : t instanceof WeakSet
      ? t.add(e)
      : t.set(e, r);
function Jw(e, t) {
  for (var r = 0; r < t.length; r++) {
    const n = t[r];
    if (typeof n != "string" && !Array.isArray(n)) {
      for (const o in n)
        if (o !== "default" && !(o in e)) {
          const a = Object.getOwnPropertyDescriptor(n, o);
          a &&
            Object.defineProperty(
              e,
              o,
              a.get ? a : { enumerable: !0, get: () => n[o] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]')) n(o);
  new MutationObserver((o) => {
    for (const a of o)
      if (a.type === "childList")
        for (const i of a.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && n(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(o) {
    const a = {};
    return (
      o.integrity && (a.integrity = o.integrity),
      o.referrerPolicy && (a.referrerPolicy = o.referrerPolicy),
      o.crossOrigin === "use-credentials"
        ? (a.credentials = "include")
        : o.crossOrigin === "anonymous"
          ? (a.credentials = "omit")
          : (a.credentials = "same-origin"),
      a
    );
  }
  function n(o) {
    if (o.ep) return;
    o.ep = !0;
    const a = r(o);
    fetch(o.href, a);
  }
})();
function fa(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var ng = { exports: {} },
  Fl = {},
  og = { exports: {} },
  Ce = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ni = Symbol.for("react.element"),
  Zw = Symbol.for("react.portal"),
  ex = Symbol.for("react.fragment"),
  tx = Symbol.for("react.strict_mode"),
  rx = Symbol.for("react.profiler"),
  nx = Symbol.for("react.provider"),
  ox = Symbol.for("react.context"),
  ax = Symbol.for("react.forward_ref"),
  ix = Symbol.for("react.suspense"),
  sx = Symbol.for("react.memo"),
  lx = Symbol.for("react.lazy"),
  xf = Symbol.iterator;
function ux(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (xf && e[xf]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var ag = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  ig = Object.assign,
  sg = {};
function ha(e, t, r) {
  ((this.props = e),
    (this.context = t),
    (this.refs = sg),
    (this.updater = r || ag));
}
ha.prototype.isReactComponent = {};
ha.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
ha.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function lg() {}
lg.prototype = ha.prototype;
function $d(e, t, r) {
  ((this.props = e),
    (this.context = t),
    (this.refs = sg),
    (this.updater = r || ag));
}
var Yd = ($d.prototype = new lg());
Yd.constructor = $d;
ig(Yd, ha.prototype);
Yd.isPureReactComponent = !0;
var Sf = Array.isArray,
  ug = Object.prototype.hasOwnProperty,
  zd = { current: null },
  cg = { key: !0, ref: !0, __self: !0, __source: !0 };
function dg(e, t, r) {
  var n,
    o = {},
    a = null,
    i = null;
  if (t != null)
    for (n in (t.ref !== void 0 && (i = t.ref),
    t.key !== void 0 && (a = "" + t.key),
    t))
      ug.call(t, n) && !cg.hasOwnProperty(n) && (o[n] = t[n]);
  var s = arguments.length - 2;
  if (s === 1) o.children = r;
  else if (1 < s) {
    for (var l = Array(s), u = 0; u < s; u++) l[u] = arguments[u + 2];
    o.children = l;
  }
  if (e && e.defaultProps)
    for (n in ((s = e.defaultProps), s)) o[n] === void 0 && (o[n] = s[n]);
  return {
    $$typeof: Ni,
    type: e,
    key: a,
    ref: i,
    props: o,
    _owner: zd.current,
  };
}
function cx(e, t) {
  return {
    $$typeof: Ni,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Hd(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Ni;
}
function dx(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (r) {
      return t[r];
    })
  );
}
var Cf = /\/+/g;
function vu(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? dx("" + e.key)
    : t.toString(36);
}
function ms(e, t, r, n, o) {
  var a = typeof e;
  (a === "undefined" || a === "boolean") && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else
    switch (a) {
      case "string":
      case "number":
        i = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case Ni:
          case Zw:
            i = !0;
        }
    }
  if (i)
    return (
      (i = e),
      (o = o(i)),
      (e = n === "" ? "." + vu(i, 0) : n),
      Sf(o)
        ? ((r = ""),
          e != null && (r = e.replace(Cf, "$&/") + "/"),
          ms(o, t, r, "", function (u) {
            return u;
          }))
        : o != null &&
          (Hd(o) &&
            (o = cx(
              o,
              r +
                (!o.key || (i && i.key === o.key)
                  ? ""
                  : ("" + o.key).replace(Cf, "$&/") + "/") +
                e,
            )),
          t.push(o)),
      1
    );
  if (((i = 0), (n = n === "" ? "." : n + ":"), Sf(e)))
    for (var s = 0; s < e.length; s++) {
      a = e[s];
      var l = n + vu(a, s);
      i += ms(a, t, r, l, o);
    }
  else if (((l = ux(e)), typeof l == "function"))
    for (e = l.call(e), s = 0; !(a = e.next()).done;)
      ((a = a.value), (l = n + vu(a, s++)), (i += ms(a, t, r, l, o)));
  else if (a === "object")
    throw (
      (t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead.",
      )
    );
  return i;
}
function qi(e, t, r) {
  if (e == null) return e;
  var n = [],
    o = 0;
  return (
    ms(e, n, "", "", function (a) {
      return t.call(r, a, o++);
    }),
    n
  );
}
function px(e) {
  if (e._status === -1) {
    var t = e._result;
    ((t = t()),
      t.then(
        function (r) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = r));
        },
        function (r) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = r));
        },
      ),
      e._status === -1 && ((e._status = 0), (e._result = t)));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Bt = { current: null },
  gs = { transition: null },
  fx = {
    ReactCurrentDispatcher: Bt,
    ReactCurrentBatchConfig: gs,
    ReactCurrentOwner: zd,
  };
function pg() {
  throw Error("act(...) is not supported in production builds of React.");
}
Ce.Children = {
  map: qi,
  forEach: function (e, t, r) {
    qi(
      e,
      function () {
        t.apply(this, arguments);
      },
      r,
    );
  },
  count: function (e) {
    var t = 0;
    return (
      qi(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      qi(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Hd(e))
      throw Error(
        "React.Children.only expected to receive a single React element child.",
      );
    return e;
  },
};
Ce.Component = ha;
Ce.Fragment = ex;
Ce.Profiler = rx;
Ce.PureComponent = $d;
Ce.StrictMode = tx;
Ce.Suspense = ix;
Ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = fx;
Ce.act = pg;
Ce.cloneElement = function (e, t, r) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        ".",
    );
  var n = ig({}, e.props),
    o = e.key,
    a = e.ref,
    i = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((a = t.ref), (i = zd.current)),
      t.key !== void 0 && (o = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var s = e.type.defaultProps;
    for (l in t)
      ug.call(t, l) &&
        !cg.hasOwnProperty(l) &&
        (n[l] = t[l] === void 0 && s !== void 0 ? s[l] : t[l]);
  }
  var l = arguments.length - 2;
  if (l === 1) n.children = r;
  else if (1 < l) {
    s = Array(l);
    for (var u = 0; u < l; u++) s[u] = arguments[u + 2];
    n.children = s;
  }
  return { $$typeof: Ni, type: e.type, key: o, ref: a, props: n, _owner: i };
};
Ce.createContext = function (e) {
  return (
    (e = {
      $$typeof: ox,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: nx, _context: e }),
    (e.Consumer = e)
  );
};
Ce.createElement = dg;
Ce.createFactory = function (e) {
  var t = dg.bind(null, e);
  return ((t.type = e), t);
};
Ce.createRef = function () {
  return { current: null };
};
Ce.forwardRef = function (e) {
  return { $$typeof: ax, render: e };
};
Ce.isValidElement = Hd;
Ce.lazy = function (e) {
  return { $$typeof: lx, _payload: { _status: -1, _result: e }, _init: px };
};
Ce.memo = function (e, t) {
  return { $$typeof: sx, type: e, compare: t === void 0 ? null : t };
};
Ce.startTransition = function (e) {
  var t = gs.transition;
  gs.transition = {};
  try {
    e();
  } finally {
    gs.transition = t;
  }
};
Ce.unstable_act = pg;
Ce.useCallback = function (e, t) {
  return Bt.current.useCallback(e, t);
};
Ce.useContext = function (e) {
  return Bt.current.useContext(e);
};
Ce.useDebugValue = function () {};
Ce.useDeferredValue = function (e) {
  return Bt.current.useDeferredValue(e);
};
Ce.useEffect = function (e, t) {
  return Bt.current.useEffect(e, t);
};
Ce.useId = function () {
  return Bt.current.useId();
};
Ce.useImperativeHandle = function (e, t, r) {
  return Bt.current.useImperativeHandle(e, t, r);
};
Ce.useInsertionEffect = function (e, t) {
  return Bt.current.useInsertionEffect(e, t);
};
Ce.useLayoutEffect = function (e, t) {
  return Bt.current.useLayoutEffect(e, t);
};
Ce.useMemo = function (e, t) {
  return Bt.current.useMemo(e, t);
};
Ce.useReducer = function (e, t, r) {
  return Bt.current.useReducer(e, t, r);
};
Ce.useRef = function (e) {
  return Bt.current.useRef(e);
};
Ce.useState = function (e) {
  return Bt.current.useState(e);
};
Ce.useSyncExternalStore = function (e, t, r) {
  return Bt.current.useSyncExternalStore(e, t, r);
};
Ce.useTransition = function () {
  return Bt.current.useTransition();
};
Ce.version = "18.3.1";
og.exports = Ce;
var _ = og.exports;
const I = fa(_);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var hx = _,
  mx = Symbol.for("react.element"),
  gx = Symbol.for("react.fragment"),
  vx = Object.prototype.hasOwnProperty,
  yx = hx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  wx = { key: !0, ref: !0, __self: !0, __source: !0 };
function fg(e, t, r) {
  var n,
    o = {},
    a = null,
    i = null;
  (r !== void 0 && (a = "" + r),
    t.key !== void 0 && (a = "" + t.key),
    t.ref !== void 0 && (i = t.ref));
  for (n in t) vx.call(t, n) && !wx.hasOwnProperty(n) && (o[n] = t[n]);
  if (e && e.defaultProps)
    for (n in ((t = e.defaultProps), t)) o[n] === void 0 && (o[n] = t[n]);
  return {
    $$typeof: mx,
    type: e,
    key: a,
    ref: i,
    props: o,
    _owner: yx.current,
  };
}
Fl.Fragment = gx;
Fl.jsx = fg;
Fl.jsxs = fg;
ng.exports = Fl;
var h = ng.exports,
  hc = {},
  hg = { exports: {} },
  tr = {},
  mg = { exports: {} },
  gg = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(z, G) {
    var Z = z.length;
    z.push(G);
    e: for (; 0 < Z;) {
      var ne = (Z - 1) >>> 1,
        fe = z[ne];
      if (0 < o(fe, G)) ((z[ne] = G), (z[Z] = fe), (Z = ne));
      else break e;
    }
  }
  function r(z) {
    return z.length === 0 ? null : z[0];
  }
  function n(z) {
    if (z.length === 0) return null;
    var G = z[0],
      Z = z.pop();
    if (Z !== G) {
      z[0] = Z;
      e: for (var ne = 0, fe = z.length, ze = fe >>> 1; ne < ze;) {
        var pe = 2 * (ne + 1) - 1,
          ke = z[pe],
          ue = pe + 1,
          Ne = z[ue];
        if (0 > o(ke, Z))
          ue < fe && 0 > o(Ne, ke)
            ? ((z[ne] = Ne), (z[ue] = Z), (ne = ue))
            : ((z[ne] = ke), (z[pe] = Z), (ne = pe));
        else if (ue < fe && 0 > o(Ne, Z))
          ((z[ne] = Ne), (z[ue] = Z), (ne = ue));
        else break e;
      }
    }
    return G;
  }
  function o(z, G) {
    var Z = z.sortIndex - G.sortIndex;
    return Z !== 0 ? Z : z.id - G.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var a = performance;
    e.unstable_now = function () {
      return a.now();
    };
  } else {
    var i = Date,
      s = i.now();
    e.unstable_now = function () {
      return i.now() - s;
    };
  }
  var l = [],
    u = [],
    c = 1,
    d = null,
    m = 3,
    v = !1,
    S = !1,
    C = !1,
    k = typeof setTimeout == "function" ? setTimeout : null,
    g = typeof clearTimeout == "function" ? clearTimeout : null,
    y = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function w(z) {
    for (var G = r(u); G !== null;) {
      if (G.callback === null) n(u);
      else if (G.startTime <= z)
        (n(u), (G.sortIndex = G.expirationTime), t(l, G));
      else break;
      G = r(u);
    }
  }
  function T(z) {
    if (((C = !1), w(z), !S))
      if (r(l) !== null) ((S = !0), q(P));
      else {
        var G = r(u);
        G !== null && ie(T, G.startTime - z);
      }
  }
  function P(z, G) {
    ((S = !1), C && ((C = !1), g(A), (A = -1)), (v = !0));
    var Z = m;
    try {
      for (
        w(G), d = r(l);
        d !== null && (!(d.expirationTime > G) || (z && !K()));
      ) {
        var ne = d.callback;
        if (typeof ne == "function") {
          ((d.callback = null), (m = d.priorityLevel));
          var fe = ne(d.expirationTime <= G);
          ((G = e.unstable_now()),
            typeof fe == "function" ? (d.callback = fe) : d === r(l) && n(l),
            w(G));
        } else n(l);
        d = r(l);
      }
      if (d !== null) var ze = !0;
      else {
        var pe = r(u);
        (pe !== null && ie(T, pe.startTime - G), (ze = !1));
      }
      return ze;
    } finally {
      ((d = null), (m = Z), (v = !1));
    }
  }
  var R = !1,
    M = null,
    A = -1,
    V = 5,
    L = -1;
  function K() {
    return !(e.unstable_now() - L < V);
  }
  function $() {
    if (M !== null) {
      var z = e.unstable_now();
      L = z;
      var G = !0;
      try {
        G = M(!0, z);
      } finally {
        G ? ae() : ((R = !1), (M = null));
      }
    } else R = !1;
  }
  var ae;
  if (typeof y == "function")
    ae = function () {
      y($);
    };
  else if (typeof MessageChannel < "u") {
    var le = new MessageChannel(),
      U = le.port2;
    ((le.port1.onmessage = $),
      (ae = function () {
        U.postMessage(null);
      }));
  } else
    ae = function () {
      k($, 0);
    };
  function q(z) {
    ((M = z), R || ((R = !0), ae()));
  }
  function ie(z, G) {
    A = k(function () {
      z(e.unstable_now());
    }, G);
  }
  ((e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (z) {
      z.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      S || v || ((S = !0), q(P));
    }),
    (e.unstable_forceFrameRate = function (z) {
      0 > z || 125 < z
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
          )
        : (V = 0 < z ? Math.floor(1e3 / z) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return m;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return r(l);
    }),
    (e.unstable_next = function (z) {
      switch (m) {
        case 1:
        case 2:
        case 3:
          var G = 3;
          break;
        default:
          G = m;
      }
      var Z = m;
      m = G;
      try {
        return z();
      } finally {
        m = Z;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (z, G) {
      switch (z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          z = 3;
      }
      var Z = m;
      m = z;
      try {
        return G();
      } finally {
        m = Z;
      }
    }),
    (e.unstable_scheduleCallback = function (z, G, Z) {
      var ne = e.unstable_now();
      switch (
        (typeof Z == "object" && Z !== null
          ? ((Z = Z.delay), (Z = typeof Z == "number" && 0 < Z ? ne + Z : ne))
          : (Z = ne),
        z)
      ) {
        case 1:
          var fe = -1;
          break;
        case 2:
          fe = 250;
          break;
        case 5:
          fe = 1073741823;
          break;
        case 4:
          fe = 1e4;
          break;
        default:
          fe = 5e3;
      }
      return (
        (fe = Z + fe),
        (z = {
          id: c++,
          callback: G,
          priorityLevel: z,
          startTime: Z,
          expirationTime: fe,
          sortIndex: -1,
        }),
        Z > ne
          ? ((z.sortIndex = Z),
            t(u, z),
            r(l) === null &&
              z === r(u) &&
              (C ? (g(A), (A = -1)) : (C = !0), ie(T, Z - ne)))
          : ((z.sortIndex = fe), t(l, z), S || v || ((S = !0), q(P))),
        z
      );
    }),
    (e.unstable_shouldYield = K),
    (e.unstable_wrapCallback = function (z) {
      var G = m;
      return function () {
        var Z = m;
        m = G;
        try {
          return z.apply(this, arguments);
        } finally {
          m = Z;
        }
      };
    }));
})(gg);
mg.exports = gg;
var xx = mg.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Sx = _,
  Zt = xx;
function Y(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, r = 1;
    r < arguments.length;
    r++
  )
    t += "&args[]=" + encodeURIComponent(arguments[r]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var vg = new Set(),
  ii = {};
function ho(e, t) {
  (Go(e, t), Go(e + "Capture", t));
}
function Go(e, t) {
  for (ii[e] = t, e = 0; e < t.length; e++) vg.add(t[e]);
}
var tn = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  mc = Object.prototype.hasOwnProperty,
  Cx =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  kf = {},
  Ef = {};
function kx(e) {
  return mc.call(Ef, e)
    ? !0
    : mc.call(kf, e)
      ? !1
      : Cx.test(e)
        ? (Ef[e] = !0)
        : ((kf[e] = !0), !1);
}
function Ex(e, t, r, n) {
  if (r !== null && r.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return n
        ? !1
        : r !== null
          ? !r.acceptsBooleans
          : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function _x(e, t, r, n) {
  if (t === null || typeof t > "u" || Ex(e, t, r, n)) return !0;
  if (n) return !1;
  if (r !== null)
    switch (r.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function Ut(e, t, r, n, o, a, i) {
  ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = n),
    (this.attributeNamespace = o),
    (this.mustUseProperty = r),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = a),
    (this.removeEmptyString = i));
}
var kt = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    kt[e] = new Ut(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  kt[t] = new Ut(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  kt[e] = new Ut(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  kt[e] = new Ut(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    kt[e] = new Ut(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  kt[e] = new Ut(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  kt[e] = new Ut(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  kt[e] = new Ut(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  kt[e] = new Ut(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Wd = /[\-:]([a-z])/g;
function Vd(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Wd, Vd);
    kt[t] = new Ut(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Wd, Vd);
    kt[t] = new Ut(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Wd, Vd);
  kt[t] = new Ut(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  kt[e] = new Ut(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
kt.xlinkHref = new Ut(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1,
);
["src", "href", "action", "formAction"].forEach(function (e) {
  kt[e] = new Ut(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function qd(e, t, r, n) {
  var o = kt.hasOwnProperty(t) ? kt[t] : null;
  (o !== null
    ? o.type !== 0
    : n ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (_x(t, r, o, n) && (r = null),
    n || o === null
      ? kx(t) && (r === null ? e.removeAttribute(t) : e.setAttribute(t, "" + r))
      : o.mustUseProperty
        ? (e[o.propertyName] = r === null ? (o.type === 3 ? !1 : "") : r)
        : ((t = o.attributeName),
          (n = o.attributeNamespace),
          r === null
            ? e.removeAttribute(t)
            : ((o = o.type),
              (r = o === 3 || (o === 4 && r === !0) ? "" : "" + r),
              n ? e.setAttributeNS(n, t, r) : e.setAttribute(t, r))));
}
var ln = Sx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Qi = Symbol.for("react.element"),
  Do = Symbol.for("react.portal"),
  To = Symbol.for("react.fragment"),
  Qd = Symbol.for("react.strict_mode"),
  gc = Symbol.for("react.profiler"),
  yg = Symbol.for("react.provider"),
  wg = Symbol.for("react.context"),
  Kd = Symbol.for("react.forward_ref"),
  vc = Symbol.for("react.suspense"),
  yc = Symbol.for("react.suspense_list"),
  Gd = Symbol.for("react.memo"),
  fn = Symbol.for("react.lazy"),
  xg = Symbol.for("react.offscreen"),
  _f = Symbol.iterator;
function Ea(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (_f && e[_f]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Ze = Object.assign,
  yu;
function Ba(e) {
  if (yu === void 0)
    try {
      throw Error();
    } catch (r) {
      var t = r.stack.trim().match(/\n( *(at )?)/);
      yu = (t && t[1]) || "";
    }
  return (
    `
` +
    yu +
    e
  );
}
var wu = !1;
function xu(e, t) {
  if (!e || wu) return "";
  wu = !0;
  var r = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var n = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          n = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        n = u;
      }
      e();
    }
  } catch (u) {
    if (u && n && typeof u.stack == "string") {
      for (
        var o = u.stack.split(`
`),
          a = n.stack.split(`
`),
          i = o.length - 1,
          s = a.length - 1;
        1 <= i && 0 <= s && o[i] !== a[s];
      )
        s--;
      for (; 1 <= i && 0 <= s; i--, s--)
        if (o[i] !== a[s]) {
          if (i !== 1 || s !== 1)
            do
              if ((i--, s--, 0 > s || o[i] !== a[s])) {
                var l =
                  `
` + o[i].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    l.includes("<anonymous>") &&
                    (l = l.replace("<anonymous>", e.displayName)),
                  l
                );
              }
            while (1 <= i && 0 <= s);
          break;
        }
    }
  } finally {
    ((wu = !1), (Error.prepareStackTrace = r));
  }
  return (e = e ? e.displayName || e.name : "") ? Ba(e) : "";
}
function bx(e) {
  switch (e.tag) {
    case 5:
      return Ba(e.type);
    case 16:
      return Ba("Lazy");
    case 13:
      return Ba("Suspense");
    case 19:
      return Ba("SuspenseList");
    case 0:
    case 2:
    case 15:
      return ((e = xu(e.type, !1)), e);
    case 11:
      return ((e = xu(e.type.render, !1)), e);
    case 1:
      return ((e = xu(e.type, !0)), e);
    default:
      return "";
  }
}
function wc(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case To:
      return "Fragment";
    case Do:
      return "Portal";
    case gc:
      return "Profiler";
    case Qd:
      return "StrictMode";
    case vc:
      return "Suspense";
    case yc:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case wg:
        return (e.displayName || "Context") + ".Consumer";
      case yg:
        return (e._context.displayName || "Context") + ".Provider";
      case Kd:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Gd:
        return (
          (t = e.displayName || null),
          t !== null ? t : wc(e.type) || "Memo"
        );
      case fn:
        ((t = e._payload), (e = e._init));
        try {
          return wc(e(t));
        } catch {}
    }
  return null;
}
function Dx(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return wc(t);
    case 8:
      return t === Qd ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function Mn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Sg(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function Tx(e) {
  var t = Sg(e) ? "checked" : "value",
    r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    n = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof r < "u" &&
    typeof r.get == "function" &&
    typeof r.set == "function"
  ) {
    var o = r.get,
      a = r.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return o.call(this);
        },
        set: function (i) {
          ((n = "" + i), a.call(this, i));
        },
      }),
      Object.defineProperty(e, t, { enumerable: r.enumerable }),
      {
        getValue: function () {
          return n;
        },
        setValue: function (i) {
          n = "" + i;
        },
        stopTracking: function () {
          ((e._valueTracker = null), delete e[t]);
        },
      }
    );
  }
}
function Ki(e) {
  e._valueTracker || (e._valueTracker = Tx(e));
}
function Cg(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var r = t.getValue(),
    n = "";
  return (
    e && (n = Sg(e) ? (e.checked ? "true" : "false") : e.value),
    (e = n),
    e !== r ? (t.setValue(e), !0) : !1
  );
}
function Ws(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function xc(e, t) {
  var r = t.checked;
  return Ze({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: r ?? e._wrapperState.initialChecked,
  });
}
function bf(e, t) {
  var r = t.defaultValue == null ? "" : t.defaultValue,
    n = t.checked != null ? t.checked : t.defaultChecked;
  ((r = Mn(t.value != null ? t.value : r)),
    (e._wrapperState = {
      initialChecked: n,
      initialValue: r,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    }));
}
function kg(e, t) {
  ((t = t.checked), t != null && qd(e, "checked", t, !1));
}
function Sc(e, t) {
  kg(e, t);
  var r = Mn(t.value),
    n = t.type;
  if (r != null)
    n === "number"
      ? ((r === 0 && e.value === "") || e.value != r) && (e.value = "" + r)
      : e.value !== "" + r && (e.value = "" + r);
  else if (n === "submit" || n === "reset") {
    e.removeAttribute("value");
    return;
  }
  (t.hasOwnProperty("value")
    ? Cc(e, t.type, r)
    : t.hasOwnProperty("defaultValue") && Cc(e, t.type, Mn(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked));
}
function Df(e, t, r) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var n = t.type;
    if (!(
      (n !== "submit" && n !== "reset") ||
      (t.value !== void 0 && t.value !== null)
    ))
      return;
    ((t = "" + e._wrapperState.initialValue),
      r || t === e.value || (e.value = t),
      (e.defaultValue = t));
  }
  ((r = e.name),
    r !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    r !== "" && (e.name = r));
}
function Cc(e, t, r) {
  (t !== "number" || Ws(e.ownerDocument) !== e) &&
    (r == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + r && (e.defaultValue = "" + r));
}
var Ua = Array.isArray;
function $o(e, t, r, n) {
  if (((e = e.options), t)) {
    t = {};
    for (var o = 0; o < r.length; o++) t["$" + r[o]] = !0;
    for (r = 0; r < e.length; r++)
      ((o = t.hasOwnProperty("$" + e[r].value)),
        e[r].selected !== o && (e[r].selected = o),
        o && n && (e[r].defaultSelected = !0));
  } else {
    for (r = "" + Mn(r), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === r) {
        ((e[o].selected = !0), n && (e[o].defaultSelected = !0));
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function kc(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(Y(91));
  return Ze({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Tf(e, t) {
  var r = t.value;
  if (r == null) {
    if (((r = t.children), (t = t.defaultValue), r != null)) {
      if (t != null) throw Error(Y(92));
      if (Ua(r)) {
        if (1 < r.length) throw Error(Y(93));
        r = r[0];
      }
      t = r;
    }
    (t == null && (t = ""), (r = t));
  }
  e._wrapperState = { initialValue: Mn(r) };
}
function Eg(e, t) {
  var r = Mn(t.value),
    n = Mn(t.defaultValue);
  (r != null &&
    ((r = "" + r),
    r !== e.value && (e.value = r),
    t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)),
    n != null && (e.defaultValue = "" + n));
}
function Pf(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function _g(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Ec(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? _g(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : e;
}
var Gi,
  bg = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, r, n, o) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, r, n, o);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        Gi = Gi || document.createElement("div"),
          Gi.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Gi.firstChild;
        e.firstChild;
      )
        e.removeChild(e.firstChild);
      for (; t.firstChild;) e.appendChild(t.firstChild);
    }
  });
function si(e, t) {
  if (t) {
    var r = e.firstChild;
    if (r && r === e.lastChild && r.nodeType === 3) {
      r.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Wa = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Px = ["Webkit", "ms", "Moz", "O"];
Object.keys(Wa).forEach(function (e) {
  Px.forEach(function (t) {
    ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Wa[t] = Wa[e]));
  });
});
function Dg(e, t, r) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : r || typeof t != "number" || t === 0 || (Wa.hasOwnProperty(e) && Wa[e])
      ? ("" + t).trim()
      : t + "px";
}
function Tg(e, t) {
  e = e.style;
  for (var r in t)
    if (t.hasOwnProperty(r)) {
      var n = r.indexOf("--") === 0,
        o = Dg(r, t[r], n);
      (r === "float" && (r = "cssFloat"), n ? e.setProperty(r, o) : (e[r] = o));
    }
}
var Rx = Ze(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
);
function _c(e, t) {
  if (t) {
    if (Rx[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(Y(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(Y(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(Y(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(Y(62));
  }
}
function bc(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Dc = null;
function Xd(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var Tc = null,
  Yo = null,
  zo = null;
function Rf(e) {
  if ((e = ji(e))) {
    if (typeof Tc != "function") throw Error(Y(280));
    var t = e.stateNode;
    t && ((t = zl(t)), Tc(e.stateNode, e.type, t));
  }
}
function Pg(e) {
  Yo ? (zo ? zo.push(e) : (zo = [e])) : (Yo = e);
}
function Rg() {
  if (Yo) {
    var e = Yo,
      t = zo;
    if (((zo = Yo = null), Rf(e), t)) for (e = 0; e < t.length; e++) Rf(t[e]);
  }
}
function Og(e, t) {
  return e(t);
}
function Ng() {}
var Su = !1;
function Mg(e, t, r) {
  if (Su) return e(t, r);
  Su = !0;
  try {
    return Og(e, t, r);
  } finally {
    ((Su = !1), (Yo !== null || zo !== null) && (Ng(), Rg()));
  }
}
function li(e, t) {
  var r = e.stateNode;
  if (r === null) return null;
  var n = zl(r);
  if (n === null) return null;
  r = n[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      ((n = !n.disabled) ||
        ((e = e.type),
        (n = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !n));
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (r && typeof r != "function") throw Error(Y(231, t, typeof r));
  return r;
}
var Pc = !1;
if (tn)
  try {
    var _a = {};
    (Object.defineProperty(_a, "passive", {
      get: function () {
        Pc = !0;
      },
    }),
      window.addEventListener("test", _a, _a),
      window.removeEventListener("test", _a, _a));
  } catch {
    Pc = !1;
  }
function Ox(e, t, r, n, o, a, i, s, l) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(r, u);
  } catch (c) {
    this.onError(c);
  }
}
var Va = !1,
  Vs = null,
  qs = !1,
  Rc = null,
  Nx = {
    onError: function (e) {
      ((Va = !0), (Vs = e));
    },
  };
function Mx(e, t, r, n, o, a, i, s, l) {
  ((Va = !1), (Vs = null), Ox.apply(Nx, arguments));
}
function Ix(e, t, r, n, o, a, i, s, l) {
  if ((Mx.apply(this, arguments), Va)) {
    if (Va) {
      var u = Vs;
      ((Va = !1), (Vs = null));
    } else throw Error(Y(198));
    qs || ((qs = !0), (Rc = u));
  }
}
function mo(e) {
  var t = e,
    r = e;
  if (e.alternate) for (; t.return;) t = t.return;
  else {
    e = t;
    do ((t = e), t.flags & 4098 && (r = t.return), (e = t.return));
    while (e);
  }
  return t.tag === 3 ? r : null;
}
function Ig(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function Of(e) {
  if (mo(e) !== e) throw Error(Y(188));
}
function jx(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = mo(e)), t === null)) throw Error(Y(188));
    return t !== e ? null : e;
  }
  for (var r = e, n = t; ;) {
    var o = r.return;
    if (o === null) break;
    var a = o.alternate;
    if (a === null) {
      if (((n = o.return), n !== null)) {
        r = n;
        continue;
      }
      break;
    }
    if (o.child === a.child) {
      for (a = o.child; a;) {
        if (a === r) return (Of(o), e);
        if (a === n) return (Of(o), t);
        a = a.sibling;
      }
      throw Error(Y(188));
    }
    if (r.return !== n.return) ((r = o), (n = a));
    else {
      for (var i = !1, s = o.child; s;) {
        if (s === r) {
          ((i = !0), (r = o), (n = a));
          break;
        }
        if (s === n) {
          ((i = !0), (n = o), (r = a));
          break;
        }
        s = s.sibling;
      }
      if (!i) {
        for (s = a.child; s;) {
          if (s === r) {
            ((i = !0), (r = a), (n = o));
            break;
          }
          if (s === n) {
            ((i = !0), (n = a), (r = o));
            break;
          }
          s = s.sibling;
        }
        if (!i) throw Error(Y(189));
      }
    }
    if (r.alternate !== n) throw Error(Y(190));
  }
  if (r.tag !== 3) throw Error(Y(188));
  return r.stateNode.current === r ? e : t;
}
function jg(e) {
  return ((e = jx(e)), e !== null ? Lg(e) : null);
}
function Lg(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null;) {
    var t = Lg(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Ag = Zt.unstable_scheduleCallback,
  Nf = Zt.unstable_cancelCallback,
  Lx = Zt.unstable_shouldYield,
  Ax = Zt.unstable_requestPaint,
  at = Zt.unstable_now,
  Fx = Zt.unstable_getCurrentPriorityLevel,
  Jd = Zt.unstable_ImmediatePriority,
  Fg = Zt.unstable_UserBlockingPriority,
  Qs = Zt.unstable_NormalPriority,
  Bx = Zt.unstable_LowPriority,
  Bg = Zt.unstable_IdlePriority,
  Bl = null,
  Fr = null;
function Ux(e) {
  if (Fr && typeof Fr.onCommitFiberRoot == "function")
    try {
      Fr.onCommitFiberRoot(Bl, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var kr = Math.clz32 ? Math.clz32 : zx,
  $x = Math.log,
  Yx = Math.LN2;
function zx(e) {
  return ((e >>>= 0), e === 0 ? 32 : (31 - (($x(e) / Yx) | 0)) | 0);
}
var Xi = 64,
  Ji = 4194304;
function $a(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Ks(e, t) {
  var r = e.pendingLanes;
  if (r === 0) return 0;
  var n = 0,
    o = e.suspendedLanes,
    a = e.pingedLanes,
    i = r & 268435455;
  if (i !== 0) {
    var s = i & ~o;
    s !== 0 ? (n = $a(s)) : ((a &= i), a !== 0 && (n = $a(a)));
  } else ((i = r & ~o), i !== 0 ? (n = $a(i)) : a !== 0 && (n = $a(a)));
  if (n === 0) return 0;
  if (
    t !== 0 &&
    t !== n &&
    !(t & o) &&
    ((o = n & -n), (a = t & -t), o >= a || (o === 16 && (a & 4194240) !== 0))
  )
    return t;
  if ((n & 4 && (n |= r & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= n; 0 < t;)
      ((r = 31 - kr(t)), (o = 1 << r), (n |= e[r]), (t &= ~o));
  return n;
}
function Hx(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Wx(e, t) {
  for (
    var r = e.suspendedLanes,
      n = e.pingedLanes,
      o = e.expirationTimes,
      a = e.pendingLanes;
    0 < a;
  ) {
    var i = 31 - kr(a),
      s = 1 << i,
      l = o[i];
    (l === -1
      ? (!(s & r) || s & n) && (o[i] = Hx(s, t))
      : l <= t && (e.expiredLanes |= s),
      (a &= ~s));
  }
}
function Oc(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function Ug() {
  var e = Xi;
  return ((Xi <<= 1), !(Xi & 4194240) && (Xi = 64), e);
}
function Cu(e) {
  for (var t = [], r = 0; 31 > r; r++) t.push(e);
  return t;
}
function Mi(e, t, r) {
  ((e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - kr(t)),
    (e[t] = r));
}
function Vx(e, t) {
  var r = e.pendingLanes & ~t;
  ((e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements));
  var n = e.eventTimes;
  for (e = e.expirationTimes; 0 < r;) {
    var o = 31 - kr(r),
      a = 1 << o;
    ((t[o] = 0), (n[o] = -1), (e[o] = -1), (r &= ~a));
  }
}
function Zd(e, t) {
  var r = (e.entangledLanes |= t);
  for (e = e.entanglements; r;) {
    var n = 31 - kr(r),
      o = 1 << n;
    ((o & t) | (e[n] & t) && (e[n] |= t), (r &= ~o));
  }
}
var Le = 0;
function $g(e) {
  return (
    (e &= -e),
    1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
  );
}
var Yg,
  ep,
  zg,
  Hg,
  Wg,
  Nc = !1,
  Zi = [],
  kn = null,
  En = null,
  _n = null,
  ui = new Map(),
  ci = new Map(),
  gn = [],
  qx =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " ",
    );
function Mf(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      kn = null;
      break;
    case "dragenter":
    case "dragleave":
      En = null;
      break;
    case "mouseover":
    case "mouseout":
      _n = null;
      break;
    case "pointerover":
    case "pointerout":
      ui.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      ci.delete(t.pointerId);
  }
}
function ba(e, t, r, n, o, a) {
  return e === null || e.nativeEvent !== a
    ? ((e = {
        blockedOn: t,
        domEventName: r,
        eventSystemFlags: n,
        nativeEvent: a,
        targetContainers: [o],
      }),
      t !== null && ((t = ji(t)), t !== null && ep(t)),
      e)
    : ((e.eventSystemFlags |= n),
      (t = e.targetContainers),
      o !== null && t.indexOf(o) === -1 && t.push(o),
      e);
}
function Qx(e, t, r, n, o) {
  switch (t) {
    case "focusin":
      return ((kn = ba(kn, e, t, r, n, o)), !0);
    case "dragenter":
      return ((En = ba(En, e, t, r, n, o)), !0);
    case "mouseover":
      return ((_n = ba(_n, e, t, r, n, o)), !0);
    case "pointerover":
      var a = o.pointerId;
      return (ui.set(a, ba(ui.get(a) || null, e, t, r, n, o)), !0);
    case "gotpointercapture":
      return (
        (a = o.pointerId),
        ci.set(a, ba(ci.get(a) || null, e, t, r, n, o)),
        !0
      );
  }
  return !1;
}
function Vg(e) {
  var t = Wn(e.target);
  if (t !== null) {
    var r = mo(t);
    if (r !== null) {
      if (((t = r.tag), t === 13)) {
        if (((t = Ig(r)), t !== null)) {
          ((e.blockedOn = t),
            Wg(e.priority, function () {
              zg(r);
            }));
          return;
        }
      } else if (t === 3 && r.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function vs(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length;) {
    var r = Mc(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (r === null) {
      r = e.nativeEvent;
      var n = new r.constructor(r.type, r);
      ((Dc = n), r.target.dispatchEvent(n), (Dc = null));
    } else return ((t = ji(r)), t !== null && ep(t), (e.blockedOn = r), !1);
    t.shift();
  }
  return !0;
}
function If(e, t, r) {
  vs(e) && r.delete(t);
}
function Kx() {
  ((Nc = !1),
    kn !== null && vs(kn) && (kn = null),
    En !== null && vs(En) && (En = null),
    _n !== null && vs(_n) && (_n = null),
    ui.forEach(If),
    ci.forEach(If));
}
function Da(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Nc ||
      ((Nc = !0),
      Zt.unstable_scheduleCallback(Zt.unstable_NormalPriority, Kx)));
}
function di(e) {
  function t(o) {
    return Da(o, e);
  }
  if (0 < Zi.length) {
    Da(Zi[0], e);
    for (var r = 1; r < Zi.length; r++) {
      var n = Zi[r];
      n.blockedOn === e && (n.blockedOn = null);
    }
  }
  for (
    kn !== null && Da(kn, e),
      En !== null && Da(En, e),
      _n !== null && Da(_n, e),
      ui.forEach(t),
      ci.forEach(t),
      r = 0;
    r < gn.length;
    r++
  )
    ((n = gn[r]), n.blockedOn === e && (n.blockedOn = null));
  for (; 0 < gn.length && ((r = gn[0]), r.blockedOn === null);)
    (Vg(r), r.blockedOn === null && gn.shift());
}
var Ho = ln.ReactCurrentBatchConfig,
  Gs = !0;
function Gx(e, t, r, n) {
  var o = Le,
    a = Ho.transition;
  Ho.transition = null;
  try {
    ((Le = 1), tp(e, t, r, n));
  } finally {
    ((Le = o), (Ho.transition = a));
  }
}
function Xx(e, t, r, n) {
  var o = Le,
    a = Ho.transition;
  Ho.transition = null;
  try {
    ((Le = 4), tp(e, t, r, n));
  } finally {
    ((Le = o), (Ho.transition = a));
  }
}
function tp(e, t, r, n) {
  if (Gs) {
    var o = Mc(e, t, r, n);
    if (o === null) (Nu(e, t, n, Xs, r), Mf(e, n));
    else if (Qx(o, e, t, r, n)) n.stopPropagation();
    else if ((Mf(e, n), t & 4 && -1 < qx.indexOf(e))) {
      for (; o !== null;) {
        var a = ji(o);
        if (
          (a !== null && Yg(a),
          (a = Mc(e, t, r, n)),
          a === null && Nu(e, t, n, Xs, r),
          a === o)
        )
          break;
        o = a;
      }
      o !== null && n.stopPropagation();
    } else Nu(e, t, n, null, r);
  }
}
var Xs = null;
function Mc(e, t, r, n) {
  if (((Xs = null), (e = Xd(n)), (e = Wn(e)), e !== null))
    if (((t = mo(e)), t === null)) e = null;
    else if (((r = t.tag), r === 13)) {
      if (((e = Ig(t)), e !== null)) return e;
      e = null;
    } else if (r === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return ((Xs = e), null);
}
function qg(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Fx()) {
        case Jd:
          return 1;
        case Fg:
          return 4;
        case Qs:
        case Bx:
          return 16;
        case Bg:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var yn = null,
  rp = null,
  ys = null;
function Qg() {
  if (ys) return ys;
  var e,
    t = rp,
    r = t.length,
    n,
    o = "value" in yn ? yn.value : yn.textContent,
    a = o.length;
  for (e = 0; e < r && t[e] === o[e]; e++);
  var i = r - e;
  for (n = 1; n <= i && t[r - n] === o[a - n]; n++);
  return (ys = o.slice(e, 1 < n ? 1 - n : void 0));
}
function ws(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function es() {
  return !0;
}
function jf() {
  return !1;
}
function rr(e) {
  function t(r, n, o, a, i) {
    ((this._reactName = r),
      (this._targetInst = o),
      (this.type = n),
      (this.nativeEvent = a),
      (this.target = i),
      (this.currentTarget = null));
    for (var s in e)
      e.hasOwnProperty(s) && ((r = e[s]), (this[s] = r ? r(a) : a[s]));
    return (
      (this.isDefaultPrevented = (
        a.defaultPrevented != null ? a.defaultPrevented : a.returnValue === !1
      )
        ? es
        : jf),
      (this.isPropagationStopped = jf),
      this
    );
  }
  return (
    Ze(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var r = this.nativeEvent;
        r &&
          (r.preventDefault
            ? r.preventDefault()
            : typeof r.returnValue != "unknown" && (r.returnValue = !1),
          (this.isDefaultPrevented = es));
      },
      stopPropagation: function () {
        var r = this.nativeEvent;
        r &&
          (r.stopPropagation
            ? r.stopPropagation()
            : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0),
          (this.isPropagationStopped = es));
      },
      persist: function () {},
      isPersistent: es,
    }),
    t
  );
}
var ma = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  np = rr(ma),
  Ii = Ze({}, ma, { view: 0, detail: 0 }),
  Jx = rr(Ii),
  ku,
  Eu,
  Ta,
  Ul = Ze({}, Ii, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: op,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== Ta &&
            (Ta && e.type === "mousemove"
              ? ((ku = e.screenX - Ta.screenX), (Eu = e.screenY - Ta.screenY))
              : (Eu = ku = 0),
            (Ta = e)),
          ku);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Eu;
    },
  }),
  Lf = rr(Ul),
  Zx = Ze({}, Ul, { dataTransfer: 0 }),
  e1 = rr(Zx),
  t1 = Ze({}, Ii, { relatedTarget: 0 }),
  _u = rr(t1),
  r1 = Ze({}, ma, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  n1 = rr(r1),
  o1 = Ze({}, ma, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  a1 = rr(o1),
  i1 = Ze({}, ma, { data: 0 }),
  Af = rr(i1),
  s1 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  l1 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  u1 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function c1(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = u1[e]) ? !!t[e] : !1;
}
function op() {
  return c1;
}
var d1 = Ze({}, Ii, {
    key: function (e) {
      if (e.key) {
        var t = s1[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = ws(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
          ? l1[e.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: op,
    charCode: function (e) {
      return e.type === "keypress" ? ws(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? ws(e)
        : e.type === "keydown" || e.type === "keyup"
          ? e.keyCode
          : 0;
    },
  }),
  p1 = rr(d1),
  f1 = Ze({}, Ul, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Ff = rr(f1),
  h1 = Ze({}, Ii, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: op,
  }),
  m1 = rr(h1),
  g1 = Ze({}, ma, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  v1 = rr(g1),
  y1 = Ze({}, Ul, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
          ? -e.wheelDeltaY
          : "wheelDelta" in e
            ? -e.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  w1 = rr(y1),
  x1 = [9, 13, 27, 32],
  ap = tn && "CompositionEvent" in window,
  qa = null;
tn && "documentMode" in document && (qa = document.documentMode);
var S1 = tn && "TextEvent" in window && !qa,
  Kg = tn && (!ap || (qa && 8 < qa && 11 >= qa)),
  Bf = " ",
  Uf = !1;
function Gg(e, t) {
  switch (e) {
    case "keyup":
      return x1.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Xg(e) {
  return ((e = e.detail), typeof e == "object" && "data" in e ? e.data : null);
}
var Po = !1;
function C1(e, t) {
  switch (e) {
    case "compositionend":
      return Xg(t);
    case "keypress":
      return t.which !== 32 ? null : ((Uf = !0), Bf);
    case "textInput":
      return ((e = t.data), e === Bf && Uf ? null : e);
    default:
      return null;
  }
}
function k1(e, t) {
  if (Po)
    return e === "compositionend" || (!ap && Gg(e, t))
      ? ((e = Qg()), (ys = rp = yn = null), (Po = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Kg && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var E1 = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function $f(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!E1[e.type] : t === "textarea";
}
function Jg(e, t, r, n) {
  (Pg(n),
    (t = Js(t, "onChange")),
    0 < t.length &&
      ((r = new np("onChange", "change", null, r, n)),
      e.push({ event: r, listeners: t })));
}
var Qa = null,
  pi = null;
function _1(e) {
  uv(e, 0);
}
function $l(e) {
  var t = No(e);
  if (Cg(t)) return e;
}
function b1(e, t) {
  if (e === "change") return t;
}
var Zg = !1;
if (tn) {
  var bu;
  if (tn) {
    var Du = "oninput" in document;
    if (!Du) {
      var Yf = document.createElement("div");
      (Yf.setAttribute("oninput", "return;"),
        (Du = typeof Yf.oninput == "function"));
    }
    bu = Du;
  } else bu = !1;
  Zg = bu && (!document.documentMode || 9 < document.documentMode);
}
function zf() {
  Qa && (Qa.detachEvent("onpropertychange", ev), (pi = Qa = null));
}
function ev(e) {
  if (e.propertyName === "value" && $l(pi)) {
    var t = [];
    (Jg(t, pi, e, Xd(e)), Mg(_1, t));
  }
}
function D1(e, t, r) {
  e === "focusin"
    ? (zf(), (Qa = t), (pi = r), Qa.attachEvent("onpropertychange", ev))
    : e === "focusout" && zf();
}
function T1(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return $l(pi);
}
function P1(e, t) {
  if (e === "click") return $l(t);
}
function R1(e, t) {
  if (e === "input" || e === "change") return $l(t);
}
function O1(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var br = typeof Object.is == "function" ? Object.is : O1;
function fi(e, t) {
  if (br(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var r = Object.keys(e),
    n = Object.keys(t);
  if (r.length !== n.length) return !1;
  for (n = 0; n < r.length; n++) {
    var o = r[n];
    if (!mc.call(t, o) || !br(e[o], t[o])) return !1;
  }
  return !0;
}
function Hf(e) {
  for (; e && e.firstChild;) e = e.firstChild;
  return e;
}
function Wf(e, t) {
  var r = Hf(e);
  e = 0;
  for (var n; r;) {
    if (r.nodeType === 3) {
      if (((n = e + r.textContent.length), e <= t && n >= t))
        return { node: r, offset: t - e };
      e = n;
    }
    e: {
      for (; r;) {
        if (r.nextSibling) {
          r = r.nextSibling;
          break e;
        }
        r = r.parentNode;
      }
      r = void 0;
    }
    r = Hf(r);
  }
}
function tv(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
        ? !1
        : t && t.nodeType === 3
          ? tv(e, t.parentNode)
          : "contains" in e
            ? e.contains(t)
            : e.compareDocumentPosition
              ? !!(e.compareDocumentPosition(t) & 16)
              : !1
    : !1;
}
function rv() {
  for (var e = window, t = Ws(); t instanceof e.HTMLIFrameElement;) {
    try {
      var r = typeof t.contentWindow.location.href == "string";
    } catch {
      r = !1;
    }
    if (r) e = t.contentWindow;
    else break;
    t = Ws(e.document);
  }
  return t;
}
function ip(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function N1(e) {
  var t = rv(),
    r = e.focusedElem,
    n = e.selectionRange;
  if (
    t !== r &&
    r &&
    r.ownerDocument &&
    tv(r.ownerDocument.documentElement, r)
  ) {
    if (n !== null && ip(r)) {
      if (
        ((t = n.start),
        (e = n.end),
        e === void 0 && (e = t),
        "selectionStart" in r)
      )
        ((r.selectionStart = t),
          (r.selectionEnd = Math.min(e, r.value.length)));
      else if (
        ((e = ((t = r.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var o = r.textContent.length,
          a = Math.min(n.start, o);
        ((n = n.end === void 0 ? a : Math.min(n.end, o)),
          !e.extend && a > n && ((o = n), (n = a), (a = o)),
          (o = Wf(r, a)));
        var i = Wf(r, n);
        o &&
          i &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== o.node ||
            e.anchorOffset !== o.offset ||
            e.focusNode !== i.node ||
            e.focusOffset !== i.offset) &&
          ((t = t.createRange()),
          t.setStart(o.node, o.offset),
          e.removeAllRanges(),
          a > n
            ? (e.addRange(t), e.extend(i.node, i.offset))
            : (t.setEnd(i.node, i.offset), e.addRange(t)));
      }
    }
    for (t = [], e = r; (e = e.parentNode);)
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof r.focus == "function" && r.focus(), r = 0; r < t.length; r++)
      ((e = t[r]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top));
  }
}
var M1 = tn && "documentMode" in document && 11 >= document.documentMode,
  Ro = null,
  Ic = null,
  Ka = null,
  jc = !1;
function Vf(e, t, r) {
  var n = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
  jc ||
    Ro == null ||
    Ro !== Ws(n) ||
    ((n = Ro),
    "selectionStart" in n && ip(n)
      ? (n = { start: n.selectionStart, end: n.selectionEnd })
      : ((n = (
          (n.ownerDocument && n.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (n = {
          anchorNode: n.anchorNode,
          anchorOffset: n.anchorOffset,
          focusNode: n.focusNode,
          focusOffset: n.focusOffset,
        })),
    (Ka && fi(Ka, n)) ||
      ((Ka = n),
      (n = Js(Ic, "onSelect")),
      0 < n.length &&
        ((t = new np("onSelect", "select", null, t, r)),
        e.push({ event: t, listeners: n }),
        (t.target = Ro))));
}
function ts(e, t) {
  var r = {};
  return (
    (r[e.toLowerCase()] = t.toLowerCase()),
    (r["Webkit" + e] = "webkit" + t),
    (r["Moz" + e] = "moz" + t),
    r
  );
}
var Oo = {
    animationend: ts("Animation", "AnimationEnd"),
    animationiteration: ts("Animation", "AnimationIteration"),
    animationstart: ts("Animation", "AnimationStart"),
    transitionend: ts("Transition", "TransitionEnd"),
  },
  Tu = {},
  nv = {};
tn &&
  ((nv = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Oo.animationend.animation,
    delete Oo.animationiteration.animation,
    delete Oo.animationstart.animation),
  "TransitionEvent" in window || delete Oo.transitionend.transition);
function Yl(e) {
  if (Tu[e]) return Tu[e];
  if (!Oo[e]) return e;
  var t = Oo[e],
    r;
  for (r in t) if (t.hasOwnProperty(r) && r in nv) return (Tu[e] = t[r]);
  return e;
}
var ov = Yl("animationend"),
  av = Yl("animationiteration"),
  iv = Yl("animationstart"),
  sv = Yl("transitionend"),
  lv = new Map(),
  qf =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
function Ln(e, t) {
  (lv.set(e, t), ho(t, [e]));
}
for (var Pu = 0; Pu < qf.length; Pu++) {
  var Ru = qf[Pu],
    I1 = Ru.toLowerCase(),
    j1 = Ru[0].toUpperCase() + Ru.slice(1);
  Ln(I1, "on" + j1);
}
Ln(ov, "onAnimationEnd");
Ln(av, "onAnimationIteration");
Ln(iv, "onAnimationStart");
Ln("dblclick", "onDoubleClick");
Ln("focusin", "onFocus");
Ln("focusout", "onBlur");
Ln(sv, "onTransitionEnd");
Go("onMouseEnter", ["mouseout", "mouseover"]);
Go("onMouseLeave", ["mouseout", "mouseover"]);
Go("onPointerEnter", ["pointerout", "pointerover"]);
Go("onPointerLeave", ["pointerout", "pointerover"]);
ho(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
ho(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
ho("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
ho(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
ho(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
ho(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var Ya =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  L1 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ya));
function Qf(e, t, r) {
  var n = e.type || "unknown-event";
  ((e.currentTarget = r), Ix(n, t, void 0, e), (e.currentTarget = null));
}
function uv(e, t) {
  t = (t & 4) !== 0;
  for (var r = 0; r < e.length; r++) {
    var n = e[r],
      o = n.event;
    n = n.listeners;
    e: {
      var a = void 0;
      if (t)
        for (var i = n.length - 1; 0 <= i; i--) {
          var s = n[i],
            l = s.instance,
            u = s.currentTarget;
          if (((s = s.listener), l !== a && o.isPropagationStopped())) break e;
          (Qf(o, s, u), (a = l));
        }
      else
        for (i = 0; i < n.length; i++) {
          if (
            ((s = n[i]),
            (l = s.instance),
            (u = s.currentTarget),
            (s = s.listener),
            l !== a && o.isPropagationStopped())
          )
            break e;
          (Qf(o, s, u), (a = l));
        }
    }
  }
  if (qs) throw ((e = Rc), (qs = !1), (Rc = null), e);
}
function He(e, t) {
  var r = t[Uc];
  r === void 0 && (r = t[Uc] = new Set());
  var n = e + "__bubble";
  r.has(n) || (cv(t, e, 2, !1), r.add(n));
}
function Ou(e, t, r) {
  var n = 0;
  (t && (n |= 4), cv(r, e, n, t));
}
var rs = "_reactListening" + Math.random().toString(36).slice(2);
function hi(e) {
  if (!e[rs]) {
    ((e[rs] = !0),
      vg.forEach(function (r) {
        r !== "selectionchange" && (L1.has(r) || Ou(r, !1, e), Ou(r, !0, e));
      }));
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[rs] || ((t[rs] = !0), Ou("selectionchange", !1, t));
  }
}
function cv(e, t, r, n) {
  switch (qg(t)) {
    case 1:
      var o = Gx;
      break;
    case 4:
      o = Xx;
      break;
    default:
      o = tp;
  }
  ((r = o.bind(null, t, r, e)),
    (o = void 0),
    !Pc ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (o = !0),
    n
      ? o !== void 0
        ? e.addEventListener(t, r, { capture: !0, passive: o })
        : e.addEventListener(t, r, !0)
      : o !== void 0
        ? e.addEventListener(t, r, { passive: o })
        : e.addEventListener(t, r, !1));
}
function Nu(e, t, r, n, o) {
  var a = n;
  if (!(t & 1) && !(t & 2) && n !== null)
    e: for (;;) {
      if (n === null) return;
      var i = n.tag;
      if (i === 3 || i === 4) {
        var s = n.stateNode.containerInfo;
        if (s === o || (s.nodeType === 8 && s.parentNode === o)) break;
        if (i === 4)
          for (i = n.return; i !== null;) {
            var l = i.tag;
            if (
              (l === 3 || l === 4) &&
              ((l = i.stateNode.containerInfo),
              l === o || (l.nodeType === 8 && l.parentNode === o))
            )
              return;
            i = i.return;
          }
        for (; s !== null;) {
          if (((i = Wn(s)), i === null)) return;
          if (((l = i.tag), l === 5 || l === 6)) {
            n = a = i;
            continue e;
          }
          s = s.parentNode;
        }
      }
      n = n.return;
    }
  Mg(function () {
    var u = a,
      c = Xd(r),
      d = [];
    e: {
      var m = lv.get(e);
      if (m !== void 0) {
        var v = np,
          S = e;
        switch (e) {
          case "keypress":
            if (ws(r) === 0) break e;
          case "keydown":
          case "keyup":
            v = p1;
            break;
          case "focusin":
            ((S = "focus"), (v = _u));
            break;
          case "focusout":
            ((S = "blur"), (v = _u));
            break;
          case "beforeblur":
          case "afterblur":
            v = _u;
            break;
          case "click":
            if (r.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = Lf;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = e1;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = m1;
            break;
          case ov:
          case av:
          case iv:
            v = n1;
            break;
          case sv:
            v = v1;
            break;
          case "scroll":
            v = Jx;
            break;
          case "wheel":
            v = w1;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = a1;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = Ff;
        }
        var C = (t & 4) !== 0,
          k = !C && e === "scroll",
          g = C ? (m !== null ? m + "Capture" : null) : m;
        C = [];
        for (var y = u, w; y !== null;) {
          w = y;
          var T = w.stateNode;
          if (
            (w.tag === 5 &&
              T !== null &&
              ((w = T),
              g !== null && ((T = li(y, g)), T != null && C.push(mi(y, T, w)))),
            k)
          )
            break;
          y = y.return;
        }
        0 < C.length &&
          ((m = new v(m, S, null, r, c)), d.push({ event: m, listeners: C }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((m = e === "mouseover" || e === "pointerover"),
          (v = e === "mouseout" || e === "pointerout"),
          m &&
            r !== Dc &&
            (S = r.relatedTarget || r.fromElement) &&
            (Wn(S) || S[rn]))
        )
          break e;
        if (
          (v || m) &&
          ((m =
            c.window === c
              ? c
              : (m = c.ownerDocument)
                ? m.defaultView || m.parentWindow
                : window),
          v
            ? ((S = r.relatedTarget || r.toElement),
              (v = u),
              (S = S ? Wn(S) : null),
              S !== null &&
                ((k = mo(S)), S !== k || (S.tag !== 5 && S.tag !== 6)) &&
                (S = null))
            : ((v = null), (S = u)),
          v !== S)
        ) {
          if (
            ((C = Lf),
            (T = "onMouseLeave"),
            (g = "onMouseEnter"),
            (y = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((C = Ff),
              (T = "onPointerLeave"),
              (g = "onPointerEnter"),
              (y = "pointer")),
            (k = v == null ? m : No(v)),
            (w = S == null ? m : No(S)),
            (m = new C(T, y + "leave", v, r, c)),
            (m.target = k),
            (m.relatedTarget = w),
            (T = null),
            Wn(c) === u &&
              ((C = new C(g, y + "enter", S, r, c)),
              (C.target = w),
              (C.relatedTarget = k),
              (T = C)),
            (k = T),
            v && S)
          )
            t: {
              for (C = v, g = S, y = 0, w = C; w; w = So(w)) y++;
              for (w = 0, T = g; T; T = So(T)) w++;
              for (; 0 < y - w;) ((C = So(C)), y--);
              for (; 0 < w - y;) ((g = So(g)), w--);
              for (; y--;) {
                if (C === g || (g !== null && C === g.alternate)) break t;
                ((C = So(C)), (g = So(g)));
              }
              C = null;
            }
          else C = null;
          (v !== null && Kf(d, m, v, C, !1),
            S !== null && k !== null && Kf(d, k, S, C, !0));
        }
      }
      e: {
        if (
          ((m = u ? No(u) : window),
          (v = m.nodeName && m.nodeName.toLowerCase()),
          v === "select" || (v === "input" && m.type === "file"))
        )
          var P = b1;
        else if ($f(m))
          if (Zg) P = R1;
          else {
            P = T1;
            var R = D1;
          }
        else
          (v = m.nodeName) &&
            v.toLowerCase() === "input" &&
            (m.type === "checkbox" || m.type === "radio") &&
            (P = P1);
        if (P && (P = P(e, u))) {
          Jg(d, P, r, c);
          break e;
        }
        (R && R(e, m, u),
          e === "focusout" &&
            (R = m._wrapperState) &&
            R.controlled &&
            m.type === "number" &&
            Cc(m, "number", m.value));
      }
      switch (((R = u ? No(u) : window), e)) {
        case "focusin":
          ($f(R) || R.contentEditable === "true") &&
            ((Ro = R), (Ic = u), (Ka = null));
          break;
        case "focusout":
          Ka = Ic = Ro = null;
          break;
        case "mousedown":
          jc = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((jc = !1), Vf(d, r, c));
          break;
        case "selectionchange":
          if (M1) break;
        case "keydown":
        case "keyup":
          Vf(d, r, c);
      }
      var M;
      if (ap)
        e: {
          switch (e) {
            case "compositionstart":
              var A = "onCompositionStart";
              break e;
            case "compositionend":
              A = "onCompositionEnd";
              break e;
            case "compositionupdate":
              A = "onCompositionUpdate";
              break e;
          }
          A = void 0;
        }
      else
        Po
          ? Gg(e, r) && (A = "onCompositionEnd")
          : e === "keydown" && r.keyCode === 229 && (A = "onCompositionStart");
      (A &&
        (Kg &&
          r.locale !== "ko" &&
          (Po || A !== "onCompositionStart"
            ? A === "onCompositionEnd" && Po && (M = Qg())
            : ((yn = c),
              (rp = "value" in yn ? yn.value : yn.textContent),
              (Po = !0))),
        (R = Js(u, A)),
        0 < R.length &&
          ((A = new Af(A, e, null, r, c)),
          d.push({ event: A, listeners: R }),
          M ? (A.data = M) : ((M = Xg(r)), M !== null && (A.data = M)))),
        (M = S1 ? C1(e, r) : k1(e, r)) &&
          ((u = Js(u, "onBeforeInput")),
          0 < u.length &&
            ((c = new Af("onBeforeInput", "beforeinput", null, r, c)),
            d.push({ event: c, listeners: u }),
            (c.data = M))));
    }
    uv(d, t);
  });
}
function mi(e, t, r) {
  return { instance: e, listener: t, currentTarget: r };
}
function Js(e, t) {
  for (var r = t + "Capture", n = []; e !== null;) {
    var o = e,
      a = o.stateNode;
    (o.tag === 5 &&
      a !== null &&
      ((o = a),
      (a = li(e, r)),
      a != null && n.unshift(mi(e, a, o)),
      (a = li(e, t)),
      a != null && n.push(mi(e, a, o))),
      (e = e.return));
  }
  return n;
}
function So(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Kf(e, t, r, n, o) {
  for (var a = t._reactName, i = []; r !== null && r !== n;) {
    var s = r,
      l = s.alternate,
      u = s.stateNode;
    if (l !== null && l === n) break;
    (s.tag === 5 &&
      u !== null &&
      ((s = u),
      o
        ? ((l = li(r, a)), l != null && i.unshift(mi(r, l, s)))
        : o || ((l = li(r, a)), l != null && i.push(mi(r, l, s)))),
      (r = r.return));
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var A1 = /\r\n?/g,
  F1 = /\u0000|\uFFFD/g;
function Gf(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      A1,
      `
`,
    )
    .replace(F1, "");
}
function ns(e, t, r) {
  if (((t = Gf(t)), Gf(e) !== t && r)) throw Error(Y(425));
}
function Zs() {}
var Lc = null,
  Ac = null;
function Fc(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Bc = typeof setTimeout == "function" ? setTimeout : void 0,
  B1 = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Xf = typeof Promise == "function" ? Promise : void 0,
  U1 =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Xf < "u"
        ? function (e) {
            return Xf.resolve(null).then(e).catch($1);
          }
        : Bc;
function $1(e) {
  setTimeout(function () {
    throw e;
  });
}
function Mu(e, t) {
  var r = t,
    n = 0;
  do {
    var o = r.nextSibling;
    if ((e.removeChild(r), o && o.nodeType === 8))
      if (((r = o.data), r === "/$")) {
        if (n === 0) {
          (e.removeChild(o), di(t));
          return;
        }
        n--;
      } else (r !== "$" && r !== "$?" && r !== "$!") || n++;
    r = o;
  } while (r);
  di(t);
}
function bn(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Jf(e) {
  e = e.previousSibling;
  for (var t = 0; e;) {
    if (e.nodeType === 8) {
      var r = e.data;
      if (r === "$" || r === "$!" || r === "$?") {
        if (t === 0) return e;
        t--;
      } else r === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var ga = Math.random().toString(36).slice(2),
  Ir = "__reactFiber$" + ga,
  gi = "__reactProps$" + ga,
  rn = "__reactContainer$" + ga,
  Uc = "__reactEvents$" + ga,
  Y1 = "__reactListeners$" + ga,
  z1 = "__reactHandles$" + ga;
function Wn(e) {
  var t = e[Ir];
  if (t) return t;
  for (var r = e.parentNode; r;) {
    if ((t = r[rn] || r[Ir])) {
      if (
        ((r = t.alternate),
        t.child !== null || (r !== null && r.child !== null))
      )
        for (e = Jf(e); e !== null;) {
          if ((r = e[Ir])) return r;
          e = Jf(e);
        }
      return t;
    }
    ((e = r), (r = e.parentNode));
  }
  return null;
}
function ji(e) {
  return (
    (e = e[Ir] || e[rn]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function No(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(Y(33));
}
function zl(e) {
  return e[gi] || null;
}
var $c = [],
  Mo = -1;
function An(e) {
  return { current: e };
}
function We(e) {
  0 > Mo || ((e.current = $c[Mo]), ($c[Mo] = null), Mo--);
}
function Ye(e, t) {
  (Mo++, ($c[Mo] = e.current), (e.current = t));
}
var In = {},
  Nt = An(In),
  Ht = An(!1),
  no = In;
function Xo(e, t) {
  var r = e.type.contextTypes;
  if (!r) return In;
  var n = e.stateNode;
  if (n && n.__reactInternalMemoizedUnmaskedChildContext === t)
    return n.__reactInternalMemoizedMaskedChildContext;
  var o = {},
    a;
  for (a in r) o[a] = t[a];
  return (
    n &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    o
  );
}
function Wt(e) {
  return ((e = e.childContextTypes), e != null);
}
function el() {
  (We(Ht), We(Nt));
}
function Zf(e, t, r) {
  if (Nt.current !== In) throw Error(Y(168));
  (Ye(Nt, t), Ye(Ht, r));
}
function dv(e, t, r) {
  var n = e.stateNode;
  if (((t = t.childContextTypes), typeof n.getChildContext != "function"))
    return r;
  n = n.getChildContext();
  for (var o in n) if (!(o in t)) throw Error(Y(108, Dx(e) || "Unknown", o));
  return Ze({}, r, n);
}
function tl(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || In),
    (no = Nt.current),
    Ye(Nt, e),
    Ye(Ht, Ht.current),
    !0
  );
}
function eh(e, t, r) {
  var n = e.stateNode;
  if (!n) throw Error(Y(169));
  (r
    ? ((e = dv(e, t, no)),
      (n.__reactInternalMemoizedMergedChildContext = e),
      We(Ht),
      We(Nt),
      Ye(Nt, e))
    : We(Ht),
    Ye(Ht, r));
}
var Kr = null,
  Hl = !1,
  Iu = !1;
function pv(e) {
  Kr === null ? (Kr = [e]) : Kr.push(e);
}
function H1(e) {
  ((Hl = !0), pv(e));
}
function Fn() {
  if (!Iu && Kr !== null) {
    Iu = !0;
    var e = 0,
      t = Le;
    try {
      var r = Kr;
      for (Le = 1; e < r.length; e++) {
        var n = r[e];
        do n = n(!0);
        while (n !== null);
      }
      ((Kr = null), (Hl = !1));
    } catch (o) {
      throw (Kr !== null && (Kr = Kr.slice(e + 1)), Ag(Jd, Fn), o);
    } finally {
      ((Le = t), (Iu = !1));
    }
  }
  return null;
}
var Io = [],
  jo = 0,
  rl = null,
  nl = 0,
  ar = [],
  ir = 0,
  oo = null,
  Xr = 1,
  Jr = "";
function $n(e, t) {
  ((Io[jo++] = nl), (Io[jo++] = rl), (rl = e), (nl = t));
}
function fv(e, t, r) {
  ((ar[ir++] = Xr), (ar[ir++] = Jr), (ar[ir++] = oo), (oo = e));
  var n = Xr;
  e = Jr;
  var o = 32 - kr(n) - 1;
  ((n &= ~(1 << o)), (r += 1));
  var a = 32 - kr(t) + o;
  if (30 < a) {
    var i = o - (o % 5);
    ((a = (n & ((1 << i) - 1)).toString(32)),
      (n >>= i),
      (o -= i),
      (Xr = (1 << (32 - kr(t) + o)) | (r << o) | n),
      (Jr = a + e));
  } else ((Xr = (1 << a) | (r << o) | n), (Jr = e));
}
function sp(e) {
  e.return !== null && ($n(e, 1), fv(e, 1, 0));
}
function lp(e) {
  for (; e === rl;)
    ((rl = Io[--jo]), (Io[jo] = null), (nl = Io[--jo]), (Io[jo] = null));
  for (; e === oo;)
    ((oo = ar[--ir]),
      (ar[ir] = null),
      (Jr = ar[--ir]),
      (ar[ir] = null),
      (Xr = ar[--ir]),
      (ar[ir] = null));
}
var Jt = null,
  Xt = null,
  qe = !1,
  Sr = null;
function hv(e, t) {
  var r = lr(5, null, null, 0);
  ((r.elementType = "DELETED"),
    (r.stateNode = t),
    (r.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [r]), (e.flags |= 16)) : t.push(r));
}
function th(e, t) {
  switch (e.tag) {
    case 5:
      var r = e.type;
      return (
        (t =
          t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Jt = e), (Xt = bn(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Jt = e), (Xt = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((r = oo !== null ? { id: Xr, overflow: Jr } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: r,
              retryLane: 1073741824,
            }),
            (r = lr(18, null, null, 0)),
            (r.stateNode = t),
            (r.return = e),
            (e.child = r),
            (Jt = e),
            (Xt = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Yc(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function zc(e) {
  if (qe) {
    var t = Xt;
    if (t) {
      var r = t;
      if (!th(e, t)) {
        if (Yc(e)) throw Error(Y(418));
        t = bn(r.nextSibling);
        var n = Jt;
        t && th(e, t)
          ? hv(n, r)
          : ((e.flags = (e.flags & -4097) | 2), (qe = !1), (Jt = e));
      }
    } else {
      if (Yc(e)) throw Error(Y(418));
      ((e.flags = (e.flags & -4097) | 2), (qe = !1), (Jt = e));
    }
  }
}
function rh(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;)
    e = e.return;
  Jt = e;
}
function os(e) {
  if (e !== Jt) return !1;
  if (!qe) return (rh(e), (qe = !0), !1);
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Fc(e.type, e.memoizedProps))),
    t && (t = Xt))
  ) {
    if (Yc(e)) throw (mv(), Error(Y(418)));
    for (; t;) (hv(e, t), (t = bn(t.nextSibling)));
  }
  if ((rh(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(Y(317));
    e: {
      for (e = e.nextSibling, t = 0; e;) {
        if (e.nodeType === 8) {
          var r = e.data;
          if (r === "/$") {
            if (t === 0) {
              Xt = bn(e.nextSibling);
              break e;
            }
            t--;
          } else (r !== "$" && r !== "$!" && r !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Xt = null;
    }
  } else Xt = Jt ? bn(e.stateNode.nextSibling) : null;
  return !0;
}
function mv() {
  for (var e = Xt; e;) e = bn(e.nextSibling);
}
function Jo() {
  ((Xt = Jt = null), (qe = !1));
}
function up(e) {
  Sr === null ? (Sr = [e]) : Sr.push(e);
}
var W1 = ln.ReactCurrentBatchConfig;
function Pa(e, t, r) {
  if (
    ((e = r.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (r._owner) {
      if (((r = r._owner), r)) {
        if (r.tag !== 1) throw Error(Y(309));
        var n = r.stateNode;
      }
      if (!n) throw Error(Y(147, e));
      var o = n,
        a = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === a
        ? t.ref
        : ((t = function (i) {
            var s = o.refs;
            i === null ? delete s[a] : (s[a] = i);
          }),
          (t._stringRef = a),
          t);
    }
    if (typeof e != "string") throw Error(Y(284));
    if (!r._owner) throw Error(Y(290, e));
  }
  return e;
}
function as(e, t) {
  throw (
    (e = Object.prototype.toString.call(t)),
    Error(
      Y(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e,
      ),
    )
  );
}
function nh(e) {
  var t = e._init;
  return t(e._payload);
}
function gv(e) {
  function t(g, y) {
    if (e) {
      var w = g.deletions;
      w === null ? ((g.deletions = [y]), (g.flags |= 16)) : w.push(y);
    }
  }
  function r(g, y) {
    if (!e) return null;
    for (; y !== null;) (t(g, y), (y = y.sibling));
    return null;
  }
  function n(g, y) {
    for (g = new Map(); y !== null;)
      (y.key !== null ? g.set(y.key, y) : g.set(y.index, y), (y = y.sibling));
    return g;
  }
  function o(g, y) {
    return ((g = Rn(g, y)), (g.index = 0), (g.sibling = null), g);
  }
  function a(g, y, w) {
    return (
      (g.index = w),
      e
        ? ((w = g.alternate),
          w !== null
            ? ((w = w.index), w < y ? ((g.flags |= 2), y) : w)
            : ((g.flags |= 2), y))
        : ((g.flags |= 1048576), y)
    );
  }
  function i(g) {
    return (e && g.alternate === null && (g.flags |= 2), g);
  }
  function s(g, y, w, T) {
    return y === null || y.tag !== 6
      ? ((y = $u(w, g.mode, T)), (y.return = g), y)
      : ((y = o(y, w)), (y.return = g), y);
  }
  function l(g, y, w, T) {
    var P = w.type;
    return P === To
      ? c(g, y, w.props.children, T, w.key)
      : y !== null &&
          (y.elementType === P ||
            (typeof P == "object" &&
              P !== null &&
              P.$$typeof === fn &&
              nh(P) === y.type))
        ? ((T = o(y, w.props)), (T.ref = Pa(g, y, w)), (T.return = g), T)
        : ((T = bs(w.type, w.key, w.props, null, g.mode, T)),
          (T.ref = Pa(g, y, w)),
          (T.return = g),
          T);
  }
  function u(g, y, w, T) {
    return y === null ||
      y.tag !== 4 ||
      y.stateNode.containerInfo !== w.containerInfo ||
      y.stateNode.implementation !== w.implementation
      ? ((y = Yu(w, g.mode, T)), (y.return = g), y)
      : ((y = o(y, w.children || [])), (y.return = g), y);
  }
  function c(g, y, w, T, P) {
    return y === null || y.tag !== 7
      ? ((y = Jn(w, g.mode, T, P)), (y.return = g), y)
      : ((y = o(y, w)), (y.return = g), y);
  }
  function d(g, y, w) {
    if ((typeof y == "string" && y !== "") || typeof y == "number")
      return ((y = $u("" + y, g.mode, w)), (y.return = g), y);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case Qi:
          return (
            (w = bs(y.type, y.key, y.props, null, g.mode, w)),
            (w.ref = Pa(g, null, y)),
            (w.return = g),
            w
          );
        case Do:
          return ((y = Yu(y, g.mode, w)), (y.return = g), y);
        case fn:
          var T = y._init;
          return d(g, T(y._payload), w);
      }
      if (Ua(y) || Ea(y))
        return ((y = Jn(y, g.mode, w, null)), (y.return = g), y);
      as(g, y);
    }
    return null;
  }
  function m(g, y, w, T) {
    var P = y !== null ? y.key : null;
    if ((typeof w == "string" && w !== "") || typeof w == "number")
      return P !== null ? null : s(g, y, "" + w, T);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case Qi:
          return w.key === P ? l(g, y, w, T) : null;
        case Do:
          return w.key === P ? u(g, y, w, T) : null;
        case fn:
          return ((P = w._init), m(g, y, P(w._payload), T));
      }
      if (Ua(w) || Ea(w)) return P !== null ? null : c(g, y, w, T, null);
      as(g, w);
    }
    return null;
  }
  function v(g, y, w, T, P) {
    if ((typeof T == "string" && T !== "") || typeof T == "number")
      return ((g = g.get(w) || null), s(y, g, "" + T, P));
    if (typeof T == "object" && T !== null) {
      switch (T.$$typeof) {
        case Qi:
          return (
            (g = g.get(T.key === null ? w : T.key) || null),
            l(y, g, T, P)
          );
        case Do:
          return (
            (g = g.get(T.key === null ? w : T.key) || null),
            u(y, g, T, P)
          );
        case fn:
          var R = T._init;
          return v(g, y, w, R(T._payload), P);
      }
      if (Ua(T) || Ea(T)) return ((g = g.get(w) || null), c(y, g, T, P, null));
      as(y, T);
    }
    return null;
  }
  function S(g, y, w, T) {
    for (
      var P = null, R = null, M = y, A = (y = 0), V = null;
      M !== null && A < w.length;
      A++
    ) {
      M.index > A ? ((V = M), (M = null)) : (V = M.sibling);
      var L = m(g, M, w[A], T);
      if (L === null) {
        M === null && (M = V);
        break;
      }
      (e && M && L.alternate === null && t(g, M),
        (y = a(L, y, A)),
        R === null ? (P = L) : (R.sibling = L),
        (R = L),
        (M = V));
    }
    if (A === w.length) return (r(g, M), qe && $n(g, A), P);
    if (M === null) {
      for (; A < w.length; A++)
        ((M = d(g, w[A], T)),
          M !== null &&
            ((y = a(M, y, A)),
            R === null ? (P = M) : (R.sibling = M),
            (R = M)));
      return (qe && $n(g, A), P);
    }
    for (M = n(g, M); A < w.length; A++)
      ((V = v(M, g, A, w[A], T)),
        V !== null &&
          (e && V.alternate !== null && M.delete(V.key === null ? A : V.key),
          (y = a(V, y, A)),
          R === null ? (P = V) : (R.sibling = V),
          (R = V)));
    return (
      e &&
        M.forEach(function (K) {
          return t(g, K);
        }),
      qe && $n(g, A),
      P
    );
  }
  function C(g, y, w, T) {
    var P = Ea(w);
    if (typeof P != "function") throw Error(Y(150));
    if (((w = P.call(w)), w == null)) throw Error(Y(151));
    for (
      var R = (P = null), M = y, A = (y = 0), V = null, L = w.next();
      M !== null && !L.done;
      A++, L = w.next()
    ) {
      M.index > A ? ((V = M), (M = null)) : (V = M.sibling);
      var K = m(g, M, L.value, T);
      if (K === null) {
        M === null && (M = V);
        break;
      }
      (e && M && K.alternate === null && t(g, M),
        (y = a(K, y, A)),
        R === null ? (P = K) : (R.sibling = K),
        (R = K),
        (M = V));
    }
    if (L.done) return (r(g, M), qe && $n(g, A), P);
    if (M === null) {
      for (; !L.done; A++, L = w.next())
        ((L = d(g, L.value, T)),
          L !== null &&
            ((y = a(L, y, A)),
            R === null ? (P = L) : (R.sibling = L),
            (R = L)));
      return (qe && $n(g, A), P);
    }
    for (M = n(g, M); !L.done; A++, L = w.next())
      ((L = v(M, g, A, L.value, T)),
        L !== null &&
          (e && L.alternate !== null && M.delete(L.key === null ? A : L.key),
          (y = a(L, y, A)),
          R === null ? (P = L) : (R.sibling = L),
          (R = L)));
    return (
      e &&
        M.forEach(function ($) {
          return t(g, $);
        }),
      qe && $n(g, A),
      P
    );
  }
  function k(g, y, w, T) {
    if (
      (typeof w == "object" &&
        w !== null &&
        w.type === To &&
        w.key === null &&
        (w = w.props.children),
      typeof w == "object" && w !== null)
    ) {
      switch (w.$$typeof) {
        case Qi:
          e: {
            for (var P = w.key, R = y; R !== null;) {
              if (R.key === P) {
                if (((P = w.type), P === To)) {
                  if (R.tag === 7) {
                    (r(g, R.sibling),
                      (y = o(R, w.props.children)),
                      (y.return = g),
                      (g = y));
                    break e;
                  }
                } else if (
                  R.elementType === P ||
                  (typeof P == "object" &&
                    P !== null &&
                    P.$$typeof === fn &&
                    nh(P) === R.type)
                ) {
                  (r(g, R.sibling),
                    (y = o(R, w.props)),
                    (y.ref = Pa(g, R, w)),
                    (y.return = g),
                    (g = y));
                  break e;
                }
                r(g, R);
                break;
              } else t(g, R);
              R = R.sibling;
            }
            w.type === To
              ? ((y = Jn(w.props.children, g.mode, T, w.key)),
                (y.return = g),
                (g = y))
              : ((T = bs(w.type, w.key, w.props, null, g.mode, T)),
                (T.ref = Pa(g, y, w)),
                (T.return = g),
                (g = T));
          }
          return i(g);
        case Do:
          e: {
            for (R = w.key; y !== null;) {
              if (y.key === R)
                if (
                  y.tag === 4 &&
                  y.stateNode.containerInfo === w.containerInfo &&
                  y.stateNode.implementation === w.implementation
                ) {
                  (r(g, y.sibling),
                    (y = o(y, w.children || [])),
                    (y.return = g),
                    (g = y));
                  break e;
                } else {
                  r(g, y);
                  break;
                }
              else t(g, y);
              y = y.sibling;
            }
            ((y = Yu(w, g.mode, T)), (y.return = g), (g = y));
          }
          return i(g);
        case fn:
          return ((R = w._init), k(g, y, R(w._payload), T));
      }
      if (Ua(w)) return S(g, y, w, T);
      if (Ea(w)) return C(g, y, w, T);
      as(g, w);
    }
    return (typeof w == "string" && w !== "") || typeof w == "number"
      ? ((w = "" + w),
        y !== null && y.tag === 6
          ? (r(g, y.sibling), (y = o(y, w)), (y.return = g), (g = y))
          : (r(g, y), (y = $u(w, g.mode, T)), (y.return = g), (g = y)),
        i(g))
      : r(g, y);
  }
  return k;
}
var Zo = gv(!0),
  vv = gv(!1),
  ol = An(null),
  al = null,
  Lo = null,
  cp = null;
function dp() {
  cp = Lo = al = null;
}
function pp(e) {
  var t = ol.current;
  (We(ol), (e._currentValue = t));
}
function Hc(e, t, r) {
  for (; e !== null;) {
    var n = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), n !== null && (n.childLanes |= t))
        : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t),
      e === r)
    )
      break;
    e = e.return;
  }
}
function Wo(e, t) {
  ((al = e),
    (cp = Lo = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (zt = !0), (e.firstContext = null)));
}
function dr(e) {
  var t = e._currentValue;
  if (cp !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Lo === null)) {
      if (al === null) throw Error(Y(308));
      ((Lo = e), (al.dependencies = { lanes: 0, firstContext: e }));
    } else Lo = Lo.next = e;
  return t;
}
var Vn = null;
function fp(e) {
  Vn === null ? (Vn = [e]) : Vn.push(e);
}
function yv(e, t, r, n) {
  var o = t.interleaved;
  return (
    o === null ? ((r.next = r), fp(t)) : ((r.next = o.next), (o.next = r)),
    (t.interleaved = r),
    nn(e, n)
  );
}
function nn(e, t) {
  e.lanes |= t;
  var r = e.alternate;
  for (r !== null && (r.lanes |= t), r = e, e = e.return; e !== null;)
    ((e.childLanes |= t),
      (r = e.alternate),
      r !== null && (r.childLanes |= t),
      (r = e),
      (e = e.return));
  return r.tag === 3 ? r.stateNode : null;
}
var hn = !1;
function hp(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function wv(e, t) {
  ((e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      }));
}
function en(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function Dn(e, t, r) {
  var n = e.updateQueue;
  if (n === null) return null;
  if (((n = n.shared), Pe & 2)) {
    var o = n.pending;
    return (
      o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
      (n.pending = t),
      nn(e, r)
    );
  }
  return (
    (o = n.interleaved),
    o === null ? ((t.next = t), fp(n)) : ((t.next = o.next), (o.next = t)),
    (n.interleaved = t),
    nn(e, r)
  );
}
function xs(e, t, r) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (r & 4194240) !== 0))
  ) {
    var n = t.lanes;
    ((n &= e.pendingLanes), (r |= n), (t.lanes = r), Zd(e, r));
  }
}
function oh(e, t) {
  var r = e.updateQueue,
    n = e.alternate;
  if (n !== null && ((n = n.updateQueue), r === n)) {
    var o = null,
      a = null;
    if (((r = r.firstBaseUpdate), r !== null)) {
      do {
        var i = {
          eventTime: r.eventTime,
          lane: r.lane,
          tag: r.tag,
          payload: r.payload,
          callback: r.callback,
          next: null,
        };
        (a === null ? (o = a = i) : (a = a.next = i), (r = r.next));
      } while (r !== null);
      a === null ? (o = a = t) : (a = a.next = t);
    } else o = a = t;
    ((r = {
      baseState: n.baseState,
      firstBaseUpdate: o,
      lastBaseUpdate: a,
      shared: n.shared,
      effects: n.effects,
    }),
      (e.updateQueue = r));
    return;
  }
  ((e = r.lastBaseUpdate),
    e === null ? (r.firstBaseUpdate = t) : (e.next = t),
    (r.lastBaseUpdate = t));
}
function il(e, t, r, n) {
  var o = e.updateQueue;
  hn = !1;
  var a = o.firstBaseUpdate,
    i = o.lastBaseUpdate,
    s = o.shared.pending;
  if (s !== null) {
    o.shared.pending = null;
    var l = s,
      u = l.next;
    ((l.next = null), i === null ? (a = u) : (i.next = u), (i = l));
    var c = e.alternate;
    c !== null &&
      ((c = c.updateQueue),
      (s = c.lastBaseUpdate),
      s !== i &&
        (s === null ? (c.firstBaseUpdate = u) : (s.next = u),
        (c.lastBaseUpdate = l)));
  }
  if (a !== null) {
    var d = o.baseState;
    ((i = 0), (c = u = l = null), (s = a));
    do {
      var m = s.lane,
        v = s.eventTime;
      if ((n & m) === m) {
        c !== null &&
          (c = c.next =
            {
              eventTime: v,
              lane: 0,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            });
        e: {
          var S = e,
            C = s;
          switch (((m = t), (v = r), C.tag)) {
            case 1:
              if (((S = C.payload), typeof S == "function")) {
                d = S.call(v, d, m);
                break e;
              }
              d = S;
              break e;
            case 3:
              S.flags = (S.flags & -65537) | 128;
            case 0:
              if (
                ((S = C.payload),
                (m = typeof S == "function" ? S.call(v, d, m) : S),
                m == null)
              )
                break e;
              d = Ze({}, d, m);
              break e;
            case 2:
              hn = !0;
          }
        }
        s.callback !== null &&
          s.lane !== 0 &&
          ((e.flags |= 64),
          (m = o.effects),
          m === null ? (o.effects = [s]) : m.push(s));
      } else
        ((v = {
          eventTime: v,
          lane: m,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null,
        }),
          c === null ? ((u = c = v), (l = d)) : (c = c.next = v),
          (i |= m));
      if (((s = s.next), s === null)) {
        if (((s = o.shared.pending), s === null)) break;
        ((m = s),
          (s = m.next),
          (m.next = null),
          (o.lastBaseUpdate = m),
          (o.shared.pending = null));
      }
    } while (!0);
    if (
      (c === null && (l = d),
      (o.baseState = l),
      (o.firstBaseUpdate = u),
      (o.lastBaseUpdate = c),
      (t = o.shared.interleaved),
      t !== null)
    ) {
      o = t;
      do ((i |= o.lane), (o = o.next));
      while (o !== t);
    } else a === null && (o.shared.lanes = 0);
    ((io |= i), (e.lanes = i), (e.memoizedState = d));
  }
}
function ah(e, t, r) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var n = e[t],
        o = n.callback;
      if (o !== null) {
        if (((n.callback = null), (n = r), typeof o != "function"))
          throw Error(Y(191, o));
        o.call(n);
      }
    }
}
var Li = {},
  Br = An(Li),
  vi = An(Li),
  yi = An(Li);
function qn(e) {
  if (e === Li) throw Error(Y(174));
  return e;
}
function mp(e, t) {
  switch ((Ye(yi, t), Ye(vi, e), Ye(Br, Li), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Ec(null, "");
      break;
    default:
      ((e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Ec(t, e)));
  }
  (We(Br), Ye(Br, t));
}
function ea() {
  (We(Br), We(vi), We(yi));
}
function xv(e) {
  qn(yi.current);
  var t = qn(Br.current),
    r = Ec(t, e.type);
  t !== r && (Ye(vi, e), Ye(Br, r));
}
function gp(e) {
  vi.current === e && (We(Br), We(vi));
}
var Ke = An(0);
function sl(e) {
  for (var t = e; t !== null;) {
    if (t.tag === 13) {
      var r = t.memoizedState;
      if (
        r !== null &&
        ((r = r.dehydrated), r === null || r.data === "$?" || r.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      ((t.child.return = t), (t = t.child));
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null;) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    ((t.sibling.return = t.return), (t = t.sibling));
  }
  return null;
}
var ju = [];
function vp() {
  for (var e = 0; e < ju.length; e++)
    ju[e]._workInProgressVersionPrimary = null;
  ju.length = 0;
}
var Ss = ln.ReactCurrentDispatcher,
  Lu = ln.ReactCurrentBatchConfig,
  ao = 0,
  Xe = null,
  dt = null,
  ft = null,
  ll = !1,
  Ga = !1,
  wi = 0,
  V1 = 0;
function _t() {
  throw Error(Y(321));
}
function yp(e, t) {
  if (t === null) return !1;
  for (var r = 0; r < t.length && r < e.length; r++)
    if (!br(e[r], t[r])) return !1;
  return !0;
}
function wp(e, t, r, n, o, a) {
  if (
    ((ao = a),
    (Xe = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (Ss.current = e === null || e.memoizedState === null ? G1 : X1),
    (e = r(n, o)),
    Ga)
  ) {
    a = 0;
    do {
      if (((Ga = !1), (wi = 0), 25 <= a)) throw Error(Y(301));
      ((a += 1),
        (ft = dt = null),
        (t.updateQueue = null),
        (Ss.current = J1),
        (e = r(n, o)));
    } while (Ga);
  }
  if (
    ((Ss.current = ul),
    (t = dt !== null && dt.next !== null),
    (ao = 0),
    (ft = dt = Xe = null),
    (ll = !1),
    t)
  )
    throw Error(Y(300));
  return e;
}
function xp() {
  var e = wi !== 0;
  return ((wi = 0), e);
}
function Or() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (ft === null ? (Xe.memoizedState = ft = e) : (ft = ft.next = e), ft);
}
function pr() {
  if (dt === null) {
    var e = Xe.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = dt.next;
  var t = ft === null ? Xe.memoizedState : ft.next;
  if (t !== null) ((ft = t), (dt = e));
  else {
    if (e === null) throw Error(Y(310));
    ((dt = e),
      (e = {
        memoizedState: dt.memoizedState,
        baseState: dt.baseState,
        baseQueue: dt.baseQueue,
        queue: dt.queue,
        next: null,
      }),
      ft === null ? (Xe.memoizedState = ft = e) : (ft = ft.next = e));
  }
  return ft;
}
function xi(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Au(e) {
  var t = pr(),
    r = t.queue;
  if (r === null) throw Error(Y(311));
  r.lastRenderedReducer = e;
  var n = dt,
    o = n.baseQueue,
    a = r.pending;
  if (a !== null) {
    if (o !== null) {
      var i = o.next;
      ((o.next = a.next), (a.next = i));
    }
    ((n.baseQueue = o = a), (r.pending = null));
  }
  if (o !== null) {
    ((a = o.next), (n = n.baseState));
    var s = (i = null),
      l = null,
      u = a;
    do {
      var c = u.lane;
      if ((ao & c) === c)
        (l !== null &&
          (l = l.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (n = u.hasEagerState ? u.eagerState : e(n, u.action)));
      else {
        var d = {
          lane: c,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        (l === null ? ((s = l = d), (i = n)) : (l = l.next = d),
          (Xe.lanes |= c),
          (io |= c));
      }
      u = u.next;
    } while (u !== null && u !== a);
    (l === null ? (i = n) : (l.next = s),
      br(n, t.memoizedState) || (zt = !0),
      (t.memoizedState = n),
      (t.baseState = i),
      (t.baseQueue = l),
      (r.lastRenderedState = n));
  }
  if (((e = r.interleaved), e !== null)) {
    o = e;
    do ((a = o.lane), (Xe.lanes |= a), (io |= a), (o = o.next));
    while (o !== e);
  } else o === null && (r.lanes = 0);
  return [t.memoizedState, r.dispatch];
}
function Fu(e) {
  var t = pr(),
    r = t.queue;
  if (r === null) throw Error(Y(311));
  r.lastRenderedReducer = e;
  var n = r.dispatch,
    o = r.pending,
    a = t.memoizedState;
  if (o !== null) {
    r.pending = null;
    var i = (o = o.next);
    do ((a = e(a, i.action)), (i = i.next));
    while (i !== o);
    (br(a, t.memoizedState) || (zt = !0),
      (t.memoizedState = a),
      t.baseQueue === null && (t.baseState = a),
      (r.lastRenderedState = a));
  }
  return [a, n];
}
function Sv() {}
function Cv(e, t) {
  var r = Xe,
    n = pr(),
    o = t(),
    a = !br(n.memoizedState, o);
  if (
    (a && ((n.memoizedState = o), (zt = !0)),
    (n = n.queue),
    Sp(_v.bind(null, r, n, e), [e]),
    n.getSnapshot !== t || a || (ft !== null && ft.memoizedState.tag & 1))
  ) {
    if (
      ((r.flags |= 2048),
      Si(9, Ev.bind(null, r, n, o, t), void 0, null),
      ht === null)
    )
      throw Error(Y(349));
    ao & 30 || kv(r, t, o);
  }
  return o;
}
function kv(e, t, r) {
  ((e.flags |= 16384),
    (e = { getSnapshot: t, value: r }),
    (t = Xe.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Xe.updateQueue = t),
        (t.stores = [e]))
      : ((r = t.stores), r === null ? (t.stores = [e]) : r.push(e)));
}
function Ev(e, t, r, n) {
  ((t.value = r), (t.getSnapshot = n), bv(t) && Dv(e));
}
function _v(e, t, r) {
  return r(function () {
    bv(t) && Dv(e);
  });
}
function bv(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var r = t();
    return !br(e, r);
  } catch {
    return !0;
  }
}
function Dv(e) {
  var t = nn(e, 1);
  t !== null && Er(t, e, 1, -1);
}
function ih(e) {
  var t = Or();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: xi,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = K1.bind(null, Xe, e)),
    [t.memoizedState, e]
  );
}
function Si(e, t, r, n) {
  return (
    (e = { tag: e, create: t, destroy: r, deps: n, next: null }),
    (t = Xe.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (Xe.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((r = t.lastEffect),
        r === null
          ? (t.lastEffect = e.next = e)
          : ((n = r.next), (r.next = e), (e.next = n), (t.lastEffect = e))),
    e
  );
}
function Tv() {
  return pr().memoizedState;
}
function Cs(e, t, r, n) {
  var o = Or();
  ((Xe.flags |= e),
    (o.memoizedState = Si(1 | t, r, void 0, n === void 0 ? null : n)));
}
function Wl(e, t, r, n) {
  var o = pr();
  n = n === void 0 ? null : n;
  var a = void 0;
  if (dt !== null) {
    var i = dt.memoizedState;
    if (((a = i.destroy), n !== null && yp(n, i.deps))) {
      o.memoizedState = Si(t, r, a, n);
      return;
    }
  }
  ((Xe.flags |= e), (o.memoizedState = Si(1 | t, r, a, n)));
}
function sh(e, t) {
  return Cs(8390656, 8, e, t);
}
function Sp(e, t) {
  return Wl(2048, 8, e, t);
}
function Pv(e, t) {
  return Wl(4, 2, e, t);
}
function Rv(e, t) {
  return Wl(4, 4, e, t);
}
function Ov(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Nv(e, t, r) {
  return (
    (r = r != null ? r.concat([e]) : null),
    Wl(4, 4, Ov.bind(null, t, e), r)
  );
}
function Cp() {}
function Mv(e, t) {
  var r = pr();
  t = t === void 0 ? null : t;
  var n = r.memoizedState;
  return n !== null && t !== null && yp(t, n[1])
    ? n[0]
    : ((r.memoizedState = [e, t]), e);
}
function Iv(e, t) {
  var r = pr();
  t = t === void 0 ? null : t;
  var n = r.memoizedState;
  return n !== null && t !== null && yp(t, n[1])
    ? n[0]
    : ((e = e()), (r.memoizedState = [e, t]), e);
}
function jv(e, t, r) {
  return ao & 21
    ? (br(r, t) || ((r = Ug()), (Xe.lanes |= r), (io |= r), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (zt = !0)), (e.memoizedState = r));
}
function q1(e, t) {
  var r = Le;
  ((Le = r !== 0 && 4 > r ? r : 4), e(!0));
  var n = Lu.transition;
  Lu.transition = {};
  try {
    (e(!1), t());
  } finally {
    ((Le = r), (Lu.transition = n));
  }
}
function Lv() {
  return pr().memoizedState;
}
function Q1(e, t, r) {
  var n = Pn(e);
  if (
    ((r = {
      lane: n,
      action: r,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Av(e))
  )
    Fv(t, r);
  else if (((r = yv(e, t, r, n)), r !== null)) {
    var o = At();
    (Er(r, e, n, o), Bv(r, t, n));
  }
}
function K1(e, t, r) {
  var n = Pn(e),
    o = { lane: n, action: r, hasEagerState: !1, eagerState: null, next: null };
  if (Av(e)) Fv(t, o);
  else {
    var a = e.alternate;
    if (
      e.lanes === 0 &&
      (a === null || a.lanes === 0) &&
      ((a = t.lastRenderedReducer), a !== null)
    )
      try {
        var i = t.lastRenderedState,
          s = a(i, r);
        if (((o.hasEagerState = !0), (o.eagerState = s), br(s, i))) {
          var l = t.interleaved;
          (l === null
            ? ((o.next = o), fp(t))
            : ((o.next = l.next), (l.next = o)),
            (t.interleaved = o));
          return;
        }
      } catch {
      } finally {
      }
    ((r = yv(e, t, o, n)),
      r !== null && ((o = At()), Er(r, e, n, o), Bv(r, t, n)));
  }
}
function Av(e) {
  var t = e.alternate;
  return e === Xe || (t !== null && t === Xe);
}
function Fv(e, t) {
  Ga = ll = !0;
  var r = e.pending;
  (r === null ? (t.next = t) : ((t.next = r.next), (r.next = t)),
    (e.pending = t));
}
function Bv(e, t, r) {
  if (r & 4194240) {
    var n = t.lanes;
    ((n &= e.pendingLanes), (r |= n), (t.lanes = r), Zd(e, r));
  }
}
var ul = {
    readContext: dr,
    useCallback: _t,
    useContext: _t,
    useEffect: _t,
    useImperativeHandle: _t,
    useInsertionEffect: _t,
    useLayoutEffect: _t,
    useMemo: _t,
    useReducer: _t,
    useRef: _t,
    useState: _t,
    useDebugValue: _t,
    useDeferredValue: _t,
    useTransition: _t,
    useMutableSource: _t,
    useSyncExternalStore: _t,
    useId: _t,
    unstable_isNewReconciler: !1,
  },
  G1 = {
    readContext: dr,
    useCallback: function (e, t) {
      return ((Or().memoizedState = [e, t === void 0 ? null : t]), e);
    },
    useContext: dr,
    useEffect: sh,
    useImperativeHandle: function (e, t, r) {
      return (
        (r = r != null ? r.concat([e]) : null),
        Cs(4194308, 4, Ov.bind(null, t, e), r)
      );
    },
    useLayoutEffect: function (e, t) {
      return Cs(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Cs(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var r = Or();
      return (
        (t = t === void 0 ? null : t),
        (e = e()),
        (r.memoizedState = [e, t]),
        e
      );
    },
    useReducer: function (e, t, r) {
      var n = Or();
      return (
        (t = r !== void 0 ? r(t) : t),
        (n.memoizedState = n.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (n.queue = e),
        (e = e.dispatch = Q1.bind(null, Xe, e)),
        [n.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Or();
      return ((e = { current: e }), (t.memoizedState = e));
    },
    useState: ih,
    useDebugValue: Cp,
    useDeferredValue: function (e) {
      return (Or().memoizedState = e);
    },
    useTransition: function () {
      var e = ih(!1),
        t = e[0];
      return ((e = q1.bind(null, e[1])), (Or().memoizedState = e), [t, e]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, r) {
      var n = Xe,
        o = Or();
      if (qe) {
        if (r === void 0) throw Error(Y(407));
        r = r();
      } else {
        if (((r = t()), ht === null)) throw Error(Y(349));
        ao & 30 || kv(n, t, r);
      }
      o.memoizedState = r;
      var a = { value: r, getSnapshot: t };
      return (
        (o.queue = a),
        sh(_v.bind(null, n, a, e), [e]),
        (n.flags |= 2048),
        Si(9, Ev.bind(null, n, a, r, t), void 0, null),
        r
      );
    },
    useId: function () {
      var e = Or(),
        t = ht.identifierPrefix;
      if (qe) {
        var r = Jr,
          n = Xr;
        ((r = (n & ~(1 << (32 - kr(n) - 1))).toString(32) + r),
          (t = ":" + t + "R" + r),
          (r = wi++),
          0 < r && (t += "H" + r.toString(32)),
          (t += ":"));
      } else ((r = V1++), (t = ":" + t + "r" + r.toString(32) + ":"));
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  X1 = {
    readContext: dr,
    useCallback: Mv,
    useContext: dr,
    useEffect: Sp,
    useImperativeHandle: Nv,
    useInsertionEffect: Pv,
    useLayoutEffect: Rv,
    useMemo: Iv,
    useReducer: Au,
    useRef: Tv,
    useState: function () {
      return Au(xi);
    },
    useDebugValue: Cp,
    useDeferredValue: function (e) {
      var t = pr();
      return jv(t, dt.memoizedState, e);
    },
    useTransition: function () {
      var e = Au(xi)[0],
        t = pr().memoizedState;
      return [e, t];
    },
    useMutableSource: Sv,
    useSyncExternalStore: Cv,
    useId: Lv,
    unstable_isNewReconciler: !1,
  },
  J1 = {
    readContext: dr,
    useCallback: Mv,
    useContext: dr,
    useEffect: Sp,
    useImperativeHandle: Nv,
    useInsertionEffect: Pv,
    useLayoutEffect: Rv,
    useMemo: Iv,
    useReducer: Fu,
    useRef: Tv,
    useState: function () {
      return Fu(xi);
    },
    useDebugValue: Cp,
    useDeferredValue: function (e) {
      var t = pr();
      return dt === null ? (t.memoizedState = e) : jv(t, dt.memoizedState, e);
    },
    useTransition: function () {
      var e = Fu(xi)[0],
        t = pr().memoizedState;
      return [e, t];
    },
    useMutableSource: Sv,
    useSyncExternalStore: Cv,
    useId: Lv,
    unstable_isNewReconciler: !1,
  };
function wr(e, t) {
  if (e && e.defaultProps) {
    ((t = Ze({}, t)), (e = e.defaultProps));
    for (var r in e) t[r] === void 0 && (t[r] = e[r]);
    return t;
  }
  return t;
}
function Wc(e, t, r, n) {
  ((t = e.memoizedState),
    (r = r(n, t)),
    (r = r == null ? t : Ze({}, t, r)),
    (e.memoizedState = r),
    e.lanes === 0 && (e.updateQueue.baseState = r));
}
var Vl = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? mo(e) === e : !1;
  },
  enqueueSetState: function (e, t, r) {
    e = e._reactInternals;
    var n = At(),
      o = Pn(e),
      a = en(n, o);
    ((a.payload = t),
      r != null && (a.callback = r),
      (t = Dn(e, a, o)),
      t !== null && (Er(t, e, o, n), xs(t, e, o)));
  },
  enqueueReplaceState: function (e, t, r) {
    e = e._reactInternals;
    var n = At(),
      o = Pn(e),
      a = en(n, o);
    ((a.tag = 1),
      (a.payload = t),
      r != null && (a.callback = r),
      (t = Dn(e, a, o)),
      t !== null && (Er(t, e, o, n), xs(t, e, o)));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var r = At(),
      n = Pn(e),
      o = en(r, n);
    ((o.tag = 2),
      t != null && (o.callback = t),
      (t = Dn(e, o, n)),
      t !== null && (Er(t, e, n, r), xs(t, e, n)));
  },
};
function lh(e, t, r, n, o, a, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(n, a, i)
      : t.prototype && t.prototype.isPureReactComponent
        ? !fi(r, n) || !fi(o, a)
        : !0
  );
}
function Uv(e, t, r) {
  var n = !1,
    o = In,
    a = t.contextType;
  return (
    typeof a == "object" && a !== null
      ? (a = dr(a))
      : ((o = Wt(t) ? no : Nt.current),
        (n = t.contextTypes),
        (a = (n = n != null) ? Xo(e, o) : In)),
    (t = new t(r, a)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Vl),
    (e.stateNode = t),
    (t._reactInternals = e),
    n &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = o),
      (e.__reactInternalMemoizedMaskedChildContext = a)),
    t
  );
}
function uh(e, t, r, n) {
  ((e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(r, n),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(r, n),
    t.state !== e && Vl.enqueueReplaceState(t, t.state, null));
}
function Vc(e, t, r, n) {
  var o = e.stateNode;
  ((o.props = r), (o.state = e.memoizedState), (o.refs = {}), hp(e));
  var a = t.contextType;
  (typeof a == "object" && a !== null
    ? (o.context = dr(a))
    : ((a = Wt(t) ? no : Nt.current), (o.context = Xo(e, a))),
    (o.state = e.memoizedState),
    (a = t.getDerivedStateFromProps),
    typeof a == "function" && (Wc(e, t, a, r), (o.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function" ||
      (typeof o.UNSAFE_componentWillMount != "function" &&
        typeof o.componentWillMount != "function") ||
      ((t = o.state),
      typeof o.componentWillMount == "function" && o.componentWillMount(),
      typeof o.UNSAFE_componentWillMount == "function" &&
        o.UNSAFE_componentWillMount(),
      t !== o.state && Vl.enqueueReplaceState(o, o.state, null),
      il(e, r, o, n),
      (o.state = e.memoizedState)),
    typeof o.componentDidMount == "function" && (e.flags |= 4194308));
}
function ta(e, t) {
  try {
    var r = "",
      n = t;
    do ((r += bx(n)), (n = n.return));
    while (n);
    var o = r;
  } catch (a) {
    o =
      `
Error generating stack: ` +
      a.message +
      `
` +
      a.stack;
  }
  return { value: e, source: t, stack: o, digest: null };
}
function Bu(e, t, r) {
  return { value: e, source: null, stack: r ?? null, digest: t ?? null };
}
function qc(e, t) {
  try {
    console.error(t.value);
  } catch (r) {
    setTimeout(function () {
      throw r;
    });
  }
}
var Z1 = typeof WeakMap == "function" ? WeakMap : Map;
function $v(e, t, r) {
  ((r = en(-1, r)), (r.tag = 3), (r.payload = { element: null }));
  var n = t.value;
  return (
    (r.callback = function () {
      (dl || ((dl = !0), (nd = n)), qc(e, t));
    }),
    r
  );
}
function Yv(e, t, r) {
  ((r = en(-1, r)), (r.tag = 3));
  var n = e.type.getDerivedStateFromError;
  if (typeof n == "function") {
    var o = t.value;
    ((r.payload = function () {
      return n(o);
    }),
      (r.callback = function () {
        qc(e, t);
      }));
  }
  var a = e.stateNode;
  return (
    a !== null &&
      typeof a.componentDidCatch == "function" &&
      (r.callback = function () {
        (qc(e, t),
          typeof n != "function" &&
            (Tn === null ? (Tn = new Set([this])) : Tn.add(this)));
        var i = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: i !== null ? i : "",
        });
      }),
    r
  );
}
function ch(e, t, r) {
  var n = e.pingCache;
  if (n === null) {
    n = e.pingCache = new Z1();
    var o = new Set();
    n.set(t, o);
  } else ((o = n.get(t)), o === void 0 && ((o = new Set()), n.set(t, o)));
  o.has(r) || (o.add(r), (e = fS.bind(null, e, t, r)), t.then(e, e));
}
function dh(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function ph(e, t, r, n, o) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = o), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (r.flags |= 131072),
          (r.flags &= -52805),
          r.tag === 1 &&
            (r.alternate === null
              ? (r.tag = 17)
              : ((t = en(-1, 1)), (t.tag = 2), Dn(r, t, 1))),
          (r.lanes |= 1)),
      e);
}
var eS = ln.ReactCurrentOwner,
  zt = !1;
function jt(e, t, r, n) {
  t.child = e === null ? vv(t, null, r, n) : Zo(t, e.child, r, n);
}
function fh(e, t, r, n, o) {
  r = r.render;
  var a = t.ref;
  return (
    Wo(t, o),
    (n = wp(e, t, r, n, a, o)),
    (r = xp()),
    e !== null && !zt
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        on(e, t, o))
      : (qe && r && sp(t), (t.flags |= 1), jt(e, t, n, o), t.child)
  );
}
function hh(e, t, r, n, o) {
  if (e === null) {
    var a = r.type;
    return typeof a == "function" &&
      !Rp(a) &&
      a.defaultProps === void 0 &&
      r.compare === null &&
      r.defaultProps === void 0
      ? ((t.tag = 15), (t.type = a), zv(e, t, a, n, o))
      : ((e = bs(r.type, null, n, t, t.mode, o)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((a = e.child), !(e.lanes & o))) {
    var i = a.memoizedProps;
    if (
      ((r = r.compare), (r = r !== null ? r : fi), r(i, n) && e.ref === t.ref)
    )
      return on(e, t, o);
  }
  return (
    (t.flags |= 1),
    (e = Rn(a, n)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function zv(e, t, r, n, o) {
  if (e !== null) {
    var a = e.memoizedProps;
    if (fi(a, n) && e.ref === t.ref)
      if (((zt = !1), (t.pendingProps = n = a), (e.lanes & o) !== 0))
        e.flags & 131072 && (zt = !0);
      else return ((t.lanes = e.lanes), on(e, t, o));
  }
  return Qc(e, t, r, n, o);
}
function Hv(e, t, r) {
  var n = t.pendingProps,
    o = n.children,
    a = e !== null ? e.memoizedState : null;
  if (n.mode === "hidden")
    if (!(t.mode & 1))
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        Ye(Fo, Gt),
        (Gt |= r));
    else {
      if (!(r & 1073741824))
        return (
          (e = a !== null ? a.baseLanes | r : r),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          Ye(Fo, Gt),
          (Gt |= e),
          null
        );
      ((t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (n = a !== null ? a.baseLanes : r),
        Ye(Fo, Gt),
        (Gt |= n));
    }
  else
    (a !== null ? ((n = a.baseLanes | r), (t.memoizedState = null)) : (n = r),
      Ye(Fo, Gt),
      (Gt |= n));
  return (jt(e, t, o, r), t.child);
}
function Wv(e, t) {
  var r = t.ref;
  ((e === null && r !== null) || (e !== null && e.ref !== r)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Qc(e, t, r, n, o) {
  var a = Wt(r) ? no : Nt.current;
  return (
    (a = Xo(t, a)),
    Wo(t, o),
    (r = wp(e, t, r, n, a, o)),
    (n = xp()),
    e !== null && !zt
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        on(e, t, o))
      : (qe && n && sp(t), (t.flags |= 1), jt(e, t, r, o), t.child)
  );
}
function mh(e, t, r, n, o) {
  if (Wt(r)) {
    var a = !0;
    tl(t);
  } else a = !1;
  if ((Wo(t, o), t.stateNode === null))
    (ks(e, t), Uv(t, r, n), Vc(t, r, n, o), (n = !0));
  else if (e === null) {
    var i = t.stateNode,
      s = t.memoizedProps;
    i.props = s;
    var l = i.context,
      u = r.contextType;
    typeof u == "object" && u !== null
      ? (u = dr(u))
      : ((u = Wt(r) ? no : Nt.current), (u = Xo(t, u)));
    var c = r.getDerivedStateFromProps,
      d =
        typeof c == "function" ||
        typeof i.getSnapshotBeforeUpdate == "function";
    (d ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((s !== n || l !== u) && uh(t, i, n, u)),
      (hn = !1));
    var m = t.memoizedState;
    ((i.state = m),
      il(t, n, i, o),
      (l = t.memoizedState),
      s !== n || m !== l || Ht.current || hn
        ? (typeof c == "function" && (Wc(t, r, c, n), (l = t.memoizedState)),
          (s = hn || lh(t, r, s, n, m, l, u))
            ? (d ||
                (typeof i.UNSAFE_componentWillMount != "function" &&
                  typeof i.componentWillMount != "function") ||
                (typeof i.componentWillMount == "function" &&
                  i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == "function" &&
                  i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = n),
              (t.memoizedState = l)),
          (i.props = n),
          (i.state = l),
          (i.context = u),
          (n = s))
        : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
          (n = !1)));
  } else {
    ((i = t.stateNode),
      wv(e, t),
      (s = t.memoizedProps),
      (u = t.type === t.elementType ? s : wr(t.type, s)),
      (i.props = u),
      (d = t.pendingProps),
      (m = i.context),
      (l = r.contextType),
      typeof l == "object" && l !== null
        ? (l = dr(l))
        : ((l = Wt(r) ? no : Nt.current), (l = Xo(t, l))));
    var v = r.getDerivedStateFromProps;
    ((c =
      typeof v == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function") ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((s !== d || m !== l) && uh(t, i, n, l)),
      (hn = !1),
      (m = t.memoizedState),
      (i.state = m),
      il(t, n, i, o));
    var S = t.memoizedState;
    s !== d || m !== S || Ht.current || hn
      ? (typeof v == "function" && (Wc(t, r, v, n), (S = t.memoizedState)),
        (u = hn || lh(t, r, u, n, m, S, l) || !1)
          ? (c ||
              (typeof i.UNSAFE_componentWillUpdate != "function" &&
                typeof i.componentWillUpdate != "function") ||
              (typeof i.componentWillUpdate == "function" &&
                i.componentWillUpdate(n, S, l),
              typeof i.UNSAFE_componentWillUpdate == "function" &&
                i.UNSAFE_componentWillUpdate(n, S, l)),
            typeof i.componentDidUpdate == "function" && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != "function" ||
              (s === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != "function" ||
              (s === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = n),
            (t.memoizedState = S)),
        (i.props = n),
        (i.state = S),
        (i.context = l),
        (n = u))
      : (typeof i.componentDidUpdate != "function" ||
          (s === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != "function" ||
          (s === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 1024),
        (n = !1));
  }
  return Kc(e, t, r, n, a, o);
}
function Kc(e, t, r, n, o, a) {
  Wv(e, t);
  var i = (t.flags & 128) !== 0;
  if (!n && !i) return (o && eh(t, r, !1), on(e, t, a));
  ((n = t.stateNode), (eS.current = t));
  var s =
    i && typeof r.getDerivedStateFromError != "function" ? null : n.render();
  return (
    (t.flags |= 1),
    e !== null && i
      ? ((t.child = Zo(t, e.child, null, a)), (t.child = Zo(t, null, s, a)))
      : jt(e, t, s, a),
    (t.memoizedState = n.state),
    o && eh(t, r, !0),
    t.child
  );
}
function Vv(e) {
  var t = e.stateNode;
  (t.pendingContext
    ? Zf(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Zf(e, t.context, !1),
    mp(e, t.containerInfo));
}
function gh(e, t, r, n, o) {
  return (Jo(), up(o), (t.flags |= 256), jt(e, t, r, n), t.child);
}
var Gc = { dehydrated: null, treeContext: null, retryLane: 0 };
function Xc(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function qv(e, t, r) {
  var n = t.pendingProps,
    o = Ke.current,
    a = !1,
    i = (t.flags & 128) !== 0,
    s;
  if (
    ((s = i) ||
      (s = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
    s
      ? ((a = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (o |= 1),
    Ye(Ke, o & 1),
    e === null)
  )
    return (
      zc(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((i = n.children),
          (e = n.fallback),
          a
            ? ((n = t.mode),
              (a = t.child),
              (i = { mode: "hidden", children: i }),
              !(n & 1) && a !== null
                ? ((a.childLanes = 0), (a.pendingProps = i))
                : (a = Kl(i, n, 0, null)),
              (e = Jn(e, n, r, null)),
              (a.return = t),
              (e.return = t),
              (a.sibling = e),
              (t.child = a),
              (t.child.memoizedState = Xc(r)),
              (t.memoizedState = Gc),
              e)
            : kp(t, i))
    );
  if (((o = e.memoizedState), o !== null && ((s = o.dehydrated), s !== null)))
    return tS(e, t, i, n, s, o, r);
  if (a) {
    ((a = n.fallback), (i = t.mode), (o = e.child), (s = o.sibling));
    var l = { mode: "hidden", children: n.children };
    return (
      !(i & 1) && t.child !== o
        ? ((n = t.child),
          (n.childLanes = 0),
          (n.pendingProps = l),
          (t.deletions = null))
        : ((n = Rn(o, l)), (n.subtreeFlags = o.subtreeFlags & 14680064)),
      s !== null ? (a = Rn(s, a)) : ((a = Jn(a, i, r, null)), (a.flags |= 2)),
      (a.return = t),
      (n.return = t),
      (n.sibling = a),
      (t.child = n),
      (n = a),
      (a = t.child),
      (i = e.child.memoizedState),
      (i =
        i === null
          ? Xc(r)
          : {
              baseLanes: i.baseLanes | r,
              cachePool: null,
              transitions: i.transitions,
            }),
      (a.memoizedState = i),
      (a.childLanes = e.childLanes & ~r),
      (t.memoizedState = Gc),
      n
    );
  }
  return (
    (a = e.child),
    (e = a.sibling),
    (n = Rn(a, { mode: "visible", children: n.children })),
    !(t.mode & 1) && (n.lanes = r),
    (n.return = t),
    (n.sibling = null),
    e !== null &&
      ((r = t.deletions),
      r === null ? ((t.deletions = [e]), (t.flags |= 16)) : r.push(e)),
    (t.child = n),
    (t.memoizedState = null),
    n
  );
}
function kp(e, t) {
  return (
    (t = Kl({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function is(e, t, r, n) {
  return (
    n !== null && up(n),
    Zo(t, e.child, null, r),
    (e = kp(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function tS(e, t, r, n, o, a, i) {
  if (r)
    return t.flags & 256
      ? ((t.flags &= -257), (n = Bu(Error(Y(422)))), is(e, t, i, n))
      : t.memoizedState !== null
        ? ((t.child = e.child), (t.flags |= 128), null)
        : ((a = n.fallback),
          (o = t.mode),
          (n = Kl({ mode: "visible", children: n.children }, o, 0, null)),
          (a = Jn(a, o, i, null)),
          (a.flags |= 2),
          (n.return = t),
          (a.return = t),
          (n.sibling = a),
          (t.child = n),
          t.mode & 1 && Zo(t, e.child, null, i),
          (t.child.memoizedState = Xc(i)),
          (t.memoizedState = Gc),
          a);
  if (!(t.mode & 1)) return is(e, t, i, null);
  if (o.data === "$!") {
    if (((n = o.nextSibling && o.nextSibling.dataset), n)) var s = n.dgst;
    return (
      (n = s),
      (a = Error(Y(419))),
      (n = Bu(a, n, void 0)),
      is(e, t, i, n)
    );
  }
  if (((s = (i & e.childLanes) !== 0), zt || s)) {
    if (((n = ht), n !== null)) {
      switch (i & -i) {
        case 4:
          o = 2;
          break;
        case 16:
          o = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          o = 32;
          break;
        case 536870912:
          o = 268435456;
          break;
        default:
          o = 0;
      }
      ((o = o & (n.suspendedLanes | i) ? 0 : o),
        o !== 0 &&
          o !== a.retryLane &&
          ((a.retryLane = o), nn(e, o), Er(n, e, o, -1)));
    }
    return (Pp(), (n = Bu(Error(Y(421)))), is(e, t, i, n));
  }
  return o.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = hS.bind(null, e)),
      (o._reactRetry = t),
      null)
    : ((e = a.treeContext),
      (Xt = bn(o.nextSibling)),
      (Jt = t),
      (qe = !0),
      (Sr = null),
      e !== null &&
        ((ar[ir++] = Xr),
        (ar[ir++] = Jr),
        (ar[ir++] = oo),
        (Xr = e.id),
        (Jr = e.overflow),
        (oo = t)),
      (t = kp(t, n.children)),
      (t.flags |= 4096),
      t);
}
function vh(e, t, r) {
  e.lanes |= t;
  var n = e.alternate;
  (n !== null && (n.lanes |= t), Hc(e.return, t, r));
}
function Uu(e, t, r, n, o) {
  var a = e.memoizedState;
  a === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: n,
        tail: r,
        tailMode: o,
      })
    : ((a.isBackwards = t),
      (a.rendering = null),
      (a.renderingStartTime = 0),
      (a.last = n),
      (a.tail = r),
      (a.tailMode = o));
}
function Qv(e, t, r) {
  var n = t.pendingProps,
    o = n.revealOrder,
    a = n.tail;
  if ((jt(e, t, n.children, r), (n = Ke.current), n & 2))
    ((n = (n & 1) | 2), (t.flags |= 128));
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null;) {
        if (e.tag === 13) e.memoizedState !== null && vh(e, r, t);
        else if (e.tag === 19) vh(e, r, t);
        else if (e.child !== null) {
          ((e.child.return = e), (e = e.child));
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null;) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        ((e.sibling.return = e.return), (e = e.sibling));
      }
    n &= 1;
  }
  if ((Ye(Ke, n), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (o) {
      case "forwards":
        for (r = t.child, o = null; r !== null;)
          ((e = r.alternate),
            e !== null && sl(e) === null && (o = r),
            (r = r.sibling));
        ((r = o),
          r === null
            ? ((o = t.child), (t.child = null))
            : ((o = r.sibling), (r.sibling = null)),
          Uu(t, !1, o, r, a));
        break;
      case "backwards":
        for (r = null, o = t.child, t.child = null; o !== null;) {
          if (((e = o.alternate), e !== null && sl(e) === null)) {
            t.child = o;
            break;
          }
          ((e = o.sibling), (o.sibling = r), (r = o), (o = e));
        }
        Uu(t, !0, r, null, a);
        break;
      case "together":
        Uu(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function ks(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function on(e, t, r) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (io |= t.lanes),
    !(r & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(Y(153));
  if (t.child !== null) {
    for (
      e = t.child, r = Rn(e, e.pendingProps), t.child = r, r.return = t;
      e.sibling !== null;
    )
      ((e = e.sibling),
        (r = r.sibling = Rn(e, e.pendingProps)),
        (r.return = t));
    r.sibling = null;
  }
  return t.child;
}
function rS(e, t, r) {
  switch (t.tag) {
    case 3:
      (Vv(t), Jo());
      break;
    case 5:
      xv(t);
      break;
    case 1:
      Wt(t.type) && tl(t);
      break;
    case 4:
      mp(t, t.stateNode.containerInfo);
      break;
    case 10:
      var n = t.type._context,
        o = t.memoizedProps.value;
      (Ye(ol, n._currentValue), (n._currentValue = o));
      break;
    case 13:
      if (((n = t.memoizedState), n !== null))
        return n.dehydrated !== null
          ? (Ye(Ke, Ke.current & 1), (t.flags |= 128), null)
          : r & t.child.childLanes
            ? qv(e, t, r)
            : (Ye(Ke, Ke.current & 1),
              (e = on(e, t, r)),
              e !== null ? e.sibling : null);
      Ye(Ke, Ke.current & 1);
      break;
    case 19:
      if (((n = (r & t.childLanes) !== 0), e.flags & 128)) {
        if (n) return Qv(e, t, r);
        t.flags |= 128;
      }
      if (
        ((o = t.memoizedState),
        o !== null &&
          ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
        Ye(Ke, Ke.current),
        n)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((t.lanes = 0), Hv(e, t, r));
  }
  return on(e, t, r);
}
var Kv, Jc, Gv, Xv;
Kv = function (e, t) {
  for (var r = t.child; r !== null;) {
    if (r.tag === 5 || r.tag === 6) e.appendChild(r.stateNode);
    else if (r.tag !== 4 && r.child !== null) {
      ((r.child.return = r), (r = r.child));
      continue;
    }
    if (r === t) break;
    for (; r.sibling === null;) {
      if (r.return === null || r.return === t) return;
      r = r.return;
    }
    ((r.sibling.return = r.return), (r = r.sibling));
  }
};
Jc = function () {};
Gv = function (e, t, r, n) {
  var o = e.memoizedProps;
  if (o !== n) {
    ((e = t.stateNode), qn(Br.current));
    var a = null;
    switch (r) {
      case "input":
        ((o = xc(e, o)), (n = xc(e, n)), (a = []));
        break;
      case "select":
        ((o = Ze({}, o, { value: void 0 })),
          (n = Ze({}, n, { value: void 0 })),
          (a = []));
        break;
      case "textarea":
        ((o = kc(e, o)), (n = kc(e, n)), (a = []));
        break;
      default:
        typeof o.onClick != "function" &&
          typeof n.onClick == "function" &&
          (e.onclick = Zs);
    }
    _c(r, n);
    var i;
    r = null;
    for (u in o)
      if (!n.hasOwnProperty(u) && o.hasOwnProperty(u) && o[u] != null)
        if (u === "style") {
          var s = o[u];
          for (i in s) s.hasOwnProperty(i) && (r || (r = {}), (r[i] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            (ii.hasOwnProperty(u)
              ? a || (a = [])
              : (a = a || []).push(u, null));
    for (u in n) {
      var l = n[u];
      if (
        ((s = o != null ? o[u] : void 0),
        n.hasOwnProperty(u) && l !== s && (l != null || s != null))
      )
        if (u === "style")
          if (s) {
            for (i in s)
              !s.hasOwnProperty(i) ||
                (l && l.hasOwnProperty(i)) ||
                (r || (r = {}), (r[i] = ""));
            for (i in l)
              l.hasOwnProperty(i) &&
                s[i] !== l[i] &&
                (r || (r = {}), (r[i] = l[i]));
          } else (r || (a || (a = []), a.push(u, r)), (r = l));
        else
          u === "dangerouslySetInnerHTML"
            ? ((l = l ? l.__html : void 0),
              (s = s ? s.__html : void 0),
              l != null && s !== l && (a = a || []).push(u, l))
            : u === "children"
              ? (typeof l != "string" && typeof l != "number") ||
                (a = a || []).push(u, "" + l)
              : u !== "suppressContentEditableWarning" &&
                u !== "suppressHydrationWarning" &&
                (ii.hasOwnProperty(u)
                  ? (l != null && u === "onScroll" && He("scroll", e),
                    a || s === l || (a = []))
                  : (a = a || []).push(u, l));
    }
    r && (a = a || []).push("style", r);
    var u = a;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
Xv = function (e, t, r, n) {
  r !== n && (t.flags |= 4);
};
function Ra(e, t) {
  if (!qe)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var r = null; t !== null;)
          (t.alternate !== null && (r = t), (t = t.sibling));
        r === null ? (e.tail = null) : (r.sibling = null);
        break;
      case "collapsed":
        r = e.tail;
        for (var n = null; r !== null;)
          (r.alternate !== null && (n = r), (r = r.sibling));
        n === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (n.sibling = null);
    }
}
function bt(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    r = 0,
    n = 0;
  if (t)
    for (var o = e.child; o !== null;)
      ((r |= o.lanes | o.childLanes),
        (n |= o.subtreeFlags & 14680064),
        (n |= o.flags & 14680064),
        (o.return = e),
        (o = o.sibling));
  else
    for (o = e.child; o !== null;)
      ((r |= o.lanes | o.childLanes),
        (n |= o.subtreeFlags),
        (n |= o.flags),
        (o.return = e),
        (o = o.sibling));
  return ((e.subtreeFlags |= n), (e.childLanes = r), t);
}
function nS(e, t, r) {
  var n = t.pendingProps;
  switch ((lp(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (bt(t), null);
    case 1:
      return (Wt(t.type) && el(), bt(t), null);
    case 3:
      return (
        (n = t.stateNode),
        ea(),
        We(Ht),
        We(Nt),
        vp(),
        n.pendingContext &&
          ((n.context = n.pendingContext), (n.pendingContext = null)),
        (e === null || e.child === null) &&
          (os(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Sr !== null && (id(Sr), (Sr = null)))),
        Jc(e, t),
        bt(t),
        null
      );
    case 5:
      gp(t);
      var o = qn(yi.current);
      if (((r = t.type), e !== null && t.stateNode != null))
        (Gv(e, t, r, n, o),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
      else {
        if (!n) {
          if (t.stateNode === null) throw Error(Y(166));
          return (bt(t), null);
        }
        if (((e = qn(Br.current)), os(t))) {
          ((n = t.stateNode), (r = t.type));
          var a = t.memoizedProps;
          switch (((n[Ir] = t), (n[gi] = a), (e = (t.mode & 1) !== 0), r)) {
            case "dialog":
              (He("cancel", n), He("close", n));
              break;
            case "iframe":
            case "object":
            case "embed":
              He("load", n);
              break;
            case "video":
            case "audio":
              for (o = 0; o < Ya.length; o++) He(Ya[o], n);
              break;
            case "source":
              He("error", n);
              break;
            case "img":
            case "image":
            case "link":
              (He("error", n), He("load", n));
              break;
            case "details":
              He("toggle", n);
              break;
            case "input":
              (bf(n, a), He("invalid", n));
              break;
            case "select":
              ((n._wrapperState = { wasMultiple: !!a.multiple }),
                He("invalid", n));
              break;
            case "textarea":
              (Tf(n, a), He("invalid", n));
          }
          (_c(r, a), (o = null));
          for (var i in a)
            if (a.hasOwnProperty(i)) {
              var s = a[i];
              i === "children"
                ? typeof s == "string"
                  ? n.textContent !== s &&
                    (a.suppressHydrationWarning !== !0 &&
                      ns(n.textContent, s, e),
                    (o = ["children", s]))
                  : typeof s == "number" &&
                    n.textContent !== "" + s &&
                    (a.suppressHydrationWarning !== !0 &&
                      ns(n.textContent, s, e),
                    (o = ["children", "" + s]))
                : ii.hasOwnProperty(i) &&
                  s != null &&
                  i === "onScroll" &&
                  He("scroll", n);
            }
          switch (r) {
            case "input":
              (Ki(n), Df(n, a, !0));
              break;
            case "textarea":
              (Ki(n), Pf(n));
              break;
            case "select":
            case "option":
              break;
            default:
              typeof a.onClick == "function" && (n.onclick = Zs);
          }
          ((n = o), (t.updateQueue = n), n !== null && (t.flags |= 4));
        } else {
          ((i = o.nodeType === 9 ? o : o.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = _g(r)),
            e === "http://www.w3.org/1999/xhtml"
              ? r === "script"
                ? ((e = i.createElement("div")),
                  (e.innerHTML = "<script><\/script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof n.is == "string"
                  ? (e = i.createElement(r, { is: n.is }))
                  : ((e = i.createElement(r)),
                    r === "select" &&
                      ((i = e),
                      n.multiple
                        ? (i.multiple = !0)
                        : n.size && (i.size = n.size)))
              : (e = i.createElementNS(e, r)),
            (e[Ir] = t),
            (e[gi] = n),
            Kv(e, t, !1, !1),
            (t.stateNode = e));
          e: {
            switch (((i = bc(r, n)), r)) {
              case "dialog":
                (He("cancel", e), He("close", e), (o = n));
                break;
              case "iframe":
              case "object":
              case "embed":
                (He("load", e), (o = n));
                break;
              case "video":
              case "audio":
                for (o = 0; o < Ya.length; o++) He(Ya[o], e);
                o = n;
                break;
              case "source":
                (He("error", e), (o = n));
                break;
              case "img":
              case "image":
              case "link":
                (He("error", e), He("load", e), (o = n));
                break;
              case "details":
                (He("toggle", e), (o = n));
                break;
              case "input":
                (bf(e, n), (o = xc(e, n)), He("invalid", e));
                break;
              case "option":
                o = n;
                break;
              case "select":
                ((e._wrapperState = { wasMultiple: !!n.multiple }),
                  (o = Ze({}, n, { value: void 0 })),
                  He("invalid", e));
                break;
              case "textarea":
                (Tf(e, n), (o = kc(e, n)), He("invalid", e));
                break;
              default:
                o = n;
            }
            (_c(r, o), (s = o));
            for (a in s)
              if (s.hasOwnProperty(a)) {
                var l = s[a];
                a === "style"
                  ? Tg(e, l)
                  : a === "dangerouslySetInnerHTML"
                    ? ((l = l ? l.__html : void 0), l != null && bg(e, l))
                    : a === "children"
                      ? typeof l == "string"
                        ? (r !== "textarea" || l !== "") && si(e, l)
                        : typeof l == "number" && si(e, "" + l)
                      : a !== "suppressContentEditableWarning" &&
                        a !== "suppressHydrationWarning" &&
                        a !== "autoFocus" &&
                        (ii.hasOwnProperty(a)
                          ? l != null && a === "onScroll" && He("scroll", e)
                          : l != null && qd(e, a, l, i));
              }
            switch (r) {
              case "input":
                (Ki(e), Df(e, n, !1));
                break;
              case "textarea":
                (Ki(e), Pf(e));
                break;
              case "option":
                n.value != null && e.setAttribute("value", "" + Mn(n.value));
                break;
              case "select":
                ((e.multiple = !!n.multiple),
                  (a = n.value),
                  a != null
                    ? $o(e, !!n.multiple, a, !1)
                    : n.defaultValue != null &&
                      $o(e, !!n.multiple, n.defaultValue, !0));
                break;
              default:
                typeof o.onClick == "function" && (e.onclick = Zs);
            }
            switch (r) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                n = !!n.autoFocus;
                break e;
              case "img":
                n = !0;
                break e;
              default:
                n = !1;
            }
          }
          n && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return (bt(t), null);
    case 6:
      if (e && t.stateNode != null) Xv(e, t, e.memoizedProps, n);
      else {
        if (typeof n != "string" && t.stateNode === null) throw Error(Y(166));
        if (((r = qn(yi.current)), qn(Br.current), os(t))) {
          if (
            ((n = t.stateNode),
            (r = t.memoizedProps),
            (n[Ir] = t),
            (a = n.nodeValue !== r) && ((e = Jt), e !== null))
          )
            switch (e.tag) {
              case 3:
                ns(n.nodeValue, r, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  ns(n.nodeValue, r, (e.mode & 1) !== 0);
            }
          a && (t.flags |= 4);
        } else
          ((n = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(n)),
            (n[Ir] = t),
            (t.stateNode = n));
      }
      return (bt(t), null);
    case 13:
      if (
        (We(Ke),
        (n = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (qe && Xt !== null && t.mode & 1 && !(t.flags & 128))
          (mv(), Jo(), (t.flags |= 98560), (a = !1));
        else if (((a = os(t)), n !== null && n.dehydrated !== null)) {
          if (e === null) {
            if (!a) throw Error(Y(318));
            if (
              ((a = t.memoizedState),
              (a = a !== null ? a.dehydrated : null),
              !a)
            )
              throw Error(Y(317));
            a[Ir] = t;
          } else
            (Jo(),
              !(t.flags & 128) && (t.memoizedState = null),
              (t.flags |= 4));
          (bt(t), (a = !1));
        } else (Sr !== null && (id(Sr), (Sr = null)), (a = !0));
        if (!a) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = r), t)
        : ((n = n !== null),
          n !== (e !== null && e.memoizedState !== null) &&
            n &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || Ke.current & 1 ? pt === 0 && (pt = 3) : Pp())),
          t.updateQueue !== null && (t.flags |= 4),
          bt(t),
          null);
    case 4:
      return (
        ea(),
        Jc(e, t),
        e === null && hi(t.stateNode.containerInfo),
        bt(t),
        null
      );
    case 10:
      return (pp(t.type._context), bt(t), null);
    case 17:
      return (Wt(t.type) && el(), bt(t), null);
    case 19:
      if ((We(Ke), (a = t.memoizedState), a === null)) return (bt(t), null);
      if (((n = (t.flags & 128) !== 0), (i = a.rendering), i === null))
        if (n) Ra(a, !1);
        else {
          if (pt !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null;) {
              if (((i = sl(e)), i !== null)) {
                for (
                  t.flags |= 128,
                    Ra(a, !1),
                    n = i.updateQueue,
                    n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    n = r,
                    r = t.child;
                  r !== null;
                )
                  ((a = r),
                    (e = n),
                    (a.flags &= 14680066),
                    (i = a.alternate),
                    i === null
                      ? ((a.childLanes = 0),
                        (a.lanes = e),
                        (a.child = null),
                        (a.subtreeFlags = 0),
                        (a.memoizedProps = null),
                        (a.memoizedState = null),
                        (a.updateQueue = null),
                        (a.dependencies = null),
                        (a.stateNode = null))
                      : ((a.childLanes = i.childLanes),
                        (a.lanes = i.lanes),
                        (a.child = i.child),
                        (a.subtreeFlags = 0),
                        (a.deletions = null),
                        (a.memoizedProps = i.memoizedProps),
                        (a.memoizedState = i.memoizedState),
                        (a.updateQueue = i.updateQueue),
                        (a.type = i.type),
                        (e = i.dependencies),
                        (a.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (r = r.sibling));
                return (Ye(Ke, (Ke.current & 1) | 2), t.child);
              }
              e = e.sibling;
            }
          a.tail !== null &&
            at() > ra &&
            ((t.flags |= 128), (n = !0), Ra(a, !1), (t.lanes = 4194304));
        }
      else {
        if (!n)
          if (((e = sl(i)), e !== null)) {
            if (
              ((t.flags |= 128),
              (n = !0),
              (r = e.updateQueue),
              r !== null && ((t.updateQueue = r), (t.flags |= 4)),
              Ra(a, !0),
              a.tail === null && a.tailMode === "hidden" && !i.alternate && !qe)
            )
              return (bt(t), null);
          } else
            2 * at() - a.renderingStartTime > ra &&
              r !== 1073741824 &&
              ((t.flags |= 128), (n = !0), Ra(a, !1), (t.lanes = 4194304));
        a.isBackwards
          ? ((i.sibling = t.child), (t.child = i))
          : ((r = a.last),
            r !== null ? (r.sibling = i) : (t.child = i),
            (a.last = i));
      }
      return a.tail !== null
        ? ((t = a.tail),
          (a.rendering = t),
          (a.tail = t.sibling),
          (a.renderingStartTime = at()),
          (t.sibling = null),
          (r = Ke.current),
          Ye(Ke, n ? (r & 1) | 2 : r & 1),
          t)
        : (bt(t), null);
    case 22:
    case 23:
      return (
        Tp(),
        (n = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== n && (t.flags |= 8192),
        n && t.mode & 1
          ? Gt & 1073741824 && (bt(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : bt(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(Y(156, t.tag));
}
function oS(e, t) {
  switch ((lp(t), t.tag)) {
    case 1:
      return (
        Wt(t.type) && el(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        ea(),
        We(Ht),
        We(Nt),
        vp(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return (gp(t), null);
    case 13:
      if (
        (We(Ke), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(Y(340));
        Jo();
      }
      return (
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return (We(Ke), null);
    case 4:
      return (ea(), null);
    case 10:
      return (pp(t.type._context), null);
    case 22:
    case 23:
      return (Tp(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var ss = !1,
  Pt = !1,
  aS = typeof WeakSet == "function" ? WeakSet : Set,
  ee = null;
function Ao(e, t) {
  var r = e.ref;
  if (r !== null)
    if (typeof r == "function")
      try {
        r(null);
      } catch (n) {
        nt(e, t, n);
      }
    else r.current = null;
}
function Zc(e, t, r) {
  try {
    r();
  } catch (n) {
    nt(e, t, n);
  }
}
var yh = !1;
function iS(e, t) {
  if (((Lc = Gs), (e = rv()), ip(e))) {
    if ("selectionStart" in e)
      var r = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        r = ((r = e.ownerDocument) && r.defaultView) || window;
        var n = r.getSelection && r.getSelection();
        if (n && n.rangeCount !== 0) {
          r = n.anchorNode;
          var o = n.anchorOffset,
            a = n.focusNode;
          n = n.focusOffset;
          try {
            (r.nodeType, a.nodeType);
          } catch {
            r = null;
            break e;
          }
          var i = 0,
            s = -1,
            l = -1,
            u = 0,
            c = 0,
            d = e,
            m = null;
          t: for (;;) {
            for (
              var v;
              d !== r || (o !== 0 && d.nodeType !== 3) || (s = i + o),
                d !== a || (n !== 0 && d.nodeType !== 3) || (l = i + n),
                d.nodeType === 3 && (i += d.nodeValue.length),
                (v = d.firstChild) !== null;
            )
              ((m = d), (d = v));
            for (;;) {
              if (d === e) break t;
              if (
                (m === r && ++u === o && (s = i),
                m === a && ++c === n && (l = i),
                (v = d.nextSibling) !== null)
              )
                break;
              ((d = m), (m = d.parentNode));
            }
            d = v;
          }
          r = s === -1 || l === -1 ? null : { start: s, end: l };
        } else r = null;
      }
    r = r || { start: 0, end: 0 };
  } else r = null;
  for (
    Ac = { focusedElem: e, selectionRange: r }, Gs = !1, ee = t;
    ee !== null;
  )
    if (((t = ee), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      ((e.return = t), (ee = e));
    else
      for (; ee !== null;) {
        t = ee;
        try {
          var S = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (S !== null) {
                  var C = S.memoizedProps,
                    k = S.memoizedState,
                    g = t.stateNode,
                    y = g.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? C : wr(t.type, C),
                      k,
                    );
                  g.__reactInternalSnapshotBeforeUpdate = y;
                }
                break;
              case 3:
                var w = t.stateNode.containerInfo;
                w.nodeType === 1
                  ? (w.textContent = "")
                  : w.nodeType === 9 &&
                    w.documentElement &&
                    w.removeChild(w.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(Y(163));
            }
        } catch (T) {
          nt(t, t.return, T);
        }
        if (((e = t.sibling), e !== null)) {
          ((e.return = t.return), (ee = e));
          break;
        }
        ee = t.return;
      }
  return ((S = yh), (yh = !1), S);
}
function Xa(e, t, r) {
  var n = t.updateQueue;
  if (((n = n !== null ? n.lastEffect : null), n !== null)) {
    var o = (n = n.next);
    do {
      if ((o.tag & e) === e) {
        var a = o.destroy;
        ((o.destroy = void 0), a !== void 0 && Zc(t, r, a));
      }
      o = o.next;
    } while (o !== n);
  }
}
function ql(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var r = (t = t.next);
    do {
      if ((r.tag & e) === e) {
        var n = r.create;
        r.destroy = n();
      }
      r = r.next;
    } while (r !== t);
  }
}
function ed(e) {
  var t = e.ref;
  if (t !== null) {
    var r = e.stateNode;
    switch (e.tag) {
      case 5:
        e = r;
        break;
      default:
        e = r;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function Jv(e) {
  var t = e.alternate;
  (t !== null && ((e.alternate = null), Jv(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Ir], delete t[gi], delete t[Uc], delete t[Y1], delete t[z1])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null));
}
function Zv(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function wh(e) {
  e: for (;;) {
    for (; e.sibling === null;) {
      if (e.return === null || Zv(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      ((e.child.return = e), (e = e.child));
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function td(e, t, r) {
  var n = e.tag;
  if (n === 5 || n === 6)
    ((e = e.stateNode),
      t
        ? r.nodeType === 8
          ? r.parentNode.insertBefore(e, t)
          : r.insertBefore(e, t)
        : (r.nodeType === 8
            ? ((t = r.parentNode), t.insertBefore(e, r))
            : ((t = r), t.appendChild(e)),
          (r = r._reactRootContainer),
          r != null || t.onclick !== null || (t.onclick = Zs)));
  else if (n !== 4 && ((e = e.child), e !== null))
    for (td(e, t, r), e = e.sibling; e !== null;)
      (td(e, t, r), (e = e.sibling));
}
function rd(e, t, r) {
  var n = e.tag;
  if (n === 5 || n === 6)
    ((e = e.stateNode), t ? r.insertBefore(e, t) : r.appendChild(e));
  else if (n !== 4 && ((e = e.child), e !== null))
    for (rd(e, t, r), e = e.sibling; e !== null;)
      (rd(e, t, r), (e = e.sibling));
}
var wt = null,
  xr = !1;
function dn(e, t, r) {
  for (r = r.child; r !== null;) (ey(e, t, r), (r = r.sibling));
}
function ey(e, t, r) {
  if (Fr && typeof Fr.onCommitFiberUnmount == "function")
    try {
      Fr.onCommitFiberUnmount(Bl, r);
    } catch {}
  switch (r.tag) {
    case 5:
      Pt || Ao(r, t);
    case 6:
      var n = wt,
        o = xr;
      ((wt = null),
        dn(e, t, r),
        (wt = n),
        (xr = o),
        wt !== null &&
          (xr
            ? ((e = wt),
              (r = r.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(r) : e.removeChild(r))
            : wt.removeChild(r.stateNode)));
      break;
    case 18:
      wt !== null &&
        (xr
          ? ((e = wt),
            (r = r.stateNode),
            e.nodeType === 8
              ? Mu(e.parentNode, r)
              : e.nodeType === 1 && Mu(e, r),
            di(e))
          : Mu(wt, r.stateNode));
      break;
    case 4:
      ((n = wt),
        (o = xr),
        (wt = r.stateNode.containerInfo),
        (xr = !0),
        dn(e, t, r),
        (wt = n),
        (xr = o));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !Pt &&
        ((n = r.updateQueue), n !== null && ((n = n.lastEffect), n !== null))
      ) {
        o = n = n.next;
        do {
          var a = o,
            i = a.destroy;
          ((a = a.tag),
            i !== void 0 && (a & 2 || a & 4) && Zc(r, t, i),
            (o = o.next));
        } while (o !== n);
      }
      dn(e, t, r);
      break;
    case 1:
      if (
        !Pt &&
        (Ao(r, t),
        (n = r.stateNode),
        typeof n.componentWillUnmount == "function")
      )
        try {
          ((n.props = r.memoizedProps),
            (n.state = r.memoizedState),
            n.componentWillUnmount());
        } catch (s) {
          nt(r, t, s);
        }
      dn(e, t, r);
      break;
    case 21:
      dn(e, t, r);
      break;
    case 22:
      r.mode & 1
        ? ((Pt = (n = Pt) || r.memoizedState !== null), dn(e, t, r), (Pt = n))
        : dn(e, t, r);
      break;
    default:
      dn(e, t, r);
  }
}
function xh(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var r = e.stateNode;
    (r === null && (r = e.stateNode = new aS()),
      t.forEach(function (n) {
        var o = mS.bind(null, e, n);
        r.has(n) || (r.add(n), n.then(o, o));
      }));
  }
}
function yr(e, t) {
  var r = t.deletions;
  if (r !== null)
    for (var n = 0; n < r.length; n++) {
      var o = r[n];
      try {
        var a = e,
          i = t,
          s = i;
        e: for (; s !== null;) {
          switch (s.tag) {
            case 5:
              ((wt = s.stateNode), (xr = !1));
              break e;
            case 3:
              ((wt = s.stateNode.containerInfo), (xr = !0));
              break e;
            case 4:
              ((wt = s.stateNode.containerInfo), (xr = !0));
              break e;
          }
          s = s.return;
        }
        if (wt === null) throw Error(Y(160));
        (ey(a, i, o), (wt = null), (xr = !1));
        var l = o.alternate;
        (l !== null && (l.return = null), (o.return = null));
      } catch (u) {
        nt(o, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null;) (ty(t, e), (t = t.sibling));
}
function ty(e, t) {
  var r = e.alternate,
    n = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((yr(t, e), Pr(e), n & 4)) {
        try {
          (Xa(3, e, e.return), ql(3, e));
        } catch (C) {
          nt(e, e.return, C);
        }
        try {
          Xa(5, e, e.return);
        } catch (C) {
          nt(e, e.return, C);
        }
      }
      break;
    case 1:
      (yr(t, e), Pr(e), n & 512 && r !== null && Ao(r, r.return));
      break;
    case 5:
      if (
        (yr(t, e),
        Pr(e),
        n & 512 && r !== null && Ao(r, r.return),
        e.flags & 32)
      ) {
        var o = e.stateNode;
        try {
          si(o, "");
        } catch (C) {
          nt(e, e.return, C);
        }
      }
      if (n & 4 && ((o = e.stateNode), o != null)) {
        var a = e.memoizedProps,
          i = r !== null ? r.memoizedProps : a,
          s = e.type,
          l = e.updateQueue;
        if (((e.updateQueue = null), l !== null))
          try {
            (s === "input" && a.type === "radio" && a.name != null && kg(o, a),
              bc(s, i));
            var u = bc(s, a);
            for (i = 0; i < l.length; i += 2) {
              var c = l[i],
                d = l[i + 1];
              c === "style"
                ? Tg(o, d)
                : c === "dangerouslySetInnerHTML"
                  ? bg(o, d)
                  : c === "children"
                    ? si(o, d)
                    : qd(o, c, d, u);
            }
            switch (s) {
              case "input":
                Sc(o, a);
                break;
              case "textarea":
                Eg(o, a);
                break;
              case "select":
                var m = o._wrapperState.wasMultiple;
                o._wrapperState.wasMultiple = !!a.multiple;
                var v = a.value;
                v != null
                  ? $o(o, !!a.multiple, v, !1)
                  : m !== !!a.multiple &&
                    (a.defaultValue != null
                      ? $o(o, !!a.multiple, a.defaultValue, !0)
                      : $o(o, !!a.multiple, a.multiple ? [] : "", !1));
            }
            o[gi] = a;
          } catch (C) {
            nt(e, e.return, C);
          }
      }
      break;
    case 6:
      if ((yr(t, e), Pr(e), n & 4)) {
        if (e.stateNode === null) throw Error(Y(162));
        ((o = e.stateNode), (a = e.memoizedProps));
        try {
          o.nodeValue = a;
        } catch (C) {
          nt(e, e.return, C);
        }
      }
      break;
    case 3:
      if (
        (yr(t, e), Pr(e), n & 4 && r !== null && r.memoizedState.isDehydrated)
      )
        try {
          di(t.containerInfo);
        } catch (C) {
          nt(e, e.return, C);
        }
      break;
    case 4:
      (yr(t, e), Pr(e));
      break;
    case 13:
      (yr(t, e),
        Pr(e),
        (o = e.child),
        o.flags & 8192 &&
          ((a = o.memoizedState !== null),
          (o.stateNode.isHidden = a),
          !a ||
            (o.alternate !== null && o.alternate.memoizedState !== null) ||
            (bp = at())),
        n & 4 && xh(e));
      break;
    case 22:
      if (
        ((c = r !== null && r.memoizedState !== null),
        e.mode & 1 ? ((Pt = (u = Pt) || c), yr(t, e), (Pt = u)) : yr(t, e),
        Pr(e),
        n & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !c && e.mode & 1)
        )
          for (ee = e, c = e.child; c !== null;) {
            for (d = ee = c; ee !== null;) {
              switch (((m = ee), (v = m.child), m.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Xa(4, m, m.return);
                  break;
                case 1:
                  Ao(m, m.return);
                  var S = m.stateNode;
                  if (typeof S.componentWillUnmount == "function") {
                    ((n = m), (r = m.return));
                    try {
                      ((t = n),
                        (S.props = t.memoizedProps),
                        (S.state = t.memoizedState),
                        S.componentWillUnmount());
                    } catch (C) {
                      nt(n, r, C);
                    }
                  }
                  break;
                case 5:
                  Ao(m, m.return);
                  break;
                case 22:
                  if (m.memoizedState !== null) {
                    Ch(d);
                    continue;
                  }
              }
              v !== null ? ((v.return = m), (ee = v)) : Ch(d);
            }
            c = c.sibling;
          }
        e: for (c = null, d = e; ;) {
          if (d.tag === 5) {
            if (c === null) {
              c = d;
              try {
                ((o = d.stateNode),
                  u
                    ? ((a = o.style),
                      typeof a.setProperty == "function"
                        ? a.setProperty("display", "none", "important")
                        : (a.display = "none"))
                    : ((s = d.stateNode),
                      (l = d.memoizedProps.style),
                      (i =
                        l != null && l.hasOwnProperty("display")
                          ? l.display
                          : null),
                      (s.style.display = Dg("display", i))));
              } catch (C) {
                nt(e, e.return, C);
              }
            }
          } else if (d.tag === 6) {
            if (c === null)
              try {
                d.stateNode.nodeValue = u ? "" : d.memoizedProps;
              } catch (C) {
                nt(e, e.return, C);
              }
          } else if (
            ((d.tag !== 22 && d.tag !== 23) ||
              d.memoizedState === null ||
              d === e) &&
            d.child !== null
          ) {
            ((d.child.return = d), (d = d.child));
            continue;
          }
          if (d === e) break e;
          for (; d.sibling === null;) {
            if (d.return === null || d.return === e) break e;
            (c === d && (c = null), (d = d.return));
          }
          (c === d && (c = null),
            (d.sibling.return = d.return),
            (d = d.sibling));
        }
      }
      break;
    case 19:
      (yr(t, e), Pr(e), n & 4 && xh(e));
      break;
    case 21:
      break;
    default:
      (yr(t, e), Pr(e));
  }
}
function Pr(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var r = e.return; r !== null;) {
          if (Zv(r)) {
            var n = r;
            break e;
          }
          r = r.return;
        }
        throw Error(Y(160));
      }
      switch (n.tag) {
        case 5:
          var o = n.stateNode;
          n.flags & 32 && (si(o, ""), (n.flags &= -33));
          var a = wh(e);
          rd(e, a, o);
          break;
        case 3:
        case 4:
          var i = n.stateNode.containerInfo,
            s = wh(e);
          td(e, s, i);
          break;
        default:
          throw Error(Y(161));
      }
    } catch (l) {
      nt(e, e.return, l);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function sS(e, t, r) {
  ((ee = e), ry(e));
}
function ry(e, t, r) {
  for (var n = (e.mode & 1) !== 0; ee !== null;) {
    var o = ee,
      a = o.child;
    if (o.tag === 22 && n) {
      var i = o.memoizedState !== null || ss;
      if (!i) {
        var s = o.alternate,
          l = (s !== null && s.memoizedState !== null) || Pt;
        s = ss;
        var u = Pt;
        if (((ss = i), (Pt = l) && !u))
          for (ee = o; ee !== null;)
            ((i = ee),
              (l = i.child),
              i.tag === 22 && i.memoizedState !== null
                ? kh(o)
                : l !== null
                  ? ((l.return = i), (ee = l))
                  : kh(o));
        for (; a !== null;) ((ee = a), ry(a), (a = a.sibling));
        ((ee = o), (ss = s), (Pt = u));
      }
      Sh(e);
    } else
      o.subtreeFlags & 8772 && a !== null ? ((a.return = o), (ee = a)) : Sh(e);
  }
}
function Sh(e) {
  for (; ee !== null;) {
    var t = ee;
    if (t.flags & 8772) {
      var r = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Pt || ql(5, t);
              break;
            case 1:
              var n = t.stateNode;
              if (t.flags & 4 && !Pt)
                if (r === null) n.componentDidMount();
                else {
                  var o =
                    t.elementType === t.type
                      ? r.memoizedProps
                      : wr(t.type, r.memoizedProps);
                  n.componentDidUpdate(
                    o,
                    r.memoizedState,
                    n.__reactInternalSnapshotBeforeUpdate,
                  );
                }
              var a = t.updateQueue;
              a !== null && ah(t, a, n);
              break;
            case 3:
              var i = t.updateQueue;
              if (i !== null) {
                if (((r = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      r = t.child.stateNode;
                      break;
                    case 1:
                      r = t.child.stateNode;
                  }
                ah(t, i, r);
              }
              break;
            case 5:
              var s = t.stateNode;
              if (r === null && t.flags & 4) {
                r = s;
                var l = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    l.autoFocus && r.focus();
                    break;
                  case "img":
                    l.src && (r.src = l.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var c = u.memoizedState;
                  if (c !== null) {
                    var d = c.dehydrated;
                    d !== null && di(d);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(Y(163));
          }
        Pt || (t.flags & 512 && ed(t));
      } catch (m) {
        nt(t, t.return, m);
      }
    }
    if (t === e) {
      ee = null;
      break;
    }
    if (((r = t.sibling), r !== null)) {
      ((r.return = t.return), (ee = r));
      break;
    }
    ee = t.return;
  }
}
function Ch(e) {
  for (; ee !== null;) {
    var t = ee;
    if (t === e) {
      ee = null;
      break;
    }
    var r = t.sibling;
    if (r !== null) {
      ((r.return = t.return), (ee = r));
      break;
    }
    ee = t.return;
  }
}
function kh(e) {
  for (; ee !== null;) {
    var t = ee;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var r = t.return;
          try {
            ql(4, t);
          } catch (l) {
            nt(t, r, l);
          }
          break;
        case 1:
          var n = t.stateNode;
          if (typeof n.componentDidMount == "function") {
            var o = t.return;
            try {
              n.componentDidMount();
            } catch (l) {
              nt(t, o, l);
            }
          }
          var a = t.return;
          try {
            ed(t);
          } catch (l) {
            nt(t, a, l);
          }
          break;
        case 5:
          var i = t.return;
          try {
            ed(t);
          } catch (l) {
            nt(t, i, l);
          }
      }
    } catch (l) {
      nt(t, t.return, l);
    }
    if (t === e) {
      ee = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      ((s.return = t.return), (ee = s));
      break;
    }
    ee = t.return;
  }
}
var lS = Math.ceil,
  cl = ln.ReactCurrentDispatcher,
  Ep = ln.ReactCurrentOwner,
  ur = ln.ReactCurrentBatchConfig,
  Pe = 0,
  ht = null,
  ct = null,
  St = 0,
  Gt = 0,
  Fo = An(0),
  pt = 0,
  Ci = null,
  io = 0,
  Ql = 0,
  _p = 0,
  Ja = null,
  Yt = null,
  bp = 0,
  ra = 1 / 0,
  Qr = null,
  dl = !1,
  nd = null,
  Tn = null,
  ls = !1,
  wn = null,
  pl = 0,
  Za = 0,
  od = null,
  Es = -1,
  _s = 0;
function At() {
  return Pe & 6 ? at() : Es !== -1 ? Es : (Es = at());
}
function Pn(e) {
  return e.mode & 1
    ? Pe & 2 && St !== 0
      ? St & -St
      : W1.transition !== null
        ? (_s === 0 && (_s = Ug()), _s)
        : ((e = Le),
          e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : qg(e.type))),
          e)
    : 1;
}
function Er(e, t, r, n) {
  if (50 < Za) throw ((Za = 0), (od = null), Error(Y(185)));
  (Mi(e, r, n),
    (!(Pe & 2) || e !== ht) &&
      (e === ht && (!(Pe & 2) && (Ql |= r), pt === 4 && vn(e, St)),
      Vt(e, n),
      r === 1 && Pe === 0 && !(t.mode & 1) && ((ra = at() + 500), Hl && Fn())));
}
function Vt(e, t) {
  var r = e.callbackNode;
  Wx(e, t);
  var n = Ks(e, e === ht ? St : 0);
  if (n === 0)
    (r !== null && Nf(r), (e.callbackNode = null), (e.callbackPriority = 0));
  else if (((t = n & -n), e.callbackPriority !== t)) {
    if ((r != null && Nf(r), t === 1))
      (e.tag === 0 ? H1(Eh.bind(null, e)) : pv(Eh.bind(null, e)),
        U1(function () {
          !(Pe & 6) && Fn();
        }),
        (r = null));
    else {
      switch ($g(n)) {
        case 1:
          r = Jd;
          break;
        case 4:
          r = Fg;
          break;
        case 16:
          r = Qs;
          break;
        case 536870912:
          r = Bg;
          break;
        default:
          r = Qs;
      }
      r = cy(r, ny.bind(null, e));
    }
    ((e.callbackPriority = t), (e.callbackNode = r));
  }
}
function ny(e, t) {
  if (((Es = -1), (_s = 0), Pe & 6)) throw Error(Y(327));
  var r = e.callbackNode;
  if (Vo() && e.callbackNode !== r) return null;
  var n = Ks(e, e === ht ? St : 0);
  if (n === 0) return null;
  if (n & 30 || n & e.expiredLanes || t) t = fl(e, n);
  else {
    t = n;
    var o = Pe;
    Pe |= 2;
    var a = ay();
    (ht !== e || St !== t) && ((Qr = null), (ra = at() + 500), Xn(e, t));
    do
      try {
        dS();
        break;
      } catch (s) {
        oy(e, s);
      }
    while (!0);
    (dp(),
      (cl.current = a),
      (Pe = o),
      ct !== null ? (t = 0) : ((ht = null), (St = 0), (t = pt)));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((o = Oc(e)), o !== 0 && ((n = o), (t = ad(e, o)))), t === 1)
    )
      throw ((r = Ci), Xn(e, 0), vn(e, n), Vt(e, at()), r);
    if (t === 6) vn(e, n);
    else {
      if (
        ((o = e.current.alternate),
        !(n & 30) &&
          !uS(o) &&
          ((t = fl(e, n)),
          t === 2 && ((a = Oc(e)), a !== 0 && ((n = a), (t = ad(e, a)))),
          t === 1))
      )
        throw ((r = Ci), Xn(e, 0), vn(e, n), Vt(e, at()), r);
      switch (((e.finishedWork = o), (e.finishedLanes = n), t)) {
        case 0:
        case 1:
          throw Error(Y(345));
        case 2:
          Yn(e, Yt, Qr);
          break;
        case 3:
          if (
            (vn(e, n), (n & 130023424) === n && ((t = bp + 500 - at()), 10 < t))
          ) {
            if (Ks(e, 0) !== 0) break;
            if (((o = e.suspendedLanes), (o & n) !== n)) {
              (At(), (e.pingedLanes |= e.suspendedLanes & o));
              break;
            }
            e.timeoutHandle = Bc(Yn.bind(null, e, Yt, Qr), t);
            break;
          }
          Yn(e, Yt, Qr);
          break;
        case 4:
          if ((vn(e, n), (n & 4194240) === n)) break;
          for (t = e.eventTimes, o = -1; 0 < n;) {
            var i = 31 - kr(n);
            ((a = 1 << i), (i = t[i]), i > o && (o = i), (n &= ~a));
          }
          if (
            ((n = o),
            (n = at() - n),
            (n =
              (120 > n
                ? 120
                : 480 > n
                  ? 480
                  : 1080 > n
                    ? 1080
                    : 1920 > n
                      ? 1920
                      : 3e3 > n
                        ? 3e3
                        : 4320 > n
                          ? 4320
                          : 1960 * lS(n / 1960)) - n),
            10 < n)
          ) {
            e.timeoutHandle = Bc(Yn.bind(null, e, Yt, Qr), n);
            break;
          }
          Yn(e, Yt, Qr);
          break;
        case 5:
          Yn(e, Yt, Qr);
          break;
        default:
          throw Error(Y(329));
      }
    }
  }
  return (Vt(e, at()), e.callbackNode === r ? ny.bind(null, e) : null);
}
function ad(e, t) {
  var r = Ja;
  return (
    e.current.memoizedState.isDehydrated && (Xn(e, t).flags |= 256),
    (e = fl(e, t)),
    e !== 2 && ((t = Yt), (Yt = r), t !== null && id(t)),
    e
  );
}
function id(e) {
  Yt === null ? (Yt = e) : Yt.push.apply(Yt, e);
}
function uS(e) {
  for (var t = e; ;) {
    if (t.flags & 16384) {
      var r = t.updateQueue;
      if (r !== null && ((r = r.stores), r !== null))
        for (var n = 0; n < r.length; n++) {
          var o = r[n],
            a = o.getSnapshot;
          o = o.value;
          try {
            if (!br(a(), o)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((r = t.child), t.subtreeFlags & 16384 && r !== null))
      ((r.return = t), (t = r));
    else {
      if (t === e) break;
      for (; t.sibling === null;) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
  }
  return !0;
}
function vn(e, t) {
  for (
    t &= ~_p,
      t &= ~Ql,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;
  ) {
    var r = 31 - kr(t),
      n = 1 << r;
    ((e[r] = -1), (t &= ~n));
  }
}
function Eh(e) {
  if (Pe & 6) throw Error(Y(327));
  Vo();
  var t = Ks(e, 0);
  if (!(t & 1)) return (Vt(e, at()), null);
  var r = fl(e, t);
  if (e.tag !== 0 && r === 2) {
    var n = Oc(e);
    n !== 0 && ((t = n), (r = ad(e, n)));
  }
  if (r === 1) throw ((r = Ci), Xn(e, 0), vn(e, t), Vt(e, at()), r);
  if (r === 6) throw Error(Y(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    Yn(e, Yt, Qr),
    Vt(e, at()),
    null
  );
}
function Dp(e, t) {
  var r = Pe;
  Pe |= 1;
  try {
    return e(t);
  } finally {
    ((Pe = r), Pe === 0 && ((ra = at() + 500), Hl && Fn()));
  }
}
function so(e) {
  wn !== null && wn.tag === 0 && !(Pe & 6) && Vo();
  var t = Pe;
  Pe |= 1;
  var r = ur.transition,
    n = Le;
  try {
    if (((ur.transition = null), (Le = 1), e)) return e();
  } finally {
    ((Le = n), (ur.transition = r), (Pe = t), !(Pe & 6) && Fn());
  }
}
function Tp() {
  ((Gt = Fo.current), We(Fo));
}
function Xn(e, t) {
  ((e.finishedWork = null), (e.finishedLanes = 0));
  var r = e.timeoutHandle;
  if ((r !== -1 && ((e.timeoutHandle = -1), B1(r)), ct !== null))
    for (r = ct.return; r !== null;) {
      var n = r;
      switch ((lp(n), n.tag)) {
        case 1:
          ((n = n.type.childContextTypes), n != null && el());
          break;
        case 3:
          (ea(), We(Ht), We(Nt), vp());
          break;
        case 5:
          gp(n);
          break;
        case 4:
          ea();
          break;
        case 13:
          We(Ke);
          break;
        case 19:
          We(Ke);
          break;
        case 10:
          pp(n.type._context);
          break;
        case 22:
        case 23:
          Tp();
      }
      r = r.return;
    }
  if (
    ((ht = e),
    (ct = e = Rn(e.current, null)),
    (St = Gt = t),
    (pt = 0),
    (Ci = null),
    (_p = Ql = io = 0),
    (Yt = Ja = null),
    Vn !== null)
  ) {
    for (t = 0; t < Vn.length; t++)
      if (((r = Vn[t]), (n = r.interleaved), n !== null)) {
        r.interleaved = null;
        var o = n.next,
          a = r.pending;
        if (a !== null) {
          var i = a.next;
          ((a.next = o), (n.next = i));
        }
        r.pending = n;
      }
    Vn = null;
  }
  return e;
}
function oy(e, t) {
  do {
    var r = ct;
    try {
      if ((dp(), (Ss.current = ul), ll)) {
        for (var n = Xe.memoizedState; n !== null;) {
          var o = n.queue;
          (o !== null && (o.pending = null), (n = n.next));
        }
        ll = !1;
      }
      if (
        ((ao = 0),
        (ft = dt = Xe = null),
        (Ga = !1),
        (wi = 0),
        (Ep.current = null),
        r === null || r.return === null)
      ) {
        ((pt = 1), (Ci = t), (ct = null));
        break;
      }
      e: {
        var a = e,
          i = r.return,
          s = r,
          l = t;
        if (
          ((t = St),
          (s.flags |= 32768),
          l !== null && typeof l == "object" && typeof l.then == "function")
        ) {
          var u = l,
            c = s,
            d = c.tag;
          if (!(c.mode & 1) && (d === 0 || d === 11 || d === 15)) {
            var m = c.alternate;
            m
              ? ((c.updateQueue = m.updateQueue),
                (c.memoizedState = m.memoizedState),
                (c.lanes = m.lanes))
              : ((c.updateQueue = null), (c.memoizedState = null));
          }
          var v = dh(i);
          if (v !== null) {
            ((v.flags &= -257),
              ph(v, i, s, a, t),
              v.mode & 1 && ch(a, u, t),
              (t = v),
              (l = u));
            var S = t.updateQueue;
            if (S === null) {
              var C = new Set();
              (C.add(l), (t.updateQueue = C));
            } else S.add(l);
            break e;
          } else {
            if (!(t & 1)) {
              (ch(a, u, t), Pp());
              break e;
            }
            l = Error(Y(426));
          }
        } else if (qe && s.mode & 1) {
          var k = dh(i);
          if (k !== null) {
            (!(k.flags & 65536) && (k.flags |= 256),
              ph(k, i, s, a, t),
              up(ta(l, s)));
            break e;
          }
        }
        ((a = l = ta(l, s)),
          pt !== 4 && (pt = 2),
          Ja === null ? (Ja = [a]) : Ja.push(a),
          (a = i));
        do {
          switch (a.tag) {
            case 3:
              ((a.flags |= 65536), (t &= -t), (a.lanes |= t));
              var g = $v(a, l, t);
              oh(a, g);
              break e;
            case 1:
              s = l;
              var y = a.type,
                w = a.stateNode;
              if (
                !(a.flags & 128) &&
                (typeof y.getDerivedStateFromError == "function" ||
                  (w !== null &&
                    typeof w.componentDidCatch == "function" &&
                    (Tn === null || !Tn.has(w))))
              ) {
                ((a.flags |= 65536), (t &= -t), (a.lanes |= t));
                var T = Yv(a, s, t);
                oh(a, T);
                break e;
              }
          }
          a = a.return;
        } while (a !== null);
      }
      sy(r);
    } catch (P) {
      ((t = P), ct === r && r !== null && (ct = r = r.return));
      continue;
    }
    break;
  } while (!0);
}
function ay() {
  var e = cl.current;
  return ((cl.current = ul), e === null ? ul : e);
}
function Pp() {
  ((pt === 0 || pt === 3 || pt === 2) && (pt = 4),
    ht === null || (!(io & 268435455) && !(Ql & 268435455)) || vn(ht, St));
}
function fl(e, t) {
  var r = Pe;
  Pe |= 2;
  var n = ay();
  (ht !== e || St !== t) && ((Qr = null), Xn(e, t));
  do
    try {
      cS();
      break;
    } catch (o) {
      oy(e, o);
    }
  while (!0);
  if ((dp(), (Pe = r), (cl.current = n), ct !== null)) throw Error(Y(261));
  return ((ht = null), (St = 0), pt);
}
function cS() {
  for (; ct !== null;) iy(ct);
}
function dS() {
  for (; ct !== null && !Lx();) iy(ct);
}
function iy(e) {
  var t = uy(e.alternate, e, Gt);
  ((e.memoizedProps = e.pendingProps),
    t === null ? sy(e) : (ct = t),
    (Ep.current = null));
}
function sy(e) {
  var t = e;
  do {
    var r = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((r = oS(r, t)), r !== null)) {
        ((r.flags &= 32767), (ct = r));
        return;
      }
      if (e !== null)
        ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
      else {
        ((pt = 6), (ct = null));
        return;
      }
    } else if (((r = nS(r, t, Gt)), r !== null)) {
      ct = r;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      ct = t;
      return;
    }
    ct = t = e;
  } while (t !== null);
  pt === 0 && (pt = 5);
}
function Yn(e, t, r) {
  var n = Le,
    o = ur.transition;
  try {
    ((ur.transition = null), (Le = 1), pS(e, t, r, n));
  } finally {
    ((ur.transition = o), (Le = n));
  }
  return null;
}
function pS(e, t, r, n) {
  do Vo();
  while (wn !== null);
  if (Pe & 6) throw Error(Y(327));
  r = e.finishedWork;
  var o = e.finishedLanes;
  if (r === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), r === e.current))
    throw Error(Y(177));
  ((e.callbackNode = null), (e.callbackPriority = 0));
  var a = r.lanes | r.childLanes;
  if (
    (Vx(e, a),
    e === ht && ((ct = ht = null), (St = 0)),
    (!(r.subtreeFlags & 2064) && !(r.flags & 2064)) ||
      ls ||
      ((ls = !0),
      cy(Qs, function () {
        return (Vo(), null);
      })),
    (a = (r.flags & 15990) !== 0),
    r.subtreeFlags & 15990 || a)
  ) {
    ((a = ur.transition), (ur.transition = null));
    var i = Le;
    Le = 1;
    var s = Pe;
    ((Pe |= 4),
      (Ep.current = null),
      iS(e, r),
      ty(r, e),
      N1(Ac),
      (Gs = !!Lc),
      (Ac = Lc = null),
      (e.current = r),
      sS(r),
      Ax(),
      (Pe = s),
      (Le = i),
      (ur.transition = a));
  } else e.current = r;
  if (
    (ls && ((ls = !1), (wn = e), (pl = o)),
    (a = e.pendingLanes),
    a === 0 && (Tn = null),
    Ux(r.stateNode),
    Vt(e, at()),
    t !== null)
  )
    for (n = e.onRecoverableError, r = 0; r < t.length; r++)
      ((o = t[r]), n(o.value, { componentStack: o.stack, digest: o.digest }));
  if (dl) throw ((dl = !1), (e = nd), (nd = null), e);
  return (
    pl & 1 && e.tag !== 0 && Vo(),
    (a = e.pendingLanes),
    a & 1 ? (e === od ? Za++ : ((Za = 0), (od = e))) : (Za = 0),
    Fn(),
    null
  );
}
function Vo() {
  if (wn !== null) {
    var e = $g(pl),
      t = ur.transition,
      r = Le;
    try {
      if (((ur.transition = null), (Le = 16 > e ? 16 : e), wn === null))
        var n = !1;
      else {
        if (((e = wn), (wn = null), (pl = 0), Pe & 6)) throw Error(Y(331));
        var o = Pe;
        for (Pe |= 4, ee = e.current; ee !== null;) {
          var a = ee,
            i = a.child;
          if (ee.flags & 16) {
            var s = a.deletions;
            if (s !== null) {
              for (var l = 0; l < s.length; l++) {
                var u = s[l];
                for (ee = u; ee !== null;) {
                  var c = ee;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Xa(8, c, a);
                  }
                  var d = c.child;
                  if (d !== null) ((d.return = c), (ee = d));
                  else
                    for (; ee !== null;) {
                      c = ee;
                      var m = c.sibling,
                        v = c.return;
                      if ((Jv(c), c === u)) {
                        ee = null;
                        break;
                      }
                      if (m !== null) {
                        ((m.return = v), (ee = m));
                        break;
                      }
                      ee = v;
                    }
                }
              }
              var S = a.alternate;
              if (S !== null) {
                var C = S.child;
                if (C !== null) {
                  S.child = null;
                  do {
                    var k = C.sibling;
                    ((C.sibling = null), (C = k));
                  } while (C !== null);
                }
              }
              ee = a;
            }
          }
          if (a.subtreeFlags & 2064 && i !== null) ((i.return = a), (ee = i));
          else
            e: for (; ee !== null;) {
              if (((a = ee), a.flags & 2048))
                switch (a.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Xa(9, a, a.return);
                }
              var g = a.sibling;
              if (g !== null) {
                ((g.return = a.return), (ee = g));
                break e;
              }
              ee = a.return;
            }
        }
        var y = e.current;
        for (ee = y; ee !== null;) {
          i = ee;
          var w = i.child;
          if (i.subtreeFlags & 2064 && w !== null) ((w.return = i), (ee = w));
          else
            e: for (i = y; ee !== null;) {
              if (((s = ee), s.flags & 2048))
                try {
                  switch (s.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ql(9, s);
                  }
                } catch (P) {
                  nt(s, s.return, P);
                }
              if (s === i) {
                ee = null;
                break e;
              }
              var T = s.sibling;
              if (T !== null) {
                ((T.return = s.return), (ee = T));
                break e;
              }
              ee = s.return;
            }
        }
        if (
          ((Pe = o), Fn(), Fr && typeof Fr.onPostCommitFiberRoot == "function")
        )
          try {
            Fr.onPostCommitFiberRoot(Bl, e);
          } catch {}
        n = !0;
      }
      return n;
    } finally {
      ((Le = r), (ur.transition = t));
    }
  }
  return !1;
}
function _h(e, t, r) {
  ((t = ta(r, t)),
    (t = $v(e, t, 1)),
    (e = Dn(e, t, 1)),
    (t = At()),
    e !== null && (Mi(e, 1, t), Vt(e, t)));
}
function nt(e, t, r) {
  if (e.tag === 3) _h(e, e, r);
  else
    for (; t !== null;) {
      if (t.tag === 3) {
        _h(t, e, r);
        break;
      } else if (t.tag === 1) {
        var n = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof n.componentDidCatch == "function" &&
            (Tn === null || !Tn.has(n)))
        ) {
          ((e = ta(r, e)),
            (e = Yv(t, e, 1)),
            (t = Dn(t, e, 1)),
            (e = At()),
            t !== null && (Mi(t, 1, e), Vt(t, e)));
          break;
        }
      }
      t = t.return;
    }
}
function fS(e, t, r) {
  var n = e.pingCache;
  (n !== null && n.delete(t),
    (t = At()),
    (e.pingedLanes |= e.suspendedLanes & r),
    ht === e &&
      (St & r) === r &&
      (pt === 4 || (pt === 3 && (St & 130023424) === St && 500 > at() - bp)
        ? Xn(e, 0)
        : (_p |= r)),
    Vt(e, t));
}
function ly(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Ji), (Ji <<= 1), !(Ji & 130023424) && (Ji = 4194304))
      : (t = 1));
  var r = At();
  ((e = nn(e, t)), e !== null && (Mi(e, t, r), Vt(e, r)));
}
function hS(e) {
  var t = e.memoizedState,
    r = 0;
  (t !== null && (r = t.retryLane), ly(e, r));
}
function mS(e, t) {
  var r = 0;
  switch (e.tag) {
    case 13:
      var n = e.stateNode,
        o = e.memoizedState;
      o !== null && (r = o.retryLane);
      break;
    case 19:
      n = e.stateNode;
      break;
    default:
      throw Error(Y(314));
  }
  (n !== null && n.delete(t), ly(e, r));
}
var uy;
uy = function (e, t, r) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Ht.current) zt = !0;
    else {
      if (!(e.lanes & r) && !(t.flags & 128)) return ((zt = !1), rS(e, t, r));
      zt = !!(e.flags & 131072);
    }
  else ((zt = !1), qe && t.flags & 1048576 && fv(t, nl, t.index));
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var n = t.type;
      (ks(e, t), (e = t.pendingProps));
      var o = Xo(t, Nt.current);
      (Wo(t, r), (o = wp(null, t, n, e, o, r)));
      var a = xp();
      return (
        (t.flags |= 1),
        typeof o == "object" &&
        o !== null &&
        typeof o.render == "function" &&
        o.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Wt(n) ? ((a = !0), tl(t)) : (a = !1),
            (t.memoizedState =
              o.state !== null && o.state !== void 0 ? o.state : null),
            hp(t),
            (o.updater = Vl),
            (t.stateNode = o),
            (o._reactInternals = t),
            Vc(t, n, e, r),
            (t = Kc(null, t, n, !0, a, r)))
          : ((t.tag = 0), qe && a && sp(t), jt(null, t, o, r), (t = t.child)),
        t
      );
    case 16:
      n = t.elementType;
      e: {
        switch (
          (ks(e, t),
          (e = t.pendingProps),
          (o = n._init),
          (n = o(n._payload)),
          (t.type = n),
          (o = t.tag = vS(n)),
          (e = wr(n, e)),
          o)
        ) {
          case 0:
            t = Qc(null, t, n, e, r);
            break e;
          case 1:
            t = mh(null, t, n, e, r);
            break e;
          case 11:
            t = fh(null, t, n, e, r);
            break e;
          case 14:
            t = hh(null, t, n, wr(n.type, e), r);
            break e;
        }
        throw Error(Y(306, n, ""));
      }
      return t;
    case 0:
      return (
        (n = t.type),
        (o = t.pendingProps),
        (o = t.elementType === n ? o : wr(n, o)),
        Qc(e, t, n, o, r)
      );
    case 1:
      return (
        (n = t.type),
        (o = t.pendingProps),
        (o = t.elementType === n ? o : wr(n, o)),
        mh(e, t, n, o, r)
      );
    case 3:
      e: {
        if ((Vv(t), e === null)) throw Error(Y(387));
        ((n = t.pendingProps),
          (a = t.memoizedState),
          (o = a.element),
          wv(e, t),
          il(t, n, null, r));
        var i = t.memoizedState;
        if (((n = i.element), a.isDehydrated))
          if (
            ((a = {
              element: n,
              isDehydrated: !1,
              cache: i.cache,
              pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
              transitions: i.transitions,
            }),
            (t.updateQueue.baseState = a),
            (t.memoizedState = a),
            t.flags & 256)
          ) {
            ((o = ta(Error(Y(423)), t)), (t = gh(e, t, n, r, o)));
            break e;
          } else if (n !== o) {
            ((o = ta(Error(Y(424)), t)), (t = gh(e, t, n, r, o)));
            break e;
          } else
            for (
              Xt = bn(t.stateNode.containerInfo.firstChild),
                Jt = t,
                qe = !0,
                Sr = null,
                r = vv(t, null, n, r),
                t.child = r;
              r;
            )
              ((r.flags = (r.flags & -3) | 4096), (r = r.sibling));
        else {
          if ((Jo(), n === o)) {
            t = on(e, t, r);
            break e;
          }
          jt(e, t, n, r);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        xv(t),
        e === null && zc(t),
        (n = t.type),
        (o = t.pendingProps),
        (a = e !== null ? e.memoizedProps : null),
        (i = o.children),
        Fc(n, o) ? (i = null) : a !== null && Fc(n, a) && (t.flags |= 32),
        Wv(e, t),
        jt(e, t, i, r),
        t.child
      );
    case 6:
      return (e === null && zc(t), null);
    case 13:
      return qv(e, t, r);
    case 4:
      return (
        mp(t, t.stateNode.containerInfo),
        (n = t.pendingProps),
        e === null ? (t.child = Zo(t, null, n, r)) : jt(e, t, n, r),
        t.child
      );
    case 11:
      return (
        (n = t.type),
        (o = t.pendingProps),
        (o = t.elementType === n ? o : wr(n, o)),
        fh(e, t, n, o, r)
      );
    case 7:
      return (jt(e, t, t.pendingProps, r), t.child);
    case 8:
      return (jt(e, t, t.pendingProps.children, r), t.child);
    case 12:
      return (jt(e, t, t.pendingProps.children, r), t.child);
    case 10:
      e: {
        if (
          ((n = t.type._context),
          (o = t.pendingProps),
          (a = t.memoizedProps),
          (i = o.value),
          Ye(ol, n._currentValue),
          (n._currentValue = i),
          a !== null)
        )
          if (br(a.value, i)) {
            if (a.children === o.children && !Ht.current) {
              t = on(e, t, r);
              break e;
            }
          } else
            for (a = t.child, a !== null && (a.return = t); a !== null;) {
              var s = a.dependencies;
              if (s !== null) {
                i = a.child;
                for (var l = s.firstContext; l !== null;) {
                  if (l.context === n) {
                    if (a.tag === 1) {
                      ((l = en(-1, r & -r)), (l.tag = 2));
                      var u = a.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var c = u.pending;
                        (c === null
                          ? (l.next = l)
                          : ((l.next = c.next), (c.next = l)),
                          (u.pending = l));
                      }
                    }
                    ((a.lanes |= r),
                      (l = a.alternate),
                      l !== null && (l.lanes |= r),
                      Hc(a.return, r, t),
                      (s.lanes |= r));
                    break;
                  }
                  l = l.next;
                }
              } else if (a.tag === 10) i = a.type === t.type ? null : a.child;
              else if (a.tag === 18) {
                if (((i = a.return), i === null)) throw Error(Y(341));
                ((i.lanes |= r),
                  (s = i.alternate),
                  s !== null && (s.lanes |= r),
                  Hc(i, r, t),
                  (i = a.sibling));
              } else i = a.child;
              if (i !== null) i.return = a;
              else
                for (i = a; i !== null;) {
                  if (i === t) {
                    i = null;
                    break;
                  }
                  if (((a = i.sibling), a !== null)) {
                    ((a.return = i.return), (i = a));
                    break;
                  }
                  i = i.return;
                }
              a = i;
            }
        (jt(e, t, o.children, r), (t = t.child));
      }
      return t;
    case 9:
      return (
        (o = t.type),
        (n = t.pendingProps.children),
        Wo(t, r),
        (o = dr(o)),
        (n = n(o)),
        (t.flags |= 1),
        jt(e, t, n, r),
        t.child
      );
    case 14:
      return (
        (n = t.type),
        (o = wr(n, t.pendingProps)),
        (o = wr(n.type, o)),
        hh(e, t, n, o, r)
      );
    case 15:
      return zv(e, t, t.type, t.pendingProps, r);
    case 17:
      return (
        (n = t.type),
        (o = t.pendingProps),
        (o = t.elementType === n ? o : wr(n, o)),
        ks(e, t),
        (t.tag = 1),
        Wt(n) ? ((e = !0), tl(t)) : (e = !1),
        Wo(t, r),
        Uv(t, n, o),
        Vc(t, n, o, r),
        Kc(null, t, n, !0, e, r)
      );
    case 19:
      return Qv(e, t, r);
    case 22:
      return Hv(e, t, r);
  }
  throw Error(Y(156, t.tag));
};
function cy(e, t) {
  return Ag(e, t);
}
function gS(e, t, r, n) {
  ((this.tag = e),
    (this.key = r),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = n),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function lr(e, t, r, n) {
  return new gS(e, t, r, n);
}
function Rp(e) {
  return ((e = e.prototype), !(!e || !e.isReactComponent));
}
function vS(e) {
  if (typeof e == "function") return Rp(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Kd)) return 11;
    if (e === Gd) return 14;
  }
  return 2;
}
function Rn(e, t) {
  var r = e.alternate;
  return (
    r === null
      ? ((r = lr(e.tag, t, e.key, e.mode)),
        (r.elementType = e.elementType),
        (r.type = e.type),
        (r.stateNode = e.stateNode),
        (r.alternate = e),
        (e.alternate = r))
      : ((r.pendingProps = t),
        (r.type = e.type),
        (r.flags = 0),
        (r.subtreeFlags = 0),
        (r.deletions = null)),
    (r.flags = e.flags & 14680064),
    (r.childLanes = e.childLanes),
    (r.lanes = e.lanes),
    (r.child = e.child),
    (r.memoizedProps = e.memoizedProps),
    (r.memoizedState = e.memoizedState),
    (r.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (r.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (r.sibling = e.sibling),
    (r.index = e.index),
    (r.ref = e.ref),
    r
  );
}
function bs(e, t, r, n, o, a) {
  var i = 2;
  if (((n = e), typeof e == "function")) Rp(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else
    e: switch (e) {
      case To:
        return Jn(r.children, o, a, t);
      case Qd:
        ((i = 8), (o |= 8));
        break;
      case gc:
        return (
          (e = lr(12, r, t, o | 2)),
          (e.elementType = gc),
          (e.lanes = a),
          e
        );
      case vc:
        return ((e = lr(13, r, t, o)), (e.elementType = vc), (e.lanes = a), e);
      case yc:
        return ((e = lr(19, r, t, o)), (e.elementType = yc), (e.lanes = a), e);
      case xg:
        return Kl(r, o, a, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case yg:
              i = 10;
              break e;
            case wg:
              i = 9;
              break e;
            case Kd:
              i = 11;
              break e;
            case Gd:
              i = 14;
              break e;
            case fn:
              ((i = 16), (n = null));
              break e;
          }
        throw Error(Y(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = lr(i, r, t, o)),
    (t.elementType = e),
    (t.type = n),
    (t.lanes = a),
    t
  );
}
function Jn(e, t, r, n) {
  return ((e = lr(7, e, n, t)), (e.lanes = r), e);
}
function Kl(e, t, r, n) {
  return (
    (e = lr(22, e, n, t)),
    (e.elementType = xg),
    (e.lanes = r),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function $u(e, t, r) {
  return ((e = lr(6, e, null, t)), (e.lanes = r), e);
}
function Yu(e, t, r) {
  return (
    (t = lr(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = r),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function yS(e, t, r, n, o) {
  ((this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Cu(0)),
    (this.expirationTimes = Cu(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Cu(0)),
    (this.identifierPrefix = n),
    (this.onRecoverableError = o),
    (this.mutableSourceEagerHydrationData = null));
}
function Op(e, t, r, n, o, a, i, s, l) {
  return (
    (e = new yS(e, t, r, s, l)),
    t === 1 ? ((t = 1), a === !0 && (t |= 8)) : (t = 0),
    (a = lr(3, null, null, t)),
    (e.current = a),
    (a.stateNode = e),
    (a.memoizedState = {
      element: n,
      isDehydrated: r,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    hp(a),
    e
  );
}
function wS(e, t, r) {
  var n = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Do,
    key: n == null ? null : "" + n,
    children: e,
    containerInfo: t,
    implementation: r,
  };
}
function dy(e) {
  if (!e) return In;
  e = e._reactInternals;
  e: {
    if (mo(e) !== e || e.tag !== 1) throw Error(Y(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Wt(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(Y(171));
  }
  if (e.tag === 1) {
    var r = e.type;
    if (Wt(r)) return dv(e, r, t);
  }
  return t;
}
function py(e, t, r, n, o, a, i, s, l) {
  return (
    (e = Op(r, n, !0, e, o, a, i, s, l)),
    (e.context = dy(null)),
    (r = e.current),
    (n = At()),
    (o = Pn(r)),
    (a = en(n, o)),
    (a.callback = t ?? null),
    Dn(r, a, o),
    (e.current.lanes = o),
    Mi(e, o, n),
    Vt(e, n),
    e
  );
}
function Gl(e, t, r, n) {
  var o = t.current,
    a = At(),
    i = Pn(o);
  return (
    (r = dy(r)),
    t.context === null ? (t.context = r) : (t.pendingContext = r),
    (t = en(a, i)),
    (t.payload = { element: e }),
    (n = n === void 0 ? null : n),
    n !== null && (t.callback = n),
    (e = Dn(o, t, i)),
    e !== null && (Er(e, o, i, a), xs(e, o, i)),
    i
  );
}
function hl(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function bh(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var r = e.retryLane;
    e.retryLane = r !== 0 && r < t ? r : t;
  }
}
function Np(e, t) {
  (bh(e, t), (e = e.alternate) && bh(e, t));
}
function xS() {
  return null;
}
var fy =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Mp(e) {
  this._internalRoot = e;
}
Xl.prototype.render = Mp.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(Y(409));
  Gl(e, t, null, null);
};
Xl.prototype.unmount = Mp.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    (so(function () {
      Gl(null, e, null, null);
    }),
      (t[rn] = null));
  }
};
function Xl(e) {
  this._internalRoot = e;
}
Xl.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Hg();
    e = { blockedOn: null, target: e, priority: t };
    for (var r = 0; r < gn.length && t !== 0 && t < gn[r].priority; r++);
    (gn.splice(r, 0, e), r === 0 && Vg(e));
  }
};
function Ip(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Jl(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Dh() {}
function SS(e, t, r, n, o) {
  if (o) {
    if (typeof n == "function") {
      var a = n;
      n = function () {
        var u = hl(i);
        a.call(u);
      };
    }
    var i = py(t, n, e, 0, null, !1, !1, "", Dh);
    return (
      (e._reactRootContainer = i),
      (e[rn] = i.current),
      hi(e.nodeType === 8 ? e.parentNode : e),
      so(),
      i
    );
  }
  for (; (o = e.lastChild);) e.removeChild(o);
  if (typeof n == "function") {
    var s = n;
    n = function () {
      var u = hl(l);
      s.call(u);
    };
  }
  var l = Op(e, 0, !1, null, null, !1, !1, "", Dh);
  return (
    (e._reactRootContainer = l),
    (e[rn] = l.current),
    hi(e.nodeType === 8 ? e.parentNode : e),
    so(function () {
      Gl(t, l, r, n);
    }),
    l
  );
}
function Zl(e, t, r, n, o) {
  var a = r._reactRootContainer;
  if (a) {
    var i = a;
    if (typeof o == "function") {
      var s = o;
      o = function () {
        var l = hl(i);
        s.call(l);
      };
    }
    Gl(t, i, e, o);
  } else i = SS(r, t, e, o, n);
  return hl(i);
}
Yg = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var r = $a(t.pendingLanes);
        r !== 0 &&
          (Zd(t, r | 1), Vt(t, at()), !(Pe & 6) && ((ra = at() + 500), Fn()));
      }
      break;
    case 13:
      (so(function () {
        var n = nn(e, 1);
        if (n !== null) {
          var o = At();
          Er(n, e, 1, o);
        }
      }),
        Np(e, 1));
  }
};
ep = function (e) {
  if (e.tag === 13) {
    var t = nn(e, 134217728);
    if (t !== null) {
      var r = At();
      Er(t, e, 134217728, r);
    }
    Np(e, 134217728);
  }
};
zg = function (e) {
  if (e.tag === 13) {
    var t = Pn(e),
      r = nn(e, t);
    if (r !== null) {
      var n = At();
      Er(r, e, t, n);
    }
    Np(e, t);
  }
};
Hg = function () {
  return Le;
};
Wg = function (e, t) {
  var r = Le;
  try {
    return ((Le = e), t());
  } finally {
    Le = r;
  }
};
Tc = function (e, t, r) {
  switch (t) {
    case "input":
      if ((Sc(e, r), (t = r.name), r.type === "radio" && t != null)) {
        for (r = e; r.parentNode;) r = r.parentNode;
        for (
          r = r.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]',
          ),
            t = 0;
          t < r.length;
          t++
        ) {
          var n = r[t];
          if (n !== e && n.form === e.form) {
            var o = zl(n);
            if (!o) throw Error(Y(90));
            (Cg(n), Sc(n, o));
          }
        }
      }
      break;
    case "textarea":
      Eg(e, r);
      break;
    case "select":
      ((t = r.value), t != null && $o(e, !!r.multiple, t, !1));
  }
};
Og = Dp;
Ng = so;
var CS = { usingClientEntryPoint: !1, Events: [ji, No, zl, Pg, Rg, Dp] },
  Oa = {
    findFiberByHostInstance: Wn,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  kS = {
    bundleType: Oa.bundleType,
    version: Oa.version,
    rendererPackageName: Oa.rendererPackageName,
    rendererConfig: Oa.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: ln.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return ((e = jg(e)), e === null ? null : e.stateNode);
    },
    findFiberByHostInstance: Oa.findFiberByHostInstance || xS,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var us = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!us.isDisabled && us.supportsFiber)
    try {
      ((Bl = us.inject(kS)), (Fr = us));
    } catch {}
}
tr.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = CS;
tr.createPortal = function (e, t) {
  var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ip(t)) throw Error(Y(200));
  return wS(e, t, null, r);
};
tr.createRoot = function (e, t) {
  if (!Ip(e)) throw Error(Y(299));
  var r = !1,
    n = "",
    o = fy;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (r = !0),
      t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
    (t = Op(e, 1, !1, null, null, r, !1, n, o)),
    (e[rn] = t.current),
    hi(e.nodeType === 8 ? e.parentNode : e),
    new Mp(t)
  );
};
tr.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(Y(188))
      : ((e = Object.keys(e).join(",")), Error(Y(268, e)));
  return ((e = jg(t)), (e = e === null ? null : e.stateNode), e);
};
tr.flushSync = function (e) {
  return so(e);
};
tr.hydrate = function (e, t, r) {
  if (!Jl(t)) throw Error(Y(200));
  return Zl(null, e, t, !0, r);
};
tr.hydrateRoot = function (e, t, r) {
  if (!Ip(e)) throw Error(Y(405));
  var n = (r != null && r.hydratedSources) || null,
    o = !1,
    a = "",
    i = fy;
  if (
    (r != null &&
      (r.unstable_strictMode === !0 && (o = !0),
      r.identifierPrefix !== void 0 && (a = r.identifierPrefix),
      r.onRecoverableError !== void 0 && (i = r.onRecoverableError)),
    (t = py(t, null, e, 1, r ?? null, o, !1, a, i)),
    (e[rn] = t.current),
    hi(e),
    n)
  )
    for (e = 0; e < n.length; e++)
      ((r = n[e]),
        (o = r._getVersion),
        (o = o(r._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [r, o])
          : t.mutableSourceEagerHydrationData.push(r, o));
  return new Xl(t);
};
tr.render = function (e, t, r) {
  if (!Jl(t)) throw Error(Y(200));
  return Zl(null, e, t, !1, r);
};
tr.unmountComponentAtNode = function (e) {
  if (!Jl(e)) throw Error(Y(40));
  return e._reactRootContainer
    ? (so(function () {
        Zl(null, null, e, !1, function () {
          ((e._reactRootContainer = null), (e[rn] = null));
        });
      }),
      !0)
    : !1;
};
tr.unstable_batchedUpdates = Dp;
tr.unstable_renderSubtreeIntoContainer = function (e, t, r, n) {
  if (!Jl(r)) throw Error(Y(200));
  if (e == null || e._reactInternals === void 0) throw Error(Y(38));
  return Zl(e, t, r, !1, n);
};
tr.version = "18.3.1-next-f1338f8080-20240426";
function hy() {
  if (!(
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
  ))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(hy);
    } catch (e) {
      console.error(e);
    }
}
(hy(), (hg.exports = tr));
var eu = hg.exports;
const ES = fa(eu);
var Th = eu;
((hc.createRoot = Th.createRoot), (hc.hydrateRoot = Th.hydrateRoot));
function _S(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var my = { exports: {} },
  lt = (my.exports = {}),
  Nr,
  Mr;
function sd() {
  throw new Error("setTimeout has not been defined");
}
function ld() {
  throw new Error("clearTimeout has not been defined");
}
(function () {
  try {
    typeof setTimeout == "function" ? (Nr = setTimeout) : (Nr = sd);
  } catch {
    Nr = sd;
  }
  try {
    typeof clearTimeout == "function" ? (Mr = clearTimeout) : (Mr = ld);
  } catch {
    Mr = ld;
  }
})();
function gy(e) {
  if (Nr === setTimeout) return setTimeout(e, 0);
  if ((Nr === sd || !Nr) && setTimeout)
    return ((Nr = setTimeout), setTimeout(e, 0));
  try {
    return Nr(e, 0);
  } catch {
    try {
      return Nr.call(null, e, 0);
    } catch {
      return Nr.call(this, e, 0);
    }
  }
}
function bS(e) {
  if (Mr === clearTimeout) return clearTimeout(e);
  if ((Mr === ld || !Mr) && clearTimeout)
    return ((Mr = clearTimeout), clearTimeout(e));
  try {
    return Mr(e);
  } catch {
    try {
      return Mr.call(null, e);
    } catch {
      return Mr.call(this, e);
    }
  }
}
var Zr = [],
  qo = !1,
  Qn,
  Ds = -1;
function DS() {
  !qo ||
    !Qn ||
    ((qo = !1),
    Qn.length ? (Zr = Qn.concat(Zr)) : (Ds = -1),
    Zr.length && vy());
}
function vy() {
  if (!qo) {
    var e = gy(DS);
    qo = !0;
    for (var t = Zr.length; t;) {
      for (Qn = Zr, Zr = []; ++Ds < t;) Qn && Qn[Ds].run();
      ((Ds = -1), (t = Zr.length));
    }
    ((Qn = null), (qo = !1), bS(e));
  }
}
lt.nextTick = function (e) {
  var t = new Array(arguments.length - 1);
  if (arguments.length > 1)
    for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
  (Zr.push(new yy(e, t)), Zr.length === 1 && !qo && gy(vy));
};
function yy(e, t) {
  ((this.fun = e), (this.array = t));
}
yy.prototype.run = function () {
  this.fun.apply(null, this.array);
};
lt.title = "browser";
lt.browser = !0;
lt.env = {};
lt.argv = [];
lt.version = "";
lt.versions = {};
function un() {}
lt.on = un;
lt.addListener = un;
lt.once = un;
lt.off = un;
lt.removeListener = un;
lt.removeAllListeners = un;
lt.emit = un;
lt.prependListener = un;
lt.prependOnceListener = un;
lt.listeners = function (e) {
  return [];
};
lt.binding = function (e) {
  throw new Error("process.binding is not supported");
};
lt.cwd = function () {
  return "/";
};
lt.chdir = function (e) {
  throw new Error("process.chdir is not supported");
};
lt.umask = function () {
  return 0;
};
var TS = my.exports;
const Ph = _S(TS),
  ud = globalThis || void 0 || self;
/**
 * react-router v7.18.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var jp = /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,
  wy = /^[\\/]{2}/;
function PS(e, t) {
  return t + e.replace(/\\/g, "/");
}
var Rh = "popstate";
function Oh(e) {
  return (
    typeof e == "object" &&
    e != null &&
    "pathname" in e &&
    "search" in e &&
    "hash" in e &&
    "state" in e &&
    "key" in e
  );
}
function RS(e = {}) {
  function t(n, o) {
    var u;
    let a = (u = o.state) == null ? void 0 : u.masked,
      { pathname: i, search: s, hash: l } = a || n.location;
    return cd(
      "",
      { pathname: i, search: s, hash: l },
      (o.state && o.state.usr) || null,
      (o.state && o.state.key) || "default",
      a
        ? {
            pathname: n.location.pathname,
            search: n.location.search,
            hash: n.location.hash,
          }
        : void 0,
    );
  }
  function r(n, o) {
    return typeof o == "string" ? o : ki(o);
  }
  return NS(t, r, null, e);
}
function Je(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function Wr(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function OS() {
  return Math.random().toString(36).substring(2, 10);
}
function Nh(e, t) {
  return {
    usr: e.state,
    key: e.key,
    idx: t,
    masked: e.mask
      ? { pathname: e.pathname, search: e.search, hash: e.hash }
      : void 0,
  };
}
function cd(e, t, r = null, n, o) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...(typeof t == "string" ? va(t) : t),
    state: r,
    key: (t && t.key) || n || OS(),
    mask: o,
  };
}
function ki({ pathname: e = "/", search: t = "", hash: r = "" }) {
  return (
    t && t !== "?" && (e += t.charAt(0) === "?" ? t : "?" + t),
    r && r !== "#" && (e += r.charAt(0) === "#" ? r : "#" + r),
    e
  );
}
function va(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && ((t.hash = e.substring(r)), (e = e.substring(0, r)));
    let n = e.indexOf("?");
    (n >= 0 && ((t.search = e.substring(n)), (e = e.substring(0, n))),
      e && (t.pathname = e));
  }
  return t;
}
function NS(e, t, r, n = {}) {
  let { window: o = document.defaultView, v5Compat: a = !1 } = n,
    i = o.history,
    s = "POP",
    l = null,
    u = c();
  u == null && ((u = 0), i.replaceState({ ...i.state, idx: u }, ""));
  function c() {
    return (i.state || { idx: null }).idx;
  }
  function d() {
    s = "POP";
    let k = c(),
      g = k == null ? null : k - u;
    ((u = k), l && l({ action: s, location: C.location, delta: g }));
  }
  function m(k, g) {
    s = "PUSH";
    let y = Oh(k) ? k : cd(C.location, k, g);
    u = c() + 1;
    let w = Nh(y, u),
      T = C.createHref(y.mask || y);
    try {
      i.pushState(w, "", T);
    } catch (P) {
      if (P instanceof DOMException && P.name === "DataCloneError") throw P;
      o.location.assign(T);
    }
    a && l && l({ action: s, location: C.location, delta: 1 });
  }
  function v(k, g) {
    s = "REPLACE";
    let y = Oh(k) ? k : cd(C.location, k, g);
    u = c();
    let w = Nh(y, u),
      T = C.createHref(y.mask || y);
    (i.replaceState(w, "", T),
      a && l && l({ action: s, location: C.location, delta: 0 }));
  }
  function S(k) {
    return MS(o, k);
  }
  let C = {
    get action() {
      return s;
    },
    get location() {
      return e(o, i);
    },
    listen(k) {
      if (l) throw new Error("A history only accepts one active listener");
      return (
        o.addEventListener(Rh, d),
        (l = k),
        () => {
          (o.removeEventListener(Rh, d), (l = null));
        }
      );
    },
    createHref(k) {
      return t(o, k);
    },
    createURL: S,
    encodeLocation(k) {
      let g = S(k);
      return { pathname: g.pathname, search: g.search, hash: g.hash };
    },
    push: m,
    replace: v,
    go(k) {
      return i.go(k);
    },
  };
  return C;
}
function MS(e, t, r = !1) {
  let n = "http://localhost";
  (e &&
    (n = e.location.origin !== "null" ? e.location.origin : e.location.href),
    Je(n, "No window.location.(origin|href) available to create URL"));
  let o = typeof t == "string" ? t : ki(t);
  return (
    (o = o.replace(/ $/, "%20")),
    !r && wy.test(o) && (o = n + o),
    new URL(o, n)
  );
}
function xy(e, t, r = "/") {
  return IS(e, t, r, !1);
}
function IS(e, t, r, n, o) {
  let a = typeof t == "string" ? va(t) : t,
    i = an(a.pathname || "/", r);
  if (i == null) return null;
  let s = jS(e),
    l = null,
    u = VS(i);
  for (let c = 0; l == null && c < s.length; ++c) l = WS(s[c], u, n);
  return l;
}
function jS(e) {
  let t = Sy(e);
  return (LS(t), t);
}
function Sy(e, t = [], r = [], n = "", o = !1) {
  let a = (i, s, l = o, u) => {
    let c = {
      relativePath: u === void 0 ? i.path || "" : u,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: s,
      route: i,
    };
    if (c.relativePath.startsWith("/")) {
      if (!c.relativePath.startsWith(n) && l) return;
      (Je(
        c.relativePath.startsWith(n),
        `Absolute route path "${c.relativePath}" nested under path "${n}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
        (c.relativePath = c.relativePath.slice(n.length)));
    }
    let d = _r([n, c.relativePath]),
      m = r.concat(c);
    (i.children &&
      i.children.length > 0 &&
      (Je(
        i.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${d}".`,
      ),
      Sy(i.children, t, m, d, l)),
      !(i.path == null && !i.index) &&
        t.push({
          path: d,
          score: zS(d, i.index),
          routesMeta: m.map((v, S) => {
            let [C, k] = Ey(
              v.relativePath,
              v.caseSensitive,
              S === m.length - 1,
            );
            return { ...v, matcher: C, compiledParams: k };
          }),
        }));
  };
  return (
    e.forEach((i, s) => {
      var l;
      if (i.path === "" || !((l = i.path) != null && l.includes("?"))) a(i, s);
      else for (let u of Cy(i.path)) a(i, s, !0, u);
    }),
    t
  );
}
function Cy(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [r, ...n] = t,
    o = r.endsWith("?"),
    a = r.replace(/\?$/, "");
  if (n.length === 0) return o ? [a, ""] : [a];
  let i = Cy(n.join("/")),
    s = [];
  return (
    s.push(...i.map((l) => (l === "" ? a : [a, l].join("/")))),
    o && s.push(...i),
    s.map((l) => (e.startsWith("/") && l === "" ? "/" : l))
  );
}
function LS(e) {
  e.sort((t, r) =>
    t.score !== r.score
      ? r.score - t.score
      : HS(
          t.routesMeta.map((n) => n.childrenIndex),
          r.routesMeta.map((n) => n.childrenIndex),
        ),
  );
}
var AS = /^:[\w-]+$/,
  FS = 3,
  BS = 2,
  US = 1,
  $S = 10,
  YS = -2,
  Mh = (e) => e === "*";
function zS(e, t) {
  let r = e.split("/"),
    n = r.length;
  return (
    r.some(Mh) && (n += YS),
    t && (n += BS),
    r
      .filter((o) => !Mh(o))
      .reduce((o, a) => o + (AS.test(a) ? FS : a === "" ? US : $S), n)
  );
}
function HS(e, t) {
  return e.length === t.length && e.slice(0, -1).every((n, o) => n === t[o])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function WS(e, t, r = !1) {
  let { routesMeta: n } = e,
    o = {},
    a = "/",
    i = [];
  for (let s = 0; s < n.length; ++s) {
    let l = n[s],
      u = s === n.length - 1,
      c = a === "/" ? t : t.slice(a.length) || "/",
      d = { path: l.relativePath, caseSensitive: l.caseSensitive, end: u },
      m =
        l.matcher && l.compiledParams
          ? ky(d, c, l.matcher, l.compiledParams)
          : ml(d, c),
      v = l.route;
    if (
      (!m &&
        u &&
        r &&
        !n[n.length - 1].route.index &&
        (m = ml(
          { path: l.relativePath, caseSensitive: l.caseSensitive, end: !1 },
          c,
        )),
      !m)
    )
      return null;
    (Object.assign(o, m.params),
      i.push({
        params: o,
        pathname: _r([a, m.pathname]),
        pathnameBase: KS(_r([a, m.pathnameBase])),
        route: v,
      }),
      m.pathnameBase !== "/" && (a = _r([a, m.pathnameBase])));
  }
  return i;
}
function ml(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [r, n] = Ey(e.path, e.caseSensitive, e.end);
  return ky(e, t, r, n);
}
function ky(e, t, r, n) {
  let o = t.match(r);
  if (!o) return null;
  let a = o[0],
    i = a.replace(/(.)\/+$/, "$1"),
    s = o.slice(1);
  return {
    params: n.reduce((u, { paramName: c, isOptional: d }, m) => {
      if (c === "*") {
        let S = s[m] || "";
        i = a.slice(0, a.length - S.length).replace(/(.)\/+$/, "$1");
      }
      const v = s[m];
      return (
        d && !v ? (u[c] = void 0) : (u[c] = (v || "").replace(/%2F/g, "/")),
        u
      );
    }, {}),
    pathname: a,
    pathnameBase: i,
    pattern: e,
  };
}
function Ey(e, t = !1, r = !0) {
  Wr(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`,
  );
  let n = [],
    o =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(/\/:([\w-]+)(\?)?/g, (i, s, l, u, c) => {
          if ((n.push({ paramName: s, isOptional: l != null }), l)) {
            let d = c.charAt(u + i.length);
            return d && d !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
          }
          return "/([^\\/]+)";
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
  return (
    e.endsWith("*")
      ? (n.push({ paramName: "*" }),
        (o += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : r
        ? (o += "\\/*$")
        : e !== "" && e !== "/" && (o += "(?:(?=\\/|$))"),
    [new RegExp(o, t ? void 0 : "i"), n]
  );
}
function VS(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      Wr(
        !1,
        `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`,
      ),
      e
    );
  }
}
function an(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length,
    n = e.charAt(r);
  return n && n !== "/" ? null : e.slice(r) || "/";
}
function qS(e, t = "/") {
  let {
      pathname: r,
      search: n = "",
      hash: o = "",
    } = typeof e == "string" ? va(e) : e,
    a;
  return (
    r
      ? ((r = by(r)),
        r.startsWith("/") ? (a = Ih(r.substring(1), "/")) : (a = Ih(r, t)))
      : (a = t),
    { pathname: a, search: GS(n), hash: XS(o) }
  );
}
function Ih(e, t) {
  let r = gl(t).split("/");
  return (
    e.split("/").forEach((o) => {
      o === ".." ? r.length > 1 && r.pop() : o !== "." && r.push(o);
    }),
    r.length > 1 ? r.join("/") : "/"
  );
}
function zu(e, t, r, n) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(n)}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function QS(e) {
  return e.filter(
    (t, r) => r === 0 || (t.route.path && t.route.path.length > 0),
  );
}
function _y(e) {
  let t = QS(e);
  return t.map((r, n) => (n === t.length - 1 ? r.pathname : r.pathnameBase));
}
function Lp(e, t, r, n = !1) {
  let o;
  typeof e == "string"
    ? (o = va(e))
    : ((o = { ...e }),
      Je(
        !o.pathname || !o.pathname.includes("?"),
        zu("?", "pathname", "search", o),
      ),
      Je(
        !o.pathname || !o.pathname.includes("#"),
        zu("#", "pathname", "hash", o),
      ),
      Je(!o.search || !o.search.includes("#"), zu("#", "search", "hash", o)));
  let a = e === "" || o.pathname === "",
    i = a ? "/" : o.pathname,
    s;
  if (i == null) s = r;
  else {
    let d = t.length - 1;
    if (!n && i.startsWith("..")) {
      let m = i.split("/");
      for (; m[0] === "..";) (m.shift(), (d -= 1));
      o.pathname = m.join("/");
    }
    s = d >= 0 ? t[d] : "/";
  }
  let l = qS(o, s),
    u = i && i !== "/" && i.endsWith("/"),
    c = (a || i === ".") && r.endsWith("/");
  return (!l.pathname.endsWith("/") && (u || c) && (l.pathname += "/"), l);
}
var by = (e) => e.replace(/[\\/]{2,}/g, "/"),
  _r = (e) => by(e.join("/")),
  gl = (e) => e.replace(/\/+$/, ""),
  KS = (e) => gl(e).replace(/^\/*/, "/"),
  GS = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  XS = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e),
  JS = class {
    constructor(e, t, r, n = !1) {
      ((this.status = e),
        (this.statusText = t || ""),
        (this.internal = n),
        r instanceof Error
          ? ((this.data = r.toString()), (this.error = r))
          : (this.data = r));
    }
  };
function ZS(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
function eC(e) {
  let t = e.map((r) => r.route.path).filter(Boolean);
  return _r(t) || "/";
}
var Dy =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
function Ty(e, t) {
  let r = e;
  if (typeof r != "string" || !jp.test(r))
    return { absoluteURL: void 0, isExternal: !1, to: r };
  let n = r,
    o = !1;
  if (Dy)
    try {
      let a = new URL(window.location.href),
        i = wy.test(r) ? new URL(PS(r, a.protocol)) : new URL(r),
        s = an(i.pathname, t);
      i.origin === a.origin && s != null
        ? (r = s + i.search + i.hash)
        : (o = !0);
    } catch {
      Wr(
        !1,
        `<Link to="${r}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
      );
    }
  return { absoluteURL: n, isExternal: o, to: r };
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
var Py = ["POST", "PUT", "PATCH", "DELETE"];
new Set(Py);
var tC = ["GET", ...Py];
new Set(tC);
var rC = [
  "about:",
  "blob:",
  "chrome:",
  "chrome-untrusted:",
  "content:",
  "data:",
  "devtools:",
  "file:",
  "filesystem:",
  "javascript:",
];
function nC(e) {
  try {
    return rC.includes(new URL(e).protocol);
  } catch {
    return !1;
  }
}
var ya = _.createContext(null);
ya.displayName = "DataRouter";
var tu = _.createContext(null);
tu.displayName = "DataRouterState";
var Ry = _.createContext(!1);
function oC() {
  return _.useContext(Ry);
}
var Oy = _.createContext({ isTransitioning: !1 });
Oy.displayName = "ViewTransition";
var aC = _.createContext(new Map());
aC.displayName = "Fetchers";
var iC = _.createContext(null);
iC.displayName = "Await";
var gr = _.createContext(null);
gr.displayName = "Navigation";
var Ai = _.createContext(null);
Ai.displayName = "Location";
var qr = _.createContext({ outlet: null, matches: [], isDataRoute: !1 });
qr.displayName = "Route";
var Ap = _.createContext(null);
Ap.displayName = "RouteError";
var Ny = "REACT_ROUTER_ERROR",
  sC = "REDIRECT",
  lC = "ROUTE_ERROR_RESPONSE";
function uC(e) {
  if (e.startsWith(`${Ny}:${sC}:{`))
    try {
      let t = JSON.parse(e.slice(28));
      if (
        typeof t == "object" &&
        t &&
        typeof t.status == "number" &&
        typeof t.statusText == "string" &&
        typeof t.location == "string" &&
        typeof t.reloadDocument == "boolean" &&
        typeof t.replace == "boolean"
      )
        return t;
    } catch {}
}
function cC(e) {
  if (e.startsWith(`${Ny}:${lC}:{`))
    try {
      let t = JSON.parse(e.slice(40));
      if (
        typeof t == "object" &&
        t &&
        typeof t.status == "number" &&
        typeof t.statusText == "string"
      )
        return new JS(t.status, t.statusText, t.data);
    } catch {}
}
function dC(e, { relative: t } = {}) {
  Je(
    Fi(),
    "useHref() may be used only in the context of a <Router> component.",
  );
  let { basename: r, navigator: n } = _.useContext(gr),
    { hash: o, pathname: a, search: i } = Bi(e, { relative: t }),
    s = a;
  return (
    r !== "/" && (s = a === "/" ? r : _r([r, a])),
    n.createHref({ pathname: s, search: i, hash: o })
  );
}
function Fi() {
  return _.useContext(Ai) != null;
}
function cn() {
  return (
    Je(
      Fi(),
      "useLocation() may be used only in the context of a <Router> component.",
    ),
    _.useContext(Ai).location
  );
}
var My =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Iy(e) {
  _.useContext(gr).static || _.useLayoutEffect(e);
}
function wa() {
  let { isDataRoute: e } = _.useContext(qr);
  return e ? EC() : pC();
}
function pC() {
  Je(
    Fi(),
    "useNavigate() may be used only in the context of a <Router> component.",
  );
  let e = _.useContext(ya),
    { basename: t, navigator: r } = _.useContext(gr),
    { matches: n } = _.useContext(qr),
    { pathname: o } = cn(),
    a = JSON.stringify(_y(n)),
    i = _.useRef(!1);
  return (
    Iy(() => {
      i.current = !0;
    }),
    _.useCallback(
      (l, u = {}) => {
        if ((Wr(i.current, My), !i.current)) return;
        if (typeof l == "number") {
          r.go(l);
          return;
        }
        let c = Lp(l, JSON.parse(a), o, u.relative === "path");
        (e == null &&
          t !== "/" &&
          (c.pathname = c.pathname === "/" ? t : _r([t, c.pathname])),
          (u.replace ? r.replace : r.push)(c, u.state, u));
      },
      [t, r, a, o, e],
    )
  );
}
_.createContext(null);
function jy() {
  let { matches: e } = _.useContext(qr),
    t = e[e.length - 1];
  return (t == null ? void 0 : t.params) ?? {};
}
function Bi(e, { relative: t } = {}) {
  let { matches: r } = _.useContext(qr),
    { pathname: n } = cn(),
    o = JSON.stringify(_y(r));
  return _.useMemo(() => Lp(e, JSON.parse(o), n, t === "path"), [e, o, n, t]);
}
function fC(e, t) {
  return Ly(e, t);
}
function Ly(e, t, r) {
  var k;
  Je(
    Fi(),
    "useRoutes() may be used only in the context of a <Router> component.",
  );
  let { navigator: n } = _.useContext(gr),
    { matches: o } = _.useContext(qr),
    a = o[o.length - 1],
    i = a ? a.params : {},
    s = a ? a.pathname : "/",
    l = a ? a.pathnameBase : "/",
    u = a && a.route;
  {
    let g = (u && u.path) || "";
    Fy(
      s,
      !u || g.endsWith("*") || g.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${g}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${g}"> to <Route path="${g === "/" ? "*" : `${g}/*`}">.`,
    );
  }
  let c = cn(),
    d;
  if (t) {
    let g = typeof t == "string" ? va(t) : t;
    (Je(
      l === "/" || ((k = g.pathname) == null ? void 0 : k.startsWith(l)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${l}" but pathname "${g.pathname}" was given in the \`location\` prop.`,
    ),
      (d = g));
  } else d = c;
  let m = d.pathname || "/",
    v = m;
  if (l !== "/") {
    let g = l.replace(/^\//, "").split("/");
    v = "/" + m.replace(/^\//, "").split("/").slice(g.length).join("/");
  }
  let S =
    r && r.state.matches.length
      ? r.state.matches.map((g) =>
          Object.assign(g, { route: r.manifest[g.route.id] || g.route }),
        )
      : xy(e, { pathname: v });
  (Wr(
    u || S != null,
    `No routes matched location "${d.pathname}${d.search}${d.hash}" `,
  ),
    Wr(
      S == null ||
        S[S.length - 1].route.element !== void 0 ||
        S[S.length - 1].route.Component !== void 0 ||
        S[S.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    ));
  let C = yC(
    S &&
      S.map((g) =>
        Object.assign({}, g, {
          params: Object.assign({}, i, g.params),
          pathname: _r([
            l,
            n.encodeLocation
              ? n.encodeLocation(
                  g.pathname
                    .replace(/%/g, "%25")
                    .replace(/\?/g, "%3F")
                    .replace(/#/g, "%23"),
                ).pathname
              : g.pathname,
          ]),
          pathnameBase:
            g.pathnameBase === "/"
              ? l
              : _r([
                  l,
                  n.encodeLocation
                    ? n.encodeLocation(
                        g.pathnameBase
                          .replace(/%/g, "%25")
                          .replace(/\?/g, "%3F")
                          .replace(/#/g, "%23"),
                      ).pathname
                    : g.pathnameBase,
                ]),
        }),
      ),
    o,
    r,
  );
  return t && C
    ? _.createElement(
        Ai.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              mask: void 0,
              ...d,
            },
            navigationType: "POP",
          },
        },
        C,
      )
    : C;
}
function hC() {
  let e = kC(),
    t = ZS(e)
      ? `${e.status} ${e.statusText}`
      : e instanceof Error
        ? e.message
        : JSON.stringify(e),
    r = e instanceof Error ? e.stack : null,
    n = "rgba(200,200,200, 0.5)",
    o = { padding: "0.5rem", backgroundColor: n },
    a = { padding: "2px 4px", backgroundColor: n },
    i = null;
  return (
    console.error("Error handled by React Router default ErrorBoundary:", e),
    (i = _.createElement(
      _.Fragment,
      null,
      _.createElement("p", null, "💿 Hey developer 👋"),
      _.createElement(
        "p",
        null,
        "You can provide a way better UX than this when your app throws errors by providing your own ",
        _.createElement("code", { style: a }, "ErrorBoundary"),
        " or",
        " ",
        _.createElement("code", { style: a }, "errorElement"),
        " prop on your route.",
      ),
    )),
    _.createElement(
      _.Fragment,
      null,
      _.createElement("h2", null, "Unexpected Application Error!"),
      _.createElement("h3", { style: { fontStyle: "italic" } }, t),
      r ? _.createElement("pre", { style: o }, r) : null,
      i,
    )
  );
}
var mC = _.createElement(hC, null),
  Ay = class extends _.Component {
    constructor(e) {
      (super(e),
        (this.state = {
          location: e.location,
          revalidation: e.revalidation,
          error: e.error,
        }));
    }
    static getDerivedStateFromError(e) {
      return { error: e };
    }
    static getDerivedStateFromProps(e, t) {
      return t.location !== e.location ||
        (t.revalidation !== "idle" && e.revalidation === "idle")
        ? { error: e.error, location: e.location, revalidation: e.revalidation }
        : {
            error: e.error !== void 0 ? e.error : t.error,
            location: t.location,
            revalidation: e.revalidation || t.revalidation,
          };
    }
    componentDidCatch(e, t) {
      this.props.onError
        ? this.props.onError(e, t)
        : console.error(
            "React Router caught the following error during render",
            e,
          );
    }
    render() {
      let e = this.state.error;
      if (
        this.context &&
        typeof e == "object" &&
        e &&
        "digest" in e &&
        typeof e.digest == "string"
      ) {
        const r = cC(e.digest);
        r && (e = r);
      }
      let t =
        e !== void 0
          ? _.createElement(
              qr.Provider,
              { value: this.props.routeContext },
              _.createElement(Ap.Provider, {
                value: e,
                children: this.props.component,
              }),
            )
          : this.props.children;
      return this.context ? _.createElement(gC, { error: e }, t) : t;
    }
  };
Ay.contextType = Ry;
var Hu = new WeakMap();
function gC({ children: e, error: t }) {
  let { basename: r } = _.useContext(gr);
  if (
    typeof t == "object" &&
    t &&
    "digest" in t &&
    typeof t.digest == "string"
  ) {
    let n = uC(t.digest);
    if (n) {
      let o = Hu.get(t);
      if (o) throw o;
      let a = Ty(n.location, r),
        i = a.absoluteURL || a.to;
      if (nC(i)) throw new Error("Invalid redirect location");
      if (Dy && !Hu.get(t))
        if (a.isExternal || n.reloadDocument) window.location.href = i;
        else {
          const s = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(a.to, {
              replace: n.replace,
            }),
          );
          throw (Hu.set(t, s), s);
        }
      return _.createElement("meta", {
        httpEquiv: "refresh",
        content: `0;url=${i}`,
      });
    }
  }
  return e;
}
function vC({ routeContext: e, match: t, children: r }) {
  let n = _.useContext(ya);
  return (
    n &&
      n.static &&
      n.staticContext &&
      (t.route.errorElement || t.route.ErrorBoundary) &&
      (n.staticContext._deepestRenderedBoundaryId = t.route.id),
    _.createElement(qr.Provider, { value: e }, r)
  );
}
function yC(e, t = [], r) {
  let n = r == null ? void 0 : r.state;
  if (e == null) {
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (t.length === 0 && !n.initialized && n.matches.length > 0)
      e = n.matches;
    else return null;
  }
  let o = e,
    a = n == null ? void 0 : n.errors;
  if (a != null) {
    let c = o.findIndex(
      (d) => d.route.id && (a == null ? void 0 : a[d.route.id]) !== void 0,
    );
    (Je(
      c >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(a).join(",")}`,
    ),
      (o = o.slice(0, Math.min(o.length, c + 1))));
  }
  let i = !1,
    s = -1;
  if (r && n) {
    i = n.renderFallback;
    for (let c = 0; c < o.length; c++) {
      let d = o[c];
      if (
        ((d.route.HydrateFallback || d.route.hydrateFallbackElement) && (s = c),
        d.route.id)
      ) {
        let { loaderData: m, errors: v } = n,
          S =
            d.route.loader &&
            !m.hasOwnProperty(d.route.id) &&
            (!v || v[d.route.id] === void 0);
        if (d.route.lazy || S) {
          (r.isStatic && (i = !0),
            s >= 0 ? (o = o.slice(0, s + 1)) : (o = [o[0]]));
          break;
        }
      }
    }
  }
  let l = r == null ? void 0 : r.onError,
    u =
      n && l
        ? (c, d) => {
            var m, v;
            l(c, {
              location: n.location,
              params:
                ((v = (m = n.matches) == null ? void 0 : m[0]) == null
                  ? void 0
                  : v.params) ?? {},
              pattern: eC(n.matches),
              errorInfo: d,
            });
          }
        : void 0;
  return o.reduceRight((c, d, m) => {
    let v,
      S = !1,
      C = null,
      k = null;
    n &&
      ((v = a && d.route.id ? a[d.route.id] : void 0),
      (C = d.route.errorElement || mC),
      i &&
        (s < 0 && m === 0
          ? (Fy(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration",
            ),
            (S = !0),
            (k = null))
          : s === m &&
            ((S = !0), (k = d.route.hydrateFallbackElement || null))));
    let g = t.concat(o.slice(0, m + 1)),
      y = () => {
        let w;
        return (
          v
            ? (w = C)
            : S
              ? (w = k)
              : d.route.Component
                ? (w = _.createElement(d.route.Component, null))
                : d.route.element
                  ? (w = d.route.element)
                  : (w = c),
          _.createElement(vC, {
            match: d,
            routeContext: { outlet: c, matches: g, isDataRoute: n != null },
            children: w,
          })
        );
      };
    return n && (d.route.ErrorBoundary || d.route.errorElement || m === 0)
      ? _.createElement(Ay, {
          location: n.location,
          revalidation: n.revalidation,
          component: C,
          error: v,
          children: y(),
          routeContext: { outlet: null, matches: g, isDataRoute: !0 },
          onError: u,
        })
      : y();
  }, null);
}
function Fp(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function wC(e) {
  let t = _.useContext(ya);
  return (Je(t, Fp(e)), t);
}
function xC(e) {
  let t = _.useContext(tu);
  return (Je(t, Fp(e)), t);
}
function SC(e) {
  let t = _.useContext(qr);
  return (Je(t, Fp(e)), t);
}
function Bp(e) {
  let t = SC(e),
    r = t.matches[t.matches.length - 1];
  return (
    Je(
      r.route.id,
      `${e} can only be used on routes that contain a unique "id"`,
    ),
    r.route.id
  );
}
function CC() {
  return Bp("useRouteId");
}
function kC() {
  var n;
  let e = _.useContext(Ap),
    t = xC("useRouteError"),
    r = Bp("useRouteError");
  return e !== void 0 ? e : (n = t.errors) == null ? void 0 : n[r];
}
function EC() {
  let { router: e } = wC("useNavigate"),
    t = Bp("useNavigate"),
    r = _.useRef(!1);
  return (
    Iy(() => {
      r.current = !0;
    }),
    _.useCallback(
      async (o, a = {}) => {
        (Wr(r.current, My),
          r.current &&
            (typeof o == "number"
              ? await e.navigate(o)
              : await e.navigate(o, { fromRouteId: t, ...a })));
      },
      [e, t],
    )
  );
}
var jh = {};
function Fy(e, t, r) {
  !t && !jh[e] && ((jh[e] = !0), Wr(!1, r));
}
_.memo(_C);
function _C({
  routes: e,
  manifest: t,
  future: r,
  state: n,
  isStatic: o,
  onError: a,
}) {
  return Ly(e, void 0, { manifest: t, state: n, isStatic: o, onError: a });
}
function It(e) {
  Je(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.",
  );
}
function bC({
  basename: e = "/",
  children: t = null,
  location: r,
  navigationType: n = "POP",
  navigator: o,
  static: a = !1,
  useTransitions: i,
}) {
  Je(
    !Fi(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.",
  );
  let s = e.replace(/^\/*/, "/"),
    l = _.useMemo(
      () => ({
        basename: s,
        navigator: o,
        static: a,
        useTransitions: i,
        future: {},
      }),
      [s, o, a, i],
    );
  typeof r == "string" && (r = va(r));
  let {
      pathname: u = "/",
      search: c = "",
      hash: d = "",
      state: m = null,
      key: v = "default",
      mask: S,
    } = r,
    C = _.useMemo(() => {
      let k = an(u, s);
      return k == null
        ? null
        : {
            location: {
              pathname: k,
              search: c,
              hash: d,
              state: m,
              key: v,
              mask: S,
            },
            navigationType: n,
          };
    }, [s, u, c, d, m, v, n, S]);
  return (
    Wr(
      C != null,
      `<Router basename="${s}"> is not able to match the URL "${u}${c}${d}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    C == null
      ? null
      : _.createElement(
          gr.Provider,
          { value: l },
          _.createElement(Ai.Provider, { children: t, value: C }),
        )
  );
}
function DC({ children: e, location: t }) {
  return fC(dd(e), t);
}
function dd(e, t = []) {
  let r = [];
  return (
    _.Children.forEach(e, (n, o) => {
      if (!_.isValidElement(n)) return;
      let a = [...t, o];
      if (n.type === _.Fragment) {
        r.push.apply(r, dd(n.props.children, a));
        return;
      }
      (Je(
        n.type === It,
        `[${typeof n.type == "string" ? n.type : n.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
      ),
        Je(
          !n.props.index || !n.props.children,
          "An index route cannot have child routes.",
        ));
      let i = {
        id: n.props.id || a.join("-"),
        caseSensitive: n.props.caseSensitive,
        element: n.props.element,
        Component: n.props.Component,
        index: n.props.index,
        path: n.props.path,
        middleware: n.props.middleware,
        loader: n.props.loader,
        action: n.props.action,
        hydrateFallbackElement: n.props.hydrateFallbackElement,
        HydrateFallback: n.props.HydrateFallback,
        errorElement: n.props.errorElement,
        ErrorBoundary: n.props.ErrorBoundary,
        hasErrorBoundary:
          n.props.hasErrorBoundary === !0 ||
          n.props.ErrorBoundary != null ||
          n.props.errorElement != null,
        shouldRevalidate: n.props.shouldRevalidate,
        handle: n.props.handle,
        lazy: n.props.lazy,
      };
      (n.props.children && (i.children = dd(n.props.children, a)), r.push(i));
    }),
    r
  );
}
var Ts = "get",
  Ps = "application/x-www-form-urlencoded";
function ru(e) {
  return typeof HTMLElement < "u" && e instanceof HTMLElement;
}
function TC(e) {
  return ru(e) && e.tagName.toLowerCase() === "button";
}
function PC(e) {
  return ru(e) && e.tagName.toLowerCase() === "form";
}
function RC(e) {
  return ru(e) && e.tagName.toLowerCase() === "input";
}
function OC(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function NC(e, t) {
  return e.button === 0 && (!t || t === "_self") && !OC(e);
}
var cs = null;
function MC() {
  if (cs === null)
    try {
      (new FormData(document.createElement("form"), 0), (cs = !1));
    } catch {
      cs = !0;
    }
  return cs;
}
var IC = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function Wu(e) {
  return e != null && !IC.has(e)
    ? (Wr(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ps}"`,
      ),
      null)
    : e;
}
function jC(e, t) {
  let r, n, o, a, i;
  if (PC(e)) {
    let s = e.getAttribute("action");
    ((n = s ? an(s, t) : null),
      (r = e.getAttribute("method") || Ts),
      (o = Wu(e.getAttribute("enctype")) || Ps),
      (a = new FormData(e)));
  } else if (TC(e) || (RC(e) && (e.type === "submit" || e.type === "image"))) {
    let s = e.form;
    if (s == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>',
      );
    let l = e.getAttribute("formaction") || s.getAttribute("action");
    if (
      ((n = l ? an(l, t) : null),
      (r = e.getAttribute("formmethod") || s.getAttribute("method") || Ts),
      (o =
        Wu(e.getAttribute("formenctype")) ||
        Wu(s.getAttribute("enctype")) ||
        Ps),
      (a = new FormData(s, e)),
      !MC())
    ) {
      let { name: u, type: c, value: d } = e;
      if (c === "image") {
        let m = u ? `${u}.` : "";
        (a.append(`${m}x`, "0"), a.append(`${m}y`, "0"));
      } else u && a.append(u, d);
    }
  } else {
    if (ru(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">',
      );
    ((r = Ts), (n = null), (o = Ps), (i = e));
  }
  return (
    a && o === "text/plain" && ((i = a), (a = void 0)),
    { action: n, method: r.toLowerCase(), encType: o, formData: a, body: i }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function Up(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function By(e, t, r, n) {
  let o =
    typeof e == "string"
      ? new URL(
          e,
          typeof window > "u"
            ? "server://singlefetch/"
            : window.location.origin,
        )
      : e;
  return (
    r
      ? o.pathname.endsWith("/")
        ? (o.pathname = `${o.pathname}_.${n}`)
        : (o.pathname = `${o.pathname}.${n}`)
      : o.pathname === "/"
        ? (o.pathname = `_root.${n}`)
        : t && an(o.pathname, t) === "/"
          ? (o.pathname = `${gl(t)}/_root.${n}`)
          : (o.pathname = `${gl(o.pathname)}.${n}`),
    o
  );
}
async function LC(e, t) {
  if (e.id in t) return t[e.id];
  try {
    let r = await import(e.module);
    return ((t[e.id] = r), r);
  } catch (r) {
    return (
      console.error(
        `Error loading route module \`${e.module}\`, reloading page...`,
      ),
      console.error(r),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function AC(e) {
  return e == null
    ? !1
    : e.href == null
      ? e.rel === "preload" &&
        typeof e.imageSrcSet == "string" &&
        typeof e.imageSizes == "string"
      : typeof e.rel == "string" && typeof e.href == "string";
}
async function FC(e, t, r) {
  let n = await Promise.all(
    e.map(async (o) => {
      let a = t.routes[o.route.id];
      if (a) {
        let i = await LC(a, r);
        return i.links ? i.links() : [];
      }
      return [];
    }),
  );
  return YC(
    n
      .flat(1)
      .filter(AC)
      .filter((o) => o.rel === "stylesheet" || o.rel === "preload")
      .map((o) =>
        o.rel === "stylesheet"
          ? { ...o, rel: "prefetch", as: "style" }
          : { ...o, rel: "prefetch" },
      ),
  );
}
function Lh(e, t, r, n, o, a) {
  let i = (l, u) => (r[u] ? l.route.id !== r[u].route.id : !0),
    s = (l, u) => {
      var c;
      return (
        r[u].pathname !== l.pathname ||
        (((c = r[u].route.path) == null ? void 0 : c.endsWith("*")) &&
          r[u].params["*"] !== l.params["*"])
      );
    };
  return a === "assets"
    ? t.filter((l, u) => i(l, u) || s(l, u))
    : a === "data"
      ? t.filter((l, u) => {
          var d;
          let c = n.routes[l.route.id];
          if (!c || !c.hasLoader) return !1;
          if (i(l, u) || s(l, u)) return !0;
          if (l.route.shouldRevalidate) {
            let m = l.route.shouldRevalidate({
              currentUrl: new URL(
                o.pathname + o.search + o.hash,
                window.origin,
              ),
              currentParams: ((d = r[0]) == null ? void 0 : d.params) || {},
              nextUrl: new URL(e, window.origin),
              nextParams: l.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof m == "boolean") return m;
          }
          return !0;
        })
      : [];
}
function BC(e, t, { includeHydrateFallback: r } = {}) {
  return UC(
    e
      .map((n) => {
        let o = t.routes[n.route.id];
        if (!o) return [];
        let a = [o.module];
        return (
          o.clientActionModule && (a = a.concat(o.clientActionModule)),
          o.clientLoaderModule && (a = a.concat(o.clientLoaderModule)),
          r &&
            o.hydrateFallbackModule &&
            (a = a.concat(o.hydrateFallbackModule)),
          o.imports && (a = a.concat(o.imports)),
          a
        );
      })
      .flat(1),
  );
}
function UC(e) {
  return [...new Set(e)];
}
function $C(e) {
  let t = {},
    r = Object.keys(e).sort();
  for (let n of r) t[n] = e[n];
  return t;
}
function YC(e, t) {
  let r = new Set();
  return (
    new Set(t),
    e.reduce((n, o) => {
      let a = JSON.stringify($C(o));
      return (r.has(a) || (r.add(a), n.push({ key: a, link: o })), n);
    }, [])
  );
}
function $p() {
  let e = _.useContext(ya);
  return (
    Up(
      e,
      "You must render this element inside a <DataRouterContext.Provider> element",
    ),
    e
  );
}
function zC() {
  let e = _.useContext(tu);
  return (
    Up(
      e,
      "You must render this element inside a <DataRouterStateContext.Provider> element",
    ),
    e
  );
}
var Yp = _.createContext(void 0);
Yp.displayName = "FrameworkContext";
function nu() {
  let e = _.useContext(Yp);
  return (
    Up(e, "You must render this element inside a <HydratedRouter> element"),
    e
  );
}
function HC(e, t) {
  let r = _.useContext(Yp),
    [n, o] = _.useState(!1),
    [a, i] = _.useState(!1),
    {
      onFocus: s,
      onBlur: l,
      onMouseEnter: u,
      onMouseLeave: c,
      onTouchStart: d,
    } = t,
    m = _.useRef(null);
  (_.useEffect(() => {
    if ((e === "render" && i(!0), e === "viewport")) {
      let C = (g) => {
          g.forEach((y) => {
            i(y.isIntersecting);
          });
        },
        k = new IntersectionObserver(C, { threshold: 0.5 });
      return (
        m.current && k.observe(m.current),
        () => {
          k.disconnect();
        }
      );
    }
  }, [e]),
    _.useEffect(() => {
      if (n) {
        let C = setTimeout(() => {
          i(!0);
        }, 100);
        return () => {
          clearTimeout(C);
        };
      }
    }, [n]));
  let v = () => {
      o(!0);
    },
    S = () => {
      (o(!1), i(!1));
    };
  return r
    ? e !== "intent"
      ? [a, m, {}]
      : [
          a,
          m,
          {
            onFocus: Na(s, v),
            onBlur: Na(l, S),
            onMouseEnter: Na(u, v),
            onMouseLeave: Na(c, S),
            onTouchStart: Na(d, v),
          },
        ]
    : [!1, m, {}];
}
function Na(e, t) {
  return (r) => {
    (e && e(r), r.defaultPrevented || t(r));
  };
}
function WC({ page: e, ...t }) {
  let r = oC(),
    { nonce: n } = nu(),
    { router: o } = $p(),
    a = _.useMemo(() => xy(o.routes, e, o.basename), [o.routes, e, o.basename]);
  return a
    ? (t.nonce == null && n && (t = { ...t, nonce: n }),
      r
        ? _.createElement(qC, { page: e, matches: a, ...t })
        : _.createElement(QC, { page: e, matches: a, ...t }))
    : null;
}
function VC(e) {
  let { manifest: t, routeModules: r } = nu(),
    [n, o] = _.useState([]);
  return (
    _.useEffect(() => {
      let a = !1;
      return (
        FC(e, t, r).then((i) => {
          a || o(i);
        }),
        () => {
          a = !0;
        }
      );
    }, [e, t, r]),
    n
  );
}
function qC({ page: e, matches: t, ...r }) {
  let n = cn(),
    { future: o } = nu(),
    { basename: a } = $p(),
    i = _.useMemo(() => {
      if (e === n.pathname + n.search + n.hash) return [];
      let s = By(e, a, o.v8_trailingSlashAwareDataRequests, "rsc"),
        l = !1,
        u = [];
      for (let c of t)
        typeof c.route.shouldRevalidate == "function"
          ? (l = !0)
          : u.push(c.route.id);
      return (
        l && u.length > 0 && s.searchParams.set("_routes", u.join(",")),
        [s.pathname + s.search]
      );
    }, [a, o.v8_trailingSlashAwareDataRequests, e, n, t]);
  return _.createElement(
    _.Fragment,
    null,
    i.map((s) =>
      _.createElement("link", {
        key: s,
        rel: "prefetch",
        as: "fetch",
        href: s,
        ...r,
      }),
    ),
  );
}
function QC({ page: e, matches: t, ...r }) {
  let n = cn(),
    { future: o, manifest: a, routeModules: i } = nu(),
    { basename: s } = $p(),
    { loaderData: l, matches: u } = zC(),
    c = _.useMemo(() => Lh(e, t, u, a, n, "data"), [e, t, u, a, n]),
    d = _.useMemo(() => Lh(e, t, u, a, n, "assets"), [e, t, u, a, n]),
    m = _.useMemo(() => {
      if (e === n.pathname + n.search + n.hash) return [];
      let C = new Set(),
        k = !1;
      if (
        (t.forEach((y) => {
          var T;
          let w = a.routes[y.route.id];
          !w ||
            !w.hasLoader ||
            ((!c.some((P) => P.route.id === y.route.id) &&
              y.route.id in l &&
              (T = i[y.route.id]) != null &&
              T.shouldRevalidate) ||
            w.hasClientLoader
              ? (k = !0)
              : C.add(y.route.id));
        }),
        C.size === 0)
      )
        return [];
      let g = By(e, s, o.v8_trailingSlashAwareDataRequests, "data");
      return (
        k &&
          C.size > 0 &&
          g.searchParams.set(
            "_routes",
            t
              .filter((y) => C.has(y.route.id))
              .map((y) => y.route.id)
              .join(","),
          ),
        [g.pathname + g.search]
      );
    }, [s, o.v8_trailingSlashAwareDataRequests, l, n, a, c, t, e, i]),
    v = _.useMemo(() => BC(d, a), [d, a]),
    S = VC(d);
  return _.createElement(
    _.Fragment,
    null,
    m.map((C) =>
      _.createElement("link", {
        key: C,
        rel: "prefetch",
        as: "fetch",
        href: C,
        ...r,
      }),
    ),
    v.map((C) =>
      _.createElement("link", { key: C, rel: "modulepreload", href: C, ...r }),
    ),
    S.map(({ key: C, link: k }) =>
      _.createElement("link", {
        key: C,
        nonce: r.nonce,
        ...k,
        crossOrigin: k.crossOrigin ?? r.crossOrigin,
      }),
    ),
  );
}
function KC(...e) {
  return (t) => {
    e.forEach((r) => {
      typeof r == "function" ? r(t) : r != null && (r.current = t);
    });
  };
}
var GC =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  GC && (window.__reactRouterVersion = "7.18.0");
} catch {}
function XC({ basename: e, children: t, useTransitions: r, window: n }) {
  let o = _.useRef();
  o.current == null && (o.current = RS({ window: n, v5Compat: !0 }));
  let a = o.current,
    [i, s] = _.useState({ action: a.action, location: a.location }),
    l = _.useCallback(
      (u) => {
        r === !1 ? s(u) : _.startTransition(() => s(u));
      },
      [r],
    );
  return (
    _.useLayoutEffect(() => a.listen(l), [a, l]),
    _.createElement(bC, {
      basename: e,
      children: t,
      location: i.location,
      navigationType: i.action,
      navigator: a,
      useTransitions: r,
    })
  );
}
var or = _.forwardRef(function (
  {
    onClick: t,
    discover: r = "render",
    prefetch: n = "none",
    relative: o,
    reloadDocument: a,
    replace: i,
    mask: s,
    state: l,
    target: u,
    to: c,
    preventScrollReset: d,
    viewTransition: m,
    defaultShouldRevalidate: v,
    ...S
  },
  C,
) {
  let { basename: k, navigator: g, useTransitions: y } = _.useContext(gr),
    w = typeof c == "string" && jp.test(c),
    T = Ty(c, k);
  c = T.to;
  let P = dC(c, { relative: o }),
    R = cn(),
    M = null;
  if (s) {
    let U = Lp(s, [], R.mask ? R.mask.pathname : "/", !0);
    (k !== "/" && (U.pathname = U.pathname === "/" ? k : _r([k, U.pathname])),
      (M = g.createHref(U)));
  }
  let [A, V, L] = HC(n, S),
    K = tk(c, {
      replace: i,
      mask: s,
      state: l,
      target: u,
      preventScrollReset: d,
      relative: o,
      viewTransition: m,
      defaultShouldRevalidate: v,
      useTransitions: y,
    });
  function $(U) {
    (t && t(U), U.defaultPrevented || K(U));
  }
  let ae = !(T.isExternal || a),
    le = _.createElement("a", {
      ...S,
      ...L,
      href: (ae ? M : void 0) || T.absoluteURL || P,
      onClick: ae ? $ : t,
      ref: KC(C, V),
      target: u,
      "data-discover": !w && r === "render" ? "true" : void 0,
    });
  return A && !w
    ? _.createElement(_.Fragment, null, le, _.createElement(WC, { page: P }))
    : le;
});
or.displayName = "Link";
var JC = _.forwardRef(function (
  {
    "aria-current": t = "page",
    caseSensitive: r = !1,
    className: n = "",
    end: o = !1,
    style: a,
    to: i,
    viewTransition: s,
    children: l,
    ...u
  },
  c,
) {
  let d = Bi(i, { relative: u.relative }),
    m = cn(),
    v = _.useContext(tu),
    { navigator: S, basename: C } = _.useContext(gr),
    k = v != null && ik(d) && s === !0,
    g = S.encodeLocation ? S.encodeLocation(d).pathname : d.pathname,
    y = m.pathname,
    w =
      v && v.navigation && v.navigation.location
        ? v.navigation.location.pathname
        : null;
  (r ||
    ((y = y.toLowerCase()),
    (w = w ? w.toLowerCase() : null),
    (g = g.toLowerCase())),
    w && C && (w = an(w, C) || w));
  const T = g !== "/" && g.endsWith("/") ? g.length - 1 : g.length;
  let P = y === g || (!o && y.startsWith(g) && y.charAt(T) === "/"),
    R =
      w != null &&
      (w === g || (!o && w.startsWith(g) && w.charAt(g.length) === "/")),
    M = { isActive: P, isPending: R, isTransitioning: k },
    A = P ? t : void 0,
    V;
  typeof n == "function"
    ? (V = n(M))
    : (V = [
        n,
        P ? "active" : null,
        R ? "pending" : null,
        k ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let L = typeof a == "function" ? a(M) : a;
  return _.createElement(
    or,
    {
      ...u,
      "aria-current": A,
      className: V,
      ref: c,
      style: L,
      to: i,
      viewTransition: s,
    },
    typeof l == "function" ? l(M) : l,
  );
});
JC.displayName = "NavLink";
var ZC = _.forwardRef(
  (
    {
      discover: e = "render",
      fetcherKey: t,
      navigate: r,
      reloadDocument: n,
      replace: o,
      state: a,
      method: i = Ts,
      action: s,
      onSubmit: l,
      relative: u,
      preventScrollReset: c,
      viewTransition: d,
      defaultShouldRevalidate: m,
      ...v
    },
    S,
  ) => {
    let { useTransitions: C } = _.useContext(gr),
      k = ok(),
      g = ak(s, { relative: u }),
      y = i.toLowerCase() === "get" ? "get" : "post",
      w = typeof s == "string" && jp.test(s),
      T = (P) => {
        if ((l && l(P), P.defaultPrevented)) return;
        P.preventDefault();
        let R = P.nativeEvent.submitter,
          M = (R == null ? void 0 : R.getAttribute("formmethod")) || i,
          A = () =>
            k(R || P.currentTarget, {
              fetcherKey: t,
              method: M,
              navigate: r,
              replace: o,
              state: a,
              relative: u,
              preventScrollReset: c,
              viewTransition: d,
              defaultShouldRevalidate: m,
            });
        C && r !== !1 ? _.startTransition(() => A()) : A();
      };
    return _.createElement("form", {
      ref: S,
      method: y,
      action: g,
      onSubmit: n ? l : T,
      ...v,
      "data-discover": !w && e === "render" ? "true" : void 0,
    });
  },
);
ZC.displayName = "Form";
function ek(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Uy(e) {
  let t = _.useContext(ya);
  return (Je(t, ek(e)), t);
}
function tk(
  e,
  {
    target: t,
    replace: r,
    mask: n,
    state: o,
    preventScrollReset: a,
    relative: i,
    viewTransition: s,
    defaultShouldRevalidate: l,
    useTransitions: u,
  } = {},
) {
  let c = wa(),
    d = cn(),
    m = Bi(e, { relative: i });
  return _.useCallback(
    (v) => {
      if (NC(v, t)) {
        v.preventDefault();
        let S = r !== void 0 ? r : ki(d) === ki(m),
          C = () =>
            c(e, {
              replace: S,
              mask: n,
              state: o,
              preventScrollReset: a,
              relative: i,
              viewTransition: s,
              defaultShouldRevalidate: l,
            });
        u ? _.startTransition(() => C()) : C();
      }
    },
    [d, c, m, r, n, o, t, e, a, i, s, l, u],
  );
}
var rk = 0,
  nk = () => `__${String(++rk)}__`;
function ok() {
  let { router: e } = Uy("useSubmit"),
    { basename: t } = _.useContext(gr),
    r = CC(),
    n = e.fetch,
    o = e.navigate;
  return _.useCallback(
    async (a, i = {}) => {
      let { action: s, method: l, encType: u, formData: c, body: d } = jC(a, t);
      if (i.navigate === !1) {
        let m = i.fetcherKey || nk();
        await n(m, r, i.action || s, {
          defaultShouldRevalidate: i.defaultShouldRevalidate,
          preventScrollReset: i.preventScrollReset,
          formData: c,
          body: d,
          formMethod: i.method || l,
          formEncType: i.encType || u,
          flushSync: i.flushSync,
        });
      } else
        await o(i.action || s, {
          defaultShouldRevalidate: i.defaultShouldRevalidate,
          preventScrollReset: i.preventScrollReset,
          formData: c,
          body: d,
          formMethod: i.method || l,
          formEncType: i.encType || u,
          replace: i.replace,
          state: i.state,
          fromRouteId: r,
          flushSync: i.flushSync,
          viewTransition: i.viewTransition,
        });
    },
    [n, o, t, r],
  );
}
function ak(e, { relative: t } = {}) {
  let { basename: r } = _.useContext(gr),
    n = _.useContext(qr);
  Je(n, "useFormAction must be used inside a RouteContext");
  let [o] = n.matches.slice(-1),
    a = { ...Bi(e || ".", { relative: t }) },
    i = cn();
  if (e == null) {
    a.search = i.search;
    let s = new URLSearchParams(a.search),
      l = s.getAll("index");
    if (l.some((c) => c === "")) {
      (s.delete("index"),
        l.filter((d) => d).forEach((d) => s.append("index", d)));
      let c = s.toString();
      a.search = c ? `?${c}` : "";
    }
  }
  return (
    (!e || e === ".") &&
      o.route.index &&
      (a.search = a.search ? a.search.replace(/^\?/, "?index&") : "?index"),
    r !== "/" && (a.pathname = a.pathname === "/" ? r : _r([r, a.pathname])),
    ki(a)
  );
}
function ik(e, { relative: t } = {}) {
  let r = _.useContext(Oy);
  Je(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: n } = Uy("useViewTransitionState"),
    o = Bi(e, { relative: t });
  if (!r.isTransitioning) return !1;
  let a = an(r.currentLocation.pathname, n) || r.currentLocation.pathname,
    i = an(r.nextLocation.pathname, n) || r.nextLocation.pathname;
  return ml(o.pathname, i) != null || ml(o.pathname, a) != null;
}
const sk = () => {
  const [e, t] = _.useState({ nome: "", email: "", password: "" }),
    [r, n] = _.useState(""),
    o = wa(),
    a = (l) => {
      t({ ...e, [l.target.name]: l.target.value });
    },
    i = async (l) => {
      if ((l.preventDefault(), !e.nome || !e.email || !e.password)) {
        n("Todos os campos são obrigatórios!");
        return;
      }
      try {
        const u = await fetch("/registo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(e),
        });
        s();
        const c = await u.json();
        if (!u.ok) throw new Error(c.message || "Utilizador já registado!");
        (alert("Registo feito com sucesso!"), o("/"));
      } catch (u) {
        (s(), n(u.message));
      }
    },
    s = () => {
      (t({ nome: "", email: "", password: "" }), n(null));
    };
  return h.jsxs("div", {
    className: "Registo",
    children: [
      h.jsx("h2", { className: "Registo-titulo", children: "Registo" }),
      h.jsx("br", {}),
      h.jsxs("form", {
        onSubmit: i,
        autoComplete: "off",
        children: [
          h.jsxs("label", {
            children: [
              "Nome: ",
              h.jsx("span", { style: { color: "red" }, children: " *" }),
            ],
          }),
          h.jsx("input", {
            className: "nome",
            type: "text",
            name: "nome",
            value: e.nome,
            onChange: a,
            autoComplete: "off",
            required: !0,
          }),
          h.jsx("br", {}),
          h.jsx("br", {}),
          h.jsxs("label", {
            children: [
              "E-mail: ",
              h.jsx("span", { style: { color: "red" }, children: " *" }),
            ],
          }),
          h.jsx("input", {
            className: "email",
            type: "email",
            name: "email",
            value: e.email,
            onChange: a,
            autoComplete: "off",
            required: !0,
          }),
          h.jsx("br", {}),
          h.jsx("br", {}),
          h.jsxs("label", {
            children: [
              "Palavra-passe: ",
              h.jsx("span", { style: { color: "red" }, children: " *" }),
            ],
          }),
          h.jsx("input", {
            className: "pass",
            type: "password",
            name: "password",
            value: e.password,
            onChange: a,
            autoComplete: "new-password",
            required: !0,
          }),
          h.jsx("br", {}),
          h.jsx("br", {}),
          h.jsx("p", {
            style: { color: "red" },
            children: "* Campos de preenchimento obrigatório",
          }),
          h.jsx("button", { type: "submit", children: "Registar" }),
        ],
      }),
      r && h.jsx("p", { style: { color: "red" }, children: r }),
    ],
  });
};
var $y = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/ (function (e) {
  (function () {
    var t = {}.hasOwnProperty;
    function r() {
      for (var a = "", i = 0; i < arguments.length; i++) {
        var s = arguments[i];
        s && (a = o(a, n(s)));
      }
      return a;
    }
    function n(a) {
      if (typeof a == "string" || typeof a == "number") return a;
      if (typeof a != "object") return "";
      if (Array.isArray(a)) return r.apply(null, a);
      if (
        a.toString !== Object.prototype.toString &&
        !a.toString.toString().includes("[native code]")
      )
        return a.toString();
      var i = "";
      for (var s in a) t.call(a, s) && a[s] && (i = o(i, s));
      return i;
    }
    function o(a, i) {
      return i ? (a ? a + " " + i : a + i) : a;
    }
    e.exports ? ((r.default = r), (e.exports = r)) : (window.classNames = r);
  })();
})($y);
var lk = $y.exports;
const Ct = fa(lk);
function fr(e) {
  "@babel/helpers - typeof";
  return (
    (fr =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    fr(e)
  );
}
function W(e, t) {
  if (t.length < e)
    throw new TypeError(
      e +
        " argument" +
        (e > 1 ? "s" : "") +
        " required, but only " +
        t.length +
        " present",
    );
}
function ou(e) {
  return (
    W(1, arguments),
    e instanceof Date ||
      (fr(e) === "object" &&
        Object.prototype.toString.call(e) === "[object Date]")
  );
}
function te(e) {
  W(1, arguments);
  var t = Object.prototype.toString.call(e);
  return e instanceof Date || (fr(e) === "object" && t === "[object Date]")
    ? new Date(e.getTime())
    : typeof e == "number" || t === "[object Number]"
      ? new Date(e)
      : ((typeof e == "string" || t === "[object String]") &&
          typeof console < "u" &&
          (console.warn(
            "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments",
          ),
          console.warn(new Error().stack)),
        new Date(NaN));
}
function Ei(e) {
  if ((W(1, arguments), !ou(e) && typeof e != "number")) return !1;
  var t = te(e);
  return !isNaN(Number(t));
}
function ve(e) {
  if (e === null || e === !0 || e === !1) return NaN;
  var t = Number(e);
  return isNaN(t) ? t : t < 0 ? Math.ceil(t) : Math.floor(t);
}
function zp(e, t) {
  W(2, arguments);
  var r = te(e).getTime(),
    n = ve(t);
  return new Date(r + n);
}
function Yy(e, t) {
  W(2, arguments);
  var r = ve(t);
  return zp(e, -r);
}
var uk = 864e5;
function ck(e) {
  W(1, arguments);
  var t = te(e),
    r = t.getTime();
  (t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0));
  var n = t.getTime(),
    o = r - n;
  return Math.floor(o / uk) + 1;
}
function na(e) {
  W(1, arguments);
  var t = 1,
    r = te(e),
    n = r.getUTCDay(),
    o = (n < t ? 7 : 0) + n - t;
  return (r.setUTCDate(r.getUTCDate() - o), r.setUTCHours(0, 0, 0, 0), r);
}
function zy(e) {
  W(1, arguments);
  var t = te(e),
    r = t.getUTCFullYear(),
    n = new Date(0);
  (n.setUTCFullYear(r + 1, 0, 4), n.setUTCHours(0, 0, 0, 0));
  var o = na(n),
    a = new Date(0);
  (a.setUTCFullYear(r, 0, 4), a.setUTCHours(0, 0, 0, 0));
  var i = na(a);
  return t.getTime() >= o.getTime()
    ? r + 1
    : t.getTime() >= i.getTime()
      ? r
      : r - 1;
}
function dk(e) {
  W(1, arguments);
  var t = zy(e),
    r = new Date(0);
  (r.setUTCFullYear(t, 0, 4), r.setUTCHours(0, 0, 0, 0));
  var n = na(r);
  return n;
}
var pk = 6048e5;
function Hy(e) {
  W(1, arguments);
  var t = te(e),
    r = na(t).getTime() - dk(t).getTime();
  return Math.round(r / pk) + 1;
}
var fk = {};
function go() {
  return fk;
}
function lo(e, t) {
  var r, n, o, a, i, s, l, u;
  W(1, arguments);
  var c = go(),
    d = ve(
      (r =
        (n =
          (o =
            (a = t == null ? void 0 : t.weekStartsOn) !== null && a !== void 0
              ? a
              : t == null ||
                  (i = t.locale) === null ||
                  i === void 0 ||
                  (s = i.options) === null ||
                  s === void 0
                ? void 0
                : s.weekStartsOn) !== null && o !== void 0
            ? o
            : c.weekStartsOn) !== null && n !== void 0
          ? n
          : (l = c.locale) === null ||
              l === void 0 ||
              (u = l.options) === null ||
              u === void 0
            ? void 0
            : u.weekStartsOn) !== null && r !== void 0
        ? r
        : 0,
    );
  if (!(d >= 0 && d <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var m = te(e),
    v = m.getUTCDay(),
    S = (v < d ? 7 : 0) + v - d;
  return (m.setUTCDate(m.getUTCDate() - S), m.setUTCHours(0, 0, 0, 0), m);
}
function Hp(e, t) {
  var r, n, o, a, i, s, l, u;
  W(1, arguments);
  var c = te(e),
    d = c.getUTCFullYear(),
    m = go(),
    v = ve(
      (r =
        (n =
          (o =
            (a = t == null ? void 0 : t.firstWeekContainsDate) !== null &&
            a !== void 0
              ? a
              : t == null ||
                  (i = t.locale) === null ||
                  i === void 0 ||
                  (s = i.options) === null ||
                  s === void 0
                ? void 0
                : s.firstWeekContainsDate) !== null && o !== void 0
            ? o
            : m.firstWeekContainsDate) !== null && n !== void 0
          ? n
          : (l = m.locale) === null ||
              l === void 0 ||
              (u = l.options) === null ||
              u === void 0
            ? void 0
            : u.firstWeekContainsDate) !== null && r !== void 0
        ? r
        : 1,
    );
  if (!(v >= 1 && v <= 7))
    throw new RangeError(
      "firstWeekContainsDate must be between 1 and 7 inclusively",
    );
  var S = new Date(0);
  (S.setUTCFullYear(d + 1, 0, v), S.setUTCHours(0, 0, 0, 0));
  var C = lo(S, t),
    k = new Date(0);
  (k.setUTCFullYear(d, 0, v), k.setUTCHours(0, 0, 0, 0));
  var g = lo(k, t);
  return c.getTime() >= C.getTime()
    ? d + 1
    : c.getTime() >= g.getTime()
      ? d
      : d - 1;
}
function hk(e, t) {
  var r, n, o, a, i, s, l, u;
  W(1, arguments);
  var c = go(),
    d = ve(
      (r =
        (n =
          (o =
            (a = t == null ? void 0 : t.firstWeekContainsDate) !== null &&
            a !== void 0
              ? a
              : t == null ||
                  (i = t.locale) === null ||
                  i === void 0 ||
                  (s = i.options) === null ||
                  s === void 0
                ? void 0
                : s.firstWeekContainsDate) !== null && o !== void 0
            ? o
            : c.firstWeekContainsDate) !== null && n !== void 0
          ? n
          : (l = c.locale) === null ||
              l === void 0 ||
              (u = l.options) === null ||
              u === void 0
            ? void 0
            : u.firstWeekContainsDate) !== null && r !== void 0
        ? r
        : 1,
    ),
    m = Hp(e, t),
    v = new Date(0);
  (v.setUTCFullYear(m, 0, d), v.setUTCHours(0, 0, 0, 0));
  var S = lo(v, t);
  return S;
}
var mk = 6048e5;
function Wy(e, t) {
  W(1, arguments);
  var r = te(e),
    n = lo(r, t).getTime() - hk(r, t).getTime();
  return Math.round(n / mk) + 1;
}
function je(e, t) {
  for (var r = e < 0 ? "-" : "", n = Math.abs(e).toString(); n.length < t;)
    n = "0" + n;
  return r + n;
}
var pn = {
    y: function (t, r) {
      var n = t.getUTCFullYear(),
        o = n > 0 ? n : 1 - n;
      return je(r === "yy" ? o % 100 : o, r.length);
    },
    M: function (t, r) {
      var n = t.getUTCMonth();
      return r === "M" ? String(n + 1) : je(n + 1, 2);
    },
    d: function (t, r) {
      return je(t.getUTCDate(), r.length);
    },
    a: function (t, r) {
      var n = t.getUTCHours() / 12 >= 1 ? "pm" : "am";
      switch (r) {
        case "a":
        case "aa":
          return n.toUpperCase();
        case "aaa":
          return n;
        case "aaaaa":
          return n[0];
        case "aaaa":
        default:
          return n === "am" ? "a.m." : "p.m.";
      }
    },
    h: function (t, r) {
      return je(t.getUTCHours() % 12 || 12, r.length);
    },
    H: function (t, r) {
      return je(t.getUTCHours(), r.length);
    },
    m: function (t, r) {
      return je(t.getUTCMinutes(), r.length);
    },
    s: function (t, r) {
      return je(t.getUTCSeconds(), r.length);
    },
    S: function (t, r) {
      var n = r.length,
        o = t.getUTCMilliseconds(),
        a = Math.floor(o * Math.pow(10, n - 3));
      return je(a, r.length);
    },
  },
  Co = {
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  gk = {
    G: function (t, r, n) {
      var o = t.getUTCFullYear() > 0 ? 1 : 0;
      switch (r) {
        case "G":
        case "GG":
        case "GGG":
          return n.era(o, { width: "abbreviated" });
        case "GGGGG":
          return n.era(o, { width: "narrow" });
        case "GGGG":
        default:
          return n.era(o, { width: "wide" });
      }
    },
    y: function (t, r, n) {
      if (r === "yo") {
        var o = t.getUTCFullYear(),
          a = o > 0 ? o : 1 - o;
        return n.ordinalNumber(a, { unit: "year" });
      }
      return pn.y(t, r);
    },
    Y: function (t, r, n, o) {
      var a = Hp(t, o),
        i = a > 0 ? a : 1 - a;
      if (r === "YY") {
        var s = i % 100;
        return je(s, 2);
      }
      return r === "Yo"
        ? n.ordinalNumber(i, { unit: "year" })
        : je(i, r.length);
    },
    R: function (t, r) {
      var n = zy(t);
      return je(n, r.length);
    },
    u: function (t, r) {
      var n = t.getUTCFullYear();
      return je(n, r.length);
    },
    Q: function (t, r, n) {
      var o = Math.ceil((t.getUTCMonth() + 1) / 3);
      switch (r) {
        case "Q":
          return String(o);
        case "QQ":
          return je(o, 2);
        case "Qo":
          return n.ordinalNumber(o, { unit: "quarter" });
        case "QQQ":
          return n.quarter(o, { width: "abbreviated", context: "formatting" });
        case "QQQQQ":
          return n.quarter(o, { width: "narrow", context: "formatting" });
        case "QQQQ":
        default:
          return n.quarter(o, { width: "wide", context: "formatting" });
      }
    },
    q: function (t, r, n) {
      var o = Math.ceil((t.getUTCMonth() + 1) / 3);
      switch (r) {
        case "q":
          return String(o);
        case "qq":
          return je(o, 2);
        case "qo":
          return n.ordinalNumber(o, { unit: "quarter" });
        case "qqq":
          return n.quarter(o, { width: "abbreviated", context: "standalone" });
        case "qqqqq":
          return n.quarter(o, { width: "narrow", context: "standalone" });
        case "qqqq":
        default:
          return n.quarter(o, { width: "wide", context: "standalone" });
      }
    },
    M: function (t, r, n) {
      var o = t.getUTCMonth();
      switch (r) {
        case "M":
        case "MM":
          return pn.M(t, r);
        case "Mo":
          return n.ordinalNumber(o + 1, { unit: "month" });
        case "MMM":
          return n.month(o, { width: "abbreviated", context: "formatting" });
        case "MMMMM":
          return n.month(o, { width: "narrow", context: "formatting" });
        case "MMMM":
        default:
          return n.month(o, { width: "wide", context: "formatting" });
      }
    },
    L: function (t, r, n) {
      var o = t.getUTCMonth();
      switch (r) {
        case "L":
          return String(o + 1);
        case "LL":
          return je(o + 1, 2);
        case "Lo":
          return n.ordinalNumber(o + 1, { unit: "month" });
        case "LLL":
          return n.month(o, { width: "abbreviated", context: "standalone" });
        case "LLLLL":
          return n.month(o, { width: "narrow", context: "standalone" });
        case "LLLL":
        default:
          return n.month(o, { width: "wide", context: "standalone" });
      }
    },
    w: function (t, r, n, o) {
      var a = Wy(t, o);
      return r === "wo"
        ? n.ordinalNumber(a, { unit: "week" })
        : je(a, r.length);
    },
    I: function (t, r, n) {
      var o = Hy(t);
      return r === "Io"
        ? n.ordinalNumber(o, { unit: "week" })
        : je(o, r.length);
    },
    d: function (t, r, n) {
      return r === "do"
        ? n.ordinalNumber(t.getUTCDate(), { unit: "date" })
        : pn.d(t, r);
    },
    D: function (t, r, n) {
      var o = ck(t);
      return r === "Do"
        ? n.ordinalNumber(o, { unit: "dayOfYear" })
        : je(o, r.length);
    },
    E: function (t, r, n) {
      var o = t.getUTCDay();
      switch (r) {
        case "E":
        case "EE":
        case "EEE":
          return n.day(o, { width: "abbreviated", context: "formatting" });
        case "EEEEE":
          return n.day(o, { width: "narrow", context: "formatting" });
        case "EEEEEE":
          return n.day(o, { width: "short", context: "formatting" });
        case "EEEE":
        default:
          return n.day(o, { width: "wide", context: "formatting" });
      }
    },
    e: function (t, r, n, o) {
      var a = t.getUTCDay(),
        i = (a - o.weekStartsOn + 8) % 7 || 7;
      switch (r) {
        case "e":
          return String(i);
        case "ee":
          return je(i, 2);
        case "eo":
          return n.ordinalNumber(i, { unit: "day" });
        case "eee":
          return n.day(a, { width: "abbreviated", context: "formatting" });
        case "eeeee":
          return n.day(a, { width: "narrow", context: "formatting" });
        case "eeeeee":
          return n.day(a, { width: "short", context: "formatting" });
        case "eeee":
        default:
          return n.day(a, { width: "wide", context: "formatting" });
      }
    },
    c: function (t, r, n, o) {
      var a = t.getUTCDay(),
        i = (a - o.weekStartsOn + 8) % 7 || 7;
      switch (r) {
        case "c":
          return String(i);
        case "cc":
          return je(i, r.length);
        case "co":
          return n.ordinalNumber(i, { unit: "day" });
        case "ccc":
          return n.day(a, { width: "abbreviated", context: "standalone" });
        case "ccccc":
          return n.day(a, { width: "narrow", context: "standalone" });
        case "cccccc":
          return n.day(a, { width: "short", context: "standalone" });
        case "cccc":
        default:
          return n.day(a, { width: "wide", context: "standalone" });
      }
    },
    i: function (t, r, n) {
      var o = t.getUTCDay(),
        a = o === 0 ? 7 : o;
      switch (r) {
        case "i":
          return String(a);
        case "ii":
          return je(a, r.length);
        case "io":
          return n.ordinalNumber(a, { unit: "day" });
        case "iii":
          return n.day(o, { width: "abbreviated", context: "formatting" });
        case "iiiii":
          return n.day(o, { width: "narrow", context: "formatting" });
        case "iiiiii":
          return n.day(o, { width: "short", context: "formatting" });
        case "iiii":
        default:
          return n.day(o, { width: "wide", context: "formatting" });
      }
    },
    a: function (t, r, n) {
      var o = t.getUTCHours(),
        a = o / 12 >= 1 ? "pm" : "am";
      switch (r) {
        case "a":
        case "aa":
          return n.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting",
          });
        case "aaa":
          return n
            .dayPeriod(a, { width: "abbreviated", context: "formatting" })
            .toLowerCase();
        case "aaaaa":
          return n.dayPeriod(a, { width: "narrow", context: "formatting" });
        case "aaaa":
        default:
          return n.dayPeriod(a, { width: "wide", context: "formatting" });
      }
    },
    b: function (t, r, n) {
      var o = t.getUTCHours(),
        a;
      switch (
        (o === 12
          ? (a = Co.noon)
          : o === 0
            ? (a = Co.midnight)
            : (a = o / 12 >= 1 ? "pm" : "am"),
        r)
      ) {
        case "b":
        case "bb":
          return n.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting",
          });
        case "bbb":
          return n
            .dayPeriod(a, { width: "abbreviated", context: "formatting" })
            .toLowerCase();
        case "bbbbb":
          return n.dayPeriod(a, { width: "narrow", context: "formatting" });
        case "bbbb":
        default:
          return n.dayPeriod(a, { width: "wide", context: "formatting" });
      }
    },
    B: function (t, r, n) {
      var o = t.getUTCHours(),
        a;
      switch (
        (o >= 17
          ? (a = Co.evening)
          : o >= 12
            ? (a = Co.afternoon)
            : o >= 4
              ? (a = Co.morning)
              : (a = Co.night),
        r)
      ) {
        case "B":
        case "BB":
        case "BBB":
          return n.dayPeriod(a, {
            width: "abbreviated",
            context: "formatting",
          });
        case "BBBBB":
          return n.dayPeriod(a, { width: "narrow", context: "formatting" });
        case "BBBB":
        default:
          return n.dayPeriod(a, { width: "wide", context: "formatting" });
      }
    },
    h: function (t, r, n) {
      if (r === "ho") {
        var o = t.getUTCHours() % 12;
        return (o === 0 && (o = 12), n.ordinalNumber(o, { unit: "hour" }));
      }
      return pn.h(t, r);
    },
    H: function (t, r, n) {
      return r === "Ho"
        ? n.ordinalNumber(t.getUTCHours(), { unit: "hour" })
        : pn.H(t, r);
    },
    K: function (t, r, n) {
      var o = t.getUTCHours() % 12;
      return r === "Ko"
        ? n.ordinalNumber(o, { unit: "hour" })
        : je(o, r.length);
    },
    k: function (t, r, n) {
      var o = t.getUTCHours();
      return (
        o === 0 && (o = 24),
        r === "ko" ? n.ordinalNumber(o, { unit: "hour" }) : je(o, r.length)
      );
    },
    m: function (t, r, n) {
      return r === "mo"
        ? n.ordinalNumber(t.getUTCMinutes(), { unit: "minute" })
        : pn.m(t, r);
    },
    s: function (t, r, n) {
      return r === "so"
        ? n.ordinalNumber(t.getUTCSeconds(), { unit: "second" })
        : pn.s(t, r);
    },
    S: function (t, r) {
      return pn.S(t, r);
    },
    X: function (t, r, n, o) {
      var a = o._originalDate || t,
        i = a.getTimezoneOffset();
      if (i === 0) return "Z";
      switch (r) {
        case "X":
          return Fh(i);
        case "XXXX":
        case "XX":
          return zn(i);
        case "XXXXX":
        case "XXX":
        default:
          return zn(i, ":");
      }
    },
    x: function (t, r, n, o) {
      var a = o._originalDate || t,
        i = a.getTimezoneOffset();
      switch (r) {
        case "x":
          return Fh(i);
        case "xxxx":
        case "xx":
          return zn(i);
        case "xxxxx":
        case "xxx":
        default:
          return zn(i, ":");
      }
    },
    O: function (t, r, n, o) {
      var a = o._originalDate || t,
        i = a.getTimezoneOffset();
      switch (r) {
        case "O":
        case "OO":
        case "OOO":
          return "GMT" + Ah(i, ":");
        case "OOOO":
        default:
          return "GMT" + zn(i, ":");
      }
    },
    z: function (t, r, n, o) {
      var a = o._originalDate || t,
        i = a.getTimezoneOffset();
      switch (r) {
        case "z":
        case "zz":
        case "zzz":
          return "GMT" + Ah(i, ":");
        case "zzzz":
        default:
          return "GMT" + zn(i, ":");
      }
    },
    t: function (t, r, n, o) {
      var a = o._originalDate || t,
        i = Math.floor(a.getTime() / 1e3);
      return je(i, r.length);
    },
    T: function (t, r, n, o) {
      var a = o._originalDate || t,
        i = a.getTime();
      return je(i, r.length);
    },
  };
function Ah(e, t) {
  var r = e > 0 ? "-" : "+",
    n = Math.abs(e),
    o = Math.floor(n / 60),
    a = n % 60;
  if (a === 0) return r + String(o);
  var i = t;
  return r + String(o) + i + je(a, 2);
}
function Fh(e, t) {
  if (e % 60 === 0) {
    var r = e > 0 ? "-" : "+";
    return r + je(Math.abs(e) / 60, 2);
  }
  return zn(e, t);
}
function zn(e, t) {
  var r = t || "",
    n = e > 0 ? "-" : "+",
    o = Math.abs(e),
    a = je(Math.floor(o / 60), 2),
    i = je(o % 60, 2);
  return n + a + r + i;
}
var Bh = function (t, r) {
    switch (t) {
      case "P":
        return r.date({ width: "short" });
      case "PP":
        return r.date({ width: "medium" });
      case "PPP":
        return r.date({ width: "long" });
      case "PPPP":
      default:
        return r.date({ width: "full" });
    }
  },
  Vy = function (t, r) {
    switch (t) {
      case "p":
        return r.time({ width: "short" });
      case "pp":
        return r.time({ width: "medium" });
      case "ppp":
        return r.time({ width: "long" });
      case "pppp":
      default:
        return r.time({ width: "full" });
    }
  },
  vk = function (t, r) {
    var n = t.match(/(P+)(p+)?/) || [],
      o = n[1],
      a = n[2];
    if (!a) return Bh(t, r);
    var i;
    switch (o) {
      case "P":
        i = r.dateTime({ width: "short" });
        break;
      case "PP":
        i = r.dateTime({ width: "medium" });
        break;
      case "PPP":
        i = r.dateTime({ width: "long" });
        break;
      case "PPPP":
      default:
        i = r.dateTime({ width: "full" });
        break;
    }
    return i.replace("{{date}}", Bh(o, r)).replace("{{time}}", Vy(a, r));
  },
  pd = { p: Vy, P: vk };
function vl(e) {
  var t = new Date(
    Date.UTC(
      e.getFullYear(),
      e.getMonth(),
      e.getDate(),
      e.getHours(),
      e.getMinutes(),
      e.getSeconds(),
      e.getMilliseconds(),
    ),
  );
  return (t.setUTCFullYear(e.getFullYear()), e.getTime() - t.getTime());
}
var yk = ["D", "DD"],
  wk = ["YY", "YYYY"];
function qy(e) {
  return yk.indexOf(e) !== -1;
}
function Qy(e) {
  return wk.indexOf(e) !== -1;
}
function yl(e, t, r) {
  if (e === "YYYY")
    throw new RangeError(
      "Use `yyyy` instead of `YYYY` (in `"
        .concat(t, "`) for formatting years to the input `")
        .concat(
          r,
          "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md",
        ),
    );
  if (e === "YY")
    throw new RangeError(
      "Use `yy` instead of `YY` (in `"
        .concat(t, "`) for formatting years to the input `")
        .concat(
          r,
          "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md",
        ),
    );
  if (e === "D")
    throw new RangeError(
      "Use `d` instead of `D` (in `"
        .concat(t, "`) for formatting days of the month to the input `")
        .concat(
          r,
          "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md",
        ),
    );
  if (e === "DD")
    throw new RangeError(
      "Use `dd` instead of `DD` (in `"
        .concat(t, "`) for formatting days of the month to the input `")
        .concat(
          r,
          "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md",
        ),
    );
}
var xk = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds",
    },
    xSeconds: { one: "1 second", other: "{{count}} seconds" },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes",
    },
    xMinutes: { one: "1 minute", other: "{{count}} minutes" },
    aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
    xHours: { one: "1 hour", other: "{{count}} hours" },
    xDays: { one: "1 day", other: "{{count}} days" },
    aboutXWeeks: { one: "about 1 week", other: "about {{count}} weeks" },
    xWeeks: { one: "1 week", other: "{{count}} weeks" },
    aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
    xMonths: { one: "1 month", other: "{{count}} months" },
    aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
    xYears: { one: "1 year", other: "{{count}} years" },
    overXYears: { one: "over 1 year", other: "over {{count}} years" },
    almostXYears: { one: "almost 1 year", other: "almost {{count}} years" },
  },
  Sk = function (t, r, n) {
    var o,
      a = xk[t];
    return (
      typeof a == "string"
        ? (o = a)
        : r === 1
          ? (o = a.one)
          : (o = a.other.replace("{{count}}", r.toString())),
      n != null && n.addSuffix
        ? n.comparison && n.comparison > 0
          ? "in " + o
          : o + " ago"
        : o
    );
  };
function Vu(e) {
  return function () {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      r = t.width ? String(t.width) : e.defaultWidth,
      n = e.formats[r] || e.formats[e.defaultWidth];
    return n;
  };
}
var Ck = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy",
  },
  kk = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a",
  },
  Ek = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}",
  },
  _k = {
    date: Vu({ formats: Ck, defaultWidth: "full" }),
    time: Vu({ formats: kk, defaultWidth: "full" }),
    dateTime: Vu({ formats: Ek, defaultWidth: "full" }),
  },
  bk = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P",
  },
  Dk = function (t, r, n, o) {
    return bk[t];
  };
function Ma(e) {
  return function (t, r) {
    var n = r != null && r.context ? String(r.context) : "standalone",
      o;
    if (n === "formatting" && e.formattingValues) {
      var a = e.defaultFormattingWidth || e.defaultWidth,
        i = r != null && r.width ? String(r.width) : a;
      o = e.formattingValues[i] || e.formattingValues[a];
    } else {
      var s = e.defaultWidth,
        l = r != null && r.width ? String(r.width) : e.defaultWidth;
      o = e.values[l] || e.values[s];
    }
    var u = e.argumentCallback ? e.argumentCallback(t) : t;
    return o[u];
  };
}
var Tk = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"],
  },
  Pk = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
  },
  Rk = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    wide: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
  Ok = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  },
  Nk = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night",
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night",
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night",
    },
  },
  Mk = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night",
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night",
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night",
    },
  },
  Ik = function (t, r) {
    var n = Number(t),
      o = n % 100;
    if (o > 20 || o < 10)
      switch (o % 10) {
        case 1:
          return n + "st";
        case 2:
          return n + "nd";
        case 3:
          return n + "rd";
      }
    return n + "th";
  },
  jk = {
    ordinalNumber: Ik,
    era: Ma({ values: Tk, defaultWidth: "wide" }),
    quarter: Ma({
      values: Pk,
      defaultWidth: "wide",
      argumentCallback: function (t) {
        return t - 1;
      },
    }),
    month: Ma({ values: Rk, defaultWidth: "wide" }),
    day: Ma({ values: Ok, defaultWidth: "wide" }),
    dayPeriod: Ma({
      values: Nk,
      defaultWidth: "wide",
      formattingValues: Mk,
      defaultFormattingWidth: "wide",
    }),
  };
function Ia(e) {
  return function (t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      n = r.width,
      o = (n && e.matchPatterns[n]) || e.matchPatterns[e.defaultMatchWidth],
      a = t.match(o);
    if (!a) return null;
    var i = a[0],
      s = (n && e.parsePatterns[n]) || e.parsePatterns[e.defaultParseWidth],
      l = Array.isArray(s)
        ? Ak(s, function (d) {
            return d.test(i);
          })
        : Lk(s, function (d) {
            return d.test(i);
          }),
      u;
    ((u = e.valueCallback ? e.valueCallback(l) : l),
      (u = r.valueCallback ? r.valueCallback(u) : u));
    var c = t.slice(i.length);
    return { value: u, rest: c };
  };
}
function Lk(e, t) {
  for (var r in e) if (e.hasOwnProperty(r) && t(e[r])) return r;
}
function Ak(e, t) {
  for (var r = 0; r < e.length; r++) if (t(e[r])) return r;
}
function Fk(e) {
  return function (t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      n = t.match(e.matchPattern);
    if (!n) return null;
    var o = n[0],
      a = t.match(e.parsePattern);
    if (!a) return null;
    var i = e.valueCallback ? e.valueCallback(a[0]) : a[0];
    i = r.valueCallback ? r.valueCallback(i) : i;
    var s = t.slice(o.length);
    return { value: i, rest: s };
  };
}
var Bk = /^(\d+)(th|st|nd|rd)?/i,
  Uk = /\d+/i,
  $k = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i,
  },
  Yk = { any: [/^b/i, /^(a|c)/i] },
  zk = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i,
  },
  Hk = { any: [/1/i, /2/i, /3/i, /4/i] },
  Wk = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
  },
  Vk = {
    narrow: [
      /^j/i,
      /^f/i,
      /^m/i,
      /^a/i,
      /^m/i,
      /^j/i,
      /^j/i,
      /^a/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i,
    ],
    any: [
      /^ja/i,
      /^f/i,
      /^mar/i,
      /^ap/i,
      /^may/i,
      /^jun/i,
      /^jul/i,
      /^au/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i,
    ],
  },
  qk = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
  },
  Qk = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
  },
  Kk = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
  },
  Gk = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i,
    },
  },
  Xk = {
    ordinalNumber: Fk({
      matchPattern: Bk,
      parsePattern: Uk,
      valueCallback: function (t) {
        return parseInt(t, 10);
      },
    }),
    era: Ia({
      matchPatterns: $k,
      defaultMatchWidth: "wide",
      parsePatterns: Yk,
      defaultParseWidth: "any",
    }),
    quarter: Ia({
      matchPatterns: zk,
      defaultMatchWidth: "wide",
      parsePatterns: Hk,
      defaultParseWidth: "any",
      valueCallback: function (t) {
        return t + 1;
      },
    }),
    month: Ia({
      matchPatterns: Wk,
      defaultMatchWidth: "wide",
      parsePatterns: Vk,
      defaultParseWidth: "any",
    }),
    day: Ia({
      matchPatterns: qk,
      defaultMatchWidth: "wide",
      parsePatterns: Qk,
      defaultParseWidth: "any",
    }),
    dayPeriod: Ia({
      matchPatterns: Kk,
      defaultMatchWidth: "any",
      parsePatterns: Gk,
      defaultParseWidth: "any",
    }),
  },
  Ky = {
    code: "en-US",
    formatDistance: Sk,
    formatLong: _k,
    formatRelative: Dk,
    localize: jk,
    match: Xk,
    options: { weekStartsOn: 0, firstWeekContainsDate: 1 },
  },
  Jk = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
  Zk = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
  eE = /^'([^]*?)'?$/,
  tE = /''/g,
  rE = /[a-zA-Z]/;
function Uh(e, t, r) {
  var n, o, a, i, s, l, u, c, d, m, v, S, C, k, g, y, w, T;
  W(2, arguments);
  var P = String(t),
    R = go(),
    M =
      (n =
        (o = r == null ? void 0 : r.locale) !== null && o !== void 0
          ? o
          : R.locale) !== null && n !== void 0
        ? n
        : Ky,
    A = ve(
      (a =
        (i =
          (s =
            (l = r == null ? void 0 : r.firstWeekContainsDate) !== null &&
            l !== void 0
              ? l
              : r == null ||
                  (u = r.locale) === null ||
                  u === void 0 ||
                  (c = u.options) === null ||
                  c === void 0
                ? void 0
                : c.firstWeekContainsDate) !== null && s !== void 0
            ? s
            : R.firstWeekContainsDate) !== null && i !== void 0
          ? i
          : (d = R.locale) === null ||
              d === void 0 ||
              (m = d.options) === null ||
              m === void 0
            ? void 0
            : m.firstWeekContainsDate) !== null && a !== void 0
        ? a
        : 1,
    );
  if (!(A >= 1 && A <= 7))
    throw new RangeError(
      "firstWeekContainsDate must be between 1 and 7 inclusively",
    );
  var V = ve(
    (v =
      (S =
        (C =
          (k = r == null ? void 0 : r.weekStartsOn) !== null && k !== void 0
            ? k
            : r == null ||
                (g = r.locale) === null ||
                g === void 0 ||
                (y = g.options) === null ||
                y === void 0
              ? void 0
              : y.weekStartsOn) !== null && C !== void 0
          ? C
          : R.weekStartsOn) !== null && S !== void 0
        ? S
        : (w = R.locale) === null ||
            w === void 0 ||
            (T = w.options) === null ||
            T === void 0
          ? void 0
          : T.weekStartsOn) !== null && v !== void 0
      ? v
      : 0,
  );
  if (!(V >= 0 && V <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  if (!M.localize)
    throw new RangeError("locale must contain localize property");
  if (!M.formatLong)
    throw new RangeError("locale must contain formatLong property");
  var L = te(e);
  if (!Ei(L)) throw new RangeError("Invalid time value");
  var K = vl(L),
    $ = Yy(L, K),
    ae = {
      firstWeekContainsDate: A,
      weekStartsOn: V,
      locale: M,
      _originalDate: L,
    },
    le = P.match(Zk)
      .map(function (U) {
        var q = U[0];
        if (q === "p" || q === "P") {
          var ie = pd[q];
          return ie(U, M.formatLong);
        }
        return U;
      })
      .join("")
      .match(Jk)
      .map(function (U) {
        if (U === "''") return "'";
        var q = U[0];
        if (q === "'") return nE(U);
        var ie = gk[q];
        if (ie)
          return (
            !(r != null && r.useAdditionalWeekYearTokens) &&
              Qy(U) &&
              yl(U, t, String(e)),
            !(r != null && r.useAdditionalDayOfYearTokens) &&
              qy(U) &&
              yl(U, t, String(e)),
            ie($, U, M.localize, ae)
          );
        if (q.match(rE))
          throw new RangeError(
            "Format string contains an unescaped latin alphabet character `" +
              q +
              "`",
          );
        return U;
      })
      .join("");
  return le;
}
function nE(e) {
  var t = e.match(eE);
  return t ? t[1].replace(tE, "'") : e;
}
var oE = 6e4;
function fd(e, t) {
  W(2, arguments);
  var r = ve(t);
  return zp(e, r * oE);
}
var aE = 36e5;
function iE(e, t) {
  W(2, arguments);
  var r = ve(t);
  return zp(e, r * aE);
}
function xa(e, t) {
  W(2, arguments);
  var r = te(e),
    n = ve(t);
  return isNaN(n) ? new Date(NaN) : (n && r.setDate(r.getDate() + n), r);
}
function wl(e, t) {
  W(2, arguments);
  var r = ve(t),
    n = r * 7;
  return xa(e, n);
}
function Dr(e, t) {
  W(2, arguments);
  var r = te(e),
    n = ve(t);
  if (isNaN(n)) return new Date(NaN);
  if (!n) return r;
  var o = r.getDate(),
    a = new Date(r.getTime());
  a.setMonth(r.getMonth() + n + 1, 0);
  var i = a.getDate();
  return o >= i ? a : (r.setFullYear(a.getFullYear(), a.getMonth(), o), r);
}
function Gy(e, t) {
  W(2, arguments);
  var r = ve(t),
    n = r * 3;
  return Dr(e, n);
}
function oa(e, t) {
  W(2, arguments);
  var r = ve(t);
  return Dr(e, r * 12);
}
function sE(e, t) {
  W(2, arguments);
  var r = ve(t);
  return xa(e, -r);
}
function $h(e, t) {
  W(2, arguments);
  var r = ve(t);
  return wl(e, -r);
}
function aa(e, t) {
  W(2, arguments);
  var r = ve(t);
  return Dr(e, -r);
}
function lE(e, t) {
  W(2, arguments);
  var r = ve(t);
  return Gy(e, -r);
}
function _i(e, t) {
  W(2, arguments);
  var r = ve(t);
  return oa(e, -r);
}
function Yh(e) {
  W(1, arguments);
  var t = te(e),
    r = t.getSeconds();
  return r;
}
function Ur(e) {
  W(1, arguments);
  var t = te(e),
    r = t.getMinutes();
  return r;
}
function $r(e) {
  W(1, arguments);
  var t = te(e),
    r = t.getHours();
  return r;
}
function uE(e) {
  W(1, arguments);
  var t = te(e),
    r = t.getDay();
  return r;
}
function zh(e) {
  W(1, arguments);
  var t = te(e),
    r = t.getDate();
  return r;
}
function Xy(e, t) {
  var r, n, o, a, i, s, l, u;
  W(1, arguments);
  var c = go(),
    d = ve(
      (r =
        (n =
          (o =
            (a = t == null ? void 0 : t.weekStartsOn) !== null && a !== void 0
              ? a
              : t == null ||
                  (i = t.locale) === null ||
                  i === void 0 ||
                  (s = i.options) === null ||
                  s === void 0
                ? void 0
                : s.weekStartsOn) !== null && o !== void 0
            ? o
            : c.weekStartsOn) !== null && n !== void 0
          ? n
          : (l = c.locale) === null ||
              l === void 0 ||
              (u = l.options) === null ||
              u === void 0
            ? void 0
            : u.weekStartsOn) !== null && r !== void 0
        ? r
        : 0,
    );
  if (!(d >= 0 && d <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var m = te(e),
    v = m.getDay(),
    S = (v < d ? 7 : 0) + v - d;
  return (m.setDate(m.getDate() - S), m.setHours(0, 0, 0, 0), m);
}
function xl(e) {
  return (W(1, arguments), Xy(e, { weekStartsOn: 1 }));
}
function cE(e) {
  W(1, arguments);
  var t = te(e),
    r = t.getFullYear(),
    n = new Date(0);
  (n.setFullYear(r + 1, 0, 4), n.setHours(0, 0, 0, 0));
  var o = xl(n),
    a = new Date(0);
  (a.setFullYear(r, 0, 4), a.setHours(0, 0, 0, 0));
  var i = xl(a);
  return t.getTime() >= o.getTime()
    ? r + 1
    : t.getTime() >= i.getTime()
      ? r
      : r - 1;
}
function dE(e) {
  W(1, arguments);
  var t = cE(e),
    r = new Date(0);
  (r.setFullYear(t, 0, 4), r.setHours(0, 0, 0, 0));
  var n = xl(r);
  return n;
}
var pE = 6048e5;
function fE(e) {
  W(1, arguments);
  var t = te(e),
    r = xl(t).getTime() - dE(t).getTime();
  return Math.round(r / pE) + 1;
}
function Rt(e) {
  W(1, arguments);
  var t = te(e),
    r = t.getMonth();
  return r;
}
function Bo(e) {
  W(1, arguments);
  var t = te(e),
    r = Math.floor(t.getMonth() / 3) + 1;
  return r;
}
function xe(e) {
  return (W(1, arguments), te(e).getFullYear());
}
function hd(e) {
  W(1, arguments);
  var t = te(e),
    r = t.getTime();
  return r;
}
function hE(e, t) {
  W(2, arguments);
  var r = te(e),
    n = ve(t);
  return (r.setSeconds(n), r);
}
function Rs(e, t) {
  W(2, arguments);
  var r = te(e),
    n = ve(t);
  return (r.setMinutes(n), r);
}
function Os(e, t) {
  W(2, arguments);
  var r = te(e),
    n = ve(t);
  return (r.setHours(n), r);
}
function mE(e) {
  W(1, arguments);
  var t = te(e),
    r = t.getFullYear(),
    n = t.getMonth(),
    o = new Date(0);
  return (o.setFullYear(r, n + 1, 0), o.setHours(0, 0, 0, 0), o.getDate());
}
function Lt(e, t) {
  W(2, arguments);
  var r = te(e),
    n = ve(t),
    o = r.getFullYear(),
    a = r.getDate(),
    i = new Date(0);
  (i.setFullYear(o, n, 15), i.setHours(0, 0, 0, 0));
  var s = mE(i);
  return (r.setMonth(n, Math.min(a, s)), r);
}
function ko(e, t) {
  W(2, arguments);
  var r = te(e),
    n = ve(t),
    o = Math.floor(r.getMonth() / 3) + 1,
    a = n - o;
  return Lt(r, r.getMonth() + a * 3);
}
function Gr(e, t) {
  W(2, arguments);
  var r = te(e),
    n = ve(t);
  return isNaN(r.getTime()) ? new Date(NaN) : (r.setFullYear(n), r);
}
function Hh(e) {
  W(1, arguments);
  var t;
  if (e && typeof e.forEach == "function") t = e;
  else if (fr(e) === "object" && e !== null) t = Array.prototype.slice.call(e);
  else return new Date(NaN);
  var r;
  return (
    t.forEach(function (n) {
      var o = te(n);
      (r === void 0 || r > o || isNaN(o.getDate())) && (r = o);
    }),
    r || new Date(NaN)
  );
}
function Wh(e) {
  W(1, arguments);
  var t;
  if (e && typeof e.forEach == "function") t = e;
  else if (fr(e) === "object" && e !== null) t = Array.prototype.slice.call(e);
  else return new Date(NaN);
  var r;
  return (
    t.forEach(function (n) {
      var o = te(n);
      (r === void 0 || r < o || isNaN(Number(o))) && (r = o);
    }),
    r || new Date(NaN)
  );
}
function Yr(e) {
  W(1, arguments);
  var t = te(e);
  return (t.setHours(0, 0, 0, 0), t);
}
var gE = 864e5;
function Sl(e, t) {
  W(2, arguments);
  var r = Yr(e),
    n = Yr(t),
    o = r.getTime() - vl(r),
    a = n.getTime() - vl(n);
  return Math.round((o - a) / gE);
}
function Cl(e, t) {
  W(2, arguments);
  var r = te(e),
    n = te(t),
    o = r.getFullYear() - n.getFullYear(),
    a = r.getMonth() - n.getMonth();
  return o * 12 + a;
}
function kl(e, t) {
  W(2, arguments);
  var r = te(e),
    n = te(t);
  return r.getFullYear() - n.getFullYear();
}
function Jy(e) {
  W(1, arguments);
  var t = te(e);
  return (t.setDate(1), t.setHours(0, 0, 0, 0), t);
}
function md(e) {
  W(1, arguments);
  var t = te(e),
    r = t.getMonth(),
    n = r - (r % 3);
  return (t.setMonth(n, 1), t.setHours(0, 0, 0, 0), t);
}
function Zy(e) {
  W(1, arguments);
  var t = te(e),
    r = new Date(0);
  return (r.setFullYear(t.getFullYear(), 0, 1), r.setHours(0, 0, 0, 0), r);
}
function gd(e) {
  W(1, arguments);
  var t = te(e);
  return (t.setHours(23, 59, 59, 999), t);
}
function vE(e) {
  W(1, arguments);
  var t = te(e),
    r = t.getMonth();
  return (
    t.setFullYear(t.getFullYear(), r + 1, 0),
    t.setHours(23, 59, 59, 999),
    t
  );
}
function yE(e) {
  W(1, arguments);
  var t = te(e),
    r = t.getFullYear();
  return (t.setFullYear(r + 1, 0, 0), t.setHours(23, 59, 59, 999), t);
}
function wE(e, t) {
  W(2, arguments);
  var r = te(e),
    n = te(t);
  return r.getTime() === n.getTime();
}
function xE(e, t) {
  W(2, arguments);
  var r = Yr(e),
    n = Yr(t);
  return r.getTime() === n.getTime();
}
function SE(e, t) {
  W(2, arguments);
  var r = te(e),
    n = te(t);
  return r.getFullYear() === n.getFullYear() && r.getMonth() === n.getMonth();
}
function CE(e, t) {
  W(2, arguments);
  var r = te(e),
    n = te(t);
  return r.getFullYear() === n.getFullYear();
}
function kE(e, t) {
  W(2, arguments);
  var r = md(e),
    n = md(t);
  return r.getTime() === n.getTime();
}
function jn(e, t) {
  W(2, arguments);
  var r = te(e),
    n = te(t);
  return r.getTime() > n.getTime();
}
function xn(e, t) {
  W(2, arguments);
  var r = te(e),
    n = te(t);
  return r.getTime() < n.getTime();
}
function bi(e, t) {
  W(2, arguments);
  var r = te(e).getTime(),
    n = te(t.start).getTime(),
    o = te(t.end).getTime();
  if (!(n <= o)) throw new RangeError("Invalid interval");
  return r >= n && r <= o;
}
function Vh(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function EE(e, t) {
  if (e) {
    if (typeof e == "string") return Vh(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return (
      r === "Object" && e.constructor && (r = e.constructor.name),
      r === "Map" || r === "Set"
        ? Array.from(e)
        : r === "Arguments" ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
          ? Vh(e, t)
          : void 0
    );
  }
}
function qh(e, t) {
  var r = (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (!r) {
    if (Array.isArray(e) || (r = EE(e)) || t) {
      r && (e = r);
      var n = 0,
        o = function () {};
      return {
        s: o,
        n: function () {
          return n >= e.length ? { done: !0 } : { done: !1, value: e[n++] };
        },
        e: function (u) {
          throw u;
        },
        f: o,
      };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var a,
    i = !0,
    s = !1;
  return {
    s: function () {
      r = r.call(e);
    },
    n: function () {
      var u = r.next();
      return ((i = u.done), u);
    },
    e: function (u) {
      ((s = !0), (a = u));
    },
    f: function () {
      try {
        i || r.return == null || r.return();
      } finally {
        if (s) throw a;
      }
    },
  };
}
function _E(e, t) {
  if (e == null)
    throw new TypeError(
      "assign requires that input parameter not be null or undefined",
    );
  for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
  return e;
}
function J(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  return e;
}
function vd(e, t) {
  return (
    (vd = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, n) {
          return ((r.__proto__ = n), r);
        }),
    vd(e, t)
  );
}
function Re(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  ((e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    t && vd(e, t));
}
function El(e) {
  return (
    (El = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        }),
    El(e)
  );
}
function e0() {
  try {
    var e = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    );
  } catch {}
  return (e0 = function () {
    return !!e;
  })();
}
function bE(e, t) {
  if (t && (fr(t) == "object" || typeof t == "function")) return t;
  if (t !== void 0)
    throw new TypeError(
      "Derived constructors may only return object or undefined",
    );
  return J(e);
}
function Oe(e) {
  var t = e0();
  return function () {
    var r,
      n = El(e);
    if (t) {
      var o = El(this).constructor;
      r = Reflect.construct(n, arguments, o);
    } else r = n.apply(this, arguments);
    return bE(this, r);
  };
}
function be(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function DE(e, t) {
  if (fr(e) != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (fr(n) != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function t0(e) {
  var t = DE(e, "string");
  return fr(t) == "symbol" ? t : t + "";
}
function TE(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    ((n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, t0(n.key), n));
  }
}
function De(e, t, r) {
  return (
    t && TE(e.prototype, t),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function X(e, t, r) {
  return (
    (t = t0(t)) in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
var PE = 10,
  r0 = (function () {
    function e() {
      (be(this, e), X(this, "priority", void 0), X(this, "subPriority", 0));
    }
    return (
      De(e, [
        {
          key: "validate",
          value: function (r, n) {
            return !0;
          },
        },
      ]),
      e
    );
  })(),
  RE = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r(n, o, a, i, s) {
      var l;
      return (
        be(this, r),
        (l = t.call(this)),
        (l.value = n),
        (l.validateValue = o),
        (l.setValue = a),
        (l.priority = i),
        s && (l.subPriority = s),
        l
      );
    }
    return (
      De(r, [
        {
          key: "validate",
          value: function (o, a) {
            return this.validateValue(o, this.value, a);
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            return this.setValue(o, a, this.value, i);
          },
        },
      ]),
      r
    );
  })(r0),
  OE = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", PE),
        X(J(n), "subPriority", -1),
        n
      );
    }
    return (
      De(r, [
        {
          key: "set",
          value: function (o, a) {
            if (a.timestampIsSet) return o;
            var i = new Date(0);
            return (
              i.setFullYear(
                o.getUTCFullYear(),
                o.getUTCMonth(),
                o.getUTCDate(),
              ),
              i.setHours(
                o.getUTCHours(),
                o.getUTCMinutes(),
                o.getUTCSeconds(),
                o.getUTCMilliseconds(),
              ),
              i
            );
          },
        },
      ]),
      r
    );
  })(r0),
  Me = (function () {
    function e() {
      (be(this, e),
        X(this, "incompatibleTokens", void 0),
        X(this, "priority", void 0),
        X(this, "subPriority", void 0));
    }
    return (
      De(e, [
        {
          key: "run",
          value: function (r, n, o, a) {
            var i = this.parse(r, n, o, a);
            return i
              ? {
                  setter: new RE(
                    i.value,
                    this.validate,
                    this.set,
                    this.priority,
                    this.subPriority,
                  ),
                  rest: i.rest,
                }
              : null;
          },
        },
        {
          key: "validate",
          value: function (r, n, o) {
            return !0;
          },
        },
      ]),
      e
    );
  })(),
  NE = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 140),
        X(J(n), "incompatibleTokens", ["R", "u", "t", "T"]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a, i) {
            switch (a) {
              case "G":
              case "GG":
              case "GGG":
                return (
                  i.era(o, { width: "abbreviated" }) ||
                  i.era(o, { width: "narrow" })
                );
              case "GGGGG":
                return i.era(o, { width: "narrow" });
              case "GGGG":
              default:
                return (
                  i.era(o, { width: "wide" }) ||
                  i.era(o, { width: "abbreviated" }) ||
                  i.era(o, { width: "narrow" })
                );
            }
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            return (
              (a.era = i),
              o.setUTCFullYear(i, 0, 1),
              o.setUTCHours(0, 0, 0, 0),
              o
            );
          },
        },
      ]),
      r
    );
  })(Me),
  Wp = 6e4,
  Vp = 36e5,
  ME = 1e3,
  it = {
    month: /^(1[0-2]|0?\d)/,
    date: /^(3[0-1]|[0-2]?\d)/,
    dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
    week: /^(5[0-3]|[0-4]?\d)/,
    hour23h: /^(2[0-3]|[0-1]?\d)/,
    hour24h: /^(2[0-4]|[0-1]?\d)/,
    hour11h: /^(1[0-1]|0?\d)/,
    hour12h: /^(1[0-2]|0?\d)/,
    minute: /^[0-5]?\d/,
    second: /^[0-5]?\d/,
    singleDigit: /^\d/,
    twoDigits: /^\d{1,2}/,
    threeDigits: /^\d{1,3}/,
    fourDigits: /^\d{1,4}/,
    anyDigitsSigned: /^-?\d+/,
    singleDigitSigned: /^-?\d/,
    twoDigitsSigned: /^-?\d{1,2}/,
    threeDigitsSigned: /^-?\d{1,3}/,
    fourDigitsSigned: /^-?\d{1,4}/,
  },
  jr = {
    basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
    basic: /^([+-])(\d{2})(\d{2})|Z/,
    basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
    extended: /^([+-])(\d{2}):(\d{2})|Z/,
    extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/,
  };
function st(e, t) {
  return e && { value: t(e.value), rest: e.rest };
}
function Ge(e, t) {
  var r = t.match(e);
  return r ? { value: parseInt(r[0], 10), rest: t.slice(r[0].length) } : null;
}
function Lr(e, t) {
  var r = t.match(e);
  if (!r) return null;
  if (r[0] === "Z") return { value: 0, rest: t.slice(1) };
  var n = r[1] === "+" ? 1 : -1,
    o = r[2] ? parseInt(r[2], 10) : 0,
    a = r[3] ? parseInt(r[3], 10) : 0,
    i = r[5] ? parseInt(r[5], 10) : 0;
  return { value: n * (o * Vp + a * Wp + i * ME), rest: t.slice(r[0].length) };
}
function n0(e) {
  return Ge(it.anyDigitsSigned, e);
}
function ot(e, t) {
  switch (e) {
    case 1:
      return Ge(it.singleDigit, t);
    case 2:
      return Ge(it.twoDigits, t);
    case 3:
      return Ge(it.threeDigits, t);
    case 4:
      return Ge(it.fourDigits, t);
    default:
      return Ge(new RegExp("^\\d{1," + e + "}"), t);
  }
}
function _l(e, t) {
  switch (e) {
    case 1:
      return Ge(it.singleDigitSigned, t);
    case 2:
      return Ge(it.twoDigitsSigned, t);
    case 3:
      return Ge(it.threeDigitsSigned, t);
    case 4:
      return Ge(it.fourDigitsSigned, t);
    default:
      return Ge(new RegExp("^-?\\d{1," + e + "}"), t);
  }
}
function qp(e) {
  switch (e) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}
function o0(e, t) {
  var r = t > 0,
    n = r ? t : 1 - t,
    o;
  if (n <= 50) o = e || 100;
  else {
    var a = n + 50,
      i = Math.floor(a / 100) * 100,
      s = e >= a % 100;
    o = e + i - (s ? 100 : 0);
  }
  return r ? o : 1 - o;
}
function a0(e) {
  return e % 400 === 0 || (e % 4 === 0 && e % 100 !== 0);
}
var IE = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 130),
        X(J(n), "incompatibleTokens", [
          "Y",
          "R",
          "u",
          "w",
          "I",
          "i",
          "e",
          "c",
          "t",
          "T",
        ]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a, i) {
            var s = function (u) {
              return { year: u, isTwoDigitYear: a === "yy" };
            };
            switch (a) {
              case "y":
                return st(ot(4, o), s);
              case "yo":
                return st(i.ordinalNumber(o, { unit: "year" }), s);
              default:
                return st(ot(a.length, o), s);
            }
          },
        },
        {
          key: "validate",
          value: function (o, a) {
            return a.isTwoDigitYear || a.year > 0;
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            var s = o.getUTCFullYear();
            if (i.isTwoDigitYear) {
              var l = o0(i.year, s);
              return (o.setUTCFullYear(l, 0, 1), o.setUTCHours(0, 0, 0, 0), o);
            }
            var u = !("era" in a) || a.era === 1 ? i.year : 1 - i.year;
            return (o.setUTCFullYear(u, 0, 1), o.setUTCHours(0, 0, 0, 0), o);
          },
        },
      ]),
      r
    );
  })(Me),
  jE = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 130),
        X(J(n), "incompatibleTokens", [
          "y",
          "R",
          "u",
          "Q",
          "q",
          "M",
          "L",
          "I",
          "d",
          "D",
          "i",
          "t",
          "T",
        ]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a, i) {
            var s = function (u) {
              return { year: u, isTwoDigitYear: a === "YY" };
            };
            switch (a) {
              case "Y":
                return st(ot(4, o), s);
              case "Yo":
                return st(i.ordinalNumber(o, { unit: "year" }), s);
              default:
                return st(ot(a.length, o), s);
            }
          },
        },
        {
          key: "validate",
          value: function (o, a) {
            return a.isTwoDigitYear || a.year > 0;
          },
        },
        {
          key: "set",
          value: function (o, a, i, s) {
            var l = Hp(o, s);
            if (i.isTwoDigitYear) {
              var u = o0(i.year, l);
              return (
                o.setUTCFullYear(u, 0, s.firstWeekContainsDate),
                o.setUTCHours(0, 0, 0, 0),
                lo(o, s)
              );
            }
            var c = !("era" in a) || a.era === 1 ? i.year : 1 - i.year;
            return (
              o.setUTCFullYear(c, 0, s.firstWeekContainsDate),
              o.setUTCHours(0, 0, 0, 0),
              lo(o, s)
            );
          },
        },
      ]),
      r
    );
  })(Me),
  LE = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 130),
        X(J(n), "incompatibleTokens", [
          "G",
          "y",
          "Y",
          "u",
          "Q",
          "q",
          "M",
          "L",
          "w",
          "d",
          "D",
          "e",
          "c",
          "t",
          "T",
        ]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a) {
            return _l(a === "R" ? 4 : a.length, o);
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            var s = new Date(0);
            return (
              s.setUTCFullYear(i, 0, 4),
              s.setUTCHours(0, 0, 0, 0),
              na(s)
            );
          },
        },
      ]),
      r
    );
  })(Me),
  AE = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 130),
        X(J(n), "incompatibleTokens", [
          "G",
          "y",
          "Y",
          "R",
          "w",
          "I",
          "i",
          "e",
          "c",
          "t",
          "T",
        ]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a) {
            return _l(a === "u" ? 4 : a.length, o);
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            return (o.setUTCFullYear(i, 0, 1), o.setUTCHours(0, 0, 0, 0), o);
          },
        },
      ]),
      r
    );
  })(Me),
  FE = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 120),
        X(J(n), "incompatibleTokens", [
          "Y",
          "R",
          "q",
          "M",
          "L",
          "w",
          "I",
          "d",
          "D",
          "i",
          "e",
          "c",
          "t",
          "T",
        ]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a, i) {
            switch (a) {
              case "Q":
              case "QQ":
                return ot(a.length, o);
              case "Qo":
                return i.ordinalNumber(o, { unit: "quarter" });
              case "QQQ":
                return (
                  i.quarter(o, {
                    width: "abbreviated",
                    context: "formatting",
                  }) || i.quarter(o, { width: "narrow", context: "formatting" })
                );
              case "QQQQQ":
                return i.quarter(o, { width: "narrow", context: "formatting" });
              case "QQQQ":
              default:
                return (
                  i.quarter(o, { width: "wide", context: "formatting" }) ||
                  i.quarter(o, {
                    width: "abbreviated",
                    context: "formatting",
                  }) ||
                  i.quarter(o, { width: "narrow", context: "formatting" })
                );
            }
          },
        },
        {
          key: "validate",
          value: function (o, a) {
            return a >= 1 && a <= 4;
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            return (
              o.setUTCMonth((i - 1) * 3, 1),
              o.setUTCHours(0, 0, 0, 0),
              o
            );
          },
        },
      ]),
      r
    );
  })(Me),
  BE = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 120),
        X(J(n), "incompatibleTokens", [
          "Y",
          "R",
          "Q",
          "M",
          "L",
          "w",
          "I",
          "d",
          "D",
          "i",
          "e",
          "c",
          "t",
          "T",
        ]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a, i) {
            switch (a) {
              case "q":
              case "qq":
                return ot(a.length, o);
              case "qo":
                return i.ordinalNumber(o, { unit: "quarter" });
              case "qqq":
                return (
                  i.quarter(o, {
                    width: "abbreviated",
                    context: "standalone",
                  }) || i.quarter(o, { width: "narrow", context: "standalone" })
                );
              case "qqqqq":
                return i.quarter(o, { width: "narrow", context: "standalone" });
              case "qqqq":
              default:
                return (
                  i.quarter(o, { width: "wide", context: "standalone" }) ||
                  i.quarter(o, {
                    width: "abbreviated",
                    context: "standalone",
                  }) ||
                  i.quarter(o, { width: "narrow", context: "standalone" })
                );
            }
          },
        },
        {
          key: "validate",
          value: function (o, a) {
            return a >= 1 && a <= 4;
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            return (
              o.setUTCMonth((i - 1) * 3, 1),
              o.setUTCHours(0, 0, 0, 0),
              o
            );
          },
        },
      ]),
      r
    );
  })(Me),
  UE = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "incompatibleTokens", [
          "Y",
          "R",
          "q",
          "Q",
          "L",
          "w",
          "I",
          "D",
          "i",
          "e",
          "c",
          "t",
          "T",
        ]),
        X(J(n), "priority", 110),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a, i) {
            var s = function (u) {
              return u - 1;
            };
            switch (a) {
              case "M":
                return st(Ge(it.month, o), s);
              case "MM":
                return st(ot(2, o), s);
              case "Mo":
                return st(i.ordinalNumber(o, { unit: "month" }), s);
              case "MMM":
                return (
                  i.month(o, { width: "abbreviated", context: "formatting" }) ||
                  i.month(o, { width: "narrow", context: "formatting" })
                );
              case "MMMMM":
                return i.month(o, { width: "narrow", context: "formatting" });
              case "MMMM":
              default:
                return (
                  i.month(o, { width: "wide", context: "formatting" }) ||
                  i.month(o, { width: "abbreviated", context: "formatting" }) ||
                  i.month(o, { width: "narrow", context: "formatting" })
                );
            }
          },
        },
        {
          key: "validate",
          value: function (o, a) {
            return a >= 0 && a <= 11;
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            return (o.setUTCMonth(i, 1), o.setUTCHours(0, 0, 0, 0), o);
          },
        },
      ]),
      r
    );
  })(Me),
  $E = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 110),
        X(J(n), "incompatibleTokens", [
          "Y",
          "R",
          "q",
          "Q",
          "M",
          "w",
          "I",
          "D",
          "i",
          "e",
          "c",
          "t",
          "T",
        ]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a, i) {
            var s = function (u) {
              return u - 1;
            };
            switch (a) {
              case "L":
                return st(Ge(it.month, o), s);
              case "LL":
                return st(ot(2, o), s);
              case "Lo":
                return st(i.ordinalNumber(o, { unit: "month" }), s);
              case "LLL":
                return (
                  i.month(o, { width: "abbreviated", context: "standalone" }) ||
                  i.month(o, { width: "narrow", context: "standalone" })
                );
              case "LLLLL":
                return i.month(o, { width: "narrow", context: "standalone" });
              case "LLLL":
              default:
                return (
                  i.month(o, { width: "wide", context: "standalone" }) ||
                  i.month(o, { width: "abbreviated", context: "standalone" }) ||
                  i.month(o, { width: "narrow", context: "standalone" })
                );
            }
          },
        },
        {
          key: "validate",
          value: function (o, a) {
            return a >= 0 && a <= 11;
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            return (o.setUTCMonth(i, 1), o.setUTCHours(0, 0, 0, 0), o);
          },
        },
      ]),
      r
    );
  })(Me);
function YE(e, t, r) {
  W(2, arguments);
  var n = te(e),
    o = ve(t),
    a = Wy(n, r) - o;
  return (n.setUTCDate(n.getUTCDate() - a * 7), n);
}
var zE = (function (e) {
  Re(r, e);
  var t = Oe(r);
  function r() {
    var n;
    be(this, r);
    for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
      a[i] = arguments[i];
    return (
      (n = t.call.apply(t, [this].concat(a))),
      X(J(n), "priority", 100),
      X(J(n), "incompatibleTokens", [
        "y",
        "R",
        "u",
        "q",
        "Q",
        "M",
        "L",
        "I",
        "d",
        "D",
        "i",
        "t",
        "T",
      ]),
      n
    );
  }
  return (
    De(r, [
      {
        key: "parse",
        value: function (o, a, i) {
          switch (a) {
            case "w":
              return Ge(it.week, o);
            case "wo":
              return i.ordinalNumber(o, { unit: "week" });
            default:
              return ot(a.length, o);
          }
        },
      },
      {
        key: "validate",
        value: function (o, a) {
          return a >= 1 && a <= 53;
        },
      },
      {
        key: "set",
        value: function (o, a, i, s) {
          return lo(YE(o, i, s), s);
        },
      },
    ]),
    r
  );
})(Me);
function HE(e, t) {
  W(2, arguments);
  var r = te(e),
    n = ve(t),
    o = Hy(r) - n;
  return (r.setUTCDate(r.getUTCDate() - o * 7), r);
}
var WE = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 100),
        X(J(n), "incompatibleTokens", [
          "y",
          "Y",
          "u",
          "q",
          "Q",
          "M",
          "L",
          "w",
          "d",
          "D",
          "e",
          "c",
          "t",
          "T",
        ]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a, i) {
            switch (a) {
              case "I":
                return Ge(it.week, o);
              case "Io":
                return i.ordinalNumber(o, { unit: "week" });
              default:
                return ot(a.length, o);
            }
          },
        },
        {
          key: "validate",
          value: function (o, a) {
            return a >= 1 && a <= 53;
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            return na(HE(o, i));
          },
        },
      ]),
      r
    );
  })(Me),
  VE = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  qE = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  QE = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 90),
        X(J(n), "subPriority", 1),
        X(J(n), "incompatibleTokens", [
          "Y",
          "R",
          "q",
          "Q",
          "w",
          "I",
          "D",
          "i",
          "e",
          "c",
          "t",
          "T",
        ]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a, i) {
            switch (a) {
              case "d":
                return Ge(it.date, o);
              case "do":
                return i.ordinalNumber(o, { unit: "date" });
              default:
                return ot(a.length, o);
            }
          },
        },
        {
          key: "validate",
          value: function (o, a) {
            var i = o.getUTCFullYear(),
              s = a0(i),
              l = o.getUTCMonth();
            return s ? a >= 1 && a <= qE[l] : a >= 1 && a <= VE[l];
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            return (o.setUTCDate(i), o.setUTCHours(0, 0, 0, 0), o);
          },
        },
      ]),
      r
    );
  })(Me),
  KE = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 90),
        X(J(n), "subpriority", 1),
        X(J(n), "incompatibleTokens", [
          "Y",
          "R",
          "q",
          "Q",
          "M",
          "L",
          "w",
          "I",
          "d",
          "E",
          "i",
          "e",
          "c",
          "t",
          "T",
        ]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a, i) {
            switch (a) {
              case "D":
              case "DD":
                return Ge(it.dayOfYear, o);
              case "Do":
                return i.ordinalNumber(o, { unit: "date" });
              default:
                return ot(a.length, o);
            }
          },
        },
        {
          key: "validate",
          value: function (o, a) {
            var i = o.getUTCFullYear(),
              s = a0(i);
            return s ? a >= 1 && a <= 366 : a >= 1 && a <= 365;
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            return (o.setUTCMonth(0, i), o.setUTCHours(0, 0, 0, 0), o);
          },
        },
      ]),
      r
    );
  })(Me);
function Qp(e, t, r) {
  var n, o, a, i, s, l, u, c;
  W(2, arguments);
  var d = go(),
    m = ve(
      (n =
        (o =
          (a =
            (i = r == null ? void 0 : r.weekStartsOn) !== null && i !== void 0
              ? i
              : r == null ||
                  (s = r.locale) === null ||
                  s === void 0 ||
                  (l = s.options) === null ||
                  l === void 0
                ? void 0
                : l.weekStartsOn) !== null && a !== void 0
            ? a
            : d.weekStartsOn) !== null && o !== void 0
          ? o
          : (u = d.locale) === null ||
              u === void 0 ||
              (c = u.options) === null ||
              c === void 0
            ? void 0
            : c.weekStartsOn) !== null && n !== void 0
        ? n
        : 0,
    );
  if (!(m >= 0 && m <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  var v = te(e),
    S = ve(t),
    C = v.getUTCDay(),
    k = S % 7,
    g = (k + 7) % 7,
    y = (g < m ? 7 : 0) + S - C;
  return (v.setUTCDate(v.getUTCDate() + y), v);
}
var GE = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 90),
        X(J(n), "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a, i) {
            switch (a) {
              case "E":
              case "EE":
              case "EEE":
                return (
                  i.day(o, { width: "abbreviated", context: "formatting" }) ||
                  i.day(o, { width: "short", context: "formatting" }) ||
                  i.day(o, { width: "narrow", context: "formatting" })
                );
              case "EEEEE":
                return i.day(o, { width: "narrow", context: "formatting" });
              case "EEEEEE":
                return (
                  i.day(o, { width: "short", context: "formatting" }) ||
                  i.day(o, { width: "narrow", context: "formatting" })
                );
              case "EEEE":
              default:
                return (
                  i.day(o, { width: "wide", context: "formatting" }) ||
                  i.day(o, { width: "abbreviated", context: "formatting" }) ||
                  i.day(o, { width: "short", context: "formatting" }) ||
                  i.day(o, { width: "narrow", context: "formatting" })
                );
            }
          },
        },
        {
          key: "validate",
          value: function (o, a) {
            return a >= 0 && a <= 6;
          },
        },
        {
          key: "set",
          value: function (o, a, i, s) {
            return ((o = Qp(o, i, s)), o.setUTCHours(0, 0, 0, 0), o);
          },
        },
      ]),
      r
    );
  })(Me),
  XE = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 90),
        X(J(n), "incompatibleTokens", [
          "y",
          "R",
          "u",
          "q",
          "Q",
          "M",
          "L",
          "I",
          "d",
          "D",
          "E",
          "i",
          "c",
          "t",
          "T",
        ]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a, i, s) {
            var l = function (c) {
              var d = Math.floor((c - 1) / 7) * 7;
              return ((c + s.weekStartsOn + 6) % 7) + d;
            };
            switch (a) {
              case "e":
              case "ee":
                return st(ot(a.length, o), l);
              case "eo":
                return st(i.ordinalNumber(o, { unit: "day" }), l);
              case "eee":
                return (
                  i.day(o, { width: "abbreviated", context: "formatting" }) ||
                  i.day(o, { width: "short", context: "formatting" }) ||
                  i.day(o, { width: "narrow", context: "formatting" })
                );
              case "eeeee":
                return i.day(o, { width: "narrow", context: "formatting" });
              case "eeeeee":
                return (
                  i.day(o, { width: "short", context: "formatting" }) ||
                  i.day(o, { width: "narrow", context: "formatting" })
                );
              case "eeee":
              default:
                return (
                  i.day(o, { width: "wide", context: "formatting" }) ||
                  i.day(o, { width: "abbreviated", context: "formatting" }) ||
                  i.day(o, { width: "short", context: "formatting" }) ||
                  i.day(o, { width: "narrow", context: "formatting" })
                );
            }
          },
        },
        {
          key: "validate",
          value: function (o, a) {
            return a >= 0 && a <= 6;
          },
        },
        {
          key: "set",
          value: function (o, a, i, s) {
            return ((o = Qp(o, i, s)), o.setUTCHours(0, 0, 0, 0), o);
          },
        },
      ]),
      r
    );
  })(Me),
  JE = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 90),
        X(J(n), "incompatibleTokens", [
          "y",
          "R",
          "u",
          "q",
          "Q",
          "M",
          "L",
          "I",
          "d",
          "D",
          "E",
          "i",
          "e",
          "t",
          "T",
        ]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a, i, s) {
            var l = function (c) {
              var d = Math.floor((c - 1) / 7) * 7;
              return ((c + s.weekStartsOn + 6) % 7) + d;
            };
            switch (a) {
              case "c":
              case "cc":
                return st(ot(a.length, o), l);
              case "co":
                return st(i.ordinalNumber(o, { unit: "day" }), l);
              case "ccc":
                return (
                  i.day(o, { width: "abbreviated", context: "standalone" }) ||
                  i.day(o, { width: "short", context: "standalone" }) ||
                  i.day(o, { width: "narrow", context: "standalone" })
                );
              case "ccccc":
                return i.day(o, { width: "narrow", context: "standalone" });
              case "cccccc":
                return (
                  i.day(o, { width: "short", context: "standalone" }) ||
                  i.day(o, { width: "narrow", context: "standalone" })
                );
              case "cccc":
              default:
                return (
                  i.day(o, { width: "wide", context: "standalone" }) ||
                  i.day(o, { width: "abbreviated", context: "standalone" }) ||
                  i.day(o, { width: "short", context: "standalone" }) ||
                  i.day(o, { width: "narrow", context: "standalone" })
                );
            }
          },
        },
        {
          key: "validate",
          value: function (o, a) {
            return a >= 0 && a <= 6;
          },
        },
        {
          key: "set",
          value: function (o, a, i, s) {
            return ((o = Qp(o, i, s)), o.setUTCHours(0, 0, 0, 0), o);
          },
        },
      ]),
      r
    );
  })(Me);
function ZE(e, t) {
  W(2, arguments);
  var r = ve(t);
  r % 7 === 0 && (r = r - 7);
  var n = 1,
    o = te(e),
    a = o.getUTCDay(),
    i = r % 7,
    s = (i + 7) % 7,
    l = (s < n ? 7 : 0) + r - a;
  return (o.setUTCDate(o.getUTCDate() + l), o);
}
var e_ = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 90),
        X(J(n), "incompatibleTokens", [
          "y",
          "Y",
          "u",
          "q",
          "Q",
          "M",
          "L",
          "w",
          "d",
          "D",
          "E",
          "e",
          "c",
          "t",
          "T",
        ]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a, i) {
            var s = function (u) {
              return u === 0 ? 7 : u;
            };
            switch (a) {
              case "i":
              case "ii":
                return ot(a.length, o);
              case "io":
                return i.ordinalNumber(o, { unit: "day" });
              case "iii":
                return st(
                  i.day(o, { width: "abbreviated", context: "formatting" }) ||
                    i.day(o, { width: "short", context: "formatting" }) ||
                    i.day(o, { width: "narrow", context: "formatting" }),
                  s,
                );
              case "iiiii":
                return st(
                  i.day(o, { width: "narrow", context: "formatting" }),
                  s,
                );
              case "iiiiii":
                return st(
                  i.day(o, { width: "short", context: "formatting" }) ||
                    i.day(o, { width: "narrow", context: "formatting" }),
                  s,
                );
              case "iiii":
              default:
                return st(
                  i.day(o, { width: "wide", context: "formatting" }) ||
                    i.day(o, { width: "abbreviated", context: "formatting" }) ||
                    i.day(o, { width: "short", context: "formatting" }) ||
                    i.day(o, { width: "narrow", context: "formatting" }),
                  s,
                );
            }
          },
        },
        {
          key: "validate",
          value: function (o, a) {
            return a >= 1 && a <= 7;
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            return ((o = ZE(o, i)), o.setUTCHours(0, 0, 0, 0), o);
          },
        },
      ]),
      r
    );
  })(Me),
  t_ = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 80),
        X(J(n), "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a, i) {
            switch (a) {
              case "a":
              case "aa":
              case "aaa":
                return (
                  i.dayPeriod(o, {
                    width: "abbreviated",
                    context: "formatting",
                  }) ||
                  i.dayPeriod(o, { width: "narrow", context: "formatting" })
                );
              case "aaaaa":
                return i.dayPeriod(o, {
                  width: "narrow",
                  context: "formatting",
                });
              case "aaaa":
              default:
                return (
                  i.dayPeriod(o, { width: "wide", context: "formatting" }) ||
                  i.dayPeriod(o, {
                    width: "abbreviated",
                    context: "formatting",
                  }) ||
                  i.dayPeriod(o, { width: "narrow", context: "formatting" })
                );
            }
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            return (o.setUTCHours(qp(i), 0, 0, 0), o);
          },
        },
      ]),
      r
    );
  })(Me),
  r_ = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 80),
        X(J(n), "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a, i) {
            switch (a) {
              case "b":
              case "bb":
              case "bbb":
                return (
                  i.dayPeriod(o, {
                    width: "abbreviated",
                    context: "formatting",
                  }) ||
                  i.dayPeriod(o, { width: "narrow", context: "formatting" })
                );
              case "bbbbb":
                return i.dayPeriod(o, {
                  width: "narrow",
                  context: "formatting",
                });
              case "bbbb":
              default:
                return (
                  i.dayPeriod(o, { width: "wide", context: "formatting" }) ||
                  i.dayPeriod(o, {
                    width: "abbreviated",
                    context: "formatting",
                  }) ||
                  i.dayPeriod(o, { width: "narrow", context: "formatting" })
                );
            }
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            return (o.setUTCHours(qp(i), 0, 0, 0), o);
          },
        },
      ]),
      r
    );
  })(Me),
  n_ = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 80),
        X(J(n), "incompatibleTokens", ["a", "b", "t", "T"]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a, i) {
            switch (a) {
              case "B":
              case "BB":
              case "BBB":
                return (
                  i.dayPeriod(o, {
                    width: "abbreviated",
                    context: "formatting",
                  }) ||
                  i.dayPeriod(o, { width: "narrow", context: "formatting" })
                );
              case "BBBBB":
                return i.dayPeriod(o, {
                  width: "narrow",
                  context: "formatting",
                });
              case "BBBB":
              default:
                return (
                  i.dayPeriod(o, { width: "wide", context: "formatting" }) ||
                  i.dayPeriod(o, {
                    width: "abbreviated",
                    context: "formatting",
                  }) ||
                  i.dayPeriod(o, { width: "narrow", context: "formatting" })
                );
            }
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            return (o.setUTCHours(qp(i), 0, 0, 0), o);
          },
        },
      ]),
      r
    );
  })(Me),
  o_ = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 70),
        X(J(n), "incompatibleTokens", ["H", "K", "k", "t", "T"]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a, i) {
            switch (a) {
              case "h":
                return Ge(it.hour12h, o);
              case "ho":
                return i.ordinalNumber(o, { unit: "hour" });
              default:
                return ot(a.length, o);
            }
          },
        },
        {
          key: "validate",
          value: function (o, a) {
            return a >= 1 && a <= 12;
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            var s = o.getUTCHours() >= 12;
            return (
              s && i < 12
                ? o.setUTCHours(i + 12, 0, 0, 0)
                : !s && i === 12
                  ? o.setUTCHours(0, 0, 0, 0)
                  : o.setUTCHours(i, 0, 0, 0),
              o
            );
          },
        },
      ]),
      r
    );
  })(Me),
  a_ = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 70),
        X(J(n), "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a, i) {
            switch (a) {
              case "H":
                return Ge(it.hour23h, o);
              case "Ho":
                return i.ordinalNumber(o, { unit: "hour" });
              default:
                return ot(a.length, o);
            }
          },
        },
        {
          key: "validate",
          value: function (o, a) {
            return a >= 0 && a <= 23;
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            return (o.setUTCHours(i, 0, 0, 0), o);
          },
        },
      ]),
      r
    );
  })(Me),
  i_ = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 70),
        X(J(n), "incompatibleTokens", ["h", "H", "k", "t", "T"]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a, i) {
            switch (a) {
              case "K":
                return Ge(it.hour11h, o);
              case "Ko":
                return i.ordinalNumber(o, { unit: "hour" });
              default:
                return ot(a.length, o);
            }
          },
        },
        {
          key: "validate",
          value: function (o, a) {
            return a >= 0 && a <= 11;
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            var s = o.getUTCHours() >= 12;
            return (
              s && i < 12
                ? o.setUTCHours(i + 12, 0, 0, 0)
                : o.setUTCHours(i, 0, 0, 0),
              o
            );
          },
        },
      ]),
      r
    );
  })(Me),
  s_ = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 70),
        X(J(n), "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a, i) {
            switch (a) {
              case "k":
                return Ge(it.hour24h, o);
              case "ko":
                return i.ordinalNumber(o, { unit: "hour" });
              default:
                return ot(a.length, o);
            }
          },
        },
        {
          key: "validate",
          value: function (o, a) {
            return a >= 1 && a <= 24;
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            var s = i <= 24 ? i % 24 : i;
            return (o.setUTCHours(s, 0, 0, 0), o);
          },
        },
      ]),
      r
    );
  })(Me),
  l_ = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 60),
        X(J(n), "incompatibleTokens", ["t", "T"]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a, i) {
            switch (a) {
              case "m":
                return Ge(it.minute, o);
              case "mo":
                return i.ordinalNumber(o, { unit: "minute" });
              default:
                return ot(a.length, o);
            }
          },
        },
        {
          key: "validate",
          value: function (o, a) {
            return a >= 0 && a <= 59;
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            return (o.setUTCMinutes(i, 0, 0), o);
          },
        },
      ]),
      r
    );
  })(Me),
  u_ = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 50),
        X(J(n), "incompatibleTokens", ["t", "T"]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a, i) {
            switch (a) {
              case "s":
                return Ge(it.second, o);
              case "so":
                return i.ordinalNumber(o, { unit: "second" });
              default:
                return ot(a.length, o);
            }
          },
        },
        {
          key: "validate",
          value: function (o, a) {
            return a >= 0 && a <= 59;
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            return (o.setUTCSeconds(i, 0), o);
          },
        },
      ]),
      r
    );
  })(Me),
  c_ = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 30),
        X(J(n), "incompatibleTokens", ["t", "T"]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a) {
            var i = function (l) {
              return Math.floor(l * Math.pow(10, -a.length + 3));
            };
            return st(ot(a.length, o), i);
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            return (o.setUTCMilliseconds(i), o);
          },
        },
      ]),
      r
    );
  })(Me),
  d_ = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 10),
        X(J(n), "incompatibleTokens", ["t", "T", "x"]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a) {
            switch (a) {
              case "X":
                return Lr(jr.basicOptionalMinutes, o);
              case "XX":
                return Lr(jr.basic, o);
              case "XXXX":
                return Lr(jr.basicOptionalSeconds, o);
              case "XXXXX":
                return Lr(jr.extendedOptionalSeconds, o);
              case "XXX":
              default:
                return Lr(jr.extended, o);
            }
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            return a.timestampIsSet ? o : new Date(o.getTime() - i);
          },
        },
      ]),
      r
    );
  })(Me),
  p_ = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 10),
        X(J(n), "incompatibleTokens", ["t", "T", "X"]),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o, a) {
            switch (a) {
              case "x":
                return Lr(jr.basicOptionalMinutes, o);
              case "xx":
                return Lr(jr.basic, o);
              case "xxxx":
                return Lr(jr.basicOptionalSeconds, o);
              case "xxxxx":
                return Lr(jr.extendedOptionalSeconds, o);
              case "xxx":
              default:
                return Lr(jr.extended, o);
            }
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            return a.timestampIsSet ? o : new Date(o.getTime() - i);
          },
        },
      ]),
      r
    );
  })(Me),
  f_ = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 40),
        X(J(n), "incompatibleTokens", "*"),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o) {
            return n0(o);
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            return [new Date(i * 1e3), { timestampIsSet: !0 }];
          },
        },
      ]),
      r
    );
  })(Me),
  h_ = (function (e) {
    Re(r, e);
    var t = Oe(r);
    function r() {
      var n;
      be(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        (n = t.call.apply(t, [this].concat(a))),
        X(J(n), "priority", 20),
        X(J(n), "incompatibleTokens", "*"),
        n
      );
    }
    return (
      De(r, [
        {
          key: "parse",
          value: function (o) {
            return n0(o);
          },
        },
        {
          key: "set",
          value: function (o, a, i) {
            return [new Date(i), { timestampIsSet: !0 }];
          },
        },
      ]),
      r
    );
  })(Me),
  m_ = {
    G: new NE(),
    y: new IE(),
    Y: new jE(),
    R: new LE(),
    u: new AE(),
    Q: new FE(),
    q: new BE(),
    M: new UE(),
    L: new $E(),
    w: new zE(),
    I: new WE(),
    d: new QE(),
    D: new KE(),
    E: new GE(),
    e: new XE(),
    c: new JE(),
    i: new e_(),
    a: new t_(),
    b: new r_(),
    B: new n_(),
    h: new o_(),
    H: new a_(),
    K: new i_(),
    k: new s_(),
    m: new l_(),
    s: new u_(),
    S: new c_(),
    X: new d_(),
    x: new p_(),
    t: new f_(),
    T: new h_(),
  },
  g_ = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
  v_ = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
  y_ = /^'([^]*?)'?$/,
  w_ = /''/g,
  x_ = /\S/,
  S_ = /[a-zA-Z]/;
function qu(e, t, r, n) {
  var o, a, i, s, l, u, c, d, m, v, S, C, k, g, y, w, T, P;
  W(3, arguments);
  var R = String(e),
    M = String(t),
    A = go(),
    V =
      (o =
        (a = n == null ? void 0 : n.locale) !== null && a !== void 0
          ? a
          : A.locale) !== null && o !== void 0
        ? o
        : Ky;
  if (!V.match) throw new RangeError("locale must contain match property");
  var L = ve(
    (i =
      (s =
        (l =
          (u = n == null ? void 0 : n.firstWeekContainsDate) !== null &&
          u !== void 0
            ? u
            : n == null ||
                (c = n.locale) === null ||
                c === void 0 ||
                (d = c.options) === null ||
                d === void 0
              ? void 0
              : d.firstWeekContainsDate) !== null && l !== void 0
          ? l
          : A.firstWeekContainsDate) !== null && s !== void 0
        ? s
        : (m = A.locale) === null ||
            m === void 0 ||
            (v = m.options) === null ||
            v === void 0
          ? void 0
          : v.firstWeekContainsDate) !== null && i !== void 0
      ? i
      : 1,
  );
  if (!(L >= 1 && L <= 7))
    throw new RangeError(
      "firstWeekContainsDate must be between 1 and 7 inclusively",
    );
  var K = ve(
    (S =
      (C =
        (k =
          (g = n == null ? void 0 : n.weekStartsOn) !== null && g !== void 0
            ? g
            : n == null ||
                (y = n.locale) === null ||
                y === void 0 ||
                (w = y.options) === null ||
                w === void 0
              ? void 0
              : w.weekStartsOn) !== null && k !== void 0
          ? k
          : A.weekStartsOn) !== null && C !== void 0
        ? C
        : (T = A.locale) === null ||
            T === void 0 ||
            (P = T.options) === null ||
            P === void 0
          ? void 0
          : P.weekStartsOn) !== null && S !== void 0
      ? S
      : 0,
  );
  if (!(K >= 0 && K <= 6))
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  if (M === "") return R === "" ? te(r) : new Date(NaN);
  var $ = { firstWeekContainsDate: L, weekStartsOn: K, locale: V },
    ae = [new OE()],
    le = M.match(v_)
      .map(function (Ee) {
        var ye = Ee[0];
        if (ye in pd) {
          var B = pd[ye];
          return B(Ee, V.formatLong);
        }
        return Ee;
      })
      .join("")
      .match(g_),
    U = [],
    q = qh(le),
    ie;
  try {
    var z = function () {
      var ye = ie.value;
      (!(n != null && n.useAdditionalWeekYearTokens) && Qy(ye) && yl(ye, M, e),
        !(n != null && n.useAdditionalDayOfYearTokens) &&
          qy(ye) &&
          yl(ye, M, e));
      var B = ye[0],
        oe = m_[B];
      if (oe) {
        var ce = oe.incompatibleTokens;
        if (Array.isArray(ce)) {
          var he = U.find(function (se) {
            return ce.includes(se.token) || se.token === B;
          });
          if (he)
            throw new RangeError(
              "The format string mustn't contain `"
                .concat(he.fullToken, "` and `")
                .concat(ye, "` at the same time"),
            );
        } else if (oe.incompatibleTokens === "*" && U.length > 0)
          throw new RangeError(
            "The format string mustn't contain `".concat(
              ye,
              "` and any other token at the same time",
            ),
          );
        U.push({ token: B, fullToken: ye });
        var Te = oe.run(R, ye, V.match, $);
        if (!Te) return { v: new Date(NaN) };
        (ae.push(Te.setter), (R = Te.rest));
      } else {
        if (B.match(S_))
          throw new RangeError(
            "Format string contains an unescaped latin alphabet character `" +
              B +
              "`",
          );
        if (
          (ye === "''" ? (ye = "'") : B === "'" && (ye = C_(ye)),
          R.indexOf(ye) === 0)
        )
          R = R.slice(ye.length);
        else return { v: new Date(NaN) };
      }
    };
    for (q.s(); !(ie = q.n()).done;) {
      var G = z();
      if (fr(G) === "object") return G.v;
    }
  } catch (Ee) {
    q.e(Ee);
  } finally {
    q.f();
  }
  if (R.length > 0 && x_.test(R)) return new Date(NaN);
  var Z = ae
      .map(function (Ee) {
        return Ee.priority;
      })
      .sort(function (Ee, ye) {
        return ye - Ee;
      })
      .filter(function (Ee, ye, B) {
        return B.indexOf(Ee) === ye;
      })
      .map(function (Ee) {
        return ae
          .filter(function (ye) {
            return ye.priority === Ee;
          })
          .sort(function (ye, B) {
            return B.subPriority - ye.subPriority;
          });
      })
      .map(function (Ee) {
        return Ee[0];
      }),
    ne = te(r);
  if (isNaN(ne.getTime())) return new Date(NaN);
  var fe = Yy(ne, vl(ne)),
    ze = {},
    pe = qh(Z),
    ke;
  try {
    for (pe.s(); !(ke = pe.n()).done;) {
      var ue = ke.value;
      if (!ue.validate(fe, $)) return new Date(NaN);
      var Ne = ue.set(fe, ze, $);
      Array.isArray(Ne) ? ((fe = Ne[0]), _E(ze, Ne[1])) : (fe = Ne);
    }
  } catch (Ee) {
    pe.e(Ee);
  } finally {
    pe.f();
  }
  return fe;
}
function C_(e) {
  return e.match(y_)[1].replace(w_, "'");
}
function k_(e, t) {
  var r;
  W(1, arguments);
  var n = ve((r = void 0) !== null && r !== void 0 ? r : 2);
  if (n !== 2 && n !== 1 && n !== 0)
    throw new RangeError("additionalDigits must be 0, 1 or 2");
  if (!(
    typeof e == "string" ||
    Object.prototype.toString.call(e) === "[object String]"
  ))
    return new Date(NaN);
  var o = D_(e),
    a;
  if (o.date) {
    var i = T_(o.date, n);
    a = P_(i.restDateString, i.year);
  }
  if (!a || isNaN(a.getTime())) return new Date(NaN);
  var s = a.getTime(),
    l = 0,
    u;
  if (o.time && ((l = R_(o.time)), isNaN(l))) return new Date(NaN);
  if (o.timezone) {
    if (((u = O_(o.timezone)), isNaN(u))) return new Date(NaN);
  } else {
    var c = new Date(s + l),
      d = new Date(0);
    return (
      d.setFullYear(c.getUTCFullYear(), c.getUTCMonth(), c.getUTCDate()),
      d.setHours(
        c.getUTCHours(),
        c.getUTCMinutes(),
        c.getUTCSeconds(),
        c.getUTCMilliseconds(),
      ),
      d
    );
  }
  return new Date(s + l + u);
}
var ds = {
    dateTimeDelimiter: /[T ]/,
    timeZoneDelimiter: /[Z ]/i,
    timezone: /([Z+-].*)$/,
  },
  E_ = /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,
  __ =
    /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,
  b_ = /^([+-])(\d{2})(?::?(\d{2}))?$/;
function D_(e) {
  var t = {},
    r = e.split(ds.dateTimeDelimiter),
    n;
  if (r.length > 2) return t;
  if (
    (/:/.test(r[0])
      ? (n = r[0])
      : ((t.date = r[0]),
        (n = r[1]),
        ds.timeZoneDelimiter.test(t.date) &&
          ((t.date = e.split(ds.timeZoneDelimiter)[0]),
          (n = e.substr(t.date.length, e.length)))),
    n)
  ) {
    var o = ds.timezone.exec(n);
    o ? ((t.time = n.replace(o[1], "")), (t.timezone = o[1])) : (t.time = n);
  }
  return t;
}
function T_(e, t) {
  var r = new RegExp(
      "^(?:(\\d{4}|[+-]\\d{" +
        (4 + t) +
        "})|(\\d{2}|[+-]\\d{" +
        (2 + t) +
        "})$)",
    ),
    n = e.match(r);
  if (!n) return { year: NaN, restDateString: "" };
  var o = n[1] ? parseInt(n[1]) : null,
    a = n[2] ? parseInt(n[2]) : null;
  return {
    year: a === null ? o : a * 100,
    restDateString: e.slice((n[1] || n[2]).length),
  };
}
function P_(e, t) {
  if (t === null) return new Date(NaN);
  var r = e.match(E_);
  if (!r) return new Date(NaN);
  var n = !!r[4],
    o = ja(r[1]),
    a = ja(r[2]) - 1,
    i = ja(r[3]),
    s = ja(r[4]),
    l = ja(r[5]) - 1;
  if (n) return L_(t, s, l) ? N_(t, s, l) : new Date(NaN);
  var u = new Date(0);
  return !I_(t, a, i) || !j_(t, o)
    ? new Date(NaN)
    : (u.setUTCFullYear(t, a, Math.max(o, i)), u);
}
function ja(e) {
  return e ? parseInt(e) : 1;
}
function R_(e) {
  var t = e.match(__);
  if (!t) return NaN;
  var r = Qu(t[1]),
    n = Qu(t[2]),
    o = Qu(t[3]);
  return A_(r, n, o) ? r * Vp + n * Wp + o * 1e3 : NaN;
}
function Qu(e) {
  return (e && parseFloat(e.replace(",", "."))) || 0;
}
function O_(e) {
  if (e === "Z") return 0;
  var t = e.match(b_);
  if (!t) return 0;
  var r = t[1] === "+" ? -1 : 1,
    n = parseInt(t[2]),
    o = (t[3] && parseInt(t[3])) || 0;
  return F_(n, o) ? r * (n * Vp + o * Wp) : NaN;
}
function N_(e, t, r) {
  var n = new Date(0);
  n.setUTCFullYear(e, 0, 4);
  var o = n.getUTCDay() || 7,
    a = (t - 1) * 7 + r + 1 - o;
  return (n.setUTCDate(n.getUTCDate() + a), n);
}
var M_ = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function i0(e) {
  return e % 400 === 0 || (e % 4 === 0 && e % 100 !== 0);
}
function I_(e, t, r) {
  return t >= 0 && t <= 11 && r >= 1 && r <= (M_[t] || (i0(e) ? 29 : 28));
}
function j_(e, t) {
  return t >= 1 && t <= (i0(e) ? 366 : 365);
}
function L_(e, t, r) {
  return t >= 1 && t <= 53 && r >= 0 && r <= 6;
}
function A_(e, t, r) {
  return e === 24
    ? t === 0 && r === 0
    : r >= 0 && r < 60 && t >= 0 && t < 60 && e >= 0 && e < 25;
}
function F_(e, t) {
  return t >= 0 && t <= 59;
}
function B_(e, t) {
  ((e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    yd(e, t));
}
function yd(e, t) {
  return (
    (yd =
      Object.setPrototypeOf ||
      function (n, o) {
        return ((n.__proto__ = o), n);
      }),
    yd(e, t)
  );
}
function U_(e, t) {
  if (e == null) return {};
  var r = {},
    n = Object.keys(e),
    o,
    a;
  for (a = 0; a < n.length; a++)
    ((o = n[a]), !(t.indexOf(o) >= 0) && (r[o] = e[o]));
  return r;
}
function Qh(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  return e;
}
function $_(e, t, r) {
  return e === t
    ? !0
    : e.correspondingElement
      ? e.correspondingElement.classList.contains(r)
      : e.classList.contains(r);
}
function Y_(e, t, r) {
  if (e === t) return !0;
  for (; e.parentNode || e.host;) {
    if (e.parentNode && $_(e, t, r)) return !0;
    e = e.parentNode || e.host;
  }
  return e;
}
function z_(e) {
  return (
    document.documentElement.clientWidth <= e.clientX ||
    document.documentElement.clientHeight <= e.clientY
  );
}
var H_ = function () {
  if (!(typeof window > "u" || typeof window.addEventListener != "function")) {
    var t = !1,
      r = Object.defineProperty({}, "passive", {
        get: function () {
          t = !0;
        },
      }),
      n = function () {};
    return (
      window.addEventListener("testPassiveEventSupport", n, r),
      window.removeEventListener("testPassiveEventSupport", n, r),
      t
    );
  }
};
function W_(e) {
  return (
    e === void 0 && (e = 0),
    function () {
      return ++e;
    }
  );
}
var V_ = W_(),
  wd,
  ps = {},
  Ku = {},
  q_ = ["touchstart", "touchmove"],
  Q_ = "ignore-react-onclickoutside";
function Kh(e, t) {
  var r = {},
    n = q_.indexOf(t) !== -1;
  return (n && wd && (r.passive = !e.props.preventDefault), r);
}
function au(e, t) {
  var r,
    n,
    o = e.displayName || e.name || "Component";
  return (
    (n = r =
      (function (a) {
        B_(i, a);
        function i(l) {
          var u;
          return (
            (u = a.call(this, l) || this),
            (u.__outsideClickHandler = function (c) {
              if (typeof u.__clickOutsideHandlerProp == "function") {
                u.__clickOutsideHandlerProp(c);
                return;
              }
              var d = u.getInstance();
              if (typeof d.props.handleClickOutside == "function") {
                d.props.handleClickOutside(c);
                return;
              }
              if (typeof d.handleClickOutside == "function") {
                d.handleClickOutside(c);
                return;
              }
              throw new Error(
                "WrappedComponent: " +
                  o +
                  " lacks a handleClickOutside(event) function for processing outside click events.",
              );
            }),
            (u.__getComponentNode = function () {
              var c = u.getInstance();
              return typeof c.setClickOutsideRef == "function"
                ? c.setClickOutsideRef()
                : eu.findDOMNode(c);
            }),
            (u.enableOnClickOutside = function () {
              if (!(typeof document > "u" || Ku[u._uid])) {
                (typeof wd > "u" && (wd = H_()), (Ku[u._uid] = !0));
                var c = u.props.eventTypes;
                (c.forEach || (c = [c]),
                  (ps[u._uid] = function (d) {
                    if (
                      u.componentNode !== null &&
                      !(u.initTimeStamp > d.timeStamp) &&
                      (u.props.preventDefault && d.preventDefault(),
                      u.props.stopPropagation && d.stopPropagation(),
                      !(u.props.excludeScrollbar && z_(d)))
                    ) {
                      var m =
                        (d.composed &&
                          d.composedPath &&
                          d.composedPath().shift()) ||
                        d.target;
                      Y_(
                        m,
                        u.componentNode,
                        u.props.outsideClickIgnoreClass,
                      ) === document && u.__outsideClickHandler(d);
                    }
                  }),
                  c.forEach(function (d) {
                    document.addEventListener(d, ps[u._uid], Kh(Qh(u), d));
                  }));
              }
            }),
            (u.disableOnClickOutside = function () {
              delete Ku[u._uid];
              var c = ps[u._uid];
              if (c && typeof document < "u") {
                var d = u.props.eventTypes;
                (d.forEach || (d = [d]),
                  d.forEach(function (m) {
                    return document.removeEventListener(m, c, Kh(Qh(u), m));
                  }),
                  delete ps[u._uid]);
              }
            }),
            (u.getRef = function (c) {
              return (u.instanceRef = c);
            }),
            (u._uid = V_()),
            (u.initTimeStamp = performance.now()),
            u
          );
        }
        var s = i.prototype;
        return (
          (s.getInstance = function () {
            if (e.prototype && !e.prototype.isReactComponent) return this;
            var u = this.instanceRef;
            return u.getInstance ? u.getInstance() : u;
          }),
          (s.componentDidMount = function () {
            typeof document > "u" ||
              !document.createElement ||
              (this.getInstance(),
              (this.componentNode = this.__getComponentNode()),
              !this.props.disableOnClickOutside && this.enableOnClickOutside());
          }),
          (s.componentDidUpdate = function () {
            this.componentNode = this.__getComponentNode();
          }),
          (s.componentWillUnmount = function () {
            this.disableOnClickOutside();
          }),
          (s.render = function () {
            var u = this.props;
            u.excludeScrollbar;
            var c = U_(u, ["excludeScrollbar"]);
            return (
              e.prototype && e.prototype.isReactComponent
                ? (c.ref = this.getRef)
                : (c.wrappedRef = this.getRef),
              (c.disableOnClickOutside = this.disableOnClickOutside),
              (c.enableOnClickOutside = this.enableOnClickOutside),
              _.createElement(e, c)
            );
          }),
          i
        );
      })(_.Component)),
    (r.displayName = "OnClickOutside(" + o + ")"),
    (r.defaultProps = {
      eventTypes: ["mousedown", "touchstart"],
      excludeScrollbar: !1,
      outsideClickIgnoreClass: Q_,
      preventDefault: !1,
      stopPropagation: !1,
    }),
    (r.getClass = function () {
      return e.getClass ? e.getClass() : e;
    }),
    n
  );
}
var s0 = _.createContext(),
  l0 = _.createContext();
function K_(e) {
  var t = e.children,
    r = _.useState(null),
    n = r[0],
    o = r[1],
    a = _.useRef(!1);
  _.useEffect(function () {
    return function () {
      a.current = !0;
    };
  }, []);
  var i = _.useCallback(function (s) {
    a.current || o(s);
  }, []);
  return _.createElement(
    s0.Provider,
    { value: n },
    _.createElement(l0.Provider, { value: i }, t),
  );
}
var u0 = function (t) {
    return Array.isArray(t) ? t[0] : t;
  },
  c0 = function (t) {
    if (typeof t == "function") {
      for (
        var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), o = 1;
        o < r;
        o++
      )
        n[o - 1] = arguments[o];
      return t.apply(void 0, n);
    }
  },
  xd = function (t, r) {
    if (typeof t == "function") return c0(t, r);
    t != null && (t.current = r);
  },
  Gh = function (t) {
    return t.reduce(function (r, n) {
      var o = n[0],
        a = n[1];
      return ((r[o] = a), r);
    }, {});
  },
  Xh =
    typeof window < "u" && window.document && window.document.createElement
      ? _.useLayoutEffect
      : _.useEffect,
  qt = "top",
  hr = "bottom",
  mr = "right",
  Qt = "left",
  Kp = "auto",
  Ui = [qt, hr, mr, Qt],
  ia = "start",
  Di = "end",
  G_ = "clippingParents",
  d0 = "viewport",
  La = "popper",
  X_ = "reference",
  Jh = Ui.reduce(function (e, t) {
    return e.concat([t + "-" + ia, t + "-" + Di]);
  }, []),
  p0 = [].concat(Ui, [Kp]).reduce(function (e, t) {
    return e.concat([t, t + "-" + ia, t + "-" + Di]);
  }, []),
  J_ = "beforeRead",
  Z_ = "read",
  eb = "afterRead",
  tb = "beforeMain",
  rb = "main",
  nb = "afterMain",
  ob = "beforeWrite",
  ab = "write",
  ib = "afterWrite",
  sb = [J_, Z_, eb, tb, rb, nb, ob, ab, ib];
function Vr(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function er(e) {
  if (e == null) return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return (t && t.defaultView) || window;
  }
  return e;
}
function uo(e) {
  var t = er(e).Element;
  return e instanceof t || e instanceof Element;
}
function cr(e) {
  var t = er(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Gp(e) {
  if (typeof ShadowRoot > "u") return !1;
  var t = er(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function lb(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function (r) {
    var n = t.styles[r] || {},
      o = t.attributes[r] || {},
      a = t.elements[r];
    !cr(a) ||
      !Vr(a) ||
      (Object.assign(a.style, n),
      Object.keys(o).forEach(function (i) {
        var s = o[i];
        s === !1 ? a.removeAttribute(i) : a.setAttribute(i, s === !0 ? "" : s);
      }));
  });
}
function ub(e) {
  var t = e.state,
    r = {
      popper: {
        position: t.options.strategy,
        left: "0",
        top: "0",
        margin: "0",
      },
      arrow: { position: "absolute" },
      reference: {},
    };
  return (
    Object.assign(t.elements.popper.style, r.popper),
    (t.styles = r),
    t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow),
    function () {
      Object.keys(t.elements).forEach(function (n) {
        var o = t.elements[n],
          a = t.attributes[n] || {},
          i = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : r[n]),
          s = i.reduce(function (l, u) {
            return ((l[u] = ""), l);
          }, {});
        !cr(o) ||
          !Vr(o) ||
          (Object.assign(o.style, s),
          Object.keys(a).forEach(function (l) {
            o.removeAttribute(l);
          }));
      });
    }
  );
}
const cb = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: lb,
  effect: ub,
  requires: ["computeStyles"],
};
function zr(e) {
  return e.split("-")[0];
}
var Zn = Math.max,
  bl = Math.min,
  sa = Math.round;
function Sd() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands)
    ? e.brands
        .map(function (t) {
          return t.brand + "/" + t.version;
        })
        .join(" ")
    : navigator.userAgent;
}
function f0() {
  return !/^((?!chrome|android).)*safari/i.test(Sd());
}
function la(e, t, r) {
  (t === void 0 && (t = !1), r === void 0 && (r = !1));
  var n = e.getBoundingClientRect(),
    o = 1,
    a = 1;
  t &&
    cr(e) &&
    ((o = (e.offsetWidth > 0 && sa(n.width) / e.offsetWidth) || 1),
    (a = (e.offsetHeight > 0 && sa(n.height) / e.offsetHeight) || 1));
  var i = uo(e) ? er(e) : window,
    s = i.visualViewport,
    l = !f0() && r,
    u = (n.left + (l && s ? s.offsetLeft : 0)) / o,
    c = (n.top + (l && s ? s.offsetTop : 0)) / a,
    d = n.width / o,
    m = n.height / a;
  return {
    width: d,
    height: m,
    top: c,
    right: u + d,
    bottom: c + m,
    left: u,
    x: u,
    y: c,
  };
}
function Xp(e) {
  var t = la(e),
    r = e.offsetWidth,
    n = e.offsetHeight;
  return (
    Math.abs(t.width - r) <= 1 && (r = t.width),
    Math.abs(t.height - n) <= 1 && (n = t.height),
    { x: e.offsetLeft, y: e.offsetTop, width: r, height: n }
  );
}
function h0(e, t) {
  var r = t.getRootNode && t.getRootNode();
  if (e.contains(t)) return !0;
  if (r && Gp(r)) {
    var n = t;
    do {
      if (n && e.isSameNode(n)) return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function sn(e) {
  return er(e).getComputedStyle(e);
}
function db(e) {
  return ["table", "td", "th"].indexOf(Vr(e)) >= 0;
}
function Bn(e) {
  return ((uo(e) ? e.ownerDocument : e.document) || window.document)
    .documentElement;
}
function iu(e) {
  return Vr(e) === "html"
    ? e
    : e.assignedSlot || e.parentNode || (Gp(e) ? e.host : null) || Bn(e);
}
function Zh(e) {
  return !cr(e) || sn(e).position === "fixed" ? null : e.offsetParent;
}
function pb(e) {
  var t = /firefox/i.test(Sd()),
    r = /Trident/i.test(Sd());
  if (r && cr(e)) {
    var n = sn(e);
    if (n.position === "fixed") return null;
  }
  var o = iu(e);
  for (Gp(o) && (o = o.host); cr(o) && ["html", "body"].indexOf(Vr(o)) < 0;) {
    var a = sn(o);
    if (
      a.transform !== "none" ||
      a.perspective !== "none" ||
      a.contain === "paint" ||
      ["transform", "perspective"].indexOf(a.willChange) !== -1 ||
      (t && a.willChange === "filter") ||
      (t && a.filter && a.filter !== "none")
    )
      return o;
    o = o.parentNode;
  }
  return null;
}
function $i(e) {
  for (var t = er(e), r = Zh(e); r && db(r) && sn(r).position === "static";)
    r = Zh(r);
  return r &&
    (Vr(r) === "html" || (Vr(r) === "body" && sn(r).position === "static"))
    ? t
    : r || pb(e) || t;
}
function Jp(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function ei(e, t, r) {
  return Zn(e, bl(t, r));
}
function fb(e, t, r) {
  var n = ei(e, t, r);
  return n > r ? r : n;
}
function m0() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function g0(e) {
  return Object.assign({}, m0(), e);
}
function v0(e, t) {
  return t.reduce(function (r, n) {
    return ((r[n] = e), r);
  }, {});
}
var hb = function (t, r) {
  return (
    (t =
      typeof t == "function"
        ? t(Object.assign({}, r.rects, { placement: r.placement }))
        : t),
    g0(typeof t != "number" ? t : v0(t, Ui))
  );
};
function mb(e) {
  var t,
    r = e.state,
    n = e.name,
    o = e.options,
    a = r.elements.arrow,
    i = r.modifiersData.popperOffsets,
    s = zr(r.placement),
    l = Jp(s),
    u = [Qt, mr].indexOf(s) >= 0,
    c = u ? "height" : "width";
  if (!(!a || !i)) {
    var d = hb(o.padding, r),
      m = Xp(a),
      v = l === "y" ? qt : Qt,
      S = l === "y" ? hr : mr,
      C =
        r.rects.reference[c] + r.rects.reference[l] - i[l] - r.rects.popper[c],
      k = i[l] - r.rects.reference[l],
      g = $i(a),
      y = g ? (l === "y" ? g.clientHeight || 0 : g.clientWidth || 0) : 0,
      w = C / 2 - k / 2,
      T = d[v],
      P = y - m[c] - d[S],
      R = y / 2 - m[c] / 2 + w,
      M = ei(T, R, P),
      A = l;
    r.modifiersData[n] = ((t = {}), (t[A] = M), (t.centerOffset = M - R), t);
  }
}
function gb(e) {
  var t = e.state,
    r = e.options,
    n = r.element,
    o = n === void 0 ? "[data-popper-arrow]" : n;
  o != null &&
    ((typeof o == "string" && ((o = t.elements.popper.querySelector(o)), !o)) ||
      (h0(t.elements.popper, o) && (t.elements.arrow = o)));
}
const vb = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: mb,
  effect: gb,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"],
};
function ua(e) {
  return e.split("-")[1];
}
var yb = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function wb(e, t) {
  var r = e.x,
    n = e.y,
    o = t.devicePixelRatio || 1;
  return { x: sa(r * o) / o || 0, y: sa(n * o) / o || 0 };
}
function em(e) {
  var t,
    r = e.popper,
    n = e.popperRect,
    o = e.placement,
    a = e.variation,
    i = e.offsets,
    s = e.position,
    l = e.gpuAcceleration,
    u = e.adaptive,
    c = e.roundOffsets,
    d = e.isFixed,
    m = i.x,
    v = m === void 0 ? 0 : m,
    S = i.y,
    C = S === void 0 ? 0 : S,
    k = typeof c == "function" ? c({ x: v, y: C }) : { x: v, y: C };
  ((v = k.x), (C = k.y));
  var g = i.hasOwnProperty("x"),
    y = i.hasOwnProperty("y"),
    w = Qt,
    T = qt,
    P = window;
  if (u) {
    var R = $i(r),
      M = "clientHeight",
      A = "clientWidth";
    if (
      (R === er(r) &&
        ((R = Bn(r)),
        sn(R).position !== "static" &&
          s === "absolute" &&
          ((M = "scrollHeight"), (A = "scrollWidth"))),
      (R = R),
      o === qt || ((o === Qt || o === mr) && a === Di))
    ) {
      T = hr;
      var V = d && R === P && P.visualViewport ? P.visualViewport.height : R[M];
      ((C -= V - n.height), (C *= l ? 1 : -1));
    }
    if (o === Qt || ((o === qt || o === hr) && a === Di)) {
      w = mr;
      var L = d && R === P && P.visualViewport ? P.visualViewport.width : R[A];
      ((v -= L - n.width), (v *= l ? 1 : -1));
    }
  }
  var K = Object.assign({ position: s }, u && yb),
    $ = c === !0 ? wb({ x: v, y: C }, er(r)) : { x: v, y: C };
  if (((v = $.x), (C = $.y), l)) {
    var ae;
    return Object.assign(
      {},
      K,
      ((ae = {}),
      (ae[T] = y ? "0" : ""),
      (ae[w] = g ? "0" : ""),
      (ae.transform =
        (P.devicePixelRatio || 1) <= 1
          ? "translate(" + v + "px, " + C + "px)"
          : "translate3d(" + v + "px, " + C + "px, 0)"),
      ae),
    );
  }
  return Object.assign(
    {},
    K,
    ((t = {}),
    (t[T] = y ? C + "px" : ""),
    (t[w] = g ? v + "px" : ""),
    (t.transform = ""),
    t),
  );
}
function xb(e) {
  var t = e.state,
    r = e.options,
    n = r.gpuAcceleration,
    o = n === void 0 ? !0 : n,
    a = r.adaptive,
    i = a === void 0 ? !0 : a,
    s = r.roundOffsets,
    l = s === void 0 ? !0 : s,
    u = {
      placement: zr(t.placement),
      variation: ua(t.placement),
      popper: t.elements.popper,
      popperRect: t.rects.popper,
      gpuAcceleration: o,
      isFixed: t.options.strategy === "fixed",
    };
  (t.modifiersData.popperOffsets != null &&
    (t.styles.popper = Object.assign(
      {},
      t.styles.popper,
      em(
        Object.assign({}, u, {
          offsets: t.modifiersData.popperOffsets,
          position: t.options.strategy,
          adaptive: i,
          roundOffsets: l,
        }),
      ),
    )),
    t.modifiersData.arrow != null &&
      (t.styles.arrow = Object.assign(
        {},
        t.styles.arrow,
        em(
          Object.assign({}, u, {
            offsets: t.modifiersData.arrow,
            position: "absolute",
            adaptive: !1,
            roundOffsets: l,
          }),
        ),
      )),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-placement": t.placement,
    })));
}
const Sb = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: xb,
  data: {},
};
var fs = { passive: !0 };
function Cb(e) {
  var t = e.state,
    r = e.instance,
    n = e.options,
    o = n.scroll,
    a = o === void 0 ? !0 : o,
    i = n.resize,
    s = i === void 0 ? !0 : i,
    l = er(t.elements.popper),
    u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return (
    a &&
      u.forEach(function (c) {
        c.addEventListener("scroll", r.update, fs);
      }),
    s && l.addEventListener("resize", r.update, fs),
    function () {
      (a &&
        u.forEach(function (c) {
          c.removeEventListener("scroll", r.update, fs);
        }),
        s && l.removeEventListener("resize", r.update, fs));
    }
  );
}
const kb = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function () {},
  effect: Cb,
  data: {},
};
var Eb = { left: "right", right: "left", bottom: "top", top: "bottom" };
function Ns(e) {
  return e.replace(/left|right|bottom|top/g, function (t) {
    return Eb[t];
  });
}
var _b = { start: "end", end: "start" };
function tm(e) {
  return e.replace(/start|end/g, function (t) {
    return _b[t];
  });
}
function Zp(e) {
  var t = er(e),
    r = t.pageXOffset,
    n = t.pageYOffset;
  return { scrollLeft: r, scrollTop: n };
}
function ef(e) {
  return la(Bn(e)).left + Zp(e).scrollLeft;
}
function bb(e, t) {
  var r = er(e),
    n = Bn(e),
    o = r.visualViewport,
    a = n.clientWidth,
    i = n.clientHeight,
    s = 0,
    l = 0;
  if (o) {
    ((a = o.width), (i = o.height));
    var u = f0();
    (u || (!u && t === "fixed")) && ((s = o.offsetLeft), (l = o.offsetTop));
  }
  return { width: a, height: i, x: s + ef(e), y: l };
}
function Db(e) {
  var t,
    r = Bn(e),
    n = Zp(e),
    o = (t = e.ownerDocument) == null ? void 0 : t.body,
    a = Zn(
      r.scrollWidth,
      r.clientWidth,
      o ? o.scrollWidth : 0,
      o ? o.clientWidth : 0,
    ),
    i = Zn(
      r.scrollHeight,
      r.clientHeight,
      o ? o.scrollHeight : 0,
      o ? o.clientHeight : 0,
    ),
    s = -n.scrollLeft + ef(e),
    l = -n.scrollTop;
  return (
    sn(o || r).direction === "rtl" &&
      (s += Zn(r.clientWidth, o ? o.clientWidth : 0) - a),
    { width: a, height: i, x: s, y: l }
  );
}
function tf(e) {
  var t = sn(e),
    r = t.overflow,
    n = t.overflowX,
    o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + o + n);
}
function y0(e) {
  return ["html", "body", "#document"].indexOf(Vr(e)) >= 0
    ? e.ownerDocument.body
    : cr(e) && tf(e)
      ? e
      : y0(iu(e));
}
function ti(e, t) {
  var r;
  t === void 0 && (t = []);
  var n = y0(e),
    o = n === ((r = e.ownerDocument) == null ? void 0 : r.body),
    a = er(n),
    i = o ? [a].concat(a.visualViewport || [], tf(n) ? n : []) : n,
    s = t.concat(i);
  return o ? s : s.concat(ti(iu(i)));
}
function Cd(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height,
  });
}
function Tb(e, t) {
  var r = la(e, !1, t === "fixed");
  return (
    (r.top = r.top + e.clientTop),
    (r.left = r.left + e.clientLeft),
    (r.bottom = r.top + e.clientHeight),
    (r.right = r.left + e.clientWidth),
    (r.width = e.clientWidth),
    (r.height = e.clientHeight),
    (r.x = r.left),
    (r.y = r.top),
    r
  );
}
function rm(e, t, r) {
  return t === d0 ? Cd(bb(e, r)) : uo(t) ? Tb(t, r) : Cd(Db(Bn(e)));
}
function Pb(e) {
  var t = ti(iu(e)),
    r = ["absolute", "fixed"].indexOf(sn(e).position) >= 0,
    n = r && cr(e) ? $i(e) : e;
  return uo(n)
    ? t.filter(function (o) {
        return uo(o) && h0(o, n) && Vr(o) !== "body";
      })
    : [];
}
function Rb(e, t, r, n) {
  var o = t === "clippingParents" ? Pb(e) : [].concat(t),
    a = [].concat(o, [r]),
    i = a[0],
    s = a.reduce(
      function (l, u) {
        var c = rm(e, u, n);
        return (
          (l.top = Zn(c.top, l.top)),
          (l.right = bl(c.right, l.right)),
          (l.bottom = bl(c.bottom, l.bottom)),
          (l.left = Zn(c.left, l.left)),
          l
        );
      },
      rm(e, i, n),
    );
  return (
    (s.width = s.right - s.left),
    (s.height = s.bottom - s.top),
    (s.x = s.left),
    (s.y = s.top),
    s
  );
}
function w0(e) {
  var t = e.reference,
    r = e.element,
    n = e.placement,
    o = n ? zr(n) : null,
    a = n ? ua(n) : null,
    i = t.x + t.width / 2 - r.width / 2,
    s = t.y + t.height / 2 - r.height / 2,
    l;
  switch (o) {
    case qt:
      l = { x: i, y: t.y - r.height };
      break;
    case hr:
      l = { x: i, y: t.y + t.height };
      break;
    case mr:
      l = { x: t.x + t.width, y: s };
      break;
    case Qt:
      l = { x: t.x - r.width, y: s };
      break;
    default:
      l = { x: t.x, y: t.y };
  }
  var u = o ? Jp(o) : null;
  if (u != null) {
    var c = u === "y" ? "height" : "width";
    switch (a) {
      case ia:
        l[u] = l[u] - (t[c] / 2 - r[c] / 2);
        break;
      case Di:
        l[u] = l[u] + (t[c] / 2 - r[c] / 2);
        break;
    }
  }
  return l;
}
function Ti(e, t) {
  t === void 0 && (t = {});
  var r = t,
    n = r.placement,
    o = n === void 0 ? e.placement : n,
    a = r.strategy,
    i = a === void 0 ? e.strategy : a,
    s = r.boundary,
    l = s === void 0 ? G_ : s,
    u = r.rootBoundary,
    c = u === void 0 ? d0 : u,
    d = r.elementContext,
    m = d === void 0 ? La : d,
    v = r.altBoundary,
    S = v === void 0 ? !1 : v,
    C = r.padding,
    k = C === void 0 ? 0 : C,
    g = g0(typeof k != "number" ? k : v0(k, Ui)),
    y = m === La ? X_ : La,
    w = e.rects.popper,
    T = e.elements[S ? y : m],
    P = Rb(uo(T) ? T : T.contextElement || Bn(e.elements.popper), l, c, i),
    R = la(e.elements.reference),
    M = w0({ reference: R, element: w, placement: o }),
    A = Cd(Object.assign({}, w, M)),
    V = m === La ? A : R,
    L = {
      top: P.top - V.top + g.top,
      bottom: V.bottom - P.bottom + g.bottom,
      left: P.left - V.left + g.left,
      right: V.right - P.right + g.right,
    },
    K = e.modifiersData.offset;
  if (m === La && K) {
    var $ = K[o];
    Object.keys(L).forEach(function (ae) {
      var le = [mr, hr].indexOf(ae) >= 0 ? 1 : -1,
        U = [qt, hr].indexOf(ae) >= 0 ? "y" : "x";
      L[ae] += $[U] * le;
    });
  }
  return L;
}
function Ob(e, t) {
  t === void 0 && (t = {});
  var r = t,
    n = r.placement,
    o = r.boundary,
    a = r.rootBoundary,
    i = r.padding,
    s = r.flipVariations,
    l = r.allowedAutoPlacements,
    u = l === void 0 ? p0 : l,
    c = ua(n),
    d = c
      ? s
        ? Jh
        : Jh.filter(function (S) {
            return ua(S) === c;
          })
      : Ui,
    m = d.filter(function (S) {
      return u.indexOf(S) >= 0;
    });
  m.length === 0 && (m = d);
  var v = m.reduce(function (S, C) {
    return (
      (S[C] = Ti(e, { placement: C, boundary: o, rootBoundary: a, padding: i })[
        zr(C)
      ]),
      S
    );
  }, {});
  return Object.keys(v).sort(function (S, C) {
    return v[S] - v[C];
  });
}
function Nb(e) {
  if (zr(e) === Kp) return [];
  var t = Ns(e);
  return [tm(e), t, tm(t)];
}
function Mb(e) {
  var t = e.state,
    r = e.options,
    n = e.name;
  if (!t.modifiersData[n]._skip) {
    for (
      var o = r.mainAxis,
        a = o === void 0 ? !0 : o,
        i = r.altAxis,
        s = i === void 0 ? !0 : i,
        l = r.fallbackPlacements,
        u = r.padding,
        c = r.boundary,
        d = r.rootBoundary,
        m = r.altBoundary,
        v = r.flipVariations,
        S = v === void 0 ? !0 : v,
        C = r.allowedAutoPlacements,
        k = t.options.placement,
        g = zr(k),
        y = g === k,
        w = l || (y || !S ? [Ns(k)] : Nb(k)),
        T = [k].concat(w).reduce(function (pe, ke) {
          return pe.concat(
            zr(ke) === Kp
              ? Ob(t, {
                  placement: ke,
                  boundary: c,
                  rootBoundary: d,
                  padding: u,
                  flipVariations: S,
                  allowedAutoPlacements: C,
                })
              : ke,
          );
        }, []),
        P = t.rects.reference,
        R = t.rects.popper,
        M = new Map(),
        A = !0,
        V = T[0],
        L = 0;
      L < T.length;
      L++
    ) {
      var K = T[L],
        $ = zr(K),
        ae = ua(K) === ia,
        le = [qt, hr].indexOf($) >= 0,
        U = le ? "width" : "height",
        q = Ti(t, {
          placement: K,
          boundary: c,
          rootBoundary: d,
          altBoundary: m,
          padding: u,
        }),
        ie = le ? (ae ? mr : Qt) : ae ? hr : qt;
      P[U] > R[U] && (ie = Ns(ie));
      var z = Ns(ie),
        G = [];
      if (
        (a && G.push(q[$] <= 0),
        s && G.push(q[ie] <= 0, q[z] <= 0),
        G.every(function (pe) {
          return pe;
        }))
      ) {
        ((V = K), (A = !1));
        break;
      }
      M.set(K, G);
    }
    if (A)
      for (
        var Z = S ? 3 : 1,
          ne = function (ke) {
            var ue = T.find(function (Ne) {
              var Ee = M.get(Ne);
              if (Ee)
                return Ee.slice(0, ke).every(function (ye) {
                  return ye;
                });
            });
            if (ue) return ((V = ue), "break");
          },
          fe = Z;
        fe > 0;
        fe--
      ) {
        var ze = ne(fe);
        if (ze === "break") break;
      }
    t.placement !== V &&
      ((t.modifiersData[n]._skip = !0), (t.placement = V), (t.reset = !0));
  }
}
const Ib = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Mb,
  requiresIfExists: ["offset"],
  data: { _skip: !1 },
};
function nm(e, t, r) {
  return (
    r === void 0 && (r = { x: 0, y: 0 }),
    {
      top: e.top - t.height - r.y,
      right: e.right - t.width + r.x,
      bottom: e.bottom - t.height + r.y,
      left: e.left - t.width - r.x,
    }
  );
}
function om(e) {
  return [qt, mr, hr, Qt].some(function (t) {
    return e[t] >= 0;
  });
}
function jb(e) {
  var t = e.state,
    r = e.name,
    n = t.rects.reference,
    o = t.rects.popper,
    a = t.modifiersData.preventOverflow,
    i = Ti(t, { elementContext: "reference" }),
    s = Ti(t, { altBoundary: !0 }),
    l = nm(i, n),
    u = nm(s, o, a),
    c = om(l),
    d = om(u);
  ((t.modifiersData[r] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: u,
    isReferenceHidden: c,
    hasPopperEscaped: d,
  }),
    (t.attributes.popper = Object.assign({}, t.attributes.popper, {
      "data-popper-reference-hidden": c,
      "data-popper-escaped": d,
    })));
}
const Lb = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: jb,
};
function Ab(e, t, r) {
  var n = zr(e),
    o = [Qt, qt].indexOf(n) >= 0 ? -1 : 1,
    a = typeof r == "function" ? r(Object.assign({}, t, { placement: e })) : r,
    i = a[0],
    s = a[1];
  return (
    (i = i || 0),
    (s = (s || 0) * o),
    [Qt, mr].indexOf(n) >= 0 ? { x: s, y: i } : { x: i, y: s }
  );
}
function Fb(e) {
  var t = e.state,
    r = e.options,
    n = e.name,
    o = r.offset,
    a = o === void 0 ? [0, 0] : o,
    i = p0.reduce(function (c, d) {
      return ((c[d] = Ab(d, t.rects, a)), c);
    }, {}),
    s = i[t.placement],
    l = s.x,
    u = s.y;
  (t.modifiersData.popperOffsets != null &&
    ((t.modifiersData.popperOffsets.x += l),
    (t.modifiersData.popperOffsets.y += u)),
    (t.modifiersData[n] = i));
}
const Bb = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Fb,
};
function Ub(e) {
  var t = e.state,
    r = e.name;
  t.modifiersData[r] = w0({
    reference: t.rects.reference,
    element: t.rects.popper,
    placement: t.placement,
  });
}
const $b = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Ub,
  data: {},
};
function Yb(e) {
  return e === "x" ? "y" : "x";
}
function zb(e) {
  var t = e.state,
    r = e.options,
    n = e.name,
    o = r.mainAxis,
    a = o === void 0 ? !0 : o,
    i = r.altAxis,
    s = i === void 0 ? !1 : i,
    l = r.boundary,
    u = r.rootBoundary,
    c = r.altBoundary,
    d = r.padding,
    m = r.tether,
    v = m === void 0 ? !0 : m,
    S = r.tetherOffset,
    C = S === void 0 ? 0 : S,
    k = Ti(t, { boundary: l, rootBoundary: u, padding: d, altBoundary: c }),
    g = zr(t.placement),
    y = ua(t.placement),
    w = !y,
    T = Jp(g),
    P = Yb(T),
    R = t.modifiersData.popperOffsets,
    M = t.rects.reference,
    A = t.rects.popper,
    V =
      typeof C == "function"
        ? C(Object.assign({}, t.rects, { placement: t.placement }))
        : C,
    L =
      typeof V == "number"
        ? { mainAxis: V, altAxis: V }
        : Object.assign({ mainAxis: 0, altAxis: 0 }, V),
    K = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
    $ = { x: 0, y: 0 };
  if (R) {
    if (a) {
      var ae,
        le = T === "y" ? qt : Qt,
        U = T === "y" ? hr : mr,
        q = T === "y" ? "height" : "width",
        ie = R[T],
        z = ie + k[le],
        G = ie - k[U],
        Z = v ? -A[q] / 2 : 0,
        ne = y === ia ? M[q] : A[q],
        fe = y === ia ? -A[q] : -M[q],
        ze = t.elements.arrow,
        pe = v && ze ? Xp(ze) : { width: 0, height: 0 },
        ke = t.modifiersData["arrow#persistent"]
          ? t.modifiersData["arrow#persistent"].padding
          : m0(),
        ue = ke[le],
        Ne = ke[U],
        Ee = ei(0, M[q], pe[q]),
        ye = w
          ? M[q] / 2 - Z - Ee - ue - L.mainAxis
          : ne - Ee - ue - L.mainAxis,
        B = w
          ? -M[q] / 2 + Z + Ee + Ne + L.mainAxis
          : fe + Ee + Ne + L.mainAxis,
        oe = t.elements.arrow && $i(t.elements.arrow),
        ce = oe ? (T === "y" ? oe.clientTop || 0 : oe.clientLeft || 0) : 0,
        he = (ae = K == null ? void 0 : K[T]) != null ? ae : 0,
        Te = ie + ye - he - ce,
        se = ie + B - he,
        Q = ei(v ? bl(z, Te) : z, ie, v ? Zn(G, se) : G);
      ((R[T] = Q), ($[T] = Q - ie));
    }
    if (s) {
      var me,
        ge = T === "x" ? qt : Qt,
        _e = T === "x" ? hr : mr,
        we = R[P],
        Ue = P === "y" ? "height" : "width",
        Ie = we + k[ge],
        Ae = we - k[_e],
        Et = [qt, Qt].indexOf(g) !== -1,
        et = (me = K == null ? void 0 : K[P]) != null ? me : 0,
        xo = Et ? Ie : we - M[Ue] - A[Ue] - et + L.altAxis,
        Vi = Et ? we + M[Ue] + A[Ue] - et - L.altAxis : Ae,
        vr = v && Et ? fb(xo, we, Vi) : ei(v ? xo : Ie, we, v ? Vi : Ae);
      ((R[P] = vr), ($[P] = vr - we));
    }
    t.modifiersData[n] = $;
  }
}
const Hb = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: zb,
  requiresIfExists: ["offset"],
};
function Wb(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function Vb(e) {
  return e === er(e) || !cr(e) ? Zp(e) : Wb(e);
}
function qb(e) {
  var t = e.getBoundingClientRect(),
    r = sa(t.width) / e.offsetWidth || 1,
    n = sa(t.height) / e.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function Qb(e, t, r) {
  r === void 0 && (r = !1);
  var n = cr(t),
    o = cr(t) && qb(t),
    a = Bn(t),
    i = la(e, o, r),
    s = { scrollLeft: 0, scrollTop: 0 },
    l = { x: 0, y: 0 };
  return (
    (n || (!n && !r)) &&
      ((Vr(t) !== "body" || tf(a)) && (s = Vb(t)),
      cr(t)
        ? ((l = la(t, !0)), (l.x += t.clientLeft), (l.y += t.clientTop))
        : a && (l.x = ef(a))),
    {
      x: i.left + s.scrollLeft - l.x,
      y: i.top + s.scrollTop - l.y,
      width: i.width,
      height: i.height,
    }
  );
}
function Kb(e) {
  var t = new Map(),
    r = new Set(),
    n = [];
  e.forEach(function (a) {
    t.set(a.name, a);
  });
  function o(a) {
    r.add(a.name);
    var i = [].concat(a.requires || [], a.requiresIfExists || []);
    (i.forEach(function (s) {
      if (!r.has(s)) {
        var l = t.get(s);
        l && o(l);
      }
    }),
      n.push(a));
  }
  return (
    e.forEach(function (a) {
      r.has(a.name) || o(a);
    }),
    n
  );
}
function Gb(e) {
  var t = Kb(e);
  return sb.reduce(function (r, n) {
    return r.concat(
      t.filter(function (o) {
        return o.phase === n;
      }),
    );
  }, []);
}
function Xb(e) {
  var t;
  return function () {
    return (
      t ||
        (t = new Promise(function (r) {
          Promise.resolve().then(function () {
            ((t = void 0), r(e()));
          });
        })),
      t
    );
  };
}
function Jb(e) {
  var t = e.reduce(function (r, n) {
    var o = r[n.name];
    return (
      (r[n.name] = o
        ? Object.assign({}, o, n, {
            options: Object.assign({}, o.options, n.options),
            data: Object.assign({}, o.data, n.data),
          })
        : n),
      r
    );
  }, {});
  return Object.keys(t).map(function (r) {
    return t[r];
  });
}
var am = { placement: "bottom", modifiers: [], strategy: "absolute" };
function im() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return !t.some(function (n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Zb(e) {
  e === void 0 && (e = {});
  var t = e,
    r = t.defaultModifiers,
    n = r === void 0 ? [] : r,
    o = t.defaultOptions,
    a = o === void 0 ? am : o;
  return function (s, l, u) {
    u === void 0 && (u = a);
    var c = {
        placement: "bottom",
        orderedModifiers: [],
        options: Object.assign({}, am, a),
        modifiersData: {},
        elements: { reference: s, popper: l },
        attributes: {},
        styles: {},
      },
      d = [],
      m = !1,
      v = {
        state: c,
        setOptions: function (g) {
          var y = typeof g == "function" ? g(c.options) : g;
          (C(),
            (c.options = Object.assign({}, a, c.options, y)),
            (c.scrollParents = {
              reference: uo(s)
                ? ti(s)
                : s.contextElement
                  ? ti(s.contextElement)
                  : [],
              popper: ti(l),
            }));
          var w = Gb(Jb([].concat(n, c.options.modifiers)));
          return (
            (c.orderedModifiers = w.filter(function (T) {
              return T.enabled;
            })),
            S(),
            v.update()
          );
        },
        forceUpdate: function () {
          if (!m) {
            var g = c.elements,
              y = g.reference,
              w = g.popper;
            if (im(y, w)) {
              ((c.rects = {
                reference: Qb(y, $i(w), c.options.strategy === "fixed"),
                popper: Xp(w),
              }),
                (c.reset = !1),
                (c.placement = c.options.placement),
                c.orderedModifiers.forEach(function (L) {
                  return (c.modifiersData[L.name] = Object.assign({}, L.data));
                }));
              for (var T = 0; T < c.orderedModifiers.length; T++) {
                if (c.reset === !0) {
                  ((c.reset = !1), (T = -1));
                  continue;
                }
                var P = c.orderedModifiers[T],
                  R = P.fn,
                  M = P.options,
                  A = M === void 0 ? {} : M,
                  V = P.name;
                typeof R == "function" &&
                  (c = R({ state: c, options: A, name: V, instance: v }) || c);
              }
            }
          }
        },
        update: Xb(function () {
          return new Promise(function (k) {
            (v.forceUpdate(), k(c));
          });
        }),
        destroy: function () {
          (C(), (m = !0));
        },
      };
    if (!im(s, l)) return v;
    v.setOptions(u).then(function (k) {
      !m && u.onFirstUpdate && u.onFirstUpdate(k);
    });
    function S() {
      c.orderedModifiers.forEach(function (k) {
        var g = k.name,
          y = k.options,
          w = y === void 0 ? {} : y,
          T = k.effect;
        if (typeof T == "function") {
          var P = T({ state: c, name: g, instance: v, options: w }),
            R = function () {};
          d.push(P || R);
        }
      });
    }
    function C() {
      (d.forEach(function (k) {
        return k();
      }),
        (d = []));
    }
    return v;
  };
}
var eD = [kb, $b, Sb, cb, Bb, Ib, Hb, vb, Lb],
  tD = Zb({ defaultModifiers: eD }),
  rD = typeof Element < "u",
  nD = typeof Map == "function",
  oD = typeof Set == "function",
  aD = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
function Ms(e, t) {
  if (e === t) return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor) return !1;
    var r, n, o;
    if (Array.isArray(e)) {
      if (((r = e.length), r != t.length)) return !1;
      for (n = r; n-- !== 0;) if (!Ms(e[n], t[n])) return !1;
      return !0;
    }
    var a;
    if (nD && e instanceof Map && t instanceof Map) {
      if (e.size !== t.size) return !1;
      for (a = e.entries(); !(n = a.next()).done;)
        if (!t.has(n.value[0])) return !1;
      for (a = e.entries(); !(n = a.next()).done;)
        if (!Ms(n.value[1], t.get(n.value[0]))) return !1;
      return !0;
    }
    if (oD && e instanceof Set && t instanceof Set) {
      if (e.size !== t.size) return !1;
      for (a = e.entries(); !(n = a.next()).done;)
        if (!t.has(n.value[0])) return !1;
      return !0;
    }
    if (aD && ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) {
      if (((r = e.length), r != t.length)) return !1;
      for (n = r; n-- !== 0;) if (e[n] !== t[n]) return !1;
      return !0;
    }
    if (e.constructor === RegExp)
      return e.source === t.source && e.flags === t.flags;
    if (
      e.valueOf !== Object.prototype.valueOf &&
      typeof e.valueOf == "function" &&
      typeof t.valueOf == "function"
    )
      return e.valueOf() === t.valueOf();
    if (
      e.toString !== Object.prototype.toString &&
      typeof e.toString == "function" &&
      typeof t.toString == "function"
    )
      return e.toString() === t.toString();
    if (((o = Object.keys(e)), (r = o.length), r !== Object.keys(t).length))
      return !1;
    for (n = r; n-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(t, o[n])) return !1;
    if (rD && e instanceof Element) return !1;
    for (n = r; n-- !== 0;)
      if (
        !(
          (o[n] === "_owner" || o[n] === "__v" || o[n] === "__o") &&
          e.$$typeof
        ) &&
        !Ms(e[o[n]], t[o[n]])
      )
        return !1;
    return !0;
  }
  return e !== e && t !== t;
}
var iD = function (t, r) {
  try {
    return Ms(t, r);
  } catch (n) {
    if ((n.message || "").match(/stack|recursion/i))
      return (
        console.warn("react-fast-compare cannot handle circular refs"),
        !1
      );
    throw n;
  }
};
const sD = fa(iD);
var lD = [],
  uD = function (t, r, n) {
    n === void 0 && (n = {});
    var o = _.useRef(null),
      a = {
        onFirstUpdate: n.onFirstUpdate,
        placement: n.placement || "bottom",
        strategy: n.strategy || "absolute",
        modifiers: n.modifiers || lD,
      },
      i = _.useState({
        styles: {
          popper: { position: a.strategy, left: "0", top: "0" },
          arrow: { position: "absolute" },
        },
        attributes: {},
      }),
      s = i[0],
      l = i[1],
      u = _.useMemo(function () {
        return {
          name: "updateState",
          enabled: !0,
          phase: "write",
          fn: function (v) {
            var S = v.state,
              C = Object.keys(S.elements);
            eu.flushSync(function () {
              l({
                styles: Gh(
                  C.map(function (k) {
                    return [k, S.styles[k] || {}];
                  }),
                ),
                attributes: Gh(
                  C.map(function (k) {
                    return [k, S.attributes[k]];
                  }),
                ),
              });
            });
          },
          requires: ["computeStyles"],
        };
      }, []),
      c = _.useMemo(
        function () {
          var m = {
            onFirstUpdate: a.onFirstUpdate,
            placement: a.placement,
            strategy: a.strategy,
            modifiers: [].concat(a.modifiers, [
              u,
              { name: "applyStyles", enabled: !1 },
            ]),
          };
          return sD(o.current, m) ? o.current || m : ((o.current = m), m);
        },
        [a.onFirstUpdate, a.placement, a.strategy, a.modifiers, u],
      ),
      d = _.useRef();
    return (
      Xh(
        function () {
          d.current && d.current.setOptions(c);
        },
        [c],
      ),
      Xh(
        function () {
          if (!(t == null || r == null)) {
            var m = n.createPopper || tD,
              v = m(t, r, c);
            return (
              (d.current = v),
              function () {
                (v.destroy(), (d.current = null));
              }
            );
          }
        },
        [t, r, n.createPopper],
      ),
      {
        state: d.current ? d.current.state : null,
        styles: s.styles,
        attributes: s.attributes,
        update: d.current ? d.current.update : null,
        forceUpdate: d.current ? d.current.forceUpdate : null,
      }
    );
  },
  cD = function () {},
  dD = function () {
    return Promise.resolve(null);
  },
  pD = [];
function fD(e) {
  var t = e.placement,
    r = t === void 0 ? "bottom" : t,
    n = e.strategy,
    o = n === void 0 ? "absolute" : n,
    a = e.modifiers,
    i = a === void 0 ? pD : a,
    s = e.referenceElement,
    l = e.onFirstUpdate,
    u = e.innerRef,
    c = e.children,
    d = _.useContext(s0),
    m = _.useState(null),
    v = m[0],
    S = m[1],
    C = _.useState(null),
    k = C[0],
    g = C[1];
  _.useEffect(
    function () {
      xd(u, v);
    },
    [u, v],
  );
  var y = _.useMemo(
      function () {
        return {
          placement: r,
          strategy: o,
          onFirstUpdate: l,
          modifiers: [].concat(i, [
            { name: "arrow", enabled: k != null, options: { element: k } },
          ]),
        };
      },
      [r, o, l, i, k],
    ),
    w = uD(s || d, v, y),
    T = w.state,
    P = w.styles,
    R = w.forceUpdate,
    M = w.update,
    A = _.useMemo(
      function () {
        return {
          ref: S,
          style: P.popper,
          placement: T ? T.placement : r,
          hasPopperEscaped:
            T && T.modifiersData.hide
              ? T.modifiersData.hide.hasPopperEscaped
              : null,
          isReferenceHidden:
            T && T.modifiersData.hide
              ? T.modifiersData.hide.isReferenceHidden
              : null,
          arrowProps: { style: P.arrow, ref: g },
          forceUpdate: R || cD,
          update: M || dD,
        };
      },
      [S, g, r, T, P, M, R],
    );
  return u0(c)(A);
}
var hD = function () {},
  mD = hD;
const gD = fa(mD);
function vD(e) {
  var t = e.children,
    r = e.innerRef,
    n = _.useContext(l0),
    o = _.useCallback(
      function (a) {
        (xd(r, a), c0(n, a));
      },
      [r, n],
    );
  return (
    _.useEffect(function () {
      return function () {
        return xd(r, null);
      };
    }, []),
    _.useEffect(
      function () {
        gD(
          !!n,
          "`Reference` should not be used outside of a `Manager` component.",
        );
      },
      [n],
    ),
    u0(t)({ ref: o })
  );
}
function yD(e, t) {
  if ((W(2, arguments), fr(t) !== "object" || t === null))
    throw new RangeError("values parameter must be an object");
  var r = te(e);
  return isNaN(r.getTime())
    ? new Date(NaN)
    : (t.year != null && r.setFullYear(t.year),
      t.month != null && (r = Lt(r, t.month)),
      t.date != null && r.setDate(ve(t.date)),
      t.hours != null && r.setHours(ve(t.hours)),
      t.minutes != null && r.setMinutes(ve(t.minutes)),
      t.seconds != null && r.setSeconds(ve(t.seconds)),
      t.milliseconds != null && r.setMilliseconds(ve(t.milliseconds)),
      r);
}
function sm(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    (t &&
      (n = n.filter(function (o) {
        return Object.getOwnPropertyDescriptor(e, o).enumerable;
      })),
      r.push.apply(r, n));
  }
  return r;
}
function Dl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? sm(Object(r), !0).forEach(function (n) {
          b(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : sm(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function kd(e) {
  return (
    (kd =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          }),
    kd(e)
  );
}
function mt(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function lm(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    ((n.enumerable = n.enumerable || !1),
      (n.configurable = !0),
      "value" in n && (n.writable = !0),
      Object.defineProperty(e, x0(n.key), n));
  }
}
function gt(e, t, r) {
  return (
    t && lm(e.prototype, t),
    r && lm(e, r),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function b(e, t, r) {
  return (
    (t = x0(t)) in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function ca() {
  return (
    (ca = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    ca.apply(this, arguments)
  );
}
function vt(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  ((e.prototype = Object.create(t && t.prototype, {
    constructor: { value: e, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    t && Ed(e, t));
}
function Tl(e) {
  return (
    (Tl = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        }),
    Tl(e)
  );
}
function Ed(e, t) {
  return (
    (Ed = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, n) {
          return ((r.__proto__ = n), r);
        }),
    Ed(e, t)
  );
}
function D(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  return e;
}
function yt(e) {
  var t = (function () {
    if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
      return !1;
    if (typeof Proxy == "function") return !0;
    try {
      return (
        Boolean.prototype.valueOf.call(
          Reflect.construct(Boolean, [], function () {}),
        ),
        !0
      );
    } catch {
      return !1;
    }
  })();
  return function () {
    var r,
      n = Tl(e);
    if (t) {
      var o = Tl(this).constructor;
      r = Reflect.construct(n, arguments, o);
    } else r = n.apply(this, arguments);
    return (function (a, i) {
      if (i && (typeof i == "object" || typeof i == "function")) return i;
      if (i !== void 0)
        throw new TypeError(
          "Derived constructors may only return object or undefined",
        );
      return D(a);
    })(this, r);
  };
}
function Pi(e) {
  return (
    (function (t) {
      if (Array.isArray(t)) return Gu(t);
    })(e) ||
    (function (t) {
      if (
        (typeof Symbol < "u" && t[Symbol.iterator] != null) ||
        t["@@iterator"] != null
      )
        return Array.from(t);
    })(e) ||
    (function (t, r) {
      if (t) {
        if (typeof t == "string") return Gu(t, r);
        var n = Object.prototype.toString.call(t).slice(8, -1);
        if (
          (n === "Object" && t.constructor && (n = t.constructor.name),
          n === "Map" || n === "Set")
        )
          return Array.from(t);
        if (
          n === "Arguments" ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
        )
          return Gu(t, r);
      }
    })(e) ||
    (function () {
      throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
    })()
  );
}
function Gu(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function x0(e) {
  var t = (function (r, n) {
    if (typeof r != "object" || r === null) return r;
    var o = r[Symbol.toPrimitive];
    if (o !== void 0) {
      var a = o.call(r, n);
      if (typeof a != "object") return a;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (n === "string" ? String : Number)(r);
  })(e, "string");
  return typeof t == "symbol" ? t : String(t);
}
var um = function (e, t) {
    switch (e) {
      case "P":
        return t.date({ width: "short" });
      case "PP":
        return t.date({ width: "medium" });
      case "PPP":
        return t.date({ width: "long" });
      default:
        return t.date({ width: "full" });
    }
  },
  cm = function (e, t) {
    switch (e) {
      case "p":
        return t.time({ width: "short" });
      case "pp":
        return t.time({ width: "medium" });
      case "ppp":
        return t.time({ width: "long" });
      default:
        return t.time({ width: "full" });
    }
  },
  wD = {
    p: cm,
    P: function (e, t) {
      var r,
        n = e.match(/(P+)(p+)?/) || [],
        o = n[1],
        a = n[2];
      if (!a) return um(e, t);
      switch (o) {
        case "P":
          r = t.dateTime({ width: "short" });
          break;
        case "PP":
          r = t.dateTime({ width: "medium" });
          break;
        case "PPP":
          r = t.dateTime({ width: "long" });
          break;
        default:
          r = t.dateTime({ width: "full" });
      }
      return r.replace("{{date}}", um(o, t)).replace("{{time}}", cm(a, t));
    },
  },
  ri = 12,
  xD = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
function Be(e) {
  var t = e
    ? typeof e == "string" || e instanceof String
      ? k_(e)
      : te(e)
    : new Date();
  return mn(t) ? t : null;
}
function mn(e, t) {
  return ((t = t || new Date("1/1/1000")), Ei(e) && !xn(e, t));
}
function Qe(e, t, r) {
  if (r === "en") return Uh(e, t, { awareOfUnicodeTokens: !0 });
  var n = to(r);
  return (
    r &&
      !n &&
      console.warn(
        'A locale object was not found for the provided string ["'.concat(
          r,
          '"].',
        ),
      ),
    !n && eo() && to(eo()) && (n = to(eo())),
    Uh(e, t, { locale: n || null, awareOfUnicodeTokens: !0 })
  );
}
function Rr(e, t) {
  var r = t.dateFormat,
    n = t.locale;
  return (e && Qe(e, Array.isArray(r) ? r[0] : r, n)) || "";
}
function dm(e, t) {
  var r = t.hour,
    n = r === void 0 ? 0 : r,
    o = t.minute,
    a = o === void 0 ? 0 : o,
    i = t.second;
  return Os(Rs(hE(e, i === void 0 ? 0 : i), a), n);
}
function Hr(e, t, r) {
  var n = to(t || eo());
  return Xy(e, { locale: n, weekStartsOn: r });
}
function On(e) {
  return Jy(e);
}
function za(e) {
  return Zy(e);
}
function pm(e) {
  return md(e);
}
function fm() {
  return Yr(Be());
}
function Sn(e, t) {
  return e && t ? CE(e, t) : !e && !t;
}
function Cr(e, t) {
  return e && t ? SE(e, t) : !e && !t;
}
function Pl(e, t) {
  return e && t ? kE(e, t) : !e && !t;
}
function $e(e, t) {
  return e && t ? xE(e, t) : !e && !t;
}
function Kn(e, t) {
  return e && t ? wE(e, t) : !e && !t;
}
function Is(e, t, r) {
  var n,
    o = Yr(t),
    a = gd(r);
  try {
    n = bi(e, { start: o, end: a });
  } catch {
    n = !1;
  }
  return n;
}
function eo() {
  return (typeof window < "u" ? window : globalThis).__localeId__;
}
function to(e) {
  if (typeof e == "string") {
    var t = typeof window < "u" ? window : globalThis;
    return t.__localeData__ ? t.__localeData__[e] : null;
  }
  return e;
}
function rf(e, t) {
  return Qe(Lt(Be(), e), "LLLL", t);
}
function S0(e, t) {
  return Qe(Lt(Be(), e), "LLL", t);
}
function su(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = t.minDate,
    n = t.maxDate,
    o = t.excludeDates,
    a = t.excludeDateIntervals,
    i = t.includeDates,
    s = t.includeDateIntervals,
    l = t.filterDate;
  return (
    lu(e, { minDate: r, maxDate: n }) ||
    (o &&
      o.some(function (u) {
        return $e(e, u);
      })) ||
    (a &&
      a.some(function (u) {
        var c = u.start,
          d = u.end;
        return bi(e, { start: c, end: d });
      })) ||
    (i &&
      !i.some(function (u) {
        return $e(e, u);
      })) ||
    (s &&
      !s.some(function (u) {
        var c = u.start,
          d = u.end;
        return bi(e, { start: c, end: d });
      })) ||
    (l && !l(Be(e))) ||
    !1
  );
}
function nf(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = t.excludeDates,
    n = t.excludeDateIntervals;
  return n && n.length > 0
    ? n.some(function (o) {
        var a = o.start,
          i = o.end;
        return bi(e, { start: a, end: i });
      })
    : (r &&
        r.some(function (o) {
          return $e(e, o);
        })) ||
        !1;
}
function C0(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = t.minDate,
    n = t.maxDate,
    o = t.excludeDates,
    a = t.includeDates,
    i = t.filterDate;
  return (
    lu(e, { minDate: Jy(r), maxDate: vE(n) }) ||
    (o &&
      o.some(function (s) {
        return Cr(e, s);
      })) ||
    (a &&
      !a.some(function (s) {
        return Cr(e, s);
      })) ||
    (i && !i(Be(e))) ||
    !1
  );
}
function Xu(e, t, r, n) {
  var o = xe(e),
    a = Rt(e),
    i = xe(t),
    s = Rt(t),
    l = xe(n);
  return o === i && o === l
    ? a <= r && r <= s
    : o < i
      ? (l === o && a <= r) || (l === i && s >= r) || (l < i && l > o)
      : void 0;
}
function SD(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = t.minDate,
    n = t.maxDate,
    o = t.excludeDates,
    a = t.includeDates,
    i = t.filterDate;
  return (
    lu(e, { minDate: r, maxDate: n }) ||
    (o &&
      o.some(function (s) {
        return Pl(e, s);
      })) ||
    (a &&
      !a.some(function (s) {
        return Pl(e, s);
      })) ||
    (i && !i(Be(e))) ||
    !1
  );
}
function Ju(e, t, r) {
  if (!Ei(t) || !Ei(r)) return !1;
  var n = xe(t),
    o = xe(r);
  return n <= e && o >= e;
}
function k0(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = t.minDate,
    n = t.maxDate,
    o = t.excludeDates,
    a = t.includeDates,
    i = t.filterDate,
    s = new Date(e, 0, 1);
  return (
    lu(s, { minDate: Zy(r), maxDate: yE(n) }) ||
    (o &&
      o.some(function (l) {
        return Sn(s, l);
      })) ||
    (a &&
      !a.some(function (l) {
        return Sn(s, l);
      })) ||
    (i && !i(Be(s))) ||
    !1
  );
}
function Zu(e, t, r, n) {
  var o = xe(e),
    a = Bo(e),
    i = xe(t),
    s = Bo(t),
    l = xe(n);
  return o === i && o === l
    ? a <= r && r <= s
    : o < i
      ? (l === o && a <= r) || (l === i && s >= r) || (l < i && l > o)
      : void 0;
}
function lu(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = t.minDate,
    n = t.maxDate;
  return (r && Sl(e, r) < 0) || (n && Sl(e, n) > 0);
}
function hm(e, t) {
  return t.some(function (r) {
    return $r(r) === $r(e) && Ur(r) === Ur(e);
  });
}
function mm(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = t.excludeTimes,
    n = t.includeTimes,
    o = t.filterTime;
  return (r && hm(e, r)) || (n && !hm(e, n)) || (o && !o(e)) || !1;
}
function gm(e, t) {
  var r = t.minTime,
    n = t.maxTime;
  if (!r || !n) throw new Error("Both minTime and maxTime props required");
  var o,
    a = Be(),
    i = Os(Rs(a, Ur(e)), $r(e)),
    s = Os(Rs(a, Ur(r)), $r(r)),
    l = Os(Rs(a, Ur(n)), $r(n));
  try {
    o = !bi(i, { start: s, end: l });
  } catch {
    o = !1;
  }
  return o;
}
function vm(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = t.minDate,
    n = t.includeDates,
    o = aa(e, 1);
  return (
    (r && Cl(r, o) > 0) ||
    (n &&
      n.every(function (a) {
        return Cl(a, o) > 0;
      })) ||
    !1
  );
}
function ym(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = t.maxDate,
    n = t.includeDates,
    o = Dr(e, 1);
  return (
    (r && Cl(o, r) > 0) ||
    (n &&
      n.every(function (a) {
        return Cl(o, a) > 0;
      })) ||
    !1
  );
}
function wm(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = t.minDate,
    n = t.includeDates,
    o = _i(e, 1);
  return (
    (r && kl(r, o) > 0) ||
    (n &&
      n.every(function (a) {
        return kl(a, o) > 0;
      })) ||
    !1
  );
}
function xm(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
    r = t.maxDate,
    n = t.includeDates,
    o = oa(e, 1);
  return (
    (r && kl(o, r) > 0) ||
    (n &&
      n.every(function (a) {
        return kl(o, a) > 0;
      })) ||
    !1
  );
}
function E0(e) {
  var t = e.minDate,
    r = e.includeDates;
  if (r && t) {
    var n = r.filter(function (o) {
      return Sl(o, t) >= 0;
    });
    return Hh(n);
  }
  return r ? Hh(r) : t;
}
function _0(e) {
  var t = e.maxDate,
    r = e.includeDates;
  if (r && t) {
    var n = r.filter(function (o) {
      return Sl(o, t) <= 0;
    });
    return Wh(n);
  }
  return r ? Wh(r) : t;
}
function Sm() {
  for (
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
      t =
        arguments.length > 1 && arguments[1] !== void 0
          ? arguments[1]
          : "react-datepicker__day--highlighted",
      r = new Map(),
      n = 0,
      o = e.length;
    n < o;
    n++
  ) {
    var a = e[n];
    if (ou(a)) {
      var i = Qe(a, "MM.dd.yyyy"),
        s = r.get(i) || [];
      s.includes(t) || (s.push(t), r.set(i, s));
    } else if (kd(a) === "object") {
      var l = Object.keys(a),
        u = l[0],
        c = a[l[0]];
      if (typeof u == "string" && c.constructor === Array)
        for (var d = 0, m = c.length; d < m; d++) {
          var v = Qe(c[d], "MM.dd.yyyy"),
            S = r.get(v) || [];
          S.includes(u) || (S.push(u), r.set(v, S));
        }
    }
  }
  return r;
}
function CD() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [],
    t =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : "react-datepicker__day--holidays",
    r = new Map();
  return (
    e.forEach(function (n) {
      var o = n.date,
        a = n.holidayName;
      if (ou(o)) {
        var i = Qe(o, "MM.dd.yyyy"),
          s = r.get(i) || {};
        if (
          !("className" in s) ||
          s.className !== t ||
          ((l = s.holidayNames),
          (u = [a]),
          l.length !== u.length ||
            !l.every(function (d, m) {
              return d === u[m];
            }))
        ) {
          var l, u;
          s.className = t;
          var c = s.holidayNames;
          ((s.holidayNames = c ? [].concat(Pi(c), [a]) : [a]), r.set(i, s));
        }
      }
    }),
    r
  );
}
function kD(e, t, r, n, o) {
  for (var a = o.length, i = [], s = 0; s < a; s++) {
    var l = fd(iE(e, $r(o[s])), Ur(o[s])),
      u = fd(e, (r + 1) * n);
    jn(l, t) && xn(l, u) && i.push(o[s]);
  }
  return i;
}
function Cm(e) {
  return e < 10 ? "0".concat(e) : "".concat(e);
}
function Uo(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ri,
    r = Math.ceil(xe(e) / t) * t;
  return { startPeriod: r - (t - 1), endPeriod: r };
}
function km(e) {
  var t = e.getSeconds(),
    r = e.getMilliseconds();
  return te(e.getTime() - 1e3 * t - r);
}
function ED(e, t, r, n) {
  for (var o = [], a = 0; a < 2 * t + 1; a++) {
    var i = e + t - a,
      s = !0;
    (r && (s = xe(r) <= i), n && s && (s = xe(n) >= i), s && o.push(i));
  }
  return o;
}
var _D = au(
    (function (e) {
      vt(r, I.Component);
      var t = yt(r);
      function r(n) {
        var o;
        (mt(this, r),
          b(D((o = t.call(this, n))), "renderOptions", function () {
            var l = o.props.year,
              u = o.state.yearsList.map(function (m) {
                return I.createElement(
                  "div",
                  {
                    className:
                      l === m
                        ? "react-datepicker__year-option react-datepicker__year-option--selected_year"
                        : "react-datepicker__year-option",
                    key: m,
                    onClick: o.onChange.bind(D(o), m),
                    "aria-selected": l === m ? "true" : void 0,
                  },
                  l === m
                    ? I.createElement(
                        "span",
                        {
                          className: "react-datepicker__year-option--selected",
                        },
                        "✓",
                      )
                    : "",
                  m,
                );
              }),
              c = o.props.minDate ? xe(o.props.minDate) : null,
              d = o.props.maxDate ? xe(o.props.maxDate) : null;
            return (
              (d &&
                o.state.yearsList.find(function (m) {
                  return m === d;
                })) ||
                u.unshift(
                  I.createElement(
                    "div",
                    {
                      className: "react-datepicker__year-option",
                      key: "upcoming",
                      onClick: o.incrementYears,
                    },
                    I.createElement("a", {
                      className:
                        "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming",
                    }),
                  ),
                ),
              (c &&
                o.state.yearsList.find(function (m) {
                  return m === c;
                })) ||
                u.push(
                  I.createElement(
                    "div",
                    {
                      className: "react-datepicker__year-option",
                      key: "previous",
                      onClick: o.decrementYears,
                    },
                    I.createElement("a", {
                      className:
                        "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous",
                    }),
                  ),
                ),
              u
            );
          }),
          b(D(o), "onChange", function (l) {
            o.props.onChange(l);
          }),
          b(D(o), "handleClickOutside", function () {
            o.props.onCancel();
          }),
          b(D(o), "shiftYears", function (l) {
            var u = o.state.yearsList.map(function (c) {
              return c + l;
            });
            o.setState({ yearsList: u });
          }),
          b(D(o), "incrementYears", function () {
            return o.shiftYears(1);
          }),
          b(D(o), "decrementYears", function () {
            return o.shiftYears(-1);
          }));
        var a = n.yearDropdownItemNumber,
          i = n.scrollableYearDropdown,
          s = a || (i ? 10 : 5);
        return (
          (o.state = {
            yearsList: ED(o.props.year, s, o.props.minDate, o.props.maxDate),
          }),
          (o.dropdownRef = _.createRef()),
          o
        );
      }
      return (
        gt(r, [
          {
            key: "componentDidMount",
            value: function () {
              var n = this.dropdownRef.current;
              if (n) {
                var o = n.children ? Array.from(n.children) : null,
                  a = o
                    ? o.find(function (i) {
                        return i.ariaSelected;
                      })
                    : null;
                n.scrollTop = a
                  ? a.offsetTop + (a.clientHeight - n.clientHeight) / 2
                  : (n.scrollHeight - n.clientHeight) / 2;
              }
            },
          },
          {
            key: "render",
            value: function () {
              var n = Ct({
                "react-datepicker__year-dropdown": !0,
                "react-datepicker__year-dropdown--scrollable":
                  this.props.scrollableYearDropdown,
              });
              return I.createElement(
                "div",
                { className: n, ref: this.dropdownRef },
                this.renderOptions(),
              );
            },
          },
        ]),
        r
      );
    })(),
  ),
  bD = (function (e) {
    vt(r, I.Component);
    var t = yt(r);
    function r() {
      var n;
      mt(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        b(D((n = t.call.apply(t, [this].concat(a)))), "state", {
          dropdownVisible: !1,
        }),
        b(D(n), "renderSelectOptions", function () {
          for (
            var s = n.props.minDate ? xe(n.props.minDate) : 1900,
              l = n.props.maxDate ? xe(n.props.maxDate) : 2100,
              u = [],
              c = s;
            c <= l;
            c++
          )
            u.push(I.createElement("option", { key: c, value: c }, c));
          return u;
        }),
        b(D(n), "onSelectChange", function (s) {
          n.onChange(s.target.value);
        }),
        b(D(n), "renderSelectMode", function () {
          return I.createElement(
            "select",
            {
              value: n.props.year,
              className: "react-datepicker__year-select",
              onChange: n.onSelectChange,
            },
            n.renderSelectOptions(),
          );
        }),
        b(D(n), "renderReadView", function (s) {
          return I.createElement(
            "div",
            {
              key: "read",
              style: { visibility: s ? "visible" : "hidden" },
              className: "react-datepicker__year-read-view",
              onClick: function (l) {
                return n.toggleDropdown(l);
              },
            },
            I.createElement("span", {
              className: "react-datepicker__year-read-view--down-arrow",
            }),
            I.createElement(
              "span",
              { className: "react-datepicker__year-read-view--selected-year" },
              n.props.year,
            ),
          );
        }),
        b(D(n), "renderDropdown", function () {
          return I.createElement(_D, {
            key: "dropdown",
            year: n.props.year,
            onChange: n.onChange,
            onCancel: n.toggleDropdown,
            minDate: n.props.minDate,
            maxDate: n.props.maxDate,
            scrollableYearDropdown: n.props.scrollableYearDropdown,
            yearDropdownItemNumber: n.props.yearDropdownItemNumber,
          });
        }),
        b(D(n), "renderScrollMode", function () {
          var s = n.state.dropdownVisible,
            l = [n.renderReadView(!s)];
          return (s && l.unshift(n.renderDropdown()), l);
        }),
        b(D(n), "onChange", function (s) {
          (n.toggleDropdown(), s !== n.props.year && n.props.onChange(s));
        }),
        b(D(n), "toggleDropdown", function (s) {
          n.setState(
            { dropdownVisible: !n.state.dropdownVisible },
            function () {
              n.props.adjustDateOnChange && n.handleYearChange(n.props.date, s);
            },
          );
        }),
        b(D(n), "handleYearChange", function (s, l) {
          (n.onSelect(s, l), n.setOpen());
        }),
        b(D(n), "onSelect", function (s, l) {
          n.props.onSelect && n.props.onSelect(s, l);
        }),
        b(D(n), "setOpen", function () {
          n.props.setOpen && n.props.setOpen(!0);
        }),
        n
      );
    }
    return (
      gt(r, [
        {
          key: "render",
          value: function () {
            var n;
            switch (this.props.dropdownMode) {
              case "scroll":
                n = this.renderScrollMode();
                break;
              case "select":
                n = this.renderSelectMode();
            }
            return I.createElement(
              "div",
              {
                className:
                  "react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--".concat(
                    this.props.dropdownMode,
                  ),
              },
              n,
            );
          },
        },
      ]),
      r
    );
  })(),
  DD = au(
    (function (e) {
      vt(r, I.Component);
      var t = yt(r);
      function r() {
        var n;
        mt(this, r);
        for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
          a[i] = arguments[i];
        return (
          b(
            D((n = t.call.apply(t, [this].concat(a)))),
            "isSelectedMonth",
            function (s) {
              return n.props.month === s;
            },
          ),
          b(D(n), "renderOptions", function () {
            return n.props.monthNames.map(function (s, l) {
              return I.createElement(
                "div",
                {
                  className: n.isSelectedMonth(l)
                    ? "react-datepicker__month-option react-datepicker__month-option--selected_month"
                    : "react-datepicker__month-option",
                  key: s,
                  onClick: n.onChange.bind(D(n), l),
                  "aria-selected": n.isSelectedMonth(l) ? "true" : void 0,
                },
                n.isSelectedMonth(l)
                  ? I.createElement(
                      "span",
                      { className: "react-datepicker__month-option--selected" },
                      "✓",
                    )
                  : "",
                s,
              );
            });
          }),
          b(D(n), "onChange", function (s) {
            return n.props.onChange(s);
          }),
          b(D(n), "handleClickOutside", function () {
            return n.props.onCancel();
          }),
          n
        );
      }
      return (
        gt(r, [
          {
            key: "render",
            value: function () {
              return I.createElement(
                "div",
                { className: "react-datepicker__month-dropdown" },
                this.renderOptions(),
              );
            },
          },
        ]),
        r
      );
    })(),
  ),
  TD = (function (e) {
    vt(r, I.Component);
    var t = yt(r);
    function r() {
      var n;
      mt(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        b(D((n = t.call.apply(t, [this].concat(a)))), "state", {
          dropdownVisible: !1,
        }),
        b(D(n), "renderSelectOptions", function (s) {
          return s.map(function (l, u) {
            return I.createElement("option", { key: u, value: u }, l);
          });
        }),
        b(D(n), "renderSelectMode", function (s) {
          return I.createElement(
            "select",
            {
              value: n.props.month,
              className: "react-datepicker__month-select",
              onChange: function (l) {
                return n.onChange(l.target.value);
              },
            },
            n.renderSelectOptions(s),
          );
        }),
        b(D(n), "renderReadView", function (s, l) {
          return I.createElement(
            "div",
            {
              key: "read",
              style: { visibility: s ? "visible" : "hidden" },
              className: "react-datepicker__month-read-view",
              onClick: n.toggleDropdown,
            },
            I.createElement("span", {
              className: "react-datepicker__month-read-view--down-arrow",
            }),
            I.createElement(
              "span",
              {
                className: "react-datepicker__month-read-view--selected-month",
              },
              l[n.props.month],
            ),
          );
        }),
        b(D(n), "renderDropdown", function (s) {
          return I.createElement(DD, {
            key: "dropdown",
            month: n.props.month,
            monthNames: s,
            onChange: n.onChange,
            onCancel: n.toggleDropdown,
          });
        }),
        b(D(n), "renderScrollMode", function (s) {
          var l = n.state.dropdownVisible,
            u = [n.renderReadView(!l, s)];
          return (l && u.unshift(n.renderDropdown(s)), u);
        }),
        b(D(n), "onChange", function (s) {
          (n.toggleDropdown(), s !== n.props.month && n.props.onChange(s));
        }),
        b(D(n), "toggleDropdown", function () {
          return n.setState({ dropdownVisible: !n.state.dropdownVisible });
        }),
        n
      );
    }
    return (
      gt(r, [
        {
          key: "render",
          value: function () {
            var n,
              o = this,
              a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
                this.props.useShortMonthInDropdown
                  ? function (i) {
                      return S0(i, o.props.locale);
                    }
                  : function (i) {
                      return rf(i, o.props.locale);
                    },
              );
            switch (this.props.dropdownMode) {
              case "scroll":
                n = this.renderScrollMode(a);
                break;
              case "select":
                n = this.renderSelectMode(a);
            }
            return I.createElement(
              "div",
              {
                className:
                  "react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--".concat(
                    this.props.dropdownMode,
                  ),
              },
              n,
            );
          },
        },
      ]),
      r
    );
  })();
function PD(e, t) {
  for (var r = [], n = On(e), o = On(t); !jn(n, o);)
    (r.push(Be(n)), (n = Dr(n, 1)));
  return r;
}
var RD = au(
    (function (e) {
      vt(r, I.Component);
      var t = yt(r);
      function r(n) {
        var o;
        return (
          mt(this, r),
          b(D((o = t.call(this, n))), "renderOptions", function () {
            return o.state.monthYearsList.map(function (a) {
              var i = hd(a),
                s = Sn(o.props.date, a) && Cr(o.props.date, a);
              return I.createElement(
                "div",
                {
                  className: s
                    ? "react-datepicker__month-year-option--selected_month-year"
                    : "react-datepicker__month-year-option",
                  key: i,
                  onClick: o.onChange.bind(D(o), i),
                  "aria-selected": s ? "true" : void 0,
                },
                s
                  ? I.createElement(
                      "span",
                      {
                        className:
                          "react-datepicker__month-year-option--selected",
                      },
                      "✓",
                    )
                  : "",
                Qe(a, o.props.dateFormat, o.props.locale),
              );
            });
          }),
          b(D(o), "onChange", function (a) {
            return o.props.onChange(a);
          }),
          b(D(o), "handleClickOutside", function () {
            o.props.onCancel();
          }),
          (o.state = { monthYearsList: PD(o.props.minDate, o.props.maxDate) }),
          o
        );
      }
      return (
        gt(r, [
          {
            key: "render",
            value: function () {
              var n = Ct({
                "react-datepicker__month-year-dropdown": !0,
                "react-datepicker__month-year-dropdown--scrollable":
                  this.props.scrollableMonthYearDropdown,
              });
              return I.createElement(
                "div",
                { className: n },
                this.renderOptions(),
              );
            },
          },
        ]),
        r
      );
    })(),
  ),
  OD = (function (e) {
    vt(r, I.Component);
    var t = yt(r);
    function r() {
      var n;
      mt(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        b(D((n = t.call.apply(t, [this].concat(a)))), "state", {
          dropdownVisible: !1,
        }),
        b(D(n), "renderSelectOptions", function () {
          for (
            var s = On(n.props.minDate), l = On(n.props.maxDate), u = [];
            !jn(s, l);
          ) {
            var c = hd(s);
            (u.push(
              I.createElement(
                "option",
                { key: c, value: c },
                Qe(s, n.props.dateFormat, n.props.locale),
              ),
            ),
              (s = Dr(s, 1)));
          }
          return u;
        }),
        b(D(n), "onSelectChange", function (s) {
          n.onChange(s.target.value);
        }),
        b(D(n), "renderSelectMode", function () {
          return I.createElement(
            "select",
            {
              value: hd(On(n.props.date)),
              className: "react-datepicker__month-year-select",
              onChange: n.onSelectChange,
            },
            n.renderSelectOptions(),
          );
        }),
        b(D(n), "renderReadView", function (s) {
          var l = Qe(n.props.date, n.props.dateFormat, n.props.locale);
          return I.createElement(
            "div",
            {
              key: "read",
              style: { visibility: s ? "visible" : "hidden" },
              className: "react-datepicker__month-year-read-view",
              onClick: function (u) {
                return n.toggleDropdown(u);
              },
            },
            I.createElement("span", {
              className: "react-datepicker__month-year-read-view--down-arrow",
            }),
            I.createElement(
              "span",
              {
                className:
                  "react-datepicker__month-year-read-view--selected-month-year",
              },
              l,
            ),
          );
        }),
        b(D(n), "renderDropdown", function () {
          return I.createElement(RD, {
            key: "dropdown",
            date: n.props.date,
            dateFormat: n.props.dateFormat,
            onChange: n.onChange,
            onCancel: n.toggleDropdown,
            minDate: n.props.minDate,
            maxDate: n.props.maxDate,
            scrollableMonthYearDropdown: n.props.scrollableMonthYearDropdown,
            locale: n.props.locale,
          });
        }),
        b(D(n), "renderScrollMode", function () {
          var s = n.state.dropdownVisible,
            l = [n.renderReadView(!s)];
          return (s && l.unshift(n.renderDropdown()), l);
        }),
        b(D(n), "onChange", function (s) {
          n.toggleDropdown();
          var l = Be(parseInt(s));
          (Sn(n.props.date, l) && Cr(n.props.date, l)) || n.props.onChange(l);
        }),
        b(D(n), "toggleDropdown", function () {
          return n.setState({ dropdownVisible: !n.state.dropdownVisible });
        }),
        n
      );
    }
    return (
      gt(r, [
        {
          key: "render",
          value: function () {
            var n;
            switch (this.props.dropdownMode) {
              case "scroll":
                n = this.renderScrollMode();
                break;
              case "select":
                n = this.renderSelectMode();
            }
            return I.createElement(
              "div",
              {
                className:
                  "react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--".concat(
                    this.props.dropdownMode,
                  ),
              },
              n,
            );
          },
        },
      ]),
      r
    );
  })(),
  ND = (function (e) {
    vt(r, I.Component);
    var t = yt(r);
    function r() {
      var n;
      mt(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        b(D((n = t.call.apply(t, [this].concat(a)))), "dayEl", I.createRef()),
        b(D(n), "handleClick", function (s) {
          !n.isDisabled() && n.props.onClick && n.props.onClick(s);
        }),
        b(D(n), "handleMouseEnter", function (s) {
          !n.isDisabled() && n.props.onMouseEnter && n.props.onMouseEnter(s);
        }),
        b(D(n), "handleOnKeyDown", function (s) {
          (s.key === " " && (s.preventDefault(), (s.key = "Enter")),
            n.props.handleOnKeyDown(s));
        }),
        b(D(n), "isSameDay", function (s) {
          return $e(n.props.day, s);
        }),
        b(D(n), "isKeyboardSelected", function () {
          return (
            !n.props.disabledKeyboardNavigation &&
            !(
              n.isSameDay(n.props.selected) || n.isSameWeek(n.props.selected)
            ) &&
            (n.isSameDay(n.props.preSelection) ||
              n.isSameWeek(n.props.preSelection))
          );
        }),
        b(D(n), "isDisabled", function () {
          return su(n.props.day, n.props);
        }),
        b(D(n), "isExcluded", function () {
          return nf(n.props.day, n.props);
        }),
        b(D(n), "isStartOfWeek", function () {
          return $e(
            n.props.day,
            Hr(n.props.day, n.props.locale, n.props.calendarStartDay),
          );
        }),
        b(D(n), "isSameWeek", function (s) {
          return (
            n.props.showWeekPicker &&
            $e(s, Hr(n.props.day, n.props.locale, n.props.calendarStartDay))
          );
        }),
        b(D(n), "getHighLightedClass", function () {
          var s = n.props,
            l = s.day,
            u = s.highlightDates;
          if (!u) return !1;
          var c = Qe(l, "MM.dd.yyyy");
          return u.get(c);
        }),
        b(D(n), "getHolidaysClass", function () {
          var s = n.props,
            l = s.day,
            u = s.holidays;
          if (!u) return !1;
          var c = Qe(l, "MM.dd.yyyy");
          return u.has(c) ? [u.get(c).className] : void 0;
        }),
        b(D(n), "isInRange", function () {
          var s = n.props,
            l = s.day,
            u = s.startDate,
            c = s.endDate;
          return !(!u || !c) && Is(l, u, c);
        }),
        b(D(n), "isInSelectingRange", function () {
          var s,
            l = n.props,
            u = l.day,
            c = l.selectsStart,
            d = l.selectsEnd,
            m = l.selectsRange,
            v = l.selectsDisabledDaysInRange,
            S = l.startDate,
            C = l.endDate,
            k =
              (s = n.props.selectingDate) !== null && s !== void 0
                ? s
                : n.props.preSelection;
          return (
            !(!(c || d || m) || !k || (!v && n.isDisabled())) &&
            (c && C && (xn(k, C) || Kn(k, C))
              ? Is(u, k, C)
              : ((d && S && (jn(k, S) || Kn(k, S))) ||
                  !(!m || !S || C || (!jn(k, S) && !Kn(k, S)))) &&
                Is(u, S, k))
          );
        }),
        b(D(n), "isSelectingRangeStart", function () {
          var s;
          if (!n.isInSelectingRange()) return !1;
          var l = n.props,
            u = l.day,
            c = l.startDate,
            d = l.selectsStart,
            m =
              (s = n.props.selectingDate) !== null && s !== void 0
                ? s
                : n.props.preSelection;
          return $e(u, d ? m : c);
        }),
        b(D(n), "isSelectingRangeEnd", function () {
          var s;
          if (!n.isInSelectingRange()) return !1;
          var l = n.props,
            u = l.day,
            c = l.endDate,
            d = l.selectsEnd,
            m = l.selectsRange,
            v =
              (s = n.props.selectingDate) !== null && s !== void 0
                ? s
                : n.props.preSelection;
          return $e(u, d || m ? v : c);
        }),
        b(D(n), "isRangeStart", function () {
          var s = n.props,
            l = s.day,
            u = s.startDate,
            c = s.endDate;
          return !(!u || !c) && $e(u, l);
        }),
        b(D(n), "isRangeEnd", function () {
          var s = n.props,
            l = s.day,
            u = s.startDate,
            c = s.endDate;
          return !(!u || !c) && $e(c, l);
        }),
        b(D(n), "isWeekend", function () {
          var s = uE(n.props.day);
          return s === 0 || s === 6;
        }),
        b(D(n), "isAfterMonth", function () {
          return (
            n.props.month !== void 0 &&
            (n.props.month + 1) % 12 === Rt(n.props.day)
          );
        }),
        b(D(n), "isBeforeMonth", function () {
          return (
            n.props.month !== void 0 &&
            (Rt(n.props.day) + 1) % 12 === n.props.month
          );
        }),
        b(D(n), "isCurrentDay", function () {
          return n.isSameDay(Be());
        }),
        b(D(n), "isSelected", function () {
          return (
            n.isSameDay(n.props.selected) || n.isSameWeek(n.props.selected)
          );
        }),
        b(D(n), "getClassNames", function (s) {
          var l,
            u = n.props.dayClassName ? n.props.dayClassName(s) : void 0;
          return Ct(
            "react-datepicker__day",
            u,
            "react-datepicker__day--" + Qe(n.props.day, "ddd", l),
            {
              "react-datepicker__day--disabled": n.isDisabled(),
              "react-datepicker__day--excluded": n.isExcluded(),
              "react-datepicker__day--selected": n.isSelected(),
              "react-datepicker__day--keyboard-selected":
                n.isKeyboardSelected(),
              "react-datepicker__day--range-start": n.isRangeStart(),
              "react-datepicker__day--range-end": n.isRangeEnd(),
              "react-datepicker__day--in-range": n.isInRange(),
              "react-datepicker__day--in-selecting-range":
                n.isInSelectingRange(),
              "react-datepicker__day--selecting-range-start":
                n.isSelectingRangeStart(),
              "react-datepicker__day--selecting-range-end":
                n.isSelectingRangeEnd(),
              "react-datepicker__day--today": n.isCurrentDay(),
              "react-datepicker__day--weekend": n.isWeekend(),
              "react-datepicker__day--outside-month":
                n.isAfterMonth() || n.isBeforeMonth(),
            },
            n.getHighLightedClass("react-datepicker__day--highlighted"),
            n.getHolidaysClass(),
          );
        }),
        b(D(n), "getAriaLabel", function () {
          var s = n.props,
            l = s.day,
            u = s.ariaLabelPrefixWhenEnabled,
            c = u === void 0 ? "Choose" : u,
            d = s.ariaLabelPrefixWhenDisabled,
            m = d === void 0 ? "Not available" : d,
            v = n.isDisabled() || n.isExcluded() ? m : c;
          return "".concat(v, " ").concat(Qe(l, "PPPP", n.props.locale));
        }),
        b(D(n), "getTitle", function () {
          var s = n.props,
            l = s.day,
            u = s.holidays,
            c = u === void 0 ? new Map() : u,
            d = Qe(l, "MM.dd.yyyy");
          return c.has(d) && c.get(d).holidayNames.length > 0
            ? c.get(d).holidayNames.join(", ")
            : "";
        }),
        b(D(n), "getTabIndex", function (s, l) {
          var u = s || n.props.selected,
            c = l || n.props.preSelection;
          return (!n.props.showWeekPicker ||
            (!n.props.showWeekNumber && n.isStartOfWeek())) &&
            (n.isKeyboardSelected() || (n.isSameDay(u) && $e(c, u)))
            ? 0
            : -1;
        }),
        b(D(n), "handleFocusDay", function () {
          var s,
            l =
              arguments.length > 0 && arguments[0] !== void 0
                ? arguments[0]
                : {},
            u = !1;
          (n.getTabIndex() === 0 &&
            !l.isInputFocused &&
            n.isSameDay(n.props.preSelection) &&
            ((document.activeElement &&
              document.activeElement !== document.body) ||
              (u = !0),
            n.props.inline && !n.props.shouldFocusDayInline && (u = !1),
            n.props.containerRef &&
              n.props.containerRef.current &&
              n.props.containerRef.current.contains(document.activeElement) &&
              document.activeElement.classList.contains(
                "react-datepicker__day",
              ) &&
              (u = !0),
            n.props.monthShowsDuplicateDaysEnd && n.isAfterMonth() && (u = !1),
            n.props.monthShowsDuplicateDaysStart &&
              n.isBeforeMonth() &&
              (u = !1)),
            u &&
              ((s = n.dayEl.current) === null ||
                s === void 0 ||
                s.focus({ preventScroll: !0 })));
        }),
        b(D(n), "renderDayContents", function () {
          return (n.props.monthShowsDuplicateDaysEnd && n.isAfterMonth()) ||
            (n.props.monthShowsDuplicateDaysStart && n.isBeforeMonth())
            ? null
            : n.props.renderDayContents
              ? n.props.renderDayContents(zh(n.props.day), n.props.day)
              : zh(n.props.day);
        }),
        b(D(n), "render", function () {
          return I.createElement(
            "div",
            {
              ref: n.dayEl,
              className: n.getClassNames(n.props.day),
              onKeyDown: n.handleOnKeyDown,
              onClick: n.handleClick,
              onMouseEnter: n.handleMouseEnter,
              tabIndex: n.getTabIndex(),
              "aria-label": n.getAriaLabel(),
              role: "option",
              title: n.getTitle(),
              "aria-disabled": n.isDisabled(),
              "aria-current": n.isCurrentDay() ? "date" : void 0,
              "aria-selected": n.isSelected() || n.isInRange(),
            },
            n.renderDayContents(),
            n.getTitle() !== "" &&
              I.createElement(
                "span",
                { className: "holiday-overlay" },
                n.getTitle(),
              ),
          );
        }),
        n
      );
    }
    return (
      gt(r, [
        {
          key: "componentDidMount",
          value: function () {
            this.handleFocusDay();
          },
        },
        {
          key: "componentDidUpdate",
          value: function (n) {
            this.handleFocusDay(n);
          },
        },
      ]),
      r
    );
  })(),
  MD = (function (e) {
    vt(r, I.Component);
    var t = yt(r);
    function r() {
      var n;
      mt(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        b(
          D((n = t.call.apply(t, [this].concat(a)))),
          "weekNumberEl",
          I.createRef(),
        ),
        b(D(n), "handleClick", function (s) {
          n.props.onClick && n.props.onClick(s);
        }),
        b(D(n), "handleOnKeyDown", function (s) {
          (s.key === " " && (s.preventDefault(), (s.key = "Enter")),
            n.props.handleOnKeyDown(s));
        }),
        b(D(n), "isKeyboardSelected", function () {
          return (
            !n.props.disabledKeyboardNavigation &&
            !$e(n.props.date, n.props.selected) &&
            $e(n.props.date, n.props.preSelection)
          );
        }),
        b(D(n), "getTabIndex", function () {
          return n.props.showWeekPicker &&
            n.props.showWeekNumber &&
            (n.isKeyboardSelected() ||
              ($e(n.props.date, n.props.selected) &&
                $e(n.props.preSelection, n.props.selected)))
            ? 0
            : -1;
        }),
        b(D(n), "handleFocusWeekNumber", function () {
          var s =
              arguments.length > 0 && arguments[0] !== void 0
                ? arguments[0]
                : {},
            l = !1;
          (n.getTabIndex() === 0 &&
            !s.isInputFocused &&
            $e(n.props.date, n.props.preSelection) &&
            ((document.activeElement &&
              document.activeElement !== document.body) ||
              (l = !0),
            n.props.inline && !n.props.shouldFocusDayInline && (l = !1),
            n.props.containerRef &&
              n.props.containerRef.current &&
              n.props.containerRef.current.contains(document.activeElement) &&
              document.activeElement &&
              document.activeElement.classList.contains(
                "react-datepicker__week-number",
              ) &&
              (l = !0)),
            l &&
              n.weekNumberEl.current &&
              n.weekNumberEl.current.focus({ preventScroll: !0 }));
        }),
        n
      );
    }
    return (
      gt(
        r,
        [
          {
            key: "componentDidMount",
            value: function () {
              this.handleFocusWeekNumber();
            },
          },
          {
            key: "componentDidUpdate",
            value: function (n) {
              this.handleFocusWeekNumber(n);
            },
          },
          {
            key: "render",
            value: function () {
              var n = this.props,
                o = n.weekNumber,
                a = n.ariaLabelPrefix,
                i = a === void 0 ? "week " : a,
                s = {
                  "react-datepicker__week-number": !0,
                  "react-datepicker__week-number--clickable": !!n.onClick,
                  "react-datepicker__week-number--selected": $e(
                    this.props.date,
                    this.props.selected,
                  ),
                  "react-datepicker__week-number--keyboard-selected":
                    this.isKeyboardSelected(),
                };
              return I.createElement(
                "div",
                {
                  ref: this.weekNumberEl,
                  className: Ct(s),
                  "aria-label": "".concat(i, " ").concat(this.props.weekNumber),
                  onClick: this.handleClick,
                  onKeyDown: this.handleOnKeyDown,
                  tabIndex: this.getTabIndex(),
                },
                o,
              );
            },
          },
        ],
        [
          {
            key: "defaultProps",
            get: function () {
              return { ariaLabelPrefix: "week " };
            },
          },
        ],
      ),
      r
    );
  })(),
  ID = (function (e) {
    vt(r, I.Component);
    var t = yt(r);
    function r() {
      var n;
      mt(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        b(
          D((n = t.call.apply(t, [this].concat(a)))),
          "handleDayClick",
          function (s, l) {
            n.props.onDayClick && n.props.onDayClick(s, l);
          },
        ),
        b(D(n), "handleDayMouseEnter", function (s) {
          n.props.onDayMouseEnter && n.props.onDayMouseEnter(s);
        }),
        b(D(n), "handleWeekClick", function (s, l, u) {
          if (
            (typeof n.props.onWeekSelect == "function" &&
              n.props.onWeekSelect(s, l, u),
            n.props.showWeekPicker)
          ) {
            var c = Hr(s, n.props.locale, n.props.calendarStartDay);
            n.handleDayClick(c, u);
          }
          n.props.shouldCloseOnSelect && n.props.setOpen(!1);
        }),
        b(D(n), "formatWeekNumber", function (s) {
          return n.props.formatWeekNumber
            ? n.props.formatWeekNumber(s)
            : (function (l, u) {
                var c = eo() && to(eo());
                return fE(l, c ? { locale: c } : null);
              })(s);
        }),
        b(D(n), "renderDays", function () {
          var s = Hr(n.props.day, n.props.locale, n.props.calendarStartDay),
            l = [],
            u = n.formatWeekNumber(s);
          if (n.props.showWeekNumber) {
            var c =
              n.props.onWeekSelect || n.props.showWeekPicker
                ? n.handleWeekClick.bind(D(n), s, u)
                : void 0;
            l.push(
              I.createElement(MD, {
                key: "W",
                weekNumber: u,
                date: s,
                onClick: c,
                selected: n.props.selected,
                preSelection: n.props.preSelection,
                ariaLabelPrefix: n.props.ariaLabelPrefix,
                showWeekPicker: n.props.showWeekPicker,
                showWeekNumber: n.props.showWeekNumber,
                disabledKeyboardNavigation: n.props.disabledKeyboardNavigation,
                handleOnKeyDown: n.props.handleOnKeyDown,
                isInputFocused: n.props.isInputFocused,
                containerRef: n.props.containerRef,
              }),
            );
          }
          return l.concat(
            [0, 1, 2, 3, 4, 5, 6].map(function (d) {
              var m = xa(s, d);
              return I.createElement(ND, {
                ariaLabelPrefixWhenEnabled: n.props.chooseDayAriaLabelPrefix,
                ariaLabelPrefixWhenDisabled: n.props.disabledDayAriaLabelPrefix,
                key: m.valueOf(),
                day: m,
                month: n.props.month,
                onClick: n.handleDayClick.bind(D(n), m),
                onMouseEnter: n.handleDayMouseEnter.bind(D(n), m),
                minDate: n.props.minDate,
                maxDate: n.props.maxDate,
                excludeDates: n.props.excludeDates,
                excludeDateIntervals: n.props.excludeDateIntervals,
                includeDates: n.props.includeDates,
                includeDateIntervals: n.props.includeDateIntervals,
                highlightDates: n.props.highlightDates,
                holidays: n.props.holidays,
                selectingDate: n.props.selectingDate,
                filterDate: n.props.filterDate,
                preSelection: n.props.preSelection,
                selected: n.props.selected,
                selectsStart: n.props.selectsStart,
                selectsEnd: n.props.selectsEnd,
                selectsRange: n.props.selectsRange,
                showWeekPicker: n.props.showWeekPicker,
                showWeekNumber: n.props.showWeekNumber,
                selectsDisabledDaysInRange: n.props.selectsDisabledDaysInRange,
                startDate: n.props.startDate,
                endDate: n.props.endDate,
                dayClassName: n.props.dayClassName,
                renderDayContents: n.props.renderDayContents,
                disabledKeyboardNavigation: n.props.disabledKeyboardNavigation,
                handleOnKeyDown: n.props.handleOnKeyDown,
                isInputFocused: n.props.isInputFocused,
                containerRef: n.props.containerRef,
                inline: n.props.inline,
                shouldFocusDayInline: n.props.shouldFocusDayInline,
                monthShowsDuplicateDaysEnd: n.props.monthShowsDuplicateDaysEnd,
                monthShowsDuplicateDaysStart:
                  n.props.monthShowsDuplicateDaysStart,
                locale: n.props.locale,
              });
            }),
          );
        }),
        b(D(n), "startOfWeek", function () {
          return Hr(n.props.day, n.props.locale, n.props.calendarStartDay);
        }),
        b(D(n), "isKeyboardSelected", function () {
          return (
            !n.props.disabledKeyboardNavigation &&
            !$e(n.startOfWeek(), n.props.selected) &&
            $e(n.startOfWeek(), n.props.preSelection)
          );
        }),
        n
      );
    }
    return (
      gt(
        r,
        [
          {
            key: "render",
            value: function () {
              var n = {
                "react-datepicker__week": !0,
                "react-datepicker__week--selected": $e(
                  this.startOfWeek(),
                  this.props.selected,
                ),
                "react-datepicker__week--keyboard-selected":
                  this.isKeyboardSelected(),
              };
              return I.createElement(
                "div",
                { className: Ct(n) },
                this.renderDays(),
              );
            },
          },
        ],
        [
          {
            key: "defaultProps",
            get: function () {
              return { shouldCloseOnSelect: !0 };
            },
          },
        ],
      ),
      r
    );
  })(),
  b0 = "two_columns",
  D0 = "three_columns",
  T0 = "four_columns",
  ec = b(
    b(
      b({}, b0, {
        grid: [
          [0, 1],
          [2, 3],
          [4, 5],
          [6, 7],
          [8, 9],
          [10, 11],
        ],
        verticalNavigationOffset: 2,
      }),
      D0,
      {
        grid: [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [9, 10, 11],
        ],
        verticalNavigationOffset: 3,
      },
    ),
    T0,
    {
      grid: [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
      ],
      verticalNavigationOffset: 4,
    },
  );
function Em(e, t) {
  return e ? T0 : t ? b0 : D0;
}
var jD = (function (e) {
    vt(r, I.Component);
    var t = yt(r);
    function r() {
      var n;
      mt(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        b(
          D((n = t.call.apply(t, [this].concat(a)))),
          "MONTH_REFS",
          Pi(Array(12)).map(function () {
            return I.createRef();
          }),
        ),
        b(
          D(n),
          "QUARTER_REFS",
          Pi(Array(4)).map(function () {
            return I.createRef();
          }),
        ),
        b(D(n), "isDisabled", function (s) {
          return su(s, n.props);
        }),
        b(D(n), "isExcluded", function (s) {
          return nf(s, n.props);
        }),
        b(D(n), "handleDayClick", function (s, l) {
          n.props.onDayClick &&
            n.props.onDayClick(s, l, n.props.orderInDisplay);
        }),
        b(D(n), "handleDayMouseEnter", function (s) {
          n.props.onDayMouseEnter && n.props.onDayMouseEnter(s);
        }),
        b(D(n), "handleMouseLeave", function () {
          n.props.onMouseLeave && n.props.onMouseLeave();
        }),
        b(D(n), "isRangeStartMonth", function (s) {
          var l = n.props,
            u = l.day,
            c = l.startDate,
            d = l.endDate;
          return !(!c || !d) && Cr(Lt(u, s), c);
        }),
        b(D(n), "isRangeStartQuarter", function (s) {
          var l = n.props,
            u = l.day,
            c = l.startDate,
            d = l.endDate;
          return !(!c || !d) && Pl(ko(u, s), c);
        }),
        b(D(n), "isRangeEndMonth", function (s) {
          var l = n.props,
            u = l.day,
            c = l.startDate,
            d = l.endDate;
          return !(!c || !d) && Cr(Lt(u, s), d);
        }),
        b(D(n), "isRangeEndQuarter", function (s) {
          var l = n.props,
            u = l.day,
            c = l.startDate,
            d = l.endDate;
          return !(!c || !d) && Pl(ko(u, s), d);
        }),
        b(D(n), "isInSelectingRangeMonth", function (s) {
          var l,
            u = n.props,
            c = u.day,
            d = u.selectsStart,
            m = u.selectsEnd,
            v = u.selectsRange,
            S = u.startDate,
            C = u.endDate,
            k =
              (l = n.props.selectingDate) !== null && l !== void 0
                ? l
                : n.props.preSelection;
          return (
            !(!(d || m || v) || !k) &&
            (d && C
              ? Xu(k, C, s, c)
              : ((m && S) || !(!v || !S || C)) && Xu(S, k, s, c))
          );
        }),
        b(D(n), "isSelectingMonthRangeStart", function (s) {
          var l;
          if (!n.isInSelectingRangeMonth(s)) return !1;
          var u = n.props,
            c = u.day,
            d = u.startDate,
            m = u.selectsStart,
            v = Lt(c, s),
            S =
              (l = n.props.selectingDate) !== null && l !== void 0
                ? l
                : n.props.preSelection;
          return Cr(v, m ? S : d);
        }),
        b(D(n), "isSelectingMonthRangeEnd", function (s) {
          var l;
          if (!n.isInSelectingRangeMonth(s)) return !1;
          var u = n.props,
            c = u.day,
            d = u.endDate,
            m = u.selectsEnd,
            v = u.selectsRange,
            S = Lt(c, s),
            C =
              (l = n.props.selectingDate) !== null && l !== void 0
                ? l
                : n.props.preSelection;
          return Cr(S, m || v ? C : d);
        }),
        b(D(n), "isInSelectingRangeQuarter", function (s) {
          var l,
            u = n.props,
            c = u.day,
            d = u.selectsStart,
            m = u.selectsEnd,
            v = u.selectsRange,
            S = u.startDate,
            C = u.endDate,
            k =
              (l = n.props.selectingDate) !== null && l !== void 0
                ? l
                : n.props.preSelection;
          return (
            !(!(d || m || v) || !k) &&
            (d && C
              ? Zu(k, C, s, c)
              : ((m && S) || !(!v || !S || C)) && Zu(S, k, s, c))
          );
        }),
        b(D(n), "isWeekInMonth", function (s) {
          var l = n.props.day,
            u = xa(s, 6);
          return Cr(s, l) || Cr(u, l);
        }),
        b(D(n), "isCurrentMonth", function (s, l) {
          return xe(s) === xe(Be()) && l === Rt(Be());
        }),
        b(D(n), "isCurrentQuarter", function (s, l) {
          return xe(s) === xe(Be()) && l === Bo(Be());
        }),
        b(D(n), "isSelectedMonth", function (s, l, u) {
          return Rt(u) === l && xe(s) === xe(u);
        }),
        b(D(n), "isSelectedQuarter", function (s, l, u) {
          return Bo(s) === l && xe(s) === xe(u);
        }),
        b(D(n), "renderWeeks", function () {
          for (
            var s = [],
              l = n.props.fixedHeight,
              u = 0,
              c = !1,
              d = Hr(On(n.props.day), n.props.locale, n.props.calendarStartDay);
            s.push(
              I.createElement(ID, {
                ariaLabelPrefix: n.props.weekAriaLabelPrefix,
                chooseDayAriaLabelPrefix: n.props.chooseDayAriaLabelPrefix,
                disabledDayAriaLabelPrefix: n.props.disabledDayAriaLabelPrefix,
                key: u,
                day: d,
                month: Rt(n.props.day),
                onDayClick: n.handleDayClick,
                onDayMouseEnter: n.handleDayMouseEnter,
                onWeekSelect: n.props.onWeekSelect,
                formatWeekNumber: n.props.formatWeekNumber,
                locale: n.props.locale,
                minDate: n.props.minDate,
                maxDate: n.props.maxDate,
                excludeDates: n.props.excludeDates,
                excludeDateIntervals: n.props.excludeDateIntervals,
                includeDates: n.props.includeDates,
                includeDateIntervals: n.props.includeDateIntervals,
                inline: n.props.inline,
                shouldFocusDayInline: n.props.shouldFocusDayInline,
                highlightDates: n.props.highlightDates,
                holidays: n.props.holidays,
                selectingDate: n.props.selectingDate,
                filterDate: n.props.filterDate,
                preSelection: n.props.preSelection,
                selected: n.props.selected,
                selectsStart: n.props.selectsStart,
                selectsEnd: n.props.selectsEnd,
                selectsRange: n.props.selectsRange,
                selectsDisabledDaysInRange: n.props.selectsDisabledDaysInRange,
                showWeekNumber: n.props.showWeekNumbers,
                showWeekPicker: n.props.showWeekPicker,
                startDate: n.props.startDate,
                endDate: n.props.endDate,
                dayClassName: n.props.dayClassName,
                setOpen: n.props.setOpen,
                shouldCloseOnSelect: n.props.shouldCloseOnSelect,
                disabledKeyboardNavigation: n.props.disabledKeyboardNavigation,
                renderDayContents: n.props.renderDayContents,
                handleOnKeyDown: n.props.handleOnKeyDown,
                isInputFocused: n.props.isInputFocused,
                containerRef: n.props.containerRef,
                calendarStartDay: n.props.calendarStartDay,
                monthShowsDuplicateDaysEnd: n.props.monthShowsDuplicateDaysEnd,
                monthShowsDuplicateDaysStart:
                  n.props.monthShowsDuplicateDaysStart,
              }),
            ),
              !c;
          ) {
            (u++, (d = wl(d, 1)));
            var m = l && u >= 6,
              v = !l && !n.isWeekInMonth(d);
            if (m || v) {
              if (!n.props.peekNextMonth) break;
              c = !0;
            }
          }
          return s;
        }),
        b(D(n), "onMonthClick", function (s, l) {
          n.handleDayClick(On(Lt(n.props.day, l)), s);
        }),
        b(D(n), "onMonthMouseEnter", function (s) {
          n.handleDayMouseEnter(On(Lt(n.props.day, s)));
        }),
        b(D(n), "handleMonthNavigation", function (s, l) {
          n.isDisabled(l) ||
            n.isExcluded(l) ||
            (n.props.setPreSelection(l),
            n.MONTH_REFS[s].current && n.MONTH_REFS[s].current.focus());
        }),
        b(D(n), "onMonthKeyDown", function (s, l) {
          var u = n.props,
            c = u.selected,
            d = u.preSelection,
            m = u.disabledKeyboardNavigation,
            v = u.showTwoColumnMonthYearPicker,
            S = u.showFourColumnMonthYearPicker,
            C = u.setPreSelection,
            k = s.key;
          if ((k !== "Tab" && s.preventDefault(), !m)) {
            var g = Em(S, v),
              y = ec[g].verticalNavigationOffset,
              w = ec[g].grid;
            switch (k) {
              case "Enter":
                (n.onMonthClick(s, l), C(c));
                break;
              case "ArrowRight":
                n.handleMonthNavigation(l === 11 ? 0 : l + 1, Dr(d, 1));
                break;
              case "ArrowLeft":
                n.handleMonthNavigation(l === 0 ? 11 : l - 1, aa(d, 1));
                break;
              case "ArrowUp":
                n.handleMonthNavigation(
                  w[0].includes(l) ? l + 12 - y : l - y,
                  aa(d, y),
                );
                break;
              case "ArrowDown":
                n.handleMonthNavigation(
                  w[w.length - 1].includes(l) ? l - 12 + y : l + y,
                  Dr(d, y),
                );
            }
          }
        }),
        b(D(n), "onQuarterClick", function (s, l) {
          n.handleDayClick(pm(ko(n.props.day, l)), s);
        }),
        b(D(n), "onQuarterMouseEnter", function (s) {
          n.handleDayMouseEnter(pm(ko(n.props.day, s)));
        }),
        b(D(n), "handleQuarterNavigation", function (s, l) {
          n.isDisabled(l) ||
            n.isExcluded(l) ||
            (n.props.setPreSelection(l),
            n.QUARTER_REFS[s - 1].current &&
              n.QUARTER_REFS[s - 1].current.focus());
        }),
        b(D(n), "onQuarterKeyDown", function (s, l) {
          var u = s.key;
          if (!n.props.disabledKeyboardNavigation)
            switch (u) {
              case "Enter":
                (n.onQuarterClick(s, l),
                  n.props.setPreSelection(n.props.selected));
                break;
              case "ArrowRight":
                n.handleQuarterNavigation(
                  l === 4 ? 1 : l + 1,
                  Gy(n.props.preSelection, 1),
                );
                break;
              case "ArrowLeft":
                n.handleQuarterNavigation(
                  l === 1 ? 4 : l - 1,
                  lE(n.props.preSelection, 1),
                );
            }
        }),
        b(D(n), "getMonthClassNames", function (s) {
          var l = n.props,
            u = l.day,
            c = l.startDate,
            d = l.endDate,
            m = l.selected,
            v = l.minDate,
            S = l.maxDate,
            C = l.preSelection,
            k = l.monthClassName,
            g = l.excludeDates,
            y = l.includeDates,
            w = k ? k(Lt(u, s)) : void 0,
            T = Lt(u, s);
          return Ct(
            "react-datepicker__month-text",
            "react-datepicker__month-".concat(s),
            w,
            {
              "react-datepicker__month-text--disabled":
                (v || S || g || y) && C0(T, n.props),
              "react-datepicker__month-text--selected": n.isSelectedMonth(
                u,
                s,
                m,
              ),
              "react-datepicker__month-text--keyboard-selected":
                !n.props.disabledKeyboardNavigation && Rt(C) === s,
              "react-datepicker__month-text--in-selecting-range":
                n.isInSelectingRangeMonth(s),
              "react-datepicker__month-text--in-range": Xu(c, d, s, u),
              "react-datepicker__month-text--range-start":
                n.isRangeStartMonth(s),
              "react-datepicker__month-text--range-end": n.isRangeEndMonth(s),
              "react-datepicker__month-text--selecting-range-start":
                n.isSelectingMonthRangeStart(s),
              "react-datepicker__month-text--selecting-range-end":
                n.isSelectingMonthRangeEnd(s),
              "react-datepicker__month-text--today": n.isCurrentMonth(u, s),
            },
          );
        }),
        b(D(n), "getTabIndex", function (s) {
          var l = Rt(n.props.preSelection);
          return n.props.disabledKeyboardNavigation || s !== l ? "-1" : "0";
        }),
        b(D(n), "getQuarterTabIndex", function (s) {
          var l = Bo(n.props.preSelection);
          return n.props.disabledKeyboardNavigation || s !== l ? "-1" : "0";
        }),
        b(D(n), "getAriaLabel", function (s) {
          var l = n.props,
            u = l.chooseDayAriaLabelPrefix,
            c = u === void 0 ? "Choose" : u,
            d = l.disabledDayAriaLabelPrefix,
            m = d === void 0 ? "Not available" : d,
            v = l.day,
            S = Lt(v, s),
            C = n.isDisabled(S) || n.isExcluded(S) ? m : c;
          return "".concat(C, " ").concat(Qe(S, "MMMM yyyy"));
        }),
        b(D(n), "getQuarterClassNames", function (s) {
          var l = n.props,
            u = l.day,
            c = l.startDate,
            d = l.endDate,
            m = l.selected,
            v = l.minDate,
            S = l.maxDate,
            C = l.preSelection,
            k = l.disabledKeyboardNavigation;
          return Ct(
            "react-datepicker__quarter-text",
            "react-datepicker__quarter-".concat(s),
            {
              "react-datepicker__quarter-text--disabled":
                (v || S) && SD(ko(u, s), n.props),
              "react-datepicker__quarter-text--selected": n.isSelectedQuarter(
                u,
                s,
                m,
              ),
              "react-datepicker__quarter-text--keyboard-selected":
                !k && Bo(C) === s,
              "react-datepicker__quarter-text--in-selecting-range":
                n.isInSelectingRangeQuarter(s),
              "react-datepicker__quarter-text--in-range": Zu(c, d, s, u),
              "react-datepicker__quarter-text--range-start":
                n.isRangeStartQuarter(s),
              "react-datepicker__quarter-text--range-end":
                n.isRangeEndQuarter(s),
            },
          );
        }),
        b(D(n), "getMonthContent", function (s) {
          var l = n.props,
            u = l.showFullMonthYearPicker,
            c = l.renderMonthContent,
            d = l.locale,
            m = l.day,
            v = S0(s, d),
            S = rf(s, d);
          return c ? c(s, v, S, m) : u ? S : v;
        }),
        b(D(n), "getQuarterContent", function (s) {
          var l = n.props,
            u = l.renderQuarterContent,
            c = (function (d, m) {
              return Qe(ko(Be(), d), "QQQ", m);
            })(s, l.locale);
          return u ? u(s, c) : c;
        }),
        b(D(n), "renderMonths", function () {
          var s = n.props,
            l = s.showTwoColumnMonthYearPicker,
            u = s.showFourColumnMonthYearPicker,
            c = s.day,
            d = s.selected;
          return ec[Em(u, l)].grid.map(function (m, v) {
            return I.createElement(
              "div",
              { className: "react-datepicker__month-wrapper", key: v },
              m.map(function (S, C) {
                return I.createElement(
                  "div",
                  {
                    ref: n.MONTH_REFS[S],
                    key: C,
                    onClick: function (k) {
                      n.onMonthClick(k, S);
                    },
                    onKeyDown: function (k) {
                      n.onMonthKeyDown(k, S);
                    },
                    onMouseEnter: function () {
                      return n.onMonthMouseEnter(S);
                    },
                    tabIndex: n.getTabIndex(S),
                    className: n.getMonthClassNames(S),
                    role: "option",
                    "aria-label": n.getAriaLabel(S),
                    "aria-current": n.isCurrentMonth(c, S) ? "date" : void 0,
                    "aria-selected": n.isSelectedMonth(c, S, d),
                  },
                  n.getMonthContent(S),
                );
              }),
            );
          });
        }),
        b(D(n), "renderQuarters", function () {
          var s = n.props,
            l = s.day,
            u = s.selected;
          return I.createElement(
            "div",
            { className: "react-datepicker__quarter-wrapper" },
            [1, 2, 3, 4].map(function (c, d) {
              return I.createElement(
                "div",
                {
                  key: d,
                  ref: n.QUARTER_REFS[d],
                  role: "option",
                  onClick: function (m) {
                    n.onQuarterClick(m, c);
                  },
                  onKeyDown: function (m) {
                    n.onQuarterKeyDown(m, c);
                  },
                  onMouseEnter: function () {
                    return n.onQuarterMouseEnter(c);
                  },
                  className: n.getQuarterClassNames(c),
                  "aria-selected": n.isSelectedQuarter(l, c, u),
                  tabIndex: n.getQuarterTabIndex(c),
                  "aria-current": n.isCurrentQuarter(l, c) ? "date" : void 0,
                },
                n.getQuarterContent(c),
              );
            }),
          );
        }),
        b(D(n), "getClassNames", function () {
          var s = n.props,
            l = s.selectingDate,
            u = s.selectsStart,
            c = s.selectsEnd,
            d = s.showMonthYearPicker,
            m = s.showQuarterYearPicker,
            v = s.showWeekPicker;
          return Ct(
            "react-datepicker__month",
            { "react-datepicker__month--selecting-range": l && (u || c) },
            { "react-datepicker__monthPicker": d },
            { "react-datepicker__quarterPicker": m },
            { "react-datepicker__weekPicker": v },
          );
        }),
        n
      );
    }
    return (
      gt(r, [
        {
          key: "render",
          value: function () {
            var n = this.props,
              o = n.showMonthYearPicker,
              a = n.showQuarterYearPicker,
              i = n.day,
              s = n.ariaLabelPrefix,
              l = s === void 0 ? "month " : s;
            return I.createElement(
              "div",
              {
                className: this.getClassNames(),
                onMouseLeave: this.handleMouseLeave,
                "aria-label": "".concat(l, " ").concat(Qe(i, "yyyy-MM")),
                role: "listbox",
              },
              o
                ? this.renderMonths()
                : a
                  ? this.renderQuarters()
                  : this.renderWeeks(),
            );
          },
        },
      ]),
      r
    );
  })(),
  P0 = (function (e) {
    vt(r, I.Component);
    var t = yt(r);
    function r() {
      var n;
      mt(this, r);
      for (var o = arguments.length, a = new Array(o), i = 0; i < o; i++)
        a[i] = arguments[i];
      return (
        b(D((n = t.call.apply(t, [this].concat(a)))), "state", {
          height: null,
        }),
        b(D(n), "scrollToTheSelectedTime", function () {
          requestAnimationFrame(function () {
            n.list &&
              (n.list.scrollTop =
                n.centerLi &&
                r.calcCenterPosition(
                  n.props.monthRef
                    ? n.props.monthRef.clientHeight - n.header.clientHeight
                    : n.list.clientHeight,
                  n.centerLi,
                ));
          });
        }),
        b(D(n), "handleClick", function (s) {
          ((n.props.minTime || n.props.maxTime) && gm(s, n.props)) ||
            ((n.props.excludeTimes ||
              n.props.includeTimes ||
              n.props.filterTime) &&
              mm(s, n.props)) ||
            n.props.onChange(s);
        }),
        b(D(n), "isSelectedTime", function (s) {
          return (
            n.props.selected &&
            ((l = n.props.selected),
            (u = s),
            km(l).getTime() === km(u).getTime())
          );
          var l, u;
        }),
        b(D(n), "isDisabledTime", function (s) {
          return (
            ((n.props.minTime || n.props.maxTime) && gm(s, n.props)) ||
            ((n.props.excludeTimes ||
              n.props.includeTimes ||
              n.props.filterTime) &&
              mm(s, n.props))
          );
        }),
        b(D(n), "liClasses", function (s) {
          var l = [
            "react-datepicker__time-list-item",
            n.props.timeClassName ? n.props.timeClassName(s) : void 0,
          ];
          return (
            n.isSelectedTime(s) &&
              l.push("react-datepicker__time-list-item--selected"),
            n.isDisabledTime(s) &&
              l.push("react-datepicker__time-list-item--disabled"),
            n.props.injectTimes &&
              (60 * $r(s) + Ur(s)) % n.props.intervals != 0 &&
              l.push("react-datepicker__time-list-item--injected"),
            l.join(" ")
          );
        }),
        b(D(n), "handleOnKeyDown", function (s, l) {
          (s.key === " " && (s.preventDefault(), (s.key = "Enter")),
            (s.key !== "ArrowUp" && s.key !== "ArrowLeft") ||
              !s.target.previousSibling ||
              (s.preventDefault(), s.target.previousSibling.focus()),
            (s.key !== "ArrowDown" && s.key !== "ArrowRight") ||
              !s.target.nextSibling ||
              (s.preventDefault(), s.target.nextSibling.focus()),
            s.key === "Enter" && n.handleClick(l),
            n.props.handleOnKeyDown(s));
        }),
        b(D(n), "renderTimes", function () {
          for (
            var s = [],
              l = n.props.format ? n.props.format : "p",
              u = n.props.intervals,
              c = n.props.selected || n.props.openToDate || Be(),
              d = Yr(c),
              m =
                n.props.injectTimes &&
                n.props.injectTimes.sort(function (w, T) {
                  return w - T;
                }),
              v =
                60 *
                (function (w) {
                  var T = new Date(w.getFullYear(), w.getMonth(), w.getDate()),
                    P = new Date(
                      w.getFullYear(),
                      w.getMonth(),
                      w.getDate(),
                      24,
                    );
                  return Math.round((+P - +T) / 36e5);
                })(c),
              S = v / u,
              C = 0;
            C < S;
            C++
          ) {
            var k = fd(d, C * u);
            if ((s.push(k), m)) {
              var g = kD(d, k, C, u, m);
              s = s.concat(g);
            }
          }
          var y = s.reduce(function (w, T) {
            return T.getTime() <= c.getTime() ? T : w;
          }, s[0]);
          return s.map(function (w, T) {
            return I.createElement(
              "li",
              {
                key: T,
                onClick: n.handleClick.bind(D(n), w),
                className: n.liClasses(w),
                ref: function (P) {
                  w === y && (n.centerLi = P);
                },
                onKeyDown: function (P) {
                  n.handleOnKeyDown(P, w);
                },
                tabIndex: w === y ? 0 : -1,
                role: "option",
                "aria-selected": n.isSelectedTime(w) ? "true" : void 0,
                "aria-disabled": n.isDisabledTime(w) ? "true" : void 0,
              },
              Qe(w, l, n.props.locale),
            );
          });
        }),
        n
      );
    }
    return (
      gt(
        r,
        [
          {
            key: "componentDidMount",
            value: function () {
              (this.scrollToTheSelectedTime(),
                this.props.monthRef &&
                  this.header &&
                  this.setState({
                    height:
                      this.props.monthRef.clientHeight -
                      this.header.clientHeight,
                  }));
            },
          },
          {
            key: "render",
            value: function () {
              var n = this,
                o = this.state.height;
              return I.createElement(
                "div",
                {
                  className: "react-datepicker__time-container ".concat(
                    this.props.todayButton
                      ? "react-datepicker__time-container--with-today-button"
                      : "",
                  ),
                },
                I.createElement(
                  "div",
                  {
                    className:
                      "react-datepicker__header react-datepicker__header--time ".concat(
                        this.props.showTimeSelectOnly
                          ? "react-datepicker__header--time--only"
                          : "",
                      ),
                    ref: function (a) {
                      n.header = a;
                    },
                  },
                  I.createElement(
                    "div",
                    { className: "react-datepicker-time__header" },
                    this.props.timeCaption,
                  ),
                ),
                I.createElement(
                  "div",
                  { className: "react-datepicker__time" },
                  I.createElement(
                    "div",
                    { className: "react-datepicker__time-box" },
                    I.createElement(
                      "ul",
                      {
                        className: "react-datepicker__time-list",
                        ref: function (a) {
                          n.list = a;
                        },
                        style: o ? { height: o } : {},
                        role: "listbox",
                        "aria-label": this.props.timeCaption,
                      },
                      this.renderTimes(),
                    ),
                  ),
                ),
              );
            },
          },
        ],
        [
          {
            key: "defaultProps",
            get: function () {
              return {
                intervals: 30,
                onTimeChange: function () {},
                todayButton: null,
                timeCaption: "Time",
              };
            },
          },
        ],
      ),
      r
    );
  })();
b(P0, "calcCenterPosition", function (e, t) {
  return t.offsetTop - (e / 2 - t.clientHeight / 2);
});
var LD = (function (e) {
    vt(r, I.Component);
    var t = yt(r);
    function r(n) {
      var o;
      return (
        mt(this, r),
        b(
          D((o = t.call(this, n))),
          "YEAR_REFS",
          Pi(Array(o.props.yearItemNumber)).map(function () {
            return I.createRef();
          }),
        ),
        b(D(o), "isDisabled", function (a) {
          return su(a, o.props);
        }),
        b(D(o), "isExcluded", function (a) {
          return nf(a, o.props);
        }),
        b(D(o), "selectingDate", function () {
          var a;
          return (a = o.props.selectingDate) !== null && a !== void 0
            ? a
            : o.props.preSelection;
        }),
        b(D(o), "updateFocusOnPaginate", function (a) {
          var i = function () {
            this.YEAR_REFS[a].current.focus();
          }.bind(D(o));
          window.requestAnimationFrame(i);
        }),
        b(D(o), "handleYearClick", function (a, i) {
          o.props.onDayClick && o.props.onDayClick(a, i);
        }),
        b(D(o), "handleYearNavigation", function (a, i) {
          var s = o.props,
            l = s.date,
            u = s.yearItemNumber,
            c = Uo(l, u).startPeriod;
          o.isDisabled(i) ||
            o.isExcluded(i) ||
            (o.props.setPreSelection(i),
            a - c == -1
              ? o.updateFocusOnPaginate(u - 1)
              : a - c === u
                ? o.updateFocusOnPaginate(0)
                : o.YEAR_REFS[a - c].current.focus());
        }),
        b(D(o), "isSameDay", function (a, i) {
          return $e(a, i);
        }),
        b(D(o), "isCurrentYear", function (a) {
          return a === xe(Be());
        }),
        b(D(o), "isRangeStart", function (a) {
          return (
            o.props.startDate &&
            o.props.endDate &&
            Sn(Gr(Be(), a), o.props.startDate)
          );
        }),
        b(D(o), "isRangeEnd", function (a) {
          return (
            o.props.startDate &&
            o.props.endDate &&
            Sn(Gr(Be(), a), o.props.endDate)
          );
        }),
        b(D(o), "isInRange", function (a) {
          return Ju(a, o.props.startDate, o.props.endDate);
        }),
        b(D(o), "isInSelectingRange", function (a) {
          var i = o.props,
            s = i.selectsStart,
            l = i.selectsEnd,
            u = i.selectsRange,
            c = i.startDate,
            d = i.endDate;
          return (
            !(!(s || l || u) || !o.selectingDate()) &&
            (s && d
              ? Ju(a, o.selectingDate(), d)
              : ((l && c) || !(!u || !c || d)) && Ju(a, c, o.selectingDate()))
          );
        }),
        b(D(o), "isSelectingRangeStart", function (a) {
          if (!o.isInSelectingRange(a)) return !1;
          var i = o.props,
            s = i.startDate,
            l = i.selectsStart,
            u = Gr(Be(), a);
          return Sn(u, l ? o.selectingDate() : s);
        }),
        b(D(o), "isSelectingRangeEnd", function (a) {
          if (!o.isInSelectingRange(a)) return !1;
          var i = o.props,
            s = i.endDate,
            l = i.selectsEnd,
            u = i.selectsRange,
            c = Gr(Be(), a);
          return Sn(c, l || u ? o.selectingDate() : s);
        }),
        b(D(o), "isKeyboardSelected", function (a) {
          var i = za(Gr(o.props.date, a));
          return (
            !o.props.disabledKeyboardNavigation &&
            !o.props.inline &&
            !$e(i, za(o.props.selected)) &&
            $e(i, za(o.props.preSelection))
          );
        }),
        b(D(o), "onYearClick", function (a, i) {
          var s = o.props.date;
          o.handleYearClick(za(Gr(s, i)), a);
        }),
        b(D(o), "onYearKeyDown", function (a, i) {
          var s = a.key;
          if (!o.props.disabledKeyboardNavigation)
            switch (s) {
              case "Enter":
                (o.onYearClick(a, i),
                  o.props.setPreSelection(o.props.selected));
                break;
              case "ArrowRight":
                o.handleYearNavigation(i + 1, oa(o.props.preSelection, 1));
                break;
              case "ArrowLeft":
                o.handleYearNavigation(i - 1, _i(o.props.preSelection, 1));
            }
        }),
        b(D(o), "getYearClassNames", function (a) {
          var i = o.props,
            s = i.minDate,
            l = i.maxDate,
            u = i.selected,
            c = i.excludeDates,
            d = i.includeDates,
            m = i.filterDate;
          return Ct("react-datepicker__year-text", {
            "react-datepicker__year-text--selected": a === xe(u),
            "react-datepicker__year-text--disabled":
              (s || l || c || d || m) && k0(a, o.props),
            "react-datepicker__year-text--keyboard-selected":
              o.isKeyboardSelected(a),
            "react-datepicker__year-text--range-start": o.isRangeStart(a),
            "react-datepicker__year-text--range-end": o.isRangeEnd(a),
            "react-datepicker__year-text--in-range": o.isInRange(a),
            "react-datepicker__year-text--in-selecting-range":
              o.isInSelectingRange(a),
            "react-datepicker__year-text--selecting-range-start":
              o.isSelectingRangeStart(a),
            "react-datepicker__year-text--selecting-range-end":
              o.isSelectingRangeEnd(a),
            "react-datepicker__year-text--today": o.isCurrentYear(a),
          });
        }),
        b(D(o), "getYearTabIndex", function (a) {
          return o.props.disabledKeyboardNavigation
            ? "-1"
            : a === xe(o.props.preSelection)
              ? "0"
              : "-1";
        }),
        b(D(o), "getYearContainerClassNames", function () {
          var a = o.props,
            i = a.selectingDate,
            s = a.selectsStart,
            l = a.selectsEnd,
            u = a.selectsRange;
          return Ct("react-datepicker__year", {
            "react-datepicker__year--selecting-range": i && (s || l || u),
          });
        }),
        b(D(o), "getYearContent", function (a) {
          return o.props.renderYearContent ? o.props.renderYearContent(a) : a;
        }),
        o
      );
    }
    return (
      gt(r, [
        {
          key: "render",
          value: function () {
            for (
              var n = this,
                o = [],
                a = this.props,
                i = a.date,
                s = a.yearItemNumber,
                l = a.onYearMouseEnter,
                u = a.onYearMouseLeave,
                c = Uo(i, s),
                d = c.startPeriod,
                m = c.endPeriod,
                v = function (C) {
                  o.push(
                    I.createElement(
                      "div",
                      {
                        ref: n.YEAR_REFS[C - d],
                        onClick: function (k) {
                          n.onYearClick(k, C);
                        },
                        onKeyDown: function (k) {
                          n.onYearKeyDown(k, C);
                        },
                        tabIndex: n.getYearTabIndex(C),
                        className: n.getYearClassNames(C),
                        onMouseEnter: function (k) {
                          return l(k, C);
                        },
                        onMouseLeave: function (k) {
                          return u(k, C);
                        },
                        key: C,
                        "aria-current": n.isCurrentYear(C) ? "date" : void 0,
                      },
                      n.getYearContent(C),
                    ),
                  );
                },
                S = d;
              S <= m;
              S++
            )
              v(S);
            return I.createElement(
              "div",
              { className: this.getYearContainerClassNames() },
              I.createElement(
                "div",
                {
                  className: "react-datepicker__year-wrapper",
                  onMouseLeave: this.props.clearSelectingDate,
                },
                o,
              ),
            );
          },
        },
      ]),
      r
    );
  })(),
  AD = (function (e) {
    vt(r, I.Component);
    var t = yt(r);
    function r(n) {
      var o;
      return (
        mt(this, r),
        b(D((o = t.call(this, n))), "onTimeChange", function (a) {
          o.setState({ time: a });
          var i = o.props.date,
            s = i instanceof Date && !isNaN(i) ? i : new Date();
          (s.setHours(a.split(":")[0]),
            s.setMinutes(a.split(":")[1]),
            o.props.onChange(s));
        }),
        b(D(o), "renderTimeInput", function () {
          var a = o.state.time,
            i = o.props,
            s = i.date,
            l = i.timeString,
            u = i.customTimeInput;
          return u
            ? I.cloneElement(u, { date: s, value: a, onChange: o.onTimeChange })
            : I.createElement("input", {
                type: "time",
                className: "react-datepicker-time__input",
                placeholder: "Time",
                name: "time-input",
                required: !0,
                value: a,
                onChange: function (c) {
                  o.onTimeChange(c.target.value || l);
                },
              });
        }),
        (o.state = { time: o.props.timeString }),
        o
      );
    }
    return (
      gt(
        r,
        [
          {
            key: "render",
            value: function () {
              return I.createElement(
                "div",
                { className: "react-datepicker__input-time-container" },
                I.createElement(
                  "div",
                  { className: "react-datepicker-time__caption" },
                  this.props.timeInputLabel,
                ),
                I.createElement(
                  "div",
                  { className: "react-datepicker-time__input-container" },
                  I.createElement(
                    "div",
                    { className: "react-datepicker-time__input" },
                    this.renderTimeInput(),
                  ),
                ),
              );
            },
          },
        ],
        [
          {
            key: "getDerivedStateFromProps",
            value: function (n, o) {
              return n.timeString !== o.time ? { time: n.timeString } : null;
            },
          },
        ],
      ),
      r
    );
  })();
function FD(e) {
  var t = e.className,
    r = e.children,
    n = e.showPopperArrow,
    o = e.arrowProps,
    a = o === void 0 ? {} : o;
  return I.createElement(
    "div",
    { className: t },
    n &&
      I.createElement(
        "div",
        ca({ className: "react-datepicker__triangle" }, a),
      ),
    r,
  );
}
var BD = [
    "react-datepicker__year-select",
    "react-datepicker__month-select",
    "react-datepicker__month-year-select",
  ],
  UD = (function (e) {
    vt(r, I.Component);
    var t = yt(r);
    function r(n) {
      var o;
      return (
        mt(this, r),
        b(D((o = t.call(this, n))), "handleClickOutside", function (a) {
          o.props.onClickOutside(a);
        }),
        b(D(o), "setClickOutsideRef", function () {
          return o.containerRef.current;
        }),
        b(D(o), "handleDropdownFocus", function (a) {
          (function () {
            var i = (
              (arguments.length > 0 && arguments[0] !== void 0
                ? arguments[0]
                : {}
              ).className || ""
            ).split(/\s+/);
            return BD.some(function (s) {
              return i.indexOf(s) >= 0;
            });
          })(a.target) && o.props.onDropdownFocus();
        }),
        b(D(o), "getDateInView", function () {
          var a = o.props,
            i = a.preSelection,
            s = a.selected,
            l = a.openToDate,
            u = E0(o.props),
            c = _0(o.props),
            d = Be(),
            m = l || s || i;
          return m || (u && xn(d, u) ? u : c && jn(d, c) ? c : d);
        }),
        b(D(o), "increaseMonth", function () {
          o.setState(
            function (a) {
              var i = a.date;
              return { date: Dr(i, 1) };
            },
            function () {
              return o.handleMonthChange(o.state.date);
            },
          );
        }),
        b(D(o), "decreaseMonth", function () {
          o.setState(
            function (a) {
              var i = a.date;
              return { date: aa(i, 1) };
            },
            function () {
              return o.handleMonthChange(o.state.date);
            },
          );
        }),
        b(D(o), "handleDayClick", function (a, i, s) {
          (o.props.onSelect(a, i, s),
            o.props.setPreSelection && o.props.setPreSelection(a));
        }),
        b(D(o), "handleDayMouseEnter", function (a) {
          (o.setState({ selectingDate: a }),
            o.props.onDayMouseEnter && o.props.onDayMouseEnter(a));
        }),
        b(D(o), "handleMonthMouseLeave", function () {
          (o.setState({ selectingDate: null }),
            o.props.onMonthMouseLeave && o.props.onMonthMouseLeave());
        }),
        b(D(o), "handleYearMouseEnter", function (a, i) {
          (o.setState({ selectingDate: Gr(Be(), i) }),
            o.props.onYearMouseEnter && o.props.onYearMouseEnter(a, i));
        }),
        b(D(o), "handleYearMouseLeave", function (a, i) {
          o.props.onYearMouseLeave && o.props.onYearMouseLeave(a, i);
        }),
        b(D(o), "handleYearChange", function (a) {
          (o.props.onYearChange &&
            (o.props.onYearChange(a),
            o.setState({ isRenderAriaLiveMessage: !0 })),
            o.props.adjustDateOnChange &&
              (o.props.onSelect && o.props.onSelect(a),
              o.props.setOpen && o.props.setOpen(!0)),
            o.props.setPreSelection && o.props.setPreSelection(a));
        }),
        b(D(o), "handleMonthChange", function (a) {
          (o.handleCustomMonthChange(a),
            o.props.adjustDateOnChange &&
              (o.props.onSelect && o.props.onSelect(a),
              o.props.setOpen && o.props.setOpen(!0)),
            o.props.setPreSelection && o.props.setPreSelection(a));
        }),
        b(D(o), "handleCustomMonthChange", function (a) {
          o.props.onMonthChange &&
            (o.props.onMonthChange(a),
            o.setState({ isRenderAriaLiveMessage: !0 }));
        }),
        b(D(o), "handleMonthYearChange", function (a) {
          (o.handleYearChange(a), o.handleMonthChange(a));
        }),
        b(D(o), "changeYear", function (a) {
          o.setState(
            function (i) {
              var s = i.date;
              return { date: Gr(s, a) };
            },
            function () {
              return o.handleYearChange(o.state.date);
            },
          );
        }),
        b(D(o), "changeMonth", function (a) {
          o.setState(
            function (i) {
              var s = i.date;
              return { date: Lt(s, a) };
            },
            function () {
              return o.handleMonthChange(o.state.date);
            },
          );
        }),
        b(D(o), "changeMonthYear", function (a) {
          o.setState(
            function (i) {
              var s = i.date;
              return { date: Gr(Lt(s, Rt(a)), xe(a)) };
            },
            function () {
              return o.handleMonthYearChange(o.state.date);
            },
          );
        }),
        b(D(o), "header", function () {
          var a = Hr(
              arguments.length > 0 && arguments[0] !== void 0
                ? arguments[0]
                : o.state.date,
              o.props.locale,
              o.props.calendarStartDay,
            ),
            i = [];
          return (
            o.props.showWeekNumbers &&
              i.push(
                I.createElement(
                  "div",
                  { key: "W", className: "react-datepicker__day-name" },
                  o.props.weekLabel || "#",
                ),
              ),
            i.concat(
              [0, 1, 2, 3, 4, 5, 6].map(function (s) {
                var l = xa(a, s),
                  u = o.formatWeekday(l, o.props.locale),
                  c = o.props.weekDayClassName
                    ? o.props.weekDayClassName(l)
                    : void 0;
                return I.createElement(
                  "div",
                  { key: s, className: Ct("react-datepicker__day-name", c) },
                  u,
                );
              }),
            )
          );
        }),
        b(D(o), "formatWeekday", function (a, i) {
          return o.props.formatWeekDay
            ? (function (s, l, u) {
                return l(Qe(s, "EEEE", u));
              })(a, o.props.formatWeekDay, i)
            : o.props.useWeekdaysShort
              ? (function (s, l) {
                  return Qe(s, "EEE", l);
                })(a, i)
              : (function (s, l) {
                  return Qe(s, "EEEEEE", l);
                })(a, i);
        }),
        b(D(o), "decreaseYear", function () {
          o.setState(
            function (a) {
              var i = a.date;
              return {
                date: _i(
                  i,
                  o.props.showYearPicker ? o.props.yearItemNumber : 1,
                ),
              };
            },
            function () {
              return o.handleYearChange(o.state.date);
            },
          );
        }),
        b(D(o), "clearSelectingDate", function () {
          o.setState({ selectingDate: null });
        }),
        b(D(o), "renderPreviousButton", function () {
          if (!o.props.renderCustomHeader) {
            var a;
            switch (!0) {
              case o.props.showMonthYearPicker:
                a = wm(o.state.date, o.props);
                break;
              case o.props.showYearPicker:
                a = (function (g) {
                  var y =
                      arguments.length > 1 && arguments[1] !== void 0
                        ? arguments[1]
                        : {},
                    w = y.minDate,
                    T = y.yearItemNumber,
                    P = T === void 0 ? ri : T,
                    R = Uo(za(_i(g, P)), P).endPeriod,
                    M = w && xe(w);
                  return (M && M > R) || !1;
                })(o.state.date, o.props);
                break;
              default:
                a = vm(o.state.date, o.props);
            }
            if (
              (o.props.forceShowMonthNavigation ||
                o.props.showDisabledMonthNavigation ||
                !a) &&
              !o.props.showTimeSelectOnly
            ) {
              var i = [
                  "react-datepicker__navigation",
                  "react-datepicker__navigation--previous",
                ],
                s = o.decreaseMonth;
              ((o.props.showMonthYearPicker ||
                o.props.showQuarterYearPicker ||
                o.props.showYearPicker) &&
                (s = o.decreaseYear),
                a &&
                  o.props.showDisabledMonthNavigation &&
                  (i.push("react-datepicker__navigation--previous--disabled"),
                  (s = null)));
              var l =
                  o.props.showMonthYearPicker ||
                  o.props.showQuarterYearPicker ||
                  o.props.showYearPicker,
                u = o.props,
                c = u.previousMonthButtonLabel,
                d = u.previousYearButtonLabel,
                m = o.props,
                v = m.previousMonthAriaLabel,
                S =
                  v === void 0
                    ? typeof c == "string"
                      ? c
                      : "Previous Month"
                    : v,
                C = m.previousYearAriaLabel,
                k =
                  C === void 0
                    ? typeof d == "string"
                      ? d
                      : "Previous Year"
                    : C;
              return I.createElement(
                "button",
                {
                  type: "button",
                  className: i.join(" "),
                  onClick: s,
                  onKeyDown: o.props.handleOnKeyDown,
                  "aria-label": l ? k : S,
                },
                I.createElement(
                  "span",
                  {
                    className: [
                      "react-datepicker__navigation-icon",
                      "react-datepicker__navigation-icon--previous",
                    ].join(" "),
                  },
                  l
                    ? o.props.previousYearButtonLabel
                    : o.props.previousMonthButtonLabel,
                ),
              );
            }
          }
        }),
        b(D(o), "increaseYear", function () {
          o.setState(
            function (a) {
              var i = a.date;
              return {
                date: oa(
                  i,
                  o.props.showYearPicker ? o.props.yearItemNumber : 1,
                ),
              };
            },
            function () {
              return o.handleYearChange(o.state.date);
            },
          );
        }),
        b(D(o), "renderNextButton", function () {
          if (!o.props.renderCustomHeader) {
            var a;
            switch (!0) {
              case o.props.showMonthYearPicker:
                a = xm(o.state.date, o.props);
                break;
              case o.props.showYearPicker:
                a = (function (g) {
                  var y =
                      arguments.length > 1 && arguments[1] !== void 0
                        ? arguments[1]
                        : {},
                    w = y.maxDate,
                    T = y.yearItemNumber,
                    P = T === void 0 ? ri : T,
                    R = Uo(oa(g, P), P).startPeriod,
                    M = w && xe(w);
                  return (M && M < R) || !1;
                })(o.state.date, o.props);
                break;
              default:
                a = ym(o.state.date, o.props);
            }
            if (
              (o.props.forceShowMonthNavigation ||
                o.props.showDisabledMonthNavigation ||
                !a) &&
              !o.props.showTimeSelectOnly
            ) {
              var i = [
                "react-datepicker__navigation",
                "react-datepicker__navigation--next",
              ];
              (o.props.showTimeSelect &&
                i.push("react-datepicker__navigation--next--with-time"),
                o.props.todayButton &&
                  i.push(
                    "react-datepicker__navigation--next--with-today-button",
                  ));
              var s = o.increaseMonth;
              ((o.props.showMonthYearPicker ||
                o.props.showQuarterYearPicker ||
                o.props.showYearPicker) &&
                (s = o.increaseYear),
                a &&
                  o.props.showDisabledMonthNavigation &&
                  (i.push("react-datepicker__navigation--next--disabled"),
                  (s = null)));
              var l =
                  o.props.showMonthYearPicker ||
                  o.props.showQuarterYearPicker ||
                  o.props.showYearPicker,
                u = o.props,
                c = u.nextMonthButtonLabel,
                d = u.nextYearButtonLabel,
                m = o.props,
                v = m.nextMonthAriaLabel,
                S =
                  v === void 0 ? (typeof c == "string" ? c : "Next Month") : v,
                C = m.nextYearAriaLabel,
                k = C === void 0 ? (typeof d == "string" ? d : "Next Year") : C;
              return I.createElement(
                "button",
                {
                  type: "button",
                  className: i.join(" "),
                  onClick: s,
                  onKeyDown: o.props.handleOnKeyDown,
                  "aria-label": l ? k : S,
                },
                I.createElement(
                  "span",
                  {
                    className: [
                      "react-datepicker__navigation-icon",
                      "react-datepicker__navigation-icon--next",
                    ].join(" "),
                  },
                  l
                    ? o.props.nextYearButtonLabel
                    : o.props.nextMonthButtonLabel,
                ),
              );
            }
          }
        }),
        b(D(o), "renderCurrentMonth", function () {
          var a =
              arguments.length > 0 && arguments[0] !== void 0
                ? arguments[0]
                : o.state.date,
            i = ["react-datepicker__current-month"];
          return (
            o.props.showYearDropdown &&
              i.push("react-datepicker__current-month--hasYearDropdown"),
            o.props.showMonthDropdown &&
              i.push("react-datepicker__current-month--hasMonthDropdown"),
            o.props.showMonthYearDropdown &&
              i.push("react-datepicker__current-month--hasMonthYearDropdown"),
            I.createElement(
              "div",
              { className: i.join(" ") },
              Qe(a, o.props.dateFormat, o.props.locale),
            )
          );
        }),
        b(D(o), "renderYearDropdown", function () {
          var a =
            arguments.length > 0 && arguments[0] !== void 0 && arguments[0];
          if (o.props.showYearDropdown && !a)
            return I.createElement(bD, {
              adjustDateOnChange: o.props.adjustDateOnChange,
              date: o.state.date,
              onSelect: o.props.onSelect,
              setOpen: o.props.setOpen,
              dropdownMode: o.props.dropdownMode,
              onChange: o.changeYear,
              minDate: o.props.minDate,
              maxDate: o.props.maxDate,
              year: xe(o.state.date),
              scrollableYearDropdown: o.props.scrollableYearDropdown,
              yearDropdownItemNumber: o.props.yearDropdownItemNumber,
            });
        }),
        b(D(o), "renderMonthDropdown", function () {
          var a =
            arguments.length > 0 && arguments[0] !== void 0 && arguments[0];
          if (o.props.showMonthDropdown && !a)
            return I.createElement(TD, {
              dropdownMode: o.props.dropdownMode,
              locale: o.props.locale,
              onChange: o.changeMonth,
              month: Rt(o.state.date),
              useShortMonthInDropdown: o.props.useShortMonthInDropdown,
            });
        }),
        b(D(o), "renderMonthYearDropdown", function () {
          var a =
            arguments.length > 0 && arguments[0] !== void 0 && arguments[0];
          if (o.props.showMonthYearDropdown && !a)
            return I.createElement(OD, {
              dropdownMode: o.props.dropdownMode,
              locale: o.props.locale,
              dateFormat: o.props.dateFormat,
              onChange: o.changeMonthYear,
              minDate: o.props.minDate,
              maxDate: o.props.maxDate,
              date: o.state.date,
              scrollableMonthYearDropdown: o.props.scrollableMonthYearDropdown,
            });
        }),
        b(D(o), "handleTodayButtonClick", function (a) {
          (o.props.onSelect(fm(), a),
            o.props.setPreSelection && o.props.setPreSelection(fm()));
        }),
        b(D(o), "renderTodayButton", function () {
          if (o.props.todayButton && !o.props.showTimeSelectOnly)
            return I.createElement(
              "div",
              {
                className: "react-datepicker__today-button",
                onClick: function (a) {
                  return o.handleTodayButtonClick(a);
                },
              },
              o.props.todayButton,
            );
        }),
        b(D(o), "renderDefaultHeader", function (a) {
          var i = a.monthDate,
            s = a.i;
          return I.createElement(
            "div",
            {
              className: "react-datepicker__header ".concat(
                o.props.showTimeSelect
                  ? "react-datepicker__header--has-time-select"
                  : "",
              ),
            },
            o.renderCurrentMonth(i),
            I.createElement(
              "div",
              {
                className:
                  "react-datepicker__header__dropdown react-datepicker__header__dropdown--".concat(
                    o.props.dropdownMode,
                  ),
                onFocus: o.handleDropdownFocus,
              },
              o.renderMonthDropdown(s !== 0),
              o.renderMonthYearDropdown(s !== 0),
              o.renderYearDropdown(s !== 0),
            ),
            I.createElement(
              "div",
              { className: "react-datepicker__day-names" },
              o.header(i),
            ),
          );
        }),
        b(D(o), "renderCustomHeader", function () {
          var a =
              arguments.length > 0 && arguments[0] !== void 0
                ? arguments[0]
                : {},
            i = a.monthDate,
            s = a.i;
          if (
            (o.props.showTimeSelect && !o.state.monthContainer) ||
            o.props.showTimeSelectOnly
          )
            return null;
          var l = vm(o.state.date, o.props),
            u = ym(o.state.date, o.props),
            c = wm(o.state.date, o.props),
            d = xm(o.state.date, o.props),
            m =
              !o.props.showMonthYearPicker &&
              !o.props.showQuarterYearPicker &&
              !o.props.showYearPicker;
          return I.createElement(
            "div",
            {
              className:
                "react-datepicker__header react-datepicker__header--custom",
              onFocus: o.props.onDropdownFocus,
            },
            o.props.renderCustomHeader(
              Dl(
                Dl({}, o.state),
                {},
                {
                  customHeaderCount: s,
                  monthDate: i,
                  changeMonth: o.changeMonth,
                  changeYear: o.changeYear,
                  decreaseMonth: o.decreaseMonth,
                  increaseMonth: o.increaseMonth,
                  decreaseYear: o.decreaseYear,
                  increaseYear: o.increaseYear,
                  prevMonthButtonDisabled: l,
                  nextMonthButtonDisabled: u,
                  prevYearButtonDisabled: c,
                  nextYearButtonDisabled: d,
                },
              ),
            ),
            m &&
              I.createElement(
                "div",
                { className: "react-datepicker__day-names" },
                o.header(i),
              ),
          );
        }),
        b(D(o), "renderYearHeader", function () {
          var a = o.state.date,
            i = o.props,
            s = i.showYearPicker,
            l = Uo(a, i.yearItemNumber),
            u = l.startPeriod,
            c = l.endPeriod;
          return I.createElement(
            "div",
            {
              className:
                "react-datepicker__header react-datepicker-year-header",
            },
            s ? "".concat(u, " - ").concat(c) : xe(a),
          );
        }),
        b(D(o), "renderHeader", function (a) {
          switch (!0) {
            case o.props.renderCustomHeader !== void 0:
              return o.renderCustomHeader(a);
            case o.props.showMonthYearPicker ||
              o.props.showQuarterYearPicker ||
              o.props.showYearPicker:
              return o.renderYearHeader(a);
            default:
              return o.renderDefaultHeader(a);
          }
        }),
        b(D(o), "renderMonths", function () {
          var a;
          if (!o.props.showTimeSelectOnly && !o.props.showYearPicker) {
            for (
              var i = [],
                s = o.props.showPreviousMonths ? o.props.monthsShown - 1 : 0,
                l = aa(o.state.date, s),
                u =
                  (a = o.props.monthSelectedIn) !== null && a !== void 0
                    ? a
                    : s,
                c = 0;
              c < o.props.monthsShown;
              ++c
            ) {
              var d = Dr(l, c - u + s),
                m = "month-".concat(c),
                v = c < o.props.monthsShown - 1,
                S = c > 0;
              i.push(
                I.createElement(
                  "div",
                  {
                    key: m,
                    ref: function (C) {
                      o.monthContainer = C;
                    },
                    className: "react-datepicker__month-container",
                  },
                  o.renderHeader({ monthDate: d, i: c }),
                  I.createElement(jD, {
                    chooseDayAriaLabelPrefix: o.props.chooseDayAriaLabelPrefix,
                    disabledDayAriaLabelPrefix:
                      o.props.disabledDayAriaLabelPrefix,
                    weekAriaLabelPrefix: o.props.weekAriaLabelPrefix,
                    ariaLabelPrefix: o.props.monthAriaLabelPrefix,
                    onChange: o.changeMonthYear,
                    day: d,
                    dayClassName: o.props.dayClassName,
                    calendarStartDay: o.props.calendarStartDay,
                    monthClassName: o.props.monthClassName,
                    onDayClick: o.handleDayClick,
                    handleOnKeyDown: o.props.handleOnDayKeyDown,
                    onDayMouseEnter: o.handleDayMouseEnter,
                    onMouseLeave: o.handleMonthMouseLeave,
                    onWeekSelect: o.props.onWeekSelect,
                    orderInDisplay: c,
                    formatWeekNumber: o.props.formatWeekNumber,
                    locale: o.props.locale,
                    minDate: o.props.minDate,
                    maxDate: o.props.maxDate,
                    excludeDates: o.props.excludeDates,
                    excludeDateIntervals: o.props.excludeDateIntervals,
                    highlightDates: o.props.highlightDates,
                    holidays: o.props.holidays,
                    selectingDate: o.state.selectingDate,
                    includeDates: o.props.includeDates,
                    includeDateIntervals: o.props.includeDateIntervals,
                    inline: o.props.inline,
                    shouldFocusDayInline: o.props.shouldFocusDayInline,
                    fixedHeight: o.props.fixedHeight,
                    filterDate: o.props.filterDate,
                    preSelection: o.props.preSelection,
                    setPreSelection: o.props.setPreSelection,
                    selected: o.props.selected,
                    selectsStart: o.props.selectsStart,
                    selectsEnd: o.props.selectsEnd,
                    selectsRange: o.props.selectsRange,
                    selectsDisabledDaysInRange:
                      o.props.selectsDisabledDaysInRange,
                    showWeekNumbers: o.props.showWeekNumbers,
                    startDate: o.props.startDate,
                    endDate: o.props.endDate,
                    peekNextMonth: o.props.peekNextMonth,
                    setOpen: o.props.setOpen,
                    shouldCloseOnSelect: o.props.shouldCloseOnSelect,
                    renderDayContents: o.props.renderDayContents,
                    renderMonthContent: o.props.renderMonthContent,
                    renderQuarterContent: o.props.renderQuarterContent,
                    renderYearContent: o.props.renderYearContent,
                    disabledKeyboardNavigation:
                      o.props.disabledKeyboardNavigation,
                    showMonthYearPicker: o.props.showMonthYearPicker,
                    showFullMonthYearPicker: o.props.showFullMonthYearPicker,
                    showTwoColumnMonthYearPicker:
                      o.props.showTwoColumnMonthYearPicker,
                    showFourColumnMonthYearPicker:
                      o.props.showFourColumnMonthYearPicker,
                    showYearPicker: o.props.showYearPicker,
                    showQuarterYearPicker: o.props.showQuarterYearPicker,
                    showWeekPicker: o.props.showWeekPicker,
                    isInputFocused: o.props.isInputFocused,
                    containerRef: o.containerRef,
                    monthShowsDuplicateDaysEnd: v,
                    monthShowsDuplicateDaysStart: S,
                  }),
                ),
              );
            }
            return i;
          }
        }),
        b(D(o), "renderYears", function () {
          if (!o.props.showTimeSelectOnly)
            return o.props.showYearPicker
              ? I.createElement(
                  "div",
                  { className: "react-datepicker__year--container" },
                  o.renderHeader(),
                  I.createElement(
                    LD,
                    ca(
                      {
                        onDayClick: o.handleDayClick,
                        selectingDate: o.state.selectingDate,
                        clearSelectingDate: o.clearSelectingDate,
                        date: o.state.date,
                      },
                      o.props,
                      {
                        onYearMouseEnter: o.handleYearMouseEnter,
                        onYearMouseLeave: o.handleYearMouseLeave,
                      },
                    ),
                  ),
                )
              : void 0;
        }),
        b(D(o), "renderTimeSection", function () {
          if (
            o.props.showTimeSelect &&
            (o.state.monthContainer || o.props.showTimeSelectOnly)
          )
            return I.createElement(P0, {
              selected: o.props.selected,
              openToDate: o.props.openToDate,
              onChange: o.props.onTimeChange,
              timeClassName: o.props.timeClassName,
              format: o.props.timeFormat,
              includeTimes: o.props.includeTimes,
              intervals: o.props.timeIntervals,
              minTime: o.props.minTime,
              maxTime: o.props.maxTime,
              excludeTimes: o.props.excludeTimes,
              filterTime: o.props.filterTime,
              timeCaption: o.props.timeCaption,
              todayButton: o.props.todayButton,
              showMonthDropdown: o.props.showMonthDropdown,
              showMonthYearDropdown: o.props.showMonthYearDropdown,
              showYearDropdown: o.props.showYearDropdown,
              withPortal: o.props.withPortal,
              monthRef: o.state.monthContainer,
              injectTimes: o.props.injectTimes,
              locale: o.props.locale,
              handleOnKeyDown: o.props.handleOnKeyDown,
              showTimeSelectOnly: o.props.showTimeSelectOnly,
            });
        }),
        b(D(o), "renderInputTimeSection", function () {
          var a = new Date(o.props.selected),
            i =
              mn(a) && o.props.selected
                ? "".concat(Cm(a.getHours()), ":").concat(Cm(a.getMinutes()))
                : "";
          if (o.props.showTimeInput)
            return I.createElement(AD, {
              date: a,
              timeString: i,
              timeInputLabel: o.props.timeInputLabel,
              onChange: o.props.onTimeChange,
              customTimeInput: o.props.customTimeInput,
            });
        }),
        b(D(o), "renderAriaLiveRegion", function () {
          var a,
            i = Uo(o.state.date, o.props.yearItemNumber),
            s = i.startPeriod,
            l = i.endPeriod;
          return (
            (a = o.props.showYearPicker
              ? "".concat(s, " - ").concat(l)
              : o.props.showMonthYearPicker || o.props.showQuarterYearPicker
                ? xe(o.state.date)
                : ""
                    .concat(rf(Rt(o.state.date), o.props.locale), " ")
                    .concat(xe(o.state.date))),
            I.createElement(
              "span",
              {
                role: "alert",
                "aria-live": "polite",
                className: "react-datepicker__aria-live",
              },
              o.state.isRenderAriaLiveMessage && a,
            )
          );
        }),
        b(D(o), "renderChildren", function () {
          if (o.props.children)
            return I.createElement(
              "div",
              { className: "react-datepicker__children-container" },
              o.props.children,
            );
        }),
        (o.containerRef = I.createRef()),
        (o.state = {
          date: o.getDateInView(),
          selectingDate: null,
          monthContainer: null,
          isRenderAriaLiveMessage: !1,
        }),
        o
      );
    }
    return (
      gt(
        r,
        [
          {
            key: "componentDidMount",
            value: function () {
              var n = this;
              this.props.showTimeSelect &&
                (this.assignMonthContainer = void n.setState({
                  monthContainer: n.monthContainer,
                }));
            },
          },
          {
            key: "componentDidUpdate",
            value: function (n) {
              var o = this;
              if (
                !this.props.preSelection ||
                ($e(this.props.preSelection, n.preSelection) &&
                  this.props.monthSelectedIn === n.monthSelectedIn)
              )
                this.props.openToDate &&
                  !$e(this.props.openToDate, n.openToDate) &&
                  this.setState({ date: this.props.openToDate });
              else {
                var a = !Cr(this.state.date, this.props.preSelection);
                this.setState({ date: this.props.preSelection }, function () {
                  return a && o.handleCustomMonthChange(o.state.date);
                });
              }
            },
          },
          {
            key: "render",
            value: function () {
              var n = this.props.container || FD;
              return I.createElement(
                "div",
                { style: { display: "contents" }, ref: this.containerRef },
                I.createElement(
                  n,
                  {
                    className: Ct("react-datepicker", this.props.className, {
                      "react-datepicker--time-only":
                        this.props.showTimeSelectOnly,
                    }),
                    showPopperArrow: this.props.showPopperArrow,
                    arrowProps: this.props.arrowProps,
                  },
                  this.renderAriaLiveRegion(),
                  this.renderPreviousButton(),
                  this.renderNextButton(),
                  this.renderMonths(),
                  this.renderYears(),
                  this.renderTodayButton(),
                  this.renderTimeSection(),
                  this.renderInputTimeSection(),
                  this.renderChildren(),
                ),
              );
            },
          },
        ],
        [
          {
            key: "defaultProps",
            get: function () {
              return {
                onDropdownFocus: function () {},
                monthsShown: 1,
                forceShowMonthNavigation: !1,
                timeCaption: "Time",
                previousYearButtonLabel: "Previous Year",
                nextYearButtonLabel: "Next Year",
                previousMonthButtonLabel: "Previous Month",
                nextMonthButtonLabel: "Next Month",
                customTimeInput: null,
                yearItemNumber: ri,
              };
            },
          },
        ],
      ),
      r
    );
  })(),
  $D = function (e) {
    var t = e.icon,
      r = e.className,
      n = r === void 0 ? "" : r,
      o = e.onClick,
      a = "react-datepicker__calendar-icon";
    return I.isValidElement(t)
      ? I.cloneElement(t, {
          className: ""
            .concat(t.props.className || "", " ")
            .concat(a, " ")
            .concat(n),
          onClick: function (i) {
            (typeof t.props.onClick == "function" && t.props.onClick(i),
              typeof o == "function" && o(i));
          },
        })
      : typeof t == "string"
        ? I.createElement("i", {
            className: "".concat(a, " ").concat(t, " ").concat(n),
            "aria-hidden": "true",
            onClick: o,
          })
        : I.createElement(
            "svg",
            {
              className: "".concat(a, " ").concat(n),
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 448 512",
              onClick: o,
            },
            I.createElement("path", {
              d: "M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z",
            }),
          );
  },
  R0 = (function (e) {
    vt(r, I.Component);
    var t = yt(r);
    function r(n) {
      var o;
      return (
        mt(this, r),
        ((o = t.call(this, n)).el = document.createElement("div")),
        o
      );
    }
    return (
      gt(r, [
        {
          key: "componentDidMount",
          value: function () {
            ((this.portalRoot = (
              this.props.portalHost || document
            ).getElementById(this.props.portalId)),
              this.portalRoot ||
                ((this.portalRoot = document.createElement("div")),
                this.portalRoot.setAttribute("id", this.props.portalId),
                (this.props.portalHost || document.body).appendChild(
                  this.portalRoot,
                )),
              this.portalRoot.appendChild(this.el));
          },
        },
        {
          key: "componentWillUnmount",
          value: function () {
            this.portalRoot.removeChild(this.el);
          },
        },
        {
          key: "render",
          value: function () {
            return ES.createPortal(this.props.children, this.el);
          },
        },
      ]),
      r
    );
  })(),
  YD = function (e) {
    return !e.disabled && e.tabIndex !== -1;
  },
  O0 = (function (e) {
    vt(r, I.Component);
    var t = yt(r);
    function r(n) {
      var o;
      return (
        mt(this, r),
        b(D((o = t.call(this, n))), "getTabChildren", function () {
          return Array.prototype.slice
            .call(
              o.tabLoopRef.current.querySelectorAll(
                "[tabindex], a, button, input, select, textarea",
              ),
              1,
              -1,
            )
            .filter(YD);
        }),
        b(D(o), "handleFocusStart", function () {
          var a = o.getTabChildren();
          a && a.length > 1 && a[a.length - 1].focus();
        }),
        b(D(o), "handleFocusEnd", function () {
          var a = o.getTabChildren();
          a && a.length > 1 && a[0].focus();
        }),
        (o.tabLoopRef = I.createRef()),
        o
      );
    }
    return (
      gt(
        r,
        [
          {
            key: "render",
            value: function () {
              return this.props.enableTabLoop
                ? I.createElement(
                    "div",
                    {
                      className: "react-datepicker__tab-loop",
                      ref: this.tabLoopRef,
                    },
                    I.createElement("div", {
                      className: "react-datepicker__tab-loop__start",
                      tabIndex: "0",
                      onFocus: this.handleFocusStart,
                    }),
                    this.props.children,
                    I.createElement("div", {
                      className: "react-datepicker__tab-loop__end",
                      tabIndex: "0",
                      onFocus: this.handleFocusEnd,
                    }),
                  )
                : this.props.children;
            },
          },
        ],
        [
          {
            key: "defaultProps",
            get: function () {
              return { enableTabLoop: !0 };
            },
          },
        ],
      ),
      r
    );
  })(),
  zD = (function (e) {
    vt(r, I.Component);
    var t = yt(r);
    function r() {
      return (mt(this, r), t.apply(this, arguments));
    }
    return (
      gt(
        r,
        [
          {
            key: "render",
            value: function () {
              var n,
                o = this.props,
                a = o.className,
                i = o.wrapperClassName,
                s = o.hidePopper,
                l = o.popperComponent,
                u = o.popperModifiers,
                c = o.popperPlacement,
                d = o.popperProps,
                m = o.targetComponent,
                v = o.enableTabLoop,
                S = o.popperOnKeyDown,
                C = o.portalId,
                k = o.portalHost;
              if (!s) {
                var g = Ct("react-datepicker-popper", a);
                n = I.createElement(
                  fD,
                  ca({ modifiers: u, placement: c }, d),
                  function (w) {
                    var T = w.ref,
                      P = w.style,
                      R = w.placement,
                      M = w.arrowProps;
                    return I.createElement(
                      O0,
                      { enableTabLoop: v },
                      I.createElement(
                        "div",
                        {
                          ref: T,
                          style: P,
                          className: g,
                          "data-placement": R,
                          onKeyDown: S,
                        },
                        I.cloneElement(l, { arrowProps: M }),
                      ),
                    );
                  },
                );
              }
              (this.props.popperContainer &&
                (n = I.createElement(this.props.popperContainer, {}, n)),
                C &&
                  !s &&
                  (n = I.createElement(R0, { portalId: C, portalHost: k }, n)));
              var y = Ct("react-datepicker-wrapper", i);
              return I.createElement(
                K_,
                { className: "react-datepicker-manager" },
                I.createElement(vD, null, function (w) {
                  var T = w.ref;
                  return I.createElement("div", { ref: T, className: y }, m);
                }),
                n,
              );
            },
          },
        ],
        [
          {
            key: "defaultProps",
            get: function () {
              return {
                hidePopper: !0,
                popperModifiers: [],
                popperProps: {},
                popperPlacement: "bottom-start",
              };
            },
          },
        ],
      ),
      r
    );
  })(),
  _m = "react-datepicker-ignore-onclickoutside",
  HD = au(UD),
  tc = "Date input not valid.",
  co = (function (e) {
    vt(r, I.Component);
    var t = yt(r);
    function r(n) {
      var o;
      return (
        mt(this, r),
        b(D((o = t.call(this, n))), "getPreSelection", function () {
          return o.props.openToDate
            ? o.props.openToDate
            : o.props.selectsEnd && o.props.startDate
              ? o.props.startDate
              : o.props.selectsStart && o.props.endDate
                ? o.props.endDate
                : Be();
        }),
        b(D(o), "modifyHolidays", function () {
          var a;
          return (a = o.props.holidays) === null || a === void 0
            ? void 0
            : a.reduce(function (i, s) {
                var l = new Date(s.date);
                return Ei(l)
                  ? [].concat(Pi(i), [Dl(Dl({}, s), {}, { date: l })])
                  : i;
              }, []);
        }),
        b(D(o), "calcInitialState", function () {
          var a,
            i = o.getPreSelection(),
            s = E0(o.props),
            l = _0(o.props),
            u = s && xn(i, Yr(s)) ? s : l && jn(i, gd(l)) ? l : i;
          return {
            open: o.props.startOpen || !1,
            preventFocus: !1,
            preSelection:
              (a = o.props.selectsRange
                ? o.props.startDate
                : o.props.selected) !== null && a !== void 0
                ? a
                : u,
            highlightDates: Sm(o.props.highlightDates),
            focused: !1,
            shouldFocusDayInline: !1,
            isRenderAriaLiveMessage: !1,
          };
        }),
        b(D(o), "clearPreventFocusTimeout", function () {
          o.preventFocusTimeout && clearTimeout(o.preventFocusTimeout);
        }),
        b(D(o), "setFocus", function () {
          o.input && o.input.focus && o.input.focus({ preventScroll: !0 });
        }),
        b(D(o), "setBlur", function () {
          (o.input && o.input.blur && o.input.blur(), o.cancelFocusInput());
        }),
        b(D(o), "setOpen", function (a) {
          var i =
            arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
          o.setState(
            {
              open: a,
              preSelection:
                a && o.state.open
                  ? o.state.preSelection
                  : o.calcInitialState().preSelection,
              lastPreSelectChange: rc,
            },
            function () {
              a ||
                o.setState(
                  function (s) {
                    return { focused: !!i && s.focused };
                  },
                  function () {
                    (!i && o.setBlur(), o.setState({ inputValue: null }));
                  },
                );
            },
          );
        }),
        b(D(o), "inputOk", function () {
          return ou(o.state.preSelection);
        }),
        b(D(o), "isCalendarOpen", function () {
          return o.props.open === void 0
            ? o.state.open && !o.props.disabled && !o.props.readOnly
            : o.props.open;
        }),
        b(D(o), "handleFocus", function (a) {
          (o.state.preventFocus ||
            (o.props.onFocus(a),
            o.props.preventOpenOnFocus || o.props.readOnly || o.setOpen(!0)),
            o.setState({ focused: !0 }));
        }),
        b(D(o), "sendFocusBackToInput", function () {
          (o.preventFocusTimeout && o.clearPreventFocusTimeout(),
            o.setState({ preventFocus: !0 }, function () {
              o.preventFocusTimeout = setTimeout(function () {
                (o.setFocus(), o.setState({ preventFocus: !1 }));
              });
            }));
        }),
        b(D(o), "cancelFocusInput", function () {
          (clearTimeout(o.inputFocusTimeout), (o.inputFocusTimeout = null));
        }),
        b(D(o), "deferFocusInput", function () {
          (o.cancelFocusInput(),
            (o.inputFocusTimeout = setTimeout(function () {
              return o.setFocus();
            }, 1)));
        }),
        b(D(o), "handleDropdownFocus", function () {
          o.cancelFocusInput();
        }),
        b(D(o), "handleBlur", function (a) {
          ((!o.state.open || o.props.withPortal || o.props.showTimeInput) &&
            o.props.onBlur(a),
            o.setState({ focused: !1 }));
        }),
        b(D(o), "handleCalendarClickOutside", function (a) {
          (o.props.inline || o.setOpen(!1),
            o.props.onClickOutside(a),
            o.props.withPortal && a.preventDefault());
        }),
        b(D(o), "handleChange", function () {
          for (var a = arguments.length, i = new Array(a), s = 0; s < a; s++)
            i[s] = arguments[s];
          var l = i[0];
          if (
            !o.props.onChangeRaw ||
            (o.props.onChangeRaw.apply(D(o), i),
            typeof l.isDefaultPrevented == "function" &&
              !l.isDefaultPrevented())
          ) {
            o.setState({ inputValue: l.target.value, lastPreSelectChange: WD });
            var u,
              c,
              d,
              m,
              v,
              S,
              C,
              k,
              g =
                ((u = l.target.value),
                (c = o.props.dateFormat),
                (d = o.props.locale),
                (m = o.props.strictParsing),
                (v = o.props.minDate),
                (S = null),
                (C = to(d) || to(eo())),
                (k = !0),
                Array.isArray(c)
                  ? (c.forEach(function (y) {
                      var w = qu(u, y, new Date(), { locale: C });
                      (m && (k = mn(w, v) && u === Qe(w, y, d)),
                        mn(w, v) && k && (S = w));
                    }),
                    S)
                  : ((S = qu(u, c, new Date(), { locale: C })),
                    m
                      ? (k = mn(S) && u === Qe(S, c, d))
                      : mn(S) ||
                        ((c = c
                          .match(xD)
                          .map(function (y) {
                            var w = y[0];
                            return w === "p" || w === "P"
                              ? C
                                ? (0, wD[w])(y, C.formatLong)
                                : w
                              : y;
                          })
                          .join("")),
                        u.length > 0 &&
                          (S = qu(u, c.slice(0, u.length), new Date())),
                        mn(S) || (S = new Date(u))),
                    mn(S) && k ? S : null));
            (o.props.showTimeSelectOnly &&
              o.props.selected &&
              g &&
              !$e(g, o.props.selected) &&
              (g = yD(o.props.selected, {
                hours: $r(g),
                minutes: Ur(g),
                seconds: Yh(g),
              })),
              (!g && l.target.value) ||
                (o.props.showWeekPicker &&
                  (g = Hr(g, o.props.locale, o.props.calendarStartDay)),
                o.setSelected(g, l, !0)));
          }
        }),
        b(D(o), "handleSelect", function (a, i, s) {
          if (
            (o.props.shouldCloseOnSelect &&
              !o.props.showTimeSelect &&
              o.sendFocusBackToInput(),
            o.props.onChangeRaw && o.props.onChangeRaw(i),
            o.props.showWeekPicker &&
              (a = Hr(a, o.props.locale, o.props.calendarStartDay)),
            o.setSelected(a, i, !1, s),
            o.props.showDateSelect &&
              o.setState({ isRenderAriaLiveMessage: !0 }),
            !o.props.shouldCloseOnSelect || o.props.showTimeSelect)
          )
            o.setPreSelection(a);
          else if (!o.props.inline) {
            o.props.selectsRange || o.setOpen(!1);
            var l = o.props,
              u = l.startDate,
              c = l.endDate;
            !u || c || xn(a, u) || o.setOpen(!1);
          }
        }),
        b(D(o), "setSelected", function (a, i, s, l) {
          var u = a;
          if (o.props.showYearPicker) {
            if (u !== null && k0(xe(u), o.props)) return;
          } else if (o.props.showMonthYearPicker) {
            if (u !== null && C0(u, o.props)) return;
          } else if (u !== null && su(u, o.props)) return;
          var c = o.props,
            d = c.onChange,
            m = c.selectsRange,
            v = c.startDate,
            S = c.endDate;
          if (!Kn(o.props.selected, u) || o.props.allowSameDay || m)
            if (
              (u !== null &&
                (!o.props.selected ||
                  (s &&
                    (o.props.showTimeSelect ||
                      o.props.showTimeSelectOnly ||
                      o.props.showTimeInput)) ||
                  (u = dm(u, {
                    hour: $r(o.props.selected),
                    minute: Ur(o.props.selected),
                    second: Yh(o.props.selected),
                  })),
                o.props.inline || o.setState({ preSelection: u }),
                o.props.focusSelectedMonth ||
                  o.setState({ monthSelectedIn: l })),
              m)
            ) {
              var C = v && !S,
                k = v && S;
              (!v && !S
                ? d([u, null], i)
                : C && (xn(u, v) ? d([u, null], i) : d([v, u], i)),
                k && d([u, null], i));
            } else d(u, i);
          s || (o.props.onSelect(u, i), o.setState({ inputValue: null }));
        }),
        b(D(o), "setPreSelection", function (a) {
          var i = o.props.minDate !== void 0,
            s = o.props.maxDate !== void 0,
            l = !0;
          if (a) {
            o.props.showWeekPicker &&
              (a = Hr(a, o.props.locale, o.props.calendarStartDay));
            var u = Yr(a);
            if (i && s) l = Is(a, o.props.minDate, o.props.maxDate);
            else if (i) {
              var c = Yr(o.props.minDate);
              l = jn(a, c) || Kn(u, c);
            } else if (s) {
              var d = gd(o.props.maxDate);
              l = xn(a, d) || Kn(u, d);
            }
          }
          l && o.setState({ preSelection: a });
        }),
        b(D(o), "toggleCalendar", function () {
          o.setOpen(!o.state.open);
        }),
        b(D(o), "handleTimeChange", function (a) {
          var i = o.props.selected ? o.props.selected : o.getPreSelection(),
            s = o.props.selected ? a : dm(i, { hour: $r(a), minute: Ur(a) });
          (o.setState({ preSelection: s }),
            o.props.onChange(s),
            o.props.shouldCloseOnSelect &&
              (o.sendFocusBackToInput(), o.setOpen(!1)),
            o.props.showTimeInput && o.setOpen(!0),
            (o.props.showTimeSelectOnly || o.props.showTimeSelect) &&
              o.setState({ isRenderAriaLiveMessage: !0 }),
            o.setState({ inputValue: null }));
        }),
        b(D(o), "onInputClick", function () {
          (o.props.disabled || o.props.readOnly || o.setOpen(!0),
            o.props.onInputClick());
        }),
        b(D(o), "onInputKeyDown", function (a) {
          o.props.onKeyDown(a);
          var i = a.key;
          if (o.state.open || o.props.inline || o.props.preventOpenOnFocus) {
            if (o.state.open) {
              if (i === "ArrowDown" || i === "ArrowUp") {
                a.preventDefault();
                var s =
                    o.props.showWeekPicker && o.props.showWeekNumbers
                      ? '.react-datepicker__week-number[tabindex="0"]'
                      : '.react-datepicker__day[tabindex="0"]',
                  l =
                    o.calendar.componentNode &&
                    o.calendar.componentNode.querySelector(s);
                return void (l && l.focus({ preventScroll: !0 }));
              }
              var u = Be(o.state.preSelection);
              (i === "Enter"
                ? (a.preventDefault(),
                  o.inputOk() && o.state.lastPreSelectChange === rc
                    ? (o.handleSelect(u, a),
                      !o.props.shouldCloseOnSelect && o.setPreSelection(u))
                    : o.setOpen(!1))
                : i === "Escape"
                  ? (a.preventDefault(),
                    o.sendFocusBackToInput(),
                    o.setOpen(!1))
                  : i === "Tab" && o.setOpen(!1),
                o.inputOk() || o.props.onInputError({ code: 1, msg: tc }));
            }
          } else
            (i !== "ArrowDown" && i !== "ArrowUp" && i !== "Enter") ||
              o.onInputClick();
        }),
        b(D(o), "onPortalKeyDown", function (a) {
          a.key === "Escape" &&
            (a.preventDefault(),
            o.setState({ preventFocus: !0 }, function () {
              (o.setOpen(!1),
                setTimeout(function () {
                  (o.setFocus(), o.setState({ preventFocus: !1 }));
                }));
            }));
        }),
        b(D(o), "onDayKeyDown", function (a) {
          o.props.onKeyDown(a);
          var i = a.key,
            s = Be(o.state.preSelection);
          if (i === "Enter")
            (a.preventDefault(),
              o.handleSelect(s, a),
              !o.props.shouldCloseOnSelect && o.setPreSelection(s));
          else if (i === "Escape")
            (a.preventDefault(),
              o.setOpen(!1),
              o.inputOk() || o.props.onInputError({ code: 1, msg: tc }));
          else if (!o.props.disabledKeyboardNavigation) {
            var l;
            switch (i) {
              case "ArrowLeft":
                l = o.props.showWeekPicker ? $h(s, 1) : sE(s, 1);
                break;
              case "ArrowRight":
                l = o.props.showWeekPicker ? wl(s, 1) : xa(s, 1);
                break;
              case "ArrowUp":
                l = $h(s, 1);
                break;
              case "ArrowDown":
                l = wl(s, 1);
                break;
              case "PageUp":
                l = aa(s, 1);
                break;
              case "PageDown":
                l = Dr(s, 1);
                break;
              case "Home":
                l = _i(s, 1);
                break;
              case "End":
                l = oa(s, 1);
                break;
              default:
                l = null;
            }
            if (!l)
              return void (
                o.props.onInputError &&
                o.props.onInputError({ code: 1, msg: tc })
              );
            if (
              (a.preventDefault(),
              o.setState({ lastPreSelectChange: rc }),
              o.props.adjustDateOnChange && o.setSelected(l),
              o.setPreSelection(l),
              o.props.inline)
            ) {
              var u = Rt(s),
                c = Rt(l),
                d = xe(s),
                m = xe(l);
              u !== c || d !== m
                ? o.setState({ shouldFocusDayInline: !0 })
                : o.setState({ shouldFocusDayInline: !1 });
            }
          }
        }),
        b(D(o), "onPopperKeyDown", function (a) {
          a.key === "Escape" && (a.preventDefault(), o.sendFocusBackToInput());
        }),
        b(D(o), "onClearClick", function (a) {
          (a && a.preventDefault && a.preventDefault(),
            o.sendFocusBackToInput(),
            o.props.selectsRange
              ? o.props.onChange([null, null], a)
              : o.props.onChange(null, a),
            o.setState({ inputValue: null }));
        }),
        b(D(o), "clear", function () {
          o.onClearClick();
        }),
        b(D(o), "onScroll", function (a) {
          typeof o.props.closeOnScroll == "boolean" && o.props.closeOnScroll
            ? (a.target !== document &&
                a.target !== document.documentElement &&
                a.target !== document.body) ||
              o.setOpen(!1)
            : typeof o.props.closeOnScroll == "function" &&
              o.props.closeOnScroll(a) &&
              o.setOpen(!1);
        }),
        b(D(o), "renderCalendar", function () {
          return o.props.inline || o.isCalendarOpen()
            ? I.createElement(
                HD,
                {
                  ref: function (a) {
                    o.calendar = a;
                  },
                  locale: o.props.locale,
                  calendarStartDay: o.props.calendarStartDay,
                  chooseDayAriaLabelPrefix: o.props.chooseDayAriaLabelPrefix,
                  disabledDayAriaLabelPrefix:
                    o.props.disabledDayAriaLabelPrefix,
                  weekAriaLabelPrefix: o.props.weekAriaLabelPrefix,
                  monthAriaLabelPrefix: o.props.monthAriaLabelPrefix,
                  adjustDateOnChange: o.props.adjustDateOnChange,
                  setOpen: o.setOpen,
                  shouldCloseOnSelect: o.props.shouldCloseOnSelect,
                  dateFormat: o.props.dateFormatCalendar,
                  useWeekdaysShort: o.props.useWeekdaysShort,
                  formatWeekDay: o.props.formatWeekDay,
                  dropdownMode: o.props.dropdownMode,
                  selected: o.props.selected,
                  preSelection: o.state.preSelection,
                  onSelect: o.handleSelect,
                  onWeekSelect: o.props.onWeekSelect,
                  openToDate: o.props.openToDate,
                  minDate: o.props.minDate,
                  maxDate: o.props.maxDate,
                  selectsStart: o.props.selectsStart,
                  selectsEnd: o.props.selectsEnd,
                  selectsRange: o.props.selectsRange,
                  startDate: o.props.startDate,
                  endDate: o.props.endDate,
                  excludeDates: o.props.excludeDates,
                  excludeDateIntervals: o.props.excludeDateIntervals,
                  filterDate: o.props.filterDate,
                  onClickOutside: o.handleCalendarClickOutside,
                  formatWeekNumber: o.props.formatWeekNumber,
                  highlightDates: o.state.highlightDates,
                  holidays: CD(o.modifyHolidays()),
                  includeDates: o.props.includeDates,
                  includeDateIntervals: o.props.includeDateIntervals,
                  includeTimes: o.props.includeTimes,
                  injectTimes: o.props.injectTimes,
                  inline: o.props.inline,
                  shouldFocusDayInline: o.state.shouldFocusDayInline,
                  peekNextMonth: o.props.peekNextMonth,
                  showMonthDropdown: o.props.showMonthDropdown,
                  showPreviousMonths: o.props.showPreviousMonths,
                  useShortMonthInDropdown: o.props.useShortMonthInDropdown,
                  showMonthYearDropdown: o.props.showMonthYearDropdown,
                  showWeekNumbers: o.props.showWeekNumbers,
                  showYearDropdown: o.props.showYearDropdown,
                  withPortal: o.props.withPortal,
                  forceShowMonthNavigation: o.props.forceShowMonthNavigation,
                  showDisabledMonthNavigation:
                    o.props.showDisabledMonthNavigation,
                  scrollableYearDropdown: o.props.scrollableYearDropdown,
                  scrollableMonthYearDropdown:
                    o.props.scrollableMonthYearDropdown,
                  todayButton: o.props.todayButton,
                  weekLabel: o.props.weekLabel,
                  outsideClickIgnoreClass: _m,
                  fixedHeight: o.props.fixedHeight,
                  monthsShown: o.props.monthsShown,
                  monthSelectedIn: o.state.monthSelectedIn,
                  onDropdownFocus: o.handleDropdownFocus,
                  onMonthChange: o.props.onMonthChange,
                  onYearChange: o.props.onYearChange,
                  dayClassName: o.props.dayClassName,
                  weekDayClassName: o.props.weekDayClassName,
                  monthClassName: o.props.monthClassName,
                  timeClassName: o.props.timeClassName,
                  showDateSelect: o.props.showDateSelect,
                  showTimeSelect: o.props.showTimeSelect,
                  showTimeSelectOnly: o.props.showTimeSelectOnly,
                  onTimeChange: o.handleTimeChange,
                  timeFormat: o.props.timeFormat,
                  timeIntervals: o.props.timeIntervals,
                  minTime: o.props.minTime,
                  maxTime: o.props.maxTime,
                  excludeTimes: o.props.excludeTimes,
                  filterTime: o.props.filterTime,
                  timeCaption: o.props.timeCaption,
                  className: o.props.calendarClassName,
                  container: o.props.calendarContainer,
                  yearItemNumber: o.props.yearItemNumber,
                  yearDropdownItemNumber: o.props.yearDropdownItemNumber,
                  previousMonthAriaLabel: o.props.previousMonthAriaLabel,
                  previousMonthButtonLabel: o.props.previousMonthButtonLabel,
                  nextMonthAriaLabel: o.props.nextMonthAriaLabel,
                  nextMonthButtonLabel: o.props.nextMonthButtonLabel,
                  previousYearAriaLabel: o.props.previousYearAriaLabel,
                  previousYearButtonLabel: o.props.previousYearButtonLabel,
                  nextYearAriaLabel: o.props.nextYearAriaLabel,
                  nextYearButtonLabel: o.props.nextYearButtonLabel,
                  timeInputLabel: o.props.timeInputLabel,
                  disabledKeyboardNavigation:
                    o.props.disabledKeyboardNavigation,
                  renderCustomHeader: o.props.renderCustomHeader,
                  popperProps: o.props.popperProps,
                  renderDayContents: o.props.renderDayContents,
                  renderMonthContent: o.props.renderMonthContent,
                  renderQuarterContent: o.props.renderQuarterContent,
                  renderYearContent: o.props.renderYearContent,
                  onDayMouseEnter: o.props.onDayMouseEnter,
                  onMonthMouseLeave: o.props.onMonthMouseLeave,
                  onYearMouseEnter: o.props.onYearMouseEnter,
                  onYearMouseLeave: o.props.onYearMouseLeave,
                  selectsDisabledDaysInRange:
                    o.props.selectsDisabledDaysInRange,
                  showTimeInput: o.props.showTimeInput,
                  showMonthYearPicker: o.props.showMonthYearPicker,
                  showFullMonthYearPicker: o.props.showFullMonthYearPicker,
                  showTwoColumnMonthYearPicker:
                    o.props.showTwoColumnMonthYearPicker,
                  showFourColumnMonthYearPicker:
                    o.props.showFourColumnMonthYearPicker,
                  showYearPicker: o.props.showYearPicker,
                  showQuarterYearPicker: o.props.showQuarterYearPicker,
                  showWeekPicker: o.props.showWeekPicker,
                  showPopperArrow: o.props.showPopperArrow,
                  excludeScrollbar: o.props.excludeScrollbar,
                  handleOnKeyDown: o.props.onKeyDown,
                  handleOnDayKeyDown: o.onDayKeyDown,
                  isInputFocused: o.state.focused,
                  customTimeInput: o.props.customTimeInput,
                  setPreSelection: o.setPreSelection,
                },
                o.props.children,
              )
            : null;
        }),
        b(D(o), "renderAriaLiveRegion", function () {
          var a,
            i = o.props,
            s = i.dateFormat,
            l = i.locale,
            u =
              o.props.showTimeInput || o.props.showTimeSelect
                ? "PPPPp"
                : "PPPP";
          return (
            (a = o.props.selectsRange
              ? "Selected start date: "
                  .concat(
                    Rr(o.props.startDate, { dateFormat: u, locale: l }),
                    ". ",
                  )
                  .concat(
                    o.props.endDate
                      ? "End date: " +
                          Rr(o.props.endDate, { dateFormat: u, locale: l })
                      : "",
                  )
              : o.props.showTimeSelectOnly
                ? "Selected time: ".concat(
                    Rr(o.props.selected, { dateFormat: s, locale: l }),
                  )
                : o.props.showYearPicker
                  ? "Selected year: ".concat(
                      Rr(o.props.selected, { dateFormat: "yyyy", locale: l }),
                    )
                  : o.props.showMonthYearPicker
                    ? "Selected month: ".concat(
                        Rr(o.props.selected, {
                          dateFormat: "MMMM yyyy",
                          locale: l,
                        }),
                      )
                    : o.props.showQuarterYearPicker
                      ? "Selected quarter: ".concat(
                          Rr(o.props.selected, {
                            dateFormat: "yyyy, QQQ",
                            locale: l,
                          }),
                        )
                      : "Selected date: ".concat(
                          Rr(o.props.selected, { dateFormat: u, locale: l }),
                        )),
            I.createElement(
              "span",
              {
                role: "alert",
                "aria-live": "polite",
                className: "react-datepicker__aria-live",
              },
              a,
            )
          );
        }),
        b(D(o), "renderDateInput", function () {
          var a,
            i = Ct(o.props.className, b({}, _m, o.state.open)),
            s =
              o.props.customInput || I.createElement("input", { type: "text" }),
            l = o.props.customInputRef || "ref",
            u =
              typeof o.props.value == "string"
                ? o.props.value
                : typeof o.state.inputValue == "string"
                  ? o.state.inputValue
                  : o.props.selectsRange
                    ? (function (c, d, m) {
                        if (!c) return "";
                        var v = Rr(c, m),
                          S = d ? Rr(d, m) : "";
                        return "".concat(v, " - ").concat(S);
                      })(o.props.startDate, o.props.endDate, o.props)
                    : Rr(o.props.selected, o.props);
          return I.cloneElement(
            s,
            (b(
              b(
                b(
                  b(
                    b(
                      b(
                        b(
                          b(
                            b(
                              b((a = {}), l, function (c) {
                                o.input = c;
                              }),
                              "value",
                              u,
                            ),
                            "onBlur",
                            o.handleBlur,
                          ),
                          "onChange",
                          o.handleChange,
                        ),
                        "onClick",
                        o.onInputClick,
                      ),
                      "onFocus",
                      o.handleFocus,
                    ),
                    "onKeyDown",
                    o.onInputKeyDown,
                  ),
                  "id",
                  o.props.id,
                ),
                "name",
                o.props.name,
              ),
              "form",
              o.props.form,
            ),
            b(
              b(
                b(
                  b(
                    b(
                      b(
                        b(
                          b(
                            b(
                              b(a, "autoFocus", o.props.autoFocus),
                              "placeholder",
                              o.props.placeholderText,
                            ),
                            "disabled",
                            o.props.disabled,
                          ),
                          "autoComplete",
                          o.props.autoComplete,
                        ),
                        "className",
                        Ct(s.props.className, i),
                      ),
                      "title",
                      o.props.title,
                    ),
                    "readOnly",
                    o.props.readOnly,
                  ),
                  "required",
                  o.props.required,
                ),
                "tabIndex",
                o.props.tabIndex,
              ),
              "aria-describedby",
              o.props.ariaDescribedBy,
            ),
            b(
              b(
                b(a, "aria-invalid", o.props.ariaInvalid),
                "aria-labelledby",
                o.props.ariaLabelledBy,
              ),
              "aria-required",
              o.props.ariaRequired,
            )),
          );
        }),
        b(D(o), "renderClearButton", function () {
          var a = o.props,
            i = a.isClearable,
            s = a.disabled,
            l = a.selected,
            u = a.startDate,
            c = a.endDate,
            d = a.clearButtonTitle,
            m = a.clearButtonClassName,
            v = m === void 0 ? "" : m,
            S = a.ariaLabelClose,
            C = S === void 0 ? "Close" : S;
          return !i || (l == null && u == null && c == null)
            ? null
            : I.createElement("button", {
                type: "button",
                className: Ct("react-datepicker__close-icon", v, {
                  "react-datepicker__close-icon--disabled": s,
                }),
                disabled: s,
                "aria-label": C,
                onClick: o.onClearClick,
                title: d,
                tabIndex: -1,
              });
        }),
        (o.state = o.calcInitialState()),
        (o.preventFocusTimeout = null),
        o
      );
    }
    return (
      gt(
        r,
        [
          {
            key: "componentDidMount",
            value: function () {
              window.addEventListener("scroll", this.onScroll, !0);
            },
          },
          {
            key: "componentDidUpdate",
            value: function (n, o) {
              var a, i;
              (n.inline &&
                ((a = n.selected),
                (i = this.props.selected),
                a && i ? Rt(a) !== Rt(i) || xe(a) !== xe(i) : a !== i) &&
                this.setPreSelection(this.props.selected),
                this.state.monthSelectedIn !== void 0 &&
                  n.monthsShown !== this.props.monthsShown &&
                  this.setState({ monthSelectedIn: 0 }),
                n.highlightDates !== this.props.highlightDates &&
                  this.setState({
                    highlightDates: Sm(this.props.highlightDates),
                  }),
                o.focused ||
                  Kn(n.selected, this.props.selected) ||
                  this.setState({ inputValue: null }),
                o.open !== this.state.open &&
                  (o.open === !1 &&
                    this.state.open === !0 &&
                    this.props.onCalendarOpen(),
                  o.open === !0 &&
                    this.state.open === !1 &&
                    this.props.onCalendarClose()));
            },
          },
          {
            key: "componentWillUnmount",
            value: function () {
              (this.clearPreventFocusTimeout(),
                window.removeEventListener("scroll", this.onScroll, !0));
            },
          },
          {
            key: "renderInputContainer",
            value: function () {
              var n = this.props,
                o = n.showIcon,
                a = n.icon,
                i = n.calendarIconClassname,
                s = n.toggleCalendarOnIconClick,
                l = this.state.open;
              return I.createElement(
                "div",
                {
                  className: "react-datepicker__input-container".concat(
                    o ? " react-datepicker__view-calendar-icon" : "",
                  ),
                },
                o &&
                  I.createElement(
                    $D,
                    ca(
                      {
                        icon: a,
                        className: ""
                          .concat(i, " ")
                          .concat(
                            l && "react-datepicker-ignore-onclickoutside",
                          ),
                      },
                      s ? { onClick: this.toggleCalendar } : null,
                    ),
                  ),
                this.state.isRenderAriaLiveMessage &&
                  this.renderAriaLiveRegion(),
                this.renderDateInput(),
                this.renderClearButton(),
              );
            },
          },
          {
            key: "render",
            value: function () {
              var n = this.renderCalendar();
              if (this.props.inline) return n;
              if (this.props.withPortal) {
                var o = this.state.open
                  ? I.createElement(
                      O0,
                      { enableTabLoop: this.props.enableTabLoop },
                      I.createElement(
                        "div",
                        {
                          className: "react-datepicker__portal",
                          tabIndex: -1,
                          onKeyDown: this.onPortalKeyDown,
                        },
                        n,
                      ),
                    )
                  : null;
                return (
                  this.state.open &&
                    this.props.portalId &&
                    (o = I.createElement(
                      R0,
                      {
                        portalId: this.props.portalId,
                        portalHost: this.props.portalHost,
                      },
                      o,
                    )),
                  I.createElement("div", null, this.renderInputContainer(), o)
                );
              }
              return I.createElement(zD, {
                className: this.props.popperClassName,
                wrapperClassName: this.props.wrapperClassName,
                hidePopper: !this.isCalendarOpen(),
                portalId: this.props.portalId,
                portalHost: this.props.portalHost,
                popperModifiers: this.props.popperModifiers,
                targetComponent: this.renderInputContainer(),
                popperContainer: this.props.popperContainer,
                popperComponent: n,
                popperPlacement: this.props.popperPlacement,
                popperProps: this.props.popperProps,
                popperOnKeyDown: this.onPopperKeyDown,
                enableTabLoop: this.props.enableTabLoop,
              });
            },
          },
        ],
        [
          {
            key: "defaultProps",
            get: function () {
              return {
                allowSameDay: !1,
                dateFormat: "MM/dd/yyyy",
                dateFormatCalendar: "LLLL yyyy",
                onChange: function () {},
                disabled: !1,
                disabledKeyboardNavigation: !1,
                dropdownMode: "scroll",
                onFocus: function () {},
                onBlur: function () {},
                onKeyDown: function () {},
                onInputClick: function () {},
                onSelect: function () {},
                onClickOutside: function () {},
                onMonthChange: function () {},
                onCalendarOpen: function () {},
                onCalendarClose: function () {},
                preventOpenOnFocus: !1,
                onYearChange: function () {},
                onInputError: function () {},
                monthsShown: 1,
                readOnly: !1,
                withPortal: !1,
                selectsDisabledDaysInRange: !1,
                shouldCloseOnSelect: !0,
                showTimeSelect: !1,
                showTimeInput: !1,
                showPreviousMonths: !1,
                showMonthYearPicker: !1,
                showFullMonthYearPicker: !1,
                showTwoColumnMonthYearPicker: !1,
                showFourColumnMonthYearPicker: !1,
                showYearPicker: !1,
                showQuarterYearPicker: !1,
                showWeekPicker: !1,
                strictParsing: !1,
                timeIntervals: 30,
                timeCaption: "Time",
                previousMonthAriaLabel: "Previous Month",
                previousMonthButtonLabel: "Previous Month",
                nextMonthAriaLabel: "Next Month",
                nextMonthButtonLabel: "Next Month",
                previousYearAriaLabel: "Previous Year",
                previousYearButtonLabel: "Previous Year",
                nextYearAriaLabel: "Next Year",
                nextYearButtonLabel: "Next Year",
                timeInputLabel: "Time",
                enableTabLoop: !0,
                yearItemNumber: ri,
                focusSelectedMonth: !1,
                showPopperArrow: !0,
                excludeScrollbar: !0,
                customTimeInput: null,
                calendarStartDay: void 0,
                toggleCalendarOnIconClick: !1,
              };
            },
          },
        ],
      ),
      r
    );
  })(),
  WD = "input",
  rc = "navigate";
function N0(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: VD } = Object.prototype,
  { getPrototypeOf: da } = Object,
  { iterator: Yi, toStringTag: M0 } = Symbol,
  Rl = (
    ({ hasOwnProperty: e }) =>
    (t, r) =>
      e.call(t, r)
  )(Object.prototype),
  Ri = (e, t) => {
    let r = e;
    const n = [];
    for (; r != null && r !== Object.prototype;) {
      if (n.indexOf(r) !== -1) return !1;
      if ((n.push(r), Rl(r, t))) return !0;
      r = da(r);
    }
    return !1;
  },
  qD = (e, t) => (e != null && Ri(e, t) ? e[t] : void 0),
  of = ((e) => (t) => {
    const r = VD.call(t);
    return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  Tr = (e) => ((e = e.toLowerCase()), (t) => of(t) === e),
  uu = (e) => (t) => typeof t === e,
  { isArray: po } = Array,
  pa = uu("undefined");
function Sa(e) {
  return (
    e !== null &&
    !pa(e) &&
    e.constructor !== null &&
    !pa(e.constructor) &&
    Kt(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const I0 = Tr("ArrayBuffer");
function QD(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && I0(e.buffer)),
    t
  );
}
const KD = uu("string"),
  Kt = uu("function"),
  j0 = uu("number"),
  Ca = (e) => e !== null && typeof e == "object",
  GD = (e) => e === !0 || e === !1,
  js = (e) => {
    if (!Ca(e)) return !1;
    const t = da(e);
    return (
      (t === null || t === Object.prototype || da(t) === null) &&
      !Ri(e, M0) &&
      !Ri(e, Yi)
    );
  },
  XD = (e) => {
    if (!Ca(e) || Sa(e)) return !1;
    try {
      return (
        Object.keys(e).length === 0 &&
        Object.getPrototypeOf(e) === Object.prototype
      );
    } catch {
      return !1;
    }
  },
  JD = Tr("Date"),
  ZD = Tr("File"),
  eT = (e) => !!(e && typeof e.uri < "u"),
  tT = (e) => e && typeof e.getParts < "u",
  rT = Tr("Blob"),
  nT = Tr("FileList"),
  oT = (e) => Ca(e) && Kt(e.pipe);
function aT() {
  return typeof globalThis < "u"
    ? globalThis
    : typeof self < "u"
      ? self
      : typeof window < "u"
        ? window
        : typeof ud < "u"
          ? ud
          : {};
}
const bm = aT(),
  Dm = typeof bm.FormData < "u" ? bm.FormData : void 0,
  iT = (e) => {
    if (!e) return !1;
    if (Dm && e instanceof Dm) return !0;
    const t = da(e);
    if (!t || t === Object.prototype || !Kt(e.append)) return !1;
    const r = of(e);
    return (
      r === "formdata" ||
      (r === "object" && Kt(e.toString) && e.toString() === "[object FormData]")
    );
  },
  sT = Tr("URLSearchParams"),
  [lT, uT, cT, dT] = ["ReadableStream", "Request", "Response", "Headers"].map(
    Tr,
  ),
  pT = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function zi(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let n, o;
  if ((typeof e != "object" && (e = [e]), po(e)))
    for (n = 0, o = e.length; n < o; n++) t.call(null, e[n], n, e);
  else {
    if (Sa(e)) return;
    const a = r ? Object.getOwnPropertyNames(e) : Object.keys(e),
      i = a.length;
    let s;
    for (n = 0; n < i; n++) ((s = a[n]), t.call(null, e[s], s, e));
  }
}
function L0(e, t) {
  if (Sa(e)) return null;
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length,
    o;
  for (; n-- > 0;) if (((o = r[n]), t === o.toLowerCase())) return o;
  return null;
}
const Gn =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : ud,
  A0 = (e) => !pa(e) && e !== Gn;
function _d(...e) {
  const { caseless: t, skipUndefined: r } = (A0(this) && this) || {},
    n = {},
    o = (a, i) => {
      if (i === "__proto__" || i === "constructor" || i === "prototype") return;
      const s = (t && typeof i == "string" && L0(n, i)) || i,
        l = Rl(n, s) ? n[s] : void 0;
      js(l) && js(a)
        ? (n[s] = _d(l, a))
        : js(a)
          ? (n[s] = _d({}, a))
          : po(a)
            ? (n[s] = a.slice())
            : (!r || !pa(a)) && (n[s] = a);
    };
  for (let a = 0, i = e.length; a < i; a++) {
    const s = e[a];
    if (!s || Sa(s) || (zi(s, o), typeof s != "object" || po(s))) continue;
    const l = Object.getOwnPropertySymbols(s);
    for (let u = 0; u < l.length; u++) {
      const c = l[u];
      ET.call(s, c) && o(s[c], c);
    }
  }
  return n;
}
const fT = (e, t, r, { allOwnKeys: n } = {}) => (
    zi(
      t,
      (o, a) => {
        r && Kt(o)
          ? Object.defineProperty(e, a, {
              __proto__: null,
              value: N0(o, r),
              writable: !0,
              enumerable: !0,
              configurable: !0,
            })
          : Object.defineProperty(e, a, {
              __proto__: null,
              value: o,
              writable: !0,
              enumerable: !0,
              configurable: !0,
            });
      },
      { allOwnKeys: n },
    ),
    e
  ),
  hT = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  mT = (e, t, r, n) => {
    ((e.prototype = Object.create(t.prototype, n)),
      Object.defineProperty(e.prototype, "constructor", {
        __proto__: null,
        value: e,
        writable: !0,
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, "super", {
        __proto__: null,
        value: t.prototype,
      }),
      r && Object.assign(e.prototype, r));
  },
  gT = (e, t, r, n) => {
    let o, a, i;
    const s = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (o = Object.getOwnPropertyNames(e), a = o.length; a-- > 0;)
        ((i = o[a]),
          (!n || n(i, e, t)) && !s[i] && ((t[i] = e[i]), (s[i] = !0)));
      e = r !== !1 && da(e);
    } while (e && (!r || r(e, t)) && e !== Object.prototype);
    return t;
  },
  vT = (e, t, r) => {
    ((e = String(e)),
      (r === void 0 || r > e.length) && (r = e.length),
      (r -= t.length));
    const n = e.indexOf(t, r);
    return n !== -1 && n === r;
  },
  yT = (e) => {
    if (!e) return null;
    if (po(e)) return e;
    let t = e.length;
    if (!j0(t)) return null;
    const r = new Array(t);
    for (; t-- > 0;) r[t] = e[t];
    return r;
  },
  wT = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && da(Uint8Array)),
  xT = (e, t) => {
    const n = (e && e[Yi]).call(e);
    let o;
    for (; (o = n.next()) && !o.done;) {
      const a = o.value;
      t.call(e, a[0], a[1]);
    }
  },
  ST = (e, t) => {
    let r;
    const n = [];
    for (; (r = e.exec(t)) !== null;) n.push(r);
    return n;
  },
  CT = Tr("HTMLFormElement"),
  kT = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (r, n, o) {
      return n.toUpperCase() + o;
    }),
  { propertyIsEnumerable: ET } = Object.prototype,
  _T = Tr("RegExp"),
  F0 = (e, t) => {
    const r = Object.getOwnPropertyDescriptors(e),
      n = {};
    (zi(r, (o, a) => {
      let i;
      (i = t(o, a, e)) !== !1 && (n[a] = i || o);
    }),
      Object.defineProperties(e, n));
  },
  bT = (e) => {
    F0(e, (t, r) => {
      if (Kt(e) && ["arguments", "caller", "callee"].includes(r)) return !1;
      const n = e[r];
      if (Kt(n)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + r + "'");
          });
      }
    });
  },
  DT = (e, t) => {
    const r = {},
      n = (o) => {
        o.forEach((a) => {
          r[a] = !0;
        });
      };
    return (po(e) ? n(e) : n(String(e).split(t)), r);
  },
  TT = () => {},
  PT = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t);
function RT(e) {
  return !!(e && Kt(e.append) && e[M0] === "FormData" && e[Yi]);
}
const OT = (e) => {
    const t = new WeakSet(),
      r = (n) => {
        if (Ca(n)) {
          if (t.has(n)) return;
          if (Sa(n)) return n;
          if (!("toJSON" in n)) {
            t.add(n);
            const o = po(n) ? [] : {};
            return (
              zi(n, (a, i) => {
                const s = r(a);
                !pa(s) && (o[i] = s);
              }),
              t.delete(n),
              o
            );
          }
        }
        return n;
      };
    return r(e);
  },
  NT = Tr("AsyncFunction"),
  MT = (e) => e && (Ca(e) || Kt(e)) && Kt(e.then) && Kt(e.catch),
  B0 = ((e, t) =>
    e
      ? setImmediate
      : t
        ? ((r, n) => (
            Gn.addEventListener(
              "message",
              ({ source: o, data: a }) => {
                o === Gn && a === r && n.length && n.shift()();
              },
              !1,
            ),
            (o) => {
              (n.push(o), Gn.postMessage(r, "*"));
            }
          ))(`axios@${Math.random()}`, [])
        : (r) => setTimeout(r))(
    typeof setImmediate == "function",
    Kt(Gn.postMessage),
  ),
  IT =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(Gn)
      : (typeof Ph < "u" && Ph.nextTick) || B0,
  U0 = (e) => e != null && Kt(e[Yi]),
  jT = (e) => e != null && Ri(e, Yi) && U0(e),
  O = {
    isArray: po,
    isArrayBuffer: I0,
    isBuffer: Sa,
    isFormData: iT,
    isArrayBufferView: QD,
    isString: KD,
    isNumber: j0,
    isBoolean: GD,
    isObject: Ca,
    isPlainObject: js,
    isEmptyObject: XD,
    isReadableStream: lT,
    isRequest: uT,
    isResponse: cT,
    isHeaders: dT,
    isUndefined: pa,
    isDate: JD,
    isFile: ZD,
    isReactNativeBlob: eT,
    isReactNative: tT,
    isBlob: rT,
    isRegExp: _T,
    isFunction: Kt,
    isStream: oT,
    isURLSearchParams: sT,
    isTypedArray: wT,
    isFileList: nT,
    forEach: zi,
    merge: _d,
    extend: fT,
    trim: pT,
    stripBOM: hT,
    inherits: mT,
    toFlatObject: gT,
    kindOf: of,
    kindOfTest: Tr,
    endsWith: vT,
    toArray: yT,
    forEachEntry: xT,
    matchAll: ST,
    isHTMLForm: CT,
    hasOwnProperty: Rl,
    hasOwnProp: Rl,
    hasOwnInPrototypeChain: Ri,
    getSafeProp: qD,
    reduceDescriptors: F0,
    freezeMethods: bT,
    toObjectSet: DT,
    toCamelCase: kT,
    noop: TT,
    toFiniteNumber: PT,
    findKey: L0,
    global: Gn,
    isContextDefined: A0,
    isSpecCompliantForm: RT,
    toJSONObject: OT,
    isAsyncFn: NT,
    isThenable: MT,
    setImmediate: B0,
    asap: IT,
    isIterable: U0,
    isSafeIterable: jT,
  };
var $0 = {},
  cu = {};
cu.byteLength = FT;
cu.toByteArray = UT;
cu.fromByteArray = zT;
var Ar = [],
  nr = [],
  LT = typeof Uint8Array < "u" ? Uint8Array : Array,
  nc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var Eo = 0, AT = nc.length; Eo < AT; ++Eo)
  ((Ar[Eo] = nc[Eo]), (nr[nc.charCodeAt(Eo)] = Eo));
nr[45] = 62;
nr[95] = 63;
function Y0(e) {
  var t = e.length;
  if (t % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var r = e.indexOf("=");
  r === -1 && (r = t);
  var n = r === t ? 0 : 4 - (r % 4);
  return [r, n];
}
function FT(e) {
  var t = Y0(e),
    r = t[0],
    n = t[1];
  return ((r + n) * 3) / 4 - n;
}
function BT(e, t, r) {
  return ((t + r) * 3) / 4 - r;
}
function UT(e) {
  var t,
    r = Y0(e),
    n = r[0],
    o = r[1],
    a = new LT(BT(e, n, o)),
    i = 0,
    s = o > 0 ? n - 4 : n,
    l;
  for (l = 0; l < s; l += 4)
    ((t =
      (nr[e.charCodeAt(l)] << 18) |
      (nr[e.charCodeAt(l + 1)] << 12) |
      (nr[e.charCodeAt(l + 2)] << 6) |
      nr[e.charCodeAt(l + 3)]),
      (a[i++] = (t >> 16) & 255),
      (a[i++] = (t >> 8) & 255),
      (a[i++] = t & 255));
  return (
    o === 2 &&
      ((t = (nr[e.charCodeAt(l)] << 2) | (nr[e.charCodeAt(l + 1)] >> 4)),
      (a[i++] = t & 255)),
    o === 1 &&
      ((t =
        (nr[e.charCodeAt(l)] << 10) |
        (nr[e.charCodeAt(l + 1)] << 4) |
        (nr[e.charCodeAt(l + 2)] >> 2)),
      (a[i++] = (t >> 8) & 255),
      (a[i++] = t & 255)),
    a
  );
}
function $T(e) {
  return (
    Ar[(e >> 18) & 63] + Ar[(e >> 12) & 63] + Ar[(e >> 6) & 63] + Ar[e & 63]
  );
}
function YT(e, t, r) {
  for (var n, o = [], a = t; a < r; a += 3)
    ((n =
      ((e[a] << 16) & 16711680) + ((e[a + 1] << 8) & 65280) + (e[a + 2] & 255)),
      o.push($T(n)));
  return o.join("");
}
function zT(e) {
  for (
    var t, r = e.length, n = r % 3, o = [], a = 16383, i = 0, s = r - n;
    i < s;
    i += a
  )
    o.push(YT(e, i, i + a > s ? s : i + a));
  return (
    n === 1
      ? ((t = e[r - 1]), o.push(Ar[t >> 2] + Ar[(t << 4) & 63] + "=="))
      : n === 2 &&
        ((t = (e[r - 2] << 8) + e[r - 1]),
        o.push(Ar[t >> 10] + Ar[(t >> 4) & 63] + Ar[(t << 2) & 63] + "=")),
    o.join("")
  );
}
var af = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ af.read =
  function (e, t, r, n, o) {
    var a,
      i,
      s = o * 8 - n - 1,
      l = (1 << s) - 1,
      u = l >> 1,
      c = -7,
      d = r ? o - 1 : 0,
      m = r ? -1 : 1,
      v = e[t + d];
    for (
      d += m, a = v & ((1 << -c) - 1), v >>= -c, c += s;
      c > 0;
      a = a * 256 + e[t + d], d += m, c -= 8
    );
    for (
      i = a & ((1 << -c) - 1), a >>= -c, c += n;
      c > 0;
      i = i * 256 + e[t + d], d += m, c -= 8
    );
    if (a === 0) a = 1 - u;
    else {
      if (a === l) return i ? NaN : (v ? -1 : 1) * (1 / 0);
      ((i = i + Math.pow(2, n)), (a = a - u));
    }
    return (v ? -1 : 1) * i * Math.pow(2, a - n);
  };
af.write = function (e, t, r, n, o, a) {
  var i,
    s,
    l,
    u = a * 8 - o - 1,
    c = (1 << u) - 1,
    d = c >> 1,
    m = o === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
    v = n ? 0 : a - 1,
    S = n ? 1 : -1,
    C = t < 0 || (t === 0 && 1 / t < 0) ? 1 : 0;
  for (
    t = Math.abs(t),
      isNaN(t) || t === 1 / 0
        ? ((s = isNaN(t) ? 1 : 0), (i = c))
        : ((i = Math.floor(Math.log(t) / Math.LN2)),
          t * (l = Math.pow(2, -i)) < 1 && (i--, (l *= 2)),
          i + d >= 1 ? (t += m / l) : (t += m * Math.pow(2, 1 - d)),
          t * l >= 2 && (i++, (l /= 2)),
          i + d >= c
            ? ((s = 0), (i = c))
            : i + d >= 1
              ? ((s = (t * l - 1) * Math.pow(2, o)), (i = i + d))
              : ((s = t * Math.pow(2, d - 1) * Math.pow(2, o)), (i = 0)));
    o >= 8;
    e[r + v] = s & 255, v += S, s /= 256, o -= 8
  );
  for (
    i = (i << o) | s, u += o;
    u > 0;
    e[r + v] = i & 255, v += S, i /= 256, u -= 8
  );
  e[r + v - S] |= C * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ (function (e) {
  const t = cu,
    r = af,
    n =
      typeof Symbol == "function" && typeof Symbol.for == "function"
        ? Symbol.for("nodejs.util.inspect.custom")
        : null;
  ((e.Buffer = c), (e.SlowBuffer = P), (e.INSPECT_MAX_BYTES = 50));
  const o = 2147483647;
  e.kMaxLength = o;
  const { Uint8Array: a, ArrayBuffer: i, SharedArrayBuffer: s } = globalThis;
  ((c.TYPED_ARRAY_SUPPORT = l()),
    !c.TYPED_ARRAY_SUPPORT &&
      typeof console < "u" &&
      typeof console.error == "function" &&
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.",
      ));
  function l() {
    try {
      const x = new a(1),
        p = {
          foo: function () {
            return 42;
          },
        };
      return (
        Object.setPrototypeOf(p, a.prototype),
        Object.setPrototypeOf(x, p),
        x.foo() === 42
      );
    } catch {
      return !1;
    }
  }
  (Object.defineProperty(c.prototype, "parent", {
    enumerable: !0,
    get: function () {
      if (c.isBuffer(this)) return this.buffer;
    },
  }),
    Object.defineProperty(c.prototype, "offset", {
      enumerable: !0,
      get: function () {
        if (c.isBuffer(this)) return this.byteOffset;
      },
    }));
  function u(x) {
    if (x > o)
      throw new RangeError(
        'The value "' + x + '" is invalid for option "size"',
      );
    const p = new a(x);
    return (Object.setPrototypeOf(p, c.prototype), p);
  }
  function c(x, p, f) {
    if (typeof x == "number") {
      if (typeof p == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number',
        );
      return S(x);
    }
    return d(x, p, f);
  }
  c.poolSize = 8192;
  function d(x, p, f) {
    if (typeof x == "string") return C(x, p);
    if (i.isView(x)) return g(x);
    if (x == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
          typeof x,
      );
    if (
      et(x, i) ||
      (x && et(x.buffer, i)) ||
      (typeof s < "u" && (et(x, s) || (x && et(x.buffer, s))))
    )
      return y(x, p, f);
    if (typeof x == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number',
      );
    const E = x.valueOf && x.valueOf();
    if (E != null && E !== x) return c.from(E, p, f);
    const N = w(x);
    if (N) return N;
    if (
      typeof Symbol < "u" &&
      Symbol.toPrimitive != null &&
      typeof x[Symbol.toPrimitive] == "function"
    )
      return c.from(x[Symbol.toPrimitive]("string"), p, f);
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
        typeof x,
    );
  }
  ((c.from = function (x, p, f) {
    return d(x, p, f);
  }),
    Object.setPrototypeOf(c.prototype, a.prototype),
    Object.setPrototypeOf(c, a));
  function m(x) {
    if (typeof x != "number")
      throw new TypeError('"size" argument must be of type number');
    if (x < 0)
      throw new RangeError(
        'The value "' + x + '" is invalid for option "size"',
      );
  }
  function v(x, p, f) {
    return (
      m(x),
      x <= 0
        ? u(x)
        : p !== void 0
          ? typeof f == "string"
            ? u(x).fill(p, f)
            : u(x).fill(p)
          : u(x)
    );
  }
  c.alloc = function (x, p, f) {
    return v(x, p, f);
  };
  function S(x) {
    return (m(x), u(x < 0 ? 0 : T(x) | 0));
  }
  ((c.allocUnsafe = function (x) {
    return S(x);
  }),
    (c.allocUnsafeSlow = function (x) {
      return S(x);
    }));
  function C(x, p) {
    if (((typeof p != "string" || p === "") && (p = "utf8"), !c.isEncoding(p)))
      throw new TypeError("Unknown encoding: " + p);
    const f = R(x, p) | 0;
    let E = u(f);
    const N = E.write(x, p);
    return (N !== f && (E = E.slice(0, N)), E);
  }
  function k(x) {
    const p = x.length < 0 ? 0 : T(x.length) | 0,
      f = u(p);
    for (let E = 0; E < p; E += 1) f[E] = x[E] & 255;
    return f;
  }
  function g(x) {
    if (et(x, a)) {
      const p = new a(x);
      return y(p.buffer, p.byteOffset, p.byteLength);
    }
    return k(x);
  }
  function y(x, p, f) {
    if (p < 0 || x.byteLength < p)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (x.byteLength < p + (f || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    let E;
    return (
      p === void 0 && f === void 0
        ? (E = new a(x))
        : f === void 0
          ? (E = new a(x, p))
          : (E = new a(x, p, f)),
      Object.setPrototypeOf(E, c.prototype),
      E
    );
  }
  function w(x) {
    if (c.isBuffer(x)) {
      const p = T(x.length) | 0,
        f = u(p);
      return (f.length === 0 || x.copy(f, 0, 0, p), f);
    }
    if (x.length !== void 0)
      return typeof x.length != "number" || xo(x.length) ? u(0) : k(x);
    if (x.type === "Buffer" && Array.isArray(x.data)) return k(x.data);
  }
  function T(x) {
    if (x >= o)
      throw new RangeError(
        "Attempt to allocate Buffer larger than maximum size: 0x" +
          o.toString(16) +
          " bytes",
      );
    return x | 0;
  }
  function P(x) {
    return (+x != x && (x = 0), c.alloc(+x));
  }
  ((c.isBuffer = function (p) {
    return p != null && p._isBuffer === !0 && p !== c.prototype;
  }),
    (c.compare = function (p, f) {
      if (
        (et(p, a) && (p = c.from(p, p.offset, p.byteLength)),
        et(f, a) && (f = c.from(f, f.offset, f.byteLength)),
        !c.isBuffer(p) || !c.isBuffer(f))
      )
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
        );
      if (p === f) return 0;
      let E = p.length,
        N = f.length;
      for (let j = 0, F = Math.min(E, N); j < F; ++j)
        if (p[j] !== f[j]) {
          ((E = p[j]), (N = f[j]));
          break;
        }
      return E < N ? -1 : N < E ? 1 : 0;
    }),
    (c.isEncoding = function (p) {
      switch (String(p).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }),
    (c.concat = function (p, f) {
      if (!Array.isArray(p))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (p.length === 0) return c.alloc(0);
      let E;
      if (f === void 0) for (f = 0, E = 0; E < p.length; ++E) f += p[E].length;
      const N = c.allocUnsafe(f);
      let j = 0;
      for (E = 0; E < p.length; ++E) {
        let F = p[E];
        if (et(F, a))
          j + F.length > N.length
            ? (c.isBuffer(F) || (F = c.from(F)), F.copy(N, j))
            : a.prototype.set.call(N, F, j);
        else if (c.isBuffer(F)) F.copy(N, j);
        else throw new TypeError('"list" argument must be an Array of Buffers');
        j += F.length;
      }
      return N;
    }));
  function R(x, p) {
    if (c.isBuffer(x)) return x.length;
    if (i.isView(x) || et(x, i)) return x.byteLength;
    if (typeof x != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
          typeof x,
      );
    const f = x.length,
      E = arguments.length > 2 && arguments[2] === !0;
    if (!E && f === 0) return 0;
    let N = !1;
    for (;;)
      switch (p) {
        case "ascii":
        case "latin1":
        case "binary":
          return f;
        case "utf8":
        case "utf-8":
          return we(x).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return f * 2;
        case "hex":
          return f >>> 1;
        case "base64":
          return Ae(x).length;
        default:
          if (N) return E ? -1 : we(x).length;
          ((p = ("" + p).toLowerCase()), (N = !0));
      }
  }
  c.byteLength = R;
  function M(x, p, f) {
    let E = !1;
    if (
      ((p === void 0 || p < 0) && (p = 0),
      p > this.length ||
        ((f === void 0 || f > this.length) && (f = this.length), f <= 0) ||
        ((f >>>= 0), (p >>>= 0), f <= p))
    )
      return "";
    for (x || (x = "utf8"); ;)
      switch (x) {
        case "hex":
          return fe(this, p, f);
        case "utf8":
        case "utf-8":
          return ie(this, p, f);
        case "ascii":
          return Z(this, p, f);
        case "latin1":
        case "binary":
          return ne(this, p, f);
        case "base64":
          return q(this, p, f);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ze(this, p, f);
        default:
          if (E) throw new TypeError("Unknown encoding: " + x);
          ((x = (x + "").toLowerCase()), (E = !0));
      }
  }
  c.prototype._isBuffer = !0;
  function A(x, p, f) {
    const E = x[p];
    ((x[p] = x[f]), (x[f] = E));
  }
  ((c.prototype.swap16 = function () {
    const p = this.length;
    if (p % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (let f = 0; f < p; f += 2) A(this, f, f + 1);
    return this;
  }),
    (c.prototype.swap32 = function () {
      const p = this.length;
      if (p % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let f = 0; f < p; f += 4) (A(this, f, f + 3), A(this, f + 1, f + 2));
      return this;
    }),
    (c.prototype.swap64 = function () {
      const p = this.length;
      if (p % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let f = 0; f < p; f += 8)
        (A(this, f, f + 7),
          A(this, f + 1, f + 6),
          A(this, f + 2, f + 5),
          A(this, f + 3, f + 4));
      return this;
    }),
    (c.prototype.toString = function () {
      const p = this.length;
      return p === 0
        ? ""
        : arguments.length === 0
          ? ie(this, 0, p)
          : M.apply(this, arguments);
    }),
    (c.prototype.toLocaleString = c.prototype.toString),
    (c.prototype.equals = function (p) {
      if (!c.isBuffer(p)) throw new TypeError("Argument must be a Buffer");
      return this === p ? !0 : c.compare(this, p) === 0;
    }),
    (c.prototype.inspect = function () {
      let p = "";
      const f = e.INSPECT_MAX_BYTES;
      return (
        (p = this.toString("hex", 0, f)
          .replace(/(.{2})/g, "$1 ")
          .trim()),
        this.length > f && (p += " ... "),
        "<Buffer " + p + ">"
      );
    }),
    n && (c.prototype[n] = c.prototype.inspect),
    (c.prototype.compare = function (p, f, E, N, j) {
      if ((et(p, a) && (p = c.from(p, p.offset, p.byteLength)), !c.isBuffer(p)))
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
            typeof p,
        );
      if (
        (f === void 0 && (f = 0),
        E === void 0 && (E = p ? p.length : 0),
        N === void 0 && (N = 0),
        j === void 0 && (j = this.length),
        f < 0 || E > p.length || N < 0 || j > this.length)
      )
        throw new RangeError("out of range index");
      if (N >= j && f >= E) return 0;
      if (N >= j) return -1;
      if (f >= E) return 1;
      if (((f >>>= 0), (E >>>= 0), (N >>>= 0), (j >>>= 0), this === p))
        return 0;
      let F = j - N,
        Se = E - f;
      const tt = Math.min(F, Se),
        Ve = this.slice(N, j),
        rt = p.slice(f, E);
      for (let Fe = 0; Fe < tt; ++Fe)
        if (Ve[Fe] !== rt[Fe]) {
          ((F = Ve[Fe]), (Se = rt[Fe]));
          break;
        }
      return F < Se ? -1 : Se < F ? 1 : 0;
    }));
  function V(x, p, f, E, N) {
    if (x.length === 0) return -1;
    if (
      (typeof f == "string"
        ? ((E = f), (f = 0))
        : f > 2147483647
          ? (f = 2147483647)
          : f < -2147483648 && (f = -2147483648),
      (f = +f),
      xo(f) && (f = N ? 0 : x.length - 1),
      f < 0 && (f = x.length + f),
      f >= x.length)
    ) {
      if (N) return -1;
      f = x.length - 1;
    } else if (f < 0)
      if (N) f = 0;
      else return -1;
    if ((typeof p == "string" && (p = c.from(p, E)), c.isBuffer(p)))
      return p.length === 0 ? -1 : L(x, p, f, E, N);
    if (typeof p == "number")
      return (
        (p = p & 255),
        typeof a.prototype.indexOf == "function"
          ? N
            ? a.prototype.indexOf.call(x, p, f)
            : a.prototype.lastIndexOf.call(x, p, f)
          : L(x, [p], f, E, N)
      );
    throw new TypeError("val must be string, number or Buffer");
  }
  function L(x, p, f, E, N) {
    let j = 1,
      F = x.length,
      Se = p.length;
    if (
      E !== void 0 &&
      ((E = String(E).toLowerCase()),
      E === "ucs2" || E === "ucs-2" || E === "utf16le" || E === "utf-16le")
    ) {
      if (x.length < 2 || p.length < 2) return -1;
      ((j = 2), (F /= 2), (Se /= 2), (f /= 2));
    }
    function tt(rt, Fe) {
      return j === 1 ? rt[Fe] : rt.readUInt16BE(Fe * j);
    }
    let Ve;
    if (N) {
      let rt = -1;
      for (Ve = f; Ve < F; Ve++)
        if (tt(x, Ve) === tt(p, rt === -1 ? 0 : Ve - rt)) {
          if ((rt === -1 && (rt = Ve), Ve - rt + 1 === Se)) return rt * j;
        } else (rt !== -1 && (Ve -= Ve - rt), (rt = -1));
    } else
      for (f + Se > F && (f = F - Se), Ve = f; Ve >= 0; Ve--) {
        let rt = !0;
        for (let Fe = 0; Fe < Se; Fe++)
          if (tt(x, Ve + Fe) !== tt(p, Fe)) {
            rt = !1;
            break;
          }
        if (rt) return Ve;
      }
    return -1;
  }
  ((c.prototype.includes = function (p, f, E) {
    return this.indexOf(p, f, E) !== -1;
  }),
    (c.prototype.indexOf = function (p, f, E) {
      return V(this, p, f, E, !0);
    }),
    (c.prototype.lastIndexOf = function (p, f, E) {
      return V(this, p, f, E, !1);
    }));
  function K(x, p, f, E) {
    f = Number(f) || 0;
    const N = x.length - f;
    E ? ((E = Number(E)), E > N && (E = N)) : (E = N);
    const j = p.length;
    E > j / 2 && (E = j / 2);
    let F;
    for (F = 0; F < E; ++F) {
      const Se = parseInt(p.substr(F * 2, 2), 16);
      if (xo(Se)) return F;
      x[f + F] = Se;
    }
    return F;
  }
  function $(x, p, f, E) {
    return Et(we(p, x.length - f), x, f, E);
  }
  function ae(x, p, f, E) {
    return Et(Ue(p), x, f, E);
  }
  function le(x, p, f, E) {
    return Et(Ae(p), x, f, E);
  }
  function U(x, p, f, E) {
    return Et(Ie(p, x.length - f), x, f, E);
  }
  ((c.prototype.write = function (p, f, E, N) {
    if (f === void 0) ((N = "utf8"), (E = this.length), (f = 0));
    else if (E === void 0 && typeof f == "string")
      ((N = f), (E = this.length), (f = 0));
    else if (isFinite(f))
      ((f = f >>> 0),
        isFinite(E)
          ? ((E = E >>> 0), N === void 0 && (N = "utf8"))
          : ((N = E), (E = void 0)));
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported",
      );
    const j = this.length - f;
    if (
      ((E === void 0 || E > j) && (E = j),
      (p.length > 0 && (E < 0 || f < 0)) || f > this.length)
    )
      throw new RangeError("Attempt to write outside buffer bounds");
    N || (N = "utf8");
    let F = !1;
    for (;;)
      switch (N) {
        case "hex":
          return K(this, p, f, E);
        case "utf8":
        case "utf-8":
          return $(this, p, f, E);
        case "ascii":
        case "latin1":
        case "binary":
          return ae(this, p, f, E);
        case "base64":
          return le(this, p, f, E);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return U(this, p, f, E);
        default:
          if (F) throw new TypeError("Unknown encoding: " + N);
          ((N = ("" + N).toLowerCase()), (F = !0));
      }
  }),
    (c.prototype.toJSON = function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0),
      };
    }));
  function q(x, p, f) {
    return p === 0 && f === x.length
      ? t.fromByteArray(x)
      : t.fromByteArray(x.slice(p, f));
  }
  function ie(x, p, f) {
    f = Math.min(x.length, f);
    const E = [];
    let N = p;
    for (; N < f;) {
      const j = x[N];
      let F = null,
        Se = j > 239 ? 4 : j > 223 ? 3 : j > 191 ? 2 : 1;
      if (N + Se <= f) {
        let tt, Ve, rt, Fe;
        switch (Se) {
          case 1:
            j < 128 && (F = j);
            break;
          case 2:
            ((tt = x[N + 1]),
              (tt & 192) === 128 &&
                ((Fe = ((j & 31) << 6) | (tt & 63)), Fe > 127 && (F = Fe)));
            break;
          case 3:
            ((tt = x[N + 1]),
              (Ve = x[N + 2]),
              (tt & 192) === 128 &&
                (Ve & 192) === 128 &&
                ((Fe = ((j & 15) << 12) | ((tt & 63) << 6) | (Ve & 63)),
                Fe > 2047 && (Fe < 55296 || Fe > 57343) && (F = Fe)));
            break;
          case 4:
            ((tt = x[N + 1]),
              (Ve = x[N + 2]),
              (rt = x[N + 3]),
              (tt & 192) === 128 &&
                (Ve & 192) === 128 &&
                (rt & 192) === 128 &&
                ((Fe =
                  ((j & 15) << 18) |
                  ((tt & 63) << 12) |
                  ((Ve & 63) << 6) |
                  (rt & 63)),
                Fe > 65535 && Fe < 1114112 && (F = Fe)));
        }
      }
      (F === null
        ? ((F = 65533), (Se = 1))
        : F > 65535 &&
          ((F -= 65536),
          E.push(((F >>> 10) & 1023) | 55296),
          (F = 56320 | (F & 1023))),
        E.push(F),
        (N += Se));
    }
    return G(E);
  }
  const z = 4096;
  function G(x) {
    const p = x.length;
    if (p <= z) return String.fromCharCode.apply(String, x);
    let f = "",
      E = 0;
    for (; E < p;) f += String.fromCharCode.apply(String, x.slice(E, (E += z)));
    return f;
  }
  function Z(x, p, f) {
    let E = "";
    f = Math.min(x.length, f);
    for (let N = p; N < f; ++N) E += String.fromCharCode(x[N] & 127);
    return E;
  }
  function ne(x, p, f) {
    let E = "";
    f = Math.min(x.length, f);
    for (let N = p; N < f; ++N) E += String.fromCharCode(x[N]);
    return E;
  }
  function fe(x, p, f) {
    const E = x.length;
    ((!p || p < 0) && (p = 0), (!f || f < 0 || f > E) && (f = E));
    let N = "";
    for (let j = p; j < f; ++j) N += Vi[x[j]];
    return N;
  }
  function ze(x, p, f) {
    const E = x.slice(p, f);
    let N = "";
    for (let j = 0; j < E.length - 1; j += 2)
      N += String.fromCharCode(E[j] + E[j + 1] * 256);
    return N;
  }
  c.prototype.slice = function (p, f) {
    const E = this.length;
    ((p = ~~p),
      (f = f === void 0 ? E : ~~f),
      p < 0 ? ((p += E), p < 0 && (p = 0)) : p > E && (p = E),
      f < 0 ? ((f += E), f < 0 && (f = 0)) : f > E && (f = E),
      f < p && (f = p));
    const N = this.subarray(p, f);
    return (Object.setPrototypeOf(N, c.prototype), N);
  };
  function pe(x, p, f) {
    if (x % 1 !== 0 || x < 0) throw new RangeError("offset is not uint");
    if (x + p > f)
      throw new RangeError("Trying to access beyond buffer length");
  }
  ((c.prototype.readUintLE = c.prototype.readUIntLE =
    function (p, f, E) {
      ((p = p >>> 0), (f = f >>> 0), E || pe(p, f, this.length));
      let N = this[p],
        j = 1,
        F = 0;
      for (; ++F < f && (j *= 256);) N += this[p + F] * j;
      return N;
    }),
    (c.prototype.readUintBE = c.prototype.readUIntBE =
      function (p, f, E) {
        ((p = p >>> 0), (f = f >>> 0), E || pe(p, f, this.length));
        let N = this[p + --f],
          j = 1;
        for (; f > 0 && (j *= 256);) N += this[p + --f] * j;
        return N;
      }),
    (c.prototype.readUint8 = c.prototype.readUInt8 =
      function (p, f) {
        return ((p = p >>> 0), f || pe(p, 1, this.length), this[p]);
      }),
    (c.prototype.readUint16LE = c.prototype.readUInt16LE =
      function (p, f) {
        return (
          (p = p >>> 0),
          f || pe(p, 2, this.length),
          this[p] | (this[p + 1] << 8)
        );
      }),
    (c.prototype.readUint16BE = c.prototype.readUInt16BE =
      function (p, f) {
        return (
          (p = p >>> 0),
          f || pe(p, 2, this.length),
          (this[p] << 8) | this[p + 1]
        );
      }),
    (c.prototype.readUint32LE = c.prototype.readUInt32LE =
      function (p, f) {
        return (
          (p = p >>> 0),
          f || pe(p, 4, this.length),
          (this[p] | (this[p + 1] << 8) | (this[p + 2] << 16)) +
            this[p + 3] * 16777216
        );
      }),
    (c.prototype.readUint32BE = c.prototype.readUInt32BE =
      function (p, f) {
        return (
          (p = p >>> 0),
          f || pe(p, 4, this.length),
          this[p] * 16777216 +
            ((this[p + 1] << 16) | (this[p + 2] << 8) | this[p + 3])
        );
      }),
    (c.prototype.readBigUInt64LE = vr(function (p) {
      ((p = p >>> 0), Q(p, "offset"));
      const f = this[p],
        E = this[p + 7];
      (f === void 0 || E === void 0) && me(p, this.length - 8);
      const N =
          f + this[++p] * 2 ** 8 + this[++p] * 2 ** 16 + this[++p] * 2 ** 24,
        j = this[++p] + this[++p] * 2 ** 8 + this[++p] * 2 ** 16 + E * 2 ** 24;
      return BigInt(N) + (BigInt(j) << BigInt(32));
    })),
    (c.prototype.readBigUInt64BE = vr(function (p) {
      ((p = p >>> 0), Q(p, "offset"));
      const f = this[p],
        E = this[p + 7];
      (f === void 0 || E === void 0) && me(p, this.length - 8);
      const N =
          f * 2 ** 24 + this[++p] * 2 ** 16 + this[++p] * 2 ** 8 + this[++p],
        j = this[++p] * 2 ** 24 + this[++p] * 2 ** 16 + this[++p] * 2 ** 8 + E;
      return (BigInt(N) << BigInt(32)) + BigInt(j);
    })),
    (c.prototype.readIntLE = function (p, f, E) {
      ((p = p >>> 0), (f = f >>> 0), E || pe(p, f, this.length));
      let N = this[p],
        j = 1,
        F = 0;
      for (; ++F < f && (j *= 256);) N += this[p + F] * j;
      return ((j *= 128), N >= j && (N -= Math.pow(2, 8 * f)), N);
    }),
    (c.prototype.readIntBE = function (p, f, E) {
      ((p = p >>> 0), (f = f >>> 0), E || pe(p, f, this.length));
      let N = f,
        j = 1,
        F = this[p + --N];
      for (; N > 0 && (j *= 256);) F += this[p + --N] * j;
      return ((j *= 128), F >= j && (F -= Math.pow(2, 8 * f)), F);
    }),
    (c.prototype.readInt8 = function (p, f) {
      return (
        (p = p >>> 0),
        f || pe(p, 1, this.length),
        this[p] & 128 ? (255 - this[p] + 1) * -1 : this[p]
      );
    }),
    (c.prototype.readInt16LE = function (p, f) {
      ((p = p >>> 0), f || pe(p, 2, this.length));
      const E = this[p] | (this[p + 1] << 8);
      return E & 32768 ? E | 4294901760 : E;
    }),
    (c.prototype.readInt16BE = function (p, f) {
      ((p = p >>> 0), f || pe(p, 2, this.length));
      const E = this[p + 1] | (this[p] << 8);
      return E & 32768 ? E | 4294901760 : E;
    }),
    (c.prototype.readInt32LE = function (p, f) {
      return (
        (p = p >>> 0),
        f || pe(p, 4, this.length),
        this[p] | (this[p + 1] << 8) | (this[p + 2] << 16) | (this[p + 3] << 24)
      );
    }),
    (c.prototype.readInt32BE = function (p, f) {
      return (
        (p = p >>> 0),
        f || pe(p, 4, this.length),
        (this[p] << 24) | (this[p + 1] << 16) | (this[p + 2] << 8) | this[p + 3]
      );
    }),
    (c.prototype.readBigInt64LE = vr(function (p) {
      ((p = p >>> 0), Q(p, "offset"));
      const f = this[p],
        E = this[p + 7];
      (f === void 0 || E === void 0) && me(p, this.length - 8);
      const N =
        this[p + 4] + this[p + 5] * 2 ** 8 + this[p + 6] * 2 ** 16 + (E << 24);
      return (
        (BigInt(N) << BigInt(32)) +
        BigInt(
          f + this[++p] * 2 ** 8 + this[++p] * 2 ** 16 + this[++p] * 2 ** 24,
        )
      );
    })),
    (c.prototype.readBigInt64BE = vr(function (p) {
      ((p = p >>> 0), Q(p, "offset"));
      const f = this[p],
        E = this[p + 7];
      (f === void 0 || E === void 0) && me(p, this.length - 8);
      const N =
        (f << 24) + this[++p] * 2 ** 16 + this[++p] * 2 ** 8 + this[++p];
      return (
        (BigInt(N) << BigInt(32)) +
        BigInt(
          this[++p] * 2 ** 24 + this[++p] * 2 ** 16 + this[++p] * 2 ** 8 + E,
        )
      );
    })),
    (c.prototype.readFloatLE = function (p, f) {
      return (
        (p = p >>> 0),
        f || pe(p, 4, this.length),
        r.read(this, p, !0, 23, 4)
      );
    }),
    (c.prototype.readFloatBE = function (p, f) {
      return (
        (p = p >>> 0),
        f || pe(p, 4, this.length),
        r.read(this, p, !1, 23, 4)
      );
    }),
    (c.prototype.readDoubleLE = function (p, f) {
      return (
        (p = p >>> 0),
        f || pe(p, 8, this.length),
        r.read(this, p, !0, 52, 8)
      );
    }),
    (c.prototype.readDoubleBE = function (p, f) {
      return (
        (p = p >>> 0),
        f || pe(p, 8, this.length),
        r.read(this, p, !1, 52, 8)
      );
    }));
  function ke(x, p, f, E, N, j) {
    if (!c.isBuffer(x))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (p > N || p < j)
      throw new RangeError('"value" argument is out of bounds');
    if (f + E > x.length) throw new RangeError("Index out of range");
  }
  ((c.prototype.writeUintLE = c.prototype.writeUIntLE =
    function (p, f, E, N) {
      if (((p = +p), (f = f >>> 0), (E = E >>> 0), !N)) {
        const Se = Math.pow(2, 8 * E) - 1;
        ke(this, p, f, E, Se, 0);
      }
      let j = 1,
        F = 0;
      for (this[f] = p & 255; ++F < E && (j *= 256);)
        this[f + F] = (p / j) & 255;
      return f + E;
    }),
    (c.prototype.writeUintBE = c.prototype.writeUIntBE =
      function (p, f, E, N) {
        if (((p = +p), (f = f >>> 0), (E = E >>> 0), !N)) {
          const Se = Math.pow(2, 8 * E) - 1;
          ke(this, p, f, E, Se, 0);
        }
        let j = E - 1,
          F = 1;
        for (this[f + j] = p & 255; --j >= 0 && (F *= 256);)
          this[f + j] = (p / F) & 255;
        return f + E;
      }),
    (c.prototype.writeUint8 = c.prototype.writeUInt8 =
      function (p, f, E) {
        return (
          (p = +p),
          (f = f >>> 0),
          E || ke(this, p, f, 1, 255, 0),
          (this[f] = p & 255),
          f + 1
        );
      }),
    (c.prototype.writeUint16LE = c.prototype.writeUInt16LE =
      function (p, f, E) {
        return (
          (p = +p),
          (f = f >>> 0),
          E || ke(this, p, f, 2, 65535, 0),
          (this[f] = p & 255),
          (this[f + 1] = p >>> 8),
          f + 2
        );
      }),
    (c.prototype.writeUint16BE = c.prototype.writeUInt16BE =
      function (p, f, E) {
        return (
          (p = +p),
          (f = f >>> 0),
          E || ke(this, p, f, 2, 65535, 0),
          (this[f] = p >>> 8),
          (this[f + 1] = p & 255),
          f + 2
        );
      }),
    (c.prototype.writeUint32LE = c.prototype.writeUInt32LE =
      function (p, f, E) {
        return (
          (p = +p),
          (f = f >>> 0),
          E || ke(this, p, f, 4, 4294967295, 0),
          (this[f + 3] = p >>> 24),
          (this[f + 2] = p >>> 16),
          (this[f + 1] = p >>> 8),
          (this[f] = p & 255),
          f + 4
        );
      }),
    (c.prototype.writeUint32BE = c.prototype.writeUInt32BE =
      function (p, f, E) {
        return (
          (p = +p),
          (f = f >>> 0),
          E || ke(this, p, f, 4, 4294967295, 0),
          (this[f] = p >>> 24),
          (this[f + 1] = p >>> 16),
          (this[f + 2] = p >>> 8),
          (this[f + 3] = p & 255),
          f + 4
        );
      }));
  function ue(x, p, f, E, N) {
    se(p, E, N, x, f, 7);
    let j = Number(p & BigInt(4294967295));
    ((x[f++] = j),
      (j = j >> 8),
      (x[f++] = j),
      (j = j >> 8),
      (x[f++] = j),
      (j = j >> 8),
      (x[f++] = j));
    let F = Number((p >> BigInt(32)) & BigInt(4294967295));
    return (
      (x[f++] = F),
      (F = F >> 8),
      (x[f++] = F),
      (F = F >> 8),
      (x[f++] = F),
      (F = F >> 8),
      (x[f++] = F),
      f
    );
  }
  function Ne(x, p, f, E, N) {
    se(p, E, N, x, f, 7);
    let j = Number(p & BigInt(4294967295));
    ((x[f + 7] = j),
      (j = j >> 8),
      (x[f + 6] = j),
      (j = j >> 8),
      (x[f + 5] = j),
      (j = j >> 8),
      (x[f + 4] = j));
    let F = Number((p >> BigInt(32)) & BigInt(4294967295));
    return (
      (x[f + 3] = F),
      (F = F >> 8),
      (x[f + 2] = F),
      (F = F >> 8),
      (x[f + 1] = F),
      (F = F >> 8),
      (x[f] = F),
      f + 8
    );
  }
  ((c.prototype.writeBigUInt64LE = vr(function (p, f = 0) {
    return ue(this, p, f, BigInt(0), BigInt("0xffffffffffffffff"));
  })),
    (c.prototype.writeBigUInt64BE = vr(function (p, f = 0) {
      return Ne(this, p, f, BigInt(0), BigInt("0xffffffffffffffff"));
    })),
    (c.prototype.writeIntLE = function (p, f, E, N) {
      if (((p = +p), (f = f >>> 0), !N)) {
        const tt = Math.pow(2, 8 * E - 1);
        ke(this, p, f, E, tt - 1, -tt);
      }
      let j = 0,
        F = 1,
        Se = 0;
      for (this[f] = p & 255; ++j < E && (F *= 256);)
        (p < 0 && Se === 0 && this[f + j - 1] !== 0 && (Se = 1),
          (this[f + j] = (((p / F) >> 0) - Se) & 255));
      return f + E;
    }),
    (c.prototype.writeIntBE = function (p, f, E, N) {
      if (((p = +p), (f = f >>> 0), !N)) {
        const tt = Math.pow(2, 8 * E - 1);
        ke(this, p, f, E, tt - 1, -tt);
      }
      let j = E - 1,
        F = 1,
        Se = 0;
      for (this[f + j] = p & 255; --j >= 0 && (F *= 256);)
        (p < 0 && Se === 0 && this[f + j + 1] !== 0 && (Se = 1),
          (this[f + j] = (((p / F) >> 0) - Se) & 255));
      return f + E;
    }),
    (c.prototype.writeInt8 = function (p, f, E) {
      return (
        (p = +p),
        (f = f >>> 0),
        E || ke(this, p, f, 1, 127, -128),
        p < 0 && (p = 255 + p + 1),
        (this[f] = p & 255),
        f + 1
      );
    }),
    (c.prototype.writeInt16LE = function (p, f, E) {
      return (
        (p = +p),
        (f = f >>> 0),
        E || ke(this, p, f, 2, 32767, -32768),
        (this[f] = p & 255),
        (this[f + 1] = p >>> 8),
        f + 2
      );
    }),
    (c.prototype.writeInt16BE = function (p, f, E) {
      return (
        (p = +p),
        (f = f >>> 0),
        E || ke(this, p, f, 2, 32767, -32768),
        (this[f] = p >>> 8),
        (this[f + 1] = p & 255),
        f + 2
      );
    }),
    (c.prototype.writeInt32LE = function (p, f, E) {
      return (
        (p = +p),
        (f = f >>> 0),
        E || ke(this, p, f, 4, 2147483647, -2147483648),
        (this[f] = p & 255),
        (this[f + 1] = p >>> 8),
        (this[f + 2] = p >>> 16),
        (this[f + 3] = p >>> 24),
        f + 4
      );
    }),
    (c.prototype.writeInt32BE = function (p, f, E) {
      return (
        (p = +p),
        (f = f >>> 0),
        E || ke(this, p, f, 4, 2147483647, -2147483648),
        p < 0 && (p = 4294967295 + p + 1),
        (this[f] = p >>> 24),
        (this[f + 1] = p >>> 16),
        (this[f + 2] = p >>> 8),
        (this[f + 3] = p & 255),
        f + 4
      );
    }),
    (c.prototype.writeBigInt64LE = vr(function (p, f = 0) {
      return ue(
        this,
        p,
        f,
        -BigInt("0x8000000000000000"),
        BigInt("0x7fffffffffffffff"),
      );
    })),
    (c.prototype.writeBigInt64BE = vr(function (p, f = 0) {
      return Ne(
        this,
        p,
        f,
        -BigInt("0x8000000000000000"),
        BigInt("0x7fffffffffffffff"),
      );
    })));
  function Ee(x, p, f, E, N, j) {
    if (f + E > x.length) throw new RangeError("Index out of range");
    if (f < 0) throw new RangeError("Index out of range");
  }
  function ye(x, p, f, E, N) {
    return (
      (p = +p),
      (f = f >>> 0),
      N || Ee(x, p, f, 4),
      r.write(x, p, f, E, 23, 4),
      f + 4
    );
  }
  ((c.prototype.writeFloatLE = function (p, f, E) {
    return ye(this, p, f, !0, E);
  }),
    (c.prototype.writeFloatBE = function (p, f, E) {
      return ye(this, p, f, !1, E);
    }));
  function B(x, p, f, E, N) {
    return (
      (p = +p),
      (f = f >>> 0),
      N || Ee(x, p, f, 8),
      r.write(x, p, f, E, 52, 8),
      f + 8
    );
  }
  ((c.prototype.writeDoubleLE = function (p, f, E) {
    return B(this, p, f, !0, E);
  }),
    (c.prototype.writeDoubleBE = function (p, f, E) {
      return B(this, p, f, !1, E);
    }),
    (c.prototype.copy = function (p, f, E, N) {
      if (!c.isBuffer(p)) throw new TypeError("argument should be a Buffer");
      if (
        (E || (E = 0),
        !N && N !== 0 && (N = this.length),
        f >= p.length && (f = p.length),
        f || (f = 0),
        N > 0 && N < E && (N = E),
        N === E || p.length === 0 || this.length === 0)
      )
        return 0;
      if (f < 0) throw new RangeError("targetStart out of bounds");
      if (E < 0 || E >= this.length) throw new RangeError("Index out of range");
      if (N < 0) throw new RangeError("sourceEnd out of bounds");
      (N > this.length && (N = this.length),
        p.length - f < N - E && (N = p.length - f + E));
      const j = N - E;
      return (
        this === p && typeof a.prototype.copyWithin == "function"
          ? this.copyWithin(f, E, N)
          : a.prototype.set.call(p, this.subarray(E, N), f),
        j
      );
    }),
    (c.prototype.fill = function (p, f, E, N) {
      if (typeof p == "string") {
        if (
          (typeof f == "string"
            ? ((N = f), (f = 0), (E = this.length))
            : typeof E == "string" && ((N = E), (E = this.length)),
          N !== void 0 && typeof N != "string")
        )
          throw new TypeError("encoding must be a string");
        if (typeof N == "string" && !c.isEncoding(N))
          throw new TypeError("Unknown encoding: " + N);
        if (p.length === 1) {
          const F = p.charCodeAt(0);
          ((N === "utf8" && F < 128) || N === "latin1") && (p = F);
        }
      } else
        typeof p == "number"
          ? (p = p & 255)
          : typeof p == "boolean" && (p = Number(p));
      if (f < 0 || this.length < f || this.length < E)
        throw new RangeError("Out of range index");
      if (E <= f) return this;
      ((f = f >>> 0), (E = E === void 0 ? this.length : E >>> 0), p || (p = 0));
      let j;
      if (typeof p == "number") for (j = f; j < E; ++j) this[j] = p;
      else {
        const F = c.isBuffer(p) ? p : c.from(p, N),
          Se = F.length;
        if (Se === 0)
          throw new TypeError(
            'The value "' + p + '" is invalid for argument "value"',
          );
        for (j = 0; j < E - f; ++j) this[j + f] = F[j % Se];
      }
      return this;
    }));
  const oe = {};
  function ce(x, p, f) {
    oe[x] = class extends f {
      constructor() {
        (super(),
          Object.defineProperty(this, "message", {
            value: p.apply(this, arguments),
            writable: !0,
            configurable: !0,
          }),
          (this.name = `${this.name} [${x}]`),
          this.stack,
          delete this.name);
      }
      get code() {
        return x;
      }
      set code(N) {
        Object.defineProperty(this, "code", {
          configurable: !0,
          enumerable: !0,
          value: N,
          writable: !0,
        });
      }
      toString() {
        return `${this.name} [${x}]: ${this.message}`;
      }
    };
  }
  (ce(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function (x) {
      return x
        ? `${x} is outside of buffer bounds`
        : "Attempt to access memory outside buffer bounds";
    },
    RangeError,
  ),
    ce(
      "ERR_INVALID_ARG_TYPE",
      function (x, p) {
        return `The "${x}" argument must be of type number. Received type ${typeof p}`;
      },
      TypeError,
    ),
    ce(
      "ERR_OUT_OF_RANGE",
      function (x, p, f) {
        let E = `The value of "${x}" is out of range.`,
          N = f;
        return (
          Number.isInteger(f) && Math.abs(f) > 2 ** 32
            ? (N = he(String(f)))
            : typeof f == "bigint" &&
              ((N = String(f)),
              (f > BigInt(2) ** BigInt(32) || f < -(BigInt(2) ** BigInt(32))) &&
                (N = he(N)),
              (N += "n")),
          (E += ` It must be ${p}. Received ${N}`),
          E
        );
      },
      RangeError,
    ));
  function he(x) {
    let p = "",
      f = x.length;
    const E = x[0] === "-" ? 1 : 0;
    for (; f >= E + 4; f -= 3) p = `_${x.slice(f - 3, f)}${p}`;
    return `${x.slice(0, f)}${p}`;
  }
  function Te(x, p, f) {
    (Q(p, "offset"),
      (x[p] === void 0 || x[p + f] === void 0) && me(p, x.length - (f + 1)));
  }
  function se(x, p, f, E, N, j) {
    if (x > f || x < p) {
      const F = typeof p == "bigint" ? "n" : "";
      let Se;
      throw (
        p === 0 || p === BigInt(0)
          ? (Se = `>= 0${F} and < 2${F} ** ${(j + 1) * 8}${F}`)
          : (Se = `>= -(2${F} ** ${(j + 1) * 8 - 1}${F}) and < 2 ** ${(j + 1) * 8 - 1}${F}`),
        new oe.ERR_OUT_OF_RANGE("value", Se, x)
      );
    }
    Te(E, N, j);
  }
  function Q(x, p) {
    if (typeof x != "number") throw new oe.ERR_INVALID_ARG_TYPE(p, "number", x);
  }
  function me(x, p, f) {
    throw Math.floor(x) !== x
      ? (Q(x, f), new oe.ERR_OUT_OF_RANGE("offset", "an integer", x))
      : p < 0
        ? new oe.ERR_BUFFER_OUT_OF_BOUNDS()
        : new oe.ERR_OUT_OF_RANGE("offset", `>= 0 and <= ${p}`, x);
  }
  const ge = /[^+/0-9A-Za-z-_]/g;
  function _e(x) {
    if (((x = x.split("=")[0]), (x = x.trim().replace(ge, "")), x.length < 2))
      return "";
    for (; x.length % 4 !== 0;) x = x + "=";
    return x;
  }
  function we(x, p) {
    p = p || 1 / 0;
    let f;
    const E = x.length;
    let N = null;
    const j = [];
    for (let F = 0; F < E; ++F) {
      if (((f = x.charCodeAt(F)), f > 55295 && f < 57344)) {
        if (!N) {
          if (f > 56319) {
            (p -= 3) > -1 && j.push(239, 191, 189);
            continue;
          } else if (F + 1 === E) {
            (p -= 3) > -1 && j.push(239, 191, 189);
            continue;
          }
          N = f;
          continue;
        }
        if (f < 56320) {
          ((p -= 3) > -1 && j.push(239, 191, 189), (N = f));
          continue;
        }
        f = (((N - 55296) << 10) | (f - 56320)) + 65536;
      } else N && (p -= 3) > -1 && j.push(239, 191, 189);
      if (((N = null), f < 128)) {
        if ((p -= 1) < 0) break;
        j.push(f);
      } else if (f < 2048) {
        if ((p -= 2) < 0) break;
        j.push((f >> 6) | 192, (f & 63) | 128);
      } else if (f < 65536) {
        if ((p -= 3) < 0) break;
        j.push((f >> 12) | 224, ((f >> 6) & 63) | 128, (f & 63) | 128);
      } else if (f < 1114112) {
        if ((p -= 4) < 0) break;
        j.push(
          (f >> 18) | 240,
          ((f >> 12) & 63) | 128,
          ((f >> 6) & 63) | 128,
          (f & 63) | 128,
        );
      } else throw new Error("Invalid code point");
    }
    return j;
  }
  function Ue(x) {
    const p = [];
    for (let f = 0; f < x.length; ++f) p.push(x.charCodeAt(f) & 255);
    return p;
  }
  function Ie(x, p) {
    let f, E, N;
    const j = [];
    for (let F = 0; F < x.length && !((p -= 2) < 0); ++F)
      ((f = x.charCodeAt(F)),
        (E = f >> 8),
        (N = f % 256),
        j.push(N),
        j.push(E));
    return j;
  }
  function Ae(x) {
    return t.toByteArray(_e(x));
  }
  function Et(x, p, f, E) {
    let N;
    for (N = 0; N < E && !(N + f >= p.length || N >= x.length); ++N)
      p[N + f] = x[N];
    return N;
  }
  function et(x, p) {
    return (
      x instanceof p ||
      (x != null &&
        x.constructor != null &&
        x.constructor.name != null &&
        x.constructor.name === p.name)
    );
  }
  function xo(x) {
    return x !== x;
  }
  const Vi = (function () {
    const x = "0123456789abcdef",
      p = new Array(256);
    for (let f = 0; f < 16; ++f) {
      const E = f * 16;
      for (let N = 0; N < 16; ++N) p[E + N] = x[f] + x[N];
    }
    return p;
  })();
  function vr(x) {
    return typeof BigInt > "u" ? Gw : x;
  }
  function Gw() {
    throw new Error("BigInt not supported");
  }
})($0);
const Tm = $0.Buffer,
  HT = O.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  WT = (e) => {
    const t = {};
    let r, n, o;
    return (
      e &&
        e
          .split(
            `
`,
          )
          .forEach(function (i) {
            ((o = i.indexOf(":")),
              (r = i.substring(0, o).trim().toLowerCase()),
              (n = i.substring(o + 1).trim()),
              !(!r || (t[r] && HT[r])) &&
                (r === "set-cookie"
                  ? t[r]
                    ? t[r].push(n)
                    : (t[r] = [n])
                  : (t[r] = t[r] ? t[r] + ", " + n : n)));
          }),
      t
    );
  };
function VT(e) {
  let t = 0,
    r = e.length;
  for (; t < r;) {
    const n = e.charCodeAt(t);
    if (n !== 9 && n !== 32) break;
    t += 1;
  }
  for (; r > t;) {
    const n = e.charCodeAt(r - 1);
    if (n !== 9 && n !== 32) break;
    r -= 1;
  }
  return t === 0 && r === e.length ? e : e.slice(t, r);
}
const qT = new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g"),
  QT = new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
function sf(e, t) {
  return O.isArray(e) ? e.map((r) => sf(r, t)) : VT(String(e).replace(t, ""));
}
const KT = (e) => sf(e, qT),
  GT = (e) => sf(e, QT);
function z0(e) {
  const t = Object.create(null);
  return (
    O.forEach(e.toJSON(), (r, n) => {
      t[n] = GT(r);
    }),
    t
  );
}
const Pm = Symbol("internals");
function Aa(e) {
  return e && String(e).trim().toLowerCase();
}
function Ls(e) {
  return e === !1 || e == null ? e : O.isArray(e) ? e.map(Ls) : KT(String(e));
}
function XT(e) {
  const t = Object.create(null),
    r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; (n = r.exec(e));) t[n[1]] = n[2];
  return t;
}
const JT = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function oc(e, t, r, n, o) {
  if (O.isFunction(n)) return n.call(this, t, r);
  if ((o && (t = r), !!O.isString(t))) {
    if (O.isString(n)) return t.indexOf(n) !== -1;
    if (O.isRegExp(n)) return n.test(t);
  }
}
function ZT(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function eP(e, t) {
  const r = O.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      __proto__: null,
      value: function (o, a, i) {
        return this[n].call(this, t, o, a, i);
      },
      configurable: !0,
    });
  });
}
let Ot = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, r, n) {
    const o = this;
    function a(s, l, u) {
      const c = Aa(l);
      if (!c) return;
      const d = O.findKey(o, c);
      (!d || o[d] === void 0 || u === !0 || (u === void 0 && o[d] !== !1)) &&
        (o[d || l] = Ls(s));
    }
    const i = (s, l) => O.forEach(s, (u, c) => a(u, c, l));
    if (O.isPlainObject(t) || t instanceof this.constructor) i(t, r);
    else if (O.isString(t) && (t = t.trim()) && !JT(t)) i(WT(t), r);
    else if (O.isObject(t) && O.isSafeIterable(t)) {
      let s = Object.create(null),
        l,
        u;
      for (const c of t) {
        if (!O.isArray(c))
          throw new TypeError("Object iterator must return a key-value pair");
        ((u = c[0]),
          O.hasOwnProp(s, u)
            ? ((l = s[u]), (s[u] = O.isArray(l) ? [...l, c[1]] : [l, c[1]]))
            : (s[u] = c[1]));
      }
      i(s, r);
    } else t != null && a(r, t, n);
    return this;
  }
  get(t, r) {
    if (((t = Aa(t)), t)) {
      const n = O.findKey(this, t);
      if (n) {
        const o = this[n];
        if (!r) return o;
        if (r === !0) return XT(o);
        if (O.isFunction(r)) return r.call(this, o, n);
        if (O.isRegExp(r)) return r.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (((t = Aa(t)), t)) {
      const n = O.findKey(this, t);
      return !!(n && this[n] !== void 0 && (!r || oc(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let o = !1;
    function a(i) {
      if (((i = Aa(i)), i)) {
        const s = O.findKey(n, i);
        s && (!r || oc(n, n[s], s, r)) && (delete n[s], (o = !0));
      }
    }
    return (O.isArray(t) ? t.forEach(a) : a(t), o);
  }
  clear(t) {
    const r = Object.keys(this);
    let n = r.length,
      o = !1;
    for (; n--;) {
      const a = r[n];
      (!t || oc(this, this[a], a, t, !0)) && (delete this[a], (o = !0));
    }
    return o;
  }
  normalize(t) {
    const r = this,
      n = {};
    return (
      O.forEach(this, (o, a) => {
        const i = O.findKey(n, a);
        if (i) {
          ((r[i] = Ls(o)), delete r[a]);
          return;
        }
        const s = t ? ZT(a) : String(a).trim();
        (s !== a && delete r[a], (r[s] = Ls(o)), (n[s] = !0));
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const r = Object.create(null);
    return (
      O.forEach(this, (n, o) => {
        n != null && n !== !1 && (r[o] = t && O.isArray(n) ? n.join(", ") : n);
      }),
      r
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, r]) => t + ": " + r).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...r) {
    const n = new this(t);
    return (r.forEach((o) => n.set(o)), n);
  }
  static accessor(t) {
    const n = (this[Pm] = this[Pm] = { accessors: {} }).accessors,
      o = this.prototype;
    function a(i) {
      const s = Aa(i);
      n[s] || (eP(o, i), (n[s] = !0));
    }
    return (O.isArray(t) ? t.forEach(a) : a(t), this);
  }
};
Ot.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
O.reduceDescriptors(Ot.prototype, ({ value: e }, t) => {
  let r = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(n) {
      this[r] = n;
    },
  };
});
O.freezeMethods(Ot);
const tP = "[REDACTED ****]";
function rP(e) {
  if (O.hasOwnProp(e, "toJSON")) return !0;
  let t = Object.getPrototypeOf(e);
  for (; t && t !== Object.prototype;) {
    if (O.hasOwnProp(t, "toJSON")) return !0;
    t = Object.getPrototypeOf(t);
  }
  return !1;
}
function nP(e, t) {
  const r = new Set(t.map((a) => String(a).toLowerCase())),
    n = [],
    o = (a) => {
      if (a === null || typeof a != "object" || O.isBuffer(a)) return a;
      if (n.indexOf(a) !== -1) return;
      (a instanceof Ot && (a = a.toJSON()), n.push(a));
      let i;
      if (O.isArray(a))
        ((i = []),
          a.forEach((s, l) => {
            const u = o(s);
            O.isUndefined(u) || (i[l] = u);
          }));
      else {
        if (!O.isPlainObject(a) && rP(a)) return (n.pop(), a);
        i = Object.create(null);
        for (const [s, l] of Object.entries(a)) {
          const u = r.has(s.toLowerCase()) ? tP : o(l);
          O.isUndefined(u) || (i[s] = u);
        }
      }
      return (n.pop(), i);
    };
  return o(e);
}
let H = class H0 extends Error {
  static from(t, r, n, o, a, i) {
    const s = new H0(t.message, r || t.code, n, o, a);
    return (
      Object.defineProperty(s, "cause", {
        __proto__: null,
        value: t,
        writable: !0,
        enumerable: !1,
        configurable: !0,
      }),
      (s.name = t.name),
      t.status != null && s.status == null && (s.status = t.status),
      i && Object.assign(s, i),
      s
    );
  }
  constructor(t, r, n, o, a) {
    (super(t),
      Object.defineProperty(this, "message", {
        __proto__: null,
        value: t,
        enumerable: !0,
        writable: !0,
        configurable: !0,
      }),
      (this.name = "AxiosError"),
      (this.isAxiosError = !0),
      r && (this.code = r),
      n && (this.config = n),
      o && (this.request = o),
      a && ((this.response = a), (this.status = a.status)));
  }
  toJSON() {
    const t = this.config,
      r = t && O.hasOwnProp(t, "redact") ? t.redact : void 0,
      n = O.isArray(r) && r.length > 0 ? nP(t, r) : O.toJSONObject(t);
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: n,
      code: this.code,
      status: this.status,
    };
  }
};
H.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
H.ERR_BAD_OPTION = "ERR_BAD_OPTION";
H.ECONNABORTED = "ECONNABORTED";
H.ETIMEDOUT = "ETIMEDOUT";
H.ECONNREFUSED = "ECONNREFUSED";
H.ERR_NETWORK = "ERR_NETWORK";
H.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
H.ERR_DEPRECATED = "ERR_DEPRECATED";
H.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
H.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
H.ERR_CANCELED = "ERR_CANCELED";
H.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
H.ERR_INVALID_URL = "ERR_INVALID_URL";
H.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
const oP = null,
  W0 = 100;
function bd(e) {
  return O.isPlainObject(e) || O.isArray(e);
}
function V0(e) {
  return O.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function ac(e, t, r) {
  return e
    ? e
        .concat(t)
        .map(function (o, a) {
          return ((o = V0(o)), !r && a ? "[" + o + "]" : o);
        })
        .join(r ? "." : "")
    : t;
}
function aP(e) {
  return O.isArray(e) && !e.some(bd);
}
const iP = O.toFlatObject(O, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function du(e, t, r) {
  if (!O.isObject(e)) throw new TypeError("target must be an object");
  ((t = t || new FormData()),
    (r = O.toFlatObject(
      r,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (y, w) {
        return !O.isUndefined(w[y]);
      },
    )));
  const n = r.metaTokens,
    o = r.visitor || S,
    a = r.dots,
    i = r.indexes,
    s = r.Blob || (typeof Blob < "u" && Blob),
    l = r.maxDepth === void 0 ? W0 : r.maxDepth,
    u = s && O.isSpecCompliantForm(t),
    c = [];
  if (!O.isFunction(o)) throw new TypeError("visitor must be a function");
  function d(g) {
    if (g === null) return "";
    if (O.isDate(g)) return g.toISOString();
    if (O.isBoolean(g)) return g.toString();
    if (!u && O.isBlob(g))
      throw new H("Blob is not supported. Use a Buffer instead.");
    if (O.isArrayBuffer(g) || O.isTypedArray(g)) {
      if (u && typeof s == "function") return new s([g]);
      if (typeof Tm < "u") return Tm.from(g);
      throw new H(
        "Blob is not supported. Use a Buffer instead.",
        H.ERR_NOT_SUPPORT,
      );
    }
    return g;
  }
  function m(g) {
    if (g > l)
      throw new H(
        "Object is too deeply nested (" + g + " levels). Max depth: " + l,
        H.ERR_FORM_DATA_DEPTH_EXCEEDED,
      );
  }
  function v(g, y) {
    if (l === 1 / 0) return JSON.stringify(g);
    const w = [];
    return JSON.stringify(g, function (P, R) {
      if (!O.isObject(R)) return R;
      for (; w.length && w[w.length - 1] !== this;) w.pop();
      return (w.push(R), m(y + w.length - 1), R);
    });
  }
  function S(g, y, w) {
    let T = g;
    if (O.isReactNative(t) && O.isReactNativeBlob(g))
      return (t.append(ac(w, y, a), d(g)), !1);
    if (g && !w && typeof g == "object") {
      if (O.endsWith(y, "{}")) ((y = n ? y : y.slice(0, -2)), (g = v(g, 1)));
      else if (
        (O.isArray(g) && aP(g)) ||
        ((O.isFileList(g) || O.endsWith(y, "[]")) && (T = O.toArray(g)))
      )
        return (
          (y = V0(y)),
          T.forEach(function (R, M) {
            !(O.isUndefined(R) || R === null) &&
              t.append(
                i === !0 ? ac([y], M, a) : i === null ? y : y + "[]",
                d(R),
              );
          }),
          !1
        );
    }
    return bd(g) ? !0 : (t.append(ac(w, y, a), d(g)), !1);
  }
  const C = Object.assign(iP, {
    defaultVisitor: S,
    convertValue: d,
    isVisitable: bd,
  });
  function k(g, y, w = 0) {
    if (!O.isUndefined(g)) {
      if ((m(w), c.indexOf(g) !== -1))
        throw new Error("Circular reference detected in " + y.join("."));
      (c.push(g),
        O.forEach(g, function (P, R) {
          (!(O.isUndefined(P) || P === null) &&
            o.call(t, P, O.isString(R) ? R.trim() : R, y, C)) === !0 &&
            k(P, y ? y.concat(R) : [R], w + 1);
        }),
        c.pop());
    }
  }
  if (!O.isObject(e)) throw new TypeError("data must be an object");
  return (k(e), t);
}
function Rm(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20/g, function (n) {
    return t[n];
  });
}
function lf(e, t) {
  ((this._pairs = []), e && du(e, this, t));
}
const q0 = lf.prototype;
q0.append = function (t, r) {
  this._pairs.push([t, r]);
};
q0.toString = function (t) {
  const r = t ? (n) => t.call(this, n, Rm) : Rm;
  return this._pairs
    .map(function (o) {
      return r(o[0]) + "=" + r(o[1]);
    }, "")
    .join("&");
};
function sP(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+");
}
function Q0(e, t, r) {
  if (!t) return e;
  e = e || "";
  const n = O.isFunction(r) ? { serialize: r } : r,
    o = O.getSafeProp(n, "encode") || sP,
    a = O.getSafeProp(n, "serialize");
  let i;
  if (
    (a
      ? (i = a(t, n))
      : (i = O.isURLSearchParams(t) ? t.toString() : new lf(t, n).toString(o)),
    i)
  ) {
    const s = e.indexOf("#");
    (s !== -1 && (e = e.slice(0, s)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + i));
  }
  return e;
}
class Om {
  constructor() {
    this.handlers = [];
  }
  use(t, r, n) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: r,
        synchronous: n ? n.synchronous : !1,
        runWhen: n ? n.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    O.forEach(this.handlers, function (n) {
      n !== null && t(n);
    });
  }
}
const uf = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
    legacyInterceptorReqResOrdering: !0,
    advertiseZstdAcceptEncoding: !1,
    validateStatusUndefinedResolves: !0,
  },
  lP = typeof URLSearchParams < "u" ? URLSearchParams : lf,
  uP = typeof FormData < "u" ? FormData : null,
  cP = typeof Blob < "u" ? Blob : null,
  dP = {
    isBrowser: !0,
    classes: { URLSearchParams: lP, FormData: uP, Blob: cP },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  cf = typeof window < "u" && typeof document < "u",
  Dd = (typeof navigator == "object" && navigator) || void 0,
  pP =
    cf &&
    (!Dd || ["ReactNative", "NativeScript", "NS"].indexOf(Dd.product) < 0),
  fP =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  hP = (cf && window.location.href) || "http://localhost",
  mP = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: cf,
        hasStandardBrowserEnv: pP,
        hasStandardBrowserWebWorkerEnv: fP,
        navigator: Dd,
        origin: hP,
      },
      Symbol.toStringTag,
      { value: "Module" },
    ),
  ),
  xt = { ...mP, ...dP };
function gP(e, t) {
  return du(e, new xt.classes.URLSearchParams(), {
    visitor: function (r, n, o, a) {
      return xt.isNode && O.isBuffer(r)
        ? (this.append(n, r.toString("base64")), !1)
        : a.defaultVisitor.apply(this, arguments);
    },
    ...t,
  });
}
const Nm = W0;
function K0(e) {
  if (e > Nm)
    throw new H(
      "FormData field is too deeply nested (" +
        e +
        " levels). Max depth: " +
        Nm,
      H.ERR_FORM_DATA_DEPTH_EXCEEDED,
    );
}
function vP(e) {
  const t = [],
    r = /\w+|\[(\w*)]/g;
  let n;
  for (; (n = r.exec(e)) !== null;)
    (K0(t.length), t.push(n[0] === "[]" ? "" : n[1] || n[0]));
  return t;
}
function yP(e) {
  const t = {},
    r = Object.keys(e);
  let n;
  const o = r.length;
  let a;
  for (n = 0; n < o; n++) ((a = r[n]), (t[a] = e[a]));
  return t;
}
function G0(e) {
  function t(r, n, o, a) {
    K0(a);
    let i = r[a++];
    if (i === "__proto__") return !0;
    const s = Number.isFinite(+i),
      l = a >= r.length;
    return (
      (i = !i && O.isArray(o) ? o.length : i),
      l
        ? (O.hasOwnProp(o, i)
            ? (o[i] = O.isArray(o[i]) ? o[i].concat(n) : [o[i], n])
            : (o[i] = n),
          !s)
        : ((!O.hasOwnProp(o, i) || !O.isObject(o[i])) && (o[i] = []),
          t(r, n, o[i], a) && O.isArray(o[i]) && (o[i] = yP(o[i])),
          !s)
    );
  }
  if (O.isFormData(e) && O.isFunction(e.entries)) {
    const r = {};
    return (
      O.forEachEntry(e, (n, o) => {
        t(vP(n), o, r, 0);
      }),
      r
    );
  }
  return null;
}
const _o = (e, t) => (e != null && O.hasOwnProp(e, t) ? e[t] : void 0);
function wP(e, t, r) {
  if (O.isString(e))
    try {
      return ((t || JSON.parse)(e), O.trim(e));
    } catch (n) {
      if (n.name !== "SyntaxError") throw n;
    }
  return (r || JSON.stringify)(e);
}
const Hi = {
  transitional: uf,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (t, r) {
      const n = r.getContentType() || "",
        o = n.indexOf("application/json") > -1,
        a = O.isObject(t);
      if ((a && O.isHTMLForm(t) && (t = new FormData(t)), O.isFormData(t)))
        return o ? JSON.stringify(G0(t)) : t;
      if (
        O.isArrayBuffer(t) ||
        O.isBuffer(t) ||
        O.isStream(t) ||
        O.isFile(t) ||
        O.isBlob(t) ||
        O.isReadableStream(t)
      )
        return t;
      if (O.isArrayBufferView(t)) return t.buffer;
      if (O.isURLSearchParams(t))
        return (
          r.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1,
          ),
          t.toString()
        );
      let s;
      if (a) {
        const l = _o(this, "formSerializer");
        if (n.indexOf("application/x-www-form-urlencoded") > -1)
          return gP(t, l).toString();
        if ((s = O.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
          const u = _o(this, "env"),
            c = u && u.FormData;
          return du(s ? { "files[]": t } : t, c && new c(), l);
        }
      }
      return a || o ? (r.setContentType("application/json", !1), wP(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const r = _o(this, "transitional") || Hi.transitional,
        n = r && r.forcedJSONParsing,
        o = _o(this, "responseType"),
        a = o === "json";
      if (O.isResponse(t) || O.isReadableStream(t)) return t;
      if (t && O.isString(t) && ((n && !o) || a)) {
        const s = !(r && r.silentJSONParsing) && a;
        try {
          return JSON.parse(t, _o(this, "parseReviver"));
        } catch (l) {
          if (s)
            throw l.name === "SyntaxError"
              ? H.from(l, H.ERR_BAD_RESPONSE, this, null, _o(this, "response"))
              : l;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: xt.classes.FormData, Blob: xt.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
O.forEach(["delete", "get", "head", "post", "put", "patch", "query"], (e) => {
  Hi.headers[e] = {};
});
function ic(e, t) {
  const r = this || Hi,
    n = t || r,
    o = Ot.from(n.headers);
  let a = n.data;
  return (
    O.forEach(e, function (s) {
      a = s.call(r, a, o.normalize(), t ? t.status : void 0);
    }),
    o.normalize(),
    a
  );
}
function X0(e) {
  return !!(e && e.__CANCEL__);
}
let Wi = class extends H {
  constructor(t, r, n) {
    (super(t ?? "canceled", H.ERR_CANCELED, r, n),
      (this.name = "CanceledError"),
      (this.__CANCEL__ = !0));
  }
};
function J0(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status)
    ? e(r)
    : t(
        new H(
          "Request failed with status code " + r.status,
          r.status >= 400 && r.status < 500
            ? H.ERR_BAD_REQUEST
            : H.ERR_BAD_RESPONSE,
          r.config,
          r.request,
          r,
        ),
      );
}
function xP(e) {
  const t = /^([-+\w]{1,25}):(?:\/\/)?/.exec(e);
  return (t && t[1]) || "";
}
function SP(e, t) {
  e = e || 10;
  const r = new Array(e),
    n = new Array(e);
  let o = 0,
    a = 0,
    i;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (l) {
      const u = Date.now(),
        c = n[a];
      (i || (i = u), (r[o] = l), (n[o] = u));
      let d = a,
        m = 0;
      for (; d !== o;) ((m += r[d++]), (d = d % e));
      if (((o = (o + 1) % e), o === a && (a = (a + 1) % e), u - i < t)) return;
      const v = c && u - c;
      return v ? Math.round((m * 1e3) / v) : void 0;
    }
  );
}
function CP(e, t) {
  let r = 0,
    n = 1e3 / t,
    o,
    a;
  const i = (u, c = Date.now()) => {
    ((r = c), (o = null), a && (clearTimeout(a), (a = null)), e(...u));
  };
  return [
    (...u) => {
      const c = Date.now(),
        d = c - r;
      d >= n
        ? i(u, c)
        : ((o = u),
          a ||
            (a = setTimeout(() => {
              ((a = null), i(o));
            }, n - d)));
    },
    () => o && i(o),
  ];
}
const Ol = (e, t, r = 3) => {
    let n = 0;
    const o = SP(50, 250);
    return CP((a) => {
      if (!a || typeof a.loaded != "number") return;
      const i = a.loaded,
        s = a.lengthComputable ? a.total : void 0,
        l = s != null ? Math.min(i, s) : i,
        u = Math.max(0, l - n),
        c = o(u);
      n = Math.max(n, l);
      const d = {
        loaded: l,
        total: s,
        progress: s ? l / s : void 0,
        bytes: u,
        rate: c || void 0,
        estimated: c && s ? (s - l) / c : void 0,
        event: a,
        lengthComputable: s != null,
        [t ? "download" : "upload"]: !0,
      };
      e(d);
    }, r);
  },
  Mm = (e, t) => {
    const r = e != null;
    return [(n) => t[0]({ lengthComputable: r, total: e, loaded: n }), t[1]];
  },
  Im =
    (e) =>
    (...t) =>
      O.asap(() => e(...t)),
  kP = xt.hasStandardBrowserEnv
    ? ((e, t) => (r) => (
        (r = new URL(r, xt.origin)),
        e.protocol === r.protocol &&
          e.host === r.host &&
          (t || e.port === r.port)
      ))(
        new URL(xt.origin),
        xt.navigator && /(msie|trident)/i.test(xt.navigator.userAgent),
      )
    : () => !0,
  EP = xt.hasStandardBrowserEnv
    ? {
        write(e, t, r, n, o, a, i) {
          if (typeof document > "u") return;
          const s = [`${e}=${encodeURIComponent(t)}`];
          (O.isNumber(r) && s.push(`expires=${new Date(r).toUTCString()}`),
            O.isString(n) && s.push(`path=${n}`),
            O.isString(o) && s.push(`domain=${o}`),
            a === !0 && s.push("secure"),
            O.isString(i) && s.push(`SameSite=${i}`),
            (document.cookie = s.join("; ")));
        },
        read(e) {
          if (typeof document > "u") return null;
          const t = document.cookie.split(";");
          for (let r = 0; r < t.length; r++) {
            const n = t[r].replace(/^\s+/, ""),
              o = n.indexOf("=");
            if (o !== -1 && n.slice(0, o) === e)
              try {
                return decodeURIComponent(n.slice(o + 1));
              } catch {
                return n.slice(o + 1);
              }
          }
          return null;
        },
        remove(e) {
          this.write(e, "", Date.now() - 864e5, "/");
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function _P(e) {
  return typeof e != "string" ? !1 : /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function bP(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
const DP = /^https?:(?!\/\/)/i,
  TP = /[\t\n\r]/g;
function PP(e) {
  let t = 0;
  for (; t < e.length && e.charCodeAt(t) <= 32;) t++;
  return e.slice(t);
}
function RP(e) {
  return PP(e).replace(TP, "");
}
function jm(e, t) {
  if (typeof e == "string" && DP.test(RP(e)))
    throw new H(
      'Invalid URL: missing "//" after protocol',
      H.ERR_INVALID_URL,
      t,
    );
}
function Z0(e, t, r, n) {
  jm(t, n);
  let o = !_P(t);
  return e && (o || r === !1) ? (jm(e, n), bP(e, t)) : t;
}
const Lm = (e) => (e instanceof Ot ? { ...e } : e);
function fo(e, t) {
  ((e = e || {}), (t = t || {}));
  const r = Object.create(null);
  Object.defineProperty(r, "hasOwnProperty", {
    __proto__: null,
    value: Object.prototype.hasOwnProperty,
    enumerable: !1,
    writable: !0,
    configurable: !0,
  });
  function n(c, d, m, v) {
    return O.isPlainObject(c) && O.isPlainObject(d)
      ? O.merge.call({ caseless: v }, c, d)
      : O.isPlainObject(d)
        ? O.merge({}, d)
        : O.isArray(d)
          ? d.slice()
          : d;
  }
  function o(c, d, m, v) {
    if (O.isUndefined(d)) {
      if (!O.isUndefined(c)) return n(void 0, c, m, v);
    } else return n(c, d, m, v);
  }
  function a(c, d) {
    if (!O.isUndefined(d)) return n(void 0, d);
  }
  function i(c, d) {
    if (O.isUndefined(d)) {
      if (!O.isUndefined(c)) return n(void 0, c);
    } else return n(void 0, d);
  }
  function s(c) {
    const d = O.hasOwnProp(t, "transitional") ? t.transitional : void 0;
    if (!O.isUndefined(d))
      if (O.isPlainObject(d)) {
        if (O.hasOwnProp(d, c)) return d[c];
      } else return;
    const m = O.hasOwnProp(e, "transitional") ? e.transitional : void 0;
    if (O.isPlainObject(m) && O.hasOwnProp(m, c)) return m[c];
  }
  function l(c, d, m) {
    if (O.hasOwnProp(t, m)) return n(c, d);
    if (O.hasOwnProp(e, m)) return n(void 0, c);
  }
  const u = {
    url: a,
    method: a,
    data: a,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    allowedSocketPaths: i,
    responseEncoding: i,
    validateStatus: l,
    headers: (c, d, m) => o(Lm(c), Lm(d), m, !0),
  };
  return (
    O.forEach(Object.keys({ ...e, ...t }), function (d) {
      if (d === "__proto__" || d === "constructor" || d === "prototype") return;
      const m = O.hasOwnProp(u, d) ? u[d] : o,
        v = O.hasOwnProp(e, d) ? e[d] : void 0,
        S = O.hasOwnProp(t, d) ? t[d] : void 0,
        C = m(v, S, d);
      (O.isUndefined(C) && m !== l) || (r[d] = C);
    }),
    O.hasOwnProp(t, "validateStatus") &&
      O.isUndefined(t.validateStatus) &&
      s("validateStatusUndefinedResolves") === !1 &&
      (O.hasOwnProp(e, "validateStatus")
        ? (r.validateStatus = n(void 0, e.validateStatus))
        : delete r.validateStatus),
    r
  );
}
const OP = ["content-type", "content-length"];
function NP(e, t, r) {
  if (r !== "content-only") {
    e.set(t);
    return;
  }
  Object.entries(t || {}).forEach(([n, o]) => {
    OP.includes(n.toLowerCase()) && e.set(n, o);
  });
}
const MP = (e) =>
  encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi, (t, r) =>
    String.fromCharCode(parseInt(r, 16)),
  );
function ew(e) {
  const t = fo({}, e),
    r = (m) => (O.hasOwnProp(t, m) ? t[m] : void 0),
    n = r("data");
  let o = r("withXSRFToken");
  const a = r("xsrfHeaderName"),
    i = r("xsrfCookieName");
  let s = r("headers");
  const l = r("auth"),
    u = r("baseURL"),
    c = r("allowAbsoluteUrls"),
    d = r("url");
  if (
    ((t.headers = s = Ot.from(s)),
    (t.url = Q0(Z0(u, d, c, t), r("params"), r("paramsSerializer"))),
    l)
  ) {
    const m = O.getSafeProp(l, "username") || "",
      v = O.getSafeProp(l, "password") || "";
    try {
      s.set("Authorization", "Basic " + btoa(m + ":" + (v ? MP(v) : "")));
    } catch (S) {
      throw H.from(S, H.ERR_BAD_OPTION_VALUE, e);
    }
  }
  if (
    (O.isFormData(n) &&
      (xt.hasStandardBrowserEnv ||
      xt.hasStandardBrowserWebWorkerEnv ||
      O.isReactNative(n)
        ? s.setContentType(void 0)
        : O.isFunction(n.getHeaders) &&
          NP(s, n.getHeaders(), r("formDataHeaderPolicy"))),
    xt.hasStandardBrowserEnv &&
      (O.isFunction(o) && (o = o(t)), o === !0 || (o == null && kP(t.url))))
  ) {
    const v = a && i && EP.read(i);
    v && s.set(a, v);
  }
  return t;
}
const IP = typeof XMLHttpRequest < "u",
  jP =
    IP &&
    function (e) {
      return new Promise(function (r, n) {
        const o = ew(e);
        let a = o.data;
        const i = Ot.from(o.headers).normalize();
        let { responseType: s, onUploadProgress: l, onDownloadProgress: u } = o,
          c,
          d,
          m,
          v,
          S;
        function C() {
          (v && v(),
            S && S(),
            o.cancelToken && o.cancelToken.unsubscribe(c),
            o.signal && o.signal.removeEventListener("abort", c));
        }
        let k = new XMLHttpRequest();
        (k.open(o.method.toUpperCase(), o.url, !0), (k.timeout = o.timeout));
        function g() {
          if (!k) return;
          const w = Ot.from(
              "getAllResponseHeaders" in k && k.getAllResponseHeaders(),
            ),
            P = {
              data:
                !s || s === "text" || s === "json"
                  ? k.responseText
                  : k.response,
              status: k.status,
              statusText: k.statusText,
              headers: w,
              config: e,
              request: k,
            };
          (J0(
            function (M) {
              (r(M), C());
            },
            function (M) {
              (n(M), C());
            },
            P,
          ),
            (k = null));
        }
        ("onloadend" in k
          ? (k.onloadend = g)
          : (k.onreadystatechange = function () {
              !k ||
                k.readyState !== 4 ||
                (k.status === 0 &&
                  !(k.responseURL && k.responseURL.startsWith("file:"))) ||
                setTimeout(g);
            }),
          (k.onabort = function () {
            k &&
              (n(new H("Request aborted", H.ECONNABORTED, e, k)),
              C(),
              (k = null));
          }),
          (k.onerror = function (T) {
            const P = T && T.message ? T.message : "Network Error",
              R = new H(P, H.ERR_NETWORK, e, k);
            ((R.event = T || null), n(R), C(), (k = null));
          }),
          (k.ontimeout = function () {
            let T = o.timeout
              ? "timeout of " + o.timeout + "ms exceeded"
              : "timeout exceeded";
            const P = o.transitional || uf;
            (o.timeoutErrorMessage && (T = o.timeoutErrorMessage),
              n(
                new H(
                  T,
                  P.clarifyTimeoutError ? H.ETIMEDOUT : H.ECONNABORTED,
                  e,
                  k,
                ),
              ),
              C(),
              (k = null));
          }),
          a === void 0 && i.setContentType(null),
          "setRequestHeader" in k &&
            O.forEach(z0(i), function (T, P) {
              k.setRequestHeader(P, T);
            }),
          O.isUndefined(o.withCredentials) ||
            (k.withCredentials = !!o.withCredentials),
          s && s !== "json" && (k.responseType = o.responseType),
          u && (([m, S] = Ol(u, !0)), k.addEventListener("progress", m)),
          l &&
            k.upload &&
            (([d, v] = Ol(l)),
            k.upload.addEventListener("progress", d),
            k.upload.addEventListener("loadend", v)),
          (o.cancelToken || o.signal) &&
            ((c = (w) => {
              k &&
                (n(!w || w.type ? new Wi(null, e, k) : w),
                k.abort(),
                C(),
                (k = null));
            }),
            o.cancelToken && o.cancelToken.subscribe(c),
            o.signal &&
              (o.signal.aborted
                ? c()
                : o.signal.addEventListener("abort", c))));
        const y = xP(o.url);
        if (y && !xt.protocols.includes(y)) {
          (n(new H("Unsupported protocol " + y + ":", H.ERR_BAD_REQUEST, e)),
            C());
          return;
        }
        k.send(a || null);
      });
    },
  LP = (e, t) => {
    if (((e = e ? e.filter(Boolean) : []), !t && !e.length)) return;
    const r = new AbortController();
    let n = !1;
    const o = function (l) {
      if (!n) {
        ((n = !0), i());
        const u = l instanceof Error ? l : this.reason;
        r.abort(
          u instanceof H ? u : new Wi(u instanceof Error ? u.message : u),
        );
      }
    };
    let a =
      t &&
      setTimeout(() => {
        ((a = null), o(new H(`timeout of ${t}ms exceeded`, H.ETIMEDOUT)));
      }, t);
    const i = () => {
      e &&
        (a && clearTimeout(a),
        (a = null),
        e.forEach((l) => {
          l.unsubscribe ? l.unsubscribe(o) : l.removeEventListener("abort", o);
        }),
        (e = null));
    };
    e.forEach((l) => l.addEventListener("abort", o, { once: !0 }));
    const { signal: s } = r;
    return ((s.unsubscribe = () => O.asap(i)), s);
  },
  AP = function* (e, t) {
    let r = e.byteLength;
    if (r < t) {
      yield e;
      return;
    }
    let n = 0,
      o;
    for (; n < r;) ((o = n + t), yield e.slice(n, o), (n = o));
  },
  FP = async function* (e, t) {
    for await (const r of BP(e)) yield* AP(r, t);
  },
  BP = async function* (e) {
    if (e[Symbol.asyncIterator]) {
      yield* e;
      return;
    }
    const t = e.getReader();
    try {
      for (;;) {
        const { done: r, value: n } = await t.read();
        if (r) break;
        yield n;
      }
    } finally {
      await t.cancel();
    }
  },
  Am = (e, t, r, n) => {
    const o = FP(e, t);
    let a = 0,
      i,
      s = (l) => {
        i || ((i = !0), n && n(l));
      };
    return new ReadableStream(
      {
        async pull(l) {
          try {
            const { done: u, value: c } = await o.next();
            if (u) {
              (s(), l.close());
              return;
            }
            let d = c.byteLength;
            if (r) {
              let m = (a += d);
              r(m);
            }
            l.enqueue(new Uint8Array(c));
          } catch (u) {
            throw (s(u), u);
          }
        },
        cancel(l) {
          return (s(l), o.return());
        },
      },
      { highWaterMark: 2 },
    );
  },
  Nl = (e) =>
    (e >= 48 && e <= 57) || (e >= 65 && e <= 70) || (e >= 97 && e <= 102),
  UP = (e, t, r) =>
    t + 2 < r && Nl(e.charCodeAt(t + 1)) && Nl(e.charCodeAt(t + 2));
function $P(e) {
  if (!e || typeof e != "string" || !e.startsWith("data:")) return 0;
  const t = e.indexOf(",");
  if (t < 0) return 0;
  const r = e.slice(5, t),
    n = e.slice(t + 1);
  if (/;base64/i.test(r)) {
    let i = n.length;
    const s = n.length;
    for (let v = 0; v < s; v++)
      if (n.charCodeAt(v) === 37 && v + 2 < s) {
        const S = n.charCodeAt(v + 1),
          C = n.charCodeAt(v + 2);
        Nl(S) && Nl(C) && ((i -= 2), (v += 2));
      }
    let l = 0,
      u = s - 1;
    const c = (v) =>
      v >= 2 &&
      n.charCodeAt(v - 2) === 37 &&
      n.charCodeAt(v - 1) === 51 &&
      (n.charCodeAt(v) === 68 || n.charCodeAt(v) === 100);
    (u >= 0 && (n.charCodeAt(u) === 61 ? (l++, u--) : c(u) && (l++, (u -= 3))),
      l === 1 && u >= 0 && (n.charCodeAt(u) === 61 || c(u)) && l++);
    const m = Math.floor(i / 4) * 3 - (l || 0);
    return m > 0 ? m : 0;
  }
  let a = 0;
  for (let i = 0, s = n.length; i < s; i++) {
    const l = n.charCodeAt(i);
    if (l === 37 && UP(n, i, s)) ((a += 1), (i += 2));
    else if (l < 128) a += 1;
    else if (l < 2048) a += 2;
    else if (l >= 55296 && l <= 56319 && i + 1 < s) {
      const u = n.charCodeAt(i + 1);
      u >= 56320 && u <= 57343 ? ((a += 4), i++) : (a += 3);
    } else a += 3;
  }
  return a;
}
const df = "1.18.1",
  Fm = 64 * 1024,
  { isFunction: hs } = O,
  YP = (e) =>
    encodeURIComponent(e).replace(/%([0-9A-F]{2})/gi, (t, r) =>
      String.fromCharCode(parseInt(r, 16)),
    ),
  Bm = (e) => {
    if (!O.isString(e)) return e;
    try {
      return decodeURIComponent(e);
    } catch {
      return e;
    }
  },
  Um = (e, ...t) => {
    try {
      return !!e(...t);
    } catch {
      return !1;
    }
  },
  zP = (e) => {
    const t = e.indexOf("://");
    let r = e;
    return (
      t !== -1 && (r = r.slice(t + 3)),
      r.includes("@") || r.includes(":")
    );
  },
  HP = (e) => {
    const t = O.global !== void 0 && O.global !== null ? O.global : globalThis,
      { ReadableStream: r, TextEncoder: n } = t;
    e = O.merge.call(
      { skipUndefined: !0 },
      { Request: t.Request, Response: t.Response },
      e,
    );
    const { fetch: o, Request: a, Response: i } = e,
      s = o ? hs(o) : typeof fetch == "function",
      l = hs(a),
      u = hs(i);
    if (!s) return !1;
    const c = s && hs(r),
      d =
        s &&
        (typeof n == "function"
          ? (
              (g) => (y) =>
                g.encode(y)
            )(new n())
          : async (g) => new Uint8Array(await new a(g).arrayBuffer())),
      m =
        l &&
        c &&
        Um(() => {
          let g = !1;
          const y = new a(xt.origin, {
              body: new r(),
              method: "POST",
              get duplex() {
                return ((g = !0), "half");
              },
            }),
            w = y.headers.has("Content-Type");
          return (y.body != null && y.body.cancel(), g && !w);
        }),
      v = u && c && Um(() => O.isReadableStream(new i("").body)),
      S = { stream: v && ((g) => g.body) };
    s &&
      ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((g) => {
        !S[g] &&
          (S[g] = (y, w) => {
            let T = y && y[g];
            if (T) return T.call(y);
            throw new H(
              `Response type '${g}' is not supported`,
              H.ERR_NOT_SUPPORT,
              w,
            );
          });
      });
    const C = async (g) => {
        if (g == null) return 0;
        if (O.isBlob(g)) return g.size;
        if (O.isSpecCompliantForm(g))
          return (
            await new a(xt.origin, { method: "POST", body: g }).arrayBuffer()
          ).byteLength;
        if (O.isArrayBufferView(g) || O.isArrayBuffer(g)) return g.byteLength;
        if ((O.isURLSearchParams(g) && (g = g + ""), O.isString(g)))
          return (await d(g)).byteLength;
      },
      k = async (g, y) => {
        const w = O.toFiniteNumber(g.getContentLength());
        return w ?? C(y);
      };
    return async (g) => {
      let {
        url: y,
        method: w,
        data: T,
        signal: P,
        cancelToken: R,
        timeout: M,
        onDownloadProgress: A,
        onUploadProgress: V,
        responseType: L,
        headers: K,
        withCredentials: $ = "same-origin",
        fetchOptions: ae,
        maxContentLength: le,
        maxBodyLength: U,
      } = ew(g);
      const q = O.isNumber(le) && le > -1,
        ie = O.isNumber(U) && U > -1,
        z = (ue) => (O.hasOwnProp(g, ue) ? g[ue] : void 0);
      let G = o || fetch;
      L = L ? (L + "").toLowerCase() : "text";
      let Z = LP([P, R && R.toAbortSignal()], M),
        ne = null;
      const fe =
        Z &&
        Z.unsubscribe &&
        (() => {
          Z.unsubscribe();
        });
      let ze,
        pe = null;
      const ke = () =>
        new H(
          "Request body larger than maxBodyLength limit",
          H.ERR_BAD_REQUEST,
          g,
          ne,
        );
      try {
        let ue;
        const Ne = z("auth");
        if (Ne) {
          const Q = O.getSafeProp(Ne, "username") || "",
            me = O.getSafeProp(Ne, "password") || "";
          ue = { username: Q, password: me };
        }
        if (zP(y)) {
          const Q = new URL(y, xt.origin);
          if (!ue && (Q.username || Q.password)) {
            const me = Bm(Q.username),
              ge = Bm(Q.password);
            ue = { username: me, password: ge };
          }
          (Q.username || Q.password) &&
            ((Q.username = ""), (Q.password = ""), (y = Q.href));
        }
        if (
          (ue &&
            (K.delete("authorization"),
            K.set(
              "Authorization",
              "Basic " +
                btoa(YP((ue.username || "") + ":" + (ue.password || ""))),
            )),
          q && typeof y == "string" && y.startsWith("data:") && $P(y) > le)
        )
          throw new H(
            "maxContentLength size of " + le + " exceeded",
            H.ERR_BAD_RESPONSE,
            g,
            ne,
          );
        if (ie && w !== "get" && w !== "head") {
          const Q = await C(T);
          if (typeof Q == "number" && isFinite(Q) && ((ze = Q), Q > U))
            throw ke();
        }
        const Ee = ie && (O.isReadableStream(T) || O.isStream(T)),
          ye = (Q, me, ge) =>
            Am(
              Q,
              Fm,
              (_e) => {
                if (ie && _e > U) throw (pe = ke());
                me && me(_e);
              },
              ge,
            );
        if (m && w !== "get" && w !== "head" && (V || Ee)) {
          if (((ze = ze ?? (await k(K, T))), ze !== 0 || Ee)) {
            let Q = new a(y, { method: "POST", body: T, duplex: "half" }),
              me;
            if (
              (O.isFormData(T) &&
                (me = Q.headers.get("content-type")) &&
                K.setContentType(me),
              Q.body)
            ) {
              const [ge, _e] = (V && Mm(ze, Ol(Im(V)))) || [];
              T = ye(Q.body, ge, _e);
            }
          }
        } else if (Ee && !l && c && w !== "get" && w !== "head") T = ye(T);
        else if (Ee && l && !m && w !== "get" && w !== "head")
          throw new H(
            "Stream request bodies are not supported by the current fetch implementation",
            H.ERR_NOT_SUPPORT,
            g,
            ne,
          );
        O.isString($) || ($ = $ ? "include" : "omit");
        const B = l && "credentials" in a.prototype;
        if (O.isFormData(T)) {
          const Q = K.getContentType();
          Q &&
            /^multipart\/form-data/i.test(Q) &&
            !/boundary=/i.test(Q) &&
            K.delete("content-type");
        }
        K.set("User-Agent", "axios/" + df, !1);
        const oe = {
          ...ae,
          signal: Z,
          method: w.toUpperCase(),
          headers: z0(K.normalize()),
          body: T,
          duplex: "half",
          credentials: B ? $ : void 0,
        };
        ne = l && new a(y, oe);
        let ce = await (l ? G(ne, ae) : G(y, oe));
        const he = Ot.from(ce.headers);
        if (q) {
          const Q = O.toFiniteNumber(he.getContentLength());
          if (Q != null && Q > le)
            throw new H(
              "maxContentLength size of " + le + " exceeded",
              H.ERR_BAD_RESPONSE,
              g,
              ne,
            );
        }
        const Te = v && (L === "stream" || L === "response");
        if (v && ce.body && (A || q || (Te && fe))) {
          const Q = {};
          ["status", "statusText", "headers"].forEach((Ie) => {
            Q[Ie] = ce[Ie];
          });
          const me = O.toFiniteNumber(he.getContentLength()),
            [ge, _e] = (A && Mm(me, Ol(Im(A), !0))) || [];
          let we = 0;
          const Ue = (Ie) => {
            if (q && ((we = Ie), we > le))
              throw new H(
                "maxContentLength size of " + le + " exceeded",
                H.ERR_BAD_RESPONSE,
                g,
                ne,
              );
            ge && ge(Ie);
          };
          ce = new i(
            Am(ce.body, Fm, Ue, () => {
              (_e && _e(), fe && fe());
            }),
            Q,
          );
        }
        L = L || "text";
        let se = await S[O.findKey(S, L) || "text"](ce, g);
        if (q && !v && !Te) {
          let Q;
          if (
            (se != null &&
              (typeof se.byteLength == "number"
                ? (Q = se.byteLength)
                : typeof se.size == "number"
                  ? (Q = se.size)
                  : typeof se == "string" &&
                    (Q =
                      typeof n == "function"
                        ? new n().encode(se).byteLength
                        : se.length)),
            typeof Q == "number" && Q > le)
          )
            throw new H(
              "maxContentLength size of " + le + " exceeded",
              H.ERR_BAD_RESPONSE,
              g,
              ne,
            );
        }
        return (
          !Te && fe && fe(),
          await new Promise((Q, me) => {
            J0(Q, me, {
              data: se,
              headers: Ot.from(ce.headers),
              status: ce.status,
              statusText: ce.statusText,
              config: g,
              request: ne,
            });
          })
        );
      } catch (ue) {
        if ((fe && fe(), Z && Z.aborted && Z.reason instanceof H)) {
          const Ne = Z.reason;
          throw (
            (Ne.config = g),
            ne && (Ne.request = ne),
            ue !== Ne &&
              Object.defineProperty(Ne, "cause", {
                __proto__: null,
                value: ue,
                writable: !0,
                enumerable: !1,
                configurable: !0,
              }),
            Ne
          );
        }
        if (pe) throw (ne && !pe.request && (pe.request = ne), pe);
        if (ue instanceof H) throw (ne && !ue.request && (ue.request = ne), ue);
        if (
          ue &&
          ue.name === "TypeError" &&
          /Load failed|fetch/i.test(ue.message)
        ) {
          const Ne = new H(
            "Network Error",
            H.ERR_NETWORK,
            g,
            ne,
            ue && ue.response,
          );
          throw (
            Object.defineProperty(Ne, "cause", {
              __proto__: null,
              value: ue.cause || ue,
              writable: !0,
              enumerable: !1,
              configurable: !0,
            }),
            Ne
          );
        }
        throw H.from(ue, ue && ue.code, g, ne, ue && ue.response);
      }
    };
  },
  WP = new Map(),
  tw = (e) => {
    let t = (e && e.env) || {};
    const { fetch: r, Request: n, Response: o } = t,
      a = [n, o, r];
    let i = a.length,
      s = i,
      l,
      u,
      c = WP;
    for (; s--;)
      ((l = a[s]),
        (u = c.get(l)),
        u === void 0 && c.set(l, (u = s ? new Map() : HP(t))),
        (c = u));
    return u;
  };
tw();
const pf = { http: oP, xhr: jP, fetch: { get: tw } };
O.forEach(pf, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { __proto__: null, value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { __proto__: null, value: t });
  }
});
const $m = (e) => `- ${e}`,
  VP = (e) => O.isFunction(e) || e === null || e === !1;
function qP(e, t) {
  e = O.isArray(e) ? e : [e];
  const { length: r } = e;
  let n, o;
  const a = {};
  for (let i = 0; i < r; i++) {
    n = e[i];
    let s;
    if (
      ((o = n),
      !VP(n) && ((o = pf[(s = String(n)).toLowerCase()]), o === void 0))
    )
      throw new H(`Unknown adapter '${s}'`);
    if (o && (O.isFunction(o) || (o = o.get(t)))) break;
    a[s || "#" + i] = o;
  }
  if (!o) {
    const i = Object.entries(a).map(
      ([l, u]) =>
        `adapter ${l} ` +
        (u === !1
          ? "is not supported by the environment"
          : "is not available in the build"),
    );
    let s = r
      ? i.length > 1
        ? `since :
` +
          i.map($m).join(`
`)
        : " " + $m(i[0])
      : "as no adapter specified";
    throw new H(
      "There is no suitable adapter to dispatch the request " + s,
      H.ERR_NOT_SUPPORT,
    );
  }
  return o;
}
const rw = { getAdapter: qP, adapters: pf };
function sc(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new Wi(null, e);
}
function Ym(e) {
  return (
    sc(e),
    (e.headers = Ot.from(e.headers)),
    (e.data = ic.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    rw
      .getAdapter(
        e.adapter || Hi.adapter,
        e,
      )(e)
      .then(
        function (n) {
          (sc(e), (e.response = n));
          try {
            n.data = ic.call(e, e.transformResponse, n);
          } finally {
            delete e.response;
          }
          return ((n.headers = Ot.from(n.headers)), n);
        },
        function (n) {
          if (!X0(n) && (sc(e), n && n.response)) {
            e.response = n.response;
            try {
              n.response.data = ic.call(e, e.transformResponse, n.response);
            } finally {
              delete e.response;
            }
            n.response.headers = Ot.from(n.response.headers);
          }
          return Promise.reject(n);
        },
      )
  );
}
const pu = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    pu[e] = function (n) {
      return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  },
);
const zm = {};
pu.transitional = function (t, r, n) {
  function o(a, i) {
    return (
      "[Axios v" +
      df +
      "] Transitional option '" +
      a +
      "'" +
      i +
      (n ? ". " + n : "")
    );
  }
  return (a, i, s) => {
    if (t === !1)
      throw new H(
        o(i, " has been removed" + (r ? " in " + r : "")),
        H.ERR_DEPRECATED,
      );
    return (
      r &&
        !zm[i] &&
        ((zm[i] = !0),
        console.warn(
          o(
            i,
            " has been deprecated since v" +
              r +
              " and will be removed in the near future",
          ),
        )),
      t ? t(a, i, s) : !0
    );
  };
};
pu.spelling = function (t) {
  return (r, n) => (console.warn(`${n} is likely a misspelling of ${t}`), !0);
};
function QP(e, t, r) {
  if (typeof e != "object" || e === null)
    throw new H("options must be an object", H.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let o = n.length;
  for (; o-- > 0;) {
    const a = n[o],
      i = Object.prototype.hasOwnProperty.call(t, a) ? t[a] : void 0;
    if (i) {
      const s = e[a],
        l = s === void 0 || i(s, a, e);
      if (l !== !0)
        throw new H("option " + a + " must be " + l, H.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0) throw new H("Unknown option " + a, H.ERR_BAD_OPTION);
  }
}
const As = { assertOptions: QP, validators: pu },
  Dt = As.validators;
let ro = class {
  constructor(t) {
    ((this.defaults = t || {}),
      (this.interceptors = { request: new Om(), response: new Om() }));
  }
  async request(t, r) {
    try {
      return await this._request(t, r);
    } catch (n) {
      if (n instanceof Error) {
        let o = {};
        Error.captureStackTrace
          ? Error.captureStackTrace(o)
          : (o = new Error());
        const a = (() => {
          if (!o.stack) return "";
          const i = o.stack.indexOf(`
`);
          return i === -1 ? "" : o.stack.slice(i + 1);
        })();
        try {
          if (!n.stack) n.stack = a;
          else if (a) {
            const i = a.indexOf(`
`),
              s =
                i === -1
                  ? -1
                  : a.indexOf(
                      `
`,
                      i + 1,
                    ),
              l = s === -1 ? "" : a.slice(s + 1);
            String(n.stack).endsWith(l) ||
              (n.stack +=
                `
` + a);
          }
        } catch {}
      }
      throw n;
    }
  }
  _request(t, r) {
    (typeof t == "string" ? ((r = r || {}), (r.url = t)) : (r = t || {}),
      (r = fo(this.defaults, r)));
    const { transitional: n, paramsSerializer: o, headers: a } = r;
    (n !== void 0 &&
      As.assertOptions(
        n,
        {
          silentJSONParsing: Dt.transitional(Dt.boolean),
          forcedJSONParsing: Dt.transitional(Dt.boolean),
          clarifyTimeoutError: Dt.transitional(Dt.boolean),
          legacyInterceptorReqResOrdering: Dt.transitional(Dt.boolean),
          advertiseZstdAcceptEncoding: Dt.transitional(Dt.boolean),
          validateStatusUndefinedResolves: Dt.transitional(Dt.boolean),
        },
        !1,
      ),
      o != null &&
        (O.isFunction(o)
          ? (r.paramsSerializer = { serialize: o })
          : As.assertOptions(
              o,
              { encode: Dt.function, serialize: Dt.function },
              !0,
            )),
      r.allowAbsoluteUrls !== void 0 ||
        (this.defaults.allowAbsoluteUrls !== void 0
          ? (r.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls)
          : (r.allowAbsoluteUrls = !0)),
      As.assertOptions(
        r,
        {
          baseUrl: Dt.spelling("baseURL"),
          withXsrfToken: Dt.spelling("withXSRFToken"),
        },
        !0,
      ),
      (r.method = (r.method || this.defaults.method || "get").toLowerCase()));
    let i = a && O.merge(a.common, a[r.method]);
    (a &&
      O.forEach(
        ["delete", "get", "head", "post", "put", "patch", "query", "common"],
        (S) => {
          delete a[S];
        },
      ),
      (r.headers = Ot.concat(i, a)));
    const s = [];
    let l = !0;
    this.interceptors.request.forEach(function (C) {
      if (typeof C.runWhen == "function" && C.runWhen(r) === !1) return;
      l = l && C.synchronous;
      const k = r.transitional || uf;
      k && k.legacyInterceptorReqResOrdering
        ? s.unshift(C.fulfilled, C.rejected)
        : s.push(C.fulfilled, C.rejected);
    });
    const u = [];
    this.interceptors.response.forEach(function (C) {
      u.push(C.fulfilled, C.rejected);
    });
    let c,
      d = 0,
      m;
    if (!l) {
      const S = [Ym.bind(this), void 0];
      for (
        S.unshift(...s), S.push(...u), m = S.length, c = Promise.resolve(r);
        d < m;
      )
        c = c.then(S[d++], S[d++]);
      return c;
    }
    m = s.length;
    let v = r;
    for (; d < m;) {
      const S = s[d++],
        C = s[d++];
      try {
        v = S(v);
      } catch (k) {
        C.call(this, k);
        break;
      }
    }
    try {
      c = Ym.call(this, v);
    } catch (S) {
      return Promise.reject(S);
    }
    for (d = 0, m = u.length; d < m;) c = c.then(u[d++], u[d++]);
    return c;
  }
  getUri(t) {
    t = fo(this.defaults, t);
    const r = Z0(t.baseURL, t.url, t.allowAbsoluteUrls, t);
    return Q0(r, t.params, t.paramsSerializer);
  }
};
O.forEach(["delete", "get", "head", "options"], function (t) {
  ro.prototype[t] = function (r, n) {
    return this.request(
      fo(n || {}, {
        method: t,
        url: r,
        data: n && O.hasOwnProp(n, "data") ? n.data : void 0,
      }),
    );
  };
});
O.forEach(["post", "put", "patch", "query"], function (t) {
  function r(n) {
    return function (a, i, s) {
      return this.request(
        fo(s || {}, {
          method: t,
          headers: n ? { "Content-Type": "multipart/form-data" } : {},
          url: a,
          data: i,
        }),
      );
    };
  }
  ((ro.prototype[t] = r()),
    t !== "query" && (ro.prototype[t + "Form"] = r(!0)));
});
let KP = class nw {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function (a) {
      r = a;
    });
    const n = this;
    (this.promise.then((o) => {
      if (!n._listeners) return;
      let a = n._listeners.length;
      for (; a-- > 0;) n._listeners[a](o);
      n._listeners = null;
    }),
      (this.promise.then = (o) => {
        let a;
        const i = new Promise((s) => {
          (n.subscribe(s), (a = s));
        }).then(o);
        return (
          (i.cancel = function () {
            n.unsubscribe(a);
          }),
          i
        );
      }),
      t(function (a, i, s) {
        n.reason || ((n.reason = new Wi(a, i, s)), r(n.reason));
      }));
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const r = this._listeners.indexOf(t);
    r !== -1 && this._listeners.splice(r, 1);
  }
  toAbortSignal() {
    const t = new AbortController(),
      r = (n) => {
        t.abort(n);
      };
    return (
      this.subscribe(r),
      (t.signal.unsubscribe = () => this.unsubscribe(r)),
      t.signal
    );
  }
  static source() {
    let t;
    return {
      token: new nw(function (o) {
        t = o;
      }),
      cancel: t,
    };
  }
};
function GP(e) {
  return function (r) {
    return e.apply(null, r);
  };
}
function XP(e) {
  return O.isObject(e) && e.isAxiosError === !0;
}
const Td = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526,
};
Object.entries(Td).forEach(([e, t]) => {
  Td[t] = e;
});
function ow(e) {
  const t = new ro(e),
    r = N0(ro.prototype.request, t);
  return (
    O.extend(r, ro.prototype, t, { allOwnKeys: !0 }),
    O.extend(r, t, null, { allOwnKeys: !0 }),
    (r.create = function (o) {
      return ow(fo(e, o));
    }),
    r
  );
}
const de = ow(Hi);
de.Axios = ro;
de.CanceledError = Wi;
de.CancelToken = KP;
de.isCancel = X0;
de.VERSION = df;
de.toFormData = du;
de.AxiosError = H;
de.Cancel = de.CanceledError;
de.all = function (t) {
  return Promise.all(t);
};
de.spread = GP;
de.isAxiosError = XP;
de.mergeConfig = fo;
de.AxiosHeaders = Ot;
de.formToJSON = (e) => G0(O.isHTMLForm(e) ? new FormData(e) : e);
de.getAdapter = rw.getAdapter;
de.HttpStatusCode = Td;
de.default = de;
const {
    Axios: ZR,
    AxiosError: e2,
    CanceledError: t2,
    isCancel: r2,
    CancelToken: n2,
    VERSION: o2,
    all: a2,
    Cancel: i2,
    isAxiosError: s2,
    spread: l2,
    toFormData: u2,
    AxiosHeaders: c2,
    HttpStatusCode: d2,
    formToJSON: p2,
    getAdapter: f2,
    mergeConfig: h2,
    create: m2,
  } = de,
  JP = () =>
    h.jsx("div", {
      children: h.jsxs("div", {
        children: [
          h.jsx("h2", { children: "Pagamento por Multibanco" }),
          h.jsx("p", {
            children: "Use a referência abaixo para efetuar o pagamento:",
          }),
          h.jsx("p", { children: "Entidade: 593305" }),
          h.jsx("p", { children: "Referência: 788 430 432 " }),
          h.jsx("p", { children: "Valor: €50,00" }),
        ],
      }),
    }),
  ZP = () =>
    h.jsxs("div", {
      children: [
        h.jsx("h2", { children: "Pagamento por Transferência Bancária" }),
        h.jsx("p", { children: "Faça a transferência para o seguinte IBAN:" }),
        h.jsx("p", { children: "IBAN: PT50 0035 0995 0062 9573 2304 1" }),
        h.jsx("p", { children: "Montante:50 euros " }),
      ],
    }),
  eR = () =>
    h.jsxs("div", {
      children: [
        h.jsx("h2", { children: "Pagamento por MBWay" }),
        h.jsx("p", { children: "Envie o valor para o número:" }),
        h.jsx("p", { children: "+351 917 071 858" }),
        h.jsx("p", { children: "Montante: 50 euros" }),
      ],
    }),
  lc = () => sessionStorage.getItem("tipoUsuario") === "Explicador",
  uc = () => sessionStorage.getItem("tipoUsuario") === "Explicando",
  Un = () =>
    h.jsx("nav", {
      className: "Menu",
      children: h.jsxs("ul", {
        children: [
          uc() &&
            h.jsx("li", {
              children: h.jsx(or, {
                to: "/Explicacoes",
                children: "Marcação de Explicações",
              }),
            }),
          h.jsx("li", {
            children: h.jsx(or, {
              to: lc()
                ? "/ExplicacoesConfirmadasExplicador"
                : "/ExplicacoesConfirmadasExplicando",
              children: "Explicações Online",
            }),
          }),
          lc() &&
            h.jsx("li", {
              children: h.jsx(or, {
                to: "/ExplicacoesPendentes",
                children: "Explicações Pendentes",
              }),
            }),
          lc() &&
            h.jsxs("li", {
              children: [
                " ",
                h.jsx(or, {
                  to: "/ExplicacoesConfirmadasExplicador",
                  children: "Lista de Explicações",
                }),
              ],
            }),
          uc() &&
            h.jsx("li", {
              children: h.jsx(or, {
                to: "/ExplicacoesConfirmadasExplicando",
                children: "Lista de Explicações",
              }),
            }),
          h.jsx("li", {
            children: h.jsx(or, { to: "/Forum", children: "Fórum" }),
          }),
          uc() &&
            h.jsx("li", {
              children: h.jsx(or, { to: "/Contactos", children: "Contactos" }),
            }),
          h.jsx("li", { children: h.jsx(or, { to: "/", children: "Logout" }) }),
        ],
      }),
    }),
  Hm = (e) => {
    const t = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(e);
    if (t) return Number(t[1]) * 60 + Number(t[2]);
    const r = /^(0?[1-9]|1[0-2]):([0-5]\d)\s*([AP])\.?M\.?$/i.exec(e.trim());
    if (!r) return null;
    const n = Number(r[1]) % 12,
      o = r[3].toUpperCase() === "P";
    return (n + (o ? 12 : 0)) * 60 + Number(r[2]);
  },
  Qo = (e) =>
    !(e instanceof Date) || Number.isNaN(e.getTime())
      ? ""
      : `${String(e.getHours()).padStart(2, "0")}:${String(e.getMinutes()).padStart(2, "0")}`,
  aw = (e, t = new Date()) => {
    if (
      !(e != null && e.data) ||
      typeof e.horaInicio != "string" ||
      typeof e.horaFim != "string"
    )
      return !1;
    const r = Hm(e.horaInicio),
      n = Hm(e.horaFim);
    if (r === null || n === null) return !1;
    const o = new Date(e.data);
    if (Number.isNaN(o.getTime())) return !1;
    const a = o.toISOString().slice(0, 10),
      i = new Date(`${a}T00:00:00`);
    i.setMinutes(r);
    const s = new Date(`${a}T00:00:00`);
    return (s.setMinutes(n), t >= i && t < s);
  },
  tR = () => {
    const [e, t] = _.useState(""),
      [r, n] = _.useState(""),
      [o, a] = _.useState(null),
      [i, s] = _.useState(null),
      [l, u] = _.useState(""),
      [c, d] = _.useState(""),
      [m, v] = _.useState("Presencial"),
      [S, C] = _.useState("Multibanco"),
      [k, g] = _.useState(""),
      y = wa();
    (_.useEffect(() => {
      const P = sessionStorage.getItem("emailUsuario"),
        R = sessionStorage.getItem("explicandoId");
      if (!P) {
        console.error("Nenhum email encontrado na sessão atual");
        return;
      }
      (R || g("Erro! Utilizador não autenticado"),
        de
          .get(`/explicandos/${P}`)
          .then((M) => {
            (console.error("Resposta do backend:", M.data),
              t(M.data.nome),
              n(M.data.explicandoId));
          })
          .catch((M) => console.error("Erro ao obter o explicando:", M)));
    }, []),
      _.useEffect(() => {
        if (i) {
          const P = new Date(i);
          (P.setHours(P.getHours() + 2), u(P));
        }
      }, [i]));
    const w = async (P) => {
        P.preventDefault();
        const R = new Date(),
          M = new Date(R.getFullYear(), R.getMonth(), R.getDate()),
          A = R.getHours() * 60 + R.getMinutes();
        if (!o || !i) {
          g("Data e hora de início são obrigatórias!");
          return;
        }
        if (
          new Date(o.getFullYear(), o.getMonth(), o.getDate()).getTime() ===
            M.getTime() &&
          i.getHours() * 60 + i.getMinutes() < A
        ) {
          g(
            "Se escolher a data atual, a hora de início deve ser igual ao posterior à hora atual!",
          );
          return;
        }
        try {
          (
            await de.post("/explicacoes", {
              explicandoId: r,
              data: new Date(o).toLocaleDateString("sv-SE"),
              horaInicio: Qo(i),
              horaFim: Qo(l),
              linguagem: c,
              tipo: m,
              pagamento: S,
            })
          ).data.sucesso
            ? (g(""),
              alert("Explicação agendada com sucesso. Aguarde a confirmação"),
              g(""),
              T(),
              S === "Multibanco"
                ? y("/Multibanco")
                : S === "Transferência Bancária"
                  ? y("/TransferenciaBancaria")
                  : S === "MBWay" && y("/MBWay"))
            : g(
                "A sua explicação não pode ser agendada para esse período de tempo. Por favor, escolha outro!",
              );
        } catch (L) {
          (console.error("Erro ao agendar explicação", L),
            g("Ocorreu um erro ao agendar a explicação!"),
            T());
        }
      },
      T = () => {
        (a(null), s(null), u(null), d(""), v("Presencial"), C("Multibanco"));
      };
    return h.jsxs("div", {
      children: [
        h.jsx(Un, {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsxs("p", { className: "saudacao", children: ["Olá, ", e] }),
        h.jsx("h2", {
          className: "explicacoes",
          children: "Marcação de Explicações",
        }),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsxs("p", {
          className: "introducaoExplicacoes",
          children: [
            " ",
            "Agende aqui uma explicação de 2 horas para poder esclarecer suas dúvidas de programação!",
          ],
        }),
        h.jsxs("form", {
          className: "formularioExplicacoes",
          onSubmit: w,
          children: [
            h.jsxs("label", {
              children: [
                "Data:",
                h.jsx("span", { style: { color: "red" }, children: " *" }),
              ],
            }),
            h.jsx(co, {
              className: "datePicker",
              selected: o,
              onChange: (P) => a(P),
              dateFormat: "yyyy-MM-dd",
              minDate: new Date(),
            }),
            h.jsx("br", {}),
            h.jsx("br", {}),
            h.jsxs("label", {
              children: [
                "Hora de Início: ",
                h.jsx("span", { style: { color: "red" }, children: "*" }),
              ],
            }),
            h.jsx(co, {
              className: "datePicker",
              selected: i,
              onChange: (P) => s(P),
              showTimeSelect: !0,
              showTimeSelectOnly: !0,
              timeIntervals: 30,
              timeCaption: "Hora",
              dateFormat: "HH:mm",
              filterTime: (P) =>
                !(
                  (P.getHours() === 12 && [0, 30].includes(P.getMinutes())) ||
                  (P.getHours() === 13 && P.getMinutes() === 0)
                ),
              minTime: new Date().setHours(9, 0),
              maxTime: new Date().setHours(16, 0),
            }),
            h.jsx("br", {}),
            h.jsx("br", {}),
            h.jsx("label", { children: " Hora de fim:" }),
            h.jsx("input", {
              type: "text",
              value: l ? Qo(l) : "",
              readOnly: !0,
            }),
            h.jsx("br", {}),
            h.jsx("br", {}),
            h.jsx("label", { children: "Linguagem de Programação:" }),
            h.jsx("input", {
              type: "text",
              value: c,
              onChange: (P) => d(P.target.value),
            }),
            h.jsx("br", {}),
            h.jsx("br", {}),
            h.jsx("label", { children: "Tipo:" }),
            h.jsxs("select", {
              value: m,
              onChange: (P) => v(P.target.value),
              children: [
                h.jsx("option", {
                  value: "Presencial",
                  children: "Presencial",
                }),
                h.jsx("option", { value: "On-line", children: "On-line" }),
              ],
            }),
            h.jsx("br", {}),
            h.jsx("br", {}),
            h.jsx("label", { children: "Método de Pagamento:" }),
            h.jsxs("select", {
              value: S,
              onChange: (P) => C(P.target.value),
              children: [
                h.jsx("option", {
                  value: "Multibanco",
                  children: "Multibanco",
                }),
                h.jsx("option", {
                  value: "Transferência Bancária",
                  children: "Transferência Bancária",
                }),
                h.jsx("option", { value: "MBWay", children: "MBWay" }),
              ],
            }),
            h.jsx("br", {}),
            h.jsx("br", {}),
            h.jsx("p", {
              className: "obrigatorio",
              children: "*Campos de preenchimento obrigatório",
            }),
            h.jsx("button", { type: "submit", children: "Submeter" }),
          ],
        }),
        k &&
          h.jsx("p", {
            style: { color: "red", marginLeft: "50px" },
            children: k,
          }),
      ],
    });
  },
  rR = "/assets/React-yAz3r2lI.jpg",
  ff = (e) => (e ? e.replace(/\/+$/, "") : ""),
  hf = typeof window < "u" ? ff(window.location.origin) : "",
  sr = ff("https://explicacoes-backend.onrender.com"),
  Fs = sr.startsWith("/") ? `${hf}${sr}` : sr;
sr && (de.defaults.baseURL = sr);
de.interceptors.request.use((e) => {
  const t =
    typeof sessionStorage < "u" ? sessionStorage.getItem("token") : null;
  return (t && (e.headers.Authorization = `Bearer ${t}`), e);
});
if (sr && typeof window < "u" && typeof window.fetch == "function") {
  const e = window.fetch.bind(window),
    t = (r, n) => {
      const o = sessionStorage.getItem("token");
      if (!o || !r.startsWith(Fs)) return n;
      const a = new Headers(n == null ? void 0 : n.headers);
      return (a.set("Authorization", `Bearer ${o}`), { ...n, headers: a });
    };
  window.fetch = (r, n) => {
    if (typeof r == "string") {
      const o = r.startsWith("/")
        ? r.startsWith(`${sr}/`) && sr.startsWith("/")
          ? `${hf}${r}`
          : `${Fs}${r}`
        : r;
      return e(o, t(o, n));
    }
    if (
      r instanceof Request &&
      r.url.startsWith(`${window.location.origin}/`)
    ) {
      const o = r.url.slice(window.location.origin.length),
        a = sr.startsWith("/") && o.startsWith(`${sr}/`) ? r.url : `${Fs}${o}`;
      return e(new Request(a, r), t(a, n));
    }
    return e(r, n);
  };
}
const nR =
    ff("wss://explicacoes-backend.onrender.com") ||
    (sr ? sr.replace(/^http/i, "ws") : ""),
  ni = Fs || hf,
  Ml = () =>
    `${nR}/ws?token=${encodeURIComponent(sessionStorage.getItem("token") || "")}`;
typeof localStorage < "u" &&
  ["emailUsuario", "token", "explicandoId", "tipoUsuario"].forEach((e) => {
    localStorage.removeItem(e);
  });
typeof sessionStorage < "u" &&
  sessionStorage.getItem("emailUsuario") &&
  !sessionStorage.getItem("token") &&
  sessionStorage.clear();
const oR = () => {
    const [e, t] = _.useState({ email: "", password: "" }),
      [r, n] = _.useState(),
      o = wa(),
      a = (l) => {
        t({ ...e, [l.target.name]: l.target.value });
      },
      i = async (l) => {
        var u, c;
        if ((l.preventDefault(), !e.email || !e.password)) {
          n("Todos os campos são obrigatórios!");
          return;
        }
        try {
          const d = await de.post(`${ni}/login`, {
            email: e.email,
            password: e.password,
          });
          d.data.sucesso
            ? (sessionStorage.setItem("emailUsuario", e.email),
              sessionStorage.setItem("token", d.data.token),
              sessionStorage.setItem("explicandoId", d.data.user.explicandoId),
              s(),
              d.data.role === "Explicador"
                ? (sessionStorage.setItem("tipoUsuario", "Explicador"),
                  o("/ExplicacoesConfirmadasExplicador"))
                : (sessionStorage.setItem("tipoUsuario", "Explicando"),
                  o("/explicacoes")))
            : n("Login falhou! Verifique suas credenciais!");
        } catch (d) {
          (console.error("Erro ao fazer login", d),
            s(),
            n(
              ((c =
                (u = d == null ? void 0 : d.response) == null
                  ? void 0
                  : u.data) == null
                ? void 0
                : c.message) || "Erro ao fazer login. Tente novamente.",
            ));
        }
      },
      s = () => {
        (t({ email: "", password: "" }), n(null));
      };
    return h.jsxs("div", {
      className: "login-container",
      children: [
        h.jsx("h1", {
          className: "Login",
          children: "Ana Silva- Explicacões de Programação",
        }),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("p", {
          className: "Text",
          children:
            "Olá a todos! O meu nome é Ana Silva, sou Licenciada em Engenharia Informática e domino as mais diversas linguagens de programação, desde JAVA, Python, Kotlin, Assembly, C#, Prolog, Javascript e SAP. Também tenho conhecimentos em bases de dados como SQL, Airtable e MongoDb.",
        }),
        h.jsx("p", {
          className: "Text",
          children:
            "Se quiser esclarecer dúvidas de programação, seja para exames, certificações, projetos empresariais ou simplesmente prazer em enriquecer-se profissionalmente, basta só fazer o login, marcar que um encontro que eu terei todo o gosto em esclarecer suas dúvidas, quer presencialmente, quer remotamente através de explicações online e fóruns aqui neste site.",
        }),
        h.jsxs("p", {
          className: "Text",
          children: [
            " ",
            "Caso ainda não esteja registado, clique no link de registo, faça o seu registo e embarque nesta aventura fantástica!",
            " ",
          ],
        }),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("img", { src: rR, className: "image" }),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("h2", { children: "Login" }),
        h.jsx("br", {}),
        h.jsxs("form", {
          onSubmit: i,
          autoComplete: "off",
          children: [
            h.jsxs("label", {
              children: [
                "Nome de Utilizador:",
                h.jsx("input", {
                  className: "utilizador",
                  type: "email",
                  name: "email",
                  value: e.email,
                  onChange: a,
                  autoComplete: "off",
                  required: !0,
                }),
              ],
            }),
            h.jsx("br", {}),
            h.jsx("br", {}),
            h.jsxs("label", {
              children: [
                "Palavra-passe:",
                h.jsx("input", {
                  className: "password",
                  type: "password",
                  name: "password",
                  value: e.password,
                  onChange: a,
                  autoComplete: "new-password",
                  required: !0,
                }),
              ],
            }),
            h.jsx("br", {}),
            h.jsx("br", {}),
            h.jsx("button", { type: "submit", children: "Login" }),
          ],
        }),
        r && h.jsx("p", { style: { color: "red" }, children: r }),
        h.jsx("p", {
          children: h.jsx("a", {
            href: "/registo",
            className: "Link",
            style: { color: "blue" },
            children:
              "Se ainda não estiver registado clique aqui para se registar",
          }),
        }),
      ],
    });
  },
  cc = "bg-gray-300_px-300_px-3_py-1_rounded_disabled_opacity-50",
  fu = (e, t, r) => {
    const n = (t - 1) * r,
      o = Math.ceil(e.length / r);
    return { items: e.slice(n, n + r), totalPages: o };
  },
  hu = ({ currentPage: e, totalPages: t, setCurrentPage: r }) =>
    h.jsxs("div", {
      className: "paginas",
      children: [
        h.jsx("button", {
          onClick: () => r((n) => Math.max(n - 1, 1)),
          disabled: e === 1,
          className: cc,
          children: "Anterior",
        }),
        Array.from({ length: t }, (n, o) =>
          h.jsx(
            "button",
            { onClick: () => r(o + 1), className: cc, children: o + 1 },
            o,
          ),
        ),
        h.jsx("button", {
          onClick: () => r((n) => Math.min(n + 1, t)),
          disabled: e === t,
          className: cc,
          children: "Próxima",
        }),
      ],
    }),
  aR = () => {
    const [e, t] = _.useState(""),
      [, r] = _.useState(""),
      [n, o] = _.useState([]),
      [a, i] = _.useState([]),
      [s, l] = _.useState(""),
      [u, c] = _.useState(""),
      [d, m] = _.useState(null),
      [v, S] = _.useState(""),
      [C, k] = _.useState(1),
      g = 10;
    (_.useEffect(() => {
      const L = sessionStorage.getItem("emailUsuario"),
        K = sessionStorage.getItem("explicandoId");
      if (!L) {
        console.error("Nenhum email encontrado na sessão atual");
        return;
      }
      (K || r("Erro! Utilizador não autenticado"),
        de
          .get(`/explicandos/${L}`)
          .then(($) => {
            (console.error("Resposta do backend:", $.data), t($.data.nome));
          })
          .catch(($) => console.error("Erro ao obter o explicando:", $)));
    }, []),
      _.useEffect(() => {
        y();
      }, []),
      _.useEffect(() => {
        k(1);
      }, [s, u]));
    const y = async () => {
        const L = await de.get("/explicacoes"),
          K = await de.get("/explicandos"),
          $ = new Date(),
          ae = $.toISOString().split("T")[0],
          le = $.toTimeString().split(":").slice(0, 2).join(":"),
          U = L.data.filter((q) => {
            const ie = new Date(q.data).toISOString().split("T")[0];
            return ie > ae
              ? q.confirmacao === "Pendente"
              : ie === ae
                ? q.confirmacao === "Pendente" && q.horaInicio >= le
                : !1;
          });
        (i(K.data), o(U));
      },
      w = async (L, K) => {
        (await de.patch(`/explicacoes/${L}`, { confirmacao: K }), y());
      },
      T = (L) => {
        const K = a.find(($) => $._id === L);
        return K ? K.nome : "Explicando Desconhecido";
      },
      P = n.filter((L) => {
        const K = new Date(L.data).toLocaleDateString("sv-SE"),
          $ = s ? K === s : !0,
          ae = u
            ? T(L.explicandoId).toLowerCase().includes(u.toLowerCase())
            : !0;
        return L.confirmacao === "Pendente" && $ && ae;
      }),
      { items: R, totalPages: M } = fu(P, C, g),
      A = () => {
        if (d) {
          const L = d.toLocaleDateString("sv-SE");
          l(L);
        }
      },
      V = () => {
        c(v);
      };
    return h.jsxs("div", {
      children: [
        h.jsx(Un, {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsxs("p", { className: "saudacao", children: ["Olá, ", e] }),
        h.jsx("h2", {
          className: "explicacoes",
          children: "Explicações Pendentes",
        }),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsxs("div", {
          className: "data",
          children: [
            h.jsx("label", { className: "data", children: "Data" }),
            h.jsx(co, {
              className: "datePicker2",
              selected: d,
              onChange: (L) => m(L),
              minDate: new Date(),
              placeholderText: "Seleccione uma data",
              dateFormat: "yyyy-MM-dd",
            }),
            h.jsx("button", {
              onClick: A,
              className: "bg-blue-500 text-white px-3 py-1 ml-2 rounded",
              children: "Pesquisar por Data",
            }),
            h.jsx("button", {
              type: "button",
              onClick: () => {
                (m(null), l(""));
              },
              children: "Limpar data",
            }),
          ],
        }),
        h.jsx("br", {}),
        h.jsxs("div", {
          className: "nomeExplicando",
          children: [
            h.jsx("label", {
              className: "nomeExplicando",
              children: "Nome do Explicando",
            }),
            h.jsx("input", {
              type: "text",
              placeholder: "Nome do explicando",
              className: "border_px-2_py-1",
              value: v,
              onChange: (L) => S(L.target.value),
            }),
            h.jsx("button", {
              onClick: V,
              className: "bg-green-500 text-white px-3 py-1 ml-2 rounded",
              children: "Pesquisar por Nome",
            }),
            h.jsx("button", {
              type: "button",
              onClick: () => {
                (S(""), c(""));
              },
              children: "Limpar nome",
            }),
          ],
        }),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsxs("table", {
          className: "table-auto_border-collapse_w-full",
          children: [
            h.jsx("thead", {
              children: h.jsxs("tr", {
                className: "bg-gray-200",
                children: [
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Explicando",
                  }),
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Data",
                  }),
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Hora Início",
                  }),
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Hora Fim",
                  }),
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Linguagem",
                  }),
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Modalidade",
                  }),
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Pagamento",
                  }),
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Ações",
                  }),
                ],
              }),
            }),
            h.jsxs("tbody", {
              children: [
                R.map((L) =>
                  h.jsxs(
                    "tr",
                    {
                      children: [
                        h.jsx("td", {
                          className: "border_px-2_py-1",
                          children: T(L.explicandoId),
                        }),
                        h.jsx("td", {
                          className: "border_px-2_py-1",
                          children: new Date(L.data)
                            .toISOString()
                            .split("T")[0],
                        }),
                        h.jsx("td", {
                          className: "border_px-2_py-1",
                          children: L.horaInicio,
                        }),
                        h.jsx("td", {
                          className: "border_px-2_py-1",
                          children: L.horaFim,
                        }),
                        h.jsx("td", {
                          className: "border_px-2_py-1",
                          children: L.linguagem,
                        }),
                        h.jsx("td", {
                          className: "border_px-2_py-1",
                          children: L.tipo,
                        }),
                        h.jsx("td", {
                          className: "border_px-2_py-1",
                          children: L.pagamento,
                        }),
                        h.jsxs("td", {
                          className: "border_px-2_py-1",
                          children: [
                            h.jsx("button", {
                              className:
                                "bg-green-500_text-white_px-2_py-1_mr-2",
                              onClick: () => w(L._id, "Confirmada"),
                              children: "Confirmar",
                            }),
                            h.jsx("button", {
                              className: "bg-red-500_text-white_px-2_py-1",
                              onClick: () => w(L._id, "Recusada"),
                              children: "Recusar",
                            }),
                          ],
                        }),
                      ],
                    },
                    L._id,
                  ),
                ),
                P.length === 0 &&
                  h.jsx("tr", {
                    children: h.jsx("td", {
                      colSpan: "9",
                      className: "text-center_py-4",
                      children: "Nenhuma explicação pendente encontrada.",
                    }),
                  }),
              ],
            }),
          ],
        }),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx(hu, { currentPage: C, totalPages: M, setCurrentPage: k }),
      ],
    });
  },
  iR = () => {
    const [e, t] = _.useState(""),
      [, r] = _.useState(""),
      [n, o] = _.useState([]),
      [a, i] = _.useState([]),
      [s, l] = _.useState(""),
      [u, c] = _.useState(""),
      [d, m] = _.useState(""),
      [v, S] = _.useState(""),
      [C, k] = _.useState(null),
      [g, y] = _.useState(""),
      [w, T] = _.useState(1),
      [P, R] = _.useState(() => new Date()),
      M = 10;
    (_.useEffect(() => {
      const U = setInterval(() => R(new Date()), 1e3);
      return () => clearInterval(U);
    }, []),
      _.useEffect(() => {
        const U = sessionStorage.getItem("emailUsuario"),
          q = sessionStorage.getItem("explicandoId");
        if (!U) {
          console.error("Nenhum email encontrado na sessão atual");
          return;
        }
        (q || r("Erro! Utilizador não autenticado"),
          de
            .get(`/explicandos/${U}`)
            .then((ie) => {
              (console.error("Resposta do backend:", ie.data), t(ie.data.nome));
            })
            .catch((ie) => console.error("Erro ao obter o explicando:", ie)));
      }, []),
      _.useEffect(() => {
        A();
      }, []),
      _.useEffect(() => {
        if (sessionStorage.getItem("tipoUsuario") !== "Explicador") return;
        const U = new WebSocket(Ml()),
          q = () => {
            U.send(JSON.stringify({ type: "subscribe-explanation-list" }));
          },
          ie = (z) => {
            try {
              const G = JSON.parse(z.data);
              G.type === "explanation-deleted" &&
                o((Z) => Z.filter((ne) => ne._id !== G.explanationId));
            } catch (G) {
              console.error("Erro ao processar atualização da lista", G);
            }
          };
        return (
          U.addEventListener("open", q),
          U.addEventListener("message", ie),
          () => {
            (U.removeEventListener("open", q),
              U.removeEventListener("message", ie),
              U.close());
          }
        );
      }, []),
      _.useEffect(() => {
        T(1);
      }, [s, u]));
    const A = async () => {
        const U = await de.get("/explicacoes"),
          q = await de.get("/explicandos"),
          ie = new Date(),
          z = ie.toISOString().split("T")[0],
          G = ie.toTimeString().split(":").slice(0, 2).join(":"),
          Z = U.data.filter((ne) => {
            const fe = new Date(ne.data).toISOString().split("T")[0];
            return fe > z
              ? ne.confirmacao === "Confirmada" || ne.confirmacao === "Recusada"
              : fe === z
                ? ne.confirmacao === "Confirmada" ||
                  (ne.confirmacao === "Recusada" && ne.horaInicio >= G)
                : !1;
          });
        (i(q.data), o(Z));
      },
      V = (U) => {
        const q = a.find((ie) => ie._id === U);
        return q ? q.nome : "Explicando Desconhecido";
      },
      L = n.filter((U) => {
        const q = new Date(U.data).toLocaleDateString("sv-SE"),
          ie = s ? q === s : !0,
          z = u
            ? V(U.explicandoId).toLowerCase().includes(u.toLowerCase())
            : !0;
        return (d ? U.confirmacao === d : !0) && ie && z;
      }),
      { items: K, totalPages: $ } = fu(L, w, M),
      ae = () => {
        if (C) {
          const U = C.toLocaleDateString("sv-SE");
          l(U);
        }
      },
      le = () => {
        c(g);
      };
    return h.jsxs("div", {
      children: [
        h.jsx(Un, {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsxs("p", { className: "saudacao", children: ["Olá, ", e] }),
        h.jsx("h2", {
          className: "explicacoes",
          children: "Lista de explicações",
        }),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsxs("div", {
          className: "data",
          children: [
            h.jsx("label", { className: "data", children: "Data" }),
            h.jsx(co, {
              className: "datePicker2",
              selected: C,
              onChange: (U) => k(U),
              minDate: new Date(),
              placeholderText: "Seleccione uma data",
              dateFormat: "yyyy-MM-dd",
            }),
            h.jsx("button", {
              onClick: ae,
              className: "bg-blue-500 text-white px-3 py-1 ml-2 rounded",
              children: "Pesquisar por Data",
            }),
            h.jsx("button", {
              type: "button",
              onClick: () => {
                (k(null), l(""));
              },
              children: "Limpar data",
            }),
          ],
        }),
        h.jsx("br", {}),
        h.jsxs("div", {
          className: "nomeExplicando",
          children: [
            h.jsx("label", {
              className: "nomeExplicando",
              children: "Nome do Explicando",
            }),
            h.jsx("input", {
              type: "text",
              placeholder: "Nome do explicando",
              className: "border_px-2_py-1",
              value: g,
              onChange: (U) => y(U.target.value),
            }),
            h.jsx("button", {
              onClick: le,
              className: "bg-green-500 text-white px-3 py-1 ml-2 rounded",
              children: "Pesquisar por Nome",
            }),
            h.jsx("button", {
              type: "button",
              onClick: () => {
                (y(""), c(""));
              },
              children: "Limpar nome",
            }),
          ],
        }),
        h.jsx("br", {}),
        h.jsxs("div", {
          className: "filtroConfirmacao",
          children: [
            h.jsx("label", { children: "Confirmação" }),
            h.jsxs("select", {
              value: v,
              onChange: (U) => S(U.target.value),
              children: [
                h.jsx("option", { value: "", children: "Todas" }),
                h.jsx("option", {
                  value: "Confirmada",
                  children: "Confirmada",
                }),
                h.jsx("option", { value: "Recusada", children: "Recusada" }),
              ],
            }),
            h.jsx("button", {
              onClick: () => m(v),
              children: "Pesquisar por Confirmação",
            }),
            h.jsx("button", {
              type: "button",
              onClick: () => {
                (S(""), m(""));
              },
              children: "Limpar confirmação",
            }),
          ],
        }),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsxs("table", {
          className: "table-auto_border-collapse_w-full",
          children: [
            h.jsx("thead", {
              children: h.jsxs("tr", {
                className: "bg-gray-200",
                children: [
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Explicando",
                  }),
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Data",
                  }),
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Hora Início",
                  }),
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Hora Fim",
                  }),
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Linguagem",
                  }),
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Modalidade",
                  }),
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Pagamento",
                  }),
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Confirmação",
                  }),
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Ações",
                  }),
                ],
              }),
            }),
            h.jsxs("tbody", {
              children: [
                K.map((U) =>
                  h.jsxs(
                    "tr",
                    {
                      children: [
                        h.jsx("td", {
                          className: "border_px-2_py-1",
                          children: V(U.explicandoId),
                        }),
                        h.jsx("td", {
                          className: "border_px-2_py-1",
                          children: new Date(U.data)
                            .toISOString()
                            .split("T")[0],
                        }),
                        h.jsx("td", {
                          className: "border_px-2_py-1",
                          children: U.horaInicio,
                        }),
                        h.jsx("td", {
                          className: "border_px-2_py-1",
                          children: U.horaFim,
                        }),
                        h.jsx("td", {
                          className: "border_px-2_py-1",
                          children: U.linguagem,
                        }),
                        h.jsx("td", {
                          className: "border_px-2_py-1",
                          children: U.tipo,
                        }),
                        h.jsx("td", {
                          className: "border_px-2_py-1",
                          children: U.pagamento,
                        }),
                        h.jsx("td", {
                          className: "border_px-2_py-1",
                          children: U.confirmacao,
                        }),
                        h.jsx("td", {
                          className: "border_px-2_py-1",
                          children:
                            U.confirmacao === "Confirmada" &&
                            U.tipo === "On-line" &&
                            aw(U, P) &&
                            h.jsx(or, {
                              to: `/ExplicacoesOnline/${U._id}`,
                              children: "Entrar na explicação",
                            }),
                        }),
                      ],
                    },
                    U._id,
                  ),
                ),
                L.length === 0 &&
                  h.jsx("tr", {
                    children: h.jsx("td", {
                      colSpan: "9",
                      className: "text-center_py-4",
                      children: "Nenhuma explicação pendente encontrada.",
                    }),
                  }),
              ],
            }),
          ],
        }),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx(hu, { currentPage: w, totalPages: $, setCurrentPage: T }),
      ],
    });
  },
  sR = () => {
    const { id: e } = jy(),
      [t, r] = _.useState(""),
      [n, o] = _.useState(""),
      [a, i] = _.useState(null),
      [s, l] = _.useState(null),
      [u, c] = _.useState(""),
      [d, m] = _.useState(""),
      [v, S] = _.useState("Presencial"),
      [C, k] = _.useState("Multibanco"),
      [g, y] = _.useState(""),
      w = wa();
    (_.useEffect(() => {
      const R = sessionStorage.getItem("emailUsuario"),
        M = sessionStorage.getItem("explicandoId");
      if (!R) {
        console.error("Nenhum email encontrado na sessão atual");
        return;
      }
      (M || y("Erro! Utilizador não autenticado"),
        de
          .get(`/explicandos/${R}`)
          .then((A) => {
            (console.error("Resposta do backend:", A.data),
              r(A.data.nome),
              o(A.data.explicandoId));
          })
          .catch((A) => console.error("Erro ao obter o explicando:", A)));
    }, []),
      _.useEffect(() => {
        if (s) {
          const R = new Date(s);
          (R.setHours(R.getHours() + 2), c(R));
        }
      }, [s]),
      _.useEffect(() => {
        e &&
          de
            .get(`/explicacoes/${e}`)
            .then((R) => {
              const M = R.data;
              (i(new Date(M.data)),
                l(new Date(`1970-01-01 ${M.horaInicio}`)),
                c(new Date(`1970-01-01 ${M.horaFim}`)),
                m(M.linguagem),
                S(M.tipo),
                k(M.pagamento),
                o(M.explicandoId));
            })
            .catch((R) => {
              (console.error("Erro ao carregar explicação:", R),
                y("Erro ao carregar explicação!"));
            });
      }, [e]));
    const T = async (R) => {
        R.preventDefault();
        const M = new Date(),
          A = new Date(M.getFullYear(), M.getMonth(), M.getDate()),
          V = M.getHours() * 60 + M.getMinutes();
        if (!a || !s) {
          y("Data e hora de início são obrigatórias!");
          return;
        }
        if (
          new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime() ===
            A.getTime() &&
          s.getHours() * 60 + s.getMinutes() < V
        ) {
          y(
            "Se escolher a data atual, a hora de início deve ser igual ao posterior à hora atual!",
          );
          return;
        }
        try {
          (
            await de.put(`/explicacoes/${e}`, {
              explicandoId: n,
              data: new Date(a).toLocaleDateString("sv-SE"),
              horaInicio: Qo(s),
              horaFim: Qo(u),
              linguagem: d,
              tipo: v,
              pagamento: C,
            })
          ).data.sucesso
            ? (y(""),
              alert("Explicação agendada com sucesso. Aguarde a confirmação"),
              y(""),
              P(),
              C === "Multibanco"
                ? w("/Multibanco")
                : C === "Transferência Bancária"
                  ? w("/TransferenciaBancaria")
                  : C === "MBWay" && w("/MBWay"))
            : y(
                "A sua explicação não pode ser agendada para esse período de tempo. Por favor, escolha outro!",
              );
        } catch (K) {
          (console.error("Erro ao agendar explicação", K),
            y("Ocorreu um erro ao agendar a explicação!"),
            P());
        }
      },
      P = () => {
        (i(null), l(null), c(""), m(""), S("Presencial"), k("Multibanco"));
      };
    return h.jsxs("div", {
      children: [
        h.jsx(Un, {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsxs("p", { className: "saudacao", children: ["Olá, ", t] }),
        h.jsx("h2", {
          className: "explicacoes",
          children: "Marcação de Explicações",
        }),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsxs("p", {
          className: "introducaoExplicacoes",
          children: [
            " ",
            "Agende aqui uma explicação de 2 horas para poder esclarecer suas dúvidas de programação!",
          ],
        }),
        h.jsxs("form", {
          className: "formularioExplicacoes",
          onSubmit: T,
          children: [
            h.jsxs("label", {
              children: [
                "Data:",
                h.jsx("span", { style: { color: "red" }, children: " *" }),
              ],
            }),
            h.jsx(co, {
              className: "datePicker",
              selected: a,
              onChange: (R) => i(R),
              dateFormat: "yyyy-MM-dd",
              minDate: new Date(),
            }),
            h.jsx("br", {}),
            h.jsx("br", {}),
            h.jsxs("label", {
              children: [
                "Hora de Início: ",
                h.jsx("span", { style: { color: "red" }, children: "*" }),
              ],
            }),
            h.jsx(co, {
              className: "datePicker",
              selected: s,
              onChange: (R) => l(R),
              showTimeSelect: !0,
              showTimeSelectOnly: !0,
              timeIntervals: 30,
              timeCaption: "Hora",
              dateFormat: "HH:mm",
              filterTime: (R) =>
                !(
                  (R.getHours() === 12 && [0, 30].includes(R.getMinutes())) ||
                  (R.getHours() === 13 && R.getMinutes() === 0)
                ),
              minTime: new Date().setHours(9, 0),
              maxTime: new Date().setHours(16, 0),
            }),
            h.jsx("br", {}),
            h.jsx("br", {}),
            h.jsx("label", { children: " Hora de fim:" }),
            h.jsx("input", {
              type: "text",
              value: u instanceof Date && !isNaN(u) ? Qo(u) : "",
              readOnly: !0,
            }),
            h.jsx("br", {}),
            h.jsx("br", {}),
            h.jsx("label", { children: "Linguagem de Programação:" }),
            h.jsx("input", {
              type: "text",
              value: d,
              onChange: (R) => m(R.target.value),
            }),
            h.jsx("br", {}),
            h.jsx("br", {}),
            h.jsx("label", { children: "Tipo:" }),
            h.jsxs("select", {
              value: v,
              onChange: (R) => S(R.target.value),
              children: [
                h.jsx("option", {
                  value: "Presencial",
                  children: "Presencial",
                }),
                h.jsx("option", { value: "On-line", children: "On-line" }),
              ],
            }),
            h.jsx("br", {}),
            h.jsx("br", {}),
            h.jsx("label", { children: "Método de Pagamento:" }),
            h.jsxs("select", {
              value: C,
              onChange: (R) => k(R.target.value),
              children: [
                h.jsx("option", {
                  value: "Multibanco",
                  children: "Multibanco",
                }),
                h.jsx("option", {
                  value: "Transferência Bancária",
                  children: "Transferência Bancária",
                }),
                h.jsx("option", { value: "MBWay", children: "MBWay" }),
              ],
            }),
            h.jsx("br", {}),
            h.jsx("br", {}),
            h.jsx("p", {
              className: "obrigatorio",
              children: "*Campos de preenchimento obrigatório",
            }),
            h.jsx("button", { type: "submit", children: "Submeter" }),
          ],
        }),
        g &&
          h.jsx("p", {
            style: { color: "red", marginLeft: "50px" },
            children: g,
          }),
      ],
    });
  },
  Wm = (e, t, r) => {
    if (String(e.explicandoId) !== String(t)) return !1;
    const n = new Date(e.data).toISOString().slice(0, 10),
      o = r.toISOString().slice(0, 10),
      a = r.toTimeString().slice(0, 5);
    return n > o
      ? e.confirmacao === "Confirmada" || e.confirmacao === "Recusada"
      : n === o
        ? e.confirmacao === "Confirmada" ||
          (e.confirmacao === "Recusada" && e.horaInicio >= a)
        : !1;
  },
  lR = () => {
    const [e, t] = _.useState(""),
      [r, n] = _.useState(""),
      [, o] = _.useState(""),
      [a, i] = _.useState([]),
      [s, l] = _.useState(""),
      [u, c] = _.useState(""),
      [d, m] = _.useState(""),
      [v, S] = _.useState(null),
      [C, k] = _.useState(1),
      [g, y] = _.useState(() => new Date()),
      w = 10,
      T = wa();
    _.useEffect(() => {
      const $ = setInterval(() => y(new Date()), 1e3);
      return () => clearInterval($);
    }, []);
    const P = _.useCallback(async () => {
      const $ = await de.get("/explicacoes"),
        ae = new Date(),
        le = $.data.filter((U) => Wm(U, r, ae));
      i(le);
    }, [r]);
    (_.useEffect(() => {
      const $ = sessionStorage.getItem("emailUsuario"),
        ae = sessionStorage.getItem("explicandoId");
      if (!$) {
        console.error("Nenhum email encontrado na sessão atual");
        return;
      }
      (ae || o("Erro! Utilizador não autenticado"),
        de
          .get(`/explicandos/${$}`)
          .then((le) => {
            (console.error("Resposta do backend:", le.data),
              t(le.data.nome),
              n(le.data.explicandoId));
          })
          .catch((le) => console.error("Erro ao obter o explicando:", le)));
    }, []),
      _.useEffect(() => {
        r && P();
      }, [P, r]),
      _.useEffect(() => {
        if (!r || sessionStorage.getItem("tipoUsuario") !== "Explicando")
          return;
        const $ = new WebSocket(Ml()),
          ae = () => {
            $.send(JSON.stringify({ type: "subscribe-explanation-list" }));
          },
          le = (U) => {
            try {
              const q = JSON.parse(U.data);
              if (q.type === "explanation-list-subscribed") {
                P();
                return;
              }
              if (q.type !== "explanation-status-updated" || !q.explanation)
                return;
              const ie = q.explanation;
              (i((z) => {
                const G = z.filter((Z) => Z._id !== ie._id);
                return Wm(ie, r, new Date()) ? [...G, ie] : G;
              }),
                k(1));
            } catch (q) {
              console.error("Erro ao processar atualização da explicação", q);
            }
          };
        return (
          $.addEventListener("open", ae),
          $.addEventListener("message", le),
          () => {
            ($.removeEventListener("open", ae),
              $.removeEventListener("message", le),
              $.close());
          }
        );
      }, [P, r]),
      _.useEffect(() => {
        k(1);
      }, [s]));
    const R = a.filter(($) => {
        const ae = new Date($.data).toLocaleDateString("sv-SE"),
          le = s ? ae === s : !0;
        return (u ? $.confirmacao === u : !0) && le;
      }),
      { items: M, totalPages: A } = fu(R, C, w),
      V = () => {
        if (v) {
          const $ = v.toLocaleDateString("sv-SE");
          l($);
        }
      },
      L = ($) => {
        T(`/EditarExplicacao/${$}`);
      },
      K = async ($) => {
        if (window.confirm("Tem a certez que deseja eliminar esta explicação?"))
          try {
            (await de.delete(`/explicacoes/${$}`),
              alert("Explicação eliminada com sucesso!"),
              P());
          } catch (ae) {
            console.error("Erro ao eliminar explicação", ae);
          }
      };
    return h.jsxs("div", {
      children: [
        h.jsx(Un, {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsxs("p", { className: "saudacao", children: ["Olá, ", e] }),
        h.jsxs("h2", {
          className: "explicacoes",
          children: ["Explicações de ", e],
        }),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsxs("div", {
          className: "data",
          children: [
            h.jsx("label", { className: "data", children: "Data" }),
            h.jsx(co, {
              className: "datePicker2",
              selected: v,
              onChange: ($) => S($),
              minDate: new Date(),
              placeholderText: "Seleccione uma data",
              dateFormat: "yyyy-MM-dd",
            }),
            h.jsx("button", {
              onClick: V,
              className: "bg-blue-500 text-white px-3 py-1 ml-2 rounded",
              children: "Pesquisar por Data",
            }),
            h.jsx("button", {
              type: "button",
              onClick: () => {
                (S(null), l(""));
              },
              children: "Limpar data",
            }),
          ],
        }),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsxs("div", {
          className: "filtroConfirmacao",
          children: [
            h.jsx("label", { children: "Confirmação" }),
            h.jsxs("select", {
              value: d,
              onChange: ($) => m($.target.value),
              children: [
                h.jsx("option", { value: "", children: "Todas" }),
                h.jsx("option", {
                  value: "Confirmada",
                  children: "Confirmada",
                }),
                h.jsx("option", { value: "Recusada", children: "Recusada" }),
              ],
            }),
            h.jsx("button", {
              onClick: () => c(d),
              children: "Pesquisar por Confirmação",
            }),
            h.jsx("button", {
              type: "button",
              onClick: () => {
                (m(""), c(""));
              },
              children: "Limpar confirmação",
            }),
          ],
        }),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsxs("table", {
          className: "table-auto_border-collapse_w-full",
          children: [
            h.jsx("thead", {
              children: h.jsxs("tr", {
                className: "bg-gray-200",
                children: [
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Data",
                  }),
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Hora Início",
                  }),
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Hora Fim",
                  }),
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Linguagem",
                  }),
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Modalidade",
                  }),
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Pagamento",
                  }),
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Confirmação",
                  }),
                  h.jsx("th", {
                    className: "border_px-2_py-1",
                    children: "Ações",
                  }),
                ],
              }),
            }),
            h.jsxs("tbody", {
              children: [
                M.map(($) =>
                  h.jsxs(
                    "tr",
                    {
                      children: [
                        h.jsx("td", {
                          className: "border_px-2_py-1",
                          children: new Date($.data)
                            .toISOString()
                            .split("T")[0],
                        }),
                        h.jsx("td", {
                          className: "border_px-2_py-1",
                          children: $.horaInicio,
                        }),
                        h.jsx("td", {
                          className: "border_px-2_py-1",
                          children: $.horaFim,
                        }),
                        h.jsx("td", {
                          className: "border_px-2_py-1",
                          children: $.linguagem,
                        }),
                        h.jsx("td", {
                          className: "border_px-2_py-1",
                          children: $.tipo,
                        }),
                        h.jsx("td", {
                          className: "border_px-2_py-1",
                          children: $.pagamento,
                        }),
                        h.jsx("td", {
                          className: "border_px-2_py-1",
                          children: $.confirmacao,
                        }),
                        h.jsxs("td", {
                          className: "border_px-2_py-1",
                          children: [
                            $.confirmacao === "Confirmada" &&
                              $.tipo === "On-line" &&
                              aw($, g) &&
                              h.jsx(or, {
                                to: `/ExplicacoesOnline/${$._id}`,
                                children: "Entrar na explicação",
                              }),
                            h.jsx("button", {
                              className:
                                "bg-green-500_text-white_px-2_py-1_mr-2",
                              onClick: () => L($._id),
                              children: "Alterar",
                            }),
                            h.jsx("button", {
                              className: "bg-red-500_text-white_px-2_py-1",
                              onClick: () => K($._id),
                              children: "Eliminar",
                            }),
                          ],
                        }),
                      ],
                    },
                    $._id,
                  ),
                ),
                R.length === 0 &&
                  h.jsx("tr", {
                    children: h.jsx("td", {
                      colSpan: "9",
                      className: "text-center_py-4",
                      children: "Nenhuma explicação pendente encontrada.",
                    }),
                  }),
              ],
            }),
          ],
        }),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx(hu, { currentPage: C, totalPages: A, setCurrentPage: k }),
      ],
    });
  };
class uR {
  constructor() {
    ((this.encoder = new TextEncoder()),
      (this._pieces = []),
      (this._parts = []));
  }
  append_buffer(t) {
    (this.flush(), this._parts.push(t));
  }
  append(t) {
    this._pieces.push(t);
  }
  flush() {
    if (this._pieces.length > 0) {
      const t = new Uint8Array(this._pieces);
      (this._parts.push(t), (this._pieces = []));
    }
  }
  toArrayBuffer() {
    const t = [];
    for (const r of this._parts) t.push(r);
    return cR(t).buffer;
  }
}
function cR(e) {
  let t = 0;
  for (const o of e) t += o.byteLength;
  const r = new Uint8Array(t);
  let n = 0;
  for (const o of e) {
    const a = new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
    (r.set(a, n), (n += o.byteLength));
  }
  return r;
}
function iw(e) {
  return new dR(e).unpack();
}
function sw(e) {
  const t = new pR(),
    r = t.pack(e);
  return r instanceof Promise ? r.then(() => t.getBuffer()) : t.getBuffer();
}
class dR {
  constructor(t) {
    ((this.index = 0),
      (this.dataBuffer = t),
      (this.dataView = new Uint8Array(this.dataBuffer)),
      (this.length = this.dataBuffer.byteLength));
  }
  unpack() {
    const t = this.unpack_uint8();
    if (t < 128) return t;
    if ((t ^ 224) < 32) return (t ^ 224) - 32;
    let r;
    if ((r = t ^ 160) <= 15) return this.unpack_raw(r);
    if ((r = t ^ 176) <= 15) return this.unpack_string(r);
    if ((r = t ^ 144) <= 15) return this.unpack_array(r);
    if ((r = t ^ 128) <= 15) return this.unpack_map(r);
    switch (t) {
      case 192:
        return null;
      case 193:
        return;
      case 194:
        return !1;
      case 195:
        return !0;
      case 202:
        return this.unpack_float();
      case 203:
        return this.unpack_double();
      case 204:
        return this.unpack_uint8();
      case 205:
        return this.unpack_uint16();
      case 206:
        return this.unpack_uint32();
      case 207:
        return this.unpack_uint64();
      case 208:
        return this.unpack_int8();
      case 209:
        return this.unpack_int16();
      case 210:
        return this.unpack_int32();
      case 211:
        return this.unpack_int64();
      case 212:
        return;
      case 213:
        return;
      case 214:
        return;
      case 215:
        return;
      case 216:
        return ((r = this.unpack_uint16()), this.unpack_string(r));
      case 217:
        return ((r = this.unpack_uint32()), this.unpack_string(r));
      case 218:
        return ((r = this.unpack_uint16()), this.unpack_raw(r));
      case 219:
        return ((r = this.unpack_uint32()), this.unpack_raw(r));
      case 220:
        return ((r = this.unpack_uint16()), this.unpack_array(r));
      case 221:
        return ((r = this.unpack_uint32()), this.unpack_array(r));
      case 222:
        return ((r = this.unpack_uint16()), this.unpack_map(r));
      case 223:
        return ((r = this.unpack_uint32()), this.unpack_map(r));
    }
  }
  unpack_uint8() {
    const t = this.dataView[this.index] & 255;
    return (this.index++, t);
  }
  unpack_uint16() {
    const t = this.read(2),
      r = (t[0] & 255) * 256 + (t[1] & 255);
    return ((this.index += 2), r);
  }
  unpack_uint32() {
    const t = this.read(4),
      r = ((t[0] * 256 + t[1]) * 256 + t[2]) * 256 + t[3];
    return ((this.index += 4), r);
  }
  unpack_uint64() {
    const t = this.read(8),
      r =
        ((((((t[0] * 256 + t[1]) * 256 + t[2]) * 256 + t[3]) * 256 + t[4]) *
          256 +
          t[5]) *
          256 +
          t[6]) *
          256 +
        t[7];
    return ((this.index += 8), r);
  }
  unpack_int8() {
    const t = this.unpack_uint8();
    return t < 128 ? t : t - 256;
  }
  unpack_int16() {
    const t = this.unpack_uint16();
    return t < 32768 ? t : t - 65536;
  }
  unpack_int32() {
    const t = this.unpack_uint32();
    return t < 2 ** 31 ? t : t - 2 ** 32;
  }
  unpack_int64() {
    const t = this.unpack_uint64();
    return t < 2 ** 63 ? t : t - 2 ** 64;
  }
  unpack_raw(t) {
    if (this.length < this.index + t)
      throw new Error(
        `BinaryPackFailure: index is out of range ${this.index} ${t} ${this.length}`,
      );
    const r = this.dataBuffer.slice(this.index, this.index + t);
    return ((this.index += t), r);
  }
  unpack_string(t) {
    const r = this.read(t);
    let n = 0,
      o = "",
      a,
      i;
    for (; n < t;)
      ((a = r[n]),
        a < 160
          ? ((i = a), n++)
          : (a ^ 192) < 32
            ? ((i = ((a & 31) << 6) | (r[n + 1] & 63)), (n += 2))
            : (a ^ 224) < 16
              ? ((i =
                  ((a & 15) << 12) | ((r[n + 1] & 63) << 6) | (r[n + 2] & 63)),
                (n += 3))
              : ((i =
                  ((a & 7) << 18) |
                  ((r[n + 1] & 63) << 12) |
                  ((r[n + 2] & 63) << 6) |
                  (r[n + 3] & 63)),
                (n += 4)),
        (o += String.fromCodePoint(i)));
    return ((this.index += t), o);
  }
  unpack_array(t) {
    const r = new Array(t);
    for (let n = 0; n < t; n++) r[n] = this.unpack();
    return r;
  }
  unpack_map(t) {
    const r = {};
    for (let n = 0; n < t; n++) {
      const o = this.unpack();
      r[o] = this.unpack();
    }
    return r;
  }
  unpack_float() {
    const t = this.unpack_uint32(),
      r = t >> 31,
      n = ((t >> 23) & 255) - 127,
      o = (t & 8388607) | 8388608;
    return (r === 0 ? 1 : -1) * o * 2 ** (n - 23);
  }
  unpack_double() {
    const t = this.unpack_uint32(),
      r = this.unpack_uint32(),
      n = t >> 31,
      o = ((t >> 20) & 2047) - 1023,
      i = ((t & 1048575) | 1048576) * 2 ** (o - 20) + r * 2 ** (o - 52);
    return (n === 0 ? 1 : -1) * i;
  }
  read(t) {
    const r = this.index;
    if (r + t <= this.length) return this.dataView.subarray(r, r + t);
    throw new Error("BinaryPackFailure: read index out of range");
  }
}
class pR {
  getBuffer() {
    return this._bufferBuilder.toArrayBuffer();
  }
  pack(t) {
    if (typeof t == "string") this.pack_string(t);
    else if (typeof t == "number")
      Math.floor(t) === t ? this.pack_integer(t) : this.pack_double(t);
    else if (typeof t == "boolean")
      t === !0
        ? this._bufferBuilder.append(195)
        : t === !1 && this._bufferBuilder.append(194);
    else if (t === void 0) this._bufferBuilder.append(192);
    else if (typeof t == "object")
      if (t === null) this._bufferBuilder.append(192);
      else {
        const r = t.constructor;
        if (t instanceof Array) {
          const n = this.pack_array(t);
          if (n instanceof Promise)
            return n.then(() => this._bufferBuilder.flush());
        } else if (t instanceof ArrayBuffer) this.pack_bin(new Uint8Array(t));
        else if ("BYTES_PER_ELEMENT" in t) {
          const n = t;
          this.pack_bin(new Uint8Array(n.buffer, n.byteOffset, n.byteLength));
        } else if (t instanceof Date) this.pack_string(t.toString());
        else {
          if (t instanceof Blob)
            return t.arrayBuffer().then((n) => {
              (this.pack_bin(new Uint8Array(n)), this._bufferBuilder.flush());
            });
          if (r == Object || r.toString().startsWith("class")) {
            const n = this.pack_object(t);
            if (n instanceof Promise)
              return n.then(() => this._bufferBuilder.flush());
          } else throw new Error(`Type "${r.toString()}" not yet supported`);
        }
      }
    else throw new Error(`Type "${typeof t}" not yet supported`);
    this._bufferBuilder.flush();
  }
  pack_bin(t) {
    const r = t.length;
    if (r <= 15) this.pack_uint8(160 + r);
    else if (r <= 65535) (this._bufferBuilder.append(218), this.pack_uint16(r));
    else if (r <= 4294967295)
      (this._bufferBuilder.append(219), this.pack_uint32(r));
    else throw new Error("Invalid length");
    this._bufferBuilder.append_buffer(t);
  }
  pack_string(t) {
    const r = this._textEncoder.encode(t),
      n = r.length;
    if (n <= 15) this.pack_uint8(176 + n);
    else if (n <= 65535) (this._bufferBuilder.append(216), this.pack_uint16(n));
    else if (n <= 4294967295)
      (this._bufferBuilder.append(217), this.pack_uint32(n));
    else throw new Error("Invalid length");
    this._bufferBuilder.append_buffer(r);
  }
  pack_array(t) {
    const r = t.length;
    if (r <= 15) this.pack_uint8(144 + r);
    else if (r <= 65535) (this._bufferBuilder.append(220), this.pack_uint16(r));
    else if (r <= 4294967295)
      (this._bufferBuilder.append(221), this.pack_uint32(r));
    else throw new Error("Invalid length");
    const n = (o) => {
      if (o < r) {
        const a = this.pack(t[o]);
        return a instanceof Promise ? a.then(() => n(o + 1)) : n(o + 1);
      }
    };
    return n(0);
  }
  pack_integer(t) {
    if (t >= -32 && t <= 127) this._bufferBuilder.append(t & 255);
    else if (t >= 0 && t <= 255)
      (this._bufferBuilder.append(204), this.pack_uint8(t));
    else if (t >= -128 && t <= 127)
      (this._bufferBuilder.append(208), this.pack_int8(t));
    else if (t >= 0 && t <= 65535)
      (this._bufferBuilder.append(205), this.pack_uint16(t));
    else if (t >= -32768 && t <= 32767)
      (this._bufferBuilder.append(209), this.pack_int16(t));
    else if (t >= 0 && t <= 4294967295)
      (this._bufferBuilder.append(206), this.pack_uint32(t));
    else if (t >= -2147483648 && t <= 2147483647)
      (this._bufferBuilder.append(210), this.pack_int32(t));
    else if (t >= -9223372036854776e3 && t <= 9223372036854776e3)
      (this._bufferBuilder.append(211), this.pack_int64(t));
    else if (t >= 0 && t <= 18446744073709552e3)
      (this._bufferBuilder.append(207), this.pack_uint64(t));
    else throw new Error("Invalid integer");
  }
  pack_double(t) {
    let r = 0;
    t < 0 && ((r = 1), (t = -t));
    const n = Math.floor(Math.log(t) / Math.LN2),
      o = t / 2 ** n - 1,
      a = Math.floor(o * 2 ** 52),
      i = 2 ** 32,
      s = (r << 31) | ((n + 1023) << 20) | ((a / i) & 1048575),
      l = a % i;
    (this._bufferBuilder.append(203), this.pack_int32(s), this.pack_int32(l));
  }
  pack_object(t) {
    const r = Object.keys(t),
      n = r.length;
    if (n <= 15) this.pack_uint8(128 + n);
    else if (n <= 65535) (this._bufferBuilder.append(222), this.pack_uint16(n));
    else if (n <= 4294967295)
      (this._bufferBuilder.append(223), this.pack_uint32(n));
    else throw new Error("Invalid length");
    const o = (a) => {
      if (a < r.length) {
        const i = r[a];
        if (t.hasOwnProperty(i)) {
          this.pack(i);
          const s = this.pack(t[i]);
          if (s instanceof Promise) return s.then(() => o(a + 1));
        }
        return o(a + 1);
      }
    };
    return o(0);
  }
  pack_uint8(t) {
    this._bufferBuilder.append(t);
  }
  pack_uint16(t) {
    (this._bufferBuilder.append(t >> 8), this._bufferBuilder.append(t & 255));
  }
  pack_uint32(t) {
    const r = t & 4294967295;
    (this._bufferBuilder.append((r & 4278190080) >>> 24),
      this._bufferBuilder.append((r & 16711680) >>> 16),
      this._bufferBuilder.append((r & 65280) >>> 8),
      this._bufferBuilder.append(r & 255));
  }
  pack_uint64(t) {
    const r = t / 4294967296,
      n = t % 2 ** 32;
    (this._bufferBuilder.append((r & 4278190080) >>> 24),
      this._bufferBuilder.append((r & 16711680) >>> 16),
      this._bufferBuilder.append((r & 65280) >>> 8),
      this._bufferBuilder.append(r & 255),
      this._bufferBuilder.append((n & 4278190080) >>> 24),
      this._bufferBuilder.append((n & 16711680) >>> 16),
      this._bufferBuilder.append((n & 65280) >>> 8),
      this._bufferBuilder.append(n & 255));
  }
  pack_int8(t) {
    this._bufferBuilder.append(t & 255);
  }
  pack_int16(t) {
    (this._bufferBuilder.append((t & 65280) >> 8),
      this._bufferBuilder.append(t & 255));
  }
  pack_int32(t) {
    (this._bufferBuilder.append((t >>> 24) & 255),
      this._bufferBuilder.append((t & 16711680) >>> 16),
      this._bufferBuilder.append((t & 65280) >>> 8),
      this._bufferBuilder.append(t & 255));
  }
  pack_int64(t) {
    const r = Math.floor(t / 4294967296),
      n = t % 2 ** 32;
    (this._bufferBuilder.append((r & 4278190080) >>> 24),
      this._bufferBuilder.append((r & 16711680) >>> 16),
      this._bufferBuilder.append((r & 65280) >>> 8),
      this._bufferBuilder.append(r & 255),
      this._bufferBuilder.append((n & 4278190080) >>> 24),
      this._bufferBuilder.append((n & 16711680) >>> 16),
      this._bufferBuilder.append((n & 65280) >>> 8),
      this._bufferBuilder.append(n & 255));
  }
  constructor() {
    ((this._bufferBuilder = new uR()), (this._textEncoder = new TextEncoder()));
  }
}
let lw = !0,
  uw = !0;
function Ha(e, t, r) {
  const n = e.match(t);
  return n && n.length >= r && parseFloat(n[r], 10);
}
function vo(e, t, r) {
  if (!e.RTCPeerConnection) return;
  if (
    !Object.getOwnPropertyDescriptor(EventTarget.prototype, "addEventListener")
      .writable
  ) {
    mf("Unable to polyfill events");
    return;
  }
  const o = e.RTCPeerConnection.prototype,
    a = o.addEventListener;
  o.addEventListener = function (s, l) {
    if (s !== t) return a.apply(this, arguments);
    const u = (c) => {
      const d = r(c);
      d && (l.handleEvent ? l.handleEvent(d) : l(d));
    };
    return (
      (this._eventMap = this._eventMap || {}),
      this._eventMap[t] || (this._eventMap[t] = new Map()),
      this._eventMap[t].set(l, u),
      a.apply(this, [s, u])
    );
  };
  const i = o.removeEventListener;
  ((o.removeEventListener = function (s, l) {
    if (s !== t || !this._eventMap || !this._eventMap[t])
      return i.apply(this, arguments);
    if (!this._eventMap[t].has(l)) return i.apply(this, arguments);
    const u = this._eventMap[t].get(l);
    return (
      this._eventMap[t].delete(l),
      this._eventMap[t].size === 0 && delete this._eventMap[t],
      Object.keys(this._eventMap).length === 0 && delete this._eventMap,
      i.apply(this, [s, u])
    );
  }),
    Object.defineProperty(o, "on" + t, {
      get() {
        return this["_on" + t];
      },
      set(s) {
        (this["_on" + t] &&
          (this.removeEventListener(t, this["_on" + t]),
          delete this["_on" + t]),
          s && this.addEventListener(t, (this["_on" + t] = s)));
      },
      enumerable: !0,
      configurable: !0,
    }));
}
function fR(e) {
  return typeof e != "boolean"
    ? new Error("Argument type: " + typeof e + ". Please use a boolean.")
    : ((lw = e),
      e ? "adapter.js logging disabled" : "adapter.js logging enabled");
}
function hR(e) {
  return typeof e != "boolean"
    ? new Error("Argument type: " + typeof e + ". Please use a boolean.")
    : ((uw = !e),
      "adapter.js deprecation warnings " + (e ? "disabled" : "enabled"));
}
function mf() {
  if (typeof window == "object") {
    if (lw) return;
    typeof console < "u" &&
      typeof console.log == "function" &&
      console.log.apply(console, arguments);
  }
}
function gf(e, t) {
  uw && console.warn(e + " is deprecated, please use " + t + " instead.");
}
function mR(e) {
  const t = { browser: null, version: null };
  if (typeof e > "u" || !e.navigator || !e.navigator.userAgent)
    return ((t.browser = "Not a browser."), t);
  const { navigator: r } = e;
  if (r.userAgentData && r.userAgentData.brands) {
    const n = r.userAgentData.brands.find((o) => o.brand === "Chromium");
    if (n) {
      const o = parseInt(n.version, 10);
      if (o >= 90) return { browser: "chrome", version: o };
    }
  }
  if (r.mozGetUserMedia)
    ((t.browser = "firefox"),
      (t.version = parseInt(Ha(r.userAgent, /Firefox\/(\d+)\./, 1))));
  else if (
    r.webkitGetUserMedia ||
    (e.isSecureContext === !1 && e.webkitRTCPeerConnection)
  )
    ((t.browser = "chrome"),
      (t.version =
        parseInt(Ha(r.userAgent, /Chrom(e|ium)\/(\d+)\./, 2)) || null));
  else if (e.RTCPeerConnection && r.userAgent.match(/AppleWebKit\/(\d+)\./))
    ((t.browser = "safari"),
      (t.version = parseInt(Ha(r.userAgent, /AppleWebKit\/(\d+)\./, 1))),
      (t.supportsUnifiedPlan =
        e.RTCRtpTransceiver &&
        "currentDirection" in e.RTCRtpTransceiver.prototype),
      (t._safariVersion = Ha(r.userAgent, /Version\/(\d+(\.?\d+))/, 1)));
  else return ((t.browser = "Not a supported browser."), t);
  return t;
}
function Vm(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function cw(e) {
  return Vm(e)
    ? Object.keys(e).reduce(function (t, r) {
        const n = Vm(e[r]),
          o = n ? cw(e[r]) : e[r],
          a = n && !Object.keys(o).length;
        return o === void 0 || a ? t : Object.assign(t, { [r]: o });
      }, {})
    : e;
}
function Pd(e, t, r) {
  !t ||
    r.has(t.id) ||
    (r.set(t.id, t),
    Object.keys(t).forEach((n) => {
      n.endsWith("Id")
        ? Pd(e, e.get(t[n]), r)
        : n.endsWith("Ids") &&
          t[n].forEach((o) => {
            Pd(e, e.get(o), r);
          });
    }));
}
function qm(e, t, r) {
  const n = r ? "outbound-rtp" : "inbound-rtp",
    o = new Map();
  if (t === null) return o;
  const a = [];
  return (
    e.forEach((i) => {
      i.type === "track" && i.trackIdentifier === t.id && a.push(i);
    }),
    a.forEach((i) => {
      e.forEach((s) => {
        s.type === n && s.trackId === i.id && Pd(e, s, o);
      });
    }),
    o
  );
}
const Qm = mf;
function dw(e, t) {
  if (t.version >= 64) return;
  const r = e && e.navigator;
  if (!r.mediaDevices) return;
  const n = function (s) {
      if (typeof s != "object" || s.mandatory || s.optional) return s;
      const l = {};
      return (
        Object.keys(s).forEach((u) => {
          if (u === "require" || u === "advanced" || u === "mediaSource")
            return;
          const c = typeof s[u] == "object" ? s[u] : { ideal: s[u] };
          c.exact !== void 0 &&
            typeof c.exact == "number" &&
            (c.min = c.max = c.exact);
          const d = function (m, v) {
            return m
              ? m + v.charAt(0).toUpperCase() + v.slice(1)
              : v === "deviceId"
                ? "sourceId"
                : v;
          };
          if (c.ideal !== void 0) {
            l.optional = l.optional || [];
            let m = {};
            typeof c.ideal == "number"
              ? ((m[d("min", u)] = c.ideal),
                l.optional.push(m),
                (m = {}),
                (m[d("max", u)] = c.ideal),
                l.optional.push(m))
              : ((m[d("", u)] = c.ideal), l.optional.push(m));
          }
          c.exact !== void 0 && typeof c.exact != "number"
            ? ((l.mandatory = l.mandatory || {}),
              (l.mandatory[d("", u)] = c.exact))
            : ["min", "max"].forEach((m) => {
                c[m] !== void 0 &&
                  ((l.mandatory = l.mandatory || {}),
                  (l.mandatory[d(m, u)] = c[m]));
              });
        }),
        s.advanced && (l.optional = (l.optional || []).concat(s.advanced)),
        l
      );
    },
    o = function (s, l) {
      if (t.version >= 61) return l(s);
      if (
        ((s = JSON.parse(JSON.stringify(s))), s && typeof s.audio == "object")
      ) {
        const u = function (c, d, m) {
          d in c && !(m in c) && ((c[m] = c[d]), delete c[d]);
        };
        ((s = JSON.parse(JSON.stringify(s))),
          u(s.audio, "autoGainControl", "googAutoGainControl"),
          u(s.audio, "noiseSuppression", "googNoiseSuppression"),
          (s.audio = n(s.audio)));
      }
      if (s && typeof s.video == "object") {
        let u = s.video.facingMode;
        u = u && (typeof u == "object" ? u : { ideal: u });
        const c = t.version < 66;
        if (
          u &&
          (u.exact === "user" ||
            u.exact === "environment" ||
            u.ideal === "user" ||
            u.ideal === "environment") &&
          !(
            r.mediaDevices.getSupportedConstraints &&
            r.mediaDevices.getSupportedConstraints().facingMode &&
            !c
          )
        ) {
          delete s.video.facingMode;
          let d;
          if (
            (u.exact === "environment" || u.ideal === "environment"
              ? (d = ["back", "rear"])
              : (u.exact === "user" || u.ideal === "user") && (d = ["front"]),
            d)
          )
            return r.mediaDevices.enumerateDevices().then((m) => {
              m = m.filter((S) => S.kind === "videoinput");
              let v = m.find((S) =>
                d.some((C) => S.label.toLowerCase().includes(C)),
              );
              return (
                !v && m.length && d.includes("back") && (v = m[m.length - 1]),
                v &&
                  (s.video.deviceId = u.exact
                    ? { exact: v.deviceId }
                    : { ideal: v.deviceId }),
                (s.video = n(s.video)),
                Qm("chrome: " + JSON.stringify(s)),
                l(s)
              );
            });
        }
        s.video = n(s.video);
      }
      return (Qm("chrome: " + JSON.stringify(s)), l(s));
    },
    a = function (s) {
      return t.version >= 64
        ? s
        : {
            name:
              {
                PermissionDeniedError: "NotAllowedError",
                PermissionDismissedError: "NotAllowedError",
                InvalidStateError: "NotAllowedError",
                DevicesNotFoundError: "NotFoundError",
                ConstraintNotSatisfiedError: "OverconstrainedError",
                TrackStartError: "NotReadableError",
                MediaDeviceFailedDueToShutdown: "NotAllowedError",
                MediaDeviceKillSwitchOn: "NotAllowedError",
                TabCaptureError: "AbortError",
                ScreenCaptureError: "AbortError",
                DeviceCaptureError: "AbortError",
              }[s.name] || s.name,
            message: s.message,
            constraint: s.constraint || s.constraintName,
            toString() {
              return this.name + (this.message && ": ") + this.message;
            },
          };
    },
    i = function (s, l, u) {
      o(s, (c) => {
        r.webkitGetUserMedia(c, l, (d) => {
          u && u(a(d));
        });
      });
    };
  if (((r.getUserMedia = i.bind(r)), r.mediaDevices.getUserMedia)) {
    const s = r.mediaDevices.getUserMedia.bind(r.mediaDevices);
    r.mediaDevices.getUserMedia = function (l) {
      return o(l, (u) =>
        s(u).then(
          (c) => {
            if (
              (u.audio && !c.getAudioTracks().length) ||
              (u.video && !c.getVideoTracks().length)
            )
              throw (
                c.getTracks().forEach((d) => {
                  d.stop();
                }),
                new DOMException("", "NotFoundError")
              );
            return c;
          },
          (c) => Promise.reject(a(c)),
        ),
      );
    };
  }
}
function pw(e) {
  e.MediaStream = e.MediaStream || e.webkitMediaStream;
}
function fw(e, t) {
  if (!(t.version > 102))
    if (
      typeof e == "object" &&
      e.RTCPeerConnection &&
      !("ontrack" in e.RTCPeerConnection.prototype)
    ) {
      Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
        get() {
          return this._ontrack;
        },
        set(n) {
          (this._ontrack && this.removeEventListener("track", this._ontrack),
            this.addEventListener("track", (this._ontrack = n)));
        },
        enumerable: !0,
        configurable: !0,
      });
      const r = e.RTCPeerConnection.prototype.setRemoteDescription;
      e.RTCPeerConnection.prototype.setRemoteDescription = function () {
        return (
          this._ontrackpoly ||
            ((this._ontrackpoly = (o) => {
              (o.stream.addEventListener("addtrack", (a) => {
                let i;
                e.RTCPeerConnection.prototype.getReceivers
                  ? (i = this.getReceivers().find(
                      (l) => l.track && l.track.id === a.track.id,
                    ))
                  : (i = { track: a.track });
                const s = new Event("track");
                ((s.track = a.track),
                  (s.receiver = i),
                  (s.transceiver = { receiver: i }),
                  (s.streams = [o.stream]),
                  this.dispatchEvent(s));
              }),
                o.stream.getTracks().forEach((a) => {
                  let i;
                  e.RTCPeerConnection.prototype.getReceivers
                    ? (i = this.getReceivers().find(
                        (l) => l.track && l.track.id === a.id,
                      ))
                    : (i = { track: a });
                  const s = new Event("track");
                  ((s.track = a),
                    (s.receiver = i),
                    (s.transceiver = { receiver: i }),
                    (s.streams = [o.stream]),
                    this.dispatchEvent(s));
                }));
            }),
            this.addEventListener("addstream", this._ontrackpoly)),
          r.apply(this, arguments)
        );
      };
    } else
      vo(
        e,
        "track",
        (r) => (
          r.transceiver ||
            Object.defineProperty(r, "transceiver", {
              value: { receiver: r.receiver },
            }),
          r
        ),
      );
}
function hw(e) {
  if (
    typeof e == "object" &&
    e.RTCPeerConnection &&
    !("getSenders" in e.RTCPeerConnection.prototype) &&
    "createDTMFSender" in e.RTCPeerConnection.prototype
  ) {
    const t = function (o, a) {
      return {
        track: a,
        get dtmf() {
          return (
            this._dtmf === void 0 &&
              (a.kind === "audio"
                ? (this._dtmf = o.createDTMFSender(a))
                : (this._dtmf = null)),
            this._dtmf
          );
        },
        _pc: o,
      };
    };
    if (!e.RTCPeerConnection.prototype.getSenders) {
      e.RTCPeerConnection.prototype.getSenders = function () {
        return ((this._senders = this._senders || []), this._senders.slice());
      };
      const o = e.RTCPeerConnection.prototype.addTrack;
      e.RTCPeerConnection.prototype.addTrack = function (s, l) {
        let u = o.apply(this, arguments);
        return (u || ((u = t(this, s)), this._senders.push(u)), u);
      };
      const a = e.RTCPeerConnection.prototype.removeTrack;
      e.RTCPeerConnection.prototype.removeTrack = function (s) {
        a.apply(this, arguments);
        const l = this._senders.indexOf(s);
        l !== -1 && this._senders.splice(l, 1);
      };
    }
    const r = e.RTCPeerConnection.prototype.addStream;
    e.RTCPeerConnection.prototype.addStream = function (a) {
      ((this._senders = this._senders || []),
        r.apply(this, [a]),
        a.getTracks().forEach((i) => {
          this._senders.push(t(this, i));
        }));
    };
    const n = e.RTCPeerConnection.prototype.removeStream;
    e.RTCPeerConnection.prototype.removeStream = function (a) {
      ((this._senders = this._senders || []),
        n.apply(this, [a]),
        a.getTracks().forEach((i) => {
          const s = this._senders.find((l) => l.track === i);
          s && this._senders.splice(this._senders.indexOf(s), 1);
        }));
    };
  } else if (
    typeof e == "object" &&
    e.RTCPeerConnection &&
    "getSenders" in e.RTCPeerConnection.prototype &&
    "createDTMFSender" in e.RTCPeerConnection.prototype &&
    e.RTCRtpSender &&
    !("dtmf" in e.RTCRtpSender.prototype)
  ) {
    const t = e.RTCPeerConnection.prototype.getSenders;
    ((e.RTCPeerConnection.prototype.getSenders = function () {
      const n = t.apply(this, []);
      return (n.forEach((o) => (o._pc = this)), n);
    }),
      Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
        get() {
          return (
            this._dtmf === void 0 &&
              (this.track.kind === "audio"
                ? (this._dtmf = this._pc.createDTMFSender(this.track))
                : (this._dtmf = null)),
            this._dtmf
          );
        },
      }));
  }
}
function mw(e, t) {
  if (
    t.version >= 67 ||
    !(
      typeof e == "object" &&
      e.RTCPeerConnection &&
      e.RTCRtpSender &&
      e.RTCRtpReceiver
    )
  )
    return;
  if (!("getStats" in e.RTCRtpSender.prototype)) {
    const n = e.RTCPeerConnection.prototype.getSenders;
    n &&
      (e.RTCPeerConnection.prototype.getSenders = function () {
        const i = n.apply(this, []);
        return (i.forEach((s) => (s._pc = this)), i);
      });
    const o = e.RTCPeerConnection.prototype.addTrack;
    (o &&
      (e.RTCPeerConnection.prototype.addTrack = function () {
        const i = o.apply(this, arguments);
        return ((i._pc = this), i);
      }),
      (e.RTCRtpSender.prototype.getStats = function () {
        const i = this;
        return this._pc.getStats().then((s) => qm(s, i.track, !0));
      }));
  }
  if (!("getStats" in e.RTCRtpReceiver.prototype)) {
    const n = e.RTCPeerConnection.prototype.getReceivers;
    (n &&
      (e.RTCPeerConnection.prototype.getReceivers = function () {
        const a = n.apply(this, []);
        return (a.forEach((i) => (i._pc = this)), a);
      }),
      vo(e, "track", (o) => ((o.receiver._pc = o.srcElement), o)),
      (e.RTCRtpReceiver.prototype.getStats = function () {
        const a = this;
        return this._pc.getStats().then((i) => qm(i, a.track, !1));
      }));
  }
  if (!(
    "getStats" in e.RTCRtpSender.prototype &&
    "getStats" in e.RTCRtpReceiver.prototype
  ))
    return;
  const r = e.RTCPeerConnection.prototype.getStats;
  e.RTCPeerConnection.prototype.getStats = function () {
    if (arguments.length > 0 && arguments[0] instanceof e.MediaStreamTrack) {
      const o = arguments[0];
      let a, i, s;
      return (
        this.getSenders().forEach((l) => {
          l.track === o && (a ? (s = !0) : (a = l));
        }),
        this.getReceivers().forEach(
          (l) => (l.track === o && (i ? (s = !0) : (i = l)), l.track === o),
        ),
        s || (a && i)
          ? Promise.reject(
              new DOMException(
                "There are more than one sender or receiver for the track.",
                "InvalidAccessError",
              ),
            )
          : a
            ? a.getStats()
            : i
              ? i.getStats()
              : Promise.reject(
                  new DOMException(
                    "There is no sender or receiver for the track.",
                    "InvalidAccessError",
                  ),
                )
      );
    }
    return r.apply(this, arguments);
  };
}
function gw(e) {
  e.RTCPeerConnection.prototype.getLocalStreams = function () {
    return (
      (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
      Object.keys(this._shimmedLocalStreams).map(
        (i) => this._shimmedLocalStreams[i][0],
      )
    );
  };
  const t = e.RTCPeerConnection.prototype.addTrack;
  e.RTCPeerConnection.prototype.addTrack = function (i, s) {
    if (!s) return t.apply(this, arguments);
    this._shimmedLocalStreams = this._shimmedLocalStreams || {};
    const l = t.apply(this, arguments);
    return (
      this._shimmedLocalStreams[s.id]
        ? this._shimmedLocalStreams[s.id].indexOf(l) === -1 &&
          this._shimmedLocalStreams[s.id].push(l)
        : (this._shimmedLocalStreams[s.id] = [s, l]),
      l
    );
  };
  const r = e.RTCPeerConnection.prototype.addStream;
  e.RTCPeerConnection.prototype.addStream = function (i) {
    ((this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
      i.getTracks().forEach((u) => {
        if (this.getSenders().find((d) => d.track === u))
          throw new DOMException("Track already exists.", "InvalidAccessError");
      }));
    const s = this.getSenders();
    r.apply(this, arguments);
    const l = this.getSenders().filter((u) => s.indexOf(u) === -1);
    this._shimmedLocalStreams[i.id] = [i].concat(l);
  };
  const n = e.RTCPeerConnection.prototype.removeStream;
  e.RTCPeerConnection.prototype.removeStream = function (i) {
    return (
      (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
      delete this._shimmedLocalStreams[i.id],
      n.apply(this, arguments)
    );
  };
  const o = e.RTCPeerConnection.prototype.removeTrack;
  e.RTCPeerConnection.prototype.removeTrack = function (i) {
    return (
      (this._shimmedLocalStreams = this._shimmedLocalStreams || {}),
      i &&
        Object.keys(this._shimmedLocalStreams).forEach((s) => {
          const l = this._shimmedLocalStreams[s].indexOf(i);
          (l !== -1 && this._shimmedLocalStreams[s].splice(l, 1),
            this._shimmedLocalStreams[s].length === 1 &&
              delete this._shimmedLocalStreams[s]);
        }),
      o.apply(this, arguments)
    );
  };
}
function vw(e, t) {
  if (!e.RTCPeerConnection) return;
  if (e.RTCPeerConnection.prototype.addTrack && t.version >= 65) return gw(e);
  const r = e.RTCPeerConnection.prototype.getLocalStreams;
  e.RTCPeerConnection.prototype.getLocalStreams = function () {
    const c = r.apply(this);
    return (
      (this._reverseStreams = this._reverseStreams || {}),
      c.map((d) => this._reverseStreams[d.id])
    );
  };
  const n = e.RTCPeerConnection.prototype.addStream;
  e.RTCPeerConnection.prototype.addStream = function (c) {
    if (
      ((this._streams = this._streams || {}),
      (this._reverseStreams = this._reverseStreams || {}),
      c.getTracks().forEach((d) => {
        if (this.getSenders().find((v) => v.track === d))
          throw new DOMException("Track already exists.", "InvalidAccessError");
      }),
      !this._reverseStreams[c.id])
    ) {
      const d = new e.MediaStream(c.getTracks());
      ((this._streams[c.id] = d), (this._reverseStreams[d.id] = c), (c = d));
    }
    n.apply(this, [c]);
  };
  const o = e.RTCPeerConnection.prototype.removeStream;
  ((e.RTCPeerConnection.prototype.removeStream = function (c) {
    ((this._streams = this._streams || {}),
      (this._reverseStreams = this._reverseStreams || {}),
      o.apply(this, [this._streams[c.id] || c]),
      delete this._reverseStreams[
        this._streams[c.id] ? this._streams[c.id].id : c.id
      ],
      delete this._streams[c.id]);
  }),
    (e.RTCPeerConnection.prototype.addTrack = function (c, d) {
      if (this.signalingState === "closed")
        throw new DOMException(
          "The RTCPeerConnection's signalingState is 'closed'.",
          "InvalidStateError",
        );
      const m = [].slice.call(arguments, 1);
      if (m.length !== 1 || !m[0].getTracks().find((C) => C === c))
        throw new DOMException(
          "The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.",
          "NotSupportedError",
        );
      if (this.getSenders().find((C) => C.track === c))
        throw new DOMException("Track already exists.", "InvalidAccessError");
      ((this._streams = this._streams || {}),
        (this._reverseStreams = this._reverseStreams || {}));
      const S = this._streams[d.id];
      if (S)
        (S.addTrack(c),
          Promise.resolve().then(() => {
            this.dispatchEvent(new Event("negotiationneeded"));
          }));
      else {
        const C = new e.MediaStream([c]);
        ((this._streams[d.id] = C),
          (this._reverseStreams[C.id] = d),
          this.addStream(C));
      }
      return this.getSenders().find((C) => C.track === c);
    }));
  function a(u, c) {
    let d = c.sdp;
    return (
      Object.keys(u._reverseStreams || []).forEach((m) => {
        const v = u._reverseStreams[m],
          S = u._streams[v.id];
        d = d.replace(new RegExp(S.id, "g"), v.id);
      }),
      new RTCSessionDescription({ type: c.type, sdp: d })
    );
  }
  function i(u, c) {
    let d = c.sdp;
    return (
      Object.keys(u._reverseStreams || []).forEach((m) => {
        const v = u._reverseStreams[m],
          S = u._streams[v.id];
        d = d.replace(new RegExp(v.id, "g"), S.id);
      }),
      new RTCSessionDescription({ type: c.type, sdp: d })
    );
  }
  ["createOffer", "createAnswer"].forEach(function (u) {
    const c = e.RTCPeerConnection.prototype[u],
      d = {
        [u]() {
          const m = arguments;
          return arguments.length && typeof arguments[0] == "function"
            ? c.apply(this, [
                (S) => {
                  const C = a(this, S);
                  m[0].apply(null, [C]);
                },
                (S) => {
                  m[1] && m[1].apply(null, S);
                },
                arguments[2],
              ])
            : c.apply(this, arguments).then((S) => a(this, S));
        },
      };
    e.RTCPeerConnection.prototype[u] = d[u];
  });
  const s = e.RTCPeerConnection.prototype.setLocalDescription;
  e.RTCPeerConnection.prototype.setLocalDescription = function () {
    return !arguments.length || !arguments[0].type
      ? s.apply(this, arguments)
      : ((arguments[0] = i(this, arguments[0])), s.apply(this, arguments));
  };
  const l = Object.getOwnPropertyDescriptor(
    e.RTCPeerConnection.prototype,
    "localDescription",
  );
  (Object.defineProperty(e.RTCPeerConnection.prototype, "localDescription", {
    get() {
      const u = l.get.apply(this);
      return u.type === "" ? u : a(this, u);
    },
  }),
    (e.RTCPeerConnection.prototype.removeTrack = function (c) {
      if (this.signalingState === "closed")
        throw new DOMException(
          "The RTCPeerConnection's signalingState is 'closed'.",
          "InvalidStateError",
        );
      if (!c._pc)
        throw new DOMException(
          "Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.",
          "TypeError",
        );
      if (!(c._pc === this))
        throw new DOMException(
          "Sender was not created by this connection.",
          "InvalidAccessError",
        );
      this._streams = this._streams || {};
      let m;
      (Object.keys(this._streams).forEach((v) => {
        this._streams[v].getTracks().find((C) => c.track === C) &&
          (m = this._streams[v]);
      }),
        m &&
          (m.getTracks().length === 1
            ? this.removeStream(this._reverseStreams[m.id])
            : m.removeTrack(c.track),
          this.dispatchEvent(new Event("negotiationneeded"))));
    }));
}
function Rd(e, t) {
  (!e.RTCPeerConnection &&
    e.webkitRTCPeerConnection &&
    (e.RTCPeerConnection = e.webkitRTCPeerConnection),
    e.RTCPeerConnection &&
      t.version < 53 &&
      [
        "setLocalDescription",
        "setRemoteDescription",
        "addIceCandidate",
      ].forEach(function (r) {
        const n = e.RTCPeerConnection.prototype[r],
          o = {
            [r]() {
              return (
                (arguments[0] = new (
                  r === "addIceCandidate"
                    ? e.RTCIceCandidate
                    : e.RTCSessionDescription
                )(arguments[0])),
                n.apply(this, arguments)
              );
            },
          };
        e.RTCPeerConnection.prototype[r] = o[r];
      }));
}
function yw(e, t) {
  t.version > 102 ||
    vo(e, "negotiationneeded", (r) => {
      const n = r.target;
      if (!(
        (t.version < 72 ||
          (n.getConfiguration &&
            n.getConfiguration().sdpSemantics === "plan-b")) &&
        n.signalingState !== "stable"
      ))
        return r;
    });
}
const Km = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      fixNegotiationNeeded: yw,
      shimAddTrackRemoveTrack: vw,
      shimAddTrackRemoveTrackWithNative: gw,
      shimGetSendersWithDtmf: hw,
      shimGetUserMedia: dw,
      shimMediaStream: pw,
      shimOnTrack: fw,
      shimPeerConnection: Rd,
      shimSenderReceiverGetStats: mw,
    },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
function ww(e, t) {
  const r = e && e.navigator;
  if (!r.mediaDevices) return;
  const n = e && e.MediaStreamTrack;
  if (
    ((r.getUserMedia = function (o, a, i) {
      (gf("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"),
        r.mediaDevices.getUserMedia(o).then(a, i));
    }),
    !(
      t.version > 55 &&
      "autoGainControl" in r.mediaDevices.getSupportedConstraints()
    ))
  ) {
    const o = function (i, s, l) {
        s in i && !(l in i) && ((i[l] = i[s]), delete i[s]);
      },
      a = r.mediaDevices.getUserMedia.bind(r.mediaDevices);
    if (
      ((r.mediaDevices.getUserMedia = function (i) {
        return (
          typeof i == "object" &&
            typeof i.audio == "object" &&
            ((i = JSON.parse(JSON.stringify(i))),
            o(i.audio, "autoGainControl", "mozAutoGainControl"),
            o(i.audio, "noiseSuppression", "mozNoiseSuppression")),
          a(i)
        );
      }),
      n && n.prototype.getSettings)
    ) {
      const i = n.prototype.getSettings;
      n.prototype.getSettings = function () {
        const s = i.apply(this, arguments);
        return (
          o(s, "mozAutoGainControl", "autoGainControl"),
          o(s, "mozNoiseSuppression", "noiseSuppression"),
          s
        );
      };
    }
    if (n && n.prototype.applyConstraints) {
      const i = n.prototype.applyConstraints;
      n.prototype.applyConstraints = function (s) {
        return (
          this.kind === "audio" &&
            typeof s == "object" &&
            ((s = JSON.parse(JSON.stringify(s))),
            o(s, "autoGainControl", "mozAutoGainControl"),
            o(s, "noiseSuppression", "mozNoiseSuppression")),
          i.apply(this, [s])
        );
      };
    }
  }
}
function gR(e, t) {
  e.navigator.mediaDevices &&
    ((e.navigator.mediaDevices &&
      "getDisplayMedia" in e.navigator.mediaDevices) ||
      (e.navigator.mediaDevices.getDisplayMedia = function (n) {
        if (!(n && n.video)) {
          const o = new DOMException(
            "getDisplayMedia without video constraints is undefined",
          );
          return ((o.name = "NotFoundError"), (o.code = 8), Promise.reject(o));
        }
        return (
          n.video === !0
            ? (n.video = { mediaSource: t })
            : (n.video.mediaSource = t),
          e.navigator.mediaDevices.getUserMedia(n)
        );
      }));
}
function xw(e) {
  typeof e == "object" &&
    e.RTCTrackEvent &&
    "receiver" in e.RTCTrackEvent.prototype &&
    !("transceiver" in e.RTCTrackEvent.prototype) &&
    Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
      get() {
        return { receiver: this.receiver };
      },
    });
}
function Od(e, t) {
  typeof e != "object" ||
    !(e.RTCPeerConnection || e.mozRTCPeerConnection) ||
    (!e.RTCPeerConnection &&
      e.mozRTCPeerConnection &&
      (e.RTCPeerConnection = e.mozRTCPeerConnection),
    t.version < 53 &&
      [
        "setLocalDescription",
        "setRemoteDescription",
        "addIceCandidate",
      ].forEach(function (r) {
        const n = e.RTCPeerConnection.prototype[r],
          o = {
            [r]() {
              return (
                (arguments[0] = new (
                  r === "addIceCandidate"
                    ? e.RTCIceCandidate
                    : e.RTCSessionDescription
                )(arguments[0])),
                n.apply(this, arguments)
              );
            },
          };
        e.RTCPeerConnection.prototype[r] = o[r];
      }));
}
function Sw(e, t) {
  if (
    typeof e != "object" ||
    !(e.RTCPeerConnection || e.mozRTCPeerConnection) ||
    t.version >= 151
  )
    return;
  const r = {
      inboundrtp: "inbound-rtp",
      outboundrtp: "outbound-rtp",
      candidatepair: "candidate-pair",
      localcandidate: "local-candidate",
      remotecandidate: "remote-candidate",
    },
    n = e.RTCPeerConnection.prototype.getStats;
  e.RTCPeerConnection.prototype.getStats = function () {
    const [a, i, s] = arguments;
    return this.signalingState === "closed"
      ? Promise.resolve(new Map())
      : n
          .apply(this, [a || null])
          .then((l) => {
            if (t.version < 53 && !i)
              try {
                l.forEach((u) => {
                  u.type = r[u.type] || u.type;
                });
              } catch (u) {
                if (u.name !== "TypeError") throw u;
                l.forEach((c, d) => {
                  l.set(d, Object.assign({}, c, { type: r[c.type] || c.type }));
                });
              }
            return l;
          })
          .then(i, s);
  };
}
function Cw(e) {
  if (
    !(typeof e == "object" && e.RTCPeerConnection && e.RTCRtpSender) ||
    (e.RTCRtpSender && "getStats" in e.RTCRtpSender.prototype)
  )
    return;
  const t = e.RTCPeerConnection.prototype.getSenders;
  t &&
    (e.RTCPeerConnection.prototype.getSenders = function () {
      const o = t.apply(this, []);
      return (o.forEach((a) => (a._pc = this)), o);
    });
  const r = e.RTCPeerConnection.prototype.addTrack;
  (r &&
    (e.RTCPeerConnection.prototype.addTrack = function () {
      const o = r.apply(this, arguments);
      return ((o._pc = this), o);
    }),
    (e.RTCRtpSender.prototype.getStats = function () {
      return this.track
        ? this._pc.getStats(this.track)
        : Promise.resolve(new Map());
    }));
}
function kw(e) {
  if (
    !(typeof e == "object" && e.RTCPeerConnection && e.RTCRtpSender) ||
    (e.RTCRtpSender && "getStats" in e.RTCRtpReceiver.prototype)
  )
    return;
  const t = e.RTCPeerConnection.prototype.getReceivers;
  (t &&
    (e.RTCPeerConnection.prototype.getReceivers = function () {
      const n = t.apply(this, []);
      return (n.forEach((o) => (o._pc = this)), n);
    }),
    vo(e, "track", (r) => ((r.receiver._pc = r.srcElement), r)),
    (e.RTCRtpReceiver.prototype.getStats = function () {
      return this._pc.getStats(this.track);
    }));
}
function Ew(e) {
  !e.RTCPeerConnection ||
    "removeStream" in e.RTCPeerConnection.prototype ||
    (e.RTCPeerConnection.prototype.removeStream = function (r) {
      (gf("removeStream", "removeTrack"),
        this.getSenders().forEach((n) => {
          n.track && r.getTracks().includes(n.track) && this.removeTrack(n);
        }));
    });
}
function _w(e) {
  e.DataChannel && !e.RTCDataChannel && (e.RTCDataChannel = e.DataChannel);
}
function bw(e, t) {
  if (!(typeof e == "object" && e.RTCPeerConnection) || t.version >= 110)
    return;
  const r = e.RTCPeerConnection.prototype.addTransceiver;
  r &&
    (e.RTCPeerConnection.prototype.addTransceiver = function () {
      this.setParametersPromises = [];
      let o = arguments[1] && arguments[1].sendEncodings;
      (o === void 0 && (o = []), (o = [...o]));
      const a = o.length > 0;
      a &&
        o.forEach((s) => {
          if ("rid" in s && !/^[a-z0-9]{0,16}$/i.test(s.rid))
            throw new TypeError("Invalid RID value provided.");
          if (
            "scaleResolutionDownBy" in s &&
            !(parseFloat(s.scaleResolutionDownBy) >= 1)
          )
            throw new RangeError("scale_resolution_down_by must be >= 1.0");
          if ("maxFramerate" in s && !(parseFloat(s.maxFramerate) >= 0))
            throw new RangeError("max_framerate must be >= 0.0");
        });
      const i = r.apply(this, arguments);
      if (a) {
        const { sender: s } = i,
          l = s.getParameters();
        (!("encodings" in l) ||
          (l.encodings.length === 1 &&
            Object.keys(l.encodings[0]).length === 0)) &&
          ((l.encodings = o),
          (s.sendEncodings = o),
          this.setParametersPromises.push(
            s
              .setParameters(l)
              .then(() => {
                delete s.sendEncodings;
              })
              .catch(() => {
                delete s.sendEncodings;
              }),
          ));
      }
      return i;
    });
}
function Dw(e, t) {
  if (!(typeof e == "object" && e.RTCRtpSender) || t.version >= 110) return;
  const r = e.RTCRtpSender.prototype.getParameters;
  r &&
    (e.RTCRtpSender.prototype.getParameters = function () {
      const o = r.apply(this, arguments);
      return (
        "encodings" in o ||
          (o.encodings = [].concat(this.sendEncodings || [{}])),
        o
      );
    });
}
function Tw(e, t) {
  if (!(typeof e == "object" && e.RTCPeerConnection) || t.version >= 110)
    return;
  const r = e.RTCPeerConnection.prototype.createOffer;
  e.RTCPeerConnection.prototype.createOffer = function () {
    return this.setParametersPromises && this.setParametersPromises.length
      ? Promise.all(this.setParametersPromises)
          .then(() => r.apply(this, arguments))
          .finally(() => {
            this.setParametersPromises = [];
          })
      : r.apply(this, arguments);
  };
}
function Pw(e, t) {
  if (!(typeof e == "object" && e.RTCPeerConnection) || t.version >= 110)
    return;
  const r = e.RTCPeerConnection.prototype.createAnswer;
  e.RTCPeerConnection.prototype.createAnswer = function () {
    return this.setParametersPromises && this.setParametersPromises.length
      ? Promise.all(this.setParametersPromises)
          .then(() => r.apply(this, arguments))
          .finally(() => {
            this.setParametersPromises = [];
          })
      : r.apply(this, arguments);
  };
}
const Gm = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      shimAddTransceiver: bw,
      shimCreateAnswer: Pw,
      shimCreateOffer: Tw,
      shimGetDisplayMedia: gR,
      shimGetParameters: Dw,
      shimGetStats: Sw,
      shimGetUserMedia: ww,
      shimOnTrack: xw,
      shimPeerConnection: Od,
      shimRTCDataChannel: _w,
      shimReceiverGetStats: kw,
      shimRemoveStream: Ew,
      shimSenderGetStats: Cw,
    },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
function Rw(e) {
  if (!(typeof e != "object" || !e.RTCPeerConnection)) {
    if (
      ("getLocalStreams" in e.RTCPeerConnection.prototype ||
        (e.RTCPeerConnection.prototype.getLocalStreams = function () {
          return (
            this._localStreams || (this._localStreams = []),
            this._localStreams
          );
        }),
      !("addStream" in e.RTCPeerConnection.prototype))
    ) {
      const t = e.RTCPeerConnection.prototype.addTrack;
      ((e.RTCPeerConnection.prototype.addStream = function (n) {
        (this._localStreams || (this._localStreams = []),
          this._localStreams.includes(n) || this._localStreams.push(n),
          n.getAudioTracks().forEach((o) => t.call(this, o, n)),
          n.getVideoTracks().forEach((o) => t.call(this, o, n)));
      }),
        (e.RTCPeerConnection.prototype.addTrack = function (n, ...o) {
          return (
            o &&
              o.forEach((a) => {
                this._localStreams
                  ? this._localStreams.includes(a) || this._localStreams.push(a)
                  : (this._localStreams = [a]);
              }),
            t.apply(this, arguments)
          );
        }));
    }
    "removeStream" in e.RTCPeerConnection.prototype ||
      (e.RTCPeerConnection.prototype.removeStream = function (r) {
        this._localStreams || (this._localStreams = []);
        const n = this._localStreams.indexOf(r);
        if (n === -1) return;
        this._localStreams.splice(n, 1);
        const o = r.getTracks();
        this.getSenders().forEach((a) => {
          o.includes(a.track) && this.removeTrack(a);
        });
      });
  }
}
function Ow(e) {
  if (
    !(typeof e != "object" || !e.RTCPeerConnection) &&
    ("getRemoteStreams" in e.RTCPeerConnection.prototype ||
      (e.RTCPeerConnection.prototype.getRemoteStreams = function () {
        return this._remoteStreams ? this._remoteStreams : [];
      }),
    !("onaddstream" in e.RTCPeerConnection.prototype))
  ) {
    Object.defineProperty(e.RTCPeerConnection.prototype, "onaddstream", {
      get() {
        return this._onaddstream;
      },
      set(r) {
        (this._onaddstream &&
          (this.removeEventListener("addstream", this._onaddstream),
          this.removeEventListener("track", this._onaddstreampoly)),
          this.addEventListener("addstream", (this._onaddstream = r)),
          this.addEventListener(
            "track",
            (this._onaddstreampoly = (n) => {
              n.streams.forEach((o) => {
                if (
                  (this._remoteStreams || (this._remoteStreams = []),
                  this._remoteStreams.includes(o))
                )
                  return;
                this._remoteStreams.push(o);
                const a = new Event("addstream");
                ((a.stream = o), this.dispatchEvent(a));
              });
            }),
          ));
      },
    });
    const t = e.RTCPeerConnection.prototype.setRemoteDescription;
    e.RTCPeerConnection.prototype.setRemoteDescription = function () {
      const n = this;
      return (
        this._onaddstreampoly ||
          this.addEventListener(
            "track",
            (this._onaddstreampoly = function (o) {
              o.streams.forEach((a) => {
                if (
                  (n._remoteStreams || (n._remoteStreams = []),
                  n._remoteStreams.indexOf(a) >= 0)
                )
                  return;
                n._remoteStreams.push(a);
                const i = new Event("addstream");
                ((i.stream = a), n.dispatchEvent(i));
              });
            }),
          ),
        t.apply(n, arguments)
      );
    };
  }
}
function Nw(e) {
  if (typeof e != "object" || !e.RTCPeerConnection) return;
  const t = e.RTCPeerConnection.prototype,
    r = t.createOffer,
    n = t.createAnswer,
    o = t.setLocalDescription,
    a = t.setRemoteDescription,
    i = t.addIceCandidate;
  ((t.createOffer = function (u, c) {
    const d = arguments.length >= 2 ? arguments[2] : arguments[0],
      m = r.apply(this, [d]);
    return c ? (m.then(u, c), Promise.resolve()) : m;
  }),
    (t.createAnswer = function (u, c) {
      const d = arguments.length >= 2 ? arguments[2] : arguments[0],
        m = n.apply(this, [d]);
      return c ? (m.then(u, c), Promise.resolve()) : m;
    }));
  let s = function (l, u, c) {
    const d = o.apply(this, [l]);
    return c ? (d.then(u, c), Promise.resolve()) : d;
  };
  ((t.setLocalDescription = s),
    (s = function (l, u, c) {
      const d = a.apply(this, [l]);
      return c ? (d.then(u, c), Promise.resolve()) : d;
    }),
    (t.setRemoteDescription = s),
    (s = function (l, u, c) {
      const d = i.apply(this, [l]);
      return c ? (d.then(u, c), Promise.resolve()) : d;
    }),
    (t.addIceCandidate = s));
}
function Mw(e) {
  const t = e && e.navigator;
  if (t.mediaDevices && t.mediaDevices.getUserMedia) {
    const r = t.mediaDevices,
      n = r.getUserMedia.bind(r);
    t.mediaDevices.getUserMedia = (o) => n(Iw(o));
  }
  !t.getUserMedia &&
    t.mediaDevices &&
    t.mediaDevices.getUserMedia &&
    (t.getUserMedia = function (n, o, a) {
      t.mediaDevices.getUserMedia(n).then(o, a);
    }.bind(t));
}
function Iw(e) {
  return e && e.video !== void 0
    ? Object.assign({}, e, { video: cw(e.video) })
    : e;
}
function jw(e) {
  if (!e.RTCPeerConnection) return;
  const t = e.RTCPeerConnection;
  ((e.RTCPeerConnection = function (n, o) {
    if (n && n.iceServers) {
      const a = [];
      for (let i = 0; i < n.iceServers.length; i++) {
        let s = n.iceServers[i];
        s.urls === void 0 && s.url
          ? (gf("RTCIceServer.url", "RTCIceServer.urls"),
            (s = JSON.parse(JSON.stringify(s))),
            (s.urls = s.url),
            delete s.url,
            a.push(s))
          : a.push(n.iceServers[i]);
      }
      n.iceServers = a;
    }
    return new t(n, o);
  }),
    (e.RTCPeerConnection.prototype = t.prototype),
    "generateCertificate" in t &&
      Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
        get() {
          return t.generateCertificate;
        },
      }));
}
function Lw(e) {
  typeof e == "object" &&
    e.RTCTrackEvent &&
    "receiver" in e.RTCTrackEvent.prototype &&
    !("transceiver" in e.RTCTrackEvent.prototype) &&
    Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
      get() {
        return { receiver: this.receiver };
      },
    });
}
function Aw(e) {
  const t = e.RTCPeerConnection.prototype.createOffer;
  e.RTCPeerConnection.prototype.createOffer = function (n) {
    if (n) {
      typeof n.offerToReceiveAudio < "u" &&
        (n.offerToReceiveAudio = !!n.offerToReceiveAudio);
      const o = this.getTransceivers().find(
        (i) => i.receiver.track.kind === "audio",
      );
      (n.offerToReceiveAudio === !1 && o
        ? o.direction === "sendrecv"
          ? o.setDirection
            ? o.setDirection("sendonly")
            : (o.direction = "sendonly")
          : o.direction === "recvonly" &&
            (o.setDirection
              ? o.setDirection("inactive")
              : (o.direction = "inactive"))
        : n.offerToReceiveAudio === !0 &&
          !o &&
          this.addTransceiver("audio", { direction: "recvonly" }),
        typeof n.offerToReceiveVideo < "u" &&
          (n.offerToReceiveVideo = !!n.offerToReceiveVideo));
      const a = this.getTransceivers().find(
        (i) => i.receiver.track.kind === "video",
      );
      n.offerToReceiveVideo === !1 && a
        ? a.direction === "sendrecv"
          ? a.setDirection
            ? a.setDirection("sendonly")
            : (a.direction = "sendonly")
          : a.direction === "recvonly" &&
            (a.setDirection
              ? a.setDirection("inactive")
              : (a.direction = "inactive"))
        : n.offerToReceiveVideo === !0 &&
          !a &&
          this.addTransceiver("video", { direction: "recvonly" });
    }
    return t.apply(this, arguments);
  };
}
function Fw(e) {
  typeof e != "object" ||
    e.AudioContext ||
    (e.AudioContext = e.webkitAudioContext);
}
const Xm = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      shimAudioContext: Fw,
      shimCallbacksAPI: Nw,
      shimConstraints: Iw,
      shimCreateOfferLegacy: Aw,
      shimGetUserMedia: Mw,
      shimLocalStreamsAPI: Rw,
      shimRTCIceServerUrls: jw,
      shimRemoteStreamsAPI: Ow,
      shimTrackEventTransceiver: Lw,
    },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
var Bw = { exports: {} };
(function (e) {
  const t = {};
  ((t.generateIdentifier = function () {
    return Math.random().toString(36).substring(2, 12);
  }),
    (t.localCName = t.generateIdentifier()),
    (t.splitLines = function (r) {
      return r
        .trim()
        .split(
          `
`,
        )
        .map((n) => n.trim());
    }),
    (t.splitSections = function (r) {
      return r
        .split(
          `
m=`,
        )
        .map(
          (o, a) =>
            (a > 0 ? "m=" + o : o).trim() +
            `\r
`,
        );
    }),
    (t.getDescription = function (r) {
      const n = t.splitSections(r);
      return n && n[0];
    }),
    (t.getMediaSections = function (r) {
      const n = t.splitSections(r);
      return (n.shift(), n);
    }),
    (t.matchPrefix = function (r, n) {
      return t.splitLines(r).filter((o) => o.indexOf(n) === 0);
    }),
    (t.parseCandidate = function (r) {
      let n;
      r.indexOf("a=candidate:") === 0
        ? (n = r.substring(12).split(" "))
        : (n = r.substring(10).split(" "));
      const o = {
        foundation: n[0],
        component: { 1: "rtp", 2: "rtcp" }[n[1]] || n[1],
        protocol: n[2].toLowerCase(),
        priority: parseInt(n[3], 10),
        ip: n[4],
        address: n[4],
        port: parseInt(n[5], 10),
        type: n[7],
      };
      for (let a = 8; a < n.length; a += 2)
        switch (n[a]) {
          case "raddr":
            o.relatedAddress = n[a + 1];
            break;
          case "rport":
            o.relatedPort = parseInt(n[a + 1], 10);
            break;
          case "tcptype":
            o.tcpType = n[a + 1];
            break;
          case "ufrag":
            ((o.ufrag = n[a + 1]), (o.usernameFragment = n[a + 1]));
            break;
          default:
            o[n[a]] === void 0 && (o[n[a]] = n[a + 1]);
            break;
        }
      return o;
    }),
    (t.writeCandidate = function (r) {
      const n = [];
      n.push(r.foundation);
      const o = r.component;
      (o === "rtp" ? n.push(1) : o === "rtcp" ? n.push(2) : n.push(o),
        n.push(r.protocol.toUpperCase()),
        n.push(r.priority),
        n.push(r.address || r.ip),
        n.push(r.port));
      const a = r.type;
      return (
        n.push("typ"),
        n.push(a),
        a !== "host" &&
          r.relatedAddress &&
          r.relatedPort !== void 0 &&
          (n.push("raddr"),
          n.push(r.relatedAddress),
          n.push("rport"),
          n.push(r.relatedPort)),
        r.tcpType &&
          r.protocol.toLowerCase() === "tcp" &&
          (n.push("tcptype"), n.push(r.tcpType)),
        (r.usernameFragment || r.ufrag) &&
          (n.push("ufrag"), n.push(r.usernameFragment || r.ufrag)),
        "candidate:" + n.join(" ")
      );
    }),
    (t.parseIceOptions = function (r) {
      return r.substring(14).split(" ");
    }),
    (t.parseRtpMap = function (r) {
      let n = r.substring(9).split(" ");
      const o = { payloadType: parseInt(n.shift(), 10) };
      return (
        (n = n[0].split("/")),
        (o.name = n[0]),
        (o.clockRate = parseInt(n[1], 10)),
        (o.channels = n.length === 3 ? parseInt(n[2], 10) : 1),
        (o.numChannels = o.channels),
        o
      );
    }),
    (t.writeRtpMap = function (r) {
      let n = r.payloadType;
      r.preferredPayloadType !== void 0 && (n = r.preferredPayloadType);
      const o = r.channels || r.numChannels || 1;
      return (
        "a=rtpmap:" +
        n +
        " " +
        r.name +
        "/" +
        r.clockRate +
        (o !== 1 ? "/" + o : "") +
        `\r
`
      );
    }),
    (t.parseExtmap = function (r) {
      const n = r.substring(9).split(" ");
      return {
        id: parseInt(n[0], 10),
        direction: n[0].indexOf("/") > 0 ? n[0].split("/")[1] : "sendrecv",
        uri: n[1],
        attributes: n.slice(2).join(" "),
      };
    }),
    (t.writeExtmap = function (r) {
      return (
        "a=extmap:" +
        (r.id || r.preferredId) +
        (r.direction && r.direction !== "sendrecv" ? "/" + r.direction : "") +
        " " +
        r.uri +
        (r.attributes ? " " + r.attributes : "") +
        `\r
`
      );
    }),
    (t.parseFmtp = function (r) {
      const n = {};
      let o;
      const a = r.substring(r.indexOf(" ") + 1).split(";");
      for (let i = 0; i < a.length; i++)
        ((o = a[i].trim().split("=")), (n[o[0].trim()] = o[1]));
      return n;
    }),
    (t.writeFmtp = function (r) {
      let n = "",
        o = r.payloadType;
      if (
        (r.preferredPayloadType !== void 0 && (o = r.preferredPayloadType),
        r.parameters && Object.keys(r.parameters).length)
      ) {
        const a = [];
        (Object.keys(r.parameters).forEach((i) => {
          r.parameters[i] !== void 0
            ? a.push(i + "=" + r.parameters[i])
            : a.push(i);
        }),
          (n +=
            "a=fmtp:" +
            o +
            " " +
            a.join(";") +
            `\r
`));
      }
      return n;
    }),
    (t.parseRtcpFb = function (r) {
      const n = r.substring(r.indexOf(" ") + 1).split(" ");
      return { type: n.shift(), parameter: n.join(" ") };
    }),
    (t.writeRtcpFb = function (r) {
      let n = "",
        o = r.payloadType;
      return (
        r.preferredPayloadType !== void 0 && (o = r.preferredPayloadType),
        r.rtcpFeedback &&
          r.rtcpFeedback.length &&
          r.rtcpFeedback.forEach((a) => {
            n +=
              "a=rtcp-fb:" +
              o +
              " " +
              a.type +
              (a.parameter && a.parameter.length ? " " + a.parameter : "") +
              `\r
`;
          }),
        n
      );
    }),
    (t.parseSsrcMedia = function (r) {
      const n = r.indexOf(" "),
        o = { ssrc: parseInt(r.substring(7, n), 10) },
        a = r.indexOf(":", n);
      return (
        a > -1
          ? ((o.attribute = r.substring(n + 1, a)),
            (o.value = r.substring(a + 1)))
          : (o.attribute = r.substring(n + 1)),
        o
      );
    }),
    (t.parseSsrcGroup = function (r) {
      const n = r.substring(13).split(" ");
      return { semantics: n.shift(), ssrcs: n.map((o) => parseInt(o, 10)) };
    }),
    (t.getMid = function (r) {
      const n = t.matchPrefix(r, "a=mid:")[0];
      if (n) return n.substring(6);
    }),
    (t.parseFingerprint = function (r) {
      const n = r.substring(14).split(" ");
      return { algorithm: n[0].toLowerCase(), value: n[1].toUpperCase() };
    }),
    (t.getDtlsParameters = function (r, n) {
      return {
        role: "auto",
        fingerprints: t
          .matchPrefix(r + n, "a=fingerprint:")
          .map(t.parseFingerprint),
      };
    }),
    (t.writeDtlsParameters = function (r, n) {
      let o =
        "a=setup:" +
        n +
        `\r
`;
      return (
        r.fingerprints.forEach((a) => {
          o +=
            "a=fingerprint:" +
            a.algorithm +
            " " +
            a.value +
            `\r
`;
        }),
        o
      );
    }),
    (t.parseCryptoLine = function (r) {
      const n = r.substring(9).split(" ");
      return {
        tag: parseInt(n[0], 10),
        cryptoSuite: n[1],
        keyParams: n[2],
        sessionParams: n.slice(3),
      };
    }),
    (t.writeCryptoLine = function (r) {
      return (
        "a=crypto:" +
        r.tag +
        " " +
        r.cryptoSuite +
        " " +
        (typeof r.keyParams == "object"
          ? t.writeCryptoKeyParams(r.keyParams)
          : r.keyParams) +
        (r.sessionParams ? " " + r.sessionParams.join(" ") : "") +
        `\r
`
      );
    }),
    (t.parseCryptoKeyParams = function (r) {
      if (r.indexOf("inline:") !== 0) return null;
      const n = r.substring(7).split("|");
      return {
        keyMethod: "inline",
        keySalt: n[0],
        lifeTime: n[1],
        mkiValue: n[2] ? n[2].split(":")[0] : void 0,
        mkiLength: n[2] ? n[2].split(":")[1] : void 0,
      };
    }),
    (t.writeCryptoKeyParams = function (r) {
      return (
        r.keyMethod +
        ":" +
        r.keySalt +
        (r.lifeTime ? "|" + r.lifeTime : "") +
        (r.mkiValue && r.mkiLength ? "|" + r.mkiValue + ":" + r.mkiLength : "")
      );
    }),
    (t.getCryptoParameters = function (r, n) {
      return t.matchPrefix(r + n, "a=crypto:").map(t.parseCryptoLine);
    }),
    (t.getIceParameters = function (r, n) {
      const o = t.matchPrefix(r + n, "a=ice-ufrag:")[0],
        a = t.matchPrefix(r + n, "a=ice-pwd:")[0];
      return o && a
        ? { usernameFragment: o.substring(12), password: a.substring(10) }
        : null;
    }),
    (t.writeIceParameters = function (r) {
      let n =
        "a=ice-ufrag:" +
        r.usernameFragment +
        `\r
a=ice-pwd:` +
        r.password +
        `\r
`;
      return (
        r.iceLite &&
          (n += `a=ice-lite\r
`),
        n
      );
    }),
    (t.parseRtpParameters = function (r) {
      const n = {
          codecs: [],
          headerExtensions: [],
          fecMechanisms: [],
          rtcp: [],
        },
        a = t.splitLines(r)[0].split(" ");
      n.profile = a[2];
      for (let s = 3; s < a.length; s++) {
        const l = a[s],
          u = t.matchPrefix(r, "a=rtpmap:" + l + " ")[0];
        if (u) {
          const c = t.parseRtpMap(u),
            d = t.matchPrefix(r, "a=fmtp:" + l + " ");
          switch (
            ((c.parameters = d.length ? t.parseFmtp(d[0]) : {}),
            (c.rtcpFeedback = t
              .matchPrefix(r, "a=rtcp-fb:" + l + " ")
              .map(t.parseRtcpFb)),
            n.codecs.push(c),
            c.name.toUpperCase())
          ) {
            case "RED":
            case "ULPFEC":
              n.fecMechanisms.push(c.name.toUpperCase());
              break;
          }
        }
      }
      t.matchPrefix(r, "a=extmap:").forEach((s) => {
        n.headerExtensions.push(t.parseExtmap(s));
      });
      const i = t.matchPrefix(r, "a=rtcp-fb:* ").map(t.parseRtcpFb);
      return (
        n.codecs.forEach((s) => {
          i.forEach((l) => {
            s.rtcpFeedback.find(
              (c) => c.type === l.type && c.parameter === l.parameter,
            ) || s.rtcpFeedback.push(l);
          });
        }),
        n
      );
    }),
    (t.writeRtpDescription = function (r, n) {
      let o = "";
      ((o += "m=" + r + " "),
        (o += n.codecs.length > 0 ? "9" : "0"),
        (o += " " + (n.profile || "UDP/TLS/RTP/SAVPF") + " "),
        (o +=
          n.codecs
            .map((i) =>
              i.preferredPayloadType !== void 0
                ? i.preferredPayloadType
                : i.payloadType,
            )
            .join(" ") +
          `\r
`),
        (o += `c=IN IP4 0.0.0.0\r
`),
        (o += `a=rtcp:9 IN IP4 0.0.0.0\r
`),
        n.codecs.forEach((i) => {
          ((o += t.writeRtpMap(i)),
            (o += t.writeFmtp(i)),
            (o += t.writeRtcpFb(i)));
        }));
      let a = 0;
      return (
        n.codecs.forEach((i) => {
          i.maxptime > a && (a = i.maxptime);
        }),
        a > 0 &&
          (o +=
            "a=maxptime:" +
            a +
            `\r
`),
        n.headerExtensions &&
          n.headerExtensions.forEach((i) => {
            o += t.writeExtmap(i);
          }),
        o
      );
    }),
    (t.parseRtpEncodingParameters = function (r) {
      const n = [],
        o = t.parseRtpParameters(r),
        a = o.fecMechanisms.indexOf("RED") !== -1,
        i = o.fecMechanisms.indexOf("ULPFEC") !== -1,
        s = t
          .matchPrefix(r, "a=ssrc:")
          .map((m) => t.parseSsrcMedia(m))
          .filter((m) => m.attribute === "cname"),
        l = s.length > 0 && s[0].ssrc;
      let u;
      const c = t.matchPrefix(r, "a=ssrc-group:FID").map((m) =>
        m
          .substring(17)
          .split(" ")
          .map((S) => parseInt(S, 10)),
      );
      (c.length > 0 && c[0].length > 1 && c[0][0] === l && (u = c[0][1]),
        o.codecs.forEach((m) => {
          if (m.name.toUpperCase() === "RTX" && m.parameters.apt) {
            let v = {
              ssrc: l,
              codecPayloadType: parseInt(m.parameters.apt, 10),
            };
            (l && u && (v.rtx = { ssrc: u }),
              n.push(v),
              a &&
                ((v = JSON.parse(JSON.stringify(v))),
                (v.fec = { ssrc: l, mechanism: i ? "red+ulpfec" : "red" }),
                n.push(v)));
          }
        }),
        n.length === 0 && l && n.push({ ssrc: l }));
      let d = t.matchPrefix(r, "b=");
      return (
        d.length &&
          (d[0].indexOf("b=TIAS:") === 0
            ? (d = parseInt(d[0].substring(7), 10))
            : d[0].indexOf("b=AS:") === 0
              ? (d = parseInt(d[0].substring(5), 10) * 1e3 * 0.95 - 50 * 40 * 8)
              : (d = void 0),
          n.forEach((m) => {
            m.maxBitrate = d;
          })),
        n
      );
    }),
    (t.parseRtcpParameters = function (r) {
      const n = {},
        o = t
          .matchPrefix(r, "a=ssrc:")
          .map((s) => t.parseSsrcMedia(s))
          .filter((s) => s.attribute === "cname")[0];
      o && ((n.cname = o.value), (n.ssrc = o.ssrc));
      const a = t.matchPrefix(r, "a=rtcp-rsize");
      ((n.reducedSize = a.length > 0), (n.compound = a.length === 0));
      const i = t.matchPrefix(r, "a=rtcp-mux");
      return ((n.mux = i.length > 0), n);
    }),
    (t.writeRtcpParameters = function (r) {
      let n = "";
      return (
        r.reducedSize &&
          (n += `a=rtcp-rsize\r
`),
        r.mux &&
          (n += `a=rtcp-mux\r
`),
        r.ssrc !== void 0 &&
          r.cname &&
          (n +=
            "a=ssrc:" +
            r.ssrc +
            " cname:" +
            r.cname +
            `\r
`),
        n
      );
    }),
    (t.parseMsid = function (r) {
      let n;
      const o = t.matchPrefix(r, "a=msid:");
      if (o.length === 1)
        return (
          (n = o[0].substring(7).split(" ")),
          { stream: n[0], track: n[1] }
        );
      const a = t
        .matchPrefix(r, "a=ssrc:")
        .map((i) => t.parseSsrcMedia(i))
        .filter((i) => i.attribute === "msid");
      if (a.length > 0)
        return ((n = a[0].value.split(" ")), { stream: n[0], track: n[1] });
    }),
    (t.parseSctpDescription = function (r) {
      const n = t.parseMLine(r),
        o = t.matchPrefix(r, "a=max-message-size:");
      let a;
      (o.length > 0 && (a = parseInt(o[0].substring(19), 10)),
        isNaN(a) && (a = 65536));
      const i = t.matchPrefix(r, "a=sctp-port:");
      if (i.length > 0)
        return {
          port: parseInt(i[0].substring(12), 10),
          protocol: n.fmt,
          maxMessageSize: a,
        };
      const s = t.matchPrefix(r, "a=sctpmap:");
      if (s.length > 0) {
        const l = s[0].substring(10).split(" ");
        return { port: parseInt(l[0], 10), protocol: l[1], maxMessageSize: a };
      }
    }),
    (t.writeSctpDescription = function (r, n) {
      let o = [];
      return (
        r.protocol !== "DTLS/SCTP"
          ? (o = [
              "m=" +
                r.kind +
                " 9 " +
                r.protocol +
                " " +
                n.protocol +
                `\r
`,
              `c=IN IP4 0.0.0.0\r
`,
              "a=sctp-port:" +
                n.port +
                `\r
`,
            ])
          : (o = [
              "m=" +
                r.kind +
                " 9 " +
                r.protocol +
                " " +
                n.port +
                `\r
`,
              `c=IN IP4 0.0.0.0\r
`,
              "a=sctpmap:" +
                n.port +
                " " +
                n.protocol +
                ` 65535\r
`,
            ]),
        n.maxMessageSize !== void 0 &&
          o.push(
            "a=max-message-size:" +
              n.maxMessageSize +
              `\r
`,
          ),
        o.join("")
      );
    }),
    (t.generateSessionId = function () {
      return Math.random().toString().substr(2, 22);
    }),
    (t.writeSessionBoilerplate = function (r, n, o) {
      let a;
      const i = n !== void 0 ? n : 2;
      return (
        r ? (a = r) : (a = t.generateSessionId()),
        `v=0\r
o=` +
          (o || "thisisadapterortc") +
          " " +
          a +
          " " +
          i +
          ` IN IP4 127.0.0.1\r
s=-\r
t=0 0\r
`
      );
    }),
    (t.getDirection = function (r, n) {
      const o = t.splitLines(r);
      for (let a = 0; a < o.length; a++)
        switch (o[a]) {
          case "a=sendrecv":
          case "a=sendonly":
          case "a=recvonly":
          case "a=inactive":
            return o[a].substring(2);
        }
      return n ? t.getDirection(n) : "sendrecv";
    }),
    (t.getKind = function (r) {
      return t.splitLines(r)[0].split(" ")[0].substring(2);
    }),
    (t.isRejected = function (r) {
      return r.split(" ", 2)[1] === "0";
    }),
    (t.parseMLine = function (r) {
      const o = t.splitLines(r)[0].substring(2).split(" ");
      return {
        kind: o[0],
        port: parseInt(o[1], 10),
        protocol: o[2],
        fmt: o.slice(3).join(" "),
      };
    }),
    (t.parseOLine = function (r) {
      const o = t.matchPrefix(r, "o=")[0].substring(2).split(" ");
      return {
        username: o[0],
        sessionId: o[1],
        sessionVersion: parseInt(o[2], 10),
        netType: o[3],
        addressType: o[4],
        address: o[5],
      };
    }),
    (t.isValidSDP = function (r) {
      if (typeof r != "string" || r.length === 0) return !1;
      const n = t.splitLines(r);
      for (let o = 0; o < n.length; o++)
        if (n[o].length < 2 || n[o].charAt(1) !== "=") return !1;
      return !0;
    }),
    (e.exports = t));
})(Bw);
var Uw = Bw.exports;
const Ko = fa(Uw),
  vR = Jw({ __proto__: null, default: Ko }, [Uw]);
function Bs(e) {
  if (
    !e.RTCIceCandidate ||
    (e.RTCIceCandidate && "foundation" in e.RTCIceCandidate.prototype)
  )
    return;
  const t = e.RTCIceCandidate;
  ((e.RTCIceCandidate = function (n) {
    if (
      (typeof n == "object" &&
        n.candidate &&
        n.candidate.indexOf("a=") === 0 &&
        ((n = JSON.parse(JSON.stringify(n))),
        (n.candidate = n.candidate.substring(2))),
      n.candidate && n.candidate.length)
    ) {
      const o = new t(n),
        a = Ko.parseCandidate(n.candidate);
      for (const i in a) i in o || Object.defineProperty(o, i, { value: a[i] });
      return (
        (o.toJSON = function () {
          return {
            candidate: o.candidate,
            sdpMid: o.sdpMid,
            sdpMLineIndex: o.sdpMLineIndex,
            usernameFragment: o.usernameFragment,
          };
        }),
        o
      );
    }
    return new t(n);
  }),
    (e.RTCIceCandidate.prototype = t.prototype),
    vo(
      e,
      "icecandidate",
      (r) => (
        r.candidate &&
          Object.defineProperty(r, "candidate", {
            value: new e.RTCIceCandidate(r.candidate),
            writable: "false",
          }),
        r
      ),
    ));
}
function Nd(e) {
  !e.RTCIceCandidate ||
    (e.RTCIceCandidate && "relayProtocol" in e.RTCIceCandidate.prototype) ||
    vo(e, "icecandidate", (t) => {
      if (t.candidate) {
        const r = Ko.parseCandidate(t.candidate.candidate);
        r.type === "relay" &&
          (t.candidate.relayProtocol = { 0: "tls", 1: "tcp", 2: "udp" }[
            r.priority >> 24
          ]);
      }
      return t;
    });
}
function Us(e, t) {
  if (
    !e.RTCPeerConnection ||
    (t.browser === "chrome" && t.version > 102) ||
    (t.browser === "firefox" && t.version >= 113)
  )
    return;
  "sctp" in e.RTCPeerConnection.prototype ||
    Object.defineProperty(e.RTCPeerConnection.prototype, "sctp", {
      get() {
        return typeof this._sctp > "u" ? null : this._sctp;
      },
    });
  const r = function (s) {
      if (!s || !s.sdp) return !1;
      const l = Ko.splitSections(s.sdp);
      return (
        l.shift(),
        l.some((u) => {
          const c = Ko.parseMLine(u);
          return (
            c && c.kind === "application" && c.protocol.indexOf("SCTP") !== -1
          );
        })
      );
    },
    n = function (s) {
      const l = s.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
      if (l === null || l.length < 2) return -1;
      const u = parseInt(l[1], 10);
      return u !== u ? -1 : u;
    },
    o = function (s) {
      let l = 65536;
      return (
        t.browser === "firefox" &&
          (t.version < 57
            ? s === -1
              ? (l = 16384)
              : (l = 2147483637)
            : t.version < 60
              ? (l = t.version === 57 ? 65535 : 65536)
              : (l = 2147483637)),
        l
      );
    },
    a = function (s, l) {
      let u = 65536;
      t.browser === "firefox" && t.version === 57 && (u = 65535);
      const c = Ko.matchPrefix(s.sdp, "a=max-message-size:");
      return (
        c.length > 0
          ? (u = parseInt(c[0].substring(19), 10))
          : t.browser === "firefox" && l !== -1 && (u = 2147483637),
        u
      );
    },
    i = e.RTCPeerConnection.prototype.setRemoteDescription;
  e.RTCPeerConnection.prototype.setRemoteDescription = function () {
    if (((this._sctp = null), t.browser === "chrome" && t.version >= 76)) {
      const { sdpSemantics: l } = this.getConfiguration();
      l === "plan-b" &&
        Object.defineProperty(this, "sctp", {
          get() {
            return typeof this._sctp > "u" ? null : this._sctp;
          },
          enumerable: !0,
          configurable: !0,
        });
    }
    if (r(arguments[0])) {
      const l = n(arguments[0]),
        u = o(l),
        c = a(arguments[0], l);
      let d;
      u === 0 && c === 0
        ? (d = Number.POSITIVE_INFINITY)
        : u === 0 || c === 0
          ? (d = Math.max(u, c))
          : (d = Math.min(u, c));
      const m = {};
      (Object.defineProperty(m, "maxMessageSize", {
        get() {
          return d;
        },
      }),
        (this._sctp = m));
    }
    return i.apply(this, arguments);
  };
}
function $s(e, t) {
  if (
    !(
      e.RTCPeerConnection &&
      "createDataChannel" in e.RTCPeerConnection.prototype
    ) ||
    (t.browser === "chrome" && t.version >= 149) ||
    (t.browser === "firefox" && t.version > 60)
  )
    return;
  function r(o, a) {
    const i = o.send;
    o.send = function () {
      const l = arguments[0],
        u = l.length || l.size || l.byteLength;
      if (o.readyState === "open" && a.sctp && u > a.sctp.maxMessageSize)
        throw new TypeError(
          "Message too large (can send a maximum of " +
            a.sctp.maxMessageSize +
            " bytes)",
        );
      return i.apply(o, arguments);
    };
  }
  const n = e.RTCPeerConnection.prototype.createDataChannel;
  ((e.RTCPeerConnection.prototype.createDataChannel = function () {
    const a = n.apply(this, arguments);
    return (r(a, this), a);
  }),
    vo(e, "datachannel", (o) => (r(o.channel, o.target), o)));
}
function Md(e) {
  if (
    !e.RTCPeerConnection ||
    "connectionState" in e.RTCPeerConnection.prototype
  )
    return;
  const t = e.RTCPeerConnection.prototype;
  (Object.defineProperty(t, "connectionState", {
    get() {
      return (
        { completed: "connected", checking: "connecting" }[
          this.iceConnectionState
        ] || this.iceConnectionState
      );
    },
    enumerable: !0,
    configurable: !0,
  }),
    Object.defineProperty(t, "onconnectionstatechange", {
      get() {
        return this._onconnectionstatechange || null;
      },
      set(r) {
        (this._onconnectionstatechange &&
          (this.removeEventListener(
            "connectionstatechange",
            this._onconnectionstatechange,
          ),
          delete this._onconnectionstatechange),
          r &&
            this.addEventListener(
              "connectionstatechange",
              (this._onconnectionstatechange = r),
            ));
      },
      enumerable: !0,
      configurable: !0,
    }),
    ["setLocalDescription", "setRemoteDescription"].forEach((r) => {
      const n = t[r];
      t[r] = function () {
        return (
          this._connectionstatechangepoly ||
            ((this._connectionstatechangepoly = (o) => {
              const a = o.target;
              if (a._lastConnectionState !== a.connectionState) {
                a._lastConnectionState = a.connectionState;
                const i = new Event("connectionstatechange", o);
                a.dispatchEvent(i);
              }
              return o;
            }),
            this.addEventListener(
              "iceconnectionstatechange",
              this._connectionstatechangepoly,
            )),
          n.apply(this, arguments)
        );
      };
    }));
}
function Id(e, t) {
  if (
    !e.RTCPeerConnection ||
    (t.browser === "chrome" && t.version >= 71) ||
    (t.browser === "safari" && t._safariVersion >= 13.1)
  )
    return;
  const r = e.RTCPeerConnection.prototype.setRemoteDescription;
  e.RTCPeerConnection.prototype.setRemoteDescription = function (o) {
    if (
      o &&
      o.sdp &&
      o.sdp.indexOf(`
a=extmap-allow-mixed`) !== -1
    ) {
      const a = o.sdp
        .split(
          `
`,
        )
        .filter((i) => i.trim() !== "a=extmap-allow-mixed").join(`
`);
      e.RTCSessionDescription && o instanceof e.RTCSessionDescription
        ? (arguments[0] = new e.RTCSessionDescription({ type: o.type, sdp: a }))
        : (o.sdp = a);
    }
    return r.apply(this, arguments);
  };
}
function Ys(e, t) {
  if (!(e.RTCPeerConnection && e.RTCPeerConnection.prototype)) return;
  const r = e.RTCPeerConnection.prototype.addIceCandidate;
  !r ||
    r.length === 0 ||
    (e.RTCPeerConnection.prototype.addIceCandidate = function () {
      return arguments[0]
        ? ((t.browser === "chrome" && t.version < 78) ||
            (t.browser === "firefox" && t.version < 68) ||
            t.browser === "safari") &&
          arguments[0] &&
          arguments[0].candidate === ""
          ? Promise.resolve()
          : r.apply(this, arguments)
        : (arguments[1] && arguments[1].apply(null), Promise.resolve());
    });
}
function zs(e, t) {
  if (!(e.RTCPeerConnection && e.RTCPeerConnection.prototype)) return;
  const r = e.RTCPeerConnection.prototype.setLocalDescription;
  !r ||
    r.length === 0 ||
    (e.RTCPeerConnection.prototype.setLocalDescription = function () {
      let o = arguments[0] || {};
      if (typeof o != "object" || (o.type && o.sdp))
        return r.apply(this, arguments);
      if (((o = { type: o.type, sdp: o.sdp }), !o.type))
        switch (this.signalingState) {
          case "stable":
          case "have-local-offer":
          case "have-remote-pranswer":
            o.type = "offer";
            break;
          default:
            o.type = "answer";
            break;
        }
      return o.sdp || (o.type !== "offer" && o.type !== "answer")
        ? r.apply(this, [o])
        : (o.type === "offer" ? this.createOffer : this.createAnswer)
            .apply(this)
            .then((i) => r.apply(this, [i]));
    });
}
const yR = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      removeExtmapAllowMixed: Id,
      shimAddIceCandidateNullOrEmpty: Ys,
      shimConnectionState: Md,
      shimMaxMessageSize: Us,
      shimParameterlessSetLocalDescription: zs,
      shimRTCIceCandidate: Bs,
      shimRTCIceCandidateRelayProtocol: Nd,
      shimSendThrowTypeError: $s,
    },
    Symbol.toStringTag,
    { value: "Module" },
  ),
);
function wR(
  { window: e } = {},
  t = { shimChrome: !0, shimFirefox: !0, shimSafari: !0 },
) {
  const r = mf,
    n = mR(e),
    o = {
      browserDetails: n,
      commonShim: yR,
      extractVersion: Ha,
      disableLog: fR,
      disableWarnings: hR,
      sdp: vR,
    };
  switch (n.browser) {
    case "chrome":
      if (!Km || !Rd || !t.shimChrome)
        return (r("Chrome shim is not included in this adapter release."), o);
      if (n.version === null)
        return (r("Chrome shim can not determine version, not shimming."), o);
      (r("adapter.js shimming chrome."),
        (o.browserShim = Km),
        Ys(e, n),
        zs(e),
        dw(e, n),
        pw(e),
        Rd(e, n),
        fw(e, n),
        vw(e, n),
        hw(e),
        mw(e, n),
        yw(e, n),
        Bs(e),
        Nd(e),
        Md(e),
        Us(e, n),
        $s(e, n),
        Id(e, n));
      break;
    case "firefox":
      if (!Gm || !Od || !t.shimFirefox)
        return (r("Firefox shim is not included in this adapter release."), o);
      (r("adapter.js shimming firefox."),
        (o.browserShim = Gm),
        Ys(e, n),
        zs(e),
        ww(e, n),
        Od(e, n),
        Sw(e, n),
        xw(e),
        Ew(e),
        Cw(e),
        kw(e),
        _w(e),
        bw(e, n),
        Dw(e, n),
        Tw(e, n),
        Pw(e, n),
        Bs(e),
        Md(e),
        Us(e, n),
        $s(e, n));
      break;
    case "safari":
      if (!Xm || !t.shimSafari)
        return (r("Safari shim is not included in this adapter release."), o);
      (r("adapter.js shimming safari."),
        (o.browserShim = Xm),
        Ys(e, n),
        zs(e),
        jw(e),
        Aw(e),
        Nw(e),
        Rw(e),
        Ow(e),
        Lw(e),
        Mw(e),
        Fw(e),
        Bs(e),
        Nd(e),
        Us(e, n),
        $s(e, n),
        Id(e, n));
      break;
    default:
      r("Unsupported browser!");
      break;
  }
  return o;
}
const Jm = wR({ window: typeof window > "u" ? void 0 : window });
function yo(e, t, r, n) {
  Object.defineProperty(e, t, {
    get: r,
    set: n,
    enumerable: !0,
    configurable: !0,
  });
}
class $w {
  constructor() {
    ((this.chunkedMTU = 16300),
      (this._dataCount = 1),
      (this.chunk = (t) => {
        const r = [],
          n = t.byteLength,
          o = Math.ceil(n / this.chunkedMTU);
        let a = 0,
          i = 0;
        for (; i < n;) {
          const s = Math.min(n, i + this.chunkedMTU),
            l = t.slice(i, s),
            u = { __peerData: this._dataCount, n: a, data: l, total: o };
          (r.push(u), (i = s), a++);
        }
        return (this._dataCount++, r);
      }));
  }
}
function xR(e) {
  let t = 0;
  for (const o of e) t += o.byteLength;
  const r = new Uint8Array(t);
  let n = 0;
  for (const o of e) (r.set(o, n), (n += o.byteLength));
  return r;
}
const dc = Jm.default || Jm,
  Fa = new (class {
    isWebRTCSupported() {
      return typeof RTCPeerConnection < "u";
    }
    isBrowserSupported() {
      const e = this.getBrowser(),
        t = this.getVersion();
      return this.supportedBrowsers.includes(e)
        ? e === "chrome"
          ? t >= this.minChromeVersion
          : e === "firefox"
            ? t >= this.minFirefoxVersion
            : e === "safari"
              ? !this.isIOS && t >= this.minSafariVersion
              : !1
        : !1;
    }
    getBrowser() {
      return dc.browserDetails.browser;
    }
    getVersion() {
      return dc.browserDetails.version || 0;
    }
    isUnifiedPlanSupported() {
      const e = this.getBrowser(),
        t = dc.browserDetails.version || 0;
      if (e === "chrome" && t < this.minChromeVersion) return !1;
      if (e === "firefox" && t >= this.minFirefoxVersion) return !0;
      if (
        !window.RTCRtpTransceiver ||
        !("currentDirection" in RTCRtpTransceiver.prototype)
      )
        return !1;
      let r,
        n = !1;
      try {
        ((r = new RTCPeerConnection()), r.addTransceiver("audio"), (n = !0));
      } catch {
      } finally {
        r && r.close();
      }
      return n;
    }
    toString() {
      return `Supports:
    browser:${this.getBrowser()}
    version:${this.getVersion()}
    isIOS:${this.isIOS}
    isWebRTCSupported:${this.isWebRTCSupported()}
    isBrowserSupported:${this.isBrowserSupported()}
    isUnifiedPlanSupported:${this.isUnifiedPlanSupported()}`;
    }
    constructor() {
      ((this.isIOS =
        typeof navigator < "u"
          ? ["iPad", "iPhone", "iPod"].includes(navigator.platform)
          : !1),
        (this.supportedBrowsers = ["firefox", "chrome", "safari"]),
        (this.minFirefoxVersion = 59),
        (this.minChromeVersion = 72),
        (this.minSafariVersion = 605));
    }
  })(),
  SR = (e) => !e || /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(e),
  Yw = () => Math.random().toString(36).slice(2),
  Zm = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      {
        urls: [
          "turn:eu-0.turn.peerjs.com:3478",
          "turn:us-0.turn.peerjs.com:3478",
        ],
        username: "peerjs",
        credential: "peerjsp",
      },
    ],
    sdpSemantics: "unified-plan",
  };
class CR extends $w {
  noop() {}
  blobToArrayBuffer(t, r) {
    const n = new FileReader();
    return (
      (n.onload = function (o) {
        o.target && r(o.target.result);
      }),
      n.readAsArrayBuffer(t),
      n
    );
  }
  binaryStringToArrayBuffer(t) {
    const r = new Uint8Array(t.length);
    for (let n = 0; n < t.length; n++) r[n] = t.charCodeAt(n) & 255;
    return r.buffer;
  }
  isSecure() {
    return location.protocol === "https:";
  }
  constructor(...t) {
    (super(...t),
      (this.CLOUD_HOST = "0.peerjs.com"),
      (this.CLOUD_PORT = 443),
      (this.chunkedBrowsers = { Chrome: 1, chrome: 1 }),
      (this.defaultConfig = Zm),
      (this.browser = Fa.getBrowser()),
      (this.browserVersion = Fa.getVersion()),
      (this.pack = sw),
      (this.unpack = iw),
      (this.supports = (function () {
        const r = {
          browser: Fa.isBrowserSupported(),
          webRTC: Fa.isWebRTCSupported(),
          audioVideo: !1,
          data: !1,
          binaryBlob: !1,
          reliable: !1,
        };
        if (!r.webRTC) return r;
        let n;
        try {
          ((n = new RTCPeerConnection(Zm)), (r.audioVideo = !0));
          let o;
          try {
            ((o = n.createDataChannel("_PEERJSTEST", { ordered: !0 })),
              (r.data = !0),
              (r.reliable = !!o.ordered));
            try {
              ((o.binaryType = "blob"), (r.binaryBlob = !Fa.isIOS));
            } catch {}
          } catch {
          } finally {
            o && o.close();
          }
        } catch {
        } finally {
          n && n.close();
        }
        return r;
      })()),
      (this.validateId = SR),
      (this.randomToken = Yw));
  }
}
const $t = new CR(),
  kR = "PeerJS: ";
class ER {
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(t) {
    this._logLevel = t;
  }
  log(...t) {
    this._logLevel >= 3 && this._print(3, ...t);
  }
  warn(...t) {
    this._logLevel >= 2 && this._print(2, ...t);
  }
  error(...t) {
    this._logLevel >= 1 && this._print(1, ...t);
  }
  setLogFunction(t) {
    this._print = t;
  }
  _print(t, ...r) {
    const n = [kR, ...r];
    for (const o in n)
      n[o] instanceof Error && (n[o] = "(" + n[o].name + ") " + n[o].message);
    t >= 3
      ? console.log(...n)
      : t >= 2
        ? console.warn("WARNING", ...n)
        : t >= 1 && console.error("ERROR", ...n);
  }
  constructor() {
    this._logLevel = 0;
  }
}
var re = new ER(),
  vf = {},
  _R = Object.prototype.hasOwnProperty,
  Ft = "~";
function Oi() {}
Object.create &&
  ((Oi.prototype = Object.create(null)), new Oi().__proto__ || (Ft = !1));
function bR(e, t, r) {
  ((this.fn = e), (this.context = t), (this.once = r || !1));
}
function zw(e, t, r, n, o) {
  if (typeof r != "function")
    throw new TypeError("The listener must be a function");
  var a = new bR(r, n || e, o),
    i = Ft ? Ft + t : t;
  return (
    e._events[i]
      ? e._events[i].fn
        ? (e._events[i] = [e._events[i], a])
        : e._events[i].push(a)
      : ((e._events[i] = a), e._eventsCount++),
    e
  );
}
function Hs(e, t) {
  --e._eventsCount === 0 ? (e._events = new Oi()) : delete e._events[t];
}
function Mt() {
  ((this._events = new Oi()), (this._eventsCount = 0));
}
Mt.prototype.eventNames = function () {
  var t = [],
    r,
    n;
  if (this._eventsCount === 0) return t;
  for (n in (r = this._events)) _R.call(r, n) && t.push(Ft ? n.slice(1) : n);
  return Object.getOwnPropertySymbols
    ? t.concat(Object.getOwnPropertySymbols(r))
    : t;
};
Mt.prototype.listeners = function (t) {
  var r = Ft ? Ft + t : t,
    n = this._events[r];
  if (!n) return [];
  if (n.fn) return [n.fn];
  for (var o = 0, a = n.length, i = new Array(a); o < a; o++) i[o] = n[o].fn;
  return i;
};
Mt.prototype.listenerCount = function (t) {
  var r = Ft ? Ft + t : t,
    n = this._events[r];
  return n ? (n.fn ? 1 : n.length) : 0;
};
Mt.prototype.emit = function (t, r, n, o, a, i) {
  var s = Ft ? Ft + t : t;
  if (!this._events[s]) return !1;
  var l = this._events[s],
    u = arguments.length,
    c,
    d;
  if (l.fn) {
    switch ((l.once && this.removeListener(t, l.fn, void 0, !0), u)) {
      case 1:
        return (l.fn.call(l.context), !0);
      case 2:
        return (l.fn.call(l.context, r), !0);
      case 3:
        return (l.fn.call(l.context, r, n), !0);
      case 4:
        return (l.fn.call(l.context, r, n, o), !0);
      case 5:
        return (l.fn.call(l.context, r, n, o, a), !0);
      case 6:
        return (l.fn.call(l.context, r, n, o, a, i), !0);
    }
    for (d = 1, c = new Array(u - 1); d < u; d++) c[d - 1] = arguments[d];
    l.fn.apply(l.context, c);
  } else {
    var m = l.length,
      v;
    for (d = 0; d < m; d++)
      switch ((l[d].once && this.removeListener(t, l[d].fn, void 0, !0), u)) {
        case 1:
          l[d].fn.call(l[d].context);
          break;
        case 2:
          l[d].fn.call(l[d].context, r);
          break;
        case 3:
          l[d].fn.call(l[d].context, r, n);
          break;
        case 4:
          l[d].fn.call(l[d].context, r, n, o);
          break;
        default:
          if (!c)
            for (v = 1, c = new Array(u - 1); v < u; v++)
              c[v - 1] = arguments[v];
          l[d].fn.apply(l[d].context, c);
      }
  }
  return !0;
};
Mt.prototype.on = function (t, r, n) {
  return zw(this, t, r, n, !1);
};
Mt.prototype.once = function (t, r, n) {
  return zw(this, t, r, n, !0);
};
Mt.prototype.removeListener = function (t, r, n, o) {
  var a = Ft ? Ft + t : t;
  if (!this._events[a]) return this;
  if (!r) return (Hs(this, a), this);
  var i = this._events[a];
  if (i.fn)
    i.fn === r && (!o || i.once) && (!n || i.context === n) && Hs(this, a);
  else {
    for (var s = 0, l = [], u = i.length; s < u; s++)
      (i[s].fn !== r || (o && !i[s].once) || (n && i[s].context !== n)) &&
        l.push(i[s]);
    l.length ? (this._events[a] = l.length === 1 ? l[0] : l) : Hs(this, a);
  }
  return this;
};
Mt.prototype.removeAllListeners = function (t) {
  var r;
  return (
    t
      ? ((r = Ft ? Ft + t : t), this._events[r] && Hs(this, r))
      : ((this._events = new Oi()), (this._eventsCount = 0)),
    this
  );
};
Mt.prototype.off = Mt.prototype.removeListener;
Mt.prototype.addListener = Mt.prototype.on;
Mt.prefixed = Ft;
Mt.EventEmitter = Mt;
vf = Mt;
var wo = {};
yo(wo, "ConnectionType", () => Nn);
yo(wo, "PeerErrorType", () => ut);
yo(wo, "BaseConnectionErrorType", () => jd);
yo(wo, "DataConnectionErrorType", () => yf);
yo(wo, "SerializationType", () => mu);
yo(wo, "SocketEventType", () => Cn);
yo(wo, "ServerMessageType", () => Tt);
var Nn = (function (e) {
    return ((e.Data = "data"), (e.Media = "media"), e);
  })({}),
  ut = (function (e) {
    return (
      (e.BrowserIncompatible = "browser-incompatible"),
      (e.Disconnected = "disconnected"),
      (e.InvalidID = "invalid-id"),
      (e.InvalidKey = "invalid-key"),
      (e.Network = "network"),
      (e.PeerUnavailable = "peer-unavailable"),
      (e.SslUnavailable = "ssl-unavailable"),
      (e.ServerError = "server-error"),
      (e.SocketError = "socket-error"),
      (e.SocketClosed = "socket-closed"),
      (e.UnavailableID = "unavailable-id"),
      (e.WebRTC = "webrtc"),
      e
    );
  })({}),
  jd = (function (e) {
    return (
      (e.NegotiationFailed = "negotiation-failed"),
      (e.ConnectionClosed = "connection-closed"),
      e
    );
  })({}),
  yf = (function (e) {
    return (
      (e.NotOpenYet = "not-open-yet"),
      (e.MessageToBig = "message-too-big"),
      e
    );
  })({}),
  mu = (function (e) {
    return (
      (e.Binary = "binary"),
      (e.BinaryUTF8 = "binary-utf8"),
      (e.JSON = "json"),
      (e.None = "raw"),
      e
    );
  })({}),
  Cn = (function (e) {
    return (
      (e.Message = "message"),
      (e.Disconnected = "disconnected"),
      (e.Error = "error"),
      (e.Close = "close"),
      e
    );
  })({}),
  Tt = (function (e) {
    return (
      (e.Heartbeat = "HEARTBEAT"),
      (e.Candidate = "CANDIDATE"),
      (e.Offer = "OFFER"),
      (e.Answer = "ANSWER"),
      (e.Open = "OPEN"),
      (e.Error = "ERROR"),
      (e.IdTaken = "ID-TAKEN"),
      (e.InvalidKey = "INVALID-KEY"),
      (e.Leave = "LEAVE"),
      (e.Expire = "EXPIRE"),
      e
    );
  })({});
const Hw = "1.5.5";
class DR extends vf.EventEmitter {
  constructor(t, r, n, o, a, i = 5e3) {
    (super(),
      (this.pingInterval = i),
      (this._disconnected = !0),
      (this._messagesQueue = []));
    const s = t ? "wss://" : "ws://";
    this._baseUrl = s + r + ":" + n + o + "peerjs?key=" + a;
  }
  start(t, r) {
    this._id = t;
    const n = `${this._baseUrl}&id=${t}&token=${r}`;
    this._socket ||
      !this._disconnected ||
      ((this._socket = new WebSocket(n + "&version=" + Hw)),
      (this._disconnected = !1),
      (this._socket.onmessage = (o) => {
        let a;
        try {
          ((a = JSON.parse(o.data)), re.log("Server message received:", a));
        } catch {
          re.log("Invalid server message", o.data);
          return;
        }
        this.emit(Cn.Message, a);
      }),
      (this._socket.onclose = (o) => {
        this._disconnected ||
          (re.log("Socket closed.", o),
          this._cleanup(),
          (this._disconnected = !0),
          this.emit(Cn.Disconnected));
      }),
      (this._socket.onopen = () => {
        this._disconnected ||
          (this._sendQueuedMessages(),
          re.log("Socket open"),
          this._scheduleHeartbeat());
      }));
  }
  _scheduleHeartbeat() {
    this._wsPingTimer = setTimeout(() => {
      this._sendHeartbeat();
    }, this.pingInterval);
  }
  _sendHeartbeat() {
    if (!this._wsOpen()) {
      re.log("Cannot send heartbeat, because socket closed");
      return;
    }
    const t = JSON.stringify({ type: Tt.Heartbeat });
    (this._socket.send(t), this._scheduleHeartbeat());
  }
  _wsOpen() {
    return !!this._socket && this._socket.readyState === 1;
  }
  _sendQueuedMessages() {
    const t = [...this._messagesQueue];
    this._messagesQueue = [];
    for (const r of t) this.send(r);
  }
  send(t) {
    if (this._disconnected) return;
    if (!this._id) {
      this._messagesQueue.push(t);
      return;
    }
    if (!t.type) {
      this.emit(Cn.Error, "Invalid message");
      return;
    }
    if (!this._wsOpen()) return;
    const r = JSON.stringify(t);
    this._socket.send(r);
  }
  close() {
    this._disconnected || (this._cleanup(), (this._disconnected = !0));
  }
  _cleanup() {
    (this._socket &&
      ((this._socket.onopen =
        this._socket.onmessage =
        this._socket.onclose =
          null),
      this._socket.close(),
      (this._socket = void 0)),
      clearTimeout(this._wsPingTimer));
  }
}
class Ww {
  constructor(t) {
    this.connection = t;
  }
  startConnection(t) {
    const r = this._startPeerConnection();
    if (
      ((this.connection.peerConnection = r),
      this.connection.type === Nn.Media &&
        t._stream &&
        this._addTracksToConnection(t._stream, r),
      t.originator)
    ) {
      const n = this.connection,
        o = { ordered: !!t.reliable },
        a = r.createDataChannel(n.label, o);
      (n._initializeDataChannel(a), this._makeOffer());
    } else this.handleSDP("OFFER", t.sdp);
  }
  _startPeerConnection() {
    re.log("Creating RTCPeerConnection.");
    const t = new RTCPeerConnection(this.connection.provider.options.config);
    return (this._setupListeners(t), t);
  }
  _setupListeners(t) {
    const r = this.connection.peer,
      n = this.connection.connectionId,
      o = this.connection.type,
      a = this.connection.provider;
    (re.log("Listening for ICE candidates."),
      (t.onicecandidate = (i) => {
        !i.candidate ||
          !i.candidate.candidate ||
          (re.log(`Received ICE candidates for ${r}:`, i.candidate),
          a.socket.send({
            type: Tt.Candidate,
            payload: { candidate: i.candidate, type: o, connectionId: n },
            dst: r,
          }));
      }),
      (t.oniceconnectionstatechange = () => {
        switch (t.iceConnectionState) {
          case "failed":
            (re.log(
              "iceConnectionState is failed, closing connections to " + r,
            ),
              this.connection.emitError(
                jd.NegotiationFailed,
                "Negotiation of connection to " + r + " failed.",
              ),
              this.connection.close());
            break;
          case "closed":
            (re.log(
              "iceConnectionState is closed, closing connections to " + r,
            ),
              this.connection.emitError(
                jd.ConnectionClosed,
                "Connection to " + r + " closed.",
              ),
              this.connection.close());
            break;
          case "disconnected":
            re.log(
              "iceConnectionState changed to disconnected on the connection with " +
                r,
            );
            break;
          case "completed":
            t.onicecandidate = () => {};
            break;
        }
        this.connection.emit("iceStateChanged", t.iceConnectionState);
      }),
      re.log("Listening for data channel"),
      (t.ondatachannel = (i) => {
        re.log("Received data channel");
        const s = i.channel;
        a.getConnection(r, n)._initializeDataChannel(s);
      }),
      re.log("Listening for remote stream"),
      (t.ontrack = (i) => {
        re.log("Received remote stream");
        const s = i.streams[0],
          l = a.getConnection(r, n);
        if (l.type === Nn.Media) {
          const u = l;
          this._addStreamToMediaConnection(s, u);
        }
      }));
  }
  cleanup() {
    re.log("Cleaning up PeerConnection to " + this.connection.peer);
    const t = this.connection.peerConnection;
    if (!t) return;
    ((this.connection.peerConnection = null),
      (t.onicecandidate =
        t.oniceconnectionstatechange =
        t.ondatachannel =
        t.ontrack =
          () => {}));
    const r = t.signalingState !== "closed";
    let n = !1;
    const o = this.connection.dataChannel;
    (o && (n = !!o.readyState && o.readyState !== "closed"),
      (r || n) && t.close());
  }
  async _makeOffer() {
    const t = this.connection.peerConnection,
      r = this.connection.provider;
    try {
      const n = await t.createOffer(this.connection.options.constraints);
      (re.log("Created offer."),
        this.connection.options.sdpTransform &&
          typeof this.connection.options.sdpTransform == "function" &&
          (n.sdp = this.connection.options.sdpTransform(n.sdp) || n.sdp));
      try {
        (await t.setLocalDescription(n),
          re.log("Set localDescription:", n, `for:${this.connection.peer}`));
        let o = {
          sdp: n,
          type: this.connection.type,
          connectionId: this.connection.connectionId,
          metadata: this.connection.metadata,
        };
        if (this.connection.type === Nn.Data) {
          const a = this.connection;
          o = {
            ...o,
            label: a.label,
            reliable: a.reliable,
            serialization: a.serialization,
          };
        }
        r.socket.send({
          type: Tt.Offer,
          payload: o,
          dst: this.connection.peer,
        });
      } catch (o) {
        o !=
          "OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer" &&
          (r.emitError(ut.WebRTC, o),
          re.log("Failed to setLocalDescription, ", o));
      }
    } catch (n) {
      (r.emitError(ut.WebRTC, n), re.log("Failed to createOffer, ", n));
    }
  }
  async _makeAnswer() {
    const t = this.connection.peerConnection,
      r = this.connection.provider;
    try {
      const n = await t.createAnswer();
      (re.log("Created answer."),
        this.connection.options.sdpTransform &&
          typeof this.connection.options.sdpTransform == "function" &&
          (n.sdp = this.connection.options.sdpTransform(n.sdp) || n.sdp));
      try {
        (await t.setLocalDescription(n),
          re.log("Set localDescription:", n, `for:${this.connection.peer}`),
          r.socket.send({
            type: Tt.Answer,
            payload: {
              sdp: n,
              type: this.connection.type,
              connectionId: this.connection.connectionId,
            },
            dst: this.connection.peer,
          }));
      } catch (o) {
        (r.emitError(ut.WebRTC, o),
          re.log("Failed to setLocalDescription, ", o));
      }
    } catch (n) {
      (r.emitError(ut.WebRTC, n), re.log("Failed to create answer, ", n));
    }
  }
  async handleSDP(t, r) {
    r = new RTCSessionDescription(r);
    const n = this.connection.peerConnection,
      o = this.connection.provider;
    re.log("Setting remote description", r);
    const a = this;
    try {
      (await n.setRemoteDescription(r),
        re.log(`Set remoteDescription:${t} for:${this.connection.peer}`),
        t === "OFFER" && (await a._makeAnswer()));
    } catch (i) {
      (o.emitError(ut.WebRTC, i),
        re.log("Failed to setRemoteDescription, ", i));
    }
  }
  async handleCandidate(t) {
    re.log("handleCandidate:", t);
    try {
      (await this.connection.peerConnection.addIceCandidate(t),
        re.log(`Added ICE candidate for:${this.connection.peer}`));
    } catch (r) {
      (this.connection.provider.emitError(ut.WebRTC, r),
        re.log("Failed to handleCandidate, ", r));
    }
  }
  _addTracksToConnection(t, r) {
    if (
      (re.log(`add tracks from stream ${t.id} to peer connection`), !r.addTrack)
    )
      return re.error(
        "Your browser does't support RTCPeerConnection#addTrack. Ignored.",
      );
    t.getTracks().forEach((n) => {
      r.addTrack(n, t);
    });
  }
  _addStreamToMediaConnection(t, r) {
    (re.log(`add stream ${t.id} to media connection ${r.connectionId}`),
      r.addStream(t));
  }
}
class Vw extends vf.EventEmitter {
  emitError(t, r) {
    (re.error("Error:", r), this.emit("error", new TR(`${t}`, r)));
  }
}
class TR extends Error {
  constructor(t, r) {
    (typeof r == "string" ? super(r) : (super(), Object.assign(this, r)),
      (this.type = t));
  }
}
class qw extends Vw {
  get open() {
    return this._open;
  }
  constructor(t, r, n) {
    (super(),
      (this.peer = t),
      (this.provider = r),
      (this.options = n),
      (this._open = !1),
      (this.metadata = n.metadata));
  }
}
var Ad;
const oi = class oi extends qw {
  get type() {
    return Nn.Media;
  }
  get localStream() {
    return this._localStream;
  }
  get remoteStream() {
    return this._remoteStream;
  }
  constructor(t, r, n) {
    (super(t, r, n),
      (this._localStream = this.options._stream),
      (this.connectionId =
        this.options.connectionId || oi.ID_PREFIX + $t.randomToken()),
      (this._negotiator = new Ww(this)),
      this._localStream &&
        this._negotiator.startConnection({
          _stream: this._localStream,
          originator: !0,
        }));
  }
  _initializeDataChannel(t) {
    ((this.dataChannel = t),
      (this.dataChannel.onopen = () => {
        (re.log(`DC#${this.connectionId} dc connection success`),
          this.emit("willCloseOnRemote"));
      }),
      (this.dataChannel.onclose = () => {
        (re.log(`DC#${this.connectionId} dc closed for:`, this.peer),
          this.close());
      }));
  }
  addStream(t) {
    (re.log("Receiving stream", t),
      (this._remoteStream = t),
      super.emit("stream", t));
  }
  handleMessage(t) {
    const r = t.type,
      n = t.payload;
    switch (t.type) {
      case Tt.Answer:
        (this._negotiator.handleSDP(r, n.sdp), (this._open = !0));
        break;
      case Tt.Candidate:
        this._negotiator.handleCandidate(n.candidate);
        break;
      default:
        re.warn(`Unrecognized message type:${r} from peer:${this.peer}`);
        break;
    }
  }
  answer(t, r = {}) {
    if (this._localStream) {
      re.warn(
        "Local stream already exists on this MediaConnection. Are you answering a call twice?",
      );
      return;
    }
    ((this._localStream = t),
      r && r.sdpTransform && (this.options.sdpTransform = r.sdpTransform),
      this._negotiator.startConnection({
        ...this.options._payload,
        _stream: t,
      }));
    const n = this.provider._getMessages(this.connectionId);
    for (const o of n) this.handleMessage(o);
    this._open = !0;
  }
  close() {
    (this._negotiator &&
      (this._negotiator.cleanup(), (this._negotiator = null)),
      (this._localStream = null),
      (this._remoteStream = null),
      this.provider &&
        (this.provider._removeConnection(this), (this.provider = null)),
      this.options && this.options._stream && (this.options._stream = null),
      this.open && ((this._open = !1), super.emit("close")));
  }
};
((Ad = new WeakMap()), ka(oi, Ad, (oi.ID_PREFIX = "mc_")));
let Il = oi;
class PR {
  constructor(t) {
    this._options = t;
  }
  _buildRequest(t) {
    const r = this._options.secure ? "https" : "http",
      { host: n, port: o, path: a, key: i } = this._options,
      s = new URL(`${r}://${n}:${o}${a}${i}/${t}`);
    return (
      s.searchParams.set("ts", `${Date.now()}${Math.random()}`),
      s.searchParams.set("version", Hw),
      fetch(s.href, { referrerPolicy: this._options.referrerPolicy })
    );
  }
  async retrieveId() {
    try {
      const t = await this._buildRequest("id");
      if (t.status !== 200) throw new Error(`Error. Status:${t.status}`);
      return t.text();
    } catch (t) {
      re.error("Error retrieving ID", t);
      let r = "";
      throw (
        this._options.path === "/" &&
          this._options.host !== $t.CLOUD_HOST &&
          (r =
            " If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),
        new Error("Could not get an ID from the server." + r)
      );
    }
  }
  async listAllPeers() {
    try {
      const t = await this._buildRequest("peers");
      if (t.status !== 200) {
        if (t.status === 401) {
          let r = "";
          throw (
            this._options.host === $t.CLOUD_HOST
              ? (r =
                  "It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.")
              : (r =
                  "You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature."),
            new Error(
              "It doesn't look like you have permission to list peers IDs. " +
                r,
            )
          );
        }
        throw new Error(`Error. Status:${t.status}`);
      }
      return t.json();
    } catch (t) {
      throw (
        re.error("Error retrieving list peers", t),
        new Error("Could not get list peers from the server." + t)
      );
    }
  }
}
var Fd, Bd;
const Hn = class Hn extends qw {
  get type() {
    return Nn.Data;
  }
  constructor(t, r, n) {
    (super(t, r, n),
      (this.connectionId = this.options.connectionId || Hn.ID_PREFIX + Yw()),
      (this.label = this.options.label || this.connectionId),
      (this.reliable = !!this.options.reliable),
      (this._negotiator = new Ww(this)),
      this._negotiator.startConnection(
        this.options._payload || { originator: !0, reliable: this.reliable },
      ));
  }
  _initializeDataChannel(t) {
    ((this.dataChannel = t),
      (this.dataChannel.onopen = () => {
        (re.log(`DC#${this.connectionId} dc connection success`),
          (this._open = !0),
          this.emit("open"));
      }),
      (this.dataChannel.onmessage = (r) => {
        re.log(`DC#${this.connectionId} dc onmessage:`, r.data);
      }),
      (this.dataChannel.onclose = () => {
        (re.log(`DC#${this.connectionId} dc closed for:`, this.peer),
          this.close());
      }));
  }
  close(t) {
    if (t != null && t.flush) {
      this.send({ __peerData: { type: "close" } });
      return;
    }
    (this._negotiator &&
      (this._negotiator.cleanup(), (this._negotiator = null)),
      this.provider &&
        (this.provider._removeConnection(this), (this.provider = null)),
      this.dataChannel &&
        ((this.dataChannel.onopen = null),
        (this.dataChannel.onmessage = null),
        (this.dataChannel.onclose = null),
        (this.dataChannel = null)),
      this.open && ((this._open = !1), super.emit("close")));
  }
  send(t, r = !1) {
    if (!this.open) {
      this.emitError(
        yf.NotOpenYet,
        "Connection is not open. You should listen for the `open` event before sending messages.",
      );
      return;
    }
    return this._send(t, r);
  }
  async handleMessage(t) {
    const r = t.payload;
    switch (t.type) {
      case Tt.Answer:
        await this._negotiator.handleSDP(t.type, r.sdp);
        break;
      case Tt.Candidate:
        await this._negotiator.handleCandidate(r.candidate);
        break;
      default:
        re.warn("Unrecognized message type:", t.type, "from peer:", this.peer);
        break;
    }
  }
};
((Fd = new WeakMap()),
  (Bd = new WeakMap()),
  ka(Hn, Fd, (Hn.ID_PREFIX = "dc_")),
  ka(Hn, Bd, (Hn.MAX_BUFFERED_AMOUNT = 8388608)));
let jl = Hn;
class wf extends jl {
  get bufferSize() {
    return this._bufferSize;
  }
  _initializeDataChannel(t) {
    (super._initializeDataChannel(t),
      (this.dataChannel.binaryType = "arraybuffer"),
      this.dataChannel.addEventListener("message", (r) =>
        this._handleDataMessage(r),
      ));
  }
  _bufferedSend(t) {
    (this._buffering || !this._trySend(t)) &&
      (this._buffer.push(t), (this._bufferSize = this._buffer.length));
  }
  _trySend(t) {
    if (!this.open) return !1;
    if (this.dataChannel.bufferedAmount > jl.MAX_BUFFERED_AMOUNT)
      return (
        (this._buffering = !0),
        setTimeout(() => {
          ((this._buffering = !1), this._tryBuffer());
        }, 50),
        !1
      );
    try {
      this.dataChannel.send(t);
    } catch (r) {
      return (
        re.error(`DC#:${this.connectionId} Error when sending:`, r),
        (this._buffering = !0),
        this.close(),
        !1
      );
    }
    return !0;
  }
  _tryBuffer() {
    if (!this.open || this._buffer.length === 0) return;
    const t = this._buffer[0];
    this._trySend(t) &&
      (this._buffer.shift(),
      (this._bufferSize = this._buffer.length),
      this._tryBuffer());
  }
  close(t) {
    if (t != null && t.flush) {
      this.send({ __peerData: { type: "close" } });
      return;
    }
    ((this._buffer = []), (this._bufferSize = 0), super.close());
  }
  constructor(...t) {
    (super(...t),
      (this._buffer = []),
      (this._bufferSize = 0),
      (this._buffering = !1));
  }
}
class pc extends wf {
  close(t) {
    (super.close(t), (this._chunkedData = {}));
  }
  constructor(t, r, n) {
    (super(t, r, n),
      (this.chunker = new $w()),
      (this.serialization = mu.Binary),
      (this._chunkedData = {}));
  }
  _handleDataMessage({ data: t }) {
    const r = iw(t),
      n = r.__peerData;
    if (n) {
      if (n.type === "close") {
        this.close();
        return;
      }
      this._handleChunk(r);
      return;
    }
    this.emit("data", r);
  }
  _handleChunk(t) {
    const r = t.__peerData,
      n = this._chunkedData[r] || { data: [], count: 0, total: t.total };
    if (
      ((n.data[t.n] = new Uint8Array(t.data)),
      n.count++,
      (this._chunkedData[r] = n),
      n.total === n.count)
    ) {
      delete this._chunkedData[r];
      const o = xR(n.data);
      this._handleDataMessage({ data: o });
    }
  }
  _send(t, r) {
    const n = sw(t);
    if (n instanceof Promise) return this._send_blob(n);
    if (!r && n.byteLength > this.chunker.chunkedMTU) {
      this._sendChunks(n);
      return;
    }
    this._bufferedSend(n);
  }
  async _send_blob(t) {
    const r = await t;
    if (r.byteLength > this.chunker.chunkedMTU) {
      this._sendChunks(r);
      return;
    }
    this._bufferedSend(r);
  }
  _sendChunks(t) {
    const r = this.chunker.chunk(t);
    re.log(`DC#${this.connectionId} Try to send ${r.length} chunks...`);
    for (const n of r) this.send(n, !0);
  }
}
class RR extends wf {
  _handleDataMessage({ data: t }) {
    super.emit("data", t);
  }
  _send(t, r) {
    this._bufferedSend(t);
  }
  constructor(...t) {
    (super(...t), (this.serialization = mu.None));
  }
}
class OR extends wf {
  _handleDataMessage({ data: t }) {
    const r = this.parse(this.decoder.decode(t)),
      n = r.__peerData;
    if (n && n.type === "close") {
      this.close();
      return;
    }
    this.emit("data", r);
  }
  _send(t, r) {
    const n = this.encoder.encode(this.stringify(t));
    if (n.byteLength >= $t.chunkedMTU) {
      this.emitError(yf.MessageToBig, "Message too big for JSON channel");
      return;
    }
    this._bufferedSend(n);
  }
  constructor(...t) {
    (super(...t),
      (this.serialization = mu.JSON),
      (this.encoder = new TextEncoder()),
      (this.decoder = new TextDecoder()),
      (this.stringify = JSON.stringify),
      (this.parse = JSON.parse));
  }
}
var Ud;
const ai = class ai extends Vw {
  get id() {
    return this._id;
  }
  get options() {
    return this._options;
  }
  get open() {
    return this._open;
  }
  get socket() {
    return this._socket;
  }
  get connections() {
    const t = Object.create(null);
    for (const [r, n] of this._connections) t[r] = n;
    return t;
  }
  get destroyed() {
    return this._destroyed;
  }
  get disconnected() {
    return this._disconnected;
  }
  constructor(t, r) {
    (super(),
      (this._serializers = {
        raw: RR,
        json: OR,
        binary: pc,
        "binary-utf8": pc,
        default: pc,
      }),
      (this._id = null),
      (this._lastServerId = null),
      (this._destroyed = !1),
      (this._disconnected = !1),
      (this._open = !1),
      (this._connections = new Map()),
      (this._lostMessages = new Map()));
    let n;
    if (
      (t && t.constructor == Object ? (r = t) : t && (n = t.toString()),
      (r = {
        debug: 0,
        host: $t.CLOUD_HOST,
        port: $t.CLOUD_PORT,
        path: "/",
        key: ai.DEFAULT_KEY,
        token: $t.randomToken(),
        config: $t.defaultConfig,
        referrerPolicy: "strict-origin-when-cross-origin",
        serializers: {},
        ...r,
      }),
      (this._options = r),
      (this._serializers = {
        ...this._serializers,
        ...this.options.serializers,
      }),
      this._options.host === "/" &&
        (this._options.host = window.location.hostname),
      this._options.path &&
        (this._options.path[0] !== "/" &&
          (this._options.path = "/" + this._options.path),
        this._options.path[this._options.path.length - 1] !== "/" &&
          (this._options.path += "/")),
      this._options.secure === void 0 && this._options.host !== $t.CLOUD_HOST
        ? (this._options.secure = $t.isSecure())
        : this._options.host == $t.CLOUD_HOST && (this._options.secure = !0),
      this._options.logFunction && re.setLogFunction(this._options.logFunction),
      (re.logLevel = this._options.debug || 0),
      (this._api = new PR(r)),
      (this._socket = this._createServerConnection()),
      !$t.supports.audioVideo && !$t.supports.data)
    ) {
      this._delayedAbort(
        ut.BrowserIncompatible,
        "The current browser does not support WebRTC",
      );
      return;
    }
    if (n && !$t.validateId(n)) {
      this._delayedAbort(ut.InvalidID, `ID "${n}" is invalid`);
      return;
    }
    n
      ? this._initialize(n)
      : this._api
          .retrieveId()
          .then((o) => this._initialize(o))
          .catch((o) => this._abort(ut.ServerError, o));
  }
  _createServerConnection() {
    const t = new DR(
      this._options.secure,
      this._options.host,
      this._options.port,
      this._options.path,
      this._options.key,
      this._options.pingInterval,
    );
    return (
      t.on(Cn.Message, (r) => {
        this._handleMessage(r);
      }),
      t.on(Cn.Error, (r) => {
        this._abort(ut.SocketError, r);
      }),
      t.on(Cn.Disconnected, () => {
        this.disconnected ||
          (this.emitError(ut.Network, "Lost connection to server."),
          this.disconnect());
      }),
      t.on(Cn.Close, () => {
        this.disconnected ||
          this._abort(ut.SocketClosed, "Underlying socket is already closed.");
      }),
      t
    );
  }
  _initialize(t) {
    ((this._id = t), this.socket.start(t, this._options.token));
  }
  _handleMessage(t) {
    const r = t.type,
      n = t.payload,
      o = t.src;
    switch (r) {
      case Tt.Open:
        ((this._lastServerId = this.id),
          (this._open = !0),
          this.emit("open", this.id));
        break;
      case Tt.Error:
        this._abort(ut.ServerError, n.msg);
        break;
      case Tt.IdTaken:
        this._abort(ut.UnavailableID, `ID "${this.id}" is taken`);
        break;
      case Tt.InvalidKey:
        this._abort(ut.InvalidKey, `API KEY "${this._options.key}" is invalid`);
        break;
      case Tt.Leave:
        (re.log(`Received leave message from ${o}`),
          this._cleanupPeer(o),
          this._connections.delete(o));
        break;
      case Tt.Expire:
        this.emitError(ut.PeerUnavailable, `Could not connect to peer ${o}`);
        break;
      case Tt.Offer: {
        const a = n.connectionId;
        let i = this.getConnection(o, a);
        if (
          (i &&
            (i.close(),
            re.warn(`Offer received for existing Connection ID:${a}`)),
          n.type === Nn.Media)
        ) {
          const l = new Il(o, this, {
            connectionId: a,
            _payload: n,
            metadata: n.metadata,
          });
          ((i = l), this._addConnection(o, i), this.emit("call", l));
        } else if (n.type === Nn.Data) {
          const l = new this._serializers[n.serialization](o, this, {
            connectionId: a,
            _payload: n,
            metadata: n.metadata,
            label: n.label,
            serialization: n.serialization,
            reliable: n.reliable,
          });
          ((i = l), this._addConnection(o, i), this.emit("connection", l));
        } else {
          re.warn(`Received malformed connection type:${n.type}`);
          return;
        }
        const s = this._getMessages(a);
        for (const l of s) i.handleMessage(l);
        break;
      }
      default: {
        if (!n) {
          re.warn(`You received a malformed message from ${o} of type ${r}`);
          return;
        }
        const a = n.connectionId,
          i = this.getConnection(o, a);
        i && i.peerConnection
          ? i.handleMessage(t)
          : a
            ? this._storeMessage(a, t)
            : re.warn("You received an unrecognized message:", t);
        break;
      }
    }
  }
  _storeMessage(t, r) {
    (this._lostMessages.has(t) || this._lostMessages.set(t, []),
      this._lostMessages.get(t).push(r));
  }
  _getMessages(t) {
    const r = this._lostMessages.get(t);
    return r ? (this._lostMessages.delete(t), r) : [];
  }
  connect(t, r = {}) {
    if (((r = { serialization: "default", ...r }), this.disconnected)) {
      (re.warn(
        "You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available.",
      ),
        this.emitError(
          ut.Disconnected,
          "Cannot connect to new Peer after disconnecting from server.",
        ));
      return;
    }
    const n = new this._serializers[r.serialization](t, this, r);
    return (this._addConnection(t, n), n);
  }
  call(t, r, n = {}) {
    if (this.disconnected) {
      (re.warn(
        "You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect.",
      ),
        this.emitError(
          ut.Disconnected,
          "Cannot connect to new Peer after disconnecting from server.",
        ));
      return;
    }
    if (!r) {
      re.error(
        "To call a peer, you must provide a stream from your browser's `getUserMedia`.",
      );
      return;
    }
    const o = new Il(t, this, { ...n, _stream: r });
    return (this._addConnection(t, o), o);
  }
  _addConnection(t, r) {
    (re.log(`add connection ${r.type}:${r.connectionId} to peerId:${t}`),
      this._connections.has(t) || this._connections.set(t, []),
      this._connections.get(t).push(r));
  }
  _removeConnection(t) {
    const r = this._connections.get(t.peer);
    if (r) {
      const n = r.indexOf(t);
      n !== -1 && r.splice(n, 1);
    }
    this._lostMessages.delete(t.connectionId);
  }
  getConnection(t, r) {
    const n = this._connections.get(t);
    if (!n) return null;
    for (const o of n) if (o.connectionId === r) return o;
    return null;
  }
  _delayedAbort(t, r) {
    setTimeout(() => {
      this._abort(t, r);
    }, 0);
  }
  _abort(t, r) {
    (re.error("Aborting!"),
      this.emitError(t, r),
      this._lastServerId ? this.disconnect() : this.destroy());
  }
  destroy() {
    this.destroyed ||
      (re.log(`Destroy peer with ID:${this.id}`),
      this.disconnect(),
      this._cleanup(),
      (this._destroyed = !0),
      this.emit("close"));
  }
  _cleanup() {
    for (const t of this._connections.keys())
      (this._cleanupPeer(t), this._connections.delete(t));
    this.socket.removeAllListeners();
  }
  _cleanupPeer(t) {
    const r = this._connections.get(t);
    if (r) for (const n of r) n.close();
  }
  disconnect() {
    if (this.disconnected) return;
    const t = this.id;
    (re.log(`Disconnect peer with ID:${t}`),
      (this._disconnected = !0),
      (this._open = !1),
      this.socket.close(),
      (this._lastServerId = t),
      (this._id = null),
      this.emit("disconnected", t));
  }
  reconnect() {
    if (this.disconnected && !this.destroyed)
      (re.log(
        `Attempting reconnection to server with ID ${this._lastServerId}`,
      ),
        (this._disconnected = !1),
        this._initialize(this._lastServerId));
    else {
      if (this.destroyed)
        throw new Error(
          "This peer cannot reconnect to the server. It has already been destroyed.",
        );
      if (!this.disconnected && !this.open)
        re.error(
          "In a hurry? We're still trying to make the initial connection!",
        );
      else
        throw new Error(
          `Peer ${this.id} cannot reconnect because it is not disconnected from the server!`,
        );
    }
  }
  listAllPeers(t = (r) => {}) {
    this._api
      .listAllPeers()
      .then((r) => t(r))
      .catch((r) => this._abort(ut.ServerError, r));
  }
};
((Ud = new WeakMap()), ka(ai, Ud, (ai.DEFAULT_KEY = "peerjs")));
let Ld = ai;
var NR = Ld;
const bo = (e, t) => (t.id && e.some((r) => r.id === t.id) ? e : [...e, t]),
  fc = (e, t, r) => {
    r != null &&
      r.id &&
      (e((n) =>
        n.some((o) => o.id === r.id)
          ? n
          : [
              ...n,
              {
                ...r,
                date: new Date(r.uploadedAt).toLocaleString("pt-PT"),
                url: null,
              },
            ],
      ),
      t(!0));
  },
  eg = () => {
    const { explicacaoId: e } = jy(),
      [t, r] = _.useState(""),
      n = _.useRef(null),
      [o, a] = _.useState({}),
      i = _.useRef({}),
      [s, l] = _.useState(null),
      [u, c] = _.useState([]),
      [d, m] = _.useState(""),
      v = _.useRef(null),
      [S, C] = _.useState(""),
      k = _.useRef(null),
      g = _.useRef(null),
      y = _.useRef(null),
      [w, T] = _.useState(!1),
      [P, R] = _.useState(null),
      [M, A] = _.useState([]),
      [V, L] = _.useState(!1),
      [K, $] = _.useState(""),
      [ae, le] = _.useState(!1),
      U = _.useRef([]),
      q = _.useRef(null),
      [ie, z] = _.useState([]),
      G = _.useRef(new Set()),
      Z = _.useRef(null);
    (_.useEffect(
      () => () => {
        U.current.forEach((B) => URL.revokeObjectURL(B));
      },
      [],
    ),
      _.useEffect(() => {
        let B = !0;
        if (!e || !sessionStorage.getItem("token")) {
          L(!0);
          return;
        }
        return (
          de
            .get(`/explicacoes/${e}/recordings`)
            .then((oe) => {
              if (!B) return;
              const ce = oe.data.map((he) => ({
                ...he,
                date: new Date(he.uploadedAt).toLocaleString("pt-PT"),
                url: null,
              }));
              (A((he) => {
                const Te = new Map(ce.map((se) => [se.id, se]));
                return (
                  he.forEach((se) => {
                    Te.has(se.id) || Te.set(se.id, se);
                  }),
                  [...Te.values()]
                );
              }),
                L(!0));
            })
            .catch((oe) => {
              (console.error("Erro ao carregar gravações partilhadas", oe),
                B &&
                  ($(
                    "Não foi possível carregar as gravações desta explicação.",
                  ),
                  L(!0)));
            }),
          () => {
            B = !1;
          }
        );
      }, [e]));
    const ne = async (B) => {
      if (!B.url)
        try {
          $("");
          const oe = await de.get(`/explicacoes/${e}/recordings/${B.id}`, {
              responseType: "blob",
            }),
            ce = URL.createObjectURL(oe.data);
          (U.current.push(ce),
            A((he) =>
              he.map((Te) => (Te.id === B.id ? { ...Te, url: ce } : Te)),
            ));
        } catch (oe) {
          (console.error("Erro ao transferir gravação", oe),
            $("Não foi possível carregar esta gravação."));
        }
    };
    _.useEffect(() => {
      if (!ae) return;
      const B = (oe) => {
        oe.key === "Escape" && le(!1);
      };
      return (
        window.addEventListener("keydown", B),
        () => window.removeEventListener("keydown", B)
      );
    }, [ae]);
    const fe = (B, oe, ce) => {
      if (v.current) return;
      const he = `chat-${oe || "anon"}-${Date.now()}`;
      ((v.current = new WebSocket(Ml())),
        (v.current.onopen = () => {
          v.current.send(
            JSON.stringify({
              type: "join-room",
              userId: oe,
              peerId: he,
              roomId: ce,
              nome: B,
            }),
          );
        }),
        (v.current.onmessage = (Te) => {
          try {
            const se = JSON.parse(Te.data);
            if (se.type === "room-update") {
              const { usersInRoom: Q, userNames: me } = se;
              Q &&
                me &&
                z(
                  Q.map((ge) => ({
                    peerId: ge,
                    nomeUtilizador: me[ge] || "Utilizador desconhecido",
                  })),
                );
            }
            (se.type === "recording-created" && fc(A, L, se.recording),
              se.type === "chat-message" &&
                c((Q) =>
                  bo(Q, { id: se.id, sender: se.sender, text: se.text }),
                ),
              se.type === "receive-file" &&
                c((Q) =>
                  bo(Q, {
                    id: se.id,
                    sender: se.sender,
                    text: `Ficheiro: ${se.filename}`,
                    link: se.link,
                  }),
                ));
          } catch (se) {
            console.error(
              "Erro ao processar mensagem WebSocket (fallback)",
              se,
            );
          }
        }));
    };
    (_.useEffect(() => {
      let B = !0;
      const oe = sessionStorage.getItem("emailUsuario"),
        ce = sessionStorage.getItem("explicandoId");
      if (!oe || !sessionStorage.getItem("token")) {
        window.location.replace("/");
        return;
      }
      if (!e) {
        const he =
          sessionStorage.getItem("tipoUsuario") === "Explicador"
            ? "/ExplicacoesConfirmadasExplicador"
            : "/ExplicacoesConfirmadasExplicando";
        window.location.replace(he);
        return;
      }
      return (
        ce || C("Erro! Utilizador não autenticado"),
        de
          .get(`${ni}/explicacoes/${e}`)
          .then((he) => {
            if (!B) return null;
            const Te = he.data;
            if (Te.confirmacao !== "Confirmada" || Te.tipo !== "On-line")
              throw new Error("A explicação não está disponível online");
            return de.get(`${ni}/explicandos/${oe}`);
          })
          .then((he) => {
            if (!B || !he) return;
            const Te = he.data.nome,
              se = he.data.explicandoId;
            (r(Te),
              navigator.mediaDevices
                .getUserMedia({ video: !0, audio: !0 })
                .then((Q) => {
                  if (!B) {
                    Q.getTracks().forEach((me) => me.stop());
                    return;
                  }
                  if (
                    ((k.current = Q),
                    (g.current = Q),
                    n.current &&
                      ((n.current.srcObject = Q),
                      (n.current.muted = !0),
                      n.current.play().catch((me) => {
                        console.error("Erro ao iniciar vídeo local", me);
                      })),
                    !q.current)
                  ) {
                    q.current = new NR();
                    const me = q.current;
                    me.on("open", () => {
                      ((v.current = new WebSocket(Ml())),
                        (v.current.onopen = () => {
                          const ge = {
                            type: "join-room",
                            userId: se,
                            peerId: me.id,
                            roomId: e,
                          };
                          v.current.send(JSON.stringify(ge));
                        }),
                        (v.current.onmessage = (ge) => {
                          try {
                            const _e = JSON.parse(ge.data);
                            if (
                              (_e.type === "error" && C(_e.message),
                              _e.type === "recording-created" &&
                                fc(A, L, _e.recording),
                              _e.type === "room-update")
                            ) {
                              const { usersInRoom: we, userNames: Ue } = _e;
                              (we && Ue
                                ? z(
                                    we.map((Ie) => ({
                                      peerId: Ie,
                                      nomeUtilizador:
                                        Ue[Ie] || "Utilizador desconhecido",
                                    })),
                                  )
                                : console.error(
                                    "Dados de utilizadores não recebido corretamente",
                                  ),
                                we.forEach((Ie) => {
                                  if (Ie !== me.id && !i.current[Ie])
                                    try {
                                      const Ae = q.current.call(Ie, Q);
                                      ((i.current[Ie] = Ae),
                                        Ae.on("stream", (Et) => {
                                          a((et) =>
                                            et[Ie] ? et : { ...et, [Ie]: Et },
                                          );
                                        }),
                                        Ae.on("close", () => {
                                          (delete i.current[Ie],
                                            a((Et) => {
                                              const et = { ...Et };
                                              return (delete et[Ie], et);
                                            }));
                                        }));
                                    } catch (Ae) {
                                      console.error(
                                        "Erro ao processar chamada Peer",
                                        Ae,
                                      );
                                    }
                                }));
                            }
                            if (_e.type === "screen-share-stop") {
                              const we = _e.peerId;
                              a((Ie) => {
                                const Ae = { ...Ie };
                                return (delete Ae[`screen-${we}`], Ae);
                              });
                              const Ue = i.current[`screen-${we}`];
                              Ue &&
                                (Ue.close(), delete i.current[`screen-${we}`]);
                            }
                            (_e.type === "chat-message" &&
                              c((we) =>
                                bo(we, {
                                  id: _e.id,
                                  sender: _e.sender,
                                  text: _e.text,
                                }),
                              ),
                              _e.type === "receive-file" &&
                                c((we) =>
                                  bo(we, {
                                    id: _e.id,
                                    sender: _e.sender,
                                    text: `Ficheiro: ${_e.filename}`,
                                    link: _e.link,
                                  }),
                                ));
                          } catch (_e) {
                            console.error(
                              "Erro ao processar mensagem Websocket",
                              _e,
                            );
                          }
                        }),
                        me.on("call", (ge) => {
                          var _e;
                          try {
                            (((_e = ge.metadata) == null ? void 0 : _e.type) ===
                            "screen"
                              ? (ge.answer(),
                                (i.current[`screen-${ge.peer}`] = ge),
                                ge.on("stream", (we) => {
                                  (a((Ue) => ({
                                    ...Ue,
                                    [`screen-${ge.peer}`]: we,
                                  })),
                                    we.getVideoTracks().forEach((Ue) => {
                                      Ue.onended = () => {
                                        a((Ie) => {
                                          const Ae = { ...Ie };
                                          return (
                                            delete Ae[`screen-${ge.peer}`],
                                            Ae
                                          );
                                        });
                                      };
                                    }));
                                }))
                              : (ge.answer(k.current),
                                ge.on("stream", (we) => {
                                  a((Ue) => ({ ...Ue, [ge.peer]: we }));
                                })),
                              ge.on("close", () => {
                                (delete i.current[ge.peer],
                                  a((we) => {
                                    const Ue = { ...we };
                                    return (delete Ue[`screen-${ge.peer}`], Ue);
                                  }));
                              }));
                          } catch (we) {
                            console.error(
                              "Erro ao acesar câmara/microfone",
                              we,
                            );
                          }
                        }));
                    });
                  }
                })
                .catch((Q) => {
                  B &&
                    (console.error("Erro ao acessar câmara/microfone", Q),
                    C(
                      "Não foi possível aceder à câmara ou ao microfone. Verifique as permissões e se outra aplicação está a utilizar os dispositivos.",
                    ),
                    fe(Te, se, e));
                }));
          })
          .catch((he) => {
            B &&
              (console.error("Erro ao validar a explicação online", he),
              C("Não foi possível aceder a esta explicação online."));
          }),
        window.addEventListener("beforeunload", ze),
        () => {
          ((B = !1), ze(), window.removeEventListener("beforeunload", ze));
        }
      );
    }, [e]),
      _.useEffect(() => {
        Z.current && Z.current.scrollIntoView({ behaviour: "smooth" });
      }, [u]));
    const ze = () => {
        (Object.values(i.current).forEach((B) => {
          B.close();
        }),
          q.current && (q.current.destroy(), (q.current = null)),
          v.current && (v.current.close(), (v.current = null)),
          k.current &&
            (k.current.getTracks().forEach((B) => B.stop()),
            (k.current = null),
            (g.current = null)));
      },
      pe = async () => {
        try {
          if (y.current) {
            ke();
            return;
          }
          const B = await navigator.mediaDevices.getDisplayMedia({
              video: !0,
              audio: !1,
            }),
            oe = B.getVideoTracks()[0];
          ((y.current = oe),
            Object.keys(ie).forEach((he, Te) => {
              const se = ie[Te].peerId;
              if (se === q.current.id) return;
              const Q = q.current.call(se, B, { metadata: { type: "screen" } });
              ((i.current[`screen-${se}`] = Q),
                Q.on("stream", (me) => {
                  a((ge) => ({ ...ge, [`screen-${se}`]: me }));
                }),
                Q.on("close", () => {
                  (delete i.current[`screen-${se}`],
                    a((me) => {
                      const ge = { ...me };
                      return (delete ge[`screen-${se}`], ge);
                    }));
                }));
            }));
          const ce = document.getElementById("local-shared-screen");
          (ce && (ce.srcObject = B),
            (oe.onended = () => {
              ke();
            }));
        } catch (B) {
          console.error("Erro ao partilhar o ecrã", B);
        }
      },
      ke = () => {
        if (!y.current) return;
        (y.current.stop(),
          (y.current = null),
          Object.keys(i.current).forEach((oe) => {
            if (oe.startsWith("screen-")) {
              const ce = i.current[oe];
              ce && (ce.close(), delete i.current[oe]);
            }
          }));
        const B = document.getElementById("local-shared-screen");
        (B && (B.srcObject = null),
          v.current &&
            v.current.readyState === WebSocket.OPEN &&
            v.current.send(
              JSON.stringify({
                type: "screen-share-stop",
                peerId: q.current.id,
              }),
            ));
      },
      ue = async () => {
        if (!s) return;
        if (!v.current || v.current.readyState !== WebSocket.OPEN) {
          alert("Conexão de chat indisponível. Recarregue a página.");
          return;
        }
        if (((s.uploading = !0), G.current.has(s.name))) {
          s.uploading = !1;
          return;
        }
        const B = new FormData();
        B.append("file", s);
        try {
          const ce = await (
              await fetch(`${ni}/upload`, { method: "POST", body: B })
            ).json(),
            he = {
              type: "send-file",
              id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
              sender: t,
              filename: ce.url.split("/").pop(),
              link: ce.url,
            };
          (v.current &&
            v.current.readyState === WebSocket.OPEN &&
            v.current.send(JSON.stringify(he)),
            c((Te) =>
              bo(Te, {
                id: he.id,
                sender: t,
                text: `Ficheiro ${ce.originalname}`,
                link: ce.url,
              }),
            ),
            G.current.add(s.name));
        } catch (oe) {
          console.error("Erro ao fazer upload do ficheiro", oe);
        }
        s.uploading = !1;
      },
      Ne = () => {
        if (d.trim() === "") return;
        const B = {
          type: "chat-message",
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
          sender: t || "Eu",
          text: d,
        };
        if (
          (c((oe) => bo(oe, { id: B.id, sender: B.sender, text: B.text })),
          m(""),
          !v.current || v.current.readyState !== WebSocket.OPEN)
        ) {
          C(
            "Conexão de chat indisponível. A mensagem foi mostrada localmente.",
          );
          return;
        }
        try {
          v.current.send(JSON.stringify(B));
        } catch (oe) {
          (console.error("Erro ao enviar mensagem", oe),
            C("Não foi possível enviar para os outros utilizadores."));
        }
      },
      Ee = async () => {
        try {
          const B = await navigator.mediaDevices.getDisplayMedia({
              video: !0,
              audio: !0,
            }),
            oe = await navigator.mediaDevices.getUserMedia({ audio: !0 }),
            ce = new MediaStream([
              ...B.getVideoTracks(),
              ...oe.getAudioTracks(),
            ]),
            he = new MediaRecorder(ce),
            Te = [];
          ((he.ondataavailable = (se) => {
            se.data.size > 0 && Te.push(se.data);
          }),
            (he.onstop = async () => {
              var we, Ue, Ie;
              const se = he.mimeType || "video/webm",
                Q = new Blob(Te, { type: se }),
                me = new Date(),
                ge = se.includes("mp4") ? "mp4" : "webm",
                _e = `gravacao-${me.toISOString().replace(/[:.]/g, "-")}.${ge}`;
              try {
                const Ae = new FormData();
                Ae.append("recording", Q, _e);
                const Et = await de.post(`/explicacoes/${e}/recordings`, Ae);
                (fc(A, L, Et.data), $(""));
              } catch (Ae) {
                console.error("Erro ao partilhar gravação", Ae);
                const Et =
                    (Ue = (we = Ae.response) == null ? void 0 : we.data) == null
                      ? void 0
                      : Ue.message,
                  et =
                    (Ie = Ae.response) != null && Ie.status
                      ? `O servidor respondeu com erro HTTP ${Ae.response.status}.`
                      : "Não foi possível contactar o servidor.";
                $(Et || et);
              } finally {
                ce.getTracks().forEach((Ae) => Ae.stop());
              }
            }),
            he.start(),
            R(he),
            T(!0));
        } catch (B) {
          console.error("Erro ao iniciar gravação de ecrã", B);
        }
      },
      ye = () => {
        (P.stop(), T(!1));
      };
    return h.jsxs("div", {
      children: [
        h.jsx(Un, {}),
        S && h.jsx("p", { role: "alert", children: S }),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsxs("p", { className: "saudacao", children: ["Olá, ", t] }),
        h.jsx("h2", {
          className: "explicacoes",
          children: "Explicações on-line",
        }),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("h2", { className: "cabecalhoCamaraLocal", children: t }),
        h.jsxs("div", {
          className: "camaraWrapper",
          children: [
            h.jsxs("div", {
              className: "localVideo",
              children: [
                h.jsx("video", {
                  ref: n,
                  autoPlay: !0,
                  muted: !0,
                  playsInline: !0,
                  style: { width: "300px", height: "200px" },
                }),
                w
                  ? h.jsx("button", { onClick: ye, children: "Parar gravação" })
                  : h.jsx("button", {
                      onClick: Ee,
                      disabled: w,
                      children: "Iniciar gravação",
                    }),
                h.jsx("button", {
                  type: "button",
                  onClick: () => le(!0),
                  children: "Ver gravações",
                }),
                K && h.jsx("p", { role: "alert", children: K }),
                h.jsx("button", { onClick: pe, children: "Partilhar ecrã" }),
              ],
            }),
            h.jsx("div", {
              className: "remoteCamaraContainer",
              children: ie.map((B) => {
                const oe = o[B.peerId];
                return (
                  oe &&
                  h.jsxs(
                    "div",
                    {
                      children: [
                        h.jsx("h2", {
                          className: "cabecalhoCamaraRemota",
                          children: B.nomeUtilizador,
                        }),
                        h.jsx("video", {
                          ref: (ce) => {
                            ce && oe && (ce.srcObject = oe);
                          },
                          autoPlay: !0,
                          playsInline: !0,
                          style: { width: "300px", height: "200px" },
                        }),
                      ],
                    },
                    B.peerId,
                  )
                );
              }),
            }),
          ],
        }),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsxs("h4", {
          className: "headLocalScreen",
          children: [" Partilha de ecrã de ", t],
        }),
        h.jsx("div", {
          className: "localScreen",
          children: h.jsx("video", {
            id: "local-shared-screen",
            autoPlay: !0,
            playsInline: !0,
            style: {
              width: "2000px",
              height: "2000px",
              position: "relative",
              top: "-350px",
              zIndex: "1",
              pointerEvents: "none",
            },
          }),
        }),
        ie.map((B) => {
          const oe = o[`screen-${B.peerId}`];
          return (
            oe &&
            h.jsxs(
              "div",
              {
                className: "remoteScreen",
                children: [
                  h.jsxs("h4", {
                    className: "headRemoteScreen",
                    children: [" ", "Partilha de ecrã de ", B.nomeUtilizador],
                  }),
                  h.jsx("video", {
                    ref: (ce) => {
                      ce && oe && (ce.srcObject = oe);
                    },
                    autoPlay: !0,
                    playsInline: !0,
                    style: {
                      width: "2000px",
                      height: "2000px",
                      border: "1 px solid black",
                      frameElement: "black",
                      position: "relative",
                      top: "-450px",
                      zIndex: "1",
                      pointerEvents: "none",
                    },
                  }),
                ],
              },
              `screen-${B.peerId}`,
            )
          );
        }),
        h.jsxs("div", {
          className: "chat",
          children: [
            u.map((B, oe) =>
              h.jsxs(
                "div",
                {
                  className: "chatBox",
                  children: [
                    h.jsxs("strong", { children: [B.sender, ": "] }),
                    "",
                    B.link
                      ? h.jsxs("a", {
                          href: B.link,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          children: [" ", B.link],
                        })
                      : B.text,
                  ],
                },
                oe,
              ),
            ),
            h.jsx("div", { ref: Z }),
            h.jsx("textarea", {
              className: "inputMessage",
              value: d,
              onChange: (B) => m(B.target.value),
              placeholder: "Mensagem",
            }),
            h.jsx("button", { onClick: Ne, children: "Enviar" }),
            h.jsx("input", {
              type: "file",
              onChange: (B) => l(B.target.files[0]),
            }),
            h.jsx("button", { onClick: ue, children: "Enviar Ficheiro" }),
          ],
        }),
        ae &&
          h.jsx("div", {
            onClick: (B) => {
              B.target === B.currentTarget && le(!1);
            },
            style: {
              position: "fixed",
              inset: 0,
              zIndex: 1e3,
              background: "rgba(0,0,0,0.65)",
              display: "grid",
              placeItems: "center",
              padding: 16,
            },
            children: h.jsxs("section", {
              role: "dialog",
              "aria-modal": "true",
              "aria-labelledby": "recordings-modal-title",
              style: {
                background: "white",
                color: "#222",
                width: "min(720px, 100%)",
                maxHeight: "90vh",
                overflowY: "auto",
                padding: 24,
                borderRadius: 8,
              },
              children: [
                h.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                  },
                  children: [
                    h.jsx("h2", {
                      id: "recordings-modal-title",
                      children: "Gravações",
                    }),
                    h.jsx("button", {
                      type: "button",
                      "aria-label": "Fechar gravações",
                      onClick: () => le(!1),
                      children: "Fechar",
                    }),
                  ],
                }),
                K && h.jsx("p", { role: "alert", children: K }),
                V
                  ? M.length === 0
                    ? h.jsx("p", {
                        children:
                          "Ainda não existem gravações guardadas nesta explicação.",
                      })
                    : h.jsx("ul", {
                        style: {
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          display: "grid",
                          gap: 16,
                        },
                        children: M.map((B) =>
                          h.jsxs(
                            "li",
                            {
                              style: {
                                borderTop: "1px solid #ddd",
                                paddingTop: 16,
                              },
                              children: [
                                h.jsxs("p", {
                                  children: [
                                    h.jsx("strong", { children: B.name }),
                                    h.jsx("br", {}),
                                    B.date,
                                  ],
                                }),
                                B.url
                                  ? h.jsxs(h.Fragment, {
                                      children: [
                                        h.jsx("video", {
                                          src: B.url,
                                          controls: !0,
                                          playsInline: !0,
                                          "aria-label": `Pré-visualização de ${B.name}`,
                                          style: {
                                            display: "block",
                                            width: "100%",
                                            maxHeight: 360,
                                            background: "#111",
                                          },
                                        }),
                                        h.jsx("a", {
                                          href: B.url,
                                          download: B.name,
                                          children: "Descarregar gravação",
                                        }),
                                      ],
                                    })
                                  : h.jsx("button", {
                                      type: "button",
                                      onClick: () => ne(B),
                                      children: "Carregar gravação",
                                    }),
                              ],
                            },
                            B.id,
                          ),
                        ),
                      })
                  : h.jsx("p", { children: "A carregar gravações..." }),
              ],
            }),
          }),
      ],
    });
  },
  MR = () => {
    const [e, t] = _.useState(""),
      [r, n] = _.useState(""),
      [o, a] = _.useState(null),
      [i, s] = _.useState([]),
      [l, u] = _.useState(1),
      c = 10,
      [d, m] = _.useState(""),
      v = _.useRef();
    _.useEffect(() => {
      const y = sessionStorage.getItem("emailUsuario"),
        w = sessionStorage.getItem("explicandoId");
      if (!y) {
        console.error("Nenhum email encontrado na sessão atual");
        return;
      }
      (w || m("Erro! Utilizador não autenticado"),
        de.get(`/explicandos/${y}`).then((T) => {
          (console.error("Resposta do backend:", T.data), t(T.data.nome));
        }),
        S());
    }, []);
    const S = () => {
        de.get("/forum").then((y) => {
          s(y.data);
        });
      },
      C = async (y) => {
        y.preventDefault();
        const w = new FormData();
        if (
          (w.append("mensagem", r),
          w.append("nome", e),
          o && w.append("ficheiro", o),
          !r && !o)
        ) {
          m(
            "Por favor, escreva uma mensagem ou selecione um ficheiro antes de enviar",
          );
          return;
        }
        (await de.post("/forum", w, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
          n(""),
          a(null),
          S(),
          m(""),
          n(""),
          v.current && (v.current.value = ""));
      },
      { items: k, totalPages: g } = fu(i, l, c);
    return h.jsxs("div", {
      children: [
        h.jsx(Un, {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsxs("p", { className: "saudacao", children: ["Olá, ", e] }),
        h.jsx("h2", { className: "explicacoes", children: "Fórum" }),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("p", {
          className: "forum",
          children:
            "Partilhe suas dúvidas, através de mensagens e ficheiros com a comunidade aqui no fórum que nós teremos todo o gosto em ajudar!",
        }),
        h.jsx("br", {}),
        h.jsxs("form", {
          className: "forumUtilizadores",
          onSubmit: C,
          children: [
            h.jsx("textarea", {
              className: "inputMessage",
              placeholder: "Escreva a sua mensagem...",
              value: r,
              onChange: (y) => n(y.target.value),
            }),
            h.jsx("br", {}),
            h.jsx("input", {
              className: "ficheiro",
              type: "file",
              ref: v,
              onChange: (y) => a(y.target.files[0]),
            }),
            h.jsx("br", {}),
            h.jsx("button", {
              className: "enviar",
              type: "submit",
              children: "Enviar",
            }),
          ],
        }),
        d &&
          h.jsx("p", {
            style: { color: "red", marginLeft: "50px" },
            children: d,
          }),
        h.jsx("br", {}),
        h.jsx("h3", {
          className: "tituloMensagens",
          children: "Mensagens no Fórum:",
        }),
        k.map((y, w) =>
          h.jsxs(
            "div",
            {
              className: "messageArea",
              style: { border: "1px solid gray" },
              children: [
                h.jsxs("p", {
                  className: "nomeRemetente",
                  children: [
                    h.jsxs("strong", { children: [y.nome, " "] }),
                    "escreveu em",
                    " ",
                    new Date(y.criadoEm).toLocaleString("pt-PT", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                    ":",
                  ],
                }),
                h.jsx("p", {
                  className: "mensagemForum",
                  children: y.mensagem,
                }),
                y.ficheiro &&
                  h.jsxs("p", {
                    className: "ficheiroForum",
                    children: [
                      "Ficheiro:",
                      h.jsx("a", {
                        href: `${ni}/uploads/${y.ficheiro}`,
                        download: !0,
                        children: y.ficheiro,
                      }),
                    ],
                  }),
              ],
            },
            w,
          ),
        ),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx("br", {}),
        h.jsx(hu, { currentPage: l, totalPages: g, setCurrentPage: u }),
      ],
    });
  };
var Qw = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  tg = I.createContext && I.createContext(Qw),
  IR = ["attr", "size", "title"];
function jR(e, t) {
  if (e == null) return {};
  var r,
    n,
    o = LR(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++)
      ((r = a[n]),
        t.indexOf(r) === -1 &&
          {}.propertyIsEnumerable.call(e, r) &&
          (o[r] = e[r]));
  }
  return o;
}
function LR(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e)
    if ({}.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) !== -1) continue;
      r[n] = e[n];
    }
  return r;
}
function Ll() {
  return (
    (Ll = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
          }
          return e;
        }),
    Ll.apply(null, arguments)
  );
}
function rg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    (t &&
      (n = n.filter(function (o) {
        return Object.getOwnPropertyDescriptor(e, o).enumerable;
      })),
      r.push.apply(r, n));
  }
  return r;
}
function Al(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? rg(Object(r), !0).forEach(function (n) {
          AR(e, n, r[n]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
        : rg(Object(r)).forEach(function (n) {
            Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
          });
  }
  return e;
}
function AR(e, t, r) {
  return (
    (t = FR(t)) in e
      ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = r),
    e
  );
}
function FR(e) {
  var t = BR(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function BR(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Kw(e) {
  return (
    e &&
    e.map((t, r) => I.createElement(t.tag, Al({ key: r }, t.attr), Kw(t.child)))
  );
}
function gu(e) {
  return (t) =>
    I.createElement(UR, Ll({ attr: Al({}, e.attr) }, t), Kw(e.child));
}
function UR(e) {
  var t = (r) => {
    var { attr: n, size: o, title: a } = e,
      i = jR(e, IR),
      s = o || r.size || "1em",
      l;
    return (
      r.className && (l = r.className),
      e.className && (l = (l ? l + " " : "") + e.className),
      I.createElement(
        "svg",
        Ll(
          { stroke: "currentColor", fill: "currentColor", strokeWidth: "0" },
          r.attr,
          n,
          i,
          {
            className: l,
            style: Al(Al({ color: e.color || r.color }, r.style), e.style),
            height: s,
            width: s,
            xmlns: "http://www.w3.org/2000/svg",
          },
        ),
        a && I.createElement("title", null, a),
        e.children,
      )
    );
  };
  return tg !== void 0
    ? I.createElement(tg.Consumer, null, (r) => t(r))
    : t(Qw);
}
function $R(e) {
  return gu({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z",
        },
        child: [],
      },
    ],
  })(e);
}
function YR(e) {
  return gu({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z",
        },
        child: [],
      },
    ],
  })(e);
}
function zR(e) {
  return gu({
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z",
        },
        child: [],
      },
    ],
  })(e);
}
function HR(e) {
  return gu({
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z",
        },
        child: [],
      },
    ],
  })(e);
}
const WR = () => {
    const [e, t] = _.useState(""),
      [, r] = _.useState("");
    return (
      _.useEffect(() => {
        const n = sessionStorage.getItem("emailUsuario"),
          o = sessionStorage.getItem("explicandoId");
        if (!n) {
          console.error("Nenhum email encontrado na sessão atual");
          return;
        }
        (o || r("Erro! Utilizador não autenticado"),
          de
            .get(`/explicandos/${n}`)
            .then((a) => {
              (console.error("Resposta do backend:", a.data), t(a.data.nome));
            })
            .catch((a) => console.error("Erro ao obter o explicando:", a)));
      }, []),
      h.jsxs("div", {
        children: [
          h.jsx(Un, {}),
          h.jsx("br", {}),
          h.jsx("br", {}),
          h.jsx("br", {}),
          h.jsx("br", {}),
          h.jsxs("p", { className: "saudacao", children: ["Olá, ", e] }),
          h.jsx("h2", { className: "explicacoes", children: "Contactos" }),
          h.jsx("br", {}),
          h.jsx("br", {}),
          h.jsxs("div", {
            className: "container",
            children: [
              h.jsxs("div", {
                className: "coluna",
                children: [
                  h.jsxs("p", {
                    children: [
                      h.jsx("strong", { children: "Nome:" }),
                      " Ana Catarina Nascimento Matias Silva",
                    ],
                  }),
                  h.jsxs("p", {
                    children: [
                      h.jsx("strong", { children: "Morada:" }),
                      " Rua Padre Matos nº1 6400-449 Pinhel (Guarda)",
                    ],
                  }),
                  h.jsxs("p", {
                    children: [
                      h.jsx("strong", { children: "Telefone:" }),
                      " 917071858",
                    ],
                  }),
                  h.jsxs("p", {
                    children: [
                      h.jsx("strong", { children: "Email:" }),
                      " anasilva_pinhel@hotmail.com",
                    ],
                  }),
                ],
              }),
              h.jsxs("div", {
                className: "coluna",
                children: [
                  h.jsx("h2", { children: "Localização" }),
                  h.jsx("iframe", {
                    title: "Google Maps",
                    className: "mapa",
                    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.384647508261!2d-7.073451924498266!3d40.775557133723105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd3c6049ce37a6ad%3A0x89412a70f8bc1b5b!2sR.%20Padre%20Matos%2C%20Pinhel!5e0!3m2!1spt-PT!2spt!4v1746741767189!5m2!1spt-PT!2spt",
                    width: "600",
                    height: "450",
                    allowFullscreen: "",
                    loading: "lazy",
                    referrerPolicy: "no-referrer-when-downgrade",
                  }),
                  h.jsxs("div", {
                    className: "redesSociais",
                    children: [
                      h.jsxs("div", {
                        className: "rede",
                        children: [
                          h.jsx($R, { size: 30, color: "#25D366" }),
                          h.jsx("a", {
                            href: "https://wa.me/351917071858",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            children: "WhatsApp",
                          }),
                        ],
                      }),
                      h.jsxs("div", {
                        className: "rede",
                        children: [
                          h.jsx(YR, { size: 30, color: "#25D366" }),
                          h.jsx("a", {
                            href: "https://www.linkedin.com/in/ana-silva-24ab7394/",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            children: "LinkedIn",
                          }),
                        ],
                      }),
                      h.jsxs("div", {
                        className: "rede",
                        children: [
                          h.jsx(HR, { size: 30, color: "#1877F2" }),
                          h.jsx("a", {
                            href: "https://www.facebook.com/anasilva.pinhel?locale=pt_PT",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            children: "Facebook",
                          }),
                        ],
                      }),
                      h.jsxs("div", {
                        className: "rede",
                        children: [
                          h.jsx(zR, { size: 30, color: "#C13584" }),
                          h.jsx("a", {
                            href: "https://www.instagram.com/anasilva_pinhel/",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            children: "Instagram",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );
  },
  VR = () => (
    _.useEffect(() => {
      document.title = "Ana Silva-Explicações";
    }, []),
    h.jsx(XC, {
      children: h.jsxs(DC, {
        children: [
          h.jsx(It, { path: "/", element: h.jsx(oR, {}) }),
          h.jsx(It, { path: "/Registo", element: h.jsx(sk, {}) }),
          h.jsx(It, { path: "/Explicacoes", element: h.jsx(tR, {}) }),
          h.jsx(It, { path: "/Multibanco", element: h.jsx(JP, {}) }),
          h.jsx(It, { path: "/TransferenciaBancaria", element: h.jsx(ZP, {}) }),
          h.jsx(It, { path: "/MBWay", element: h.jsx(eR, {}) }),
          h.jsx(It, { path: "/ExplicacoesPendentes", element: h.jsx(aR, {}) }),
          h.jsx(It, {
            path: "/ExplicacoesConfirmadasExplicador",
            element: h.jsx(iR, {}),
          }),
          h.jsx(It, {
            path: "/ExplicacoesConfirmadasExplicando",
            element: h.jsx(lR, {}),
          }),
          h.jsx(It, { path: "/ExplicacoesOnline", element: h.jsx(eg, {}) }),
          h.jsx(It, {
            path: "/ExplicacoesOnline/:explicacaoId",
            element: h.jsx(eg, {}),
          }),
          h.jsx(It, { path: "/Forum", element: h.jsx(MR, {}) }),
          h.jsx(It, { path: "/Contactos", element: h.jsx(WR, {}) }),
          h.jsx(It, { path: "/EditarExplicacao/:id", element: h.jsx(sR, {}) }),
        ],
      }),
    })
  ),
  qR = hc.createRoot(document.getElementById("root"));
qR.render(h.jsx(I.StrictMode, { children: h.jsx(VR, {}) }));
