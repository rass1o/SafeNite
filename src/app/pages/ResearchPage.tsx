import { Brain, FlaskConical, Activity, Calculator, BookOpen, ChevronRight } from 'lucide-react';

export function ResearchPage() {
  return (
    <div className="min-h-screen pb-20 md:pb-0 md:bg-slate-50">
      {/* 1. ORIGINAL BRANDED HEADER */}
      <div className="bg-purple-600 text-white p-6 md:py-12 shadow-md">
        <div className="md:max-w-7xl md:mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <FlaskConical className="w-8 h-8 md:w-12 md:h-12" />
            <h1 className="text-3xl md:text-5xl font-bold">Methodology & Research</h1>
          </div>
          <p className="text-sm md:text-lg text-purple-100 font-medium">
            The evidence-based Two-Engine architecture powering SafeNite's risk calculations.
          </p>
        </div>
      </div>

      {/* 2. THE NEW EXPLANATION & FORMULA BLOCKS */}
      <div className="p-6 md:py-12 space-y-10">
        <div className="md:max-w-7xl md:mx-auto space-y-10">

          {/* Engine 1 */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-purple-50 border-b border-purple-100 p-6 flex items-center gap-3">
              <Brain className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
              <h2 className="text-xl md:text-3xl font-bold text-slate-900">Engine 1: Behavioral Baseline</h2>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-slate-700 leading-relaxed text-lg max-w-4xl">
                Before a single drink is consumed, the algorithm calculates a baseline probability of an Alcohol-Induced Blackout (AIB) using a logistic regression intercept based on historical drinking frequency.
              </p>
              
              {/* LaTeX-Style Math Block */}
              <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 font-serif text-center text-xl md:text-2xl text-slate-800 shadow-inner overflow-x-auto">
                <span className="italic font-bold text-purple-700">L<sub>prior</sub></span> = -3.641 + (0.106 &times; BingeDays)
              </div>

              <div className="grid md:grid-cols-2 gap-8 pt-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Why Binge Days?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Clinical studies show that the frequency of binge drinking (5+ drinks in a sitting) is the strongest behavioral predictor of AIBs. This establishes our primary statistical floor.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Preventing Collinearity</h3>
                  <p className="text-slate-600 leading-relaxed">
                    We deliberately exclude "prior blackout history." Statistically, blackout history is highly collinear with binge frequency. Including both would result in "double-counting" the risk, artificially inflating the probability.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Engine 2 */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-blue-50 border-b border-blue-100 p-6 flex items-center gap-3">
              <Activity className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              <h2 className="text-xl md:text-3xl font-bold text-slate-900">Engine 2: Real-Time Pharmacokinetics</h2>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <p className="text-slate-700 leading-relaxed text-lg max-w-4xl">
                Once drinking begins, Engine 2 calculates the acute physiological load using a modified Widmark equation, factoring in real-time metabolic clearance and gastrointestinal absorption rates.
              </p>

              {/* LaTeX-Style Math Block */}
              <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 shadow-inner space-y-8 overflow-x-auto">
                <div className="flex flex-col items-center font-serif text-xl md:text-2xl text-slate-800">
                  <div className="flex items-center gap-4 whitespace-nowrap">
                    <span className="italic font-bold text-blue-700">BAC<sub>raw</sub></span> = 
                    <div className="flex flex-col items-center mx-2">
                      <span className="border-b border-slate-400 px-4 pb-1">Alcohol<sub>grams</sub></span>
                      <span className="px-4 pt-1">Weight<sub>kg</sub> &times; r &times; 1000</span>
                    </div>
                    &times; 100 &minus; (0.015 &times; Hours)
                  </div>
                </div>
                <div className="border-t border-slate-200 pt-6 flex flex-col items-center font-serif text-xl md:text-2xl text-slate-800">
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <span className="italic font-bold text-blue-700">L<sub>acute</sub></span> = (&gamma;<sub>bac</sub> &times; BAC<sub>final</sub>) + (&gamma;<sub>pace</sub> &times; FrontLoad)
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 pt-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">The Fed-State Discount</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Consuming food prior to drinking closes the pyloric sphincter, delaying gastric emptying. Our algorithm applies a 25% discount to peak BAC absorption if the user confirms a fed-state in the checklist.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Front-Load Penalties</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Rapid consumption overwhelms hepatic clearance. The <i>L<sub>acute</sub></i> multiplier severely penalizes front-loading, mapping to the clinical definition of a rapid BAC spike.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* The Synthesizer */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              <h2 className="text-xl md:text-3xl font-bold text-slate-900">The Synthesis: Calculating Probability</h2>
            </div>
            <p className="text-slate-700 leading-relaxed text-lg mb-8 max-w-4xl">
              To transform the combined log-odds from Engine 1 and Engine 2 into a human-readable risk percentage, the algorithm passes the sum through a standard Sigmoid function. This accurately bounds the physical risk between 0% and 100%.
            </p>
            
            <div className="bg-slate-900 text-white rounded-xl p-8 font-serif text-center text-2xl md:text-3xl shadow-lg flex items-center justify-center gap-4 overflow-x-auto">
              <span className="italic font-bold text-green-400 whitespace-nowrap">P(Blackout)</span> = 
              <div className="flex flex-col items-center mx-2">
                <span className="border-b border-slate-500 px-6 pb-1">1</span>
                <span className="px-6 pt-2">1 + e<sup>-(L<sub>prior</sub> + L<sub>acute</sub>)</sup></span>
              </div>
            </div>
          </section>

          {/* 3. NEW CITATION CARDS */}
          <section className="pt-4 pb-12">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-slate-400" />
              <h2 className="text-xl md:text-3xl font-bold text-slate-900">Clinical Citations & Datasets</h2>
            </div>
            <div className="grid gap-4">
              <Citation 
                title="Serious harm reduction protective behavioral strategies reduce consequences associated with alcohol-induced blackouts in college students."
                author="Richards VL, Turrisi RJ, Glenn SD, Mallett KA, Altstaedter A, Ackerman S, Russell MA. (2025)"
                source="Addictive Behaviors, 162, 108234. doi: 10.1016/j.addbeh.2024.108234"
              />
              <Citation 
                title="Transdermal alcohol concentration features predict alcohol-induced blackouts in college students."
                author="Richards VL, Glenn SD, Turrisi RJ, Mallett KA, Ackerman S, Russell MA. (2024)"
                source="Alcoholism: Clinical and Experimental Research, 48(5), 880-888. doi: 10.1111/acer.15290"
              />
              <Citation 
                title="National Survey on Drug Use and Health (NSDUH) 2024 Dataset."
                author="Substance Abuse and Mental Health Services Administration (SAMHSA)."
                source="Used for benchmarking baseline behavioral models and collegiate drinking frequencies."
              />
              <Citation 
                title="Principles and Applications of Medicolegal Alcohol Determination."
                author="Widmark, E.M.P. (1932)"
                source="Foundational framework for Engine 2 pharmacokinetic calculations."
              />
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

// Helper component for clean citation cards
function Citation({ title, author, source }: { title: string, author: string, source: string }) {
  return (
    <div className="bg-white border border-slate-200 p-5 md:p-6 rounded-xl flex items-start gap-4 hover:border-purple-400 hover:shadow-md transition-all">
      <ChevronRight className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5 hidden md:block" />
      <div>
        <div className="font-bold text-slate-900 text-base md:text-lg leading-snug mb-2">{title}</div>
        <div className="text-slate-600 text-sm md:text-base mb-1">{author}</div>
        <div className="text-slate-500 text-sm md:text-sm italic">{source}</div>
      </div>
    </div>
  );
}