import { Link } from "react-router-dom";
import { useTheme } from "@/context/theme-provider";
import { Moon, Sun } from "lucide-react";
import CitySearch from "./city-search";
import InstallPrompt from "./install-app";
const Header = () => {
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <InstallPrompt />
                <Link to={'/'}>
                    <img src={isDark ? "/vite.svg" : "/vite.svg"} alt="climate logo" className="h-20" />
                </Link>
                <div className="flex gap-4">
                    <CitySearch />
                    {/* Theme Toggle */}
                    <div onClick={() => setTheme(isDark ? "light" : "dark")} className={`flex items-center cursor-pointer transition-transform duration-1000 ${isDark ? "rotate-180" : "rotate-0"}`}>
                        {isDark ? <Sun className="h-6 w-6 text-yellow-500" /> : <Moon className="h-6 w-6 text-blue-500" />}
                    </div>
                    <InstallPrompt /> 
                </div>


            </div>
        </header>
    )
}

export default Header