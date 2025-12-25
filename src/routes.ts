import { Router } from "express";
import * as purchaseController from "../src/modules/purchase/controller/purchaseController.js";

const router: Router = Router();

// Purchase routes
router.post("/user/purchase", purchaseController.createPurchase);
router.get("/user/purchase", purchaseController.listAllPurchases);
router.get("/user/purchase/month", purchaseController.listPurchasesByMonth);
router.get(
  "/user/purchase/month/summary",
  purchaseController.getMonthlySummary
);
router.put("/:id", purchaseController.updatePurchase);

export default router;
