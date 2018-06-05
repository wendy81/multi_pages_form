import React from 'react';
import { Row, Col } from 'reactstrap';
import { Control, Errors, Fieldset } from 'react-redux-form';
import { connect } from 'react-redux';

class FormContact extends React.Component {

  render() {
    const { user, modelPath, controlMapProps } = this.props;
    const modelPathKeys = Object.keys(user.local);
    const userLocal = user.local;
    
    return(


      <Row>

          <Col className='app_register_login_logo'>

              <div className='vertical_block_spacing'></div>


              <Fieldset model= { modelPath }>
              {modelPathKeys.map( (val, i) => 

                <div className="vertical_block_spacing" key={val}>
                  <h5 className="text-center block_top">{val}</h5>

                  <Row key={i}>
                  {userLocal[val].options.map( (value, index) => 
                    ( i === 0 ? 
                        (<Col
                        xs={{size:5, offset: 1}} 
                        sm={{size:5, offset: 1}} 
                        md={{size:5, offset: 1}}
                        style={{padding:'10px'}}
                        key={value}
                        className="input_checkbox"
                        >
                        <Control.checkbox
                            model={"." + val + ".selected[]"}
                            value={value}
                            id={value}
                            className="checkbox"
                            validators={{
                              required:(val) => val.length > 0
                            }}
                            mapProps={controlMapProps}
                        /><label htmlFor={value}>{value}</label>
                        </Col>)
                      :
                      i === 1 ? 
                        (
                        <Col
                        xs={{size:11, offset: 1}} 
                        sm={{size:11, offset: 1}} 
                        md={{size:11, offset: 1}} 
                        key={value}
                        style={{padding:'10px'}}
                        className="input_checkbox"
                        >
                          <Control.checkbox
                            model={"." + val + ".selected[]"}
                            value={value}
                            id={value}
                            className="checkbox"
                            validators={{
                              required:(val) => val.length > 0
                            }}
                            mapProps={controlMapProps}
                          /><label htmlFor={value}>{value}</label>
                        </Col>
                        )
                        : ""               
                    )                            
                  )}

                  <div className="errors">
                    <Errors
                      className="errors"
                      model={"." + val + ".selected[]"}
                      show={true}
                      messages={{
                        required: 'Select 1 item at least.',
                      }}
                    />
                  </div>

                  </Row>      
                </div>
              
              )}
              </Fieldset>


          </Col>
          </Row>
    );
  }
}

// Add this function:
function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(FormContact);



