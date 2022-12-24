var usbDetect = require('usb-detection');


export function start(){
    usbDetect.startMonitoring();
}

export function stop(){
    usbDetect.stopMonitoring();
}

export function onChange(callback: Function){
    usbDetect.on('change', callback);
}