// import paper from 'paper';

class ToolBox {
    
    constructor(scope, tools) {
      this.toolName = {
        'freehand': toolPath,
        'circle': toolCircle
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
      path.strokeColor = '#424242'
      path.strokeWidth = 4
      path.add(event.point)
    }

    tool.onMouseDrag = function(event) {
      path.add(event.point)
    }

    return tool
  }

  // Tool Circle, draws a 30px circle on mousedown

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

  // Construct a Toolstack, passing your Tools

export default ToolBox