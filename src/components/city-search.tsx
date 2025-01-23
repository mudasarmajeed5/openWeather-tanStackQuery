import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"

import { Button } from "./ui/button"
import { useState } from "react"
import { Clock, Loader2, Search, Star, XCircle } from "lucide-react";
import { useLocationSearch } from "@/hooks/use-weather";
import { useNavigate } from "react-router-dom";
import { useSearchHistory } from "@/hooks/use-search-history";
import { format } from "date-fns";
import { useFavorite } from "@/hooks/use-favorite";

const CitySearch = () => {
    const {favorites} = useFavorite();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const { history, addToHistory, clearHistory } = useSearchHistory();

    const { data: locations, isLoading } = useLocationSearch(query)
    const navigate = useNavigate();
    const handleSelect = (cityData: string) => {
        const [lat, lon, name, country] = cityData.split("|")
        //   add to search History
        addToHistory.mutate({
            query,
            name,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            country,
        })
        navigate(`/city/${name}?lat=${lat}&lon=${lon}`)
        setOpen(false);
    }

    return (
        <>
            <Button onClick={() => setOpen(true)}
                className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
            >
                <Search className="mr-2 h-4 w-4" />
                Search Cities...
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput value={query} onValueChange={setQuery} placeholder="Search Cities..." />
                <CommandList>
                    {query.length > 2 && !isLoading && <CommandEmpty>No Cities found.</CommandEmpty>}
                    {favorites.length > 0 && (
                        <>  
                            <CommandGroup heading="Favorites">
                                {favorites.map((location) => {
                                    return <CommandItem key={location.id}
                                        value={`${location.lat} | ${location.lon} | ${location.name} | ${location.country}`}
                                        onSelect={handleSelect}
                                    >
                                        <Star className="w-4 h-4 mr-2 text-yellow-500" />
                                        <span>{location.name}</span>
                                        {location?.state && (<span className="text-muted-foreground text-sm">
                                            , {location?.state}
                                        </span>)}
                                        <span className="text-sm text-muted-foreground">
                                            , {location.country}
                                        </span>
                                    </CommandItem>
                                })}
                            </CommandGroup>
                        </>
                    )}

                    {history.length > 0 && (
                        <>
                            <CommandSeparator />
                            <CommandGroup heading="Recent Searches">
                                <div className="flex justify-between items-center px-2 my-2">
                                    <p>Recent Searches</p>
                                    <Button size={"sm"} variant={"ghost"} onClick={() => clearHistory.mutate()}>
                                        <XCircle className="w-4 h-4" />
                                        Clear
                                    </Button>
                                </div>
                                {history.map((location) => {
                                    return <CommandItem key={location.lat - location.lon}
                                        value={`${location.lat} | ${location.lon} | ${location.name} | ${location.country}`}
                                        onSelect={handleSelect}
                                    >
                                        <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                                        <span>{location.name}</span>
                                        {location?.state && (<span className="text-muted-foreground text-sm">
                                            , {location?.state}
                                        </span>)}
                                        <span className="text-sm text-muted-foreground">
                                            , {location.country}
                                        </span>
                                        <span className="ml-auto text-xs text-muted-foreground">
                                            {format(location.searchedAt, "MMM d, h:mm a")}
                                        </span>
                                    </CommandItem>
                                })}
                            </CommandGroup>
                        </>
                    )}

                    <CommandSeparator />

                    {locations && locations.length > 0 && (
                        <CommandGroup heading="Suggestions">
                            {isLoading && (
                                <div className="flex items-center justify-center p-4">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                </div>
                            )}
                            {locations.map((location) => {
                                return <CommandItem key={location.lat - location.lon}
                                    value={`${location.lat} | ${location.lon} | ${location.name} | ${location.country}`}
                                    onSelect={handleSelect}
                                >
                                    <Search className="w-4 h-4 mr-2" />
                                    <span>{location.name}</span>
                                    {location?.state && (<span className="text-muted-foreground text-sm">
                                        , {location?.state}
                                    </span>)}
                                    <span className="text-sm text-muted-foreground">
                                        , {location.country}
                                    </span>
                                </CommandItem>

                            })}
                        </CommandGroup>

                    )}
                </CommandList>
            </CommandDialog>
        </>
    )
}

export default CitySearch