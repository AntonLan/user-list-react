import { FC } from 'react'
import { UserType } from '@/model/UserType'
import { inject, observer } from 'mobx-react'
import InjectNames from '@/store/configuration/storeIdentifier'
import { UserStoreInterface } from '@/model/UserStoreInterface'
import { ModalMode } from '@/model/ModalMode'
import style from '@/styles/UserList.module.scss'

interface UserItemProps extends UserStoreInterface{
	user: UserType
}

const UserItem: FC<UserItemProps> = ({user, userStore }) => {


	const handleEdit = (user: UserType) => {
		userStore?.changeModalMode(ModalMode.UPDATE_USER)
		userStore?.handleOpen(user)
	}


	return (
		<div className={style.user}>
			<div className={style.userInfo}>
				<h1>{user?.name} {user?.lastName}</h1>
				<p>{user?.email}</p>
				<p>{user?.birthDate}</p>
			</div>
			<div className={style.btnWrapper}>
				<button onClick={() => handleEdit(user)}>Edit</button>
				<button onClick={() => userStore?.deleteUser(user?.id!)}>Delete</button>
			</div>
		</div>
	)
}

export default inject(InjectNames.UserStore)(observer(UserItem))