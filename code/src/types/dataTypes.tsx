export type ResourceLink = {
  id: string;
  title: string;
  url: string;
  pageType: number;  // 1: communication, 2: computer-access, 3: smart-phone-access
}

export type HandoutOrTestimonialLink = {
  id: string;
  title: string;
  url: string;
}

export type PageContentType = {
  id: string;
  paragraph: string;
  imageURL: string;
  videoURL: string;
}

export type FooterLink = {
  label: string;
  link: string;
}