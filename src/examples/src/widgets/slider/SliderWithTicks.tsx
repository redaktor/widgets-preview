import { create, tsx } from '@dojo/framework/core/vdom';
import Example from '../../Example';
import Slider from '@dojo/widgets/slider';

const factory = create({});

export default factory(function Basic({}) {
	return <Example spaced={true}><div>
		<div style="display:flex; justify-content:space-around;">
			<Slider variant="flat" initialValue={0} min={0} max={100} step={10} vertical outputDisplay="left" outputAlign="center" markType="tickmark" />
			<Slider variant="filled" initialValue={50} min={0} max={100} step={10} marks={[10,15,50,75]} vertical={20} outputDisplay={'right'} markType="tickmark"  />
			<Slider variant="raised" initialValue={50} min={0} max={100} marks={{20: '20%', 25: '25%', 50: '50%', 75: '75%'}} vertical={20} outputDisplay={'bottom'} markType="tickmark" />
			<Slider variant="outlined" initialValue={50} min={0} max={100} marks={{10: 'Cool', 15: 'Even better', 50: 'Yay', 75: 'Hooray', 90: 'Finish'}} vertical={20} outputDisplay={'top'} markType="tickmark" />
			<Slider variant="shaped" initialValue={50} min={0} max={100} marks={{10: 'Cool', 25: 'Even better', 50: 'Yay', 75: 'Hooray', 90: 'Finish'}} vertical={20} outputDisplay={'tooltip'} markType="tickmark" />
		</div>
		<br />
		<div>
			<p>horizontal (default)</p>
			<Slider color="secondary" variant="flat" initialValue={50} min={0} max={100} step={10} outputDisplay={'left'} markType="tickmark" />
			<Slider color="secondary" variant="filled" initialValue={50} min={0} max={100} marks={[10,15,50,75]} outputDisplay={'right'} markType="tickmark" />
			<Slider color="secondary" variant="raised" initialValue={50} min={0} max={100} marks={{20: '20%', 25: '25%', 50: '50%', 75: '75%'}} outputDisplay={'top'} markType="tickmark" />
			<Slider color="secondary" variant="outlined" initialValue={50} min={0} max={100} marks={{10: 'Cool', 15: 'Even better', 50: 'Yay', 75: 'Hooray', 90: 'Finish'}} outputDisplay={'bottom'} markType="tickmark" />
			<p>Check</p>
			<Slider color="secondary" variant="shaped" initialValue={50} min={0} max={100} marks={{10: 'Cool', 25: 'Even better', 50: 'Yay', 75: 'Hooray', 90: 'Finish'}} outputDisplay={'tooltip'} markType="tickmark" />
		</div>
		<p>Check</p>
</div></Example>;
});
