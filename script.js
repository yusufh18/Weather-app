const temp = document.getElementById('temp')
const wind = document.getElementById('wind')
const humid = document.getElementById('humid')
const cityName = document.getElementById('city-name');
const currentWeatherImg = document.getElementsByClassName('weather-icon-current-img')[0];
const temps= document.getElementsByClassName('temp')
const winds= document.getElementsByClassName('wind')
const humids= document.getElementsByClassName('humid')
const forecastDate= document.getElementsByClassName('forecast-date');
const weatherImg= document.getElementsByClassName('weather-icon-img');
const searchBtn = document.getElementsByClassName ('btn')[0];

function fetchCity(city){

    //https://api.openweathermap.org/geo/1.0/direct?q=georgia,GA,US&limit=1&appid=e07f2134fbf4de2d5bc9670bbcb2f882

    //http://api.openweathermap.org/geo/1.0/direct?q=atlanta&limit=5&appid=e07f2134fbf4de2d5bc9670bbcb2f882
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=e07f2134fbf4de2d5bc9670bbcb2f882`)
    .then(response => response.json())
    .then(data => {
        
        let result = data[0];
        let lat = result.lat;
        let lon = result.lon;

        // get forecast  of the currnet location
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e07f2134fbf4de2d5bc9670bbcb2f882`)
        .then(response => response.json())
        .then(data => {
             //display them on html page
            console.log(data)
            const dayOne=data.list[0];
            forecastDate[0].innerText=(new Date(dayOne.dt_txt)).toLocaleDateString('en-US');
            if(dayOne.clouds.all > 50){
                weatherImg[0].src = "Assets/clouds.png";
            }
            else{
                weatherImg[0].src = "Assets/sun.png";
            }
            temps[0].innerText=dayOne.main.temp
            humids[0].innerText=dayOne.main.humidity
            winds[0].innerText=dayOne.wind.speed+'MPH'

            const dayTwo=data.list[8]
            forecastDate[1].innerText=(new Date(dayTwo.dt_txt)).toLocaleDateString('en-US');
            if(dayTwo.clouds.all > 50){
                weatherImg[1].src = "Assets/clouds.png";
            }
            else{
                weatherImg[1].src = "Assets/sun.png";
            }
            temps[1].innerText=dayTwo.main.temp
            humids[1].innerText=dayTwo.main.humidity
            winds[1].innerText=dayTwo.wind.speed+'MPH'


            const dayThree=data.list[16]
            forecastDate[2].innerText=(new Date(dayThree.dt_txt)).toLocaleDateString('en-US');
            if(dayThree.clouds.all > 50){
                weatherImg[2].src = "Assets/clouds.png";
            }
            else{
                weatherImg[2].src = "Assets/sun.png";
            }
            temps[2].innerText=dayThree.main.temp
            humids[2].innerText=dayThree.main.humidity
            winds[2].innerText=dayThree.wind.speed+'MPH'

            const dayFour=data.list[32]
            forecastDate[3].innerText=(new Date(dayFour.dt_txt)).toLocaleDateString('en-US');
            if(dayFour.clouds.all > 50){
                weatherImg[3].src = "Assets/clouds.png";
            }
            else{
                weatherImg[3].src = "Assets/sun.png";
            }
            temps[3].innerText=dayFour.main.temp
            humids[3].innerText=dayFour.main.humidity
            winds[3].innerText=dayFour.wind.speed+'MPH'

            const dayFive=data.list[39]
            forecastDate[4].innerText=(new Date(dayFive.dt_txt)).toLocaleDateString('en-US');
            if(dayFive.clouds.all > 50){
                weatherImg[4].src = "Assets/clouds.png";
            }
            else{
                weatherImg[4].src = "Assets/sun.png";
            }
            temps[4].innerText=dayFive.main.temp
            humids[4].innerText=dayFive.main.humidity
            winds[4].innerText=dayFive.wind.speed+'MPH'
        })

        // get the weather of the current location
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e07f2134fbf4de2d5bc9670bbcb2f882`)
        .then(response => response.json())
        .then(data => {
            // display them on html page
            console.log(data)
            cityName.innerText=data.name+" ("+(new Date()).toLocaleDateString('en-US')+")";
            temp.innerText=data.main.temp;
            humid.innerText= data.main.humidity;
            wind.innerText=data.wind.speed+'MPH';

            if(data.clouds.all > 50){
                currentWeatherImg.src = "Assets/clouds.png";
            }
            else{
                currentWeatherImg.src = "Assets/sun.png";
            }
        })

    })
}
fetchCity("atlanta")
console.log("hello")
searchBtn.addEventListener('click',function(){
    let searchInput = document.getElementById("city-search").ariaValueMax;
    fetchCity(searchInput);
})

let btns = document.getElementsByClassName("cities-list")[0].getElementsByTagName("button");

for(let i = 0; i < btns.length; i++){
   
    let btn = btns[i];
    btn.addEventListener("click", function(){
        let value = this.getAttribute("data-city");
        fetchCity(value)
    })
   
}