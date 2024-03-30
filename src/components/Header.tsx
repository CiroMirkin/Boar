import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Archive, Settings } from "lucide-react"

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
            <DropdownMenuItem><Settings size="20" className="mr-2" />Preferencias</DropdownMenuItem>
            <DropdownMenuItem><Archive size="20" className="mr-2" /> Archivo</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    )
}