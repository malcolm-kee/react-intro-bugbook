import styled from 'styled-components';

export const Button = styled.button`
  position: relative;
  padding: 8px 16px;
  text-transform: capitalize;
  min-height: 36px;
  min-width: 70px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1.2;
  cursor: pointer;
  border: 2px solid rgba(0, 0, 0, 0);
  border-radius: 5px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12);
  color: #fff;
  background: #29487d;
  ${({ color }) =>
    color === 'white'
      ? `
  background: #fff;
  color: #29487d;
  border: 1px solid #29487d;
  `
      : ''}

  &:hover {
    color: red;
  }
`;
