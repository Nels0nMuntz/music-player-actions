import { useMutation } from "@tanstack/react-query";
import { deleteTrack, Track } from "@/entities/track";
import { queryClient } from "@/shared/configs";
import { QUERY_KEYS } from "@/shared/api";
import { toast } from "sonner";

interface Options {
  onSuccess: () => void;
}

export const useDeleteTrackMutation = ({ onSuccess}: Options) => {
  return useMutation({
    mutationFn: deleteTrack,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.tracks] });
      const prevRecords = queryClient.getQueryData([QUERY_KEYS.tracks]);
      queryClient.setQueryData<Track[]>([QUERY_KEYS.tracks], (oldRecords) => [
        ...(oldRecords || []).filter((track) => track.id !== id),
      ]);
      return { prevRecords };
    },
    onSuccess: () => {
      toast.success("The track has been deleted");
      onSuccess();
    },
    onError: (error, _, context?: { prevRecords: unknown }) => {
      toast.error(error.message || "Failed to delete the track");
      queryClient.setQueryData([QUERY_KEYS.tracks], context?.prevRecords);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tracks] });
    },
  });
};
