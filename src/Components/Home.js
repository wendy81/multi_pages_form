import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col} from 'reactstrap';
import { Form, actions } from 'react-redux-form';
import { connect } from 'react-redux';
import { isEmail, isEmpty, isLength } from 'validator';

import FormGeneral from './FormGeneral';
import FormContact from './FormContact';
import FormLocal from './FormLocal';


class HomeComponent extends React.Component {
  constructor(props){
    super(props);
    this.ulRef = React.createRef();
  }

  handleSubmit(values) {
    const { dispatch } = this.props;
    dispatch( actions.change('user.sumitStatus', <div className='text_center succeed'>Congratulation, submit succeed.</div>))
  }

  handleSubmitFailed(values) {
    const { dispatch } = this.props;
    dispatch( actions.change('user.sumitStatus', <div className='text_center focused'>Sorry, submit failed.</div>))
  }

  handleTouchStart(e){
    const touchList = e.changedTouches[0];
    this.startX = touchList.pageX;
    this.startTime = new Date().getTime();
  }

  handleTouchEnd(e){
    const touchList = e.changedTouches[0];
    this.endX = touchList.pageX;
    this.endTime = new Date().getTime();
    const { user, dispatch } = this.props;
    let index= 0;
    let distX = Math.abs(this.startX - this.endX) > 100
    let elapsedTime = (this.endTime - this.startTime) > 100 

    // console.log(this.startX > this.endX)
    // console.log(distX)
    // console.log(elapsedTime)

    if ( this.startX !== this.endX) {

      if (this.startX > this.endX && distX && elapsedTime) {
          user.currentIndex !== 2 ? index = user.currentIndex + 1 : index = 0;
      } else if (this.startX < this.endX && distX && elapsedTime) {
          user.currentIndex !== 0 ? index = user.currentIndex - 1 : index = 2;
      }  

      dispatch( actions.change('user.currentIndex', index))
    }
    
  }

  handleTouchMove(e){
  }

  handleClick(e) {
    const currentUlLi = this.ulRef.current.childNodes;
    const { dispatch } = this.props;
    currentUlLi.forEach((val, i) => {
      if(e.target === val) {
        dispatch( actions.change('user.currentIndex', i))
      }
    })
  }

  render() {

    const { user } = this.props;
    const longUsernameEnough = (val) => isLength(val, {min:0, max:8});
    const required = (val) => !isEmpty(val);
    const showFun = (field) => field.focus || field.submitFailed
    const controlMapProps = {className: ({fieldValue}) => !fieldValue.valid? 'focused': ''}

    const userKeys = Object.keys(user).slice(0,3);
    const currentIndex= user.currentIndex

    return (
        <Container
        onTouchStart = { this.handleTouchStart.bind(this) }
        onTouchMove = { this.handleTouchMove.bind(this) }
        onTouchEnd = { this.handleTouchEnd.bind(this) }
        >


          <Form 
          model="user" 
          onSubmit={(values) => this.handleSubmit(values)}
          onSubmitFailed={(values) => this.handleSubmitFailed(values)}
          className='vertical_block_spacing reg_login_form'
          >


          <div style={{marginBottom:"30px"}}>
            <Row>
            <Col className='header_title'>
              {userKeys[currentIndex]}
            </Col>
            </Row>

            { currentIndex === 0  &&
            <FormGeneral  
            modelPath={"." + userKeys[currentIndex]} 
            longUsernameEnough = {longUsernameEnough} 
            required= {required} 
            showFun={showFun}
            controlMapProps = {controlMapProps}
            />
            }

            { currentIndex === 1  &&
             <FormLocal  
             modelPath={"." + userKeys[currentIndex]} 
             longUsernameEnough = {longUsernameEnough} 
             required= {required} 
             showFun={showFun}
             controlMapProps = {controlMapProps}
             />
            } 


            { currentIndex === 2  &&
            <FormContact  
            modelPath={"." + userKeys[currentIndex]} 
            isEmail = {isEmail} 
            isLength={isLength} 
            required= {required} 
            showFun={showFun}
            controlMapProps = {controlMapProps}
            />
            }
            </div>           

            
            <Row>
            <Col className='indicate'>
              <ul  ref={this.ulRef} onClick={this.handleClick.bind(this)}>
              <li className={ currentIndex === 0 ? 'active' : ''}></li>
              <li className={ currentIndex === 1 ? 'active' : ''}></li>
              <li className={ currentIndex === 2 ? 'active' : ''}></li>
              </ul>
            </Col>
            </Row>
         


          </Form>

        </Container>  
    );

  }
}

Row.propTypes = {
  noGutters: PropTypes.bool
}
Container.propTypes = {
  fluid:  PropTypes.bool
}

// Add this function:
function mapStateToProps(state, ownProps) {
  // console.log(state)
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(HomeComponent);


