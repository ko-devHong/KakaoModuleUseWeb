import React, { useEffect, useState } from "react";

/**
 * 글로벌로 선언하지 않으면 Kakao 변수를 가지고 오지못한다는 에러가 발생할 수 있음.
 */
declare global {
  interface Window {
    Kakao: any;
  }
}

const KakaoTalk = (props) => {
  const [logValue, setLog] = useState(true); // 카카오 변수를 가지고 올때까지 렌더링
  const { jsKey } = props; // 모듈에서 jskey 값을 전달받음
  useEffect(() => {
    /**
     * 카카오 모듈을 가지고 오기위해 script 태그를 만들고 그안에 카카오SDK js 파일을 가지고온다.
     */
    ((id, cb) => {
      if (document.getElementById(id) == null) {
        const js: HTMLScriptElement = document.createElement("script");

        js.id = id;
        js.src = "//developers.kakao.com/sdk/js/kakao.min.js";
        js.onload = cb;

        document.body.append(js);
      }
    })("kakao-sdk", () => {
      window.Kakao.init(jsKey); // 카카오 sdk안에 jskey 등록
    });
  });

  const AddAgreeButton = () => {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:3000/oauth",
      scope: "friends",
    });
  };

  const buttonClick = () => {
    if (window.Kakao) {
      window.Kakao.API.request({
        url: "/v1/api/talk/friends",
        success: function (response) {
          console.log(response);
        },
        fail: function (error) {
          console.log(error);
        },
      });
    } else {
      console.log("not get");
      setLog(!logValue); // Kakao 변수를 가지고오지 못헀으므로 재 렌더링
    }
  };

  return (
    <div>
      <button
        type="button"
        id="kakao-get-friend-button2"
        style={{ width: 100, height: 50 }}
        onClick={AddAgreeButton}
      >
        카카오톡 친구 목록 가져오기 동의
      </button>
      <button
        type="button"
        id="kakao-get-friend-button"
        style={{ width: 100, height: 50 }}
        onClick={buttonClick}
      >
        카카오톡 친구 불러오기
      </button>
    </div>
  );
};

export default KakaoTalk;
