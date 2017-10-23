import { Application, Router, Request, Response, NextFunction } from 'express';
import { injectable as Injectable, inject as Inject } from 'inversify';
import { Types } from '../config/types';
import { Controller } from './controller';
import { RegistrableController } from '../structures/RegistrableController';

import { CheckForAccessTokenMiddleware } from '../middlewares/CheckForAccessTokenMiddleware';
import { PostService } from '../repositories/PostService';

import { Post } from '../models/Posts';

@Injectable()
export class PostsController extends Controller implements RegistrableController {

	private router: Router;
	private checkForAccessTokenMiddleware: CheckForAccessTokenMiddleware;

	private postService: PostService;

	constructor(
		@Inject(Types.middleware) checkForAccessTokenMiddleware: CheckForAccessTokenMiddleware,
		@Inject(Types.service) postService: PostService
	) {
		super();
		this.router = Router();
		this.checkForAccessTokenMiddleware = checkForAccessTokenMiddleware;
		this.postService = postService;
	}

	public register(app: Application) {
		this.router.get(
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
		this.router.get(
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
		app.use(this.router);
	}
}