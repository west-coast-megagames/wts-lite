import { flagIcons, type T } from "~/img/flags";

export function getFlag(team: T) {
    if (team in flagIcons) return flagIcons[team]
    else return flagIcons["af"]
};

export function a3TOa2Converter (code: string) {
    switch (code.toLowerCase()) {
        case ('usa'): return "us" as T;
        case ('rfd'): return "ru" as T;
        case ('ind'): return 'ind' as T; // Proper code is "in" which can't be used in JS
        case ('jpn'): return 'jp' as T;
        case ('gbr'): return 'gb' as T;
        case ('fra'): return 'fr' as T;
        case ('chn'): return 'cn' as T;
        default: return code  as T;
    }
};