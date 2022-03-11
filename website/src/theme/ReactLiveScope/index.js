import { Buffer } from 'buffer';
import React, { useEffect, useState } from 'react';
import * as nearAPI from "near-api-js";
import './index.css'

global.Buffer = Buffer;

const connectNear = async () => {
    try {
        const { keyStores, KeyPair } = nearAPI;
        const keyStore = new keyStores.InMemoryKeyStore();
        // return keyStore;
        const PRIVATE_KEY =
            "ed25519:21ykkBs1gNFUaCxM2GDFNpoaUTbP7sXcfk9RDC7goQqdJ2ADcLrz94EPbtTsgyNsg7HZ4RQY8JuSsKSBtoKBr8Dp";
        const keyPair = KeyPair.fromString(PRIVATE_KEY);
        await keyStore.setKey("testnet", "kushagrabt.testnet", keyPair);
        const { connect } = nearAPI;


        const config = {
            networkId: "testnet",
            keyStore, // optional if not signing transactions
            nodeUrl: "https://archival-rpc.testnet.near.org",
            // nodeUrl: "https://rpc.testnet.near.org",
            walletUrl: "https://wallet.testnet.near.org",
            helperUrl: "https://helper.testnet.near.org",
            explorerUrl: "https://explorer.testnet.near.org",
        };
        const near = await connect(config);
        return near;
    } catch (e) {
        console.log("ERRORRRRRRRRR", e);
    }

}


const ViewResponse = (props) => {
    return (
        <div>
            {props.response && (
                <div className="display-result">
                    <pre>{JSON.stringify(props.response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

// Add react-live imports you need here
const ReactLiveScope = {
    React,
    ...React,
    useState,
    useEffect,
    ViewResponse,
    connectNear,
};

export default ReactLiveScope;
