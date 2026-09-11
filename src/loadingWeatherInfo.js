import { appendLoadingComponent, removeLoading } from "./DomStuff.js";

export function loadingComponent() {
  appendLoadingComponent("#container");
}

export function removeLoadingComponent() {
  removeLoading("#container");
}
