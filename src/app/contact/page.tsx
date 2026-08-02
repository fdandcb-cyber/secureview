"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
} from "lucide-react";

import { BRAND } from "@/config/brand";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState<"general" | "quote_follow_up" | "service_issue" | "partnership">("general");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;
    setSubmitting(true);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: email || undefined,
          message,
          inquiry_type: inquiryType,
        }),
      });
    } catch {
      // Fallback
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 font-sans">
      {/* Header */}
      <div className="max-w-3xl">
        <Badge tone="primary" className="mb-2">
          Contact & Support Portal
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Get in Touch with {BRAND.siteName}
        </h1>
        <p className="mt-3 text-base text-slate-700 leading-relaxed">
          Have a question about security camera specifications, local Odisha installer verification, or an existing quote? Send us an inquiry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card className="p-6 sm:p-8 space-y-6">
            {submitted ? (
              <div className="p-6 rounded-lg bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-950">
                  Inquiry Submitted Successfully!
                </h3>
                <p className="text-xs text-slate-700">
                  Thank you {name}. Our support team will reach out to you at {phone} shortly.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-slate-900 mb-1 text-xs">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      placeholder="e.g. Rakesh Mohanty"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-900 mb-1 text-xs">
                      Phone / WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      placeholder={BRAND.mobile}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-slate-900 mb-1 text-xs">
                      Email Address (Optional)
                    </label>
                    <Input
                      type="email"
                      placeholder={BRAND.supportEmail}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-900 mb-1 text-xs">
                      Inquiry Category
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value as "general" | "quote_follow_up" | "service_issue" | "partnership")}
                      className="w-full h-10 px-3 border border-slate-200 rounded-control bg-white text-sm text-slate-900 focus:outline-none focus:border-primary-600"
                    >
                      <option value="general">General Technology Question</option>
                      <option value="quote_follow_up">Quote & Sizing Assistance</option>
                      <option value="service_issue">Odisha Service Center Verification</option>
                      <option value="partnership">Installer Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-900 mb-1 text-xs">
                    Your Message / Requirements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your property, camera requirements, or inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-control text-sm text-slate-900 focus:outline-none focus:border-primary-600"
                  />
                </div>

                <Button type="submit" variant="primary" disabled={submitting} className="w-full sm:w-auto">
                  <Send className="h-4 w-4 mr-2" /> {submitting ? "Submitting..." : "Submit Inquiry"}
                </Button>
              </form>
            )}
          </Card>
        </div>

        {/* Contact Info Sidebar */}
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-base font-bold text-slate-950 border-b border-slate-100 pb-3">
              Direct Contact Details
            </h2>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-primary-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-950 block">Phone & WhatsApp:</strong>
                  <a href={BRAND.mobileHref} className="hover:underline font-bold text-slate-900">{BRAND.mobile}</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-primary-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-950 block">Email Support:</strong>
                  <a href={`mailto:${BRAND.supportEmail}`} className="hover:underline font-bold text-slate-900">{BRAND.supportEmail}</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-950 block">Headquarters / Office:</strong>
                  {BRAND.officeLocation}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-primary-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-950 block">Business Hours:</strong>
                  Mon - Sat: 9:00 AM - 7:00 PM IST
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
