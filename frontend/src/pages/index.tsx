import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { PostList } from '../components/PostList';
import { api } from '../services/api';

type Post = {
	slug: string;
	title: string;
	excerpt: string;
	updatedAt: string;
	viewCount: number;
};

interface HomeProps {
	posts: Post[];
}

export default function Home({ posts }: HomeProps) {
	const [search, setSearch] = useState('');
	const [postList, setPostList] = useState<Post[]>(posts);

	useEffect(() => {
		if (!search) {
			return setPostList(posts);
		}

		setPostList((posts) =>
			posts.filter(
				(post) => post.title.includes(search) || post.excerpt.includes(search)
			)
		);
	}, [search]);

	return (
		<>
			<Header search={search} onSearch={setSearch} />
			<PostList posts={postList} />
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const response = await api.get('/posts');

	const posts = await Promise.all(
		response.data.map(async (post) => {
			const viewCountResponse = await api.get(`/posts/${post.slug}/views`);

			return {
				...post,
				viewCount: viewCountResponse.data.count,
			};
		})
	);

	return {
		props: {
			posts,
		},
	};
};
