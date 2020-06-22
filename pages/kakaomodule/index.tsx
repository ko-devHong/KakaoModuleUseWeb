import React, { useEffect, useState } from "react";

/**
 * 글로벌로 선언하지 않으면 Kakao 변수를 가지고 오지못한다는 에러가 발생할 수 있음.
 */
declare global {
  interface Window {
    Kakao: any;
  }
}

const KakaoChanel = (props) => {
  const [logValue, setLog] = useState(true); // 카카오 변수를 가지고 올때까지 렌더링
  const { jsKey, channelPublicId } = props; // 모듈에서 jskey와 카카오 채널 id 값을 전달받음
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

    if (window.Kakao) {
      var getId = document.getElementById("kakao-add-channel-button"); // 카카오 채널 버튼을 찾는다.
      if (getId.getElementsByTagName("a").length > 0) {
        // 채널버튼이 하나가 만들어 졌으면 스킵
      } else {
        /**
         * 카카오 채널 버튼을 생성한다. 버튼을 직접 작성해서 함수만 넣을수도 있다.
         * Kakao.Channel.addChannel({
         *  channelPublicId: channelPublicId
         * });
         */
        window.Kakao.Channel.createAddChannelButton({
          container: "#kakao-add-channel-button",
          channelPublicId: channelPublicId, // 채널 홈 URL에 명시된 id로 설정합니다.
        });
      }
    } else {
      setLog(!logValue); // Kakao 변수를 가지고오지 못헀으므로 재 렌더링
    }
  });

  return <button type="button" id="kakao-add-channel-button" />;
};

export default KakaoChanel;
