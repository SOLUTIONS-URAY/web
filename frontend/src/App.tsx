import 'react';
import {MainContainer} from "./containers/MainContainer/MainContainer.tsx";
import {AppRoutes} from "./routing/AppRoutes.tsx";
function App() {

    return (
        <MainContainer>
            <AppRoutes/>
        </MainContainer>
    )
}

export default App
