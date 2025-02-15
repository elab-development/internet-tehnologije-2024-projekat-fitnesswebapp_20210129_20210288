<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class WeatherController extends Controller
{
    public function getWeather($city)
    {
        $apiKey = config('services.openweathermap.key');
        $client = new Client([
            'verify' => false, 
        ]);

        $response = $client->get("https://api.openweathermap.org/data/2.5/weather?q={$city}&appid={$apiKey}&units=metric");
        $data = json_decode($response->getBody(), true);

        return response()->json([
            'city' => $data['name'],
            'temperature' => $data['main']['temp'] . '°C',
            'weather' => $data['weather'][0]['description'],
            'humidity' => $data['main']['humidity'] . '%',
            'wind_speed' => $data['wind']['speed'] . ' m/s',
        ]);
    }
}