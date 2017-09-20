import React from 'react';
import { shallow } from 'enzyme';
import UnrealisticDumbComponent from '../';

const onReply = jest.fn();
const wrapper = shallow(<UnrealisticDumbComponent onReply={onReply} />);

test('kindly asks if everything is alright', () => {
  expect(wrapper.text()).toBe('Alles gut?');
});

test('receives positive response upon click', () => {
  wrapper.find('button').simulate('click');
  expect(onReply).toHaveBeenCalledWith('Ja');
});
