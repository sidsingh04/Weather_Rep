

//2.improve responsiveness of the layout and add cancel button

const but = document.getElementById('click')

const apikey = "1178cb0f7b41e53794a8a371d267776a";
const weather = document.querySelector('#weather');
const rep = document.querySelector('.rep');

//for loading current location weather info one time
let outer = document.createElement("div");
  let container = document.createElement("div");
  let con1 = document.createElement("div");//for storing the weather condition
  let con2 = document.createElement("div");//for windspeed and humidity
  let img1 = document.createElement("img");
  let img2 = document.createElement("img");
  let img3 = document.createElement("img");
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  let con3=document.createElement("div");

  p1.classList.add("para");
  p2.classList.add("para");
  img2.classList.add("clip");
  img1.classList.add("clip");
  img3.classList.add("clip");

//getting weather data from the input box
weather.addEventListener('submit', async(e) => {
  e.preventDefault();
  const city = weather.elements.data.value;
  let outer = document.createElement("div");
  let container = document.createElement("div");
  let con1 = document.createElement("div");//for storing the weather condition
  let con2 = document.createElement("div");//for windspeed and humidity
  let img1 = document.createElement("img");
  let img2 = document.createElement("img");
  let img3 = document.createElement("img");
  let p1 = document.createElement("p");
  let p2 = document.createElement("p");
  let con3=document.createElement("div");

  p1.classList.add("para");
  p2.classList.add("para");
  img2.classList.add("clip");
  img1.classList.add("clip");
  img3.classList.add("clip");

await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
    .then((res) => {
      
      container.classList.add("info");
      outer.classList.add("report");

      con2.classList.add("info2");
      con1.classList.add("info3");
      con3.classList.add("info2");

      con1.append(img3);
      rep.prepend(outer);
      outer.append(container);

      outer.append(con2);
      outer.prepend(con1);
      outer.append(con3);

      con2.append(img1, p1);
      con3.append(img2,p2);

      const icon=res.data.weather[0].icon;
      const condition = res.data.weather[0].main;
      img1.src = "./media/windspeed.png";
      img2.src = "./media/humidity.png";
      img3.classList.add("condition");

      img3.src=`http://openweathermap.org/img/w/${icon}.png`;
      //these if would give us the custom images for some of the weather conditions....
      if (condition == "Clouds")
        img3.src = "./media/clouds.png";
      else if (condition == "Clear")
        img3.src = "./media/clear.png"
      else if (condition == "Drizzle")
        img3.src = "./media/drizzle.png"
      else if (condition == "Rain")
        img3.src = "./media/rain.png"
      else if (condition == "Mist")
        img3.src = "./media/mist.png"
      else if (condition == "Snow")
        img3.src = "./media/snow.png";

      const tempr = res.data.main.temp;
      const winds = res.data.wind.speed;
      const humid = res.data.main.humidity;
      p1.innerHTML = `WIND SPEED<br><br>${winds}Km/H<br>`;
      p2.innerHTML = `HUMIDITY<br><br>${humid}%`;
      container.innerHTML = `<h2>${res.data.name}</h2><br>${tempr}°C`;
    })
    .catch((e) => {
      alert("Enter a Valid City Name!!!");
    })


})


//would enable the auto location weather fetcher feature
async function gotLocation(pos){
   
   let lat=pos.coords.latitude;
   let long=pos.coords.longitude;
   await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apikey}&units=metric`)
   .then((res)=>{
    container.classList.add("info");
    outer.classList.add("report");

    con2.classList.add("info2");
    con1.classList.add("info3");
    con3.classList.add("info2");

    con1.append(img3);
    rep.prepend(outer);
    outer.append(container);

    outer.append(con2);
    outer.prepend(con1);
    outer.append(con3);

    con2.append(img1, p1);
    con3.append(img2,p2);

    const icon=res.data.weather[0].icon;
    const condition = res.data.weather[0].main;
    img1.src = "./media/windspeed.png";
    img2.src = "./media/humidity.png";
    img3.classList.add("condition");

    img3.src=`http://openweathermap.org/img/w/${icon}.png`;
    //these if would give us the custom images for some of the weather conditions....
    if (condition == "Clouds")
      img3.src = "./media/clouds.png";
    else if (condition == "Clear")
      img3.src = "./media/clear.png"
    else if (condition == "Drizzle")
      img3.src = "./media/drizzle.png"
    else if (condition == "Rain")
      img3.src = "./media/rain.png"
    else if (condition == "Mist")
      img3.src = "./media/mist.png"
    else if (condition == "Snow")
      img3.src = "./media/snow.png";

    const tempr = res.data.main.temp;
    const winds = res.data.wind.speed;
    const humid = res.data.main.humidity;
    p1.innerHTML = `WIND SPEED<br><br>${winds}Km/H<br>`;
    p2.innerHTML = `HUMIDITY<br><br>${humid}%`;
    container.innerHTML = `<h2>${res.data.name}</h2><br>${tempr}°C`;
   }
   ).catch(e=>alert('Went wrong'))
   

   
   
}

function Noget(){
  console.log("Your location not fetched");
}

window.addEventListener('load',(e)=>{
    navigator.geolocation.getCurrentPosition(gotLocation,Noget);
})

