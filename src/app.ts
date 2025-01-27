import express, { Request, Response } from "express";
import config from "./config/index";
import {
  fetchRandomSatellites,
  parseTleToJson,
} from "./functions/fetchSatellites";
import NodeCache from "node-cache";
import { readFileSync, writeFile } from "fs";

import Satellite from "./modules/satellite";
import { fetchApi } from "./functions/fetchApi";
import { json } from "stream/consumers";

const app = express();
app.use(express.json());

const tles = readFileSync("./src/assets/TLEs.txt", "utf-8");

const port = config.port;
const routes = config.routes;
const cache = new NodeCache();

const cacheKeys = {
  satellites: "satellites",
};

app.use(async (req, res, next) => {
  if (!cache.get(cacheKeys.satellites)) {
    console.log("Fetching satellites data");
    cache.set(cacheKeys.satellites, parseTleToJson(tles));
  } else {
    console.log("Using existing satellite data");
  }

  // const path = req.path.replace(/\/+$/, "");
  // if (!Object.values(routes).includes(path)) {
  //   res.status(404).json({ error: "Refer to documentation for valid routes." });
  //   return;
  // }

  next();
});

app.get(routes.satellites, async (req: Request, res: Response) => {
  res.status(200).json(cache.get(cacheKeys.satellites));
});

app.get(routes.search, async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(`Fetching satellite with ID: ${id}`);

  try {
    const response: string = await fetchApi<string>(
      `https://api.keeptrack.space/v1/sat/${id}`
    );
    const satelliteData: any = await JSON.parse(response);
    res.json(new Satellite(satelliteData));
  } catch (error) {
    console.error("Error fetching or parsing satellite data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get(routes.randomSatellite, async (req: Request, res: Response) => {
  console.log("Fetching random satellite");

  try {
    const satellites: Satellite[] = cache.get(cacheKeys.satellites) || [];
    const randomSatellite = fetchRandomSatellites(satellites);
    res.json(randomSatellite);
  } catch (error) {
    console.error("Error fetching or parsing satellite data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post(routes.post, async (req: Request, res: Response) => {
	//TODO: improve code and add appending to json
  const { satelliteId } = req.body;
  if (typeof satelliteId !== "string") {
    res
      .status(400)
      .json({ error: "Invalid request: satelliteId must be a number" });
    return;
  }

  try {
    const response = await fetchApi<string>(
      `https://api.keeptrack.space/v1/sat/${satelliteId}`
    );
    const jsonData = JSON.parse(response);
		const satellite = new Satellite(jsonData);
    const satelliteData = { [satellite.name]: satellite };

    writeFile("./src/assets/cool-satellites.json", JSON.stringify(satelliteData), "utf-8", (err) => {
      if (err) {
        console.error("Error writing file:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.status(200).json({ message: "Post request successfull" });
    });
  } catch (error: any) {
    console.error("Error fetching or parsing satellite data:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(
    `Server is running on port ${port}. Visit http://localhost:${port}${routes.satellites}`
  );
});
