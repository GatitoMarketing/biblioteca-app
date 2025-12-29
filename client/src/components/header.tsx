import { Search, Moon, Heart, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="bg-cosmic-800 bg-opacity-90 backdrop-blur sticky top-0 z-50 border-b border-sacred-500 border-opacity-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="float-animation">
              <i className="fas fa-book-open text-2xl text-sacred-500"></i>
            </div>
            <h1 className="font-cinzel font-bold text-xl lg:text-2xl text-sacred-500">
              BIBLIOTECA GNÓSTICA
            </h1>
          </div>
          
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar libros por título o autor..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-4 py-2 pl-10 bg-cosmic-600 border border-sacred-500 border-opacity-30 rounded-lg focus:outline-none focus:border-sacred-500 focus:ring-2 focus:ring-sacred-500 focus:ring-opacity-20 text-parchment-200 placeholder-parchment-300 placeholder-opacity-60"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-sacred-500 opacity-60" />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="p-2 rounded-lg bg-cosmic-600 hover:bg-sacred-500 hover:text-cosmic-800 transition-colors duration-200"
              title="Modo oscuro"
            >
              <Moon className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="p-2 rounded-lg bg-cosmic-600 hover:bg-sacred-500 hover:text-cosmic-800 transition-colors duration-200"
              title="Favoritos"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="p-2 rounded-lg bg-cosmic-600 hover:bg-sacred-500 hover:text-cosmic-800 transition-colors duration-200"
              title="Configuración"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
