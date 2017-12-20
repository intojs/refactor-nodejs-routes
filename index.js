import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import {gistsRoute} from './gists.route.2';

const app = express();
const port = process.env.PORT || 3000;
const jsonParser = bodyParser.json();

app.use(cors());
app.use('/api/v1/gists', jsonParser, gistsRoute);

app.use((error, req, res, next) => {
    console.error('handled error', error.stack);
    return res
        .status(500)
        .send(error.message);
});

process
    .on('unhandledRejection', (error) => {
        console.error(`unhandledRejection ${error.stack}`);
        process.exit(1);
    })
    .on('uncaughtException', (error) => {
        console.error(`uncaughtException ${error.stack}`);
        process.exit(1);
    });

app.listen(port, () => {
    console.info('Example app listening on port ' + port);
});
