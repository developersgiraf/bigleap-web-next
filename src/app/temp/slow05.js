(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [718],
  {
    2900: (t, e, i) => {
      "use strict";
      let n;
      i.d(e, { P: () => sc });
      var r = i(2115);
      let s = [
          "transformPerspective",
          "x",
          "y",
          "z",
          "translateX",
          "translateY",
          "translateZ",
          "scale",
          "scaleX",
          "scaleY",
          "rotate",
          "rotateX",
          "rotateY",
          "rotateZ",
          "skew",
          "skewX",
          "skewY",
        ],
        o = new Set(s),
        a = (t) => (180 * t) / Math.PI,
        l = (t) => u(a(Math.atan2(t[1], t[0]))),
        h = {
          x: 4,
          y: 5,
          translateX: 4,
          translateY: 5,
          scaleX: 0,
          scaleY: 3,
          scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
          rotate: l,
          rotateZ: l,
          skewX: (t) => a(Math.atan(t[1])),
          skewY: (t) => a(Math.atan(t[2])),
          skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2,
        },
        u = (t) => ((t %= 360) < 0 && (t += 360), t),
        c = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]),
        f = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]),
        p = {
          x: 12,
          y: 13,
          z: 14,
          translateX: 12,
          translateY: 13,
          translateZ: 14,
          scaleX: c,
          scaleY: f,
          scale: (t) => (c(t) + f(t)) / 2,
          rotateX: (t) => u(a(Math.atan2(t[6], t[5]))),
          rotateY: (t) => u(a(Math.atan2(-t[2], t[0]))),
          rotateZ: l,
          rotate: l,
          skewX: (t) => a(Math.atan(t[4])),
          skewY: (t) => a(Math.atan(t[1])),
          skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2,
        };
      function d(t) {
        return +!!t.includes("scale");
      }
      function m(t, e) {
        let i, n;
        if (!t || "none" === t) return d(e);
        let r = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
        if (r) (i = p), (n = r);
        else {
          let e = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
          (i = h), (n = e);
        }
        if (!n) return d(e);
        let s = i[e],
          o = n[1].split(",").map(y);
        return "function" == typeof s ? s(o) : o[s];
      }
      function y(t) {
        return parseFloat(t.trim());
      }
      let g = (t) => (e) => "string" == typeof e && e.startsWith(t),
        v = g("--"),
        x = g("var(--"),
        w = (t) => !!x(t) && b.test(t.split("/*")[0].trim()),
        b =
          /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
      function T({ top: t, left: e, right: i, bottom: n }) {
        return { x: { min: e, max: i }, y: { min: t, max: n } };
      }
      let A = (t, e, i) => t + (e - t) * i;
      function P(t) {
        return void 0 === t || 1 === t;
      }
      function S({ scale: t, scaleX: e, scaleY: i }) {
        return !P(t) || !P(e) || !P(i);
      }
      function E(t) {
        return (
          S(t) ||
          M(t) ||
          t.z ||
          t.rotate ||
          t.rotateX ||
          t.rotateY ||
          t.skewX ||
          t.skewY
        );
      }
      function M(t) {
        var e, i;
        return ((e = t.x) && "0%" !== e) || ((i = t.y) && "0%" !== i);
      }
      function C(t, e, i, n, r) {
        return void 0 !== r && (t = n + r * (t - n)), n + i * (t - n) + e;
      }
      function V(t, e = 0, i = 1, n, r) {
        (t.min = C(t.min, e, i, n, r)), (t.max = C(t.max, e, i, n, r));
      }
      function k(t, { x: e, y: i }) {
        V(t.x, e.translate, e.scale, e.originPoint),
          V(t.y, i.translate, i.scale, i.originPoint);
      }
      function D(t, e) {
        (t.min = t.min + e), (t.max = t.max + e);
      }
      function R(t, e, i, n, r = 0.5) {
        let s = A(t.min, t.max, r);
        V(t, e, i, s, n);
      }
      function B(t, e) {
        R(t.x, e.x, e.scaleX, e.scale, e.originX),
          R(t.y, e.y, e.scaleY, e.scale, e.originY);
      }
      function L(t, e) {
        return T(
          (function (t, e) {
            if (!e) return t;
            let i = e({ x: t.left, y: t.top }),
              n = e({ x: t.right, y: t.bottom });
            return { top: i.y, left: i.x, bottom: n.y, right: n.x };
          })(t.getBoundingClientRect(), e)
        );
      }
      let j = new Set([
          "width",
          "height",
          "top",
          "left",
          "right",
          "bottom",
          ...s,
        ]),
        F = (t, e, i) => (i > e ? e : i < t ? t : i),
        I = {
          test: (t) => "number" == typeof t,
          parse: parseFloat,
          transform: (t) => t,
        },
        O = { ...I, transform: (t) => F(0, 1, t) },
        U = { ...I, default: 1 },
        N = (t) => ({
          test: (e) =>
            "string" == typeof e && e.endsWith(t) && 1 === e.split(" ").length,
          parse: parseFloat,
          transform: (e) => `${e}${t}`,
        }),
        W = N("deg"),
        $ = N("%"),
        z = N("px"),
        Y = N("vh"),
        X = N("vw"),
        H = {
          ...$,
          parse: (t) => $.parse(t) / 100,
          transform: (t) => $.transform(100 * t),
        },
        _ = (t) => (e) => e.test(t),
        K = [I, z, $, W, X, Y, { test: (t) => "auto" === t, parse: (t) => t }],
        q = (t) => K.find(_(t)),
        G = () => {},
        Z = () => {},
        J = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t),
        Q = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u,
        tt = (t) => t === I || t === z,
        te = new Set(["x", "y", "z"]),
        ti = s.filter((t) => !te.has(t)),
        tn = {
          width: ({ x: t }, { paddingLeft: e = "0", paddingRight: i = "0" }) =>
            t.max - t.min - parseFloat(e) - parseFloat(i),
          height: ({ y: t }, { paddingTop: e = "0", paddingBottom: i = "0" }) =>
            t.max - t.min - parseFloat(e) - parseFloat(i),
          top: (t, { top: e }) => parseFloat(e),
          left: (t, { left: e }) => parseFloat(e),
          bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
          right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
          x: (t, { transform: e }) => m(e, "x"),
          y: (t, { transform: e }) => m(e, "y"),
        };
      (tn.translateX = tn.x), (tn.translateY = tn.y);
      let tr = (t) => t,
        ts = {},
        to = [
          "setup",
          "read",
          "resolveKeyframes",
          "preUpdate",
          "update",
          "preRender",
          "render",
          "postRender",
        ],
        ta = { value: null, addProjectionMetrics: null };
      function tl(t, e) {
        let i = !1,
          n = !0,
          r = { delta: 0, timestamp: 0, isProcessing: !1 },
          s = () => (i = !0),
          o = to.reduce(
            (t, i) => (
              (t[i] = (function (t, e) {
                let i = new Set(),
                  n = new Set(),
                  r = !1,
                  s = !1,
                  o = new WeakSet(),
                  a = { delta: 0, timestamp: 0, isProcessing: !1 },
                  l = 0;
                function h(e) {
                  o.has(e) && (u.schedule(e), t()), l++, e(a);
                }
                let u = {
                  schedule: (t, e = !1, s = !1) => {
                    let a = s && r ? i : n;
                    return e && o.add(t), a.has(t) || a.add(t), t;
                  },
                  cancel: (t) => {
                    n.delete(t), o.delete(t);
                  },
                  process: (t) => {
                    if (((a = t), r)) {
                      s = !0;
                      return;
                    }
                    (r = !0),
                      ([i, n] = [n, i]),
                      i.forEach(h),
                      e && ta.value && ta.value.frameloop[e].push(l),
                      (l = 0),
                      i.clear(),
                      (r = !1),
                      s && ((s = !1), u.process(t));
                  },
                };
                return u;
              })(s, e ? i : void 0)),
              t
            ),
            {}
          ),
          {
            setup: a,
            read: l,
            resolveKeyframes: h,
            preUpdate: u,
            update: c,
            preRender: f,
            render: p,
            postRender: d,
          } = o,
          m = () => {
            let s = ts.useManualTiming ? r.timestamp : performance.now();
            (i = !1),
              ts.useManualTiming ||
                (r.delta = n
                  ? 1e3 / 60
                  : Math.max(Math.min(s - r.timestamp, 40), 1)),
              (r.timestamp = s),
              (r.isProcessing = !0),
              a.process(r),
              l.process(r),
              h.process(r),
              u.process(r),
              c.process(r),
              f.process(r),
              p.process(r),
              d.process(r),
              (r.isProcessing = !1),
              i && e && ((n = !1), t(m));
          };
        return {
          schedule: to.reduce((e, s) => {
            let a = o[s];
            return (
              (e[s] = (e, s = !1, o = !1) => (
                !i && ((i = !0), (n = !0), r.isProcessing || t(m)),
                a.schedule(e, s, o)
              )),
              e
            );
          }, {}),
          cancel: (t) => {
            for (let e = 0; e < to.length; e++) o[to[e]].cancel(t);
          },
          state: r,
          steps: o,
        };
      }
      let {
          schedule: th,
          cancel: tu,
          state: tc,
          steps: tf,
        } = tl(
          "undefined" != typeof requestAnimationFrame
            ? requestAnimationFrame
            : tr,
          !0
        ),
        tp = new Set(),
        td = !1,
        tm = !1,
        ty = !1;
      function tg() {
        if (tm) {
          let t = Array.from(tp).filter((t) => t.needsMeasurement),
            e = new Set(t.map((t) => t.element)),
            i = new Map();
          e.forEach((t) => {
            let e = (function (t) {
              let e = [];
              return (
                ti.forEach((i) => {
                  let n = t.getValue(i);
                  void 0 !== n &&
                    (e.push([i, n.get()]), n.set(+!!i.startsWith("scale")));
                }),
                e
              );
            })(t);
            e.length && (i.set(t, e), t.render());
          }),
            t.forEach((t) => t.measureInitialState()),
            e.forEach((t) => {
              t.render();
              let e = i.get(t);
              e &&
                e.forEach(([e, i]) => {
                  t.getValue(e)?.set(i);
                });
            }),
            t.forEach((t) => t.measureEndState()),
            t.forEach((t) => {
              void 0 !== t.suspendedScrollY &&
                window.scrollTo(0, t.suspendedScrollY);
            });
        }
        (tm = !1), (td = !1), tp.forEach((t) => t.complete(ty)), tp.clear();
      }
      function tv() {
        tp.forEach((t) => {
          t.readKeyframes(), t.needsMeasurement && (tm = !0);
        });
      }
      class tx {
        constructor(t, e, i, n, r, s = !1) {
          (this.state = "pending"),
            (this.isAsync = !1),
            (this.needsMeasurement = !1),
            (this.unresolvedKeyframes = [...t]),
            (this.onComplete = e),
            (this.name = i),
            (this.motionValue = n),
            (this.element = r),
            (this.isAsync = s);
        }
        scheduleResolve() {
          (this.state = "scheduled"),
            this.isAsync
              ? (tp.add(this),
                td || ((td = !0), th.read(tv), th.resolveKeyframes(tg)))
              : (this.readKeyframes(), this.complete());
        }
        readKeyframes() {
          let {
            unresolvedKeyframes: t,
            name: e,
            element: i,
            motionValue: n,
          } = this;
          if (null === t[0]) {
            let r = n?.get(),
              s = t[t.length - 1];
            if (void 0 !== r) t[0] = r;
            else if (i && e) {
              let n = i.readValue(e, s);
              null != n && (t[0] = n);
            }
            void 0 === t[0] && (t[0] = s), n && void 0 === r && n.set(t[0]);
          }
          for (let e = 1; e < t.length; e++) t[e] ?? (t[e] = t[e - 1]);
        }
        setFinalKeyframe() {}
        measureInitialState() {}
        renderEndStyles() {}
        measureEndState() {}
        complete(t = !1) {
          (this.state = "complete"),
            this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t),
            tp.delete(this);
        }
        cancel() {
          "scheduled" === this.state &&
            (tp.delete(this), (this.state = "pending"));
        }
        resume() {
          "pending" === this.state && this.scheduleResolve();
        }
      }
      let tw = (t) => /^0[^.\s]+$/u.test(t),
        tb = (t) => Math.round(1e5 * t) / 1e5,
        tT = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu,
        tA =
          /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
        tP = (t, e) => (i) =>
          !!(
            ("string" == typeof i && tA.test(i) && i.startsWith(t)) ||
            (e && null != i && Object.prototype.hasOwnProperty.call(i, e))
          ),
        tS = (t, e, i) => (n) => {
          if ("string" != typeof n) return n;
          let [r, s, o, a] = n.match(tT);
          return {
            [t]: parseFloat(r),
            [e]: parseFloat(s),
            [i]: parseFloat(o),
            alpha: void 0 !== a ? parseFloat(a) : 1,
          };
        },
        tE = { ...I, transform: (t) => Math.round(F(0, 255, t)) },
        tM = {
          test: tP("rgb", "red"),
          parse: tS("red", "green", "blue"),
          transform: ({ red: t, green: e, blue: i, alpha: n = 1 }) =>
            "rgba(" +
            tE.transform(t) +
            ", " +
            tE.transform(e) +
            ", " +
            tE.transform(i) +
            ", " +
            tb(O.transform(n)) +
            ")",
        },
        tC = {
          test: tP("#"),
          parse: function (t) {
            let e = "",
              i = "",
              n = "",
              r = "";
            return (
              t.length > 5
                ? ((e = t.substring(1, 3)),
                  (i = t.substring(3, 5)),
                  (n = t.substring(5, 7)),
                  (r = t.substring(7, 9)))
                : ((e = t.substring(1, 2)),
                  (i = t.substring(2, 3)),
                  (n = t.substring(3, 4)),
                  (r = t.substring(4, 5)),
                  (e += e),
                  (i += i),
                  (n += n),
                  (r += r)),
              {
                red: parseInt(e, 16),
                green: parseInt(i, 16),
                blue: parseInt(n, 16),
                alpha: r ? parseInt(r, 16) / 255 : 1,
              }
            );
          },
          transform: tM.transform,
        },
        tV = {
          test: tP("hsl", "hue"),
          parse: tS("hue", "saturation", "lightness"),
          transform: ({ hue: t, saturation: e, lightness: i, alpha: n = 1 }) =>
            "hsla(" +
            Math.round(t) +
            ", " +
            $.transform(tb(e)) +
            ", " +
            $.transform(tb(i)) +
            ", " +
            tb(O.transform(n)) +
            ")",
        },
        tk = {
          test: (t) => tM.test(t) || tC.test(t) || tV.test(t),
          parse: (t) =>
            tM.test(t) ? tM.parse(t) : tV.test(t) ? tV.parse(t) : tC.parse(t),
          transform: (t) =>
            "string" == typeof t
              ? t
              : t.hasOwnProperty("red")
              ? tM.transform(t)
              : tV.transform(t),
          getAnimatableNone: (t) => {
            let e = tk.parse(t);
            return (e.alpha = 0), tk.transform(e);
          },
        },
        tD =
          /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu,
        tR = "number",
        tB = "color",
        tL =
          /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
      function tj(t) {
        let e = t.toString(),
          i = [],
          n = { color: [], number: [], var: [] },
          r = [],
          s = 0,
          o = e
            .replace(
              tL,
              (t) => (
                tk.test(t)
                  ? (n.color.push(s), r.push(tB), i.push(tk.parse(t)))
                  : t.startsWith("var(")
                  ? (n.var.push(s), r.push("var"), i.push(t))
                  : (n.number.push(s), r.push(tR), i.push(parseFloat(t))),
                ++s,
                "${}"
              )
            )
            .split("${}");
        return { values: i, split: o, indexes: n, types: r };
      }
      function tF(t) {
        return tj(t).values;
      }
      function tI(t) {
        let { split: e, types: i } = tj(t),
          n = e.length;
        return (t) => {
          let r = "";
          for (let s = 0; s < n; s++)
            if (((r += e[s]), void 0 !== t[s])) {
              let e = i[s];
              e === tR
                ? (r += tb(t[s]))
                : e === tB
                ? (r += tk.transform(t[s]))
                : (r += t[s]);
            }
          return r;
        };
      }
      let tO = (t) =>
          "number" == typeof t ? 0 : tk.test(t) ? tk.getAnimatableNone(t) : t,
        tU = {
          test: function (t) {
            return (
              isNaN(t) &&
              "string" == typeof t &&
              (t.match(tT)?.length || 0) + (t.match(tD)?.length || 0) > 0
            );
          },
          parse: tF,
          createTransformer: tI,
          getAnimatableNone: function (t) {
            let e = tF(t);
            return tI(t)(e.map(tO));
          },
        },
        tN = new Set(["brightness", "contrast", "saturate", "opacity"]);
      function tW(t) {
        let [e, i] = t.slice(0, -1).split("(");
        if ("drop-shadow" === e) return t;
        let [n] = i.match(tT) || [];
        if (!n) return t;
        let r = i.replace(n, ""),
          s = +!!tN.has(e);
        return n !== i && (s *= 100), e + "(" + s + r + ")";
      }
      let t$ = /\b([a-z-]*)\(.*?\)/gu,
        tz = {
          ...tU,
          getAnimatableNone: (t) => {
            let e = t.match(t$);
            return e ? e.map(tW).join(" ") : t;
          },
        },
        tY = { ...I, transform: Math.round },
        tX = {
          borderWidth: z,
          borderTopWidth: z,
          borderRightWidth: z,
          borderBottomWidth: z,
          borderLeftWidth: z,
          borderRadius: z,
          radius: z,
          borderTopLeftRadius: z,
          borderTopRightRadius: z,
          borderBottomRightRadius: z,
          borderBottomLeftRadius: z,
          width: z,
          maxWidth: z,
          height: z,
          maxHeight: z,
          top: z,
          right: z,
          bottom: z,
          left: z,
          padding: z,
          paddingTop: z,
          paddingRight: z,
          paddingBottom: z,
          paddingLeft: z,
          margin: z,
          marginTop: z,
          marginRight: z,
          marginBottom: z,
          marginLeft: z,
          backgroundPositionX: z,
          backgroundPositionY: z,
          rotate: W,
          rotateX: W,
          rotateY: W,
          rotateZ: W,
          scale: U,
          scaleX: U,
          scaleY: U,
          scaleZ: U,
          skew: W,
          skewX: W,
          skewY: W,
          distance: z,
          translateX: z,
          translateY: z,
          translateZ: z,
          x: z,
          y: z,
          z: z,
          perspective: z,
          transformPerspective: z,
          opacity: O,
          originX: H,
          originY: H,
          originZ: z,
          zIndex: tY,
          fillOpacity: O,
          strokeOpacity: O,
          numOctaves: tY,
        },
        tH = {
          ...tX,
          color: tk,
          backgroundColor: tk,
          outlineColor: tk,
          fill: tk,
          stroke: tk,
          borderColor: tk,
          borderTopColor: tk,
          borderRightColor: tk,
          borderBottomColor: tk,
          borderLeftColor: tk,
          filter: tz,
          WebkitFilter: tz,
        },
        t_ = (t) => tH[t];
      function tK(t, e) {
        let i = t_(t);
        return (
          i !== tz && (i = tU),
          i.getAnimatableNone ? i.getAnimatableNone(e) : void 0
        );
      }
      let tq = new Set(["auto", "none", "0"]);
      class tG extends tx {
        constructor(t, e, i, n, r) {
          super(t, e, i, n, r, !0);
        }
        readKeyframes() {
          let { unresolvedKeyframes: t, element: e, name: i } = this;
          if (!e || !e.current) return;
          super.readKeyframes();
          for (let i = 0; i < t.length; i++) {
            let n = t[i];
            if ("string" == typeof n && w((n = n.trim()))) {
              let r = (function t(e, i, n = 1) {
                Z(
                  n <= 4,
                  `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`,
                  "max-css-var-depth"
                );
                let [r, s] = (function (t) {
                  let e = Q.exec(t);
                  if (!e) return [,];
                  let [, i, n, r] = e;
                  return [`--${i ?? n}`, r];
                })(e);
                if (!r) return;
                let o = window.getComputedStyle(i).getPropertyValue(r);
                if (o) {
                  let t = o.trim();
                  return J(t) ? parseFloat(t) : t;
                }
                return w(s) ? t(s, i, n + 1) : s;
              })(n, e.current);
              void 0 !== r && (t[i] = r),
                i === t.length - 1 && (this.finalKeyframe = n);
            }
          }
          if ((this.resolveNoneKeyframes(), !j.has(i) || 2 !== t.length))
            return;
          let [n, r] = t,
            s = q(n),
            o = q(r);
          if (s !== o)
            if (tt(s) && tt(o))
              for (let e = 0; e < t.length; e++) {
                let i = t[e];
                "string" == typeof i && (t[e] = parseFloat(i));
              }
            else tn[i] && (this.needsMeasurement = !0);
        }
        resolveNoneKeyframes() {
          let { unresolvedKeyframes: t, name: e } = this,
            i = [];
          for (let e = 0; e < t.length; e++) {
            var n;
            (null === t[e] ||
              ("number" == typeof (n = t[e])
                ? 0 === n
                : null === n || "none" === n || "0" === n || tw(n))) &&
              i.push(e);
          }
          i.length &&
            (function (t, e, i) {
              let n,
                r = 0;
              for (; r < t.length && !n; ) {
                let e = t[r];
                "string" == typeof e &&
                  !tq.has(e) &&
                  tj(e).values.length &&
                  (n = t[r]),
                  r++;
              }
              if (n && i) for (let r of e) t[r] = tK(i, n);
            })(t, i, e);
        }
        measureInitialState() {
          let { element: t, unresolvedKeyframes: e, name: i } = this;
          if (!t || !t.current) return;
          "height" === i && (this.suspendedScrollY = window.pageYOffset),
            (this.measuredOrigin = tn[i](
              t.measureViewportBox(),
              window.getComputedStyle(t.current)
            )),
            (e[0] = this.measuredOrigin);
          let n = e[e.length - 1];
          void 0 !== n && t.getValue(i, n).jump(n, !1);
        }
        measureEndState() {
          let { element: t, name: e, unresolvedKeyframes: i } = this;
          if (!t || !t.current) return;
          let n = t.getValue(e);
          n && n.jump(this.measuredOrigin, !1);
          let r = i.length - 1,
            s = i[r];
          (i[r] = tn[e](
            t.measureViewportBox(),
            window.getComputedStyle(t.current)
          )),
            null !== s &&
              void 0 === this.finalKeyframe &&
              (this.finalKeyframe = s),
            this.removedTransforms?.length &&
              this.removedTransforms.forEach(([e, i]) => {
                t.getValue(e).set(i);
              }),
            this.resolveNoneKeyframes();
        }
      }
      let tZ = (t) => !!(t && t.getVelocity);
      function tJ() {
        n = void 0;
      }
      let tQ = {
        now: () => (
          void 0 === n &&
            tQ.set(
              tc.isProcessing || ts.useManualTiming
                ? tc.timestamp
                : performance.now()
            ),
          n
        ),
        set: (t) => {
          (n = t), queueMicrotask(tJ);
        },
      };
      function t0(t, e) {
        -1 === t.indexOf(e) && t.push(e);
      }
      function t1(t, e) {
        let i = t.indexOf(e);
        i > -1 && t.splice(i, 1);
      }
      class t2 {
        constructor() {
          this.subscriptions = [];
        }
        add(t) {
          return t0(this.subscriptions, t), () => t1(this.subscriptions, t);
        }
        notify(t, e, i) {
          let n = this.subscriptions.length;
          if (n)
            if (1 === n) this.subscriptions[0](t, e, i);
            else
              for (let r = 0; r < n; r++) {
                let n = this.subscriptions[r];
                n && n(t, e, i);
              }
        }
        getSize() {
          return this.subscriptions.length;
        }
        clear() {
          this.subscriptions.length = 0;
        }
      }
      let t5 = { current: void 0 };
      class t3 {
        constructor(t, e = {}) {
          (this.canTrackVelocity = null),
            (this.events = {}),
            (this.updateAndNotify = (t) => {
              let e = tQ.now();
              if (
                (this.updatedAt !== e && this.setPrevFrameValue(),
                (this.prev = this.current),
                this.setCurrent(t),
                this.current !== this.prev &&
                  (this.events.change?.notify(this.current), this.dependents))
              )
                for (let t of this.dependents) t.dirty();
            }),
            (this.hasAnimated = !1),
            this.setCurrent(t),
            (this.owner = e.owner);
        }
        setCurrent(t) {
          (this.current = t),
            (this.updatedAt = tQ.now()),
            null === this.canTrackVelocity &&
              void 0 !== t &&
              (this.canTrackVelocity = !isNaN(parseFloat(this.current)));
        }
        setPrevFrameValue(t = this.current) {
          (this.prevFrameValue = t), (this.prevUpdatedAt = this.updatedAt);
        }
        onChange(t) {
          return this.on("change", t);
        }
        on(t, e) {
          this.events[t] || (this.events[t] = new t2());
          let i = this.events[t].add(e);
          return "change" === t
            ? () => {
                i(),
                  th.read(() => {
                    this.events.change.getSize() || this.stop();
                  });
              }
            : i;
        }
        clearListeners() {
          for (let t in this.events) this.events[t].clear();
        }
        attach(t, e) {
          (this.passiveEffect = t), (this.stopPassiveEffect = e);
        }
        set(t) {
          this.passiveEffect
            ? this.passiveEffect(t, this.updateAndNotify)
            : this.updateAndNotify(t);
        }
        setWithVelocity(t, e, i) {
          this.set(e),
            (this.prev = void 0),
            (this.prevFrameValue = t),
            (this.prevUpdatedAt = this.updatedAt - i);
        }
        jump(t, e = !0) {
          this.updateAndNotify(t),
            (this.prev = t),
            (this.prevUpdatedAt = this.prevFrameValue = void 0),
            e && this.stop(),
            this.stopPassiveEffect && this.stopPassiveEffect();
        }
        dirty() {
          this.events.change?.notify(this.current);
        }
        addDependent(t) {
          this.dependents || (this.dependents = new Set()),
            this.dependents.add(t);
        }
        removeDependent(t) {
          this.dependents && this.dependents.delete(t);
        }
        get() {
          return t5.current && t5.current.push(this), this.current;
        }
        getPrevious() {
          return this.prev;
        }
        getVelocity() {
          var t;
          let e = tQ.now();
          if (
            !this.canTrackVelocity ||
            void 0 === this.prevFrameValue ||
            e - this.updatedAt > 30
          )
            return 0;
          let i = Math.min(this.updatedAt - this.prevUpdatedAt, 30);
          return (
            (t = parseFloat(this.current) - parseFloat(this.prevFrameValue)),
            i ? (1e3 / i) * t : 0
          );
        }
        start(t) {
          return (
            this.stop(),
            new Promise((e) => {
              (this.hasAnimated = !0),
                (this.animation = t(e)),
                this.events.animationStart &&
                  this.events.animationStart.notify();
            }).then(() => {
              this.events.animationComplete &&
                this.events.animationComplete.notify(),
                this.clearAnimation();
            })
          );
        }
        stop() {
          this.animation &&
            (this.animation.stop(),
            this.events.animationCancel &&
              this.events.animationCancel.notify()),
            this.clearAnimation();
        }
        isAnimating() {
          return !!this.animation;
        }
        clearAnimation() {
          delete this.animation;
        }
        destroy() {
          this.dependents?.clear(),
            this.events.destroy?.notify(),
            this.clearListeners(),
            this.stop(),
            this.stopPassiveEffect && this.stopPassiveEffect();
        }
      }
      function t6(t, e) {
        return new t3(t, e);
      }
      let t8 = [...K, tk, tU],
        { schedule: t4 } = tl(queueMicrotask, !1),
        t9 = {
          animation: [
            "animate",
            "variants",
            "whileHover",
            "whileTap",
            "exit",
            "whileInView",
            "whileFocus",
            "whileDrag",
          ],
          exit: ["exit"],
          drag: ["drag", "dragControls"],
          focus: ["whileFocus"],
          hover: ["whileHover", "onHoverStart", "onHoverEnd"],
          tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
          pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
          inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
          layout: ["layout", "layoutId"],
        },
        t7 = {};
      for (let t in t9) t7[t] = { isEnabled: (e) => t9[t].some((t) => !!e[t]) };
      let et = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
        ee = () => ({ x: et(), y: et() }),
        ei = () => ({ min: 0, max: 0 }),
        en = () => ({ x: ei(), y: ei() }),
        er = "undefined" != typeof window,
        es = { current: null },
        eo = { current: !1 },
        ea = new WeakMap();
      function el(t) {
        return (
          null !== t && "object" == typeof t && "function" == typeof t.start
        );
      }
      function eh(t) {
        return "string" == typeof t || Array.isArray(t);
      }
      let eu = [
          "animate",
          "whileInView",
          "whileFocus",
          "whileHover",
          "whileTap",
          "whileDrag",
          "exit",
        ],
        ec = ["initial", ...eu];
      function ef(t) {
        return el(t.animate) || ec.some((e) => eh(t[e]));
      }
      function ep(t) {
        return !!(ef(t) || t.variants);
      }
      function ed(t) {
        let e = [{}, {}];
        return (
          t?.values.forEach((t, i) => {
            (e[0][i] = t.get()), (e[1][i] = t.getVelocity());
          }),
          e
        );
      }
      function em(t, e, i, n) {
        if ("function" == typeof e) {
          let [r, s] = ed(n);
          e = e(void 0 !== i ? i : t.custom, r, s);
        }
        if (
          ("string" == typeof e && (e = t.variants && t.variants[e]),
          "function" == typeof e)
        ) {
          let [r, s] = ed(n);
          e = e(void 0 !== i ? i : t.custom, r, s);
        }
        return e;
      }
      let ey = [
        "AnimationStart",
        "AnimationComplete",
        "Update",
        "BeforeLayoutMeasure",
        "LayoutMeasure",
        "LayoutAnimationStart",
        "LayoutAnimationComplete",
      ];
      class eg {
        scrapeMotionValuesFromProps(t, e, i) {
          return {};
        }
        constructor(
          {
            parent: t,
            props: e,
            presenceContext: i,
            reducedMotionConfig: n,
            blockInitialAnimation: r,
            visualState: s,
          },
          o = {}
        ) {
          (this.current = null),
            (this.children = new Set()),
            (this.isVariantNode = !1),
            (this.isControllingVariants = !1),
            (this.shouldReduceMotion = null),
            (this.values = new Map()),
            (this.KeyframeResolver = tx),
            (this.features = {}),
            (this.valueSubscriptions = new Map()),
            (this.prevMotionValues = {}),
            (this.events = {}),
            (this.propEventSubscriptions = {}),
            (this.notifyUpdate = () =>
              this.notify("Update", this.latestValues)),
            (this.render = () => {
              this.current &&
                (this.triggerBuild(),
                this.renderInstance(
                  this.current,
                  this.renderState,
                  this.props.style,
                  this.projection
                ));
            }),
            (this.renderScheduledAt = 0),
            (this.scheduleRender = () => {
              let t = tQ.now();
              this.renderScheduledAt < t &&
                ((this.renderScheduledAt = t), th.render(this.render, !1, !0));
            });
          let { latestValues: a, renderState: l } = s;
          (this.latestValues = a),
            (this.baseTarget = { ...a }),
            (this.initialValues = e.initial ? { ...a } : {}),
            (this.renderState = l),
            (this.parent = t),
            (this.props = e),
            (this.presenceContext = i),
            (this.depth = t ? t.depth + 1 : 0),
            (this.reducedMotionConfig = n),
            (this.options = o),
            (this.blockInitialAnimation = !!r),
            (this.isControllingVariants = ef(e)),
            (this.isVariantNode = ep(e)),
            this.isVariantNode && (this.variantChildren = new Set()),
            (this.manuallyAnimateOnMount = !!(t && t.current));
          let { willChange: h, ...u } = this.scrapeMotionValuesFromProps(
            e,
            {},
            this
          );
          for (let t in u) {
            let e = u[t];
            void 0 !== a[t] && tZ(e) && e.set(a[t]);
          }
        }
        mount(t) {
          (this.current = t),
            ea.set(t, this),
            this.projection &&
              !this.projection.instance &&
              this.projection.mount(t),
            this.parent &&
              this.isVariantNode &&
              !this.isControllingVariants &&
              (this.removeFromVariantTree = this.parent.addVariantChild(this)),
            this.values.forEach((t, e) => this.bindToMotionValue(e, t)),
            eo.current ||
              (function () {
                if (((eo.current = !0), er))
                  if (window.matchMedia) {
                    let t = window.matchMedia("(prefers-reduced-motion)"),
                      e = () => (es.current = t.matches);
                    t.addEventListener("change", e), e();
                  } else es.current = !1;
              })(),
            (this.shouldReduceMotion =
              "never" !== this.reducedMotionConfig &&
              ("always" === this.reducedMotionConfig || es.current)),
            this.parent?.addChild(this),
            this.update(this.props, this.presenceContext);
        }
        unmount() {
          for (let t in (this.projection && this.projection.unmount(),
          tu(this.notifyUpdate),
          tu(this.render),
          this.valueSubscriptions.forEach((t) => t()),
          this.valueSubscriptions.clear(),
          this.removeFromVariantTree && this.removeFromVariantTree(),
          this.parent?.removeChild(this),
          this.events))
            this.events[t].clear();
          for (let t in this.features) {
            let e = this.features[t];
            e && (e.unmount(), (e.isMounted = !1));
          }
          this.current = null;
        }
        addChild(t) {
          this.children.add(t),
            this.enteringChildren ?? (this.enteringChildren = new Set()),
            this.enteringChildren.add(t);
        }
        removeChild(t) {
          this.children.delete(t),
            this.enteringChildren && this.enteringChildren.delete(t);
        }
        bindToMotionValue(t, e) {
          let i;
          this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)();
          let n = o.has(t);
          n && this.onBindTransform && this.onBindTransform();
          let r = e.on("change", (e) => {
            (this.latestValues[t] = e),
              this.props.onUpdate && th.preRender(this.notifyUpdate),
              n && this.projection && (this.projection.isTransformDirty = !0),
              this.scheduleRender();
          });
          window.MotionCheckAppearSync &&
            (i = window.MotionCheckAppearSync(this, t, e)),
            this.valueSubscriptions.set(t, () => {
              r(), i && i(), e.owner && e.stop();
            });
        }
        sortNodePosition(t) {
          return this.current &&
            this.sortInstanceNodePosition &&
            this.type === t.type
            ? this.sortInstanceNodePosition(this.current, t.current)
            : 0;
        }
        updateFeatures() {
          let t = "animation";
          for (t in t7) {
            let e = t7[t];
            if (!e) continue;
            let { isEnabled: i, Feature: n } = e;
            if (
              (!this.features[t] &&
                n &&
                i(this.props) &&
                (this.features[t] = new n(this)),
              this.features[t])
            ) {
              let e = this.features[t];
              e.isMounted ? e.update() : (e.mount(), (e.isMounted = !0));
            }
          }
        }
        triggerBuild() {
          this.build(this.renderState, this.latestValues, this.props);
        }
        measureViewportBox() {
          return this.current
            ? this.measureInstanceViewportBox(this.current, this.props)
            : en();
        }
        getStaticValue(t) {
          return this.latestValues[t];
        }
        setStaticValue(t, e) {
          this.latestValues[t] = e;
        }
        update(t, e) {
          (t.transformTemplate || this.props.transformTemplate) &&
            this.scheduleRender(),
            (this.prevProps = this.props),
            (this.props = t),
            (this.prevPresenceContext = this.presenceContext),
            (this.presenceContext = e);
          for (let e = 0; e < ey.length; e++) {
            let i = ey[e];
            this.propEventSubscriptions[i] &&
              (this.propEventSubscriptions[i](),
              delete this.propEventSubscriptions[i]);
            let n = t["on" + i];
            n && (this.propEventSubscriptions[i] = this.on(i, n));
          }
          (this.prevMotionValues = (function (t, e, i) {
            for (let n in e) {
              let r = e[n],
                s = i[n];
              if (tZ(r)) t.addValue(n, r);
              else if (tZ(s)) t.addValue(n, t6(r, { owner: t }));
              else if (s !== r)
                if (t.hasValue(n)) {
                  let e = t.getValue(n);
                  !0 === e.liveStyle ? e.jump(r) : e.hasAnimated || e.set(r);
                } else {
                  let e = t.getStaticValue(n);
                  t.addValue(n, t6(void 0 !== e ? e : r, { owner: t }));
                }
            }
            for (let n in i) void 0 === e[n] && t.removeValue(n);
            return e;
          })(
            this,
            this.scrapeMotionValuesFromProps(t, this.prevProps, this),
            this.prevMotionValues
          )),
            this.handleChildMotionValue && this.handleChildMotionValue();
        }
        getProps() {
          return this.props;
        }
        getVariant(t) {
          return this.props.variants ? this.props.variants[t] : void 0;
        }
        getDefaultTransition() {
          return this.props.transition;
        }
        getTransformPagePoint() {
          return this.props.transformPagePoint;
        }
        getClosestVariantNode() {
          return this.isVariantNode
            ? this
            : this.parent
            ? this.parent.getClosestVariantNode()
            : void 0;
        }
        addVariantChild(t) {
          let e = this.getClosestVariantNode();
          if (e)
            return (
              e.variantChildren && e.variantChildren.add(t),
              () => e.variantChildren.delete(t)
            );
        }
        addValue(t, e) {
          let i = this.values.get(t);
          e !== i &&
            (i && this.removeValue(t),
            this.bindToMotionValue(t, e),
            this.values.set(t, e),
            (this.latestValues[t] = e.get()));
        }
        removeValue(t) {
          this.values.delete(t);
          let e = this.valueSubscriptions.get(t);
          e && (e(), this.valueSubscriptions.delete(t)),
            delete this.latestValues[t],
            this.removeValueFromRenderState(t, this.renderState);
        }
        hasValue(t) {
          return this.values.has(t);
        }
        getValue(t, e) {
          if (this.props.values && this.props.values[t])
            return this.props.values[t];
          let i = this.values.get(t);
          return (
            void 0 === i &&
              void 0 !== e &&
              ((i = t6(null === e ? void 0 : e, { owner: this })),
              this.addValue(t, i)),
            i
          );
        }
        readValue(t, e) {
          let i =
            void 0 === this.latestValues[t] && this.current
              ? this.getBaseTargetFromProps(this.props, t) ??
                this.readValueFromInstance(this.current, t, this.options)
              : this.latestValues[t];
          if (null != i) {
            if ("string" == typeof i && (J(i) || tw(i))) i = parseFloat(i);
            else {
              let n;
              (n = i), !t8.find(_(n)) && tU.test(e) && (i = tK(t, e));
            }
            this.setBaseTarget(t, tZ(i) ? i.get() : i);
          }
          return tZ(i) ? i.get() : i;
        }
        setBaseTarget(t, e) {
          this.baseTarget[t] = e;
        }
        getBaseTarget(t) {
          let e,
            { initial: i } = this.props;
          if ("string" == typeof i || "object" == typeof i) {
            let n = em(this.props, i, this.presenceContext?.custom);
            n && (e = n[t]);
          }
          if (i && void 0 !== e) return e;
          let n = this.getBaseTargetFromProps(this.props, t);
          return void 0 === n || tZ(n)
            ? void 0 !== this.initialValues[t] && void 0 === e
              ? void 0
              : this.baseTarget[t]
            : n;
        }
        on(t, e) {
          return (
            this.events[t] || (this.events[t] = new t2()), this.events[t].add(e)
          );
        }
        notify(t, ...e) {
          this.events[t] && this.events[t].notify(...e);
        }
        scheduleRenderMicrotask() {
          t4.render(this.render);
        }
      }
      class ev extends eg {
        constructor() {
          super(...arguments), (this.KeyframeResolver = tG);
        }
        sortInstanceNodePosition(t, e) {
          return 2 & t.compareDocumentPosition(e) ? 1 : -1;
        }
        getBaseTargetFromProps(t, e) {
          return t.style ? t.style[e] : void 0;
        }
        removeValueFromRenderState(t, { vars: e, style: i }) {
          delete e[t], delete i[t];
        }
        handleChildMotionValue() {
          this.childSubscription &&
            (this.childSubscription(), delete this.childSubscription);
          let { children: t } = this.props;
          tZ(t) &&
            (this.childSubscription = t.on("change", (t) => {
              this.current && (this.current.textContent = `${t}`);
            }));
        }
      }
      let ex = (t, e) => (e && "number" == typeof t ? e.transform(t) : t),
        ew = {
          x: "translateX",
          y: "translateY",
          z: "translateZ",
          transformPerspective: "perspective",
        },
        eb = s.length;
      function eT(t, e, i) {
        let { style: n, vars: r, transformOrigin: a } = t,
          l = !1,
          h = !1;
        for (let t in e) {
          let i = e[t];
          if (o.has(t)) {
            l = !0;
            continue;
          }
          if (v(t)) {
            r[t] = i;
            continue;
          }
          {
            let e = ex(i, tX[t]);
            t.startsWith("origin") ? ((h = !0), (a[t] = e)) : (n[t] = e);
          }
        }
        if (
          (!e.transform &&
            (l || i
              ? (n.transform = (function (t, e, i) {
                  let n = "",
                    r = !0;
                  for (let o = 0; o < eb; o++) {
                    let a = s[o],
                      l = t[a];
                    if (void 0 === l) continue;
                    let h = !0;
                    if (
                      !(h =
                        "number" == typeof l
                          ? l === +!!a.startsWith("scale")
                          : 0 === parseFloat(l)) ||
                      i
                    ) {
                      let t = ex(l, tX[a]);
                      if (!h) {
                        r = !1;
                        let e = ew[a] || a;
                        n += `${e}(${t}) `;
                      }
                      i && (e[a] = t);
                    }
                  }
                  return (
                    (n = n.trim()),
                    i ? (n = i(e, r ? "" : n)) : r && (n = "none"),
                    n
                  );
                })(e, t.transform, i))
              : n.transform && (n.transform = "none")),
          h)
        ) {
          let { originX: t = "50%", originY: e = "50%", originZ: i = 0 } = a;
          n.transformOrigin = `${t} ${e} ${i}`;
        }
      }
      function eA(t, { style: e, vars: i }, n, r) {
        let s,
          o = t.style;
        for (s in e) o[s] = e[s];
        for (s in (r?.applyProjectionStyles(o, n), i)) o.setProperty(s, i[s]);
      }
      let eP = {};
      function eS(t, { layout: e, layoutId: i }) {
        return (
          o.has(t) ||
          t.startsWith("origin") ||
          ((e || void 0 !== i) && (!!eP[t] || "opacity" === t))
        );
      }
      function eE(t, e, i) {
        let { style: n } = t,
          r = {};
        for (let s in n)
          (tZ(n[s]) ||
            (e.style && tZ(e.style[s])) ||
            eS(s, t) ||
            i?.getValue(s)?.liveStyle !== void 0) &&
            (r[s] = n[s]);
        return r;
      }
      class eM extends ev {
        constructor() {
          super(...arguments), (this.type = "html"), (this.renderInstance = eA);
        }
        readValueFromInstance(t, e) {
          if (o.has(e))
            return this.projection?.isProjecting
              ? d(e)
              : ((t, e) => {
                  let { transform: i = "none" } = getComputedStyle(t);
                  return m(i, e);
                })(t, e);
          {
            let i = window.getComputedStyle(t),
              n = (v(e) ? i.getPropertyValue(e) : i[e]) || 0;
            return "string" == typeof n ? n.trim() : n;
          }
        }
        measureInstanceViewportBox(t, { transformPagePoint: e }) {
          return L(t, e);
        }
        build(t, e, i) {
          eT(t, e, i.transformTemplate);
        }
        scrapeMotionValuesFromProps(t, e, i) {
          return eE(t, e, i);
        }
      }
      let eC = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(),
        eV = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
        ek = { offset: "strokeDashoffset", array: "strokeDasharray" };
      function eD(
        t,
        {
          attrX: e,
          attrY: i,
          attrScale: n,
          pathLength: r,
          pathSpacing: s = 1,
          pathOffset: o = 0,
          ...a
        },
        l,
        h,
        u
      ) {
        if ((eT(t, a, h), l)) {
          t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
          return;
        }
        (t.attrs = t.style), (t.style = {});
        let { attrs: c, style: f } = t;
        c.transform && ((f.transform = c.transform), delete c.transform),
          (f.transform || c.transformOrigin) &&
            ((f.transformOrigin = c.transformOrigin ?? "50% 50%"),
            delete c.transformOrigin),
          f.transform &&
            ((f.transformBox = u?.transformBox ?? "fill-box"),
            delete c.transformBox),
          void 0 !== e && (c.x = e),
          void 0 !== i && (c.y = i),
          void 0 !== n && (c.scale = n),
          void 0 !== r &&
            (function (t, e, i = 1, n = 0, r = !0) {
              t.pathLength = 1;
              let s = r ? eV : ek;
              t[s.offset] = z.transform(-n);
              let o = z.transform(e),
                a = z.transform(i);
              t[s.array] = `${o} ${a}`;
            })(c, r, s, o, !1);
      }
      let eR = new Set([
          "baseFrequency",
          "diffuseConstant",
          "kernelMatrix",
          "kernelUnitLength",
          "keySplines",
          "keyTimes",
          "limitingConeAngle",
          "markerHeight",
          "markerWidth",
          "numOctaves",
          "targetX",
          "targetY",
          "surfaceScale",
          "specularConstant",
          "specularExponent",
          "stdDeviation",
          "tableValues",
          "viewBox",
          "gradientTransform",
          "pathLength",
          "startOffset",
          "textLength",
          "lengthAdjust",
        ]),
        eB = (t) => "string" == typeof t && "svg" === t.toLowerCase();
      function eL(t, e, i) {
        let n = eE(t, e, i);
        for (let i in t)
          (tZ(t[i]) || tZ(e[i])) &&
            (n[
              -1 !== s.indexOf(i)
                ? "attr" + i.charAt(0).toUpperCase() + i.substring(1)
                : i
            ] = t[i]);
        return n;
      }
      class ej extends ev {
        constructor() {
          super(...arguments),
            (this.type = "svg"),
            (this.isSVGTag = !1),
            (this.measureInstanceViewportBox = en);
        }
        getBaseTargetFromProps(t, e) {
          return t[e];
        }
        readValueFromInstance(t, e) {
          if (o.has(e)) {
            let t = t_(e);
            return (t && t.default) || 0;
          }
          return (e = eR.has(e) ? e : eC(e)), t.getAttribute(e);
        }
        scrapeMotionValuesFromProps(t, e, i) {
          return eL(t, e, i);
        }
        build(t, e, i) {
          eD(t, e, this.isSVGTag, i.transformTemplate, i.style);
        }
        renderInstance(t, e, i, n) {
          for (let i in (eA(t, e, void 0, n), e.attrs))
            t.setAttribute(eR.has(i) ? i : eC(i), e.attrs[i]);
        }
        mount(t) {
          (this.isSVGTag = eB(t.tagName)), super.mount(t);
        }
      }
      let eF = [
        "animate",
        "circle",
        "defs",
        "desc",
        "ellipse",
        "g",
        "image",
        "line",
        "filter",
        "marker",
        "mask",
        "metadata",
        "path",
        "pattern",
        "polygon",
        "polyline",
        "rect",
        "stop",
        "switch",
        "symbol",
        "svg",
        "text",
        "tspan",
        "use",
        "view",
      ];
      function eI(t) {
        if ("string" != typeof t || t.includes("-"));
        else if (eF.indexOf(t) > -1 || /[A-Z]/u.test(t)) return !0;
        return !1;
      }
      var eO = i(5155);
      let eU = (0, r.createContext)({}),
        eN = (0, r.createContext)({ strict: !1 }),
        eW = (0, r.createContext)({
          transformPagePoint: (t) => t,
          isStatic: !1,
          reducedMotion: "never",
        }),
        e$ = (0, r.createContext)({});
      function ez(t) {
        return Array.isArray(t) ? t.join(" ") : t;
      }
      let eY = () => ({
        style: {},
        transform: {},
        transformOrigin: {},
        vars: {},
      });
      function eX(t, e, i) {
        for (let n in e) tZ(e[n]) || eS(n, i) || (t[n] = e[n]);
      }
      let eH = () => ({ ...eY(), attrs: {} }),
        e_ = new Set([
          "animate",
          "exit",
          "variants",
          "initial",
          "style",
          "values",
          "variants",
          "transition",
          "transformTemplate",
          "custom",
          "inherit",
          "onBeforeLayoutMeasure",
          "onAnimationStart",
          "onAnimationComplete",
          "onUpdate",
          "onDragStart",
          "onDrag",
          "onDragEnd",
          "onMeasureDragConstraints",
          "onDirectionLock",
          "onDragTransitionEnd",
          "_dragX",
          "_dragY",
          "onHoverStart",
          "onHoverEnd",
          "onViewportEnter",
          "onViewportLeave",
          "globalTapTarget",
          "ignoreStrict",
          "viewport",
        ]);
      function eK(t) {
        return (
          t.startsWith("while") ||
          (t.startsWith("drag") && "draggable" !== t) ||
          t.startsWith("layout") ||
          t.startsWith("onTap") ||
          t.startsWith("onPan") ||
          t.startsWith("onLayout") ||
          e_.has(t)
        );
      }
      let eq = (t) => !eK(t);
      try {
        !(function (t) {
          "function" == typeof t &&
            (eq = (e) => (e.startsWith("on") ? !eK(e) : t(e)));
        })(require("@emotion/is-prop-valid").default);
      } catch {}
      let eG = (0, r.createContext)(null);
      function eZ(t) {
        return tZ(t) ? t.get() : t;
      }
      let eJ = (t) => (e, i) => {
          let n = (0, r.useContext)(e$),
            s = (0, r.useContext)(eG),
            o = () =>
              (function (t, e, i, n) {
                let { scrapeMotionValuesFromProps: r, createRenderState: s } =
                  t;
                return {
                  latestValues: (function (t, e, i, n) {
                    let r = {},
                      s = n(t, {});
                    for (let t in s) r[t] = eZ(s[t]);
                    let { initial: o, animate: a } = t,
                      l = ef(t),
                      h = ep(t);
                    e &&
                      h &&
                      !l &&
                      !1 !== t.inherit &&
                      (void 0 === o && (o = e.initial),
                      void 0 === a && (a = e.animate));
                    let u = !!i && !1 === i.initial,
                      c = (u = u || !1 === o) ? a : o;
                    if (c && "boolean" != typeof c && !el(c)) {
                      let e = Array.isArray(c) ? c : [c];
                      for (let i = 0; i < e.length; i++) {
                        let n = em(t, e[i]);
                        if (n) {
                          let { transitionEnd: t, transition: e, ...i } = n;
                          for (let t in i) {
                            let e = i[t];
                            if (Array.isArray(e)) {
                              let t = u ? e.length - 1 : 0;
                              e = e[t];
                            }
                            null !== e && (r[t] = e);
                          }
                          for (let e in t) r[e] = t[e];
                        }
                      }
                    }
                    return r;
                  })(e, i, n, r),
                  renderState: s(),
                };
              })(t, e, n, s);
          return i
            ? o()
            : (function (t) {
                let e = (0, r.useRef)(null);
                return null === e.current && (e.current = t()), e.current;
              })(o);
        },
        eQ = eJ({ scrapeMotionValuesFromProps: eE, createRenderState: eY }),
        e0 = eJ({ scrapeMotionValuesFromProps: eL, createRenderState: eH }),
        e1 = Symbol.for("motionComponentSymbol");
      function e2(t) {
        return (
          t &&
          "object" == typeof t &&
          Object.prototype.hasOwnProperty.call(t, "current")
        );
      }
      let e5 = "data-" + eC("framerAppearId"),
        e3 = (0, r.createContext)({}),
        e6 = er ? r.useLayoutEffect : r.useEffect;
      function e8(t) {
        var e, i;
        let { forwardMotionProps: n = !1 } =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          s = arguments.length > 2 ? arguments[2] : void 0,
          o = arguments.length > 3 ? arguments[3] : void 0;
        s &&
          (function (t) {
            for (let e in t) t7[e] = { ...t7[e], ...t[e] };
          })(s);
        let a = eI(t) ? e0 : eQ;
        function l(e, i) {
          var s;
          let l,
            h = {
              ...(0, r.useContext)(eW),
              ...e,
              layoutId: (function (t) {
                let { layoutId: e } = t,
                  i = (0, r.useContext)(eU).id;
                return i && void 0 !== e ? i + "-" + e : e;
              })(e),
            },
            { isStatic: u } = h,
            c = (function (t) {
              let { initial: e, animate: i } = (function (t, e) {
                if (ef(t)) {
                  let { initial: e, animate: i } = t;
                  return {
                    initial: !1 === e || eh(e) ? e : void 0,
                    animate: eh(i) ? i : void 0,
                  };
                }
                return !1 !== t.inherit ? e : {};
              })(t, (0, r.useContext)(e$));
              return (0, r.useMemo)(
                () => ({ initial: e, animate: i }),
                [ez(e), ez(i)]
              );
            })(e),
            f = a(e, u);
          if (!u && er) {
            (0, r.useContext)(eN).strict;
            let e = (function (t) {
              let { drag: e, layout: i } = t7;
              if (!e && !i) return {};
              let n = { ...e, ...i };
              return {
                MeasureLayout:
                  (null == e ? void 0 : e.isEnabled(t)) ||
                  (null == i ? void 0 : i.isEnabled(t))
                    ? n.MeasureLayout
                    : void 0,
                ProjectionNode: n.ProjectionNode,
              };
            })(h);
            (l = e.MeasureLayout),
              (c.visualElement = (function (t, e, i, n, s) {
                var o, a, l, h;
                let { visualElement: u } = (0, r.useContext)(e$),
                  c = (0, r.useContext)(eN),
                  f = (0, r.useContext)(eG),
                  p = (0, r.useContext)(eW).reducedMotion,
                  d = (0, r.useRef)(null);
                (n = n || c.renderer),
                  !d.current &&
                    n &&
                    (d.current = n(t, {
                      visualState: e,
                      parent: u,
                      props: i,
                      presenceContext: f,
                      blockInitialAnimation: !!f && !1 === f.initial,
                      reducedMotionConfig: p,
                    }));
                let m = d.current,
                  y = (0, r.useContext)(e3);
                m &&
                  !m.projection &&
                  s &&
                  ("html" === m.type || "svg" === m.type) &&
                  (function (t, e, i, n) {
                    let {
                      layoutId: r,
                      layout: s,
                      drag: o,
                      dragConstraints: a,
                      layoutScroll: l,
                      layoutRoot: h,
                      layoutCrossfade: u,
                    } = e;
                    (t.projection = new i(
                      t.latestValues,
                      e["data-framer-portal-id"]
                        ? void 0
                        : (function t(e) {
                            if (e)
                              return !1 !== e.options.allowProjection
                                ? e.projection
                                : t(e.parent);
                          })(t.parent)
                    )),
                      t.projection.setOptions({
                        layoutId: r,
                        layout: s,
                        alwaysMeasureLayout: !!o || (a && e2(a)),
                        visualElement: t,
                        animationType: "string" == typeof s ? s : "both",
                        initialPromotionConfig: n,
                        crossfade: u,
                        layoutScroll: l,
                        layoutRoot: h,
                      });
                  })(d.current, i, s, y);
                let g = (0, r.useRef)(!1);
                (0, r.useInsertionEffect)(() => {
                  m && g.current && m.update(i, f);
                });
                let v = i[e5],
                  x = (0, r.useRef)(
                    !!v &&
                      !(null == (o = (a = window).MotionHandoffIsComplete)
                        ? void 0
                        : o.call(a, v)) &&
                      (null == (l = (h = window).MotionHasOptimisedAnimation)
                        ? void 0
                        : l.call(h, v))
                  );
                return (
                  e6(() => {
                    m &&
                      ((g.current = !0),
                      (window.MotionIsMounted = !0),
                      m.updateFeatures(),
                      m.scheduleRenderMicrotask(),
                      x.current &&
                        m.animationState &&
                        m.animationState.animateChanges());
                  }),
                  (0, r.useEffect)(() => {
                    m &&
                      (!x.current &&
                        m.animationState &&
                        m.animationState.animateChanges(),
                      x.current &&
                        (queueMicrotask(() => {
                          var t, e;
                          null ==
                            (t = (e = window).MotionHandoffMarkAsComplete) ||
                            t.call(e, v);
                        }),
                        (x.current = !1)),
                      (m.enteringChildren = void 0));
                  }),
                  m
                );
              })(t, f, h, o, e.ProjectionNode));
          }
          return (0, eO.jsxs)(e$.Provider, {
            value: c,
            children: [
              l && c.visualElement
                ? (0, eO.jsx)(l, { visualElement: c.visualElement, ...h })
                : null,
              (function (t, e, i, n, s) {
                let { latestValues: o } = n,
                  a =
                    arguments.length > 5 &&
                    void 0 !== arguments[5] &&
                    arguments[5],
                  l = (
                    eI(t)
                      ? function (t, e, i, n) {
                          let s = (0, r.useMemo)(() => {
                            let i = eH();
                            return (
                              eD(i, e, eB(n), t.transformTemplate, t.style),
                              { ...i.attrs, style: { ...i.style } }
                            );
                          }, [e]);
                          if (t.style) {
                            let e = {};
                            eX(e, t.style, t), (s.style = { ...e, ...s.style });
                          }
                          return s;
                        }
                      : function (t, e) {
                          let i = {},
                            n = (function (t, e) {
                              let i = t.style || {},
                                n = {};
                              return (
                                eX(n, i, t),
                                Object.assign(
                                  n,
                                  (function (t, e) {
                                    let { transformTemplate: i } = t;
                                    return (0, r.useMemo)(() => {
                                      let t = eY();
                                      return (
                                        eT(t, e, i),
                                        Object.assign({}, t.vars, t.style)
                                      );
                                    }, [e]);
                                  })(t, e)
                                ),
                                n
                              );
                            })(t, e);
                          return (
                            t.drag &&
                              !1 !== t.dragListener &&
                              ((i.draggable = !1),
                              (n.userSelect =
                                n.WebkitUserSelect =
                                n.WebkitTouchCallout =
                                  "none"),
                              (n.touchAction =
                                !0 === t.drag
                                  ? "none"
                                  : "pan-".concat("x" === t.drag ? "y" : "x"))),
                            void 0 === t.tabIndex &&
                              (t.onTap || t.onTapStart || t.whileTap) &&
                              (i.tabIndex = 0),
                            (i.style = n),
                            i
                          );
                        }
                  )(e, o, s, t),
                  h = (function (t, e, i) {
                    let n = {};
                    for (let r in t)
                      ("values" !== r || "object" != typeof t.values) &&
                        (eq(r) ||
                          (!0 === i && eK(r)) ||
                          (!e && !eK(r)) ||
                          (t.draggable && r.startsWith("onDrag"))) &&
                        (n[r] = t[r]);
                    return n;
                  })(e, "string" == typeof t, a),
                  u = t !== r.Fragment ? { ...h, ...l, ref: i } : {},
                  { children: c } = e,
                  f = (0, r.useMemo)(() => (tZ(c) ? c.get() : c), [c]);
                return (0, r.createElement)(t, { ...u, children: f });
              })(
                t,
                e,
                ((s = c.visualElement),
                (0, r.useCallback)(
                  (t) => {
                    t && f.onMount && f.onMount(t),
                      s && (t ? s.mount(t) : s.unmount()),
                      i &&
                        ("function" == typeof i
                          ? i(t)
                          : e2(i) && (i.current = t));
                  },
                  [s]
                )),
                f,
                u,
                n
              ),
            ],
          });
        }
        l.displayName = "motion.".concat(
          "string" == typeof t
            ? t
            : "create(".concat(
                null != (i = null != (e = t.displayName) ? e : t.name) ? i : "",
                ")"
              )
        );
        let h = (0, r.forwardRef)(l);
        return (h[e1] = t), h;
      }
      function e4(t, e, i) {
        let n = t.getProps();
        return em(n, e, void 0 !== i ? i : n.custom, t);
      }
      function e9(t, e) {
        return t?.[e] ?? t?.default ?? t;
      }
      let e7 = (t) => Array.isArray(t);
      function it(t, e) {
        let i = t.getValue("willChange");
        if (tZ(i) && i.add) return i.add(e);
        if (!i && ts.WillChange) {
          let i = new ts.WillChange("auto");
          t.addValue("willChange", i), i.add(e);
        }
      }
      function ie(t) {
        (t.duration = 0), (t.type = "keyframes");
      }
      let ii = (t, e) => (i) => e(t(i)),
        ir = (...t) => t.reduce(ii),
        is = (t) => 1e3 * t,
        io = { layout: 0, mainThread: 0, waapi: 0 };
      function ia(t, e, i) {
        return (i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6)
          ? t + (e - t) * 6 * i
          : i < 0.5
          ? e
          : i < 2 / 3
          ? t + (e - t) * (2 / 3 - i) * 6
          : t;
      }
      function il(t, e) {
        return (i) => (i > 0 ? e : t);
      }
      let ih = (t, e, i) => {
          let n = t * t,
            r = i * (e * e - n) + n;
          return r < 0 ? 0 : Math.sqrt(r);
        },
        iu = [tC, tM, tV];
      function ic(t) {
        let e = iu.find((e) => e.test(t));
        if (
          (G(
            !!e,
            `'${t}' is not an animatable color. Use the equivalent color code instead.`,
            "color-not-animatable"
          ),
          !e)
        )
          return !1;
        let i = e.parse(t);
        return (
          e === tV &&
            (i = (function ({ hue: t, saturation: e, lightness: i, alpha: n }) {
              (t /= 360), (i /= 100);
              let r = 0,
                s = 0,
                o = 0;
              if ((e /= 100)) {
                let n = i < 0.5 ? i * (1 + e) : i + e - i * e,
                  a = 2 * i - n;
                (r = ia(a, n, t + 1 / 3)),
                  (s = ia(a, n, t)),
                  (o = ia(a, n, t - 1 / 3));
              } else r = s = o = i;
              return {
                red: Math.round(255 * r),
                green: Math.round(255 * s),
                blue: Math.round(255 * o),
                alpha: n,
              };
            })(i)),
          i
        );
      }
      let ip = (t, e) => {
          let i = ic(t),
            n = ic(e);
          if (!i || !n) return il(t, e);
          let r = { ...i };
          return (t) => (
            (r.red = ih(i.red, n.red, t)),
            (r.green = ih(i.green, n.green, t)),
            (r.blue = ih(i.blue, n.blue, t)),
            (r.alpha = A(i.alpha, n.alpha, t)),
            tM.transform(r)
          );
        },
        id = new Set(["none", "hidden"]);
      function im(t, e) {
        return (i) => A(t, e, i);
      }
      function iy(t) {
        return "number" == typeof t
          ? im
          : "string" == typeof t
          ? w(t)
            ? il
            : tk.test(t)
            ? ip
            : ix
          : Array.isArray(t)
          ? ig
          : "object" == typeof t
          ? tk.test(t)
            ? ip
            : iv
          : il;
      }
      function ig(t, e) {
        let i = [...t],
          n = i.length,
          r = t.map((t, i) => iy(t)(t, e[i]));
        return (t) => {
          for (let e = 0; e < n; e++) i[e] = r[e](t);
          return i;
        };
      }
      function iv(t, e) {
        let i = { ...t, ...e },
          n = {};
        for (let r in i)
          void 0 !== t[r] && void 0 !== e[r] && (n[r] = iy(t[r])(t[r], e[r]));
        return (t) => {
          for (let e in n) i[e] = n[e](t);
          return i;
        };
      }
      let ix = (t, e) => {
        let i = tU.createTransformer(e),
          n = tj(t),
          r = tj(e);
        return n.indexes.var.length === r.indexes.var.length &&
          n.indexes.color.length === r.indexes.color.length &&
          n.indexes.number.length >= r.indexes.number.length
          ? (id.has(t) && !r.values.length) || (id.has(e) && !n.values.length)
            ? (function (t, e) {
                return id.has(t)
                  ? (i) => (i <= 0 ? t : e)
                  : (i) => (i >= 1 ? e : t);
              })(t, e)
            : ir(
                ig(
                  (function (t, e) {
                    let i = [],
                      n = { color: 0, var: 0, number: 0 };
                    for (let r = 0; r < e.values.length; r++) {
                      let s = e.types[r],
                        o = t.indexes[s][n[s]],
                        a = t.values[o] ?? 0;
                      (i[r] = a), n[s]++;
                    }
                    return i;
                  })(n, r),
                  r.values
                ),
                i
              )
          : (G(
              !0,
              `Complex values '${t}' and '${e}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`,
              "complex-values-different"
            ),
            il(t, e));
      };
      function iw(t, e, i) {
        return "number" == typeof t &&
          "number" == typeof e &&
          "number" == typeof i
          ? A(t, e, i)
          : iy(t)(t, e);
      }
      let ib = (t) => {
          let e = ({ timestamp: e }) => t(e);
          return {
            start: (t = !0) => th.update(e, t),
            stop: () => tu(e),
            now: () => (tc.isProcessing ? tc.timestamp : tQ.now()),
          };
        },
        iT = (t, e, i = 10) => {
          let n = "",
            r = Math.max(Math.round(e / i), 2);
          for (let e = 0; e < r; e++)
            n += Math.round(1e4 * t(e / (r - 1))) / 1e4 + ", ";
          return `linear(${n.substring(0, n.length - 2)})`;
        };
      function iA(t) {
        let e = 0,
          i = t.next(e);
        for (; !i.done && e < 2e4; ) (e += 50), (i = t.next(e));
        return e >= 2e4 ? 1 / 0 : e;
      }
      function iP(t, e, i) {
        var n, r;
        let s = Math.max(e - 5, 0);
        return (n = i - t(s)), (r = e - s) ? (1e3 / r) * n : 0;
      }
      let iS = {
        stiffness: 100,
        damping: 10,
        mass: 1,
        velocity: 0,
        duration: 800,
        bounce: 0.3,
        visualDuration: 0.3,
        restSpeed: { granular: 0.01, default: 2 },
        restDelta: { granular: 0.005, default: 0.5 },
        minDuration: 0.01,
        maxDuration: 10,
        minDamping: 0.05,
        maxDamping: 1,
      };
      function iE(t, e) {
        return t * Math.sqrt(1 - e * e);
      }
      let iM = ["duration", "bounce"],
        iC = ["stiffness", "damping", "mass"];
      function iV(t, e) {
        return e.some((e) => void 0 !== t[e]);
      }
      function ik(t = iS.visualDuration, e = iS.bounce) {
        let i,
          n =
            "object" != typeof t
              ? { visualDuration: t, keyframes: [0, 1], bounce: e }
              : t,
          { restSpeed: r, restDelta: s } = n,
          o = n.keyframes[0],
          a = n.keyframes[n.keyframes.length - 1],
          l = { done: !1, value: o },
          {
            stiffness: h,
            damping: u,
            mass: c,
            duration: f,
            velocity: p,
            isResolvedFromDuration: d,
          } = (function (t) {
            let e = {
              velocity: iS.velocity,
              stiffness: iS.stiffness,
              damping: iS.damping,
              mass: iS.mass,
              isResolvedFromDuration: !1,
              ...t,
            };
            if (!iV(t, iC) && iV(t, iM))
              if (t.visualDuration) {
                let i = (2 * Math.PI) / (1.2 * t.visualDuration),
                  n = i * i,
                  r = 2 * F(0.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(n);
                e = { ...e, mass: iS.mass, stiffness: n, damping: r };
              } else {
                let i = (function ({
                  duration: t = iS.duration,
                  bounce: e = iS.bounce,
                  velocity: i = iS.velocity,
                  mass: n = iS.mass,
                }) {
                  let r, s;
                  G(
                    t <= is(iS.maxDuration),
                    "Spring duration must be 10 seconds or less",
                    "spring-duration-limit"
                  );
                  let o = 1 - e;
                  (o = F(iS.minDamping, iS.maxDamping, o)),
                    (t = F(iS.minDuration, iS.maxDuration, t / 1e3)),
                    o < 1
                      ? ((r = (e) => {
                          let n = e * o,
                            r = n * t;
                          return 0.001 - ((n - i) / iE(e, o)) * Math.exp(-r);
                        }),
                        (s = (e) => {
                          let n = e * o * t,
                            s = Math.pow(o, 2) * Math.pow(e, 2) * t,
                            a = Math.exp(-n),
                            l = iE(Math.pow(e, 2), o);
                          return (
                            ((n * i + i - s) *
                              a *
                              (-r(e) + 0.001 > 0 ? -1 : 1)) /
                            l
                          );
                        }))
                      : ((r = (e) =>
                          -0.001 + Math.exp(-e * t) * ((e - i) * t + 1)),
                        (s = (e) => t * t * (i - e) * Math.exp(-e * t)));
                  let a = (function (t, e, i) {
                    let n = i;
                    for (let i = 1; i < 12; i++) n -= t(n) / e(n);
                    return n;
                  })(r, s, 5 / t);
                  if (((t = is(t)), isNaN(a)))
                    return {
                      stiffness: iS.stiffness,
                      damping: iS.damping,
                      duration: t,
                    };
                  {
                    let e = Math.pow(a, 2) * n;
                    return {
                      stiffness: e,
                      damping: 2 * o * Math.sqrt(n * e),
                      duration: t,
                    };
                  }
                })(t);
                (e = { ...e, ...i, mass: iS.mass }).isResolvedFromDuration = !0;
              }
            return e;
          })({ ...n, velocity: -((n.velocity || 0) / 1e3) }),
          m = p || 0,
          y = u / (2 * Math.sqrt(h * c)),
          g = a - o,
          v = Math.sqrt(h / c) / 1e3,
          x = 5 > Math.abs(g);
        if (
          (r || (r = x ? iS.restSpeed.granular : iS.restSpeed.default),
          s || (s = x ? iS.restDelta.granular : iS.restDelta.default),
          y < 1)
        ) {
          let t = iE(v, y);
          i = (e) =>
            a -
            Math.exp(-y * v * e) *
              (((m + y * v * g) / t) * Math.sin(t * e) + g * Math.cos(t * e));
        } else if (1 === y)
          i = (t) => a - Math.exp(-v * t) * (g + (m + v * g) * t);
        else {
          let t = v * Math.sqrt(y * y - 1);
          i = (e) => {
            let i = Math.exp(-y * v * e),
              n = Math.min(t * e, 300);
            return (
              a -
              (i * ((m + y * v * g) * Math.sinh(n) + t * g * Math.cosh(n))) / t
            );
          };
        }
        let w = {
          calculatedDuration: (d && f) || null,
          next: (t) => {
            let e = i(t);
            if (d) l.done = t >= f;
            else {
              let n = 0 === t ? m : 0;
              y < 1 && (n = 0 === t ? is(m) : iP(i, t, e));
              let o = Math.abs(a - e) <= s;
              l.done = Math.abs(n) <= r && o;
            }
            return (l.value = l.done ? a : e), l;
          },
          toString: () => {
            let t = Math.min(iA(w), 2e4),
              e = iT((e) => w.next(t * e).value, t, 30);
            return t + "ms " + e;
          },
          toTransition: () => {},
        };
        return w;
      }
      function iD({
        keyframes: t,
        velocity: e = 0,
        power: i = 0.8,
        timeConstant: n = 325,
        bounceDamping: r = 10,
        bounceStiffness: s = 500,
        modifyTarget: o,
        min: a,
        max: l,
        restDelta: h = 0.5,
        restSpeed: u,
      }) {
        let c,
          f,
          p = t[0],
          d = { done: !1, value: p },
          m = i * e,
          y = p + m,
          g = void 0 === o ? y : o(y);
        g !== y && (m = g - p);
        let v = (t) => -m * Math.exp(-t / n),
          x = (t) => g + v(t),
          w = (t) => {
            let e = v(t),
              i = x(t);
            (d.done = Math.abs(e) <= h), (d.value = d.done ? g : i);
          },
          b = (t) => {
            let e;
            if (
              ((e = d.value),
              (void 0 !== a && e < a) || (void 0 !== l && e > l))
            ) {
              var i;
              (c = t),
                (f = ik({
                  keyframes: [
                    d.value,
                    ((i = d.value),
                    void 0 === a
                      ? l
                      : void 0 === l || Math.abs(a - i) < Math.abs(l - i)
                      ? a
                      : l),
                  ],
                  velocity: iP(x, t, d.value),
                  damping: r,
                  stiffness: s,
                  restDelta: h,
                  restSpeed: u,
                }));
            }
          };
        return (
          b(0),
          {
            calculatedDuration: null,
            next: (t) => {
              let e = !1;
              return (f || void 0 !== c || ((e = !0), w(t), b(t)),
              void 0 !== c && t >= c)
                ? f.next(t - c)
                : (e || w(t), d);
            },
          }
        );
      }
      ik.applyToOptions = (t) => {
        let e = (function (t, e = 100, i) {
          let n = i({ ...t, keyframes: [0, e] }),
            r = Math.min(iA(n), 2e4);
          return {
            type: "keyframes",
            ease: (t) => n.next(r * t).value / e,
            duration: r / 1e3,
          };
        })(t, 100, ik);
        return (
          (t.ease = e.ease),
          (t.duration = is(e.duration)),
          (t.type = "keyframes"),
          t
        );
      };
      let iR = (t, e, i) =>
        (((1 - 3 * i + 3 * e) * t + (3 * i - 6 * e)) * t + 3 * e) * t;
      function iB(t, e, i, n) {
        return t === e && i === n
          ? tr
          : (r) =>
              0 === r || 1 === r
                ? r
                : iR(
                    (function (t, e, i, n, r) {
                      let s,
                        o,
                        a = 0;
                      do
                        (s = iR((o = e + (i - e) / 2), n, r) - t) > 0
                          ? (i = o)
                          : (e = o);
                      while (Math.abs(s) > 1e-7 && ++a < 12);
                      return o;
                    })(r, 0, 1, t, i),
                    e,
                    n
                  );
      }
      let iL = iB(0.42, 0, 1, 1),
        ij = iB(0, 0, 0.58, 1),
        iF = iB(0.42, 0, 0.58, 1),
        iI = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2,
        iO = (t) => (e) => 1 - t(1 - e),
        iU = iB(0.33, 1.53, 0.69, 0.99),
        iN = iO(iU),
        iW = iI(iN),
        i$ = (t) =>
          (t *= 2) < 1 ? 0.5 * iN(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1))),
        iz = (t) => 1 - Math.sin(Math.acos(t)),
        iY = iO(iz),
        iX = iI(iz),
        iH = (t) => Array.isArray(t) && "number" == typeof t[0],
        i_ = {
          linear: tr,
          easeIn: iL,
          easeInOut: iF,
          easeOut: ij,
          circIn: iz,
          circInOut: iX,
          circOut: iY,
          backIn: iN,
          backInOut: iW,
          backOut: iU,
          anticipate: i$,
        },
        iK = (t) => {
          if (iH(t)) {
            Z(
              4 === t.length,
              "Cubic bezier arrays must contain four numerical values.",
              "cubic-bezier-length"
            );
            let [e, i, n, r] = t;
            return iB(e, i, n, r);
          }
          return "string" == typeof t
            ? (Z(
                void 0 !== i_[t],
                `Invalid easing type '${t}'`,
                "invalid-easing-type"
              ),
              i_[t])
            : t;
        },
        iq = (t, e, i) => {
          let n = e - t;
          return 0 === n ? 1 : (i - t) / n;
        };
      function iG({
        duration: t = 300,
        keyframes: e,
        times: i,
        ease: n = "easeInOut",
      }) {
        var r;
        let s = Array.isArray(n) && "number" != typeof n[0] ? n.map(iK) : iK(n),
          o = { done: !1, value: e[0] },
          a = (function (t, e, { clamp: i = !0, ease: n, mixer: r } = {}) {
            let s = t.length;
            if (
              (Z(
                s === e.length,
                "Both input and output ranges must be the same length",
                "range-length"
              ),
              1 === s)
            )
              return () => e[0];
            if (2 === s && e[0] === e[1]) return () => e[1];
            let o = t[0] === t[1];
            t[0] > t[s - 1] && ((t = [...t].reverse()), (e = [...e].reverse()));
            let a = (function (t, e, i) {
                let n = [],
                  r = i || ts.mix || iw,
                  s = t.length - 1;
                for (let i = 0; i < s; i++) {
                  let s = r(t[i], t[i + 1]);
                  e && (s = ir(Array.isArray(e) ? e[i] || tr : e, s)),
                    n.push(s);
                }
                return n;
              })(e, n, r),
              l = a.length,
              h = (i) => {
                if (o && i < t[0]) return e[0];
                let n = 0;
                if (l > 1) for (; n < t.length - 2 && !(i < t[n + 1]); n++);
                let r = iq(t[n], t[n + 1], i);
                return a[n](r);
              };
            return i ? (e) => h(F(t[0], t[s - 1], e)) : h;
          })(
            ((r =
              i && i.length === e.length
                ? i
                : (function (t) {
                    let e = [0];
                    return (
                      !(function (t, e) {
                        let i = t[t.length - 1];
                        for (let n = 1; n <= e; n++) {
                          let r = iq(0, e, n);
                          t.push(A(i, 1, r));
                        }
                      })(e, t.length - 1),
                      e
                    );
                  })(e)),
            r.map((e) => e * t)),
            e,
            {
              ease: Array.isArray(s)
                ? s
                : e.map(() => s || iF).splice(0, e.length - 1),
            }
          );
        return {
          calculatedDuration: t,
          next: (e) => ((o.value = a(e)), (o.done = e >= t), o),
        };
      }
      let iZ = (t) => null !== t;
      function iJ(t, { repeat: e, repeatType: i = "loop" }, n, r = 1) {
        let s = t.filter(iZ),
          o = r < 0 || (e && "loop" !== i && e % 2 == 1) ? 0 : s.length - 1;
        return o && void 0 !== n ? n : s[o];
      }
      let iQ = { decay: iD, inertia: iD, tween: iG, keyframes: iG, spring: ik };
      function i0(t) {
        "string" == typeof t.type && (t.type = iQ[t.type]);
      }
      class i1 {
        constructor() {
          this.updateFinished();
        }
        get finished() {
          return this._finished;
        }
        updateFinished() {
          this._finished = new Promise((t) => {
            this.resolve = t;
          });
        }
        notifyFinished() {
          this.resolve();
        }
        then(t, e) {
          return this.finished.then(t, e);
        }
      }
      let i2 = (t) => t / 100;
      class i5 extends i1 {
        constructor(t) {
          super(),
            (this.state = "idle"),
            (this.startTime = null),
            (this.isStopped = !1),
            (this.currentTime = 0),
            (this.holdTime = null),
            (this.playbackSpeed = 1),
            (this.stop = () => {
              let { motionValue: t } = this.options;
              t && t.updatedAt !== tQ.now() && this.tick(tQ.now()),
                (this.isStopped = !0),
                "idle" !== this.state &&
                  (this.teardown(), this.options.onStop?.());
            }),
            io.mainThread++,
            (this.options = t),
            this.initAnimation(),
            this.play(),
            !1 === t.autoplay && this.pause();
        }
        initAnimation() {
          let { options: t } = this;
          i0(t);
          let {
              type: e = iG,
              repeat: i = 0,
              repeatDelay: n = 0,
              repeatType: r,
              velocity: s = 0,
            } = t,
            { keyframes: o } = t,
            a = e || iG;
          a !== iG &&
            "number" != typeof o[0] &&
            ((this.mixKeyframes = ir(i2, iw(o[0], o[1]))), (o = [0, 100]));
          let l = a({ ...t, keyframes: o });
          "mirror" === r &&
            (this.mirroredGenerator = a({
              ...t,
              keyframes: [...o].reverse(),
              velocity: -s,
            })),
            null === l.calculatedDuration && (l.calculatedDuration = iA(l));
          let { calculatedDuration: h } = l;
          (this.calculatedDuration = h),
            (this.resolvedDuration = h + n),
            (this.totalDuration = this.resolvedDuration * (i + 1) - n),
            (this.generator = l);
        }
        updateTime(t) {
          let e = Math.round(t - this.startTime) * this.playbackSpeed;
          null !== this.holdTime
            ? (this.currentTime = this.holdTime)
            : (this.currentTime = e);
        }
        tick(t, e = !1) {
          let {
            generator: i,
            totalDuration: n,
            mixKeyframes: r,
            mirroredGenerator: s,
            resolvedDuration: o,
            calculatedDuration: a,
          } = this;
          if (null === this.startTime) return i.next(0);
          let {
            delay: l = 0,
            keyframes: h,
            repeat: u,
            repeatType: c,
            repeatDelay: f,
            type: p,
            onUpdate: d,
            finalKeyframe: m,
          } = this.options;
          this.speed > 0
            ? (this.startTime = Math.min(this.startTime, t))
            : this.speed < 0 &&
              (this.startTime = Math.min(t - n / this.speed, this.startTime)),
            e ? (this.currentTime = t) : this.updateTime(t);
          let y = this.currentTime - l * (this.playbackSpeed >= 0 ? 1 : -1),
            g = this.playbackSpeed >= 0 ? y < 0 : y > n;
          (this.currentTime = Math.max(y, 0)),
            "finished" === this.state &&
              null === this.holdTime &&
              (this.currentTime = n);
          let v = this.currentTime,
            x = i;
          if (u) {
            let t = Math.min(this.currentTime, n) / o,
              e = Math.floor(t),
              i = t % 1;
            !i && t >= 1 && (i = 1),
              1 === i && e--,
              (e = Math.min(e, u + 1)) % 2 &&
                ("reverse" === c
                  ? ((i = 1 - i), f && (i -= f / o))
                  : "mirror" === c && (x = s)),
              (v = F(0, 1, i) * o);
          }
          let w = g ? { done: !1, value: h[0] } : x.next(v);
          r && (w.value = r(w.value));
          let { done: b } = w;
          g ||
            null === a ||
            (b =
              this.playbackSpeed >= 0
                ? this.currentTime >= n
                : this.currentTime <= 0);
          let T =
            null === this.holdTime &&
            ("finished" === this.state || ("running" === this.state && b));
          return (
            T && p !== iD && (w.value = iJ(h, this.options, m, this.speed)),
            d && d(w.value),
            T && this.finish(),
            w
          );
        }
        then(t, e) {
          return this.finished.then(t, e);
        }
        get duration() {
          return this.calculatedDuration / 1e3;
        }
        get iterationDuration() {
          let { delay: t = 0 } = this.options || {};
          return this.duration + t / 1e3;
        }
        get time() {
          return this.currentTime / 1e3;
        }
        set time(t) {
          (t = is(t)),
            (this.currentTime = t),
            null === this.startTime ||
            null !== this.holdTime ||
            0 === this.playbackSpeed
              ? (this.holdTime = t)
              : this.driver &&
                (this.startTime = this.driver.now() - t / this.playbackSpeed),
            this.driver?.start(!1);
        }
        get speed() {
          return this.playbackSpeed;
        }
        set speed(t) {
          this.updateTime(tQ.now());
          let e = this.playbackSpeed !== t;
          (this.playbackSpeed = t), e && (this.time = this.currentTime / 1e3);
        }
        play() {
          if (this.isStopped) return;
          let { driver: t = ib, startTime: e } = this.options;
          this.driver || (this.driver = t((t) => this.tick(t))),
            this.options.onPlay?.();
          let i = this.driver.now();
          "finished" === this.state
            ? (this.updateFinished(), (this.startTime = i))
            : null !== this.holdTime
            ? (this.startTime = i - this.holdTime)
            : this.startTime || (this.startTime = e ?? i),
            "finished" === this.state &&
              this.speed < 0 &&
              (this.startTime += this.calculatedDuration),
            (this.holdTime = null),
            (this.state = "running"),
            this.driver.start();
        }
        pause() {
          (this.state = "paused"),
            this.updateTime(tQ.now()),
            (this.holdTime = this.currentTime);
        }
        complete() {
          "running" !== this.state && this.play(),
            (this.state = "finished"),
            (this.holdTime = null);
        }
        finish() {
          this.notifyFinished(),
            this.teardown(),
            (this.state = "finished"),
            this.options.onComplete?.();
        }
        cancel() {
          (this.holdTime = null),
            (this.startTime = 0),
            this.tick(0),
            this.teardown(),
            this.options.onCancel?.();
        }
        teardown() {
          (this.state = "idle"),
            this.stopDriver(),
            (this.startTime = this.holdTime = null),
            io.mainThread--;
        }
        stopDriver() {
          this.driver && (this.driver.stop(), (this.driver = void 0));
        }
        sample(t) {
          return (this.startTime = 0), this.tick(t, !0);
        }
        attachTimeline(t) {
          return (
            this.options.allowFlatten &&
              ((this.options.type = "keyframes"),
              (this.options.ease = "linear"),
              this.initAnimation()),
            this.driver?.stop(),
            t.observe(this)
          );
        }
      }
      function i3(t) {
        let e;
        return () => (void 0 === e && (e = t()), e);
      }
      let i6 = i3(() => void 0 !== window.ScrollTimeline),
        i8 = {},
        i4 = (function (t, e) {
          let i = i3(t);
          return () => i8[e] ?? i();
        })(() => {
          try {
            document
              .createElement("div")
              .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
          } catch (t) {
            return !1;
          }
          return !0;
        }, "linearEasing"),
        i9 = ([t, e, i, n]) => `cubic-bezier(${t}, ${e}, ${i}, ${n})`,
        i7 = {
          linear: "linear",
          ease: "ease",
          easeIn: "ease-in",
          easeOut: "ease-out",
          easeInOut: "ease-in-out",
          circIn: i9([0, 0.65, 0.55, 1]),
          circOut: i9([0.55, 0, 1, 0.45]),
          backIn: i9([0.31, 0.01, 0.66, -0.59]),
          backOut: i9([0.33, 1.53, 0.69, 0.99]),
        };
      function nt(t) {
        return "function" == typeof t && "applyToOptions" in t;
      }
      class ne extends i1 {
        constructor(t) {
          if ((super(), (this.finishedTime = null), (this.isStopped = !1), !t))
            return;
          let {
            element: e,
            name: i,
            keyframes: n,
            pseudoElement: r,
            allowFlatten: s = !1,
            finalKeyframe: o,
            onComplete: a,
          } = t;
          (this.isPseudoElement = !!r),
            (this.allowFlatten = s),
            (this.options = t),
            Z(
              "string" != typeof t.type,
              'Mini animate() doesn\'t support "type" as a string.',
              "mini-spring"
            );
          let l = (function ({ type: t, ...e }) {
            return nt(t) && i4()
              ? t.applyToOptions(e)
              : (e.duration ?? (e.duration = 300),
                e.ease ?? (e.ease = "easeOut"),
                e);
          })(t);
          (this.animation = (function (
            t,
            e,
            i,
            {
              delay: n = 0,
              duration: r = 300,
              repeat: s = 0,
              repeatType: o = "loop",
              ease: a = "easeOut",
              times: l,
            } = {},
            h
          ) {
            let u = { [e]: i };
            l && (u.offset = l);
            let c = (function t(e, i) {
              if (e)
                return "function" == typeof e
                  ? i4()
                    ? iT(e, i)
                    : "ease-out"
                  : iH(e)
                  ? i9(e)
                  : Array.isArray(e)
                  ? e.map((e) => t(e, i) || i7.easeOut)
                  : i7[e];
            })(a, r);
            Array.isArray(c) && (u.easing = c), ta.value && io.waapi++;
            let f = {
              delay: n,
              duration: r,
              easing: Array.isArray(c) ? "linear" : c,
              fill: "both",
              iterations: s + 1,
              direction: "reverse" === o ? "alternate" : "normal",
            };
            h && (f.pseudoElement = h);
            let p = t.animate(u, f);
            return (
              ta.value &&
                p.finished.finally(() => {
                  io.waapi--;
                }),
              p
            );
          })(e, i, n, l, r)),
            !1 === l.autoplay && this.animation.pause(),
            (this.animation.onfinish = () => {
              if (((this.finishedTime = this.time), !r)) {
                let t = iJ(n, this.options, o, this.speed);
                this.updateMotionValue
                  ? this.updateMotionValue(t)
                  : (function (t, e, i) {
                      e.startsWith("--")
                        ? t.style.setProperty(e, i)
                        : (t.style[e] = i);
                    })(e, i, t),
                  this.animation.cancel();
              }
              a?.(), this.notifyFinished();
            });
        }
        play() {
          this.isStopped ||
            (this.animation.play(),
            "finished" === this.state && this.updateFinished());
        }
        pause() {
          this.animation.pause();
        }
        complete() {
          this.animation.finish?.();
        }
        cancel() {
          try {
            this.animation.cancel();
          } catch (t) {}
        }
        stop() {
          if (this.isStopped) return;
          this.isStopped = !0;
          let { state: t } = this;
          "idle" !== t &&
            "finished" !== t &&
            (this.updateMotionValue
              ? this.updateMotionValue()
              : this.commitStyles(),
            this.isPseudoElement || this.cancel());
        }
        commitStyles() {
          this.isPseudoElement || this.animation.commitStyles?.();
        }
        get duration() {
          return (
            Number(this.animation.effect?.getComputedTiming?.().duration || 0) /
            1e3
          );
        }
        get iterationDuration() {
          let { delay: t = 0 } = this.options || {};
          return this.duration + t / 1e3;
        }
        get time() {
          return (Number(this.animation.currentTime) || 0) / 1e3;
        }
        set time(t) {
          (this.finishedTime = null), (this.animation.currentTime = is(t));
        }
        get speed() {
          return this.animation.playbackRate;
        }
        set speed(t) {
          t < 0 && (this.finishedTime = null),
            (this.animation.playbackRate = t);
        }
        get state() {
          return null !== this.finishedTime
            ? "finished"
            : this.animation.playState;
        }
        get startTime() {
          return Number(this.animation.startTime);
        }
        set startTime(t) {
          this.animation.startTime = t;
        }
        attachTimeline({ timeline: t, observe: e }) {
          return (this.allowFlatten &&
            this.animation.effect?.updateTiming({ easing: "linear" }),
          (this.animation.onfinish = null),
          t && i6())
            ? ((this.animation.timeline = t), tr)
            : e(this);
        }
      }
      let ni = { anticipate: i$, backInOut: iW, circInOut: iX };
      class nn extends ne {
        constructor(t) {
          !(function (t) {
            "string" == typeof t.ease && t.ease in ni && (t.ease = ni[t.ease]);
          })(t),
            i0(t),
            super(t),
            t.startTime && (this.startTime = t.startTime),
            (this.options = t);
        }
        updateMotionValue(t) {
          let {
            motionValue: e,
            onUpdate: i,
            onComplete: n,
            element: r,
            ...s
          } = this.options;
          if (!e) return;
          if (void 0 !== t) return void e.set(t);
          let o = new i5({ ...s, autoplay: !1 }),
            a = is(this.finishedTime ?? this.time);
          e.setWithVelocity(o.sample(a - 10).value, o.sample(a).value, 10),
            o.stop();
        }
      }
      let nr = (t, e) =>
          "zIndex" !== e &&
          !!(
            "number" == typeof t ||
            Array.isArray(t) ||
            ("string" == typeof t &&
              (tU.test(t) || "0" === t) &&
              !t.startsWith("url("))
          ),
        ns = new Set(["opacity", "clipPath", "filter", "transform"]),
        no = i3(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
      class na extends i1 {
        constructor({
          autoplay: t = !0,
          delay: e = 0,
          type: i = "keyframes",
          repeat: n = 0,
          repeatDelay: r = 0,
          repeatType: s = "loop",
          keyframes: o,
          name: a,
          motionValue: l,
          element: h,
          ...u
        }) {
          super(),
            (this.stop = () => {
              this._animation &&
                (this._animation.stop(), this.stopTimeline?.()),
                this.keyframeResolver?.cancel();
            }),
            (this.createdAt = tQ.now());
          let c = {
              autoplay: t,
              delay: e,
              type: i,
              repeat: n,
              repeatDelay: r,
              repeatType: s,
              name: a,
              motionValue: l,
              element: h,
              ...u,
            },
            f = h?.KeyframeResolver || tx;
          (this.keyframeResolver = new f(
            o,
            (t, e, i) => this.onKeyframesResolved(t, e, c, !i),
            a,
            l,
            h
          )),
            this.keyframeResolver?.scheduleResolve();
        }
        onKeyframesResolved(t, e, i, n) {
          this.keyframeResolver = void 0;
          let {
            name: r,
            type: s,
            velocity: o,
            delay: a,
            isHandoff: l,
            onUpdate: h,
          } = i;
          (this.resolvedAt = tQ.now()),
            !(function (t, e, i, n) {
              let r = t[0];
              if (null === r) return !1;
              if ("display" === e || "visibility" === e) return !0;
              let s = t[t.length - 1],
                o = nr(r, e),
                a = nr(s, e);
              return (
                G(
                  o === a,
                  `You are trying to animate ${e} from "${r}" to "${s}". "${
                    o ? s : r
                  }" is not an animatable value.`,
                  "value-not-animatable"
                ),
                !!o &&
                  !!a &&
                  ((function (t) {
                    let e = t[0];
                    if (1 === t.length) return !0;
                    for (let i = 0; i < t.length; i++)
                      if (t[i] !== e) return !0;
                  })(t) ||
                    (("spring" === i || nt(i)) && n))
              );
            })(t, r, s, o) &&
              ((ts.instantAnimations || !a) && h?.(iJ(t, i, e)),
              (t[0] = t[t.length - 1]),
              ie(i),
              (i.repeat = 0));
          let u = {
              startTime: n
                ? this.resolvedAt && this.resolvedAt - this.createdAt > 40
                  ? this.resolvedAt
                  : this.createdAt
                : void 0,
              finalKeyframe: e,
              ...i,
              keyframes: t,
            },
            c =
              !l &&
              (function (t) {
                let {
                  motionValue: e,
                  name: i,
                  repeatDelay: n,
                  repeatType: r,
                  damping: s,
                  type: o,
                } = t;
                if (!(e?.owner?.current instanceof HTMLElement)) return !1;
                let { onUpdate: a, transformTemplate: l } = e.owner.getProps();
                return (
                  no() &&
                  i &&
                  ns.has(i) &&
                  ("transform" !== i || !l) &&
                  !a &&
                  !n &&
                  "mirror" !== r &&
                  0 !== s &&
                  "inertia" !== o
                );
              })(u)
                ? new nn({ ...u, element: u.motionValue.owner.current })
                : new i5(u);
          c.finished.then(() => this.notifyFinished()).catch(tr),
            this.pendingTimeline &&
              ((this.stopTimeline = c.attachTimeline(this.pendingTimeline)),
              (this.pendingTimeline = void 0)),
            (this._animation = c);
        }
        get finished() {
          return this._animation ? this.animation.finished : this._finished;
        }
        then(t, e) {
          return this.finished.finally(t).then(() => {});
        }
        get animation() {
          return (
            this._animation ||
              (this.keyframeResolver?.resume(),
              (ty = !0),
              tv(),
              tg(),
              (ty = !1)),
            this._animation
          );
        }
        get duration() {
          return this.animation.duration;
        }
        get iterationDuration() {
          return this.animation.iterationDuration;
        }
        get time() {
          return this.animation.time;
        }
        set time(t) {
          this.animation.time = t;
        }
        get speed() {
          return this.animation.speed;
        }
        get state() {
          return this.animation.state;
        }
        set speed(t) {
          this.animation.speed = t;
        }
        get startTime() {
          return this.animation.startTime;
        }
        attachTimeline(t) {
          return (
            this._animation
              ? (this.stopTimeline = this.animation.attachTimeline(t))
              : (this.pendingTimeline = t),
            () => this.stop()
          );
        }
        play() {
          this.animation.play();
        }
        pause() {
          this.animation.pause();
        }
        complete() {
          this.animation.complete();
        }
        cancel() {
          this._animation && this.animation.cancel(),
            this.keyframeResolver?.cancel();
        }
      }
      let nl = (t) => null !== t,
        nh = { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 },
        nu = { type: "keyframes", duration: 0.8 },
        nc = { type: "keyframes", ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
        nf =
          (t, e, i, n = {}, r, s) =>
          (a) => {
            let l = e9(n, t) || {},
              h = l.delay || n.delay || 0,
              { elapsed: u = 0 } = n;
            u -= is(h);
            let c = {
              keyframes: Array.isArray(i) ? i : [null, i],
              ease: "easeOut",
              velocity: e.getVelocity(),
              ...l,
              delay: -u,
              onUpdate: (t) => {
                e.set(t), l.onUpdate && l.onUpdate(t);
              },
              onComplete: () => {
                a(), l.onComplete && l.onComplete();
              },
              name: t,
              motionValue: e,
              element: s ? void 0 : r,
            };
            !(function ({
              when: t,
              delay: e,
              delayChildren: i,
              staggerChildren: n,
              staggerDirection: r,
              repeat: s,
              repeatType: o,
              repeatDelay: a,
              from: l,
              elapsed: h,
              ...u
            }) {
              return !!Object.keys(u).length;
            })(l) &&
              Object.assign(
                c,
                ((t, { keyframes: e }) =>
                  e.length > 2
                    ? nu
                    : o.has(t)
                    ? t.startsWith("scale")
                      ? {
                          type: "spring",
                          stiffness: 550,
                          damping: 0 === e[1] ? 2 * Math.sqrt(550) : 30,
                          restSpeed: 10,
                        }
                      : nh
                    : nc)(t, c)
              ),
              c.duration && (c.duration = is(c.duration)),
              c.repeatDelay && (c.repeatDelay = is(c.repeatDelay)),
              void 0 !== c.from && (c.keyframes[0] = c.from);
            let f = !1;
            if (
              ((!1 !== c.type && (0 !== c.duration || c.repeatDelay)) ||
                (ie(c), 0 === c.delay && (f = !0)),
              (ts.instantAnimations || ts.skipAnimations) &&
                ((f = !0), ie(c), (c.delay = 0)),
              (c.allowFlatten = !l.type && !l.ease),
              f && !s && void 0 !== e.get())
            ) {
              let t = (function (t, { repeat: e, repeatType: i = "loop" }, n) {
                let r = t.filter(nl),
                  s = e && "loop" !== i && e % 2 == 1 ? 0 : r.length - 1;
                return r[s];
              })(c.keyframes, l);
              if (void 0 !== t)
                return void th.update(() => {
                  c.onUpdate(t), c.onComplete();
                });
            }
            return l.isSync ? new i5(c) : new na(c);
          };
      function np(t, e, { delay: i = 0, transitionOverride: n, type: r } = {}) {
        let {
          transition: s = t.getDefaultTransition(),
          transitionEnd: o,
          ...a
        } = e;
        n && (s = n);
        let l = [],
          h = r && t.animationState && t.animationState.getState()[r];
        for (let e in a) {
          let n = t.getValue(e, t.latestValues[e] ?? null),
            r = a[e];
          if (
            void 0 === r ||
            (h &&
              (function ({ protectedKeys: t, needsAnimating: e }, i) {
                let n = t.hasOwnProperty(i) && !0 !== e[i];
                return (e[i] = !1), n;
              })(h, e))
          )
            continue;
          let o = { delay: i, ...e9(s || {}, e) },
            u = n.get();
          if (
            void 0 !== u &&
            !n.isAnimating &&
            !Array.isArray(r) &&
            r === u &&
            !o.velocity
          )
            continue;
          let c = !1;
          if (window.MotionHandoffAnimation) {
            let i = t.props[e5];
            if (i) {
              let t = window.MotionHandoffAnimation(i, e, th);
              null !== t && ((o.startTime = t), (c = !0));
            }
          }
          it(t, e),
            n.start(
              nf(
                e,
                n,
                r,
                t.shouldReduceMotion && j.has(e) ? { type: !1 } : o,
                t,
                c
              )
            );
          let f = n.animation;
          f && l.push(f);
        }
        return (
          o &&
            Promise.all(l).then(() => {
              th.update(() => {
                o &&
                  (function (t, e) {
                    let {
                      transitionEnd: i = {},
                      transition: n = {},
                      ...r
                    } = e4(t, e) || {};
                    for (let e in (r = { ...r, ...i })) {
                      var s;
                      let i = e7((s = r[e])) ? s[s.length - 1] || 0 : s;
                      t.hasValue(e)
                        ? t.getValue(e).set(i)
                        : t.addValue(e, t6(i));
                    }
                  })(t, o);
              });
            }),
          l
        );
      }
      function nd(t, e, i, n = 0, r = 1) {
        let s = Array.from(t)
            .sort((t, e) => t.sortNodePosition(e))
            .indexOf(e),
          o = t.size,
          a = (o - 1) * n;
        return "function" == typeof i ? i(s, o) : 1 === r ? s * n : a - s * n;
      }
      function nm(t, e, i = {}) {
        let n = e4(
            t,
            e,
            "exit" === i.type ? t.presenceContext?.custom : void 0
          ),
          { transition: r = t.getDefaultTransition() || {} } = n || {};
        i.transitionOverride && (r = i.transitionOverride);
        let s = n ? () => Promise.all(np(t, n, i)) : () => Promise.resolve(),
          o =
            t.variantChildren && t.variantChildren.size
              ? (n = 0) => {
                  let {
                    delayChildren: s = 0,
                    staggerChildren: o,
                    staggerDirection: a,
                  } = r;
                  return (function (t, e, i = 0, n = 0, r = 0, s = 1, o) {
                    let a = [];
                    for (let l of t.variantChildren)
                      l.notify("AnimationStart", e),
                        a.push(
                          nm(l, e, {
                            ...o,
                            delay:
                              i +
                              ("function" == typeof n ? 0 : n) +
                              nd(t.variantChildren, l, n, r, s),
                          }).then(() => l.notify("AnimationComplete", e))
                        );
                    return Promise.all(a);
                  })(t, e, n, s, o, a, i);
                }
              : () => Promise.resolve(),
          { when: a } = r;
        if (!a) return Promise.all([s(), o(i.delay)]);
        {
          let [t, e] = "beforeChildren" === a ? [s, o] : [o, s];
          return t().then(() => e());
        }
      }
      function ny(t, e) {
        if (!Array.isArray(e)) return !1;
        let i = e.length;
        if (i !== t.length) return !1;
        for (let n = 0; n < i; n++) if (e[n] !== t[n]) return !1;
        return !0;
      }
      let ng = ec.length,
        nv = [...eu].reverse(),
        nx = eu.length;
      function nw(t = !1) {
        return {
          isActive: t,
          protectedKeys: {},
          needsAnimating: {},
          prevResolvedValues: {},
        };
      }
      function nb() {
        return {
          animate: nw(!0),
          whileInView: nw(),
          whileHover: nw(),
          whileTap: nw(),
          whileDrag: nw(),
          whileFocus: nw(),
          exit: nw(),
        };
      }
      class nT {
        constructor(t) {
          (this.isMounted = !1), (this.node = t);
        }
        update() {}
      }
      class nA extends nT {
        constructor(t) {
          super(t),
            t.animationState ||
              (t.animationState = (function (t) {
                let e = (e) =>
                    Promise.all(
                      e.map(({ animation: e, options: i }) =>
                        (function (t, e, i = {}) {
                          let n;
                          if ((t.notify("AnimationStart", e), Array.isArray(e)))
                            n = Promise.all(e.map((e) => nm(t, e, i)));
                          else if ("string" == typeof e) n = nm(t, e, i);
                          else {
                            let r =
                              "function" == typeof e ? e4(t, e, i.custom) : e;
                            n = Promise.all(np(t, r, i));
                          }
                          return n.then(() => {
                            t.notify("AnimationComplete", e);
                          });
                        })(t, e, i)
                      )
                    ),
                  i = nb(),
                  n = !0,
                  r = (e) => (i, n) => {
                    let r = e4(
                      t,
                      n,
                      "exit" === e ? t.presenceContext?.custom : void 0
                    );
                    if (r) {
                      let { transition: t, transitionEnd: e, ...n } = r;
                      i = { ...i, ...n, ...e };
                    }
                    return i;
                  };
                function s(s) {
                  let { props: o } = t,
                    a =
                      (function t(e) {
                        if (!e) return;
                        if (!e.isControllingVariants) {
                          let i = (e.parent && t(e.parent)) || {};
                          return (
                            void 0 !== e.props.initial &&
                              (i.initial = e.props.initial),
                            i
                          );
                        }
                        let i = {};
                        for (let t = 0; t < ng; t++) {
                          let n = ec[t],
                            r = e.props[n];
                          (eh(r) || !1 === r) && (i[n] = r);
                        }
                        return i;
                      })(t.parent) || {},
                    l = [],
                    h = new Set(),
                    u = {},
                    c = 1 / 0;
                  for (let e = 0; e < nx; e++) {
                    var f, p;
                    let d = nv[e],
                      m = i[d],
                      y = void 0 !== o[d] ? o[d] : a[d],
                      g = eh(y),
                      v = d === s ? m.isActive : null;
                    !1 === v && (c = e);
                    let x = y === a[d] && y !== o[d] && g;
                    if (
                      (x && n && t.manuallyAnimateOnMount && (x = !1),
                      (m.protectedKeys = { ...u }),
                      (!m.isActive && null === v) ||
                        (!y && !m.prevProp) ||
                        el(y) ||
                        "boolean" == typeof y)
                    )
                      continue;
                    let w =
                        ((f = m.prevProp),
                        "string" == typeof (p = y)
                          ? p !== f
                          : !!Array.isArray(p) && !ny(p, f)),
                      b =
                        w || (d === s && m.isActive && !x && g) || (e > c && g),
                      T = !1,
                      A = Array.isArray(y) ? y : [y],
                      P = A.reduce(r(d), {});
                    !1 === v && (P = {});
                    let { prevResolvedValues: S = {} } = m,
                      E = { ...S, ...P },
                      M = (e) => {
                        (b = !0),
                          h.has(e) && ((T = !0), h.delete(e)),
                          (m.needsAnimating[e] = !0);
                        let i = t.getValue(e);
                        i && (i.liveStyle = !1);
                      };
                    for (let t in E) {
                      let e = P[t],
                        i = S[t];
                      if (!u.hasOwnProperty(t))
                        (e7(e) && e7(i) ? ny(e, i) : e === i)
                          ? void 0 !== e && h.has(t)
                            ? M(t)
                            : (m.protectedKeys[t] = !0)
                          : null != e
                          ? M(t)
                          : h.add(t);
                    }
                    (m.prevProp = y),
                      (m.prevResolvedValues = P),
                      m.isActive && (u = { ...u, ...P }),
                      n && t.blockInitialAnimation && (b = !1);
                    let C = x && w,
                      V = !C || T;
                    b &&
                      V &&
                      l.push(
                        ...A.map((e) => {
                          let i = { type: d };
                          if (
                            "string" == typeof e &&
                            n &&
                            !C &&
                            t.manuallyAnimateOnMount &&
                            t.parent
                          ) {
                            let { parent: n } = t,
                              r = e4(n, e);
                            if (n.enteringChildren && r) {
                              let { delayChildren: e } = r.transition || {};
                              i.delay = nd(n.enteringChildren, t, e);
                            }
                          }
                          return { animation: e, options: i };
                        })
                      );
                  }
                  if (h.size) {
                    let e = {};
                    if ("boolean" != typeof o.initial) {
                      let i = e4(
                        t,
                        Array.isArray(o.initial) ? o.initial[0] : o.initial
                      );
                      i && i.transition && (e.transition = i.transition);
                    }
                    h.forEach((i) => {
                      let n = t.getBaseTarget(i),
                        r = t.getValue(i);
                      r && (r.liveStyle = !0), (e[i] = n ?? null);
                    }),
                      l.push({ animation: e });
                  }
                  let d = !!l.length;
                  return (
                    n &&
                      (!1 === o.initial || o.initial === o.animate) &&
                      !t.manuallyAnimateOnMount &&
                      (d = !1),
                    (n = !1),
                    d ? e(l) : Promise.resolve()
                  );
                }
                return {
                  animateChanges: s,
                  setActive: function (e, n) {
                    if (i[e].isActive === n) return Promise.resolve();
                    t.variantChildren?.forEach((t) =>
                      t.animationState?.setActive(e, n)
                    ),
                      (i[e].isActive = n);
                    let r = s(e);
                    for (let t in i) i[t].protectedKeys = {};
                    return r;
                  },
                  setAnimateFunction: function (i) {
                    e = i(t);
                  },
                  getState: () => i,
                  reset: () => {
                    (i = nb()), (n = !0);
                  },
                };
              })(t));
        }
        updateAnimationControlsSubscription() {
          let { animate: t } = this.node.getProps();
          el(t) && (this.unmountControls = t.subscribe(this.node));
        }
        mount() {
          this.updateAnimationControlsSubscription();
        }
        update() {
          let { animate: t } = this.node.getProps(),
            { animate: e } = this.node.prevProps || {};
          t !== e && this.updateAnimationControlsSubscription();
        }
        unmount() {
          this.node.animationState.reset(), this.unmountControls?.();
        }
      }
      let nP = 0;
      class nS extends nT {
        constructor() {
          super(...arguments), (this.id = nP++);
        }
        update() {
          if (!this.node.presenceContext) return;
          let { isPresent: t, onExitComplete: e } = this.node.presenceContext,
            { isPresent: i } = this.node.prevPresenceContext || {};
          if (!this.node.animationState || t === i) return;
          let n = this.node.animationState.setActive("exit", !t);
          e &&
            !t &&
            n.then(() => {
              e(this.id);
            });
        }
        mount() {
          let { register: t, onExitComplete: e } =
            this.node.presenceContext || {};
          e && e(this.id), t && (this.unmount = t(this.id));
        }
        unmount() {}
      }
      let nE = { x: !1, y: !1 };
      function nM(t, e, i, n = { passive: !0 }) {
        return t.addEventListener(e, i, n), () => t.removeEventListener(e, i);
      }
      let nC = (t) =>
        "mouse" === t.pointerType
          ? "number" != typeof t.button || t.button <= 0
          : !1 !== t.isPrimary;
      function nV(t) {
        return { point: { x: t.pageX, y: t.pageY } };
      }
      function nk(t, e, i, n) {
        return nM(t, e, (t) => nC(t) && i(t, nV(t)), n);
      }
      function nD(t) {
        return t.max - t.min;
      }
      function nR(t, e, i, n = 0.5) {
        (t.origin = n),
          (t.originPoint = A(e.min, e.max, t.origin)),
          (t.scale = nD(i) / nD(e)),
          (t.translate = A(i.min, i.max, t.origin) - t.originPoint),
          ((t.scale >= 0.9999 && t.scale <= 1.0001) || isNaN(t.scale)) &&
            (t.scale = 1),
          ((t.translate >= -0.01 && t.translate <= 0.01) ||
            isNaN(t.translate)) &&
            (t.translate = 0);
      }
      function nB(t, e, i, n) {
        nR(t.x, e.x, i.x, n ? n.originX : void 0),
          nR(t.y, e.y, i.y, n ? n.originY : void 0);
      }
      function nL(t, e, i) {
        (t.min = i.min + e.min), (t.max = t.min + nD(e));
      }
      function nj(t, e, i) {
        (t.min = e.min - i.min), (t.max = t.min + nD(e));
      }
      function nF(t, e, i) {
        nj(t.x, e.x, i.x), nj(t.y, e.y, i.y);
      }
      function nI(t) {
        return [t("x"), t("y")];
      }
      let nO = ({ current: t }) => (t ? t.ownerDocument.defaultView : null),
        nU = (t, e) => Math.abs(t - e);
      class nN {
        constructor(
          t,
          e,
          {
            transformPagePoint: i,
            contextWindow: n = window,
            dragSnapToOrigin: r = !1,
            distanceThreshold: s = 3,
          } = {}
        ) {
          if (
            ((this.startEvent = null),
            (this.lastMoveEvent = null),
            (this.lastMoveEventInfo = null),
            (this.handlers = {}),
            (this.contextWindow = window),
            (this.updatePoint = () => {
              if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
              let t = nz(this.lastMoveEventInfo, this.history),
                e = null !== this.startEvent,
                i =
                  (function (t, e) {
                    return Math.sqrt(nU(t.x, e.x) ** 2 + nU(t.y, e.y) ** 2);
                  })(t.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
              if (!e && !i) return;
              let { point: n } = t,
                { timestamp: r } = tc;
              this.history.push({ ...n, timestamp: r });
              let { onStart: s, onMove: o } = this.handlers;
              e ||
                (s && s(this.lastMoveEvent, t),
                (this.startEvent = this.lastMoveEvent)),
                o && o(this.lastMoveEvent, t);
            }),
            (this.handlePointerMove = (t, e) => {
              (this.lastMoveEvent = t),
                (this.lastMoveEventInfo = nW(e, this.transformPagePoint)),
                th.update(this.updatePoint, !0);
            }),
            (this.handlePointerUp = (t, e) => {
              this.end();
              let {
                onEnd: i,
                onSessionEnd: n,
                resumeAnimation: r,
              } = this.handlers;
              if (
                (this.dragSnapToOrigin && r && r(),
                !(this.lastMoveEvent && this.lastMoveEventInfo))
              )
                return;
              let s = nz(
                "pointercancel" === t.type
                  ? this.lastMoveEventInfo
                  : nW(e, this.transformPagePoint),
                this.history
              );
              this.startEvent && i && i(t, s), n && n(t, s);
            }),
            !nC(t))
          )
            return;
          (this.dragSnapToOrigin = r),
            (this.handlers = e),
            (this.transformPagePoint = i),
            (this.distanceThreshold = s),
            (this.contextWindow = n || window);
          let o = nW(nV(t), this.transformPagePoint),
            { point: a } = o,
            { timestamp: l } = tc;
          this.history = [{ ...a, timestamp: l }];
          let { onSessionStart: h } = e;
          h && h(t, nz(o, this.history)),
            (this.removeListeners = ir(
              nk(this.contextWindow, "pointermove", this.handlePointerMove),
              nk(this.contextWindow, "pointerup", this.handlePointerUp),
              nk(this.contextWindow, "pointercancel", this.handlePointerUp)
            ));
        }
        updateHandlers(t) {
          this.handlers = t;
        }
        end() {
          this.removeListeners && this.removeListeners(), tu(this.updatePoint);
        }
      }
      function nW(t, e) {
        return e ? { point: e(t.point) } : t;
      }
      function n$(t, e) {
        return { x: t.x - e.x, y: t.y - e.y };
      }
      function nz({ point: t }, e) {
        return {
          point: t,
          delta: n$(t, nY(e)),
          offset: n$(t, e[0]),
          velocity: (function (t, e) {
            if (t.length < 2) return { x: 0, y: 0 };
            let i = t.length - 1,
              n = null,
              r = nY(t);
            for (
              ;
              i >= 0 && ((n = t[i]), !(r.timestamp - n.timestamp > is(0.1)));

            )
              i--;
            if (!n) return { x: 0, y: 0 };
            let s = (r.timestamp - n.timestamp) / 1e3;
            if (0 === s) return { x: 0, y: 0 };
            let o = { x: (r.x - n.x) / s, y: (r.y - n.y) / s };
            return o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o;
          })(e, 0.1),
        };
      }
      function nY(t) {
        return t[t.length - 1];
      }
      function nX(t, e, i) {
        return {
          min: void 0 !== e ? t.min + e : void 0,
          max: void 0 !== i ? t.max + i - (t.max - t.min) : void 0,
        };
      }
      function nH(t, e) {
        let i = e.min - t.min,
          n = e.max - t.max;
        return (
          e.max - e.min < t.max - t.min && ([i, n] = [n, i]), { min: i, max: n }
        );
      }
      function n_(t, e, i) {
        return { min: nK(t, e), max: nK(t, i) };
      }
      function nK(t, e) {
        return "number" == typeof t ? t : t[e] || 0;
      }
      let nq = new WeakMap();
      class nG {
        constructor(t) {
          (this.openDragLock = null),
            (this.isDragging = !1),
            (this.currentDirection = null),
            (this.originPoint = { x: 0, y: 0 }),
            (this.constraints = !1),
            (this.hasMutatedConstraints = !1),
            (this.elastic = en()),
            (this.latestPointerEvent = null),
            (this.latestPanInfo = null),
            (this.visualElement = t);
        }
        start(t, { snapToCursor: e = !1, distanceThreshold: i } = {}) {
          let { presenceContext: n } = this.visualElement;
          if (n && !1 === n.isPresent) return;
          let r = (t) => {
              let { dragSnapToOrigin: i } = this.getProps();
              i ? this.pauseAnimation() : this.stopAnimation(),
                e && this.snapToCursor(nV(t).point);
            },
            s = (t, e) => {
              let {
                drag: i,
                dragPropagation: n,
                onDragStart: r,
              } = this.getProps();
              if (
                i &&
                !n &&
                (this.openDragLock && this.openDragLock(),
                (this.openDragLock = (function (t) {
                  if ("x" === t || "y" === t)
                    if (nE[t]) return null;
                    else
                      return (
                        (nE[t] = !0),
                        () => {
                          nE[t] = !1;
                        }
                      );
                  return nE.x || nE.y
                    ? null
                    : ((nE.x = nE.y = !0),
                      () => {
                        nE.x = nE.y = !1;
                      });
                })(i)),
                !this.openDragLock)
              )
                return;
              (this.latestPointerEvent = t),
                (this.latestPanInfo = e),
                (this.isDragging = !0),
                (this.currentDirection = null),
                this.resolveConstraints(),
                this.visualElement.projection &&
                  ((this.visualElement.projection.isAnimationBlocked = !0),
                  (this.visualElement.projection.target = void 0)),
                nI((t) => {
                  let e = this.getAxisMotionValue(t).get() || 0;
                  if ($.test(e)) {
                    let { projection: i } = this.visualElement;
                    if (i && i.layout) {
                      let n = i.layout.layoutBox[t];
                      n && (e = nD(n) * (parseFloat(e) / 100));
                    }
                  }
                  this.originPoint[t] = e;
                }),
                r && th.postRender(() => r(t, e)),
                it(this.visualElement, "transform");
              let { animationState: s } = this.visualElement;
              s && s.setActive("whileDrag", !0);
            },
            o = (t, e) => {
              (this.latestPointerEvent = t), (this.latestPanInfo = e);
              let {
                dragPropagation: i,
                dragDirectionLock: n,
                onDirectionLock: r,
                onDrag: s,
              } = this.getProps();
              if (!i && !this.openDragLock) return;
              let { offset: o } = e;
              if (n && null === this.currentDirection) {
                (this.currentDirection = (function (t, e = 10) {
                  let i = null;
                  return (
                    Math.abs(t.y) > e
                      ? (i = "y")
                      : Math.abs(t.x) > e && (i = "x"),
                    i
                  );
                })(o)),
                  null !== this.currentDirection &&
                    r &&
                    r(this.currentDirection);
                return;
              }
              this.updateAxis("x", e.point, o),
                this.updateAxis("y", e.point, o),
                this.visualElement.render(),
                s && s(t, e);
            },
            a = (t, e) => {
              (this.latestPointerEvent = t),
                (this.latestPanInfo = e),
                this.stop(t, e),
                (this.latestPointerEvent = null),
                (this.latestPanInfo = null);
            },
            l = () =>
              nI(
                (t) =>
                  "paused" === this.getAnimationState(t) &&
                  this.getAxisMotionValue(t).animation?.play()
              ),
            { dragSnapToOrigin: h } = this.getProps();
          this.panSession = new nN(
            t,
            {
              onSessionStart: r,
              onStart: s,
              onMove: o,
              onSessionEnd: a,
              resumeAnimation: l,
            },
            {
              transformPagePoint: this.visualElement.getTransformPagePoint(),
              dragSnapToOrigin: h,
              distanceThreshold: i,
              contextWindow: nO(this.visualElement),
            }
          );
        }
        stop(t, e) {
          let i = t || this.latestPointerEvent,
            n = e || this.latestPanInfo,
            r = this.isDragging;
          if ((this.cancel(), !r || !n || !i)) return;
          let { velocity: s } = n;
          this.startAnimation(s);
          let { onDragEnd: o } = this.getProps();
          o && th.postRender(() => o(i, n));
        }
        cancel() {
          this.isDragging = !1;
          let { projection: t, animationState: e } = this.visualElement;
          t && (t.isAnimationBlocked = !1),
            this.panSession && this.panSession.end(),
            (this.panSession = void 0);
          let { dragPropagation: i } = this.getProps();
          !i &&
            this.openDragLock &&
            (this.openDragLock(), (this.openDragLock = null)),
            e && e.setActive("whileDrag", !1);
        }
        updateAxis(t, e, i) {
          let { drag: n } = this.getProps();
          if (!i || !nZ(t, n, this.currentDirection)) return;
          let r = this.getAxisMotionValue(t),
            s = this.originPoint[t] + i[t];
          this.constraints &&
            this.constraints[t] &&
            (s = (function (t, { min: e, max: i }, n) {
              return (
                void 0 !== e && t < e
                  ? (t = n ? A(e, t, n.min) : Math.max(t, e))
                  : void 0 !== i &&
                    t > i &&
                    (t = n ? A(i, t, n.max) : Math.min(t, i)),
                t
              );
            })(s, this.constraints[t], this.elastic[t])),
            r.set(s);
        }
        resolveConstraints() {
          let { dragConstraints: t, dragElastic: e } = this.getProps(),
            i =
              this.visualElement.projection &&
              !this.visualElement.projection.layout
                ? this.visualElement.projection.measure(!1)
                : this.visualElement.projection?.layout,
            n = this.constraints;
          t && e2(t)
            ? this.constraints ||
              (this.constraints = this.resolveRefConstraints())
            : t && i
            ? (this.constraints = (function (
                t,
                { top: e, left: i, bottom: n, right: r }
              ) {
                return { x: nX(t.x, i, r), y: nX(t.y, e, n) };
              })(i.layoutBox, t))
            : (this.constraints = !1),
            (this.elastic = (function (t = 0.35) {
              return (
                !1 === t ? (t = 0) : !0 === t && (t = 0.35),
                { x: n_(t, "left", "right"), y: n_(t, "top", "bottom") }
              );
            })(e)),
            n !== this.constraints &&
              i &&
              this.constraints &&
              !this.hasMutatedConstraints &&
              nI((t) => {
                !1 !== this.constraints &&
                  this.getAxisMotionValue(t) &&
                  (this.constraints[t] = (function (t, e) {
                    let i = {};
                    return (
                      void 0 !== e.min && (i.min = e.min - t.min),
                      void 0 !== e.max && (i.max = e.max - t.min),
                      i
                    );
                  })(i.layoutBox[t], this.constraints[t]));
              });
        }
        resolveRefConstraints() {
          var t;
          let { dragConstraints: e, onMeasureDragConstraints: i } =
            this.getProps();
          if (!e || !e2(e)) return !1;
          let n = e.current;
          Z(
            null !== n,
            "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.",
            "drag-constraints-ref"
          );
          let { projection: r } = this.visualElement;
          if (!r || !r.layout) return !1;
          let s = (function (t, e, i) {
              let n = L(t, i),
                { scroll: r } = e;
              return r && (D(n.x, r.offset.x), D(n.y, r.offset.y)), n;
            })(n, r.root, this.visualElement.getTransformPagePoint()),
            o =
              ((t = r.layout.layoutBox), { x: nH(t.x, s.x), y: nH(t.y, s.y) });
          if (i) {
            let t = i(
              (function ({ x: t, y: e }) {
                return { top: e.min, right: t.max, bottom: e.max, left: t.min };
              })(o)
            );
            (this.hasMutatedConstraints = !!t), t && (o = T(t));
          }
          return o;
        }
        startAnimation(t) {
          let {
              drag: e,
              dragMomentum: i,
              dragElastic: n,
              dragTransition: r,
              dragSnapToOrigin: s,
              onDragTransitionEnd: o,
            } = this.getProps(),
            a = this.constraints || {};
          return Promise.all(
            nI((o) => {
              if (!nZ(o, e, this.currentDirection)) return;
              let l = (a && a[o]) || {};
              s && (l = { min: 0, max: 0 });
              let h = {
                type: "inertia",
                velocity: i ? t[o] : 0,
                bounceStiffness: n ? 200 : 1e6,
                bounceDamping: n ? 40 : 1e7,
                timeConstant: 750,
                restDelta: 1,
                restSpeed: 10,
                ...r,
                ...l,
              };
              return this.startAxisValueAnimation(o, h);
            })
          ).then(o);
        }
        startAxisValueAnimation(t, e) {
          let i = this.getAxisMotionValue(t);
          return (
            it(this.visualElement, t),
            i.start(nf(t, i, 0, e, this.visualElement, !1))
          );
        }
        stopAnimation() {
          nI((t) => this.getAxisMotionValue(t).stop());
        }
        pauseAnimation() {
          nI((t) => this.getAxisMotionValue(t).animation?.pause());
        }
        getAnimationState(t) {
          return this.getAxisMotionValue(t).animation?.state;
        }
        getAxisMotionValue(t) {
          let e = `_drag${t.toUpperCase()}`,
            i = this.visualElement.getProps();
          return (
            i[e] ||
            this.visualElement.getValue(
              t,
              (i.initial ? i.initial[t] : void 0) || 0
            )
          );
        }
        snapToCursor(t) {
          nI((e) => {
            let { drag: i } = this.getProps();
            if (!nZ(e, i, this.currentDirection)) return;
            let { projection: n } = this.visualElement,
              r = this.getAxisMotionValue(e);
            if (n && n.layout) {
              let { min: i, max: s } = n.layout.layoutBox[e];
              r.set(t[e] - A(i, s, 0.5));
            }
          });
        }
        scalePositionWithinConstraints() {
          if (!this.visualElement.current) return;
          let { drag: t, dragConstraints: e } = this.getProps(),
            { projection: i } = this.visualElement;
          if (!e2(e) || !i || !this.constraints) return;
          this.stopAnimation();
          let n = { x: 0, y: 0 };
          nI((t) => {
            let e = this.getAxisMotionValue(t);
            if (e && !1 !== this.constraints) {
              let i = e.get();
              n[t] = (function (t, e) {
                let i = 0.5,
                  n = nD(t),
                  r = nD(e);
                return (
                  r > n
                    ? (i = iq(e.min, e.max - n, t.min))
                    : n > r && (i = iq(t.min, t.max - r, e.min)),
                  F(0, 1, i)
                );
              })({ min: i, max: i }, this.constraints[t]);
            }
          });
          let { transformTemplate: r } = this.visualElement.getProps();
          (this.visualElement.current.style.transform = r ? r({}, "") : "none"),
            i.root && i.root.updateScroll(),
            i.updateLayout(),
            this.resolveConstraints(),
            nI((e) => {
              if (!nZ(e, t, null)) return;
              let i = this.getAxisMotionValue(e),
                { min: r, max: s } = this.constraints[e];
              i.set(A(r, s, n[e]));
            });
        }
        addListeners() {
          if (!this.visualElement.current) return;
          nq.set(this.visualElement, this);
          let t = nk(this.visualElement.current, "pointerdown", (t) => {
              let { drag: e, dragListener: i = !0 } = this.getProps();
              e && i && this.start(t);
            }),
            e = () => {
              let { dragConstraints: t } = this.getProps();
              e2(t) &&
                t.current &&
                (this.constraints = this.resolveRefConstraints());
            },
            { projection: i } = this.visualElement,
            n = i.addEventListener("measure", e);
          i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()),
            th.read(e);
          let r = nM(window, "resize", () =>
              this.scalePositionWithinConstraints()
            ),
            s = i.addEventListener(
              "didUpdate",
              ({ delta: t, hasLayoutChanged: e }) => {
                this.isDragging &&
                  e &&
                  (nI((e) => {
                    let i = this.getAxisMotionValue(e);
                    i &&
                      ((this.originPoint[e] += t[e].translate),
                      i.set(i.get() + t[e].translate));
                  }),
                  this.visualElement.render());
              }
            );
          return () => {
            r(), t(), n(), s && s();
          };
        }
        getProps() {
          let t = this.visualElement.getProps(),
            {
              drag: e = !1,
              dragDirectionLock: i = !1,
              dragPropagation: n = !1,
              dragConstraints: r = !1,
              dragElastic: s = 0.35,
              dragMomentum: o = !0,
            } = t;
          return {
            ...t,
            drag: e,
            dragDirectionLock: i,
            dragPropagation: n,
            dragConstraints: r,
            dragElastic: s,
            dragMomentum: o,
          };
        }
      }
      function nZ(t, e, i) {
        return (!0 === e || e === t) && (null === i || i === t);
      }
      class nJ extends nT {
        constructor(t) {
          super(t),
            (this.removeGroupControls = tr),
            (this.removeListeners = tr),
            (this.controls = new nG(t));
        }
        mount() {
          let { dragControls: t } = this.node.getProps();
          t && (this.removeGroupControls = t.subscribe(this.controls)),
            (this.removeListeners = this.controls.addListeners() || tr);
        }
        unmount() {
          this.removeGroupControls(), this.removeListeners();
        }
      }
      let nQ = (t) => (e, i) => {
        t && th.postRender(() => t(e, i));
      };
      class n0 extends nT {
        constructor() {
          super(...arguments), (this.removePointerDownListener = tr);
        }
        onPointerDown(t) {
          this.session = new nN(t, this.createPanHandlers(), {
            transformPagePoint: this.node.getTransformPagePoint(),
            contextWindow: nO(this.node),
          });
        }
        createPanHandlers() {
          let {
            onPanSessionStart: t,
            onPanStart: e,
            onPan: i,
            onPanEnd: n,
          } = this.node.getProps();
          return {
            onSessionStart: nQ(t),
            onStart: nQ(e),
            onMove: i,
            onEnd: (t, e) => {
              delete this.session, n && th.postRender(() => n(t, e));
            },
          };
        }
        mount() {
          this.removePointerDownListener = nk(
            this.node.current,
            "pointerdown",
            (t) => this.onPointerDown(t)
          );
        }
        update() {
          this.session && this.session.updateHandlers(this.createPanHandlers());
        }
        unmount() {
          this.removePointerDownListener(), this.session && this.session.end();
        }
      }
      let n1 = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
      function n2(t, e) {
        return e.max === e.min ? 0 : (t / (e.max - e.min)) * 100;
      }
      let n5 = {
          correct: (t, e) => {
            if (!e.target) return t;
            if ("string" == typeof t)
              if (!z.test(t)) return t;
              else t = parseFloat(t);
            let i = n2(t, e.target.x),
              n = n2(t, e.target.y);
            return `${i}% ${n}%`;
          },
        },
        n3 = !1;
      class n6 extends r.Component {
        componentDidMount() {
          let {
              visualElement: t,
              layoutGroup: e,
              switchLayoutGroup: i,
              layoutId: n,
            } = this.props,
            { projection: r } = t;
          for (let t in n4) (eP[t] = n4[t]), v(t) && (eP[t].isCSSVariable = !0);
          r &&
            (e.group && e.group.add(r),
            i && i.register && n && i.register(r),
            n3 && r.root.didUpdate(),
            r.addEventListener("animationComplete", () => {
              this.safeToRemove();
            }),
            r.setOptions({
              ...r.options,
              onExitComplete: () => this.safeToRemove(),
            })),
            (n1.hasEverUpdated = !0);
        }
        getSnapshotBeforeUpdate(t) {
          let {
              layoutDependency: e,
              visualElement: i,
              drag: n,
              isPresent: r,
            } = this.props,
            { projection: s } = i;
          return (
            s &&
              ((s.isPresent = r),
              (n3 = !0),
              n || t.layoutDependency !== e || void 0 === e || t.isPresent !== r
                ? s.willUpdate()
                : this.safeToRemove(),
              t.isPresent !== r &&
                (r
                  ? s.promote()
                  : s.relegate() ||
                    th.postRender(() => {
                      let t = s.getStack();
                      (t && t.members.length) || this.safeToRemove();
                    }))),
            null
          );
        }
        componentDidUpdate() {
          let { projection: t } = this.props.visualElement;
          t &&
            (t.root.didUpdate(),
            t4.postRender(() => {
              !t.currentAnimation && t.isLead() && this.safeToRemove();
            }));
        }
        componentWillUnmount() {
          let {
              visualElement: t,
              layoutGroup: e,
              switchLayoutGroup: i,
            } = this.props,
            { projection: n } = t;
          (n3 = !0),
            n &&
              (n.scheduleCheckAfterUnmount(),
              e && e.group && e.group.remove(n),
              i && i.deregister && i.deregister(n));
        }
        safeToRemove() {
          let { safeToRemove: t } = this.props;
          t && t();
        }
        render() {
          return null;
        }
      }
      function n8(t) {
        let [e, i] = (function () {
            let t =
                !(arguments.length > 0) ||
                void 0 === arguments[0] ||
                arguments[0],
              e = (0, r.useContext)(eG);
            if (null === e) return [!0, null];
            let { isPresent: i, onExitComplete: n, register: s } = e,
              o = (0, r.useId)();
            (0, r.useEffect)(() => {
              if (t) return s(o);
            }, [t]);
            let a = (0, r.useCallback)(() => t && n && n(o), [o, n, t]);
            return !i && n ? [!1, a] : [!0];
          })(),
          n = (0, r.useContext)(eU);
        return (0, eO.jsx)(n6, {
          ...t,
          layoutGroup: n,
          switchLayoutGroup: (0, r.useContext)(e3),
          isPresent: e,
          safeToRemove: i,
        });
      }
      let n4 = {
        borderRadius: {
          ...n5,
          applyTo: [
            "borderTopLeftRadius",
            "borderTopRightRadius",
            "borderBottomLeftRadius",
            "borderBottomRightRadius",
          ],
        },
        borderTopLeftRadius: n5,
        borderTopRightRadius: n5,
        borderBottomLeftRadius: n5,
        borderBottomRightRadius: n5,
        boxShadow: {
          correct: (t, { treeScale: e, projectionDelta: i }) => {
            let n = tU.parse(t);
            if (n.length > 5) return t;
            let r = tU.createTransformer(t),
              s = +("number" != typeof n[0]),
              o = i.x.scale * e.x,
              a = i.y.scale * e.y;
            (n[0 + s] /= o), (n[1 + s] /= a);
            let l = A(o, a, 0.5);
            return (
              "number" == typeof n[2 + s] && (n[2 + s] /= l),
              "number" == typeof n[3 + s] && (n[3 + s] /= l),
              r(n)
            );
          },
        },
      };
      function n9(t) {
        return "object" == typeof t && null !== t;
      }
      function n7(t) {
        return n9(t) && "ownerSVGElement" in t;
      }
      let rt = (t, e) => t.depth - e.depth;
      class re {
        constructor() {
          (this.children = []), (this.isDirty = !1);
        }
        add(t) {
          t0(this.children, t), (this.isDirty = !0);
        }
        remove(t) {
          t1(this.children, t), (this.isDirty = !0);
        }
        forEach(t) {
          this.isDirty && this.children.sort(rt),
            (this.isDirty = !1),
            this.children.forEach(t);
        }
      }
      let ri = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
        rn = ri.length,
        rr = (t) => ("string" == typeof t ? parseFloat(t) : t),
        rs = (t) => "number" == typeof t || z.test(t);
      function ro(t, e) {
        return void 0 !== t[e] ? t[e] : t.borderRadius;
      }
      let ra = rh(0, 0.5, iY),
        rl = rh(0.5, 0.95, tr);
      function rh(t, e, i) {
        return (n) => (n < t ? 0 : n > e ? 1 : i(iq(t, e, n)));
      }
      function ru(t, e) {
        (t.min = e.min), (t.max = e.max);
      }
      function rc(t, e) {
        ru(t.x, e.x), ru(t.y, e.y);
      }
      function rf(t, e) {
        (t.translate = e.translate),
          (t.scale = e.scale),
          (t.originPoint = e.originPoint),
          (t.origin = e.origin);
      }
      function rp(t, e, i, n, r) {
        return (
          (t -= e),
          (t = n + (1 / i) * (t - n)),
          void 0 !== r && (t = n + (1 / r) * (t - n)),
          t
        );
      }
      function rd(t, e, [i, n, r], s, o) {
        !(function (t, e = 0, i = 1, n = 0.5, r, s = t, o = t) {
          if (
            ($.test(e) &&
              ((e = parseFloat(e)), (e = A(o.min, o.max, e / 100) - o.min)),
            "number" != typeof e)
          )
            return;
          let a = A(s.min, s.max, n);
          t === s && (a -= e),
            (t.min = rp(t.min, e, i, a, r)),
            (t.max = rp(t.max, e, i, a, r));
        })(t, e[i], e[n], e[r], e.scale, s, o);
      }
      let rm = ["x", "scaleX", "originX"],
        ry = ["y", "scaleY", "originY"];
      function rg(t, e, i, n) {
        rd(t.x, e, rm, i ? i.x : void 0, n ? n.x : void 0),
          rd(t.y, e, ry, i ? i.y : void 0, n ? n.y : void 0);
      }
      function rv(t) {
        return 0 === t.translate && 1 === t.scale;
      }
      function rx(t) {
        return rv(t.x) && rv(t.y);
      }
      function rw(t, e) {
        return t.min === e.min && t.max === e.max;
      }
      function rb(t, e) {
        return (
          Math.round(t.min) === Math.round(e.min) &&
          Math.round(t.max) === Math.round(e.max)
        );
      }
      function rT(t, e) {
        return rb(t.x, e.x) && rb(t.y, e.y);
      }
      function rA(t) {
        return nD(t.x) / nD(t.y);
      }
      function rP(t, e) {
        return (
          t.translate === e.translate &&
          t.scale === e.scale &&
          t.originPoint === e.originPoint
        );
      }
      class rS {
        constructor() {
          this.members = [];
        }
        add(t) {
          t0(this.members, t), t.scheduleRender();
        }
        remove(t) {
          if (
            (t1(this.members, t),
            t === this.prevLead && (this.prevLead = void 0),
            t === this.lead)
          ) {
            let t = this.members[this.members.length - 1];
            t && this.promote(t);
          }
        }
        relegate(t) {
          let e,
            i = this.members.findIndex((e) => t === e);
          if (0 === i) return !1;
          for (let t = i; t >= 0; t--) {
            let i = this.members[t];
            if (!1 !== i.isPresent) {
              e = i;
              break;
            }
          }
          return !!e && (this.promote(e), !0);
        }
        promote(t, e) {
          let i = this.lead;
          if (t !== i && ((this.prevLead = i), (this.lead = t), t.show(), i)) {
            i.instance && i.scheduleRender(),
              t.scheduleRender(),
              (t.resumeFrom = i),
              e && (t.resumeFrom.preserveOpacity = !0),
              i.snapshot &&
                ((t.snapshot = i.snapshot),
                (t.snapshot.latestValues =
                  i.animationValues || i.latestValues)),
              t.root && t.root.isUpdating && (t.isLayoutDirty = !0);
            let { crossfade: n } = t.options;
            !1 === n && i.hide();
          }
        }
        exitAnimationComplete() {
          this.members.forEach((t) => {
            let { options: e, resumingFrom: i } = t;
            e.onExitComplete && e.onExitComplete(),
              i && i.options.onExitComplete && i.options.onExitComplete();
          });
        }
        scheduleRender() {
          this.members.forEach((t) => {
            t.instance && t.scheduleRender(!1);
          });
        }
        removeLeadSnapshot() {
          this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
        }
      }
      let rE = {
          nodes: 0,
          calculatedTargetDeltas: 0,
          calculatedProjections: 0,
        },
        rM = ["", "X", "Y", "Z"],
        rC = 0;
      function rV(t, e, i, n) {
        let { latestValues: r } = e;
        r[t] && ((i[t] = r[t]), e.setStaticValue(t, 0), n && (n[t] = 0));
      }
      function rk({
        attachResizeListener: t,
        defaultParent: e,
        measureScroll: i,
        checkIsScrollRoot: n,
        resetTransform: r,
      }) {
        return class {
          constructor(t = {}, i = e?.()) {
            (this.id = rC++),
              (this.animationId = 0),
              (this.animationCommitId = 0),
              (this.children = new Set()),
              (this.options = {}),
              (this.isTreeAnimating = !1),
              (this.isAnimationBlocked = !1),
              (this.isLayoutDirty = !1),
              (this.isProjectionDirty = !1),
              (this.isSharedProjectionDirty = !1),
              (this.isTransformDirty = !1),
              (this.updateManuallyBlocked = !1),
              (this.updateBlockedByResize = !1),
              (this.isUpdating = !1),
              (this.isSVG = !1),
              (this.needsReset = !1),
              (this.shouldResetTransform = !1),
              (this.hasCheckedOptimisedAppear = !1),
              (this.treeScale = { x: 1, y: 1 }),
              (this.eventHandlers = new Map()),
              (this.hasTreeAnimated = !1),
              (this.updateScheduled = !1),
              (this.scheduleUpdate = () => this.update()),
              (this.projectionUpdateScheduled = !1),
              (this.checkUpdateFailed = () => {
                this.isUpdating &&
                  ((this.isUpdating = !1), this.clearAllSnapshots());
              }),
              (this.updateProjection = () => {
                (this.projectionUpdateScheduled = !1),
                  ta.value &&
                    (rE.nodes =
                      rE.calculatedTargetDeltas =
                      rE.calculatedProjections =
                        0),
                  this.nodes.forEach(rB),
                  this.nodes.forEach(rN),
                  this.nodes.forEach(rW),
                  this.nodes.forEach(rL),
                  ta.addProjectionMetrics && ta.addProjectionMetrics(rE);
              }),
              (this.resolvedRelativeTargetAt = 0),
              (this.hasProjected = !1),
              (this.isVisible = !0),
              (this.animationProgress = 0),
              (this.sharedNodes = new Map()),
              (this.latestValues = t),
              (this.root = i ? i.root || i : this),
              (this.path = i ? [...i.path, i] : []),
              (this.parent = i),
              (this.depth = i ? i.depth + 1 : 0);
            for (let t = 0; t < this.path.length; t++)
              this.path[t].shouldResetTransform = !0;
            this.root === this && (this.nodes = new re());
          }
          addEventListener(t, e) {
            return (
              this.eventHandlers.has(t) || this.eventHandlers.set(t, new t2()),
              this.eventHandlers.get(t).add(e)
            );
          }
          notifyListeners(t, ...e) {
            let i = this.eventHandlers.get(t);
            i && i.notify(...e);
          }
          hasListeners(t) {
            return this.eventHandlers.has(t);
          }
          mount(e) {
            if (this.instance) return;
            (this.isSVG = n7(e) && !(n7(e) && "svg" === e.tagName)),
              (this.instance = e);
            let { layoutId: i, layout: n, visualElement: r } = this.options;
            if (
              (r && !r.current && r.mount(e),
              this.root.nodes.add(this),
              this.parent && this.parent.children.add(this),
              this.root.hasTreeAnimated &&
                (n || i) &&
                (this.isLayoutDirty = !0),
              t)
            ) {
              let i,
                n = 0,
                r = () => (this.root.updateBlockedByResize = !1);
              th.read(() => {
                n = window.innerWidth;
              }),
                t(e, () => {
                  let t = window.innerWidth;
                  t !== n &&
                    ((n = t),
                    (this.root.updateBlockedByResize = !0),
                    i && i(),
                    (i = (function (t, e) {
                      let i = tQ.now(),
                        n = ({ timestamp: e }) => {
                          let r = e - i;
                          r >= 250 && (tu(n), t(r - 250));
                        };
                      return th.setup(n, !0), () => tu(n);
                    })(r, 250)),
                    n1.hasAnimatedSinceResize &&
                      ((n1.hasAnimatedSinceResize = !1),
                      this.nodes.forEach(rU)));
                });
            }
            i && this.root.registerSharedNode(i, this),
              !1 !== this.options.animate &&
                r &&
                (i || n) &&
                this.addEventListener(
                  "didUpdate",
                  ({
                    delta: t,
                    hasLayoutChanged: e,
                    hasRelativeLayoutChanged: i,
                    layout: n,
                  }) => {
                    if (this.isTreeAnimationBlocked()) {
                      (this.target = void 0), (this.relativeTarget = void 0);
                      return;
                    }
                    let s =
                        this.options.transition ||
                        r.getDefaultTransition() ||
                        r_,
                      {
                        onLayoutAnimationStart: o,
                        onLayoutAnimationComplete: a,
                      } = r.getProps(),
                      l = !this.targetLayout || !rT(this.targetLayout, n),
                      h = !e && i;
                    if (
                      this.options.layoutRoot ||
                      this.resumeFrom ||
                      h ||
                      (e && (l || !this.currentAnimation))
                    ) {
                      this.resumeFrom &&
                        ((this.resumingFrom = this.resumeFrom),
                        (this.resumingFrom.resumingFrom = void 0));
                      let e = { ...e9(s, "layout"), onPlay: o, onComplete: a };
                      (r.shouldReduceMotion || this.options.layoutRoot) &&
                        ((e.delay = 0), (e.type = !1)),
                        this.startAnimation(e),
                        this.setAnimationOrigin(t, h);
                    } else
                      e || rU(this),
                        this.isLead() &&
                          this.options.onExitComplete &&
                          this.options.onExitComplete();
                    this.targetLayout = n;
                  }
                );
          }
          unmount() {
            this.options.layoutId && this.willUpdate(),
              this.root.nodes.remove(this);
            let t = this.getStack();
            t && t.remove(this),
              this.parent && this.parent.children.delete(this),
              (this.instance = void 0),
              this.eventHandlers.clear(),
              tu(this.updateProjection);
          }
          blockUpdate() {
            this.updateManuallyBlocked = !0;
          }
          unblockUpdate() {
            this.updateManuallyBlocked = !1;
          }
          isUpdateBlocked() {
            return this.updateManuallyBlocked || this.updateBlockedByResize;
          }
          isTreeAnimationBlocked() {
            return (
              this.isAnimationBlocked ||
              (this.parent && this.parent.isTreeAnimationBlocked()) ||
              !1
            );
          }
          startUpdate() {
            !this.isUpdateBlocked() &&
              ((this.isUpdating = !0),
              this.nodes && this.nodes.forEach(r$),
              this.animationId++);
          }
          getTransformTemplate() {
            let { visualElement: t } = this.options;
            return t && t.getProps().transformTemplate;
          }
          willUpdate(t = !0) {
            if (
              ((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())
            ) {
              this.options.onExitComplete && this.options.onExitComplete();
              return;
            }
            if (
              (window.MotionCancelOptimisedAnimation &&
                !this.hasCheckedOptimisedAppear &&
                (function t(e) {
                  if (((e.hasCheckedOptimisedAppear = !0), e.root === e))
                    return;
                  let { visualElement: i } = e.options;
                  if (!i) return;
                  let n = i.props[e5];
                  if (window.MotionHasOptimisedAnimation(n, "transform")) {
                    let { layout: t, layoutId: i } = e.options;
                    window.MotionCancelOptimisedAnimation(
                      n,
                      "transform",
                      th,
                      !(t || i)
                    );
                  }
                  let { parent: r } = e;
                  r && !r.hasCheckedOptimisedAppear && t(r);
                })(this),
              this.root.isUpdating || this.root.startUpdate(),
              this.isLayoutDirty)
            )
              return;
            this.isLayoutDirty = !0;
            for (let t = 0; t < this.path.length; t++) {
              let e = this.path[t];
              (e.shouldResetTransform = !0),
                e.updateScroll("snapshot"),
                e.options.layoutRoot && e.willUpdate(!1);
            }
            let { layoutId: e, layout: i } = this.options;
            if (void 0 === e && !i) return;
            let n = this.getTransformTemplate();
            (this.prevTransformTemplateValue = n
              ? n(this.latestValues, "")
              : void 0),
              this.updateSnapshot(),
              t && this.notifyListeners("willUpdate");
          }
          update() {
            if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
              this.unblockUpdate(),
                this.clearAllSnapshots(),
                this.nodes.forEach(rF);
              return;
            }
            if (this.animationId <= this.animationCommitId)
              return void this.nodes.forEach(rI);
            (this.animationCommitId = this.animationId),
              this.isUpdating
                ? ((this.isUpdating = !1),
                  this.nodes.forEach(rO),
                  this.nodes.forEach(rD),
                  this.nodes.forEach(rR))
                : this.nodes.forEach(rI),
              this.clearAllSnapshots();
            let t = tQ.now();
            (tc.delta = F(0, 1e3 / 60, t - tc.timestamp)),
              (tc.timestamp = t),
              (tc.isProcessing = !0),
              tf.update.process(tc),
              tf.preRender.process(tc),
              tf.render.process(tc),
              (tc.isProcessing = !1);
          }
          didUpdate() {
            this.updateScheduled ||
              ((this.updateScheduled = !0), t4.read(this.scheduleUpdate));
          }
          clearAllSnapshots() {
            this.nodes.forEach(rj), this.sharedNodes.forEach(rz);
          }
          scheduleUpdateProjection() {
            this.projectionUpdateScheduled ||
              ((this.projectionUpdateScheduled = !0),
              th.preRender(this.updateProjection, !1, !0));
          }
          scheduleCheckAfterUnmount() {
            th.postRender(() => {
              this.isLayoutDirty
                ? this.root.didUpdate()
                : this.root.checkUpdateFailed();
            });
          }
          updateSnapshot() {
            !this.snapshot &&
              this.instance &&
              ((this.snapshot = this.measure()),
              !this.snapshot ||
                nD(this.snapshot.measuredBox.x) ||
                nD(this.snapshot.measuredBox.y) ||
                (this.snapshot = void 0));
          }
          updateLayout() {
            if (
              !this.instance ||
              (this.updateScroll(),
              !(this.options.alwaysMeasureLayout && this.isLead()) &&
                !this.isLayoutDirty)
            )
              return;
            if (this.resumeFrom && !this.resumeFrom.instance)
              for (let t = 0; t < this.path.length; t++)
                this.path[t].updateScroll();
            let t = this.layout;
            (this.layout = this.measure(!1)),
              (this.layoutCorrected = en()),
              (this.isLayoutDirty = !1),
              (this.projectionDelta = void 0),
              this.notifyListeners("measure", this.layout.layoutBox);
            let { visualElement: e } = this.options;
            e &&
              e.notify(
                "LayoutMeasure",
                this.layout.layoutBox,
                t ? t.layoutBox : void 0
              );
          }
          updateScroll(t = "measure") {
            let e = !!(this.options.layoutScroll && this.instance);
            if (
              (this.scroll &&
                this.scroll.animationId === this.root.animationId &&
                this.scroll.phase === t &&
                (e = !1),
              e && this.instance)
            ) {
              let e = n(this.instance);
              this.scroll = {
                animationId: this.root.animationId,
                phase: t,
                isRoot: e,
                offset: i(this.instance),
                wasRoot: this.scroll ? this.scroll.isRoot : e,
              };
            }
          }
          resetTransform() {
            if (!r) return;
            let t =
                this.isLayoutDirty ||
                this.shouldResetTransform ||
                this.options.alwaysMeasureLayout,
              e = this.projectionDelta && !rx(this.projectionDelta),
              i = this.getTransformTemplate(),
              n = i ? i(this.latestValues, "") : void 0,
              s = n !== this.prevTransformTemplateValue;
            t &&
              this.instance &&
              (e || E(this.latestValues) || s) &&
              (r(this.instance, n),
              (this.shouldResetTransform = !1),
              this.scheduleRender());
          }
          measure(t = !0) {
            var e;
            let i = this.measurePageBox(),
              n = this.removeElementScroll(i);
            return (
              t && (n = this.removeTransform(n)),
              rG((e = n).x),
              rG(e.y),
              {
                animationId: this.root.animationId,
                measuredBox: i,
                layoutBox: n,
                latestValues: {},
                source: this.id,
              }
            );
          }
          measurePageBox() {
            let { visualElement: t } = this.options;
            if (!t) return en();
            let e = t.measureViewportBox();
            if (!(this.scroll?.wasRoot || this.path.some(rJ))) {
              let { scroll: t } = this.root;
              t && (D(e.x, t.offset.x), D(e.y, t.offset.y));
            }
            return e;
          }
          removeElementScroll(t) {
            let e = en();
            if ((rc(e, t), this.scroll?.wasRoot)) return e;
            for (let i = 0; i < this.path.length; i++) {
              let n = this.path[i],
                { scroll: r, options: s } = n;
              n !== this.root &&
                r &&
                s.layoutScroll &&
                (r.wasRoot && rc(e, t), D(e.x, r.offset.x), D(e.y, r.offset.y));
            }
            return e;
          }
          applyTransform(t, e = !1) {
            let i = en();
            rc(i, t);
            for (let t = 0; t < this.path.length; t++) {
              let n = this.path[t];
              !e &&
                n.options.layoutScroll &&
                n.scroll &&
                n !== n.root &&
                B(i, { x: -n.scroll.offset.x, y: -n.scroll.offset.y }),
                E(n.latestValues) && B(i, n.latestValues);
            }
            return E(this.latestValues) && B(i, this.latestValues), i;
          }
          removeTransform(t) {
            let e = en();
            rc(e, t);
            for (let t = 0; t < this.path.length; t++) {
              let i = this.path[t];
              if (!i.instance || !E(i.latestValues)) continue;
              S(i.latestValues) && i.updateSnapshot();
              let n = en();
              rc(n, i.measurePageBox()),
                rg(
                  e,
                  i.latestValues,
                  i.snapshot ? i.snapshot.layoutBox : void 0,
                  n
                );
            }
            return E(this.latestValues) && rg(e, this.latestValues), e;
          }
          setTargetDelta(t) {
            (this.targetDelta = t),
              this.root.scheduleUpdateProjection(),
              (this.isProjectionDirty = !0);
          }
          setOptions(t) {
            this.options = {
              ...this.options,
              ...t,
              crossfade: void 0 === t.crossfade || t.crossfade,
            };
          }
          clearMeasurements() {
            (this.scroll = void 0),
              (this.layout = void 0),
              (this.snapshot = void 0),
              (this.prevTransformTemplateValue = void 0),
              (this.targetDelta = void 0),
              (this.target = void 0),
              (this.isLayoutDirty = !1);
          }
          forceRelativeParentToResolveTarget() {
            this.relativeParent &&
              this.relativeParent.resolvedRelativeTargetAt !== tc.timestamp &&
              this.relativeParent.resolveTargetDelta(!0);
          }
          resolveTargetDelta(t = !1) {
            let e = this.getLead();
            this.isProjectionDirty ||
              (this.isProjectionDirty = e.isProjectionDirty),
              this.isTransformDirty ||
                (this.isTransformDirty = e.isTransformDirty),
              this.isSharedProjectionDirty ||
                (this.isSharedProjectionDirty = e.isSharedProjectionDirty);
            let i = !!this.resumingFrom || this !== e;
            if (
              !(
                t ||
                (i && this.isSharedProjectionDirty) ||
                this.isProjectionDirty ||
                this.parent?.isProjectionDirty ||
                this.attemptToResolveRelativeTarget ||
                this.root.updateBlockedByResize
              )
            )
              return;
            let { layout: n, layoutId: r } = this.options;
            if (this.layout && (n || r)) {
              if (
                ((this.resolvedRelativeTargetAt = tc.timestamp),
                !this.targetDelta && !this.relativeTarget)
              ) {
                let t = this.getClosestProjectingParent();
                t && t.layout && 1 !== this.animationProgress
                  ? ((this.relativeParent = t),
                    this.forceRelativeParentToResolveTarget(),
                    (this.relativeTarget = en()),
                    (this.relativeTargetOrigin = en()),
                    nF(
                      this.relativeTargetOrigin,
                      this.layout.layoutBox,
                      t.layout.layoutBox
                    ),
                    rc(this.relativeTarget, this.relativeTargetOrigin))
                  : (this.relativeParent = this.relativeTarget = void 0);
              }
              if (this.relativeTarget || this.targetDelta) {
                if (
                  (this.target ||
                    ((this.target = en()), (this.targetWithTransforms = en())),
                  this.relativeTarget &&
                    this.relativeTargetOrigin &&
                    this.relativeParent &&
                    this.relativeParent.target)
                ) {
                  var s, o, a;
                  this.forceRelativeParentToResolveTarget(),
                    (s = this.target),
                    (o = this.relativeTarget),
                    (a = this.relativeParent.target),
                    nL(s.x, o.x, a.x),
                    nL(s.y, o.y, a.y);
                } else
                  this.targetDelta
                    ? (this.resumingFrom
                        ? (this.target = this.applyTransform(
                            this.layout.layoutBox
                          ))
                        : rc(this.target, this.layout.layoutBox),
                      k(this.target, this.targetDelta))
                    : rc(this.target, this.layout.layoutBox);
                if (this.attemptToResolveRelativeTarget) {
                  this.attemptToResolveRelativeTarget = !1;
                  let t = this.getClosestProjectingParent();
                  t &&
                  !!t.resumingFrom == !!this.resumingFrom &&
                  !t.options.layoutScroll &&
                  t.target &&
                  1 !== this.animationProgress
                    ? ((this.relativeParent = t),
                      this.forceRelativeParentToResolveTarget(),
                      (this.relativeTarget = en()),
                      (this.relativeTargetOrigin = en()),
                      nF(this.relativeTargetOrigin, this.target, t.target),
                      rc(this.relativeTarget, this.relativeTargetOrigin))
                    : (this.relativeParent = this.relativeTarget = void 0);
                }
                ta.value && rE.calculatedTargetDeltas++;
              }
            }
          }
          getClosestProjectingParent() {
            if (
              !(
                !this.parent ||
                S(this.parent.latestValues) ||
                M(this.parent.latestValues)
              )
            )
              if (this.parent.isProjecting()) return this.parent;
              else return this.parent.getClosestProjectingParent();
          }
          isProjecting() {
            return !!(
              (this.relativeTarget ||
                this.targetDelta ||
                this.options.layoutRoot) &&
              this.layout
            );
          }
          calcProjection() {
            let t = this.getLead(),
              e = !!this.resumingFrom || this !== t,
              i = !0;
            if (
              ((this.isProjectionDirty || this.parent?.isProjectionDirty) &&
                (i = !1),
              e &&
                (this.isSharedProjectionDirty || this.isTransformDirty) &&
                (i = !1),
              this.resolvedRelativeTargetAt === tc.timestamp && (i = !1),
              i)
            )
              return;
            let { layout: n, layoutId: r } = this.options;
            if (
              ((this.isTreeAnimating = !!(
                (this.parent && this.parent.isTreeAnimating) ||
                this.currentAnimation ||
                this.pendingAnimation
              )),
              this.isTreeAnimating ||
                (this.targetDelta = this.relativeTarget = void 0),
              !this.layout || !(n || r))
            )
              return;
            rc(this.layoutCorrected, this.layout.layoutBox);
            let s = this.treeScale.x,
              o = this.treeScale.y;
            !(function (t, e, i, n = !1) {
              let r,
                s,
                o = i.length;
              if (o) {
                e.x = e.y = 1;
                for (let a = 0; a < o; a++) {
                  s = (r = i[a]).projectionDelta;
                  let { visualElement: o } = r.options;
                  (!o ||
                    !o.props.style ||
                    "contents" !== o.props.style.display) &&
                    (n &&
                      r.options.layoutScroll &&
                      r.scroll &&
                      r !== r.root &&
                      B(t, { x: -r.scroll.offset.x, y: -r.scroll.offset.y }),
                    s && ((e.x *= s.x.scale), (e.y *= s.y.scale), k(t, s)),
                    n && E(r.latestValues) && B(t, r.latestValues));
                }
                e.x < 1.0000000000001 && e.x > 0.999999999999 && (e.x = 1),
                  e.y < 1.0000000000001 && e.y > 0.999999999999 && (e.y = 1);
              }
            })(this.layoutCorrected, this.treeScale, this.path, e),
              t.layout &&
                !t.target &&
                (1 !== this.treeScale.x || 1 !== this.treeScale.y) &&
                ((t.target = t.layout.layoutBox),
                (t.targetWithTransforms = en()));
            let { target: a } = t;
            if (!a) {
              this.prevProjectionDelta &&
                (this.createProjectionDeltas(), this.scheduleRender());
              return;
            }
            this.projectionDelta && this.prevProjectionDelta
              ? (rf(this.prevProjectionDelta.x, this.projectionDelta.x),
                rf(this.prevProjectionDelta.y, this.projectionDelta.y))
              : this.createProjectionDeltas(),
              nB(
                this.projectionDelta,
                this.layoutCorrected,
                a,
                this.latestValues
              ),
              (this.treeScale.x === s &&
                this.treeScale.y === o &&
                rP(this.projectionDelta.x, this.prevProjectionDelta.x) &&
                rP(this.projectionDelta.y, this.prevProjectionDelta.y)) ||
                ((this.hasProjected = !0),
                this.scheduleRender(),
                this.notifyListeners("projectionUpdate", a)),
              ta.value && rE.calculatedProjections++;
          }
          hide() {
            this.isVisible = !1;
          }
          show() {
            this.isVisible = !0;
          }
          scheduleRender(t = !0) {
            if ((this.options.visualElement?.scheduleRender(), t)) {
              let t = this.getStack();
              t && t.scheduleRender();
            }
            this.resumingFrom &&
              !this.resumingFrom.instance &&
              (this.resumingFrom = void 0);
          }
          createProjectionDeltas() {
            (this.prevProjectionDelta = ee()),
              (this.projectionDelta = ee()),
              (this.projectionDeltaWithTransform = ee());
          }
          setAnimationOrigin(t, e = !1) {
            let i,
              n = this.snapshot,
              r = n ? n.latestValues : {},
              s = { ...this.latestValues },
              o = ee();
            (this.relativeParent && this.relativeParent.options.layoutRoot) ||
              (this.relativeTarget = this.relativeTargetOrigin = void 0),
              (this.attemptToResolveRelativeTarget = !e);
            let a = en(),
              l =
                (n ? n.source : void 0) !==
                (this.layout ? this.layout.source : void 0),
              h = this.getStack(),
              u = !h || h.members.length <= 1,
              c = !!(
                l &&
                !u &&
                !0 === this.options.crossfade &&
                !this.path.some(rH)
              );
            (this.animationProgress = 0),
              (this.mixTargetDelta = (e) => {
                let n = e / 1e3;
                if (
                  (rY(o.x, t.x, n),
                  rY(o.y, t.y, n),
                  this.setTargetDelta(o),
                  this.relativeTarget &&
                    this.relativeTargetOrigin &&
                    this.layout &&
                    this.relativeParent &&
                    this.relativeParent.layout)
                ) {
                  var h, f, p, d, m, y;
                  nF(
                    a,
                    this.layout.layoutBox,
                    this.relativeParent.layout.layoutBox
                  ),
                    (p = this.relativeTarget),
                    (d = this.relativeTargetOrigin),
                    (m = a),
                    (y = n),
                    rX(p.x, d.x, m.x, y),
                    rX(p.y, d.y, m.y, y),
                    i &&
                      ((h = this.relativeTarget),
                      (f = i),
                      rw(h.x, f.x) && rw(h.y, f.y)) &&
                      (this.isProjectionDirty = !1),
                    i || (i = en()),
                    rc(i, this.relativeTarget);
                }
                l &&
                  ((this.animationValues = s),
                  (function (t, e, i, n, r, s) {
                    r
                      ? ((t.opacity = A(0, i.opacity ?? 1, ra(n))),
                        (t.opacityExit = A(e.opacity ?? 1, 0, rl(n))))
                      : s && (t.opacity = A(e.opacity ?? 1, i.opacity ?? 1, n));
                    for (let r = 0; r < rn; r++) {
                      let s = `border${ri[r]}Radius`,
                        o = ro(e, s),
                        a = ro(i, s);
                      (void 0 !== o || void 0 !== a) &&
                        (o || (o = 0),
                        a || (a = 0),
                        0 === o || 0 === a || rs(o) === rs(a)
                          ? ((t[s] = Math.max(A(rr(o), rr(a), n), 0)),
                            ($.test(a) || $.test(o)) && (t[s] += "%"))
                          : (t[s] = a));
                    }
                    (e.rotate || i.rotate) &&
                      (t.rotate = A(e.rotate || 0, i.rotate || 0, n));
                  })(s, r, this.latestValues, n, c, u)),
                  this.root.scheduleUpdateProjection(),
                  this.scheduleRender(),
                  (this.animationProgress = n);
              }),
              this.mixTargetDelta(1e3 * !!this.options.layoutRoot);
          }
          startAnimation(t) {
            this.notifyListeners("animationStart"),
              this.currentAnimation?.stop(),
              this.resumingFrom?.currentAnimation?.stop(),
              this.pendingAnimation &&
                (tu(this.pendingAnimation), (this.pendingAnimation = void 0)),
              (this.pendingAnimation = th.update(() => {
                (n1.hasAnimatedSinceResize = !0),
                  io.layout++,
                  this.motionValue || (this.motionValue = t6(0)),
                  (this.currentAnimation = (function (t, e, i) {
                    let n = tZ(t) ? t : t6(t);
                    return n.start(nf("", n, e, i)), n.animation;
                  })(this.motionValue, [0, 1e3], {
                    ...t,
                    velocity: 0,
                    isSync: !0,
                    onUpdate: (e) => {
                      this.mixTargetDelta(e), t.onUpdate && t.onUpdate(e);
                    },
                    onStop: () => {
                      io.layout--;
                    },
                    onComplete: () => {
                      io.layout--,
                        t.onComplete && t.onComplete(),
                        this.completeAnimation();
                    },
                  })),
                  this.resumingFrom &&
                    (this.resumingFrom.currentAnimation =
                      this.currentAnimation),
                  (this.pendingAnimation = void 0);
              }));
          }
          completeAnimation() {
            this.resumingFrom &&
              ((this.resumingFrom.currentAnimation = void 0),
              (this.resumingFrom.preserveOpacity = void 0));
            let t = this.getStack();
            t && t.exitAnimationComplete(),
              (this.resumingFrom =
                this.currentAnimation =
                this.animationValues =
                  void 0),
              this.notifyListeners("animationComplete");
          }
          finishAnimation() {
            this.currentAnimation &&
              (this.mixTargetDelta && this.mixTargetDelta(1e3),
              this.currentAnimation.stop()),
              this.completeAnimation();
          }
          applyTransformsToTarget() {
            let t = this.getLead(),
              {
                targetWithTransforms: e,
                target: i,
                layout: n,
                latestValues: r,
              } = t;
            if (e && i && n) {
              if (
                this !== t &&
                this.layout &&
                n &&
                rZ(
                  this.options.animationType,
                  this.layout.layoutBox,
                  n.layoutBox
                )
              ) {
                i = this.target || en();
                let e = nD(this.layout.layoutBox.x);
                (i.x.min = t.target.x.min), (i.x.max = i.x.min + e);
                let n = nD(this.layout.layoutBox.y);
                (i.y.min = t.target.y.min), (i.y.max = i.y.min + n);
              }
              rc(e, i),
                B(e, r),
                nB(
                  this.projectionDeltaWithTransform,
                  this.layoutCorrected,
                  e,
                  r
                );
            }
          }
          registerSharedNode(t, e) {
            this.sharedNodes.has(t) || this.sharedNodes.set(t, new rS()),
              this.sharedNodes.get(t).add(e);
            let i = e.options.initialPromotionConfig;
            e.promote({
              transition: i ? i.transition : void 0,
              preserveFollowOpacity:
                i && i.shouldPreserveFollowOpacity
                  ? i.shouldPreserveFollowOpacity(e)
                  : void 0,
            });
          }
          isLead() {
            let t = this.getStack();
            return !t || t.lead === this;
          }
          getLead() {
            let { layoutId: t } = this.options;
            return (t && this.getStack()?.lead) || this;
          }
          getPrevLead() {
            let { layoutId: t } = this.options;
            return t ? this.getStack()?.prevLead : void 0;
          }
          getStack() {
            let { layoutId: t } = this.options;
            if (t) return this.root.sharedNodes.get(t);
          }
          promote({
            needsReset: t,
            transition: e,
            preserveFollowOpacity: i,
          } = {}) {
            let n = this.getStack();
            n && n.promote(this, i),
              t && ((this.projectionDelta = void 0), (this.needsReset = !0)),
              e && this.setOptions({ transition: e });
          }
          relegate() {
            let t = this.getStack();
            return !!t && t.relegate(this);
          }
          resetSkewAndRotation() {
            let { visualElement: t } = this.options;
            if (!t) return;
            let e = !1,
              { latestValues: i } = t;
            if (
              ((i.z ||
                i.rotate ||
                i.rotateX ||
                i.rotateY ||
                i.rotateZ ||
                i.skewX ||
                i.skewY) &&
                (e = !0),
              !e)
            )
              return;
            let n = {};
            i.z && rV("z", t, n, this.animationValues);
            for (let e = 0; e < rM.length; e++)
              rV(`rotate${rM[e]}`, t, n, this.animationValues),
                rV(`skew${rM[e]}`, t, n, this.animationValues);
            for (let e in (t.render(), n))
              t.setStaticValue(e, n[e]),
                this.animationValues && (this.animationValues[e] = n[e]);
            t.scheduleRender();
          }
          applyProjectionStyles(t, e) {
            if (!this.instance || this.isSVG) return;
            if (!this.isVisible) {
              t.visibility = "hidden";
              return;
            }
            let i = this.getTransformTemplate();
            if (this.needsReset) {
              (this.needsReset = !1),
                (t.visibility = ""),
                (t.opacity = ""),
                (t.pointerEvents = eZ(e?.pointerEvents) || ""),
                (t.transform = i ? i(this.latestValues, "") : "none");
              return;
            }
            let n = this.getLead();
            if (!this.projectionDelta || !this.layout || !n.target) {
              this.options.layoutId &&
                ((t.opacity =
                  void 0 !== this.latestValues.opacity
                    ? this.latestValues.opacity
                    : 1),
                (t.pointerEvents = eZ(e?.pointerEvents) || "")),
                this.hasProjected &&
                  !E(this.latestValues) &&
                  ((t.transform = i ? i({}, "") : "none"),
                  (this.hasProjected = !1));
              return;
            }
            t.visibility = "";
            let r = n.animationValues || n.latestValues;
            this.applyTransformsToTarget();
            let s = (function (t, e, i) {
              let n = "",
                r = t.x.translate / e.x,
                s = t.y.translate / e.y,
                o = i?.z || 0;
              if (
                ((r || s || o) && (n = `translate3d(${r}px, ${s}px, ${o}px) `),
                (1 !== e.x || 1 !== e.y) &&
                  (n += `scale(${1 / e.x}, ${1 / e.y}) `),
                i)
              ) {
                let {
                  transformPerspective: t,
                  rotate: e,
                  rotateX: r,
                  rotateY: s,
                  skewX: o,
                  skewY: a,
                } = i;
                t && (n = `perspective(${t}px) ${n}`),
                  e && (n += `rotate(${e}deg) `),
                  r && (n += `rotateX(${r}deg) `),
                  s && (n += `rotateY(${s}deg) `),
                  o && (n += `skewX(${o}deg) `),
                  a && (n += `skewY(${a}deg) `);
              }
              let a = t.x.scale * e.x,
                l = t.y.scale * e.y;
              return (
                (1 !== a || 1 !== l) && (n += `scale(${a}, ${l})`), n || "none"
              );
            })(this.projectionDeltaWithTransform, this.treeScale, r);
            i && (s = i(r, s)), (t.transform = s);
            let { x: o, y: a } = this.projectionDelta;
            for (let e in ((t.transformOrigin = `${100 * o.origin}% ${
              100 * a.origin
            }% 0`),
            n.animationValues
              ? (t.opacity =
                  n === this
                    ? r.opacity ?? this.latestValues.opacity ?? 1
                    : this.preserveOpacity
                    ? this.latestValues.opacity
                    : r.opacityExit)
              : (t.opacity =
                  n === this
                    ? void 0 !== r.opacity
                      ? r.opacity
                      : ""
                    : void 0 !== r.opacityExit
                    ? r.opacityExit
                    : 0),
            eP)) {
              if (void 0 === r[e]) continue;
              let { correct: i, applyTo: o, isCSSVariable: a } = eP[e],
                l = "none" === s ? r[e] : i(r[e], n);
              if (o) {
                let e = o.length;
                for (let i = 0; i < e; i++) t[o[i]] = l;
              } else
                a
                  ? (this.options.visualElement.renderState.vars[e] = l)
                  : (t[e] = l);
            }
            this.options.layoutId &&
              (t.pointerEvents =
                n === this ? eZ(e?.pointerEvents) || "" : "none");
          }
          clearSnapshot() {
            this.resumeFrom = this.snapshot = void 0;
          }
          resetTree() {
            this.root.nodes.forEach((t) => t.currentAnimation?.stop()),
              this.root.nodes.forEach(rF),
              this.root.sharedNodes.clear();
          }
        };
      }
      function rD(t) {
        t.updateLayout();
      }
      function rR(t) {
        let e = t.resumeFrom?.snapshot || t.snapshot;
        if (t.isLead() && t.layout && e && t.hasListeners("didUpdate")) {
          let { layoutBox: i, measuredBox: n } = t.layout,
            { animationType: r } = t.options,
            s = e.source !== t.layout.source;
          "size" === r
            ? nI((t) => {
                let n = s ? e.measuredBox[t] : e.layoutBox[t],
                  r = nD(n);
                (n.min = i[t].min), (n.max = n.min + r);
              })
            : rZ(r, e.layoutBox, i) &&
              nI((n) => {
                let r = s ? e.measuredBox[n] : e.layoutBox[n],
                  o = nD(i[n]);
                (r.max = r.min + o),
                  t.relativeTarget &&
                    !t.currentAnimation &&
                    ((t.isProjectionDirty = !0),
                    (t.relativeTarget[n].max = t.relativeTarget[n].min + o));
              });
          let o = ee();
          nB(o, i, e.layoutBox);
          let a = ee();
          s
            ? nB(a, t.applyTransform(n, !0), e.measuredBox)
            : nB(a, i, e.layoutBox);
          let l = !rx(o),
            h = !1;
          if (!t.resumeFrom) {
            let n = t.getClosestProjectingParent();
            if (n && !n.resumeFrom) {
              let { snapshot: r, layout: s } = n;
              if (r && s) {
                let o = en();
                nF(o, e.layoutBox, r.layoutBox);
                let a = en();
                nF(a, i, s.layoutBox),
                  rT(o, a) || (h = !0),
                  n.options.layoutRoot &&
                    ((t.relativeTarget = a),
                    (t.relativeTargetOrigin = o),
                    (t.relativeParent = n));
              }
            }
          }
          t.notifyListeners("didUpdate", {
            layout: i,
            snapshot: e,
            delta: a,
            layoutDelta: o,
            hasLayoutChanged: l,
            hasRelativeLayoutChanged: h,
          });
        } else if (t.isLead()) {
          let { onExitComplete: e } = t.options;
          e && e();
        }
        t.options.transition = void 0;
      }
      function rB(t) {
        ta.value && rE.nodes++,
          t.parent &&
            (t.isProjecting() ||
              (t.isProjectionDirty = t.parent.isProjectionDirty),
            t.isSharedProjectionDirty ||
              (t.isSharedProjectionDirty = !!(
                t.isProjectionDirty ||
                t.parent.isProjectionDirty ||
                t.parent.isSharedProjectionDirty
              )),
            t.isTransformDirty ||
              (t.isTransformDirty = t.parent.isTransformDirty));
      }
      function rL(t) {
        t.isProjectionDirty =
          t.isSharedProjectionDirty =
          t.isTransformDirty =
            !1;
      }
      function rj(t) {
        t.clearSnapshot();
      }
      function rF(t) {
        t.clearMeasurements();
      }
      function rI(t) {
        t.isLayoutDirty = !1;
      }
      function rO(t) {
        let { visualElement: e } = t.options;
        e &&
          e.getProps().onBeforeLayoutMeasure &&
          e.notify("BeforeLayoutMeasure"),
          t.resetTransform();
      }
      function rU(t) {
        t.finishAnimation(),
          (t.targetDelta = t.relativeTarget = t.target = void 0),
          (t.isProjectionDirty = !0);
      }
      function rN(t) {
        t.resolveTargetDelta();
      }
      function rW(t) {
        t.calcProjection();
      }
      function r$(t) {
        t.resetSkewAndRotation();
      }
      function rz(t) {
        t.removeLeadSnapshot();
      }
      function rY(t, e, i) {
        (t.translate = A(e.translate, 0, i)),
          (t.scale = A(e.scale, 1, i)),
          (t.origin = e.origin),
          (t.originPoint = e.originPoint);
      }
      function rX(t, e, i, n) {
        (t.min = A(e.min, i.min, n)), (t.max = A(e.max, i.max, n));
      }
      function rH(t) {
        return t.animationValues && void 0 !== t.animationValues.opacityExit;
      }
      let r_ = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
        rK = (t) =>
          "undefined" != typeof navigator &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().includes(t),
        rq = rK("applewebkit/") && !rK("chrome/") ? Math.round : tr;
      function rG(t) {
        (t.min = rq(t.min)), (t.max = rq(t.max));
      }
      function rZ(t, e, i) {
        return (
          "position" === t ||
          ("preserve-aspect" === t && !(0.2 >= Math.abs(rA(e) - rA(i))))
        );
      }
      function rJ(t) {
        return t !== t.root && t.scroll?.wasRoot;
      }
      let rQ = rk({
          attachResizeListener: (t, e) => nM(t, "resize", e),
          measureScroll: () => ({
            x: document.documentElement.scrollLeft || document.body.scrollLeft,
            y: document.documentElement.scrollTop || document.body.scrollTop,
          }),
          checkIsScrollRoot: () => !0,
        }),
        r0 = { current: void 0 },
        r1 = rk({
          measureScroll: (t) => ({ x: t.scrollLeft, y: t.scrollTop }),
          defaultParent: () => {
            if (!r0.current) {
              let t = new rQ({});
              t.mount(window),
                t.setOptions({ layoutScroll: !0 }),
                (r0.current = t);
            }
            return r0.current;
          },
          resetTransform: (t, e) => {
            t.style.transform = void 0 !== e ? e : "none";
          },
          checkIsScrollRoot: (t) =>
            "fixed" === window.getComputedStyle(t).position,
        });
      function r2(t, e) {
        let i = (function (t, e, i) {
            if (t instanceof EventTarget) return [t];
            if ("string" == typeof t) {
              let e = document,
                i = void 0 ?? e.querySelectorAll(t);
              return i ? Array.from(i) : [];
            }
            return Array.from(t);
          })(t),
          n = new AbortController();
        return [i, { passive: !0, ...e, signal: n.signal }, () => n.abort()];
      }
      function r5(t) {
        return !("touch" === t.pointerType || nE.x || nE.y);
      }
      function r3(t, e, i) {
        let { props: n } = t;
        t.animationState &&
          n.whileHover &&
          t.animationState.setActive("whileHover", "Start" === i);
        let r = n["onHover" + i];
        r && th.postRender(() => r(e, nV(e)));
      }
      class r6 extends nT {
        mount() {
          let { current: t } = this.node;
          t &&
            (this.unmount = (function (t, e, i = {}) {
              let [n, r, s] = r2(t, i),
                o = (t) => {
                  if (!r5(t)) return;
                  let { target: i } = t,
                    n = e(i, t);
                  if ("function" != typeof n || !i) return;
                  let s = (t) => {
                    r5(t) && (n(t), i.removeEventListener("pointerleave", s));
                  };
                  i.addEventListener("pointerleave", s, r);
                };
              return (
                n.forEach((t) => {
                  t.addEventListener("pointerenter", o, r);
                }),
                s
              );
            })(
              t,
              (t, e) => (
                r3(this.node, e, "Start"), (t) => r3(this.node, t, "End")
              )
            ));
        }
        unmount() {}
      }
      class r8 extends nT {
        constructor() {
          super(...arguments), (this.isActive = !1);
        }
        onFocus() {
          let t = !1;
          try {
            t = this.node.current.matches(":focus-visible");
          } catch (e) {
            t = !0;
          }
          t &&
            this.node.animationState &&
            (this.node.animationState.setActive("whileFocus", !0),
            (this.isActive = !0));
        }
        onBlur() {
          this.isActive &&
            this.node.animationState &&
            (this.node.animationState.setActive("whileFocus", !1),
            (this.isActive = !1));
        }
        mount() {
          this.unmount = ir(
            nM(this.node.current, "focus", () => this.onFocus()),
            nM(this.node.current, "blur", () => this.onBlur())
          );
        }
        unmount() {}
      }
      let r4 = (t, e) => !!e && (t === e || r4(t, e.parentElement)),
        r9 = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]),
        r7 = new WeakSet();
      function st(t) {
        return (e) => {
          "Enter" === e.key && t(e);
        };
      }
      function se(t, e) {
        t.dispatchEvent(
          new PointerEvent("pointer" + e, { isPrimary: !0, bubbles: !0 })
        );
      }
      function si(t) {
        return nC(t) && !(nE.x || nE.y);
      }
      function sn(t, e, i) {
        let { props: n } = t;
        if (t.current instanceof HTMLButtonElement && t.current.disabled)
          return;
        t.animationState &&
          n.whileTap &&
          t.animationState.setActive("whileTap", "Start" === i);
        let r = n["onTap" + ("End" === i ? "" : i)];
        r && th.postRender(() => r(e, nV(e)));
      }
      class sr extends nT {
        mount() {
          let { current: t } = this.node;
          t &&
            (this.unmount = (function (t, e, i = {}) {
              let [n, r, s] = r2(t, i),
                o = (t) => {
                  let n = t.currentTarget;
                  if (!si(t)) return;
                  r7.add(n);
                  let s = e(n, t),
                    o = (t, e) => {
                      window.removeEventListener("pointerup", a),
                        window.removeEventListener("pointercancel", l),
                        r7.has(n) && r7.delete(n),
                        si(t) && "function" == typeof s && s(t, { success: e });
                    },
                    a = (t) => {
                      o(
                        t,
                        n === window ||
                          n === document ||
                          i.useGlobalTarget ||
                          r4(n, t.target)
                      );
                    },
                    l = (t) => {
                      o(t, !1);
                    };
                  window.addEventListener("pointerup", a, r),
                    window.addEventListener("pointercancel", l, r);
                };
              return (
                n.forEach((t) => {
                  (i.useGlobalTarget ? window : t).addEventListener(
                    "pointerdown",
                    o,
                    r
                  ),
                    n9(t) &&
                      "offsetHeight" in t &&
                      (t.addEventListener("focus", (t) =>
                        ((t, e) => {
                          let i = t.currentTarget;
                          if (!i) return;
                          let n = st(() => {
                            if (r7.has(i)) return;
                            se(i, "down");
                            let t = st(() => {
                              se(i, "up");
                            });
                            i.addEventListener("keyup", t, e),
                              i.addEventListener(
                                "blur",
                                () => se(i, "cancel"),
                                e
                              );
                          });
                          i.addEventListener("keydown", n, e),
                            i.addEventListener(
                              "blur",
                              () => i.removeEventListener("keydown", n),
                              e
                            );
                        })(t, r)
                      ),
                      r9.has(t.tagName) ||
                        -1 !== t.tabIndex ||
                        t.hasAttribute("tabindex") ||
                        (t.tabIndex = 0));
                }),
                s
              );
            })(
              t,
              (t, e) => (
                sn(this.node, e, "Start"),
                (t, { success: e }) => sn(this.node, t, e ? "End" : "Cancel")
              ),
              { useGlobalTarget: this.node.props.globalTapTarget }
            ));
        }
        unmount() {}
      }
      let ss = new WeakMap(),
        so = new WeakMap(),
        sa = (t) => {
          let e = ss.get(t.target);
          e && e(t);
        },
        sl = (t) => {
          t.forEach(sa);
        },
        sh = { some: 0, all: 1 };
      class su extends nT {
        constructor() {
          super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1);
        }
        startObserver() {
          this.unmount();
          let { viewport: t = {} } = this.node.getProps(),
            { root: e, margin: i, amount: n = "some", once: r } = t,
            s = {
              root: e ? e.current : void 0,
              rootMargin: i,
              threshold: "number" == typeof n ? n : sh[n],
            },
            o = (t) => {
              let { isIntersecting: e } = t;
              if (
                this.isInView === e ||
                ((this.isInView = e), r && !e && this.hasEnteredView)
              )
                return;
              e && (this.hasEnteredView = !0),
                this.node.animationState &&
                  this.node.animationState.setActive("whileInView", e);
              let { onViewportEnter: i, onViewportLeave: n } =
                  this.node.getProps(),
                s = e ? i : n;
              s && s(t);
            };
          var a = this.node.current;
          let l = (function ({ root: t, ...e }) {
            let i = t || document;
            so.has(i) || so.set(i, {});
            let n = so.get(i),
              r = JSON.stringify(e);
            return (
              n[r] || (n[r] = new IntersectionObserver(sl, { root: t, ...e })),
              n[r]
            );
          })(s);
          return (
            ss.set(a, o),
            l.observe(a),
            () => {
              ss.delete(a), l.unobserve(a);
            }
          );
        }
        mount() {
          this.startObserver();
        }
        update() {
          if ("undefined" == typeof IntersectionObserver) return;
          let { props: t, prevProps: e } = this.node;
          ["amount", "margin", "root"].some(
            (function ({ viewport: t = {} }, { viewport: e = {} } = {}) {
              return (i) => t[i] !== e[i];
            })(t, e)
          ) && this.startObserver();
        }
        unmount() {}
      }
      let sc = (function (t, e) {
        if ("undefined" == typeof Proxy) return e8;
        let i = new Map(),
          n = (i, n) => e8(i, n, t, e);
        return new Proxy((t, e) => n(t, e), {
          get: (r, s) =>
            "create" === s
              ? n
              : (i.has(s) || i.set(s, e8(s, void 0, t, e)), i.get(s)),
        });
      })(
        {
          animation: { Feature: nA },
          exit: { Feature: nS },
          inView: { Feature: su },
          tap: { Feature: sr },
          focus: { Feature: r8 },
          hover: { Feature: r6 },
          pan: { Feature: n0 },
          drag: { Feature: nJ, ProjectionNode: r1, MeasureLayout: n8 },
          layout: { ProjectionNode: r1, MeasureLayout: n8 },
        },
        (t, e) =>
          eI(t) ? new ej(e) : new eM(e, { allowProjection: t !== r.Fragment })
      );
    },
    7375: (t, e, i) => {
      "use strict";
      var n = i(9841);
      i(2347);
      let r = globalThis._cliPkgExports.pop();
      0 === globalThis._cliPkgExports.length &&
        delete globalThis._cliPkgExports;
      let s = {};
      r.load({ immutable: n }, s),
        s.compile,
        s.compileAsync,
        s.compileString,
        s.compileStringAsync,
        s.initCompiler,
        s.initAsyncCompiler,
        s.Compiler,
        s.AsyncCompiler,
        s.Logger,
        s.SassArgumentList,
        s.SassBoolean,
        s.SassCalculation,
        s.CalculationOperation,
        s.CalculationInterpolation,
        s.SassColor,
        s.SassFunction,
        s.SassList,
        s.SassMap,
        s.SassMixin,
        s.SassNumber,
        s.SassString,
        s.Value,
        s.CustomFunction,
        s.ListSeparator,
        s.sassFalse,
        s.sassNull,
        s.sassTrue,
        s.Exception,
        s.PromiseOr,
        s.info,
        s.render,
        s.renderSync,
        s.TRUE,
        s.FALSE,
        s.NULL,
        s.types,
        s.NodePackageImporter,
        s.deprecations,
        s.Version,
        s.parser_;
    },
    9641: (t) => {
      !(function () {
        var e = {
            675: function (t, e) {
              "use strict";
              (e.byteLength = function (t) {
                var e = l(t),
                  i = e[0],
                  n = e[1];
                return ((i + n) * 3) / 4 - n;
              }),
                (e.toByteArray = function (t) {
                  var e,
                    i,
                    s = l(t),
                    o = s[0],
                    a = s[1],
                    h = new r(((o + a) * 3) / 4 - a),
                    u = 0,
                    c = a > 0 ? o - 4 : o;
                  for (i = 0; i < c; i += 4)
                    (e =
                      (n[t.charCodeAt(i)] << 18) |
                      (n[t.charCodeAt(i + 1)] << 12) |
                      (n[t.charCodeAt(i + 2)] << 6) |
                      n[t.charCodeAt(i + 3)]),
                      (h[u++] = (e >> 16) & 255),
                      (h[u++] = (e >> 8) & 255),
                      (h[u++] = 255 & e);
                  return (
                    2 === a &&
                      ((e =
                        (n[t.charCodeAt(i)] << 2) |
                        (n[t.charCodeAt(i + 1)] >> 4)),
                      (h[u++] = 255 & e)),
                    1 === a &&
                      ((e =
                        (n[t.charCodeAt(i)] << 10) |
                        (n[t.charCodeAt(i + 1)] << 4) |
                        (n[t.charCodeAt(i + 2)] >> 2)),
                      (h[u++] = (e >> 8) & 255),
                      (h[u++] = 255 & e)),
                    h
                  );
                }),
                (e.fromByteArray = function (t) {
                  for (
                    var e, n = t.length, r = n % 3, s = [], o = 0, a = n - r;
                    o < a;
                    o += 16383
                  )
                    s.push(
                      (function (t, e, n) {
                        for (var r, s = [], o = e; o < n; o += 3)
                          (r =
                            ((t[o] << 16) & 0xff0000) +
                            ((t[o + 1] << 8) & 65280) +
                            (255 & t[o + 2])),
                            s.push(
                              i[(r >> 18) & 63] +
                                i[(r >> 12) & 63] +
                                i[(r >> 6) & 63] +
                                i[63 & r]
                            );
                        return s.join("");
                      })(t, o, o + 16383 > a ? a : o + 16383)
                    );
                  return (
                    1 === r
                      ? s.push(i[(e = t[n - 1]) >> 2] + i[(e << 4) & 63] + "==")
                      : 2 === r &&
                        s.push(
                          i[(e = (t[n - 2] << 8) + t[n - 1]) >> 10] +
                            i[(e >> 4) & 63] +
                            i[(e << 2) & 63] +
                            "="
                        ),
                    s.join("")
                  );
                });
              for (
                var i = [],
                  n = [],
                  r = "undefined" != typeof Uint8Array ? Uint8Array : Array,
                  s =
                    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                  o = 0,
                  a = s.length;
                o < a;
                ++o
              )
                (i[o] = s[o]), (n[s.charCodeAt(o)] = o);
              function l(t) {
                var e = t.length;
                if (e % 4 > 0)
                  throw Error("Invalid string. Length must be a multiple of 4");
                var i = t.indexOf("=");
                -1 === i && (i = e);
                var n = i === e ? 0 : 4 - (i % 4);
                return [i, n];
              }
              (n[45] = 62), (n[95] = 63);
            },
            72: function (t, e, i) {
              "use strict";
              var n = i(675),
                r = i(783),
                s =
                  "function" == typeof Symbol && "function" == typeof Symbol.for
                    ? Symbol.for("nodejs.util.inspect.custom")
                    : null;
              function o(t) {
                if (t > 0x7fffffff)
                  throw RangeError(
                    'The value "' + t + '" is invalid for option "size"'
                  );
                var e = new Uint8Array(t);
                return Object.setPrototypeOf(e, a.prototype), e;
              }
              function a(t, e, i) {
                if ("number" == typeof t) {
                  if ("string" == typeof e)
                    throw TypeError(
                      'The "string" argument must be of type string. Received type number'
                    );
                  return u(t);
                }
                return l(t, e, i);
              }
              function l(t, e, i) {
                if ("string" == typeof t) {
                  var n = t,
                    r = e;
                  if (
                    (("string" != typeof r || "" === r) && (r = "utf8"),
                    !a.isEncoding(r))
                  )
                    throw TypeError("Unknown encoding: " + r);
                  var s = 0 | p(n, r),
                    l = o(s),
                    h = l.write(n, r);
                  return h !== s && (l = l.slice(0, h)), l;
                }
                if (ArrayBuffer.isView(t)) return c(t);
                if (null == t)
                  throw TypeError(
                    "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                      typeof t
                  );
                if (
                  V(t, ArrayBuffer) ||
                  (t && V(t.buffer, ArrayBuffer)) ||
                  ("undefined" != typeof SharedArrayBuffer &&
                    (V(t, SharedArrayBuffer) ||
                      (t && V(t.buffer, SharedArrayBuffer))))
                )
                  return (function (t, e, i) {
                    var n;
                    if (e < 0 || t.byteLength < e)
                      throw RangeError('"offset" is outside of buffer bounds');
                    if (t.byteLength < e + (i || 0))
                      throw RangeError('"length" is outside of buffer bounds');
                    return (
                      Object.setPrototypeOf(
                        (n =
                          void 0 === e && void 0 === i
                            ? new Uint8Array(t)
                            : void 0 === i
                            ? new Uint8Array(t, e)
                            : new Uint8Array(t, e, i)),
                        a.prototype
                      ),
                      n
                    );
                  })(t, e, i);
                if ("number" == typeof t)
                  throw TypeError(
                    'The "value" argument must not be of type number. Received type number'
                  );
                var u = t.valueOf && t.valueOf();
                if (null != u && u !== t) return a.from(u, e, i);
                var d = (function (t) {
                  if (a.isBuffer(t)) {
                    var e = 0 | f(t.length),
                      i = o(e);
                    return 0 === i.length || t.copy(i, 0, 0, e), i;
                  }
                  return void 0 !== t.length
                    ? "number" != typeof t.length ||
                      (function (t) {
                        return t != t;
                      })(t.length)
                      ? o(0)
                      : c(t)
                    : "Buffer" === t.type && Array.isArray(t.data)
                    ? c(t.data)
                    : void 0;
                })(t);
                if (d) return d;
                if (
                  "undefined" != typeof Symbol &&
                  null != Symbol.toPrimitive &&
                  "function" == typeof t[Symbol.toPrimitive]
                )
                  return a.from(t[Symbol.toPrimitive]("string"), e, i);
                throw TypeError(
                  "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
                    typeof t
                );
              }
              function h(t) {
                if ("number" != typeof t)
                  throw TypeError('"size" argument must be of type number');
                if (t < 0)
                  throw RangeError(
                    'The value "' + t + '" is invalid for option "size"'
                  );
              }
              function u(t) {
                return h(t), o(t < 0 ? 0 : 0 | f(t));
              }
              function c(t) {
                for (
                  var e = t.length < 0 ? 0 : 0 | f(t.length), i = o(e), n = 0;
                  n < e;
                  n += 1
                )
                  i[n] = 255 & t[n];
                return i;
              }
              (e.Buffer = a),
                (e.SlowBuffer = function (t) {
                  return +t != t && (t = 0), a.alloc(+t);
                }),
                (e.INSPECT_MAX_BYTES = 50),
                (e.kMaxLength = 0x7fffffff),
                (a.TYPED_ARRAY_SUPPORT = (function () {
                  try {
                    var t = new Uint8Array(1),
                      e = {
                        foo: function () {
                          return 42;
                        },
                      };
                    return (
                      Object.setPrototypeOf(e, Uint8Array.prototype),
                      Object.setPrototypeOf(t, e),
                      42 === t.foo()
                    );
                  } catch (t) {
                    return !1;
                  }
                })()),
                a.TYPED_ARRAY_SUPPORT ||
                  "undefined" == typeof console ||
                  "function" != typeof console.error ||
                  console.error(
                    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
                  ),
                Object.defineProperty(a.prototype, "parent", {
                  enumerable: !0,
                  get: function () {
                    if (a.isBuffer(this)) return this.buffer;
                  },
                }),
                Object.defineProperty(a.prototype, "offset", {
                  enumerable: !0,
                  get: function () {
                    if (a.isBuffer(this)) return this.byteOffset;
                  },
                }),
                (a.poolSize = 8192),
                (a.from = function (t, e, i) {
                  return l(t, e, i);
                }),
                Object.setPrototypeOf(a.prototype, Uint8Array.prototype),
                Object.setPrototypeOf(a, Uint8Array),
                (a.alloc = function (t, e, i) {
                  return (h(t), t <= 0)
                    ? o(t)
                    : void 0 !== e
                    ? "string" == typeof i
                      ? o(t).fill(e, i)
                      : o(t).fill(e)
                    : o(t);
                }),
                (a.allocUnsafe = function (t) {
                  return u(t);
                }),
                (a.allocUnsafeSlow = function (t) {
                  return u(t);
                });
              function f(t) {
                if (t >= 0x7fffffff)
                  throw RangeError(
                    "Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes"
                  );
                return 0 | t;
              }
              function p(t, e) {
                if (a.isBuffer(t)) return t.length;
                if (ArrayBuffer.isView(t) || V(t, ArrayBuffer))
                  return t.byteLength;
                if ("string" != typeof t)
                  throw TypeError(
                    'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
                      typeof t
                  );
                var i = t.length,
                  n = arguments.length > 2 && !0 === arguments[2];
                if (!n && 0 === i) return 0;
                for (var r = !1; ; )
                  switch (e) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                      return i;
                    case "utf8":
                    case "utf-8":
                      return S(t).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return 2 * i;
                    case "hex":
                      return i >>> 1;
                    case "base64":
                      return M(t).length;
                    default:
                      if (r) return n ? -1 : S(t).length;
                      (e = ("" + e).toLowerCase()), (r = !0);
                  }
              }
              function d(t, e, i) {
                var r,
                  s,
                  o,
                  a = !1;
                if (
                  ((void 0 === e || e < 0) && (e = 0),
                  e > this.length ||
                    ((void 0 === i || i > this.length) && (i = this.length),
                    i <= 0 || (i >>>= 0) <= (e >>>= 0)))
                )
                  return "";
                for (t || (t = "utf8"); ; )
                  switch (t) {
                    case "hex":
                      return (function (t, e, i) {
                        var n = t.length;
                        (!e || e < 0) && (e = 0),
                          (!i || i < 0 || i > n) && (i = n);
                        for (var r = "", s = e; s < i; ++s) r += k[t[s]];
                        return r;
                      })(this, e, i);
                    case "utf8":
                    case "utf-8":
                      return v(this, e, i);
                    case "ascii":
                      return (function (t, e, i) {
                        var n = "";
                        i = Math.min(t.length, i);
                        for (var r = e; r < i; ++r)
                          n += String.fromCharCode(127 & t[r]);
                        return n;
                      })(this, e, i);
                    case "latin1":
                    case "binary":
                      return (function (t, e, i) {
                        var n = "";
                        i = Math.min(t.length, i);
                        for (var r = e; r < i; ++r)
                          n += String.fromCharCode(t[r]);
                        return n;
                      })(this, e, i);
                    case "base64":
                      return (
                        (r = this),
                        (s = e),
                        (o = i),
                        0 === s && o === r.length
                          ? n.fromByteArray(r)
                          : n.fromByteArray(r.slice(s, o))
                      );
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return (function (t, e, i) {
                        for (
                          var n = t.slice(e, i), r = "", s = 0;
                          s < n.length;
                          s += 2
                        )
                          r += String.fromCharCode(n[s] + 256 * n[s + 1]);
                        return r;
                      })(this, e, i);
                    default:
                      if (a) throw TypeError("Unknown encoding: " + t);
                      (t = (t + "").toLowerCase()), (a = !0);
                  }
              }
              function m(t, e, i) {
                var n = t[e];
                (t[e] = t[i]), (t[i] = n);
              }
              function y(t, e, i, n, r) {
                var s;
                if (0 === t.length) return -1;
                if (
                  ("string" == typeof i
                    ? ((n = i), (i = 0))
                    : i > 0x7fffffff
                    ? (i = 0x7fffffff)
                    : i < -0x80000000 && (i = -0x80000000),
                  (s = i *= 1) != s && (i = r ? 0 : t.length - 1),
                  i < 0 && (i = t.length + i),
                  i >= t.length)
                )
                  if (r) return -1;
                  else i = t.length - 1;
                else if (i < 0)
                  if (!r) return -1;
                  else i = 0;
                if (("string" == typeof e && (e = a.from(e, n)), a.isBuffer(e)))
                  return 0 === e.length ? -1 : g(t, e, i, n, r);
                if ("number" == typeof e) {
                  if (
                    ((e &= 255),
                    "function" == typeof Uint8Array.prototype.indexOf)
                  )
                    if (r) return Uint8Array.prototype.indexOf.call(t, e, i);
                    else return Uint8Array.prototype.lastIndexOf.call(t, e, i);
                  return g(t, [e], i, n, r);
                }
                throw TypeError("val must be string, number or Buffer");
              }
              function g(t, e, i, n, r) {
                var s,
                  o = 1,
                  a = t.length,
                  l = e.length;
                if (
                  void 0 !== n &&
                  ("ucs2" === (n = String(n).toLowerCase()) ||
                    "ucs-2" === n ||
                    "utf16le" === n ||
                    "utf-16le" === n)
                ) {
                  if (t.length < 2 || e.length < 2) return -1;
                  (o = 2), (a /= 2), (l /= 2), (i /= 2);
                }
                function h(t, e) {
                  return 1 === o ? t[e] : t.readUInt16BE(e * o);
                }
                if (r) {
                  var u = -1;
                  for (s = i; s < a; s++)
                    if (h(t, s) === h(e, -1 === u ? 0 : s - u)) {
                      if ((-1 === u && (u = s), s - u + 1 === l)) return u * o;
                    } else -1 !== u && (s -= s - u), (u = -1);
                } else
                  for (i + l > a && (i = a - l), s = i; s >= 0; s--) {
                    for (var c = !0, f = 0; f < l; f++)
                      if (h(t, s + f) !== h(e, f)) {
                        c = !1;
                        break;
                      }
                    if (c) return s;
                  }
                return -1;
              }
              (a.isBuffer = function (t) {
                return null != t && !0 === t._isBuffer && t !== a.prototype;
              }),
                (a.compare = function (t, e) {
                  if (
                    (V(t, Uint8Array) &&
                      (t = a.from(t, t.offset, t.byteLength)),
                    V(e, Uint8Array) && (e = a.from(e, e.offset, e.byteLength)),
                    !a.isBuffer(t) || !a.isBuffer(e))
                  )
                    throw TypeError(
                      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
                    );
                  if (t === e) return 0;
                  for (
                    var i = t.length, n = e.length, r = 0, s = Math.min(i, n);
                    r < s;
                    ++r
                  )
                    if (t[r] !== e[r]) {
                      (i = t[r]), (n = e[r]);
                      break;
                    }
                  return i < n ? -1 : +(n < i);
                }),
                (a.isEncoding = function (t) {
                  switch (String(t).toLowerCase()) {
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
                (a.concat = function (t, e) {
                  if (!Array.isArray(t))
                    throw TypeError(
                      '"list" argument must be an Array of Buffers'
                    );
                  if (0 === t.length) return a.alloc(0);
                  if (void 0 === e)
                    for (i = 0, e = 0; i < t.length; ++i) e += t[i].length;
                  var i,
                    n = a.allocUnsafe(e),
                    r = 0;
                  for (i = 0; i < t.length; ++i) {
                    var s = t[i];
                    if ((V(s, Uint8Array) && (s = a.from(s)), !a.isBuffer(s)))
                      throw TypeError(
                        '"list" argument must be an Array of Buffers'
                      );
                    s.copy(n, r), (r += s.length);
                  }
                  return n;
                }),
                (a.byteLength = p),
                (a.prototype._isBuffer = !0),
                (a.prototype.swap16 = function () {
                  var t = this.length;
                  if (t % 2 != 0)
                    throw RangeError(
                      "Buffer size must be a multiple of 16-bits"
                    );
                  for (var e = 0; e < t; e += 2) m(this, e, e + 1);
                  return this;
                }),
                (a.prototype.swap32 = function () {
                  var t = this.length;
                  if (t % 4 != 0)
                    throw RangeError(
                      "Buffer size must be a multiple of 32-bits"
                    );
                  for (var e = 0; e < t; e += 4)
                    m(this, e, e + 3), m(this, e + 1, e + 2);
                  return this;
                }),
                (a.prototype.swap64 = function () {
                  var t = this.length;
                  if (t % 8 != 0)
                    throw RangeError(
                      "Buffer size must be a multiple of 64-bits"
                    );
                  for (var e = 0; e < t; e += 8)
                    m(this, e, e + 7),
                      m(this, e + 1, e + 6),
                      m(this, e + 2, e + 5),
                      m(this, e + 3, e + 4);
                  return this;
                }),
                (a.prototype.toString = function () {
                  var t = this.length;
                  return 0 === t
                    ? ""
                    : 0 == arguments.length
                    ? v(this, 0, t)
                    : d.apply(this, arguments);
                }),
                (a.prototype.toLocaleString = a.prototype.toString),
                (a.prototype.equals = function (t) {
                  if (!a.isBuffer(t))
                    throw TypeError("Argument must be a Buffer");
                  return this === t || 0 === a.compare(this, t);
                }),
                (a.prototype.inspect = function () {
                  var t = "",
                    i = e.INSPECT_MAX_BYTES;
                  return (
                    (t = this.toString("hex", 0, i)
                      .replace(/(.{2})/g, "$1 ")
                      .trim()),
                    this.length > i && (t += " ... "),
                    "<Buffer " + t + ">"
                  );
                }),
                s && (a.prototype[s] = a.prototype.inspect),
                (a.prototype.compare = function (t, e, i, n, r) {
                  if (
                    (V(t, Uint8Array) &&
                      (t = a.from(t, t.offset, t.byteLength)),
                    !a.isBuffer(t))
                  )
                    throw TypeError(
                      'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                        typeof t
                    );
                  if (
                    (void 0 === e && (e = 0),
                    void 0 === i && (i = t ? t.length : 0),
                    void 0 === n && (n = 0),
                    void 0 === r && (r = this.length),
                    e < 0 || i > t.length || n < 0 || r > this.length)
                  )
                    throw RangeError("out of range index");
                  if (n >= r && e >= i) return 0;
                  if (n >= r) return -1;
                  if (e >= i) return 1;
                  if (
                    ((e >>>= 0), (i >>>= 0), (n >>>= 0), (r >>>= 0), this === t)
                  )
                    return 0;
                  for (
                    var s = r - n,
                      o = i - e,
                      l = Math.min(s, o),
                      h = this.slice(n, r),
                      u = t.slice(e, i),
                      c = 0;
                    c < l;
                    ++c
                  )
                    if (h[c] !== u[c]) {
                      (s = h[c]), (o = u[c]);
                      break;
                    }
                  return s < o ? -1 : +(o < s);
                }),
                (a.prototype.includes = function (t, e, i) {
                  return -1 !== this.indexOf(t, e, i);
                }),
                (a.prototype.indexOf = function (t, e, i) {
                  return y(this, t, e, i, !0);
                }),
                (a.prototype.lastIndexOf = function (t, e, i) {
                  return y(this, t, e, i, !1);
                });
              function v(t, e, i) {
                i = Math.min(t.length, i);
                for (var n = [], r = e; r < i; ) {
                  var s,
                    o,
                    a,
                    l,
                    h = t[r],
                    u = null,
                    c = h > 239 ? 4 : h > 223 ? 3 : h > 191 ? 2 : 1;
                  if (r + c <= i)
                    switch (c) {
                      case 1:
                        h < 128 && (u = h);
                        break;
                      case 2:
                        (192 & (s = t[r + 1])) == 128 &&
                          (l = ((31 & h) << 6) | (63 & s)) > 127 &&
                          (u = l);
                        break;
                      case 3:
                        (s = t[r + 1]),
                          (o = t[r + 2]),
                          (192 & s) == 128 &&
                            (192 & o) == 128 &&
                            (l =
                              ((15 & h) << 12) | ((63 & s) << 6) | (63 & o)) >
                              2047 &&
                            (l < 55296 || l > 57343) &&
                            (u = l);
                        break;
                      case 4:
                        (s = t[r + 1]),
                          (o = t[r + 2]),
                          (a = t[r + 3]),
                          (192 & s) == 128 &&
                            (192 & o) == 128 &&
                            (192 & a) == 128 &&
                            (l =
                              ((15 & h) << 18) |
                              ((63 & s) << 12) |
                              ((63 & o) << 6) |
                              (63 & a)) > 65535 &&
                            l < 1114112 &&
                            (u = l);
                    }
                  null === u
                    ? ((u = 65533), (c = 1))
                    : u > 65535 &&
                      ((u -= 65536),
                      n.push(((u >>> 10) & 1023) | 55296),
                      (u = 56320 | (1023 & u))),
                    n.push(u),
                    (r += c);
                }
                var f = n,
                  p = f.length;
                if (p <= 4096) return String.fromCharCode.apply(String, f);
                for (var d = "", m = 0; m < p; )
                  d += String.fromCharCode.apply(
                    String,
                    f.slice(m, (m += 4096))
                  );
                return d;
              }
              function x(t, e, i) {
                if (t % 1 != 0 || t < 0) throw RangeError("offset is not uint");
                if (t + e > i)
                  throw RangeError("Trying to access beyond buffer length");
              }
              function w(t, e, i, n, r, s) {
                if (!a.isBuffer(t))
                  throw TypeError(
                    '"buffer" argument must be a Buffer instance'
                  );
                if (e > r || e < s)
                  throw RangeError('"value" argument is out of bounds');
                if (i + n > t.length) throw RangeError("Index out of range");
              }
              function b(t, e, i, n, r, s) {
                if (i + n > t.length || i < 0)
                  throw RangeError("Index out of range");
              }
              function T(t, e, i, n, s) {
                return (
                  (e *= 1),
                  (i >>>= 0),
                  s ||
                    b(t, e, i, 4, 34028234663852886e22, -34028234663852886e22),
                  r.write(t, e, i, n, 23, 4),
                  i + 4
                );
              }
              function A(t, e, i, n, s) {
                return (
                  (e *= 1),
                  (i >>>= 0),
                  s ||
                    b(
                      t,
                      e,
                      i,
                      8,
                      17976931348623157e292,
                      -17976931348623157e292
                    ),
                  r.write(t, e, i, n, 52, 8),
                  i + 8
                );
              }
              (a.prototype.write = function (t, e, i, n) {
                if (void 0 === e) (n = "utf8"), (i = this.length), (e = 0);
                else if (void 0 === i && "string" == typeof e)
                  (n = e), (i = this.length), (e = 0);
                else if (isFinite(e))
                  (e >>>= 0),
                    isFinite(i)
                      ? ((i >>>= 0), void 0 === n && (n = "utf8"))
                      : ((n = i), (i = void 0));
                else
                  throw Error(
                    "Buffer.write(string, encoding, offset[, length]) is no longer supported"
                  );
                var r,
                  s,
                  o,
                  a,
                  l,
                  h,
                  u,
                  c,
                  f = this.length - e;
                if (
                  ((void 0 === i || i > f) && (i = f),
                  (t.length > 0 && (i < 0 || e < 0)) || e > this.length)
                )
                  throw RangeError("Attempt to write outside buffer bounds");
                n || (n = "utf8");
                for (var p = !1; ; )
                  switch (n) {
                    case "hex":
                      return (function (t, e, i, n) {
                        i = Number(i) || 0;
                        var r = t.length - i;
                        n ? (n = Number(n)) > r && (n = r) : (n = r);
                        var s = e.length;
                        n > s / 2 && (n = s / 2);
                        for (var o = 0; o < n; ++o) {
                          var a,
                            l = parseInt(e.substr(2 * o, 2), 16);
                          if ((a = l) != a) break;
                          t[i + o] = l;
                        }
                        return o;
                      })(this, t, e, i);
                    case "utf8":
                    case "utf-8":
                      return (
                        (r = e), (s = i), C(S(t, this.length - r), this, r, s)
                      );
                    case "ascii":
                      return (o = e), (a = i), C(E(t), this, o, a);
                    case "latin1":
                    case "binary":
                      return (function (t, e, i, n) {
                        return C(E(e), t, i, n);
                      })(this, t, e, i);
                    case "base64":
                      return (l = e), (h = i), C(M(t), this, l, h);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                      return (
                        (u = e),
                        (c = i),
                        C(
                          (function (t, e) {
                            for (
                              var i, n, r = [], s = 0;
                              s < t.length && !((e -= 2) < 0);
                              ++s
                            )
                              (n = (i = t.charCodeAt(s)) >> 8),
                                r.push(i % 256),
                                r.push(n);
                            return r;
                          })(t, this.length - u),
                          this,
                          u,
                          c
                        )
                      );
                    default:
                      if (p) throw TypeError("Unknown encoding: " + n);
                      (n = ("" + n).toLowerCase()), (p = !0);
                  }
              }),
                (a.prototype.toJSON = function () {
                  return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0),
                  };
                }),
                (a.prototype.slice = function (t, e) {
                  var i = this.length;
                  (t = ~~t),
                    (e = void 0 === e ? i : ~~e),
                    t < 0 ? (t += i) < 0 && (t = 0) : t > i && (t = i),
                    e < 0 ? (e += i) < 0 && (e = 0) : e > i && (e = i),
                    e < t && (e = t);
                  var n = this.subarray(t, e);
                  return Object.setPrototypeOf(n, a.prototype), n;
                }),
                (a.prototype.readUIntLE = function (t, e, i) {
                  (t >>>= 0), (e >>>= 0), i || x(t, e, this.length);
                  for (var n = this[t], r = 1, s = 0; ++s < e && (r *= 256); )
                    n += this[t + s] * r;
                  return n;
                }),
                (a.prototype.readUIntBE = function (t, e, i) {
                  (t >>>= 0), (e >>>= 0), i || x(t, e, this.length);
                  for (var n = this[t + --e], r = 1; e > 0 && (r *= 256); )
                    n += this[t + --e] * r;
                  return n;
                }),
                (a.prototype.readUInt8 = function (t, e) {
                  return (t >>>= 0), e || x(t, 1, this.length), this[t];
                }),
                (a.prototype.readUInt16LE = function (t, e) {
                  return (
                    (t >>>= 0),
                    e || x(t, 2, this.length),
                    this[t] | (this[t + 1] << 8)
                  );
                }),
                (a.prototype.readUInt16BE = function (t, e) {
                  return (
                    (t >>>= 0),
                    e || x(t, 2, this.length),
                    (this[t] << 8) | this[t + 1]
                  );
                }),
                (a.prototype.readUInt32LE = function (t, e) {
                  return (
                    (t >>>= 0),
                    e || x(t, 4, this.length),
                    (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
                      0x1000000 * this[t + 3]
                  );
                }),
                (a.prototype.readUInt32BE = function (t, e) {
                  return (
                    (t >>>= 0),
                    e || x(t, 4, this.length),
                    0x1000000 * this[t] +
                      ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
                  );
                }),
                (a.prototype.readIntLE = function (t, e, i) {
                  (t >>>= 0), (e >>>= 0), i || x(t, e, this.length);
                  for (var n = this[t], r = 1, s = 0; ++s < e && (r *= 256); )
                    n += this[t + s] * r;
                  return n >= (r *= 128) && (n -= Math.pow(2, 8 * e)), n;
                }),
                (a.prototype.readIntBE = function (t, e, i) {
                  (t >>>= 0), (e >>>= 0), i || x(t, e, this.length);
                  for (
                    var n = e, r = 1, s = this[t + --n];
                    n > 0 && (r *= 256);

                  )
                    s += this[t + --n] * r;
                  return s >= (r *= 128) && (s -= Math.pow(2, 8 * e)), s;
                }),
                (a.prototype.readInt8 = function (t, e) {
                  return ((t >>>= 0), e || x(t, 1, this.length), 128 & this[t])
                    ? -((255 - this[t] + 1) * 1)
                    : this[t];
                }),
                (a.prototype.readInt16LE = function (t, e) {
                  (t >>>= 0), e || x(t, 2, this.length);
                  var i = this[t] | (this[t + 1] << 8);
                  return 32768 & i ? 0xffff0000 | i : i;
                }),
                (a.prototype.readInt16BE = function (t, e) {
                  (t >>>= 0), e || x(t, 2, this.length);
                  var i = this[t + 1] | (this[t] << 8);
                  return 32768 & i ? 0xffff0000 | i : i;
                }),
                (a.prototype.readInt32LE = function (t, e) {
                  return (
                    (t >>>= 0),
                    e || x(t, 4, this.length),
                    this[t] |
                      (this[t + 1] << 8) |
                      (this[t + 2] << 16) |
                      (this[t + 3] << 24)
                  );
                }),
                (a.prototype.readInt32BE = function (t, e) {
                  return (
                    (t >>>= 0),
                    e || x(t, 4, this.length),
                    (this[t] << 24) |
                      (this[t + 1] << 16) |
                      (this[t + 2] << 8) |
                      this[t + 3]
                  );
                }),
                (a.prototype.readFloatLE = function (t, e) {
                  return (
                    (t >>>= 0),
                    e || x(t, 4, this.length),
                    r.read(this, t, !0, 23, 4)
                  );
                }),
                (a.prototype.readFloatBE = function (t, e) {
                  return (
                    (t >>>= 0),
                    e || x(t, 4, this.length),
                    r.read(this, t, !1, 23, 4)
                  );
                }),
                (a.prototype.readDoubleLE = function (t, e) {
                  return (
                    (t >>>= 0),
                    e || x(t, 8, this.length),
                    r.read(this, t, !0, 52, 8)
                  );
                }),
                (a.prototype.readDoubleBE = function (t, e) {
                  return (
                    (t >>>= 0),
                    e || x(t, 8, this.length),
                    r.read(this, t, !1, 52, 8)
                  );
                }),
                (a.prototype.writeUIntLE = function (t, e, i, n) {
                  if (((t *= 1), (e >>>= 0), (i >>>= 0), !n)) {
                    var r = Math.pow(2, 8 * i) - 1;
                    w(this, t, e, i, r, 0);
                  }
                  var s = 1,
                    o = 0;
                  for (this[e] = 255 & t; ++o < i && (s *= 256); )
                    this[e + o] = (t / s) & 255;
                  return e + i;
                }),
                (a.prototype.writeUIntBE = function (t, e, i, n) {
                  if (((t *= 1), (e >>>= 0), (i >>>= 0), !n)) {
                    var r = Math.pow(2, 8 * i) - 1;
                    w(this, t, e, i, r, 0);
                  }
                  var s = i - 1,
                    o = 1;
                  for (this[e + s] = 255 & t; --s >= 0 && (o *= 256); )
                    this[e + s] = (t / o) & 255;
                  return e + i;
                }),
                (a.prototype.writeUInt8 = function (t, e, i) {
                  return (
                    (t *= 1),
                    (e >>>= 0),
                    i || w(this, t, e, 1, 255, 0),
                    (this[e] = 255 & t),
                    e + 1
                  );
                }),
                (a.prototype.writeUInt16LE = function (t, e, i) {
                  return (
                    (t *= 1),
                    (e >>>= 0),
                    i || w(this, t, e, 2, 65535, 0),
                    (this[e] = 255 & t),
                    (this[e + 1] = t >>> 8),
                    e + 2
                  );
                }),
                (a.prototype.writeUInt16BE = function (t, e, i) {
                  return (
                    (t *= 1),
                    (e >>>= 0),
                    i || w(this, t, e, 2, 65535, 0),
                    (this[e] = t >>> 8),
                    (this[e + 1] = 255 & t),
                    e + 2
                  );
                }),
                (a.prototype.writeUInt32LE = function (t, e, i) {
                  return (
                    (t *= 1),
                    (e >>>= 0),
                    i || w(this, t, e, 4, 0xffffffff, 0),
                    (this[e + 3] = t >>> 24),
                    (this[e + 2] = t >>> 16),
                    (this[e + 1] = t >>> 8),
                    (this[e] = 255 & t),
                    e + 4
                  );
                }),
                (a.prototype.writeUInt32BE = function (t, e, i) {
                  return (
                    (t *= 1),
                    (e >>>= 0),
                    i || w(this, t, e, 4, 0xffffffff, 0),
                    (this[e] = t >>> 24),
                    (this[e + 1] = t >>> 16),
                    (this[e + 2] = t >>> 8),
                    (this[e + 3] = 255 & t),
                    e + 4
                  );
                }),
                (a.prototype.writeIntLE = function (t, e, i, n) {
                  if (((t *= 1), (e >>>= 0), !n)) {
                    var r = Math.pow(2, 8 * i - 1);
                    w(this, t, e, i, r - 1, -r);
                  }
                  var s = 0,
                    o = 1,
                    a = 0;
                  for (this[e] = 255 & t; ++s < i && (o *= 256); )
                    t < 0 && 0 === a && 0 !== this[e + s - 1] && (a = 1),
                      (this[e + s] = (((t / o) | 0) - a) & 255);
                  return e + i;
                }),
                (a.prototype.writeIntBE = function (t, e, i, n) {
                  if (((t *= 1), (e >>>= 0), !n)) {
                    var r = Math.pow(2, 8 * i - 1);
                    w(this, t, e, i, r - 1, -r);
                  }
                  var s = i - 1,
                    o = 1,
                    a = 0;
                  for (this[e + s] = 255 & t; --s >= 0 && (o *= 256); )
                    t < 0 && 0 === a && 0 !== this[e + s + 1] && (a = 1),
                      (this[e + s] = (((t / o) | 0) - a) & 255);
                  return e + i;
                }),
                (a.prototype.writeInt8 = function (t, e, i) {
                  return (
                    (t *= 1),
                    (e >>>= 0),
                    i || w(this, t, e, 1, 127, -128),
                    t < 0 && (t = 255 + t + 1),
                    (this[e] = 255 & t),
                    e + 1
                  );
                }),
                (a.prototype.writeInt16LE = function (t, e, i) {
                  return (
                    (t *= 1),
                    (e >>>= 0),
                    i || w(this, t, e, 2, 32767, -32768),
                    (this[e] = 255 & t),
                    (this[e + 1] = t >>> 8),
                    e + 2
                  );
                }),
                (a.prototype.writeInt16BE = function (t, e, i) {
                  return (
                    (t *= 1),
                    (e >>>= 0),
                    i || w(this, t, e, 2, 32767, -32768),
                    (this[e] = t >>> 8),
                    (this[e + 1] = 255 & t),
                    e + 2
                  );
                }),
                (a.prototype.writeInt32LE = function (t, e, i) {
                  return (
                    (t *= 1),
                    (e >>>= 0),
                    i || w(this, t, e, 4, 0x7fffffff, -0x80000000),
                    (this[e] = 255 & t),
                    (this[e + 1] = t >>> 8),
                    (this[e + 2] = t >>> 16),
                    (this[e + 3] = t >>> 24),
                    e + 4
                  );
                }),
                (a.prototype.writeInt32BE = function (t, e, i) {
                  return (
                    (t *= 1),
                    (e >>>= 0),
                    i || w(this, t, e, 4, 0x7fffffff, -0x80000000),
                    t < 0 && (t = 0xffffffff + t + 1),
                    (this[e] = t >>> 24),
                    (this[e + 1] = t >>> 16),
                    (this[e + 2] = t >>> 8),
                    (this[e + 3] = 255 & t),
                    e + 4
                  );
                }),
                (a.prototype.writeFloatLE = function (t, e, i) {
                  return T(this, t, e, !0, i);
                }),
                (a.prototype.writeFloatBE = function (t, e, i) {
                  return T(this, t, e, !1, i);
                }),
                (a.prototype.writeDoubleLE = function (t, e, i) {
                  return A(this, t, e, !0, i);
                }),
                (a.prototype.writeDoubleBE = function (t, e, i) {
                  return A(this, t, e, !1, i);
                }),
                (a.prototype.copy = function (t, e, i, n) {
                  if (!a.isBuffer(t))
                    throw TypeError("argument should be a Buffer");
                  if (
                    (i || (i = 0),
                    n || 0 === n || (n = this.length),
                    e >= t.length && (e = t.length),
                    e || (e = 0),
                    n > 0 && n < i && (n = i),
                    n === i || 0 === t.length || 0 === this.length)
                  )
                    return 0;
                  if (e < 0) throw RangeError("targetStart out of bounds");
                  if (i < 0 || i >= this.length)
                    throw RangeError("Index out of range");
                  if (n < 0) throw RangeError("sourceEnd out of bounds");
                  n > this.length && (n = this.length),
                    t.length - e < n - i && (n = t.length - e + i);
                  var r = n - i;
                  if (
                    this === t &&
                    "function" == typeof Uint8Array.prototype.copyWithin
                  )
                    this.copyWithin(e, i, n);
                  else if (this === t && i < e && e < n)
                    for (var s = r - 1; s >= 0; --s) t[s + e] = this[s + i];
                  else Uint8Array.prototype.set.call(t, this.subarray(i, n), e);
                  return r;
                }),
                (a.prototype.fill = function (t, e, i, n) {
                  if ("string" == typeof t) {
                    if (
                      ("string" == typeof e
                        ? ((n = e), (e = 0), (i = this.length))
                        : "string" == typeof i && ((n = i), (i = this.length)),
                      void 0 !== n && "string" != typeof n)
                    )
                      throw TypeError("encoding must be a string");
                    if ("string" == typeof n && !a.isEncoding(n))
                      throw TypeError("Unknown encoding: " + n);
                    if (1 === t.length) {
                      var r,
                        s = t.charCodeAt(0);
                      (("utf8" === n && s < 128) || "latin1" === n) && (t = s);
                    }
                  } else
                    "number" == typeof t
                      ? (t &= 255)
                      : "boolean" == typeof t && (t = Number(t));
                  if (e < 0 || this.length < e || this.length < i)
                    throw RangeError("Out of range index");
                  if (i <= e) return this;
                  if (
                    ((e >>>= 0),
                    (i = void 0 === i ? this.length : i >>> 0),
                    t || (t = 0),
                    "number" == typeof t)
                  )
                    for (r = e; r < i; ++r) this[r] = t;
                  else {
                    var o = a.isBuffer(t) ? t : a.from(t, n),
                      l = o.length;
                    if (0 === l)
                      throw TypeError(
                        'The value "' + t + '" is invalid for argument "value"'
                      );
                    for (r = 0; r < i - e; ++r) this[r + e] = o[r % l];
                  }
                  return this;
                });
              var P = /[^+/0-9A-Za-z-_]/g;
              function S(t, e) {
                e = e || 1 / 0;
                for (var i, n = t.length, r = null, s = [], o = 0; o < n; ++o) {
                  if ((i = t.charCodeAt(o)) > 55295 && i < 57344) {
                    if (!r) {
                      if (i > 56319 || o + 1 === n) {
                        (e -= 3) > -1 && s.push(239, 191, 189);
                        continue;
                      }
                      r = i;
                      continue;
                    }
                    if (i < 56320) {
                      (e -= 3) > -1 && s.push(239, 191, 189), (r = i);
                      continue;
                    }
                    i = (((r - 55296) << 10) | (i - 56320)) + 65536;
                  } else r && (e -= 3) > -1 && s.push(239, 191, 189);
                  if (((r = null), i < 128)) {
                    if ((e -= 1) < 0) break;
                    s.push(i);
                  } else if (i < 2048) {
                    if ((e -= 2) < 0) break;
                    s.push((i >> 6) | 192, (63 & i) | 128);
                  } else if (i < 65536) {
                    if ((e -= 3) < 0) break;
                    s.push(
                      (i >> 12) | 224,
                      ((i >> 6) & 63) | 128,
                      (63 & i) | 128
                    );
                  } else if (i < 1114112) {
                    if ((e -= 4) < 0) break;
                    s.push(
                      (i >> 18) | 240,
                      ((i >> 12) & 63) | 128,
                      ((i >> 6) & 63) | 128,
                      (63 & i) | 128
                    );
                  } else throw Error("Invalid code point");
                }
                return s;
              }
              function E(t) {
                for (var e = [], i = 0; i < t.length; ++i)
                  e.push(255 & t.charCodeAt(i));
                return e;
              }
              function M(t) {
                return n.toByteArray(
                  (function (t) {
                    if (
                      (t = (t = t.split("=")[0]).trim().replace(P, "")).length <
                      2
                    )
                      return "";
                    for (; t.length % 4 != 0; ) t += "=";
                    return t;
                  })(t)
                );
              }
              function C(t, e, i, n) {
                for (
                  var r = 0;
                  r < n && !(r + i >= e.length) && !(r >= t.length);
                  ++r
                )
                  e[r + i] = t[r];
                return r;
              }
              function V(t, e) {
                return (
                  t instanceof e ||
                  (null != t &&
                    null != t.constructor &&
                    null != t.constructor.name &&
                    t.constructor.name === e.name)
                );
              }
              var k = (function () {
                for (
                  var t = "0123456789abcdef", e = Array(256), i = 0;
                  i < 16;
                  ++i
                )
                  for (var n = 16 * i, r = 0; r < 16; ++r)
                    e[n + r] = t[i] + t[r];
                return e;
              })();
            },
            783: function (t, e) {
              (e.read = function (t, e, i, n, r) {
                var s,
                  o,
                  a = 8 * r - n - 1,
                  l = (1 << a) - 1,
                  h = l >> 1,
                  u = -7,
                  c = i ? r - 1 : 0,
                  f = i ? -1 : 1,
                  p = t[e + c];
                for (
                  c += f, s = p & ((1 << -u) - 1), p >>= -u, u += a;
                  u > 0;
                  s = 256 * s + t[e + c], c += f, u -= 8
                );
                for (
                  o = s & ((1 << -u) - 1), s >>= -u, u += n;
                  u > 0;
                  o = 256 * o + t[e + c], c += f, u -= 8
                );
                if (0 === s) s = 1 - h;
                else {
                  if (s === l) return o ? NaN : (1 / 0) * (p ? -1 : 1);
                  (o += Math.pow(2, n)), (s -= h);
                }
                return (p ? -1 : 1) * o * Math.pow(2, s - n);
              }),
                (e.write = function (t, e, i, n, r, s) {
                  var o,
                    a,
                    l,
                    h = 8 * s - r - 1,
                    u = (1 << h) - 1,
                    c = u >> 1,
                    f = 5960464477539062e-23 * (23 === r),
                    p = n ? 0 : s - 1,
                    d = n ? 1 : -1,
                    m = +(e < 0 || (0 === e && 1 / e < 0));
                  for (
                    isNaN((e = Math.abs(e))) || e === 1 / 0
                      ? ((a = +!!isNaN(e)), (o = u))
                      : ((o = Math.floor(Math.log(e) / Math.LN2)),
                        e * (l = Math.pow(2, -o)) < 1 && (o--, (l *= 2)),
                        o + c >= 1
                          ? (e += f / l)
                          : (e += f * Math.pow(2, 1 - c)),
                        e * l >= 2 && (o++, (l /= 2)),
                        o + c >= u
                          ? ((a = 0), (o = u))
                          : o + c >= 1
                          ? ((a = (e * l - 1) * Math.pow(2, r)), (o += c))
                          : ((a = e * Math.pow(2, c - 1) * Math.pow(2, r)),
                            (o = 0)));
                    r >= 8;
                    t[i + p] = 255 & a, p += d, a /= 256, r -= 8
                  );
                  for (
                    o = (o << r) | a, h += r;
                    h > 0;
                    t[i + p] = 255 & o, p += d, o /= 256, h -= 8
                  );
                  t[i + p - d] |= 128 * m;
                });
            },
          },
          i = {};
        function n(t) {
          var r = i[t];
          if (void 0 !== r) return r.exports;
          var s = (i[t] = { exports: {} }),
            o = !0;
          try {
            e[t](s, s.exports, n), (o = !1);
          } finally {
            o && delete i[t];
          }
          return s.exports;
        }
        (n.ab = "//"), (t.exports = n(72));
      })();
    },
  },
]);
