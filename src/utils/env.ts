/**
 * Utilities to get information about the current environment
 */

// --- Constants ---
declare global {
  interface Window {
    WebKitMutationObserver: any;
    MozMutationObserver: any;
    PointerEvent: any;
    MSPointerEvent: any;
    IntersectionObserverEntry: () => void;
  }
}

export const hasWindowSupport = typeof window !== 'undefined'
export const hasDocumentSupport = typeof document !== 'undefined'
export const hasNavigatorSupport = typeof navigator !== 'undefined'
export const hasPromiseSupport = typeof Promise !== 'undefined'
export const hasMutationObserverSupport =
  typeof MutationObserver !== 'undefined' ||
  typeof window.WebKitMutationObserver !== 'undefined' ||
  typeof window.MozMutationObserver !== 'undefined'

export const isBrowser = hasWindowSupport && hasDocumentSupport && hasNavigatorSupport
// Determine if the browser supports the option passive for events
export const hasPassiveEventSupport = (() => {
  let passiveEventSupported = false
  if (isBrowser) {
    try {
      const options: any = {
        get passive(): void {
          // This function will be called when the browser
          // attempts to access the passive property.
          /* istanbul ignore next: will never be called in JSDOM */
          passiveEventSupported = true;
          return;
        }
      };
      window.addEventListener('test', options, options)
      window.removeEventListener('test', options, options)
    } catch (err) {
      /* istanbul ignore next: will never be called in JSDOM */
      passiveEventSupported = false
    }
  }
  return passiveEventSupported
})();

export const hasTouchSupport =
  isBrowser && ('ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0)

export const hasPointerEventSupport =
  isBrowser && Boolean(window.PointerEvent || window.MSPointerEvent)

// --- Getters ---

// export const getEnv = (key: string | number, fallback = null) => {
//   const env = typeof process !== 'undefined' && process ? process.env || {} : {}
//   if (!key) {
//     /* istanbul ignore next */
//     return env
//   }
//   return env[key] || fallback
// }
