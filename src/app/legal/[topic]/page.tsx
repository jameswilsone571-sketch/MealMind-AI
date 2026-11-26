import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Brand } from '@/components/brand';

const pages: Record<string, { title: string; intro: string; sections: { title: string; text: string }[] }> = {
  privacy: { title: 'Privacy policy', intro: 'A clear, simple overview of privacy in the MealMind AI prototype.', sections: [
    { title: 'About this prototype', text: 'MealMind AI is a product demonstration, not a live account service. The choices you make in the mobile app demo, such as favourites, meal plans and profile preferences, are stored locally in your browser on this device.' },
    { title: 'Contact messages', text: 'If you choose to submit the website contact form, the name, email address and message you provide are stored by this demonstration so the form can be tested. Please do not include sensitive health or payment information.' },
    { title: 'Your choices', text: 'You can reset locally stored demo data from the app profile. This draft is provided for illustration and must be reviewed and replaced with a complete UK GDPR-compliant policy before launch.' },
  ] },
  terms: { title: 'Terms & conditions', intro: 'The important things to know while exploring our product concept.', sections: [
    { title: 'A demonstration experience', text: 'This website and mobile app are a prototype. Authentication, social sign-in, AI generation, app downloads and subscriptions are simulated and do not create real accounts or services.' },
    { title: 'Nutrition information', text: 'Recipes, calorie targets and nutritional values are illustrative estimates, not verified food database information or medical advice. Always check ingredients and seek appropriate professional advice for your individual needs.' },
    { title: 'Before launch', text: 'These example terms are not final legal terms. A full set of UK consumer terms should be prepared and reviewed before the product is made available commercially.' },
  ] },
  subscriptions: { title: 'Subscription terms', intro: 'A transparent preview of the proposed MealMind AI plans.', sections: [
    { title: 'Free and Premium', text: 'The proposed Free plan costs £0 per month. The proposed Premium plan costs £9.99 per month and includes a 3-day free trial, with more simulated meal generations and enhanced planning features.' },
    { title: 'Trial and renewal', text: 'In the proposed product, Premium would renew at £9.99 per month after the 3-day trial unless cancelled. Customers would be able to manage or cancel their subscription. No payment or subscription is created by this prototype.' },
    { title: 'Demo only', text: 'The checkout is a visual and interactive preview. No payment processor is connected, no card details are collected and no automatic renewal will occur. Final subscription terms must be reviewed before launch.' },
  ] },
};
export default async function LegalPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params; const page = pages[topic]; if (!page) notFound();
  return <div className="legal-page"><header><Brand/><Link href="/">Back to website <ArrowUpRight size={15}/></Link></header><main><Link href="/" className="legal-back"><ArrowLeft size={15}/> Back to MealMind AI</Link><span className="eyebrow"><span className="eyebrow-dot"/> THE IMPORTANT STUFF</span><h1>{page.title}<em>.</em></h1><p className="legal-intro">{page.intro}</p><div className="legal-notice">✳ &nbsp; Product prototype · Illustrative information only</div>{page.sections.map(section => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}<Link href="/#contact" className="btn btn-dark">Have a question? Say hello <ArrowUpRight size={16}/></Link></main></div>;
}
