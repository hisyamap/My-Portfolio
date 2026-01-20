import { useEffect } from "react";
import '@/styles/globals.scss';
import Layout from '@/components/Layout';
import Modal from "react-modal";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}