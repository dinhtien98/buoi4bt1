import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Input } from "reactstrap";
import "./weather.css";
import { format } from "date-fns";

export default function Weather() {
  const [date, setData] = useState(null);
  const [city, setCity] = useState("Ho Chi Minh");
  const [text, setText] = useState("");
  const [err, setErr] = useState(null);
  const APIkey = "9cd343d74b3bf1eb62fc89a2a1019c52";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`;
  const fetchData = () => {
    axios
      .get(url)
      .then(function (res) {
        setData(res.data);
        console.log(res);
        setErr(null);
      })
      .catch(function (error) {
        if (error.response.status == "404") {
          setErr("nhập sai tên thành phố");
        }
      });
  };
  const gettime = (index) => {
    const sunriseTimestamp = index * 1000;
    const formattedSunrise = format(
      new Date(sunriseTimestamp),
      "yyyy-MM-dd HH:mm:ss"
    );
    return formattedSunrise;
  };
  useEffect(() => {
    fetchData();
  }, [city]);
  return (
    <div>
      <Container className="container">
        <div className="inputCity">
          <Input
            type="text"
            value={text}
            placeholder="Nhập vào tên thành phố"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setCity(text);
                setText("");
              }
            }}
          />
          {err && <h1>{err}</h1>}
        </div>

        {date && (
          <div className="contain">
            <h1 className="nameCity">{date.name}</h1>
            <p>
              <i class="fa-solid fa-location-dot">
                <span>{date.name}</span>
              </i>
            </p>
            <h1 className="temperature">
              <i class="fas fa-temperature-high"></i>
              {date.main.temp} C{" "}
            </h1>
            <h1>Country: {date.sys.country}</h1>
            <div className="status">
              <h2>{date.weather[0].description}</h2>
              <img
                src={`https://api.openweathermap.org/img/w/${date.weather[0].icon}.png`}
              />
            </div>

            <h2>sunrise: {gettime(date.sys.sunrise)}</h2>
            <h2>sunset: {gettime(date.sys.sunset)}</h2>
          </div>
        )}
      </Container>
    </div>
  );
}
