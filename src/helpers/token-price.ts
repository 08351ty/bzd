import axios from "axios";

const cache: { [key: string]: number } = {};

export const loadTokenPrices = async () => {
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=dai,ethereum,usd-coin,boba-network&vs_currencies=usd";
    const { data } = await axios.get(url);

    cache["ETH"] = data["ethereum"].usd;
    cache["DAI"] = data["dai"].usd;
    cache["BOBA"] = data["boba-network"].usd;
    cache["USDC"] = data["usd-coin"].usd;
};

export const getTokenPrice = (symbol: string): number => {
    return Number(cache[symbol]);
};
