// DOM Selectors
const quotes = document.querySelector(".quotes");
const quotesAuthor = document.querySelector(".quotes__author");
const dates = document.querySelector(".dates");
const months = document.querySelector(".months");
const days = document.querySelector(".days");
const greetings = document.querySelector(".greetings");
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const ampm = document.querySelector(".ampm");
const mainBGImage = document.querySelector(".main__bg");
const division = document.querySelector(".division");
const weatherTemp = document.querySelector(".weather__temperature");
const temp = document.querySelector(".temperature");
const fahrenheit = document.querySelector(".fahrenheit");
const weatherTimezone = document.querySelector(".weather__timezone");
const weatherSummery = document.querySelector(".weather__summery");
const weatherFeels = document.querySelector(".weather__feels--like");
const weatherLowTemp = document.querySelector(".low__temp");
const weatherHighTemp = document.querySelector(".high__temp");
const weatherIcon = document.querySelector(".weather__icon");
const timeGreetingsIcon = document.querySelector(".time__greetings--icon");

// Request Quotes API show data
const getQoutes = async () => {
  try {
    const { data } = await axios.get("https://api.quotable.io/random/");
    const { content, author } = data;
    quotes.innerText = `"${content}"`;
    quotesAuthor.innerText = author;
  } catch (error) {
    console.log(error);
  }
};

// Set Dates
const setDate = () => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = new Date().getDate();
  let month = new Date().getMonth();
  let day = new Date().getDay();

  dates.innerText = date;
  months.innerText = monthName[month];
  days.innerText = "Today's " + weekday[day];
};

// Set Clock Time
const getTime = () => {
  let h = new Date().getHours();
  let m = new Date().getMinutes();
  let s = new Date().getSeconds();

  // Set Greetings and bg image
  let greet = "";
  if (h >= 5 && h <= 11) {
    greet = "Morning";
    mainBGImage.src = "assets/images/morning.jpg";
  } else if (h >= 12 && h <= 17) {
    greet = "Afternoon";
    mainBGImage.src = "assets/images/noon.jpg";
  } else {
    greet = "Evening";
    mainBGImage.src = "assets/images/evening.jpg";
  }
  greetings.innerText = `Good ${greet}, It's Currently`;

  // Set Time
  if (h > 12) {
    hours.innerText = h - 12;
    ampm.innerText = "PM";
  } else {
    hours.innerText = h;
    ampm.innerText = "AM";
  }
  if (h < 10) {
    h = "0" + h;
  }
  if (m < 10) {
    m = "0" + m;
  }
  if (s < 10) {
    s = "0" + s;
  }
  minutes.innerText = ":" + m;
  seconds.innerText = s;
};

// Current Timezone and longitude, latitude
const getTimezone = async () => {
  try {
    const { data } = await axios.get("https://freegeoip.app/json/");
    const {
      country_code,
      country_name,
      latitude,
      longitude,
      region_name,
      time_zone,
    } = data;

    division.innerText = `In ${region_name}, ${country_code}`;
    getWeather(latitude, longitude);
  } catch (error) {
    console.log(error);
  }
};
// Get Weather data
const getWeather = async (lat, long) => {
  try {
    const proxy = "https://cors-proxy.tk/?url=";
    const { data } = await axios.get(
      `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`
    );

    const { summary, temperature, icon } = data.currently;
    const { temperatureHigh, temperatureLow } = data.daily.data[0];

    temp.innerText = Math.floor(temperature);

    //Fahrenheit to Celsias Forumula
    let celsias = Math.floor((temperature - 32) * (5 / 9));

    //Temperature convert to Celsias
    weatherTemp.addEventListener("click", () => {
      if (fahrenheit.innerText === "F") {
        fahrenheit.innerText = "C";
        temp.innerText = celsias;
      } else {
        fahrenheit.innerText = "F";
        temp.innerText = Math.floor(temperature);
      }
    });

    weatherTimezone.innerText = data.timezone;
    weatherSummery.innerText = summary;
    weatherFeels.innerText = `Feels Like ${celsias}° C`;
    weatherLowTemp.innerText = Math.floor(temperatureLow) + "° F";
    weatherHighTemp.innerText = Math.floor(temperatureHigh) + "° F";
    setIcons(icon, weatherIcon);
    setIcons(icon, timeGreetingsIcon);
  } catch (error) {
    console.log(error);
  }
};

// Set Weather Icons
const setIcons = (icon, iconId) => {
  const skycons = new Skycons({ color: "white" });
  const currentIcon = icon.replace(/-/g, "_").toUpperCase();
  skycons.play();
  return skycons.set(iconId, Skycons[currentIcon]);
};

getQoutes();
getTimezone();
setDate();
setInterval(getTime, 1000);
