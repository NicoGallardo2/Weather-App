const info = document.getElementById("forminfo");
const cityInfo = document.getElementById("cityList");

function containsNumber(value) {
  return /[0-9]/.test(value);
}

info.addEventListener("submit", async function (e) {
  e.preventDefault();
  cityInfo.innerHTML = "";
  const inp = document.getElementById("input").value;
  if (inp == "" || containsNumber(inp) == true) {
    alert("City name can't be empty or contain numbers");
    return false;
  } else {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${inp}&appid=d12a52866ef8ca98c2430dc15a69b34d`
      );
      const { temp, humidity, feels_like } = res.data.main;
      const temperature = Math.trunc(temp - 273.15);
      const feelsLike = Math.trunc(feels_like - 273.15);
      const wind = Math.trunc(res.data.wind.speed * 0.62);
      cityInfo.insertAdjacentHTML(
        "beforeend",
        `<li>${inp.toUpperCase()}: ${temperature}Cº, Feels like ${feelsLike}Cº, H: ${humidity}%, ${wind}km/h</li>`
      );
    } catch (e) {
      alert(`Error! ${e.code}`);
    }
  }
});
