import * as express from 'express';
import * as path from 'path';
import router from './router';
import { render } from '../../Template';
const basePath: string = '../../../';
var app = express();
/* Rendering : */
app.engine('html', render);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, basePath+'views/IndieAuth'));
/* Static Directories : */
app.use(express.static(path.resolve(__dirname, basePath)));
app.use(express.static(path.resolve(__dirname, basePath+'assets')));
app.use(express.static(path.resolve(__dirname, basePath+'node_modules')));
/* Router for IndieAuth : */
app.use(router);

app.listen(5000);
