import express from "express";
const router = express.Router();
export default router;

import { getAllPlaylists } from "#db/queries/playlists";
import { getPlaylistsById } from "#db/queries/playlists";
import { createPlaylist } from "#db/queries/playlists";
import { getTracksByPlaylistId } from "#db/queries/tracks";
import { createPlaylistTracks } from "#db/queries/playlist_tracks";

// Get all playlists

router.route("/").get(async (request, response) => {
  const playlists = await getAllPlaylists();
  response.send(playlists);
});

// Get playlists by ID (params)

router.route("/:id").get(async (request, response) => {
  const { id } = request.params;
  const playlists = await getPlaylistsById(id);
  response.send(playlists);
});

// Create new playlist (POST)

router.route("/").post(async (request, response) => {
  if (!request.body) return response.status(400).send("Request body required.");

  const { name, description } = request.body;
  if (!name || !description) {
    return response.status(400).send("Request body needs: name, description");
  }

  const playlist = await createPlaylist(name, description);
  response.status(201).send(playlist);
});

// Get all tracks in a specific playlists (params)

router.route("/:id/tracks").get(async (request, response) => {
  const { id } = request.params;
  const tracks = await getTracksByPlaylistId(id);
  response.status(201).send(tracks);
});

// Add a new track to a playlist

router.route("/:id/tracks").post(async (request, response) => {
  if (!request.body) return response.status(400).send("Request body required.");
  const { id } = request.params;
  const { playlist_id, track_id } = request.body;
  if (!playlist_id || !track_id) {
    return response
      .status(400)
      .send("Request body needs: playlist ID, track ID");
  }
  const addTrack = await createPlaylistTracks(async (request, response) => {
    response.status(201).send(addTrack);
  });
});
