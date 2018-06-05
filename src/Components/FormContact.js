import React from 'react';
import { Row, Col,Button} from 'reactstrap';
import { Control, Errors, Fieldset } from 'react-redux-form';
import { connect } from 'react-redux';

class FormContact extends React.Component {

  render() {
    const { modelPath, controlMapProps, showFun, sumitStatus } = this.props;
    const required = this.props.required;
    const isEmail = this.props.isEmail;
    const isLength = this.props.isLength;
    return(
    	<Row>
          <Col>

              <div className='block_top'></div>

                <Fieldset model= { modelPath }>
                <Control
                  type="number" 
                  model=".phone"  
                  id="phone"
                  validators={{
                    required:required,
                    isLength: (val) => val.length > 0 ?  isLength(val, {min:11, max:11}) : true
                  }}
                  placeholder="Phone"
                  mapProps={controlMapProps}
                />
                <div className="errors">
                <Errors
                  className="errors"
                  model=".phone"
                  show={showFun}
                  messages={{
                    required: 'Required',
                    isLength:'The phone number is 11 length'
                  }}
                />
                </div>

                 <Control
                  type="email" 
                  model=".mail"  
                  id="mail"
                  validators={{
                    required: required,
                    isEmail:(val) => val.length > 0 ? isEmail(val) :true
                  }}
                  placeholder="Mail"
                  mapProps={controlMapProps}
                />
                <div className="errors">
                <Errors
                  className="errors"
                  model=".mail"
                  show={showFun}
                  messages={{
                    required: 'Required',
                    isEmail:'It has not been email'
                  }}
                /> 
                </div>

                 <Control.text
                  model=".address"  
                  id="address"
                  placeholder="Address"
                />
                <div className="errors"></div>

                 <Control.text
                  model=".note"  
                  id="note"
                  placeholder="Note"
                />
                <div className="errors"></div>
                </Fieldset>


                
                <div className="input_checkbox">
                <Control.checkbox
                className="checkbox"
                model="user.hasAccepted"
                id = "hasAccepted"
                validators={{
                  selectd: (val) => val === true
                }} 
                />
                <label className="label_terms" htmlFor="hasAccepted">I agree to the Terms of Use and Privacy Policy.</label>
                </div>

                <div className="errors">
                  <Errors
                    className="errors"
                    model="user.hasAccepted"
                    show={showFun}
                    messages={{
                      selectd: 'You have to agree to, then submit.',
                    }}                 
                  />
                </div>                
                
               

                <div className='reg_login_form block_top'>
                  <Button type="submit" size="lg" block>SUBMIT</Button>
                  {sumitStatus}
                </div> 


          </Col>

            

          </Row>
    );
  }
}

function mapStateToProps(state, ownProps) {
  // console.log(state)
  return {
    sumitStatus: state.user.sumitStatus
  };
}

export default connect(mapStateToProps)(FormContact);


