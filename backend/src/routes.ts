import express from 'express'

import PostController from './controller/PostController'

const postController = new PostController()

const routes = express.Router();

routes.get('/posts', postController.index)
routes.get('/posts/:post_id', postController.show)

export default routes;
