import express, { type Application } from "express";
// import routes from "../src/routes.js";

const app: Application = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const API_PREFIX = "/api/v1";
// app.use(API_PREFIX, routes);

app.listen(port, () => {
  console.log(`
    ╔════════════════════════════════════════╗
    ║   cinfohub API                         ║
    ║   Rodando em: http://localhost:${port}    ║
    ║   Ambiente: ${process.env.NODE_ENV}                ║
    ╚════════════════════════════════════════╝
    `);
});

export default app;
