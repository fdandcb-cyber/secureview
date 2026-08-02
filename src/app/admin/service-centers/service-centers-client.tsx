"use client";

import { useState } from "react";
import {
  MapPin,
  BadgeCheck,
  Plus,
  Search,
  Star,
} from "lucide-react";

type ServiceCenterItem = {
  id: string;
  name: string;
  district: string;
  address: string;
  phone: string;
  brands: string[];
  authorizedBrands: string[];
  verified: boolean;
  resolvedCases: number;
  rating: number;
};

const initialCenters: ServiceCenterItem[] = [
  {
    id: "1",
    name: "SecureTech Solutions",
    district: "Bhubaneswar",
    address: "Saheed Nagar, Near SBI Main Branch, Bhubaneswar - 751007",
    phone: "+91 94370 12345",
    brands: ["Hikvision", "CP Plus", "Dahua"],
    authorizedBrands: ["Hikvision", "CP Plus"],
    verified: true,
    resolvedCases: 156,
    rating: 4.6,
  },
  {
    id: "2",
    name: "Odisha CCTV Pro",
    district: "Cuttack",
    address: "College Square, Mangalabag, Cuttack - 753001",
    phone: "+91 96581 23456",
    brands: ["Dahua", "CP Plus"],
    authorizedBrands: ["Dahua"],
    verified: true,
    resolvedCases: 98,
    rating: 4.5,
  },
];

export function AdminServiceCentersClient() {
  const [centers, setCenters] = useState<ServiceCenterItem[]>(initialCenters);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All");

  const filtered = centers.filter((c) => {
    const matchesDistrict = selectedDistrict === "All" || c.district === selectedDistrict;
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDistrict && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary-700" />
            <h1 className="text-xl font-bold text-slate-900">
              Odisha Service Centers Directory
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Manage local Odisha district camera service centers, verified badges, and brand authorizations.
          </p>
        </div>

        <button
          onClick={() => {
            const newC: ServiceCenterItem = {
              id: `sc-${Date.now()}`,
              name: "New Odisha Service Center",
              district: "Berhampur",
              address: "Main Road, Berhampur - 760001",
              phone: "+91 94370 00000",
              brands: ["Hikvision"],
              authorizedBrands: ["Hikvision"],
              verified: true,
              resolvedCases: 10,
              rating: 4.8,
            };
            setCenters([newC, ...centers]);
          }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-700 hover:bg-primary-600 text-white rounded-lg text-sm font-semibold transition"
        >
          <Plus className="h-4 w-4" /> Add Service Center
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search center, address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-primary-600"
          />
        </div>

        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
        >
          <option value="All">All Odisha Districts</option>
          <option value="Bhubaneswar">Bhubaneswar</option>
          <option value="Cuttack">Cuttack</option>
          <option value="Puri">Puri</option>
          <option value="Rourkela">Rourkela</option>
          <option value="Berhampur">Berhampur</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((c) => (
          <div key={c.id} className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{c.name}</h3>
                  {c.verified && (
                    <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      <BadgeCheck className="h-3 w-3 mr-0.5" /> Verified
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{c.address}</p>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                <Star className="h-3.5 w-3.5 fill-amber-500" /> {c.rating}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span>District: <strong>{c.district}</strong></span>
              <span>Phone: <strong className="font-mono">{c.phone}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
