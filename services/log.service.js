import chalk from 'chalk';
import dedent from 'dedent-js';

export const printError = (error) => {
  console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

export const printSuccess = (message) => {
  console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

export const printHelp = () => {
  console.log(
    dedent`
        ${chalk.bgCyan(' HELP ')}
        -h - to show the help manual,
        -s [CITY] - to set up the city,
        -t [TOKEN] - to set up the token,
        without any arguments - to show the weather`
  );
};

export const printWeather = (data, icon) => {
  console.log(`
      ${chalk.bgBlue(' WEATHER ')}
      Weather for ${data.name}:
      ${icon} ${data.weather[0].description}
      Temperature: ${data.main.temp}°C
      Feels like: ${data.main.feels_like}°C
      Humidity: ${data.main.humidity}%
      Pressure: ${data.main.pressure}hPa
      Wind: ${data.wind.speed}m/s
    `);
};
