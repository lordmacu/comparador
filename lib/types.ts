export interface MainBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface Service {
  name: string;
  description: string;
  speeds?: string[];
  options?: string[];
  features?: string[];
  ideal?: string;
}

export interface TargetAudience {
  type: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Provider {
  name: string;
  slug: string;
  tagline: string;
  brand: {
    logo: string;
    primaryColor: string;
    website: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  coverage: {
    national: boolean;
    technology: string;
    cities: string[];
    description: string;
  };
  whatsapp: {
    number: string;
    message: string;
  };
  mainBenefits: MainBenefit[];
  services: Service[];
  whyChoose: string[];
  targetAudience: TargetAudience[];
  faqs: FAQ[];
}

export interface ProvidersData {
  lastUpdated: string;
  providers: {
    claro: Provider;
    movistar: Provider;
    etb: Provider;
  };
  metadata: {
    version: string;
    country: string;
    strategy: string;
    notes: string;
  };
}
