"use client";
import { useEffect, useState } from "react";
import axios from "axios"; // Importando a biblioteca Axios
import {
  FaDroplet,
  FaLocationDot,
  FaMagnifyingGlass,
  FaWind,
} from "react-icons/fa6";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const accessKey = process.env.NEXT_PUBLIC_ACCESS_KEY;

const UnsplashPhotos = ({ city, setBackground }: any) => {
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?query=${city}&client_id=${accessKey}`
        );
        const data = response.data;

        if (data.results.length > 0) {
          setBackground(data.results[0].urls.regular); // Define a URL da imagem como o fundo
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    if (city) {
      fetchPhotos();
    }
  }, [city, setBackground]);

  return null; // Não precisamos retornar nada, apenas mudar o fundo.
};

export default function Home() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [background, setBackground] = useState(""); // Estado para armazenar a URL do fundo

  const getWeatherData = async (city: string) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    try {
      const res = await axios.get(apiWeatherURL);
      setWeatherData(res.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
    }
  };

  const handleSearch = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    if (!city) {
      console.error("City input is empty");
      return;
    }

    getWeatherData(city);
  };

  // Função que lida com a tecla Enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e); // Chama a função de pesquisa ao pressionar Enter
    }
  };

  return (
    <div
      className="h-full w-full flex m-auto justify-center bg-cover bg-center"
      style={{
        backgroundImage: weatherData ? `url(${background})` : "none", // Exibe a imagem de fundo somente após a busca
      }}
    >
      <div className="container m-auto h-auto w-1/3 bg-opacity-90 grid items-center justify-center p-4 rounded-lg">
        {weatherData && (
          <UnsplashPhotos city={city} setBackground={setBackground} /> // Somente busca a imagem após a pesquisa
        )}
        <div className="form p-4">
          <h3 className="text-[#fff] text-xl mb-4">
            Confira o clima de uma cidade:
          </h3>
          <div className="form-input-container flex items-center">
            <input
              type="text"
              placeholder="Digite o nome da cidade"
              id="city-input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyPress} // Detecta a tecla Enter
              className="p-2 border rounded text-[#000] flex-1"
            />
            <button
              id="search"
              onClick={handleSearch}
              className="ml-2 p-2 bg-blue-500 text-white rounded"
            >
              <FaMagnifyingGlass />
            </button>
          </div>
        </div>
        {weatherData && (
          <div id="weather-data" className="p-4 text-white">
            <h2 className="text-2xl flex items-center">
              <FaLocationDot className="mr-2" />
              <div className="flex items-center justify-center m-auto">
                <span id="city">{weatherData.name}</span>

                <img
                  src={`https://flagsapi.com/${weatherData.sys.country}/flat/64.png`}
                  id="country"
                  alt={`${weatherData.sys.country} flag`}
                  className="ml-2"
                />
              </div>
            </h2>
            <p id="temperature" className="text-xl">
              <span>{Math.round(weatherData.main.temp)}</span>&deg;C
            </p>
            <div id="description-container" className="flex items-center">
              <p id="description" className="mr-2">
                {weatherData.weather[0].description}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                id="weather-icon"
                alt={weatherData.weather[0].description}
              />
            </div>
            <div id="details-container" className="mt-4">
              <p id="humidity" className="flex items-center">
                <FaDroplet className="mr-2" />
                <span>{weatherData.main.humidity}%</span>
              </p>
              <span className="border-l h-12"></span>
              <p id="wind" className="flex items-center mt-2">
                <FaWind className="mr-2" />
                <span>{weatherData.wind.speed} km/h</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
