import db from "#db/client";

export async function createTrack(name, duration_ms) {
  const sql = `
    INSERT INTO tracks
    (name, duration_ms)
    VALUES
    ($1, $2)
    RETURNING id
    `;
  const {
    rows: [track],
  } = await db.query(sql, [name, duration_ms]);
  return track;
}

export async function getAllTracks() {
  const sql = `
    SELECT * 
    FROM tracks
    `;
  const { rows: tracks } = await db.query(sql);
  return tracks;
}

export async function getTracksById() {
  const sql = `
    SELECT *
    FROM tracks
    WHERE id = $1
    `;
  const {
    rows: [tracks],
  } = await db.query(sql, [id]);
  return tracks;
}

export async function getTracksByPlaylistId() {
  const sql = `
    SELECT DISTINCT tracks.*
    FROM
      playlist_tracks
      JOIN playlists ON playlist_tracks.playlist_id = playlists.id
      JOIN tracks ON playlist_tracks.tracks_id = tracks.id
    WHERE
      playlists.id = $1
    `;
  const { rows: tracks } = await db.query(sql, [id]);
  return tracks;
}
