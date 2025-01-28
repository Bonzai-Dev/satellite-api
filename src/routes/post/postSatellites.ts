import express, { Request, Response } from "express";
import config from "../../config/index";
import { readFileSync, writeFile } from "fs";

import Satellite from "../../modules/satellite";
import { fetchApi } from "../../utils/fetchApi";
import {
  internalServerError,
  successfullRequest,
  badRequest,
} from "../../utils/routesStatus";

const app = express();
app.use(express.json());

const router = express.Router();
const routes = config.routes;

router.post(routes.post.postSatellite, async (req: Request, res: Response) => {
  const { satelliteId } = req.body;
  if (typeof satelliteId !== "string") {
    badRequest(res, "Invalid request: 'satelliteId' must be a number");
    return;
  }

  try {
    const response = await fetchApi<string>(
      `https://api.keeptrack.space/v1/sat/${satelliteId}`
    );
    const requestJsonData = JSON.parse(response);
    const satellite = new Satellite(requestJsonData);

    const existingData: Satellite[] = JSON.parse(
      readFileSync(config.files.coolSatellites, "utf-8")
    );

    // Check if satelliteId already exists
    if (existingData.find((existingSatellite) => existingSatellite.noradId === satelliteId)) {
      badRequest(res, "Satellite with that ID already exists");
      return;
    }

    existingData.push(satellite);
    writeFile(
      config.files.coolSatellites,
      JSON.stringify(existingData, null, 2),
      "utf-8",
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }
        successfullRequest(res);
      }
    );
  } catch (error: any) {
    console.error("Error fetching or parsing satellite data:", error);
    internalServerError(res);
  }
});

export default router;