export const metadata = { title: "Company" };

export default function CompanyPage() {
  return (
    <>
      <section className="section">
        <div className="container accent-left space-y-4">
          <span className="eyebrow">Company</span>
          <h1 className="font-display text-4xl md:text-6xl">Mission-first.</h1>
          <p className="muted">We help teams deploy AI where work happens and prove it with outcomes.</p>
        </div>
      </section>
      <section className="section">
        <div className="container grid md:grid-cols-3 grid-gap">
          <div className="card"><h3 className="text-xl font-semibold">Flat</h3><p className="muted">No fluff. Minimize friction. Respect developer time.</p></div>
          <div className="card"><h3 className="text-xl font-semibold">Fast</h3><p className="muted">Optimize for flow. LCP under two seconds.</p></div>
          <div className="card"><h3 className="text-xl font-semibold">Measurable</h3><p className="muted">Everything has a KPI. We ship outcomes, not demos.</p></div>
        </div>
      </section>
      <section id="contact" className="section">
        <div className="container grid md:grid-cols-2 grid-gap">
          <div>
            <h2 className="text-3xl font-display font-bold">Contact</h2>
            <p className="muted">Reach out for enterprise, partnerships, or media.</p>
          </div>
          <form className="card space-y-3">
            <label className="text-fg3 text-sm" htmlFor="email">Email</label>
            <input className="bg-bg2 border border-bd1 px-3 py-2" id="email" type="email" placeholder="you@example.com" />
            <label className="text-fg3 text-sm" htmlFor="message">Message</label>
            <textarea className="bg-bg2 border border-bd1 px-3 py-2 h-28" id="message" placeholder="How can we help?" />
            <div><button className="btn btn-primary" type="submit">Send</button></div>
          </form>
        </div>
      </section>
    </>
  );
}
