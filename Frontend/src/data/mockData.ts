import type { ActionItem, AlertItem, ForecastDay, ResourceItem, Ward } from '@/types/dashboard';

export const wards: Ward[] = [
  { wardId: 'W-23', wardName: 'Shastri Nagar', riskLevel: 'High', temperature: 35.6, feelsLike: 41.7, humidity: 62, windSpeed: 6.2, solarRadiation: 780, wbgt: 31.4, utci: 41.7, population: 124560, elderlyPopulation: 16890, childrenPopulation: 14520, outdoorWorkerPopulation: 11245, hospitalizationRisk: 8.4, mortalityRisk: 18.6, reason: 'High outdoor-worker exposure', center: [28.675, 77.17] },
  { wardId: 'W-25', wardName: 'Anand Parbat', riskLevel: 'Severe', temperature: 38.9, feelsLike: 45.1, humidity: 58, windSpeed: 4.8, solarRadiation: 846, wbgt: 33.2, utci: 45.1, population: 148260, elderlyPopulation: 19400, childrenPopulation: 16220, outdoorWorkerPopulation: 15230, hospitalizationRisk: 11.2, mortalityRisk: 23.8, reason: 'Dense built-up area and low tree cover', center: [28.656, 77.152] },
  { wardId: 'W-12', wardName: 'Karol Bagh', riskLevel: 'Severe', temperature: 39.8, feelsLike: 46.3, humidity: 56, windSpeed: 4.1, solarRadiation: 872, wbgt: 34.1, utci: 46.3, population: 156480, elderlyPopulation: 21100, childrenPopulation: 17440, outdoorWorkerPopulation: 13680, hospitalizationRisk: 12.8, mortalityRisk: 25.1, reason: 'High density with elevated night heat', center: [28.651, 77.19] },
  { wardId: 'W-15', wardName: 'Paharganj', riskLevel: 'Extreme', temperature: 41.2, feelsLike: 48.6, humidity: 53, windSpeed: 3.7, solarRadiation: 918, wbgt: 35.7, utci: 48.6, population: 182420, elderlyPopulation: 22860, childrenPopulation: 19020, outdoorWorkerPopulation: 17900, hospitalizationRisk: 15.4, mortalityRisk: 30.6, reason: 'Extreme heat with heavy footfall', center: [28.645, 77.21] },
  { wardId: 'W-16', wardName: 'Chandni Chowk', riskLevel: 'Extreme', temperature: 42.1, feelsLike: 49.2, humidity: 51, windSpeed: 3.4, solarRadiation: 934, wbgt: 36.2, utci: 49.2, population: 190250, elderlyPopulation: 26400, childrenPopulation: 20180, outdoorWorkerPopulation: 18560, hospitalizationRisk: 17.1, mortalityRisk: 34.2, reason: 'Extreme heat and vulnerable traders', center: [28.657, 77.23] },
  { wardId: 'W-31', wardName: 'Laxmi Nagar', riskLevel: 'High', temperature: 37.2, feelsLike: 43.4, humidity: 60, windSpeed: 5.4, solarRadiation: 802, wbgt: 32.1, utci: 43.4, population: 174800, elderlyPopulation: 21300, childrenPopulation: 23200, outdoorWorkerPopulation: 14300, hospitalizationRisk: 9.8, mortalityRisk: 20.3, reason: 'High exposure around transit corridors', center: [28.631, 77.278] },
  { wardId: 'W-08', wardName: 'Civil Lines', riskLevel: 'Moderate', temperature: 34.8, feelsLike: 39.5, humidity: 60, windSpeed: 7.1, solarRadiation: 720, wbgt: 29.8, utci: 39.5, population: 98500, elderlyPopulation: 14300, childrenPopulation: 10200, outdoorWorkerPopulation: 6400, hospitalizationRisk: 5.2, mortalityRisk: 12.4, reason: 'Protected by mature tree canopy', center: [28.683, 77.225] },
  { wardId: 'W-04', wardName: 'Rohini', riskLevel: 'Moderate', temperature: 35.1, feelsLike: 40.2, humidity: 57, windSpeed: 6.8, solarRadiation: 746, wbgt: 30.1, utci: 40.2, population: 164200, elderlyPopulation: 18600, childrenPopulation: 24500, outdoorWorkerPopulation: 9800, hospitalizationRisk: 6.1, mortalityRisk: 14.5, reason: 'Growing built-up edge', center: [28.735, 77.105] },
  { wardId: 'W-28', wardName: 'South Extension', riskLevel: 'Safe', temperature: 33.4, feelsLike: 37.6, humidity: 55, windSpeed: 8.2, solarRadiation: 690, wbgt: 28.7, utci: 37.6, population: 106500, elderlyPopulation: 17000, childrenPopulation: 11500, outdoorWorkerPopulation: 4200, hospitalizationRisk: 3.6, mortalityRisk: 8.9, reason: 'Higher green cover and airflow', center: [28.562, 77.22] },
];

export const forecast: ForecastDay[] = [
  { day: 'Today', date: '22 May', temperature: 37, feelsLike: 43, wbgt: 31, utci: 43, risk: 'Moderate', peak: '12 PM – 4:30 PM' },
  { day: 'Friday', date: '23 May', temperature: 40, feelsLike: 46, wbgt: 33, utci: 46, risk: 'High', peak: '12 PM – 5 PM' },
  { day: 'Saturday', date: '24 May', temperature: 43, feelsLike: 48, wbgt: 35, utci: 48, risk: 'High', peak: '11 AM – 5 PM' },
  { day: 'Sunday', date: '25 May', temperature: 47, feelsLike: 52, wbgt: 37, utci: 52, risk: 'Severe', peak: '11 AM – 5 PM' },
  { day: 'Monday', date: '26 May', temperature: 49, feelsLike: 54, wbgt: 39, utci: 54, risk: 'Extreme', peak: '10 AM – 5 PM' },
  { day: 'Tuesday', date: '27 May', temperature: 46, feelsLike: 51, wbgt: 36, utci: 51, risk: 'Severe', peak: '11 AM – 4 PM' },
  { day: 'Wednesday', date: '28 May', temperature: 42, feelsLike: 47, wbgt: 34, utci: 47, risk: 'High', peak: '12 PM – 4 PM' },
  { day: 'Thursday', date: '29 May', temperature: 39, feelsLike: 44, wbgt: 32, utci: 44, risk: 'High', peak: '12 PM – 4 PM' },
  { day: 'Friday', date: '30 May', temperature: 38, feelsLike: 42, wbgt: 30, utci: 42, risk: 'Moderate', peak: '1 PM – 4 PM' },
  { day: 'Saturday', date: '31 May', temperature: 36, feelsLike: 40, wbgt: 29, utci: 40, risk: 'Moderate', peak: '1 PM – 4 PM' },
];

export const actions: ActionItem[] = [
  { title: 'Restrict outdoor construction', trigger: '12 PM – 4 PM', department: 'Labour & Safety', priority: 'Critical', status: 'Active', detail: 'Pause exposed work crews during peak danger hours.' },
  { title: 'Activate cooling centres', trigger: '58 centres', department: 'Public Health', priority: 'High', status: 'Ready', detail: 'Open priority centres across the five high-risk wards.' },
  { title: 'Deploy water tankers', trigger: '12 routes', department: 'Water Works', priority: 'High', status: 'Dispatched', detail: 'Prioritise markets, transit hubs, and informal settlements.' },
  { title: 'Issue public advisory', trigger: '1.25 lakh citizens', department: 'Communications', priority: 'Medium', status: 'Broadcasted', detail: 'Share hydration and outdoor safety guidance in local languages.' },
  { title: 'Monitor emergency departments', trigger: '5 hospitals', department: 'Health Services', priority: 'High', status: 'Active', detail: 'Escalate capacity warnings if heat-related cases rise.' },
  { title: 'Increase shaded bus stops', trigger: '24 locations', department: 'Transport', priority: 'Medium', status: 'Ready', detail: 'Position temporary shade and drinking water by noon.' },
];

export const resources: ResourceItem[] = [
  { type: 'Cooling centres', total: 64, active: 58, available: 6, capacity: '12,800 people', utilization: 72, location: '18 wards', status: 'Active' },
  { type: 'Water tankers', total: 18, active: 12, available: 6, capacity: '186 trips/day', utilization: 67, location: '12 routes', status: 'Active' },
  { type: 'Water booths', total: 42, active: 39, available: 3, capacity: '9,600 L/hr', utilization: 81, location: 'Markets & hubs', status: 'Active' },
  { type: 'Hospitals', total: 12, active: 12, available: 3, capacity: '164 beds', utilization: 76, location: 'City-wide', status: 'Ready' },
  { type: 'Ambulances', total: 36, active: 28, available: 8, capacity: '36 units', utilization: 61, location: '5 zones', status: 'Ready' },
  { type: 'Misting vans', total: 14, active: 9, available: 5, capacity: '14 units', utilization: 54, location: 'Outdoor hotspots', status: 'Ready' },
];

export const alerts: AlertItem[] = [
  { ward: 'Ward 16 · Chandni Chowk', severity: 'Critical', reason: 'Extreme heat expected', time: '11:12 AM', affected: '1.9 lakh', action: 'Outdoor work restriction required', status: 'Dispatched' },
  { ward: 'Ward 15 · Paharganj', severity: 'Critical', reason: 'Feels-like temperature above 48°C', time: '10:48 AM', affected: '1.8 lakh', action: 'Open cooling centres and water booths', status: 'Delivered' },
  { ward: 'Ward 12 · Karol Bagh', severity: 'High', reason: 'High hospitalisation risk', time: '10:30 AM', affected: '1.6 lakh', action: 'Monitor emergency department capacity', status: 'Viewed' },
  { ward: 'Ward 25 · Anand Parbat', severity: 'High', reason: 'Low green cover and high density', time: '09:55 AM', affected: '1.5 lakh', action: 'Deploy water tanker route 04', status: 'Dispatched' },
  { ward: 'Ward 23 · Shastri Nagar', severity: 'Moderate', reason: 'Outdoor worker exposure rising', time: '09:15 AM', affected: '1.2 lakh', action: 'Broadcast hydration advisory', status: 'Delivered' },
  { ward: 'Ward 08 · Civil Lines', severity: 'Resolved', reason: 'Risk reduced after cloud cover', time: 'Yesterday', affected: '98,500', action: 'Continue routine monitoring', status: 'Resolved' },
];

export const heatTrend = [
  { month: 'Dec', days: 0, anomaly: 0.2, exposure: 1.2 }, { month: 'Jan', days: 0, anomaly: -0.4, exposure: 0.8 }, { month: 'Feb', days: 1, anomaly: 0.7, exposure: 1.8 }, { month: 'Mar', days: 3, anomaly: 1.4, exposure: 3.9 }, { month: 'Apr', days: 7, anomaly: 2.1, exposure: 7.6 }, { month: 'May', days: 12, anomaly: 3.8, exposure: 12.6 },
];

export const wardHistory = [
  { month: 'Dec', temperature: 28, feelsLike: 30, wbgt: 22, exposure: 1.2 },
  { month: 'Jan', temperature: 25, feelsLike: 27, wbgt: 20, exposure: 0.8 },
  { month: 'Feb', temperature: 30, feelsLike: 33, wbgt: 24, exposure: 1.8 },
  { month: 'Mar', temperature: 35, feelsLike: 39, wbgt: 28, exposure: 3.9 },
  { month: 'Apr', temperature: 39, feelsLike: 44, wbgt: 32, exposure: 7.6 },
  { month: 'May', temperature: 42, feelsLike: 49, wbgt: 36, exposure: 12.6 },
];

export const historicalMonthly = [
  { month: 'Dec 24', low: 19, high: 28, days: 0 },
  { month: 'Jan 25', low: 16, high: 25, days: 0 },
  { month: 'Feb 25', low: 20, high: 30, days: 1 },
  { month: 'Mar 25', low: 24, high: 35, days: 3 },
  { month: 'Apr 25', low: 29, high: 39, days: 7 },
  { month: 'May 25', low: 34, high: 42, days: 12 },
];

export const wardHistoryByRisk = [
  { wardId: 'W-16', wardName: 'Chandni Chowk', dec: 0.4, jan: 0.3, feb: 0.8, mar: 1.9, apr: 4.2, may: 12.6 },
  { wardId: 'W-15', wardName: 'Paharganj', dec: 0.3, jan: 0.2, feb: 0.7, mar: 1.6, apr: 3.8, may: 11.2 },
  { wardId: 'W-12', wardName: 'Karol Bagh', dec: 0.2, jan: 0.2, feb: 0.6, mar: 1.4, apr: 3.2, may: 9.8 },
  { wardId: 'W-25', wardName: 'Anand Parbat', dec: 0.2, jan: 0.1, feb: 0.5, mar: 1.2, apr: 2.9, may: 8.4 },
  { wardId: 'W-23', wardName: 'Shastri Nagar', dec: 0.1, jan: 0.1, feb: 0.4, mar: 1.0, apr: 2.4, may: 7.1 },
];

export const hospitals = [
  { name: 'LNJP Hospital', pos: [28.638, 77.219] as [number, number] },
  { name: 'GTB Hospital', pos: [28.682, 77.298] as [number, number] },
  { name: 'Safdarjung Hospital', pos: [28.567, 77.206] as [number, number] },
];

export const coolingCentres = [
  { name: 'Chandni Chowk Centre', pos: [28.656, 77.23] as [number, number] },
  { name: 'Paharganj Centre', pos: [28.645, 77.21] as [number, number] },
  { name: 'Karol Bagh Centre', pos: [28.651, 77.19] as [number, number] },
];

export const waterPoints = [
  { name: 'Tanker Route 04', pos: [28.656, 77.152] as [number, number] },
  { name: 'Tanker Route 09', pos: [28.675, 77.17] as [number, number] },
];
