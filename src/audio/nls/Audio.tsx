/* https://github.com/discourse/discourse/blob/master/config/locales/client.de.yml
notification_schedule
time_shortcut
auto_update_input
*/
const locales = {
	de: () => import('./de/Audio')
};
const messages = {
	play: 'Play',
	pause: 'Pause',
	mute: 'Mute sound',
	unmute: 'Unmute sound',
	speed: 'Change playback rate',
	quality: 'Change playback quality',
	download: 'Download file',
	captionsTrack: 'Captions',
	subtitlesTrack: 'Subtitles',
	descriptionsTrack: 'Descriptions',
	descriptionsAbbrev: 'Desc',
	chaptersTrack: 'Chapters'
};

export default { locales, messages };
