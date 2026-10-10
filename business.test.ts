import { describe, it, expect } from 'vitest';
import { business, enquirySchema, serviceMessage, telHref, whatsappUrl } from '@/lib/business';

describe('Business enquiry rules', () => {
 it('does not open WhatsApp without a confirmed number', () => {
  expect(whatsappUrl(business.whatsapp, serviceMessage('Ceramic Coating'))).toBeNull();
 });
 it('includes the selected service in an encoded WhatsApp message', () => {
  const message = serviceMessage('Interior Deep Cleaning');
  expect(message).toContain('Interior Deep Cleaning');
  expect(whatsappUrl('+91 98765 43210', message)).toBe(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`);
 });
 it('requires name, valid phone and selected service', () => {
  expect(enquirySchema.safeParse({name: '', phone: '', service: '', message: ''}).success).toBe(false);
  expect(enquirySchema.safeParse({name: 'Sample Customer', phone: '9876543210', service: 'Ceramic Coating', message: ''}).success).toBe(true);
 });
});

describe('Displayed contact placeholders', () => {
 it('shows XXXX-XXXX for both phone and WhatsApp', () => {
  expect(business.phone).toBe('XXXX-XXXX');
  expect(business.whatsapp).toBe('XXXX-XXXX');
 });
 it('never builds a call link from the phone placeholder', () => {
  expect(telHref(business.phone)).toBeNull();
  expect(telHref('')).toBeNull();
 });
 it('builds a call link once a real number is entered', () => {
  expect(telHref('+91 98765 43210')).toBe('tel:+919876543210');
 });
});

describe('Opening hours', () => {
 it('lists Monday to Saturday and Sunday exactly as confirmed', () => {
  expect(business.hours).toEqual([
    { days: 'Monday – Saturday', time: '9:00 AM – 9:00 PM' },
    { days: 'Sunday', time: '10:00 AM – 6:00 PM' },
  ]);
 });
});
