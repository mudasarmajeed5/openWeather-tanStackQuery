import { WeatherData } from '@/api/types'
import { Sunrise, Sunset, Gauge, Compass } from "lucide-react";
import { format } from 'date-fns';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface WeatherDetailsProps {
    data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
    const { wind, main, sys } = data;
    const getWindDirection = (degree: number) => {
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const index = Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
        return directions[index];
    }
    const formatTime = (timeStamp: number) => {
        return format(new Date(timeStamp * 1000), "h:mm a");
    }
    const details = [
        {
            title: "Sunrise",
            value: formatTime(sys.sunrise),
            icon: Sunrise,
            color: "text-orange-500"
        },
        {
            title: "Sunset",
            value: formatTime(sys.sunset),
            icon: Sunset,
            color: "text-blue-500"
        },
        {
            title: "Wind Direction",
            value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
            icon: Compass,
            color: "text-green-500"
        },
        {
            title: "Pressure",
            value: `${main.pressure} hPa`,
            icon: Gauge,
            color: "text-purple-500"
        },
    ]
    return (
        <Card>
            <CardHeader>
                <CardTitle>Weather Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='grid gap-6 sm:grid-cols-2'>
                    {details.map((detail) => {
                        return (
                            <div
                            key={detail.title}
                            className='flex items-center gap-3 rounded-lg border p-4'
                            >
                            <detail.icon className={`h-5 w-5 ${detail.color}`} />
                            <div>
                                <p className='text-small font-medium leading-none'>{detail.title}</p>
                                <p className='text-small text-muted-foreground'>{detail.value}</p>
                            </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>

    )
}

export default WeatherDetails