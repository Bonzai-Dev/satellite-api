import express, { Request, Response } from "express";
import config from "../../config/index.js";

import Satellite from "../../modules/satellite.js";
import { fetchApi, RoutesStatus } from "../../utils/index.js";

import { DetailedSatellite } from "ootk";

const router = express.Router();
const routes = config.routes;

router.get(routes.get.search, async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(`Fetching satellite with ID: ${id}`);
  try {
    const response: string = await fetchApi<string>(
      `${config.urls.keepTrack}/sat/${id}`
    );
    const satelliteData: any = await JSON.parse(response);
    const satellite = new DetailedSatellite({
      id: satelliteData.satId,
      name: satelliteData.name,
      country: satelliteData.country,
      launchDate: satelliteData.launchDate,
      purpose: satelliteData.purpose,
      owner: satelliteData.owner,
      launchSite: satelliteData.launchSite,
      launchVehicle: satelliteData.launchVehicle,
      tle1: satelliteData.tle1,
      tle2: satelliteData.tle2,
    });

    RoutesStatus.successfullRequest(res, new Satellite(satellite));

  } catch (error) {
    console.error("Error fetching or parsing satellite data:", error);
    RoutesStatus.internalServerError(res);
  }
});

export default router;
