import express from "express";

function internalServerError(
  res: express.Response<any, Record<string, any>>
) {
  res.status(500).json({ error: "Internal Server Error" });
}

function successfullRequest(
  res: express.Response<any, Record<string, any>>,
  message: any = "Success"
) {
  res.status(200).json(message);
}

function badRequest(
  res: express.Response<any, Record<string, any>>,
  message: string
) {
  res.status(400).json({ error: message });
}

export default { internalServerError, successfullRequest, badRequest };