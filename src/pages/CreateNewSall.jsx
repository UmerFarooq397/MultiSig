import React, { useContext, useState, useEffect } from "react";
import Layout from "./Components/Layout";
import SallPreview from "./Components/SallPreview";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { BsArrowLeft } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { useRouter } from "next/router";
import { useConnect } from "wagmi";
import SallContext from "../../context/SallContext";
import ReviewTable from "./Components/ReviewTable";
import Image from "next/image";
import Accordation from "./Components/Accordation";

const CreateNewSall = () => {
    const [acord, setAcord] = useState(false);
    const [groups, setGroups] = useState([]);
    const [nextNumber, setNextNumber] = useState(2);
    const [ownerName, setOwnerName] = useState();
    const [flag, setFlag] = useState(false);
    const str = "0x0167958473409487443c05";
    const dotIndex = str.indexOf(".");
    const firstFour = str.slice(dotIndex + 1, dotIndex + 5);
    const lastFour = str.slice(-4);
    const router = useRouter();
    const cntxt = useContext(SallContext);

    useEffect(() => {
        if (cntxt.groups.length <= 0) {
            cntxt.setOwnerCount(1);
        }
    }, [cntxt.groups]);

    const handleAddInput = () => {
        const lastInput = cntxt.groups[cntxt.groups.length - 1];
        if (!lastInput || lastInput.firstname) {
            cntxt.setGroups([
                ...cntxt.groups,
                {
                    firstname: "",
                    address: "",
                },
            ]);
            cntxt.setOwnerCount(cntxt.groups.length + 1);
        } else {
            alert("First fill name field");
        }
    };

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        const newData = [...cntxt.groups];
        newData[index] = {
            ...newData[index],
            [name]: value,
        };
        cntxt.setGroups(newData);
    };

    const handleRemove = (index) => {
        const newData = [...cntxt.groups];
        newData.splice(index, 1);
        cntxt.setGroups(newData);
        cntxt.setOwnerCount(newData.length);
    };

    const renderStepHeading = () => {
        switch (cntxt.step) {
            case 1:
                return (
                    <>
                        <p>Select network and name your Sall</p>
                        <p>Select the network on which to create your Sall</p>
                    </>
                );
            case 2:
                return (
                    <>
                        <p>Owners and confirmations</p>
                        <p>
                            Set the owner wallets of your Sall and how many need
                            to confirm to execute a valid transaction
                        </p>
                    </>
                );
            case "review":
                return (
                    <>
                        <p>Review</p>
                        <p>
                            You&apos;re about to create a new Sall and will have
                            to confirm the transaction with your connected
                            wallet
                        </p>
                    </>
                );
            case "final":
                return (
                    <div className="finalMainHeading">
                        <button
                            className="backBtn finalBtn"
                            onClick={() => {
                                cntxt.setStep("review");
                            }}
                        >
                            <BsArrowLeft /> Back
                        </button>
                        <h5>Waiting for transaction confirmation.</h5>
                    </div>
                );
            default:
                console.log("1");
        }
    };

    const renderStepInput = () => {
        switch (cntxt.step) {
            case 1:
                return (
                    <div className="innerInput">
                        <>
                            <label htmlFor="name" className="innerName">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={cntxt.name}
                                placeholder="Name Your wallet"
                                onChange={(e) => cntxt.setName(e.target.value)}
                            />
                            <select>
                                BNB Testnet
                                <option>BSC - Testnet</option>
                            </select>
                        </>
                    </div>
                );
            case 2:
                return (
                    <div className="innerInputTwo">
                        {cntxt.groups.map((data, index) => {
                            return (
                                <div className="inputContainer" key={index}>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder={`Owner ${index + 1}`}
                                        name="firstname"
                                        value={data.firstname || ""}
                                        onChange={(event) =>
                                            handleChange(event, index)
                                        }
                                    />

                                    <input
                                        type="text"
                                        id="name"
                                        name="address"
                                        value={data.address || ""}
                                        placeholder="Owner Address"
                                        onChange={(event) =>
                                            handleChange(event, index)
                                        }
                                    />
                                    <div
                                        className="removeButton"
                                        onClick={() => handleRemove(index)}
                                    >
                                        -
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            case "review":
                return <ReviewTable />;
            case "final":
                return (
                    <div className="finalInput">
                        <p>Please confirm the transaction with your connect</p>
                        <Image
                            src="558.svg"
                            alt=""
                            className="mainFinalImage"
                            width={141}
                            height={141}
                        />
                        <p>Waiting</p>
                        {/* <div className="notificationMessage">
              <div className="notiItem sallAddress">
                <Image src="420.svg" alt="" width={37} height={37} />
                <div className="notiText">
                  <span className="notiHeading">our Sall address</span>
                  <span className="notiContent">
                    brb:0x68428A4E50Fbb34C5Bd5C4C07F0dd00b029Ca
                  </span>
                  <span className="notiContentSmall">
                    {firstFour}...{lastFour}
                  </span>
                </div>
              </div>
              <div className="notiItem validationTransection">
                <Image src="420.svg" alt="" width={37} height={37} />
                <div className="notiText">
                  <span className="notiHeading">our Sall address</span>
                  <span className="notiContent">
                    brb:0x68428A4E50Fbb34C5Bd5C4C07F0dd00b029Ca
                  </span>
                  <span className="notiContentSmall">
                    {firstFour}...{lastFour}
                  </span>
                </div>
              </div>
              <div className="notiItem processing">
                <Image src="420.svg" alt="" width={37} height={37} />
                <div className="notiText">
                  <span className="notiHeading">our Sall address</span>
                  <span className="notiContent">
                    brb:0x68428A4E50Fbb34C5Bd5C4C07F0dd00b029Ca
                  </span>
                  <span className="notiContentSmall">
                    {firstFour}...{lastFour}
                  </span>
                </div>
              </div>
              <div className="notiItem sallIsReady">
                <Image src="420.svg" alt="" width={37} height={37} />
                <div className="notiText">
                  <span className="notiHeading">our Sall address</span>
                  <span className="notiContent">
                    brb:0x68428A4E50Fbb34C5Bd5C4C07F0dd00b029Ca
                  </span>
                  <span className="notiContentSmall">
                    {firstFour}...{lastFour}
                  </span>
                </div>
              </div>
            </div> */}
                    </div>
                );
            default:
                console.log("1");
        }
    };

    const renderStepFooter = () => {
        switch (cntxt.step) {
            case 1:
                return (
                    <p>
                        By continuing you agree to our terms of use and privacy
                        policy
                    </p>
                );
            case 2:
                const handleSelect = (e) => {
                    console.log(e.target.value);
                    cntxt.setOwnerCount(e.target.value);
                };
                return (
                    <>
                        <p>Your connected wallet</p>

                        <button className="addOwner" onClick={handleAddInput}>
                            + Add New owner
                        </button>

                        <hr />
                        <div className="threshold">
                            <h5>Threshold</h5>
                            <p>Any transaction requires the confirmation of:</p>
                            <div className="thresholdDrop">
                                <div className="drop">
                                    <select
                                        onChange={(e) =>
                                            cntxt.setOwnerCount(e.target.value)
                                        }
                                        value={cntxt.ownerCount}
                                    >
                                        {cntxt.groups.map((item, i) => {
                                            return (
                                                <option value={i + 1} key={i}>
                                                    {i + 1}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <p>
                                    {cntxt.ownerCount}- out of{" "}
                                    {cntxt.groups.length} owner(s).
                                </p>
                            </div>
                        </div>
                    </>
                );
            case "review":
                return null;
            case "final":
                return null;
            default:
                console.log("1");
        }
    };

    const checkStep = async () => {
        if(hasDuplicateAddress(cntxt.groups)){
            alert("Owner addresses cannot be same.")
            return;
        }
        else if (
            cntxt.groups.length <= 0 ||
            !cntxt.groups[0].firstname.trim() ||
            !cntxt.groups[0].address.trim()
        ) {
            alert("Please input Owner and address.");
            return;
        }
        await cntxt.arraMaking();
        await cntxt.setStep("review");
    };
    function hasDuplicateAddress(array) {
        const addresses = new Set();
    
        for (const item of array) {
            if (addresses.has(item.address)) {
                return true;
            }
            addresses.add(item.address);
        }
    
        return false;
    }
    const renderStepButton = () => {
        switch (cntxt.step) {
            case 1:
                return (
                    <button
                        className="nextBtn"
                        onClick={() => {
                            !cntxt.name
                                ? alert("Name Your Wallet")
                                : cntxt.setStep(2);
                        }}
                    >
                        Next
                    </button>
                );
            case 2:
                return (
                    <>
                        <button
                            className="backBtn"
                            onClick={() => {
                                cntxt.setStep(1);
                            }}
                        >
                            <BsArrowLeft /> Back
                        </button>
                        <button className="nextBtn" onClick={checkStep}>
                            Next
                        </button>
                    </>
                );
            case "review":
                return (
                    <>
                        <button
                            className="backBtn"
                            onClick={() => {
                                cntxt.setStep(2);
                            }}
                        >
                            <BsArrowLeft /> Back
                        </button>
                        <button
                            className="nextBtn"
                            onClick={() => {
                                cntxt.setStep("final");
                                cntxt.subscribeEscrowTx();
                            }}
                        >
                            Next
                        </button>
                    </>
                );
            case "final":
                // setTimeout(function () {
                //   router.push("/Dashbord/Dashbord");
                // }, 3000);
                return null;
            default:
                console.log("1");
        }
    };

    const renderStepPreview = () => {
        switch (cntxt.step) {
            case 1:
                return (
                    <div className="previewSelect">
                        <SallPreview />
                    </div>
                );
            case 2:
                return (
                    <div className="previewSelect">
                        <SallPreview />
                    </div>
                );
            case "review":
                return null;
            case "final":
                return null;
            default:
                console.log("1");
        }
    };

    return (
        <Layout>
            <div className="createSall">
                <h3>Create new sall</h3>

                <div className="selectContainer">
                    <div className="mainSelect">
                        <div className="mainHeading mainHeadin_revuew">
                            {renderStepHeading()}
                        </div>

                        <div className="mainInput">
                            <div className="inputTop">
                                {renderStepInput()}
                                {renderStepFooter()}
                            </div>
                            <div className="buttonGroup">
                                {renderStepButton()}
                            </div>
                        </div>
                    </div>
                    {renderStepPreview()}
                    {/* {flag === true ? (
            <p className="validationError">
              <MdClose onClick={() => setFlag(false)} />
              Please insert name
            </p>
          ) : null} */}
                </div>
            </div>
        </Layout>
    );
};

export default CreateNewSall;
