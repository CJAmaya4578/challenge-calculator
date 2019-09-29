import React from 'react';
import { shallow, mount } from 'enzyme';
import Calculator from '../components/Calculator/Calculator';

describe("<Calculator />", () => {
    it("Should render without crashing", () => {
        shallow(<Calculator />);        
    });

    it("Should render with default state", () => {
        const wrapper = shallow(<Calculator />);
        expect(wrapper.state().sum).toEqual(0);
        expect(wrapper.state().equation).toEqual("");
        expect(wrapper.state().inputValue).toEqual("");
    });

    it("Should render all 12 Button components", () => {
        const wrapper = shallow(<Calculator />);        
        const buttonComponents = wrapper.find("Button")
        expect(buttonComponents).toHaveLength(12);
    });

    it("Should update inputValue/<input> on numbered button press", () => {
        const wrapper = mount(<Calculator />);        
        wrapper.find("button[value='1']").simulate("click");
        expect(wrapper.find("input").props().value).toEqual("1");
        expect(wrapper.state().inputValue).toEqual("1");
    });

    it("Should update inputValue/<input> on input change", () => {
        const wrapper = mount(<Calculator />);   
        wrapper.find("input").getDOMNode().value = "10,10";
        wrapper.find("input").simulate("change");
        expect(wrapper.find("input").props().value).toEqual("10,10");
        expect(wrapper.state().inputValue).toEqual("10,10");
    });

    it("Should update sum/equation states and associated <p> on submit", () => {
        const wrapper = mount(<Calculator />);   
        wrapper.find("input").getDOMNode().value = "15,";
        wrapper.find("input").simulate("change");
        wrapper.find("button[type='submit']").simulate("submit");
        expect(wrapper.state().sum).toEqual(15);
        expect(wrapper.find("p#sum").text()).toEqual("15");
        expect(wrapper.find("p#equation").text()).toEqual("15 + 0 = 15");
    });    
});