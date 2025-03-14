import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import userRouter from "./routes/UserRoutes.js";
import songRouter from "./routes/SongRoutes.js";
import albumRouter from "./routes/AlbumRoutes.js";
import reviewRouter from "./routes/ReviewRoutes.js";
import authRouter from "./routes/AuthRoutes.js";
import favoriteSongRouter from "./routes/FavoriteSongRoutes.js";
import favoriteAlbumRouter from "./routes/FavoriteAlbumRoutes.js";
import favoriteArtistRouter from "./routes/FavoriteArtistRoutes.js";
import favoriteReviewRouter from "./routes/FavoriteReviewRoutes.js";

const PORT = 8081;
const app = express();

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

// const sslOptions = {
//     key: fs.readFileSync('server.key'),
//     cert: fs.readFileSync('server.cert')
// };

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  session({
    secret: "root",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use("/api", userRouter);
app.use("/api", songRouter);
app.use("/api", albumRouter);
app.use("/api", reviewRouter);
app.use("/api", authRouter);
app.use("/api", favoriteSongRouter);
app.use("/api", favoriteAlbumRouter);
app.use("/api", favoriteArtistRouter);
app.use("/api", favoriteReviewRouter);

async function startApp() {
  try {
    app.listen(PORT, () => console.log("SERVER STARTED ON PORT " + PORT));
  } catch (error) {
    console.error(error);
  }
}

startApp();
