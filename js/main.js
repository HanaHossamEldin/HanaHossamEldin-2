// Today
let todayName = document.getElementById("todayDayName");
let todayNumber = document.getElementById("todayDateNumber");
let todayMonth = document.getElementById("todayDateMonth");
let todayLocation = document.getElementById("todayLocation");
let todayTemp = document.getElementById("todayTemp");
let todayConditionImg = document.getElementById("todayConditionImg");
let todayConditionText = document.getElementById("todayConditionText");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let direction = document.getElementById("direction");


// Tomorrow
let tmwDateName = document.getElementsByClassName("tmwDate");
let tmwMaxTemp = document.getElementsByClassName("tmwMaxTemp");
let tmwMinTemp = document.getElementsByClassName("tmwMinTemp");
let tmwConditionText = document.getElementsByClassName("tmwConditionText");
let tmwConditionImg = document.getElementsByClassName("tmwConditionImg");

// search
let search = document.getElementById("search");


async function getWeather(city) {
  let forecast = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`)
  let res = await forecast.json()
  return res

  }
  
 
  function todayData(today){
  let todayD = new Date()
  todayName.innerHTML = todayD.toLocaleDateString("en-US",{weekday:"long"})
  todayNumber.innerHTML = todayD.getDate()
  todayMonth.innerHTML = todayD.toLocaleDateString("en-US",{month:"long"})
  todayLocation.innerHTML = today.location.name
  todayTemp.innerHTML = today.current.temp_c
  todayConditionText.innerHTML = today.current.condition.text
  todayConditionImg.setAttribute("src", today.current.condition.icon)
  humidity.innerHTML = today.current.humidity +"%"
  wind.innerHTML = today.current.wind_kph +"km/h"
  direction.innerHTML = today.current.wind_dir
  
  } 



  function nextData(data){
  let forecastData = data.forecast.forecastday
  for (let i=0; i<=2; i++)
  {
    let nextDay = new Date(forecastData[i+1].date)
     
     tmwMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c
     tmwMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c
     tmwConditionText[i].innerHTML = forecastData[i+1].day.condition.text 
     tmwConditionImg[i].setAttribute("src", forecastData[i+1].day.condition.icon)
     tmwDateName[i].innerHTML = nextDay.toLocaleDateString("en-US",{weekday:"long"})
     
   }
  }



  async function weatherData(city="cairo"){
    let res = await getWeather(city)
      todayData(res)
      nextData(res)
    
  }

  weatherData()


 search.addEventListener("input",function(){
  weatherData(search.value)
 })







// let myHttp = new XMLHttpRequest()

// myHttp.open("GET","https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${a}&days=3");

// myHttp.send();



// myHttp.addEventListener("readystatechange",function(){
// console.log(myHttp.readyState,'hello');



// if (myHttp.readyState == 4 && myHttp.status ==200){
//   let calendar = JSON.parse(myHttp.response).forecast
//   forecastDay = calendar.forecast
//   displayCalendar();
//   console.log(calendar.forecast)

// }
// })



// function displayCalendar(){
// let container ='';
// for (let i=0; i< forecastDay.length; i++){
//   container+=`<tr>
//   <th scope="col">${forecastDay[i].day}<span class="offset-7">${forecastDay[i].date}</span></th>
//   <th scope="col" class="text-center">${forecastDay[i].day}</th>
//   <th scope="col" class="text-center">${forecastDay[i].day}</th>
//   </tr>`
// }

// document.querySelector("#dateTime").innerHTML = container
// console.log()
// }