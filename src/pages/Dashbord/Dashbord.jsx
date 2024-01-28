import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState,useRef } from "react";
import SallContext from "../../../context/SallContext";
import Layout from "../Components/Layout";
import { Icon } from '@iconify/react';
import { ethers } from "ethers";
import {useProvider ,useSigner, useAccount } from "wagmi";
import TranABI from "./ABI.json";
import ABI from "../../../ABI.json";
import ERC20abi from "./ERC20.json";

import { MdClose } from "react-icons/md";
import axios from "axios";

const Dashbord = ({ children }) => {
  const provider = useProvider();

  const cntxt = useContext(SallContext);
  const router = useRouter();
  const [form, setForm] = useState(1);
  const [amount, setAmount] = useState(0);
  const [depositeAmount, setdepositeAmount] = useState(0);
  const [depositeaddr, setdepositeaddr] = useState("");
  const [assets, setAsstes] = useState("0x0000000000000000000000000000000000000000");
  const [estimate, setEstimate] = useState(0);
  const [despositeestimate, setDepositeEstimate] = useState(0);
  const [popup, setPopup] = useState(false);
  const [popupDeposite, setPopupDeposite] = useState(false);
  const [escrow, setEscrow] = useState();
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const contractAddress = process.env.contract_address;
  const contractABI = TranABI;
  const contract = new ethers.Contract(contractAddress, ABI, signer);
  async function getBNBBalance() {
    try {
      const res = await provider.getBalance(cntxt.escrow[0]);
      const formattedBalance = ethers.utils.formatEther(res);
      console.log("TESTAESDFAFa", formattedBalance);
      cntxt.setBalance(formattedBalance);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  const withdrawReq = async () => {

      const txbalance = await provider.getBalance(process.env.contract_address);
      console.log("tesfdaa", ethers.utils.formatUnits(
        txbalance.toString(),
        "ether"
      ));
    if(amount) {
      const transectionContract = new ethers.Contract(
        cntxt.escrow[0],
        TranABI,
        signer
      );
  
      
      const resName = await transectionContract.escrowName();
      const amountWei = ethers.utils.parseUnits(amount.toString(), "ether");
  
      const estimateRes = await transectionContract.estimateGas.withdrawReq(
        amountWei,
        assets
      );
  
      setEstimate(ethers.utils.formatUnits(estimateRes.toString(), "ether"));
      setForm(2);
    }
    else {
      alert("Please enter amount");
    }
  };

  const Depositestimate = async () =>{
    if (depositeaddr) {
      const transectionContract = new ethers.Contract(
        cntxt.escrow[0],
        TranABI,
        signer
      );
      const erc20 = new ethers.Contract(
        depositeaddr,
        ERC20abi,
        signer
      );
      
      const amountWei = ethers.utils.parseUnits(depositeAmount.toString(), "ether");
      const approved = await erc20.approve(
        cntxt.escrow[0],
        amountWei
      );
      approved.wait();
      const estimateRes = await transectionContract.estimateGas.depositeBEP20(
        amountWei,
        depositeaddr
      );
  
      setDepositeEstimate(ethers.utils.formatUnits(estimateRes.toString(), "ether"));
      setForm(2);
    }
    else {
      alert("Please fill the depositor address.");
    }
    
  }

  const Deposite = async () =>{
    if (depositeaddr) {
      const transectionContract = new ethers.Contract(
        cntxt.escrow[0],
        TranABI,
        signer
      );
  
      const amountWei = ethers.utils.parseUnits(depositeAmount.toString(), "ether");
  
      const tx = await transectionContract.depositeBEP20(
        amountWei,
        depositeaddr
      );
  
      tx.wait();
  
      setPopupDeposite(false);
    }
    else {
      alert("Please fill the depositor address.");
    }
  }

  const withdrawReqAfterEstimate = async () => {
    const transectionContract = new ethers.Contract(
      cntxt.escrow[0],
      TranABI,
      signer
    );

    const amountWei = ethers.utils.parseUnits(amount.toString(), "ether");


    const tx = await transectionContract.withdrawReq(
      amountWei,
      assets
    );

    tx.wait();
    console.log("Transaction:::::", tx);
    setPopup(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (signer) {
          const res = await contract.showMyEscrow();
          cntxt.setEscrow(res);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [cntxt.setEscrow, signer]);

  useEffect(() => {
    if (cntxt.escrow) {
      const getToken = async () => {
        const res = await axios
          .get(
            `https://deep-index.moralis.io/api/v2/${cntxt.escrow[0]}/erc20?chain=${process.env.chain_name}`,
            {
              headers: {
                accept: "application/json",
                "X-API-Key": process.env.moralisKey,
              },
            }
          )
          .then((responce) => {
            cntxt.setToken(responce.data);
          });
      };

      getToken();
      inCompleteTransection();
    }
  }, [cntxt.escrow, cntxt.setToken,assets]);

  const inCompleteTransection = async () => {
    if (cntxt.escrow[0]) {
      const contract = new ethers.Contract(
        cntxt.escrow[0],
        contractABI,
        signer
      );
      const thresholdRes = await contract.minthreshold();
      cntxt.setMinThreshold(thresholdRes);
      const res = await contract.ShowIncompleteReq();
      cntxt.setTransection(res);
    }
  };

  return (
    <>
        {popupDeposite === true ? (
        <div className="popup">
          <div className="popupContainer">
            <div className="popupHeader">
              <p>Deposit Token</p>
              <button onClick={() => setPopupDeposite(false)}>
                <MdClose />
              </button>
            </div>

            <div className="popupContent">
              <p className="popupContentFirstP">Deposite from</p>
              <div className="reciptDetails">
                <Image width="31" height="31" src="/87.png" alt="" />
                <div className="details">
                  <p>{cntxt.name}</p>
                  <div>
                    <span className="font-bold">BNB:</span>
                    {address}
                  </div>
                </div>
              </div>
              <div className="newTransectionInput">
                <form action="">
                  {form === 1 ? (
                    <>
                      <input
                        required
                        type="text"
                        placeholder="Token Address"
                        onChange={(e) => setdepositeaddr(e.target.value)}
                      />
                      <input
                        required
                        type="text"
                        placeholder="Amount *"
                        onChange={(e) => setdepositeAmount(e.target.value)}
                      />
                    </>
                  ) : (
                    <div className="estimatedPrice">
                      <p>Estimated fee</p>
                      <p>{despositeestimate} BNB</p>
                    </div>
                  )}
                </form>
              </div>
            </div>

            <div className="popupFooter">
              <button
                className="cancel"
                onClick={form === 2 ? () => setForm(1) : () => setPopupDeposite(false)}
              >
                {form === 1 ? "Cancel" : "Back"}
              </button>
              <button
                className="next"
                onClick={() => {
                  form === 1
                    ? Depositestimate()
                    : Deposite();
                }}
              >
                {form === 1 ? "Next" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {popup === true ? (
        <div className="popup">
          <div className="popupContainer">
            <div className="popupHeader">
              <p>Send Tokens</p>
              <button onClick={() => setPopup(false)}>
                <MdClose />
              </button>
            </div>

            <div className="popupContent">
              <p className="popupContentFirstP">Sending from</p>
              <div className="reciptDetails">
                <Image width="31" height="31" src="/87.png" alt="" />
                <div className="details">
                  <p>{cntxt.name}</p>
                  <div>
                    <span className="font-bold">BNB:</span>
                    {cntxt.escrow[0]}
                  </div>
                </div>
              </div>
              <div className="newTransectionInput">
                <form action="">
                  {form === 1 ? (
                    <>
                      <select
                        required
                        type="text"
                        placeholder="Select an assets *"
                        onChange={(e) => setAsstes(e.target.value)}
                      >
                        <option value="0x0000000000000000000000000000000000000000">
                          BNB
                        </option>
                        {cntxt.token ? (
                          cntxt.token.map((data,i) => {
                            return (
                              <option value={data.token_address}
                               key={i}
                               >
                                {data.symbol} :{" "}
                                {ethers.utils.formatUnits(
                                  data.balance.toString(),
                                  "ether"
                                )}
                              </option>
                            );
                          })
                        ) : (
                          <option>Waiting</option>
                        )}
                      </select>
                      <input
                        required
                        type="text"
                        placeholder="Amount *"
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </>
                  ) : (
                    <div className="estimatedPrice">
                      <p>Estimated fee</p>
                      <p>{estimate} BNB</p>
                    </div>
                  )}
                </form>
              </div>
            </div>

            <div className="popupFooter">
              <button
                className="cancel"
                onClick={form === 2 ? () => setForm(1) : () => setPopup(false)}
              >
                {form === 1 ? "Cancel" : "Back"}
              </button>
              <button
                className="next"
                onClick={() => {
                  if(form == 1){ withdrawReq();}
                  else {withdrawReqAfterEstimate();}
                }}
              >
                {form === 1 ? "Next" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <Layout>
        <div className="dashbordContainer">

          <div className="sideBar">
            <div className="sideBarHeader">
              <p className="chainName">BSC Testnet</p>
              <div className="sideBarItems">
                <div className="sideBarAddress">
                  <img src="../elipili.svg" alt="" />
                  <p>
                    BNB:
                    {cntxt.escrow
                      ? cntxt.escrow[0].slice(0, 4) +
                        "..." +
                        cntxt.escrow[0].slice(-4)
                      : "Waiting . . ."}
                  </p>
                </div>
                <div className="newTransection">
                  <button onClick={() => {setPopup(true); setForm(1);}}>
                    New transaction
                  </button>
                </div>
                <div className="newTransection">
                  <button onClick={() => {setPopupDeposite(true); setForm(1);}}>
                    Deposit
                  </button>
                </div>
                <div className="sideBarMenus">
                  <Link href="/Dashbord/Home">
                    <p
                      className={
                        router.pathname === "/Dashbord/Home" ? "active" : ""
                      }
                    >
                 <span><Icon icon="material-symbols:home-outline-rounded" /></span> Home
                    </p>
                  </Link>

                  <Link href="/Dashbord/Assets">
                    <p
                      onClick={getBNBBalance}
                      className={
                        router.pathname === "/Dashbord/Assets" ? "active" : ""
                      }
                    >
                    <span><Icon icon="material-symbols:database-outline" /></span> Asset
                    </p>
                  </Link>

                  <Link href="/Dashbord/transections">
                    <p
                      className={
                        router.pathname === "/Dashbord/transections"
                          ? "active"
                          : ""
                      }
                    >
                   <span><Icon icon="bi:arrow-down-up" /></span> Transactions
                    </p>
                  </Link>
                  <Link href="">
                  <p
                      className={
                        router.pathname === ""
                          ? "active"
                          : ""
                      }
                    >
                   <span><Icon icon="tabler:transfer" /></span> Transfer
                   </p>
                  </Link>
                  <Link href="">
                  <p
                      className={
                        router.pathname === ""
                          ? "active"
                          : ""
                      }
                    >
                    <span><Icon icon="ph:swap" /></span> Swap
                   </p>
                  </Link>
                  <Link href="">
                  <p
                      className={
                        router.pathname === ""
                          ? "active"
                          : ""
                      }
                    >
                   <span><Icon icon="fluent-mdl2:payment-card" /></span> Deposit with a card
                  </p>
                  </Link>
                  <Link href="">
                  <p
                      className={
                        router.pathname === ""
                          ? "active"
                          : ""
                      }
                    >
                    <span><Icon icon="fluent:person-support-28-filled" /></span> Support
                   </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <main className="dashbordContent">{children}</main>
        </div>
      </Layout>
    </>
  );
};

export default Dashbord;
