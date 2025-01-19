import { parseToJson, parseTleArrayToString } from "../api/fetch";
import {
  PositionAndVelocity,
  GeodeticLocation,
  propagate,
  twoline2satrec,
  eciToGeodetic,
  degreesLat,
  degreesLong
} from "satellite.js";

import { SatelliteData } from "../types/satelliteData";
import { GeographicCoordinates } from "../types/geographicCoordinates";

export default class Satellite {
  name: string;
  data: {
    lineOne: string[];
    lineTwo: string[];
  };
  positionAndVelocity: PositionAndVelocity;
  geodeticCoordinates: GeodeticLocation;
  geographicCoordinates: GeographicCoordinates;

  constructor(tle: string, gmst: number) {
    const data: SatelliteData = parseToJson(tle);
    this.name = data.name;
    this.data = data.data;

    const lineOne = parseTleArrayToString(this.data.lineOne);
    const lineTwo = parseTleArrayToString(this.data.lineTwo);
    const satelliteRecord = twoline2satrec(lineOne, lineTwo);

    this.positionAndVelocity = propagate(satelliteRecord, new Date());

    const positionEci = this.positionAndVelocity.position;
    this.geodeticCoordinates = eciToGeodetic(positionEci, gmst);

    this.geographicCoordinates = {
      latitude: degreesLat(this.geodeticCoordinates.latitude),
      longitude: degreesLong(this.geodeticCoordinates.longitude),
      altitude: this.geodeticCoordinates.height
    };
  }
}
