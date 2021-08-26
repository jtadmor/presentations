import styled from 'styled-components'

type Props = {
  title: string;
  children: React.ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: solid #aaaaaa 2px;
  border-radius: 1%;
  margin: 0.2rem;
  height: 400px;
`;

const TitleContainer = styled.div`
  padding: 0.25rem;
  border-bottom: solid #cccccc 2px;
  font-weight: bold;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


export default function AnalysisContainer({title, children}: Props) {
  return (
  <Container>
    <TitleContainer>{title}</TitleContainer>
    <ChartContainer>{children}</ChartContainer>
  </Container>)
}
