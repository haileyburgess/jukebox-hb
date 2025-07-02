import db from "#db/client";

export async function createPlaylistTracks(playlist_id, track_id) {
  const sql = `
    INSERT INTO playlist_tracks
    (playlist_id, track_id)
    VALUES
    ($1, $2)
    RETURNING id
    `;
  const {
    rows: [playlist_track],
  } = await db.query(sql, [playlist_id, track_id]);
  return playlist_track;
}

export async function createPlaylistTrack(playlist_id, track_id) {
  const sql = `
    INSERT INTO playlist_tracks
      (playlist_id, track_id)
    VALUES
      ($1, $2)
    RETURNING *
    `;
  const {
    rows: [playlist_track],
  } = await db.query(sql, [playlist_id, track_id]);
  return playlist_track;
}
