import { FC } from 'react'
import { svgUtils } from '@/utils/svgUtils'
import style from '@/styles/Notification.module.scss'

interface NotificationMessageProps {
	message: string
}

const NotificationError: FC<NotificationMessageProps> = ({ message }) => {
	return (

		<div className={style.notification} role='alert'>
			<span>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill='currentColor'>
      <path
				fillRule='evenodd'
				d={svgUtils.notificationSvgPath}
				clipRule='evenodd' />
    </svg>
  </span>
			{message}
		</div>
	)
}

export default NotificationError