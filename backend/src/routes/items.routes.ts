import { Router, Request, Response } from "express";
import { ItemController } from "../controllers/items.controller";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  await ItemController.list(req, res);
});
router.get("/:id", async (req: Request, res: Response) => {
  await ItemController.getOne(req, res);
});
router.post("/", async (req: Request, res: Response) => {
  await ItemController.create(req, res);
});
router.put("/:id", async (req: Request, res: Response) => {
  await ItemController.update(req, res);
});
router.delete("/:id", async (req: Request, res: Response) => {
  await ItemController.delete(req, res);
});

export default router;
