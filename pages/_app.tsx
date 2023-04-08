import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Josefin_Sans } from "next/font/google";
import { useRouter } from "next/router";
import AdminNav from "@/components/admin/AdminNav";

const josefin = Josefin_Sans({
  weight: ["200", "400", "700"],
  subsets: ["latin-ext"],
  variable: "--josefin",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <div className={`${josefin.className} ${josefin.variable}  pt-[3rem]`}>
      <Head>
        <meta property="og:site_name" content="Cristian Albu" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {!router.asPath.includes("admin") ? <Nav /> : <AdminNav />}
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
