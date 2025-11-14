<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class WeatherController extends Controller
{
    // Dohvata vremenske uslove za dati grad preko OpenWeatherMap API-ja
    public function getWeather($city)
    {
        // Dohvatanje API ključa iz konfiguracionih fajlova
        $apiKey = config('services.openweathermap.key');
        
        // Kreiranje HTTP klijenta pomoću Guzzle biblioteke
        $client = new Client([
            'verify' => false, // Isključivanje verifikacije SSL sertifikata
        ]);

        // Slanje GET zahteva ka OpenWeatherMap API-ju sa prosleđenim gradom i API ključem
        $response = $client->get("https://api.openweathermap.org/data/2.5/weather?q={$city}&appid={$apiKey}&units=metric");
        
        $data = json_decode($response->getBody(), true);

        // Vraćanje JSON odgovora sa bitnim informacijama o vremenskim uslovima
        return response()->json([
            'city' => $data['name'], // Naziv grada
            'temperature' => $data['main']['temp'] . '°C', // Temperatura u stepenima Celzijusa
            'weather' => $data['weather'][0]['description'], // Opis vremenskih uslova
            'humidity' => $data['main']['humidity'] . '%', // Vlažnost vazduha u procentima
            'wind_speed' => $data['wind']['speed'] . ' m/s', // Brzina vetra u metrima u sekundi
        ]);
    }
}
