"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HardDrive,
  Zap,
  Battery,
  Cable,
  Wifi,
  ChevronRight,
  Info,
} from "lucide-react";

type CalculatorId = "storage" | "poe" | "ups" | "cable" | "bandwidth";

const calculators = [
  {
    id: "storage" as CalculatorId,
    title: "Storage Duration",
    icon: HardDrive,
    description: "How many days of recording will your HDD hold?",
  },
  {
    id: "poe" as CalculatorId,
    title: "PoE Budget",
    icon: Zap,
    description: "Is your NVR/switch PoE budget sufficient?",
  },
  {
    id: "ups" as CalculatorId,
    title: "Inverter / UPS Sizing",
    icon: Battery,
    description: "What capacity UPS do you need for backup?",
  },
  {
    id: "cable" as CalculatorId,
    title: "Cable Length",
    icon: Cable,
    description: "Total cable run estimation with loss margins.",
  },
  {
    id: "bandwidth" as CalculatorId,
    title: "Network Bandwidth",
    icon: Wifi,
    description: "Will your network handle the camera streams?",
  },
] as const;

export default function CalculatorsPage() {
  const [activeCalc, setActiveCalc] = useState<CalculatorId>("storage");

  // Storage calculator state
  const [cameras, setCameras] = useState(4);
  const [resolution, setResolution] = useState(4); // MP
  const [fps, setFps] = useState(15);
  const [codec, setCodec] = useState<"h264" | "h265">("h265");
  const [recordingHours, setRecordingHours] = useState(24);
  const [hddSize, setHddSize] = useState(2); // TB

  // PoE calculator state
  const [poeCameras, setPoeCameras] = useState(4);
  const [cameraWatts, setCameraWatts] = useState(7);
  const [poeBudget, setPoeBudget] = useState(50);

  // UPS calculator state
  const [recorderWatts, setRecorderWatts] = useState(15);
  const [upsCameras, setUpsCameras] = useState(4);
  const [upsCameraWatts, setUpsCameraWatts] = useState(7);
  const [switchWatts, setSwitchWatts] = useState(0);
  const [desiredRuntime, setDesiredRuntime] = useState(30); // minutes
  const [batteryVoltage, setBatteryVoltage] = useState(12);
  const [inverterEfficiency, setInverterEfficiency] = useState(80);

  // Storage calculation
  const bitratePerCamera =
    codec === "h265"
      ? resolution * 0.8 // Mbps rough estimate for H.265
      : resolution * 1.6; // Mbps rough estimate for H.264

  const totalBitrateGBPerHour =
    (cameras * bitratePerCamera * 3600) / (8 * 1024);
  const dailyStorageGB = totalBitrateGBPerHour * recordingHours;
  const usableHddGB = hddSize * 1000 * 0.93; // 93% usable
  const recordingDays = Math.floor(usableHddGB / dailyStorageGB);

  // PoE calculation
  const totalPoeDraw = poeCameras * cameraWatts;
  const poeHeadroomPercent = ((poeBudget - totalPoeDraw) / poeBudget) * 100;
  const poeStatus =
    totalPoeDraw > poeBudget
      ? "over"
      : poeHeadroomPercent < 15
        ? "tight"
        : "ok";

  // UPS calculation
  const totalLoad = recorderWatts + upsCameras * upsCameraWatts + switchWatts;
  const totalLoadVA = Math.ceil(totalLoad / 0.8); // power factor
  const batteryAh = Math.ceil(
    (totalLoad * (desiredRuntime / 60)) /
      (batteryVoltage * (inverterEfficiency / 100))
  );
  const recommendedUpsVA = Math.ceil(totalLoadVA * 1.25); // 25% headroom

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
        Calculator Engine
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        Size your system accurately
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
        Every calculation shows the formula, inputs, and assumptions. No
        black-box numbers — you can verify and adjust everything.
      </p>

      {/* Calculator tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {calculators.map(({ id, title, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveCalc(id)}
            className={`flex items-center gap-2 rounded-control border px-4 py-2.5 text-sm font-medium transition ${
              activeCalc === id
                ? "border-primary-600 bg-primary-50 text-primary-700"
                : "border-slate-200 bg-white text-slate-700 hover:border-primary-600"
            }`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {title}
          </button>
        ))}
      </div>

      {/* Storage Calculator */}
      {activeCalc === "storage" && (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-card border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-950">
              Inputs
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-950">
                  Number of cameras
                </label>
                <input
                  type="range"
                  min={1}
                  max={32}
                  value={cameras}
                  onChange={(e) => setCameras(Number(e.target.value))}
                  className="mt-2 w-full accent-primary-700"
                />
                <p className="mt-1 text-sm font-semibold text-primary-700">
                  {cameras}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-950">
                  Resolution (MP)
                </label>
                <div className="mt-2 flex gap-2">
                  {[2, 4, 5, 8].map((mp) => (
                    <button
                      key={mp}
                      onClick={() => setResolution(mp)}
                      className={`rounded-control border px-4 py-2 text-sm font-medium transition ${
                        resolution === mp
                          ? "border-primary-600 bg-primary-50 text-primary-700"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {mp}MP
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-950">
                  Frame rate (FPS)
                </label>
                <div className="mt-2 flex gap-2">
                  {[10, 15, 20, 25].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFps(f)}
                      className={`rounded-control border px-4 py-2 text-sm font-medium transition ${
                        fps === f
                          ? "border-primary-600 bg-primary-50 text-primary-700"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-950">
                  Codec
                </label>
                <div className="mt-2 flex gap-2">
                  {[
                    { value: "h264" as const, label: "H.264" },
                    { value: "h265" as const, label: "H.265" },
                  ].map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => setCodec(value)}
                      className={`rounded-control border px-4 py-2 text-sm font-medium transition ${
                        codec === value
                          ? "border-primary-600 bg-primary-50 text-primary-700"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-950">
                  Recording hours per day
                </label>
                <div className="mt-2 flex gap-2">
                  {[12, 18, 24].map((h) => (
                    <button
                      key={h}
                      onClick={() => setRecordingHours(h)}
                      className={`rounded-control border px-4 py-2 text-sm font-medium transition ${
                        recordingHours === h
                          ? "border-primary-600 bg-primary-50 text-primary-700"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {h}h
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-950">
                  HDD Size (TB)
                </label>
                <div className="mt-2 flex gap-2">
                  {[1, 2, 4, 6, 8].map((tb) => (
                    <button
                      key={tb}
                      onClick={() => setHddSize(tb)}
                      className={`rounded-control border px-4 py-2 text-sm font-medium transition ${
                        hddSize === tb
                          ? "border-primary-600 bg-primary-50 text-primary-700"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {tb}TB
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Result */}
            <div className="rounded-card border border-primary-600 bg-primary-50 p-6">
              <h2 className="text-base font-semibold text-slate-950">
                Result
              </h2>
              <p className="mt-4 text-5xl font-semibold text-primary-700">
                {recordingDays}
              </p>
              <p className="mt-1 text-sm text-slate-700">
                days of continuous recording
              </p>

              <div className="mt-6 space-y-2 text-sm text-slate-700">
                <p>
                  Daily storage:{" "}
                  <strong>{dailyStorageGB.toFixed(1)} GB/day</strong>
                </p>
                <p>
                  Usable HDD capacity:{" "}
                  <strong>{usableHddGB.toFixed(0)} GB</strong>
                </p>
                <p>
                  Est. bitrate per camera:{" "}
                  <strong>{bitratePerCamera.toFixed(1)} Mbps</strong>
                </p>
              </div>
            </div>

            {/* Formula */}
            <div className="rounded-card border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary-700" />
                <h3 className="text-sm font-semibold text-slate-950">
                  Formula used
                </h3>
              </div>
              <div className="mt-3 rounded-control bg-slate-50 p-4 font-mono text-xs text-slate-700">
                <p>Daily GB = cameras × bitrate_Mbps × 3600 × rec_hours / (8 × 1024)</p>
                <p className="mt-1">Days = usable_HDD_GB / daily_GB</p>
                <p className="mt-1">Usable HDD = labeled_TB × 1000 × 0.93</p>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                Bitrate estimates based on typical {codec.toUpperCase()} VBR encoding at {fps} FPS.
                Actual results vary with scene complexity. Motion-triggered recording can reduce
                storage by 40-60%.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* PoE Calculator */}
      {activeCalc === "poe" && (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-card border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-950">Inputs</h2>
            <div className="mt-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-950">PoE cameras</label>
                <input type="range" min={1} max={16} value={poeCameras} onChange={(e) => setPoeCameras(Number(e.target.value))} className="mt-2 w-full accent-primary-700" />
                <p className="mt-1 text-sm font-semibold text-primary-700">{poeCameras}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-950">Peak power per camera (W)</label>
                <input type="range" min={3} max={30} value={cameraWatts} onChange={(e) => setCameraWatts(Number(e.target.value))} className="mt-2 w-full accent-primary-700" />
                <p className="mt-1 text-sm font-semibold text-primary-700">{cameraWatts}W</p>
                <p className="mt-1 text-xs text-slate-500">Typical: 7W (basic), 12W (IR+heater), 25W+ (PTZ)</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-950">NVR/Switch PoE budget (W)</label>
                <input type="range" min={15} max={250} step={5} value={poeBudget} onChange={(e) => setPoeBudget(Number(e.target.value))} className="mt-2 w-full accent-primary-700" />
                <p className="mt-1 text-sm font-semibold text-primary-700">{poeBudget}W</p>
              </div>
            </div>
          </div>

          <div className="rounded-card border p-6 ${poeStatus === 'over' ? 'border-danger-600 bg-danger-600/5' : poeStatus === 'tight' ? 'border-warning-500 bg-warning-500/5' : 'border-success-600 bg-success-600/5'}">
            <h2 className="text-base font-semibold text-slate-950">Result</h2>
            <p className={`mt-4 text-3xl font-semibold ${poeStatus === "over" ? "text-danger-600" : poeStatus === "tight" ? "text-warning-500" : "text-success-600"}`}>
              {totalPoeDraw}W / {poeBudget}W
            </p>
            <p className={`mt-1 text-sm font-medium ${poeStatus === "over" ? "text-danger-600" : poeStatus === "tight" ? "text-warning-500" : "text-success-600"}`}>
              {poeStatus === "over" && "⚠ Over budget — cameras may not power on or will draw down intermittently"}
              {poeStatus === "tight" && "⚡ Tight — less than 15% headroom. IR/heater peaks may cause issues"}
              {poeStatus === "ok" && `✓ Within budget — ${poeHeadroomPercent.toFixed(0)}% headroom`}
            </p>
            <div className="mt-4 h-4 w-full rounded-full bg-slate-200">
              <div
                className={`h-4 rounded-full transition-all ${poeStatus === "over" ? "bg-danger-600" : poeStatus === "tight" ? "bg-warning-500" : "bg-success-600"}`}
                style={{ width: `${Math.min(100, (totalPoeDraw / poeBudget) * 100)}%` }}
              />
            </div>
            <div className="mt-4 rounded-control bg-slate-50 p-4 font-mono text-xs text-slate-700">
              <p>Total draw = {poeCameras} cameras × {cameraWatts}W = {totalPoeDraw}W</p>
              <p>Headroom = ({poeBudget}W - {totalPoeDraw}W) / {poeBudget}W = {poeHeadroomPercent.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      )}

      {/* UPS Calculator */}
      {activeCalc === "ups" && (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-card border border-slate-200 bg-white p-6">
            <h2 className="text-base font-semibold text-slate-950">Inputs</h2>
            <div className="mt-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-950">Recorder power draw (W)</label>
                <input type="number" value={recorderWatts} onChange={(e) => setRecorderWatts(Number(e.target.value))} className="mt-2 w-24 rounded-control border border-slate-200 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-950">Number of cameras backed up</label>
                <input type="range" min={0} max={16} value={upsCameras} onChange={(e) => setUpsCameras(Number(e.target.value))} className="mt-2 w-full accent-primary-700" />
                <p className="mt-1 text-sm font-semibold text-primary-700">{upsCameras}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-950">Per camera power (W)</label>
                <input type="number" value={upsCameraWatts} onChange={(e) => setUpsCameraWatts(Number(e.target.value))} className="mt-2 w-24 rounded-control border border-slate-200 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-950">PoE switch power (W) — 0 if NVR has built-in PoE</label>
                <input type="number" value={switchWatts} onChange={(e) => setSwitchWatts(Number(e.target.value))} className="mt-2 w-24 rounded-control border border-slate-200 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-950">Desired backup runtime (minutes)</label>
                <div className="mt-2 flex gap-2">
                  {[15, 30, 60, 120].map((m) => (
                    <button key={m} onClick={() => setDesiredRuntime(m)} className={`rounded-control border px-4 py-2 text-sm font-medium transition ${desiredRuntime === m ? "border-primary-600 bg-primary-50 text-primary-700" : "border-slate-200 text-slate-700"}`}>
                      {m}min
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-card border border-primary-600 bg-primary-50 p-6">
              <h2 className="text-base font-semibold text-slate-950">Result</h2>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-3xl font-semibold text-primary-700">{totalLoad}W</p>
                  <p className="text-sm text-slate-700">Total load</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-primary-700">{recommendedUpsVA} VA</p>
                  <p className="text-sm text-slate-700">Minimum UPS (with 25% headroom)</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-primary-700">{batteryAh} Ah</p>
                  <p className="text-sm text-slate-700">Battery capacity @ {batteryVoltage}V</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-primary-700">{desiredRuntime} min</p>
                  <p className="text-sm text-slate-700">Target runtime</p>
                </div>
              </div>
            </div>
            <div className="rounded-card border border-slate-200 bg-white p-6">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary-700" />
                <h3 className="text-sm font-semibold text-slate-950">Formula used</h3>
              </div>
              <div className="mt-3 rounded-control bg-slate-50 p-4 font-mono text-xs text-slate-700">
                <p>Total load = recorder + (cameras × per_camera_W) + switch</p>
                <p className="mt-1">VA = total_W / 0.8 (power factor)</p>
                <p className="mt-1">Battery Ah = (total_W × hours) / (voltage × efficiency)</p>
                <p className="mt-1">Recommended UPS = VA × 1.25 (headroom)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cable & Bandwidth — simplified */}
      {(activeCalc === "cable" || activeCalc === "bandwidth") && (
        <div className="mt-8 rounded-card border border-dashed border-slate-300 bg-white py-16 text-center">
          <p className="text-sm font-medium text-slate-700">
            {activeCalc === "cable" ? "Cable Length" : "Bandwidth"} Calculator
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Coming in Phase 2 — the Storage, PoE, and UPS calculators are
            available now.
          </p>
          <Link
            href="/plan"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:underline"
          >
            Back to requirement wizard
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
