import app from "./app.js";

export const port = process.env.PORT!;

app.listen(port, () => {
  console.log(`
    ╔═══════════════════════════════════════════════╗
    ║   FoodLedger API                              ║
    ║   Rodando em: http://localhost:${port}/api/v1    ║
    ║   Ambiente: ${process.env.NODE_ENV}                       ║
    ╚═══════════════════════════════════════════════╝
    `);
});
