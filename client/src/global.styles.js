import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans Condensed';
    padding: 20px 60px;
    
    @media screen and (max-width: 800px) {
      padding: 10px;
    }
  }


  a {
    text-decoration: none;
    color: black;
  }

  * {
    box-sizing: border-box;
  }

  .no-select {
    -webkit-user-select: none; /* Chrome all / Safari all */
    -moz-user-select: none; /* Firefox all */
    -ms-user-select: none; /* IE 10+ */
    user-select: none; /* Likely future */
  }
`;
