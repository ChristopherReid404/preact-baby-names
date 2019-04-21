/*
 * App  ((component))
 */
import { h } from 'preact'
import Router from 'preact-router'

import Redirect from '../../hoc/Redirect'

import About from '../About/About'
import NamePicker from '../NamePicker/NamePicker'

const App = () => (
	<Router>
		<NamePicker path={'/'} />
		<About path={'/about'} />
		<Redirect default={true} to={'/'} />
	</Router>
)

export default App
