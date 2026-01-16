import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Mail, 
  Send, 
  X,
  CheckCircle,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export function FeedbackForm() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      toast({
        title: 'Thank you!',
        description: 'Your feedback has been submitted successfully.',
      });
    }, 2000);
  };

  if (!showForm) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2"
        onClick={() => setShowForm(true)}
        data-testid="button-feedback"
      >
        <MessageSquare className="h-4 w-4" />
        Share Feedback
      </Button>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
        <CardTitle className="text-lg">Share Your Feedback</CardTitle>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setShowForm(false)}
          data-testid="button-close-feedback"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center py-4"
            >
              <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
              <p className="font-medium">Thank you!</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="space-y-3"
            >
              <div className="space-y-1">
                <Label htmlFor="name" className="text-sm">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  data-testid="input-feedback-name"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  data-testid="input-feedback-email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="message" className="text-sm">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you think..."
                  rows={3}
                  data-testid="input-feedback-message"
                />
              </div>
              <Button type="submit" className="w-full" size="sm" data-testid="button-submit-feedback">
                <Send className="h-4 w-4 mr-2" />
                Send Feedback
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

export function NewsletterSignup() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setSubscribed(true);
    toast({
      title: 'Subscribed!',
      description: 'You\'ll receive updates about the Gaia Commons initiative.',
    });
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="bg-card border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <Mail className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Stay Updated</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-3">
        Get the latest news about the One Vote, Forever Fed initiative
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1"
          disabled={subscribed}
          data-testid="input-newsletter-email"
        />
        <Button 
          type="submit" 
          size="sm" 
          disabled={subscribed}
          data-testid="button-newsletter-subscribe"
        >
          {subscribed ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            'Subscribe'
          )}
        </Button>
      </form>
    </div>
  );
}

export function SocialShareButtons() {
  const { toast } = useToast();
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: 'Link Copied',
        description: 'Dashboard link copied to clipboard.',
      });
    } catch {
      toast({
        title: 'Copy Failed',
        description: 'Could not copy link. Please copy the URL manually.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex items-center gap-1">
      <span className="text-sm text-muted-foreground mr-1">Share:</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopyLink}
        data-testid="button-share-link"
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function EngagementFooter() {
  return (
    <div className="border-t pt-8 mt-12 print:hidden">
      <div className="grid md:grid-cols-3 gap-6 items-start">
        <NewsletterSignup />
        <div className="flex items-center justify-center">
          <FeedbackForm />
        </div>
        <div className="flex items-center justify-center md:justify-end">
          <SocialShareButtons />
        </div>
      </div>
    </div>
  );
}
