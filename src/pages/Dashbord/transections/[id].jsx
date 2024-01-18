import React, { useContext, useState, useEffect } from "react";
import Dashbord from "../Dashbord";
import { BsArrowDownLeft, BsArrowUpRight, BsPeopleFill } from "react-icons/bs";
import { useRouter } from "next/router";
import Image from "next/image";
import { ethers } from "ethers";
import SallContext from "../../../../context/SallContext";
import { useAccount, useSigner } from "wagmi";
import ABI from "../ABI.json";


const SingleTransection = () => {
  const { data: signer } = useSigner();
  const router = useRouter();
  const [collaps, setCollaps] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const cntxt = useContext(SallContext);
  const { id } = router.query;
  const { address } = useAccount();

  const confirmTran = async () => {
    try {
        const contract = new ethers.Contract(cntxt.escrow[0], ABI, signer);
        console.log(cntxt.transection[1][id]);
        const tx = await contract.approveWithdraw(cntxt.transection[1][id]);
        tx.wait();
        router.push("/Dashbord/Home");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(cntxt.transection);
  },[cntxt])

  return (
    <Dashbord>
      {cntxt.transection ? (
        <>
          <div className="singleTransection">
            <div
              className="singleTransectionSection"
              onClick={() => setCollaps(collaps === true ? false : true)}
            >
              <p>{cntxt.transection[1][id].toString()}</p>
              <p>{ethers.utils.formatEther(cntxt.transection[0][id][3])}</p>
              {/* <div className="singleTransectionThreshold">-0.222 BUSD</div> */}
              <div className="singleTransectionThreshold">
                <BsPeopleFill /> {cntxt.transection[0][id][1].length} out
                {cntxt.minThreshold.toString()}
              </div>
              <div className="singleTransectionConfirmation">
                {cntxt.transection[0][id].excuted === false
                  ? "Awaiting confirmations"
                  : "Success"}
              </div>
            </div>
            {collaps === true ? (
              <div className="singleTransectionCollaps">
                <div className="singleTransectionAddress">
                  <p>
                    Send {ethers.utils.formatEther(cntxt.transection[0][id][3])}{" "}
                    BUSD to:
                  </p>
                  <div className="singleTransectionAddressDetails">
                    <Image
                      src="/87.png"
                      width="31"
                      height="31"
                      alt=""
                      style={{ borderRadius: "50%" }}
                    />
                    <div>
                      {/* <p>Jaydeep :</p> */}
                      <p>Eth:{cntxt.transection[0][id][0]}</p>
                    </div>
                  </div>
                </div>
                <div className="singleTransectionStatus">
                  <p>
                    <div className="ellipse"></div> Created
                  </p>
                  <p>
                    <div className="ellipse"></div>Confirmation
                  </p>
                  <div className="singleTransectionConfirmation">
                    {/* <div className="ellipse"></div> */}
                    {confirmation === true ? (
                      <>
                        {" "}
                        {cntxt.transection[0][id][1].map((data, i) => {
                          return (
                            <p key={i}>
                              <Image
                                key={i}
                                src="/87.png"
                                width="31"
                                height="31"
                                style={{ borderRadius: "50%" }}
                              />
                              gor:{data.slice(0, 4) + "..." + data.slice(-4)}
                              {data === address ? <span>You</span> : null}
                            </p>
                          );
                        })}
                      </>
                    ) : null}
                  </div>
                  <p
                    onClick={() =>
                      setConfirmation(confirmation === true ? false : true)
                    }
                    style={{ textDecoration: "underline", color: "#FF9431" }}
                  >
                    <div className="ellipse"></div>
                    {confirmation === true ? "Hide all" : "Show all"}
                  </p>
                  <p>
                    <div className="ellipse"></div>Can be executed
                  </p>
                  <div className="singleTransectionButtons">
                    {cntxt.transection[0][id][1].indexOf(address) === -1 && signer ? (
                      <button onClick={confirmTran}>Confirm</button>
                    ) : null}

                    <button>Replace</button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </>
      ) : // cntxt.transection[0][id].map((item, subIndex) => {
      //     return (

      //     );
      //   })
      null}
    </Dashbord>
  );
};

export default SingleTransection;
