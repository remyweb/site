"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface Animal {
  id: string;
  name: string;
  pokemonName: string;
  description: string;
  image: string;
  pokeimg: string;
  qrcode: string;
}

const animals: Animal[] = [
  {
    id: "1",
    name: "Tortue de mer",
    pokemonName: "Tortank",
    description: "Les tortues sont des créatures fascinantes qui peuplent nos océans et nos plages, aujourd’hui elles sont menacées de disparition. Ces animaux, sont pourtant en danger, victimes de plusieurs facteurs liés à l’activité humaine. Chaque année, des milliers de tortues marines perdent leur vie à cause de la pollution plastique, des prises accidentelles dans les filets de pêche, du braconnage et de la destruction de leurs habitats naturels. Les plages où elles viennent pondre leurs œufs sont de plus en plus menacées par l’urbanisation, le tourisme de masse et les changements climatiques. L’augmentation du niveau des océans et les températures extrêmes perturbent les cycles de reproduction et mettent en péril leur survie. Les tortues marines jouent un rôle essentiel dans l’équilibre de nos écosystèmes marins. Elles aident à maintenir la santé des herbiers sous-marins en régulant les populations de plantes marines, et elles participent au maintien de la biodiversité. Sans elles, nos océans seraient plus fragiles. Il est urgent d’agir pour protéger ces animaux vulnérables. Chacun de nous peut contribuer à leur survie en réduisant notre utilisation de plastique, en soutenant des initiatives de conservation et en sensibilisant les autres à la cause des tortues. Ensemble, nous pouvons faire la différence. Ne laissons pas ces animaux disparaître.",
    image: "/tortue.jpg",
    pokeimg: "/tortank.jpg",
    qrcode: "/QR_CODE_0.png"
  },
  {
    id: "2",
    name: "Plantes",
    pokemonName: "Bullbizare",
    description: "Les plantes sont des êtres vivants essentiels, elles jouent un rôle crucial dans l’équilibre de notre planète. Elles sont bien plus que de simples éléments décoratifs, elles sont la clé de la vie sur Terre. Grâce à la photosynthèse, les plantes produisent l’oxygène que nous respirons, tout en absorbant le dioxyde de carbone, contribuant ainsi à la régulation du climat. Sans elles, notre atmosphère serait inhabitable et la vie telle que nous la connaissons serait impossible. Les plantes nourrissent également des milliards de personnes à travers la production de fruits, de légumes, de céréales et de plantes médicinales. Elles sont au cœur de la chaîne alimentaire, soutenant la faune et, indirectement, les humains. Elles contribuent à la stabilité des sols en prévenant l’érosion et en filtrant l’eau, agissant comme de véritables protectrices des ressources naturelles. Cependant, malgré leur importance vitale, la végétation mondiale est en danger. La déforestation massive, l’urbanisation, les pratiques agricoles destructrices et les changements climatiques accélèrent la disparition des écosystèmes végétaux. Il est de notre responsabilité de protéger et de préserver nos plantes et nos forêts. Ne sous-estimons jamais l’importance de ces êtres vivants silencieux : sans eux, notre monde serait bien plus fragile. Ensemble, faisons en sorte que la nature continue de prospérer.",
    image: "/plante.jpg",
    pokeimg: "/bulbizare.png",
    qrcode: "/QR_CODE_2.png"
  },
  {
    id: "3",
    name: "Pêche intensive",
    pokemonName: "Magicarpe",
    description: "La pêche intensive est une menace dévastatrice pour les écosystèmes marins. Depuis des années, les activités de pêche industrielle exploitent les ressources marines à un rythme bien plus rapide que celui auquel elles peuvent se régénérer. Résultat : des populations entières de poissons s’effondrent, mettant en péril la biodiversité et l’équilibre des océans. Les techniques utilisées dans la pêche intensive, comme les chalutiers géants ou les filets dérivants, ne se contentent pas de capturer les espèces ciblées, elles piègent également des milliers de créatures marines non désirées. Ces victimes, sont souvent rejetées mortes à la mer. Mais l’impact de la pêche intensive ne s’arrête pas là, en détruisant les habitats marins comme les récifs coralliens et les fonds marins, elle perturbe des écosystèmes entiers. Aujourd’hui, près de 90 % des stocks de poissons sont pleinement exploités ou surexploités. Si nous ne changeons pas nos habitudes, certaines espèces pourraient disparaître à jamais, privant les générations futures non seulement de nourriture, mais aussi de la diversité de nos océans. Il est urgent de repenser notre façon de consommer les produits de la mer. Favoriser la pêche durable, consommer des espèces locales et de saison, et soutenir les initiatives de protection marine sont autant de gestes qui peuvent faire la différence. L’océan est une ressource précieuse et limitée. Ensemble, protégeons-le, avant qu’il ne soit trop tard.",
    image: "/intensep.jpg",
    pokeimg: "/magicarp.png",
    qrcode: "/QR_CODE_3.png"
  },
];

const SearchComponent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [animal, setAnimal] = useState<Animal | null>(null);

  useEffect(() => {
    if (id) {
      const foundAnimal = animals.find((animal) => animal.id === id);
      setAnimal(foundAnimal || null);
    }
  }, [id]);

  if (!animal) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-ocean text-white font-retro">
        <h1 className="text-3xl mb-8">Animal non trouvé</h1>
        <p className="text-xl">Veuillez vérifier l'ID dans l'URL.</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-ocean text-white font-retro overflow-hidden p-4">
      <h1 className="text-4xl mb-4">{animal.pokemonName}</h1>
      <img src={animal.pokeimg} alt={animal.pokemonName} className="w-64 h-64 mb-4 rounded-full shadow-md" />
      <h2 className="text-3xl mb-8">Sensibilisation à la cause des animaux</h2>
      <div className="flex flex-col items-center bg-[hsl(222,47%,20%)] bg-opacity-80 p-6 rounded-lg shadow-lg z-10 max-w-2xl">
        <img src={animal.image} alt={animal.name} className="w-64 h-64 mb-4 rounded-full shadow-md" />
        <h2 className="text-2xl mb-4">{animal.name}</h2>
        <p className="text-xl mb-6 text-center overflow-y-auto max-h-96">{animal.description}</p>
      </div>
      <div className="mt-8">
        <img src={animal.qrcode} alt="QR Code" className="w-32 h-32" />
      </div>
    </div>
    
  );
};

const AnimalPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchComponent />
      </Suspense>
    </div>
  );
};

export default AnimalPage;