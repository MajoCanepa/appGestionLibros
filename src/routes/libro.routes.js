import { Router } from "express";
import { ctrlAddLibro, ctrlGetLibros, ctrlGetLibro, ctrlUpdateLibro, ctrlDeleteLibro } from "../controllers/libro.controller.js";

const router = Router();

router.get("/libros", ctrlGetLibros);
router.get("/libro/:id", ctrlGetLibro);
router.post("/libro", ctrlAddLibro);
router.put("/libro/:id/update", ctrlUpdateLibro);
router.delete("/libro/:id/delete", ctrlDeleteLibro);

export default router;