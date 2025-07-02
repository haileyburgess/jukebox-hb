import express from "express";
const router = express.Router();
export default router;

import { getAllTracks } from "#db/queries/tracks";
import { getTracksById } from "#db/queries/tracks";
import { getTracksByPlaylistId } from "#db/queries/tracks";

router.route("/").get(async (request, response) => {
  const tracks = await getAllTracks();
  response.send(tracks);
});

router.route("/:id").get(async (request, response) => {
  const { id } = request.params;
  const tracks = await getTracksById(id);
  response.send(tracks);
});
