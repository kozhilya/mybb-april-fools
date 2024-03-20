const path = require('path');
const webpack = require('webpack');

const rootDir = path.resolve(__dirname);
const date = (new Date()).toLocaleDateString("ru-RU", 'yyyy-MM-dd');
const pckg = require(path.join(rootDir, 'package.json'));

const bannerContent = `
${pckg.name} ${pckg.version} (${date})
${pckg.homepage}
${pckg.description}
@author ${pckg.author.name}
@license ${pckg.license}
`.trim();

const libBanner = new webpack.BannerPlugin({
    banner: bannerContent,
    test: /\.js$/
});

module.exports = { libBanner };