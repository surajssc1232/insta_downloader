# Instagram Video Downloader CLI

A simple command-line tool to download Instagram videos directly to your computer.

![Instagram Video Downloader CLI](https://via.placeholder.com/800x400?text=Instagram+Video+Downloader+CLI)

## Features

- 📱 Download videos from Instagram posts and reels
- ⚡ Fast and lightweight CLI interface
- 🔄 Simple progress bar with percentage
- 📂 Automatically saves to organized directory
- 🛠️ Custom filename option
- 🔒 Secure API key handling via environment variables

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 12 or higher)
- NPM (comes with Node.js)

### Quick Install

1. Clone this repository or download the files
   ```bash
   git clone https://github.com/yourusername/insta-download.git
   cd insta-download
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   ```
   Then edit the `.env` file and add your RapidAPI key from [Instagram Looter 2](https://rapidapi.com/logicbuilder/api/instagram-looter2/)

4. Make the script executable
   ```bash
   chmod +x insta-download.js
   ```

5. Create a global symlink to use from anywhere
   ```bash
   npm link
   # OR
   sudo ln -s $(pwd)/insta-download.js /usr/local/bin/insta-download
   ```

### Dependencies

This tool requires the following Node.js packages:
- `commander` - For command-line interface and options parsing
- `axios` - For HTTP requests
- `dotenv` - For environment variable management

## Usage

### Basic Usage

Download a video by providing the Instagram post or reel URL:

```bash
insta-download https://www.instagram.com/reels/DIYBrhAhmNS/
```

The video will be saved to `~/Downloads/insta-videos/` by default.

### Custom Filename

You can specify a custom filename (without extension):

```bash
insta-download https://www.instagram.com/reels/DIYBrhAhmNS/ -o cool_cat_video
```

This will save the file as `~/Downloads/insta-videos/cool_cat_video.mp4`.

### Help

Display help information:

```bash
insta-download --help
```

## Technical Details

This tool uses the Instagram Looter 2 API via RapidAPI to fetch video information. It then downloads the video directly from Instagram's servers.

### API Key Security

The tool stores your API key securely in a `.env` file which is ignored by git to prevent accidental exposure. Make sure to:

1. Never commit your `.env` file to version control
2. Keep your API key private
3. Regenerate your API key if you suspect it has been compromised

## Limitations

- Only works with public Instagram posts
- Instagram's API changes may affect functionality
- Rate limits may apply based on your RapidAPI plan

## License

MIT License - Feel free to modify and distribute as needed.

## Disclaimer

This tool is for personal use only. Respect copyright and Instagram's terms of service when downloading content.
