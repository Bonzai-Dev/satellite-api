import express, { Request, Response } from "express";
import config from "../../config/index.js";
import { readFileSync } from "fs";
import { RoutesStatus } from "../../utils/index.js";

const router = express.Router();
const routes = config.routes;

router.get(routes.get.postedSatellite, async (req: Request, res: Response) => {
  try {
    const satellites = readFileSync(config.files.postedSatellites, "utf-8");
    RoutesStatus.successfullRequest(res, JSON.parse(satellites));
  } catch (error) {
    console.error("Error fetching or parsing satellite data:", error);
    RoutesStatus.internalServerError(res);
  }
});

export default router;
