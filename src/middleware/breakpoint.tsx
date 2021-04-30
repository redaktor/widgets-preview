import { createBreakpointMiddleware } from '@dojo/framework/core/middleware/breakpoint';
const apBreakpoints = createBreakpointMiddleware({
	micro: 1,
	xs:320,
	s: 480,
	m: 640,
	l: 800,
	xl:1980
});
export default apBreakpoints;
