# KAMUI Downloader

**A modern Windows desktop downloader for videos, playlists, clips, and thumbnails.**

KAMUI Downloader is a free, open-source Windows application built around a clean interface and a straightforward workflow. It uses **yt-dlp** to support YouTube and other sites supported by yt-dlp, with **FFmpeg** for media processing.

[![Latest Release](https://img.shields.io/github/v/release/hanzalawaqar/Kamui-Downloader?style=for-the-badge)](https://github.com/hanzalawaqar/Kamui-Downloader/releases/latest)
[![Windows 10/11](https://img.shields.io/badge/Windows-10%2F11-0078D4?style=for-the-badge&logo=windows)](https://github.com/hanzalawaqar/Kamui-Downloader/releases/latest)
[![Python 3.13](https://img.shields.io/badge/Python-3.13-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

![KAMUI Downloader main window](docs/assets/screenshots/download.png)

## Features

- **Multiple download modes:** single video, multiple URLs, playlists, clips, and thumbnails.
- **Quality options:** 4K, 1080p, 720p, and audio-only presets, when available from the source.
- **Clip export:** download selected clips with ProRes export options.
- **Download management:** queue, download history, and automatic retry support.
- **Flexible Windows builds:** standard installer and portable package.
- **Browser integration:** Chrome and Edge extension with page controls and context-menu actions.
- **Bundled tools:** yt-dlp and FFmpeg are included with the portable build.

## Download

Get the latest version from the [GitHub Releases page](https://github.com/hanzalawaqar/Kamui-Downloader/releases/latest).

| Package | Description |
|---|---|
| **Windows Installer** | Installs KAMUI on Windows. |
| **Portable ZIP** | Extract the package and run the application without a standard installation. |
| **Browser Extension** | Extension package for supported Chromium-based browsers, including Chrome and Edge. |

## Getting Started

### Portable version

1. Download the portable ZIP from [Releases](https://github.com/hanzalawaqar/Kamui-Downloader/releases/latest).
2. Extract the ZIP archive.
3. Run `Kamui Downloader Portable.exe` from the extracted folder.

### Windows installer

1. Download the setup file from [Releases](https://github.com/hanzalawaqar/Kamui-Downloader/releases/latest).
2. Run `Kamui.Downloader.Setup.v1.1.7.exe` and follow the setup wizard.
3. Launch KAMUI from the Start Menu or desktop shortcut.

### Browser extension

1. Extract the extension ZIP file.
2. Open `chrome://extensions` in Chrome or `edge://extensions` in Microsoft Edge.
3. Turn on **Developer mode**.
4. Select **Load unpacked** and choose the extracted `extension` folder.

## Build from Source

See [BUILD.md](BUILD.md) for the project build instructions and development dependencies.

## FAQ

### Is KAMUI Downloader free?

Yes. KAMUI Downloader is free to download and use.

### Does it work without installation?

Yes. Use the portable package; extract it and launch the included application.

### Which websites are supported?

KAMUI uses yt-dlp and supports YouTube and other websites supported by the installed yt-dlp version. Website support can change over time.

### Does it support 4K and playlists?

Yes. 4K is available when the source provides a 4K format. Playlist mode can process videos from a playlist URL.

### Is KAMUI Downloader open source?

Yes. The source code is available in this GitHub repository.

## License

KAMUI Downloader is released under the **MIT License**. See [LICENSE](LICENSE) for details.

## Project Links

- **Website:** [KAMUI Downloader](https://hanzalawaqar.github.io/Kamui-Downloader/)
- **GitHub Repository:** [hanzalawaqar/Kamui-Downloader](https://github.com/hanzalawaqar/Kamui-Downloader)
- **Releases:** [Download the latest version](https://github.com/hanzalawaqar/Kamui-Downloader/releases)
- **Issues:** [Report a bug or request a feature](https://github.com/hanzalawaqar/Kamui-Downloader/issues)

## Developer

**Hanzala Waqar**  
Creator and developer of KAMUI Downloader.
