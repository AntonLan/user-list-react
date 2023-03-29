import { FC } from 'react'
import { UserStoreInterface } from '@/model/UserStoreInterface'
import { inject, observer } from 'mobx-react'
import InjectNames from '@/store/configuration/storeIdentifier'
import style from '@/styles/Modal.module.scss'

const FormCreate: FC<UserStoreInterface> = ({ userStore }) => {
	return (
		<form>
			<div>
				<h1>User Name</h1>
				<input
					name='name'
					type='text'
					onChange={userStore?.changeHandler}
					placeholder='Name' />
			</div>
			<div>
				<h1>User Last Name</h1>
				<input
					name='lastName'
					type='text'
					onChange={userStore?.changeHandler}
					placeholder='Last Name' />
			</div>
			<div>
				<h1>User Birth Date</h1>
				<input
					name='birthDate'
					type='date'
					onChange={userStore?.changeHandler}
					placeholder='Birth Date' />
			</div>
			<div>
				<h1>User Email</h1>
				<input
					name='email'
					type='text'
					onChange={userStore?.changeHandler}
					placeholder='Email' />
			</div>
			<div className={style.checkbox}>
				<h1>Access</h1>
				<input
					name='access'
					type='checkbox'
					defaultChecked={userStore?.user.access}
					onChange={userStore?.changeAccess}
					placeholder='Access' />
			</div>
		</form>
	)
}

export default inject(InjectNames.UserStore)(observer(FormCreate))