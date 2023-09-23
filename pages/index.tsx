import { NextPage } from "next";
import { Login } from "../components/login";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    // <MetaMaskProvider
    //   debug={false}
    //   sdkOptions={{
    //     logging: {
    //       developerMode: false,
    //     },
    //     checkInstallationOnAllCalls: false,
    //     // communicationServerUrl: process.env.REACT_APP_COMM_SERVER_URL,
    //     checkInstallationImmediately: false, // This will automatically connect to MetaMask on page load
    //     dappMetadata: {
    //       name: "Your Visual Identity",
    //       url: "https://eth-nyc-dusky.vercel.app",
    //     },
    //   }}
    // >
    <main className={styles.main}>
      <div className={styles.container}>
        <Login />
      </div>
    </main>
    // </MetaMaskProvider>
  );
};

export default Home;
