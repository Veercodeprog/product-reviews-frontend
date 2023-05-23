/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');
dotenv.config();
const nextConfig = {
    images: {
   loader: "default",

        domains: ['dummyimage.com', 'images.unsplash.com', 'upload.wikimedia.org', "localhost"],
    },
}

module.exports = nextConfig