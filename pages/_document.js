import {
  DocumentHeadTags,
  documentGetInitialProps,
} from "@mui/material-nextjs/v13-pagesRouter";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document(props) {
  return (
    <Html lang="en">
      <Head>
        <DocumentHeadTags {...props} />
        <link
          href="https://fonts.cdnfonts.com/css/lemon-milk"
          rel="stylesheet"></link>
      </Head>
      <body>
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
Document.getInitialProps = async (ctx) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
