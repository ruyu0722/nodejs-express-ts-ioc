import { Application, Router, Request, Response, NextFunction } from 'express';
import { injectable as Injectable, inject as Inject } from 'inversify';
import { Controller } from './Controller';

import { CheckForAccessTokenMiddleware } from '../middlewares/CheckForAccessTokenMiddleware';
import { PostService } from '../repositories/PostService';
import { Post } from '../models/Posts';

@Injectable()
export class PostsController extends Controller {

	constructor(
		@Inject('CheckForAccessTokenMiddleware') private checkForAccessTokenMiddleware: CheckForAccessTokenMiddleware,
		@Inject('PostService') private postService: PostService
	) {
		super();
	}

	public register(app: Application) {
		let router: Router = Router();
		router.get(
			'/posts',
			this.checkForAccessTokenMiddleware.handle,
			async (req: Request, res: Response, next: NextFunction) => {
				let response = null;
				try {
					response = await this.postService.getPosts();
				} catch (err) {
					// LOG ERROR
				}
				res.json(response);
			}
		);
		router.get(
			'/posts/:id',
			this.checkForAccessTokenMiddleware.handle,
			async (req: Request, res: Response, next: NextFunction) => {
				let response = null;
				try {
					response = await this.postService.getPost(req.params.id);
				} catch (err) {
					// LOG ERROR
				}
				res.json(response);
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