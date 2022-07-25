import React from "react";
import Header from "../../components/main/Header";
import styled from "styled-components";
import Footer from "../../components/main/Footer";
import axios from "axios";
import SearchInput from "../../components/pages/SearchInput";
import { useNavigate } from "react-router-dom";
import SearchLcard from "../../components/cards/SearchLcard";
import SearchBar from "../../components/pages/SearchBar";
import search from "../../images/search.png";
import ChatIcon from '../../components/main/ChatIcon'

const PlaceSearch = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState();
  const [query, setQuery] = React.useState();
 
  // console.log(data.filter(item=>item.title.toLowerCase().includes("뽀로로")));

  React.useEffect(() => {
    axios
      .get("https://zhaoxilin.shop/api/search", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setData(res.data.resultsInPlace.slice(0, 9));
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  if(!data) {
    <div></div>
  }

  return (
    <>
      <Header />
      <InputBox>
        <img src={search} alt="검색" />
        <div className="search">
        <input
            type="text"
            className="search-box"
            placeholder="검색어를 입력해주세요"
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </InputBox>
      <SearchBox>
       <SearchBar />
        <div className="MainBox">
          <div className="titleOne">
            <div className="subtitle">장소 추천</div>
            <div className="subContent">
              아이들과 함께 출입이 가능한 키즈존을 공유해요!
            </div>
          </div>
          <div className="cardBox">
          <SearchLcard 
          data={data}
          query={query}
          />
          </div>
        </div>
      </SearchBox>
      <ChatIcon/>
      <Footer />
    </>
  );
};

const SearchBox = styled.div`
  width: 100%;
  background-color: #f5f5f5;

  .MoreBtn {
    border: 2px solid #ddd;
    width: 70px;
    height: 30px;
    position: relative;
    right: 50px;
    transition: all 0.25s ease;
    border-radius: 5px;
    margin-top: 30px;
  }

  .MoreBtn:hover {
    border-color: #111;
    box-shadow: 1px 2px 4px rgb(0 0 0 / 10%);
  }

  .MainBox {
    border: 1px solid #e4e4e4;
    width: 80%;
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
    font-family: "Nanum Gothic";
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

const InputBox = styled.div`
  font-family: "Nanum Gothic";

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 30px;
    height: 30px;
    margin: 42px 10px 0 0;
  }

  .search {
    margin-top: 40px;
  }

  .search-box {
    background-color: #eee;
    width: 600px;
    height: 40px;
    border-radius: 30px;
    padding: 9px;
    border: none;
    outline: none;
  }
`;

export default PlaceSearch;
