import styled from 'styled-components';

import colors, { main, white, transparentWhite, transparentBlack, black } from '../../../styles/colors';
import { mobile } from '../../../styles/devices';

export const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${transparentBlack};
  width: 100vw;
  height: 100vh;
  z-index: 9000000;
  left: 0;
  top: 0;
  opacity: 0;

  @supports (backdrop-filter: blur()) {
    background: ${transparentWhite};
    backdrop-filter: blur(10px);
  }
`;

export const Popup = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 30vw;
  height: 0;
  overflow-y: hidden;
  box-shadow: 0 0 10px 2px ${colors.grey};

  @media (max-width: ${mobile}px) {
    max-width: 90vw;
    height: 0;
  }
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 40px;
  background: ${main};
  color: ${white};
  border-radius: 5px 5px 0 0;
  text-transform: uppercase;
  P {
    font-weight: 500;
    position: relative;
    top: 3px;
  }
`;

export const Content = styled.div`
  background: ${white};
  border-radius: 0 0 5px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: ${black};
`;
