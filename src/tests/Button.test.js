import React from 'react';
import { shallow } from 'enzyme';
import Button from '../components/Button/Button';

describe("<Button />", () => {
    it("Should render without crashing", () => {
        shallow(<Button />);        
    });

    it("Should render with default props", () => {
        const wrapper = shallow(<Button />);
        expect(wrapper.props().value).toEqual("");
        expect(wrapper.props().text).toEqual(undefined);
        expect(wrapper.props().type).toEqual("button");
    });

    it("Should render with props passed as type='submit', value=',', text='+'", () => {
        const wrapper = shallow(
            <Button type="submit" value="," text="+" />
        );
        expect(wrapper.props().value).toEqual(",");
        expect(wrapper.props().type).toEqual("submit");
        expect(wrapper.text()).toEqual("+");
    });

    it("Should render with prop text set by prop value", () => {
        const wrapper = shallow(
            <Button value="1" />
        );
        expect(wrapper.props().value).toEqual("1");        
        expect(wrapper.text()).toEqual("1");
    });    

    it("Should fire the onClick callback when the button is clicked", () => {
        const callback = jest.fn();
        const wrapper = shallow(
            <Button onClick={callback} />
        );
        wrapper.simulate('click');
        expect(callback).toHaveBeenCalled();
    });
});

