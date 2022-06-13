import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import { JavaStatusOptions, status } from 'minecraft-server-util';
import { ServerInfo } from './interfaces/serverinfo.interface';

const app: Express = express();

const data_for_status: JavaStatusOptions = {
    timeout: 1000 * 5
}

const serverinfo: ServerInfo = {
    ip: process.env.VISIBLEIP as string | 'localhost',
    port: parseInt(process.env.VISIBLEPORT as string) | 25565
}

app.set('view engine', 'pug');

app.get('/', (req: Request, res: Response) => {
    status(process.env.SERVERIP as string | 'localhost', parseInt(process.env.SERVERPORT as string) | 25565, data_for_status)
        .then((result) => {
            res.render('index', {online: true, ver: result.version.name,
                players: result.players.online,
                maxplayers: result.players.max,
                motd: result.motd.clean,
                playing: result.players.sample,
                serverinfo: serverinfo
            });
        })
        .catch((e) => {
            res.render('index', {online: false});
        })
})

app.use(express.static('public'));

app.listen(process.env.SITEPORT, () => {
    console.log(`Website runs on http://localhost:${process.env.SITEPORT}`);
})