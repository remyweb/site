import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getLogs } from "@/actions/get-logs";
import { Donut } from "@/components/donut"; 
export default function DashboardPage() {
  return (
    <main className="min-h-screen p-4">
      <h1>Dashboard</h1>
    </main>
  );
}
