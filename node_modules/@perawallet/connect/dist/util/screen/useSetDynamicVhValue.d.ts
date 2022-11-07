/**
 * Creates a css variable `--vh` that is the calculated viewport height,
 * and updates it on window resize. This `--vh` value can be used instead of
 * default `vh` value to prevent layout issues on mobile devices
 * See: https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
 */
declare function useSetDynamicVhValue(): void;
export default useSetDynamicVhValue;
