import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import type { FormControlFunc } from "~/components/form/types";
import { FormBase } from "~/components/form/form-base";

export const FormInput: FormControlFunc = (props) => {
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
            <Input
              id={field.name}
              aria-invalid={fieldState.invalid}
              {...field}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
};
