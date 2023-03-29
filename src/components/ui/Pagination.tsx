import { FC } from 'react'
import { getPagesArray } from '@/utils/pages'
import { inject, observer } from 'mobx-react'
import InjectNames from '@/store/configuration/storeIdentifier'
import { UserStoreInterface } from '@/model/UserStoreInterface'
import style from '@/styles/Pagination.module.scss'


const Pagination: FC<UserStoreInterface> = ({ userStore }) => {
	const pagesArray = getPagesArray(userStore?.totalPages)
	return (
		<div className={style.pagination}>
			{pagesArray.map(p =>
				<span
					onClick={() => userStore?.changePage(p)}
					key={p}
					className={userStore?.page === p ? `${style.page} ${style.pageCurrent}` : `${style.page}`}
				>{p}</span>
			)}
		</div>
	)
}

export default inject(InjectNames.UserStore)(observer(Pagination))