import { Application, Router, Request, Response, NextFunction } from 'express';
import { injectable as Injectable, inject as Inject } from 'inversify';
import { RegistrableController } from '../structures/RegistrableController';

@Injectable()
export class HomeController implements RegistrableController {

	private router: Router;

	constructor() {
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