import { Application, Router, Request, Response, NextFunction } from 'express';
import { injectable as Injectable, inject as Inject } from 'inversify';
import { Controller } from './Controller';
import { Types } from '../config/types';

@Injectable()
export class HomeController extends Controller {

	constructor() {
		super();
	}

	public register(app: Application) {
		let router: Router = Router();
		router.get(
			'/',
			async (req: Request, res: Response, next: NextFunction) => {
				res.render('home', {
					title: 'Welcome to ExpressJs Enterprise',
					name: 'John Smith'
				});
			}
		);

		/**
		 * ===========================================
		 * Expose Routes
		 * ===========================================
		 */
		app.use(router);
	}
}