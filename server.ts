import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "db.json");

// Initialize Gemini client with user-agent
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});

app.use(express.json());

// Initialize Database if not exists
function initDB() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      visits: {
        total: 1420, // Seed a realistic starting view count
        sessionIds: [] as string[]
      },
      publications: [
        {
          id: "pub_1",
          type: "offer",
          title: "Bicicleta Rodado 26 Shimano",
          category: "Deportes & Aire Libre",
          condition: "Usado",
          dealType: "Solo Trueque",
          description: "Bicicleta rodado 26 en muy buen estado general. Tiene cambios de 18 velocidades Shimano (falta regular un poco el descarrilador trasero pero anda bárbaro). La cambio por herramientas de carpintería (sierra caladora, cepillo de mano) o alguna amoladora angular.",
          location: { lat: -34.5889, lng: -58.4306, name: "Palermo, CABA" },
          contactPhone: "+5491112345678",
          contactName: "Carlos R.",
          imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop",
          timestamp: Date.now() - 3600000 * 24 * 3, // 3 days ago
          views: 45
        },
        {
          id: "pub_2",
          type: "offer",
          title: "PlayStation 3 Slim 250GB (2 Joysticks)",
          category: "Tecnología & Videojuegos",
          condition: "Usado / Muy bueno",
          dealType: "Intercambio (ya que puede no ser trueque)",
          description: "Consola PS3 Slim de 250GB, viene flasheada con Hen, incluye 2 joysticks originales en perfecto estado y 5 juegos físicos (GTA V, FIFA 19, Uncharted 3). La vendo por ARS 90.000 o la permuto/cambio por celular Android de igual valor.",
          location: { lat: -34.6621, lng: -58.3653, name: "Avellaneda, GBA Sur" },
          contactPhone: "+5491123456789",
          contactName: "Sofía M.",
          imageUrl: "https://images.unsplash.com/photo-1507457379470-08b8006b2245?w=600&auto=format&fit=crop",
          timestamp: Date.now() - 3600000 * 12, // 12 hours ago
          views: 78
        },
        {
          id: "pub_3",
          type: "offer",
          title: "Mesa y 4 Sillas de Algarrobo macizo",
          category: "Hogar & Muebles",
          condition: "Usado / Buen estado",
          dealType: "Solo Trueque",
          description: "Mesa de comedor de algarrobo macizo pesada, con 4 sillas haciendo juego. Tienen algunos detalles lógicos del uso diario, pero la madera está súper sana y firme. Ideal para quinchos o comedores familiares. La canjeo por cocina a gas de 4 hornallas que funcione impecable.",
          location: { lat: -34.6514, lng: -58.6212, name: "Morón, GBA Oeste" },
          contactPhone: "+5491134567890",
          contactName: "Juan Ignacio",
          imageUrl: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=600&auto=format&fit=crop",
          timestamp: Date.now() - 3600000 * 48, // 2 days ago
          views: 32
        },
        {
          id: "pub_4",
          type: "search",
          title: "Busco Guitarra Acústica o Criolla",
          category: "Música & Instrumentos",
          condition: "No especificado",
          dealType: "Servicio por Producto",
          description: "Hola vecinos! Estoy buscando una guitarra acústica o criolla básica para empezar a aprender música. Ofrezco a cambio mis servicios profesionales: puedo diseñarte una página web landing completa para tu emprendimiento, o dar clases particulares de matemáticas/física para nivel secundario.",
          location: { lat: -34.6211, lng: -58.3731, name: "San Telmo, CABA" },
          contactPhone: "+5491145678901",
          contactName: "Lucas S.",
          imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop",
          timestamp: Date.now() - 3600000 * 6, // 6 hours ago
          views: 19
        },
        {
          id: "pub_5",
          type: "offer",
          title: "Cochecito de Bebé Graco + Huevito",
          category: "Bebés & Niños",
          condition: "Usado / Como nuevo",
          dealType: "Trueque por Consumibles",
          description: "Cochecito para bebé marca Graco de plegado rápido a una mano, súper liviano y práctico. Incluye el huevito compatible homologado para el auto con base. Todo limpio y en excelente estado. Lo cambio por pañales talle G/XG (preferiblemente Pampers/Huggies) o mercadería de almacén no perecedera por valor equivalente.",
          location: { lat: -34.5322, lng: -58.4754, name: "Vicente López, GBA Norte" },
          contactPhone: "+5491156789012",
          contactName: "Marta R.",
          imageUrl: "https://images.unsplash.com/photo-1594782078968-2b07656d7bb2?w=600&auto=format&fit=crop",
          timestamp: Date.now() - 3600000 * 30, // 30 hours ago
          views: 52
        },
        {
          id: "pub_6",
          type: "offer",
          title: "Samsung Galaxy A32 128GB Liberado",
          category: "Tecnología & Videojuegos",
          condition: "Usado / Muy bueno",
          dealType: "Intercambio (ya que puede no ser trueque)",
          description: "Celular Samsung A32 con 128GB de almacenamiento interno y 4GB de RAM. Liberado para cualquier compañía de telefonía. La pantalla no tiene ninguna raya porque siempre se usó con vidrio templado y funda protectora. Permuto/cambio por herramientas eléctricas (taladro percutor de marca Bosch/Dewalt, o sierra circular).",
          location: { lat: -34.7245, lng: -58.2612, name: "Quilmes, GBA Sur" },
          contactPhone: "+5491167890123",
          contactName: "Gabriel P.",
          imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop",
          timestamp: Date.now() - 3600000 * 4, // 4 hours ago
          views: 61
        }
      ],
      blogPosts: [
        {
          id: "post_1",
          title: "¡Mi primer trueque exitoso en CABA!",
          content: "Hola a todos! Quería compartir mi felicidad por haber concretado mi primer trueque a través de la plataforma. Canjeé una cafetera de filtro que tenía acumulando tierra por un juego de herramientas de jardinería para mis plantas. Coordinamos el punto de encuentro en la Plaza Almagro, todo fue súper seguro, transparente y libre de dinero. ¡Qué hermosa iniciativa vecinal para darle una segunda vida a las cosas!",
          author: "Alejandra Gómez",
          category: "Testimonio",
          timestamp: Date.now() - 3600000 * 72,
          likes: 38
        },
        {
          id: "post_2",
          title: "Recomendaciones para concretar canjes seguros",
          content: "Para que nuestra red siga siendo segura y de confianza mutua, les sugerimos seguir estas pautas al coordinar un trueque:\n\n1. Coordinen siempre en puntos públicos y concurridos (plazas principales, esquinas de avenidas, cercanía a estaciones de subte/tren) y preferentemente durante el día.\n2. Si el producto es tecnológico o mecánico, pónganse de acuerdo para probarlo brevemente en un café con conexión.\n3. Es aconsejable avisarle a algún familiar/amigo del encuentro o ir acompañado/a.\n4. Revisen detalladamente el producto antes de finalizar. ¡Cuidar de nosotros es cuidar la red comunitaria!",
          author: "Mesa de Coordinación",
          category: "Consejo",
          timestamp: Date.now() - 3600000 * 48,
          likes: 45
        },
        {
          id: "post_3",
          title: "Este Sábado: Gran Feria del Canje en Vicente López",
          content: "Estimada comunidad, este sábado desde las 14:30 hs nos autoconvocamos en el Paseo de la Costa de Vicente López (altura Urquiza) para una gran jornada de feria e intercambio libre de dinero. Traé mantas, ropa que ya no uses, libros, plantines de tu jardín, arte, conservas caseras o lo que tengas para circular. La idea es pasar una tarde genial y fortalecer los lazos cooperativos locales. ¡No te la pierdas!",
          author: "Colectivo Trueque Norte",
          category: "Evento",
          timestamp: Date.now() - 3600000 * 12,
          likes: 29
        }
      ],
      messages: [] as any[]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf8");
    console.log("Seeded database successfully at db.json");
  }
}

initDB();

function readData() {
  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading database", err);
    return { visits: { total: 0, sessionIds: [] }, publications: [], blogPosts: [], messages: [] };
  }
}

function writeData(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing database", err);
  }
}

// ----------------------
// API ROUTES
// ----------------------

// 1. Visit Counter (with exclusion of owner/self and duplicate sessions)
app.get("/api/visits", (req, res) => {
  const data = readData();
  res.json({ totalVisits: data.visits.total });
});

app.post("/api/visits/increment", (req, res) => {
  const { sessionId, isOwner } = req.body;
  const data = readData();

  if (isOwner === true) {
    // Exclude owner's visits
    return res.json({ totalVisits: data.visits.total, status: "ignored_owner" });
  }

  if (!sessionId) {
    return res.status(400).json({ error: "sessionId is required" });
  }

  // Check if session has already been counted in the session list
  if (!data.visits.sessionIds.includes(sessionId)) {
    data.visits.total += 1;
    data.visits.sessionIds.push(sessionId);
    
    // Keep session IDs list capped to avoid file size bloating (keep last 500 unique sessions)
    if (data.visits.sessionIds.length > 500) {
      data.visits.sessionIds.shift();
    }
    
    writeData(data);
    res.json({ totalVisits: data.visits.total, status: "incremented" });
  } else {
    res.json({ totalVisits: data.visits.total, status: "ignored_duplicate" });
  }
});

// 2. Publications API
app.get("/api/publications", (req, res) => {
  const data = readData();
  res.json(data.publications);
});

app.post("/api/publications", (req, res) => {
  const { type, title, category, condition, dealType, description, location, contactPhone, contactName, imageUrl } = req.body;
  
  if (!title || !description || !contactPhone || !contactName) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const data = readData();
  const newPub = {
    id: "pub_" + Date.now(),
    type: type || "offer",
    title,
    category: category || "Otros",
    condition: condition || "No especificado",
    dealType: dealType || "Solo Trueque",
    description,
    location: location || { lat: -34.6037, lng: -58.3816, name: "CABA" },
    contactPhone,
    contactName,
    imageUrl: imageUrl || "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop",
    timestamp: Date.now(),
    views: 0
  };

  data.publications.unshift(newPub);
  writeData(data);
  res.status(201).json(newPub);
});

// Increment per-publication views
app.post("/api/publications/:id/view", (req, res) => {
  const { id } = req.params;
  const { isOwner } = req.body;
  const data = readData();
  const pub = data.publications.find((p: any) => p.id === id);
  if (pub) {
    if (isOwner !== true) {
      pub.views = (pub.views || 0) + 1;
      writeData(data);
    }
    res.json({ id: pub.id, views: pub.views });
  } else {
    res.status(404).json({ error: "Publication not found" });
  }
});

// 3. Blog Posts API
app.get("/api/blog", (req, res) => {
  const data = readData();
  res.json(data.blogPosts);
});

app.post("/api/blog", (req, res) => {
  const { title, content, author, category } = req.body;
  
  if (!title || !content || !author) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const data = readData();
  const newPost = {
    id: "post_" + Date.now(),
    title,
    content,
    author,
    category: category || "Comunidad",
    timestamp: Date.now(),
    likes: 0
  };

  data.blogPosts.unshift(newPost);
  writeData(data);
  res.status(201).json(newPost);
});

app.post("/api/blog/:id/like", (req, res) => {
  const { id } = req.params;
  const data = readData();
  const post = data.blogPosts.find((p: any) => p.id === id);
  if (post) {
    post.likes = (post.likes || 0) + 1;
    writeData(data);
    res.json({ id: post.id, likes: post.likes });
  } else {
    res.status(404).json({ error: "Blog post not found" });
  }
});

// 4. Integrated Chat / Message API
app.get("/api/messages", (req, res) => {
  const data = readData();
  res.json(data.messages || []);
});

app.post("/api/messages", (req, res) => {
  const { senderId, senderName, receiverId, message, publicationId } = req.body;

  if (!senderId || !senderName || !message) {
    return res.status(400).json({ error: "Sender info and message text are required" });
  }

  const data = readData();
  const newMsg = {
    id: "msg_" + Date.now(),
    senderId,
    senderName,
    receiverId: receiverId || "general",
    message,
    publicationId: publicationId || "general",
    timestamp: Date.now()
  };

  if (!data.messages) {
    data.messages = [];
  }

  data.messages.push(newMsg);
  writeData(data);
  res.status(201).json(newMsg);
});

// AI Valuation Suggestion Endpoint
app.post("/api/suggest-valuation", async (req, res) => {
  const { title, category, condition, description, brand, originalPrice, yearsOwned, extraDetails, imageUrl, itemType } = req.body;

  if (!title) {
    return res.status(400).json({ error: "El título es obligatorio para realizar una valuación." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "La API Key de Gemini no está configurada en este entorno de AI Studio. Por favor, agregala en Settings > Secrets."
    });
  }

  try {
    let imagePart: any = null;
    if (imageUrl) {
      try {
        if (imageUrl.startsWith("data:image/")) {
          const matches = imageUrl.match(/^data:([^;]+);base64,(.+)$/);
          if (matches) {
            imagePart = {
              inlineData: {
                mimeType: matches[1],
                data: matches[2]
              }
            };
          }
        } else if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
          const imgRes = await fetch(imageUrl);
          if (imgRes.ok) {
            const buffer = await imgRes.arrayBuffer();
            const base64 = Buffer.from(buffer).toString("base64");
            const mimeType = imgRes.headers.get("content-type") || "image/jpeg";
            imagePart = {
              inlineData: {
                mimeType,
                data: base64
              }
            };
          }
        }
      } catch (err) {
        console.error("Error processing image for Gemini valuation:", err);
      }
    }

    const prompt = `Analizá el siguiente artículo usado para sugerir un rango de precios razonable y sugerencias de trueque equivalentes en la economía popular actual de Argentina (CABA y Conurbano):

Detalles del Producto:
- Tipo de artículo: ${itemType === "unbranded" ? "Artículo sin marca ni modelo específico (ej: adorno, bijouterie, ropa común, zapatos, libros, etc.)" : "Producto con Marca/Modelo específico"}
- Título: ${title}
- Categoría: ${category || "Otros"}
- Estado declarado: ${condition || "Usado"}
- Descripción: ${description || "Sin descripción"}
${brand ? `- Marca/Fabricante: ${brand}` : ""}
${originalPrice ? `- Precio original aproximado: $${originalPrice} ARS` : ""}
${yearsOwned ? `- Años de antigüedad/uso: ${yearsOwned}` : ""}
${extraDetails ? `- Detalles adicionales sobre el desgaste o funcionamiento: ${extraDetails}` : ""}

${imagePart ? "Se adjunta una foto real del producto. Por favor, analizá la imagen detalladamente para evaluar su calidad visual, grado de desgaste, autenticidad y características estéticas (como colores, materiales, confección o diseño si es ropa, bijouterie u adornos) para estimar de forma extremadamente realista su precio actual en el mercado de usados de Argentina." : ""}

Por favor estimá el rango de precios en Pesos Argentinos (ARS) considerando la inflación actual y la depreciación típica de productos usados según su estado.
Además, dado que es una plataforma de trueques ("Ciudad-Trueque"), sugerí al menos 3 o 4 objetos o servicios que tengan un valor de mercado equivalente por los cuales el usuario podría cambiar este artículo en el barrio.`;

    const textPart = { text: prompt };
    const contents = imagePart ? { parts: [imagePart, textPart] } : { parts: [textPart] };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: `Sos un experto tasador de la economía popular argentina y de plataformas de trueque como el Club del Trueque. Conocés muy bien los precios de mercado actuales de artículos usados en Buenos Aires (CABA y Conurbano). Tu tono es amigable, empático y servicial. Ayudás a vecinos que no tienen idea de qué precio ponerle a sus pertenencias usadas (sean electrodomésticos con marca o ropa común, adornos de feria, bijouterie, etc.) para venderlas rápido o cambiarlas justamente. Si se provee una imagen, analizá con máxima precisión sus características visuales para afinar tu tasación. Deberás devolver SIEMPRE un JSON válido estructurado según el esquema solicitado.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            estimatedValueMin: { 
              type: Type.INTEGER, 
              description: "Valor mínimo estimado para la venta rápida en pesos argentinos (ARS)" 
            },
            estimatedValueMax: { 
              type: Type.INTEGER, 
              description: "Valor máximo estimado para la venta en pesos argentinos (ARS)" 
            },
            recommendedPrice: { 
              type: Type.INTEGER, 
              description: "Precio recomendado sugerido para publicar en pesos argentinos (ARS)" 
            },
            conditionAnalysis: { 
              type: Type.STRING, 
              description: "Un análisis breve, cálido y conciso de cómo el estado, la apariencia visual (si hay foto), y los detalles afectan su valor actual (en español argentino coloquial)." 
            },
            barterSuggestions: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Una lista de 3 o 4 artículos o servicios de trueque equivalentes y populares en Argentina (ej. 'Un caloventor funcionando bien', 'Bolsón de verduras agroecológicas + mercadería', 'Corte de pelo y tintura a domicilio')."
            },
            tipsForSale: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 consejos breves y prácticos para sacarle el máximo provecho o negociar de manera segura en el conurbano/CABA."
            }
          },
          required: ["estimatedValueMin", "estimatedValueMax", "recommendedPrice", "conditionAnalysis", "barterSuggestions", "tipsForSale"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No se pudo obtener una respuesta de tasación.");
    }

    const valuationData = JSON.parse(text.trim());
    res.json(valuationData);
  } catch (err: any) {
    console.error("Error en tasación con Gemini:", err);
    res.status(500).json({ error: "Hubo un error al calcular la valuación con IA: " + err.message });
  }
});

// ----------------------
// VITE AND STATIC SERVING SETUP
// ----------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Dev Mode: Integrate Vite Middlewares
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode: Serve static files from /dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} [${process.env.NODE_ENV || "development"}]`);
  });
}

startServer();
