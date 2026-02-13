import Image from "next/image";
import Link from "next/link";

export default function CookiePolicyPage() {
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
      <h1>Cookie Policy</h1>
      <p className="legal-muted">Last updated: 13 February 2026</p>
      <p>
        This Cookie Policy explains which cookies this website uses and how you
        can manage your preferences.
      </p>

      <h2>Cookie categories</h2>
      <ul>
        <li>
          Necessary cookies: required for core site functionality and security.
        </li>
        <li>
          Analytics cookies: used only with your consent to measure website
          usage.
        </li>
      </ul>

      <h2>Analytics cookies</h2>
      <p>
        If you accept analytics cookies, this website uses Google Analytics 4
        with measurement ID <code>G-8B9T37D2R6</code>.
      </p>

      <h2>How to control cookies</h2>
      <ul>
        <li>
          On first visit, you can choose to accept or reject analytics cookies.
        </li>
        <li>
          You can also manage cookies through your browser settings at any time.
        </li>
      </ul>

      <h2>International data transfers</h2>
      <p>
        Google may process data on servers outside your country. Update this
        section with the transfer safeguards you rely on.
      </p>

      <h2>Updates to this policy</h2>
      <p>
        We may update this policy from time to time. Material changes will be
        reflected by updating the date above.
      </p>

      <p>
        For broader data-processing details, see our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </main>
  );
}
