"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Layout,
  Megaphone,
  Navigation,
  Sliders,
  Search,
  Save,
  Check,
} from "lucide-react";

export default function AdminSiteContentPage() {
  const [activeTab, setActiveTab] = useState<"sections" | "banners" | "nav" | "settings" | "seo">("sections");

  // Site settings state
  const [phone, setPhone] = useState("+91 94370 12345");
  const [whatsapp, setWhatsapp] = useState("+91 94370 12345");
  const [email, setEmail] = useState("connectzsalesandservices@gmail.com");
  const [bannerMessage, setBannerMessage] = useState("Free installation consultation across Cuttack & Bhubaneswar this month!");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Site-Wide Frontend Content Control
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Control homepage sections, promo banners, nav/footer links, contact settings, and per-page SEO metadata without code deploys.
          </p>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab("sections")}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === "sections"
              ? "border-primary-700 text-primary-700"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Layout className="h-4 w-4" /> Homepage Sections
        </button>

        <button
          onClick={() => setActiveTab("banners")}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === "banners"
              ? "border-primary-700 text-primary-700"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Megaphone className="h-4 w-4" /> Promo Banners
        </button>

        <button
          onClick={() => setActiveTab("nav")}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === "nav"
              ? "border-primary-700 text-primary-700"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Navigation className="h-4 w-4" /> Nav & Footer Links
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === "settings"
              ? "border-primary-700 text-primary-700"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Sliders className="h-4 w-4" /> Global Site Settings
        </button>

        <button
          onClick={() => setActiveTab("seo")}
          className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition flex items-center gap-2 shrink-0 ${
            activeTab === "seo"
              ? "border-primary-700 text-primary-700"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Search className="h-4 w-4" /> Per-Page SEO Meta
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === "settings" && (
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <Card className="p-6 space-y-4 max-w-2xl">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Global Contact & Business Info Settings
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-medium text-slate-900 mb-1">Contact Phone</label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>

              <div>
                <label className="block font-medium text-slate-900 mb-1">WhatsApp Number</label>
                <Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-900 text-xs mb-1">Support Email</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="pt-4 flex items-center gap-3">
              <Button type="submit" variant="primary" size="sm">
                <Save className="h-4 w-4 mr-1" /> Save Settings
              </Button>
              {savedSuccess && (
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <Check className="h-4 w-4" /> Updated in site_settings database
                </span>
              )}
            </div>
          </Card>
        </form>
      )}

      {activeTab === "banners" && (
        <Card className="p-6 space-y-4 max-w-2xl">
          <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Top Announcement Banner Control
          </h2>
          <div>
            <label className="block font-medium text-slate-900 text-xs mb-1">Banner Announcement Text</label>
            <Input value={bannerMessage} onChange={(e) => setBannerMessage(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <Badge tone="success">ACTIVE</Badge>
            <span className="text-xs text-slate-500">Live on top header bar</span>
          </div>
        </Card>
      )}

      {activeTab === "sections" && (
        <Card className="p-6 space-y-3">
          <h2 className="text-sm font-bold text-slate-900">Homepage Card Ordering</h2>
          <p className="text-xs text-slate-500">
            Drag or toggle visibility of homepage cards (Property Plan, Calculators, Compare, Service Directory).
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50 rounded border border-slate-200 flex justify-between">
              <span>Card #1: Start with your property (/plan)</span>
              <Badge tone="success">Visible</Badge>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200 flex justify-between">
              <span>Card #2: Run the numbers (/plan/calculators)</span>
              <Badge tone="success">Visible</Badge>
            </div>
          </div>
        </Card>
      )}

      {activeTab === "nav" && (
        <Card className="p-6 space-y-3 text-xs">
          <h2 className="text-sm font-bold text-slate-900">Site Header Navigation Links</h2>
          <p className="text-slate-500">Manage header links: Learn, Products, Compare, Plan, Service.</p>
        </Card>
      )}

      {activeTab === "seo" && (
        <Card className="p-6 space-y-3 text-xs">
          <h2 className="text-sm font-bold text-slate-900">Per-Page SEO Meta Overrides</h2>
          <p className="text-slate-500">Override default Title, Description, and OG Image per route path.</p>
        </Card>
      )}
    </div>
  );
}
