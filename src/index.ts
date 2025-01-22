import express, { Request, Response } from "express";
import config from "./config/index";
import { fetchApi, fetchRandomSatellites, parseTleArrayToString, parseTleToJson, splitTleToList } from "./functions/fetch";
import Satellite from "./modules/satellite";
import { gstime } from "satellite.js";
import NodeCache from "node-cache";
import { readFileSync } from 'fs';
import { parse } from "path";

const app = express();
app.use(express.json());

const tles = readFileSync("./src/assets/TLEs.txt", "utf-8");

const port = config.port;
const cache = new NodeCache();

app.use(async (req, res, next) => {
  const validRoutes = ["/api/satellites", "/api/satellites/random"];
  // const satellites: string = await fetchApi(
  //   "https://api.wheretheiss.at/v1/satellites/25544/tles?format=text"
  // );

  // console.log(satellites);
  
  const key = req.url;
  
  // if (validRoutes.includes(req.url)) {
  //   if (!cache.has(key)) {
  //     const satellites = splitTleToList(tles);
  //     let satellitesJsonList = [];
      
  //     for (let i = 0; i < satellites.length; i++)
  //       satellitesJsonList.push(parseTleToJson(satellites[i]));

  //     cache.set(key, satellitesJsonList, 3600);
  //     console.log("Fetching new data");
  //   } else {
  //     console.log("Using cached data");
  //   }
  // } else {
  //   console.log("Invalid route");
  // }

  next();
});

app.get("/api/satellites", async (req: Request, res: Response) => {
  res.json(cache.get(req.url));
});

app.get("/api/satellites/random", async (req: Request, res: Response) => {
  console.log("Fetching random satellite");
  // TODO: find an API that provides a list of satellites
  const satellites = `
  CALSPHERE 2             
  1 00902U 64063E   25018.57912779  .00000071  00000+0  93731-4 0  9997
  2 00902  90.2230  63.8129 0016546 282.6233 232.3565 13.52843172786683
  CALSPHERE 1             
1 00900U 64063C   25018.57241455  .00000969  00000+0  99059-3 0  9995
2 00900  90.2083  60.0550 0026747  54.0607 116.7255 13.75753341   643
  `;
  const randomSatellite = splitTleToList(satellites);
  // const randomSatellite = fetchRandomSatellites(satellites as string);
  res.json(randomSatellite);
});

app.post("/api/satellites", async (req: Request, res: Response) => {
  res.send("Received POST request");
});

app.listen(port, () => {
  console.log(
    `Server is running on port ${port}. Visit http://localhost:${port}/api/satellites`
  );
});
