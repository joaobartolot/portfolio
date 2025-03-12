#!/usr/bin/env -S node --no-warnings --loader ts-node/esm

import { execSync } from 'child_process'

// Function to dynamically install dependencies
const ensureDependencies = () => {
	const dependencies = ['axios', 'fs-extra', 'dotenv']
	const missingDeps = dependencies.filter(dep => {
		try {
			// Check if the package is installed globally in node_modules
			execSync(`npm list ${dep} --depth=0`, { stdio: 'ignore' })
			return false // Found, so no need to install
		} catch {
			return true // Not found, needs installation
		}
	})

	if (missingDeps.length > 0) {
		console.log(`📦 Installing missing dependencies: ${missingDeps.join(', ')}...`)
		execSync(`npm install --save-dev ${missingDeps.join(' ')}`, { stdio: 'inherit' })
	}
}

// CLI usage:
// Install fonts: npm run install-fonts "Font Name" 400 500 600 700
// Delete fonts:  npm run install-fonts --delete
// Show help:     npm run install-fonts --help
const args = process.argv.slice(2)

if (args.includes('--help') || args.includes('-h')) {
	console.log(`
📌 𝗜𝗻𝘀𝘁𝗮𝗹𝗹 𝗙𝗼𝗻𝘁𝘀 - Automate Google Fonts in Your Project! 🎨

🔹 𝗦𝘆𝗻𝘁𝗮𝘅:
    💻  npm run install-fonts [font_name] [weights]

⚙️ 𝗢𝗽𝘁𝗶𝗼𝗻𝘀:
    📖  -h, --help     Show this help message and exit
    🗑️  -D, --delete   Delete all installed fonts and reset styles

📌 𝗘𝘅𝗮𝗺𝗽𝗹𝗲𝘀:
    📥 Install Inter with default weights (400-700):
        💻  npm run install-fonts
    📥 Install Poppins with specific weights:
        💻  npm run install-fonts "Poppins" 300 400 700
    🗑️ Delete all installed fonts:
        💻  npm run install-fonts --delete
    🗑️ Delete all installed fonts (shorthand):
        💻  npm run install-fonts -D

📝 𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝘁𝗶𝗼𝗻:
    ✅  This script downloads fonts from Google Fonts and saves them to:
        📁 src/assets/fonts/
    ✅  It also adds @font-face rules to:
        📝 src/styles/fonts.css
    ✅  Finally, it ensures fonts.css is imported in:
        🖥️ src/index.css

⚠️ 𝗡𝗼𝘁𝗲:
    🔹  Weights are optional; defaults to 400-700.
    🔹  No italics are downloaded by default.
	`)
	process.exit(0)
}

// Ensure dependencies only if not using --help
ensureDependencies()

const { default: axios } = await import('axios')
const { default: fs } = await import('fs-extra')
const path = await import('path')
const { fileURLToPath } = await import('url')
const { default: dotenv } = await import('dotenv')

// Load environment variables from .env
dotenv.config()

// Resolve __dirname for ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const GOOGLE_FONTS_API = 'https://fonts.googleapis.com/css2?family='
const DEFAULT_WEIGHTS = [400, 500, 600, 700]

// Use environment variables if available
const DEFAULT_FONT = process.env.DEFAULT_FONT || 'Inter'
const DEFAULT_FONT_WEIGHTS = process.env.DEFAULT_FONT_WEIGHTS
	? process.env.DEFAULT_FONT_WEIGHTS.split(',').map(Number)
	: DEFAULT_WEIGHTS

async function downloadFont(fontName: string, weights: number[] = DEFAULT_FONT_WEIGHTS) {
	const formattedFontName = fontName.replace(/\s+/g, '+')
	const fontDir = path.join(__dirname, '../src/assets/fonts')
	const stylesDir = path.join(__dirname, '../src/styles')
	const cssFilePath = path.join(stylesDir, 'fonts.css')
	const indexCssPath = path.join(__dirname, '../src/index.css')

	// Ensure necessary directories exist
	await fs.ensureDir(fontDir)
	await fs.ensureDir(stylesDir)

	// Ensure `fonts.css` exists
	if (!(await fs.pathExists(cssFilePath))) {
		await fs.writeFile(cssFilePath, '') // Create an empty file if it doesn't exist
		console.log(`📄 Created ${cssFilePath}`)
	}

	console.log(`🔄 Fetching ${fontName} (${weights.join(', ')}) from Google Fonts...`)

	// Fetch CSS from Google Fonts
	try {
		const res = await axios.get(`${GOOGLE_FONTS_API}${formattedFontName}:wght@${weights.join(';')}&display=swap`, {
			headers: { 'User-Agent': 'Mozilla/5.0' },
		})
		const css = res.data

		// Extract font URLs
		const urls = css.match(/url\(([^)]+)\)/g)?.map(url => url.replace(/url\(|\)/g, '').replace(/"/g, '')) || []

		// Download each font file
		const fontFiles: string[] = []
		for (const url of urls) {
			const weightMatch = url.match(/wght(\d+)/)
			const weight = weightMatch ? parseInt(weightMatch[1]) : 400

			const fontFileName = `${fontName.replace(/\s+/g, '_')}-${weight}.ttf`
			const fontFilePath = path.join(fontDir, fontFileName)

			if (weights.includes(weight)) {
				console.log(`⬇️ Downloading ${fontFileName}...`)
				const fontResponse = await axios.get(url, { responseType: 'arraybuffer' })
				await fs.writeFile(fontFilePath, fontResponse.data)
				fontFiles.push(fontFileName)
			}
		}

		// Generate @font-face rules
		let fontFaceCSS = fontFiles
			.map(fontFile => {
				const weight = fontFile.match(/-(\d+)\.ttf$/)?.[1] || '400'
				return `
@font-face {
	font-family: '${fontName}';
	src: url('../assets/fonts/${fontFile}') format('truetype');
	font-weight: ${weight};
	font-style: normal;
}`
			})
			.join('\n')

		// Append new font-face rules to `fonts.css`
		await fs.appendFile(cssFilePath, fontFaceCSS + '\n')
		console.log(`✅ Font styles added to ${cssFilePath}`)

		// Ensure index.css exists
		if (!(await fs.pathExists(indexCssPath))) {
			await fs.writeFile(indexCssPath, "/* Main CSS */\n")
			console.log(`📄 Created ${indexCssPath}`)
		}

		// Read the content of index.css
		let indexCssContent = await fs.readFile(indexCssPath, 'utf8')

		// Ensure fonts.css import is at the first line
		if (!indexCssContent.includes("@import './styles/fonts.css';")) {
			indexCssContent = `@import './styles/fonts.css';\n\n` + indexCssContent
			await fs.writeFile(indexCssPath, indexCssContent)
			console.log(`✅ Added font import at the first line of ${indexCssPath}`)
		}

		console.log(`🎉 Font ${fontName} installation completed successfully!`)
	} catch (error) {
		console.error('❌ Error fetching fonts:', error.message || error)
	}
}

// Function to delete all installed fonts and reset styles
async function deleteFonts() {
	const fontDir = path.join(__dirname, '../src/assets/fonts')
	const cssFilePath = path.join(__dirname, '../src/styles/fonts.css')
	const indexCssPath = path.join(__dirname, '../src/index.css')

	// Remove fonts directory
	if (await fs.pathExists(fontDir)) {
		await fs.remove(fontDir)
		console.log(`🗑️ Deleted all fonts from ${fontDir}`)
	}

	// Clear fonts.css file
	if (await fs.pathExists(cssFilePath)) {
		await fs.writeFile(cssFilePath, '')
		console.log(`🗑️ Cleared ${cssFilePath}`)
	}

	// Remove fonts.css import from index.css
	if (await fs.pathExists(indexCssPath)) {
		let indexCssContent = await fs.readFile(indexCssPath, 'utf8')

		if (indexCssContent.includes("@import './styles/fonts.css';")) {
			indexCssContent = indexCssContent.replace("@import './styles/fonts.css';\n\n", '')
			await fs.writeFile(indexCssPath, indexCssContent)
			console.log(`🗑️ Removed font import from ${indexCssPath}`)
		}
	}

	console.log(`✅ All fonts and styles have been deleted!`)
}

if (args.includes('--delete') || args.includes('-D')) {
	deleteFonts().catch(err => console.error('❌ Error:', err))
} else {
	const fontName = args[0] || DEFAULT_FONT
	const weights = args.length > 1 ? args.slice(1).map(Number) : DEFAULT_FONT_WEIGHTS
	downloadFont(fontName, weights).catch(err => console.error('❌ Error:', err))
}
