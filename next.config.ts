import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/i',
				permanent: true // Use `false` for temporary redirect (307), `true` for permanent (308)
			}
		]
	}
}

export default nextConfig
