import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const database = SQLite.openDatabaseAsync("places.db");

export async function init() {
  await database.execAsync(
    `PRAGMA journal_mode = WAL;CREATE TABLE IF NOT EXISTS places(
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    imgeUri TEXT NOT NULL,
    address TEXT NOT NULL,
    lat REAL NOT NULL,
    long REAL NOT NULL
    )`
  );
}

export async function insertPlace(place) {
  await database.runAsync(
    `INSERT INTO places (title,imageUri,address,lat,long) VALUES(?,?,?,?,?)`,
    place.title,
    place.imageUri,
    place.address,
    place.location.lat,
    place.location.long
  );
}

export async function fetchPlaces() {
  const places = [];
  const result = await database.getAllAsync("SELECT * FROM test");

  for (const row of result) {
    places.push(
      new Place(
        row.title,
        row.imageUri,
        {
          address: row.address,
          lat: row.lat,
          long: row.long,
        },
        row.id
      )
    );
  }
  return places;
}

export async function fetchPlaceDetails(id) {
  if (!id) {
    throw new Error("ID must be provided.");
  }

  const statement = await database.prepareAsync(
    "SELECT * FROM places WHERE id = $id"
  );
  try {
    const result = await statement.executeAsync({ $id: id });
    const firstRow = await result.getFirstAsync();
    if (!firstRow) return null;
    return new Place(
      firstRow.title,
      firstRow.imageUri,
      {
        address: firstRow.address,
        lat: firstRow.lat,
        long: firstRow.long,
      },
      firstRow.id
    );
  } finally {
    await statement.finalizeAsync();
  }
}
