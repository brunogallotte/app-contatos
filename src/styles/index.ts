import styled, { createGlobalStyle } from 'styled-components'

const EstiloGlobal = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
  }
`

export default EstiloGlobal

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  margin: 0 auto;
  max-width: 768px;
  max-height: 1024px;
  min-height: 100vh;
`

export const H1 = styled.h1`
  display: flex;
  justify-content: flex-start;
  font-size: 36px;
  width: 640px;
  heigth: 200px;
`
