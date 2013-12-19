export function autoCorrelate(buf, sampleRate) {
    var MIN_SAMPLES = 4;	// corresponds to an 11kHz signal
    var MAX_SAMPLES = 1000; // corresponds to a 44Hz signal
    var SIZE = 1000;
    var best_offset = -1;
    var best_correlation = 0;
    var rms = 0;

    if (buf.length < (SIZE + MAX_SAMPLES - MIN_SAMPLES))
        return -1;  // Not enough data

    for (var i = 0; i < SIZE; i++) {
        var val = (buf[i] - 128) / 128;
        rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);

    for (var offset = MIN_SAMPLES; offset <= MAX_SAMPLES; offset++) {
        var correlation = 0;

        for (var i = 0; i < SIZE; i++) {
            correlation += Math.abs(((buf[i] - 128) / 128) - ((buf[i + offset] - 128) / 128));
        }
        correlation = 1 - (correlation / SIZE);
        if (correlation > best_correlation) {
            best_correlation = correlation;
            best_offset = offset;
        }
    }
    if ((rms > 0.01) && (best_correlation > 0.01)) {
        return sampleRate / best_offset;
    }
    return -1;
}

export function noteFromPitch(frequency) {
    var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    return Math.round(noteNum) + 69;
}

export function centsOffFromPitch(frequency, note) {
    return Math.floor(1200 * Math.log(frequency / frequencyFromNoteNumber(note)) / Math.log(2));
}

function frequencyFromNoteNumber(note) {
    return 440 * Math.pow(2, (note - 69) / 12);
}
