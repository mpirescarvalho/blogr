import express from 'express'

import PostController from './controller/PostController'
import ViewCounterController from './controller/ViewCounterController'

const postController = new PostController()
const viewCounterController = new ViewCounterController()

const routes = express.Router();

routes.get('/posts', postController.index)
routes.get('/posts/:post_id', postController.show)
routes.get('/posts/:post_id/views', viewCounterController.show)
routes.put('/posts/:post_id/views', viewCounterController.update)

export default routes;
