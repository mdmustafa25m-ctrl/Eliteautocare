import { useState } from 'react';
import { ArrowUpRight, Check, Copy, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { enquirySchema, business, whatsappUrl } from '@/lib/business';
import { services } from '@/lib/services';

export function ContactForm() {
 const [errors, setErrors] = useState<Partial<Record<'name' | 'phone' | 'service' | 'message', string>>>({});
 const [prepared, setPrepared] = useState('');
 const [copied, setCopied] = useState(false);
 const url = prepared ? whatsappUrl(business.whatsapp, prepared) : null;
 function submit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault(); setPrepared(''); setCopied(false);
  const data = new FormData(event.currentTarget);
  const parsed = enquirySchema.safeParse(Object.fromEntries(data));
  if (!parsed.success) { const next: Record<string,string> = {}; parsed.error.issues.forEach(issue => { const key = String(issue.path[0]); if (!next[key]) next[key] = issue.message; }); setErrors(next); return; }
  setErrors({}); const {name, phone, service, message} = parsed.data;
  setPrepared(`Hello ELITE AUTO CARE, my name is ${name}.\nPhone: ${phone}\nService: ${service}\n${message ? `Message: ${message}\n` : ''}Please share pricing and availability.`);
 }
 return <div><h2>Let’s talk about your car.</h2><form className="contact-form" noValidate onSubmit={submit} onChange={() => setPrepared('')}><div className="field"><label htmlFor="name">Your name *</label><input id="name" name="name" placeholder="Full name" autoComplete="name" maxLength={100} required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />{errors.name && <span id="name-error" className="field-error">{errors.name}</span>}</div><div className="field"><label htmlFor="phone">Phone number *</label><input id="phone" name="phone" type="tel" placeholder="Your phone number" autoComplete="tel" maxLength={20} required aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} />{errors.phone && <span id="phone-error" className="field-error">{errors.phone}</span>}</div><div className="field field-full"><label htmlFor="service">Service you’re interested in *</label><select id="service" name="service" required defaultValue="" aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? 'service-error' : undefined}><option value="" disabled>Select a service</option>{services.map(service => <option key={service.name}>{service.name}</option>)}<option>General Enquiry</option></select>{errors.service && <span id="service-error" className="field-error">{errors.service}</span>}</div><div className="field field-full"><label htmlFor="message">Anything else we should know?</label><textarea id="message" name="message" placeholder="Tell us about your vehicle and what you have in mind…" maxLength={1000} />{errors.message && <span className="field-error">{errors.message}</span>}</div><p className="form-note field-full">This form prepares your enquiry; it does not send a message. You can send it through WhatsApp once the business number is available.</p><div className="field-full"><Button variant="luxury" type="submit">Prepare Enquiry<ArrowUpRight /></Button></div></form>{prepared && <div className="confirmation" role="status"><h3>Your enquiry is ready.</h3><p>No message has been sent.{!url && ' The business WhatsApp number has not been added yet.'}</p><pre>{prepared}</pre>{url ? <Button asChild variant="luxury"><a href={url} target="_blank" rel="noopener noreferrer">Continue to WhatsApp<MessageCircle /></a></Button> : <Button variant="luxuryOutline" onClick={async () => { try { await navigator.clipboard.writeText(prepared); setCopied(true); } catch { setCopied(false); } }}>{copied ? <Check /> : <Copy />}{copied ? 'Copied' : 'Copy enquiry'}</Button>}</div>}</div>;
}