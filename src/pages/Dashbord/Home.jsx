import React, { useContext, useEffect, useState } from "react";
import SallContext from "../../../context/SallContext";
import OverviewCard from "../Components/OverviewCard";
import Dashbord from "./Dashbord";
import Transections from "./Transactions";

const Home = () => {
  const cntxt = useContext(SallContext);
  const [tx_incomplete,setTx_incomplete] =  useState();
  const [tx_escorw,setTx_escrow] =  useState();

  useEffect(()=>{
    setTx_incomplete(cntxt.transection);
    setTx_escrow(cntxt.escrow);
  },[cntxt]);

  return (
    <Dashbord>
      <div className="overviewPear">
       <p>Overview</p>
      </div>

      <div className="dashbordHome">
        <div className="overview">
   
          <OverviewCard escrow={tx_escorw} />
        </div>
        
      {/* Transaction Queue  */}
        <div className="transectionQueue">
          {tx_incomplete &&
            <p>{`Transaction queue (${tx_incomplete[0].length})`}</p>
          }
          <Transections />
        </div>
      </div>
    </Dashbord>
  );
};

export default Home;
