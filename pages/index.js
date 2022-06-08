import { attributes, react as HomeContent } from '../content/home.md';

import Layout from '../components/layout';
import Section from '../components/section';
import Metadata from '../components/metadata';
import config from "../lib/config";
import { countJobs, listJobContent } from "../lib/jobs";
import Link from 'next/link';
import Image from 'next/image';

function Job({ slug, date, title, description, link }) {
	return <div className='w-full md:w-5/12 lg:w-3/12 p-4 border border-gray-600 my-4 rounded-xl text-center relative overflow-hidden'>
		<h2 className='mt-0'>{title}</h2>
		<p className='my-4'>{description}</p>
		<div className='my-1 flex flex-wrap gap-1 items-center justify-center'>
			<Link href={`/job/${slug}`}>
				<a>
					<Button className='my-1 secondary'>
						Learn More
					</Button>
				</a>
			</Link>
			{link ? <a href={link} target='_blank' rel='noreferrer'>
				<Button>Apply Now</Button>
			</a> : <></>}
		</div>
	</div>
}

import hiringImage from '../public/img/hiring.png';
import Button from '../components/button';

export default function Home({ jobs, pagination }) {
	let { title, text } = attributes;

	return (
		<Layout theme='theme-primary'>
			<Metadata title={title} image={'https://careers.holaplex.com/img/hiring-social.png'} description="Selling NFTs is easier than ever thanks to Metaplex's AuctionHouse. NFTs never leave your wallet until sold and can be listed on any number of AuctionHouse supported marketplaces." />

			<Section>
				<div className='flex flex-col lg:flex-row gap-8 items-center mx-auto w-full p-8' style={{ maxWidth: '1200px' }}>
					<div className='w-full lg:w-6/12 max-w-md'>
						<Image alt='' src={hiringImage} />
					</div>
					<div className='w-full lg:w-6/12 text-center lg:text-left'>
						<h1>Careers at Holaplex</h1>
						<p>Selling NFTs is easier than ever thanks to Metaplex's AuctionHouse. NFTs never leave your wallet until sold and can be listed on any number of AuctionHouse supported marketplaces.</p>
					</div>
				</div>
			</Section>
			<Section>
				<div className='flex gap-2 lg:gap-4 px-2 lg:px-4 flex-wrap justify-center items-center'>
					{jobs.map(it => <Job key={it.slug} {...it} />)}
				</div>
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