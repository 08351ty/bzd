import { JsonRpcProvider } from "@ethersproject/providers";
import { utils } from "ethers";

const GAS = "1";

export const getGasPrice = async (provider: JsonRpcProvider) => {
    const gasPrice = await provider.getGasPrice();
    const convertGas = utils.parseUnits(GAS, "gwei");
    console.log("Current gas price:", gasPrice.toString());
    return gasPrice.add(convertGas);
};
