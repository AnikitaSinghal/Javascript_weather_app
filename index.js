const searchButton=document.getElementById("search-button")
let loc=document.getElementById("location");
let tempValue=document.getElementById("temp-value");
let tempIcon=document.getElementById("temp-icon");
let climate=document.getElementById("climate");
let currentTime=document.getElementById("current-time");
let maxtemp=document.getElementById("max-temp-value");
let mintemp=document.getElementById("min-temp-value");
const searchInput=document.getElementById("search-input");
const citynotfound=document.getElementById("city-not-found");
searchButton.addEventListener('click',(e)=>{
    e.preventDefault();
    getCurrentWeather(searchInput.value);
    searchInput.value='';
});
const getCurrentWeather=async(city)=>{
    try{
        const url=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d1f93c3df77c742b65a56fcd4eb251c4`);
        const WeatherData=await url.json();
        console.log(WeatherData);
        const{name}=WeatherData;
        const{feels_like}=WeatherData.main;
        const{id,main}=WeatherData.weather[0];
        const{temp_max}=WeatherData.main;
        const{temp_min}=WeatherData.main;
        loc.textContent=name;
        climate.textContent=main;
        tempValue.textContent=Math.round(feels_like-273);
        maxtemp.textContent=temp_max;
        mintemp.textContent=temp_min;
        let dateobj=new Date();
        let currentTime=dateobj.getHours();
        if(6<=currentTime && currentTime<17){
             document.body.className="day";
        }else if(17<currentTime && currentTime<=19){
             document.body.className="evening";
        }else{
            document.body.className="night";
        }
        if(id>200 && id<300){
            tempIcon.src="https://tse2.mm.bing.net/th?id=OIP.hzQ9r_TgknP4KyGVc3PGiAHaH_&pid=Api&P=0&w=159&h=172";
        }
        else if(id>300 && id<400){
            tempIcon.src="https://tse4.mm.bing.net/th?id=OIP.0JzltvzQqLoRsGuPBNC_RAHaHa&pid=Api&P=0&w=168&h=168";
        }
        else if(id>500 && id<600){
            tempIcon.src="https://tse4.mm.bing.net/th?id=OIP.bUY-RF3D0IZ2r9os9jDKRQHaGf&pid=Api&P=0&w=189&h=165";
        }
        else if(id>600 && id<700){
            tempIcon.src="https://tse3.mm.bing.net/th?id=OIP.wLVfNG9h6o9e99EZnkP5FgHaHa&pid=Api&P=0&w=163&h=163";
        }
        else if(id>700 && id<800){
            tempIcon.src="https://tse4.mm.bing.net/th?id=OIP.bix0D5VleVEEKvD3nWmKlQHaED&pid=Api&P=0&w=284&h=155";
        }
        else if(id>800 && id<900){
            tempIcon.src="https://tse3.mm.bing.net/th?id=OIP.aSFoBLIVYcHwdxtflF9g6QHaHa&pid=Api&P=0&w=187&h=187";
       }
        else(id==800)
            tempIcon.src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Weather-m-clear.svg/480px-Weather-m-clear.svg.png";
    }
    catch(error){
        console.log("Error is ",error);
        citynotfound.textContent="CITY NOT FOUND";
        searchInput.textContent='';
            loc.textContent='';
            climate.textContent='';
            tempValue.textContent='';
            maxtemp.textContent='';
            mintemp.textContent='';
        
    }
};
window.addEventListener("load",()=>{
    let dateobj=new Date();
    let currentDate=dateobj.toLocaleString();
    let longitude;
    let latitude;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            longitude=position.coords.longitude;
            latitude=position.coords.latitude;
            const api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d1f93c3df77c742b65a56fcd4eb251c4`;
            fetch(api).then((response)=>{
                return response.json();
            }).then((data)=>{
                const{name}=data;
                const{feels_like}=data.main;
                const{id,main}=data.weather[0];
                loc.textContent=name;
                climate.textContent=main;
                tempValue.textContent=Math.round(feels_like-273);
                currentTime.textContent=currentDate;
                console.log(data);
                if(id>200 && id<300){
                    tempIcon.src="https://tse2.mm.bing.net/th?id=OIP.hzQ9r_TgknP4KyGVc3PGiAHaH_&pid=Api&P=0&w=159&h=172";
                }
                else if(id>300 && id<400){
                    tempIcon.src="https://tse4.mm.bing.net/th?id=OIP.0JzltvzQqLoRsGuPBNC_RAHaHa&pid=Api&P=0&w=168&h=168";
                }
                else if(id>500 && id<600){
                    tempIcon.src="https://tse4.mm.bing.net/th?id=OIP.bUY-RF3D0IZ2r9os9jDKRQHaGf&pid=Api&P=0&w=189&h=165";
                }
                else if(id>600 && id<700){
                    tempIcon.src="https://tse3.mm.bing.net/th?id=OIP.wLVfNG9h6o9e99EZnkP5FgHaHa&pid=Api&P=0&w=163&h=163";
                }
                else if(id>700 && id<800){
                    tempIcon.src="https://tse4.mm.bing.net/th?id=OIP.bix0D5VleVEEKvD3nWmKlQHaED&pid=Api&P=0&w=284&h=155";
                }
                else if(id>800 && id<900){
                    tempIcon.src="https://tse3.mm.bing.net/th?id=OIP.aSFoBLIVYcHwdxtflF9g6QHaHa&pid=Api&P=0&w=187&h=187";
               }
                else(id==800)
                    tempIcon.src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Weather-m-clear.svg/480px-Weather-m-clear.svg.png";
            })
        })
    }
})