import app from "./app.js";
import env from "./config/env.js";
import connectDatabase from "./config/db.js";

const PORT = env.PORT || 3000;
const start = async () => {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
  });
};

start();
