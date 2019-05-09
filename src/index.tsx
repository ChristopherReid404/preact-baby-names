/*
 * index
 */
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import { h, render } from 'preact'

import App from './components/App/App'

import '!file-loader?name=[name].[ext]!favicon.ico'
import './index.css'

render(<App />, document.getElementById('root'))

if (process.env.NODE_ENV === 'production') {
	OfflinePluginRuntime.install()
}
