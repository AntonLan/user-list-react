import { FC } from 'react'
import style from '@/styles/Header.module.scss'

const Header: FC = () => {
	return (
		<div className={style.header}>
			<h1>Welcome to User List</h1>
		</div>
	)
}

export default Header