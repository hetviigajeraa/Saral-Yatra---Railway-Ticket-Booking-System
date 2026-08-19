// Major Indian Railway Stations
export const stations = [
  { code: 'CSTM', name: 'Mumbai CST', city: 'Mumbai', state: 'Maharashtra' },
  { code: 'BCT',  name: 'Mumbai Central', city: 'Mumbai', state: 'Maharashtra' },
  { code: 'LTT',  name: 'Lokmanya Tilak Terminus', city: 'Mumbai', state: 'Maharashtra' },
  { code: 'PUNE', name: 'Pune Junction', city: 'Pune', state: 'Maharashtra' },
  { code: 'ADI',  name: 'Ahmedabad Junction', city: 'Ahmedabad', state: 'Gujarat' },
  { code: 'ST',   name: 'Surat', city: 'Surat', state: 'Gujarat' },
  { code: 'BRC',  name: 'Vadodara Junction', city: 'Vadodara', state: 'Gujarat' },
  { code: 'NDLS', name: 'New Delhi', city: 'New Delhi', state: 'Delhi' },
  { code: 'DLI',  name: 'Old Delhi', city: 'Delhi', state: 'Delhi' },
  { code: 'NZM',  name: 'Hazrat Nizamuddin', city: 'New Delhi', state: 'Delhi' },
  { code: 'JP',   name: 'Jaipur Junction', city: 'Jaipur', state: 'Rajasthan' },
  { code: 'AII',  name: 'Ajmer Junction', city: 'Ajmer', state: 'Rajasthan' },
  { code: 'SBC',  name: 'KSR Bengaluru', city: 'Bengaluru', state: 'Karnataka' },
  { code: 'YPR',  name: 'Yesvantpur Junction', city: 'Bengaluru', state: 'Karnataka' },
  { code: 'MAS',  name: 'Chennai Central', city: 'Chennai', state: 'Tamil Nadu' },
  { code: 'MS',   name: 'Chennai Egmore', city: 'Chennai', state: 'Tamil Nadu' },
  { code: 'HYB',  name: 'Hyderabad Deccan', city: 'Hyderabad', state: 'Telangana' },
  { code: 'SC',   name: 'Secunderabad Junction', city: 'Hyderabad', state: 'Telangana' },
  { code: 'HWH',  name: 'Howrah Junction', city: 'Kolkata', state: 'West Bengal' },
  { code: 'SDAH', name: 'Sealdah', city: 'Kolkata', state: 'West Bengal' },
  { code: 'LKO',  name: 'Lucknow Charbagh', city: 'Lucknow', state: 'Uttar Pradesh' },
  { code: 'CNB',  name: 'Kanpur Central', city: 'Kanpur', state: 'Uttar Pradesh' },
  { code: 'AGC',  name: 'Agra Cantt', city: 'Agra', state: 'Uttar Pradesh' },
  { code: 'PRYJ', name: 'Prayagraj Junction', city: 'Prayagraj', state: 'Uttar Pradesh' },
  { code: 'BSB',  name: 'Varanasi Junction', city: 'Varanasi', state: 'Uttar Pradesh' },
  { code: 'PNBE', name: 'Patna Junction', city: 'Patna', state: 'Bihar' },
  { code: 'BPL',  name: 'Bhopal Junction', city: 'Bhopal', state: 'Madhya Pradesh' },
  { code: 'NGP',  name: 'Nagpur Junction', city: 'Nagpur', state: 'Maharashtra' },
  { code: 'AMD',  name: 'Amritsar Junction', city: 'Amritsar', state: 'Punjab' },
  { code: 'CDG',  name: 'Chandigarh', city: 'Chandigarh', state: 'Chandigarh' },
  { code: 'GHY',  name: 'Guwahati', city: 'Guwahati', state: 'Assam' },
  { code: 'ERS',  name: 'Ernakulam Junction', city: 'Kochi', state: 'Kerala' },
  { code: 'TVC',  name: 'Thiruvananthapuram Central', city: 'Thiruvananthapuram', state: 'Kerala' },
  { code: 'ADI',  name: 'Ahmedabad Junction', city: 'Ahmedabad', state: 'Gujarat' },
];

export function getStation(code) {
  return stations.find((s) => s.code === code);
}

export function searchStations(query) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  return stations.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.city.toLowerCase().includes(q) ||
      s.code.toLowerCase().includes(q)
  );
}
