export interface WaitlistSignup {
  id?: string;
  email: string;
  name?: string;
  trade_type?: string;
  company_name?: string;
  referral_source?: string;
  created_at?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface InvestorInterest {
  id?: string;
  name: string;
  email: string;
  firm?: string;
  message?: string;
  created_at?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
