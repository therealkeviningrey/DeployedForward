import PricingFAQ from "@/components/pricing-faq";

export const metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <>
      <section className="section">
        <div className="container accent-left space-y-4">
          <span className="eyebrow">Pricing</span>
          <h1 className="font-display text-4xl md:text-6xl">Simple, transparent.</h1>
          <p className="muted">Start with a team. Scale with your outcomes.</p>
        </div>
      </section>
      <section className="section">
        <div className="container grid md:grid-cols-3 grid-gap">
          <div className="card space-y-2">
            <h3 className="text-xl font-semibold">Starter</h3>
            <div className="kpi">$0</div>
            <p className="muted">Evaluate the platform with core features.</p>
            <a href="#" className="btn btn-primary">Choose Starter</a>
          </div>
          <div className="card card-accent space-y-2">
            <h3 className="text-xl font-semibold">Team</h3>
            <div className="kpi">$49</div>
            <p className="muted">Per user / month. Everything to run programs.</p>
            <a href="#" className="btn btn-primary">Choose Team</a>
          </div>
          <div className="card space-y-2">
            <h3 className="text-xl font-semibold">Enterprise</h3>
            <div className="kpi">Custom</div>
            <p className="muted">Compliance, SSO, custom surfaces, and SLAs.</p>
            <a href="#" className="btn btn-primary">Contact Sales</a>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <PricingFAQ/>
        </div>
      </section>
    </>
  );
}
