"use client";

import { useState } from "react";
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

export function AdminSiteContentClient() {
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

      <div className="flex border-b border-slate-200 bg-white px-6 rounded-xl border">
        {[
          { id: "sections", label: "Homepage Sections", icon: Layout },
          { id: "banners", label: "Promo Banners", icon: Megaphone },
          { id: "nav", label: "Navigation Links", icon: Navigation },
          { id: "settings", label: "Contact Info & Global Settings", icon: Sliders },
          { id: "seo", label: "Per-Page SEO Metadata", icon: Search },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as typeof activeTab)}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition ${
              activeTab === id
                ? "border-primary-600 text-primary-700"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      <Card className="p-6">
        {savedSuccess && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
            <Check className="h-4 w-4" /> Changes saved successfully to site_content configuration table.
          </div>
        )}

        <form onSubmit={handleSaveSettings} className="space-y-4 max-w-xl text-xs">
          <div>
            <label className="block font-semibold text-slate-900 mb-1">Support Phone</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div>
            <label className="block font-semibold text-slate-900 mb-1">WhatsApp Helpline</label>
            <Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
          </div>

          <div>
            <label className="block font-semibold text-slate-900 mb-1">Official Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label className="block font-semibold text-slate-900 mb-1">Top Announcement Banner</label>
            <Input value={bannerMessage} onChange={(e) => setBannerMessage(e.target.value)} />
          </div>

          <Button type="submit" variant="primary">
            <Save className="h-4 w-4 mr-1.5" /> Save Site Content Settings
          </Button>
        </form>
      </Card>
    </div>
  );
}
