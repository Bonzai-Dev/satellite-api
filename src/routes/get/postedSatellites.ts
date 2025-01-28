import express, { Request, Response } from "express";
import config from "../../config/index";
import { readFileSync } from "fs";

import { internalServerError, successfullRequest } from "../../utils/routesStatus";

const router = express.Router();
const routes = config.routes;

router.get(routes.get.postedSatellite, async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(`Fetching satellite with ID: ${id}`);
  try {
    const satellites = readFileSync(config.files.coolSatellites, "utf-8");
    successfullRequest(res, JSON.parse(satellites));
  } catch (error) {
    console.error("Error fetching or parsing satellite data:", error);
    internalServerError(res);
  }
});

export default router;
