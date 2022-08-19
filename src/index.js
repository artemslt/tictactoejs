import './css/styles.css';

const DEBOUNCE_DELAY = 300;

fetch('https://restcountries.com/v3.1/name/can')
  .then(res => res.json())
  .then(data => {
    if (data.length > 10) {
      alert('ddd');
    }
    console.log('data', data);
  });
