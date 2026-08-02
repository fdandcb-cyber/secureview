import type { Metadata } from "next";
import { listVerifiedServiceCenters } from "@/features/service-directory/repositories/service-repository";
import { ServiceClient } from "./service-client";

export const metadata: Metadata = {
  title: "Service Directory — Verified Installers & Service Centers in Odisha",
  description:
    "Find verified CCTV installers and service centers across Odisha districts — checked, not just listed. Brand authorization status, services offered, and resolution outcomes tracked.",
};

export default async function ServicePage() {
  const centers = await listVerifiedServiceCenters();

  return <ServiceClient initialCenters={centers} />;
}
