/*
 * NameList  ((tests))
 */
import { h } from 'preact'
import { shallow, deep } from 'preact-render-spy';

import NameList from '../NameList';

const title = 'Test'
const color = '#FF00FF'
const names = ['hello', 'test', 'world']
const onClick = jest.fn()
const defaultProps = {
	title,
	color,
	names,
	onClick
}

let sContext
let dContext

describe('components/NameList', () => {
	beforeEach(() => {
		sContext = shallow(<NameList {...defaultProps} />);
		dContext = deep(<NameList {...defaultProps} />);
	});
	describe('NameList.tsx', () => {
		it('should generate a h4 tag with title as child', () => {
			const h4 = sContext.find('h4')
			expect(h4).toHaveLength(1)
			expect(h4[0].children[0]).toEqual(title)
		})
		it('should generate div list with p tags for each name', () => {
			const list = sContext.find('.name-list__list')
			expect(list).toHaveLength(1)
			const p = list.find('p')
			expect(p).toHaveLength(3)
		})
	})
})
