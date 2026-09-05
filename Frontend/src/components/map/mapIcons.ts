import L from 'leaflet';

export const blueIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  iconSize: [20, 32], iconAnchor: [10, 32], popupAnchor: [0, -28],
});
export const redIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [20, 32], iconAnchor: [10, 32], popupAnchor: [0, -28],
});
export const cyanIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-cyan.png',
  iconSize: [20, 32], iconAnchor: [10, 32], popupAnchor: [0, -28],
});

export function makePolygon(center: [number, number]): [number, number][] {
  const [lat, lng] = center;
  const r = 0.012;
  return [[lat + r, lng - r], [lat + r, lng + r], [lat - r, lng + r * 1.3], [lat - r, lng - r * 1.3]];
}
