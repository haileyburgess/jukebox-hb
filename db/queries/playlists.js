import db from "#db/client";

export async function createPlaylist(name, description) {
  const sql = `
    INSERT INTO playlists
    (name, description)
    VALUES
    ($1, $2)
    RETURNING id
    `;
  const {
    rows: [playlist],
  } = await db.query(sql, [name, description]);
  return playlist;
}

export async function getAllPlaylists() {
  const sql = `
      SELECT * 
      FROM playlists
      `;
  const { rows: playlists } = await db.query(sql);
  return playlists;
}

export async function getPlaylistsById() {
  const sql = `
      SELECT *
      FROM playlists
      WHERE id = $1
      `;
  const {
    rows: [playlists],
  } = await db.query(sql, [id]);
  return playlists;
}


