// pages/_app.jsx  (or pages/_app.js)
import '../app/globals.css'; // Adjust path if needed
//import '../styles/globals.css'; // Adjust path if needed

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;