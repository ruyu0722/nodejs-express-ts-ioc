import { Application, Router, Request, Response, NextFunction } from 'express';
import { injectable as Injectable, inject as Inject } from 'inversify';
import { Controller } from './Controller';
import { Types } from '../config/types';

import { CheckForAccessTokenMiddleware } from '../middlewares/CheckForAccessTokenMiddleware';
import { PostService } from '../repositories/PostService';

import { Post } from '../models/Posts';

@Injectable()
export class PostsController extends Controller {

	constructor(
		@Inject(Types.middleware) private checkForAccessTokenMiddleware: CheckForAccessTokenMiddleware,
		@Inject(Types.service) private postService: PostService
	) {
		super();
		this.checkForAccessTokenMiddleware = checkForAccessTokenMiddleware;
		this.postService = postService;
	}

	public register(app: Application) {
		let router: Router = Router();
		router.get(
			'/posts',
			this.checkForAccessTokenMiddleware.handle,
			async (req: Request, res: Response, next: NextFunction) => {
				let response: Post[] = null;
				try {
					response = await this.postService.getPosts();
				} catch (err) {

				}
				res.json(response);
			}
		);
		router.get(
			'/posts/:id',
			this.checkForAccessTokenMiddleware.handle,
			async (req: Request, res: Response, next: NextFunction) => {
				let response: Post = null;
				try {
					response = await this.postService.getPost(req.params.id);
				} catch (err) {

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