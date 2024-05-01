import { useInputControl } from "@conform-to/react";
import React from "react";

import { Checkbox, type CheckboxProps } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type ListOfErrors = (string | null | undefined)[] | null | undefined;

export function ErrorList({
  id,
  errors,
}: {
  errors?: ListOfErrors;
  id?: string;
}) {
  const errorsToRender = errors?.filter(Boolean);
  if (!errorsToRender?.length) return null;
  return (
    <ul id={id} className="flex flex-col gap-1">
      {errorsToRender.map((e) => (
        <li key={e} className="text-[10px] text-foreground-danger">
          {e}
        </li>
      ))}
    </ul>
  );
}

export function Field({
  labelProps,
  inputProps,
  errors,
  className,
  errorId,
}: {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  errors?: ListOfErrors;
  className?: string;
  errorId?: string;
}) {
  return (
    <div className={className}>
      <Label
        className="block text-sm font-medium text-gray-700"
        htmlFor={inputProps.id}
        {...labelProps}
      />
      <div className="mt-1">
        <Input
          {...inputProps}
          aria-describedby={errorId}
          aria-invalid={errors ? true : undefined}
        />
        {errors ? (
          <div id={errorId} className="pt-1 text-red-700">
            {errors}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function TextareaField({
  labelProps,
  textareaProps,
  errors,
  className,
  errorId,
}: {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  textareaProps: React.InputHTMLAttributes<HTMLTextAreaElement>;
  errors?: ListOfErrors;
  className?: string;
  errorId?: string;
}) {
  return (
    <div className={className}>
      <Label
        className="block text-sm font-medium text-gray-700"
        htmlFor={textareaProps.id}
        {...labelProps}
      />
      <div className="mt-1">
        <Textarea
          {...textareaProps}
          aria-describedby={errorId}
          aria-invalid={errors ? true : undefined}
        />
        {errors ? (
          <div id={errorId} className="pt-1 text-red-700">
            {errors}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function CheckboxField({
  labelProps,
  checkboxProps,
  errors,
  className,
  errorId,
}: {
  labelProps: JSX.IntrinsicElements["label"];
  checkboxProps: CheckboxProps;
  errors?: ListOfErrors;
  className?: string;
  errorId?: string;
}) {
  const control = useInputControl({
    formId: checkboxProps.form!,
    name: checkboxProps.name!,
  });
  return (
    <div className={className}>
      <div className="flex gap-2">
        <Checkbox
          aria-invalid={errorId ? true : undefined}
          aria-describedby={errorId}
          {...checkboxProps}
          onFocus={(event) => {
            control.focus();
            checkboxProps.onFocus?.(event);
          }}
          onBlur={(event) => {
            control.blur();
            checkboxProps.onBlur?.(event);
          }}
          type="button"
        />
        <Label
          htmlFor={checkboxProps.id}
          {...labelProps}
          className="self-center text-body-xs text-muted-foreground"
        />
      </div>
      {errorId ? (
        <div className="px-4 pb-3 pt-1">
          <ErrorList id={errorId} errors={errors} />
        </div>
      ) : null}
    </div>
  );
}
