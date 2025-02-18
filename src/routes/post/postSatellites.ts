import express, { Request, Response } from "express";
import config from "../../config/index.js";
import { readFileSync, writeFile } from "fs";
import { fetchApi } from "../../utils/index.js";
import { RoutesStatus } from "../../utils/index.js";
import Satellite from "../../modules/satellite.js";
import { DetailedSatellite } from "ootk";

const app = express();
app.use(express.json());

const router = express.Router();
const routes = config.routes;
router.post(routes.post.postSatellite, async (req: Request, res: Response) => {
  const { satelliteId } = req.body;
  if (typeof satelliteId !== "string") {
    RoutesStatus.badRequest(res, "Invalid request: 'satelliteId' must be a number");
    return;
  }

  try {
    const response = await fetchApi<string>(
      `${config.urls.keepTrack}/sat/${satelliteId}`
    );
    const requestJsonData = JSON.parse(response);
    const satelliteData = new DetailedSatellite({
      id: requestJsonData.satId,
      name: requestJsonData.name,
      tle1: requestJsonData.tle1,
      tle2: requestJsonData.tle2,
    });
    const satellite = new Satellite(satelliteData);

    const existingData: Satellite[] = JSON.parse(
      readFileSync(config.files.postedSatellites, "utf-8")
    );

    // Check if satelliteId already exists
    if (existingData.find((existingSatellite) => existingSatellite.noradId === satelliteId)) {
      RoutesStatus.badRequest(res, "Satellite with that ID already exists");
      return;
    }

    existingData.push(satellite);
    writeFile(
      config.files.postedSatellites,
      JSON.stringify(existingData, null, 2),
      "utf-8",
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }
        RoutesStatus.successfullRequest(res);
      }
    );
  } catch (error: any) {
    console.error("Error fetching or parsing satellite data:", error);
    RoutesStatus.internalServerError(res);
  }
});

export default router;