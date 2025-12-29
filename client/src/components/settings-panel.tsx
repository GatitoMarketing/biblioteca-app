import { useState } from "react";
import { X, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const [fontSize, setFontSize] = useState(100);
  const [theme, setTheme] = useState("dark");
  const [lineHeight, setLineHeight] = useState([1.6]);
  const [readingSpeed, setReadingSpeed] = useState("normal");
  const [autoScroll, setAutoScroll] = useState(false);

  const handleDecreaseFontSize = () => {
    setFontSize(Math.max(70, fontSize - 10));
  };

  const handleIncreaseFontSize = () => {
    setFontSize(Math.min(150, fontSize + 10));
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-80 bg-cosmic-800 bg-opacity-95 backdrop-blur border-l border-sacred-500 border-opacity-30 z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-6 h-full overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-cinzel text-xl font-semibold text-sacred-500">
            Configuración de Lectura
          </h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="p-2 rounded-lg bg-cosmic-600 hover:bg-sacred-500 hover:text-cosmic-800 transition-colors duration-200"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-6">
          {/* Font Size */}
          <div>
            <Label className="block text-parchment-300 font-medium mb-3">
              Tamaño de Fuente
            </Label>
            <div className="flex items-center justify-between bg-cosmic-600 rounded-lg p-3">
              <Button
                onClick={handleDecreaseFontSize}
                size="icon"
                className="w-8 h-8 bg-sacred-500 hover:bg-sacred-400 text-cosmic-800 rounded-full flex items-center justify-center transition-colors"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-parchment-200 font-medium">
                {fontSize}%
              </span>
              <Button
                onClick={handleIncreaseFontSize}
                size="icon"
                className="w-8 h-8 bg-sacred-500 hover:bg-sacred-400 text-cosmic-800 rounded-full flex items-center justify-center transition-colors"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Theme */}
          <div>
            <Label className="block text-parchment-300 font-medium mb-3">
              Tema de Lectura
            </Label>
            <RadioGroup value={theme} onValueChange={setTheme} className="space-y-2">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark" className="text-parchment-200 cursor-pointer">
                  Modo Oscuro
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="sepia" id="sepia" />
                <Label htmlFor="sepia" className="text-parchment-200 cursor-pointer">
                  Modo Sepia
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light" className="text-parchment-200 cursor-pointer">
                  Modo Claro
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Line Height */}
          <div>
            <Label className="block text-parchment-300 font-medium mb-3">
              Espaciado de Línea
            </Label>
            <Slider
              value={lineHeight}
              onValueChange={setLineHeight}
              min={1.2}
              max={2.0}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-parchment-300 mt-1">
              <span>Compacto</span>
              <span>Espacioso</span>
            </div>
          </div>
          
          {/* Reading Speed */}
          <div>
            <Label className="block text-parchment-300 font-medium mb-3">
              Velocidad de Lectura
            </Label>
            <Select value={readingSpeed} onValueChange={setReadingSpeed}>
              <SelectTrigger className="w-full bg-cosmic-600 border border-sacred-500 border-opacity-30 rounded-lg text-parchment-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-cosmic-600 border border-sacred-500 border-opacity-30">
                <SelectItem value="slow">Lenta (200 ppm)</SelectItem>
                <SelectItem value="normal">Normal (250 ppm)</SelectItem>
                <SelectItem value="fast">Rápida (300 ppm)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Auto-scroll */}
          <div>
            <div className="flex items-center justify-between">
              <Label className="text-parchment-300 font-medium">
                Auto-scroll
              </Label>
              <Switch
                checked={autoScroll}
                onCheckedChange={setAutoScroll}
                className="data-[state=checked]:bg-sacred-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
