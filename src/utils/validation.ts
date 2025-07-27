import { z } from "zod";
import { translate } from "./i18n.ts";
import { getEmployees } from "../stores/employeeStore.ts";

interface EmployeeForm {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  employmentDate: string;
  birthDate: string;
}

interface ValidationResult {
  success: boolean;
  errors: Record<string, string>;
}

const createErrorMessage = (key: string): string => translate(key);

const turkishLettersRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^[0-9+\-\s()]+$/;

export const employeeSchema = z.object({
  id: z.string().optional(),
  firstName: z
    .string()
    .min(1, createErrorMessage("required"))
    .regex(turkishLettersRegex, createErrorMessage("onlyLetters")),
  lastName: z
    .string()
    .min(1, createErrorMessage("required"))
    .regex(turkishLettersRegex, createErrorMessage("onlyLetters")),
  email: z
    .string()
    .min(1, createErrorMessage("required"))
    .regex(emailRegex, createErrorMessage("invalidEmail")),
  phone: z
    .string()
    .min(1, createErrorMessage("required"))
    .regex(phoneRegex, createErrorMessage("onlyNumbers"))
    .refine(
      (phone) => phone.replace(/[^0-9]/g, "").length >= 10,
      createErrorMessage("invalidPhone")
    ),
  department: z.string().min(1, createErrorMessage("required")),
  position: z.string().min(1, createErrorMessage("required")),
  employmentDate: z.string().min(1, createErrorMessage("required")),
  birthDate: z
    .string()
    .min(1, createErrorMessage("required"))
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();

      // Calculate age accurately
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      // Adjust age if birthday hasn't occurred this year
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age >= 18;
    }, createErrorMessage("invalidBirthDate")),
});

export const validateEmployee = async (
  data: EmployeeForm
): Promise<ValidationResult> => {
  try {
    const result = employeeSchema.safeParse(data);

    if (!result.success) {
      const errors: Record<string, string> = {};

      if (result.error.issues) {
        result.error.issues.forEach((error) => {
          const field = error.path[0] as string;
          errors[field] = error.message;
        });
      }

      // Cross-field validation
      const employees = await getEmployees();
      const existingEmployee = employees.find(
        (emp) => emp.email === data.email && emp.id !== data.id
      );

      if (existingEmployee) {
        errors.email = translate("emailAlreadyExists");
      }

      // Employment date vs birth date validation
      if (data.employmentDate && data.birthDate) {
        const employmentDate = new Date(data.employmentDate);
        const birthDate = new Date(data.birthDate);

        if (employmentDate <= birthDate) {
          errors.employmentDate = translate("employmentDateAfterBirth");
        }
      }

      return { success: false, errors };
    }

    return { success: true, errors: {} };
  } catch (error) {
    console.error("Validation error:", error);
    return {
      success: false,
      errors: { general: translate("validationError") },
    };
  }
};

export const validators = {
  firstName: (value: string): string | null => {
    if (!value) return translate("required");
    if (!turkishLettersRegex.test(value)) return translate("onlyLetters");
    return null;
  },
  lastName: (value: string): string | null => {
    if (!value) return translate("required");
    if (!turkishLettersRegex.test(value)) return translate("onlyLetters");
    return null;
  },
  email: (value: string): string | null => {
    if (!value) return translate("required");
    if (!emailRegex.test(value)) return translate("invalidEmail");
    return null;
  },
  phone: (value: string): string | null => {
    if (!value) return translate("required");
    if (!phoneRegex.test(value)) return translate("onlyNumbers");
    if (value.replace(/[^0-9]/g, "").length < 10)
      return translate("invalidPhone");
    return null;
  },
  department: (value: string): string | null => {
    if (!value) return translate("required");
    return null;
  },
  position: (value: string): string | null => {
    if (!value) return translate("required");
    return null;
  },
  employmentDate: (value: string): string | null => {
    if (!value) return translate("required");
    return null;
  },
  birthDate: (value: string): string | null => {
    if (!value) return translate("required");
    const birthDate = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      if (age - 1 < 18) return translate("invalidBirthDate");
    } else {
      if (age < 18) return translate("invalidBirthDate");
    }
    return null;
  },
};

export const validateField = (
  fieldName: string,
  value: string
): string | null => {
  const validator = validators[fieldName as keyof typeof validators];
  if (validator) {
    return validator(value);
  }
  return null;
};
