import { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./tailwind/form";
import { Input } from "./tailwind/input";

interface Props<T extends FieldValues>  {
  control: Control<T>;
  name: Path<T>;
  label: string;
  inputTestId?: string;
  errorTextTestId?: string;
}

export const TextField = <T extends FieldValues>({ control, name, label, inputTestId, errorTextTestId }: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input className="border-primary focus-visible:ring-primary" data-testid={inputTestId} {...field} />
          </FormControl>
          <FormMessage data-testid={errorTextTestId}/>
        </FormItem>
      )}
    />
  );
};
