import { Track } from "../../src/entities/track/model/types/track";

const tracks = [] as Track[];

const add = (track: Track) => {
  tracks.push(track);
};

const clear = () => {
  tracks.length = 0;
};

const findBySlug = (slug: string) => {
  return tracks.find((track) => track.slug === slug);
};

export default { add, clear, findBySlug };
