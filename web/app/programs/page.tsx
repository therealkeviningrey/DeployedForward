import ProgramsAccordion from "@/components/programs-accordion";

export const metadata = { title: "Programs" };

export default function ProgramsPage() {
  return (
    <>
      <section className="section">
        <div className="container accent-left space-y-4">
          <span className="eyebrow">Programs</span>
          <h1 className="font-display text-4xl md:text-6xl">Briefs. Missions. Campaigns.</h1>
          <p className="muted">Start small, scale up. Every step measured.</p>
        </div>
      </section>
      <section className="section">
        <div className="container grid md:grid-cols-3 grid-gap">
          <div className="card card-accent"><h3 className="text-xl font-semibold">Briefs</h3><p className="muted">Targeted improvements with single objectives.</p></div>
          <div className="card card-accent"><h3 className="text-xl font-semibold">Missions</h3><p className="muted">Sequenced briefs with gates and checkpoints.</p></div>
          <div className="card card-accent"><h3 className="text-xl font-semibold">Campaigns</h3><p className="muted">Cohort execution with rollup metrics.</p></div>
        </div>
      </section>
      <section className="section">
        <div className="container space-y-6">
          <h2 className="text-3xl font-bold font-display">Courses</h2>
          <div className="grid md:grid-cols-3 grid-gap">
            <div className="card card-accent space-y-2">
              <h3 className="text-xl font-semibold">AI-Native Fundamentals</h3>
              <p className="muted">2 weeks • Drills + AARs</p>
              <a className="btn btn-primary" href="/pricing">Enroll</a>
            </div>
            <div className="card card-accent space-y-2">
              <h3 className="text-xl font-semibold">Forward Deployed Engineer Bootcamp</h3>
              <p className="muted">4 weeks • Missions + Live-fire</p>
              <a className="btn" href="/company#contact">Join Cohort</a>
            </div>
            <div className="card card-accent space-y-2">
              <h3 className="text-xl font-semibold">Ops AI for PMs</h3>
              <p className="muted">1 week • ROE + Outcomes</p>
              <a className="btn btn-primary" href="/pricing">Enroll</a>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {/* FAQ using Radix Accordion */}
          <ProgramsAccordion/>
        </div>
      </section>
    </>
  );
}

 
