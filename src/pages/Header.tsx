import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/ui/dropdown-menu"
import { Button } from "@/ui/button"
import { Archive, Columns3, Github, Settings } from "lucide-react"
import { Link } from 'react-router-dom'
import { iconSize } from "@/iconsConstants"

export enum USER_IS_IN {
  ARCHIVE = "archive",
  BOARD = "board",
  CONFIG = "configs",
}

interface HeaderProps {
    title: string,
  whereUserIs?: USER_IS_IN
}
export function Header({ title, whereUserIs }: HeaderProps) {
    return (
        <header className="w-full px-6 md:px-11 py-7 flex justify-between items-start">
        <h1 className="text-4xl font-normal">{ title }</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Boar</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled={whereUserIs === USER_IS_IN.BOARD && true}>
              <Link to='/' className="flex">
                <Columns3 size={iconSize} className="mr-2" /> Tablero
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem disabled={whereUserIs === USER_IS_IN.ARCHIVE && true}>
              <Link to='/archive' className="flex">
                <Archive size={iconSize} className="mr-2" /> Archivo
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem disabled={whereUserIs === USER_IS_IN.CONFIG && true}>
              <Link to='/settings' className="flex">
                <Settings size={iconSize} className="mr-2" /> Preferencias
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <a href="https://github.com/CiroMirkin/Boar" className="flex">
                <Github size={iconSize} className="mr-2" /> GitHub
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    )
}