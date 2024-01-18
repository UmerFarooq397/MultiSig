import React, { useContext, useEffect } from "react";
import SallContext from "../../../context/SallContext";

const ReviewTable = () => {
    const cntxt = useContext(SallContext);

    return (
        <div className="reviewDiv">
            <div className="reviewNetworkChain">
                <h5>Network</h5>
                <p>Ethereum TestNet</p>
            </div>
            <hr />
            <div className="reviewOwner">
                <h5>Owners</h5>
                {cntxt.groups.map((data, index) => {
                    return (
                        <div key={index}>
                            <p className="bigAdd">{data.address}</p>
                            <p className="smallAdd">
                                {data.address.slice(0, 6) +
                                    "..." +
                                    data.address.slice(-4)}
                            </p>
                        </div>
                    );
                })}
            </div>
            <hr />
            <div className="reviewThreshold">
                <h5>Threshold</h5>
                <p>
                    {cntxt.ownerCount} out of {cntxt.groups.length} owner(s)
                </p>
            </div>
            <hr />
            {/* <div className="reviewFess"> */}
            <div className="estNetworkFees">
                <h5>Est network fee</h5>
                <p>
                    {cntxt.estimatedPrice
                        ? cntxt.estimatedPrice + " ETH"
                        : "Waiting . . ."}
                </p>
            </div>
            <div className="platformFees">
                <h5>platform fee</h5>
                <p>~&gt; 0.001 ETH</p>
            </div>
            <p className="reviewTableWarning">
                You will have to confirm a transaction with your connected
                wallet
            </p>
            {/* </div> */}
        </div>
    );
};

export default ReviewTable;
