import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import DatePicker from 'react-mobile-datepicker';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCalendarAlt from '@fortawesome/fontawesome-free-solid/faCalendarAlt'

class Calendar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time: new Date(),
      isOpen: false,
      getTime:"2018-07-01"
    }
  }

  handleClick = () => {
    this.setState({ isOpen: true });
  }

  handleCancel = () => {
    this.setState({ isOpen: false });
  }

  handleSelect = (time) => {
    const getTime = this.dateFormat(time)
    this.setState({ time, getTime, isOpen: false });
    this.props.dispatch( actions.change(this.props.name, getTime) )
  } 

  handleDateShow = (getTime) => {
    this.setState({ getTime });
  }

  dateFormat = (time) => {
    const year = time.getFullYear();
    const month =  time.getMonth() + 1;
    const day = time.getDate();
    const monthResult =  month < 10 ? '0' + month : month;
    const dayResult =  day < 10 ? '0' + day : day;
    return year + '-' + monthResult + '-' + dayResult
  } 

  render() {
    const posRelative = {
      position: 'relative'
    };
    const posCalendar = {
      position: 'absolute',
      right:'30px',
      top:'50%',
      color:'#10c898',
      transform:'translate(0, -50%)',
      MozTransform:'translate(0, -50%)',
      WebkitTransform:'translate(0, -50%)',
      OTransform:'translate(0, -50%)',
      MsTransform:'translate(0, -50%)'
    }; 

    return(
      <div>
        <div style={posRelative}>
          <input
            type="text"
            id="birthday"
            value={this.state.getTime}
            disabled= "true"
            onChange={this.handleDateShow}
          />
          <FontAwesomeIcon  icon={faCalendarAlt} style={posCalendar}  onClick={this.handleClick} />
        </div>
        <DatePicker
          value={this.state.time}
          isOpen={this.state.isOpen}
          onSelect={this.handleSelect}
          onCancel={this.handleCancel} 
          theme="default"
          confirmText="Ok"
          cancelText="Cancel"
        />
      </div>          
    );
  }
}

// Add this function:
function mapStateToProps(state, ownProps) {
  return {
  };
}

export default connect(mapStateToProps)(Calendar);

