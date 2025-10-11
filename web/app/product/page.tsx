export const metadata = { title: "Product" };

export default function ProductPage() {
  return (
    <section className="section">
      <div className="container accent-left grid md:grid-cols-2 grid-gap">
        <div className="space-y-4">
          <span className="eyebrow">Product</span>
          <h1 className="font-display text-4xl md:text-6xl">Flat. Fast. Measurable.</h1>
          <p className="muted">Train AI where you work. Brief-driven KPIs make progress visible and repeatable.</p>
          <div className="flex items-center gap-3">
            <a href="/pricing" className="btn btn-primary">Get Started</a>
            <a href="/docs" className="btn">Read Docs</a>
          </div>
        </div>
        <div className="card card-accent space-y-2">
          <h3 className="text-xl font-semibold">Architecture (flat)</h3>
          <p className="muted">Surfaces → Brief Engine → Scoring → Outcomes.</p>
          <pre className="text-sm text-fg3 overflow-x-auto"><code>{`IDE / Web / CLI / Chat / PM
  ↳ Brief Engine (specs as code)
     ↳ Scoring (KPIs per run)
        ↳ Outcomes (org-level)`}</code></pre>
        </div>
      </div>
    </section>
  );
}
