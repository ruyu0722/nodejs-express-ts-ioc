import * as express from 'express';
import * as session from 'express-session';
import * as flash from "express-flash";
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as path from 'path';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as passport from 'passport';
import 'reflect-metadata';

dotenv.config();

import { Types } from './config/types';
import { RegistrableController } from './structures/RegistrableController';
import { Container } from './inversify.config';

class Server {
	private static instance: Server;
	private app: express.Application;

	private constructor() {
		this.app = express();
		this.config();
		this.routes();
	}

	private config() {
		this.app.set('views', path.join(__dirname, '../views'));
		this.app.set('view engine', 'pug');
		this.app.use(express.static(path.join(__dirname, 'public')));
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(session({
			resave: false,
			saveUninitialized: true,
			secret: 'tsc-ioc',
			cookie: { httpOnly: true, maxAge: 2419200000 }
		}));
		this.app.use(passport.initialize());
		this.app.use(passport.session());
		this.app.use(flash());
		this.app.use(helmet());
		this.app.use(compression());
		this.app.use(logger('dev'));
	}

	private routes() {
		// const controllers: RegistrableController[] = Container.getAll<RegistrableController>(Types.controller);
		// controllers.forEach(controller => controller.register(this.app));
		Container.getAll<RegistrableController>(Types.controller).forEach(controller => controller.register(this.app));
		this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
			res.status(404).send('Sorry, can\'t find that!');
		});
	}

	public static getInstance(): express.Application {
		if (this.instance) {
			return this.instance.app;
		}
		this.instance = new Server();
		return this.instance.app;
	}
}

export default Server.getInstance();