/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    moralisKey:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImIzMjgxZmI4LWI2NmUtNDc0Ny1iMGI3LTI0NGIxOWIwMDA0NCIsIm9yZ0lkIjoiMzcyODU1IiwidXNlcklkIjoiMzgzMTgzIiwidHlwZUlkIjoiMTBiNzI3ZWItZmEyZC00Y2RjLTk4NGEtNGE5NTE2NmNmYjM3IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDU1MDA1NzMsImV4cCI6NDg2MTI2MDU3M30.MOi11jxX-WMVJsRcos_2Kx2aHMLUo26dbSbWrRoNN0E",
    Alchemy_Key: "6oJDA3tCkRWWpnwelX-wDZqx61SrAv8i",
    chain_id: 97,
    chain_name: "bsc testnet",
    contract_address: "0xC62d0E2DF255bf0F6c583E13A7b920da290C028B",
  },
}

module.exports = nextConfig
