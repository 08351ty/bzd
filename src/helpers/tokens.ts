import DaiEIcon from "../assets/tokens/DAI.e.png";
import UsdcEIcon from "../assets/tokens/USDC.e.png";
import WethEIcon from "../assets/tokens/WETH.e.png";

export interface IToken {
    name: string;
    address: string;
    img: string;
    isEth?: boolean;
    decimals: number;
}
export const eth: IToken = {
    name: "ETH",
    address: "0xF5B97a4860c1D81A1e915C40EcCB5E4a5E6b8309",
    img: WethEIcon,
    isEth: true,
    decimals: 18,
};

export const dai: IToken = {
    name: "DAI",
    address: "0xaef96C762ff66f1B118681FA83B8668855B7C3e4",
    img: DaiEIcon,
    decimals: 18,
};

export const usdc: IToken = {
    name: "USDC.e",
    address: "0xb48805f3e1c91CEC3FF5C68FFfa5402f93a903e7",
    img: UsdcEIcon,
    decimals: 6,
};
export default [eth, dai, usdc];
