import { translate } from "./i18n.ts";

interface TemplateValues {
  [key: string]: string | number;
}

type TranslateFunction = (key: string) => string;

export const interpolate = (
  template: string,
  values: TemplateValues = {}
): string => {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return values[key]?.toString() || match;
  });
};

export const createTemplate = (
  template: string
): ((values?: TemplateValues) => string) => {
  return (values: TemplateValues = {}) => interpolate(template, values);
};

export const templates = {
  employeeName: createTemplate("{firstName} {lastName}"),
  deleteConfirm: createTemplate(
    "Are you sure you want to delete {firstName} {lastName}?"
  ),
  editConfirm: createTemplate(
    "Are you sure you want to save changes for {firstName} {lastName}?"
  ),
  bulkDeleteConfirm: createTemplate(
    "Are you sure you want to delete {count} selected employees?"
  ),
  confirm: createTemplate("{message}"),
  error: createTemplate("Error: {message}"),
  success: createTemplate("Success: {message}"),
};

export function getPromptDescription(
  key: string,
  params: Record<string, string>,
  translateFn: (key: string) => string
): string {
  let description = translateFn(key);

  Object.entries(params).forEach(([param, value]) => {
    description = description.replace(`{${param}}`, value);
  });

  return description;
}

export function capitalizeFirst(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
