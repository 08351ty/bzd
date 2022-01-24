import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, InputAdornment, OutlinedInput, Zoom } from "@material-ui/core";
import { trim } from "../../helpers";
import { changeStake, changeApproval } from "../../store/slices/stake-thunk";
import "./IDO.scss";
import { useWeb3Context } from "../../hooks";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../store/slices/pending-txns-slice";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { messages } from "../../constants/messages";
import classnames from "classnames";
import { warning } from "../../store/slices/messages-slice";
import useTokens, { IAllTokenData } from "../../hooks/tokens";
import { dai, eth } from "../../helpers/tokens";
import { initial } from "lodash";

function IDO() {
    const dispatch = useDispatch();
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();

    // const { tokens } = useTokens();
    // let defaultToken = tokens.find(token => token.name === eth.name);
    // const [token, setToken] = useState<IAllTokenData>(defaultToken);

    const [view, setView] = useState(0);
    const [quantity, setQuantity] = useState<string>("");

    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);

    const globalMaxDeposit = useSelector<IReduxState, number>(state => {
        return state.app.maxGlobalDeposit;
    });
    const idkPrice = useSelector<IReduxState, number>(state => {
        return state.app.mintTokenPrice;
    });
    const accountMaxDeposit = useSelector<IReduxState, number>(state => {
        return state.app.maxUserDeposit;
    });
    const globalDaiDeposited = useSelector<IReduxState, number>(state => {
        return state.app.totalGlobalDeposit;
    });

    const totalOffering = globalMaxDeposit / idkPrice;
    
    const daiBalance = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.dai;
    });
    const depositedDai = 1000
    const receivedIdk = depositedDai / idkPrice

    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    const hasAllowance = useCallback(() => {
        return true;
    }, [true]);

    const setMax = () => {
        if (view === 0) {
            setQuantity(daiBalance);
        } else {
            setQuantity(daiBalance); //TODO: change to idk claimed
        }
    };

    const onSeekApproval = async (token: string) => {
        if (await checkWrongNetwork()) return;

        await dispatch(changeApproval({ address, token, provider, networkID: chainID }));
    };

    return (
        <div className="IDO-view">
            <Zoom in={true}>
                <div className="IDO-card">
                    <Grid className="IDO-card-grid" container direction="column" spacing={2}>
                        <Grid item>
                            <div className="IDO-card-header">
                                <p className="IDO-card-header-title">Initial Dex Offering (IDO) Σ( ° △ °|||)</p>
                                <p className="IDO-card-description">Deposit DAI to participate in the the IDO, the buzhiDAO reserve currency token.</p>
                            </div>
                        </Grid>

                        <Grid item>
                            <div className="IDO-card-metrics">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                        <div className="IDO-card-offering">
                                            <p className="IDO-card-metrics-title">Total IDK Offering</p>
                                            <p className="IDO-card-metrics-value">{totalOffering ? (
                                                    new Intl.NumberFormat("en-US", {
                                                        maximumFractionDigits: 0,
                                                        minimumFractionDigits: 0,
                                                    }).format(totalOffering)
                                                ) : (
                                                    <Skeleton width="150px" />
                                                )} IDK</p>
                                        </div>
                                    </Grid>


                                    <Grid item xs={6} sm={4} md={4} lg={4}>
                                        <div className="IDO-card-min-DAI">
                                            <p className="IDO-card-metrics-title">Global Max Deposit</p>
                                            <p className="IDO-card-metrics-value">{globalMaxDeposit ? (
                                                    new Intl.NumberFormat("en-US", {
                                                        maximumFractionDigits: 0,
                                                        minimumFractionDigits: 0,
                                                    }).format(globalMaxDeposit)
                                                ) : (
                                                    <Skeleton width="150px" />
                                                )} DAI</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={4} lg={4}>
                                        <div className="IDO-card-init-price">
                                            <p className="IDO-card-metrics-title">IDK Sale Price</p>
                                            <p className="IDO-card-metrics-value">{idkPrice ? (idkPrice) : (<Skeleton width="150px" />)} DAI</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={2} lg={2}></Grid>
                                    <Grid item xs={4} sm={4} md={4} lg={4}>
                                        <div className="IDO-card-total-deposit">
                                            <p className="IDO-card-metrics-title">Address Max Deposit</p>
                                            <p className="IDO-card-metrics-value">{accountMaxDeposit ? (
                                                    new Intl.NumberFormat("en-US", {
                                                        maximumFractionDigits: 0,
                                                        minimumFractionDigits: 0,
                                                    }).format(accountMaxDeposit)
                                                ) : (
                                                    <Skeleton width="150px" />
                                                )} DAI</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={4} lg={4}>
                                        <div className="IDO-card-total-deposit">
                                            <p className="IDO-card-metrics-title">Global DAI Deposited</p>
                                            <p className="IDO-card-metrics-value">{globalDaiDeposited ? (
                                                    new Intl.NumberFormat("en-US", {
                                                        maximumFractionDigits: 0,
                                                        minimumFractionDigits: 0,
                                                    }).format(globalDaiDeposited)
                                                ) : (
                                                    <Skeleton width="150px" />
                                                )} DAI</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={2} lg={2}></Grid>
                                </Grid>
                            </div>
                        </Grid>

                        <div className="IDO-card-area">
                            {!address && (
                                <div className="IDO-card-wallet-notification">
                                    <div className="IDO-card-wallet-connect-btn" onClick={connect}>
                                        <p>Connect Wallet</p>
                                    </div>
                                    <p className="IDO-card-wallet-desc-text">Connect your wallet to participate in the IDK IDO</p>
                                </div>
                            )}
                            {address && (
                                <div>
                                    <div className="IDO-card-action-area">
                                        <div className="IDO-card-action-stage-btns-wrap">
                                            <div className={classnames("IDO-card-action-stage-btn", { active: !view })}>
                                                <p>Deposit DAI</p>
                                            </div>
                                        </div>

                                        <div className="IDO-card-action-row">
                                            <OutlinedInput
                                                type="number"
                                                placeholder="Amount"
                                                className="IDO-card-action-input"
                                                value={quantity}
                                                onChange={e => setQuantity(e.target.value)}
                                                labelWidth={0}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <div onClick={setMax} className="IDO-card-action-input-btn">
                                                            <p>Max</p>
                                                        </div>
                                                    </InputAdornment>
                                                    }
                                            />

                                                <div className="IDO-card-tab-panel">
                                                    {address && hasAllowance() ? (
                                                        <div
                                                            className="IDO-card-tab-panel-btn"
                                                            onClick={() => {
                                                                if (isPendingTxn(pendingTransactions, "depositing")) return;
                                                            }}
                                                        >
                                                            <p>{txnButtonText(pendingTransactions, "depositing", "Deposit DAI")}</p>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="IDO-card-tab-panel-btn"
                                                            onClick={() => {
                                                                if (isPendingTxn(pendingTransactions, "approve_depositing")) return;
                                                                onSeekApproval("dai");
                                                            }}
                                                            >
                                                            <p>{txnButtonText(pendingTransactions, "approve_depositing", "Approve")}</p>
                                                        </div>
                                                    )}
                                                </div>

                                        </div>

                                        <div className="IDO-card-action-help-text">
                                            {address && (!hasAllowance() && view === 0) && (
                                                <p>
                                                    Note: The "Approve" transaction is only needed when depositing for the first time; subsequent deposit only
                                                    requires you to perform the "Deposit" transaction.
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="IDO-user-data">
                                        <div className="data-row">
                                            <p className="data-row-name">Your DAI Balance</p>
                                            <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>{new Intl.NumberFormat("en-US", {
                                                        maximumFractionDigits: 0,
                                                        minimumFractionDigits: 0,
                                                    }).format(Number(daiBalance))} DAI</>}</p>
                                        </div>

                                        <div className="data-row">
                                            <p className="data-row-name">Your Deposited DAI</p>
                                            <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>{new Intl.NumberFormat("en-US", {
                                                        maximumFractionDigits: 0,
                                                        minimumFractionDigits: 0,
                                                    }).format(Number(depositedDai))} DAI</>}</p> 
                                            {/* TODO: change to deposited dai */}
                                        </div>

                                        <div className="data-row">
                                            <p className="data-row-name">Your Received IDK</p>
                                            <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>{new Intl.NumberFormat("en-US", {
                                                        maximumFractionDigits: 0,
                                                        minimumFractionDigits: 0,
                                                    }).format(Number(receivedIdk))} IDK</>}</p>
                                            {/* TODO: change to received idk */}
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>
                    </Grid>
                </div>
            </Zoom>
        </div>
    );
}

export default IDO;
