#!/usr/bin/env node
const { program } = require('commander');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Check for required environment variables
if (!process.env.INSTA_RAPIDAPI_KEY) {
  console.error('❌ Missing INSTA_RAPIDAPI_KEY in environment');
  console.error('Please add the following to your ~/.zshrc file:');
  console.error('export INSTA_RAPIDAPI_KEY="your-api-key-here"');
  console.error('Then restart your terminal or run: source ~/.zshrc');
  process.exit(1);
}

// Create downloads directory if it doesn't exist
const downloadsDir = path.join(os.homedir(), 'Downloads', 'insta-videos');
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

// Fetch video URL from API
async function getInstagramVideoUrl(postUrl) {
  try {
    const response = await axios.get(
      `https://${process.env.INSTA_RAPIDAPI_HOST || 'instagram-looter2.p.rapidapi.com'}/post-dl`,
      {
        params: { url: postUrl },
        headers: {
          'x-rapidapi-host': process.env.INSTA_RAPIDAPI_HOST || 'instagram-looter2.p.rapidapi.com',
          'x-rapidapi-key': process.env.INSTA_RAPIDAPI_KEY,
        },
      }
    );
    
    // Extract video URL from the response
    return response.data.data.medias[0].type === "video" 
      ? response.data.data.medias[0].link 
      : null;
  } catch (error) {
    throw new Error(`❌ API Error: ${error.message}`);
  }
}

// Download video function with progress bar
async function downloadVideo(url, outputPath) {
  try {
    // Create a write stream to save the file
    const writer = fs.createWriteStream(outputPath);
    
    // Download the video
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream'
    });
    
    // Set up progress tracking
    const totalSize = parseInt(response.headers['content-length'], 10);
    let downloadedSize = 0;
    
    response.data.on('data', (chunk) => {
      downloadedSize += chunk.length;
      // Calculate progress percentage
      const percent = Math.round((downloadedSize / totalSize) * 100);
      
      // Create progress bar
      const barLength = 20;
      const filledLength = Math.round(barLength * percent / 100);
      const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
      
      // Update progress display
      process.stdout.write(`\r⬇️  ${bar} ${percent}%`);
    });
    
    // Pipe the response data to the file
    response.data.pipe(writer);
    
    // Return a promise that resolves when the download completes
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    throw new Error(`❌ Download failed: ${error.message}`);
  }
}

// Configure CLI
program
  .name('insta-download')
  .version('1.0.0')
  .description('📱 Instagram video downloader')
  .argument('<postUrl>', 'Instagram post URL')
  .option('-o, --output <filename>', 'Custom filename (without extension)')
  .action(async (postUrl, options) => {
    try {
      // Determine output filename
      const filename = options.output || `insta_${Date.now()}`;
      const outputPath = path.join(downloadsDir, `${filename}.mp4`);
      
      // Show fetching message
      process.stdout.write('🔍 Fetching video...');
      
      // Get video URL and clear the line
      const videoUrl = await getInstagramVideoUrl(postUrl);
      process.stdout.write('\r                     \r');
      
      if (!videoUrl) {
        console.log('❌ No video found in this post');
        process.exit(1);
      }
      
      // Download video with progress bar
      await downloadVideo(videoUrl, outputPath);
      
      // Show success message
      console.log(`\n✅ Saved to ~/Downloads/insta-videos/${path.basename(outputPath)}`);
    } catch (error) {
      console.error(`\n${error.message}`);
      process.exit(1);
    }
  });

// Parse CLI arguments
program.parse(process.argv);

// Show help if no arguments provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
