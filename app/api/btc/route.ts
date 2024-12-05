import { NextResponse } from 'next/server';

const cache = new Map<string, { prix: number; timestamp: number }>();
const requestCounts = new Map<string, { count: number; startTime: number }>();
const MAX_REQUESTS_PER_SECOND = 3;
const WINDOW_SIZE_IN_MS = 1000;

export async function GET(req: Request) {
  try {
    const clientIp =
        req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        req.headers.get('x-real-ip') ||
        req.headers.get('remote_addr') ||
        req.headers.get('REMOTE_ADDR') ||
        'unknown';

      const currentTime = Date.now();

      const requestInfo = requestCounts.get(clientIp) || { count: 0, startTime: currentTime };

    if (currentTime - requestInfo.startTime < WINDOW_SIZE_IN_MS) {
      requestInfo.count += 1;
    } else {
      requestInfo.count = 1;
      requestInfo.startTime = currentTime;
    }

    if (requestInfo.count > MAX_REQUESTS_PER_SECOND) {

        const spamResponses = [
            "Vous cliquez plus vite que votre ombre !",
            "Eh là, pas si vite, cowboy !",
            "Même les robots ont besoin d'une pause café.",
            "Patience est mère de toutes les vertus... et des serveurs contents.",
            "Wow, doucement ! Mon processeur commence à chauffer.",
            "Je ne suis pas un supercalculateur, vous savez.",
            "Les bonnes choses viennent à ceux qui attendent.",
            "Trop de demandes ! Un peu de repos s'impose.",
            "Qui va lentement va sûrement... et sans erreurs 429.",
            "Je suis flatté par tant d'attention, mais un peu de modération, s'il vous plaît.",
            "Mon hamster dans la roue a besoin de reprendre son souffle.",
            "Oups, vous avez cassé le bouton refresh ?",
            "Un moment, j'installe le turbo.",
            "La surchauffe menace ! Merci de ralentir.",
            "Même les serveurs ont besoin de vacances.",
            "Je vois que vous êtes impatient, mais moi je suis un peu fatigué.",
            "Pas si vite ! Je n'ai que deux mains électroniques.",
            "Vous me faites tourner la tête avec toutes ces requêtes.",
            "Attention, trop de clics peuvent causer des étincelles !",
            "C'est pas Versailles ici, économisez les requêtes.",
            "Vous avez réveillé le gardien des taux, il vous demande de ralentir.",
            "Trop de zèle peut nuire à la santé... du serveur.",
            "Si vous continuez à cliquer, je vais finir par rougir.",
            "Une pause s'impose, non ?",
            "Even les machines ont besoin de respirer un peu.",
            "Allons, un peu de patience, je fais de mon mieux !",
            "Vous êtes sur le point de battre le record de clics par minute.",
            "Je vois que vous aimez cliquer, mais pensez à moi.",
            "Lentement mais sûrement, c'est le chemin de la sagesse.",
            "Doucement, on n'est pas pressé !",
            "Oh là là, trop de requêtes !",
            "Hé, ce n'est pas une course de vitesse !",
            "Un à la fois, s'il vous plaît !",
            "Calmez-vous, je ne vais pas m'enfuir !"
        ];
    
        const getRandomSpamResponse = () => {
            return spamResponses[Math.floor(Math.random() * spamResponses.length)];
        };

        return NextResponse.json(
            { erreur: getRandomSpamResponse() },
            { status: 429 }
        );
    }

    
    requestCounts.set(clientIp, requestInfo);

    const cachedData = cache.get('bitcoinPrice');
    if (cachedData && currentTime - cachedData.timestamp < 60 * 1000) {
      return NextResponse.json({ prix: cachedData.prix });
    }

    let prix = null;

    // Tentative 1
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur'
      );
      const data = await response.json();
      prix = data.bitcoin.eur;
    } catch (error) {
      console.error('Erreur avec CoinGecko:', error);
    }

    // Fallback Tentative 2
    if (!prix) {
      try {
        const response = await fetch('https://api.coinpaprika.com/v1/tickers/btc-bitcoin');
        const data = await response.json();
        prix = data.quotes.EUR.price;
      } catch (error) {
        console.error('Erreur avec CoinPaprika:', error);
      }
    }

    // Fallback Tentative 3
    if (!prix) {
      try {
        const response = await fetch(
          'https://api.coinbase.com/v2/exchange-rates?currency=BTC'
        );
        const data = await response.json();
        prix = parseFloat(data.data.rates.EUR);
      } catch (error) {
        console.error('Erreur avec Coinbase:', error);
      }
    }

    //Ici on dit Merde !!!!!!
    if (!prix) {
      throw new Error('Impossible de récupérer le prix du Bitcoin.');
    }

    // Mettre à jour le cache
    cache.set('bitcoinPrice', { prix, timestamp: currentTime });

    return NextResponse.json({ prix });
  } catch (error) {
    console.error('Erreur lors de la récupération du prix du BTC:', error);
    return NextResponse.json(
      {
        error:
          "Oups ! La Smart World Systems Corporation n'est pas en mesure de récupérer le prix du BTC !",
      },
      { status: 500 }
    );
  }
}