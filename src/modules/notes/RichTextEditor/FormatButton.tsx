import { cn } from "@/lib/utils";
import { Button } from "@/ui/atoms/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";

/**
 * Botón de formato para el editor de texto enriquecido.
 * 
 * Este componente representa un botón que aplica un comando de formato (como negrita, itálica, subrayado, etc.)
 * al editor de texto. Incluye un ícono representativo y un tooltip con la descripción de la acción.
 * 
 * Si el comando está activo en la selección actual, el botón se resalta visualmente.
 * 
 * @param command Comando de formato a ejecutar (ej: "bold", "italic", "underline").
 * @param icon Ícono que se muestra dentro del botón.
 * @param label Texto descriptivo que se muestra en el tooltip (también se usa para accesibilidad).
 * @param isActive Indica si el comando está activo en la selección actual.
 * @param onClick Función que se ejecuta al hacer click, recibe el comando como argumento.
 */
export const FormatButton = ({ 
  command, 
  icon, 
  label, 
  isActive, 
  onClick 
}: {
  command: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: (command: string) => void;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => onClick(command)}
        className={cn(
          "h-8 w-8 p-0 hover:bg-gray-200/80 dark:hover:bg-gray-800 cursor-pointer",
          isActive && "bg-foreground text-white hover:bg-foreground/80 hover:text-white"
        )}
        aria-label={label}
      >
        {icon}
      </Button>
    </TooltipTrigger>
    <TooltipContent>{label}</TooltipContent>
  </Tooltip>
);
