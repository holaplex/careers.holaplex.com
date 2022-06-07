import { attributes, react as HomeContent } from '../content/home.md';

import Layout from '../components/layout';
import Section from '../components/section';
import Container from '../components/container';
import Metadata from '../components/metadata';
import config from "../lib/config";
import { countJobs, listJobContent } from "../lib/jobs";
import Link from 'next/link';
import formatDate from '../utils/formatDate';
import Image from 'next/image';

function Job({ slug, date, title, description, link }) {
	return <div className='p-4 border border-gray-600 my-4 rounded-xl relative overflow-hidden'>
		<h2 className='mt-0'>{title}</h2>
		<p className='mt-4 mb-0'>{description}</p>
		<p className='mt-4 mb-0'>{formatDate(date)}</p>
		<Link href={`/job/${slug}`}>
			<a className='absolute inset-0' />
		</Link>
		{link ? <a href={link} className='absolute top-0 right-0 p-1' target='_blank' rel='noreferrer'>
			🔗
		</a> : <></>}
	</div>
}

import hiringImage from '../public/img/hiring.png';

export default function Home({ jobs, pagination }) {
	let { title, text } = attributes;

	console.log(pagination);
	return (
		<Layout theme='theme-primary'>
			<Metadata title={title} />

			<Section>
				<div className='flex flex-col lg:flex-row gap-8 items-center mx-auto w-full p-8' style={{ maxWidth: '1200px' }}>
					<div className='w-full lg:w-6/12 max-w-md'>
						<Image src={hiringImage} />
					</div>
					<div className='w-full lg:w-6/12 text-center lg:text-left'>
						<h1>Careers at Holaplex</h1>
						<p>Selling NFTs is easier than ever thanks to Metaplex's AuctionHouse. NFTs never leave your wallet until sold and can be listed on any number of AuctionHouse supported marketplaces.</p>
					</div>
				</div>
			</Section>
			<Section>
				<Container variant="slim" className='flex gap-4 flex-wrap justify-center items-center'>
					{jobs.map(it => <Job key={it.slug} {...it} />)}
				</Container>
			</Section>
		</Layout>
	);
}

export const getStaticProps = async () => {
	const jobs = listJobContent(1, config.jobs_per_page);
	const pagination = {
		current: 1,
		pages: Math.ceil(countJobs() / config.jobs_per_page),
	};
	return {
		props: {
			jobs,
			pagination,
		},
	};
};