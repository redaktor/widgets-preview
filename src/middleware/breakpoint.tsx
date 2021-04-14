import { createBreakpointMiddleware } from '@dojo/framework/core/middleware/breakpoint';
const apBreakpoints = createBreakpointMiddleware({
	_xs:240,
	_s: 300,
	_m: 640,
	_l: 800,
	_xl:1980
});
export default apBreakpoints;
