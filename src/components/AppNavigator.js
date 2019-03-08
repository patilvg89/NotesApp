/*eslint-disable*/
import { createAppContainer } from "react-navigation";
import { AppStackNavigator } from "../config/routes";

const AppContainer = createAppContainer(AppStackNavigator);
export { AppContainer };
