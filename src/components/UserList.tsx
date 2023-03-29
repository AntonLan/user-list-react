import { FC, useEffect } from 'react'
import UserItem from '@/components/UserItem'
import MySelect from '@/components/ui/MySelect'
import Pagination from '@/components/ui/Pagination'
import Modal from '@/components/Modal'
import Loader from '@/components/ui/Loader'
import { UserStoreInterface } from '@/model/UserStoreInterface'
import { inject, observer } from 'mobx-react'
import InjectNames from '@/store/configuration/storeIdentifier'
import { ModalMode } from '@/model/ModalMode'
import style from '@/styles/UserList.module.scss'
import NotificationError from '@/components/NotificationError'

const UserList: FC<UserStoreInterface> = ({userStore}) => {

	useEffect(() => {
		userStore?.fetching()
	}, [userStore?.page])

	const handleCreate = () => {
		userStore?.changeModalMode(ModalMode.CREATE_USER)
		userStore?.handleOpen()
	}


	if (userStore?.isLoading) {
		return <Loader/>
	}

	return (
		<div className={style.userList}>
			{userStore?.error && <NotificationError message={userStore?.error}/>}
			<button onClick={handleCreate}>Create User</button>
			<MySelect
				option={[
					{ value: 'name', name: 'По имени' },
					{ value: 'birthDate', name: 'По дате рождения' },
				]}
			/>
			{userStore?.usersList.map(user =>
				<UserItem
					key={user.id}
					user={user}
				/>)
			}
			{userStore?.isOpen && <Modal />}
			<Pagination />
		</div>
	)
}

export default inject(InjectNames.UserStore)(observer(UserList))