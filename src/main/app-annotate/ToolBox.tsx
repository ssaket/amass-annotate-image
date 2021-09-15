// import paper from 'paper';

class ToolBox {
    
    constructor(scope, tools) {
      this.toolName = {
        'freehand': toolPath,
        'circle': toolCircle,
        'rectangle': toolRectangle
      }
      this.tools = tools.map(tool =>  this.toolName[tool](scope));
    }

    activateTool(name) {
      const tool = this.tools.find(tool => tool.name === name)
      tool.activate()
    }

    // add more methods here as you see fit ...
  }

  // Tool Path, draws paths on mouse-drag

  const toolPath = (paper) => {
    const tool = new paper.Tool()
    tool.name = 'freehand'

    let path

    tool.onMouseDown = function(event) {
      path = new paper.Path()
      path.strokeColor = 'black';
      path.strokeWidth = 3
      path.add(event.point)
    }

    tool.onMouseDrag = function(event) {
      path.add(event.point)
    }

    return tool
  }


  const toolCircle = (paper) => {
    const tool = new paper.Tool()
    tool.name = 'circle'

    let path;

    tool.onMouseDown = function(event) {
      path = new paper.Path.Circle({
        center: event.point,
        radius: 30,
        fillColor: '#9C27B0'
      })
    }

    return tool
  }

  const toolRectangle = (paper) => {
    const tool = new paper.Tool()
    tool.name = 'rectangle'

    let path;

    tool.onMouseDown = function(event) {
      path = new paper.Path.Circle({
        center: event.point,
        radius: 3,
        fillColor: 'black'
      })
    }

    tool.onMouseUp = function(event) {
      path = new paper.Path.Rectangle({
        point: event.point,
        size: event.delta.length,
        fillColor: 'black'
      })
    }

    return tool
  }


export default ToolBox