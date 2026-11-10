export interface BtpProject {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  fullOverview: string;
  architecture: string[];
  businessImpact: string[];
  techStack: string[];
  samplePayload?: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  client: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  technologies: string[];
}

export interface CapabilityCategory {
  id: string;
  title: string;
  headline: string;
  items: string[];
  details: string;
  realWorldApplications: string[];
}
