import Image from "next/image";
import Link from "next/link";
import Countdown from "@/components/Countdown";
import TrackedLink from "@/components/TrackedLink";

const ROADMAP = [
  {
    date: "2 March 2026",
    phase: "ALPHA",
    description:
      "Limited access. Grant tokens distributed. OrchestratiON begins for allowlisted nodes.",
  },
  {
    date: "16 March 2026",
    phase: "BETA",
    description:
      "Network fully ON. Open access. Public orchestratiON. Global availability.",
  },
];

export default function Home() {
  return (
    <div className="page">
      <main className="main">
        <header className="hero">
          <div className="logo-row">
            <Image
              src="/logo.svg"
              alt="Network Countdown logo"
              width={720}
              height={192}
              priority
            />
          </div>
          <div className="hero-copy">
            <h1>OrchestratiON initializing in</h1>
            <Countdown targetDate="2026-03-02T00:00:00Z" />
            <p className="subtitle">
              Our P2P compute network is preparing for public release. Track the
              launch clock and upcoming milestones below. Designed for ease of
              use, with pay-per-use orchestration and no fixed commitments.
            </p>
            <p className="subtitle">
              First phase: network access for allowlisted nodes.
            </p>
          </div>
        </header>

        <section className="roadmap" aria-label="Launch roadmap">
          <div className="roadmap-toggle">
            <div className="toggle-switch-container">
              <span className="toggle-label toggle-label-off">OFF</span>
              <div className="toggle-switch" aria-hidden="true">
                <span className="toggle-knob" />
              </div>
              <span className="toggle-label toggle-label-on">ON</span>
            </div>
          </div>
          <div className="section-heading">
            <h2>Roadmap to pure automatiON</h2>
            <p>Follow the rollout from allowlist access to open availability.</p>
          </div>
          <div className="roadmap-grid">
            {ROADMAP.map((item) => (
              <article className="roadmap-card" key={item.phase}>
                <div className="roadmap-meta">
                  <span className="roadmap-date">{item.date}</span>
                  <span className="roadmap-phase">{item.phase}</span>
                </div>
                <p className="roadmap-description">{item.description}</p>
              </article>
            ))}
          </div>
          <div className="roadmap-cta">
            <p className="roadmap-cta-title">Ready to build before ON</p>
            <TrackedLink
              className="cta-button"
              href="https://open-vsx.org/extension/OceanProtocol/ocean-protocol-vscode-extension"
              target="_blank"
              rel="noreferrer"
              eventName="click_ocean_orchestrator"
              eventLabel="Ocean Orchestrator"
            >
              Ocean Orchestrator
            </TrackedLink>
          </div>
          <div className="x-section">
            <TrackedLink
              className="x-link"
              href="https://x.com/ONcompute"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow ONcompute on X"
              eventName="click_follow_on_x"
              eventLabel="Follow on X"
            >
              <span className="x-logo" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img">
                  <path d="M18.244 2.25h3.308l-7.227 8.26L23 21.75h-6.93l-5.437-6.582L4.826 21.75H1.514l7.73-8.835L1 2.25h7.102l4.91 5.933L18.244 2.25zm-1.161 17.52h1.833L7.124 4.126H5.157L17.083 19.77z" />
                </svg>
              </span>
              <span>Follow on X</span>
            </TrackedLink>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>© 2026 ONcompute. All rights reserved.</p>
        <nav className="footer-links" aria-label="Legal">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/cookies">Cookie Policy</Link>
        </nav>
      </footer>
    </div>
  );
}
