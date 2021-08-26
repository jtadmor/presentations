import {useEffect, useState} from 'react';
import styled from 'styled-components'

import {getDailyDeffectCount} from '../client'

import AnalysisContainer from './AnalysisContainer';

const StyledResult = styled.div`
font-size: 20rem`;

export default function SingleNumberAnalysis(){
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    getDailyDeffectCount().then(setResult)
  }, [])

  return (<AnalysisContainer title="Number of deffects today">
    <StyledResult>
    {result == null ? '...': result}
  </StyledResult>
  </AnalysisContainer>)

}
