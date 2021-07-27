import "bootstrap/dist/css/bootstrap.css";
import { AppProps } from 'next/app';

if (typeof window !== "undefined") {
	require("jquery");
	require("popper.js");
	require("bootstrap");
}

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export default MyApp;
