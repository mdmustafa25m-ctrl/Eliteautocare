import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowUpRight, ArrowRight, Menu, X, MapPin, Phone, Clock, Instagram, Facebook, MessageCircle, ShieldCheck, Sparkles, Hand, CalendarCheck, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { business, serviceMessage, telHref, whatsappUrl } from '@/lib/business';
import { services } from '@/lib/services';

export const navigation = [{ label: 'Home', to: '/' }, { label: 'Services', to: '/services' }, { label: 'Gallery', to: '/gallery' }, { label: 'About', to: '/about' }, { label: 'Contact', to: '/contact' }] as const;

export function Brand() {
  return <Link to="/" className="brand" aria-label="ELITE AUTO CARE home"><span className="brand-main">ELITE <span>AUTO CARE</span></span><span className="brand-sub">DETAILING. REDEFINED.</span></Link>;
}

export function EnquiryButton({ service, children = 'Book on WhatsApp', variant = 'luxury', className = '', icon = 'chat' }: { service?: string; children?: React.ReactNode; variant?: 'luxury' | 'luxuryOutline' | 'luxuryText'; className?: string; icon?: 'chat' | 'arrow' }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const message = serviceMessage(service);
  const url = whatsappUrl(business.whatsapp, message);
  const Icon = icon === 'chat' ? MessageCircle : ArrowUpRight;
  if (url) return <Button asChild variant={variant} className={className}><a href={url} target="_blank" rel="noopener noreferrer">{children}<Icon /></a></Button>;
  return <><Button variant={variant} className={className} onClick={() => { setCopied(false); setOpen(true); }}>{children}<Icon /></Button><Dialog open={open} onOpenChange={setOpen}><DialogContent className="booking-dialog"><DialogTitle>Let’s talk car care.</DialogTitle><DialogDescription>The business WhatsApp number has not been added yet. No enquiry has been sent.</DialogDescription><div className="dialog-message">{message}</div><Button variant="luxuryOutline" onClick={async () => { try { await navigator.clipboard.writeText(message); setCopied(true); } catch { setCopied(false); } }}>{copied ? <Check /> : <Copy />}{copied ? 'Copied' : 'Copy enquiry'}</Button><Button asChild variant="luxury"><Link to="/contact" onClick={() => setOpen(false)}>Contact details<ArrowRight /></Link></Button></DialogContent></Dialog></>;
}

export function Header() {
 const [open, setOpen] = useState(false);
 return <header className="site-header"><div className="site-width header-inner"><Brand /><nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <Link key={item.to} to={item.to} className="nav-link" activeOptions={{ exact: true }}>{item.label}</Link>)}</nav><EnquiryButton className="header-book" icon="arrow">Book a Service</EnquiryButton><Button variant="ghost" size="icon" className="mobile-trigger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>{open && <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">{navigation.map(item => <Link key={item.to} to={item.to} className="nav-link" onClick={() => setOpen(false)}>{item.label}</Link>)}</nav>}</div></header>;
}

export const values = [
 { icon: ShieldCheck, title: 'Professional Care', description: 'A considered approach to every vehicle, from the first rinse to the finishing touch.' },
 { icon: Hand, title: 'Attention to Detail', description: 'The little things matter. We focus on the surfaces and spaces that deserve extra care.' },
 { icon: Sparkles, title: 'Quality Products', description: 'Carefully selected car care products suited to your vehicle’s surfaces and finish.' },
 { icon: CalendarCheck, title: 'Convenient Booking', description: 'Discuss your requirements and arrange a service that fits your schedule.' },
];

export function ValueStrip() { return <div className="value-strip"><div className="site-width value-inner">{values.map(({icon: Icon, title}) => <div className="value-item" key={title}><Icon /><span>{title}</span></div>)}</div></div>; }
export function WhyChooseUs() { return <section className="section alt-section"><div className="site-width"><div className="eyebrow">THE ELITE DIFFERENCE</div><h2>Great cars deserve exceptional care.</h2><div className="why-grid">{values.map(({icon: Icon, title, description}) => <div className="why-item" key={title}><Icon /><h3>{title}</h3><p>{description}</p></div>)}</div></div></section>; }

export function ServiceCards({ limit }: { limit?: number }) { return <div className="services-grid">{services.slice(0, limit).map((service, index) => <article className="service-card" key={service.name}><div className="service-image-wrap"><img src={service.image} alt={service.name === 'Exterior Detailing' ? 'Luxury sports car receiving careful exterior detailing' : service.name} width={1024} height={768} loading="lazy" /><span className="service-number">0{index+1}</span></div><div className="service-body"><div className="service-category">{service.category}</div><h3>{service.name}</h3><p>{service.description}</p><div className="service-card-bottom"><span className="service-price">Contact for Pricing</span><EnquiryButton service={service.name} variant="luxuryText" icon="arrow">Enquire Now</EnquiryButton></div></div></article>)}</div>; }

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) { return <section className="page-intro"><div className="site-width enter-animation"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div></section>; }

export function CallToAction() { return <section className="cta-band"><div className="site-width cta-inner"><div><div className="eyebrow">YOUR CAR. OUR ATTENTION.</div><h2>Give your car the care it deserves.</h2><p>Let’s find the right detailing experience for your vehicle.</p></div><EnquiryButton>Book on WhatsApp</EnquiryButton></div></section>; }

function SocialButton({ url, name, children }: { url: string; name: string; children: React.ReactNode }) {
 const [open, setOpen] = useState(false);
 if (url) return <Button asChild variant="outline" size="icon"><a href={url} aria-label={name} target="_blank" rel="noopener noreferrer">{children}</a></Button>;
 return <><Button variant="outline" size="icon" aria-label={name} title={`${name} — link to be added`} onClick={() => setOpen(true)}>{children}</Button><Dialog open={open} onOpenChange={setOpen}><DialogContent className="booking-dialog"><DialogTitle>{name}</DialogTitle><DialogDescription>The business {name} link has not been added yet.</DialogDescription></DialogContent></Dialog></>;
}

export function Footer() {
  const phoneLink = telHref(business.phone);
  return <footer className="footer"><div className="site-width"><div className="footer-grid">
    <div className="footer-brand"><Brand /><p>Premium car wash and detailing.<br />Thoughtful care. A refined finish.</p></div>
    <div><h3>QUICK LINKS</h3><nav className="footer-links" aria-label="Footer navigation">{navigation.map(item => <Link key={item.to} to={item.to}>{item.label}</Link>)}</nav></div>
    <div>
      <h3>FIND US</h3>
      <div className="footer-detail"><MapPin />{business.location}</div>
      <div className="footer-detail"><Phone />{phoneLink ? <a href={phoneLink}>{business.phone}</a> : <span>{business.phone}</span>}</div>
      <div className="footer-detail"><Clock /><span className="footer-hours">{business.hours.map(({ days, time }) => <span className="footer-hours-row" key={days}><span>{days}</span><span>{time}</span></span>)}</span></div>
      <Link to="/contact" className="nav-link">Get in touch <ArrowUpRight className="inline h-3 w-3" /></Link>
    </div>
    <div><h3>FOLLOW ALONG</h3><div className="social-links"><SocialButton url={business.instagram} name="Instagram"><Instagram /></SocialButton><SocialButton url={business.facebook} name="Facebook"><Facebook /></SocialButton></div></div>
  </div><div className="footer-bottom"><span>© {new Date().getUTCFullYear()} ELITE AUTO CARE. All rights reserved.</span><span>HYDERABAD, INDIA · DETAILING. REDEFINED.</span></div></div></footer>;
}