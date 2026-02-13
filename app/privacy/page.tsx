import Image from "next/image";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page">
      <Link href="/" className="legal-home-link" aria-label="Go to homepage">
        <Image
          src="/logo.svg"
          alt="ONcompute logo"
          width={80}
          height={22}
          style={{ width: "80px", height: "auto" }}
          priority
        />
      </Link>
      <h1>Privacy Policy</h1>
      <p className="legal-muted">Last updated: 13 February 2026</p>
      <p>
        This Privacy Policy explains how ONcompute collects and uses personal
        data when you visit this website.
      </p>

      <h2>Data controller</h2>
      <p>
        Replace this section with your full legal entity name, registered
        address, and contact email for privacy inquiries.
      </p>

      <h2>What data we collect</h2>
      <ul>
        <li>
          Basic technical data such as IP address, browser type, and device
          metadata.
        </li>
        <li>
          Analytics data (pages visited, interaction events) only if you accept
          analytics cookies.
        </li>
      </ul>

      <h2>Why we process data</h2>
      <ul>
        <li>Necessary cookies: to deliver and secure the website.</li>
        <li>
          Analytics cookies: to understand traffic and improve performance.
        </li>
      </ul>

      <h2>Legal basis</h2>
      <ul>
        <li>Necessary cookies: legitimate interests / strict necessity.</li>
        <li>Analytics cookies: your consent.</li>
      </ul>

      <h2>Third-party processors</h2>
      <p>
        If you accept analytics cookies, usage data is processed by Google
        Analytics (Google Ireland Limited / Google LLC).
      </p>

      <h2>Data retention</h2>
      <p>
        Replace this section with your selected retention periods from Google
        Analytics and any server logs.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on your location, you may have rights to access, correct,
        delete, restrict, or object to processing of your personal data.
      </p>

      <h2>Contact</h2>
      <p>
        Add a dedicated contact email for privacy requests and, if required, EU
        representative or DPO details.
      </p>

      <p>
        You can review cookie-specific details in our{" "}
        <Link href="/cookies">Cookie Policy</Link>.
      </p>
    </main>
  );
}
