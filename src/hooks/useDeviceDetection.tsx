import { useState, useEffect } from 'react'

const useDeviceDetection = () => {
	const [isMobile, setIsMobile] = useState(false)
	const [isBot, setIsBot] = useState(false)

	useEffect(() => {
		const userAgent = navigator.userAgent || navigator.vendor

		// List of common mobile device user agents
		const mobileUserAgents = [
			/Android/i,
			/iPhone/i,
			/iPad/i,
			/iPod/i,
			/BlackBerry/i,
			/Windows Phone/i,
			/Opera Mini/i,
			/Mobile Safari/i,
			/webOS/i,
		]

		// List of common bot user agents
		const botUserAgents = [
			/bot/i,
			/crawl/i,
			/spider/i,
			/slurp/i,
			/search/i,
			/yahoo/i,
			/bing/i,
			/baidu/i,
			/duckduckgo/i,
			/yandex/i,
			/sogou/i,
			/exabot/i,
			/facebot/i,
			/ia_archiver/i,
		]

		// Check if it's a mobile device
		setIsMobile(mobileUserAgents.some(regex => regex.test(userAgent)))

		// Check if it's a bot
		setIsBot(botUserAgents.some(regex => regex.test(userAgent)))
	}, [])

	return { isMobile, isBot }
}

export default useDeviceDetection
