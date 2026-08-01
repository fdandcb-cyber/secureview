"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Store,
  Warehouse,
  Tractor,
  Building2,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Eye,
  DoorOpen,
  Car,
  Package,
} from "lucide-react";

const propertyTypes = [
  { id: "home", label: "Home / Apartment", icon: Home, description: "Residential property — entry points, perimeter, parking" },
  { id: "shop", label: "Retail Shop", icon: Store, description: "Commercial retail — storefront, billing area, stockroom" },
  { id: "warehouse", label: "Warehouse / Godown", icon: Warehouse, description: "Large open space — loading docks, inventory aisles, entry/exit" },
  { id: "farm", label: "Farm / Agricultural", icon: Tractor, description: "Open area — perimeter, gates, equipment, livestock" },
  { id: "office", label: "Office / Commercial", icon: Building2, description: "Office building — reception, corridors, server room, parking" },
] as const;

const securityPriorities = [
  { id: "theft", label: "Theft prevention", icon: ShieldCheck },
  { id: "monitoring", label: "Live monitoring", icon: Eye },
  { id: "entry", label: "Entry/exit tracking", icon: DoorOpen },
  { id: "parking", label: "Vehicle/parking", icon: Car },
  { id: "inventory", label: "Inventory oversight", icon: Package },
] as const;

type Step = 0 | 1 | 2 | 3;

export default function PlanPage() {
  const [step, setStep] = useState<Step>(0);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [cameraCount, setCameraCount] = useState(4);

  const togglePriority = (id: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
        Requirement Wizard
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        Plan your security system
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
        Answer a few questions about your space and priorities. We&apos;ll
        suggest 2-3 system configurations — never one forced pick — with
        reasoning explained.
      </p>

      {/* Progress indicator */}
      <div className="mt-10 flex items-center gap-2">
        {[0, 1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition ${
                s <= step
                  ? "bg-primary-700 text-white"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              {s + 1}
            </div>
            {s < 3 && (
              <div
                className={`h-0.5 w-8 transition ${
                  s < step ? "bg-primary-700" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        ))}
        <span className="ml-3 text-sm text-slate-500">
          {step === 0 && "Property type"}
          {step === 1 && "Security priorities"}
          {step === 2 && "Coverage areas"}
          {step === 3 && "Recommendations"}
        </span>
      </div>

      {/* Step 0: Property Type */}
      {step === 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-slate-950">
            What type of property are you securing?
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {propertyTypes.map(({ id, label, icon: Icon, description }) => (
              <button
                key={id}
                onClick={() => setSelectedProperty(id)}
                className={`flex items-start gap-4 rounded-card border p-5 text-left transition ${
                  selectedProperty === id
                    ? "border-primary-600 bg-primary-50 ring-2 ring-primary-600/20"
                    : "border-slate-200 bg-white hover:border-primary-600"
                }`}
              >
                <Icon
                  className={`mt-0.5 h-6 w-6 shrink-0 ${
                    selectedProperty === id
                      ? "text-primary-700"
                      : "text-slate-500"
                  }`}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-950">
                    {label}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{description}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <button
              onClick={() => selectedProperty && setStep(1)}
              disabled={!selectedProperty}
              className="inline-flex items-center gap-2 rounded-control bg-primary-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-600 disabled:opacity-50"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Priorities */}
      {step === 1 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-slate-950">
            What are your main security priorities?
          </h2>
          <p className="mt-1 text-sm text-slate-500">Select all that apply</p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {securityPriorities.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => togglePriority(id)}
                className={`flex items-center gap-3 rounded-card border p-4 text-left transition ${
                  selectedPriorities.includes(id)
                    ? "border-primary-600 bg-primary-50 ring-2 ring-primary-600/20"
                    : "border-slate-200 bg-white hover:border-primary-600"
                }`}
              >
                <Icon
                  className={`h-5 w-5 shrink-0 ${
                    selectedPriorities.includes(id)
                      ? "text-primary-700"
                      : "text-slate-500"
                  }`}
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-slate-950">
                  {label}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(0)}
              className="inline-flex items-center gap-2 rounded-control border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-primary-600"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            <button
              onClick={() => selectedPriorities.length > 0 && setStep(2)}
              disabled={selectedPriorities.length === 0}
              className="inline-flex items-center gap-2 rounded-control bg-primary-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-600 disabled:opacity-50"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Camera count */}
      {step === 2 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-slate-950">
            How many camera positions do you need?
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Count entry/exit points, critical areas, and perimeter coverage
            zones. Don&apos;t worry about exact models yet.
          </p>

          <div className="mt-6 rounded-card border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setCameraCount(Math.max(1, cameraCount - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-primary-600 hover:text-primary-700"
              >
                -
              </button>
              <span className="text-4xl font-semibold text-slate-950">
                {cameraCount}
              </span>
              <button
                onClick={() => setCameraCount(Math.min(32, cameraCount + 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-primary-600 hover:text-primary-700"
              >
                +
              </button>
              <span className="text-sm text-slate-500">cameras</span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[2, 4, 8, 16].map((n) => (
                <button
                  key={n}
                  onClick={() => setCameraCount(n)}
                  className={`rounded-control border px-3 py-2 text-sm font-medium transition ${
                    cameraCount === n
                      ? "border-primary-600 bg-primary-50 text-primary-700"
                      : "border-slate-200 text-slate-700 hover:border-primary-600"
                  }`}
                >
                  {n} cameras
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 rounded-control border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-primary-600"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 rounded-control bg-primary-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-600"
            >
              See recommendations
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Recommendations */}
      {step === 3 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-slate-950">
            Recommended system options
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Three configurations for {cameraCount} cameras — different
            trade-offs, same reliability.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Budget option */}
            <div className="rounded-card border border-slate-200 bg-white p-6">
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                Budget
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-950">
                CP Plus IP System
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Solid 4MP coverage at the best price point. Good for basic
                monitoring and recording needs.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>• {cameraCount}× CP Plus 4MP Bullet (CP-UNC-TA41L3-D)</li>
                <li>• 1× CP Plus {cameraCount <= 4 ? "4ch" : cameraCount <= 8 ? "8ch" : "16ch"} NVR</li>
                <li>• 1× WD Purple 2TB HDD</li>
                <li>• Cat6 pure copper cabling</li>
              </ul>
              <p className="mt-4 text-lg font-semibold text-slate-950">
                ≈ ₹{(cameraCount * 2600 + (cameraCount <= 4 ? 4200 : cameraCount <= 8 ? 6000 : 12000) + 4800 + cameraCount * 400).toLocaleString("en-IN")}
              </p>
              <Link
                href="/plan/quote"
                className="mt-4 inline-flex w-full items-center justify-center rounded-control border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:border-primary-600 hover:text-primary-700"
              >
                Build this quote
              </Link>
            </div>

            {/* Recommended option */}
            <div className="rounded-card border-2 border-primary-600 bg-white p-6 ring-2 ring-primary-600/10">
              <span className="rounded-full bg-primary-700 px-2.5 py-0.5 text-xs font-semibold text-white">
                Recommended
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-950">
                Hikvision IP System
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Best balance of image quality, ecosystem support, and local
                service availability in Odisha.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>• {cameraCount}× Hikvision 4MP Bullet (DS-2CD1043G2-I)</li>
                <li>• 1× Hikvision {cameraCount <= 4 ? "4ch" : cameraCount <= 8 ? "8ch" : "16ch"} NVR (with PoE)</li>
                <li>• 1× WD Purple 4TB HDD</li>
                <li>• Cat6 pure copper cabling</li>
              </ul>
              <p className="mt-4 text-lg font-semibold text-slate-950">
                ≈ ₹{(cameraCount * 3200 + (cameraCount <= 4 ? 6500 : cameraCount <= 8 ? 9500 : 18000) + 8900 + cameraCount * 400).toLocaleString("en-IN")}
              </p>
              <Link
                href="/plan/quote"
                className="mt-4 inline-flex w-full items-center justify-center rounded-control bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-600"
              >
                Build this quote
              </Link>
            </div>

            {/* Premium option */}
            <div className="rounded-card border border-slate-200 bg-white p-6">
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                Premium
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-950">
                Dahua Full-Color System
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Color night vision, built-in audio, and smart motion detection.
                Higher cost but richer footage.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>• {cameraCount}× Dahua 4MP Full-Color (HDW1439T1-A-LED)</li>
                <li>• 1× Dahua {cameraCount <= 4 ? "4ch" : cameraCount <= 8 ? "8ch" : "16ch"} NVR (PoE + SMD)</li>
                <li>• 1× Seagate SkyHawk 4TB HDD</li>
                <li>• Cat6 pure copper cabling</li>
              </ul>
              <p className="mt-4 text-lg font-semibold text-slate-950">
                ≈ ₹{(cameraCount * 3800 + (cameraCount <= 4 ? 7200 : cameraCount <= 8 ? 11000 : 20000) + 8900 + cameraCount * 400).toLocaleString("en-IN")}
              </p>
              <Link
                href="/plan/quote"
                className="mt-4 inline-flex w-full items-center justify-center rounded-control border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:border-primary-600 hover:text-primary-700"
              >
                Build this quote
              </Link>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 rounded-control border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-primary-600"
            >
              <ChevronLeft className="h-4 w-4" />
              Adjust cameras
            </button>
            <Link
              href="/plan/calculators"
              className="inline-flex items-center gap-2 rounded-control border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-primary-600"
            >
              Run detailed calculators
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
