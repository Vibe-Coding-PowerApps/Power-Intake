"use client";
import * as React from "react";
import {
  FluentProvider,
  webDarkTheme,
  makeStyles,
  mergeClasses,
} from "@fluentui/react-components";

/* =========================================================
   Runtime: NO BLEED global reset
========================================================= */
function RuntimeNoBleedStyle({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  return (
    <style>{`
      html, body, #root, #__next {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background: #F6C108;
      }
      * { box-sizing: border-box; }
    `}</style>
  );
}

/* =========================================================
   Crisp inline icons (no distortion)
========================================================= */
function Icon({
  name,
  size = 18,
}: {
  name: "search" | "user" | "bag";
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: { display: "block" as const },
  };

  if (name === "search") {
    return (
      <svg {...common}>
        <circle
          cx="11"
          cy="11"
          r="6.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M16.4 16.4 21 21"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "user") {
    return (
      <svg {...common}>
        <path
          d="M12 12a3.9 3.9 0 1 0-3.9-3.9A3.9 3.9 0 0 0 12 12Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M5 21a7 7 0 0 1 14 0"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path
        d="M7 8V7a5 5 0 0 1 10 0v1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6.2 8h11.6l-.85 12.2a2 2 0 0 1-2 1.8H9.1a2 2 0 0 1-2-1.8L6.2 8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   Styles
========================================================= */
const useStyles = makeStyles({
  /* GenPages layout rules */
  provider: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#F6C108",
  },
  providerRuntime: {
    position: "fixed",
    inset: 0,
  },

  /* Page background */
  stage: {
    height: "100%",
    width: "100%",
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(180deg, #F6C108 0%, #F4A527 55%, #F38A24 100%)",
  },

  /* Font imports container */
  fontImports: {
    position: "absolute",
    width: "1px",
    height: "1px",
    overflow: "hidden",
    opacity: 0,
    pointerEvents: "none",
  },

  /* Subtle depth */
  depth: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 1,
    background:
      "radial-gradient(980px 560px at 56% 60%, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 72%)",
  },

  /* Topbar baseline */
  topbar: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    padding: "22px 56px",
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    zIndex: 30,
  },
  brand: {
    fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif',
    fontWeight: 600,
    fontSize: "24px",
    letterSpacing: "0.8px",
    color: "rgba(29,29,29,0.85)",
    textTransform: "uppercase",
    lineHeight: 1,
    userSelect: "none",
  },
  nav: {
    display: "flex",
    gap: "40px",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: '"Inter", system-ui, -apple-system, "Segoe UI", Arial, sans-serif',
    fontWeight: 500,
    fontSize: "13px",
    color: "rgba(29,29,29,0.70)",
    lineHeight: 1,
    userSelect: "none",
  },
  navLink: { cursor: "default" },

  icons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "12px",
    color: "rgba(29,29,29,0.75)",
  },
  iconBtn: {
    width: "28px",
    height: "28px",
    display: "grid",
    placeItems: "center",
    border: "1px solid rgba(29,29,29,0.35)",
    background: "transparent",
  },

  /* HERO headline behind robot */
  bigTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "96px",
    textAlign: "center",
    fontFamily: '"Oswald", "Arial Narrow", Arial, sans-serif',
    fontWeight: 700,
    textTransform: "uppercase",
    fontSize: "clamp(240px, 20vw, 300px)",
    lineHeight: 1,
    letterSpacing: "-0.02em",
    color: "rgba(43,43,43,0.34)",
    zIndex: 4,
    overflow: "visible",
    WebkitMaskImage:
      "linear-gradient(to bottom, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.70) 55%, rgba(0,0,0,0) 92%)",
    maskImage:
      "linear-gradient(to bottom, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.70) 55%, rgba(0,0,0,0) 92%)",
  },

  /* Left TOP copy (no buttons) */
  leftTopCopy: {
    position: "absolute",
    left: "88px",
    top: "52%",
    transform: "translateY(-50%)",
    width: "560px",
    maxWidth: "36vw",
    zIndex: 20,
  },
  leftTopP: {
    margin: 0,
    fontFamily:
      '"Inter", system-ui, -apple-system, "Segoe UI", Arial, sans-serif',
    fontWeight: 400,
    fontSize: "15.5px",
    lineHeight: 1.6,
    color: "rgba(43,43,43,0.82)",
  },

  /* Bottom-left block */
  leftBottomBlock: {
     position: "absolute",
     left: "88px",
     bottom: "180px", // moved up for alignment with right button
     width: "560px",
     maxWidth: "36vw",
     zIndex: 20,
  },
  leftBottomP: {
    margin: 0,
    fontFamily:
      '"Inter", system-ui, -apple-system, "Segoe UI", Arial, sans-serif',
    fontWeight: 400,
    fontSize: "13px",
    lineHeight: 1.55,
    color: "rgba(43,43,43,0.72)",
  },
  leftBottomActions: {
    marginTop: "14px", /* ONLY FIX: tighten gap to buttons */
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },

  /* Right content block */
  rightCopy: {
     position: "absolute",
     right: "92px",
     top: "65%", // moved up from 78%
     transform: "translateY(-50%)",
     width: "360px",
     maxWidth: "26vw",
     zIndex: 20,
  },
  rightH: {
    margin: 0,
    fontFamily:
      '"Inter", "Poppins", system-ui, -apple-system, "Segoe UI", Arial, sans-serif',
    fontWeight: 700,
    fontSize: "32px",
    lineHeight: 1.2,
    color: "#FFFFFF",
    textShadow: "0 2px 12px rgba(0,0,0,0.25)",
  },
  rightP: {
    margin: "14px 0 0 0",
    fontFamily:
      '"Inter", system-ui, -apple-system, "Segoe UI", Arial, sans-serif',
    fontWeight: 400,
    fontSize: "15.5px",
    lineHeight: 1.6,
    color: "rgba(242,242,242,0.92)",
  },
  rightBtnRow: { marginTop: "16px" },

  /* Buttons */
  btn: {
    border: 0,
    outline: "none",
    userSelect: "none",
    cursor: "pointer",
    borderRadius: "999px",
    padding: "13px 22px",
    fontFamily:
      '"Inter", system-ui, -apple-system, "Segoe UI", Arial, sans-serif',
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: 1,
    boxShadow: "0 8px 24px rgba(0,0,0,0.24)",
  },
  btnPrimary: { background: "#0F0F10", color: "#FFFFFF" },
  btnSecondary: {
    background: "rgba(255,255,255,0.95)",
    color: "rgba(29,29,29,0.95)",
  },


  /* Stone (transparent PNG) */
  stoneWrap: {
    position: "absolute",
    left: "50%",
    bottom: "-160px", // Move lower as needed
    transform: "translateX(-50%)",
    zIndex: 10,
    width: "min(760px, 46vw)",
    maxWidth: "860px",
    minWidth: "460px",
    pointerEvents: "none",
  },

  stone: {
    width: "100%",
    height: "auto",
    display: "block",
    userSelect: "none",
    filter:
      "drop-shadow(0 44px 96px rgba(0,0,0,0.28)) drop-shadow(0 10px 24px rgba(0,0,0,0.18)) saturate(1.15) contrast(1.08)",
  },

  /* Optional: soft halo behind the stone to blend with stage */
  stoneHalo: {
    position: "absolute",
    left: "50%",
    top: "52%",
    transform: "translate(-50%, -50%)",
    width: "92%",
    height: "92%",
    pointerEvents: "none",
    zIndex: 0,
    background:
      "radial-gradient(closest-side at 50% 55%, rgba(255,230,150,0.55) 0%, rgba(255,190,60,0.22) 42%, rgba(244,165,39,0) 72%)",
    filter: "blur(2px)",
    opacity: 0.9,
  },

  /* Responsive */
  "@media (max-width: 1100px)": {
    topbar: { padding: "20px 32px" },
    leftTopCopy: { left: "44px", width: "520px", maxWidth: "46vw" },
    rightCopy: { right: "44px", width: "340px", maxWidth: "40vw", top: "80%" },
    leftBottomBlock: { left: "44px", width: "520px", maxWidth: "60vw" },
    // robotWrap removed
    bigTitle: { fontSize: "clamp(210px, 20vw, 280px)" },
  },
  "@media (max-width: 860px)": {
    nav: { display: "none" },
    topbar: { gridTemplateColumns: "1fr 1fr" },
    leftTopCopy: { top: "58%", width: "520px", maxWidth: "70vw" },
    rightCopy: {
      top: "84%",
      right: "24px",
      width: "340px",
      maxWidth: "70vw",
      transform: "translateY(-50%)",
    },
    // robotWrap removed
    leftBottomBlock: { bottom: "26px", width: "560px", maxWidth: "86vw" },
  },
});

/* =========================================================
   Asset
========================================================= */

const STONE_IMAGE = "/icons/glowing-soul-stone.png";

/* =========================================================
   Page
========================================================= */

function preloadImage(src: string) {
  const img = new window.Image();
  img.src = src;
}

function GeneratedComponent() {
  const classes = useStyles();

  const [navbarOff, setNavbarOff] = React.useState(false);
  const [inIframe, setInIframe] = React.useState(false);
  const [stoneLoaded, setStoneLoaded] = React.useState(false);

  React.useEffect(() => {
    const detect = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        setNavbarOff(params.get("navbar") === "off");
        setInIframe(window.top !== window.self);
      } catch {
        setNavbarOff(false);
        setInIframe(false);
      }
    };

    detect();
    window.addEventListener("popstate", detect);
    window.addEventListener("hashchange", detect);

    // Preload stone image
    preloadImage(STONE_IMAGE);

    return () => {
      window.removeEventListener("popstate", detect);
      window.removeEventListener("hashchange", detect);
    };
  }, []);

  const navigateToServices = () => {
    try {
      if (window.location.pathname !== "/services") {
        window.history.pushState({}, "", "/services");
        window.dispatchEvent(new Event('locationchange'));
      }
    } catch {}
  };

  return (
    <FluentProvider
      theme={webDarkTheme}
      className={mergeClasses(
        classes.provider,
        navbarOff && !inIframe && classes.providerRuntime
      )}
    >
      <RuntimeNoBleedStyle enabled={navbarOff && !inIframe} />

      <div className={classes.fontImports} aria-hidden="true">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Inter:wght@400;500;600;700&family=Oswald:wght@600;700&display=swap');
        `}</style>
      </div>

      <div className={classes.stage}>
        <div className={classes.depth} />

        <div className={classes.topbar}>
          <div className={classes.brand}>POWER INTAKE</div>

          <div className={classes.nav}>
            <div className={classes.navLink}>Power Guide</div>
            <div className={classes.navLink}>Power Insights</div>
            <div className={classes.navLink}>Power Serve</div>
            <div className={classes.navLink}>FAQs</div>
            <div className={classes.navLink}>Get Help</div>
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'flex-end'}}>
            <span style={{fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, fontSize: 16, color: '#222'}}>John Doe</span>
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" style={{width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.10)'}} />
          </div>
        </div>

        <div className={classes.bigTitle}>POWER INTAKE</div>

        <div className={classes.leftTopCopy}>
            <p className={classes.leftTopP}>
              Build smarter, faster, and more securely.<br />
              Expand your platform with seamless integrations<br />
              and dedicated support every step of the way.
            </p>
        </div>


        <div className={classes.stoneWrap}>
          <div className={classes.stoneHalo} />
          <img
            src={STONE_IMAGE}
            alt="Glowing Soul Stone"
            className={classes.stone}
            draggable={false}
            onLoad={() => setStoneLoaded(true)}
            style={{ opacity: stoneLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
          />
          {!stoneLoaded && (
            <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <span style={{color: '#aaa'}}>Loading...</span>
            </div>
          )}
        </div>

        {/* Flex row for perfectly aligned button groups */}
        <div style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: '0 88px',
          pointerEvents: 'none', // allow content above to be clickable
          zIndex: 30
        }}>
          <div style={{ pointerEvents: 'auto', maxWidth: 560 }}>
            <p className={classes.leftBottomP}>
              Navigate challenges with confidence.<br />
              Access specialized assistance<br />
              for every aspect of your digital transformation.
            </p>
            <div className={classes.leftBottomActions}>
              <button
                className={mergeClasses(classes.btn, classes.btnPrimary)}
                onClick={e => {
                  e.preventDefault();
                  if (window.location.pathname !== "/services") {
                    window.history.pushState({}, "", "/services");
                    window.dispatchEvent(new Event('locationchange'));
                  }
                }}
              >
                Get Started
              </button>
              <button className={mergeClasses(classes.btn, classes.btnSecondary)}>
                View Requests
              </button>
            </div>
          </div>
          <div style={{ pointerEvents: 'auto', maxWidth: 360, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
            <h3 className={classes.rightH}>
              Own the <br />
              Future of <br />
              Digital Solutions
            </h3>
            <p className={classes.rightP}>
              Empower your team to build, secure,<br />
              and scale apps with expert guidance.<br />
              Transform ideas into impact—fast.
            </p>
            <div className={classes.rightBtnRow}>
              <button
                className={mergeClasses(classes.btn, classes.btnPrimary)}
                onClick={e => {
                  e.preventDefault();
                  if (window.location.pathname !== "/services") {
                    window.history.pushState({}, "", "/services");
                    window.dispatchEvent(new Event('locationchange'));
                  }
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </FluentProvider>
  );
}

export default GeneratedComponent;