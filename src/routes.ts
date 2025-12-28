import { Router } from "express";
import * as purchaseController from "./modules/purchase/controller/purchaseController.js";
import * as userController from "./modules/user/controller/user.controller.js";
import * as categoryController from "./modules/category/controller/category.controller.js";
import * as authController from "./modules/auth/controllers/auth.controller.js";
import { authMiddleware } from "../src/shared/middlewares/auth.middleware.js";

const router: Router = Router();

// Purchase routes
router.post("/purchases", authMiddleware, purchaseController.createPurchase);
router.get("/purchases", authMiddleware, purchaseController.listAllPurchases);
router.get(
  "/purchases/month",
  authMiddleware,
  purchaseController.listPurchasesByMonth
);
router.get("/summary", authMiddleware, purchaseController.getMonthlySummary);
router.put("/purchases/:id", authMiddleware, purchaseController.updatePurchase);

// User routes
router.post("/users/register", userController.createUser);
router.get("/activate", userController.activateUser);

// Auth routes
router.post("/login", authController.login);

// category routes
router.post("/categories", authMiddleware, categoryController.createCategory);
router.get("/categories", categoryController.listCategories);
router.get("/categories/:id", categoryController.getCategoryById);
router.put(
  "/categories/:id",
  authMiddleware,
  categoryController.updateCategory
);
router.delete(
  "/categories/:id",
  authMiddleware,
  categoryController.deleteCategory
);

export default router;
