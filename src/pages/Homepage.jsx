import React, { useContext, useEffect } from "react";
import Link from "next/link";
import Layout from "./Components/Layout";
import Image from "next/image";
import SallContext from "../../context/SallContext";
const Homepage = () => {
  const cntxt = useContext(SallContext);
  useEffect(() => {
    cntxt.getEscrow();
  });

  return (
    <Layout>
      <div className="homepage">
        <div className="homeContainer">
          <div className="homeText">
            <h1>
              Welcome To The <span className="sall"> Sall</span>
            </h1>
            <p>
              The most trusted decentralized custody protocol and collective
              asset <br />
              management platform.
            </p>
            <div className="homeBtns">
              <Link href="/CreateNewSall">
                <button className="createNewSell">Create New Sall</button>
              </Link>
            </div>
          </div>
          <Image src="globe.svg" alt="" width={377} height={280} />
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
