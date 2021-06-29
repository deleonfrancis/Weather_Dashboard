function getWeather(input) {
    $.ajax({
      method: "GET",
      url: `http://api.weatherapi.com/v1/forecast.json?key=${apiKeyWeatherAPI}&q=${input}&days=3&aqi=yes&alerts=yes`,
  
      datatype: "json",
      success: function (response) {
        $("#city-current-weather").removeClass("hidden");
        $("#uv").removeClass("hidden");
        $("#2-day-weather").removeClass("hidden");
  
        console.log(response);
  
        const city = response.location.name;
        const state = response.location.region;
        const country = response.location.country;
  
        const temp = Math.round(response.current.temp_f);
        const feels_like = Math.round(response.current.feelslike_f);
        const highTemp = Math.round(
          response.forecast.forecastday[0].day.maxtemp_f
        );
        const lowTemp = Math.round(
          response.forecast.forecastday[0].day.mintemp_f
        );
  
        const humidity = Math.round(response.current.humidity);
  
        const uv = response.forecast.forecastday[0].day.uv;
  
        const icon = response.forecast.forecastday[0].day.condition.icon;
  
        const windSpeed = response.current.wind_mph;
        const windDir = response.current.wind_dir;
        const windDegree = response.current.wind_degree;
  
        const sunrise = response.forecast.forecastday[0].astro.sunrise;
        const sunset = response.forecast.forecastday[0].astro.sunset;
  
        const chanceOfRain =
          response.forecast.forecastday[0].day.daily_chance_of_rain;
  
        const description = response.forecast.forecastday[0].day.condition.text;
        let arrayDescription = description.split(" ");
        let capDescription = "";
        for (let i = 0; i < arrayDescription.length; i++) {
          arrayDescription[i] =
            arrayDescription[i][0].toUpperCase() + arrayDescription[i].substr(1);
          capDescription = arrayDescription.join(" ");
        }
  
        if (country === "United States of America") {
          $("#cityName").text(`${city}, ${state}`);
        } else {
          $("#cityName").text(`${city}, ${country}`);
        }
  
        $("#weather-desc").text(capDescription);
        $("#temp").text(`${temp}°`);
        $("#feelsLike").text(feels_like);
        $("#highTemp").text(highTemp);
        $("#lowTemp").text(lowTemp);
        $("#humid").text(humidity);
        $("#windSpeed").text(windSpeed);
        $("#windDir").text(`${windDir}, ${windDegree}`);
        $("#uv").text(uv);
  
        // Put icon on the page
        const todayIconImage = $("<img>");
        todayIconImage.attr("src", icon);
        $("#today-icon").html(todayIconImage);
  
        ///////////////   3 Day Weather
  
        // Day One
        const day1 = response.forecast.forecastday[1];
        const date = day1.date;
        const maxTemp1 = day1.day.maxtemp_f;
        const minTemp1 = day1.day.mintemp_f;
        const avgHumidity1 = day1.day.avghumidity;
        const chance_of_rain1 = day1.day.daily_chance_of_rain;
  
        $("#day1").text(date);
        $("#maxTemp1").text(maxTemp1.toFixed(0));
        $("#minTemp1").text(minTemp1.toFixed(0));
        $("#humid1").text(avgHumidity1);
        $("#rainChance1").text(chance_of_rain1);
  
  
        // Icon for Day 1
        const iconDay1Url = day1.day.condition.icon;
        const iconImageDay1 = $("<img>");
        iconImageDay1.attr("src", iconDay1Url);
        $("#icon-day1").html(iconImageDay1);
  
        // Day Two
        const day2 = response.forecast.forecastday[2];
        const date2 = day2.date;
        const maxTemp2 = day2.day.maxtemp_f;
        const minTemp2 = day2.day.mintemp_f;
        const avgHumidity2 = day2.day.avghumidity;
        const chance_of_rain2 = day2.day.daily_chance_of_rain;
  
        $("#day2").text(date2);
        $("#maxTemp2").text(maxTemp2.toFixed(0));
        $("#minTemp2").text(minTemp2.toFixed(0));
        $("#humid2").text(avgHumidity2);
        $("#rainChance2").text(chance_of_rain2);
  
        // Icon for Day 2
        const iconDay1Url2 = day2.day.condition.icon;
        const iconImageDay2 = $("<img>");
        iconImageDay2.attr("src", iconDay1Url2);
        $("#icon-day2").html(iconImageDay2);
      },
    });
  }