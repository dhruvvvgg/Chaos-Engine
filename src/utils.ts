export interface DriverInfo {
  number: string;
  team: string;
  teamColor: string;
}

export const DRIVER_MAP: Record<string, DriverInfo> = {
  Verstappen: { number: '1', team: 'Oracle Red Bull Racing', teamColor: '#3671C6' },
  Russell: { number: '63', team: 'Mercedes-AMG PETRONAS', teamColor: '#27F4D2' },
  Sainz: { number: '55', team: 'Scuderia Ferrari', teamColor: '#E80020' },
  Hamilton: { number: '44', team: 'Mercedes-AMG PETRONAS', teamColor: '#27F4D2' },
  Norris: { number: '4', team: 'McLaren Racing', teamColor: '#FF8000' },
  Piastri: { number: '81', team: 'McLaren Racing', teamColor: '#FF8000' },
};

export interface TrackDetails {
  country: string;
  laps: number;
  length: string;
  airTemp: string;
  trackTemp: string;
  humidity: string;
  wind: string;
  rainProb: string;
  svgPath: string;
  dateStr: string;
}

export const TRACK_DETAILS: Record<string, TrackDetails> = {
  'qatar-2023': {
    country: 'QATAR',
    laps: 57,
    length: '5.419 KM',
    airTemp: '34°C',
    trackTemp: '42°C',
    humidity: '68%',
    wind: '18 KM/H SE',
    rainProb: '0%',
    dateStr: '08 OCT 2023',
    svgPath: 'M 15,80 L 80,80 C 90,80 95,70 85,65 L 75,62 C 70,60 70,50 75,48 L 85,45 C 95,40 90,30 80,32 L 68,35 C 60,38 55,30 50,35 C 45,40 40,30 35,38 C 30,42 20,40 22,50 L 35,55 C 45,60 55,58 60,68 C 65,75 55,78 48,72 L 35,70 C 25,70 15,72 15,80 Z'
  },
  'singapore-2023': {
    country: 'SINGAPORE',
    laps: 62,
    length: '4.928 KM',
    airTemp: '30°C',
    trackTemp: '36°C',
    humidity: '84%',
    wind: '8 KM/H E',
    rainProb: '20%',
    dateStr: '17 SEP 2023',
    svgPath: 'M 85,20 L 25,20 C 15,20 10,25 12,35 C 15,45 25,42 28,48 L 28,55 C 32,60 40,58 45,50 L 45,35 L 55,32 C 60,32 62,38 58,42 L 48,45 L 48,55 L 38,58 L 38,68 L 30,70 C 22,72 22,80 28,82 L 45,82 C 52,82 55,78 55,72 L 75,72 L 78,78 L 85,78 L 82,50 C 80,40 85,30 85,20 Z'
  },
  'british-2024': {
    country: 'GREAT BRITAIN',
    laps: 52,
    length: '5.891 KM',
    airTemp: '17°C',
    trackTemp: '24°C',
    humidity: '72%',
    wind: '22 KM/H WNW',
    rainProb: '60%',
    dateStr: '07 JUL 2024',
    svgPath: 'M 75,75 C 85,75 90,70 85,60 C 80,50 75,50 70,55 C 65,60 60,65 55,60 C 50,55 55,45 62,45 L 40,45 C 30,45 25,45 25,55 C 25,65 40,65 45,55 C 48,48 48,40 42,35 L 55,35 C 65,35 75,30 80,20 C 80,10 75,5 70,12 C 65,18 55,15 50,22 C 45,30 40,28 30,35 L 15,50 C 10,60 15,70 25,70 L 45,70 C 55,70 60,75 65,80 L 75,75 Z'
  },
  'hungarian-2024': {
    country: 'HUNGARY',
    laps: 70,
    length: '4.381 KM',
    airTemp: '32°C',
    trackTemp: '47°C',
    humidity: '41%',
    wind: '12 KM/H NE',
    rainProb: '5%',
    dateStr: '21 JUL 2024',
    svgPath: 'M 25,25 L 75,25 C 85,25 90,35 80,40 L 65,42 C 50,42 45,50 50,60 L 60,65 C 70,70 65,80 55,80 C 45,80 40,70 42,60 L 35,55 L 35,60 L 25,55 C 20,45 30,40 30,35 C 30,30 42,32 45,38 C 48,44 55,42 58,48 L 68,48 C 78,52 78,68 68,70 C 55,72 35,70 25,55 Z'
  }
};

export interface TelemetryPoint {
  lap: number;
  score: number;
  speedDelta: number; // mock delta in km/h relative to baseline
  tireWear: number; // tyre percentage
}

export const RACE_TELEMETRY: Record<string, TelemetryPoint[]> = {
  'qatar-2023': [
    { lap: 1, score: 45, speedDelta: 0.0, tireWear: 100 },
    { lap: 10, score: 58, speedDelta: -1.2, tireWear: 82 },
    { lap: 18, score: 71, speedDelta: -2.5, tireWear: 65 }, // Stop 1 window
    { lap: 22, score: 72, speedDelta: 1.5, tireWear: 94 },  // Sainz moment
    { lap: 30, score: 68, speedDelta: -0.8, tireWear: 76 },
    { lap: 38, score: 85, speedDelta: 3.8, tireWear: 96 },  // Russell moment
    { lap: 41, score: 91, speedDelta: 4.2, tireWear: 98 },  // Verstappen moment
    { lap: 50, score: 88, speedDelta: -1.5, tireWear: 70 },
    { lap: 57, score: 91, speedDelta: 2.1, tireWear: 58 }
  ],
  'singapore-2023': [
    { lap: 1, score: 30, speedDelta: 0.0, tireWear: 100 },
    { lap: 10, score: 45, speedDelta: -0.5, tireWear: 88 },
    { lap: 20, score: 87, speedDelta: 5.4, tireWear: 92 },  // Sainz undercut
    { lap: 24, score: 82, speedDelta: -3.1, tireWear: 84 }, // Verstappen traffic
    { lap: 40, score: 65, speedDelta: -1.0, tireWear: 61 },
    { lap: 55, score: 78, speedDelta: 1.8, tireWear: 42 },
    { lap: 62, score: 87, speedDelta: 2.5, tireWear: 28 }
  ],
  'british-2024': [
    { lap: 1, score: 50, speedDelta: 0.0, tireWear: 100 },
    { lap: 15, score: 55, speedDelta: -0.8, tireWear: 85 },
    { lap: 30, score: 62, speedDelta: -2.4, tireWear: 64 },
    { lap: 49, score: 81, speedDelta: -4.2, tireWear: 45 }, // Verstappen early switch
    { lap: 51, score: 85, speedDelta: 6.8, tireWear: 98 },  // Norris late stop
    { lap: 52, score: 85, speedDelta: 7.2, tireWear: 96 }   // Hamilton sweet spot
  ],
  'hungarian-2024': [
    { lap: 1, score: 35, speedDelta: 0.0, tireWear: 100 },
    { lap: 20, score: 42, speedDelta: -0.4, tireWear: 80 },
    { lap: 40, score: 50, speedDelta: -1.2, tireWear: 60 },
    { lap: 55, score: 65, speedDelta: 1.0, tireWear: 92 },
    { lap: 65, score: 78, speedDelta: -2.5, tireWear: 81 }, // Piastri team order
    { lap: 70, score: 78, speedDelta: 3.5, tireWear: 72 }   // Norris push
  ]
};
