import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.css'

export default class HoloComplete extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      holoStartValue: '',
      holoEndValue: ''
    }

    this.escFunction = this.escFunction.bind(this)
    this.sendCloseEvent = this.sendCloseEvent.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.escFunction, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false)
  }

  escFunction(e) {
    if (e.keyCode === 27) {
      this.sendCloseEvent()
    }
  }

  sendCloseEvent() {
    if (this.props.onClose && typeof this.props.onClose === 'function') {
      this.props.onClose()
    }
  }

  handleInputChange(e) {
    const { value } = e.target

    if (e.keyCode === 13) {
      this.props.onConfirm(value)
    }

    const suggestions = this.props.data.filter(item => item.toLowerCase().startsWith(value.toLowerCase()))

    if (suggestions.length) {
      const casedSuggestion = suggestions[0].toLowerCase().replace(value.toLowerCase(), value)
      const sliceFirst = casedSuggestion.slice(0, value.length)
      const sliceEnd = casedSuggestion.slice(value.length)
      this.setState({
        holoStartValue: sliceFirst,
        holoEndValue: sliceEnd
      })
    } else {
      this.setState({
        holoStartValue: value,
        holoEndValue: ''
      })
    }

    if (!value) {
      this.setState({
        holoStartValue: '',
        holoEndValue: ''
      })
    }
  }

  render() {
    const { holoStartValue, holoEndValue } = this.state
    const { show } = this.props
    return (
      <React.Fragment>
        {show
          ? <div className={styles['autocomplete-wrapper']} onClick={this.sendCloseEvent}>
            <div className={styles.autocomplete + ' ' + styles['black-theme']} >
              <div className={styles['autocomplete-background']} data-autocomplete={holoEndValue}>
                {holoStartValue}
              </div>
              <input type='text' className={styles['autocomplete-input']} autoFocus placeholder='Search' onKeyUp={(e) => this.handleInputChange(e)} />
            </div>
          </div>
          : null}
      </React.Fragment>
    )
  }
}

HoloComplete.propTypes = {
  data: PropTypes.array,
  show: PropTypes.bool,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func
}
