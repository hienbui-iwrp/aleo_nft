import React, { FC, useMemo, useState } from "react";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  Transaction,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import "./App.css";
import helloworld_program from "../helloworld/build/main.aleo?raw";
import { AleoWorker } from "./workers/AleoWorker.js";
import {
  Account,
  ProgramManager,
  PrivateKey,
  initThreadPool,
  AleoKeyProvider,
  AleoNetworkClient,
  NetworkRecordProvider,
} from "@aleohq/sdk";
import { Something } from "./component";

const publicKey =
  "aleo18ntztmv02gq78wpgxx3f5cga33e367ttrwm5wl9euhc0m87l4qrqlytym7";
const NFTProgramId = "";
const functionKey = "";

const aleoWorker = AleoWorker();
function App() {
  const [count, setCount] = useState(0);
  const [account, setAccount] = useState(null);
  const [executing, setExecuting] = useState(false);
  const [deploying, setDeploying] = useState(false);

  const generateAccount = async () => {
    const key = await aleoWorker.getPrivateKey();
    setAccount(await key.to_string());
  };

  async function execute() {
    setExecuting(true);
    const transaction = await Transaction.createTransaction();
    setExecuting(false);

    console.log("result: ", result);
    console.log("result2: ", result2);
    alert(JSON.stringify(result));
  }

  async function deploy() {
    setDeploying(true);
    try {
      const result = await aleoWorker.deployProgram(helloworld_program);
      console.log("Transaction:");
      console.log("https://explorer.hamp.app/transaction?id=" + result);
      alert("Transaction ID: " + result);
    } catch (e) {
      console.log(e);
      alert("Error with deployment, please check console for details");
    }
    setDeploying(false);
  }

  async function test() {
    const keyProvider = new AleoKeyProvider();
    keyProvider.useCache(true);

    // Create a record provider that will be used to find records and transaction data for Aleo programs
    const networkClient = new AleoNetworkClient("https://vm.aleo.org/api");

    // Use existing account with funds
    const account = new Account({
      privateKey: "APrivateKey1zkpEiKFP7nqth2bnio4NmSJg7GvDJVUc1pmBjCC5mZyyCFA",
    });

    const recordProvider = new NetworkRecordProvider(account, networkClient);

    // Initialize a program manager to talk to the Aleo network with the configured key and record providers
    const programManager = new ProgramManager(
      "https://vm.aleo.org/api",
      keyProvider,
      recordProvider
    );

    programManager.setAccount(account);

    // Define a fee to pay to deploy the program
    const fee = 1; // 1.9 Aleo credits

    // Deploy the program to the Aleo network
    // const tx_id = await programManager.something_else(helloworld_program, fee);

    // Optional: Pass in fee record manually to avoid long scan times
    // const feeRecord = "{  owner: aleo1xxx...xxx.private,  microcredits: 2000000u64.private,  _nonce: 123...789group.public}";
    // const tx_id = await programManager.deploy(program, fee, undefined, feeRecord);
    let program = await networkClient.getProgramObject("leo_nft_fctc.aleo");

    // const transaction_id = await client.executeProgram(
    //   "leo_nft_fctc.aleo",
    //   "do_math",
    //   0,
    //   ["5u32", "5u32"],
    //   privateKeyString
    // );
    console.log("test: ", program.do_math);
  }

  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "Leo Demo App",
      }),
    ],
    []
  );

  return (
    <WalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.UponRequest}
      network={WalletAdapterNetwork.Localnet}
      autoConnect
    >
      <WalletModalProvider>
        <Something />
      </WalletModalProvider>
    </WalletProvider>
  );
}

export default App;
