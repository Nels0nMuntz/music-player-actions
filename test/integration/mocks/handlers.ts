import { http, HttpResponse } from "msw";
import { CreateTrackRequest } from "../../../src/entities/track/model/types/createTrackRequest";
import tracksStore from "./tracksStore";
import { Track } from "../../../src/entities/track/model/types/track";

export const handlers = [
  http.get("http://localhost:8000/api/genres", () => {
    return HttpResponse.json(["Rock", "Pop", "Hip Hop"]);
  }),

  http.get("http://localhost:8000/api/tracks/:slug", ({ params }) => {
    const { slug } = params;

    if (slug === "not-existing-track") {
      return HttpResponse.json({ error: "Track not found" }, { status: 404 });
    }

    return HttpResponse.json({
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
  }),

  http.post("http://localhost:8000/api/tracks", async ({ request }) => {
    const userData = (await request.json()) as CreateTrackRequest;

    if (!userData.title.trim() || !userData.artist.trim()) {
      return HttpResponse.json(
        { error: "Title and artist are required" },
        { status: 400 }
      );
    }

    if (tracksStore.findBySlug(userData.title.toLowerCase().replace(/\s+/g, "-"))) {
      return HttpResponse.json(
        { error: "A track with this title already exists" },
        { status: 409 }
      );
    }
    
    const newTrack: Track = {
      ...userData,
      id: Date.now().toString(),
      slug: userData.title.toLowerCase().replace(/\s+/g, "-"),
      album: userData.album || "",
      audioFile: `${Date.now()}.mp3`,
      coverImage: userData.coverImage || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    tracksStore.add(newTrack);
    return HttpResponse.json(newTrack, { status: 201 });
  }),
];
