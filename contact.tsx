import { createFileRoute } from '@tanstack/react-router';
import { MapPin, Phone, MessageCircle, Clock, ArrowUpRight } from 'lucide-react';
import { PageIntro, EnquiryButton } from '@/components/site';
import { ContactForm } from '@/components/contact-form';
import { Button } from '@/components/ui/button';
import { business, pageHead, telHref } from '@/lib/business';

export const Route = createFileRoute('/contact')({
  head: () => pageHead('Contact & Booking', 'Enquire about car washing and detailing at ELITE AUTO CARE in Hyderabad, Telangana. Opening hours, contact details and service enquiries.'),
  component: ContactPage,
});

function ContactPage() {
  const phoneLink = telHref(business.phone);
  return <>
    <PageIntro eyebrow="LET’S CONNECT" title="Exceptional care starts here." description="Tell us about your car. Enquire about a service, discuss your requirements or plan your next visit." />
    <section className="section">
      <div className="site-width contact-layout">
        <div>
          <h2>ELITE AUTO CARE</h2>
          <div className="contact-detail"><MapPin /><div><strong>LOCATION</strong><p>{business.location}</p></div></div>
          <div className="contact-detail"><Phone /><div><strong>PHONE</strong>{phoneLink ? <a href={phoneLink}>{business.phone}</a> : <p>{business.phone}<span className="placeholder-note">Placeholder — number to be confirmed</span></p>}</div></div>
          <div className="contact-detail"><MessageCircle /><div><strong>WHATSAPP</strong><p>{business.whatsapp}<span className="placeholder-note">Placeholder — number to be confirmed</span></p></div></div>
          <div className="contact-detail"><Clock /><div><strong>OPENING HOURS</strong><div className="hours-list">{business.hours.map(({ days, time }) => <div className="hours-row" key={days}><span>{days}</span><span>{time}</span></div>)}</div></div></div>
          <EnquiryButton variant="luxuryOutline">Enquire on WhatsApp</EnquiryButton>
          <div className="map-placeholder">
            <MapPin className="text-primary h-6 w-6" />
            <p>Hyderabad, Telangana</p>
            {business.mapsUrl ? <Button asChild variant="luxuryText"><a href={business.mapsUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps<ArrowUpRight /></a></Button> : <p>[ADD GOOGLE MAPS LINK]<br />Exact address and directions to be confirmed.</p>}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  </>;
}
