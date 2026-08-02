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

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("general");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="max-w-3xl">
        <Badge tone="primary" className="mb-2">
          Contact & Support Portal
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Get in Touch with SecureView Odisha
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
                  Thank you {name}. Our Odisha support team will reach out to you at {phone} shortly.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-slate-900 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-900 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="tel"
                      required
                      placeholder="+91 94370 00000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-slate-900 mb-1">
                      Email Address (Optional)
                    </label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-900 mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full h-10 px-3 border border-slate-200 rounded-control bg-white text-sm text-slate-900 focus:outline-none focus:border-primary-600"
                    >
                      <option value="general">General Technology Question</option>
                      <option value="quote-follow-up">Quote & Sizing Assistance</option>
                      <option value="service-issue">Odisha Service Center Verification</option>
                      <option value="partnership">Installer Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-900 mb-1">
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

                <Button type="submit" variant="primary" className="w-full sm:w-auto">
                  <Send className="h-4 w-4 mr-2" /> Submit Inquiry
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
                  +91 94370 12345
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-primary-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-950 block">Email Support:</strong>
                  connectzsalesandservices@gmail.com
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-950 block">Headquarters:</strong>
                  Saheed Nagar, Bhubaneswar, Odisha - 751007
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
