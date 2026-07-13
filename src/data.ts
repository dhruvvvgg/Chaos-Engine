import { Race } from './types';

export const RACES: Race[] = [
  {
    id: 'qatar-2023',
    name: 'Qatar Grand Prix 2023',
    circuit: 'Lusail International Circuit',
    chaosScore: 91,
    context: 'FIA imposed an 18-lap tyre-stint limit for safety reasons, forcing at least 3 mandatory pit stops in a 57-lap race — every team had to solve a novel strategy puzzle on the fly.',
    moments: [
      {
        driver: 'Verstappen',
        lap: 41,
        type: 'pit_outlier',
        magnitude: 6.4,
        description: 'Stopped notably later than the field average for that mandatory stop window'
      },
      {
        driver: 'Russell',
        lap: 38,
        type: 'pace_spike',
        magnitude: 2.1,
        description: 'Sudden lap time drop suggesting a fresh-tyre push'
      },
      {
        driver: 'Sainz',
        lap: 22,
        type: 'position_swing',
        magnitude: 4,
        description: 'Gained 4 places in a short window'
      }
    ]
  },
  {
    id: 'singapore-2023',
    name: 'Singapore Grand Prix 2023',
    circuit: 'Marina Bay Street Circuit',
    chaosScore: 87,
    context: "Ferrari's Sainz beat a faster Red Bull car largely through undercut timing, ending Red Bull's dominant win streak that season.",
    moments: [
      {
        driver: 'Sainz',
        lap: 20,
        type: 'pit_outlier',
        magnitude: 5.1,
        description: "Early undercut attempt against the field's typical stop window"
      },
      {
        driver: 'Verstappen',
        lap: 24,
        type: 'position_swing',
        magnitude: 3,
        description: 'Lost track position after emerging in traffic'
      }
    ]
  },
  {
    id: 'british-2024',
    name: 'British Grand Prix 2024',
    circuit: 'Silverstone Circuit',
    chaosScore: 85,
    context: 'Mixed/drying conditions meant the exact lap to switch from wet to slick tyres decided the race. Hamilton/Mercedes timed it better than the field.',
    moments: [
      {
        driver: 'Hamilton',
        lap: 52,
        type: 'pace_spike',
        magnitude: 3.2,
        description: 'Sharp pace improvement after switching to slicks at the optimal moment'
      },
      {
        driver: 'Verstappen',
        lap: 49,
        type: 'position_swing',
        magnitude: 3,
        description: 'Lost positions after switching slightly too early on a still-damp track'
      },
      {
        driver: 'Norris',
        lap: 51,
        type: 'pit_outlier',
        magnitude: 5.1,
        description: 'Stopped notably later than peers'
      }
    ]
  },
  {
    id: 'hungarian-2024',
    name: 'Hungarian Grand Prix 2024',
    circuit: 'Hungaroring',
    chaosScore: 78,
    context: "McLaren's team-order call between teammates Norris and Piastri was one of the most argued-about strategic decisions of that season — not a tyre call, but a timing decision about when to swap track position between teammates.",
    moments: [
      {
        driver: 'Piastri',
        lap: 65,
        type: 'position_swing',
        magnitude: 4,
        description: 'Team-order position swap'
      },
      {
        driver: 'Norris',
        lap: 70,
        type: 'pace_spike',
        magnitude: 2.4,
        description: 'Pushed hard in the closing laps after the swap'
      }
    ]
  }
];

export const STRATEGY_OPTIONS = {
  pit_outlier: [
    'Pit 2 laps earlier',
    'Pit 2 laps later',
    'Switch to alternate compound'
  ],
  pace_spike: [
    'Push harder',
    'Manage tyres conservatively'
  ],
  position_swing: [
    'Defend instead',
    'Commit to the move earlier'
  ]
};
