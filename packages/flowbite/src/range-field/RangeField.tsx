import { RangeSlider, RangeSliderProps, Label } from "flowbite-react";
import { useFieldError } from "../hooks";
import { NumberFieldProps, useNumberFieldProps } from "@react-last-field/field";
import { Field } from "../field";

export const RangeField = ({
  label,
  field,
  helperText,
  ...inputProps
}: NumberFieldProps & RangeSliderProps) => {
  const props = useNumberFieldProps(field);
  const { color, error } = useFieldError(field);

  return (
    <Field>
      {label && (
        <Label color={color} htmlFor={props.name}>
          {label}
        </Label>
      )}
      <div>
        <RangeSlider color={color} {...props} {...inputProps} />
      </div>
    </Field>
  );
};