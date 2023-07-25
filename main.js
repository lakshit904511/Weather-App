const usertab=document.querySelector("[data-userWeather]");
const searchtab=document.querySelector("[data-searchWeather]");
const usercontainer=document.querySelector(".weather-container");

const grantAccessContainer=document.querySelector(".grant-location-container");
const searchform=document.querySelector("[data-searchform]");
const loadingscreen=document.querySelector(".loading-container");
const userinfocontainer=document.querySelector(".user-info-container");

let oldTab=usertab;
const API_KEY="d1845658f92b31c64bd94f06f7188c9c";
oldTab.classList.add('curr-tab');
getfromsessionstorage();


function switchTab(newTab){
    if(newTab!=oldTab){
        oldTab.classList.remove("curr-tab");
        oldTab=newTab;
        oldTab.classList.add("curr-tab");

        if(!searchform.classList.contains("active")){
            userinfocontainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchform.classList.add("active");
        }
        else{
            searchform.classList.remove("active");
            userinfocontainer.classList.remove("active");
            getfromsessionstorage();
        }
    }
}
searchtab.addEventListener("click",()=>{
    switchTab(searchtab);
});
usertab.addEventListener("click",()=>{
    switchTab(usertab);
});
function   getfromsessionstorage(){
    const localcoordinate=sessionStorage.getItem("user-coordinates");
    if(!localcoordinate){
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates=JSON.parse(localcoordinate);
        fetchUserWratherInfo(coordinates);

    }
}
async function fetchUserWratherInfo(coordinates){
         const {lat,lon}=coordinates;
        //  make grant container invisible
        grantAccessContainer.classList.remove("active");
        // make loader visible
        loadingscreen.classList.add("active");
        // api call
        try{
            const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
            const data= await response.json();
            loadingscreen.classList.remove("active");
            userinfocontainer.classList.add("active");
            renderWeatherInfo(data);
        }
        catch(err){
            loadingscreen.classList.remove("active");
        }

}
function renderWeatherInfo(weatherinfo){
    // first we fetch the element
    const cityname=document.querySelector("[data-cityName]");
    const countryicon=document.querySelector("[data-countryIcon]");
    const desc=document.querySelector("[data-weatherDesc]");
    const weathericon=document.querySelector("[data-weatherIcon]");
    const temp=document.querySelector("[data-temp]");
    const windspeed=document.querySelector("[data-windspeed]");
    const humidity=document.querySelector("[data-humidity]");
    const cloudiness=document.querySelector("[data-cloudiness]");

    // fetch element from data
    cityname.innerText=weatherinfo?.name;
    countryicon.src=`https://flagcdn.com/144x108/${weatherinfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText=weatherinfo?.weather?.[0]?.description;
    weathericon.src=`http://openweathermap.org/img/w/${weatherinfo?.weather?.[0]?.icon}.png`;
    temp.innerText=`${weatherinfo?.main?.temp}°C`;
    windspeed.innerText=`${weatherinfo?.wind?.speed}m/s`;
    humidity.innerText=`${weatherinfo?.main?.humidity}%`;
    cloudiness.innerText=`${weatherinfo?.clouds?.all}%`;
}
function getlocation(){
    if(navigator.geolocation){
         navigator.geolocation.getCurrentPosition(showposition);
    }
    else{
        // alert("No geolocation support");
    }
}

function showposition(position){
    const usercoordinates={
    lat:position.coords.latitude,
    lon:position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates",JSON.stringify(usercoordinates));
    fetchUserWratherInfo(usercoordinates);
}
const grantaccessbtn=document.querySelector("[data-grant-access]");
grantaccessbtn.addEventListener("click",getlocation);

const searchinput=document.querySelector("[data-searchInput]");
searchform.addEventListener("submit",(e)=>{
         e.preventDefault();
         let cityname=searchinput.value;

         if(cityname==="")
            return;
         else
           fetchsearchWratherInfo(cityname);
});

async function fetchsearchWratherInfo(city){
         loadingscreen.classList.add("active");
         userinfocontainer.classList.remove("active");
         grantAccessContainer.classList.remove("active");

         try {
            const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await response.json();
            loadingscreen.classList.remove("active");
            userinfocontainer.classList.add("active");
            renderWeatherInfo(data);
         } catch (error) {
            
         }
}







































// const API_KEY="d1845658f92b31c64bd94f06f7188c9c"
// function renderWeatherInfo(data){
//     let newpara=document.createElement('p');
//     newpara.textContent=`${data?.main?.temp.toFixed(2)} C`
//     document.body.appendChild(newpara);
// }
// async function fetchweatherdetails(){
//     // api se data lena ka format
//       try {
//           let city="goa";
//           const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
//           const data= await response.json();
//           console.log(data);
//           renderWeatherInfo(data);
//       } catch (error) {
        
//       }
// }

// function switchTab(clickTab){
//     apiErrorContainer.classList.remove("active");
//     if(clickTab!=currentTab){
//         currentTab.classList.remove("current-tab");
//         currentTab=clickTab;
//         currentTab.classList.add("current-tab");
//     }
//     if(!searchForm.classList.contains("active")){
//         userInfoContainer.classList.remove("active");
//         grantAccessContainer.classList.remove("active");
//         searchForm.classList.add("active");
//     }
//     else{
//         searchForm.classList.remove("active");
//         userInfoContainer.classList.remove("active");
//     }
// }

// function getLocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else{
//         console.log("No geolocation Support");
//     }
// }

// function showPosition(position){
//     let lat=position.coords.latitude;
//     let longi=position.coords.longitude;

//     console.log(lat);
//     console.log(longi);
// }