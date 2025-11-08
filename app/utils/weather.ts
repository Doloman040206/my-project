export function weatherCodeToText(weather_code: number) {
  switch (weather_code) {
    case 0:
      return 'Clear sky';
    case 1:
    case 2:
    case 3:
      return 'Rain: Slight, moderate and heavy intensity';
    case 45:
    case 48:
      return 'Fog and depositing rime fog';
    case 51:
    case 53:
    case 55:
      return 'Drizzle: Light, moderate, and dense intensity';
    case 60:
    case 61:
    case 62:
      return 'Mainly clear, partly cloudy, and overcast';
    case 80:
    case 81:
    case 82:
      return 'Rain showers: Slight, moderate, and violent';
    default:
      return 'Unknown weather code ${weather_code}';
  }
}
