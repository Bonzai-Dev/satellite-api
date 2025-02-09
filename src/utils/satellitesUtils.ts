import { DetailedSatellite, TleLine2, TleLine1 } from "ootk";
import Satellite from "../modules/satellite";

function fetchRandomSatellites(satellites: Satellite[]): Satellite {
  return satellites[Math.floor(Math.random() * satellites.length)];
}

function parseTleArrayToString(data: string[]): string {
  return data.toString().replace(/,/g, "").split(" ").join(" ");
}

function parseTleToJson(data: string): Satellite[] {
  const satellites = [];
  try {
    // Splitting the TLE database into individual TLE, each in an array
    const tleLines = data.trim().split("\n");
    for (let i = 0; i < tleLines.length; i += 3) {
      const name = tleLines[i].trim();
      const lineOne = tleLines[i + 1].trim();
      const lineTwo = tleLines[i + 2].trim();
      const id = parseInt(lineTwo.split(" ")[1]);
      const satelliteData = new DetailedSatellite({
        id: id,
        name: name,
        tle1: lineOne as TleLine1,
        tle2: lineTwo as TleLine2,
      });
      
      const satellite = new Satellite(satelliteData);
      satellites.push(satellite);
    }
  } catch (error) {
    console.error("Error parsing TLE data:", error);
  }

  return satellites;
}

export default { fetchRandomSatellites, parseTleArrayToString, parseTleToJson };