/* @flow */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { suffixes } from "./data/suffixes";

/**
 * Some constants.
 */
const DEFAULT_OPTION_STRING = "Suffix";
const DEFAULT_SELECT_STYLE = `
    min-width: 6rem;
    padding: 0.5rem 0;
    margin: 0.125rem 0 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    list-style: none;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
`;

/**
 * Type definition for class props.
 */
type Props = {
  defaultOptionText?: string,
  hasDefaultOption?: boolean,
  onChange: Function,
  style?: any,
  className?: string,
  common?: boolean
};

/**
 * React class for name suffix select in a form
 * @class SuffixesSelect
 */
class SuffixesSelect extends React.Component<Props> {
  /**
   * @memberof SuffixesSelect
   * @static
   */
  static defaultProps = {
    hasDefaultOption: true,
    defaultOptionText: DEFAULT_OPTION_STRING,
    style: {},
    className: null,
    common: false
  };

  /**
   * @memberof SuffixesSelect class.
   * @static
   * @property {bool} [hasDefaultOption] - Toggles default option on/off.
   * @property {string} [defaultOptionText] - Customized text for the default option.
   * @property {func} onChange - Function to fire with newly selected data
   * @property {Object} style - React style. Javascript object with camelCase css properties.
   * @property {string} className - CSS class. Overrides all default styles (see render method)
   * @property {bool} common - Display only the most common suffixes.
   */
  static propTypes = {
    hasDefaultOption: PropTypes.bool,
    defaultOptionText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.any,
    className: PropTypes.string,
    common: PropTypes.bool
  };

  /**
   * Handle onChange fired from select element. Checks to make sure the default option
   * doesn't fire a change.
   *
   * @memberof SuffixesSelect class.
   * @param {SyntheticEvent<HTMLSelectElement>} event - The html event object
   */
  change = (event: SyntheticEvent<HTMLSelectElement>) => {
    const index = event.currentTarget.value;
    if (index === "null") return;
    const selectedSuffix = suffixes[index];
    this.props.onChange(event, selectedSuffix);
  };

  /**
   * React render method.
   * @return {string} - HTML markup for the component.
   */
  render() {
    // Setup the default option
    let defaultOption = <option value="null">{this.props.defaultOptionText}</option>;

    if (!this.props.hasDefaultOption) {
      defaultOption = null;
    }

    // Setup the style. className won't override styled component, so if caller specifies
    // className, set styled component style to nothing. It's all or none.
    let componentStyle = DEFAULT_SELECT_STYLE;

    if (this.props.className) {
      componentStyle = "";
    }

    const Wrapper = styled.div`
      > select {
        ${componentStyle};
      }
    `;

    // If common is specified, just display the suffixes marked as 'common'
    let displayedSuffixes = suffixes;

    if (this.props.common) {
      displayedSuffixes = suffixes.filter(suffix => suffix.common);
    }

    return (
      <Wrapper>
        <select
          id="suffix"
          name="suffix"
          onChange={this.change}
          style={this.props.style}
          className={this.props.className || ""}
        >
          {defaultOption}
          {displayedSuffixes.map((suffix, i) => {
            return (
              <option key={suffix.code} value={i}>
                {suffix.label}
              </option>
            );
          })}
        </select>
      </Wrapper>
    );
  }
}

export default SuffixesSelect;
