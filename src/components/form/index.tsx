import type { DetailedHTMLProps, FormHTMLAttributes } from "react";
import type {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { FieldGroup } from "~/components/ui/field";
import { FormInput } from "~/components/form/form-input";
import { FormTextarea } from "~/components/form/form-textarea";
import { FormSelect } from "~/components/form/form-select";
import { FormCheckbox } from "~/components/form/form-checkbox";

function Form<
  TFieldValues extends FieldValues,
  TContext = any,
  TTransformedValues = TFieldValues,
>({
  onValid,
  onInvalid,
  form,
  children,
  ...formProps
}: Omit<
  DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
  "onSubmit"
> & {
  form: UseFormReturn<TFieldValues, TContext, TTransformedValues>;
  onValid: SubmitHandler<TTransformedValues>;
  onInvalid?: SubmitErrorHandler<TFieldValues> | undefined;
}) {
  return (
    <form onSubmit={form.handleSubmit(onValid, onInvalid)} {...formProps}>
      <FieldGroup>{children}</FieldGroup>
    </form>
  );
}

export { Form, FormInput, FormTextarea, FormSelect, FormCheckbox };
