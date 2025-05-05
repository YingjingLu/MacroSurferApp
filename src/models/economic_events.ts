// Define TypeScript interfaces for the economic event

export interface EconomicEvent {
  event: string;
  event_date: Date;
  additional_identifier: string;
  country: string;
  currency?: string;
  previous?: number;
  estimate?: number;
  actual?: number;
  change?: number;
  impact?: string;
  change_percentage?: number;
  unit?: string;
}

export interface EconomicEventWithDayOfWeek {
  event: string;
  event_date: string;
  additional_identifier: string;
  country: string;
  day_of_week: string;
  currency?: string;
  previous?: number;
  estimate?: number;
  actual?: number;
  change?: number;
  impact?: string;
  change_percentage?: number;
  unit?: string;
}

export interface EconomicEventForWeek {
  monday: EconomicEventWithDayOfWeek[];
  tuesday: EconomicEventWithDayOfWeek[];
  wednesday: EconomicEventWithDayOfWeek[];
  thursday: EconomicEventWithDayOfWeek[];
  friday: EconomicEventWithDayOfWeek[];
  saturday: EconomicEventWithDayOfWeek[];
  sunday: EconomicEventWithDayOfWeek[];
}

export interface SymbolPerformance {
  in_1_hour: number[];
  in_1_day: number[];
}

export interface PastEventSymbolPerformance {
  event: string;
  symbol: string;
  performance: SymbolPerformance;
  event_history: EconomicEvent[];
}
