import { useAtomValue, useSetAtom } from "jotai";
import { useMemo } from "react";

import { ZodField } from "../../fields/zodField";

export type RequiredProps = {
  required: boolean;
  "aria-required": boolean;
  isFieldRequired: boolean;
};

export const useRequiredProps = (
  fieldAtom: ZodField<any>,
  uiRequired?: boolean
) => {
  const field = useAtomValue(fieldAtom);
  const isFieldRequired = useAtomValue(field.required);

  // when data-required, prefer the uiProp
  const required = isFieldRequired && (uiRequired ?? true);

  return useMemo(
    () => ({
      isFieldRequired,
      required,
      "aria-required": required,
    }),
    [required, isFieldRequired]
  );
};

export const useRequiredActions = (fieldAtom: ZodField<any>) => {
  const field = useAtomValue(fieldAtom);
  const setRequired = useSetAtom(field.required);

  return useMemo(
    () => ({
      setRequired,
    }),
    [setRequired]
  );
};
