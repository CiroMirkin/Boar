import React from 'react'
import { ConfigColumn } from './ConfigColumn'
import { AddNewColumnForm } from './AddNewColumnForm'
import { useColumnList } from '@/modules/columnList/hooks/useColumnList'
import { useTranslation } from 'react-i18next'
import { SettingSection } from '@/ui/organisms/SettingSection'
import { useSaveColumnList } from '../state/useSaveColumnList'

export function ConfigColumns() {
	const { t } = useTranslation()
	const columnList = useColumnList()

	useSaveColumnList({ columnList })

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
