import { calculateStorageRetention } from "./calculator-engine";

// Test 1: Small Home System (4 cameras, 4MP, H.265, 2TB)
const homeSystem = calculateStorageRetention({
  cameras: 4,
  resolutionMp: 4,
  fps: 15,
  codec: "h265",
  hoursPerDay: 24,
  hddSizeTb: 2,
});
console.assert(homeSystem.recordingDays > 10, "Home system should retain > 10 days");

// Test 2: 16-channel Commercial System (16 cameras, 4MP, H.265, 8TB)
const commercialSystem = calculateStorageRetention({
  cameras: 16,
  resolutionMp: 4,
  fps: 15,
  codec: "h265",
  hoursPerDay: 24,
  hddSizeTb: 8,
});
console.assert(commercialSystem.recordingDays > 10, "Commercial system should retain > 10 days");

// Test 3: Edge Case (0 cameras or 0 hours)
const edgeCase = calculateStorageRetention({
  cameras: 0,
  resolutionMp: 4,
  fps: 15,
  codec: "h265",
  hoursPerDay: 0,
  hddSizeTb: 2,
});
console.assert(edgeCase.recordingDays === 0, "Edge case should safely return 0 days without throwing or NaN");
