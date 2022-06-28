import 'primeflex/primeflex.css';
import 'primereact/resources/themes/nova/theme.css';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import React, {useContext, ReactElement, useEffect, useRef} from 'react';
import {
    BrowserRouter as Router,
    Route,
    useLocation,
    Routes,
    Navigate,
    useNavigate
} from 'react-router-dom';
import './css/constants.css';
import './css/disaPage.css';
import './css/disaFramework.css';
import './css/error.css';
import {BasicAuthenticationView} from './authentication/default/basicAuthenticationView';
import {DisaHeader} from './disaHeader';
import {Navbar} from './navbar/navbar';
import {Imprint} from './imprint';
import {CookieBanner} from './cookie/cookieBanner';
import {AuthContext} from '../contexts/auth';
import {TabAndContentWrapper} from './navbar/wrapper/tabAndContentWrapper';
import {MenuOptions} from './navbar/menu';
import {AuthenticationViewProps} from './authentication/aws/authenticationView';

interface HeaderOptions {
    reactElementRight?: ReactElement;
    reactElementLeft?: ReactElement;
    letteringElementLeft?: string;
    hideLeft?: boolean;
    hideRight?: boolean;
}

export interface Props {
    tabAndContentWrappers: TabAndContentWrapper[];
    startingPoint: string;
    menuOptions?: MenuOptions;
    authenticationView?: React.ComponentType<AuthenticationViewProps & any>;
    documentsComponent?: React.ComponentType<any>;
    documentsLabelKey?: string;
    headerOptions?: HeaderOptions;
}

// TODO: The creation of the components DefaultImprint, RSMView and Redirector inside UILayer may cause a problem.
// Because the components are recreated every render, the Routes will get new components every render. This may cause a rerender of
// all components which are encapsulated in this layer.
export const UILayer = (props: Props) => {
    const authContext = useContext(AuthContext);
    const AuthenticationView = props.authenticationView ? props.authenticationView : BasicAuthenticationView;

    return (
        <>
            <CookieBanner/>
            <Router>
                <Redirector
                    startingPoint={props.startingPoint}
                />
                <Routes>
                    <Route
                        path='/login'
                        element={
                            <AuthenticationView
                                documentsLabelKey={props.documentsLabelKey}
                                headerOptions={props.headerOptions}
                            />
                        }
                    />
                    {!authContext?.hasAuthenticated() && (
                        <Route
                            path='/documents'
                            element={
                                props.documentsComponent ?
                                    <props.documentsComponent/>
                                    :
                                    <DefaultImprint/>
                            }
                        />
                    )}
                    <Route path='/*' element={
                        <RSMView
                            headerOptions={props.headerOptions}
                            tabAndContentWrappers={props.tabAndContentWrappers}
                            menuOptions={props.menuOptions}
                            documentsLabelKey={props.documentsLabelKey}
                            documentsComponent={props.documentsComponent}
                        />
                    }/>
                </Routes>
            </Router>
        </>
    );
};

interface RedirectorProps {
    startingPoint: string;
}

/**
 * This component is needed because the useLocation hook can only be used inside a Router-component
 * environment.
 * @param props
 * @constructor
 */
const Redirector = (props: RedirectorProps) => {
    const authContext = useContext(AuthContext);
    const userIsAuthenticated = authContext!.hasAuthenticated();
    const currentPath = useLocation().pathname;
    const navigate = useNavigate();

    useEffect(() => {
        console.log("effect");
        if (!userIsAuthenticated) {
            if (currentPath !== "/documents" && currentPath !== "/login") {
                navigate("/login");
            }
        } else {
            if (currentPath === "/login") {
                navigate(props.startingPoint.valueOf());
            }
        }
    }, [currentPath, userIsAuthenticated, navigate]);

    return <React.Fragment/>;
}

interface RSMViewProps {
    tabAndContentWrappers: TabAndContentWrapper[];
    menuOptions?: MenuOptions;
    documentsComponent?: React.ComponentType<any>;
    documentsLabelKey?: string;
    headerOptions?: HeaderOptions;
}

// className="p-d-flex p-flex-column"
const RSMView = (props: RSMViewProps) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bottom: '0'
    }}>
        <div style={{flex: '0 0 auto'}}>
            <DisaHeader headerOptions={props.headerOptions}/>
        </div>
        <div style={{display: 'flex', flex: '1 1 auto', overflow: 'auto'}}>
            <Navbar
                tabAndContentWrappers={props.tabAndContentWrappers}
                menuOptions={props.menuOptions}
                documentsLabelKey={props.documentsLabelKey}
            />
            <Routes>
                {props.tabAndContentWrappers.map((wrapper) => wrapper.getRoutes())}
                <Route
                    path='/documents'
                    element={
                        props.documentsComponent ?
                            <props.documentsComponent/>
                            :
                            <DefaultImprint/>
                    }
                />
            </Routes>
        </div>
    </div>
);

const DefaultImprint = () => (
    <div
        className='p-d-flex'
        style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
        <Imprint/>
    </div>
);