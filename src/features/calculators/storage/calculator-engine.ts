export type StorageCalcInput = {
  cameras: number;
  resolutionMp: number;
  fps: number;
  codec: "h264" | "h265";
  hoursPerDay: number;
  hddSizeTb: number;
};

export type StorageCalcResult = {
  recordingDays: number;
  dailyStorageGb: number;
  usableHddGb: number;
  bitratePerCameraMbps: number;
  formulaExposed: {
    dailyGbFormula: string;
    daysFormula: string;
    usableHddFormula: string;
  };
};

export function calculateStorageRetention(input: StorageCalcInput): StorageCalcResult {
  const { cameras, resolutionMp, fps, codec, hoursPerDay, hddSizeTb } = input;

  if (cameras <= 0 || hoursPerDay <= 0 || hddSizeTb <= 0) {
    return {
      recordingDays: 0,
      dailyStorageGb: 0,
      usableHddGb: 0,
      bitratePerCameraMbps: 0,
      formulaExposed: {
        dailyGbFormula: "Daily GB = 0 (input values must be greater than zero)",
        daysFormula: "Days = 0",
        usableHddFormula: "Usable HDD = 0",
      },
    };
  }

  // Bitrate estimation formula (Mbps per camera)
  // H.265 baseline: ~0.8 Mbps per MP at 15 FPS; H.264 is ~1.6 Mbps per MP
  const fpsFactor = fps / 15;
  const codecFactor = codec === "h265" ? 0.8 : 1.6;
  const bitratePerCameraMbps = resolutionMp * codecFactor * fpsFactor;

  // Daily GB = cameras * bitrate_Mbps * 3600 * rec_hours / (8 * 1024)
  const totalBitrateGbPerHour = (cameras * bitratePerCameraMbps * 3600) / (8 * 1024);
  const dailyStorageGb = Math.round(totalBitrateGbPerHour * hoursPerDay * 10) / 10;

  // Usable HDD capacity (93% usable due to formatting & filesystem overhead)
  const usableHddGb = Math.round(hddSizeTb * 1000 * 0.93);
  const recordingDays = Math.floor(usableHddGb / dailyStorageGb);

  return {
    recordingDays,
    dailyStorageGb,
    usableHddGb,
    bitratePerCameraMbps: Math.round(bitratePerCameraMbps * 10) / 10,
    formulaExposed: {
      dailyGbFormula: `Daily GB = (${cameras} cameras × ${bitratePerCameraMbps.toFixed(1)} Mbps × 3600 × ${hoursPerDay}h) / (8 × 1024) = ${dailyStorageGb} GB/day`,
      daysFormula: `Days = ${usableHddGb} GB usable / ${dailyStorageGb} GB/day = ${recordingDays} Days`,
      usableHddFormula: `Usable HDD = ${hddSizeTb} TB × 1000 × 0.93 = ${usableHddGb} GB`,
    },
  };
}
