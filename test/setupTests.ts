import '@testing-library/jest-dom';

// jsdom doesn't implement URL.createObjectURL; polyfill for tests
if (typeof globalThis.URL === 'undefined') {
	// @ts-ignore
	globalThis.URL = {};
}
// @ts-ignore
globalThis.URL.createObjectURL = (blob: any) => {
	return 'blob:fake';
};
// @ts-ignore
globalThis.URL.revokeObjectURL = (_: any) => {};
