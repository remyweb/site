import React from 'react';

declare global {
  interface Window {
    // Variables globales
    argent: number;
    energie: number;
    pointsDeCalcul: number;
    gpuPossedes: GPU[];
    systemesRefroidissement: any[];
    ressources: {
      BTC: number;
    };
    objectifs: {
      gainCible: number;
    };
    electriciteConsommee: number;
    coutElectriciteParKW: number;
    efficaciteElectrique: number;
    efficaciteRefroidissement: number;
    prixBTC: number;
    gpuDisponibles: { [key: string]: GPUData };
    niveauxElectricite: { [key: number]: ElectriciteNiveau };
    niveauxRefroidissement: { [key: number]: RefroidissementNiveau };
    niveauActuelElectricite: number;
    niveauActuelRefroidissement: number;
    jeuInitialise: boolean;
    // Fonctions
    afficherTitre: () => void;
    afficherBienvenue: () => void;
    aide: () => void;
    shop: () => void;
    acheterGpu: (marque: string) => void;
    ameliorerElectricite: (niveau: number) => void;
    ameliorerRefroidissement: (niveau: number) => void;
    obtenirPrixBTC: () => Promise<void>;
    checkCoursBTC: () => void;
    mettreAJourObsolescence: (gpu: GPU) => void;
    miner: () => Promise<void>;
    monitorer: () => void;
    vendre: (ressource: string) => Promise<void>;
  }
}

interface GPUData {
  hashrate: number;
  conso: number;
  prix: number;
}

interface GPU extends GPUData {
  id: number;
  marque: string;
  temp: number;
  age: number;
  enMarche: boolean;
  efficacite: number;
}

interface ElectriciteNiveau {
  efficacite: number;
  prix: number;
}

interface RefroidissementNiveau {
  efficacite: number;
  prix: number;
}

const Game: React.FC = () => {
  // Vérifier que nous sommes côté client
  if (typeof window !== 'undefined') {
    // Vérifie si le jeu n'a pas déjà été initialisé
    if (!window.jeuInitialise) {
      // Variables du jeu attachées à window
      window.argent = 1000; // Montant initial
      window.energie = 0;
      window.pointsDeCalcul = 0;
      window.gpuPossedes = [];
      window.systemesRefroidissement = [];
      window.ressources = {
        BTC: 0,
      };
      window.objectifs = {
        gainCible: 50000, // Objectif de gains à atteindre
      };
      window.electriciteConsommee = 0;
      window.coutElectriciteParKW = 0.2; // Coût de l'électricité par kW
      window.efficaciteElectrique = 1; // Niveau d'efficacité électrique
      window.efficaciteRefroidissement = 0; // Efficacité du refroidissement
      window.prixBTC = 20000; // Prix initial du BTC

      // Listes GPU disponibles (25 modèles)
      window.gpuDisponibles = {
        GTX1050: { hashrate: 10, conso: 75, prix: 150 },
        GTX1050Ti: { hashrate: 12, conso: 75, prix: 170 },
        GTX1060: { hashrate: 15, conso: 120, prix: 200 },
        GTX1070: { hashrate: 25, conso: 150, prix: 300 },
        GTX1070Ti: { hashrate: 28, conso: 180, prix: 350 },
        GTX1080: { hashrate: 30, conso: 180, prix: 400 },
        GTX1080Ti: { hashrate: 35, conso: 220, prix: 500 },
        RTX2060: { hashrate: 40, conso: 160, prix: 400 },
        RTX2060Super: { hashrate: 45, conso: 175, prix: 450 },
        RTX2070: { hashrate: 50, conso: 185, prix: 500 },
        RTX2070Super: { hashrate: 55, conso: 215, prix: 550 },
        RTX2080: { hashrate: 60, conso: 215, prix: 600 },
        RTX2080Super: { hashrate: 65, conso: 250, prix: 700 },
        RTX2080Ti: { hashrate: 70, conso: 260, prix: 1000 },
        RTX3060: { hashrate: 75, conso: 170, prix: 600 },
        RTX3060Ti: { hashrate: 80, conso: 200, prix: 700 },
        RTX3070: { hashrate: 85, conso: 220, prix: 800 },
        RTX3070Ti: { hashrate: 90, conso: 290, prix: 900 },
        RTX3080: { hashrate: 100, conso: 320, prix: 1000 },
        RTX3080Ti: { hashrate: 110, conso: 350, prix: 1200 },
        RTX3090: { hashrate: 120, conso: 350, prix: 1500 },
        RTX3090Ti: { hashrate: 130, conso: 400, prix: 1800 },
        RTX4070: { hashrate: 140, conso: 300, prix: 1600 },
        RTX4080: { hashrate: 150, conso: 320, prix: 2000 },
        RTX4090: { hashrate: 160, conso: 450, prix: 2500 },
      };

      // Niveaux d'amélioration pour l'électricité
      window.niveauxElectricite = {
        1: { efficacite: 1, prix: 0 },
        2: { efficacite: 0.9, prix: 1000 },
        3: { efficacite: 0.8, prix: 2000 },
        4: { efficacite: 0.7, prix: 3000 },
        5: { efficacite: 0.6, prix: 5000 },
      };

      // Niveaux d'amélioration pour le refroidissement
      window.niveauxRefroidissement = {
        1: { efficacite: 0, prix: 0 },
        2: { efficacite: 15, prix: 1000 },
        3: { efficacite: 30, prix: 2000 },
        4: { efficacite: 50, prix: 4000 },
        5: { efficacite: 70, prix: 7000 },
      };

      window.niveauActuelElectricite = 1;
      window.niveauActuelRefroidissement = 1;

      // Fonction pour afficher le titre en ASCII
      window.afficherTitre = function (): void {
        console.log(
          '%c' +
            '███████ ██     ██ ███████     ██████  ██       █████  ██    ██ \n' +
            '██      ██     ██ ██          ██   ██ ██      ██   ██  ██  ██  \n' +
            '███████ ██  █  ██ ███████     ██████  ██      ███████   ████   \n' +
            '     ██ ██ ███ ██      ██     ██      ██      ██   ██    ██    \n' +
            '███████  ███ ███  ███████     ██      ███████ ██   ██    ██    \n' +
            '                                                               \n' +
            '                                                               ',
          'color: green; font-weight: bold;'
        );
      };

      // Fonction pour afficher le message de bienvenue
      window.afficherBienvenue = function (): void {
        window.afficherTitre();
        console.log(
          '%cBienvenue dans GPU Farm Manager !',
          'color: green; font-weight: bold;'
        );
        console.log('Vous commencez avec 1 000€.');
        console.log(
          'Utilisez-les pour acheter des GPU et commencer à miner.\nTapez "aide()" pour voir les commandes disponibles.'
        );
      };

      // Fonction pour afficher l'aide
      window.aide = function (): void {
        console.log('%cCommandes disponibles :', 'color: green;');
        console.log('- aide()');
        console.log('- shop()');
        console.log('- acheterGpu(marque)');
        console.log('- ameliorerElectricite(niveau)');
        console.log('- ameliorerRefroidissement(niveau)');
        console.log('- miner()');
        console.log('- monitorer()');
        console.log('- vendre(ressource)');
        console.log('- checkCoursBTC()');
      };

      // Fonction pour lister la boutique
      window.shop = function (): void {
        console.log('%c--- Boutique ---', 'color: green; font-weight: bold;');
        console.log('%cGPU disponibles :', 'color: green;');
        Object.keys(window.gpuDisponibles).forEach((marque) => {
          const gpu = window.gpuDisponibles[marque];
          console.log(
            `%c${marque} - Hashrate: ${gpu.hashrate} MH/s, Conso: ${gpu.conso}W, Prix: ${gpu.prix}€`,
            'color: green;'
          );
        });
        console.log('\n%cAméliorations d\'électricité :', 'color: green;');
        Object.keys(window.niveauxElectricite).forEach((niveauStr) => {
          const niveau = parseInt(niveauStr);
          if (niveau > window.niveauActuelElectricite) {
            const amelioration = window.niveauxElectricite[niveau];
            console.log(
              `%cNiveau ${niveau} - Efficacité énergétique: ${(
                amelioration.efficacite * 100
              ).toFixed(0)}%, Prix: ${amelioration.prix}€`,
              'color: green;'
            );
          }
        });
        console.log('\n%cAméliorations de refroidissement :', 'color: green;');
        Object.keys(window.niveauxRefroidissement).forEach((niveauStr) => {
          const niveau = parseInt(niveauStr);
          if (niveau > window.niveauActuelRefroidissement) {
            const amelioration = window.niveauxRefroidissement[niveau];
            console.log(
              `%cNiveau ${niveau} - Efficacité de refroidissement: ${amelioration.efficacite}%, Prix: ${amelioration.prix}€`,
              'color: green;'
            );
          }
        });
        console.log(
          '%cPour acheter un GPU, utilisez : acheterGpu("NomDuGPU")',
          'color: green;'
        );
        console.log(
          '%cPour améliorer l\'électricité : ameliorerElectricite(niveau)',
          'color: green;'
        );
        console.log(
          '%cPour améliorer le refroidissement : ameliorerRefroidissement(niveau)',
          'color: green;'
        );
      };

      // Fonction pour acheter un GPU
      window.acheterGpu = function (marque: string): void {
        const gpu = window.gpuDisponibles[marque];
        if (gpu) {
          if (window.argent >= gpu.prix) {
            window.argent -= gpu.prix;
            const nouveauGpu: GPU = {
              id: window.gpuPossedes.length + 1,
              marque: marque,
              ...gpu,
              temp: 30,
              age: 0,
              enMarche: false,
              efficacite: 100, // Efficacité initiale à 100%
            };
            window.gpuPossedes.push(nouveauGpu);
            console.log(
              `%cGPU ${marque} acheté pour ${gpu.prix}€. Reste : ${window.argent}€.`,
              'color: green;'
            );
          } else {
            console.log(
              `%cVous n'avez pas assez d'argent pour acheter ce GPU.`,
              'color: red;'
            );
          }
        } else {
          console.log(`%cGPU ${marque} non disponible.`, 'color: red;');
        }
      };

      // Fonction pour améliorer l'électricité
      window.ameliorerElectricite = function (niveau: number): void {
        const amelioration = window.niveauxElectricite[niveau];
        if (amelioration && niveau > window.niveauActuelElectricite) {
          if (window.argent >= amelioration.prix) {
            window.argent -= amelioration.prix;
            window.niveauActuelElectricite = niveau;
            window.efficaciteElectrique = amelioration.efficacite;
            console.log(
              `%cAmélioration de l'électricité au niveau ${niveau} effectuée. Nouveau solde : ${window.argent}€.`,
              'color: green;'
            );
          } else {
            console.log(
              `%cVous n'avez pas assez d'argent pour cette amélioration.`,
              'color: red;'
            );
          }
        } else {
          console.log(
            `%cAmélioration non disponible ou déjà appliquée.`,
            'color: red;'
          );
        }
      };

      // Fonction pour améliorer le refroidissement
      window.ameliorerRefroidissement = function (niveau: number): void {
        const amelioration = window.niveauxRefroidissement[niveau];
        if (amelioration && niveau > window.niveauActuelRefroidissement) {
          if (window.argent >= amelioration.prix) {
            window.argent -= amelioration.prix;
            window.niveauActuelRefroidissement = niveau;
            window.efficaciteRefroidissement = amelioration.efficacite;
            console.log(
              `%cAmélioration du refroidissement au niveau ${niveau} effectuée. Nouveau solde : ${window.argent}€.`,
              'color: green;'
            );
          } else {
            console.log(
              `%cVous n'avez pas assez d'argent pour cette amélioration.`,
              'color: red;'
            );
          }
        } else {
          console.log(
            `%cAmélioration non disponible ou déjà appliquée.`,
            'color: red;'
          );
        }
      };

      // Fonction pour obtenir le prix du BTC depuis l'API
      window.obtenirPrixBTC = async function (): Promise<void> {
        try {
          const response = await fetch('/api/btc');
          const data = await response.json();
          if (response.status === 429) {
            console.error('Erreur 429: Trop de requêtes. Veuillez réessayer plus tard.');
            console.log(
              `%c ${data.erreur}`,
              'color: red;'
            );
            return;
          }
          window.prixBTC = data.prix;
          console.log(
            `%cLe cours actuel du BTC est de ${window.prixBTC.toFixed(2)}€.`,
            'color: green;'
          );
        } catch (error) {
          console.error('Erreur lors de la récupération du prix du BTC:', error);
          console.log(
            `%cImpossible de récupérer le cours du BTC. Utilisation du prix précédent : ${window.prixBTC.toFixed(
              2
            )}€.`,
            'color: red;'
          );
        }
      };
      
      // Fonction pour vérifier le cours du BTC
      window.checkCoursBTC = function (): void {
        window.obtenirPrixBTC();
      };

      // Fonction pour mettre à jour l'obsolescence des GPU
      window.mettreAJourObsolescence = function (gpu: GPU): void {
        gpu.age += 1;
        if (gpu.age % 5 === 0) {
          gpu.efficacite -= 5; // Perte de 5% d'efficacité tous les 5 cycles
          if (gpu.efficacite < 20) gpu.efficacite = 20; // Efficacité minimale de 20%
        }
      };

      // Fonction pour miner
      window.miner = async function (): Promise<void> {
        if (window.gpuPossedes.length === 0) {
          console.log(
            `%cVous n'avez pas de GPU pour miner. Achetez-en un d'abord.`,
            'color: red;'
          );
          return;
        }

        console.log('%cMinage en cours...', 'color: green;');
        let consommationTotale = 0;

        window.gpuPossedes.forEach((gpu) => {
          gpu.enMarche = true;
          gpu.temp +=
            10 - (window.efficaciteRefroidissement * 10) / 100; // Refroidissement réduit la montée en température
          if (gpu.temp < 30) gpu.temp = 30; // Température minimale ambiante
          if (gpu.temp > 85) {
            console.log(
              `%cALERTE : La température du ${gpu.marque} atteint ${gpu.temp.toFixed(
                1
              )}°C !`,
              'color: red;'
            );
          }
          // Calcul des gains en fonction de l'efficacité
          const gains = (
            (gpu.hashrate * (gpu.efficacite / 100)) /
            1000
          ).toFixed(5);
          window.ressources.BTC += parseFloat(gains);
          consommationTotale += gpu.conso;
          window.mettreAJourObsolescence(gpu);
          console.log(
            `%c${gpu.marque} : Hashrate=${gpu.hashrate} MH/s, Temp=${gpu.temp.toFixed(
              1
            )}°C, Gains=${gains} BTC, Efficacité:${gpu.efficacite}%`,
            'color: green;'
          );
        });

        // Calcul des coûts d'électricité avec l'efficacité énergétique
        const coutElectricite =
          (consommationTotale / 1000) *
          window.coutElectriciteParKW *
          window.efficaciteElectrique;
        window.argent -= coutElectricite;
        console.log(
          `%cCoût d'électricité pour ce cycle : ${coutElectricite.toFixed(
            2
          )}€. Nouveau solde : ${window.argent.toFixed(2)}€.`,
          'color: green;'
        );

        // Mise à jour du prix du BTC
        await window.obtenirPrixBTC();

        // Vérification de l'objectif
        if (window.argent >= window.objectifs.gainCible) {
          console.log(
            '%cFélicitations ! Vous avez atteint votre objectif financier !',
            'color: green; font-weight: bold;'
          );
        }
      };

      // Fonction pour monitorer les GPU
      window.monitorer = function (): void {
        if (window.gpuPossedes.length === 0) {
          console.log(
            `%cVous n'avez pas de GPU. Achetez-en un pour commencer.`,
            'color: red;'
          );
          return;
        }

        window.gpuPossedes.forEach((gpu) => {
          const couleur =
            gpu.temp > 85
              ? 'color: red;'
              : gpu.temp > 70
              ? 'color: yellow;'
              : 'color: green;';
          console.log(
            `%cGPU ID:${gpu.id}, Marque:${gpu.marque}, Temp:${gpu.temp.toFixed(
              1
            )}°C, Age:${gpu.age} cycles, Efficacité:${gpu.efficacite}%`,
            couleur
          );
        });
        console.log(
          `%cSolde en banque : ${window.argent.toFixed(2)}€`,
          'color: green;'
        );
        console.log(
          `%cRessources : ${window.ressources.BTC.toFixed(5)} BTC`,
          'color: green;'
        );
        console.log(
          `%cCours actuel du BTC : ${window.prixBTC.toFixed(2)}€`,
          'color: green;'
        );
      };

      // Fonction pour vendre des ressources
      window.vendre = async function (ressource: string): Promise<void> {
        if (
          window.ressources[ressource as keyof typeof window.ressources] &&
          window.ressources[ressource as keyof typeof window.ressources] > 0
        ) {
          await window.obtenirPrixBTC();

          const montantRessource =
            window.ressources[ressource as keyof typeof window.ressources];
          const gain = montantRessource * window.prixBTC; // Utilise le prix actuel du BTC
          window.argent += gain;
          console.log(
            `%cVous avez vendu ${montantRessource.toFixed(
              5
            )} ${ressource} pour ${gain.toFixed(2)}€. Nouveau solde : ${window.argent.toFixed(
              2
            )}€.`,
            'color: green;'
          );
          window.ressources[ressource as keyof typeof window.ressources] = 0;
        } else {
          console.log(
            `%cVous n'avez pas de ${ressource} à vendre.`,
            'color: red;'
          );
        }
      };

      window.afficherBienvenue();

      console.log(
        '%cPour jouer, tapez des commandes dans la console, par exemple : acheterGpu("GTX1060");',
        'color: green;'
      );

      window.jeuInitialise = true;
    }
  }

  return null;
};

export default Game;
