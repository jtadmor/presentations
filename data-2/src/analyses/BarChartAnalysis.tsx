import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

import AnalysisContainer from './AnalysisContainer';
import {getDeffectsPerHour} from '../client';
import type {HourlyDeffectCount} from '../types';

export default function BarChartAnalysis(){
  const [data, setData] = useState<HourlyDeffectCount[] | null>(null)

  useEffect(() => {
    getDeffectsPerHour().then(setData)
  }, [])

  if (data == null) {
    return <div>...</div>
  }

  return <AnalysisContainer title="Deffect count by hour">
     <Chart
      width={'90%'}
      height={'350px'}
      chartType="Bar"
      loader={<div>...</div>}
      data={[
        ['Hour', 'Deffect count'],
        ...data.map(({label, value}) => [label, value])
      ]}
      options={{
        legend: { position: 'none'},
      }}
      // For tests
      rootProps={{ 'data-testid': '2' }}
      />

    </AnalysisContainer>
}


