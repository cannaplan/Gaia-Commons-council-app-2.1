import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Users, Target, Calendar, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useDAOStats, useSubmitSignature } from "@/hooks/use-gaia";

export default function DAO() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { data: stats, isLoading } = useDAOStats();
  const { mutate: submitSignature, isPending } = useSubmitSignature({
    onSuccess: () => setSubmitted(true),
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    submitSignature(
      { name, email },
      {
        onError: (err: unknown) => {
          setErrorMsg(err instanceof Error ? err.message : "Submission failed. Please try again.");
        },
      }
    );
  }

  const goalPct = stats?.goalPercentage ?? 0;
  const totalSigs = stats?.totalSignatures ?? 0;
  const uniqueVoters = stats?.uniqueVoters ?? 0;
  const daysRemaining = stats?.daysRemaining ?? 0;
  const proposals: Array<{
    id: number;
    title: string;
    description: string;
    quorumRequired: number;
    votesFor: number;
    votesAgainst: number;
  }> = stats?.activeProposals ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">
            One Vote, Forever Fed
          </h1>
          <p className="text-lg text-green-700">
            2026 Minnesota Ballot Initiative — DAO Voter &amp; Signature Page
          </p>
          <p className="text-sm text-green-600 mt-1">
            MN Stat. § 204B.09 · Filing deadline: July 1, 2026
          </p>
        </motion.div>

        {/* Stats Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card>
            <CardContent className="pt-4 text-center">
              <FileText className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-green-800">
                {isLoading ? "—" : totalSigs.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Signatures</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <Target className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-green-800">
                {isLoading ? "—" : `${goalPct.toFixed(1)}%`}
              </div>
              <div className="text-xs text-gray-500">of 120,000 goal</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <Users className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-green-800">
                {isLoading ? "—" : uniqueVoters.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Unique Voters</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 text-center">
              <Calendar className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <div className="text-2xl font-bold text-green-800">
                {isLoading ? "—" : daysRemaining}
              </div>
              <div className="text-xs text-gray-500">Days Remaining</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="pt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{totalSigs.toLocaleString()} signatures collected</span>
                <span>Goal: 120,000</span>
              </div>
              <Progress value={Math.min(goalPct, 100)} className="h-3" />
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Signature Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">Add Your Signature</CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="flex flex-col items-center gap-3 py-6 text-center">
                    <CheckCircle className="h-12 w-12 text-green-500" />
                    <p className="text-lg font-semibold text-green-800">
                      Thank you, {name}!
                    </p>
                    <p className="text-sm text-gray-600">
                      Your signature has been recorded. Together we&apos;re building
                      a permanent food future for Minnesota.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="dao-name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        id="dao-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="dao-email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        id="dao-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@example.com"
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    {errorMsg && (
                      <p className="text-sm text-red-600">{errorMsg}</p>
                    )}
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      {isPending ? "Submitting…" : "Sign the Initiative"}
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      Your information is used solely for ballot initiative
                      verification per MN Stat. § 204B.09.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Active Proposals */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">Active Proposals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {proposals.map((proposal) => {
                  const totalVotes = proposal.votesFor + proposal.votesAgainst;
                  const forPct = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;
                  const quorumReached = totalVotes >= proposal.quorumRequired;
                  return (
                    <div key={proposal.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-gray-800 flex-1">
                          {proposal.title}
                        </p>
                        <Badge variant={quorumReached ? "default" : "secondary"}>
                          {quorumReached ? "Quorum ✓" : `${totalVotes}/${proposal.quorumRequired}`}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">{proposal.description}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>For: {proposal.votesFor}</span>
                          <span>Against: {proposal.votesAgainst}</span>
                        </div>
                        <Progress value={forPct} className="h-2" />
                      </div>
                    </div>
                  );
                })}
                {proposals.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No active proposals at this time.
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
