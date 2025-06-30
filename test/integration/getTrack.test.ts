import { describe, expect, it } from "vitest";
import { R } from "@mobily/ts-belt";
import { getTrack } from "../../src/entities/track/api/getTrack";

describe("get track", () => {
  it("should return track by slug", async () => {
    const track = await getTrack("silver-static");

    expect(R.isOk(track)).toBe(true);
    expect(R.getExn(track)).toEqual({
      id: "1748977648753",
      slug: "silver-static",
      title: "Silver Static",
      artist: "The Hollow Veins",
      album: "Parallels & Dust",
      audioFile: "1748977648753.mp3",
      coverImage: "",
      genres: ["Pop"],
      createdAt: "2025-06-03T19:07:28.753Z",
      updatedAt: "2025-06-03T19:10:05.869Z",
    });
  });
});
