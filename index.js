/**
 * Created by Angad on 19 September 2022
 */

const express							=	require('express');
const router							=	express.Router();
const app									=	express();

global.router							=	router;
global.app								=	app;

const config							=	require('config');

require('./middlewares');
require('./modules');
require('./startup').initializeServer();
