import SallContext from "./SallContext";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
    useContract,
    useSigner,
    useAccount,
    useProvider,
    useContractRead,
} from "wagmi";
import ABI from "../ABI.json";
import { useRouter } from "next/router";
import { toBigNum, fromBigNum } from "@/utils";

export default function sallState(props) {
    const [popup, setPopup] = useState(false);

    // Values imported from library or NEXT ====================================

    const { address } = useAccount();
    const router = useRouter();

    // Values before processing ====================================

    const [walletAddress, setAddress] = useState(address);
    const [step, setStep] = useState(1);
    const [groups, setGroups] = useState([
        {
            firstname: "Owner 1",
            address: "",
        },
    ]);

    // values need for Contract response ====================================

    const [firstName, setFirstName] = useState();
    const [addressArray, setAddressArray] = useState();
    const [name, setName] = useState("");
    const [ownerCount, setOwnerCount] = useState(1);
    const [contractCharges, setContractCharges] = useState();
    const [token, setToken] = useState();

    // values get from Contract ====================================

    const [estimatedPrice, setEstimatedPrice] = useState();
    const [escrow, setEscrow] = useState();
    const [balance, setBalance] = useState();
    const [transection, setTransection] = useState();
    const [minThreshold, setMinThreshold] = useState();

    // Get provider signer and make contract ====================================

    const provider = useProvider();
    const { data: signer } = useSigner();
    const contractAddress = process.env.contract_address;
    const contractABI = ABI;
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // ShowMyEscrow function ====================================

    const getEscrow = async () => {
        try {
            const esrw = await contract.showMyEscrow();
            if (esrw.length >= 1) {
                setEscrow(esrw);
                localStorage.setItem("escraw", esrw);
                router.push("/Dashbord/Home");
            } else {
                alert("Nothing");
            }
        } catch (error) {
            console.error(error.errorArgs);
        }
    };
    // function for making saprate array of name and address and also get contract address  ====================================
    const arraMaking = async () => {
        const firstnames = groups.map((obj) => obj.firstname);
        const addresses = groups.map((obj) => obj.address);
        setFirstName(firstnames);
        setAddressArray(addresses);
        try {
            const charges = await contract._contract_charges();
            const estimated = await contract.estimateGas.subscribe_escrow(
                addresses,
                name,
                firstnames,
                ownerCount,
                {
                    value: charges,
                }
            );
            setContractCharges(charges);
            setEstimatedPrice(ethers.utils.formatUnits(estimated, 18));
        } catch (error) {
            console.error(error, "Contract charges error");
        }
    };
    // function for Subscribe Escrow (Review table step) ====================================
    const subscribeEscrow = async () => {};
    // function for Payment for subscribe Escrow (Final step) ====================================
    const subscribeEscrowTx = async () => {
        try {
            const tx = await contract.subscribe_escrow(
                addressArray,
                name,
                firstName,
                ownerCount,
                { value: contractCharges }
            );
            await tx.wait();
            router.push("/Dashbord/Dashbord");
        } catch (error) {
            console.error(error, "Error while payment step");
        }
    };

    return (
        <SallContext.Provider
            value={{
                setMinThreshold,
                minThreshold,
                setTransection,
                transection,
                setPopup,
                popup,
                setBalance,
                balance,
                escrow,
                setEscrow,
                token,
                setToken,
                subscribeEscrowTx,
                estimatedPrice,
                subscribeEscrow,
                ownerCount,
                setOwnerCount,
                arraMaking,
                getEscrow,
                groups,
                setGroups,
                setStep,
                step,
                name,
                setName,
                provider,
                signer,
                address,
            }}
        >
            {props.children}
        </SallContext.Provider>
    );
}
