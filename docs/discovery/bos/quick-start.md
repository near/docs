---
sidebar_position: 2
---


# Quick Start

To get up and running quickly, take a look at the full-fledged Lido example, which demonstrates 
how you can interact with smart contracts via ethers.js, style your component, and manage state.


#### Fork the component

1. Navigate to [the component](https://bos.gg/#/zavodil.near/widget/Lido)
2. Click on the menu icon in the top-right corner
3. Select `Fork`
4. Feel free to make any changes 
5. Click on "Save" to deploy the component 

Please note that to deploy the component, you'll need to sign in with a NEAR account and to make a deposit of a small amount of NEAR for the storage cost. This is because BOS uses the NEAR blockchain as its underneath.


#### Source code

```jsx
// FETCH LIDO ABI

const lidoContract = "0xae7ab96520de3a18e5e111b5eaab095312d7fe84";
const tokenDecimals = 18;

const lidoAbi = fetch(
  "https://raw.githubusercontent.com/lidofinance/lido-subgraph/master/abis/Lido.json"
);
if (!lidoAbi.ok) {
  return "Loading";
}

const iface = new ethers.utils.Interface(lidoAbi.body);

// FETCH LIDO STAKING APR

if (state.lidoArp === undefined) {
  const apr = fetch(
    "https://api.allorigins.win/get?url=https://stake.lido.fi/api/sma-steth-apr"
  );
  if (!apr) return;
  State.update({ lidoArp: JSON.parse(apr?.body?.contents) ?? "..." });
}

// HELPER FUNCTIONS

const getStakedBalance = (receiver) => {
  const encodedData = iface.encodeFunctionData("balanceOf", [receiver]);

  return Ethers.provider()
    .call({
      to: lidoContract,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      return Big(receiverBalanceHex.toString())
        .div(Big(10).pow(tokenDecimals))
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    });
};

const submitEthers = (strEther, _referral) => {
  if (!strEther) {
    return console.log("Amount is missing");
  }
  const erc20 = new ethers.Contract(
    lidoContract,
    lidoAbi.body,
    Ethers.provider().getSigner()
  );

  let amount = ethers.utils.parseUnits(strEther, tokenDecimals).toHexString();

  erc20.submit(lidoContract, { value: amount }).then((transactionHash) => {
    console.log("transactionHash is " + transactionHash);
  });
};

// DETECT SENDER

if (state.sender === undefined) {
  State.update({ sender: Ethers.send("eth_requestAccounts", [])[0] });
}

if (!state.sender) return "Please login first";

// FETCH SENDER BALANCE

if (state.balance === undefined) {
  Ethers.provider()
    .getBalance(state.sender)
    .then((balance) => {
      State.update({ balance: Big(balance).div(Big(10).pow(18)).toFixed(2) });
    });
}

// FETCH SENDER STETH BALANCE

if (state.stakedBalance === undefined) {
  getStakedBalance(state.sender).then((stakedBalance) => {
    State.update({ stakedBalance });
  });
}

// FETCH TX COST

if (state.txCost === undefined) {
  const gasEstimate = ethers.BigNumber.from(1875000);
  const gasPrice = ethers.BigNumber.from(1500000000);

  const gasCostInWei = gasEstimate.mul(gasPrice);
  const gasCostInEth = ethers.utils.formatEther(gasCostInWei);

  let responseGql = fetch(
    "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
          bundle(id: "1" ) {
            ethPrice
          }
        }`,
      }),
    }
  );

  if (!responseGql) return "";

  const ethPriceInUsd = responseGql.body.data.bundle.ethPrice;

  const txCost = Number(gasCostInEth) * Number(ethPriceInUsd);

  State.update({ txCost: `$${txCost.toFixed(2)}` });
}

// FETCH CSS

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;
const css = fetch(
  "https://pluminite.mypinata.cloud/ipfs/Qmboz8aoSvVXLeP5pZbRtNKtDD3kX5D9DEnfMn2ZGSJWtP"
).body;

if (!cssFont || !css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    ${cssFont}
    ${css}
`,
  });
}
const Theme = state.theme;

// OUTPUT UI

return (
  <Theme>
    <div class="LidoContainer">
      <div class="Header">Stake Ether</div>
      <div class="SubHeader">Stake ETH and receive stETH while staking.</div>

      <div class="LidoForm">
        <div class="LidoFormTopContainer">
          <div class="LidoFormTopContainerLeft">
            <div class="LidoFormTopContainerLeftContent1">
              <div class="LidoFormTopContainerLeftContent1Container">
                <span>Available to stake</span>
                <div class="LidoFormTopContainerLeftContent1Circle" />
              </div>
            </div>
            <div class="LidoFormTopContainerLeftContent2">
              <span>{state.balance ?? "..."}&nbsp;ETH</span>
            </div>
          </div>
          <div class="LidoFormTopContainerRight">
            <div class="LidoFormTopContainerRightContent1">
              <div class="LidoFormTopContainerRightContent1Text">
                <span>
                  {state.sender.substring(0, 6)}...
                  {state.sender.substring(
                    state.sender.length - 4,
                    state.sender.length
                  )}{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="LidoSplitter" />
        <div class="LidoFormBottomContainer">
          <div class="LidoFormTopContainerLeft">
            <div class="LidoFormTopContainerLeftContent1">
              <div class="LidoFormTopContainerLeftContent1Container">
                <span>Staked amount</span>
              </div>
            </div>
            <div class="LidoFormTopContainerLeftContent2">
              <span>{state.stakedBalance ?? "..."}&nbsp;stETH</span>
            </div>
          </div>
          <div class="LidoFormTopContainerRight">
            <div class="LidoAprContainer">
              <div class="LidoAprTitle">Lido APR</div>
              <div class="LidoAprValue">{state.lidoArp ?? "..."}%</div>
            </div>
          </div>
        </div>
      </div>
      <div class="LidoStakeForm">
        <div class="LidoStakeFormInputContainer">
          <span class="LidoStakeFormInputContainerSpan1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path
                opacity="0.6"
                d="M11.999 3.75v6.098l5.248 2.303-5.248-8.401z"
              ></path>
              <path d="M11.999 3.75L6.75 12.151l5.249-2.303V3.75z"></path>
              <path
                opacity="0.6"
                d="M11.999 16.103v4.143l5.251-7.135L12 16.103z"
              ></path>
              <path d="M11.999 20.246v-4.144L6.75 13.111l5.249 7.135z"></path>
              <path
                opacity="0.2"
                d="M11.999 15.144l5.248-2.993-5.248-2.301v5.294z"
              ></path>
              <path
                opacity="0.6"
                d="M6.75 12.151l5.249 2.993V9.85l-5.249 2.3z"
              ></path>
            </svg>
          </span>
          <span class="LidoStakeFormInputContainerSpan2">
            <input
              class="LidoStakeFormInputContainerSpan2Input"
              value={state.strEther}
              onChange={(e) => State.update({ strEther: e.target.value })}
              placeholder="Amount"
            />
          </span>
          <span
            class="LidoStakeFormInputContainerSpan3"
            onClick={() => {
              State.update({
                strEther: (parseFloat(state.balance) - 0.05).toFixed(2),
              });
            }}
          >
            <button class="LidoStakeFormInputContainerSpan3Content">
              <span class="LidoStakeFormInputContainerSpan3Max">MAX</span>
            </button>
          </span>
        </div>
        <button
          class="LidoStakeFormSubmitContainer"
          onClick={() => submitEthers(state.strEther, state.sender)}
        >
          <span>Submit</span>
        </button>

        <div class="LidoFooterContainer">
          <div class="LidoFooterRaw">
            <div class="LidoFooterRawLeft">You will receive</div>
            <div class="LidoFooterRawRight">${state.strEther ?? 0} stETH</div>
          </div>
          <div class="LidoFooterRaw">
            <div class="LidoFooterRawLeft">Exchange rate</div>
            <div class="LidoFooterRawRight">1 ETH = 1 stETH</div>
          </div>
          <div class="LidoFooterRaw">
            <div class="LidoFooterRawLeft">Transaction cost</div>
            <div class="LidoFooterRawRight">{state.txCost}</div>
          </div>
          <div class="LidoFooterRaw">
            <div class="LidoFooterRawLeft">Reward fee</div>
            <div class="LidoFooterRawRight">10%</div>
          </div>
        </div>
      </div>
    </div>
  </Theme>
);


```


