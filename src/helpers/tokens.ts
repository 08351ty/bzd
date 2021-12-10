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
    address: "0x0630f97C8938051a44b0A64e9D4d484295393Fe4",
    img: DaiEIcon,
    decimals: 18,
};

export const usdc: IToken = {
    name: "USDC.e",
    address: "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b",
    img: UsdcEIcon,
    decimals: 6,
};
export default [eth, dai, usdc];
