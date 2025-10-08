import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Smartphone, Globe, Brain, Wrench, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const services = [
    {
      icon: Globe,
      title: "Web Applications",
      description: "Custom websites and web apps tailored to your business needs"
    },
    {
      icon: Code2,
      title: "Desktop Applications",
      description: "Standalone desktop software for Windows, Mac, and Linux"
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native Android applications for your mobile business solutions"
    },
    {
      icon: Brain,
      title: "AI Agent Development",
      description: "Intelligent AI agents to automate and enhance your workflows"
    },
    {
      icon: Wrench,
      title: "Hardware Maintenance",
      description: "Professional computer hardware repair and maintenance services"
    }
  ];

  const benefits = [
    "Custom solutions tailored to your needs",
    "Modern, scalable technology",
    "Ongoing support and maintenance",
    "Fast turnaround times",
    "Competitive pricing"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary via-primary-variant to-background overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDQ4YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6">
              BadikuuTech Solutions
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
              Transforming Your Business Through Innovative Software Solutions
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-surface">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
              Comprehensive software solutions to digitize and streamline your business operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="glass rounded-lg p-8 hover:shadow-lg transition-all hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <service.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-foreground-muted">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Why Choose BadikuuTech?</h2>
              <p className="text-lg text-foreground-muted mb-8">
                We specialize in creating custom software solutions that help businesses achieve their digital transformation goals. From concept to deployment, we're with you every step of the way.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <CheckCircle className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                    <p className="text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Ready to Get Started?</h3>
              <p className="text-foreground-muted mb-6">
                Book a consultation with our team to discuss your project requirements and receive a custom quote.
              </p>
              <Link to="/appointments">
                <Button size="lg" className="w-full">
                  Book Appointment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Contact us today to discuss how we can help digitize your business
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary">
              Contact Us Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;