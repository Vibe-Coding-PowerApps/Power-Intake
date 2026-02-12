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
    width: 1,
    height: 1,
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
    width: 28,
    height: 28,
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
    width: 560,
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
    bottom: "38px",
    width: 560,
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
    top: "78%",
    transform: "translateY(-50%)",
    width: 360,
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

  /* Robot */
  robotWrap: {
    position: "absolute",
    left: "50%",
    bottom: 0,
    transform: "translateX(-50%)",
    zIndex: 10,
    width: "min(1120px, 66vw)",
    maxWidth: "1180px",
    minWidth: "620px",
    pointerEvents: "none",
  },
  robot: {
    width: "100%",
    height: "auto",
    display: "block",
    userSelect: "none",
    filter:
      "drop-shadow(0 44px 96px rgba(0,0,0,0.30)) saturate(1.20) contrast(1.10)",
  },

  /* Responsive */
  "@media (max-width: 1100px)": {
    topbar: { padding: "20px 32px" },
    leftTopCopy: { left: "44px", width: 520, maxWidth: "46vw" },
    rightCopy: { right: "44px", width: 340, maxWidth: "40vw", top: "80%" },
    leftBottomBlock: { left: "44px", width: 520, maxWidth: "60vw" },
    robotWrap: { width: "min(1050px, 74vw)" },
    bigTitle: { fontSize: "clamp(210px, 20vw, 280px)" },
  },
  "@media (max-width: 860px)": {
    nav: { display: "none" },
    topbar: { gridTemplateColumns: "1fr 1fr" },
    leftTopCopy: { top: "58%", width: 520, maxWidth: "70vw" },
    rightCopy: {
      top: "84%",
      right: "24px",
      width: 340,
      maxWidth: "70vw",
      transform: "translateY(-50%)",
    },
    robotWrap: { width: "min(980px, 92vw)" },
    leftBottomBlock: { bottom: "26px", width: 560, maxWidth: "86vw" },
  },
});

/* =========================================================
   Asset
========================================================= */
const ROBOT_IMAGE =
  "https://frontier-firm.crm.dynamics.com/WebResources/genpages_futuristics_streetwear_cyberpunk_robot";

/* =========================================================
   Page
========================================================= */
function GeneratedComponent() {
  const classes = useStyles();

  const [navbarOff, setNavbarOff] = React.useState(false);
  const [inIframe, setInIframe] = React.useState(false);

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

    return () => {
      window.removeEventListener("popstate", detect);
      window.removeEventListener("hashchange", detect);
    };
  }, []);

  const navigateToServices = () => {
    try {
      if (typeof window !== "undefined") window.location.assign("/services");
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
            <div className={classes.navLink}>Camera Drones</div>
            <div className={classes.navLink}>Handheld</div>
            <div className={classes.navLink}>Services</div>
            <div className={classes.navLink}>Lookbook</div>
            <div className={classes.navLink}>Contact</div>
          </div>

          <div className={classes.icons}>
            <div className={classes.iconBtn} aria-hidden="true">
              <Icon name="search" />
            </div>
            <div className={classes.iconBtn} aria-hidden="true">
              <Icon name="user" />
            </div>
            <div className={classes.iconBtn} aria-hidden="true">
              <Icon name="bag" />
            </div>
          </div>
        </div>

        <div className={classes.bigTitle}>POWER INTAKE</div>

        <div className={classes.leftTopCopy}>
          <p className={classes.leftTopP}>
            Engage in superior aerial photography using
            <br />
            intelligent flight technology with filmic stability,
            <br />
            Intended for creators requiring precision.
          </p>
        </div>

        <div className={classes.robotWrap}>
          <img
            src={ROBOT_IMAGE}
            alt="Power Intake"
            className={classes.robot}
            draggable={false}
          />
        </div>

        <div className={classes.rightCopy}>
          <h3 className={classes.rightH}>
            Own the <br />
            Future of <br />
            Digital Art
          </h3>

          <p className={classes.rightP}>
            Engage in superior aerial
            <br />
            photography using intelligent
            <br />
            flight technology with filmic
            <br />
            stability, Intended for creators
            <br />
            requiring precision.
          </p>

          <div className={classes.rightBtnRow}>
            <button
              className={mergeClasses(classes.btn, classes.btnPrimary)}
              onClick={navigateToServices}
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Bottom-left: original text preserved, only gap reduced */}
        <div className={classes.leftBottomBlock}>
          <p className={classes.leftBottomP}>
            Engage in superior aerial photography using
            <br />
            intelligent flight technology with filmic stability,
            <br />
            Intended for creators requiring precision.
          </p>

          <div className={classes.leftBottomActions}>
            <button
              className={mergeClasses(classes.btn, classes.btnPrimary)}
              onClick={navigateToServices}
            >
              Get Started
            </button>
            <button className={mergeClasses(classes.btn, classes.btnSecondary)}>
              View Requests
            </button>
          </div>
        </div>
      </div>
    </FluentProvider>
  );
}

export default GeneratedComponent;