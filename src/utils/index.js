import { ethers } from "ethers";

function toBigNum(value, d) {
    return ethers.utils.parseUnits(Number(value).toFixed(d), d);
}

function fromBigNum(value, d) {
    return parseFloat(ethers.utils.formatUnits(value, d));
}

export { toBigNum, fromBigNum };
