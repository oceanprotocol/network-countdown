import Image from "next/image";
import Countdown from "@/components/Countdown";

const ROADMAP = [
  {
    date: "2 March 2026",
    phase: "Alpha",
    description:
      "Launch with cold wallets, paid compute enabled, allowlist access using COMPY tokens. Unlimited usage for allowlisted addresses.",
  },
  {
    date: "16 March 2026",
    phase: "Beta",
    description: "Open for everyone. System available publicly.",
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
            <h1>Countdown to mainnet</h1>
            <p className="subtitle">
              The network is preparing for public release. Track the launch
              clock and upcoming milestones below.
            </p>
          </div>
          <Countdown targetDate="2026-03-02T00:00:00Z" />
        </header>

        <section className="roadmap" aria-label="Launch roadmap">
          <div className="section-heading">
            <h2>Roadmap</h2>
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
        </section>
      </main>
    </div>
  );
}
