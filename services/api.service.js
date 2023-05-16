import https from 'https';
import axios from 'axios';
import { getKeyValue, KEYS_DICTIONARY } from './storage.service.js';

export const getWeather = async (city) => {
  const token = await getKeyValue(KEYS_DICTIONARY.token);
  if (!token) {
    throw new Error(
      'Token not found, please set token first using -t [token] flag'
    );
  }
  const { data } = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        q: city,
        appid: token,
        units: 'metric',
      },
    }
  );
  return data;
};

export const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case '01':
      return '☀️';
    case '02':
      return '🌤️';
    case '03':
      return '☁️';
    case '04':
      return '☁️';
    case '09':
      return '🌧️';
    case '10':
      return '🌦️';
    case '11':
      return '🌩️';
    case '13':
      return '❄️';
    case '50':
      return '🌫️';
  }
};

// To test how https.get works
export const getWeatherHTTPS = async (city) => {
  const token = await getKeyValue(KEYS_DICTIONARY.token);
  if (!token) {
    throw new Error(
      'Token not found, please set token first using -t [token] flag'
    );
  }
  return new Promise((resolve, reject) => {
    const url = new URL(`https://api.openweathermap.org/data/2.5/weather`);
    url.searchParams.append('q', city);
    url.searchParams.append('appid', token);
    url.searchParams.append('units', 'metric');

    https.get(url, (response) => {
      let res = '';
      response.on('data', (chunk) => {
        res += chunk;
      });
      response.on('end', () => {
        console.log(JSON.parse(res));
        resolve(res);
      });
      response.on('error', (err) => {
        reject(err);
      });
    });
  });
};
