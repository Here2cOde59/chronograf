import React, {PropTypes, Component} from 'react'
import rome from 'rome'
import moment from 'moment'

class CustomTimeRange extends Component {
  constructor(props) {
    super(props)

    this.handleClick = ::this.handleClick
    this._formatTimeRange = ::this._formatTimeRange
  }

  componentDidMount() {
    const {timeRange} = this.props

    const lower = rome(this.lower, {
      appendTo: this.container,
      initialValue: this._formatTimeRange(timeRange.lower),
      autoClose: false,
      autoHideOnBlur: false,
      autoHideOnClick: false,
    })

    const upper = rome(this.upper, {
      appendTo: this.container,
      autoClose: false,
      initialValue: this._formatTimeRange(timeRange.upper),
      autoHideOnBlur: false,
      autoHideOnClick: false,
    })

    this.lowerCal = lower
    this.upperCal = upper

    this.lowerCal.show()
    this.upperCal.show()
  }

  // If there is an upper or lower time range set, set the corresponding calendar's value.
  componentWillReceiveProps(nextProps) {
    const {lower, upper} = nextProps.timeRange
    if (lower) {
      const formattedLower = this._formatTimeRange(lower)
      this.lowerCal.setValue(this._formatTimeRange(lower))
      this.lower.value = formattedLower
    }

    if (upper) {
      const formattedUpper = this._formatTimeRange(upper)
      this.upperCal.setValue(this._formatTimeRange(upper))
      this.upper.value = formattedUpper
    }
  }

  render() {
    const {lower, upper} = this.props.timeRange

    return (
      <div className="custom-time--container">
        <div className="input-container" style={{display: 'flex'}}>
          <input
            className="form-control input-sm custom-time--lower"
            ref={r => (this.lower = r)}
          />
          <input
            className="form-control input-sm custom-time--upper"
            ref={r => (this.upper = r)}
          />
        </div>
        <div className="custom-time--dates" ref={r => (this.container = r)} />
        <div
          className="custom-time--apply btn btn-sm btn-primary"
          onClick={this.handleClick}
        >
          Apply
        </div>
      </div>
    )
  }

  /*
   * Upper and lower time ranges are passed in with single quotes as part of
   * the string literal, i.e. "'2015-09-23T18:00:00.000Z'".  Remove them
   * before passing the string to be parsed.
   */
  _formatTimeRange(timeRange) {
    if (!timeRange) {
      return ''
    }

    // If the given time range is relative, create a fixed timestamp based on its value
    if (timeRange.match(/^now/)) {
      const [, duration, unitOfTime] = timeRange.match(/(\d+)(\w+)/)
      moment().subtract(duration, unitOfTime)
    }

    return moment(timeRange.replace(/\'/g, '')).format('YYYY-MM-DD HH:mm')
  }

  handleClick() {
    const {onApplyTimeRange, onClose} = this.props
    const lower = this.lowerCal.getDate().toISOString()
    const upper = this.upperCal.getDate().toISOString()

    onApplyTimeRange({lower, upper})
    if (onClose) {
      onClose()
    }
  }
}

const {func, shape, string} = PropTypes

CustomTimeRange.propTypes = {
  onApplyTimeRange: func.isRequired,
  timeRange: shape({
    lower: string.isRequired,
    upper: string,
  }).isRequired,
  onClose: func,
}

export default CustomTimeRange
