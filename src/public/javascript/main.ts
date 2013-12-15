/// <reference path="../../typings/jquery/jquery.d.ts"/>
/// <reference path="../../typings/easeljs/easeljs.d.ts"/>
/// <reference path="../../typings/preloadjs/preloadjs.d.ts"/>
/// <reference path="../../typings/linq.d.ts"/>
import StageCanvas = require('./lib/stagecanvas/stagecanvas');

$(() => {
    var loadQueue = new createjs.LoadQueue();
    loadQueue.loadManifest(['img/blackmamba.png'], true);
    loadQueue.on('complete', (e: any) => {
        var canvas = <HTMLCanvasElement>$('#main-canvas')[0];
        var stage = new StageCanvas(canvas, loadQueue.getResult('img/blackmamba.png')).stage;
        init(stage);
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.on('tick', () => {
            stage.update();
        });
    });
});

function init(stage: createjs.Stage) {
    var textContainer = new createjs.Container();
    textContainer.x = 160;
    textContainer.y = 12;
    var textWindow = new createjs.Shape();
    textWindow.graphics
        .beginFill('#445')
        .drawRoundRect(-150, 0, 300, 32, 2);
    textContainer.addChild(textWindow);
    var text = new createjs.Text(
        'C   D♭ D   E♭ E   F   G♭ G   A♭ A   B♭ B',
        '14px sans-serif',
        '#eee');
    text.x = -138;
    text.y = 10;
    textContainer.addChild(text);
    stage.addChild(textContainer);

    var needleContainer = new createjs.Container();
    needleContainer.x = 160;
    needleContainer.y = 56;
    var needleWindow = new createjs.Shape();
    needleWindow.graphics
        .beginFill('#445')
        .drawRoundRect(-150, 0, 300, 185, 2);
    needleContainer.addChild(needleWindow);
    var needle = new createjs.Shape();
    needle.graphics
        .setStrokeStyle(1)
        .beginStroke('#000')
        .lineTo(0, 156)
        .lineTo(0, 16);
    needleContainer.addChild(needle);
    stage.addChild(needleContainer);

    var levelContainer = new createjs.Container();
    levelContainer.x = 160;
    levelContainer.y = 251;
    var level = new createjs.Shape();
    level.graphics
        .setStrokeStyle(3, 'round');
    for (var i = -144; i < 96; i += 6) {
        level.graphics.beginStroke('#4f4')
            .lineTo(i, 0).lineTo(i, 22)
    }
    for (var i = 96; i <= 144; i += 6) {
        level.graphics.beginStroke('#f44')
            .lineTo(i, 0).lineTo(i, 22);
    }
    levelContainer.addChild(level);
    stage.addChild(levelContainer);

    var oscilloscopeContainer = new createjs.Container();
    oscilloscopeContainer.x = 160;
    oscilloscopeContainer.y = 284;
    var oscilloscopeWindow = new createjs.Shape();
    oscilloscopeWindow.graphics
        .beginFill('#9a0')
        .drawRoundRect(-150, 0, 211, 87, 2);
    oscilloscopeContainer.addChild(oscilloscopeWindow);
    stage.addChild(oscilloscopeContainer);

    var pitchContainer = new createjs.Container();
    pitchContainer.x = 160;
    pitchContainer.y = 384;
    var pitchWindow = new createjs.Shape();
    pitchWindow.graphics
        .beginFill('#9a0')
        .drawRoundRect(-150, 0, 211, 64, 2);
    pitchContainer.addChild(pitchWindow);
    var pitch = new createjs.Text(
        '442 Hz',
        '48px monospace',
        '#111');
    pitch.x = -120;
    pitch.y = 10;
    pitchContainer.addChild(pitch);
    stage.addChild(pitchContainer);

    var buttonsContainer = new createjs.Container();
    buttonsContainer.x = 160;
    buttonsContainer.y = 336;
    var upButton = new createjs.Shape();
    upButton.graphics
        .beginFill('#999')
        .drawPolyStar(112, 0, 40, 3, 0, 30)
        .drawPolyStar(112, 72, 40, 3, 0, 90);
    buttonsContainer.addChild(upButton);
    stage.addChild(buttonsContainer);
}
