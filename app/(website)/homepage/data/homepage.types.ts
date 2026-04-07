export type HomepageStat = {
  value: string;
  label: string;
};

export type HomepageBrand = {
  logoUrl: string;
  logoAlt: string;
  regionLabel: string;
};

export type HomepageContact = {
  address: string;
  whatsapp: string;
  mapImage: string;
};

export type HomepagePotential = {
  title: string;
  image: string;
};

export type HomepageOpportunityItem = {
  icon: string;
  title: string;
  description: string;
};

export type HomepageFacility = {
  icon: string;
  label: string;
};

export type HomepageGalleryItem = {
  image: string;
  alt: string;
  tall?: boolean;
  caption?: string;
};

export type HomepageCultureCard = {
  icon: string;
  title: string;
  description: string;
};

export type HomepageRecoveryItem = {
  icon: string;
  title: string;
  description: string;
  wrapper?: string;
};

export type HomepageFooterLink = {
  label: string;
  href: string;
};

export type HomepageOfficeHour = {
  day: string;
  time: string;
  danger?: boolean;
};

export type HomepageData = {
  villageName: string;
  tagline: string;
  heroDescription: string;
  heroImage: string;
  heroBadge: string;
  brand: HomepageBrand;

  stats: HomepageStat[];
  quickStatsDescription: string;
  contact: HomepageContact;

  namingTitle: string;
  namingDescription: string;
  namingImage: string;
  namingQuote: string;

  cultureTitle: string;
  cultureDescription: string;
  cultureCards: HomepageCultureCard[];

  sialangTitle: string;
  sialangDescription: string;
  sialangImage: string;
  sialangBadge: string;
  sialangStat: string;
  sialangQuote: string;

  peatTitle: string;
  peatDescription: string;
  peatQuote: string;
  peatImages: string[];

  recoveryItems: HomepageRecoveryItem[];
  potentials: HomepagePotential[];
  potentialQuote: string;
  potentialOpportunityItems: HomepageOpportunityItem[];
  facilitiesTitle: string;
  facilities: HomepageFacility[];
  gallery: HomepageGalleryItem[];

  footerLinks: HomepageFooterLink[];
  footerDescription: string;
  officeHours: HomepageOfficeHour[];
  footerBadges: string[];
  footerCopyright: string;
};
