import { Application, Router, Request, Response, NextFunction } from 'express';
import { injectable as Injectable, inject as Inject } from 'inversify';
import { Controller } from './controller';

@Injectable()
export class HomeController extends Controller {

	private router: Router;

	constructor() {
		super();
		this.router = Router();
	}

	public register(app: Application) {
		this.router.get(
			'/',
			async (req: Request, res: Response, next: NextFunction) => {
				res.render('home', {
					title: 'Welcome to ExpressJs Enterprise',
					name: 'John Smith'
				});
			});

		/**
		 * ===========================================
		 * Expose Routes
		 * ===========================================
		 */
		app.use(this.router);
	}
}