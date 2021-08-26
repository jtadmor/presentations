import styled from 'styled-components';

import Header from './Header'
import SingleNumberAnalysis from './analyses/SingleNumberAnalysis';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Header/>
      <Dashboard>
        <SingleNumberAnalysis/>
        <SingleNumberAnalysis/>
      </Dashboard>
    </div>
  );
}

const Dashboard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;
