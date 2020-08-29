import * as paper from 'paper'

class PaperSetup {

    constructor(canvas){

        if(!PaperSetup.instance){
            this._data = [];
            PaperSetup.instance = this;
        }

        paper.setup(canvas);
        // Create a Paper.js Path to draw a line into it:
        var path = new paper.Path();
        // Give the stroke a color
        path.strokeColor = 'black';
        var start = new paper.Point(100, 100);
        // Move to start and draw a line from there
        path.moveTo(start);
        // Note that the plus operator on Point objects does not work
        // in JavaScript. Instead, we need to call the add() function:
        path.lineTo(start.add([ 200, -50 ]));
        // Draw the view now:
        paper.view.draw();

        return PaperSetup.instance;
    }

}
var canvas = document.getElementById('annotateCanvas');
const mypaper = new PaperSetup(canvas);
Object.freeze(mypaper);

export default mypaper;