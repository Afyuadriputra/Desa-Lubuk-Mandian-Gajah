export type HomepageStat = {
  value: string;
  label: string;
};

export type HomepageContact = {
  address: string;
  whatsapp: string;
};

export type HomepagePotential = {
  title: string;
  image: string;
};

export type HomepageFacility = {
  icon: string;
  label: string;
};

export type HomepageGalleryItem = {
  image: string;
  alt: string;
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
};

export type HomepageFooterLink = {
  label: string;
  href: string;
};

export type HomepageData = {
  villageName: string;
  tagline: string;
  heroDescription: string;

  stats: HomepageStat[];
  contact: HomepageContact;

  namingTitle: string;
  namingDescription: string;
  namingImage: string;

  cultureTitle: string;
  cultureDescription: string;
  cultureCards: HomepageCultureCard[];

  sialangTitle: string;
  sialangDescription: string;
  sialangImage: string;

  peatTitle: string;
  peatDescription: string;
  peatQuote: string;
  peatImages: string[];

  recoveryItems: HomepageRecoveryItem[];
  potentials: HomepagePotential[];
  facilities: HomepageFacility[];
  gallery: HomepageGalleryItem[];

  footerLinks: HomepageFooterLink[];
};