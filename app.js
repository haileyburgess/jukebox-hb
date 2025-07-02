import express from "express";
const app = express();
export default app;

import playlistsRouter from "#api/playlists";
import tracksRouter from "#api/tracks";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);
