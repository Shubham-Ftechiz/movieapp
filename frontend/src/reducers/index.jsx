import {
  changeHealthMetrics,
  changeBarData,
  changeBodyParts,
} from "./healthmetricsdata";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  changeHealthMetrics,
  changeBarData,
  changeBodyParts,
});

export default rootReducer;
