import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const appointmentSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().optional(),
  service: z.string().min(1, "Please select a service"),
  preferred_date: z.string().min(1, "Please select a date and time"),
  message: z.string().trim().optional()
});

const Appointments = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    preferred_date: "",
    message: ""
  });

  const services = [
    "Web Application Development",
    "Desktop Application Development",
    "Android App Development",
    "AI Agent Development",
    "Hardware Maintenance",
    "General Consultation"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = appointmentSchema.parse(formData);
      setIsSubmitting(true);

      const { error: dbError } = await supabase
        .from("appointments")
        .insert([{
          name: validated.name,
          email: validated.email,
          phone: validated.phone || null,
          service: validated.service,
          preferred_date: new Date(validated.preferred_date).toISOString(),
          message: validated.message || null
        }]);

      if (dbError) throw dbError;

      const { error: emailError } = await supabase.functions.invoke("send-appointment-email", {
        body: validated
      });

      if (emailError) {
        console.error("Email error:", emailError);
      }

      toast({
        title: "Appointment Booked!",
        description: "We'll confirm your appointment via email shortly.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        preferred_date: "",
        message: ""
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to book appointment. Please try again.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <Calendar className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">Book an Appointment</h1>
          <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
            Schedule a consultation with our team to discuss your project requirements
          </p>
        </div>

        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
            <CardDescription>Fill out the form below and we'll confirm your appointment</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="service">Service *</Label>
                  <Select 
                    value={formData.service}
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="preferred_date">Preferred Date & Time *</Label>
                  <Input
                    id="preferred_date"
                    type="datetime-local"
                    value={formData.preferred_date}
                    onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                    min={new Date().toISOString().slice(0, 16)}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="message">Additional Information (Optional)</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us more about your project or specific requirements..."
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Booking..." : "Book Appointment"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 p-6 glass rounded-lg animate-fade-in" style={{ animationDelay: "100ms" }}>
          <h3 className="font-semibold text-foreground mb-2">What happens next?</h3>
          <ul className="space-y-2 text-foreground-muted">
            <li>• You'll receive a confirmation email within 24 hours</li>
            <li>• We'll review your requirements and prepare for the consultation</li>
            <li>• Meet with our team at your scheduled time</li>
            <li>• Receive a detailed proposal and timeline for your project</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Appointments;