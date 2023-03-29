import React, { FC } from 'react'
import style from '@/styles/Modal.module.scss'
import { inject, observer } from 'mobx-react'
import InjectNames from '@/store/configuration/storeIdentifier'
import { UserStoreInterface } from '@/model/UserStoreInterface'
import { UserType } from '@/model/UserType'
const FormUpdate: FC<UserStoreInterface> = ({userStore}) => {
	return (
		<form>
			<div>
				<h1>User Name</h1>
				<input
					name='name'
					type='text'
					defaultValue={userStore?.user?.name || ''}
					onChange={userStore?.changeHandler}
					placeholder='Name' />
			</div>
			<div>
				<h1>User Last Name</h1>
				<input
					name='lastName'
					type='text'
					defaultValue={userStore?.user?.lastName || ''}
					onChange={userStore?.changeHandler}
					placeholder='Last Name' />
			</div>
			<div>
				<h1>User Birth Date</h1>
				<input
					name='birthDate'
					type='date'
					defaultValue={userStore?.user?.birthDate || ''}
					onChange={userStore?.changeHandler}
					placeholder='Birth Date' />
			</div>
			<div>
				<h1>User Email</h1>
				<input
					name='email'
					type='text'
					defaultValue={userStore?.user?.email || ''}
					onChange={userStore?.changeHandler}
					placeholder='Email' />
			</div>
			<div className={style.checkbox}>
				<h1>Access</h1>
				<input
					name='access'
					type='checkbox'
					defaultChecked={userStore?.user?.access}
					onChange={userStore?.changeAccess}
					placeholder='Access' />
			</div>
		</form>
	)
}

export default inject(InjectNames.UserStore)(observer(FormUpdate))