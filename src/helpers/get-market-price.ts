import { ethers } from "ethers";
import { Networks } from "../constants/blockchain";
//import { usdcIDK } from "../helpers/bond";
import { LpReserveContract } from "../abi";

export async function getMarketPrice(networkID: Networks, provider: ethers.Signer | ethers.providers.Provider): Promise<number> {
    //const marketPrice = 2 * 10 ** 9;
    const usdcIDKAddress = "0x9d13a243082ac41b373f4a89da85b9dd69854f1e";
    const pairContract = new ethers.Contract(usdcIDKAddress, LpReserveContract, provider);
    const reserves = await pairContract.getReserves();
    const marketPrice = reserves[1] / reserves[0];
    return marketPrice;
}
