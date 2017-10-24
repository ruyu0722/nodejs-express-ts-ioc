import { Container as C } from 'inversify';
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
	{ class: CheckForAccessTokenMiddleware, name: 'CheckForAccessTokenMiddleware' }
];

/**
 * ===========================================
 * Services List
 * ===========================================
 */
const services = [
	{ class: PostService, name: 'PostService' }
];

const c = new C();
controllers.forEach(controller => c.bind<RegistrableController>('Controller').to(controller));
middlewares.forEach(middleware => c.bind(middleware.name).to(middleware.class));
services.forEach(service => c.bind(service.name).to(service.class));

export const Container = c;