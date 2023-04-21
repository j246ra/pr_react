import {Toaster, Position} from "@blueprintjs/core"

const AppToaster = (state) => {
  return Toaster.create({
    ...state,
    className: "app-toaster",
    position: Position.TOP,
  });
}
export default AppToaster;
