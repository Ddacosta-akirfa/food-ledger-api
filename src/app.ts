import express, { type Application } from "express";
import routes from "../src/routes.js";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const API_PREFIX = "/api/v1";
app.use(API_PREFIX, routes);

export default app;
