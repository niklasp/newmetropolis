import '../styles/index.scss';
import './apps.js';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

console.log('webpack starterkit');
