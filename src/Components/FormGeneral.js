import React from 'react';
import { Row, Col} from 'reactstrap';
import { Control, Errors, Fieldset } from 'react-redux-form';
import { connect } from 'react-redux';

class FormGeneral extends React.Component {

  render() {

  	const { user, modelPath, controlMapProps, showFun } = this.props;
  	const validators = { required : this.props.required, longEnough: this.props.longUsernameEnough };

    return(
    	<Row>
          <Col>
              <div style={{width:'140px', height:'140px', margin:'30px auto'}}>
                <img className='rounded-circle' style={{width:'100%', height:'auto'}} src="./images/block2@3x.jpg" alt="img"/>
              </div>

              <div className='vertical_block_spacing'></div>
              <Fieldset model= { modelPath }>
                <Control.text 
                  model=".firstName"  
                  id="firstName"
                  validators={validators}
                  placeholder="FirstName"
                  mapProps={controlMapProps}
                />
                <div className="errors">
                <Errors
                  className="errors"
                  model=".firstName"
                  show={showFun}
                  messages={{
                    required: 'Required',
                    longEnough:'8 character or less'
                  }}
                />
                </div>


                 <Control.text 
                  model=".lastName"  
                  id="lastName"
                  validators={validators}
                  placeholder="LastName"
                  mapProps={controlMapProps}
                />
                <div className="errors">
                <Errors
                  className="errors"
                  model=".lastName"
                  show={showFun}
                  messages={{
                    required: 'Required',
                    longEnough:'8 character or less'
                  }}
                /> 
                </div>

                 <Control
                  type="date"
                  model=".birthday"  
                  id="birthday"
                  validators={{required : this.props.required}}
                  placeholder="DD/MM/YYYY"
                />
                <div className="errors">
                <Errors
                  className="errors"
                  model=".birthday"
                  show={showFun}
                  messages={{
                    required: 'Required'
                  }}
                 
                />
                </div>
                
                <Control.select 
                model=".gender.selected" 
                id="gender"
                >
                {user.general.gender.options.map((gender, i) => 
                  <option value={gender} key={gender}>{gender}</option>
                )}
                </Control.select>

                <div className="errors">
                <Errors
                  className="errors"
                  model=".gender.selected"
                  show={showFun}
                  messages={{
                    required: 'Required'
                  }}
                />
                </div>
                </Fieldset>

          </Col>
          </Row>
    );
  }
}
// Add this function:
function mapStateToProps(state, ownProps) {
  // console.log(state)
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(FormGeneral);

