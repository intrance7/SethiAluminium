import servicesData from "@/data/services.json";
import projectsData from "@/data/projects.json";

export type Service = {
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  items: string[];
};

export type Project = {
  slug: string;
  title: string;
  location: string;
  projectType: string;
  services: string[];
  serviceLabels: string[];
  coverImage: string;
  gallery: string[];
  beforeImage: string;
  afterImage: string;
  materials: string[];
  description: string;
  published: boolean;
};

export function getServices(): Service[] {
  return servicesData as Service[];
}

export function getServiceBySlug(slug: string): Service | undefined {
  return getServices().find((service) => service.slug === slug);
}

export function getProjects(): Project[] {
  return (projectsData as Project[]).filter((project) => project.published);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export function getProjectsByService(serviceSlug: string): Project[] {
  return getProjects().filter((project) =>
    project.services.includes(serviceSlug)
  );
}
