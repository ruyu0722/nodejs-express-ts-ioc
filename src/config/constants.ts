import * as dotenv from 'dotenv';

dotenv.config();

export const Constants = {
	SERVER_API: process.env.SERVER_API || 'https://jsonplaceholder.typicode.com/'
};