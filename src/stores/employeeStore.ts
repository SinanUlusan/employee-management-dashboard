interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  employmentDate: string;
  birthDate: string;
}

class EmployeeStore {
  private employees: Employee[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem("employee-store");
      if (stored) {
        this.employees = JSON.parse(stored);
        console.log("Loaded from storage:", this.employees.length);
      }
    } catch (error) {
      console.error("Error loading from storage:", error);
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem("employee-store", JSON.stringify(this.employees));
      console.log("Saved to storage:", this.employees.length);
    } catch (error) {
      console.error("Error saving to storage:", error);
    }
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    console.log("Notifying listeners, count:", this.listeners.size);
    this.listeners.forEach((listener) => listener());
    // Also dispatch custom event for components that use event listeners
    window.dispatchEvent(new CustomEvent("employees-changed"));
  }

  getEmployees(): Employee[] {
    return [...this.employees];
  }

  addEmployee(employee: Omit<Employee, "id">): void {
    const newEmployee: Employee = {
      ...employee,
      id: Date.now().toString(),
    };
    this.employees.push(newEmployee);
    console.log("Employee added:", newEmployee);
    console.log("Total employees:", this.employees.length);

    this.saveToStorage();
    this.notify();
  }

  updateEmployee(employee: Employee): void {
    const index = this.employees.findIndex((emp) => emp.id === employee.id);
    if (index !== -1) {
      this.employees[index] = employee;
      this.saveToStorage();
      this.notify();
    }
  }

  deleteEmployee(id: string): void {
    this.employees = this.employees.filter((emp) => emp.id !== id);
    this.saveToStorage();
    this.notify();
  }
}

// Create singleton instance
const employeeStore = new EmployeeStore();

// Export store methods
export const getEmployees = async (): Promise<Employee[]> => {
  return employeeStore.getEmployees();
};

export const addEmployee = (employee: Omit<Employee, "id">): void => {
  employeeStore.addEmployee(employee);
};

export const updateEmployee = (employee: Employee): void => {
  employeeStore.updateEmployee(employee);
};

export const deleteEmployee = (id: string): void => {
  employeeStore.deleteEmployee(id);
};

// Export store for components that need to subscribe to changes
export const subscribeToEmployeeStore = (
  listener: () => void
): (() => void) => {
  return employeeStore.subscribe(listener);
};
