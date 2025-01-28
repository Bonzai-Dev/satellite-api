import {
  TleLine2,
  TleLine1,
  DetailedSatellite,
} from "ootk";
import { GeographicCoordinates } from "../types/GeographicCoordinates";

export default class Satellite {
  name: string;
  tleData: {
    tleOne: TleLine1;
    tleTwo: TleLine2;
  };    
  noradId: string;
  country: string;
  description?: string;
  geographicCoordinates?: GeographicCoordinates;

  constructor(satelliteData: any) {
    this.name = satelliteData.name;
    this.tleData = {
      tleOne: satelliteData.tle1,
      tleTwo: satelliteData.tle2,
    };

    this.noradId = satelliteData.satId;
    this.country = satelliteData.country;
    this.description = satelliteData.purpose;

    this.geographicCoordinates = satelliteData.lla();
  }
}
