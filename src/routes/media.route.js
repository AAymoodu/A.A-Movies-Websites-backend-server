import { Router } from "express";
import {
  getAllMedia,
  getMedia,
  addMedia,
  editMedia,
  deleteMedia,
  getMovies,
  getSeries,
} from "../controllers/media.controllers.js";

const router = Router();
router.get("/", getAllMedia);
router.get("/:id", getMedia);
router.get("/allmedia/movies", getMovies);
router.get("/allmedia/series", getSeries);
router.post("/addmedia", addMedia);
router.patch("/:id", editMedia);
router.delete("/:id", deleteMedia);

export default router;
