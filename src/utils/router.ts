import { Router } from "@vaadin/router";

interface RouterLocation {
  pathname: string;
  params: Record<string, string>;
}

interface RouterServiceInterface {
  router: Router | null;
  isInitialized: boolean;
  init(outlet: Element): void;
  navigateTo(path: string): void;
  navigateToHome(): void;
  navigateToNew(): void;
  navigateToEdit(id: string): void;
  getCurrentRoute(): RouterLocation | null;
  getRouteParams(): Record<string, string>;
  getCurrentPath(): string;
  isCurrentRoute(path: string): boolean;
  goBack(): void;
}

class RouterService implements RouterServiceInterface {
  public router: Router | null = null;
  public isInitialized = false;

  init(outlet: Element): void {
    if (this.isInitialized) return;

    this.router = new Router(outlet);
    this.router.setRoutes([
      { path: "/", component: "directory-page" },
      { path: "/new", component: "editor-page" },
      { path: "/edit/:id", component: "editor-page" },
    ]);

    this.isInitialized = true;
  }

  // Safe navigation methods
  navigateTo(path: string): void {
    if (!this.router) {
      console.warn("Router not initialized");
      return;
    }

    try {
      this.router.urlForPath(path);
      window.location.href = path;
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback to window.location if router fails
      window.location.href = path;
    }
  }

  navigateToHome(): void {
    this.navigateTo("/");
  }

  navigateToNew(): void {
    this.navigateTo("/new");
  }

  navigateToEdit(id: string): void {
    if (!id) {
      console.error("Employee ID is required for edit navigation");
      return;
    }
    this.navigateTo(`/edit/${id}`);
  }

  // Get current route parameters
  getCurrentRoute(): RouterLocation | null {
    if (!this.router) return null;
    return this.router.location as RouterLocation;
  }

  // Get route parameters
  getRouteParams(): Record<string, string> {
    if (!this.router) return {};
    return (this.router.location as RouterLocation)?.params || {};
  }

  // Get current path
  getCurrentPath(): string {
    if (!this.router) return window.location.pathname;
    const location = this.router.location as RouterLocation;
    return location?.pathname || window.location.pathname;
  }

  // Check if current route matches
  isCurrentRoute(path: string): boolean {
    const currentPath = this.getCurrentPath();
    console.log(`Checking route: ${path} vs current: ${currentPath}`);
    return currentPath === path;
  }

  // Go back
  goBack(): void {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.navigateToHome();
    }
  }
}

// Export singleton instance
export const routerService = new RouterService();

// Export convenience functions
export const navigateTo = (path: string): void =>
  routerService.navigateTo(path);
export const navigateToHome = (): void => routerService.navigateToHome();
export const navigateToNew = (): void => routerService.navigateToNew();
export const navigateToEdit = (id: string): void =>
  routerService.navigateToEdit(id);
export const goBack = (): void => routerService.goBack();
export const getCurrentRoute = (): RouterLocation | null =>
  routerService.getCurrentRoute();
export const getRouteParams = (): Record<string, string> =>
  routerService.getRouteParams();
export const getCurrentPath = (): string => routerService.getCurrentPath();
export const isCurrentRoute = (path: string): boolean =>
  routerService.isCurrentRoute(path);
