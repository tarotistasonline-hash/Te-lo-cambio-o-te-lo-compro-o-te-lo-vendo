export type ResourceType = 'food' | 'health' | 'care' | 'tools' | 'culture';

export interface ResourceCost {
  food?: number;
  health?: number;
  care?: number;
  tools?: number;
  culture?: number;
}

export interface Oficio {
  id: string;
  name: string;
  emoji: string;
  description: string;
  produces: ResourceType;
  producesDescription: string;
  consumes: ResourceType;
  consumesDescription: string;
  startingResources: Record<ResourceType, number>;
  color: string;
  bgLight: string;
  borderClass: string;
}

export interface UserProfile {
  uid: string;
  name: string;
  oficioId: string;
  resources: Record<ResourceType, number>;
  supportPoints: number; // replacing currency, earned by helping others
  solidarityScore: number; // score based on cooperativeness
  completedProjectsCount: number;
  hasEthicalLoan: boolean;
  loanAmount: number;
}

export interface BarterOffer {
  id: string;
  senderId: string;
  senderName: string;
  senderOficioId: string;
  offeredResource: ResourceType;
  offeredQuantity: number;
  requestedResource: ResourceType;
  requestedQuantity: number;
  acceptedBy?: string;
  acceptedByName?: string;
  status: 'pending' | 'completed' | 'cancelled';
  timestamp: number;
  isNPC: boolean;
}

export interface AssemblyProposal {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  creatorName: string;
  cost: Record<ResourceType, number>;
  currentContributions: Record<ResourceType, number>;
  benefits: string;
  votesYes: string[]; // List of user IDs
  votesNo: string[];  // List of user IDs
  status: 'voting' | 'funding' | 'completed' | 'failed' | 'rejected';
  isCrisis: boolean; // Urgent global event (e.g. Drought, Winter storm, Epidemic)
  deadlineTurns: number; // Remaining turns to resolve if a crisis
  timestamp: number;
  icon: string;
}

export interface ActivityLog {
  id: string;
  sender: string;
  message: string;
  type: 'chat' | 'trade' | 'assembly' | 'crisis' | 'system';
  timestamp: number;
  badge?: string;
}

export interface GameState {
  turn: number;
  currentCrisis: AssemblyProposal | null;
  crisisTurnsLeft: number;
  activeProposals: AssemblyProposal[];
  marketOffers: BarterOffer[];
  communityProjects: {
    id: string;
    title: string;
    description: string;
    status: 'completed' | 'pending';
    benefit: string;
  }[];
}
