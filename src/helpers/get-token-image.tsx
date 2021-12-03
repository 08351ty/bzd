import IDKImg from "../assets/tokens/IDK.svg";
import sIDKImg from "../assets/tokens/sIDK.png";

function toUrl(tokenPath: string): string {
    const host = window.location.origin;
    return `${host}/${tokenPath}`;
}

export function getTokenUrl(name: string) {
    if (name === "idk") {
        return toUrl(IDKImg);
    }

    if (name === "sidk") {
        return toUrl(sIDKImg);
    }

    throw Error(`Token url doesn't support: ${name}`);
}
