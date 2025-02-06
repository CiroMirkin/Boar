import { Header } from '../../components/Header'
import { USER_IS_IN } from '../../components/userIsIn'
import { ConfigColumns } from './components/ConfigColumns'
import { Separator } from '@/ui/separator'
import { ChangeBoardName } from './components/ChangeBoardName'
import { useColumnList } from '@/columnList/hooks/useColumnList'
import Reminder from './components/Reminder'

export function Configs() {
	const columnList = useColumnList()

	return (
		<>
			<Header title='Ajustes' whereUserIs={USER_IS_IN.CONFIG} />
			<div className='py-4 md:px-11 px-6'>
				<ChangeBoardName />
			</div>
			<Separator />
			<div className='py-4 md:px-11 px-6'>
				<ConfigColumns />
			</div>
			<Separator />
			<div className='py-4 md:px-11 px-6'>
				<h2 className='text-2xl'>Crear recordatorio</h2>
				<p className="opacity-75">Cada vez que una tarea llegué a la columna indicada se mostrara el recordatorio en pantalla.</p>
				<Reminder columnList={columnList} />
			</div>
			<Separator />
		</>
	)
}
