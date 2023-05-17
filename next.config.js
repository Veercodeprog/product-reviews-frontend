/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');
dotenv.config();
const nextConfig = {
    images: {
        domains: ['dummyimage.com', 'images.unsplash.com'],
    },
}

module.exports = nextConfig