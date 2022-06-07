import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";
import { fetchJobContent } from "../../lib/jobs";
import fs from "fs";
import yaml from "js-yaml";
import { parseISO } from 'date-fns';

import YouTube from "react-youtube";
import { TwitterTweetEmbed } from "react-twitter-embed";
import Layout from "../../components/layout";
import Metadata from "../../components/metadata";
import GenericContent from "../../components/genericContent";
import Section from "../../components/section";
import Container from "../../components/container";
import formatDate from "../../utils/formatDate";

const components = { YouTube, TwitterTweetEmbed };
const slugToJobContent = (jobContents => {
	let hash = {}
	jobContents.forEach(it => hash[it.slug] = it)
	return hash;
})(fetchJobContent());

export default function Job({
	title,
	dateString,
	slug,
	description,
	source,
	image,
}) {
	const content = hydrate(source, { components })
	return (
		<Layout>
			<Metadata
				title={title}
				date={parseISO(dateString)}
				slug={slug}
				description={description}
			/>
			<Section>
				<Container>
					<div className="w-full lg:w-11/12 mx-auto">
						<h1 className="mt-0">{title}</h1>
					</div>
					{image && <img src={'/' + image}
						className='w-full mx-auto my-4'
						alt=''
					/>}
					<p className="text-center my-4">{formatDate(dateString)}</p>

					<div className="w-full lg:w-11/12 mx-auto">
						<GenericContent>
							{content}
						</GenericContent>
					</div>
				</Container>
			</Section>
		</Layout>
	)
}

export const getStaticPaths = async () => {
	const paths = fetchJobContent().map(it => "/job/" + it.slug);
	return {
		paths,
		fallback: false,
	};
};

const replaceTags = (content) => {
	return content.replace(/(<br>|<br >)/gi, '<br />').replace(/(<hr>|<hr >)/gi, '<hr />');
}

export const getStaticProps = async ({ params }) => {
	const slug = params.job
	const source = fs.readFileSync(slugToJobContent[slug].fullPath, "utf8");
	const { content, data } = matter(source.replace(/\]\(uploads\//g, '](/uploads/'), {
		engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) }
	});
	const mdxSource = await renderToString(replaceTags(content), { components, scope: data });
	return {
		props: {
			title: data.title,
			dateString: data.date,
			description: data.description || "",
			source: mdxSource,
			slug,
		},
	};
};