/* import Footer from "@/Components/footer"; */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      {/* Not needed if we import font in globals.css ????
       <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      /> */}
      <body className="font-quicksand antialiased"> {/* font-quicksand from tailwind.config.js */}
        <Main />
        <NextScript />
        {/* <Footer></Footer> */}
      </body>
    </Html>
  );
}
