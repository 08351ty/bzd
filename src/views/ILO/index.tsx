import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, InputAdornment, OutlinedInput, Zoom } from "@material-ui/core";
import { trim } from "../../helpers";
import { changeStake, changeApproval } from "../../store/slices/stake-thunk";
import "./ILO.scss";
import { useWeb3Context } from "../../hooks";
import { IPendingTxn, isPendingTxn, txnButtonText } from "../../store/slices/pending-txns-slice";
import { Skeleton } from "@material-ui/lab";
import { IReduxState } from "../../store/slices/state.interface";
import { messages } from "../../constants/messages";
import classnames from "classnames";
import { warning } from "../../store/slices/messages-slice";
import useTokens, { IAllTokenData } from "../../hooks/tokens";
import { dai, eth } from "../../helpers/tokens";

function ILO() {
    const dispatch = useDispatch();
    const { provider, address, connect, chainID, checkWrongNetwork } = useWeb3Context();

    // const { tokens } = useTokens();
    // let defaultToken = tokens.find(token => token.name === eth.name);
    // const [token, setToken] = useState<IAllTokenData>(defaultToken);

    const [view, setView] = useState(0);
    const [quantity, setQuantity] = useState<string>("");

    const isAppLoading = useSelector<IReduxState, boolean>(state => state.app.loading);

    const daiBalance = useSelector<IReduxState, string>(state => {
        return state.account.balances && state.account.balances.dai;
    });

    const pendingTransactions = useSelector<IReduxState, IPendingTxn[]>(state => {
        return state.pendingTransactions;
    });

    const hasAllowance = useCallback(() => {
        return false;
    }, [false]);

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

    const onChangeStake = async (action: string) => {
        if (await checkWrongNetwork()) return;
        if (quantity === "" || parseFloat(quantity) === 0) {
            dispatch(warning({ text: action === "stake" ? messages.before_stake : messages.before_unstake }));
        } else {
            await dispatch(changeStake({ address, action, value: String(quantity), provider, networkID: chainID }));
            setQuantity("");
        }
    };

    const changeView = (newView: number) => () => {
        setView(newView);
        setQuantity("");
    };

    return (
        <div className="ILO-view">
            <Zoom in={true}>
                <div className="ILO-card">
                    <Grid className="ILO-card-grid" container direction="column" spacing={2}>
                        <Grid item>
                            <div className="ILO-card-header">
                                <p className="ILO-card-header-title">Initial Liquidity Offering (ILO) Σ( ° △ °|||)</p>
                                <p className="ILO-card-description">Deposit DAI into the ILO to receive a portion of the sale's IDK, the buzhiDAO reserve currency token.</p>
                            </div>
                        </Grid>

                        <Grid item>
                            <div className="ILO-card-metrics">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                        <div className="ILO-card-offering">
                                            <p className="ILO-card-metrics-title">Total Offering</p>
                                            <p className="ILO-card-metrics-value">1,000,000 IDK</p>
                                        </div>
                                    </Grid>

                                    <Grid item xs={6} sm={4} md={4} lg={4}>
                                        <div className="ILO-card-init-price">
                                            <p className="ILO-card-metrics-title">Initial Price</p>
                                            <p className="ILO-card-metrics-value">0.05 DAI</p>
                                        </div>
                                    </Grid>

                                    <Grid item xs={6} sm={4} md={4} lg={4}>
                                        <div className="ILO-card-min-DAI">
                                            <p className="ILO-card-metrics-title">Minimum total DAI</p>
                                            <p className="ILO-card-metrics-value">50,000 DAI</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={2} lg={2}></Grid>
                                    <Grid item xs={4} sm={4} md={4} lg={4}>
                                        <div className="ILO-card-total-deposit">
                                            <p className="ILO-card-metrics-title">Total Deposit</p>
                                            <p className="ILO-card-metrics-value">510,347 DAI</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} sm={4} md={4} lg={4}>
                                        <div className="ILO-card-time-remain">
                                            <p className="ILO-card-metrics-title">Time Remaining</p>
                                            <p className="ILO-card-metrics-value">15 Days, 23:35:06</p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={2} sm={2} md={2} lg={2}></Grid>
                                </Grid>
                            </div>
                        </Grid>

                        <div className="ILO-card-area">
                            {!address && (
                                <div className="ILO-card-wallet-notification">
                                    <div className="ILO-card-wallet-connect-btn" onClick={connect}>
                                        <p>Connect Wallet</p>
                                    </div>
                                    <p className="ILO-card-wallet-desc-text">Connect your wallet to participate in the IDK ILO</p>
                                </div>
                            )}
                            {address && (
                                <div>
                                    <div className="ILO-card-action-area">
                                        <div className="ILO-card-action-stage-btns-wrap">
                                            <div onClick={changeView(0)} className={classnames("ILO-card-action-stage-btn", { active: !view })}>
                                                <p>Deposit DAI</p>
                                            </div>
                                            <div onClick={changeView(1)} className={classnames("ILO-card-action-stage-btn", { active: view })}>
                                                <p>Withdraw IDK</p>
                                            </div>
                                        </div>

                                        <div className="ILO-card-action-row">
                                            <OutlinedInput
                                                type="number"
                                                placeholder="Amount"
                                                className="ILO-card-action-input"
                                                value={quantity}
                                                onChange={e => setQuantity(e.target.value)}
                                                labelWidth={0}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <div onClick={setMax} className="ILO-card-action-input-btn">
                                                            <p>Max</p>
                                                        </div>
                                                    </InputAdornment>
                                                }
                                            />

                                            {view === 0 && (
                                                <div className="ILO-card-tab-panel">
                                                    {address && hasAllowance() ? (
                                                        <div
                                                            className="ILO-card-tab-panel-btn"
                                                            onClick={() => {
                                                                if (isPendingTxn(pendingTransactions, "staking")) return;
                                                                onChangeStake("stake");
                                                            }}
                                                        >
                                                            <p>{txnButtonText(pendingTransactions, "staking", "Stake IDK")}</p>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="ILO-card-tab-panel-btn"
                                                            onClick={() => {
                                                                if (isPendingTxn(pendingTransactions, "approve_staking")) return;
                                                                onSeekApproval("idk");
                                                            }}
                                                        >
                                                            <p>{txnButtonText(pendingTransactions, "approve_staking", "Approve")}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            {view === 1 && (
                                                <div className="ILO-card-tab-panel">
                                                    <div
                                                        className="ILO-card-tab-panel-btn"
                                                        onClick={() => {
                                                            if (isPendingTxn(pendingTransactions, "unstaking")) return;
                                                            onChangeStake("unstake");
                                                        }}
                                                    >
                                                        <p>{txnButtonText(pendingTransactions, "unstaking", "Withdraw IDK")}</p>
                                                        {/* TODO: pending tx + unstake */}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="ILO-card-action-help-text">
                                            {address && (!hasAllowance() && view === 0) && (
                                                <p>
                                                    Note: The "Approve" transaction is only needed when depositing for the first time; subsequent deposit only
                                                    requires you to perform the "Withdraw" transaction.
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="ILO-user-data">
                                        <div className="data-row">
                                            <p className="data-row-name">Your DAI Balance</p>
                                            <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>{daiBalance} DAI</>}</p>
                                        </div>

                                        <div className="data-row">
                                            <p className="data-row-name">Your Deposited DAI</p>
                                            <p className="data-row-value">{isAppLoading ? <Skeleton width="80px" /> : <>{daiBalance} DAI</>}</p> 
                                            {/* TODO: change to deposited dai */}
                                        </div>

                                        <div className="data-row">
                                            <p className="data-row-name">Estimated IDK Share (at current deposit level)</p>
                                            <p className="data-row-value">100 IDK</p>
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

export default ILO;
