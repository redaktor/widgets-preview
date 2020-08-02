import { create, tsx } from '@dojo/framework/core/vdom';
import Example from './Basic';
const factory = create();
export default factory(function Basic() { return <Example variant='filled' /> });
