/*
 * Redirect  ((hoc))
 */
import { route } from 'preact-router'

interface Props {
	to: string
	path?: string
	default?: boolean
}

const Redirect = ({ to }: Props) => {
	route(to, true)
	return null
}

export default Redirect
