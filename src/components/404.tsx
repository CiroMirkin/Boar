import { Header } from '../modules/shared/components/Header'

export function Erro404() {
	return (
		<>
			<Header title='Boar' />
			<div className='w-full h-full my-4 grid grid-cols-1 place-items-center'>
				<h1 className='text-4xl mb-4 font-bold'>Error 404</h1>
				<p>Pagina no encontrada :(</p>
			</div>
		</>
	)
}
