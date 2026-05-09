import { Brain, AlertCircle, Droplet, FlaskConical } from 'lucide-react';

export function ResearchPage() {
  return (
    <div className="min-h-screen pb-20 md:pb-0 md:bg-white">
      {/* Header */}
      <div className="bg-purple-600 text-white p-6 md:py-12">
        <div className="md:max-w-7xl md:mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <FlaskConical className="w-8 h-8 md:w-12 md:h-12" />
            <h1 className="text-3xl md:text-5xl">Research</h1>
          </div>
          <p className="text-sm md:text-lg text-purple-100">
            Evidence-based information about alcohol's effects
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="p-6 md:py-12 space-y-8 md:space-y-12">
        <div className="md:max-w-7xl md:mx-auto">
        {/* Blackouts Section */}
        <section>
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <Brain className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
            <h2 className="text-2xl md:text-4xl">Blackouts</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-purple-50 border-l-4 border-purple-600 p-4 md:p-6 rounded">
              <h3 className="font-semibold mb-2 md:text-lg">What is a blackout?</h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                An alcohol-induced blackout is a period of amnesia during which a person actively
                engages in behaviors but cannot recall them later. This occurs when alcohol
                disrupts the hippocampus, preventing the formation of new memories.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-4 md:p-6 rounded">
              <h3 className="font-semibold mb-2 md:text-lg">Two Types of Blackouts</h3>
              <ul className="text-sm md:text-base text-slate-700 space-y-2 ml-4">
                <li>
                  <span className="font-semibold">• En bloc (complete):</span> Total inability to
                  recall events, even with prompting
                </li>
                <li>
                  <span className="font-semibold">• Fragmentary (partial):</span> Spotty memory
                  with gaps that can be filled in with prompting
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-300 p-4 md:p-6 rounded">
              <h3 className="font-semibold mb-2 md:text-lg text-amber-900">Critical Risk Factors</h3>
              <ul className="text-sm md:text-base text-amber-900 space-y-1 ml-4">
                <li>• Rapid consumption (front-loading)</li>
                <li>• Drinking on an empty stomach</li>
                <li>• BAC above 0.16% (twice the legal limit)</li>
                <li>• Previous blackout history</li>
                <li>• Female sex (lower body water percentage)</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 md:p-6 rounded">
              <h3 className="font-semibold mb-2 md:text-lg">How SafeNite Uses This</h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Our baseline calculator uses the{' '}
                <span className="font-semibold">Widmark equation</span> to estimate peak BAC, then
                applies research-backed penalty weights for rapid consumption (front-loading),
                tolerance patterns, and blackout history to predict your personal risk.
              </p>
            </div>
          </div>
        </section>

        {/* Alcoholism Section */}
        <section>
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
            <h2 className="text-2xl md:text-4xl">Alcoholism</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-red-50 border-l-4 border-red-600 p-4 md:p-6 rounded">
              <h3 className="font-semibold mb-2 md:text-lg">Alcohol Use Disorder (AUD)</h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                AUD is a medical condition characterized by an impaired ability to stop or control
                alcohol use despite adverse consequences. It exists on a spectrum from mild to
                severe.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-4 md:p-6 rounded">
              <h3 className="font-semibold mb-2 md:text-lg">Warning Signs</h3>
              <ul className="text-sm md:text-base text-slate-700 space-y-2 ml-4">
                <li>• Drinking more or longer than intended</li>
                <li>• Unable to cut down despite wanting to</li>
                <li>• Spending significant time obtaining or recovering from alcohol</li>
                <li>• Continued use despite relationship or health problems</li>
                <li>• Tolerance (needing more to feel the same effect)</li>
                <li>• Withdrawal symptoms when not drinking</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 md:p-6 rounded">
              <h3 className="font-semibold mb-2 md:text-lg">How SafeNite Uses This</h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                The "tolerance" question (days drank heavily this month) serves as a screening tool
                for problematic drinking patterns. Higher frequency increases blackout risk AND may
                indicate developing AUD. Our Support page provides resources if you're concerned.
              </p>
            </div>
          </div>
        </section>

        {/* Hangovers Section */}
        <section>
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <Droplet className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
            <h2 className="text-2xl md:text-4xl">Hangovers</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <h3 className="font-semibold mb-2">What causes hangovers?</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Hangovers result from multiple physiological processes: dehydration (alcohol is a
                diuretic), acetaldehyde toxicity (alcohol metabolite), inflammation, and disrupted
                sleep architecture.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-4 md:p-6 rounded">
              <h3 className="font-semibold mb-2 md:text-lg">Evidence-Based Prevention</h3>
              <ul className="text-sm md:text-base text-slate-700 space-y-2 ml-4">
                <li>• Pace yourself (1 drink per hour maximum)</li>
                <li>• Alternate alcoholic drinks with water</li>
                <li>• Eat carbohydrate-rich food before drinking</li>
                <li>• Avoid darker liquors (higher congener content)</li>
                <li>• Get adequate sleep after drinking</li>
              </ul>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 md:p-6 rounded">
              <h3 className="font-semibold mb-2 md:text-lg">How SafeNite Uses This</h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Our checklist incorporates these evidence-based harm reduction strategies,
                prompting you to eat before drinking and stay hydrated. The duration slider in the
                baseline calculator accounts for metabolic clearance (0.015 BAC/hour).
              </p>
            </div>
          </div>
        </section>

        {/* Research Sources */}
        <section className="bg-slate-100 p-4 md:p-6 rounded">
          <h3 className="font-semibold mb-2 text-sm md:text-base">Key Research Sources</h3>
          <ul className="text-xs md:text-sm text-slate-600 space-y-1 ml-4">
            <li>• White, A.M. (2003). What happened? Alcohol, memory blackouts, and the brain.</li>
            <li>
              • NIAAA (2021). Understanding Alcohol Use Disorder. National Institute on Alcohol
              Abuse and Alcoholism.
            </li>
            <li>• Widmark, E.M.P. (1932). Principles and Applications of Medicolegal Alcohol.</li>
            <li>• Rohsenow, D.J. & Howland, J. (2010). The role of beverage congeners in hangover.</li>
          </ul>
        </section>
        </div>
      </div>
    </div>
  );
}
