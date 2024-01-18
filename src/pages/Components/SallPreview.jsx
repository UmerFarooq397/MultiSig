import React, { useContext } from "react";
import sallContext from "../../../context/SallContext";
import Image from "next/image";

const SallPreview = () => {
    const a = useContext(sallContext);

    return (
        <div className="sallPreview">
            <Image src="Union.svg" alt="" width={21} height={18} />
            <p>Your Sall Preview</p>
            <div className="walletDetails">
                <p>Wallet</p>
                <div className="address">
                    <Image src="metamask.svg" alt="" width={40} height={40} />
                    <div className="addressDetails">
                        <p className="chainName">
                            Metamask @{" "}
                            {a.signer
                                ? a.provider.chains[0].nativeCurrency.name
                                : "unknown"}
                        </p>
                        <p className="chainAddress">
                            {a.signer
                                ? a.provider.chains[0].nativeCurrency.symbol
                                : "unknown"}
                            :{" "}
                            {a.signer
                                ? a.signer._address.slice(0, 4) +
                                  "..." +
                                  a.signer._address.slice(-4)
                                : "unknown"}
                        </p>
                    </div>
                </div>
            </div>
            <div className="netWorkDetails">
                <p>Network</p>
                <p className="networkName">
                    {a.signer
                        ? a.provider.chains[0].nativeCurrency.name
                        : "unknown"}
                </p>
            </div>
            {a.step === 2 ? (
                <div className="nameDetails">
                    <p>Name</p>
                    <p className="chainName">{a.name}</p>
                </div>
            ) : null}
        </div>
    );
};

export default SallPreview;
