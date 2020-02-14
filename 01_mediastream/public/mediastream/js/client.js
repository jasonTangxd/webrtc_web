/**
 * 在浏览器中访问音视频设备 核心API,返回Promise对象
 * var promise = navigator.mediaDevices.getUserMedia(constraints);
 * 然后将视频源赋给html5的video标签
 */

'use strict'

var videoplay = document.querySelector('video#player');

// 获得媒体流
// 输入参数为MediaStream对象
function gotLocalMediaStream(stream) {

    var videoTrack = stream.getVideoTracks()[0];
    window.stream = stream;

    // 将它作为视频源赋值给 HTML5 的 video 标签的 srcObject 属性。
    // 这样在 HTML 页面加载之后，就可以在该页面中看到摄像头采集到的视频数据了。
    videoplay.srcObject = stream;
}

function handleError(err) {
    console.log('getUserMedia error:', err);
}

function start() {

    //  判断是否能获取到媒体驱动以及用户的media
    if (!navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia is not supported!');
        return;
    }

    // 初始化MediaStreamConstraints
    // interface MediaStreamConstraints {
    //     audio?: boolean | MediaTrackConstraints;
    //     peerIdentity?: string;
    //     video?: boolean | MediaTrackConstraints;
    // }
    // https://w3c.github.io/mediacapture-main/getusermedia.html#mediastreamconstraints
    var constraints = {
        video: {
            width: 640,
            height: 480,
            frameRate: 15,  //视频的帧率
            facingMode: 'enviroment' //后置摄像头
        },
        audio: false
    }

    // 核心代码
    navigator.mediaDevices.getUserMedia(constraints)
        .then(gotLocalMediaStream)
        .catch(handleError);
}

start();
