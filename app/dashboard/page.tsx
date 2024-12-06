import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { getLogs } from "@/actions/get-logs";
import { Donut } from "@/components/donut"; 
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  } else {
    const { status, logs } = await getLogs();

    const totalBandwidth = logs.reduce((sum, log) => sum + log.bandwidth, 0);
    const uniqueIPs = new Set(logs.map((log) => log.ip)).size;
    const uniquePorts = new Set(logs.map((log) => log.port)).size;

    const portData = logs.reduce((acc, log) => {
      const existing = acc.find((item) => item.name === log.port_name);
      if (existing) {
        existing.value += 1;
      } else {
        acc.push({ name: log.port_name, value: 1, fill: `hsl(${Math.random() * 360}, 70%, 60%)` });
      }
      return acc;
    }, [] as { name: string; value: number; fill: string }[]);

    const countryData = logs.reduce((acc, log) => {
      const existing = acc.find((item) => item.name === log.country);
      if (existing) {
        existing.value += 1;
      } else {
        acc.push({ name: log.country, value: 1, fill: `hsl(${Math.random() * 360}, 70%, 60%)` });
      }
      return acc;
    }, [] as { name: string; value: number; fill: string }[]);


    const ipRequests = logs.reduce((acc, log) => {
      if (acc[log.ip]) {
        acc[log.ip]++;
      } else {
        acc[log.ip] = 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const topIPs = Object.entries(ipRequests)
      .sort(([, countA], [, countB]) => countB - countA) 
      .slice(0, 10) 
      .map(([ip, count]) => ({ ip, count }));  

      

    return (
      <div className="min-h-screen relative">

 

        <div className="z-20 backdrop-blur-xl sticky top-0 border-b h-12 flex items-center px-8 justify-center mb-4 ">
          <h1 className="font-bold">WinniePot🍯</h1>
        </div>

        <div className="max-w-5xl mx-auto space-y-4 p-4">
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl" >Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Bienvenue, {session.user?.name}!</p>
              <p>
                Ces 30 derniers jours, il y a eu <span className="font-bold">{logs.length}</span>{" "}
                requêtes dans votre pot de miel.
              </p>
              <p>
                <span className="font-bold">{uniqueIPs}</span> adresses IP uniques ont été
                détectées.
              </p>
              <p>
                <span className="font-bold">{uniquePorts}</span> ports différents ont été utilisés.
              </p>
              <p>
                Le trafic total consommé est de{" "} 
                <span className="font-bold">{totalBandwidth} Bytes</span>
                {" soit "}
                <span className="font-bold">{(totalBandwidth / (1024 * 1024)).toFixed(2)} MB</span>

              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Donut
              data={portData}
              title="Distribution des Ports"
              description="Analyse des ports utilisés"
            />
            <Donut
              data={countryData}
              title="Répartition par Pays"
              description="Origine géographique des requêtes"
            />
          </div>
 
          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl" >Top 10 des IPs</CardTitle>
            </CardHeader>
            <CardContent className="rounded-lg">
              <table className="w-full table-auto border-collapse border rounded-lg">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">IP (v6 🤩)</th>
                    <th className="border px-4 py-2">Nombre de requêtes 😋</th>
                  </tr>
                </thead>
                <tbody>
                  {topIPs.map((entry, index) => (
                    <tr key={index} className="text-center">
                      <td className="border px-4 py-2">{entry.ip}</td>
                      <td className="border px-4 py-2">{entry.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card className="rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl" >Requêtes recentes</CardTitle>
            </CardHeader>
            <CardContent className="rounded-lg">
              <table className="w-full table-auto border-collapse border rounded-lg">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">IP (v6)</th>
                    <th className="border px-4 py-2">Port</th>
                    <th className="border px-4 py-2 hidden md:table-cell">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.reverse().map((entry, index) => (
                    <tr key={index} className="text-left">
                      <td className="border text-sm  p-2">{entry.ip}</td>
                      <td className="border text-sm p-2">{entry.port} : {entry.port_name}</td>
                      <td className="border text-xs p-2 hidden md:table-cell">{entry.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
          
        </div>
      </div>
    );
  }
}
