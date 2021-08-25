import React, { useState, useContext, useEffect } from 'react';
import './App.css';
import './styles/index.scss';
import { Col, Row, Container } from 'react-bootstrap';
import Filters from './components/Filter/Filters';
import { DevicesProvider } from './Context/DevicesContext';
import { DevicesContext } from './Context/DevicesContext';
import ColComposition from './components/Layout/ColComposition';
import MainTable from './components/Layout/MainTable';


function App() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const { activeRow, activeGroup, activeSGroup } = useContext(DevicesContext);

  useEffect(() => {}, [activeRow.selected, activeSGroup, activeGroup]);

  const handleClick = () => {
    setFiltersOpen(true);
  };

  return (
    <DevicesProvider>
      <Container fluid>
        <Row className='mt-4'>
          {filtersOpen && (
            <Col md={2} className='pl-0 filters-box_container'>
              <Filters setFiltersOpen={setFiltersOpen} />
            </Col>
          )}
          <MainTable filtersOpen={filtersOpen} handleClick={handleClick} />
          <ColComposition />
        </Row>
      </Container>
    </DevicesProvider>
  );
}

export default App;
