import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"

import store from "./app/store"
import App from "./Components/App"

import "./css/normalize.css"
import "./css/themes.css"
import "./css/index.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
