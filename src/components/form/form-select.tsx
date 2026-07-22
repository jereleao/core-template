import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "~/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { FormControlFunc, SelectOption } from "~/components/form/types";
import { FormBase } from "~/components/form/form-base";

export const FormSelect: FormControlFunc<{ options: Array<SelectOption> }> = (
  props,
) => {
  return (
    <FormBase
      {...props}
      render={({ field, fieldState, label, description }) => {
        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldContent>
              <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
              {description && (
                <FieldDescription>{description}</FieldDescription>
              )}
            </FieldContent>
            <Select {...field} onValueChange={field.onChange}>
              <SelectTrigger
                aria-invalid={fieldState.invalid}
                id={field.name}
                onBlur={field.onBlur}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                {props.options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};
