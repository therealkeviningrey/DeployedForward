import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Code2, Globe, Terminal, MessageSquare, ClipboardList } from "lucide-react";
export default function Page() {
  return (
    <>
      <section className="section">
        <div className="container accent-left space-y-4">
          <span className="eyebrow">Operational AI Training</span>
          <h1 className="font-display text-4xl md:text-6xl">Train Where You Operate.</h1>
          <p className="muted max-w-2xl">Briefs, missions, and live-fire drills that make you AI-native — directly in IDE, Web, CLI, Chat, and PM.</p>
          <span className="code-chip">surfaces: IDE • Web • CLI • Chat • PM</span>
          <div className="flex items-center gap-3 pt-2">
            <a href="/programs" className="btn btn-primary">Explore Courses</a>
            <a href="/pricing" className="btn btn-ghost">Enroll Now</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container space-y-4">
          <h2 className="text-3xl font-bold font-display">Work Where You Operate</h2>
          <p className="muted">Five surfaces, one platform. Your workflow, augmented.</p>
          <Tabs defaultValue="ide" className="space-y-4">
            <TabsList>
              <TabsTrigger value="ide" className="inline-flex items-center gap-2"><Code2 className="h-4 w-4"/>IDE</TabsTrigger>
              <TabsTrigger value="web" className="inline-flex items-center gap-2"><Globe className="h-4 w-4"/>Web</TabsTrigger>
              <TabsTrigger value="cli" className="inline-flex items-center gap-2"><Terminal className="h-4 w-4"/>CLI</TabsTrigger>
              <TabsTrigger value="chat" className="inline-flex items-center gap-2"><MessageSquare className="h-4 w-4"/>Chat</TabsTrigger>
              <TabsTrigger value="pm" className="inline-flex items-center gap-2"><ClipboardList className="h-4 w-4"/>PM</TabsTrigger>
            </TabsList>
            <TabsContent value="ide">
              <div className="grid md:grid-cols-2 grid-gap">
                <div className="card"><h3 className="text-xl font-semibold">Deep IDE Integration</h3><p className="muted">Inline assistance, refactors, and training loops in VS Code and JetBrains.</p></div>
                <div className="card"><h3 className="text-xl font-semibold">Code-Native Evaluation</h3><p className="muted">Run briefs as tests. KPIs captured per change set.</p></div>
              </div>
            </TabsContent>
            <TabsContent value="web"><div className="card"><h3 className="text-xl font-semibold">Web Console</h3><p className="muted">Manage programs, cohorts, and scoring from a fast, dark console.</p></div></TabsContent>
            <TabsContent value="cli"><div className="card"><h3 className="text-xl font-semibold">CLI</h3><p className="muted">Scriptable ops: enroll, run, evaluate. Fits CI/CD.</p></div></TabsContent>
            <TabsContent value="chat"><div className="card"><h3 className="text-xl font-semibold">Chat</h3><p className="muted">Brief-driven chat agents. Grounded. Measurable.</p></div></TabsContent>
            <TabsContent value="pm"><div className="card"><h3 className="text-xl font-semibold">PM</h3><p className="muted">Issue triage and acceptance criteria linked to outcomes.</p></div></TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="section">
        <div className="container space-y-6">
          <h2 className="text-3xl font-bold font-display">Programs</h2>
          <div className="grid md:grid-cols-3 grid-gap">
            <div className="card card-accent">
              <h3 className="text-xl font-semibold">Briefs</h3>
              <p className="muted">Short, surgical tasks to shape model behavior and capture outcomes.</p>
            </div>
            <div className="card card-accent">
              <h3 className="text-xl font-semibold">Missions</h3>
              <p className="muted">Multi-step objectives with evaluation gates and measurable KPIs.</p>
            </div>
            <div className="card card-accent">
              <h3 className="text-xl font-semibold">Campaigns</h3>
              <p className="muted">Cohort-scale training with persistent scoring across surfaces.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container grid md:grid-cols-3 grid-gap">
          <div className="card text-center">
            <div className="kpi">4.7x</div>
            <div className="muted">Faster task completion</div>
          </div>
          <div className="card text-center">
            <div className="kpi">95%</div>
            <div className="muted">Acceptance adherence</div>
          </div>
          <div className="card text-center">
            <div className="kpi">0</div>
            <div className="muted">Unnecessary distractions</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container card">
          <div className="grid md:grid-cols-2 grid-gap">
            <div>
              <h2 className="text-3xl font-display font-bold">Deploy forward.</h2>
              <p className="muted">Bring AI to where work happens and measure what matters.</p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <a href="/pricing" className="btn btn-primary">Get Started</a>
              <a href="/company" className="btn">Talk to us</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
