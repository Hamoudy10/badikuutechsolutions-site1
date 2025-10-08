import { Link } from "react-router-dom";
import { Code2, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">BadikuuTech</span>
            </div>
            <p className="text-foreground-muted text-sm">
              Transforming businesses through innovative software solutions and professional hardware services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground-muted hover:text-primary text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-foreground-muted hover:text-primary text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-foreground-muted hover:text-primary text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-foreground-muted hover:text-primary text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-foreground-muted">
              <li>Web Applications</li>
              <li>Desktop Software</li>
              <li>Android Apps</li>
              <li>AI Agent Development</li>
              <li>Hardware Maintenance</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-foreground-muted">
                <Mail className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <a href="mailto:hamoudybadi@gmail.com" className="hover:text-primary">
                  hamoudybadi@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground-muted">
                <Phone className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <a href="tel:+254742773562" className="hover:text-primary">
                  +254 742 773 562
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground-muted">
                <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span>Mombasa, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-foreground-muted">
          <p>&copy; {new Date().getFullYear()} BadikuuTech Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;