import { useAtomValue } from "jotai";
import { ChangeEvent, useCallback } from "react";
import { ZodBoolean, ZodNumber, ZodString, z } from "zod";

import { serializeValue, useFieldProps } from "..";
import {
  BooleanFieldAtom,
  NumberFieldAtom,
  StringFieldAtom,
  ZodFieldValue,
} from "../../fields";

// primitive fields which can be serialized by useOptions & coerced back to original type
export type OptionFieldAtom =
  | BooleanFieldAtom
  | NumberFieldAtom
  | StringFieldAtom;

export const useOptionFieldProps = <Field extends OptionFieldAtom>(
  field: Field
) => {
  const atom = useAtomValue(field);
  const schema = useAtomValue(atom.schema);

  const getEventValue = useCallback(
    (event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
      // TODO: this can throw with wrong runtime atom; perhaps catch & set error into the field?

      const coerceSchema =
        schema instanceof ZodBoolean
          ? z.coerce.boolean()
          : schema instanceof ZodNumber
          ? z.coerce.number()
          : schema instanceof ZodString
          ? z.coerce.string()
          : z.never();

      return coerceSchema.parse(event.target.value) as ZodFieldValue<Field>;
    },
    [schema]
  );

  const props = useFieldProps<Field, HTMLSelectElement | HTMLInputElement>(
    field,
    getEventValue
  );

  return { ...props, value: serializeValue(props.value) };
};