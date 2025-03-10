import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Layout from "./layout.tsx";

function App() {
    return (
        <Router basename="/IAVFrontendFramework">
            <Layout/>
        </Router>
    );
}

export default App;
