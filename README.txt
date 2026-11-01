# Kamui Downloader

**Kamui Downloader is a free Windows video downloader for YouTube and other sites — with a portable EXE, Windows installer and Chrome/Edge extension.**

[![Latest release](https://img.shields.io/github/v/release/YOUR_USERNAME/Kamui-Downloader?style=for-the-badge)](https://github.com/YOUR_USERNAME/Kamui-Downloader/releases/latest)
[![Windows](https://img.shields.io/badge/Windows-10%2F11-0078D4?style=for-the-badge&logo=windows)](https://github.com/YOUR_USERNAME/Kamui-Downloader/releases/latest)
[![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![License](https://img.shields.io/github/license/YOUR_USERNAME/Kamui-Downloader?style=for-the-badge)](LICENSE)

![Kamui Downloader main window](docs/assets/screenshots/download.png)

Kamui Downloader is a desktop app for Windows that downloads videos, playlists, clips and thumbnails from YouTube and other sites supported by yt-dlp. It supports single, multi and playlist downloads, 4K/1080p quality selection, ProRes export, download history, and a Chrome/Edge browser extension.

## Download Kamui Downloader

| Build | Description | Link |
|---|---|---|
| Portable EXE | No installation required | [Download](https://github.com/YOUR_USERNAME/Kamui-Downloader/releases/latest) |
| Windows Installer | Installs to Program Files | [Download](https://github.com/YOUR_USERNAME/Kamui-Downloader/releases/latest) |
| Browser Extension | Chrome / Edge / Brave | [Download](https://github.com/YOUR_USERNAME/Kamui-Downloader/releases/latest) |

> The EXEs are attached to GitHub Releases because they are larger than GitHub's 100 MB repository file limit.

## Features

- Single video, multi-URL, playlist, clip and thumbnail download modes
- 4K, 1080p, 720p and audio-only quality presets
- Clip download with ProRes export
- Download queue, history and smart retry
- Portable EXE and Inno Setup installer
- Chrome/Edge extension with page controls and context menu
- yt-dlp and FFmpeg bundled in the portable build

## Install

### Portable

1. Download the portable ZIP from Releases.
2. Extract it.
3. Run `Kamui Downloader Portable.exe`.

### Installer

1. Download `Kamui-Downloader-Setup-v1.1.7.exe`.
2. Run it and follow the wizard.
3. Launch KAMUI from the Start Menu or desktop shortcut.

### Browser extension

1. Open `chrome://extensions` or `edge://extensions`.
2. Enable Developer mode.
3. Click **Load unpacked** and select the `extension` folder.

## Build from source

See [BUILD.md](BUILD.md) for the exact Python 3.13 / PySide6 / PyInstaller / Inno Setup build steps.

## FAQ

### Is Kamui Downloader free?

Yes. The app is free to download and use.

### Does Kamui Downloader work without installation?

Yes. The portable EXE runs without installing anything.

### Which sites are supported?

YouTube and other sites supported by yt-dlp. Support depends on the installed yt-dlp version.

### Does it support 4K and playlists?

Yes, when the source provides 4K formats. Playlist mode downloads multiple videos from a playlist URL.

### Is Kamui Downloader open source?

Yes. The source code is in this repository.

## License

MIT License. See [LICENSE](LICENSE).

## Links

- Website: https://YOUR_USERNAME.github.io/Kamui-Downloader/
- Releases: https://github.com/YOUR_USERNAME/Kamui-Downloader/releases
- Issues: https://github.com/YOUR_USERNAME/Kamui-Downloader/issues
