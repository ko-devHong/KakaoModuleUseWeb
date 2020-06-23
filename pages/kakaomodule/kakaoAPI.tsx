import React, { useEffect, useState } from "react";
import axios from "axios";
/**
 * 글로벌로 선언하지 않으면 Kakao 변수를 가지고 오지못한다는 에러가 발생할 수 있음.
 */
declare global {
  interface Window {
    Kakao: any;
  }
}

const KakaoAPI = (props) => {
  const [logValue, setLog] = useState(true); // 카카오 변수를 가지고 올때까지 렌더링
  const { jsKey, code } = props; // 모듈에서 jskey와 카카오 채널 id 값을 전달받음
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

  const apiButton = () => {
    if (window.Kakao) {
      console.log("this is code ", code);
      console.log("this is jskey ", jsKey);
      // const form = new FormData();
      // form.append("grant_type", "authorization_code");
      // form.append("client_id", jsKey);
      // form.append("redirect_uri", "http://localhost:3000/oauth");
      // form.append("code", code);
      // axios({
      //   method: "post",
      //   url: "https://kauth.kakao.com/oauth/token",
      //   data: form,
      //   headers: {
      //     "content-type": `application/x-www-form-urlencoded;charset=utf-8`,
      //   },
      // })
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   });

      window.Kakao.API.request({
        url: "/oauth/token",
        grant_type: "authorization_code",
        client_id: jsKey,
        redirect_uri: "http://localhost:3000/oauth",
        code: code,
        Host: "kauth.kakao.com",
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        success: function (response) {
          console.log(response);
        },
        fail: function (error) {
          console.log(error);
        },
      });
    } else {
      console.log("not kakao");
      setLog(!logValue); // Kakao 변수를 가지고오지 못헀으므로 재 렌더링
    }
  };

  return (
    <button
      type="button"
      id="kakao-api-button"
      style={{ width: 100, height: 50 }}
      onClick={apiButton}
    >
      API 요청
    </button>
  );
};

export default KakaoAPI;
