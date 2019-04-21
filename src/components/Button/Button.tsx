/*
 * Button  ((component))
 */
import { h } from 'preact'

import './Button.styles.sass'

interface Props {
	id: string
	title: string
	onClick?: (event: any) => void
	href?: string
	color?: string
}

const Button = (props: Props) => (
	<button
		id={props.id}
		className={'button'}
		style={props.color && {
			color: props.color
		}}
		href={props.href}
		onClick={props.onClick}
	>
		{props.title}
	</button>
)

export default Button
