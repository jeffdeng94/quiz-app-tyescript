import styled, { createGlobalStyle } from 'styled-components'
import BGImg from './images/sea-edge-79ab30e2.png'

export const GlobalStyle = createGlobalStyle`
  html{
    height:100%;
  }

  body{
    background-image:url(${BGImg});
    background-size:cover;
    margin:0;
    padding:0 20px;
    display:flex;
    justify-content:center;
  }

  *{
    box-sizing:border-box;
    font-family:'Lato',sans-serif;
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #fff;
  }

  .score {
    color: #000;
    font-size: 2rem;
    margin: 0 0 20px 0;
  }

  h1 {
    background: -webkit-linear-gradient(
      to right,
      #8360c3,
      #2ebf91
    ); /* Chrome 10-25, Safari 5.1-6 */
    background-image: linear-gradient(to right, #2196f3, #f44336);
    background-clip: text;
    -webkit-background-clip: text;
    background-size: 100%;
    color: transparent;
    font-size: 70px;
    font-weight: 700;
    text-align: center;
    margin: 20px;
  }

  .start,
  .next {
    color: #fff;
    cursor: pointer;
    background: linear-gradient(to right, #c2e59c, #64b3f4);
    border: 1px solid #c2e59c;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
  }

  .start {
    max-width: 200px;
  }
`
