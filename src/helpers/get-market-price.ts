import { ethers } from "ethers";
import { LpReserveContract } from "../abi";
import { Networks } from "../constants/blockchain";

export async function getMarketPrice(networkID: Networks, provider: ethers.Signer | ethers.providers.Provider): Promise<number> {
    const marketPrice = 46 * 10 ** 9;
    return marketPrice;
}
