import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/stylesHome.css';
import Desafio1 from './desafio1';
import Desafio2 from './desafio2';
import Desafio3 from './desafio3';
import Desafio4 from './desafio4';

const Home = () => {
  return (
    <div className='home-container'>
      <h1>Desafios do teste para vaga</h1>
      <nav className='nav-list'>
        <ul>
          <li className='nav-list li'>
            <Link to="/desafio1" className='nav-list li a'>
              desafio1
            </Link>
          </li>
          <li>
            <Link to="/desafio2" className='nav-list li a'>
              desafio2
            </Link>
          </li>
          <li className='nav-list li'>
            <Link to="/desafio3" className='nav-list li a'>
              desafio3
            </Link>
          </li>
          <li className='nav-list li'>
            <Link to="/desafio4" className='nav-list li a'>
              desafio4
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
