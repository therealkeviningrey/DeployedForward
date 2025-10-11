export const metadata = { title: "News" };

export default function NewsPage() {
  return (
    <>
      <section className="section">
        <div className="container accent-left space-y-4">
          <span className="eyebrow">News</span>
          <h1 className="font-display text-4xl md:text-6xl">Updates</h1>
          <p className="muted">Press and product announcements.</p>
        </div>
      </section>
      <section className="section">
        <div className="container grid md:grid-cols-3 grid-gap">
          <article className="card space-y-2">
            <span className="muted text-sm">2025-01-01</span>
            <h3 className="text-xl font-semibold">Platform Preview</h3>
            <p className="muted">Deployed Forward opens early access to mission-driven AI training.</p>
            <a className="btn" href="#">Read more</a>
          </article>
          <article className="card space-y-2">
            <span className="muted text-sm">2025-02-15</span>
            <h3 className="text-xl font-semibold">CLI Surface</h3>
            <p className="muted">Scriptable enrollment and scoring for CI/CD.</p>
            <a className="btn" href="#">Read more</a>
          </article>
          <article className="card space-y-2">
            <span className="muted text-sm">2025-03-10</span>
            <h3 className="text-xl font-semibold">PM Integrations</h3>
            <p className="muted">Connect issues to outcomes with first-class PM support.</p>
            <a className="btn" href="#">Read more</a>
          </article>
        </div>
      </section>
    </>
  );
}
