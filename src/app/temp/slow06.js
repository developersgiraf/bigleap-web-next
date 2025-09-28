(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [974],
  {
    837: (e) => {
      e.exports = {
        hero: "app_hero__KFSxe",
        hanging: "app_hanging___YA39",
        yeehaimage: "app_yeehaimage__6sTmZ",
        image360: "app_image360__ijWvp",
        characterimage: "app_characterimage__ycLv3",
        "about-area": "app_about-area__MMZck",
        "about-row": "app_about-row__czOPX",
        "about-first-box": "app_about-first-box__izeQk",
        "about-secont-box": "app_about-secont-box__FEuf9",
        "slide-head": "app_slide-head__S5Vz1",
        "special-head": "app_special-head__nuzt5",
        specialslide: "app_specialslide__shYRf",
        mySwiper: "app_mySwiper__yh05k",
        video: "app_video__q_JgD",
        "watch-area": "app_watch-area__gvid6",
        watch: "app_watch__6YGCm",
        "first-video": "app_first-video__vBd2P",
        video1: "app_video1__x8_8q",
        video2: "app_video2__ZswKm",
        "second-video": "app_second-video__xVaoK",
        content: "app_content__7IxbH",
        video3: "app_video3__priEC",
        "video-slider": "app_video-slider__njiYY",
        vdo: "app_vdo__P_FWL",
        "video-content": "app_video-content__jEsGr",
        "video-wrapper": "app_video-wrapper__rZY6E",
        "motion-graphics": "app_motion-graphics__kU5m7",
        "motion-graphics-content": "app_motion-graphics-content__ZflQi",
        specialslides: "app_specialslides__mnDEK",
        "video-width-full": "app_video-width-full__WdBNg",
        "video-width-90": "app_video-width-90__kLYVV",
        "video-width-80": "app_video-width-80__sGRrz",
        "video-width-70": "app_video-width-70__y73uw",
        "video-width-60": "app_video-width-60__5vAA0",
        "video-responsive": "app_video-responsive__yfC61",
        "video-aspect-16-9": "app_video-aspect-16-9___llA4",
        "video-aspect-4-3": "app_video-aspect-4-3__pnlI_",
        "video-aspect-21-9": "app_video-aspect-21-9__bjPB1",
        "video-rounded": "app_video-rounded__t8DyN",
        "video-shadow": "app_video-shadow__2m_Ft",
      };
    },
    1128: (e) => {
      e.exports = {
        blogsection: "blog_blogsection__qm1hM",
        blogcontent: "blog_blogcontent__V2vlo",
        bloghead: "blog_bloghead__cCz_3",
        blogimages: "blog_blogimages__myk7S",
        blogrow: "blog_blogrow__biiTA",
        titleHead: "blog_titleHead__UGAzw",
        title: "blog_title__PfWlf",
        date: "blog_date__2aYJx",
        about: "blog_about__NA_Qu",
      };
    },
    1324: (e) => {
      function i(e) {
        var i = Error("Cannot find module '" + e + "'");
        throw ((i.code = "MODULE_NOT_FOUND"), i);
      }
      (i.keys = () => []), (i.resolve = i), (i.id = 1324), (e.exports = i);
    },
    1631: (e, i, a) => {
      "use strict";
      a.d(i, { default: () => c });
      var s = a(5155),
        t = a(2115),
        n = a(9653),
        l = a.n(n),
        o = a(6766),
        r = a(7393);
      function c() {
        return (
          (0, t.useEffect)(() => {
            a.e(737).then(a.t.bind(a, 5737, 23));
          }, []),
          (0, s.jsxs)(s.Fragment, {
            children: [
              (0, s.jsxs)("section", {
                className: l()["enquiry-section"],
                children: [
                  (0, s.jsx)(o.default, {
                    src: "/enquiry/EnquireNow.png",
                    alt: "Enquiry Background",
                    width: 1728,
                    height: 756,
                    className: l().image,
                  }),
                  (0, s.jsx)("div", {
                    className: l().buttonContainer,
                    children: (0, s.jsx)(r.A, {
                      title: "ENQUIRE NOW",
                      isModal: !0,
                      modalTarget: "#enquiryModal",
                    }),
                  }),
                ],
              }),
              (0, s.jsx)("div", {
                className: "modal fade",
                id: "enquiryModal",
                "aria-hidden": "true",
                "aria-labelledby": "enquiryModalLabel",
                tabIndex: "-1",
                children: (0, s.jsx)("div", {
                  className: "modal-dialog modal-dialog-centered ".concat(
                    l().modalDialog
                  ),
                  children: (0, s.jsxs)("div", {
                    className: "modal-content ".concat(l().modalContent),
                    children: [
                      (0, s.jsxs)("div", {
                        className: "modal-header ".concat(l().modalHeader),
                        children: [
                          (0, s.jsx)("h1", {
                            className: "modal-title ".concat(
                              l().title,
                              " fs-5"
                            ),
                            id: "enquiryModalLabel",
                            children: "ENQUIRY FORM",
                          }),
                          (0, s.jsx)("button", {
                            type: "button",
                            className: "btn-close ".concat(l().btnClose),
                            "data-bs-dismiss": "modal",
                            "aria-label": "Close",
                          }),
                        ],
                      }),
                      (0, s.jsxs)("form", {
                        onSubmit: (e) => {
                          e.preventDefault(),
                            console.log(
                              "Form Submitted:",
                              Object.fromEntries(
                                new FormData(e.target).entries()
                              )
                            );
                        },
                        children: [
                          (0, s.jsx)("div", {
                            className: "modal-body ".concat(l().modalBody),
                            children: (0, s.jsxs)("div", {
                              className: "row",
                              children: [
                                (0, s.jsx)("div", {
                                  className:
                                    "col-xl-6 col-lg-6 col-md-12 col-sm-12",
                                  children: (0, s.jsx)("div", {
                                    className: l().input,
                                    children: (0, s.jsx)("input", {
                                      type: "text",
                                      name: "name",
                                      placeholder: "Your Name",
                                      required: !0,
                                    }),
                                  }),
                                }),
                                (0, s.jsx)("div", {
                                  className:
                                    "col-xl-6 col-lg-6 col-md-12 col-sm-12",
                                  children: (0, s.jsx)("div", {
                                    className: l().input,
                                    children: (0, s.jsx)("input", {
                                      type: "text",
                                      name: "phone",
                                      placeholder: "Your Phone",
                                      required: !0,
                                    }),
                                  }),
                                }),
                                (0, s.jsx)("div", {
                                  className:
                                    "col-xl-12 col-lg-12 col-md-12 col-sm-12",
                                  children: (0, s.jsx)("div", {
                                    className: l().input,
                                    children: (0, s.jsx)("input", {
                                      type: "email",
                                      name: "email",
                                      placeholder: "Your Email",
                                      required: !0,
                                    }),
                                  }),
                                }),
                                (0, s.jsx)("div", {
                                  className:
                                    "col-xl-12 col-lg-12 col-md-12 col-sm-12",
                                  children: (0, s.jsx)("div", {
                                    className: l().input,
                                    children: (0, s.jsx)("input", {
                                      type: "text",
                                      name: "message",
                                      placeholder: "Your Message",
                                    }),
                                  }),
                                }),
                              ],
                            }),
                          }),
                          (0, s.jsx)("div", {
                            className: "modal-footer ".concat(l().foottt),
                            children: (0, s.jsx)(r.A, {
                              title: "SUBMIT",
                              link: "#",
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              }),
            ],
          })
        );
      }
    },
    2773: (e) => {
      e.exports = {
        "social-media-icon": "icon_social-media-icon__P4Qvz",
        image: "icon_image__CST61",
      };
    },
    3605: (e, i, a) => {
      "use strict";
      a.r(i), a.d(i, { default: () => Y });
      var s = a(5155),
        t = a(6766),
        n = a(2900),
        l = a(837),
        o = a.n(l),
        r = a(8334),
        c = a.n(r),
        d = a(8653),
        m = a(9587),
        p = a.n(m);
      function g(e) {
        let { title: i, sub: a } = e;
        return (0, s.jsx)(s.Fragment, {
          children: (0, s.jsx)("section", {
            className: p().buscol,
            children: (0, s.jsx)("div", {
              className: "container",
              children: (0, s.jsxs)("div", {
                className: p().businessHead,
                children: [
                  (0, s.jsx)("h5", { children: i }),
                  (0, s.jsx)("p", { className: p().listcontent, children: a }),
                ],
              }),
            }),
          }),
        });
      }
      function h(e) {
        let { title: i, sub: a } = e;
        return (0, s.jsx)("section", {
          className: p().businessArea,
          children: (0, s.jsx)("div", {
            className: "container",
            children: (0, s.jsx)("div", {
              className: p()["business-list"],
              children: (0, s.jsxs)("div", {
                className: "row align-items-center",
                children: [
                  (0, s.jsx)("div", {
                    className: "col-xl-5 col-lg-12 col-md-12 col-sm-12",
                    children: (0, s.jsxs)("div", {
                      className: p().heading,
                      children: [
                        (0, s.jsx)("h2", {
                          children: "Let animation lead your business",
                        }),
                        (0, s.jsx)("p", {
                          className: p().list,
                          children:
                            "Where words fail, visuals take over. In this tech-driven world, animation is the major edge that provides a creative nudge to communication.",
                        }),
                      ],
                    }),
                  }),
                  (0, s.jsx)("div", {
                    className: "col-xl-7 col-lg-12 col-md-12 col-sm-12",
                    children: (0, s.jsx)("div", {
                      className: p().lists,
                      children: [
                        {
                          title: "Strengthening Brand Identity",
                          sub: "Custom animated videos make all the difference by anchoring your unique brand identity, that will leave your mark in the competitive edge.",
                        },
                        {
                          title: "Simplifying Complex Ideas",
                          sub: "Complex concepts can be simplified with the help of engaging animation, that will effectively communicate your idea..",
                        },
                        {
                          title: "Strengthening\xa0Brand\xa0Identity",
                          sub: "Utilize the innovations of animation and create enthralling content that will lead to customer engagement, resulting in more leads and increase in sales.",
                        },
                      ].map((e, i) =>
                        (0, s.jsx)(g, { title: e.title, sub: e.sub }, i)
                      ),
                    }),
                  }),
                ],
              }),
            }),
          }),
        });
      }
      var u = a(4628),
        _ = a.n(u),
        x = a(6104);
      function b() {
        return (0, s.jsx)(s.Fragment, {
          children: (0, s.jsx)("section", {
            className: _().test,
            children: (0, s.jsxs)("div", {
              className: "container",
              children: [
                (0, s.jsxs)("div", {
                  className: _().diff,
                  children: [
                    (0, s.jsx)("h2", { children: "The Difference We Bring" }),
                    (0, s.jsx)("p", {
                      children:
                        "At Big leap, from scribble to motion, we dont't just animate, we bring life to narratives that create an impact.",
                    }),
                  ],
                }),
                (0, s.jsx)("div", {
                  className: "row",
                  children: (0, s.jsx)("div", {
                    className: _().all,
                    children: [
                      {
                        title: "Dynamic Team",
                        sub: "A dynamic team of experienced animators providing customized services to make your brand stand out.",
                      },
                      {
                        title: "Animation, VFX and more..",
                        sub: "Variety of animation services at your disposal 2D&3D animation videos, VFX, product explanatory videos, corporate videos, client testimonials and many more.",
                      },
                      {
                        title: "Custom solutions across industries",
                        sub: "We provide custom animation services across a wide range of industries including education, healthcare, marketing and many more.",
                      },
                      {
                        title: "Quality services",
                        sub: "Quality services that exceed the client’s expectations with a fast turnaround time.",
                      },
                    ].map((e, i) =>
                      (0, s.jsx)(x.A, { title: e.title, sub: e.sub }, i)
                    ),
                  }),
                }),
              ],
            }),
          }),
        });
      }
      var j = a(7393),
        v = a(2619),
        f = a(1128),
        w = a.n(f);
      function y() {
        return (0, s.jsx)(s.Fragment, {
          children: (0, s.jsx)("section", {
            className: w().blogsection,
            children: (0, s.jsx)("div", {
              className: "container",
              children: (0, s.jsxs)("div", {
                className: w().blogcontent,
                children: [
                  (0, s.jsxs)("div", {
                    className: w().bloghead,
                    children: [
                      (0, s.jsx)("h6", { children: "Blogs" }),
                      (0, s.jsx)("h2", { children: "Our Latest Blogs" }),
                    ],
                  }),
                  (0, s.jsx)("div", {
                    className: w().blogimages,
                    children: (0, s.jsx)("div", {
                      className: "row ".concat(w().blogrow),
                      children: [
                        {
                          image: "blog1.png",
                          title: "Blog 1 Subtitle",
                          date: "2023-10-01",
                          about: "This is a brief description of Blog 1.",
                        },
                        {
                          image: "blog2.png",
                          title: "Blog 2 Subtitle",
                          date: "2023-10-02",
                          about: "This is a brief description of Blog 2.",
                        },
                        {
                          image: "blog3.png",
                          title: "Blog 3 Subtitle",
                          date: "2023-10-03",
                          about: "This is a brief description of Blog 3.",
                        },
                      ].map((e, i) =>
                        (0, s.jsxs)(
                          "div",
                          {
                            className: "col-xl-4 col-lg-6 col-md-6 col-sm-12",
                            children: [
                              (0, s.jsx)("img", { src: e.image, alt: e.title }),
                              (0, s.jsxs)("div", {
                                className: w().titleHead,
                                children: [
                                  (0, s.jsx)("h6", {
                                    className: w().title,
                                    children: e.title,
                                  }),
                                  (0, s.jsx)("p", {
                                    className: w().date,
                                    children: e.date,
                                  }),
                                ],
                              }),
                              (0, s.jsx)("div", {
                                className: w().about,
                                children: (0, s.jsx)("p", {
                                  children: e.about,
                                }),
                              }),
                            ],
                          },
                          i
                        )
                      ),
                    }),
                  }),
                  (0, s.jsx)(j.A, { title: "VIEW MORE", link: "/blog" }),
                ],
              }),
            }),
          }),
        });
      }
      var N = a(1631),
        S = a(9637),
        k = a.n(S);
      function B() {
        return (0, s.jsxs)("section", {
          className: k()["client-section"],
          children: [
            (0, s.jsxs)("div", {
              className: k()["client-content"],
              children: [
                (0, s.jsx)("h6", { children: "Our Clients" }),
                (0, s.jsx)("h2", { children: "Trusted Clients" }),
              ],
            }),
            (0, s.jsx)("div", {
              className: k()["client-border"],
              children: (0, s.jsx)(d.default, {
                datas: [
                  { img: "/image (1).jpg", imgWH: 774, idname: "clientSlide1" },
                  { img: "/image (2).jpg", imgWH: 774, idname: "clientSlide2" },
                  { img: "/image (3).jpg", imgWH: 774, idname: "clientSlide3" },
                  { img: "/image (5).jpg", imgWH: 774, idname: "clientSlide4" },
                  { img: "/image (6).jpg", imgWH: 774, idname: "clientSlide1" },
                  { img: "/image (7).jpg", imgWH: 774, idname: "clientSlide2" },
                  { img: "/image (8).jpg", imgWH: 774, idname: "clientSlide3" },
                  { img: "/image (9).jpg", imgWH: 774, idname: "clientSlide1" },
                  {
                    img: "/image (10).jpg",
                    imgWH: 774,
                    idname: "clientSlide4",
                  },
                  { img: "/image (3).jpg", imgWH: 774, idname: "clientSlide2" },
                  { img: "/image (7).jpg", imgWH: 774, idname: "clientSlide3" },
                  { img: "/image (5).jpg", imgWH: 774, idname: "clientSlide4" },
                  { img: "/image (5).jpg", imgWH: 774, idname: "clientSlide4" },
                ],
                spaceBetween: 0,
                slidesPerView: 11,
                imageSize: 180,
                navButtons: !1,
                autoplay: !1,
                loop: !0,
                customSelector: "clientSliderPage clientsArea",
                breakpoints: {
                  320: { slidesPerView: 3, spaceBetween: 0 },
                  640: { slidesPerView: 5, spaceBetween: 0 },
                  992: { slidesPerView: 8, spaceBetween: 0 },
                  1024: { slidesPerView: 7, spaceBetween: 0 },
                  1366: { slidesPerView: 11, spaceBetween: 0 },
                },
              }),
            }),
          ],
        });
      }
      var P = a(6888),
        W = a(3195);
      a(5197);
      var V = a(6887),
        C = a.n(V),
        H = a(7677),
        A = a(5114);
      function D() {
        return (0, s.jsxs)("section", {
          className: C().instaFeeds,
          children: [
            (0, s.jsx)("div", {
              className: C().stikyImage,
              children: (0, s.jsx)(t.default, {
                src: "/feeds/backgd.png",
                alt: "Sticky Image",
                width: 114,
                height: 115,
                className: C().stikyimg,
              }),
            }),
            (0, s.jsx)("div", {
              className: C().swiperContainer,
              children: (0, s.jsx)(H.RC, {
                modules: [A.Vx, A.Ij],
                spaceBetween: 0,
                slidesPerView: 3,
                navigation: !1,
                pagination: { clickable: !1 },
                autoplay: !1,
                loop: !0,
                breakpoints: {
                  320: { slidesPerView: 3, spaceBetween: 0 },
                  640: { slidesPerView: 4, spaceBetween: 0 },
                  992: { slidesPerView: 4, spaceBetween: 0 },
                  1024: { slidesPerView: 5, spaceBetween: 0 },
                  1200: { slidesPerView: 6, spaceBetween: 0 },
                },
                className: C().feedSwiper,
                children: [
                  { image: "/feeds/feed1.jpg", alt: "Feed 1" },
                  { image: "/feeds/feed2.jpg", alt: "Feed 2" },
                  { image: "/feeds/feed3.jpg", alt: "Feed 3" },
                  { image: "/feeds/feed4.jpg", alt: "Feed 4" },
                  { image: "/feeds/feed5.jpg", alt: "Feed 5" },
                  { image: "/feeds/feed6.jpg", alt: "Feed 6" },
                  { image: "/feeds/feed4.jpg", alt: "Feed 4" },
                ].map((e, i) =>
                  (0, s.jsx)(
                    H.qr,
                    {
                      className: C().feedSlide,
                      children: (0, s.jsx)("div", {
                        className: C().feedItem,
                        children: (0, s.jsx)(t.default, {
                          src: e.image,
                          alt: e.alt,
                          width: 500,
                          height: 500,
                          className: C().feedImage,
                        }),
                      }),
                    },
                    i
                  )
                ),
              }),
            }),
          ],
        });
      }
      a(2252), a(9408), a(6970);
      var q = a(2115);
      function M() {
        return (
          (0, q.useEffect)(() => {
            let e = setTimeout(() => {
              document.querySelectorAll(".stat-number");
              let e = new IntersectionObserver(
                  (e) => {
                    e.forEach((e) => {
                      if (e.isIntersecting) {
                        console.log(
                          "Counter section is visible, starting animation..."
                        );
                        let i = e.target.querySelectorAll(".stat-number");
                        if (0 === i.length)
                          return void console.warn(
                            "No counters found in the section"
                          );
                        i.forEach((e, i) => {
                          e.dataset.animated ||
                            ((e.dataset.animated = "true"),
                            setTimeout(() => {
                              let i = +e.getAttribute("data-target"),
                                a = e.getAttribute("data-symbol") || "",
                                s = 0,
                                t = i / 125;
                              (e.textContent = "0" + a),
                                e.classList.add(
                                  "counter_stat-number__animating"
                                ),
                                (function n() {
                                  (s += t) < i
                                    ? ((e.textContent = Math.floor(s) + a),
                                      requestAnimationFrame(n))
                                    : ((e.textContent = i + a),
                                      e.classList.remove(
                                        "counter_stat-number__animating"
                                      ),
                                      e.classList.add(
                                        "counter_stat-number__completed"
                                      ));
                                })();
                            }, 200 * i));
                        });
                      }
                    });
                  },
                  { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
                ),
                i =
                  document.querySelector('[class*="stats-section"]') ||
                  document.querySelector(".stats-section") ||
                  document.querySelector('section[class*="stats"]');
              return (
                i
                  ? (console.log("Stats section found, observing..."),
                    e.observe(i))
                  : (console.warn("Stats section not found"),
                    setTimeout(() => {
                      let i = document.querySelector(
                        '[class*="stats-section"]'
                      );
                      i &&
                        (console.log(
                          "Stats section found on retry, observing..."
                        ),
                        e.observe(i));
                    }, 1e3)),
                () => {
                  i && e.unobserve(i);
                }
              );
            }, 100);
            return () => {
              clearTimeout(e);
            };
          }, []),
          null
        );
      }
      var F = a(8973),
        I = a.n(F);
      function E() {
        return (0, s.jsxs)(s.Fragment, {
          children: [
            (0, s.jsx)(M, {}),
            (0, s.jsxs)("section", {
              className: I()["stats-section"],
              children: [
                (0, s.jsxs)("div", {
                  className: I()["stat-block"],
                  children: [
                    (0, s.jsx)("span", {
                      className: I()["stat-label"],
                      children: "Projects",
                    }),
                    (0, s.jsx)("span", {
                      className: "stat-number",
                      "data-target": "105",
                      "data-symbol": "+",
                      children: "0",
                    }),
                  ],
                }),
                (0, s.jsx)("div", { className: I()["stat-divider"] }),
                (0, s.jsxs)("div", {
                  className: I()["stat-block"],
                  children: [
                    (0, s.jsx)("span", {
                      className: I()["stat-label"],
                      children: "Clients",
                    }),
                    (0, s.jsx)("span", {
                      className: "stat-number",
                      "data-target": "65",
                      "data-symbol": "+",
                      children: "0",
                    }),
                  ],
                }),
                (0, s.jsx)("div", { className: I()["stat-divider"] }),
                (0, s.jsxs)("div", {
                  className: I()["stat-block"],
                  children: [
                    (0, s.jsx)("span", {
                      className: I()["stat-label"],
                      children: "Years",
                    }),
                    (0, s.jsx)("span", {
                      className: "stat-number",
                      "data-target": "10",
                      "data-symbol": "+",
                      children: "0",
                    }),
                  ],
                }),
                (0, s.jsx)("div", { className: I()["stat-divider"] }),
                (0, s.jsxs)("div", {
                  className: I()["stat-block"],
                  children: [
                    (0, s.jsx)("span", {
                      className: I()["stat-label"],
                      children: "Branches",
                    }),
                    (0, s.jsx)("span", {
                      className: "stat-number",
                      "data-target": "15",
                      "data-symbol": "+",
                      children: "0",
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      }
      var R = a(6874),
        T = a.n(R),
        O = a(2773),
        z = a.n(O);
      function L() {
        return (0, s.jsx)(s.Fragment, {
          children: (0, s.jsxs)("div", {
            className: z()["social-media-icon"],
            children: [
              (0, s.jsx)(T(), {
                href: "#",
                children: (0, s.jsx)(t.default, {
                  src: "/socialIcons/linkedin.png",
                  alt: "",
                  width: 21,
                  height: 21,
                  className: z().image,
                }),
              }),
              (0, s.jsxs)(T(), {
                href: "#",
                children: [
                  " ",
                  (0, s.jsx)(t.default, {
                    src: "/socialIcons/facebook.png",
                    alt: "",
                    width: 21,
                    height: 21,
                    className: z().image,
                  }),
                ],
              }),
              (0, s.jsxs)(T(), {
                href: "#",
                children: [
                  " ",
                  (0, s.jsx)(t.default, {
                    src: "/socialIcons/instagram.png",
                    alt: "",
                    width: 21,
                    height: 21,
                    className: z().image,
                  }),
                ],
              }),
              (0, s.jsxs)(T(), {
                href: "#",
                children: [
                  " ",
                  (0, s.jsx)(t.default, {
                    src: "/socialIcons/youtube.png",
                    alt: "",
                    width: 21,
                    height: 21,
                    className: z().image,
                  }),
                ],
              }),
            ],
          }),
        });
      }
      function Y() {
        return (0, s.jsxs)(s.Fragment, {
          children: [
            (0, s.jsx)("section", {
              className: o().hero,
              children: (0, s.jsxs)("div", {
                className: o().hanging,
                children: [
                  (0, s.jsx)(t.default, {
                    id: "yeeha-img",
                    src: "/Yeeha.png",
                    alt: "yeeha",
                    width: 1711,
                    height: 655,
                    className: o().yeehaimage,
                    priority: !0,
                  }),
                  !1,
                  (0, s.jsx)(n.P.div, {
                    id: "character-img",
                    className: o().characterimage,
                    style: {
                      transformOrigin: "center center",
                      position: "absolute",
                      left: 0,
                      right: 0,
                      margin: "0 auto",
                    },
                    initial: { rotateZ: -20 },
                    whileHover: {
                      rotateZ: 45,
                      transition: {
                        type: "spring",
                        stiffness: 150,
                        damping: 10,
                      },
                    },
                    animate: { rotateZ: 0 },
                    transition: { type: "spring", stiffness: 150, damping: 10 },
                    children: (0, s.jsx)(t.default, {
                      src: "/character.png",
                      alt: "Character Image",
                      fit: "contain",
                      width: 1200,
                      height: 1666,
                      style: {
                        display: "block",
                        width: "100%",
                        height: "auto",
                      },
                    }),
                  }),
                ],
              }),
            }),
            (0, s.jsx)(L, {}),
            (0, s.jsx)("section", {
              className: o()["about-area"],
              children: (0, s.jsx)("div", {
                className: "container",
                children: (0, s.jsxs)("div", {
                  className: "row align-items-center ".concat(o()["about-row"]),
                  children: [
                    (0, s.jsx)("div", {
                      className: "col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-12",
                      children: (0, s.jsx)("div", {
                        className: o()["about-first-box"],
                        children: (0, s.jsx)("img", {
                          src: "Scate.png",
                          alt: "",
                        }),
                      }),
                    }),
                    (0, s.jsx)("div", {
                      className: "col-xxl-7 col-xl-7 col-lg-7 col-md-7 col-12",
                      children: (0, s.jsxs)("div", {
                        className: o()["about-secont-box"],
                        children: [
                          (0, s.jsxs)("h4", {
                            children: [
                              " ",
                              "At Big Leap we believe that imagination has no limits. We provide a complete suite of animation and production service from 2D and 3D animation to VFX, motion graphics, storyboarding and beyond, transforming your vision into engaging visuals.",
                            ],
                          }),
                          (0, s.jsx)(j.A, {
                            title: "ABOUT US",
                            link: "/about",
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              }),
            }),
            (0, s.jsx)("section", {
              className: o()["slide-head"],
              children: (0, s.jsxs)("div", {
                className: "container",
                children: [
                  (0, s.jsxs)("div", {
                    className: o()["special-head"],
                    children: [
                      (0, s.jsx)("h2", { children: "We are Specialized" }),
                      (0, s.jsx)("p", {
                        children:
                          "We are a highly dynamic creative bunch who specializes in delivering 360 production services. Specialized company in photography, videography and film production in UAE",
                      }),
                    ],
                  }),
                  (0, s.jsxs)("div", {
                    className: o().specialslide,
                    children: [
                      (0, s.jsx)(d.default, {
                        datas: [
                          {
                            img: "/img2.jpg",
                            caption: "2D motion graphics",
                            readbtn: "Learn more...",
                            idname: "folio1",
                          },
                          {
                            img: "/img3.jpg",
                            caption: "Whiteboard Animations",
                            readbtn: "Learn more...",
                            idname: "folio",
                          },
                          {
                            img: "/img4.jpg",
                            caption: "Storytelling scripted animations",
                            readbtn: "Learn more...",
                            idname: "folio",
                          },
                          {
                            img: "/img1.jpg",
                            caption: "3D product animation",
                            readbtn: "Learn more...",
                            idname: "folio",
                          },
                          {
                            img: "/img2.jpg",
                            caption: "2D motion graphics",
                            readbtn: "Learn more...",
                            idname: "folio",
                          },
                          {
                            img: "/img1.jpg",
                            caption: "2D motion graphics",
                            readbtn: "Learn more...",
                            idname: "folio",
                          },
                        ],
                        spaceBetween: -60,
                        slidesPerView: 4,
                        loop: !0,
                        imageSize: 160,
                        navPos: 180,
                        autoplay: !1,
                        customSelector: "imageBtnSliderSection abc",
                        breakpoints: {
                          320: { slidesPerView: 1, spaceBetween: 10 },
                          640: { slidesPerView: 3, spaceBetween: 80 },
                          1024: { slidesPerView: 3, spaceBetween: 100 },
                          1366: { slidesPerView: 4, spaceBetween: 10 },
                        },
                      }),
                      (0, s.jsx)(j.A, {
                        title: "VIEW ALL",
                        link: "/servicess",
                      }),
                    ],
                  }),
                ],
              }),
            }),
            (0, s.jsxs)("section", {
              className: ""
                .concat(o()["watch-area"], " ")
                .concat(c().watchAreaContainer),
              children: [
                (0, s.jsx)("div", {
                  className: c().backgroundWrapper,
                  children: (0, s.jsx)(t.default, {
                    src: "/video-bg.png",
                    alt: "Background",
                    fill: !0,
                    priority: !0,
                    className: c().backgroundImage,
                  }),
                }),
                (0, s.jsx)("div", {
                  className: "container ".concat(c().contentWrapper),
                  children: (0, s.jsx)("div", {
                    className: o().watch,
                    children: (0, s.jsxs)("div", {
                      className: "row",
                      children: [
                        (0, s.jsx)("div", {
                          className: "col-xl-6 col-lg-6 col-md-12 col-12",
                          children: (0, s.jsxs)("div", {
                            className: o()["first-video"],
                            children: [
                              (0, s.jsx)("div", {
                                className: o().video1,
                                children: (0, s.jsx)("iframe", {
                                  src: "https://www.youtube.com/embed/xiW4HMDR1eo?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&playlist=xiW4HMDR1eo",
                                  title: "YouTube video player",
                                  frameBorder: "0",
                                  allow: "autoplay; encrypted-media",
                                  referrerPolicy:
                                    "strict-origin-when-cross-origin",
                                  allowFullScreen: !0,
                                }),
                              }),
                              (0, s.jsx)("div", {
                                className: o().video2,
                                children: (0, s.jsx)("iframe", {
                                  src: "https://www.youtube.com/embed/xiW4HMDR1eo?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&playlist=xiW4HMDR1eo",
                                  title: "YouTube video player",
                                  frameBorder: "0",
                                  allow: "autoplay; encrypted-media",
                                  referrerPolicy:
                                    "strict-origin-when-cross-origin",
                                  allowFullScreen: !0,
                                }),
                              }),
                            ],
                          }),
                        }),
                        (0, s.jsx)("div", {
                          className: "col-xl-6 col-lg-6 col-md-12 col-12 odr",
                          children: (0, s.jsxs)("div", {
                            className: o()["second-video"],
                            children: [
                              (0, s.jsxs)("div", {
                                className: o().content,
                                children: [
                                  (0, s.jsx)("p", {
                                    children: " Our Portfolio",
                                  }),
                                  (0, s.jsx)("h2", {
                                    children:
                                      "Explore our creative works and see how we made an impact.",
                                  }),
                                  (0, s.jsx)(j.A, {
                                    title: "WATCH MORE",
                                    link: "/portfolio",
                                  }),
                                ],
                              }),
                              (0, s.jsx)("div", {
                                className: o().video3,
                                children: (0, s.jsx)("iframe", {
                                  src: "https://www.youtube.com/embed/xiW4HMDR1eo?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&playlist=xiW4HMDR1eo",
                                  title: "YouTube video player",
                                  frameBorder: "0",
                                  allow: "autoplay; encrypted-media",
                                  referrerPolicy:
                                    "strict-origin-when-cross-origin",
                                  allowFullScreen: !0,
                                }),
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  }),
                }),
              ],
            }),
            (0, s.jsx)(E, {}),
            (0, s.jsx)("section", {
              className: o()["video-slider"],
              children: (0, s.jsx)("div", {
                className: "container",
                children: (0, s.jsx)("div", {
                  className: "vdo",
                  children: (0, s.jsx)(d.default, {
                    datas: [
                      {
                        sub: "key projects",
                        caption: "Our Client Projects",
                        paragraph:
                          "Explore our key projects crafted for clients, each aligned with their vision.",
                        iframe:
                          "https://www.youtube.com/embed/xiW4HMDR1eo?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&playlist=xiW4HMDR1eo",
                        idname: "VDOSlider",
                      },
                      {
                        sub: "key projects",
                        caption: "Our Client Projects",
                        paragraph:
                          "Explore our key projects crafted for clients, each aligned with their vision.",
                        iframe:
                          "https://www.youtube.com/embed/xiW4HMDR1eo?autoplay=1&loop=1&playlist=xiW4HMDR1eo",
                        idname: "VDOSlider",
                      },
                      {
                        sub: "key projects",
                        caption: "Our Client Projects",
                        paragraph:
                          "Explore our key projects crafted for clients, each aligned with their vision.",
                        iframe:
                          "https://www.youtube.com/embed/xiW4HMDR1eo?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0&playlist=xiW4HMDR1eo",
                        idname: "VDOSlider",
                      },
                    ],
                    spaceBetween: 0,
                    slidesPerView: 1,
                    imageSize: 100,
                    loop: !0,
                    navPos: -20,
                    autoplay: !1,
                    breakpoints: {
                      320: { slidesPerView: 1, spaceBetween: 10 },
                      640: { slidesPerView: 1, spaceBetween: 15 },
                      1024: { slidesPerView: 1, spaceBetween: 120 },
                      1366: { slidesPerView: 1, spaceBetween: 20 },
                    },
                    aspectRatio: "16/9",
                    videoWidth: "80%",
                    customSelector: "videoSliderSection",
                  }),
                }),
              }),
            }),
            (0, s.jsx)("section", {
              className: o()["motion-graphics"],
              children: (0, s.jsxs)("div", {
                className: "container",
                children: [
                  (0, s.jsxs)("div", {
                    className: o()["motion-graphics-content"],
                    children: [
                      (0, s.jsx)("h6", { children: "Motion Graphics" }),
                      (0, s.jsx)("h2", {
                        children: "Living. Breathing. Digital Experiences",
                      }),
                    ],
                  }),
                  (0, s.jsx)("div", {
                    className: o().specialslides,
                    children: (0, s.jsx)(d.default, {
                      datas: [
                        {
                          img: "/gr-1.gif",
                          client: "client",
                          date: "01-02-2025",
                          caption: "2D motion graphics",
                          idname: "MoGraph",
                        },
                        {
                          img: "/gr-2.gif",
                          client: "client",
                          date: "01-02-2025",
                          caption: "Whiteboard Animations",
                          idname: "MoGraph",
                        },
                        {
                          img: "/gr-3.gif",
                          client: "client",
                          date: "01-02-2025",
                          caption: "Storytelling scripted ",
                          idname: "MoGraph",
                        },
                        {
                          img: "/gr-1.gif",
                          client: "client",
                          date: "01-02-2025",
                          caption: "3D product animation",
                          idname: "MoGraph",
                        },
                      ],
                      spaceBetween: 50,
                      slidesPerView: 3,
                      navPos: 20,
                      autoplay: !1,
                      breakpoints: {
                        320: { slidesPerView: 1, spaceBetween: 10 },
                        640: { slidesPerView: 1, spaceBetween: 50 },
                        992: { slidesPerView: 2, spaceBetween: 40 },
                        1024: { slidesPerView: 2, spaceBetween: 100 },
                        1366: { slidesPerView: 3, spaceBetween: 10 },
                      },
                      imageSize: 400,
                      customSelector: "imageBtnSliderSection abc",
                    }),
                  }),
                ],
              }),
            }),
            (0, s.jsx)(h, {}),
            (0, s.jsx)(P.default, {}),
            (0, s.jsx)(B, {}),
            (0, s.jsx)(b, {}),
            (0, s.jsx)(v.default, {}),
            (0, s.jsx)(y, {}),
            (0, s.jsx)(N.default, {}),
            (0, s.jsx)(D, {}),
            (0, s.jsx)(W.default, {
              customCounts: { xl: 13, lg: 13, md: 13, sm: 11, xs: 12 },
            }),
          ],
        });
      }
      a(7375);
    },
    6104: (e, i, a) => {
      "use strict";
      a.d(i, { A: () => l });
      var s = a(5155),
        t = a(4628),
        n = a.n(t);
      function l(e) {
        let { title: i, sub: a } = e;
        return (0, s.jsx)(s.Fragment, {
          children: (0, s.jsx)("div", {
            className: "col-xl-3 col-lg-3 col-md-12 col-sm-12",
            children: (0, s.jsxs)("div", {
              className: n().each,
              children: [
                (0, s.jsx)("h5", { className: n().h5, children: i }),
                (0, s.jsx)("p", { children: a }),
              ],
            }),
          }),
        });
      }
    },
    6887: (e) => {
      e.exports = {
        instaFeeds: "feeds_instaFeeds__mzCmA",
        stikyImage: "feeds_stikyImage__hMKFW",
        stikyimg: "feeds_stikyimg__cKjne",
        swiperContainer: "feeds_swiperContainer__fhaST",
        feedSwiper: "feeds_feedSwiper__xuo7W",
        "swiper-slide": "feeds_swiper-slide__RNiHk",
        "swiper-pagination": "feeds_swiper-pagination__qMvdT",
        "swiper-pagination-bullet": "feeds_swiper-pagination-bullet__uZZPy",
        "swiper-pagination-bullet-active":
          "feeds_swiper-pagination-bullet-active__fBxuF",
        "swiper-button-next": "feeds_swiper-button-next__3nECv",
        "swiper-button-prev": "feeds_swiper-button-prev__3SpdD",
        feedSlide: "feeds_feedSlide__u7b87",
        feedItem: "feeds_feedItem__anfbe",
        feedImage: "feeds_feedImage__I6dLX",
      };
    },
    7332: (e) => {
      e.exports = { btn: "cta-button_btn__rQbC8" };
    },
    7393: (e, i, a) => {
      "use strict";
      a.d(i, { A: () => r });
      var s = a(5155),
        t = a(6874),
        n = a.n(t),
        l = a(7332),
        o = a.n(l);
      function r(e) {
        let {
          title: i = "Default Title",
          link: a = "#",
          isModal: t = !1,
          modalTarget: l = "#",
        } = e;
        return t
          ? (0, s.jsx)("div", {
              className: o().btn,
              children: (0, s.jsx)("button", {
                type: "button",
                "data-bs-toggle": "modal",
                "data-bs-target": l,
                children: i,
              }),
            })
          : (0, s.jsx)("div", {
              className: o().btn,
              children: (0, s.jsx)(n(), { href: a, children: i }),
            });
      }
    },
    8334: (e) => {
      e.exports = {
        page: "page_page__ZU32B",
        main: "page_main__GlU4n",
        ctas: "page_ctas__g5wGe",
        primary: "page_primary__V8M9Y",
        secondary: "page_secondary__lm_PT",
        footer: "page_footer__sHKi3",
        logo: "page_logo__7fc9l",
        watchAreaContainer: "page_watchAreaContainer__gjUPH",
        backgroundWrapper: "page_backgroundWrapper___NoV6",
        backgroundImage: "page_backgroundImage__0ASkt",
        contentWrapper: "page_contentWrapper__YBAIW",
      };
    },
    8973: (e) => {
      e.exports = {
        "stats-section": "counter_stats-section__vP9S3",
        "stat-block": "counter_stat-block___cxGs",
        "stat-number": "counter_stat-number__F0UJE",
        "stat-label": "counter_stat-label__H3uEE",
        "stat-divider": "counter_stat-divider___kDa6",
      };
    },
    9587: (e) => {
      e.exports = {
        businessArea: "business_businessArea__Nyuko",
        "business-list": "business_business-list__cAiUR",
        heading: "business_heading__3RKwc",
        list: "business_list__xSywM",
        lists: "business_lists__GP6kv",
        buscol: "business_buscol__Mf9bN",
        businessHead: "business_businessHead__HjKx9",
        listcontent: "business_listcontent__93qKp",
      };
    },
    9642: (e, i, a) => {
      Promise.resolve().then(a.bind(a, 3605));
    },
    9653: (e) => {
      e.exports = {
        "enquiry-section": "enquiry_enquiry-section__zb4Iz",
        image: "enquiry_image__hzkNP",
        buttonContainer: "enquiry_buttonContainer__ekhJV",
        modalBody: "enquiry_modalBody__wBTwp",
        modalDialog: "enquiry_modalDialog__Yrijb",
        modalContent: "enquiry_modalContent__yM_6R",
        modalHeader: "enquiry_modalHeader__YlaRv",
        title: "enquiry_title__1XpNG",
        "btn-close": "enquiry_btn-close__cVxdz",
        btnClose: "enquiry_btnClose__n_ODJ",
        input: "enquiry_input__2GGXu",
        foottt: "enquiry_foottt__z4jw8",
        btn: "enquiry_btn__nkh_H",
      };
    },
  },
  (e) => {
    e.O(
      0,
      [774, 550, 475, 979, 488, 344, 63, 259, 703, 718, 613, 441, 964, 358],
      () => e((e.s = 9642))
    ),
      (_N_E = e.O());
  },
]);
