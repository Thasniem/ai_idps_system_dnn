// components/dashboard/ThreatChecker.tsx
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ShieldAlert, ShieldCheck } from "lucide-react";

export default function ThreatChecker() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { status: string; details: string }>(null);

  const handleCheck = async () => {
    if (!query) return;
    setLoading(true);
    setResult(null);

    try {
      // Example API call - adjust endpoint to match your backend
      const res = await fetch("/api/check-threat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Error checking threat:", err);
      setResult({ status: "error", details: "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Threat Checker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter IP, URL, or File Hash"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={handleCheck} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Check"}
          </Button>
        </div>

        {result && (
          <div
            className={`p-4 rounded-xl flex items-center gap-3 ${
              result.status === "malicious"
                ? "bg-red-100 text-red-700"
                : result.status === "suspicious"
                ? "bg-yellow-100 text-yellow-700"
                : result.status === "safe"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {result.status === "malicious" && <ShieldAlert className="h-6 w-6" />}
            {result.status === "suspicious" && <ShieldAlert className="h-6 w-6 text-yellow-600" />}
            {result.status === "safe" && <ShieldCheck className="h-6 w-6 text-green-600" />}
            <div>
              <p className="font-medium capitalize">Status: {result.status}</p>
              <p className="text-sm">{result.details}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
