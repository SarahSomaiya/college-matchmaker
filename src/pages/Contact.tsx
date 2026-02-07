import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageCircle, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
    
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Get in Touch
            </h1>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Have questions or feedback? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="font-display flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Your Name</Label>
                    <Input
                      id="contact-name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      maxLength={100}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email Address</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      maxLength={255}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="How can we help you?"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      maxLength={1000}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-hero flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground">
                        Email Support
                      </h3>
                      <p className="mt-1 text-muted-foreground text-sm">
                        Get help with your college search
                      </p>
                      <a
                        href="mailto:support@collegexed.com"
                        className="mt-2 inline-block text-primary font-medium hover:underline"
                      >
                        support@collegexed.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card border-accent/30 bg-accent/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 flex-shrink-0">
                      <AlertCircle className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground">
                        Report Data Issues
                      </h3>
                      <p className="mt-1 text-muted-foreground text-sm">
                        Found incorrect or outdated college information? Let us know 
                        and we'll update it as soon as possible.
                      </p>
                      <a
                        href="mailto:data@collegexed.com"
                        className="mt-2 inline-block text-accent font-medium hover:underline"
                      >
                        data@collegexed.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-6">
                  <h3 className="font-display font-bold text-foreground mb-3">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-foreground">How accurate are the admission chances?</p>
                      <p className="text-muted-foreground">
                        Our predictions are based on historical data and are indicative only.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Is this service free?</p>
                      <p className="text-muted-foreground">
                        Yes! CollegeXed is completely free to use for all students.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">How often is data updated?</p>
                      <p className="text-muted-foreground">
                        We update college data and fee information regularly.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}