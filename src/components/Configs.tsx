import { Header } from './Header'
import { USER_IS_IN } from './userIsIn'

export function Configs({ children }: { children: React.ReactNode[]}) {
	return (
		<>
			<Header title='Ajustes' whereUserIs={USER_IS_IN.CONFIG} />
			{ children }
		</>
	)
}
