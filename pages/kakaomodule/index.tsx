import React, { PureComponent } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default class KakaoLogin extends React.Component {
    constructor(props) {
        super(props);
      }
  componentDidMount() {
    const { jsKey, channelPublicId } = this.props;

    ((id, cb) => {
      if (document.getElementById(id) == null) {
        const js: HTMLScriptElement = document.createElement('script');

        js.id = id;
        js.src = '//developers.kakao.com/sdk/js/kakao.min.js';
        js.onload = cb;

        document.body.append(js);
      }
    })('kakao-sdk', () => {
      window.Kakao.init(jsKey);
    });

    setTimeout(()=>{
      if (window.Kakao) {
        window.Kakao.Channel.createAddChannelButton({
          container: '#kakao-add-channel-button',
          channelPublicId: channelPublicId // 채널 홈 URL에 명시된 id로 설정합니다.
        });
        alert("get")
      } else {
        alert("dffggdfdf")
      }
    },3000)
  }

  render() {

    return (
        <button type="button" id="kakao-add-channel-button" />
    );
  }
}