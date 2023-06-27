/*
 PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values.
 Autoprefixer will use the data based on current browser popularity and
 property support to apply prefixes.
 */

module.exports = {
	plugins: [require('autoprefixer')],
};
