import  React from 'react';
import ReactDom from 'react-dom';
import HomePage from "./pages/HomePage";
import {HashRouter, Switch, Route} from "react-router-dom";
import CategoriePage from "./pages/CategoriePage";
require('../css/app.css');

const App = () => {
    return(<HashRouter>
            <main className={"container pt-5"}>
                <Switch>
                    <Route path={"/Category"} component={CategoriePage}/>
                    <Route path={"/"} component={HomePage}/>
                </Switch>
            </main>

        </HashRouter>
    )
}
const rootElement = document.querySelector('#app');
ReactDom.render(<App/>, rootElement);
