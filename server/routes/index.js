import data from "../controllers/data.js";

export default function (app) {
  app.post("/datapost", data);
}
