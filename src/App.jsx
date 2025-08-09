import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WeatherSVGs = {
  clear: (
    <svg
      className="w-20 h-20 text-yellow-400 drop-shadow-lg animate-spin-slow"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Clear sky"
      role="img"
    >
      <circle cx="12" cy="12" r="5" fill="currentColor" />
      <g strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor">
        <line x1="12" y1="1" x2="12" y2="4" />
        <line x1="12" y1="20" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
        <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="4" y2="12" />
        <line x1="20" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
        <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
      </g>
    </svg>
  ),
  partlyCloudy: (
    <svg
      className="w-20 h-20 text-gray-300 drop-shadow-md"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Partly cloudy"
      role="img"
    >
      <circle cx="20" cy="20" r="8" fill="currentColor" />
      <line x1="20" y1="4" x2="20" y2="12" stroke="currentColor" strokeWidth="2" />
      <line x1="20" y1="28" x2="20" y2="36" stroke="currentColor" strokeWidth="2" />
      <line x1="8" y1="20" x2="16" y2="20" stroke="currentColor" strokeWidth="2" />
      <line x1="28" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="2" />
      <line x1="10" y1="10" x2="16" y2="16" stroke="currentColor" strokeWidth="2" />
      <line x1="24" y1="24" x2="30" y2="30" stroke="currentColor" strokeWidth="2" />
      <path
        fill="white"
        stroke="none"
        d="M44 36a10 10 0 0 0-19.8-3.6 7 7 0 0 0-1.9 13.6h22a7 7 0 0 0-.3-10z"
      />
    </svg>
  ),
  cloudy: (
    <svg
      className="w-20 h-20 text-gray-400 drop-shadow-md"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Cloudy"
      role="img"
    >
      <path
        fill="currentColor"
        d="M44 36a10 10 0 0 0-19.8-3.6 7 7 0 0 0-1.9 13.6h22a7 7 0 0 0-.3-10z"
      />
    </svg>
  ),
  rain: (
    <svg
      className="w-20 h-20 text-blue-400 drop-shadow-md"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Rain"
      role="img"
    >
      <path
        fill="currentColor"
        d="M44 36a10 10 0 0 0-19.8-3.6 7 7 0 0 0-1.9 13.6h22a7 7 0 0 0-.3-10z"
      />
      <line x1="22" y1="48" x2="22" y2="56" strokeLinecap="round" />
      <line x1="30" y1="52" x2="30" y2="60" strokeLinecap="round" />
      <line x1="38" y1="48" x2="38" y2="56" strokeLinecap="round" />
    </svg>
  ),
  snow: (
    <svg
      className="w-20 h-20 text-slate-300 drop-shadow-md"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Snow"
      role="img"
    >
      <line x1="32" y1="16" x2="32" y2="48" strokeLinecap="round" />
      <line x1="16" y1="32" x2="48" y2="32" strokeLinecap="round" />
      <line x1="20" y1="20" x2="44" y2="44" strokeLinecap="round" />
      <line x1="44" y1="20" x2="20" y2="44" strokeLinecap="round" />
    </svg>
  ),
  thunderstorm: (
    <svg
      className="w-20 h-20 text-yellow-400 drop-shadow-lg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Thunderstorm"
      role="img"
    >
      <circle cx="32" cy="32" r="14" fill="currentColor" />
      <polyline points="25 35 33 45 29 45 37 55" fill="none" stroke="black" strokeWidth="3" />
    </svg>
  ),
  fog: (
    <svg
      className="w-20 h-20 text-gray-400 drop-shadow-md"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Fog"
      role="img"
    >
      <line x1="10" y1="24" x2="54" y2="24" strokeLinecap="round" strokeDasharray="4 4" />
      <line x1="6" y1="32" x2="58" y2="32" strokeLinecap="round" strokeDasharray="4 4" />
      <line x1="10" y1="40" x2="54" y2="40" strokeLinecap="round" strokeDasharray="4 4" />
    </svg>
  ),
};

// Helper to map weather codes to icon names and background effect types
function getWeatherType(code) {
  if ([0, 1].includes(code)) return "clear";
  if ([2, 3].includes(code)) return "partlyCloudy";
  if ([45, 48].includes(code)) return "fog";
  if ([51, 53, 55, 56, 57, 61, 63, 65, 80, 81, 82].includes(code)) return "rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  if ([95, 96, 99].includes(code)) return "thunderstorm";
  return "cloudy";
}

function AnimatedBackground({ weatherType }) {
  if (weatherType === "rain") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        {/* Raindrops */}
        {[...Array(30)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-5 bg-blue-400 rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}vw`,
              top: `-${Math.random() * 100}vh`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 1.5}s`,
              animationName: "raindropFall",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
            }}
            animate={{ y: ["-100vh", "100vh"] }}
            transition={{ repeat: Infinity, duration: 1 + Math.random() * 1.5, ease: "linear" }}
          />
        ))}
        <style>{`
          @keyframes raindropFall {
            0% { transform: translateY(0); opacity: 0.7; }
            50% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
        `}</style>
      </div>
    );
  }

  if (weatherType === "snow") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        {/* Snowflakes */}
        {[...Array(20)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}vw`,
              top: `-${Math.random() * 100}vh`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              animationName: "snowFall",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
            }}
            animate={{ y: ["-100vh", "100vh"], x: ["0vw", "5vw", "0vw"] }}
            transition={{ repeat: Infinity, duration: 3 + Math.random() * 2, ease: "linear" }}
          />
        ))}
        <style>{`
          @keyframes snowFall {
            0% { transform: translate(0,0); opacity: 0.7; }
            50% { opacity: 1; }
            100% { transform: translate(5vw, 100vh); opacity: 0; }
          }
        `}</style>
      </div>
    );
  }

  if (weatherType === "fog") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 flex justify-center items-center"
      >
        <div className="w-full h-24 bg-white/10 rounded-full blur-3xl animate-fadeInOut" />
        <style>{`
          @keyframes fadeInOut {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.6; }
          }
          .animate-fadeInOut {
            animation: fadeInOut 4s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  // No animation for clear, partlyCloudy, cloudy, thunderstorm for now
  return null;
}

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState("C");
  const [lastUpdated, setLastUpdated] = useState(null);

  const topCities = [
    { name: "London" },
    { name: "New York" },
    { name: "Tokyo" },
    { name: "Paris" },
  ];

  const fetchWeather = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("City not found!");
        setWeather(null);
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relative_humidity_2m`
      );
      const weatherData = await weatherRes.json();

      let humidity = null;
      if (weatherData.hourly && weatherData.hourly.relative_humidity_2m) {
        const nowHour = new Date().getHours();
        humidity = weatherData.hourly.relative_humidity_2m[nowHour] ?? null;
      }

      setWeather({
        city: name,
        country,
        temp: weatherData.current_weather.temperature,
        wind: weatherData.current_weather.windspeed,
        humidity,
        icon: weatherData.current_weather.weathercode,
      });
      setError("");
      setCity(name);
      setLastUpdated(new Date());
    } catch {
      setError("Something went wrong");
      setWeather(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather("London");
  }, []);

  const convertTemp = (tempC) => (unit === "F" ? tempC * 9 / 5 + 32 : tempC);

  const handleTopCityClick = (cityName) => {
    fetchWeather(cityName);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDateTime = (date) =>
    date?.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }) || "";

  const weatherType = weather ? getWeatherType(weather.icon) : null;

  return (
    <>
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradientShift {
          animation: gradientShift 15s ease infinite;
          background-size: 200% 200%;
        }
        .animate-spin-slow {
          animation: spin 15s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>

      <div
        className="min-h-screen flex flex-col items-center p-6 text-white
          bg-gradient-to-br from-blue-500 to-purple-600 animate-gradientShift relative overflow-hidden"
      >
        {/* Background weather animation */}
        <AnimatePresence>{weatherType && <AnimatedBackground key={weatherType} weatherType={weatherType} />}</AnimatePresence>

        {/* Sun icon above title */}
        <div className="flex flex-col items-center pb-6 mb-6 select-none relative z-10">
     

          <h1 className="text-5xl font-extrabold text-white drop-shadow-md mt-4 select-text">
            Weather App
          </h1>
        </div>

        {/* Search bar */}
        <div className="flex gap-2 w-full max-w-md mb-9 bg-white/10 backdrop-blur-lg rounded-full shadow-lg p-2 transition-all duration-300 relative z-10">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-2 rounded-full bg-transparent text-white placeholder-gray-300 outline-none  transition-all duration-300"
          />
          <button
            onClick={() => fetchWeather(city)}
            disabled={loading}
            className="flex items-center justify-center px-4 py-2 rounded-full text-white hover:bg-white/20 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Search city weather"
          >
            {loading ? (
              <svg
                className="animate-spin h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 110 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-200 mb-4 relative z-10" role="alert">
            {error}
          </p>
        )}

        {/* Weather Card */}
        {weather && (
          <motion.div
            key={weather.city}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-3xl shadow-xl mb-8 w-full max-w-md text-center hover:scale-[1.05] transform transition duration-300 relative z-10"
          >
            {/* Weather Icon */}
            <div className="mx-auto mb-4 select-none">
              {WeatherSVGs[weatherType] || WeatherSVGs.cloudy}
            </div>

            {/* City Name */}
            <h2 className="text-3xl font-bold mt-2 flex items-center justify-center gap-2 select-text">
              {weather.city}, {weather.country}
            </h2>

            {/* Temperature */}
            <p className="text-5xl font-semibold mt-4 select-text">
              {convertTemp(weather.temp).toFixed(1)}°{unit}
            </p>

            {/* Toggle °C / °F */}
            <button
              onClick={() => setUnit(unit === "C" ? "F" : "C")}
              className="mt-3 text-sm underline hover:text-yellow-300"
              aria-label="Toggle temperature unit"
              type="button"
            >
              Show in °{unit === "C" ? "F" : "C"}
            </button>

            {/* Humidity */}
            {weather.humidity !== null && (
              <p className="text-lg flex items-center justify-center gap-2 mt-6 select-text">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v2m0 14v2m9-9h-2M5 12H3m14.364-7.364l-1.414 1.414M6.343 17.657l-1.414 1.414"
                  />
                </svg>
                Humidity: {weather.humidity}%
              </p>
            )}

          
            <p className="text-lg flex items-center justify-center gap-2 mt-3 select-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12h18M3 6h13m-6 12h9"
                />
              </svg>
              Wind: {weather.wind} km/h
            </p>

            {/* Last Updated */}
            <p className="mt-4 text-sm italic select-text">
              Last updated: {formatDateTime(lastUpdated)}
            </p>
          </motion.div>
        )}


        {/* Footer */}
        <footer className="mt-auto mt-4 p-4 text-sm text-white/70 select-none relative z-10">
          Created By Sanjay raja  | Weather data   from Open-Meteo-Api 
        </footer>
      </div>
    </>
  );
}
