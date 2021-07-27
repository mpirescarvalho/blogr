import Head from 'next/head'
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
	viewCount?: number;
};

interface HomeProps {
	posts: Post[];
}

export default function Home({ posts }: HomeProps) {
	const [search, setSearch] = useState('');
	const [postsWithViewCount, setPostsWithViewCount] = useState<Post[]>(posts)
	const [postList, setPostList] = useState<Post[]>(postsWithViewCount);

	useEffect(() => {
		if (!search) {
			return setPostList(postsWithViewCount);
		}

		function normalizeStr(str: string) {
			const result = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase()
			return result;
		}

		const normalizedSearch = normalizeStr(search)

		const newPostList = postsWithViewCount.filter(
			(post) => normalizeStr(post.title).includes(normalizedSearch) || normalizeStr(post.excerpt).includes(normalizedSearch)
		)

		setPostList(newPostList)
	}, [search, postsWithViewCount]);

	useEffect(() => {
		posts.forEach(async post => {
			const response = await api.get(`/posts/${post.slug}/views`)
			const viewCount = response.data.count

			setPostsWithViewCount(posts => posts.map(oldPost => oldPost.slug === post.slug ? {
				...post,
				viewCount
			} : oldPost))
		})
	}, [posts]);

	return (
		<>
			<Head>
				<title>Blogr</title>
			</Head>

			<Header search={search} onSearch={setSearch} />
			<PostList posts={postList} />
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const response = await api.get('/posts');

	return {
		props: {
			posts: response.data,
		},
		revalidate: 60 * 30 // 30 minutes
	};
};
