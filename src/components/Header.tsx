import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Archive, Columns3, Settings } from "lucide-react"
import { Link } from 'react-router-dom'

interface HeaderProps {
    title: string
}
export function Header({ title }: HeaderProps) {
    return (
        <header className="w-full px-6 pb-7 my-4 flex justify-between items-start">
        <h1 className="text-4xl font-normal">{ title }</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Boar</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to='/' className="flex">
                <Columns3 size="20" className="mr-2" /> Tablero
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to='/settings' className="flex">
                <Settings size="20" className="mr-2" /> Preferencias
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to='/archive' className="flex">
                <Archive size="20" className="mr-2" /> Archivo
              </Link>
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    )
}