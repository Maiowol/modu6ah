import React,{useRef} from 'react'
import styled from 'styled-components';
import Grid from '../components/elements/Grid';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function SignUp() {
  const email_ref = useRef(null)
  const nickname_ref = useRef(null)
  const pw_ref =useRef(null)
  const pwcheck_ref = useRef(null)


const SignupAxios = () =>{

  axios.post('http://dlckdals04.shop/api/users/signup',{
    email: email_ref.current.value,
    nickname: nickname_ref.current.value,
    password: pw_ref.current.value,
    passwordCheck: pwcheck_ref.current.value
  }).then((response)=>{
      alert('테스트')
      console.log(response)
    })
    .catch((response)=>{
      alert('테스트')
      console.log(response)
    })
  }

  return (
    <>
      <Grid height="100vh" overflowY="hidden">
        <Grid maxWidth="1320px" height="100%" margin="0 auto" padding="0 12px">
          <Container>
            <Grid height="590px">
              <Grid maxWidth="550px" margin="0 auto">
                <Grid align="center" height="100px" margin="0 0 32 0">
                  <LoginTitle>SignUp</LoginTitle>
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
                        placeholder="이메일을 입력하세요"                      
                      ></input>
                      </Grid>
                    </FormGroup>
                    <FormGroup>
                    <Grid margin="0 -32px; 0">
                        <label className='form-label'>닉네임</label>
                        </Grid>
                      <Grid margin="0 20% 0">
                      <input
                      ref={nickname_ref}
                        className="form-input"
                        name="nickname"
                        placeholder="닉네임을 입력하세요"
                        maxLength="20"                      
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
                      ></input>
                      </Grid>
                      </FormGroup>
                      <FormGroup>
                      <Grid margin="0 -10px; 0">
                        <label className='form-label'>비밀번호 체크</label>
                        </Grid>
                      <Grid margin="0 20% 0">
                      <input
                      ref={pwcheck_ref}
                        className="form-input"
                        type="password"
                        name="password"
                        placeholder="비밀번호를 한 번 더 입력하세요"
                        maxLength="20"                  
                      ></input>
                      </Grid>
                    </FormGroup>
                    <Grid height="auto">
                    <Grid margin="0 20% 0" height="auto">
                      <LoginBtn onClick={SignupAxios} >
                        회원가입
                      </LoginBtn>
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


export default SignUp;
