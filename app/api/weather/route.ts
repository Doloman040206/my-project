import { NextResponse } from 'next/server';
import { weatherCodeToText } from '@/app/utils/weather';

export async function GET() {
  const response = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code&timezone=auto&forecast_days=1'
  );
  const data = await response.json();
  const weather_code = data?.daily?.weather_code?.[0];
  return NextResponse.json({
    apiOpenMeteoResponseData: data,
    weather_code,
    weather: weatherCodeToText(weather_code),
  });
}