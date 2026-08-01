import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "CCTV Troubleshooting Guide",
  description:
    "Common CCTV problems and proven solutions — no video signal, night vision issues, remote access failures, HDD errors, and more.",
};

const troubleshootingItems = [
  {
    category: "Video Signal Issues",
    problems: [
      {
        title: "No video on one or more channels",
        symptoms: "Black screen on specific channels while others work fine. 'No Video' or 'Video Loss' message displayed.",
        causes: [
          "Loose or damaged BNC connector (analog) or Ethernet cable (IP)",
          "Camera power supply failure or insufficient PoE budget",
          "Wrong channel-to-camera mapping in NVR/DVR settings",
          "Camera hardware failure",
        ],
        solutions: [
          "Check and reseat the BNC connector or Ethernet cable at both ends — this is the #1 cause",
          "Verify the camera's power LED is on. For PoE cameras, check the NVR's PoE status page for that port",
          "Try swapping the cable with a known-working channel to isolate cable vs camera failure",
          "For PoE systems, check if total power draw exceeds the NVR's PoE budget (especially with IR LEDs active at night)",
        ],
      },
      {
        title: "Image is blurry or out of focus",
        symptoms: "Video feed appears soft, unclear, or unable to resolve details at the expected distance.",
        causes: [
          "Lens focus ring not properly adjusted (varifocal cameras)",
          "Condensation or dirt on the lens dome/cover",
          "Camera resolution exceeds DVR/NVR decode capacity — system is downscaling",
          "Bitrate set too low in encoding settings",
        ],
        solutions: [
          "For varifocal cameras, adjust the focus ring at the camera — this requires physical access",
          "Clean the dome or lens cover with a microfiber cloth. Check for internal condensation (seal failure)",
          "Verify the NVR/DVR supports your camera's resolution per-channel, not just in marketing specs",
          "Increase the bitrate in the camera's encoding settings (or set to 'Variable Bitrate' mode)",
        ],
      },
    ],
  },
  {
    category: "Night Vision Problems",
    problems: [
      {
        title: "Night vision is too dark or has limited range",
        symptoms: "IR mode activates but the image is dark, range is much shorter than spec'd, or only a small area is illuminated.",
        causes: [
          "IR LEDs degraded over time (common after 2-3 years)",
          "Obstructions or reflective surfaces near the camera causing IR washout",
          "Camera installed behind glass — IR reflects off the glass, blinding the sensor",
          "Insufficient IR power for the mounting height and FOV",
        ],
        solutions: [
          "IR LED lifespan is finite — if the camera is 2+ years old, reduced IR is expected. Consider supplemental IR illuminators",
          "Remove any nearby reflective surfaces (white walls within 1m, plastic covers). Reposition if IR washout is visible",
          "Never install IR cameras behind glass — the reflection destroys night vision. Use a non-IR camera with external lighting instead",
          "Add a separate IR illuminator for longer range, or switch to a Starlight camera that works in low ambient light without IR",
        ],
      },
      {
        title: "Image flickers or has color banding at dusk/dawn",
        symptoms: "The image rapidly switches between day and night mode, or horizontal color bands appear during transition lighting.",
        causes: [
          "The IR cut filter is oscillating because ambient light is near the switching threshold",
          "Artificial lighting frequency mismatch (50Hz power creates banding at certain shutter speeds)",
        ],
        solutions: [
          "Adjust the Day/Night switching threshold in camera settings — add hysteresis or a delay to prevent rapid cycling",
          "Set the camera's anti-flicker option to 50Hz (India's power frequency) to eliminate banding",
        ],
      },
    ],
  },
  {
    category: "Storage & Recording",
    problems: [
      {
        title: "HDD not detected or recording stops",
        symptoms: "DVR/NVR shows 'No HDD' or 'HDD Error'. Recording history has gaps or stops entirely.",
        causes: [
          "SATA data or power cable loose inside the recorder",
          "HDD failure — especially common with desktop-grade drives used in 24/7 surveillance",
          "HDD not formatted for the recorder (new installation)",
          "Power supply insufficient to spin up both recorder and HDD simultaneously",
        ],
        solutions: [
          "Power off, open the recorder, reseat both the SATA data cable and SATA power connector on the HDD",
          "Check HDD health in the recorder's Storage menu — look for SMART errors or bad sectors. Replace if failing",
          "Go to Storage > HDD Management and format/initialize the drive. This erases all data",
          "If the recorder struggles at boot, try powering it with the HDD disconnected, then hot-plugging the SATA power. If this works, the PSU is marginal — replace it",
        ],
      },
      {
        title: "Recording duration is shorter than expected",
        symptoms: "Expected 30 days of recording but HDD fills up in 10-15 days. Oldest footage is overwritten too quickly.",
        causes: [
          "Recording at higher resolution/bitrate/FPS than calculated",
          "All channels on continuous recording instead of motion-triggered",
          "H.264 encoding used instead of H.265 (roughly 2× more storage)",
          "HDD actual usable capacity less than labeled (1TB ≈ 930GB usable)",
        ],
        solutions: [
          "Run our Storage Calculator with your actual settings to verify the expected duration",
          "Switch low-priority cameras to motion-triggered recording to save 40-60% storage",
          "Enable H.265 or H.265+ encoding if your NVR and cameras both support it",
          "Add a second HDD if your recorder has a spare SATA bay, or upgrade to a larger drive",
        ],
      },
    ],
  },
  {
    category: "Remote Access",
    problems: [
      {
        title: "Cannot view cameras remotely (mobile app or browser)",
        symptoms: "App shows 'device offline' or connection timeout. Was working before and stopped, or never set up successfully.",
        causes: [
          "Internet connection at the camera site is down or unstable",
          "Router firewall blocking the required ports",
          "DDNS/P2P cloud service registration expired or not activated",
          "ISP changed the public IP (CGNAT or dynamic IP) breaking port forwarding",
        ],
        solutions: [
          "Verify internet connectivity at the site first — can other devices browse normally?",
          "Use the manufacturer's P2P/cloud service (Hik-Connect, DMSS) instead of port forwarding — it's simpler and works through CGNAT",
          "Re-register the device in the cloud service app. Check that the device serial number and verification code are correct",
          "If using port forwarding, check your current public IP. Most Indian ISPs use dynamic IPs — set up DDNS through the recorder's settings",
        ],
      },
    ],
  },
  {
    category: "Power Issues",
    problems: [
      {
        title: "Cameras restart or go offline intermittently",
        symptoms: "One or more cameras drop offline for seconds to minutes, then reconnect. Happens randomly or correlates with time of day.",
        causes: [
          "Insufficient PoE budget — cameras draw more power when IR activates at night, pushing total draw over budget",
          "Voltage drop over long cable runs (especially with CCA cables)",
          "Power supply overloaded or degrading (analog systems)",
          "Electrical interference or unstable mains supply",
        ],
        solutions: [
          "Calculate actual peak PoE draw (all cameras with IR/heater active). Compare against NVR/switch PoE budget. If close, add a separate PoE switch to offload",
          "For cable runs >50m, ensure pure copper Cat5e/Cat6 cable. CCA cable has significantly higher resistance",
          "Replace the power supply with a higher-capacity unit. Add 20% headroom over calculated total draw",
          "Install a UPS/inverter to stabilize power. See our Inverter/UPS Calculator for proper sizing",
        ],
      },
    ],
  },
] as const;

export default function TroubleshootingPage() {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
        Troubleshooting
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        Common problems, proven solutions
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
        Step-by-step fixes for the issues CCTV systems actually encounter — each
        with causes explained, not just &quot;reset and hope.&quot;
      </p>

      {/* Quick jump */}
      <div className="mt-8 flex flex-wrap gap-2">
        {troubleshootingItems.map(({ category }) => (
          <a
            key={category}
            href={`#${category.toLowerCase().replace(/\s+/g, "-")}`}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-primary-600 hover:text-primary-700"
          >
            {category}
          </a>
        ))}
      </div>

      {/* Problem sections */}
      <div className="mt-10 space-y-12">
        {troubleshootingItems.map(({ category, problems }) => (
          <section
            key={category}
            id={category.toLowerCase().replace(/\s+/g, "-")}
          >
            <h2 className="border-b border-slate-200 pb-2 text-lg font-semibold text-slate-950">
              {category}
            </h2>

            <div className="mt-6 space-y-6">
              {problems.map((problem) => (
                <details
                  key={problem.title}
                  className="group rounded-card border border-slate-200 bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-5 text-sm font-semibold text-slate-950 hover:text-primary-700">
                    <span className="flex items-center gap-3">
                      <AlertCircle
                        className="h-5 w-5 shrink-0 text-warning-500"
                        aria-hidden="true"
                      />
                      {problem.title}
                    </span>
                    <ChevronDown className="h-4 w-4 shrink-0 transition group-open:rotate-180" />
                  </summary>
                  <div className="border-t border-slate-200 px-5 pb-5 pt-4">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Symptoms
                      </h4>
                      <p className="mt-1 text-sm text-slate-700">
                        {problem.symptoms}
                      </p>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Common Causes
                      </h4>
                      <ul className="mt-2 space-y-1.5">
                        {problem.causes.map((cause, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-slate-700"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-danger-600" />
                            {cause}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-success-600">
                        Solutions
                      </h4>
                      <ol className="mt-2 space-y-2">
                        {problem.solutions.map((solution, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm text-slate-700"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-600/10 text-xs font-semibold text-success-600">
                              {i + 1}
                            </span>
                            {solution}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Still stuck */}
      <section className="mt-12 rounded-card border border-slate-200 bg-primary-50 p-8">
        <h2 className="text-base font-semibold text-slate-950">
          Still stuck? Find local help.
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          If these steps don&apos;t resolve your issue, a verified local service
          center can diagnose on-site. We track resolution outcomes, not just
          star ratings.
        </p>
        <Link
          href="/service"
          className="mt-4 inline-flex items-center rounded-control bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-600"
        >
          Find service centers in your district
        </Link>
      </section>
    </div>
  );
}
