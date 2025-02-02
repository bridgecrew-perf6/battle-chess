import { Server } from '@logux/server';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { UserModel } from './state.mjs';
import foyerChannel from './channels/foyer.mjs';
import gameChannel from './channels/game.mjs';

// Since we are in ESM scope, we don't have __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// eslint-disable-next-line no-undef
const env = process.env.NODE_ENV || 'development';
const server = new Server(
  // eslint-disable-next-line no-undef
  Server.loadOptions(process, {
    subprotocol: '1.0.0',
    supports: '1.x',
    host: '0.0.0.0',
    root: __dirname,
  })
);

server.auth(async ({ userId }) => {
  const user = await UserModel.findByPk(userId);
  if (!user) {
    await UserModel.create({ id: userId });
  }
  // Allow only local users until we will have a proper authentication
  return env === 'development';
});

foyerChannel(server);
gameChannel(server);

server.listen();
