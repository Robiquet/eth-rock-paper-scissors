import { ContractFactory, ethers, utils } from "ethers";
import React, { useEffect, useState } from "react";
import { Connect } from "./Connect";
import { Options } from "./Options";
import { Play } from "./Play";
import { Session } from "./Session";

export const Game = (props) => {
  const [connected, setConnected] = useState(false);
  const [newSession, setNewSession] = useState(undefined);
  const [rejoin, setRejoin] = useState(undefined);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [isPlayer1, setIsPlayer1] = useState(undefined);
  const [contractAddress, setContractAddress] = useState(undefined);

  const abi =
    '[{"constant":true,"inputs":[{"name":"_c1","type":"uint8"},{"name":"_c2","type":"uint8"}],"name":"win","outputs":[{"name":"w","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"j2Timeout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"stake","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"c2","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"c1Hash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_c2","type":"uint8"}],"name":"play","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"j2","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"lastAction","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_c1","type":"uint8"},{"name":"_salt","type":"uint256"}],"name":"solve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"j1","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"j1Timeout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"TIMEOUT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_c1Hash","type":"bytes32"},{"name":"_j2","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"}]';
  const bytecode =
    "0x608060405261012c600555604051604080610a63833981018060405281019080805190602001909291908051906020019092919050505034600481905550336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160028160001916905550426006819055505050610982806100e16000396000f3006080604052600436106100ba576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630c4395b9146100bf578063294914a4146101145780633a4b66f11461012b57806348e257cb146101565780634d03e3d21461018f57806353a04b05146101c257806380985af9146101e557806389f71d531461023c578063a5ddec7c14610267578063c37597c6146102a1578063c8391142146102f8578063f56f48f21461030f575b600080fd5b3480156100cb57600080fd5b506100fa600480360381019080803560ff169060200190929190803560ff16906020019092919050505061033a565b604051808215151515815260200191505060405180910390f35b34801561012057600080fd5b50610129610403565b005b34801561013757600080fd5b506101406104ae565b6040518082815260200191505060405180910390f35b34801561016257600080fd5b5061016b6104b4565b6040518082600581111561017b57fe5b60ff16815260200191505060405180910390f35b34801561019b57600080fd5b506101a46104c7565b60405180826000191660001916815260200191505060405180910390f35b6101e3600480360381019080803560ff1690602001909291905050506104cd565b005b3480156101f157600080fd5b506101fa61059a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561024857600080fd5b506102516105c0565b6040518082815260200191505060405180910390f35b34801561027357600080fd5b5061029f600480360381019080803560ff169060200190929190803590602001909291905050506105c6565b005b3480156102ad57600080fd5b506102b661087b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561030457600080fd5b5061030d6108a0565b005b34801561031b57600080fd5b50610324610950565b6040518082815260200191505060405180910390f35b600081600581111561034857fe5b83600581111561035457fe5b141561036357600090506103fd565b6000600581111561037057fe5b83600581111561037c57fe5b141561038b57600090506103fd565b600282600581111561039957fe5b8115156103a257fe5b0660028460058111156103b157fe5b8115156103ba57fe5b0614156103e1578160058111156103cd57fe5b8360058111156103d957fe5b1090506103fd565b8160058111156103ed57fe5b8360058111156103f957fe5b1190505b92915050565b6000600581111561041057fe5b600360009054906101000a900460ff16600581111561042b57fe5b14151561043757600080fd5b600554600654014211151561044b57600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004549081150290604051600060405180830381858888f19350505050506000600481905550565b60045481565b600360009054906101000a900460ff1681565b60025481565b600060058111156104da57fe5b600360009054906101000a900460ff1660058111156104f557fe5b14151561050157600080fd5b6004543414151561051157600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561056d57600080fd5b80600360006101000a81548160ff0219169083600581111561058b57fe5b02179055504260068190555050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60065481565b600060058111156105d357fe5b600360009054906101000a900460ff1660058111156105ee57fe5b141515156105fb57600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561065657600080fd5b6002546000191682826040518083600581111561066f57fe5b60ff167f0100000000000000000000000000000000000000000000000000000000000000028152600101828152602001925050506040518091039020600019161415156106bb57600080fd5b6106d482600360009054906101000a900460ff1661033a565b1561073a576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004546002029081150290604051600060405180830381858888f193505050505061086f565b610753600360009054906101000a900460ff168361033a565b156107ba57600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004546002029081150290604051600060405180830381858888f193505050505061086e565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004549081150290604051600060405180830381858888f1935050505050600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004549081150290604051600060405180830381858888f19350505050505b5b60006004819055505050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060058111156108ad57fe5b600360009054906101000a900460ff1660058111156108c857fe5b141515156108d557600080fd5b60055460065401421115156108e957600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004546002029081150290604051600060405180830381858888f19350505050506000600481905550565b600554815600a165627a7a72305820d1a9d45797af8edc87c5e6e841ed990a597fb4e3b4a1299808f1f014800ac4070029";

  let player1Weapon;

  useEffect(() => {
    async function checkConnection() {
      const connected = await window.ethereum.isConnected();
      if (connected === true) {
        setConnected(true);
      } else {
        window.ethereum.on("connect", () => {
          if (connected === false) setConnected(true);
        });

        setConnected(false);
      }
    }

    setContractAddress(localStorage.getItem("contractAddress"));
    checkConnection();
  }, []);

  const connectWallet = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setConnected(true);
    } catch {
      console.error("Error connecting wallet");
    }
  };

  const deployContract = async (formValue) => {
    props.loaderChange(true);
    setIsPlayer1(true);
    
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();
      const factory = new ContractFactory(abi, bytecode, signer);

      const ethNumber = formValue.stake;
      const wei = utils.parseEther(ethNumber);

      const contract = await factory.deploy(
        formValue.weaponHash,
        formValue.address,
        { value: wei }
      );

      await contract.deployed();
      localStorage.setItem("player1WeaponHash", formValue.weaponHash);
      localStorage.setItem("player1Weapon", formValue.weapon);
      localStorage.setItem("contractAddress", contract.address);

      setContractAddress(contract.address);
      setSessionStarted(true);
    } catch (e) {
      console.error(e);
    }
    props.loaderChange(false);
  };

  const connectToContractSession = async (formValue) => {
    props.loaderChange(true);
    setIsPlayer1(false);

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(formValue.address, abi, signer);
      const stake = await contract.stake();

      let tx = await contract.play(formValue.weapon, {
        value: stake,
        gasLimit: 200000,
      });
      await tx.wait();

      setContractAddress(formValue.address);
      localStorage.setItem("contractAddress", formValue.address);
      setSessionStarted(true);
    } catch (e) {
      console.error(e);
    }
    props.loaderChange(false);
  };

  const rejoinSession = async (formValue) => {
    props.loaderChange(true);

    setContractAddress(formValue.address);

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    const contract = new ethers.Contract(formValue.address, abi, provider);

    try {
      const j1 = await contract.j1();
      const j2 = await contract.j2();
      const walletAddress = await signer.getAddress();

      if (j1 === walletAddress) {
        setIsPlayer1(true);
      } else if (j2 === walletAddress) {
        setIsPlayer1(false);
      }
      setSessionStarted(true);
    } catch (e) {
      console.error(e);
    }
    props.loaderChange(false);
  };

  const timeoutPlayer = async () => {
    props.loaderChange(true);

    try {
      const address =
        contractAddress ?? localStorage.getItem("contractAddress");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, abi, signer);

      const j1 = await contract.j1();
      const j2 = await contract.j2();
      const walletAddress = await signer.getAddress();
      let tx;
      if (j1 === walletAddress) {
        tx = await contract.j2Timeout({ gasLimit: 200000 });
      } else if (j2 === walletAddress) {
        tx = await contract.j1Timeout({ gasLimit: 200000 });
      } else {
        return;
      }

      await tx.wait();
      restartGame();
    } catch (e) {
      console.error(e);
    }

    props.loaderChange(false);
  };

  const solve = async () => {
    props.loaderChange(true);
    try {
      const address =
        contractAddress ?? localStorage.getItem("contractAddress");
      const weapon = localStorage.getItem("player1Weapon");
      const salt = 65465412;
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, abi, signer);

      const tx = await contract.solve(weapon, salt, { gasLimit: 200000 });
      await tx.wait();
      restartGame();
    } catch (e) {
      console.error(e);
    }

    props.loaderChange(false);
  };

  const restartGame = () => {
    setSessionStarted(false);
    setNewSession(undefined);
    setRejoin(undefined);
  };

  const onNewClicked = () => {
    setNewSession(true);
  };

  const onJoinClicked = () => {
    setNewSession(false);
  };

  const onRejoinClicked = () => {
    setRejoin(true);
  };

  const onTimeoutClicked = () => {
    timeoutPlayer();
  };

  const onSolveClicked = () => {
    solve();
  };

  return sessionStarted === true ? (
    <Session
      onSolveClicked={onSolveClicked}
      onTimeoutClicked={onTimeoutClicked}
      isPlayer1={isPlayer1}
      contractAddress={contractAddress}
    ></Session>
  ) : (connected && newSession !== undefined) || rejoin !== undefined ? (
    <Play
      newSession={newSession}
      rejoin={rejoin}
      formSubmitted={
        newSession === true
          ? deployContract
          : rejoin === true
          ? rejoinSession
          : connectToContractSession
      }
      contractAddress={contractAddress}
    ></Play>
  ) : connected && newSession === undefined && rejoin === undefined ? (
    <Options
      onNewClicked={onNewClicked}
      onJoinClicked={onJoinClicked}
      onRejoinClicked={onRejoinClicked}
    ></Options>
  ) : (
    <Connect onConnectClicked={connectWallet}></Connect>
  );
};
