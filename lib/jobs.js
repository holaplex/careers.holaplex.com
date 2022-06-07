import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";

const jobsDirectory = path.join(process.cwd(), "content/jobs");

let jobCache;

export function fetchJobContent() {
	if (jobCache) {
		return jobCache;
	}
	// Get file names under /jobs
	const fileNames = fs.readdirSync(jobsDirectory);
	const allJobsData = fileNames
		.filter((it) => it.endsWith(".mdx"))
		.map((fileName) => {
			// Read markdown file as string
			const fullPath = path.join(jobsDirectory, fileName);
			const fileContents = fs.readFileSync(fullPath, "utf8");

			// Use gray-matter to parse the job metadata section
			const matterResult = matter(fileContents, {
				engines: {
					yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
				},
			});
			const matterData = matterResult.data;
			matterData.fullPath = fullPath;

			const slug = fileName.replace(/\.mdx$/, "");

			matterData.slug = slug;

			return matterData;
		});
	// Sort jobs by date
	jobCache = allJobsData.sort((a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	});
	return jobCache;
}

export function countJobs(tag) {
	return fetchJobContent().filter(
		(it) => !tag || (it.tags && it.tags.includes(tag))
	).length;
}

export function listJobContent(page, limit) {
	return fetchJobContent()
		.filter((it) => !it.draftmode)
		.slice((page - 1) * limit, page * limit);
}