/*
import { _ } from '../util/string';

const o = 'World';
const tpl = _`Hello ${o}
  I am multiline
  and so`;

console.log(tpl);
*/
import Auth from '.';
var auth = new Auth({ debug: true });

auth.get({url: 'https://indieweb.org/Events', responseType: 'mf'}).then((res: any) => {
  console.log(JSON.stringify(res.data))
});
/*
var j = schedule.scheduleJob({hour: 14, minute: 30, dayOfWeek: 0}, function(){
  console.log('Time for tea!');
});
*/
