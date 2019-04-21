/*
 * NamePicker  ((tests))
 */
import { h } from 'preact'
import { shallow, deep } from 'preact-render-spy';

import NamePicker from '../NamePicker';

// import NameList from '../..//NameList/NameList';

let sContext
let dContext

describe('components/NamePicker', () => {
	beforeEach(() => {
		sContext = shallow(<NamePicker />)
		dContext = deep(<NamePicker />)
	})
	describe('NamePicker.tsx', () => {
		it('should have a Wrapper root element', () => {
			const wrapper = sContext.find('div')
			expect(wrapper).toHaveLength(2)
		})
		// it('should have two NameList within Wrapper', () => {
		// 	const wrapper = sContext.find(Wrapper)
		// 	const lists = wrapper.find(NameList)
		// 	expect(lists).toHaveLength(2)
		// })
		// it('should have background set on root div', () => {
		// 	const root = dContext.find('.wrapper')[0].attributes
		// 	const background = root['style']['backgroundColor']
		// 	expect(background).toEqual(color)
		// })
	})
})
