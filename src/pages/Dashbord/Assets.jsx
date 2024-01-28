import React, { useContext, useEffect, useState } from "react";
import SallContext from "../../../context/SallContext";
import Dashbord from "./Dashbord";
import { useProvider, useSigner } from "wagmi";
import { ethers } from "ethers";
const Assets = () => {

  const [balance, setBalance] = useState();
  const cntxt = useContext(SallContext);
  const provider = useProvider();
  const signer = useSigner();

  const _balance_bnb = async () => {
    const txbalance = await provider.getBalance(process.env.contract_address);
    console.log(txbalance.toString());
    setBalance(txbalance)
  }

  useEffect(() => {
    _balance_bnb()
  }, [provider,signer]);

  return (
    <Dashbord>
      <div className="assetsDashbord">
        <div className="assetsDashbordHeader">
          <h5>Assets</h5>
          <span className="tokenLabel">Tokens</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Asset</th>
              <th>balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="firstCell">
                <div className="ellipse"></div>
                {"BNB"}
              </td>
              <td>
                {balance && ethers.utils.formatUnits(
                  balance.toString(),
                  "ether"
                )}  BNB
              </td>
            </tr>

            {cntxt.token ? (
              cntxt.token.map((data) => {
                return (
                  <>
                    <tr>
                      <td className="firstCell">
                        <div className="ellipse"></div>
                        {data.symbol}
                      </td>
                      <td>
                        {ethers.utils.formatUnits(
                          data.balance.toString(),
                          "ether"
                        )}{" "}
                        {data.symbol}
                      </td>
                    </tr>
                  </>
                );
              })
            ) : (
              <>
                <tr>
                <td className="firstCell">
                  <div className="ellipse"></div>Waiting
                </td>
                <td>Waiting</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </Dashbord>
  );
};

export default Assets;
