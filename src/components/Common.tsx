import styled from "styled-components";

export const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

export const Header = styled.li`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.titleColor};
  margin: 0 10px;
`;

export const CoinsList = styled.ul``;

export const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.btnTextColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in;
    padding: 20px;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

export const Loader = styled.span`
  text-align: center;
  display: block;
`;

export const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

export const TabWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
`;

export const OverViewWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background-color: ${(props) => props.theme.accentColor};
  width: 100%;
  height: 50px;
  border-radius: 10px;
  padding: 10px;
`;

export const Expl = styled.p`
  margin: 20px 0;
`;
