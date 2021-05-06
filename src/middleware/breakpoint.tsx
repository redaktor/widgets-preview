import { createBreakpointMiddleware } from '@dojo/framework/core/middleware/breakpoint';
const apBreakpoints = createBreakpointMiddleware({
	micro: 1,
	xs:240,
	s: 320,
	m: 480,
	l: 640,
	xl: 800,
	xxl:1920,
	k4: 4096
});
export default apBreakpoints;
