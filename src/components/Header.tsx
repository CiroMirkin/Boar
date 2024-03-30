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
import { Link } from 'react-router-dom'

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
            <DropdownMenuLabel>
              <Link to='/'>
                Boar
              </Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to='/settings' className="flex">
                <Settings size="20" className="mr-2" /> Preferencias
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to='/archive'>
                <Archive size="20" className="mr-2" /> Archivo
              </Link>
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    )
}