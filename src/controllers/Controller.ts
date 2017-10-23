import { injectable as Injectable, inject as Inject } from 'inversify';
import { Application, Router, Request, Response, NextFunction } from 'express';
import { RegistrableController } from '../structures/RegistrableController';

@Injectable()
export class Controller implements RegistrableController {

	constructor() { }

	public register(app: Application) { }
}