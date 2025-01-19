import { PositionAndVelocity, EciVec3 } from "satellite.js";

export type SatelliteData = {
  name: string;
  data: {
    lineOne: string[];
    lineTwo: string[];
  };
  PositionAndVelocity: PositionAndVelocity;
  positionAndVelocity: PositionAndVelocity;
  positionEci: EciVec3<number>;
};