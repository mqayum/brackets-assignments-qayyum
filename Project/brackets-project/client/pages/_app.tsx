import '../styles/globals.css'
import {Provider} from "react-redux"
import {store} from "../store/store"
import type {AppPropsWithLayout} from "../types/types"
import RouteProtector from "../components/application/RouteProtector";

import {PersistGate} from "redux-persist/integration/react";
import {persistor} from "../store/store";


export default function App({ Component, pageProps }: AppPropsWithLayout) {

    {/* If Component has getLayout function then return the function,
     otherwise, return a function that receives a ReactElement as parameter and returns it */}
    const getLayout = Component.getLayout ?? ((page) => page)
    const role = Component.requiredRole || null

  return (
      <Provider store={store}>
          <PersistGate persistor={persistor}>
                    <RouteProtector requiredRole={role}>

                          {/* Following function call will wrap Component in its custom layout, if exists. */}
                          {getLayout(<Component {...pageProps} />)}

                    </RouteProtector>
          </PersistGate>
      </Provider>
  )
}
