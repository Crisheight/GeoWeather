window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");       
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid={APPID}`;

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temp} = data.main;
                const {country} = data.sys;
                const {name} = data;
                const {description, icon} = data.weather[0];
                
                //Set DOM Elements from the API
                temperatureDegree.textContent = Math.floor(temp);
                temperatureDescription.textContent = description;
                locationTimezone.textContent = country+" / "+name;
                
                //Converting Degrees
                let celsius = (temp - 32) * (5 / 9);

                //Set Icon
                setIcons(icon, document.querySelector('.icon'))

                //Change Farenheit to Celsius
                temperatureSection.addEventListener("click", () => {
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C"; 
                        temperatureDegree.textContent = Math.floor(celsius);
                    }
                    else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(temp);
                    }
                });
            });
        });
    } 
    else {
        h1.textContent = "please enable geolocation for proper functionality"
    }
    
    function replacementIcons(icon) {
        if (icon == "01d")
            return "CLEAR_DAY";
        if (icon == "01n")
            return "CLEAR_NIGHT";
        if (icon == "02d")
            return "PARTLY_CLOUDY_DAY";
        if (icon == "02n")
            return "PARTLY_CLOUDY_NIGHT";
        if (icon == "03d") 
            return "PARTLY_CLOUDY_DAY";
        if (icon == "03n")
            return "PARTLY_CLOUDY_NIGHT";
        if (icon == "04d")
            return "CLOUDY";
        if (icon == "04n")
            return "CLOUDY";
        if (icon == "09d")
            return "RAIN";
        if (icon == "09n")
            return "RAIN";
        if (icon == "10d")
            return "RAIN";
        if (icon == "10n")
            return "RAIN";
        if (icon == "11d")
            return "RAIN";
        if (icon == "11n")
            return "RAIN";
        if (icon == "13d")
            return "SNOW";
        if (icon == "13n") 
            return "SNOW"; 
        if (icon == "50d")
            return "FOG";
        if (icon == "50n")
            return "FOG";
        else 
            return "WIND";
        
    }
    
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"})
        const currentIcon = replacementIcons(icon);
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});