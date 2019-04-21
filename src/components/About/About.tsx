/*
 * About  ((component))
 */
import { h } from 'preact'
import { route } from 'preact-router'

import Button from '../Button/Button'
import Image from '../Image/Image'

import { colors } from '../../data/Colors'
const img = require('../../images/logo_192.png')

import './About.styles.sass'

const About = (props: any) => {
	const fields = [
		{ title: 'Environment', value: process.env.NODE_ENV },
		{ title: 'Version', value: process.env.VERSION, trigger: true },
		{ title: 'Build Date', value: new Date(process.env.BUILT).toLocaleDateString() },
		{ title: 'Build Time', value: new Date(process.env.BUILT).toLocaleTimeString('en-US') }
	]
	const girl = localStorage.getItem('girl')
	const color = !girl || girl === 'true' ? colors.girl : colors.boy
	return (
		<div
			id={'about'}
			style={{ backgroundColor: color }}
		>
			<Button
				id={'return_btn'}
				title={'Return'}
				color={color}
				onClick={() => route('/', false)}
			/>
			<div id={'about__card'}>
				<h2 id={'about__title'}>About</h2>
				<Image
					id={'about__logo'}
					src={img}
					alt={'Logo'}
					width={192}
					height={192}
				/>
				<div id={'about__fields'}>
					{fields.map((item, key) => (
						<div key={key} className={'field'}>
							<h5 className={'field__title'}>
								{item.title}:
							</h5>
							<p className={'field__value'}>
								{item.value}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default About
