export const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '15px',
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};


export const formStyles = () => {
  return {
    style: {
      height: '100%',
      backgroundColor: '#fbfbfb',
      padding: '5px',
      marginTop: '15px'
    }
  }
}

export const buttonStyles = () => {
  return {
    style: {}
  }
}

export const paragraphStyle = () => {
  return {
    style: {
      marginTop: '5px',
      fontSize: '11px',
      color: '#aab7c4'
    }
  }
}
