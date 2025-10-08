import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Globe, Smartphone, Brain, Wrench, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: "Web Applications",
      description: "Professional websites and web applications built with modern technologies",
      features: [
        "Responsive design for all devices",
        "E-commerce solutions",
        "Content management systems",
        "Progressive web apps (PWA)",
        "Custom web portals"
      ]
    },
    {
      icon: Code2,
      title: "Desktop Applications",
      description: "Powerful standalone software for Windows, Mac, and Linux platforms",
      features: [
        "Cross-platform compatibility",
        "High-performance applications",
        "Database integration",
        "Offline functionality",
        "Custom business tools"
      ]
    },
    {
      icon: Smartphone,
      title: "Android Applications",
      description: "Native mobile apps designed for optimal Android performance",
      features: [
        "Material Design UI/UX",
        "Google Play Store deployment",
        "Cloud synchronization",
        "Push notifications",
        "Offline-first architecture"
      ]
    },
    {
      icon: Brain,
      title: "AI Agent Development",
      description: "Intelligent automation solutions powered by artificial intelligence",
      features: [
        "Custom AI chatbots",
        "Process automation",
        "Natural language processing",
        "Machine learning integration",
        "Intelligent data analysis"
      ]
    },
    {
      icon: Wrench,
      title: "Hardware Maintenance",
      description: "Professional computer hardware repair and maintenance services",
      features: [
        "Hardware diagnostics",
        "Component replacement",
        "System upgrades",
        "Performance optimization",
        "Preventive maintenance"
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold text-foreground mb-4">Our Services</h1>
          <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
            Comprehensive software and hardware solutions to meet all your business technology needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="hover:shadow-elegant transition-all animate-fade-in hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="mb-4">
                  <service.icon className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Sparkles className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-foreground-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="glass rounded-lg p-8 md:p-12 text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-foreground-muted mb-8 max-w-2xl mx-auto">
            Get in touch with us to discuss your requirements and receive a customized solution for your business
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg">
                Contact Us
              </Button>
            </Link>
            <Link to="/appointments">
              <Button size="lg" variant="outline">
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;