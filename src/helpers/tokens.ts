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
    address: "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea",
    img: DaiEIcon,
    decimals: 18,
};

export const usdc: IToken = {
    name: "USDC.e",
    address: "0xb0FCb474E5118F5b4568D7B4962dF6B8DBC7Ac25",
    img: UsdcEIcon,
    decimals: 6,
};
export default [eth, dai, usdc];
