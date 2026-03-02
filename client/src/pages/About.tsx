import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

const features = [
  {
    icon: "🌡️",
    title: "Climate Modeling",
    description:
      "IPCC-based carbon budget modeling with planetary boundary constraints. Real science, real projections.",
  },
  {
    icon: "⚡",
    title: "Tiered Carbon Pricing",
    description:
      "Choice-preserving carbon tax ($25–$200/ton) that protects small businesses while targeting mega-polluters.",
  },
  {
    icon: "🌾",
    title: "Agricultural Revolution",
    description:
      "Regenerative agriculture transformation with hemp integration. From monoculture to biodiversity.",
  },
  {
    icon: "🍅",
    title: "Food Security Networks",
    description:
      "School greenhouse systems providing fresh food and hands-on education. Universal food security.",
  },
  {
    icon: "👷",
    title: "Worker Transition",
    description:
      "Comprehensive support for workers transitioning from fossil fuels to green economy with preserved choice.",
  },
  {
    icon: "🗳️",
    title: "Political Coalition",
    description:
      "Model political coalition strength and build movements for systemic change that actually works.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f1f5f9]">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 bg-gradient-to-br from-[#1e3a5f] to-[#0f172a]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#10b981]">
            🌍 Gaia Commons Council
          </h1>
          <p className="text-xl text-[#cbd5e1] mb-4">
            Planetary transformation framework that actually works
          </p>
          <p className="text-[#94a3b8] mb-8">
            Complete system for modeling and implementing climate action, regenerative agriculture, and
            economic justice. From tiered carbon pricing to universal food security.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="inline-block bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              🚀 Launch Platform
            </Link>
            <a
              href="https://github.com/bradenchance/gaia-commons-council"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[#10b981] text-[#10b981] hover:bg-[#10b981]/10 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              📦 View Code
            </a>
          </div>
          <p className="mt-6 text-sm text-[#64748b]">
            Created by <strong className="text-[#94a3b8]">Braden Chance</strong> · Minnesota Cannabis Society
          </p>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-[#1e293b]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#f1f5f9]">
            Complete Planetary Transformation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-[#0f172a] rounded-xl p-6 border border-[#334155] hover:-translate-y-1 transition-transform"
              >
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-semibold text-[#f1f5f9] mb-2">{f.title}</h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 py-20 bg-[#0f172a]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-[#f1f5f9]">Get Involved</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            <div className="bg-[#1e293b] rounded-xl p-6 border border-[#334155]">
              <h4 className="font-semibold text-[#10b981] mb-1">📧 Email</h4>
              <p className="text-[#cbd5e1] text-sm">mncannabissociety@gmail.com</p>
            </div>
            <div className="bg-[#1e293b] rounded-xl p-6 border border-[#334155]">
              <h4 className="font-semibold text-[#10b981] mb-1">📱 Phone</h4>
              <p className="text-[#cbd5e1] text-sm">+1 (651) 314-9415</p>
            </div>
            <div className="bg-[#1e293b] rounded-xl p-6 border border-[#334155]">
              <h4 className="font-semibold text-[#10b981] mb-1">🌱 Organization</h4>
              <p className="text-[#cbd5e1] text-sm">
                Minnesota Cannabis Society
                <br />
                Braden Chance, Founder
              </p>
            </div>
            <div className="bg-[#1e293b] rounded-xl p-6 border border-[#334155]">
              <h4 className="font-semibold text-[#10b981] mb-1">💻 Code</h4>
              <p className="text-[#cbd5e1] text-sm">
                <a
                  href="https://github.com/bradenchance/gaia-commons-council"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#10b981] transition-colors"
                >
                  github.com/bradenchance/gaia-commons-council
                </a>
              </p>
            </div>
          </div>

          <div className="mt-10">
            <Link href="/" className="inline-flex items-center gap-2 text-[#10b981] hover:underline text-sm">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
