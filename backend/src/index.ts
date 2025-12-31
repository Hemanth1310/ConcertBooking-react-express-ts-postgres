import express from "express";
import authRouter from "./authenticationRoutes";
import protectedRoutes from "./protectedRoutes";
import publicRoutes from "./publicRoutes";
import cors from "cors";
import path from "path";
const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/images", express.static("public"));
app.use("/auth", authRouter);
app.use("/api", protectedRoutes);
app.use("/data", publicRoutes);

const publicPath = path.join(__dirname, "..", "public");

app.get("/images/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagesPath = path.join(publicPath, filename);

  if (!imagesPath.startsWith(publicPath)) {
    res.status(405).send("Forbidden");
  }

  res.sendFile(imagesPath, (err) => {
    if (err) {
      res.status(404).send("File not found");
    }
  });
});

app.listen(3008, () => {
  console.log("Listening on port 3008");
});
