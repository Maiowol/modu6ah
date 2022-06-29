import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components';
import Grid from '../components/elements/Grid';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import axios from "axios"
import Cookies from 'universal-cookie';

function LogIn() {
  const cookies = new Cookies();
  const [email, setEmail] = useState("");
  
  const navigate = useNavigate();

  const email_ref = useRef(null);
  const pw_ref = useRef(null);

  const CLIENT_ID = "f13a9cf57960a3a3400f0e425b8848f3";
  const REDIRECT_URI =  "http://localhost:3000";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;


const login = (email, password) => {
	const data = {
		"email": email_ref.current.value,
		"password": pw_ref.current.value
	};

	axios.post('http://dlckdals04.shop/api/users/signin', data)
  .then(response => {
    console.log(response)
    // navigate('/')
    // cookies.set('accessToken',response.data.accessToken)
    alert('안녕')
	}).catch(error => {
		alert("로그인을 다시 해주세요")
      console.log(error.message);
	});
}

  return (
    <>
      <Grid height="100vh" overflowY="hidden">
        <Grid maxWidth="1320px" height="100%" margin="0 auto" padding="0 12px">
          <Container>
            <Grid height="550px">
              <Grid maxWidth="550px" margin="0 auto">
                <Grid align="center" height="100px" margin="0 0 32 0">
                  <LoginTitle>Login</LoginTitle>
                </Grid>
                <div>
                    <FormGroup>
                    <Grid margin="0 -32px; 0">
                      <label className='form-label'>이메일</label>
                      </Grid>
                      <Grid margin="0 20% 0">
                      <input
                       ref={email_ref}
                        className='form-input'
                        name="userEmail"
                        placeholder="이메일을 입력하세요"
                        required
                      ></input>
                      </Grid>
                    </FormGroup>
                    <FormGroup>
                    <Grid margin="0 -25px; 0">
                        <label className='form-label'>비밀번호</label>
                        </Grid>
                      <Grid margin="0 20% 0">
                      <input
                        ref={pw_ref}
                        className="form-input"
                        type="password"
                        name="password"
                        placeholder="비밀번호를 입력하세요"
                        maxLength="20"
                        required
                      ></input>
                      </Grid>
                    </FormGroup>
                    <Grid height="auto">
                    <Grid margin="0 20% 0" height="auto">
                      <LoginBtn 
                       onClick={login}
                      type='submit'>
                        로그인
                      </LoginBtn>
                      </Grid>
                      <Grid height="auto">
                        <FormSeperator>OR</FormSeperator>
                      </Grid>
                      <Grid margin="32px 0 0 0" height="auto" align="center">
                        <SocialLogin href={KAKAO_AUTH_URL}>
                          <RiKakaoTalkFill size="30" />
                          <p>Login with KakaoTalk</p>
                        </SocialLogin>
                      </Grid>
                     
                      <Grid margin="42px 0 0 0" height="auto" align="center">
                        <JoinLink>아이디 찾기 | &nbsp;</JoinLink>
                        <JoinLink>비밀번호 찾기 | &nbsp;</JoinLink>
                        <JoinLink onClick={() => 
                          { navigate(`/signup`) }}>회원가입 &nbsp;</JoinLink>
                      </Grid>
                    </Grid>
                </div>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </>
  )
}

// &nbsp; 공백없는 줄바꿈 
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;

  .has-error {
    .form-label {
      color: #e25c3d;
    }
    .form-input {
      border: 1px solid #e25c3d;
      &:focus {
        border: 1px solid #e25c3d;
      }
    }
    .email-validation {
      font-size: 12px;
      color: #e25c3d;
    }
  }
`

const LoginTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin: 0 0 8px 0;
`

const SocialLogin = styled.a`
  border-radius: 4px;
  display: inline-flex;
  color: #22211a;
  width: 60%;
  height: 30px;
  background-color: #fee501;
  justify-content: center;
  align-items: center;
  padding: 9px 0;
  font-weight: 500;
  border: 1px solid transparent;
  cursor: pointer;


  transition: background-color 0.1s ease-in-out, border-color 0.1s ease-in-out, color 0.1s ease-in-out;

  svg {
    margin-right: 8px;
  }

  &:hover {
    background-color: #ffdd00;
  }
`

const FormSeperator = styled.p`
  display: block;
  margin: auto;
  font-size: 12px;
  text-transform: uppercase;
  text-align: center;
  margin: 24px 0;
`

const FormGroup = styled.div`
  margin-bottom: 24px;
 
  .form-label {
    display: inline-flex;
    -webkit-box-align: baseline;
    -webkit-align-items: baseline;
    -ms-flex-align: baseline;
    align-items: baseline;
    width: 60%;
    justify-content: center;
    max-width: 100%;
    margin-bottom: 6px;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }

  .form-input {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 60%;
    padding: 6px 12px;
    background-color: transparent;
    background-image: none;
    box-sizing: ${(props) => props.boxSizing};
    border: 1px solid #767676;
    border-radius: 4px;
    -webkit-transition: border-color ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s;
    cursor: text;
    box-sizing: border-box;
    

    &:focus {
      border: 1px solid #111111;
      outline: none;
    }
  }
`



const LoginBtn = styled.button`
  height: 44px;
  font-size: 15px;
  width: 60%;
  color: #ffffff;
  background-color: #111111;
  text-align: center;
  vertical-align: middle;
  padding: 9px 18px;
  border-radius: 4px;
  touch-action: manipulation;
  cursor: pointer;


  :disabled {
    opacity: 0.7;
    cursor: not-allowed;
    pointer-events: none;
  }
`



const JoinLink = styled.a`
  color: #767676;
  transition: color 0.1s ease-in-out, fill 0.1s ease-in-out, opacity 0.1s ease-in-out;
  cursor: pointer;

  &:hover {
    color: #111111;
  }
`

export default LogIn;
