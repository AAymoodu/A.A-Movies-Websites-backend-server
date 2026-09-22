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
import { authenticate, adminsOnly } from "../middleware/user.middleware.js";

const router = Router();
router.get("/", getAllMedia);
router.get("/:id", getMedia);
router.get("/allmedia/movies", getMovies);
router.get("/allmedia/series", getSeries);
router.post("/addmedia", [authenticate, adminsOnly], addMedia);
router.patch("/:id", [authenticate, adminsOnly], editMedia);
router.delete("/:id", [authenticate, adminsOnly], deleteMedia);

export default router;
