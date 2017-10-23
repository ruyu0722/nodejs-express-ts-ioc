import { injectable as Injectable, inject as Inject } from 'inversify';
import { Constants } from '../config/constants';
import axios from 'axios';

@Injectable()
export class Service {

	protected http;

	constructor() {
		this.http = axios.create({
			baseURL: Constants.SERVER_API
		});
	}

}