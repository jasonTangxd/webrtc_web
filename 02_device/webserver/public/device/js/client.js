/**
 * MediaDevices.enumerateDevices() 获取音视频设备列表
 *
 * 返回MediaDeviceInfo
 *
 */

'use strict'

var audioSource = document.querySelector("select#audioSource");
var audioOutput = document.querySelector("select#audioOutput");
var videoSource = document.querySelector("select#videoSource");


if (!navigator.mediaDevices ||
    !navigator.mediaDevices.enumerateDevices) {
    console.log('enumerateDevices is not supported!');
} else {
    // enumerateDevices(): Promise<MediaDeviceInfo[]>; 获取音视频设备列表
    // MediaDeviceInfo 它表示的是每个输入/输出设备的信息，有以下三个重要的信息
    // deviceID，设备的唯一标识；
    // label，设备名称；（除非用户已被授予访问媒体设备的权限（要想授予权限需要使用HTTPS请求），否则label字段始终为空）
    // kind，设备种类，可用于识别出是音频设备还是视频设备，是输入设备还是输出设备。
    navigator.mediaDevices.enumerateDevices()
        .then(gotDevices)
        .catch(handleError);
}

function gotDevices(deviceInfos) {
    deviceInfos.forEach(function (deviceInfo) {

        console.log(
            deviceInfo.kind + " : " +
            "label = " + deviceInfo.label +
            ", id = " + deviceInfo.deviceId +
            ", groupId = " + deviceInfo.groupId
        );

        var option = document.createElement('option');

        option.text = deviceInfo.label;
        option.value = deviceInfo.deviceId;

        if (deviceInfo.kind === 'audioinput') {
            audioSource.appendChild(option);
        } else if (deviceInfo.kind === 'audiooutput') {
            audioOutput.appendChild(option);
        } else if (deviceInfo.kind === 'videoinput') {
            videoSource.appendChild(option);
        }
    });

}

function handleError(err) {
    console.log(err.name + " : " + err.message);
}
