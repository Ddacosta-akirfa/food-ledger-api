import { Router } from "express";
import * as purchaseController from "./modules/purchase/controller/purchaseController.js";
import * as userController from "./modules/user/controller/user.controller.js";
import * as categoryController from "./modules/category/controller/category.controller.js";
import * as authController from "./modules/auth/controllers/auth.controller.js";
import { authMiddleware } from "../src/shared/middlewares/auth.middleware.js";

const router: Router = Router();

// Purchase routes
router.post(
  "/user/purchase",
  authMiddleware,
  purchaseController.createPurchase
);
router.get(
  "/user/purchase",
  authMiddleware,
  purchaseController.listAllPurchases
);
router.get("/user/purchase/month", purchaseController.listPurchasesByMonth);
router.get(
  "/user/purchase/month/summary",
  authMiddleware,
  purchaseController.getMonthlySummary
);
router.put("/:id", authMiddleware, purchaseController.updatePurchase);

// User routes
router.post("/create", userController.createUser);
router.get("/activate", userController.activateUser);

// Auth routes
router.post("/login", authController.login);

export default router;
