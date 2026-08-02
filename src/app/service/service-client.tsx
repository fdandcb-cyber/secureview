"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  ShieldCheck,
  Phone,
  BadgeCheck,
  Search,
} from "lucide-react";
import type { ServiceCenter } from "@/features/service-directory/repositories/service-repository";

const districts = [
  "All Districts",
  "Bhubaneswar",
  "Cuttack",
  "Puri",
  "Rourkela",
  "Berhampur",
  "Sambalpur",
  "Balasore",
  "Angul",
] as const;

export function ServiceClient({
  initialCenters,
}: {
  initialCenters: ServiceCenter[];
}) {
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCenters = initialCenters.filter((center) => {
    const matchesDistrict =
      selectedDistrict === "All Districts" ||
      center.district.toLowerCase() === selectedDistrict.toLowerCase();

    const matchesSearch =
      center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.brands.some((b) => b.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesDistrict && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10 font-sans">
      {/* Hero */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
          <BadgeCheck className="h-4 w-4" /> Odisha Verified Service Directory
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
          Verified CCTV Installers & Service Centers in Odisha
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Ground-verified security camera technician teams across Cuttack, Bhubaneswar, Puri, and all 30 Odisha districts.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by center name, brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 pl-9 pr-4 py-2 text-xs text-slate-950 placeholder:text-slate-400 focus:border-primary-600 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 md:pb-0">
          {districts.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDistrict(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedDistrict === d
                  ? "bg-slate-950 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Centers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCenters.map((center) => (
          <div
            key={center.id}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 transition"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    {center.district} District
                  </span>
                  <h3 className="text-base font-bold text-slate-950 mt-0.5">
                    {center.name}
                  </h3>
                </div>
                {center.verified && (
                  <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <ShieldCheck className="h-3.5 w-3.5 mr-1" /> VERIFIED
                  </span>
                )}
              </div>

              <div className="flex items-start gap-2 text-xs text-slate-600">
                <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{center.address}</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600 font-mono">
                <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                <a href={`tel:${center.phone}`} className="hover:underline font-bold text-slate-900">
                  {center.phone}
                </a>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">
                  Supported Brands:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {center.brands.map((b) => (
                    <span
                      key={b}
                      className="px-2 py-0.5 rounded bg-slate-100 text-[11px] font-medium text-slate-700"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 italic">
                {center.notes ?? "Verified Partner Center"}
              </span>
              <Link
                href="/contact"
                className="font-bold text-primary-700 hover:underline"
              >
                Request Service →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
