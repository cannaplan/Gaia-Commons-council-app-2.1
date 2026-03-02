import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function LeechLake() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f1f5f9] flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-3xl flex flex-col gap-6">
        <Link href="/" className="inline-flex items-center gap-2 text-[#10b981] hover:underline mb-2 text-sm">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Title card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#1e293b] border-l-[6px] border-[#10b981] rounded-md px-8 py-6"
        >
          <h1 className="text-3xl font-bold text-[#10b981] mb-1">
            Leech Lake Greenhouse Pilot – 30-Second Recap
          </h1>
          <p className="text-[#cbd5e1] text-base">Permanent food sovereignty in one slide</p>
        </motion.div>

        {/* Points card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-[#1e293b] border-l-[6px] border-[#10b981] rounded-md px-8 py-6"
        >
          <ul className="list-disc pl-5 space-y-3 text-[#f1f5f9]">
            <li>
              <span className="text-[#10b981] font-semibold">5–10 climate-controlled greenhouses</span>
              {" "}on tribal land; tribe owns everything, forever.
            </li>
            <li>
              <span className="text-[#10b981] font-semibold">50–100 local jobs</span>
              {" "}at $18–24/hr; first harvest slated Fall 2027.
            </li>
            <li>
              Daily fresh produce (traditional Three Sisters, greens, berries) goes straight to{" "}
              <span className="text-[#10b981] font-semibold">
                Cass Lake-Bena, Bug-O-Nay-Ge-Shig, and Head Start
              </span>
              —about 1,500 kids.
            </li>
            <li>
              Break-even by Year 5; surplus (~
              <span className="text-[#10b981] font-semibold">$400 K/yr</span>
              ) splits 35 % to Tribal Govt, 35 % to growing endowment, 30 % to youth scholarships &
              food pantry—no money leaves the reservation.
            </li>
            <li>
              Council holds{" "}
              <span className="text-[#10b981] font-semibold">
                veto power, majority board seats, walk-away clause
              </span>
              , annual Big-4 audits, public dashboard—built-in fraud protection.
            </li>
            <li>
              Complements (doesn't compete with) the new{" "}
              <span className="text-[#10b981] font-semibold">$3.6 M wild-rice facility</span>; together
              they lock in permanent food sovereignty and generational wealth for Leech Lake.
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
