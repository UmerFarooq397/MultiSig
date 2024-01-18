import React, { useContext } from "react";
import Image from "next/image";
import { BsArrowDownLeft, BsArrowUpRight, BsPeopleFill } from "react-icons/bs";
import SallContext from "../../../context/SallContext";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import Link from "next/link";
const Transections = () => {
  const { address } = useAccount();
  const cntxt = useContext(SallContext);

  return (
    <div className="transectionCard">
      {cntxt.transection ? (
        <>
          {cntxt.transection[1].map((item, subIndex) => {
            return (
              <Link key={subIndex} href={`transections/${subIndex}`}>
                <div className="transection">
                  <p key={subIndex}>{item.toString()}</p>

                  <p className="transectionType">
                    {address != cntxt.transection[0][subIndex][0] ? (
                      <>
                        <BsArrowUpRight color="red" /> Send
                      </>
                    ) : (
                      <>
                        <BsArrowDownLeft color="green" /> Recive
                      </>
                    )}
                  </p>
                  <p className="amount">
                    -
                    {ethers.utils.formatEther(
                      cntxt.transection[0][subIndex][3]
                    )}
                  </p>
                  <div className="transectionThreshold">
                    <BsPeopleFill />
                    {cntxt.transection[0][subIndex][1].length}/
                    {cntxt.minThreshold.toString()}
                  </div>
                </div>
              </Link>
            );
          })}
        </>
      ) : null}
    </div>
  );
};

export default Transections;
