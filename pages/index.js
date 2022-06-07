import { attributes, react as HomeContent } from '../content/home.md';

import Layout from '../components/layout';
import Section from '../components/section';
import Container from '../components/container';
import Metadata from '../components/metadata';
import config from "../lib/config";
import { countPosts, listPostContent } from "../lib/posts";
import Link from 'next/link';
import formatDate from '../utils/formatDate';

function Post({ slug, date, title, description }) {

	return <Link href={`/job/${slug}`}>
		<a>
			<div className='p-4 border border-gray-600 my-4 rounded-xl'>
				<h2 className='mt-0'>{title}</h2>
				<p className='mt-4 mb-0'>{description}</p>
				<p className='mt-4 mb-0'>{formatDate(date)}</p>
			</div>
		</a>
	</Link>
}

export default function Home({ posts, pagination }) {
	let { title, text } = attributes;

	console.log(pagination);
	return (
		<Layout theme='theme-primary'>
			<Metadata title={title} />

			<Section>
				<Container variant="slim">
					{posts.map(it => <Post key={it.slug} {...it} />)}
				</Container>
			</Section>
		</Layout>
	);
}

export const getStaticProps = async () => {
	const posts = listPostContent(1, config.posts_per_page);
	const pagination = {
		current: 1,
		pages: Math.ceil(countPosts() / config.posts_per_page),
	};
	return {
		props: {
			posts,
			pagination,
		},
	};
};