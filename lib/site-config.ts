export const siteConfig = {
  name: "Sethi Aluminium & Interiors",
  shortName: "Sethi Aluminium",
  tagline: "We build the spaces around you.",
  description:
    "Aluminium doors and windows, glass work, false ceilings, PVC and ACP panels, grills, gates and complete interior/exterior fabrication.",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsappNumber: "919876543210",
  email: "info@sethialuminium.com",
  address: "Tohana, Haryana, India",
  serviceAreas: ["Tohana", "Fatehabad", "Hisar", "Sirsa"],
  hours: "Mon – Sat, 9:00 AM – 7:00 PM",
  social: {
    instagram: "",
    facebook: "",
  },
} as const;

export function buildWhatsAppLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}
