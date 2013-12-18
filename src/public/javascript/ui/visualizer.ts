export function drawFrequency(frequencyData: Uint8Array, graphics: createjs.Graphics, width: number, height: number) {
    graphics.clear()
    graphics.beginStroke('#000')
    graphics.moveTo(0, height - frequencyData[0]);
    for (var i = 1, len = frequencyData.length; i < len; i++) {
        graphics.lineTo(i, height - frequencyData[i]);
    }
}

export function drawTimeDomain(timeDomainData: Uint8Array, graphics: createjs.Graphics, width: number, height: number) {
    graphics.clear()
    graphics.beginStroke('#000')
    graphics.moveTo(0, (128 - timeDomainData[0]) / 256 * height);
    for (var i = 1, len = timeDomainData.length; i < len; i++) {
        graphics.lineTo(i / len * width, (128 - timeDomainData[i]) / 256 * height);
    }
}
