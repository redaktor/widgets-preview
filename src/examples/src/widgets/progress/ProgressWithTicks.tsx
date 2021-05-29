import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Progress from '@redaktor/widgets/progress';
const factory = create();

export default factory(function Basic() {
	return <Example spaced={true}><div>
		<p>vertical</p>
		<div style="display:flex; justify-content:space-around;">
			<Progress variant="flat" value={50} step={10} vertical outputDisplay="left" outputAlign="center" markType="tickmark" />
			<Progress variant="filled" value={50} step={10} marks={[10,15,50,75]} vertical={20} outputDisplay={'right'} markType="tickmark" />
			<Progress variant="raised" value={50} marks={{20: '20%', 25: '25%', 50: '50%', 75: '75%'}} vertical={20} outputDisplay={'bottom'} markType="tickmark" />
			<Progress variant="outlined" value={50} marks={{10: 'Cool', 15: 'Even better', 50: 'Yay', 75: 'Hooray', 90: 'Finish'}} vertical={20} outputDisplay={'top'} markType="tickmark" />
			<Progress variant="shaped" value={50} marks={{10: 'Cool', 25: 'Even better', 50: 'Yay', 75: 'Hooray', 90: 'Finish'}} vertical={20} outputDisplay={'tooltip'} markType="tickmark" />
		</div>
		<br />
		<p>horizontal (default)</p>
		<div>
			<Progress variant="flat" value={50} step={10} outputDisplay={'tooltip'} markType="tickmark" />
			<Progress variant="filled" value={50} marks={[10,15,50,75]} outputDisplay={'tooltip'} markType="tickmark" />
			<Progress variant="raised" value={50} marks={{20: '20%', 25: '25%', 50: '50%', 75: '75%'}} outputDisplay={'tooltip'} markType="tickmark" />
			<Progress variant="outlined" value={50} marks={{10: 'Cool', 15: 'Even better', 50: 'Yay', 75: 'Hooray', 90: 'Finish'}} outputDisplay={'tooltip'} markType="tickmark" />
			<p>Check</p>
			<Progress variant="shaped" value={50} marks={{10: 'Cool', 25: 'Even better', 50: 'Yay', 75: 'Hooray', 90: 'Finish'}} outputDisplay={'tooltip'} markType="tickmark" />
		</div>
		<p>Check</p>
	</div></Example>;
});
