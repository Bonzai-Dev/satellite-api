import express from "express";

export function internalServerError(
  res: express.Response<any, Record<string, any>>
) {
  res.status(500).json({ error: "Internal Server Error" });
}

export function successfullRequest(
  res: express.Response<any, Record<string, any>>,
  message: any = "Success"
) {
  res.status(200).json(message);
}

export function badRequest(
  res: express.Response<any, Record<string, any>>,
  message: string
) {
  res.status(400).json({ error: message });
}
