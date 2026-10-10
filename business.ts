import { z } from 'zod';

// ============================================================
// BUSINESS DETAILS — edit everything here, in one place.
//
// Phone and WhatsApp are placeholders ("XXXX-XXXX"). Call and
// WhatsApp links stay disabled until a real number is entered:
// telHref() and whatsappUrl() both return null for a placeholder,
// so no working link is ever built from one.
// ============================================================
export const business = {
  name: 'ELITE AUTO CARE',
  location: 'Hyderabad, Telangana',
  phone: 'XXXX-XXXX',
  whatsapp: 'XXXX-XXXX',
  mapsUrl: '',
  instagram: '',
  facebook: '',
  // Opening hours shown in the Contact section and in the footer.
  hours: [
    { days: 'Monday – Saturday', time: '9:00 AM – 9:00 PM' },
    { days: 'Sunday', time: '10:00 AM – 6:00 PM' },
  ],
};

/**
 * A number is only dialable when it carries a real sequence of digits.
 * Placeholders such as "XXXX-XXXX" and empty values return null.
 */
export function telHref(number: string): string | null {
  const digits = number.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) return null;
  return `tel:${number.replace(/[^\d+]/g, '')}`;
}

export const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(100),
  phone: z.string().trim().regex(/^\+?[\d\s()-]{10,20}$/, 'Please enter a valid phone number.').refine(value => value.replace(/\D/g, '').length >= 10, 'Please enter a valid phone number.'),
  service: z.string().trim().min(1, 'Please choose a service.').max(100),
  message: z.string().trim().max(1000, 'Please keep your message under 1,000 characters.'),
});

export function whatsappUrl(number: string, message: string): string | null {
  const normalized = number.replace(/[\s+()-]/g, '');
  if (!/^[1-9]\d{9,14}$/.test(normalized) || !message.trim() || message.length > 2000) return null;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

export function serviceMessage(service?: string) {
  const safe = z.string().trim().max(100).safeParse(service ?? 'car care');
  return `Hello ELITE AUTO CARE, I would like to enquire about ${safe.success ? safe.data : 'car care'}. Please share pricing and availability.`;
}

export function pageHead(title: string, description: string) {
  return { meta: [
    { title: `${title} | ELITE AUTO CARE Hyderabad` },
    { name: 'description', content: description },
    { property: 'og:title', content: `${title} | ELITE AUTO CARE Hyderabad` },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] };
}
