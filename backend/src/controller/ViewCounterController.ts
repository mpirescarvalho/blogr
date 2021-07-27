import { Request, Response } from 'express'
import PostView from '../database/schemas/PostView'

export default class ViewCounterController {
  async show(req: Request, res: Response) {
    try {
      const { post_id } = req.params;

      if (!post_id) {
        return res.status(400).json({
          error: 'bad request'
        })
      }

      const viewCount = await PostView.countDocuments({
        post_slug: post_id
      });

      return res.status(200).json({
        count: viewCount || 0
      })
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'internal server error'
      })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { post_id } = req.params;

      if (!post_id) {
        return res.status(400).json({
          error: 'bad request'
        })
      }

      PostView.create({
        post_slug: post_id
      })

      return res.status(200).json({
        ok: true
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'internal server error'
      })
    }
  }
}
