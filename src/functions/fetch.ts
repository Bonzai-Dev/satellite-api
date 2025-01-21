import NodeCache from "node-cache";
import Satellite from "../modules/satellite";
import { gstime } from "satellite.js";

export async function fetchApi<T>(path: string): Promise<T> {
  const response = await fetch(path);

  if (!response.ok) throw new Error(response.statusText);

  return (await response.text()) as T;
}

export function fetchRandomSatellites(data: string): Satellite {
  // TODO: do not split data if it is already split
  const satellites = splitTleToList(data);
  const randomSatelliteTle = satellites[Math.floor(Math.random() * satellites.length)];

  const satellite = new Satellite(
    randomSatelliteTle as string,
    gstime(new Date())
  );
  return satellite;
}

export function splitTleToList(data: string): string[] {
  let dataArray = parseTleToArray(data);
  const tleList: string[] = [];
  let currentKey = 1;

  // Splitting the TLE data into individual TLE, each in an array
  // If it finds a name then split
  for (let i = 0; i < dataArray.length; i++) {
    let valueAfter = "";
    if (i + 1 < dataArray.length) valueAfter = dataArray[i + 1];

    const reachedClassification =
      valueAfter.includes("U") ||
      valueAfter.includes("C") ||
      valueAfter.includes("S");

    if (dataArray[i].trim() === "1" && reachedClassification) {
      let currentTle = "";
      const name = dataArray.slice(0, i).join("");
      currentTle = name;
      dataArray = dataArray.slice(i, dataArray.length);

      // Grab the rest of the TLE data for the first TLE
      currentTle += dataArray.slice(0, 18).join(""); /* For returning with the name of satellite along with all the TLE data */
      // currentTle = dataArray.slice(0, 18).join(""); /* For returning only the TLE data */
      dataArray = dataArray.slice(18, dataArray.length);
      tleList.push(currentTle);

      i = 0;
    }
  }

  return tleList;
}

export function parseTleToArray(data: string): string[] {
  // Merging the white space to the index item below itself
  data = data.replace(/\n/g, " ");
  data = data.replace(/\r/g, " ");
  const dataArray = data.match(/(\S+|\s+)/g) || [];

  for (let i = 1; i < dataArray.length; i++) {
    if (/\s+/.test(dataArray[i])) {
      dataArray[i - 1] = dataArray[i - 1].concat(dataArray[i]);
      dataArray.splice(i, 1);
    }
  }

  return dataArray || [];
}

export function parseTleArrayToString(data: string[]): string {
  // Splitting the TLE data into individual items in an array
  return data.toString().replace(/,/g, "").split(" ").join(" ");
}

export function parseTleToJson(data: string) {
  let tle = parseTleToArray(data);

  let satelliteName = "";
  let lineOne = [];
  let lineTwo = [];

  for (let i = 0; i < tle.length; i++) {
    let valueAfter = "";
    if (i + 1 < tle.length) valueAfter = tle[i + 1];

    // Check if it has reached the classifications
    const reachedClassification =
      valueAfter.includes("U") ||
      valueAfter.includes("C") ||
      valueAfter.includes("S");

    if (tle[i].trim() === "1" && reachedClassification) {
      // Gets all the strings before
      satelliteName = tle.slice(0, i).join("");
      tle = tle.slice(i, tle.length);
    }
  }

  // Gets the first line of the TLE data by grabbing the first 9 strings left in the TLE data
  for (let i = 0; i < tle.length; i++) {
    if (i < 9) lineOne.push(tle[i]);
  }
  tle = tle.slice(9, tle.length);

  // Gets the second line of the TLE data by grabbing the rest of the strings left
  lineTwo = tle;
  tle = [];

  const satelliteData = {
    name: satelliteName,
    data: {
      lineOne,
      lineTwo,
    },
  };

  return JSON.parse(JSON.stringify(satelliteData));
}
