/* eslint-disable @next/next/no-img-element */
import { Signer } from "ethers";
import { useState } from "react";
import { Blocks } from "react-loader-spinner";
import { loginAccount, registerAccount, verifyChallenge } from "../lib/wallet";
import styles from "../styles/Home.module.css";
import { Connected } from "./connected";
import { Footer } from "./footer";

export const Login = () => {
  const [username, setUsername] = useState(
    "0xE5F48897E47530af72a818e03381A8C7d13e1Db9"
  );
  const [password, setPassword] = useState("");
  const [signer, setSigner] = useState<Signer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [error, setError] = useState("");

  const registerWallet = async () => {
    // if (!username || !password) return;
    try {
      setIsLoading(true);
      const wallet = await registerAccount("123", (status) =>
        setLoadingStatus(status)
      );
      if (!wallet) {
        throw new Error("Canceled");
      }

      const s = await wallet.getSigner();
      setSigner(s);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.error(e);
      setError((e as any).message);
    }
  };

  const connectWallet = async () => {
    // if (!username || !password) return;
    try {
      setIsLoading(true);
      const wallet = await loginAccount((status) => setLoadingStatus(status));
      const s = await wallet.getSigner();
      setSigner(s);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.error(e);
      setError((e as any).message);
    }
  };

  return username && signer ? (
    <>
      <Connected signer={signer} username={username} />
    </>
  ) : isLoading ? (
    <div className={styles.filler}>
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
      <p className={styles.label} style={{ textAlign: "center" }}>
        {loadingStatus}
      </p>
    </div>
  ) : error ? (
    <div className={styles.filler}>
      <p className={styles.label} style={{ textAlign: "center" }}>
        ❌ {error}
      </p>
      <button className={styles.button} onClick={() => setError("")}>
        Try again
      </button>
    </div>
  ) : (
    <>
      <div className={styles.row_center} style={{ marginTop: "2rem" }}>
        <a href="https://thirdweb.com">
          <img src="thirdweb.svg" className={styles.logo} alt="logo" />
        </a>
        <h1 className={styles.title}>Unilogin</h1>
      </div>
      <div className={styles.filler}>
        <button className={styles.button} onClick={() => registerWallet()}>
          Register
        </button>

        <button className={styles.button} onClick={() => connectWallet()}>
          Biometric (Device) Login
        </button>

        <button
          className={styles.button}
          onClick={() => {
            verifyChallenge("123").then((x) => console.log(x));
          }}
        >
          Check
        </button>
      </div>
      <Footer />
    </>
  );
};
