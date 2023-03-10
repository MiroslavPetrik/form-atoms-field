import { ReactNode } from "react";

import { BooleanField, booleanField } from "./booleanField";
import { FieldLabel } from "../../components";
import { FieldErrors } from "../../components/field-errors";
import {
  UseOptionsProps,
  UseSelectFieldProps,
  useOptions,
  useSelectFieldProps,
} from "../../hooks";
import { FormStory, fixArgs, meta } from "../../scenarios/StoryForm";

export default {
  ...meta,
  title: "fields/booleanField",
};

const YesNoOptions = <Option,>({
  field,
  label,
  getValue,
  getLabel,
  options,
}: { label: ReactNode } & UseOptionsProps<Option> &
  UseSelectFieldProps<Option, BooleanField>) => {
  const props = useSelectFieldProps({ field, options, getValue });

  const { renderOptions } = useOptions({
    field,
    getLabel,
    options,
  });

  return (
    <div style={{ margin: "20px 0" }}>
      <FieldLabel field={field} label={label} />
      {renderOptions.map(({ id, value, label }) => (
        <div key={id}>
          <input
            type="radio"
            {...props}
            id={id}
            value={value}
            checked={props.value === value}
          />
          <label htmlFor={id}>{label}</label>
        </div>
      ))}
      <div>
        <FieldErrors field={field} />
      </div>
    </div>
  );
};

const yesNoOptions = [
  {
    label: "Yes, I accept the Funeral terms.",
    value: true,
  },
  {
    label: "No, I don't accept the Funeral terms.",
    value: false,
  },
];

export const Required: FormStory = {
  args: fixArgs({
    fields: {
      termsOfService: booleanField(),
    },
    children: ({ fields }) => (
      <YesNoOptions
        field={fields.termsOfService}
        label="Do you accept the Funeral terms?"
        options={yesNoOptions}
        getLabel={({ label }) => label}
        getValue={({ value }) => value}
      />
    ),
  }),
};

// export const Optional: FormStory = {
//   args: fixArgs({
//     fields: {
//       newsletter: checkboxField({
//         optional: true,
//       }),
//     },
//     children: ({ fields }) => (
//       <CheckboxInput
//         field={fields.newsletter}
//         label="Subscribe to newsletter"
//       />
//     ),
//   }),
//   parameters: {
//     docs: {
//       description: {
//         story:
//           "Optional checkboxField will have true or false value in the submit data.",
//       },
//     },
//   },
// };
