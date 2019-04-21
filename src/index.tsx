/*
 * index
 */
import { h, render } from 'preact'

import App from './components/App/App'

import './index.sass'

render(<App />, document.getElementById('root'))

if (process.env.NODE_ENV === 'production') {
	// tslint:disable-next-line
	require('offline-plugin/runtime').install()
}
