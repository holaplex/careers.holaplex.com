const path = require('path');

module.exports = {
	webpack: (cfg) => {
		cfg.module.rules.push(
			{
				test: /\.md$/,
				loader: 'frontmatter-markdown-loader',
				options: { mode: ['react-component'] }
			}
		)
		return cfg;
	},
	experimental: {
		emotion: true,
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
}