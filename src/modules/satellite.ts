import { TleLine2, TleLine1 } from "ootk";
import { GeographicCoordinates } from "../types/GeographicCoordinates.js";

export default class Satellite {
  name: string;
  tleData: {
    tleOne: TleLine1;
    tleTwo: TleLine2;
  };
  noradId: string;
  
  country?: string;
  launchDate?: string;
  purpose: string;
  owner?: string;
  launchSite?: string;
  launchVehicle?: string;

  geographicCoordinates?: GeographicCoordinates;

  constructor(satelliteData: any) {
    this.name = satelliteData.name;
    this.tleData = {
      tleOne: satelliteData.tle1,
      tleTwo: satelliteData.tle2,
    };

    this.noradId = satelliteData.id.toString().padStart(5, "0");
    this.country = satelliteData.country;
    this.geographicCoordinates = satelliteData.lla();

    this.launchDate = satelliteData.launchDate;
    this.purpose = satelliteData.purpose;
    this.owner = satelliteData.owner;
    this.launchSite = satelliteData.launchSite;
    this.launchVehicle = satelliteData.launchVehicle;
  }
}
