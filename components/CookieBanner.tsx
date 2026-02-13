"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

const CONSENT_STORAGE_KEY = "cookie_consent";
const CONSENT_UPDATED_EVENT = "cookie-consent-updated";

type ConsentState = "accepted" | "rejected" | null;

function getConsentState(): ConsentState {
  if (typeof window === "undefined") {
    return null;
  }

  const storedConsent = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (storedConsent === "accepted" || storedConsent === "rejected") {
    return storedConsent;
  }

  return null;
}

export default function CookieBanner() {
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
    () => getConsentState(),
    () => null
  );

  const setConsentState = (nextConsent: Exclude<ConsentState, null>) => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, nextConsent);
    window.dispatchEvent(new Event(CONSENT_UPDATED_EVENT));
  };

  if (consent !== null) {
    return null;
  }

  return (
    <aside className="cookie-banner" aria-label="Cookie consent">
      <p className="cookie-banner-text">
        We use necessary cookies to run this site and optional analytics cookies
        to understand traffic. You can accept or reject analytics cookies.
      </p>
      <p className="cookie-banner-links">
        Read our <Link href="/privacy">Privacy Policy</Link> and{" "}
        <Link href="/cookies">Cookie Policy</Link>.
      </p>
      <div className="cookie-banner-actions">
        <button
          type="button"
          className="cookie-button cookie-button-secondary"
          onClick={() => setConsentState("rejected")}
        >
          Reject all
        </button>
        <button
          type="button"
          className="cookie-button cookie-button-primary"
          onClick={() => setConsentState("accepted")}
        >
          Accept all
        </button>
      </div>
    </aside>
  );
}
