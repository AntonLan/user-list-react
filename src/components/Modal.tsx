import React, { FC } from 'react'
import { ModalMode } from '@/model/ModalMode'
import FormCreate from '@/components/FormCreate'
import style from '@/styles/Modal.module.scss'
import FormUpdate from '@/components/FormUpdate'
import { inject, observer } from 'mobx-react'
import InjectNames from '@/store/configuration/storeIdentifier'
import { UserStoreInterface } from '@/model/UserStoreInterface'


const Modal: FC<UserStoreInterface> = ({ userStore }) => {



		return (
			<>
				<div onClick={userStore?.handleClose} className={style.modalContainer}>
					<div className={style.bgModal}></div>
					<div className={style.modalWrapper}>
						<div
							onClick={e => e.stopPropagation()}
							className={style.formWrapper}>
							{userStore?.modeModal === ModalMode.CREATE_USER && <FormCreate />}
							{userStore?.modeModal === ModalMode.UPDATE_USER && <FormUpdate />}
							<div className={style.btnContainer}>
								<button onClick={userStore?.handleClose}>Cancel</button>
								{userStore?.modeModal === ModalMode.CREATE_USER &&
									<button onClick={userStore?.createUser}>Create User</button>}
								{userStore?.modeModal === ModalMode.UPDATE_USER &&
									<button onClick={userStore?.updateUser}>Update User</button>}
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}

export default inject(InjectNames.UserStore)(observer(Modal))