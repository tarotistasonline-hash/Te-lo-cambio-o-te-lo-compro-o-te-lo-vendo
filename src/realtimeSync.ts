import { BarterOffer, AssemblyProposal, ActivityLog, ResourceType } from './types';

// Let's create an active list of oficios
export const OFICIOS = [
  {
    id: 'agricultor',
    name: 'Agricultor/a',
    emoji: '🌾',
    description: 'Cultivas hortalizas, frutas y cereales en el huerto comunitario, los tejados y solares recuperados.',
    produces: 'food' as ResourceType,
    producesDescription: 'Produce abundantes Alimentos.',
    consumes: 'tools' as ResourceType,
    consumesDescription: 'Necesita Herramientas para arar, sembrar y cosechar.',
    startingResources: { food: 8, health: 3, care: 2, tools: 1, culture: 2 },
    color: 'from-emerald-600 to-emerald-700',
    bgLight: 'bg-emerald-50/50',
    borderClass: 'border-emerald-200'
  },
  {
    id: 'artesano',
    name: 'Artesano/a',
    emoji: '🛠️',
    description: 'Trabajas en el taller del barrio reparando electrodomésticos, tejiendo prendas y fabricando herramientas duraderas.',
    produces: 'tools' as ResourceType,
    producesDescription: 'Produce Herramientas y equipamiento.',
    consumes: 'care' as ResourceType,
    consumesDescription: 'Sufre desgaste físico; necesita Cuidados.',
    startingResources: { food: 2, health: 2, care: 1, tools: 8, culture: 3 },
    color: 'from-amber-600 to-amber-700',
    bgLight: 'bg-amber-50/50',
    borderClass: 'border-amber-200'
  },
  {
    id: 'medico',
    name: 'Médico/a de Barrio',
    emoji: '🏥',
    description: 'Diriges el botiquín autogestionado, elaboras pomadas medicinales, atiendes dolencias y cuidas de la salud comunitaria.',
    produces: 'health' as ResourceType,
    producesDescription: 'Produce Salud, prevención y sanidad.',
    consumes: 'food' as ResourceType,
    consumesDescription: 'Consume Alimentos para sostener su exigente labor.',
    startingResources: { food: 1, health: 8, care: 3, tools: 1, culture: 3 },
    color: 'from-sky-600 to-sky-700',
    bgLight: 'bg-sky-50/50',
    borderClass: 'border-sky-200'
  },
  {
    id: 'artista',
    name: 'Artista y Educador/a',
    emoji: '🎭',
    description: 'Impartes talleres, organizas la biblioteca popular, decoras murales callejeros y diseñas obras de teatro asamblearias.',
    produces: 'culture' as ResourceType,
    producesDescription: 'Produce Cultura, educación y saberes.',
    consumes: 'food' as ResourceType,
    consumesDescription: 'Consume Alimentos para dar vida y arte al vecindario.',
    startingResources: { food: 1, health: 3, care: 2, tools: 1, culture: 8 },
    color: 'from-fuchsia-600 to-fuchsia-700',
    bgLight: 'bg-fuchsia-50/50',
    borderClass: 'border-fuchsia-200'
  },
  {
    id: 'cuidador',
    name: 'Cuidador/a de Red',
    emoji: '❤️',
    description: 'Acompañas a mayores en sus paseos, organizas comidas colectivas, concilias la guardería comunitaria y sostienes la vida.',
    produces: 'care' as ResourceType,
    producesDescription: 'Produce Cuidados y apoyo mutuo.',
    consumes: 'health' as ResourceType,
    consumesDescription: 'Consume Salud para evitar el cansancio y el desgaste emocional.',
    startingResources: { food: 2, health: 1, care: 8, tools: 2, culture: 2 },
    color: 'from-rose-600 to-rose-700',
    bgLight: 'bg-rose-50/50',
    borderClass: 'border-rose-200'
  }
];

// Helper to get oficio by ID
export function getOficioById(id: string) {
  return OFICIOS.find(o => o.id === id) || OFICIOS[0];
}

// Default NPC Vecinos
export const NPC_VECINOS = [
  { id: 'sofia_npc', name: 'Sofía la Hortelana', oficioId: 'agricultor', isNPC: true },
  { id: 'mateo_npc', name: 'Mateo el Herrero', oficioId: 'artesano', isNPC: true },
  { id: 'clara_npc', name: 'Dra. Clara', oficioId: 'medico', isNPC: true },
  { id: 'hugo_npc', name: 'Hugo el Trovador', oficioId: 'artista', isNPC: true },
  { id: 'carmen_npc', name: 'Carmen de la Red', oficioId: 'cuidador', isNPC: true }
];

// Default Initial proposals (projects + crises)
export const DEFAULT_PROPOSALS: AssemblyProposal[] = [
  {
    id: 'crisis_sequia',
    title: '🚨 Crisis: Ola de Calor y Sequía',
    description: 'Una ola de calor extremo marchita las tomateras y frutales. Si no instalamos un Riego Goteo por Gravedad de emergencia, la ciudad perderá Alimentos.',
    creatorId: 'sistema',
    creatorName: 'Comisión del Agua',
    cost: { food: 0, health: 0, care: 4, tools: 6, culture: 0 },
    currentContributions: { food: 0, health: 0, care: 0, tools: 0, culture: 0 },
    benefits: 'Evita la pérdida de 3 Alimentos por persona y suma +2 Apoyo Mutuo para todos los que colaboren.',
    votesYes: ['sofia_npc', 'mateo_npc', 'carmen_npc'],
    votesNo: [],
    status: 'voting',
    isCrisis: true,
    deadlineTurns: 3,
    timestamp: Date.now() - 30000,
    icon: '💧'
  },
  {
    id: 'proj_horno_solar',
    title: '☀️ Horno de Pan Solar Comunitario',
    description: 'Instalar reflectores solares parabólicos en la Plaza Central para amasar y hornear pan de balde de forma ecológica.',
    creatorId: 'sofia_npc',
    creatorName: 'Sofía la Hortelana',
    cost: { food: 2, health: 0, care: 2, tools: 6, culture: 0 },
    currentContributions: { food: 0, health: 0, care: 0, tools: 0, culture: 0 },
    benefits: 'Suma +2 Alimentos permanentes cada turno para toda la asamblea cuando se complete.',
    votesYes: ['sofia_npc', 'hugo_npc'],
    votesNo: [],
    status: 'voting',
    isCrisis: false,
    deadlineTurns: 999,
    timestamp: Date.now() - 20000,
    icon: '🍞'
  },
  {
    id: 'proj_biblioteca_cosas',
    title: '🛠️ Biblioteca de las Cosas',
    description: 'Un local comunitario para compartir taladradoras, tiendas de campaña, proyectores y escaleras. Fomenta el uso sobre la propiedad.',
    creatorId: 'mateo_npc',
    creatorName: 'Mateo el Herrero',
    cost: { food: 0, health: 0, care: 2, tools: 4, culture: 4 },
    currentContributions: { food: 0, health: 0, care: 0, tools: 0, culture: 0 },
    benefits: 'Aumenta en un 25% la tasa de éxito de todas las ofertas de bartering de Herramientas.',
    votesYes: ['mateo_npc', 'hugo_npc', 'carmen_npc'],
    votesNo: [],
    status: 'voting',
    isCrisis: false,
    deadlineTurns: 999,
    timestamp: Date.now() - 10000,
    icon: '♻️'
  }
];

// Default barter offers
export const DEFAULT_OFFERS: BarterOffer[] = [
  {
    id: 'offer_1',
    senderId: 'sofia_npc',
    senderName: 'Sofía la Hortelana',
    senderOficioId: 'agricultor',
    offeredResource: 'food',
    offeredQuantity: 3,
    requestedResource: 'tools',
    requestedQuantity: 1,
    status: 'pending',
    timestamp: Date.now() - 120000,
    isNPC: true
  },
  {
    id: 'offer_2',
    senderId: 'mateo_npc',
    senderName: 'Mateo el Herrero',
    senderOficioId: 'artesano',
    offeredResource: 'tools',
    offeredQuantity: 2,
    requestedResource: 'care',
    requestedQuantity: 2,
    status: 'pending',
    timestamp: Date.now() - 90000,
    isNPC: true
  },
  {
    id: 'offer_3',
    senderId: 'clara_npc',
    senderName: 'Dra. Clara',
    senderOficioId: 'medico',
    offeredResource: 'health',
    offeredQuantity: 2,
    requestedResource: 'food',
    requestedQuantity: 2,
    status: 'pending',
    timestamp: Date.now() - 60000,
    isNPC: true
  }
];

// Default logs
export const DEFAULT_LOGS: ActivityLog[] = [
  {
    id: 'log_1',
    sender: 'Comisión de Bienvenida',
    message: '¡Bienvenidas y bienvenidos a Ciudad-Trueque! Aquí la moneda tradicional ha sido erradicada. Intercambia recursos de forma justa y debate en la asamblea semanal.',
    type: 'system',
    timestamp: Date.now() - 300000,
    badge: 'Utopía'
  },
  {
    id: 'log_2',
    sender: 'Sofía la Hortelana',
    message: '¡Saludos, vecinos! Mi cosecha de calabacines ha sido excelente. Busco una pala fuerte o rastrillo nuevo del taller.',
    type: 'chat',
    timestamp: Date.now() - 250000
  },
  {
    id: 'log_3',
    sender: 'Mateo el Herrero',
    message: 'Tengo yunques y azadas recién forjadas. Mis hombros me matan de martillar todo el día, ¿algún cuidador disponible?',
    type: 'chat',
    timestamp: Date.now() - 200000
  }
];

// BroadcastChannel setup for real-time local multi-tab sync!
const CHANNEL_NAME = 'ciudad_trueque_synergy_channel_v1';
let syncChannel: BroadcastChannel | null = null;

try {
  syncChannel = new BroadcastChannel(CHANNEL_NAME);
} catch (e) {
  console.warn('BroadcastChannel not supported in this client. Falling back to local events.', e);
}

// Function to broadcast event
export function broadcastSyncEvent(type: string, data: any) {
  if (syncChannel) {
    try {
      syncChannel.postMessage({ type, data, tabId: window.name || 'main' });
    } catch (err) {
      console.error('Error posting sync event', err);
    }
  }
  // Also dispatch window custom event for local tab listeners
  const customEvent = new CustomEvent('sync_local_update', { detail: { type, data } });
  window.dispatchEvent(customEvent);
}

// Set up channel receiver
export function subscribeToSyncEvents(onEvent: (type: string, data: any) => void) {
  const handler = (e: MessageEvent) => {
    if (e.data && e.data.type) {
      onEvent(e.data.type, e.data.data);
    }
  };

  if (syncChannel) {
    syncChannel.addEventListener('message', handler);
  }

  const localHandler = (e: Event) => {
    const customE = e as CustomEvent;
    if (customE.detail && customE.detail.type) {
      onEvent(customE.detail.type, customE.detail.data);
    }
  };
  window.addEventListener('sync_local_update', localHandler);

  return () => {
    if (syncChannel) {
      syncChannel.removeEventListener('message', handler);
    }
    window.removeEventListener('sync_local_update', localHandler);
  };
}

// AI NPC Behavior Simulation!
// Let's create a function that handles NPC turn simulation
export function runNpcTurn(
  offers: BarterOffer[],
  proposals: AssemblyProposal[],
  logs: ActivityLog[]
): {
  newOffers: BarterOffer[];
  newProposals: AssemblyProposal[];
  newLogs: ActivityLog[];
} {
  const nextOffers = [...offers];
  const nextProposals = [...proposals];
  const nextLogs = [...logs];

  // Pick a random NPC
  const npc = NPC_VECINOS[Math.floor(Math.random() * NPC_VECINOS.length)];
  const npcOficio = getOficioById(npc.oficioId);

  // 1. NPC Chat Message
  const npcMessages: Record<string, string[]> = {
    agricultor: [
      '¡La lluvia de anoche ayudó bastante al huerto cooperativo!',
      'Necesitamos organizarnos para las heladas tempranas.',
      'Tengo excedentes de patatas ecológicas si alguien necesita comida.'
    ],
    artesano: [
      'He arreglado tres bicicletas en el taller hoy. ¡El transporte libre avanza!',
      '¿Alguien tiene maderas o metal sobrante para forjar herramientas?',
      'Menudo dolor de espalda... Un buen té medicinal o cuidados me vendrían de lujo.'
    ],
    medico: [
      'He preparado un nuevo ungüento de caléndula en el botiquín.',
      'Por favor, recordad ventilar los espacios asamblearios hoy.',
      'Me faltan infusiones calientes para el dispensario, ¿quién tiene comida o plantas?'
    ],
    artista: [
      '¡Mañana hay noche de poesía libertaria en la biblioteca popular! Traed vuestros versos.',
      '¿Diseñamos un mural cooperativo en el muro gris de la fábrica ocupada?',
      'El conocimiento libre es nuestra mejor herramienta.'
    ],
    cuidador: [
      'Hemos preparado sopa caliente en el comedor vecinal para hoy al mediodía.',
      'La guardería comunitaria abre a las 8, gracias por la ayuda.',
      'Un abrazo colectivo a todas las que sostienen el barrio día a día.'
    ]
  };

  const possibleMessages = npcMessages[npc.oficioId] || ['¡Juntos hacemos barrio!'];
  const chatText = possibleMessages[Math.floor(Math.random() * possibleMessages.length)];

  nextLogs.push({
    id: `log_npc_${Date.now()}`,
    sender: npc.name,
    message: chatText,
    type: 'chat',
    timestamp: Date.now()
  });

  // 2. NPC Barter offer creation (50% chance if offers count is small)
  if (Math.random() > 0.4 && nextOffers.filter(o => o.status === 'pending').length < 8) {
    // Generate an offer matching their produces -> consumes
    const offerResource = npcOficio.produces;
    const requestResource = npcOficio.consumes;

    // Create unique id
    const offerId = `offer_npc_${Date.now()}`;
    const newOffer: BarterOffer = {
      id: offerId,
      senderId: npc.id,
      senderName: npc.name,
      senderOficioId: npc.oficioId,
      offeredResource: offerResource,
      offeredQuantity: Math.floor(Math.random() * 2) + 2, // 2-3
      requestedResource: requestResource,
      requestedQuantity: Math.floor(Math.random() * 2) + 1, // 1-2
      status: 'pending',
      timestamp: Date.now(),
      isNPC: true
    };

    nextOffers.push(newOffer);

    nextLogs.push({
      id: `log_trade_npc_${Date.now()}`,
      sender: npc.name,
      message: `Ha publicado una oferta: Ofrece ${newOffer.offeredQuantity}x ${getResourceEmoji(offerResource)} ${getResourceNameSpanish(offerResource)} por ${newOffer.requestedQuantity}x ${getResourceEmoji(requestResource)} ${getResourceNameSpanish(requestResource)}.`,
      type: 'trade',
      timestamp: Date.now()
    });
  }

  // 3. NPC Assembly votes & contributions
  nextProposals.forEach(proposal => {
    if (proposal.status === 'voting' || proposal.status === 'funding') {
      // NPC decides to vote Yes or No if they haven't voted yet
      const voted = proposal.votesYes.includes(npc.id) || proposal.votesNo.includes(npc.id);
      if (!voted) {
        const isBeneficial =
          npcOficio.consumes === proposal.icon || // check if proposal helps their resource needs
          Math.random() > 0.2; // NPCs are generally cooperative

        if (isBeneficial) {
          proposal.votesYes.push(npc.id);
          nextLogs.push({
            id: `log_vote_${Date.now()}_${proposal.id}`,
            sender: 'Asamblea Popular',
            message: `🗳️ ${npc.name} votó SÍ a favor de: "${proposal.title}".`,
            type: 'assembly',
            timestamp: Date.now()
          });
        } else {
          proposal.votesNo.push(npc.id);
          nextLogs.push({
            id: `log_vote_${Date.now()}_${proposal.id}`,
            sender: 'Asamblea Popular',
            message: `🗳️ ${npc.name} votó NO en contra de: "${proposal.title}".`,
            type: 'assembly',
            timestamp: Date.now()
          });
        }
      }

      // If project is in funding phase, NPC can contribute 1 resource of their produced type (80% chance)
      if (proposal.status === 'funding' && Math.random() > 0.2) {
        const prod = npcOficio.produces;
        const needed = (proposal.cost[prod] || 0) - (proposal.currentContributions[prod] || 0);
        if (needed > 0) {
          proposal.currentContributions[prod] += 1;
          nextLogs.push({
            id: `log_contrib_${Date.now()}_${proposal.id}`,
            sender: 'Asamblea Popular',
            message: `🏗️ ${npc.name} aportó 1x ${getResourceEmoji(prod)} ${getResourceNameSpanish(prod)} al proyecto "${proposal.title}".`,
            type: 'assembly',
            timestamp: Date.now()
          });
        }
      }
    }
  });

  return {
    newOffers: nextOffers,
    newProposals: nextProposals,
    newLogs: nextLogs
  };
}

// Helpers for translations and icons
export function getResourceEmoji(res: ResourceType): string {
  switch (res) {
    case 'food': return '🌾';
    case 'health': return '🏥';
    case 'care': return '❤️';
    case 'tools': return '🛠️';
    case 'culture': return '🎭';
    default: return '📦';
  }
}

export function getResourceNameSpanish(res: ResourceType): string {
  switch (res) {
    case 'food': return 'Alimentos';
    case 'health': return 'Salud/Remedios';
    case 'care': return 'Cuidados/Acompañamiento';
    case 'tools': return 'Herramientas/Arreglos';
    case 'culture': return 'Cultura/Educación';
    default: return 'Recurso';
  }
}

export function getResourceColorText(res: ResourceType): string {
  switch (res) {
    case 'food': return 'text-emerald-600';
    case 'health': return 'text-sky-600';
    case 'care': return 'text-rose-600';
    case 'tools': return 'text-amber-600';
    case 'culture': return 'text-fuchsia-600';
    default: return 'text-stone-600';
  }
}

export function getResourceBgClass(res: ResourceType): string {
  switch (res) {
    case 'food': return 'bg-emerald-50 text-emerald-800 border-emerald-100';
    case 'health': return 'bg-sky-50 text-sky-800 border-sky-100';
    case 'care': return 'bg-rose-50 text-rose-800 border-rose-100';
    case 'tools': return 'bg-amber-50 text-amber-800 border-amber-100';
    case 'culture': return 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-100';
    default: return 'bg-stone-50 text-stone-800 border-stone-100';
  }
}
