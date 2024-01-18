import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import SallContext from "../../../context/SallContext";
import { useProvider, useSigner } from "wagmi";
import { ethers } from "ethers";
import Image from "next/image";
const SideBar = ({ escrow }) => {
  const router = useRouter();
  const cntxt = useContext(SallContext);
  const provider = useProvider();
  // const [balance, setBalance] = useState();
  async function getBNBBalance() {
    try {
      const res = await provider.getBalance(cntxt.escrow[0]);
      const formattedBalance = ethers.utils.formatEther(res);
      cntxt.setBalance(formattedBalance);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  console.log(cntxt.balance ? cntxt.balance : "Coming soon");

  return (
    <div className="sideBar">
      <div className="sideBarHeader">
        <p className="chainName">bNB smart cain</p>
        <div className="sideBarItems">
          <div className="sideBarAddress">
            <img src="elipili.svg" alt="" />
            <p>
              bnb:
              {escrow
                ? escrow[0].slice(0, 4) + "..." + escrow[0].slice(-4)
                : "Waiting . . ."}
            </p>
          </div>
          <div className="newTransection">
            <button>New transection</button>
          </div>
          <div className="sideBarMenus">
            <Link href="/Dashbord/Home">
              <p
                className={router.pathname === "/Dashbord/Home" ? "active" : ""}
              >
                <Image width="24" height="24" src="/home.svg" alt="" /> Home
              </p>
            </Link>

            <Link href="/Dashbord/Assets">
              <p
                onClick={getBNBBalance}
                className={
                  router.pathname === "/Dashbord/Assets" ? "active" : ""
                }
              >
                <Image width="24" height="24" src="/assets.svg" alt="" /> Asset
              </p>
            </Link>

            <Link href="/Dashbord/transections">
              <p
                className={router.pathname === "/transections" ? "active" : ""}
                onClick={console.log("clicked")}
              >
                <Image width="24" height="24" src="/transections.svg" alt="" />
                Transactions
              </p>
            </Link>
          </div>
        </div>
      </div>

      <div className="sideBarFotter">
        <p className="">
         
        </p>
        <p>
          
        </p>
      </div>
    </div>
  );
};

export default SideBar;
