import { Request, Response } from 'express'
import { getPrismicClient } from "../services/prismic";
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

export default class PostController {
  async index(req: Request, res: Response) {
    try {
      const prismic = getPrismicClient(req);

      const response = await prismic.query(
        [Prismic.predicates.at('document.type', 'post')],
        {
          fetch: ['post.title', 'post.content'],
          pageSize: 100,
        }
      );
    
      const posts = response.results.map((post) => ({
        slug: post.uid,
        title: RichText.asText(post.data.title),
        excerpt:
          post.data.content.find((content) => content.type === 'paragraph')?.text ??
          '',
        updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
      }));

      return res.json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'internal server error'
      })
    }
  }

  async show() {

  }
}
