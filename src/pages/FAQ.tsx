import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "What types of software do you develop?",
      answer: "We specialize in custom web applications, desktop software for Windows/Mac/Linux, native Android mobile apps, and AI agent solutions. We also provide computer hardware maintenance services."
    },
    {
      question: "How long does it take to develop a custom application?",
      answer: "The timeline varies depending on project complexity. A simple website might take 2-4 weeks, while a complex enterprise application could take 3-6 months. We provide detailed timelines during the consultation phase."
    },
    {
      question: "What is your development process?",
      answer: "We follow an agile development methodology: (1) Requirements gathering and consultation, (2) Design and planning, (3) Development with regular updates, (4) Testing and quality assurance, (5) Deployment and training, (6) Ongoing support and maintenance."
    },
    {
      question: "Do you provide ongoing support after project completion?",
      answer: "Yes! We offer comprehensive maintenance and support packages. This includes bug fixes, updates, security patches, and feature enhancements as your business grows."
    },
    {
      question: "What are your pricing models?",
      answer: "We offer flexible pricing options: fixed-price projects for well-defined scopes, hourly rates for ongoing work, and monthly retainers for continuous support. We provide detailed quotes after understanding your requirements."
    },
    {
      question: "Can you help migrate an existing application?",
      answer: "Absolutely! We have experience migrating legacy systems to modern platforms, upgrading outdated technologies, and improving application performance while maintaining data integrity."
    },
    {
      question: "Do you work with clients remotely?",
      answer: "Yes, we work with clients worldwide. We use modern collaboration tools and maintain regular communication through video calls, project management platforms, and instant messaging."
    },
    {
      question: "What technologies do you use?",
      answer: "We use modern, proven technologies including React, Node.js, Python, Java, and various mobile frameworks. We select the best technology stack based on your specific requirements and long-term goals."
    },
    {
      question: "How do you ensure the security of my application?",
      answer: "Security is our top priority. We implement industry best practices including secure coding standards, encryption, regular security audits, authentication systems, and data protection measures."
    },
    {
      question: "Can you integrate with existing systems?",
      answer: "Yes, we specialize in system integration. We can connect your new application with existing databases, CRM systems, payment gateways, third-party APIs, and other business tools."
    },
    {
      question: "What is AI agent development?",
      answer: "AI agents are intelligent software systems that can automate tasks, process natural language, make decisions, and interact with users. We build custom AI solutions including chatbots, automation workflows, and intelligent assistants."
    },
    {
      question: "Do you provide training for the applications you build?",
      answer: "Yes! We provide comprehensive training for your team, including documentation, video tutorials, and hands-on sessions to ensure everyone can effectively use the new system."
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <HelpCircle className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
            Find answers to common questions about our services and development process
          </p>
        </div>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Common Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground-muted">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="mt-12 p-8 glass rounded-lg text-center animate-fade-in" style={{ animationDelay: "100ms" }}>
          <h3 className="text-2xl font-semibold text-foreground mb-3">Still Have Questions?</h3>
          <p className="text-foreground-muted mb-6">
            Can't find the answer you're looking for? Feel free to reach out to our team.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/contact">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-primary text-primary-foreground hover:shadow-lg hover:scale-105 shadow-md h-11 px-6 py-3">
                Contact Us
              </button>
            </a>
            <a href="/appointments">
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-primary text-primary bg-background hover:bg-primary hover:text-primary-foreground hover:shadow-md h-11 px-6 py-3">
                Book Appointment
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;