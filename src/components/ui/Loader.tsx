import { FC } from 'react'
import style from '@/styles/Loader.module.scss'

const Loader: FC = () => {
	return (
		<div className={style.loading}></div>
	)
}

export default Loader