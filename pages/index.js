import { attributes, react as HomeContent } from '../content/home.md';

import Layout from '../components/layout';
import Section from '../components/section';
import Metadata from '../components/metadata';
import config from "../lib/config";
import { countJobs, listJobContent } from "../lib/jobs";
import Link from 'next/link';
import Image from 'next/image';

function Job({ slug, date, title, description, link }) {
	return <div className='w-full p-1 border-b border-b-gray-800 text-left relative flex justify-between items-center'>
		<strong className='mt-0 text-white block' style={{ width: 'calc(100% - 11rem)' }}>{title}</strong>
		<div className='flex gap-2 items-center justify-end' style={{ width: '11rem' }}>
			<Link href={`/job/${slug}`}>
				<a>
					<Button className='my-1 secondary' buttonStyle='small'>
						Learn More
					</Button>
				</a>
			</Link>
			{link ? <a href={link} target='_blank' rel='noreferrer'>
				<Button buttonStyle='small'>Apply Now</Button>
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
						<Image alt='' src={hiringImage} priority />
					</div>
					<div className='w-full lg:w-6/12 text-center lg:text-left'>
						<h1>Careers at Holaplex</h1>
						<p>Holaplex is a startup in the Web3 NFT industry with an ambitious roadmap and an incredible opportunity. We are a team of innovators with a passion for blockchain technology and open source development. Our work will empower digital artists to reach and inspire more people than ever before. We’d like your help.</p>
					</div>
				</div>
			</Section>
			<Section>
				<div className='max-w-2xl mx-auto'>
					<div className='flex gap-1 lg:gap-4 px-2 lg:px-4 flex-wrap justify-center items-center'>
						{jobs.map(it => <Job key={it.slug} {...it} />)}
					</div>
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