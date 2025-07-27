export const EMPLOYEE_VIEW_TYPE = {
  TABLE: "table",
  LIST: "list",
} as const;

export type EmployeeViewType =
  (typeof EMPLOYEE_VIEW_TYPE)[keyof typeof EMPLOYEE_VIEW_TYPE];
