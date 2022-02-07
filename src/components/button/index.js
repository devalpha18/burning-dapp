import styled from 'styled-components'

export const StyledButton = styled.button`
  background: rgb(68, 113, 196);
  color: white;
  font-size: ${({ size }) => {
    switch (size) {
      case 'large':
        return '25px'
      case 'middle':
        return '20px'
      case 'small':
        return '15px'
      default:
        return '20px'
    }
  }};
  padding: ${({ size }) => {
    switch (size) {
      case 'large':
        return '15px 45px'
      case 'middle':
        return '10px 35px'
      case 'small':
        return '5px 20px'
      default:
        return '10px 35px'
    }
  }};
  border-radius: ${({ size }) => {
    switch (size) {
      case 'large':
        return '15px'
      case 'middle':
        return '10px'
      case 'small':
        return '5px'
      default:
        return '10px'
    }
  }};
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  :hover {
    transform: scale(0.95);
  }
`
