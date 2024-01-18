import React, { useContext, useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import SallContext from "../../../context/SallContext";

const Navbar = () => {
    const cntxt = useContext(SallContext);

    // const [showModal, setShowModal] = useState(false);

    // const handleClick = () => {
    //     setShowModal(!showModal);
    // };
    return (
        <div className="navbar">
            <Link href="/Homepage">
                <h1>Sall</h1>
            </Link>
            <FiMenu className="hamburgur" />
            <div className="navItems">
                {/* <button> */}
                <ConnectButton>Connect wallet</ConnectButton>
                {/* </button> */}
            </div>
        </div>
    );
};

export default Navbar;
