import { useRef, useState } from "react";
import { Dimensions } from "react-native";
import WebView from "react-native-webview";

type Props = {
  content: string;
};

const HtmlDisplay = ({ content }: Props) => {
  const { width } = Dimensions.get("window");

  const [webViewHeight, setWebViewHeight] = useState(800);
  const webViewRef = useRef(null);

  const htmlContent = `
    <html>
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
      <style>
        body {  direction: rtl;  }
      </style>
    </head>
      <body>
        ${content}
      </body>
    </html>
  `;

  const injectedJavaScript = `
  setTimeout(function() {
    window.ReactNativeWebView.postMessage(document.body.scrollHeight);
  }, 500);
  true; 
`;

  const handleWebViewMessage = (event: any) => {
    setWebViewHeight(Number(event.nativeEvent.data));
  };

  return (
    <WebView
      ref={webViewRef}
      originWhitelist={["*"]}
      source={{ html: htmlContent }}
      style={{ width: width - 40, height: webViewHeight }}
      scalesPageToFit={false}
      injectedJavaScript={injectedJavaScript}
      javaScriptEnabled
      onMessage={handleWebViewMessage}
    />
  );
};

export default HtmlDisplay;
