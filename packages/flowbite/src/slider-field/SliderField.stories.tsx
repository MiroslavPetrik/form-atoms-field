import { SliderField } from "./SliderField";
import { z } from "zod";
import { FormStory, meta } from "../stories";
import { numberField } from "@form-atoms/field";

export default {
  title: "SliderField",
  ...meta,
};

const rating = numberField({
  schema: z
    .number({ required_error: "Please adjust your confidence" })
    .min(0)
    .max(100),
});

export const Primary: FormStory = {
  args: {
    fields: { rating },
    children: (args) => (
      <SliderField
        min={0}
        max={100}
        field={rating}
        label="Confidence"
        {...args}
      />
    ),
  },
};