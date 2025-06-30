import { useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { Music4 } from "lucide-react";
import { useDebounce } from "../lib";
import { TextField } from "./TextField";

interface Props<T extends FieldValues> {
  url: string;
  control: Control<T>;
  name: Path<T>;
  label: string;
  onError: (error: string) => void;
}

export const CoverLoader = <T extends FieldValues>({
  url,
  control,
  label,
  name,
  onError,
}: Props<T>) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const debouncedImageUrl = useDebounce(url, 1000);
  return (
    <div className="flex gap-x-4 items-end">
      {debouncedImageUrl && (
        <img
          src={debouncedImageUrl}
          alt="cover"
          className="rounded-md border-2 border-gray-400 hidden"
          aria-hidden="true"
          onLoad={() => {
            setImageLoaded(true);
            onError("");
          }}
          onError={() => {
            setImageLoaded(false);
            onError("Invalid image url");
          }}
        />
      )}
      <TextField
        control={control}
        name={name}
        label={label}
        inputTestId="input-cover-image"
        errorTextTestId="error-coverImage"
      />
      {imageLoaded && debouncedImageUrl ? (
        <img
          src={debouncedImageUrl}
          alt="cover"
          width={96}
          height={96}
          className="w-24 h-24 rounded-md border-2 border-gray-400 object-cover"
        />
      ) : (
        <div className="w-24 h-24 rounded-md border-primary border-2 flex items-center justify-center shrink-0">
          <Music4 className="text-primary" />
        </div>
      )}
    </div>
  );
};
