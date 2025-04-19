# Instagram Video Downloader CLI

A simple command-line tool to download Instagram videos directly to your computer.

![Instagram Video Downloader CLI](https://via.placeholder.com/800x400?text=Instagram+Video+Downloader+CLI)

## Features

- 📱 Download videos from Instagram posts and reels
- ⚡ Fast and lightweight CLI interface
- 🔄 Simple progress bar with percentage
- 📂 Automatically saves to organized directory
- 🛠️ Custom filename option
- 🔒 System-wide API key configuration

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

3. Configure your API key
   Add the following line to your `~/.zshrc` file:
   ```bash
   export INSTA_RAPIDAPI_KEY="your-api-key-here"
   ```
   Replace `your-api-key-here` with your RapidAPI key from [Instagram Looter 2](https://rapidapi.com/iq.faceok/api/instagram-looter2)
   
   Then reload your shell configuration:
   ```bash
   source ~/.zshrc
   ```

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

The tool uses your system's shell configuration (`~/.zshrc`) to securely store your API key. This provides:

1. System-wide access to the API key
2. No need for local configuration files
3. Standard Unix environment variable security

Remember to:
- Keep your API key private
- Regenerate your API key if you suspect it has been compromised

## Limitations

- Only works with public Instagram posts
- Instagram's API changes may affect functionality
- Rate limits may apply based on your RapidAPI plan

## License

MIT License - Feel free to modify and distribute as needed.

## Disclaimer

This tool is for personal use only. Respect copyright and Instagram's terms of service when downloading content.
