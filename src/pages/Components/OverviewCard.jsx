import Image from "next/image";
import React, { useContext } from "react";
import SallContext from "../../../context/SallContext";
import Link from "next/link";

const OverviewCard = ({ escrow }) => {
  const cntxt = useContext(SallContext);

  return (
    <div className="overviewCard">
      <div className="headerOverviewCard">
        <div className="overviewCardAddress">
          <Image src="/elipili.svg" height="31" width="31" alt="" />
          <p>
            bnb:
            {escrow
              ? escrow[0].slice(0, 4) + "..." + escrow[0].slice(-4)
              : "Waiting . . ."}
          </p>
        </div>
        <p className="overviewCardChainName">bNB smart cain</p>
      </div>
      <div className="fotterOverviewCard">
        <div className="tokens">
          <p>tokens</p>
          <p>{cntxt.token ? cntxt.token.length : "0"}</p>
        </div>
        <Link href={`/Dashbord/Assets`}>
        <button 
        >VIEW ASSETS</button>
        </Link>
      </div>
    </div>
  );
};

export default OverviewCard;
