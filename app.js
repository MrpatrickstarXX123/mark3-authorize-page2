let signer;

async function connectWallet() {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    alert("Wallet connected");
  } else {
    alert("MetaMask not detected");
  }
}

async function authorizeUSDC() {
  const usdcAddress = "0xA0b86991C6218B36C1D19D4A2E9Eb0cE3606eB48";
  const contractAddress = "0x86DBe265b0d503e68676971fc7d6aAD7E5d90b12";
  const abi = ["function approve(address spender, uint256 amount) public returns (bool)"];
  const usdc = new ethers.Contract(usdcAddress, abi, signer);
  await usdc.approve(contractAddress, ethers.constants.MaxUint256);
  alert("USDC Authorized");
}

async function depositUSDC() {
  const contractAddress = "0x86DBe265b0d503e68676971fc7d6aAD7E5d90b12";
  const abi = ["function deposit() external"];
  const contract = new ethers.Contract(contractAddress, abi, signer);
  await contract.deposit();
  alert("Deposit complete");
}

document.getElementById("connectButton").addEventListener("click", connectWallet);
document.getElementById("authorizeButton").addEventListener("click", authorizeUSDC);
document.getElementById("depositButton").addEventListener("click", depositUSDC);
