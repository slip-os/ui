import config from '../config.json';

const defaults = {
    wallpaperIndex: 0,
    themeIndex: 0,
}

let options = localStorage.getItem("options");

if (options) {
    try {
        options = JSON.parse(options);
    } catch (e) {
        options = null;
    }
}
if (!options) {
    options = defaults;
}

const theme = config.themes[options.themeIndex];
const wallpaper = config.wallpapers[options.wallpaperIndex];

export default {
    options,
    theme,
    wallpaper,
};
