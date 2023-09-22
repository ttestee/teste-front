import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/stylesHome.css';

const menuItems = [
  {
    path: '/desafio1',
    label: 'Monitoramento de servidores',
  },
  {
    path: '/desafio2',
    label: 'Monitoramento de bugs',
  },
  {
    path: '/desafio3',
    label: 'Monitoramento de requisições',
  },
  
];

const Home = () => {
  return (
    <div className='home-container'>
      <h1>Home</h1>
      <nav className='nav-list'>
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className='nav-list li'>
              <Link to={item.path} className='nav-list li a'>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Home;
