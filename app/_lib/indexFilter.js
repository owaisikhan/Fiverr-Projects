"use client";

/**
 * The work index's category filter, as a tiny external store, so a link in
 * another section (Services) can set it and the index re-renders through
 * `useSyncExternalStore` rather than through prop drilling or context.
 */
let current = "all";
const listeners = new Set();

export function setIndexFilter(value) {
  current = value;
  listeners.forEach((listener) => listener());
}

export function subscribeIndexFilter(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getIndexFilter() {
  return current;
}

export function getServerIndexFilter() {
  return "all";
}
