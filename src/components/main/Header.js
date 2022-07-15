import React, { useState } from "react";
import styled from "styled-components";
import { HiChevronDown } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ChatListModal from "../../modal/Chat/ChatListModal";
import { GetChatListAxios } from "../../redux/modules/Data";
import { GoThreeBars, GoX, GoPerson, GoBell } from "react-icons/go";
import logo from "../../images/logo.png";
import profile from "../../images/profile.png";
import { useNavigate } from "react-router-dom";
import { removeCookie, getCookie } from "../../shared/Cookie";
import { GetMyPageAxios } from "../../redux/modules/Data";
import chat from "../../images/chat.png";
import io from "socket.io-client";
import { toast } from "react-toastify";
import chatnew from "../../images/chatnew.png";
const socket = io.connect("http://dlckdals04.shop");

const Header = () => {
  // 모바일 처리시 메뉴 -> 버튼  처리 방식을  state :  true /  false로 관리
  const [isToggled, setIsToggled] = useState(false);
  const [userToggled, setUserToggled] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [notify, setNotify] = useState([]);
  const navigate = useNavigate();
  const UserCheck = getCookie("accessToken");
  const nickname = getCookie("nickname");
  const dispatch = useDispatch();
  const Profile = localStorage.getItem("profileUrl");

  const Login = () => {
    navigate("/Login");
  };

  const logoOut = () => {
    removeCookie("accessToken");
    removeCookie("nickname");
    localStorage.removeItem("profileUrl");
    localStorage.removeItem("accessToken");
    navigate("/");
    alert("로그아웃 되셨습니다");
  };

  const messageBtn = () => {
    setModalIsOpen(true);
    localStorage.removeItem("count");
    setNotify([]);
  };

  const MyProfile = () => {
    navigate("/manager/" + nickname);
    dispatch(GetMyPageAxios(nickname));
  };

  React.useEffect(() => {
    socket.off("notify").on("notify", (data) => {
      if (nickname === data.senderNick) {
        return null;
      } else if (nickname !== data.receiverNick) {
        return null;
      } else {
        toast.success(`${data.senderNick}님이 메시지를 보냈습니다`, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          limit: 3,
        });
        setNotify((list) => [...list, data]);
        localStorage.setItem("count", data.message);
      }
    });
  }, []);

  const bell = localStorage.getItem("count");

  return (
    <>
      {/* 로그인할때의 헤더 ============================================================================== */}

      {!UserCheck ? (
        <Headers isToggled={isToggled} userToggled={userToggled}>
          {/* 햄버거 버튼(bar) */}
          <div
            className="toggle"
            onClick={() => {
              setIsToggled(!isToggled);
            }}
          >
            {!isToggled ? (
              <GoThreeBars className="icon"></GoThreeBars>
            ) : (
              <GoX className="icon"></GoX>
            )}
          </div>

          <div
            className="logo_container"
            onClick={() => {
              navigate(`/`);
            }}
          >
            <div className="logo_img">
              <img src={logo} alt="로고" />
            </div>
            <div className="logo">모두의 육아</div>
          </div>

          {/* User 버튼 */}
          <div
            className="user"
            onClick={() => {
              setUserToggled(!userToggled);
            }}
          >
            {!userToggled ? (
              <GoPerson className="icon"></GoPerson>
            ) : (
              <GoX className="icon"></GoX>
            )}
          </div>

          {/* 메뉴 리스트 */}
          <ul className="header__menulist">
            <li
              onClick={() => {
                navigate(`/recruit`);
              }}
            >
              체험 모집
            </li>
            <li
              onClick={() => {
                navigate(`/place`);
              }}
            >
              장소 추천
            </li>
            <li
              onClick={() => {
                navigate(`/review`);
              }}
            >
              육아템 리뷰
            </li>
          </ul>

          {/* User 메뉴 리스트 */}
          <ul className="header__right">
            <li className="LogoOut" onClick={Login}>
              로그인
            </li>
          </ul>
        </Headers>
      ) : (
        // 로그인했을때의 헤더 ==============================================================================

        <Headers isToggled={isToggled} userToggled={userToggled}>
          {/* 햄버거 버튼(bar) */}
          <div
            className="toggle"
            onClick={() => {
              setIsToggled(!isToggled);
            }}
          >
            {!isToggled ? (
              <GoThreeBars className="icon"></GoThreeBars>
            ) : (
              <GoX className="icon"></GoX>
            )}
          </div>

          <div
            className="logo_container"
            onClick={() => {
              navigate(`/`);
            }}
          >
            <div className="logo_img">
              <img src={logo} alt="로고" />
            </div>
            <div className="logo">모두의 육아</div>
          </div>

          {/* User 버튼 */}
          <div
            className="user"
            onClick={() => {
              setUserToggled(!userToggled);
            }}
          >
            {!userToggled ? (
              <GoPerson className="icon"></GoPerson>
            ) : (
              <GoX className="icon"></GoX>
            )}
          </div>

          {/* 메뉴 리스트 */}
          <ul className="header__menulist">
            <li
              onClick={() => {
                navigate(`/recruit`);
              }}
            >
              체험 모집
            </li>
            <li
              onClick={() => {
                navigate(`/place`);
              }}
            >
              장소 추천
            </li>
            <li
              onClick={() => {
                navigate(`/review`);
              }}
            >
              육아템 리뷰
            </li>
          </ul>

          {/* User 메뉴 리스트 */}
          <ul className="header__right">
            <li className="bell">
              {bell !== null ? (
                <img
                  src={chatnew}
                  alt="사진"
                  onClick={messageBtn}
                  className="chaticon"
                />
              ) : (
                <img
                  src={chat}
                  alt="사진"
                  onClick={messageBtn}
                  className="chaticon"
                />
              )}
            </li>
            <li className="profile">
              <img src={Profile} alt="프로필" />
            </li>

            <ChatListModal
              open={modalIsOpen}
              onClose={() => setModalIsOpen(false)}
            />

            <li className="accordion">
              <input type="checkbox" id="answer01" />
              <label htmlFor="answer01">
                {nickname}
                <em>
                  <HiChevronDown></HiChevronDown>
                </em>
              </label>
              <div className="menu">
                <div className="menuOne">
                  <div onClick={MyProfile}>
                    <p>프로필관리</p>
                  </div>
                </div>
                <div className="menuTwo">
                  <div>
                    <p>북마크관리</p>
                  </div>
                </div>
              </div>
            </li>

            <li className="MyPage">마이페이지</li>
            <li className="LogoOut" onClick={logoOut}>
              로그아웃
            </li>
          </ul>
        </Headers>
      )}
    </>
  );
};

// 헤더 스타일 코드
const Headers = styled.div`
  max-width: 100%;
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #3c3c3c;

  input[id*="answer"] {
    display: none;
  }
  input[id*="answer"] + label {
    display: block;
    padding: 20px;
    cursor: pointer;
    font-size: 20px;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
  }

  input[id*="answer"] + label + div {
    max-height: 0;
    transition: all 0.35s;
    overflow: hidden;
    background-color: #ffffff;
    font-size: 11px;
    position: absolute;
    top: 62px;
  }

  input[id*="answer"] + label + div span {
    display: inline-block;
  }

  input[id*="answer"]:checked + label + div {
    max-height: 500px;
    position: absolute;
    top: 68px;
  }

  .accordion {
    display: flex;
    flex-direction: column;
  }

  .menu {
    display: flex;
    flex-direction: column;
    z-index: 2;
    border-radius: 20px;
    width: 190px;
    height: 130px;
  }

  .menuOne {
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
  }

  .menuTwo {
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
  }

  a {
    text-decoration: none;
    color: #a8a8a8;
  }

  .menuOne > div > p:hover {
    color: #6b4e16;
  }

  .menuTwo > div > p:hover {
    color: #6b4e16;
  }

  .logo {
    margin: 16px 16px 16px 23px;
    font-size: 20px;
    font-weight: 700;
    color: #f4b03e;
  }
  .logo_container {
    display: flex;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;
  }
  .logo_img {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
  }

  .logo_img > img {
    width: 50px;
    height: 50px;
    margin-right: 20px;
    cursor: pointer;
  }
  .bell > img {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
  .bell > img:hover {
    transform: scale(1.15);
  }

  .header__menulist {
    list-style: none;
    display: flex;
    font-size: 17px;
    margin-top: 10px;
  }

  .bell {
    font-size: 35px;
    cursor: pointer;
  }

  .MyPage {
    display: none;
    font-size: 20px;
  }

  .header__menulist > li {
    font-family: "Nanum Gothic";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    cursor: pointer;
    color: #a58646;
    font-weight: 700;
    font-size: 20px;
  }

  .header__menulist > li:hover {
    transform: scale(1.15);
    color: #6b4e16;
  }

  .header__left {
    display: flex;
  }

  .nick {
    font-size: 20px;
    font-weight: 700;
    color: #3c3c3c;
  }

  .header__right {
    list-style: none;
    display: flex;
    margin-right: 30px;
    margin-top: 10px;
  }

  .header__right div {
    margin: 0 1rem;
  }

  .profile {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: auto;
  }

  .profile > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .LogoOut {
    font-size: 20px;
    font-weight: 700;
    color: #3c3c3c;
    cursor: pointer;
  }

  li {
    padding: 0 1rem;
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .toggle {
    display: none;
    font-size: 30px;
    margin-top: 10px;
    padding: 16px;
  }

  .user {
    display: none;
    font-size: 30px;
    margin-top: 7px;
    padding: 16px;
  }

  .icon {
    font-size: 35px;
  }

  @media screen and (max-width: 1075px) {
    flex-wrap: wrap;

    .header__right {
      display: ${(props) => (props.userToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      margin: 0px;
      z-index: 1;
      position: relative;
      bottom: 10px;
      padding: 0px 0px 0px 20px;
      background-color: #e4e4e4;
    }

    .header__menulist {
      display: ${(props) => (props.isToggled ? "flex" : "none")};
      flex-direction: column;
      width: 100%;
      margin: 0px;
      position: relative;
      bottom: 5px;
      z-index: 1;
      background-color: #e4e4e4;
    }

    .header__menulist li,
    .header__right li {
      margin: 1rem 0;
      padding: 0;
      color: #3c3c3c;
    }

    .header__menulist li:hover {
      transform: scale(1);
      color: #3c3c3c;
    }

    .MyPage {
      display: block;
      font-size: 20px;
      font-weight: 700;
    }

    .toggle {
      display: block;
      margin: 0px;
    }

    .user {
      display: block;
      margin: 0px;
    }

    .profile {
      display: none;
    }

    .nick {
      display: none;
    }

    .bell {
      display: none;
    }
  }
`;

const ChatBox = styled.div`
  width: 12vw;
  height: 40vh;
  position: absolute;
  left: 78%;
  z-index: 1;
  visibility: ${(props) => (props.chatBox ? "visibility" : "hidden")};

  .box {
    display: flex;
    flex-direction: column;
    border-radius: 30px;
    height: 200px;
    width: 12vw;
    border: 1px solid white;
    background-color: white;
    transition: all 0.3s;
  }

  .boxOne {
    width: 100%;
    height: 50%;
    border-bottom: 1px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .boxTwo {
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .boxOne > span {
    color: white;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    color: #6b4e16;
    cursor: pointer;
  }

  .boxTwo > span {
    color: white;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;
    color: #6b4e16;
    cursor: pointer;
  }
`;

export default Header;
