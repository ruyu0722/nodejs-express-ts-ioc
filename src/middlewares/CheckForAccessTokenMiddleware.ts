import { Request, Response, NextFunction } from 'express';
import { injectable as Injectable, inject as Inject } from 'inversify';

@Injectable()
export class CheckForAccessTokenMiddleware {
	public async handle(req: Request, res: Response, next: NextFunction) {
		console.log('Checking...');
		setTimeout(() => {
			console.log('Checking complete!');
			return next();
		}, 1000);
	}
}