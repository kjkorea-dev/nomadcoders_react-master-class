import React, { useEffect } from "react";
import styled, {
  createGlobalStyle,
  css,
  ThemeProvider,
} from "styled-components";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";

import { theme } from "./theme";

const reset = css`
  @import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap");
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  menu,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
    display: none;
  }
  body {
    line-height: 1;
  }
  menu,
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-weight: 300;
    font-family: "Source Sans Pro", sans-serif;
    color: black;
    line-height: 1.2;
    background: linear-gradient(135deg, #e09, #d0e);
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const GlobalStyle = createGlobalStyle`${reset}`;

const Wrapper = styled(motion.div)`
  width: 100vw;
  height: 200vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const App = () => {
  const x = useMotionValue(0);
  const scaleX = useTransform(x, [-800, 0, 800], [2, 1, 0]);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x,
    [-800, 0, 800],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
      "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
    ]
  );
  const { scrollY, scrollYProgress } = useScroll();
  const scaleY = useTransform(scrollYProgress, [0, 1], [1, 3]);
  useEffect(() => {
    scrollY.onChange(() => {
      console.log(scrollY.get(), scrollYProgress.get());
    });
  }, [scrollY, scrollYProgress]);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper style={{ background: gradient }}>
        <Box style={{ x, scale: scaleY, rotateZ }} drag="x" dragSnapToOrigin />
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;
