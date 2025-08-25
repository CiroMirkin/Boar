import React, { useEffect } from 'react'
import { ConfigColumn } from './ConfigColumn'
import { AddNewColumnForm } from './AddNewColumnForm'
import LocalStorageColumnListRepository from '@/modules/columnList/state/localStorageColumnList'
import { ColumnListRepository } from '@/modules/columnList/state/columnListRepository'
import { useColumnList } from '@/modules/columnList/hooks/useColumnList'
import { useTranslation } from 'react-i18next'
import { useSession } from '@/SessionProvider'
import { SettingSection } from '@/ui/organisms/SettingSection'

const columnListRepository: ColumnListRepository = new LocalStorageColumnListRepository()

export function ConfigColumns() {
	const { t } = useTranslation()
	const columnList = useColumnList()
	
	const { session } = useSession() 
	useEffect(() => {
		// Si el usuario no inicio session (!session)
		if(!session) columnListRepository.save(columnList)
	}, [columnList])

	const columns: React.ReactNode[] = columnList.map((column) => (
		<ConfigColumn column={column} key={column.id} />
	))
	return (
		<SettingSection>
			<SettingSection.Title>{t('settings.columns.section_title')}</SettingSection.Title>
			<SettingSection.Content className='grid justify-stretch gap-y-3 bg-transparent px-0 my-0'>
				{columns}
				<AddNewColumnForm />
			</SettingSection.Content>
		</SettingSection>
	)
}
