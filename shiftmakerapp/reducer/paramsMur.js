export default function (paramsMur = "", action) {
    if (action.type == "addParams") {


        console.log("params" + action.settings);
      return action.settings;
    } else {
  
      return paramsMur
  
    }
  }