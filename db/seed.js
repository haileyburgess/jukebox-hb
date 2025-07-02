import db from "#db/client";
import { faker } from "@faker-js/faker";

import { createPlaylist } from "./queries/playlists.js";
import { createTrack } from "./queries/tracks.js";
import { createPlaylistTracks } from "./queries/playlist_tracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const trackIds = [];
  const playlistIds = [];

  // Create 20 fake tracks
  for (let i = 0; i < 20; i++) {
    const name = faker.music.songName();
    const duration = faker.number.int({ min: 180000, max: 300000 }); // 3–5 min in ms
    const { id } = await createTrack(name, duration);
    trackIds.push(id);
  }

  // Create 10 fake playlists
  for (let i = 0; i < 10; i++) {
    const name = faker.word.words({ count: { min: 2, max: 4 } });
    const description = faker.lorem.sentence();
    const { id } = await createPlaylist(name, description);
    playlistIds.push(id);
  }

  // Create 15+ playlist_tracks (random unique pairs)
  const usedPairs = new Set();
  while (usedPairs.size < 15) {
    const trackId = faker.helpers.arrayElement(trackIds);
    const playlistId = faker.helpers.arrayElement(playlistIds);
    const key = `${playlistId}-${trackId}`;
    if (!usedPairs.has(key)) {
      usedPairs.add(key);
      await createPlaylistTracks(playlistId, trackId);
    }
  }
}
