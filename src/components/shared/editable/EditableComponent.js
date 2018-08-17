import React from 'react';

export class EditableComponent extends React.Component {

  constructor() {
    super();

    this.state = {
      isActive: false,
      value: undefined,
      originValue: undefined
    }
  }

  componentDidMount() {
    this.setOriginValue();
  }

  componentDidUpdate() {
    const {errors, entityField, resetErrors } = this.props;

    if (errors && errors.length > 0 && errors[0].title === entityField) {
      this.setOriginValue();
      resetErrors();
    }
  }

  setOriginValue() {
    const { entity, entityField } = this.props;

    this.setState({
        value: entity[entityField],
        originValue: entity[entityField],
        isActive: false
    });
  }

  disableEdit() {
    this.setState({isActive: false});
  }

  enableEdit() {
    this.setState({isActive: true});
  }

  update() {
    const { value, originValue } = this.state;
    const { updateEntity, entityField } = this.props;

    if (value !== originValue) {
      updateEntity({[entityField]: value});

      this.setState({isActive: false, originValue: value});
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }
}
