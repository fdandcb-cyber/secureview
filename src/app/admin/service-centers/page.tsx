"use client";

import { useState } from "react";
import {
  MapPin,
  BadgeCheck,
  Plus,
  Search,
  ShieldCheck,
  Star,
  X,
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
    brands: ["Hikvision", "Dahua", "Uniview"],
    authorizedBrands: ["Hikvision", "Dahua"],
    verified: true,
    resolvedCases: 98,
    rating: 4.4,
  },
  {
    id: "3",
    name: "Eagle Eye Security",
    district: "Bhubaneswar",
    address: "Patia, Near KIIT University, Bhubaneswar - 751024",
    phone: "+91 87630 98765",
    brands: ["CP Plus", "Godrej", "Honeywell"],
    authorizedBrands: ["CP Plus", "Godrej"],
    verified: true,
    resolvedCases: 210,
    rating: 4.7,
  },
  {
    id: "4",
    name: "Rourkela Security Systems",
    district: "Rourkela",
    address: "Main Road, Sector 4, Rourkela - 769002",
    phone: "+91 77350 45678",
    brands: ["Hikvision", "CP Plus"],
    authorizedBrands: ["Hikvision"],
    verified: true,
    resolvedCases: 67,
    rating: 4.2,
  },
  {
    id: "5",
    name: "Puri Surveillance Hub",
    district: "Puri",
    address: "Grand Road, Near Jagannath Temple, Puri - 752001",
    phone: "+91 94380 56789",
    brands: ["Hikvision", "Dahua"],
    authorizedBrands: ["Dahua"],
    verified: true,
    resolvedCases: 45,
    rating: 4.3,
  },
  {
    id: "6",
    name: "Sambalpur Tech Services",
    district: "Sambalpur",
    address: "VSS Marg, Near Bus Stand, Sambalpur - 768001",
    phone: "+91 98610 11223",
    brands: ["CP Plus", "Dahua"],
    authorizedBrands: [],
    verified: false,
    resolvedCases: 12,
    rating: 4.0,
  },
];

const districts = [
  "All Districts",
  "Bhubaneswar",
  "Cuttack",
  "Puri",
  "Rourkela",
  "Berhampur",
  "Sambalpur",
] as const;

export default function AdminServiceCentersPage() {
  const [centers, setCenters] = useState<ServiceCenterItem[]>(initialCenters);
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("Bhubaneswar");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [authHikvision, setAuthHikvision] = useState(true);
  const [authCpPlus, setAuthCpPlus] = useState(false);

  const filteredCenters = centers.filter((c) => {
    const matchesDistrict =
      selectedDistrict === "All Districts" || c.district === selectedDistrict;
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.district.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDistrict && matchesSearch;
  });

  const toggleVerification = (id: string) => {
    setCenters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, verified: !c.verified } : c))
    );
  };

  const handleAddCenter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const authorizedBrands: string[] = [];
    if (authHikvision) authorizedBrands.push("Hikvision");
    if (authCpPlus) authorizedBrands.push("CP Plus");

    const newCenter: ServiceCenterItem = {
      id: Date.now().toString(),
      name,
      district,
      address,
      phone,
      brands: ["Hikvision", "CP Plus"],
      authorizedBrands,
      verified: true,
      resolvedCases: 0,
      rating: 5.0,
    };

    setCenters((prev) => [newCenter, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary-700" />
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Odisha Service Directory Portal
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Founder-verified installer directory, brand authorization tags, and district coverage.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-700 hover:bg-primary-600 text-white rounded-lg text-sm font-semibold transition shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Register & Verify Center
        </button>
      </div>

      {/* District Chips & Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Filter by Odisha District
          </span>
          <span className="text-xs text-slate-400">
            {filteredCenters.length} centers found
          </span>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search service centers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 pl-9 pr-4 py-1.5 text-xs text-slate-950 placeholder:text-slate-400 focus:border-primary-600 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {districts.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDistrict(d)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                selectedDistrict === d
                  ? "bg-primary-700 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCenters.map((center) => (
          <div
            key={center.id}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base">
                      {center.name}
                    </h3>
                    {center.verified && (
                      <BadgeCheck className="h-5 w-5 text-emerald-600" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="h-3.5 w-3.5 text-primary-700" />
                    {center.district} District
                  </p>
                </div>

                <button
                  onClick={() => toggleVerification(center.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition ${
                    center.verified
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                      : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                  }`}
                >
                  {center.verified ? "Verified ✓" : "Pending Verify"}
                </button>
              </div>

              <p className="text-xs text-slate-600 mt-3">{center.address}</p>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-[11px] font-semibold uppercase text-slate-400 block mb-1.5">
                  Brand Authorizations
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {center.authorizedBrands.map((brand) => (
                    <span
                      key={brand}
                      className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2 py-0.5 rounded-full font-medium"
                    >
                      <ShieldCheck className="h-3 w-3" />
                      {brand}
                    </span>
                  ))}
                  {center.authorizedBrands.length === 0 && (
                    <span className="text-xs text-slate-400 italic">
                      No official brand authorization uploaded
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>{center.resolvedCases} Cases Resolved</span>
              <span className="flex items-center gap-1 font-semibold text-slate-900">
                <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                {center.rating} Rating
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Center Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h2 className="text-base font-bold text-slate-900">
                Verify New Service Center (Odisha)
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddCenter} className="p-6 space-y-4 text-sm">
              <div>
                <label className="block font-medium text-slate-900 mb-1">Business Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Kalinga Security Solutions"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-900 mb-1">District</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-600 bg-white"
                >
                  <option value="Bhubaneswar">Bhubaneswar</option>
                  <option value="Cuttack">Cuttack</option>
                  <option value="Puri">Puri</option>
                  <option value="Rourkela">Rourkela</option>
                  <option value="Berhampur">Berhampur</option>
                  <option value="Sambalpur">Sambalpur</option>
                  <option value="Balasore">Balasore</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-900 mb-1">Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street / Area, City, Pin Code"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-900 mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 94370 00000"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-900 mb-2">Verified Authorizations</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={authHikvision}
                      onChange={(e) => setAuthHikvision(e.target.checked)}
                      className="rounded border-slate-300 text-primary-700 focus:ring-primary-600"
                    />
                    <span>Hikvision Authorized Service Partner</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={authCpPlus}
                      onChange={(e) => setAuthCpPlus(e.target.checked)}
                      className="rounded border-slate-300 text-primary-700 focus:ring-primary-600"
                    />
                    <span>CP Plus Authorized Partner</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary-700 text-white rounded-lg text-sm font-semibold hover:bg-primary-600 transition"
                >
                  Register & Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
