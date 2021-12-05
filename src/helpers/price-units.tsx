import { SvgIcon } from "@material-ui/core";
import { ReactComponent as MimImg } from "../assets/tokens/MIM.svg";
import { IAllBondData } from "../hooks/bonds";
import { dai } from "../helpers/bond";
import { usdc } from "../helpers/bond";

export const priceUnits = (bond: IAllBondData) => {
    if (bond.name === dai.name) return <img src={bond.bondIconSvg} style={{ height: "15px", width: "15px" }} />;
    if (bond.name === usdc.name) return <img src={bond.bondIconSvg} style={{ height: "15px", width: "15px" }} />;

    return "$";
};
