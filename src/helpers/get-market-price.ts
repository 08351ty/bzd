import { ethers } from "ethers";
import { Networks } from "../constants/blockchain";
//import { usdcIDK } from "../helpers/bond";
import { LpReserveContract } from "../abi";

export async function getMarketPrice(networkID: Networks, provider: ethers.Signer | ethers.providers.Provider): Promise<number> {
    //const marketPrice = 2 * 10 ** 9;
    const usdcIDKAddress = "0x534eb26ea2aB30dCB292D3283eC33921369085e0";
    const pairContract = new ethers.Contract(usdcIDKAddress, LpReserveContract, provider);
    const reserves = await pairContract.getReserves();
    const marketPrice = ((reserves[1] * 1000) / reserves[0]) * 10 ** 9;
    return marketPrice;
}
