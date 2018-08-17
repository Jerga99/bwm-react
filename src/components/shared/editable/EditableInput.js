import React from 'react';
import { EditableComponent } from './EditableComponent';

export class EditableInput extends EditableComponent {

  formatView(value) {
    const { formatPipe } = this.props;

    if (formatPipe) {
      let formatedValue = value;

      formatPipe.forEach(pipe => formatedValue = pipe(formatedValue));
      return formatedValue;
    }

    return value;
  }

  renderComponentView() {
    const { value, isActive } = this.state;
    const { className } = this.props;

    if (isActive) {
      return (
        <React.Fragment>
          <input onChange={(event) => this.handleChange(event)}
                 value={value}
                 className={className} />
          <button onClick={() => this.update() }
                  className='btn btn-success btn-editable'
                  type='button'> Save </button>
          <button onClick={() => this.disableEdit() }
                  className='btn btn-warning btn-editable'
                  type='button'> Close </button>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <span className={className}> {this.formatView(value)} </span>
        <button onClick={() => this.enableEdit() }
                className='btn btn-warning btn-editable'
                type='button'> Edit </button>
      </React.Fragment>
    )
  }

  render() {
    return (
      <div className='editableComponent' style={this.props.containerStyle}>
        {this.renderComponentView()}
      </div>
    )
  }
}
