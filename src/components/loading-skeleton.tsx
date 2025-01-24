import { Skeleton } from "./ui/skeleton";
function WeatherSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid gap-6">
                <div className="flex gap-4">
                <Skeleton className="flex min-w-[300px] h-[70px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md"/>
                <Skeleton className="flex min-w-[300px] h-[70px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md"/>
                <Skeleton className="flex min-w-[300px] h-[70px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md"/>
                </div>
                
                <Skeleton className="h-[300px] w-full rounded-lg" />
                <Skeleton className="h-[300px] w-full rounded-lg" />
                <div className="grid gap-6 md:grid-cols-2">
                    <Skeleton className="h-[300px] w-full rounded-lg" />
                    <Skeleton className="h-[300px] w-full rounded-lg" />
                </div>
            </div>
        </div>
    )
}
export default WeatherSkeleton;