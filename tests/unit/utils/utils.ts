/**
 * Utils for testing
 */

export const waitNT = (ctx): Promise<{}> => new Promise(resolve => ctx.$nextTick(resolve));
export const waitRAF = (): Promise<{}> => new Promise(resolve => requestAnimationFrame(resolve));
