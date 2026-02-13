"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";

const CONSENT_STORAGE_KEY = "cookie_consent";
const CONSENT_UPDATED_EVENT = "cookie-consent-updated";

type ConsentState = "accepted" | "rejected" | null;

function readConsentState(): ConsentState {
  if (typeof window === "undefined") {
    return null;
  }

  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (value === "accepted" || value === "rejected") {
    return value;
  }

  return null;
}

export default function GoogleAnalytics() {
  const measurementId = "G-8B9T37D2R6";
  const consent = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === "undefined") {
        return () => {};
      }

      const handleChange = () => onStoreChange();
      window.addEventListener(CONSENT_UPDATED_EVENT, handleChange);
      window.addEventListener("storage", handleChange);

      return () => {
        window.removeEventListener(CONSENT_UPDATED_EVENT, handleChange);
        window.removeEventListener("storage", handleChange);
      };
    },
    () => readConsentState(),
    () => null
  );
  const hasAnalyticsConsent = consent === "accepted";

  if (!hasAnalyticsConsent) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
