export type MomentType = 'pit_outlier' | 'pace_spike' | 'position_swing';

export interface ChaosMoment {
  driver: string;
  lap: number;
  type: MomentType;
  magnitude: number;
  description: string;
}

export interface Race {
  id: string;
  name: string;
  circuit: string;
  chaosScore: number;
  context: string;
  moments: ChaosMoment[];
}

export interface WhatIfResponse {
  predicted_track_position_on_exit: number;
  estimated_gap_to_car_ahead_seconds: number;
  verdict: 'better' | 'worse' | 'roughly equivalent';
  confidence: 'low' | 'medium' | 'high';
  reasoning: string;
}
