// index.test.js
import React from "react";
import SuffixesSelect from "./index";
import renderer from "react-test-renderer";
import Enzyme, { shallow, render, mount } from "enzyme";
import sinon, { stub } from "sinon";
import Adapter from "enzyme-adapter-react-16";

// React 16 Enzyme Adapter
Enzyme.configure({ adapter: new Adapter() });

it("should render", () => {
  const onSuffixSelect = stub();
  const component = renderer.create(<SuffixesSelect onChange={onSuffixSelect} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("should render without a default option if default option is turned off", () => {
  const onSuffixSelect = stub();
  const wrapper = mount(<SuffixesSelect onChange={onSuffixSelect} hasDefaultOption={false} />);
  const select = wrapper.find("select");
  expect(select.contains(<option value="null">Suffix</option>)).toEqual(false);
});

it("should render with the default option text specified", () => {
  const onSuffixSelect = stub();
  const wrapper = mount(<SuffixesSelect onChange={onSuffixSelect} defaultOptionText={"Suffix ..."} />);
  const select = wrapper.find("select");
  expect(select.contains(<option value="null">Suffix ...</option>)).toEqual(true);
});

it("should call onChange when select option is changed", () => {
  const onChange = sinon.spy();
  const event = { currentTarget: { value: 1 } };
  const wrapper = shallow(<SuffixesSelect onChange={onChange} />);
  wrapper.find("#suffix").simulate("change", event);
  expect(onChange.called).toEqual(true);
});

it("should call not call onChange when default option is selected", () => {
  const onChange = sinon.spy();
  const event = { currentTarget: { value: "null" } };
  const wrapper = shallow(<SuffixesSelect onChange={onChange} />);
  wrapper.find("#suffix").simulate("change", event);
  expect(onChange.called).toEqual(false);
});
