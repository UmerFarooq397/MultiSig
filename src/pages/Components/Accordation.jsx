import React, { useState } from "react";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";

const Accordation = ({ question, answer }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <div className="child" onClick={() => setIsActive(!isActive)}>
        <p>{question}</p>
        {isActive ? <SlArrowUp /> : <SlArrowDown />}
      </div>
      {isActive ? <p>{answer}</p> : null}
    </>
  );
};

export default Accordation;
