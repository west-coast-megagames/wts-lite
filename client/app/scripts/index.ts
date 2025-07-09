import { flagIcons, type T } from "~/img/flags";

export function getFlag(team: T) {
    if (team in flagIcons) return flagIcons[team]
    else return flagIcons["af"]
}