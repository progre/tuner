import utils = require('./../app/utils');
declare var navigator: any, AudioContext: any;

utils.enableVendorPrefixedObject(window, 'AudioContext');
utils.enableVendorPrefixedObject(navigator, 'getUserMedia');

export = Microphone;
class Microphone {
    audioContext = new AudioContext();
    analyser: any;

    constructor() {
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 2048;
    }

    connect() {
        var deferred = Q.defer();
        navigator.getUserMedia({ "audio": true }, stream => {
            URL.createObjectURL(stream);// hack: iFirefox25j‚±‚ê‚ğ“ü‚ê‚È‚¢‚ÆŸè‚ÉÚ‘±‚ªØ‚ê‚é
            var mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
            mediaStreamSource.connect(this.analyser);
            deferred.resolve(null);
        }, e => deferred.reject(e));
        return deferred.promise;
    }
}
