const { core, input, menu, utils, console } = iina;

function roundTimecode(positionSeconds) {
  const rounded = Math.floor((positionSeconds - 5) / 5) * 5;
  return Math.max(0, rounded);
}

function formatTimecode(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function extractPrefix(title) {
  const match = title.match(/^([^.\-]+)/);
  const prefix = match ? match[1].trim() : title.trim();
  return prefix || title.trim();
}

async function copyToClipboard(text) {
  const escaped = text.replace(/'/g, "'\\''");
  await utils.exec("/bin/sh", ["-c", `printf '%s' '${escaped}' | /usr/bin/pbcopy`]);
}

async function copyTimecode() {
  if (core.status.idle) {
    core.osd("No file playing");
    return;
  }

  core.pause();

  const position = core.status.position;
  const rounded = roundTimecode(position);
  const timecode = formatTimecode(rounded);

  const title = core.status.title || "";
  const prefix = extractPrefix(title);

  const text = `${prefix} at ${timecode}`;

  await copyToClipboard(text);
  core.osd(`Copied: ${text}`);
}

input.onKeyDown("t", () => {
  copyTimecode();
  return true;
}, input.PRIORITY_HIGH);

menu.addItem(menu.item("Copy Timecode", copyTimecode));
