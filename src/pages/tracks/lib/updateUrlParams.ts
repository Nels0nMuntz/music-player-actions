import { useSearchParams } from "react-router-dom";
import { TrackListSettings } from "@/shared/model";
import { useCallback } from "react";

export const useUpdateUrlParams = () => {
  const [, setParams] = useSearchParams();
  const updateUrlParams = useCallback(
    (newSettings: Partial<TrackListSettings>) => {
      const currentParams = new URLSearchParams(window.location.search);
      Object.entries(newSettings).forEach(([key, value]) => {
        if (value) {
          currentParams.set(key, value.toString());
        } else {
          currentParams.delete(key);
        }
      });
      setParams(currentParams);
    },
    [setParams]
  );
  return updateUrlParams;
};
