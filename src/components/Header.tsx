import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface HeaderProps {
    title: string
}
export function Header({ title }: HeaderProps) {
    return (
        <header className="w-full px-6 my-4 flex justify-between items-start">
        <h1 className="text-4xl font-normal">{ title }</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Boar</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Preferencias</DropdownMenuItem>
            <DropdownMenuItem>Archivo</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    )
}