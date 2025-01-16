/**
 * Copyright © 2024 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {PropsWithChildren, useCallback, useState} from "react";
import {State} from "@iavofficial/frontend-framework/dummyAuthenticationProvider";
import {AuthContext, Credentials} from "@iavofficial/frontend-framework/auth";

interface Props {
    additionalContextValues?: { [key: string]: any };
}


/**
 * The `AuthenticationStore` component handles authentication within the framework.
 * Instead of using dummy provider, it simulates the behavior of a real user who uses the framework.
 *
 * @param props - The properties passed to the component, including children components.
 * @constructor
 */
export const AuthenticationStore = (props: PropsWithChildren<Props>) => {

    const {
        children
    } = props;

    const [authenticated, setAuthenticated] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [userData, setUserData] = useState<State['userData']>(undefined);

    const refreshIfAuthenticated = useCallback(() => {
        setRefreshing(true);
    }, [setAuthenticated, setRefreshing]);


    const fetchAuthed = (url: string, settings?: Object) => {
        return fetch(url, settings);
    };

    const login = (credentials: Credentials) => {
        setRefreshing(true);
        setAuthenticated(false)
        setUserData({username: credentials.email});
        setTimeout(() => {
            setRefreshing(false);
            setAuthenticated(false)
            setUserData({username: credentials.email});
        }, 3000)
    };

    const logout = () => {
        setRefreshing(false);
        setAuthenticated(false)
        setUserData(undefined);
    };

    const getUserData = () => {
        return userData?.groups;
    };

    const hasAuthenticated = () => {
        return authenticated;
    }

    return (
        <AuthContext.Provider value={{
            ...props,
            hasAuthenticated,
            userData,
            fetchAuthed,
            login,
            logout,
            getUserData,
            authenticated,
            setAuthenticated,
            setRefreshing,
            refreshIfAuthenticated,
            refreshing,
            isRefreshing: () => refreshing
        }}>
            {children}
        </AuthContext.Provider>
    );
};


