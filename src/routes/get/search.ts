import express, { Request, Response } from "express";
import config from "../../config/index";

import Satellite from "../../modules/satellite";
import { fetchApi } from "../../utils/fetchApi";
import { internalServerError, successfullRequest } from "../../utils/routesStatus";
import { DetailedSatellite } from "ootk";

const router = express.Router();
const routes = config.routes;

router.get(routes.get.search, async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(`Fetching satellite with ID: ${id}`);
  try {
    const response: string = await fetchApi<string>(
      `https://api.keeptrack.space/v1/sat/${id}`
    );
    const satelliteData: any = await JSON.parse(response);
    successfullRequest(res, new Satellite(new DetailedSatellite(satelliteData)));
  } catch (error) {
    console.error("Error fetching or parsing satellite data:", error);
    internalServerError(res);
  }
});

export default router;
