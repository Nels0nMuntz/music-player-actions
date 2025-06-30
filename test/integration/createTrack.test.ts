import { describe, expect, it } from "vitest";
import { createTrack } from "../../src/entities/track/api/createTrack";
import { CreateTrackRequest } from "../../src/entities/track/model/types/createTrackRequest";

describe("create track", () => {
    it("should create a new track", async () => {
      const newTrackData: CreateTrackRequest = {
        title: "Echoes of Tomorrow",
        artist: "Nova Reign",
        album: "Synthetic Horizons",
        genres: ["Jazz", "Electronic"],
        coverImage:
          "https://images.unsplash.com/photo-1746407177268-951b3b74d773?q=80&w=2924&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      };
      const createdTrack = await createTrack(newTrackData);

      expect(createdTrack).toMatchObject(newTrackData);
      expect(createdTrack.id).toBeTypeOf("string");
      expect(createdTrack.slug).toBeTypeOf("string");
    });

    it("should return an error if title is missing", async () => {
      const invalidTrackData: CreateTrackRequest = {
        title: "",
        artist: "Nova Reign",
        album: "Synthetic Horizons",
        genres: ["Jazz", "Electronic"],
        coverImage:
          "https://images.unsplash.com/photo-1746407177268-951b3b74d773?q=80&w=2924&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      };

      await expect(createTrack(invalidTrackData)).rejects.toThrow(
        "Title and artist are required"
      );
    });

    it("should return an error if artist is missing", async () => {
      const invalidTrackData: CreateTrackRequest = {
        title: "Echoes of Tomorrow",
        artist: "",
        album: "Synthetic Horizons",
        genres: ["Jazz", "Electronic"],
        coverImage:
          "https://images.unsplash.com/photo-1746407177268-951b3b74d773?q=80&w=2924&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      };

      await expect(createTrack(invalidTrackData)).rejects.toThrow(
        "Title and artist are required"
      );
    });

  it("should return error if track with the same title already exists", async () => {
    const trackData: CreateTrackRequest = {
      title: "Glass Echoes",
      artist: "Velvet Shore",
      album: "Midnight Frequencies",
      genres: ["Pop"],
      coverImage: "",
    };

    const firstTrack = await createTrack(trackData);
    expect(firstTrack).toBeDefined();
    await expect(createTrack(trackData)).rejects.toThrow("A track with this title already exists");
  });
});
