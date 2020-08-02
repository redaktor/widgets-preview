import parade from '@dojo/parade';
import config from './config';

parade({ config });

/* TODO FIXME ; */
setTimeout(() => {
  let mdContainer = (document.querySelector('.markdown') as any);
  if (mdContainer) {
    mdContainer.ondblclick = () => {
  		mdContainer.classList.toggle("markdownFullscreen");
  	}
  }
}, 2000)
