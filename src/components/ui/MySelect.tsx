import { FC } from 'react'
import { OptionType } from '@/model/OptionType'
import { inject, observer } from 'mobx-react'
import InjectNames from '@/store/configuration/storeIdentifier'
import { UserStoreInterface } from '@/model/UserStoreInterface'
import style from '@/styles/MySelect.module.scss'

interface MySelectProps extends UserStoreInterface{
	option?: OptionType[]
}

const MySelect: FC<MySelectProps> = ({option, userStore}) => {
	return (

		<select className={style.select}
						value={userStore?.selectedSort}
						onChange={event => userStore?.sortUser(event.target.value)}>
			<option disabled value=''>Сортировка по</option>
			{option?.map( option =>
			<option key={option.value}
				value={option.value}>{option.name}</option>
			)}
		</select>

	)
}

export default inject(InjectNames.UserStore)(observer(MySelect))