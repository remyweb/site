// 'use client';

import { Hero } from '@/components/ocean/hero';
import { Footer } from '@/components/ocean/footer';
import { StatsCard } from "@/components/climate/stats-card";
import { CarbonCycle } from "@/components/climate/carbon-cycle";
import { TemperatureRegulation } from "@/components/climate/temperature-regulation";
import { PodcastSection } from "@/components/ocean/podcast";
import { OceanAcidification } from "@/components/diagrams/ocean-acidification";
import { PhytoplanktonCycle } from "@/components/diagrams/phytoplankton-cycle";
import { ThermohalineCirculation } from "@/components/diagrams/thermohaline-circulation";
import { Waves, ThermometerSun, Leaf, Droplets } from "lucide-react";
import RetroGame from "@/components/retro";
import { InteractiveBodyMap } from "@/components/interactive";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // redirect("/auth/signin");
  }else{
    redirect("/dashboard");
  }
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950">
      <Hero />
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div id="info-section" className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6 flex items-center justify-center gap-4">
            <Waves className="h-8 w-8" />
            L&apos;Océan, Notre Corps Planétaire
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez les analogies fascinantes entre le corps humain et l&apos;océan, 
            et leur rôle crucial dans la régulation du climat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <StatsCard
            title="Absorption de CO₂"
            value="25%"
            description="Des émissions de CO₂ sont absorbées par les océans chaque année"
          />
          <StatsCard
            title="Production d'Oxygène"
            value="50%"
            description="De l'oxygène sur Terre est produit par le phytoplancton marin"
          />
          <StatsCard
            title="Chaleur Absorbée"
            value="93%"
            description="De la chaleur excédentaire est stockée dans les océans"
          />
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Le Corps Humain et l&apos;Océan</h2>
          <InteractiveBodyMap />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <ThermometerSun className="h-6 w-6" />
              <h2 className="text-2xl font-semibold">Circulation Océanique</h2>
            </div>
            <ThermohalineCirculation />
            <p className="text-sm text-muted-foreground">
              La circulation thermohaline, véritable système circulatoire des océans
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6" />
              <h2 className="text-2xl font-semibold">Production d&apos;Oxygène</h2>
            </div>
            <PhytoplanktonCycle />
            <p className="text-sm text-muted-foreground">
              Le phytoplancton, poumon de notre planète
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="h-6 w-6" />
              <h2 className="text-2xl font-semibold">Acidification</h2>
            </div>
            <OceanAcidification />
            <p className="text-sm text-muted-foreground">
              L&apos;impact du CO₂ sur l&apos;équilibre des océans
            </p>
          </div>
        </div>

        <PodcastSection />

        <div className="text-center mt-16 bg-primary/5 p-8 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Agissons pour Préserver nos Océans</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            La préservation des océans est essentielle pour maintenir l&apos;équilibre climatique de notre planète. 
            Chaque action compte pour protéger cet écosystème vital.
          </p>
        </div>
      </div>
    </div>
    <div className="text-center mt-16">
            <h2 className="text-2xl font-semibold mb-4">Testez vos connaissances</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Participez à notre quiz interactif pour en savoir plus sur les océans et le climat.
            </p>
            <Link href="/ocean/quiz">
              <Button className="mt-6">Accéder au Quiz</Button>
            </Link>
          </div>
    <RetroGame />
    <Footer />
    </main>
  );
}