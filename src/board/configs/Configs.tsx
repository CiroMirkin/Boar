import { Header } from '../../components/Header'
import { USER_IS_IN } from '../../components/userIsIn'
import { ConfigColumns } from './components/ConfigColumns'
import { Separator } from '@/ui/separator'
import { ChangeBoardName } from './components/ChangeBoardName'
import Reminder from './components/Reminder'

export function Configs() {
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
				<Reminder />
			</div>
			<Separator />
		</>
	)
}
