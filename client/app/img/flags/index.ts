import ad from "./ad.svg";
import ae from "./ae.svg";
import af from "./af.svg";
import ag from "./ag.svg";
import us from "./us.svg";

export type FlagObject = {
    ad: string,
    ae: string,
    af: string,
    ag: string,
    us: string,
}

export type T = keyof FlagObject

export const flagIcons: FlagObject = {
    ad, ae, af, ag, us
} 