import { AppBar, Toolbar, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import BuzhidaoIcon from "../../assets/icons/siu-nav-header.svg";
import MenuIcon from "../../assets/icons/hamburger.svg";
import { trim, shorten } from "../../helpers";
import { useAddress } from "../../hooks";
import NavContent from "./nav-content";
import TimeMenu from "./time-menu";
import ConnectButton from "./connect-button";
import WrapButton from "./wrap-button";
import "./header.scss";
import { DRAWER_WIDTH, TRANSITION_DURATION } from "../../constants/style";

interface IHeader {
    handleDrawerToggle: () => void;
    drawe: boolean;
}

const useStyles = makeStyles(theme => ({
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: "100%",
            padding: "20px 0 30px 0",
        },
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        background: "transparent",
        backdropFilter: "none",
        zIndex: 10,
    },
    topBar: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: TRANSITION_DURATION,
        }),
        // marginLeft: DRAWER_WIDTH,
    },
    topBarShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: TRANSITION_DURATION,
        }),
        marginLeft: 0,
    },
    firstBuffer: {
        flexGrow: 2,
    },
    secondBuffer: {
        flexGrow: 2,
    },
}));

function Header({ handleDrawerToggle, drawe }: IHeader) {
    const classes = useStyles();
    const address = useAddress();
    const isVerySmallScreen = useMediaQuery("(max-width: 400px)");
    const isWrapShow = useMediaQuery("(max-width: 480px)");

    return (
        <div className={`${classes.topBar} ${!drawe && classes.topBarShift}`}>
            <AppBar position="sticky" className={classes.appBar} elevation={0}>
                <Toolbar disableGutters className="dapp-topbar">
                    <div className="branding-header">
                        <Link href="https://google.com" target="_blank">
                            <img alt="" src={BuzhidaoIcon} />
                        </Link>

                        <div className="logo-text">
                            <p>buzhiDAO</p>

                            {address && (
                                <div className="wallet-link">
                                    <Link href={`https://blockexplorer.rinkeby.boba.network/address/${address}`} target="_blank">
                                        <p>{shorten(address)}</p>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={classes.firstBuffer} />
                    <NavContent />
                    <div className={classes.secondBuffer} />

                    <div className="dapp-topbar-btns-wrap">
                        {!isVerySmallScreen && <TimeMenu />}
                        <ConnectButton />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
