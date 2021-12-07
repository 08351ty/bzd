import AvaxIcon from "../assets/tokens/AVAX.svg";
import DaiEIcon from "../assets/tokens/DAI.e.png";
import FraxIcon from "../assets/tokens/FRAX.png";
import UsdcEIcon from "../assets/tokens/USDC.e.png";
import UsdtEIcon from "../assets/tokens/USDT.e.png";
import WavaxIcon from "../assets/tokens/WAVAX.png";
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

const frax: IToken = {
    name: "FRAX",
    address: "0x6FF9c8FF8F0B6a0763a3030540c21aFC721A9148",
    img: FraxIcon,
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
    address: "0xB24898De59C8E259F9742bCF2C16Fd613DCeA8F7",
    img: UsdcEIcon,
    decimals: 6,
};

const usdt: IToken = {
    name: "USDT.e",
    address: "0x9d0364c866A73e34649869525CD7576080259A42",
    img: UsdtEIcon,
    decimals: 6,
};

export const wavax: IToken = {
    name: "WAVAX",
    address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
    img: WavaxIcon,
    decimals: 18,
};

const weth: IToken = {
    name: "WETH.e",
    address: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
    img: WethEIcon,
    decimals: 18,
};

export default [eth, frax, dai, usdc, usdt, wavax, weth];
