import Express from 'express';

import apiRoutes from "../routes/v1/apiRoutes";
import listEndPoints from '../modules/routeList';
const app = new Express();

apiRoutes(app);
console.table(listEndPoints(app));
