/*import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I set up my first membership tier?",
    answer: "Navigate to your dashboard > Monetization > Membership Tiers and click 'Create Tier'.",
  },
  {
    question: "What payment methods are supported?",
    answer: "We accept all major credit cards, PayPal, and 20+ regional payment methods.",
  },
];

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search help articles..."
              className="pl-10 py-6 text-lg"
            />
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}*/