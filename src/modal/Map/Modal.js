import React from "react";
import './modal.css';
import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";

const Modal = (props) => {
  const { open, close, header } = props;

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }

      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    //전체 주소반환
    // console.log(fullAddress);
    props.addressData(fullAddress);
    close();
  };

  return (
    // 모달 열릴 때 openModal 클래스가 생성
    <div className={open ? "openModal modal" : null}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              <Text>닫기</Text>
            </button>
          </header>
          <main>
            <DaumPostcode
             onComplete={handleComplete} 
            className="post-code" />
          </main>
          <footer>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

const Text = styled.p`
margin-left: 6px;
margin-top: 3px;
`;

export default Modal;
