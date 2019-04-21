/*
 * NameList  ((styles))
 */
import { h } from 'preact'

import './NameList.styles.sass'

interface Props {
	id?: string
	title: string
	color: string
	names: string[]
	onClick: (event: any) => void
}

const NameList = (props: Props) => (
	<div id={props.id} className={'name-list'}>
		<h4 className={'name-list__title'}>
			{props.title}
		</h4>
		<div className={'name-list__list'}>
			{props.names.map((name: string) => (
				<p
					key={name}
					className={'name-list__item'}
					onClick={props.onClick}
				>
					{name + ', '}
				</p>
			))}
		</div>
	</div>
)

export default NameList
