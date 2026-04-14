# IINA Copy Timecode Plugin

An [IINA](https://iina.io) plugin that copies a rounded timecode with filename prefix to the clipboard.

Press **t** during playback to:

1. **Pause** the video
2. **Round** the current timecode down to the nearest 5-second mark (5-10 seconds before current position)
3. **Copy** to clipboard in the format: `P1 at 2:55`

## Timecode Rounding

The timecode is rounded down to 5-second intervals, landing 5-10 seconds before the actual playback position:

| Position | Result  |
|----------|---------|
| 1:53     | 1:45    |
| 3:39     | 3:30    |
| 2:01     | 1:55    |
| 0:03     | 0:00    |

## Filename Prefix

The prefix is extracted from the file's title — everything before the first `.` or `-`:

| Filename                | Prefix |
|-------------------------|--------|
| `P1 - description.m4v`  | `P1`   |
| `Clip03.scene1.mp4`     | `Clip03` |

## Installation

### Requirements

- [IINA](https://iina.io) 1.4.0 or later (plugin support required)
- macOS

### Option 1: Development install (recommended for local use)

Clone the repo and symlink into IINA's plugin directory:

```bash
git clone https://github.com/AdobeTST/iina-copy-timecode.git
ln -s "$(pwd)/iina-copy-timecode/CopyTimecode.iinaplugin" \
  ~/Library/Application\ Support/com.colliderli.iina/plugins/CopyTimecode.iinaplugin-dev
```

Restart IINA. The plugin appears in **Settings > Plugins**.

### Option 2: Manual copy

Copy the `CopyTimecode.iinaplugin` folder to:

```
~/Library/Application Support/com.colliderli.iina/plugins/
```

Then register it in IINA's preferences:

```bash
defaults write com.colliderli.iina "PluginEnabled.com.custom.copy-timecode" -bool true
```

Restart IINA.

### Enabling permissions

On first load IINA may ask you to grant the plugin these permissions:

- **Show OSD** — for the on-screen confirmation message
- **File System** — for clipboard access via `pbcopy`

## Usage

1. Open any video in IINA
2. Press **t** at the moment you want to mark
3. Playback pauses, the rounded timecode is copied, and an OSD message confirms what was copied
4. Paste anywhere with **Cmd+V**

## License

MIT
