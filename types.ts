export interface RageAnalysisResult {
  rageScore: number;
  moneyValue: string;
  punchline: string;
  calmingQuote: string;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}