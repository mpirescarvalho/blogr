import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { api } from '../../services/api';

import styles from '../../styles/Post.module.scss';

type Post = {
	slug: string;
	title: string;
	content: string;
	updatedAt: string;
};

interface PostProps {
	post: Post;
}

export default function Post({ post }: PostProps) {
	const [viewCount, setViewCount] = useState<number>(undefined);

	useEffect(() => {
		async function handleViewCount() {
			if (typeof window !== 'undefined') {
				await api.put(`/posts/${post.slug}/views`);

				const response = await api.get(`/posts/${post.slug}/views`);
				setViewCount(response.data.count);
			}
		}
		handleViewCount();
	}, [post]);

	return (
		<>
			<Header showSearch={false} />

			<main className="container text-light">
				<article>
					<header className="mt-3">
						<h1>
							<strong>{post.title}</strong>
						</h1>

						<div className="mt-2 d-flex">
							<span className="d-flex align-items-center">
								<img
									src="/images/calendar.svg"
									alt="Data da postagem"
									className="mr-2"
								/>
								{post.updatedAt}
							</span>

							{typeof viewCount !== 'undefined' && (
								<span className="ml-3 d-flex align-items-center">
									<img src="/images/user.svg" alt="Visualizações" className="mr-2" />
									{viewCount} visualizações
								</span>
							)}
						</div>
					</header>

					<div
						className={`mt-5 ${styles.postContainer}`}
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>
				</article>
			</main>
		</>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	const { slug } = ctx.params;

	const response = await api.get(`/posts/${slug}?html=true`);
	const post = response.data;

	return {
		props: {
			post,
		},
		revalidate: 60 * 60 * 24, // 24 hours
	};
};
