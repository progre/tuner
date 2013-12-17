/// <reference path="../../typings/jquery/jquery.d.ts"/>
/// <reference path="../../typings/easeljs/easeljs.d.ts"/>
/// <reference path="../../typings/preloadjs/preloadjs.d.ts"/>
/// <reference path="../../typings/linq.d.ts"/>
import UI = require('./ui/ui');

$(() => {
    var loadQueue = new createjs.LoadQueue();
    loadQueue.loadManifest(['img/blackmamba.png'], true);
    loadQueue.on('complete', (e: any) => {
        var canvas = <HTMLCanvasElement>$('#main-canvas')[0];
        var ui = new UI($('main')[0], canvas, loadQueue.getResult('img/blackmamba.png'));
        ui.resize();
        $(window).resize(() => ui.resize());

        ui.init();
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.on('tick', () => {
            ui.update();
        });
    });
});

