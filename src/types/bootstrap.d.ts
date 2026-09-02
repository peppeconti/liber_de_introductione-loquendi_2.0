// Minimal ambient typing for the global `bootstrap` object exposed by
// node_modules/bootstrap/dist/js/bootstrap.bundle.min.js. That script is
// loaded directly via angular.json (not imported as an ES module), so
// TypeScript has no types for it unless we declare them ourselves here.
// This file has no imports/exports, so these declarations are global --
// available in any .ts file under src/ without an import.

interface BootstrapComponentInstance {
  show: () => void;
  hide: () => void;
  dispose: () => void;
}

interface BootstrapCarouselSlideEvent {
  direction: "left" | "right";
  relatedTarget: HTMLElement;
  from: number;
  to: number;
}

declare const bootstrap: {
  Modal: new (selector: string) => BootstrapComponentInstance;
  Offcanvas: new (selector: string) => BootstrapComponentInstance;
};
