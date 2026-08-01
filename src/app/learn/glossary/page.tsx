import type { Metadata } from "next";
import { Search, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "CCTV Glossary — Technical Terms & Acronyms Decoded",
  description:
    "Every CCTV and security term explained in plain language — from IP ratings to ONVIF to WDR to PoE budget calculations.",
};

const topAcronyms = [
  { acronym: "ONVIF", fullForm: "Open Network Video Interface Forum", summary: "Interoperability standard allowing cameras and NVRs from different brands to communicate." },
  { acronym: "PoE", fullForm: "Power over Ethernet (802.3af/at/bt)", summary: "Transmits electrical power and digital video data over a single Cat6 network cable." },
  { acronym: "WDR", fullForm: "Wide Dynamic Range (True WDR 120dB)", summary: "Hardware sensor feature that balances extreme bright sunlight and deep shadow in the same scene." },
  { acronym: "IP67", fullForm: "Ingress Protection (Dust & Submersion)", summary: "Environmental rating certifying dust-tight enclosure and protection against heavy rain/immersion." },
  { acronym: "H.265+", fullForm: "High Efficiency Video Coding Extension", summary: "Advanced video compression standard reducing bandwidth and hard drive storage usage by up to 50-70%." },
] as const;

const glossaryTerms = [
  { term: "Analog Camera", definition: "A traditional camera that sends video as an analog signal over coaxial cable (BNC connectors) to a DVR. Lower cost but limited to the resolution standard used (960H, 720p, 1080p). Still common in budget installations.", letter: "A" },
  { term: "AGC (Auto Gain Control)", definition: "Automatically amplifies the video signal in low-light conditions to brighten the image. Increases noise/grain at extreme levels — not a substitute for proper IR illumination.", letter: "A" },
  { term: "BNC (Bayonet Neill–Concelman)", definition: "The twist-lock coaxial connector used by analog and HD-over-coax cameras. A loose BNC connection is the #1 cause of 'no video' on a single channel.", letter: "B" },
  { term: "Bitrate", definition: "The amount of data a camera generates per second, measured in Mbps. Higher resolution and frame rate = higher bitrate = more storage consumed and more network bandwidth needed.", letter: "B" },
  { term: "CCA (Copper Clad Aluminum)", definition: "A cable where the conductor is aluminum coated with a thin layer of copper. Cheaper than pure copper but has higher resistance, more signal loss over distance, and is not recommended for PoE runs over 30 meters.", letter: "C" },
  { term: "Codec (H.264 / H.265 / H.265+)", definition: "The compression algorithm used to encode video. H.265 reduces storage and bandwidth by ~50% vs H.264 at equivalent quality. H.265+ (proprietary variants) can reduce further but may limit playback compatibility.", letter: "C" },
  { term: "DVR (Digital Video Recorder)", definition: "Records video from analog cameras. The DVR does all the video processing (encoding, compression). Connected via coaxial cable. Simpler to set up but limited by the analog signal quality reaching it.", letter: "D" },
  { term: "DDNS (Dynamic DNS)", definition: "A service that maps a changing IP address (common with Indian ISPs) to a fixed domain name, enabling remote viewing. Many brands offer free DDNS — Hik-Connect, DMSS, iVMS are examples.", letter: "D" },
  { term: "FOV (Field of View)", definition: "The angular area a camera lens can capture, measured in degrees. A wider FOV covers more area but with less detail per pixel. Typical: 2.8mm lens ≈ 100° (wide), 6mm ≈ 50° (narrow/zoomed).", letter: "F" },
  { term: "FPS (Frames Per Second)", definition: "How many images the camera captures per second. 25-30 fps = smooth real-time video. 15 fps = acceptable for recording. Lower fps = less storage used but choppier playback. Most DVRs/NVRs divide their total FPS across all channels.", letter: "F" },
  { term: "H.264 / H.265", definition: "See Codec. H.265 is the newer standard, roughly halving storage requirements versus H.264 at the same visual quality.", letter: "H" },
  { term: "HDD (Hard Disk Drive)", definition: "The storage device inside a DVR/NVR that records video. Surveillance-rated drives (WD Purple, Seagate SkyHawk) are designed for 24/7 write operations. Desktop-grade drives are not and will fail earlier.", letter: "H" },
  { term: "IK Rating", definition: "Impact resistance rating. IK10 means the camera housing can withstand a 20-joule impact (equivalent to a 5kg weight dropped from 40cm). Important for vandal-prone locations.", letter: "I" },
  { term: "IP Camera", definition: "A camera that processes video internally and sends a compressed digital stream over an Ethernet (network) cable. Higher resolution, more features, but requires network infrastructure and an NVR.", letter: "I" },
  { term: "IP Rating (Ingress Protection)", definition: "Two-digit rating for dust and water resistance. IP66 = fully dust-tight, resistant to powerful water jets. IP67 = dust-tight, survives temporary submersion. Essential for outdoor Odisha installations during monsoon season.", letter: "I" },
  { term: "IR (Infrared) Illumination", definition: "Built-in LED array that emits invisible infrared light for night vision. IR distance specs (e.g., '30m IR') are measured in ideal lab conditions — real-world effective range is typically 60-70% of the stated distance.", letter: "I" },
  { term: "Lux", definition: "A measure of light level. 0 lux = total darkness. Cameras spec'd at '0.001 lux' have excellent low-light sensitivity (Starlight). '0 lux (with IR)' means the camera relies entirely on its IR LEDs in darkness.", letter: "L" },
  { term: "NVR (Network Video Recorder)", definition: "Records video from IP cameras over a network (Ethernet). The cameras do the encoding — the NVR just stores, manages, and provides playback. Supports higher resolutions and more features than a DVR.", letter: "N" },
  { term: "ONVIF", definition: "An open industry standard that allows cameras and recorders from different manufacturers to work together. 'ONVIF Profile S' is the minimum for live streaming. In practice, compatibility varies — test before committing to a mixed-brand setup.", letter: "O" },
  { term: "PoE (Power over Ethernet)", definition: "Delivers both power and data to an IP camera through a single Ethernet cable. Eliminates the need for a separate power supply at each camera. Three standards: 802.3af (15.4W), 802.3at (30W), 802.3bt (60-100W).", letter: "P" },
  { term: "PoE Budget", definition: "The total power (in watts) an NVR or PoE switch can deliver across all its ports simultaneously. A 4-port NVR with a 50W PoE budget means 50W shared across 4 cameras — if each camera draws 12W at peak (IR on), you're at 48W and near the limit.", letter: "P" },
  { term: "PTZ (Pan-Tilt-Zoom)", definition: "A camera that can be remotely controlled to rotate horizontally (pan), vertically (tilt), and optically zoom. Powerful but expensive, complex to install, and draws significantly more power (relevant for PoE budget and UPS sizing).", letter: "P" },
  { term: "Resolution", definition: "The number of pixels in the image. Common CCTV resolutions: 1MP (720p), 2MP (1080p), 4MP (1440p), 5MP, 4K/8MP (2160p). Higher resolution = more detail but more storage, bandwidth, and processing power required.", letter: "R" },
  { term: "SATA", definition: "The interface standard for connecting hard drives to a DVR/NVR. Most consumer units have 1-2 SATA ports. Each port supports one HDD. The number of SATA bays determines your maximum storage capacity.", letter: "S" },
  { term: "Starlight", definition: "A marketing term (used by Dahua, adopted widely) for cameras with exceptionally sensitive sensors that produce usable color images in very low light (down to ~0.001 lux) without relying on IR illumination.", letter: "S" },
  { term: "WDR (Wide Dynamic Range)", definition: "A camera feature that balances exposure between very bright and very dark areas in the same frame — critical for entrances where indoor darkness meets outdoor sunlight. True WDR (hardware-based, 120dB+) is far superior to 'Digital WDR' (software processing).", letter: "W" },
] as const;

const letters = [...new Set(glossaryTerms.map((t) => t.letter))].sort();

export default function GlossaryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "CCTV & Security Technical Glossary",
    description: "Definitions for CCTV technical terms including ONVIF, PoE, WDR, IP ratings, codecs, and sensor specifications.",
    url: "http://localhost:3000/learn/glossary",
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex items-center gap-2 mb-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">
          Technical Glossary
        </p>
        <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
          <Clock className="h-3.5 w-3.5" /> 5 min A-Z scan
        </span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
        CCTV Terms & Acronyms Explained
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
        Every acronym and specification term used on this platform, defined in
        plain language with context for why it matters to your buying decision.
      </p>

      {/* SEO Acronym Table */}
      <section className="mt-8 rounded-card border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h2 className="text-sm font-bold text-slate-950 uppercase tracking-wider">
            Most Searched CCTV Acronyms & Definitions
          </h2>
          <span className="text-xs text-slate-500">⏱ 2 min table scan</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs min-w-[550px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                <th className="py-2.5 px-3 w-1/5">Acronym</th>
                <th className="py-2.5 px-3 w-1/3">Full Name</th>
                <th className="py-2.5 px-3">Plain Language Explanation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topAcronyms.map((a) => (
                <tr key={a.acronym} className="hover:bg-slate-50/70">
                  <td className="py-3 px-3 font-bold text-primary-700 bg-slate-50/30">
                    {a.acronym}
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    {a.fullForm}
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {a.summary}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Search bar */}
      <div className="mt-8">
        <div className="relative max-w-md">
          <Search
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search terms (e.g. PoE, WDR, Starlight)..."
            className="w-full rounded-control border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-950 placeholder:text-slate-500 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600/20"
          />
        </div>
      </div>

      {/* Alphabet quick nav */}
      <nav
        aria-label="Jump to letter"
        className="mt-6 flex flex-wrap gap-1.5"
      >
        {letters.map((letter) => (
          <a
            key={letter}
            href={`#letter-${letter}`}
            className="flex h-8 w-8 items-center justify-center rounded-control text-sm font-semibold text-slate-700 transition hover:bg-primary-50 hover:text-primary-700 border border-slate-200"
          >
            {letter}
          </a>
        ))}
      </nav>

      {/* Terms by letter */}
      <div className="mt-8 space-y-10">
        {letters.map((letter) => (
          <section key={letter} id={`letter-${letter}`}>
            <h2 className="mb-4 border-b border-slate-200 pb-2 text-lg font-bold text-primary-700">
              {letter}
            </h2>
            <div className="space-y-4">
              {glossaryTerms
                .filter((t) => t.letter === letter)
                .map(({ term, definition }) => (
                  <div
                    key={term}
                    className="rounded-card border border-slate-200 bg-white p-5 hover:border-slate-300 transition"
                  >
                    <h3 className="text-sm font-bold text-slate-950">
                      {term}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {definition}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
