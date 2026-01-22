import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Share2, 
  Copy, 
  Check, 
  Mail, 
  MessageCircle,
  QrCode,
  Link2,
  Users
} from "lucide-react";
import { SiFacebook, SiX, SiLinkedin, SiReddit } from "react-icons/si";

const SHARE_URL = typeof window !== 'undefined' ? window.location.href : 'https://gaia-commons.replit.app';
const SHARE_TITLE = "One Vote, Forever Fed — 2026 Ballot Initiative";
const SHARE_TEXT = "Support the Gaia Commons Council 2026 ballot initiative: $5B endowment to feed 712,500 Minnesota students daily through 1,200 school greenhouses. Vote for perpetual food security!";

export function SocialSharing() {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      toast({
        title: "Link Copied!",
        description: "Share link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  const shareLinks = [
    {
      name: "Facebook",
      icon: <SiFacebook className="h-4 w-4" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}&quote=${encodeURIComponent(SHARE_TEXT)}`,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "X (Twitter)",
      icon: <SiX className="h-4 w-4" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(SHARE_URL)}&text=${encodeURIComponent(SHARE_TEXT)}`,
      color: "bg-black hover:bg-gray-800",
    },
    {
      name: "LinkedIn",
      icon: <SiLinkedin className="h-4 w-4" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SHARE_URL)}`,
      color: "bg-blue-700 hover:bg-blue-800",
    },
    {
      name: "Reddit",
      icon: <SiReddit className="h-4 w-4" />,
      url: `https://reddit.com/submit?url=${encodeURIComponent(SHARE_URL)}&title=${encodeURIComponent(SHARE_TITLE)}`,
      color: "bg-orange-600 hover:bg-orange-700",
    },
    {
      name: "Email",
      icon: <Mail className="h-4 w-4" />,
      url: `mailto:?subject=${encodeURIComponent(SHARE_TITLE)}&body=${encodeURIComponent(SHARE_TEXT + '\n\n' + SHARE_URL)}`,
      color: "bg-gray-600 hover:bg-gray-700",
    },
    {
      name: "SMS",
      icon: <MessageCircle className="h-4 w-4" />,
      url: `sms:?body=${encodeURIComponent(SHARE_TEXT + ' ' + SHARE_URL)}`,
      color: "bg-green-600 hover:bg-green-700",
    },
  ];

  const openShare = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  return (
    <Card className="glass-panel" data-testid="card-social-sharing">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-4">
        <Share2 className="h-5 w-5 text-primary" />
        <CardTitle className="text-lg font-semibold">Share & Spread the Word</CardTitle>
        <Badge variant="secondary" className="ml-auto">Outreach</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Help build the largest political coalition in US history. Share with your network to support food security for every Minnesota student.
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
          {shareLinks.map((link) => (
            <Button
              key={link.name}
              variant="outline"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-3 text-white border-0 ${link.color}`}
              onClick={() => link.url.startsWith('mailto:') || link.url.startsWith('sms:') 
                ? window.location.href = link.url 
                : openShare(link.url)
              }
              data-testid={`button-share-${link.name.toLowerCase().replace(/[^a-z]/g, '')}`}
            >
              {link.icon}
              <span className="text-xs">{link.name}</span>
            </Button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex gap-2">
            <Input
              value={SHARE_URL}
              readOnly
              className="text-sm"
              data-testid="input-share-url"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              data-testid="button-copy-link"
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowQR(!showQR)}
            className="flex items-center gap-2"
            data-testid="button-toggle-qr"
          >
            <QrCode className="h-4 w-4" />
            QR Code
          </Button>
        </div>

        {showQR && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-border/50 flex flex-col items-center">
            <div className="w-32 h-32 bg-muted flex items-center justify-center rounded">
              <QrCode className="h-16 w-16 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Scan to visit on mobile</p>
          </div>
        )}

        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium text-foreground text-sm">Join 101M+ Coalition Members</p>
              <p className="text-xs text-muted-foreground mt-1">
                Every share helps reach our goal of 58%+ voter support for the 2026 ballot initiative.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
