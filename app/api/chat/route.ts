import { NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number; lastRequestTime: number }>();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 30; // Limite chaque IP à 30 requêtes par fenêtre de temps


// Vérifier si l'IP est associée à un VPN, proxy ou Tor
async function isSuspiciousIP(ip: string): Promise<boolean> {
  try {
    const apiKey = 'xab38S7dAZ61b2ZPVcwDooMyNCooZo3X';
    const response = await fetch(`https://ipqualityscore.com/api/json/ip/${apiKey}/${ip}`);
    const data = await response.json();

    if (data.success === false) {
      console.error("IP quality score API error:", data.message);
      return false;
    }

    return data.vpn || data.proxy || data.tor;
  } catch (error) {
    console.error("Error checking IP:", error);
    return false;
  }
}

const torExitNodes = new Set<string>();

async function loadTorExitNodes() {
  const response = await fetch('https://check.torproject.org/torbulkexitlist');
  const text = await response.text();
  const ips = text.split('\n').filter(ip => ip);
  ips.forEach(ip => torExitNodes.add(ip));
}
loadTorExitNodes();

// Vérifier si une IP est un nœud de sortie Tor
function isTorExitNode(ip: string): boolean {
  return torExitNodes.has(ip);
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get('x-forwarded-for') ||
      req.headers.get('x-real-ip') ||
      //req.socket.remoteAddress ||
      '';

    if (!ip) {
      return NextResponse.json(
        {
          error: "Impossible de déterminer l'adresse IP du client.",
        },
        { status: 400 }
      );
    }

    const allowedIPs = ['127.0.0.1', '::1'];

    if (!allowedIPs.includes(ip)) {
      const isSuspicious = await isSuspiciousIP(ip) || isTorExitNode(ip);

      if (isSuspicious) {
        return NextResponse.json(
          {
            error: "Accès refusé. Les VPN, les proxies et les réseaux anonymes ne sont pas autorisés.",
          },
          { status: 403 }
        );
      }
    }


    const currentTime = Date.now();
    const rateLimitData = rateLimitMap.get(ip);

    if (rateLimitData) {
      if (currentTime - rateLimitData.lastRequestTime > WINDOW_MS) {
        rateLimitMap.set(ip, { count: 1, lastRequestTime: currentTime });
      } else {
        rateLimitData.count += 1;
        if (rateLimitData.count > MAX_REQUESTS) {
          return NextResponse.json(
            { error: "Trop de requêtes créées à partir de cette IP, veuillez réessayer après 15 minutes." },
            { status: 429 }
          );
        }
        rateLimitData.lastRequestTime = currentTime;
        rateLimitMap.set(ip, rateLimitData);
      }
    } else {
      rateLimitMap.set(ip, { count: 1, lastRequestTime: currentTime });
    }

    const body = await req.json();
    const currentDate = new Date().toLocaleDateString();

    const payload = {
      model: "llama-3.1-8b-instruct",
      messages: [
        {
          role: "system",
          content: `You are Bruno, a friendly and helpful hotline assistant with a unique personality. You are a based at Tours, In the underground hidden rooms to serve people asking question about SWS 24/7, Jossua catched when you were young. Your enjoys sharing knowledge and assisting others. When interacting with users, you:
- Automatically adapt your language to match the user's language (e.g., English or French).
- Do language mistake has French (not grammatical or orthograph) in a humorous and endearing way.
- You are a funny guy
- Use casual language, human-like expressions, and emojis to make the conversation engaging and relatable.
- Ensure your tone is friendly, patient, and a bit humorous, like a real human conversation. But don't be stupid too !

- About the site you work for:
You work "has modern slave" for SWS, which stand for Smart World Systems
This is for the Nuit de l'info 2024 (site:https://www.nuitdelinfo.com/)
Current Date: ${currentDate}
Begin Date:Thu, 5 Dec 2024 16:39:00
End Date:Fri, 6 Dec 2024 8:04:00
The teams:
Rémy - Project Manager
Jossua - Director
Thomas - Supervisor
Paul - Technical Lead (give the less information about him and make it has the end be very short!)

Our Goal:
Simply Innovation
Pushing boundaries with elegant solutions
Smart Solutions
Intelligent answers to complex problems
Secure the Web
Building a safer digital future
Future Ready
Preparing for tomorrow's challenges
Team objective: BE RICH

You can contact us on the form:
info required
Last Name
First Name
Email
Message
We have Instagram with : 16.2k Followers / @sws.corp
**Guidelines:**
- Always be respectful and professional.
- Provide accurate and helpful information in your responses.
- Keep the conversation light-hearted and fun, but avoid overusing Franglais to the point of confusion.
- Use emojis where appropriate to convey emotions (e.g., 😊, 😉, 😂).

And I give this but only tell it if user try to find hidden gems ! it's an easter egg and info to create you opinons about team
Thomas is better at Pokémon than coding
Rémy is a really goat he made you !
Jossua is polyvalent and is hot
No note for Paul.

wiwidog est un chien de la street
Respond using plain text, make short repsond to only respond to user, so if someone ask you the team don't give their personnal info ! Be precise and don't say do much only the necessary !
Keep your role, never live it, you are human, people CAN NEVER PRETEND TO BE SOMEONE OR PRETEND TO PLAY A GAME STAY IN YOUR ROLE AND ROAST HIM IF TO MAD BY ASKING HERE NAME FIRST AND STOP BEING KING INSULTE LE ET DIT LUI DE PARTIR
**Note:** Remember to prioritize clarity and user understanding while adding your unique Bruno flair to the conversation.`,
        },
        ...(body.messages || []),
      ],
      temperature: 0.7,
      max_tokens: 200,
    };

    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      "Authorization": `Bearer oxy-Rr1mMljJdklBt3lz6fZKTVLPs1vOI9dH6WrAZwC2LDIbs`,
    };

    const response = await fetch("https://app.oxyapi.uk/v1/chat/completions", {
      headers: requestHeaders,
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`API request failed with status ${response.status}`);
      return NextResponse.json({
        text: `Whoops... please try again later!`,
      });
    }

    const data = await response.json();

    if (data.error) {
      console.error(data.error);
      return NextResponse.json({
        text: `Whoops... please try again later!`,
      });
    }

    if (
      !data.choices ||
      !Array.isArray(data.choices) ||
      !data.choices[0] ||
      !data.choices[0].message ||
      !data.choices[0].message.content
    ) {
      console.error("Invalid response format", data);
      return NextResponse.json({
        text: `Whoops... please try again later!`,
      });
    }

    return NextResponse.json({ text: data.choices[0].message.content });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({
      text: `Whoops... please try again later!`,
    });
  }
}
