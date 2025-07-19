import { flagIcons, type T } from "~/img/flags";

export function getFlag(team: T) {
    if (team in flagIcons) return flagIcons[team]
    else return flagIcons["mc"]
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
        case ('aus'): return 'au' as T;
        case ('rmt'): return 'rmt' as T;
        case ('cgm'): return 'cgm' as T;
        case ('tcn'): return 'tcn' as T;
        case ('bgc'): return 'bnc' as T;
        case ('gnn'): return 'gnn' as T;
        case ('hpw'): return 'hpw' as T;
        default: return code  as T;
    }
};
export function areObjectsEqual(obj1: any, obj2: any) {
        // Handle non-object types and null
        if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
            return obj1 === obj2;
        }

        // Compare arrays
        if (Array.isArray(obj1) && Array.isArray(obj2)) {
            if (obj1.length !== obj2.length) return false;
            for (let i = 0; i < obj1.length; i++) {
                if (!areObjectsEqual(obj1[i], obj2[i])) return false;
            }
            return true;
        }

        // Compare objects
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) return false;

        for (const key of keys1) {
            if (!keys2.includes(key) || !areObjectsEqual(obj1[key], obj2[key])) {
                return false;
            }
            if (key === '_id' && obj1[key] == obj2[key]) return true;
        }
        return true;
    }