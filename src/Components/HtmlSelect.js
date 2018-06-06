import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import DatePicker from 'react-mobile-datepicker';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faCaretDown from '@fortawesome/fontawesome-free-solid/faCaretDown'

class HtmlSelect extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false
    }
  }

  handleClick = () => {
    this.setState({ isOpen: true });
  }

  handleCancel = () => {
    this.setState({ isOpen: false });
  }

  handleSelect = (val) => {
    const { options, dispatch, name } = this.props;
    const getValIndex = val.getMonth();
    let getResultVal = "";
    options.forEach( ( value, i) => {
       if(getValIndex === i) {
        getResultVal = value
       }
    })
    dispatch( actions.change( name, getResultVal ) )
    this.setState({ isOpen: false });
  }

  render() {
    const { options, selectDefaultValue } = this.props;

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

    const monthMapFun = (options) => {
      const obj = {}
      options.filter( (val, i) => {
        i++;
        let index = "0" + i;
        obj[index] = val
      })
      return obj;
    }    
    const monthMap = monthMapFun(options);
    const min = new Date(1980, 0, 10);
    const max = new Date(1980, 1, 10);


    return(
      <div>
        <div style={posRelative}>
          <input
            type="text"
            id="gender"
            disabled= "true"
            value={selectDefaultValue}
            >
          </input>
          <FontAwesomeIcon  icon={faCaretDown} style={posCalendar}  onClick={this.handleClick} />
        </div>


        <DatePicker
          isOpen={this.state.isOpen}
          onSelect={this.handleSelect}
          onCancel={this.handleCancel} 
          theme="default"
          showFormat="Selected"
          confirmText="Ok"
          cancelText="Cancel"
          style={{height:'100px'}}
          dateFormat={
            [[
            'MM', (month) => {
              return monthMap[month]
            }
            ]]
          }
          min = {min}
          max = {max}
        />

      </div>          
    );
  }
}

// Add this function:
function mapStateToProps(state, ownProps) {
  return {
    selectDefaultValue: state.user.general.gender.selected
  };
}

export default connect(mapStateToProps)(HtmlSelect);

