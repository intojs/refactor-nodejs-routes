import express from 'express';

import {handleGistsRoute} from "./handle-gists.4";

const gistsUrl = 'https://api.github.com/users/intojs/gists?per_page=2&page=1';

export const gistsRoute = express
  .Router()
  .get('/', handleGistsRoute(gistsUrl));
