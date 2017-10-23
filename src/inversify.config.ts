import { Container as C } from 'inversify';
import { Types } from './config/types';
import { RegistrableController } from './structures/RegistrableController';

/**
 * ===========================================
 * Controllers
 * ===========================================
 */
import { HomeController } from './controllers/HomeController';
import { PostsController } from './controllers/PostsController';

/**
 * ===========================================
 * Middlewares
 * ===========================================
 */
import { CheckForAccessTokenMiddleware } from './middlewares/CheckForAccessTokenMiddleware';

/**
 * ===========================================
 * Services
 * ===========================================
 */
import { PostService } from './repositories/PostService';


/**
 * ===========================================
 * Controllers List
 * ===========================================
 */
const controllers = [
	HomeController,
	PostsController
];

/**
 * ===========================================
 * Middlewares List
 * ===========================================
 */
const middlewares = [
	CheckForAccessTokenMiddleware
];

/**
 * ===========================================
 * Services List
 * ===========================================
 */
const services = [
	PostService
];

const c = new C();
controllers.forEach(controller => c.bind<RegistrableController>(Types.controller).to(controller));
middlewares.forEach(middleware => c.bind(Types.middleware).to(middleware));
services.forEach(service => c.bind(Types.service).to(service));

export const Container = c;