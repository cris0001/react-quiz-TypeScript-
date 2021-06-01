import { createGlobalStyle } from 'styled-components'
import BGImage from './images/bcg.jpg'

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    background-image: url(${BGImage});
    background-size: cover;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }
  * {
    font-family: 'Catamaran', sans-serif;
    box-sizing: border-box;
  }
`
