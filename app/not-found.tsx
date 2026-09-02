'use client'

import { Header } from './_components/Header'

export default function NotFound() {
	return (
		<>
			<Header title='Capo' />
			<div className='w-full h-full my-4 grid grid-cols-1 place-items-center'>
				<h1 className='text-4xl mb-4 font-bold'>Error 404</h1>
				<p>Pagina no encontrada :(</p>
			</div>
		</>
	)
}
