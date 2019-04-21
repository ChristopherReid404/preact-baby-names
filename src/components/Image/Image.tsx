/*
 * Image  ((component))
 */
import { h } from 'preact'

interface Props {
	id: string
	src: string
	alt: string
	height: number
	width: number
	onClick?: (event: any) => void
}

const Image = (props: Props) => (
	<img
		id={props.id}
		src={props.src}
		alt={props.alt}
		onClick={props.onClick}
		style={{
			minWidth: '15vh',
			minHeight: '15vh',
			maxWidth: '25vh',
			maxHeight: '25vh'
		}}
	/>
)

export default Image
