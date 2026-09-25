import Media from "../models/media.models.js";
import { mediaValidator } from "../validators/media.validators.js";

export async function getAllMedia(req, res) {
  try {
    const allMedia = await Media.find();
    // console.log(allMedia.length)
    return res.json({ allMedia });
  } catch (err) {
    res.status(500).send({ detail: "something went Wrong: " + err.message });
    return;
  }
}

export async function getMedia(req, res) {
  const id = req.params.id;
  try {
    const media = await Media.findById(id);
    if (!media) {
      return res.status(404).send({ detail: "Media not found" });
    }
    res.json({ media });
  } catch (err) {
    res.status(500).json({ detail: "An error occurred: " + err.message });
    return;
  }
}

export async function getMovies(req, res) {
  const type = "Movie";
  try {
    const movies = await Media.find({ type: type });
    if (!movies) {
      res.status(404).send({ detail: "Media not found" });
      return;
    }
    // incase of an empty return
    if (movies.length < 1) {
      res.status(404).send({ detail: "Media not found" });
      return;
    }
    res.json({ movies });
  } catch (err) {
    res.status(500).json({ detail: "An error occurred: " + err.message });
    return;
  }
}

export async function getSeries(req, res) {
  const type = "Series";
  try {
    const Series = await Media.find({ type: type });
    if (!Series) {
      res.status(404).send({ detail: "Media not found" });
      return;
    }
    // incase of an empty return
    if (Series.length < 1) {
      res.status(404).send({ detail: "Media not found" });
      return;
    }
    res.json({ Series });
  } catch (err) {
    res.status(500).json({ detail: "An error occurred: " + err.message });
    return;
  }
}

export async function addMedia(req, res) {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ detail: "Request body is required" });
  }

  //  * const { poster, name, description, episodes } = body;

  const { error, value } = mediaValidator.validate(body, { abortEarly: false });

  if (error) {
    return res.status(400).send({ detail: error.message });
  }

  //   console.log(value);

  const { poster, name, description, episodes, type } = value;

  try {
    const alreadyExistingMedia = await Media.findOne({ name: name });
    if (alreadyExistingMedia) {
      return res.status(409).json({ detail: "Movie or Series already exists" });
    }

    if (type == "Movie" && episodes.length > 1) {
      return res
        .status(400)
        .json({ detail: "Movie cannot have more than one episode" });
    }
    const media = await Media.create({
      poster,
      name,
      description,
      episodes,
      type,
    });

    res.send({ detail: "Media added Successfully", media });
  } catch (err) {
    console.log(err);

    res.status(500).send({ detail: "something went Wrong: " + err.message });
    return;
  }
}

export async function editMedia(req, res) {
  const id = req.params.id;
  const body = req.body;
  if (!body) {
    return res.status(400).json({ detail: "Request body is required" });
  }
  const { name } = body;
  try {
    const alreadyExistingMedia = await Media.findOne({ name: name });
    if (alreadyExistingMedia) {
      return res.status(409).json({
        detail: "Movie or Series already exists, choose another Name",
      });
    }

    const media = await Media.findOneAndUpdate({ _id: id }, body, {
      returnDocument: "after",
    });
    if (!media) {
      return res.status(404).send({ detail: "Media not found" });
    }
    res.send({ detail: "Media Edited Successfully", media });
  } catch (err) {
    res.status(500).json({ detail: "An error occurred: " + err.message });
    return;
  }
}

export async function deleteMedia(req, res) {
  const id = req.params.id;

  try {
    const media = await Media.findByIdAndDelete(id);
    if (!media) {
      return res.status(404).send({ detail: "Media not found" });
    }

    res.send({ message: "Media deleted successfully" });
  } catch (err) {
    res.status(500).json({ detail: "An error occurred: " + err.message });
    return;
  }
}
