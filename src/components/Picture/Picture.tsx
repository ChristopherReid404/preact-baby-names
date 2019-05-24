/*
 * Picture  ((component))
 */
import { h } from 'preact'

interface Props {
	id: string
	srcWebp?: string
	srcPng: string
	alt: string
	minHeight?: string
	minWidth?: string
	maxHeight: string
	maxWidth: string
	style?: object
	onClick?: (event: any) => void
}

const Picture = (props: Props) => (
	<picture
		id={props.id}
		style={{
			textAlign: 'center',
		}}
	>
		<source type="image/webp" srcset={props.srcWebp} />
		<source type="image/png" srcset={props.srcPng} />
		<img
			src={props.srcPng}
			onClick={props.onClick}
			style={{
				minWidth: props.minWidth || props.maxWidth,
				minHeight: props.minHeight || props.maxHeight,
				maxWidth: props.maxWidth,
				maxHeight: props.maxHeight,
				...props.style
			}}
		/>
	</picture>
)

export default Picture
