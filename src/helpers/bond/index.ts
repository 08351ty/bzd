import { Networks } from "../../constants/blockchain";
import { LPBond, CustomLPBond } from "./lp-bond";
import { StableBond, CustomBond } from "./stable-bond";

import DaiEIcon from "../../assets/tokens/DAI.e.png";
import UsdcEIcon from "../../assets/tokens/USDC.e.png";
import AvaxIcon from "../../assets/tokens/AVAX.svg";
import MimTimeIcon from "../../assets/tokens/TIME-MIM.svg";
import AvaxTimeIcon from "../../assets/tokens/TIME-AVAX.svg";

import { StableBondContract, StableReserveContract, LpBondContract, LpReserveContract } from "../../abi";

export const dai = new StableBond({
    name: "dai",
    displayName: "DAI",
    bondToken: "DAI",
    bondIconSvg: DaiEIcon,
    bondContractABI: StableBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.BOBATEST]: {
            bondAddress: "0x1811D90d13b51EbEB89D4e865e1F2dB26D256b42",
            reserveAddress: "0xADc3967dd622A2254D2c4a98bc593c620365903d",
        },
        [Networks.BOBA]: {
            bondAddress: "0x1811D90d13b51EbEB89D4e865e1F2dB26D256b42",
            reserveAddress: "0xADc3967dd622A2254D2c4a98bc593c620365903d",
        },
        [Networks.ETHRINKEBY]: {
            bondAddress: "0xF12faAD7c2f49A39710e4f220B03A40167326cB2",
            reserveAddress: "0xBDb70E68BdfF18CA57c88D57a230ecAd6FD2fB99",
        },
    },
    //tokensInStrategy: "100000000000000000000000",
});

export const usdc = new StableBond({
    name: "usdc",
    displayName: "USDC",
    bondToken: "USDC",
    bondIconSvg: UsdcEIcon,
    bondContractABI: StableBondContract,
    reserveContractAbi: StableReserveContract,
    networkAddrs: {
        [Networks.BOBATEST]: {
            bondAddress: "0xB24898De59C8E259F9742bCF2C16Fd613DCeA8F7",
            reserveAddress: "0xADc3967dd622A2254D2c4a98bc593c620365903d",
        },
        [Networks.BOBA]: {
            bondAddress: "0x1811D90d13b51EbEB89D4e865e1F2dB26D256b42",
            reserveAddress: "0x130966628846BFd36ff31a822705796e8cb8C18D",
        },
        [Networks.ETHRINKEBY]: {
            bondAddress: "0x3c6E482af25A889Ed152e251A33D91a847d10BC8",
            reserveAddress: "0xb0FCb474E5118F5b4568D7B4962dF6B8DBC7Ac25",
        },
    },
    //tokensInStrategy: "100000000000000000000000",
});
/*
export const usdcIDK = new LPBond({
    name: "usdc_idk_lp",
    displayName: "IDK-USDC LP",
    bondToken: "USDC",
    bondIconSvg: MimTimeIcon,
    bondContractABI: LpBondContract,
    reserveContractAbi: LpReserveContract,
    networkAddrs: {
        [Networks.BOBATEST]: {
            bondAddress: "0x1811D90d13b51EbEB89D4e865e1F2dB26D256b42",
            reserveAddress: "0x130966628846BFd36ff31a822705796e8cb8C18D",
        },
        [Networks.BOBA]: {
            bondAddress: "0x694738E0A438d90487b4a549b201142c1a97B556",
            reserveAddress: "0x130966628846BFd36ff31a822705796e8cb8C18D",
        },
        [Networks.ETHRINKEBY]: {
            bondAddress: "0x95863bA12CdE3024555eBFa04F54e417171A5b1f",
            reserveAddress: "0x6000eb83c2583AFD25D93cB0629D6b0a0B2F245c",
        },
    },
    lpUrl: "https://oolongswap.com/#/add/0x1A064A39054967114ECeB2Aaa56844eC6932651f/0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b",
});

//dont' need this
export const avaxTime = new CustomLPBond({
    name: "avax_time_lp",
    displayName: "TIME-AVAX LP",
    bondToken: "AVAX",
    bondIconSvg: AvaxTimeIcon,
    bondContractABI: LpBondContract,
    reserveContractAbi: LpReserveContract,
    networkAddrs: {
        [Networks.AVAX]: {
            bondAddress: "0xc26850686ce755FFb8690EA156E5A6cf03DcBDE1",
            reserveAddress: "0xf64e1c5B6E17031f5504481Ac8145F4c3eab4917",
        },
        [Networks.BOBATEST]: {
            bondAddress: "0x1811D90d13b51EbEB89D4e865e1F2dB26D256b42",
            reserveAddress: "0x130966628846BFd36ff31a822705796e8cb8C18D",
        },
        [Networks.BOBA]: {
            bondAddress: "0x694738E0A438d90487b4a549b201142c1a97B556",
            reserveAddress: "0x130966628846BFd36ff31a822705796e8cb8C18D",
        },
    },
    lpUrl: "https://www.traderjoexyz.com/#/pool/AVAX/0xb54f16fB19478766A268F172C9480f8da1a7c9C3",
});
*/
export default [dai, usdc];
