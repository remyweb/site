"use client";

import React, { useState, useEffect } from "react";

interface CurrentWeather {
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
}

interface Ocean {
  name: string;
  latitude: number;
  longitude: number;
}

const oceans: Ocean[] = [
  { name: "Océan Atlantique", latitude: 14.5994, longitude: -28.6731 },
  { name: "Océan Pacifique", latitude: -8.7832, longitude: -124.5085 },
  { name: "Océan Indien", latitude: -33.9249, longitude: 18.4241 },
  { name: "Océan Arctique", latitude: 82.8628, longitude: -135.0000 },
  { name: "Océan Austral", latitude: -60.0000, longitude: 0.0000 },
];

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState<{ [key: string]: CurrentWeather | null }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherResponses = await Promise.all(
          oceans.map((ocean) =>
            fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${ocean.latitude}&longitude=${ocean.longitude}&current_weather=true&timezone=auto`
            )
          )
        );

        const weatherData = await Promise.all(weatherResponses.map((res) => res.json()));

        const weatherMap: { [key: string]: CurrentWeather | null } = {};
        oceans.forEach((ocean, index) => {
          weatherMap[ocean.name] = weatherData[index].current_weather;
        });

        setWeatherData(weatherMap);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 text-white font-retro">
        <h1 className="text-3xl mb-8">Chargement...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 text-white font-retro">
        <h1 className="text-3xl mb-8">Erreur</h1>
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 text-white font-retro overflow-hidden p-4">
      <h1 className="text-5xl font-bold mb-8 z-10">Météo des Océans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 z-10">
        {oceans.map((ocean) => (
          <div
            key={ocean.name}
            className="flex flex-col items-center bg-[hsl(222,47%,20%)] bg-opacity-80 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <h2 className="text-3xl font-semibold mb-4">{ocean.name}</h2>
            {weatherData[ocean.name] ? (
              <>
                <p className="text-xl mb-2">Température : {weatherData[ocean.name]?.temperature}°C</p>
                <p className="text-xl mb-2">Vent : {weatherData[ocean.name]?.windspeed} km/h</p>
                <p className="text-xl">Code météo : {weatherData[ocean.name]?.weathercode}</p>
              </>
            ) : (
              <p className="text-xl">Données météo non disponibles</p>
            )}
          </div>
        ))}
      </div>
      <footer className="absolute bottom-4 text-sm text-center text-white z-10">
        Données fournies par <a href="https://api.open-meteo.com" className="underline">api.open-meteo.com</a>
      </footer>
    </div>
  );
};

export default WeatherPage;