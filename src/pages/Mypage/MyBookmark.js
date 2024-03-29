import React from "react";
import Header from "../../components/main/Header";
import styled from "styled-components";
import BookScard from "../../components/cards/BookScard";
import BookRcard from "../../components/cards/BookRcard";
import BookLcard from "../../components/cards/BookLcard";
import Footer from "../../components/main/Footer";
import ChatIcon from '../../components/main/ChatIcon'

const MyBookmark = () => {


  return (
    <>
      <Header />
      <Bookmark>
        <div className="title">
          <div className="mypage">마이페이지</div>
          <div className="booktitle">북마크 관리</div>
        </div>

        <div className="MainBox">
          <div className="titleOne">
            <div className="subtitle">체험 모집</div>
            <div className="subContent">
              다양한 공동육아 프로그램을 둘러보고, 참여를 신청해요!
            </div>
          </div>

          <div className="cardBox">
            <BookScard/>
          </div>

          <div className="titleOne">
            <div className="subtitle">장소 추천</div>
            <div className="subContent">
              아이들과 함께 출입이 가능한 키즈존을 공유해요!
            </div>
          </div>

          <div className="cardBox">
            <BookLcard />
          </div>


          <div className="titleOne">
            <div className="subtitle">육아템 리뷰</div>
            <div className="subContent">
              유용한 육아용품들을 소개하고 추천해요!
            </div>
          </div>

          <div className="cardBox">
            <BookRcard />
          </div>
        </div>
      </Bookmark>
      <ChatIcon/>
      <Footer />
    </>
  );
};

const Bookmark = styled.div`
  width: 100%;
  background-color: #f5f5f5;
  padding-bottom: 30px;

  .title {
    width: 1014px;
    height: 100px;  
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: "Nanum Gothic";
    font-weight: 700;
  }

  .mypage {
    color: #a8a8a8;
    font-family: 'Nanum Gothic'
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    padding-top: 20px;
    margin-bottom: 10px;
  }

  .booktitle {
    color: #000000;
    font-family: "Nanum Gothic";
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 30px;
  }



  .MoreBtn {
    width: 130px;
    height: 38px;
    position: relative;
    right: 50px;
    transition: all 0.25s ease;
    border-radius: 30px;
    background: #3C3C3C;
    margin-top: 30px;
    color: #fff;
    border: none;
    font-family: "NanumGothic";
    font-weight: 700;
  }


  .MainBox {
    border: 1px solid #e4e4e4;
    width: 1014px;
    margin: 30px auto;
    border-radius: 10px;
    background: #ffffff;
  }

  .subtitle {
    color: #000000;
    font-family: "Nanum Gothic";
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 30px;
    margin-bottom: 12px;
  }

  .subContent {
    color: #6b4e16;
    font-family: "NanumGothic";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
  }

  .titleOne {
    margin: 64px 0px 35px 85px;
  }

  .cardBox {
    width: 90%;
    margin: auto;
  }
`;

export default MyBookmark;
