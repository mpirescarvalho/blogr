import Link from 'next/link';
import styles from '../styles/PostList.module.scss';

type Post = {
	slug: string;
	title: string;
	excerpt: string;
	updatedAt: string;
	viewCount: number;
};

interface PostListProps {
	posts: Post[];
}

export function PostList({ posts }: PostListProps) {
	return (
		<div className={`container ${styles.container}`}>
			{posts.map((post) => (
				<Link key={post.slug} href={`/posts/${post.slug}`}>
					<a className="card border-0 text-light py-3 mt-4 bg-transparent">
						<h2>
							<strong>{post.title}</strong>
						</h2>
						<p>{post.excerpt}</p>

						<footer className="mt-2 d-flex">
							<span className="d-flex align-items-center">
								<img
									src="/images/calendar.svg"
									alt="Data da postagem"
									className="mr-2"
								/>
								{post.updatedAt}
							</span>

							<span className="ml-3 d-flex align-items-center">
								<img src="/images/user.svg" alt="Visualizações" className="mr-2" />
								{post.viewCount} visualizações
							</span>
						</footer>
					</a>
				</Link>
			))}
		</div>
	);
}
