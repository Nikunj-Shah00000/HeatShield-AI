export type RiskLevel = 'Safe' | 'Moderate' | 'High' | 'Severe' | 'Extreme';

export interface Ward {
  wardId: string;
  wardName: string;
  riskLevel: RiskLevel;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  solarRadiation: number;
  wbgt: number;
  utci: number;
  population: number;
  elderlyPopulation: number;
  childrenPopulation: number;
  outdoorWorkerPopulation: number;
  hospitalizationRisk: number;
  mortalityRisk: number;
  reason: string;
  center: [number, number];
}

export interface ForecastDay {
  day: string;
  date: string;
  temperature: number;
  feelsLike: number;
  wbgt: number;
  utci: number;
  risk: RiskLevel;
  peak: string;
}

export interface ActionItem {
  title: string;
  trigger: string;
  department: string;
  priority: 'Critical' | 'High' | 'Medium';
  status: 'Active' | 'Ready' | 'Dispatched' | 'Broadcasted';
  detail: string;
}

export interface AlertItem {
  ward: string;
  severity: 'Critical' | 'High' | 'Moderate' | 'Resolved';
  reason: string;
  time: string;
  affected: string;
  action: string;
  status: string;
}

export interface ResourceItem {
  type: string;
  total: number;
  active: number;
  available: number;
  capacity: string;
  utilization: number;
  location: string;
  status: 'Active' | 'Ready' | 'Full' | 'Offline';
}
