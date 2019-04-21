/*
 * Modal  ((component))
 */
import { h } from 'preact'

import Button from '../Button/Button'

import './Modal.styles.sass'

interface Props {
	title: string
	children: any
	ok: (event: any) => void
	cancel: (event: any) => void
}

const Modal = (props: Props) => (
	<div className={'modal'}>
		<div className={'modal__card'}>
			<header>{props.title}</header>
			<div>
				{props.children}
			</div>
			<div>
				<Button
					id={'modal__cancel'}
					title={'Cancel'}
					onClick={props.ok}
				/>
				<Button
					id={'modal__ok'}
					title={'Ok'}
					onClick={props.cancel}
				/>
			</div>
		</div>
	</div>
)

export default Modal
