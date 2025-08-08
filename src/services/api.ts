import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api", // Replace later with real backend
  timeout: 8000,
});

// Example typed models
export type FabricRoll = {
  id: string;
  fabricType: string;
  length: number; // meters
  status: "Available" | "In Use" | "Reserved";
};

export type Marker = {
  id: string;
  fabricType: string;
  length: number;
  layout: string;
};

export type Spread = {
  id: string;
  fabricType: string;
  spreadLength: number;
  plies: number;
};

// Placeholder async functions (swap with real API later)
export async function fetchFabricRolls(): Promise<FabricRoll[]> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id: "R-1001", fabricType: "Denim", length: 120, status: "Available" },
          { id: "R-1002", fabricType: "Cotton", length: 90, status: "In Use" },
          { id: "R-1003", fabricType: "Polyester", length: 150, status: "Reserved" },
        ]),
      500
    )
  );
}

export async function fetchMarkers(): Promise<Marker[]> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id: "M-2001", fabricType: "Denim", length: 1.6, layout: "Zig-Zag" },
          { id: "M-2002", fabricType: "Cotton", length: 1.8, layout: "Straight" },
        ]),
      500
    )
  );
}

export async function fetchSpreads(): Promise<Spread[]> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id: "S-3001", fabricType: "Denim", spreadLength: 50, plies: 20 },
          { id: "S-3002", fabricType: "Cotton", spreadLength: 40, plies: 18 },
        ]),
      500
    )
  );
}
