import { Service } from './Service';
import { injectable as Injectable, inject as Inject } from 'inversify';

import { Post } from '../models/Posts';

@Injectable()
export class PostService extends Service {

	constructor() {
		super();
	}

	public getPosts() {
		return this.http.get(`posts`)
			.then((response) => <Post[]>response.data)
			.catch((err) => err.status);
	}

	public getPost(id) {
		return this.http.get(`posts/${id}`)
			.then((response) => <Post>response.data)
			.catch((err) => err.status);
	}
}