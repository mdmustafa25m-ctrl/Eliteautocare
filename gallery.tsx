import { createFileRoute } from '@tanstack/react-router';
import { GalleryGrid } from '@/components/gallery';
import { PageIntro, CallToAction } from '@/components/site';
import { pageHead } from '@/lib/business';
export const Route = createFileRoute('/gallery')({ head: () => pageHead('Car Care Gallery', 'Explore a visual look at luxury car washing, interior care and paint protection. Illustrative automotive photography for ELITE AUTO CARE Hyderabad.'), component: GalleryPage });
function GalleryPage() { return <><PageIntro eyebrow="IN THE DETAILS" title="Care you can see." description="A closer look at the surfaces, finishes and thoughtful details that make car care an experience." /><section className="section"><div className="site-width"><GalleryGrid /></div></section><CallToAction /></>; }