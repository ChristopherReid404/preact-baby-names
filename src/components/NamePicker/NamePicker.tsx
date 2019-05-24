/*
 * NamePicker  ((component))
 */
// import linkstate from 'linkstate'
import { h, Component } from 'preact'
import { route } from 'preact-router'

import Button from '../Button/Button'
import Picture from '../Picture/Picture'
import Modal from '../Modal/Modal'
import NameList from '../NameList/NameList'

import { girlNames } from '../../data/GirlNames'
import { boyNames } from '../../data/BoyNames'
import { colors } from '../../data/Colors'

import './NamePicker.styles.css'

interface Props { }

interface State {
	saved: string[],
	babyNames: string[],
	index: number,
	girl: boolean,
	modal: boolean | string
}

class NamePicker extends Component<Props, State> {
	state = {
		saved: [],
		babyNames: [],
		index: 0,
		girl: true,
		modal: false
	}
	swapNames = () => {
		const { girl } = this.state
		const newGirl = !girl
		localStorage.setItem('girl', newGirl.toString())
		this.setState({
			girl: !girl
		}, () => this.setup())

	}
	saveName = () => {
		let { babyNames, saved, index, girl } = this.state
		saved.push(babyNames[index])
		localStorage.setItem(girl ? 'girls' : 'boys', JSON.stringify(saved))
		this.setState({ saved })
		this.nextName()
	}
	prevName = () => {
		let { babyNames, index } = this.state
		if (index === 0) {
			index = babyNames.length - 1
		} else {
			index--
		}
		this.setState({ index })
	}
	nextName = () => {
		let { babyNames, index } = this.state
		if (index >= babyNames.length - 1) {
			index = 0
		} else {
			index++
		}
		this.setState({ index })
	}
	nameShuffle = (names) => {
		for (var i = names.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (names.length - 1));
			var temp = names[i];
			names[i] = names[j];
			names[j] = temp;
		}
		return names
	}
	removeSaved = (event) => {
		const name = event.target.innerText.split(',')[0].toLowerCase()
		let { saved, girl } = this.state
		saved = saved.filter(x => x !== name)
		localStorage.setItem(girl ? 'girls' : 'boys', JSON.stringify(saved))
		this.setState({ saved, modal: false })
	}
	resetNames = () => {
		const { girl } = this.state
		localStorage.removeItem(girl ? 'girls' : 'boys')
		const allNames = this.nameShuffle(girl ? girlNames : boyNames)
		this.setState({
			babyNames: allNames,
			saved: [],
			index: 0,
			modal: false
		})
	}
	setup = () => {
		const lGirl = localStorage.getItem('girl')
		const girl = !lGirl || lGirl === 'true'
		const lSaved = localStorage.getItem(girl ? 'girls' : 'boys')
		let saved = []
		if (lSaved) {
			saved = JSON.parse(lSaved)
		}
		let allNames = this.nameShuffle(girl ? girlNames : boyNames)
		this.setState({ babyNames: allNames, saved, index: 0, girl })
	}
	componentDidMount() {
		this.setup()
	}
	navAbout = () => {
		route('/about', false)
	}
	render({ }, { }) {
		const { saved, babyNames, index, girl, modal } = this.state
		const name = babyNames[index]
		const star = saved.indexOf(name) > -1
		const color = girl ? colors['girl'] : colors['boy']
		const altColor = !girl ? colors['girl'] : colors['boy']
		return (
			<div
				id={'name-picker'}
				style={{ backgroundColor: color, paddingTop: '15%' }}
			>
				<Picture
					id={'picker__logo'}
					srcPng={'../../../assets/logo_192.png'}
					srcWebp={'../../../assets/logo_192.webp'}
					alt={'Logo'}
					minWidth={'15vh'}
					minHeight={'15vh'}
					maxWidth={'25vh'}
					maxHeight={'25vh'}
				/>
				<h1 id={'name-picker__title'}>
					{name + (star ? '*' : '')}
				</h1>
				<div>
					<Button
						id={'prev_btn'}
						title={'Previous'}
						color={color}
						onClick={this.prevName}
					/>
					<Button
						id={'next_btn'}
						title={'Next'}
						color={color}
						onClick={this.nextName}
					/>
					<Button
						id={'save_btn'}
						title={'Save'}
						color={color}
						onClick={this.saveName}
					/>
				</div>
				<NameList
					id={'saved'}
					title={'Saved'}
					color={color}
					names={saved}
					onClick={this.removeSaved}
				/>
				<Button
					id={'swap_btn'}
					title={girl ? 'Boys' : 'Girls'}
					color={altColor}
					onClick={this.swapNames}
				/>
				<Button
					id={'reset_btn'}
					title={'Reset'}
					color={color}
					onClick={this.resetNames}
				/>
				<Button
					id={'about_btn'}
					title={'About'}
					color={color}
					onClick={this.navAbout}
				/>
				{modal && (
					<Modal
						title={'Cancel?'}
						children={<p>Test</p>}
						ok={this.closeModal}
						cancel={this.closeModal}
					/>
				)}
			</div>
		)
	}
	closeModal = () => {
		this.setState({ modal: false })
	}
	openModal = (title: string) => {
		this.setState({ modal: title })
	}
}

export default NamePicker
