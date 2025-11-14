#!/usr/bin/env node

/**
 * Release Contributors Generator
 *
 * This script extracts contributors for each release and generates a formatted
 * contributors section that can be included in release notes.
 *
 * Features:
 * - Extracts contributors between git tags/releases
 * - Generates markdown formatted contributor lists
 * - Supports GitHub API integration for enhanced contributor data
 * - Can be integrated into CI/CD workflows
 *
 * Usage:
 *   node scripts/generate-release-contributors.js [options]
 *
 * Options:
 *   --tag <tag>          Specific tag to generate contributors for
 *   --all                Generate contributors for all releases
 *   --detailed           Generate detailed contributor info, icon otherwise
 *   --output <file>      Output file path (default: stdout)
 *   --format <format>    Output format: markdown, json, html (default: markdown)
 *   --github-token       GitHub token for API access (optional)
 */

import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

// Configuration
const CONFIG = {
	// GitHub API configuration
	githubApi: {
		baseUrl: "https://api.github.com",
		token: process.env.GITHUB_TOKEN || process.env.GH_TOKEN,
	},
	// Output formats
	formats: {
		markdown: "markdown",
		json: "json",
		html: "html",
	},
	// Contributor display options
	display: {
		includeEmail: false,
		includeAvatar: true,
		sortBy: "commits", // commits, name, alphabetical
	},
};

/**
 * Execute a git command and return the output
 */
function execGit(command) {
	try {
		return execSync(`git ${command}`, {
			encoding: "utf-8",
			stdio: ["pipe", "pipe", "pipe"],
		}).trim();
	} catch (error) {
		console.error(`Error executing git command: ${command}`);
		console.error(error.message);
		return "";
	}
}

/**
 * Get all git tags sorted by version
 */
function getAllTags() {
	const output = execGit("tag --sort=-version:refname");
	return output ? output.split("\n").filter(Boolean) : [];
}

/**
 * Get the repository information from git remote
 */
function getRepoInfo() {
	const remoteUrl = execGit("remote get-url origin");
	const match = remoteUrl.match(/github\.com[:/]([^/]+)\/([^/.]+)/);

	if (match) {
		return {
			owner: match[1],
			repo: match[2].replace(".git", ""),
		};
	}

	return null;
}

/**
 * Get contributors between two git references
 */
function getContributorsBetween(fromRef, toRef) {
	const range = fromRef ? `${fromRef}..${toRef}` : toRef;
	const command = `log ${range} --format="%an|%ae|%H" --no-merges`;
	const output = execGit(command);

	if (!output) return [];

	const contributorMap = new Map();

	for (const line of output.split("\n")) {
		if (!line) continue;

		const [name, email, hash] = line.split("|");
		const key = email.toLowerCase();

		if (contributorMap.has(key)) {
			const contributor = contributorMap.get(key);
			contributor.commits.push(hash);
			contributor.commitCount++;
		} else {
			contributorMap.set(key, {
				name,
				email,
				commits: [hash],
				commitCount: 1,
			});
		}
	}

	return Array.from(contributorMap.values());
}

/**
 * Fetch GitHub user data for contributors
 */
async function enrichWithGitHubData(contributors, repoInfo) {
	if (!CONFIG.githubApi.token || !repoInfo) {
		return contributors;
	}

	const enriched = [];

	for (const contributor of contributors) {
		try {
			// Try to find GitHub username by searching commits
			const commit = contributor.commits[0];
			const response = await fetch(
				`${CONFIG.githubApi.baseUrl}/repos/${repoInfo.owner}/${repoInfo.repo}/commits/${commit}`,
				{
					headers: {
						Authorization: `Bearer ${CONFIG.githubApi.token}`,
						Accept: "application/vnd.github.v3+json",
					},
				},
			);

			if (response.ok) {
				const data = await response.json();
				enriched.push({
					...contributor,
					username: data.author?.login || null,
					avatarUrl: data.author?.avatar_url || null,
					profileUrl: data.author?.html_url || null,
				});
			} else {
				enriched.push(contributor);
			}
		} catch (error) {
			console.error(
				`Error fetching GitHub data for ${contributor.name}:`,
				error.message,
			);
			enriched.push(contributor);
		}
	}

	return enriched;
}

/**
 * Sort contributors based on configuration
 */
function sortContributors(contributors) {
	const sortBy = CONFIG.display.sortBy;

	return contributors.sort((a, b) => {
		if (sortBy === "commits") {
			return b.commitCount - a.commitCount;
		}
		if (sortBy === "name" || sortBy === "alphabetical") {
			return a.name.localeCompare(b.name);
		}
		return 0;
	});
}

/**
 * Format contributors as Markdown
 */
function formatAsMarkdown(contributors, releaseTag, detailed) {
	const lines = [];

	lines.push(`## Contributors to ${releaseTag}`);
	lines.push("");
	lines.push(
		`A big thank you to the ${contributors.length} contributor${contributors.length !== 1 ? "s" : ""} who made this release possible!`,
	);
	lines.push("");

	for (const c of contributors) {
		let line = "- ";

		if (detailed) {
			if (CONFIG.display.includeAvatar && c.avatarUrl) {
				line += `<img src="${c.avatarUrl}" width="20" height="20" alt="${c.name}" /> `;
			}

			if (c.username && c.profileUrl) {
				line += `[@${c.username}](${c.profileUrl})`;
			} else {
				line += `**${c.name}**`;
			}

			line += ` (${c.commitCount} commit${c.commitCount !== 1 ? "s" : ""})`;

			if (CONFIG.display.includeEmail && c.email) {
				line += ` - ${c.email}`;
			}
		} else {
			line = `<a href="${c.profileUrl || "#"}" title="${c.name} (${c.commitCount} commit${c.commitCount !== 1 ? "s" : ""})" target="_blank">`;

			if (CONFIG.display.includeAvatar && c.avatarUrl) {
				line += `<img src="https://wsrv.nl/?url=${encodeURIComponent(c.avatarUrl)}&w=32&h=32&fit=cover&mask=circle&mtrim" width="32" height="32" alt="${c.name}" /> `;
			} else {
				line += `**${c.username || c.name}**`;
			}

			line += `</a>`;
		}
		lines.push(line);
	}

	lines.push("");
	return lines.join("\n");
}

/**
 * Format contributors as JSON
 */
function formatAsJson(contributors, releaseTag) {
	return JSON.stringify(
		{
			release: releaseTag,
			contributorCount: contributors.length,
			contributors: contributors.map((c) => ({
				name: c.name,
				email: CONFIG.display.includeEmail ? c.email : undefined,
				username: c.username,
				profileUrl: c.profileUrl,
				avatarUrl: CONFIG.display.includeAvatar
					? c.avatarUrl || `${c.username}.png`
					: undefined,
				commitCount: c.commitCount,
			})),
		},
		null,
		2,
	);
}

/**
 * Format contributors as HTML
 */
function formatAsHtml(contributors, releaseTag, detailed) {
	const lines = [];

	lines.push(`<div class="release-contributors">`);
	lines.push(`  <h2>Contributors to ${releaseTag}</h2>`);
	lines.push(
		`  <p>A big thank you to the ${contributors.length} contributor${contributors.length !== 1 ? "s" : ""} who made this release possible!</p>`,
	);
	lines.push(`  <${detailed ? "ul" : "div"} class="contributors-list">`);

	for (const contributor of contributors) {
		if (detailed) {
			lines.push(`    <li>`);

			if (CONFIG.display.includeAvatar && contributor.avatarUrl) {
				lines.push(
					`      <img src="${contributor.avatarUrl}" width="32" height="32" alt="${contributor.name}" class="avatar" />`,
				);
			}

			if (contributor.username && contributor.profileUrl) {
				lines.push(
					`      <a href="${contributor.profileUrl}" target="_blank">@${contributor.username}</a>`,
				);
			} else {
				lines.push(
					`      <strong>${contributor.username || contributor.name}</strong>`,
				);
			}

			lines.push(
				`      <span class="commit-count">${contributor.commitCount} commit${contributor.commitCount !== 1 ? "s" : ""}</span>`,
			);
			lines.push(`    </li>`);
		} else {
			let line = `    <a href="${contributor.profileUrl || "#"}" title="${contributor.name} (${contributor.commitCount} commit${contributor.commitCount !== 1 ? "s" : ""})" target="_blank">`;

			if (CONFIG.display.includeAvatar && contributor.avatarUrl) {
				line += `<img src="https://wsrv.nl/?url=${encodeURIComponent(contributor.avatarUrl)}&w=32&h=32&fit=cover&mask=circle&mtrim" width="32" height="32" alt="${contributor.name}" class="avatar" /> `;
			} else {
				line += `<strong>${(contributor.username || contributor.name).charAt(0).toUpperCase()}</strong>`;
			}

			line += `</a>`;
			lines.push(line);
		}
	}

	lines.push(`  </${detailed ? "ul" : "div"}>`);
	lines.push(`</div>`);

	return lines.join("\n");
}

/**
 * Format contributors based on specified format
 */
function formatContributors(contributors, releaseTag, format, detailed) {
	switch (format) {
		case CONFIG.formats.json:
			return formatAsJson(contributors, releaseTag, detailed);
		case CONFIG.formats.html:
			return formatAsHtml(contributors, releaseTag, detailed);
		// case CONFIG.formats.markdown:
		default:
			return formatAsMarkdown(contributors, releaseTag, detailed);
	}
}

/**
 * Generate contributors for a specific release
 */
async function generateForRelease(tag, previousTag, format, detailed) {
	console.error(
		`Processing release: ${tag}${previousTag ? ` (from ${previousTag})` : " (initial release)"}`,
	);

	const contributors = getContributorsBetween(previousTag, tag);

	if (contributors.length === 0) {
		console.error("  No contributors found");
		return null;
	}

	console.error(`  Found ${contributors.length} contributor(s)`);

	// Enrich with GitHub data if token is available
	const repoInfo = getRepoInfo();
	const enrichedContributors = await enrichWithGitHubData(
		contributors,
		repoInfo,
	);

	// Sort contributors
	const sortedContributors = sortContributors(enrichedContributors);

	// Format output
	return formatContributors(sortedContributors, tag, format, detailed);
}

/**
 * Generate contributors for all releases
 */
async function generateForAllReleases(format, detailed) {
	const tags = getAllTags();

	if (tags.length === 0) {
		console.error("No tags found in repository");
		return "";
	}

	console.error(`Found ${tags.length} release(s)`);

	const results = [];

	for (let i = 0; i < tags.length; i++) {
		const currentTag = tags[i];
		const previousTag = tags[i + 1] || null;

		const result = await generateForRelease(
			currentTag,
			previousTag,
			format,
			detailed,
		);
		if (result) {
			results.push(result);
		}
	}

	return results.join("\n---\n\n");
}

/**
 * Parse command line arguments
 */
function parseArgs() {
	const args = process.argv.slice(2);
	const options = {
		tag: null,
		all: false,
		output: null,
		format: "markdown",
		help: false,
		detailed: false,
	};

	for (let i = 0; i < args.length; i++) {
		const arg = args[i];

		switch (arg) {
			case "--tag":
				options.tag = args[++i];
				break;
			case "--all":
				options.all = true;
				break;
			case "--detailed":
				options.detailed = true;
				break;
			case "--output":
				options.output = args[++i];
				break;
			case "--format":
				options.format = args[++i];
				break;
			case "--github-token":
				CONFIG.githubApi.token = args[++i];
				break;
			case "--help":
			case "-h":
				options.help = true;
				break;
			default:
				console.error(`Unknown option: ${arg}`);
				options.help = -1;
		}
	}

	return options;
}

/**
 * Display help message
 */
function displayHelp() {
	console.log(`
Release Contributors Generator

Usage:
  node scripts/generate-release-contributors.js [options]

Options:
  --tag <tag>          Generate contributors for a specific tag
  --all                Generate contributors for all releases
  --detailed           Generate detailed contributor info, icon otherwise
  --output <file>      Write output to file (default: stdout)
  --format <format>    Output format: markdown, json, html (default: markdown)
  --github-token       GitHub token for API access (optional)
  --help, -h           Display this help message

Examples:
  # Generate for latest release
  node scripts/generate-release-contributors.js --tag v1.0.0

  # Generate for all releases
  node scripts/generate-release-contributors.js --all

  # Generate as JSON
  node scripts/generate-release-contributors.js --tag v1.0.0 --format json

  # Save to file
  node scripts/generate-release-contributors.js --all --output CONTRIBUTORS.md

Environment Variables:
  GITHUB_TOKEN         GitHub personal access token for API access
  GH_TOKEN             Alternative environment variable for GitHub token
`);
}

/**
 * Main execution function
 */
async function main() {
	const options = parseArgs();

	if (options.help) {
		displayHelp();
		process.exit(options.help === true ? 0 : 1);
	}

	let output = "";

	if (options.all) {
		// Generate for all releases
		output = await generateForAllReleases(options.format, options.detailed);
	} else if (options.tag) {
		// Generate for specific tag
		const tags = getAllTags();
		const tagIndex = tags.indexOf(options.tag);

		if (tagIndex === -1) {
			console.error(`Tag not found: ${options.tag}`);
			process.exit(1);
		}

		const previousTag = tags[tagIndex + 1] || null;
		output = await generateForRelease(
			options.tag,
			previousTag,
			options.format,
			options.detailed,
		);
	} else {
		// Generate for latest release
		const tags = getAllTags();
		if (tags.length === 0) {
			console.error("No tags found in repository");
			process.exit(1);
		}

		const latestTag = tags[0];
		const previousTag = tags[1] || null;
		output = await generateForRelease(
			latestTag,
			previousTag,
			options.format,
			options.detailed,
		);
	}

	if (!output) {
		console.error("No output generated");
		process.exit(1);
	}

	// Write output
	if (options.output) {
		const outputPath = resolve(process.cwd(), options.output);
		writeFileSync(outputPath, output, "utf-8");
		console.error(`Output written to: ${outputPath}`);
	} else {
		console.log(output);
	}
}

// Execute main function
main().catch((error) => {
	console.error("Error:", error);
	process.exit(1);
});
