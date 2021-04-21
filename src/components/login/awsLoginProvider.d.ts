import React, { Component } from "react";
import { Props, State } from "./awsLoginProvider";
import LoginProvider from "./loginProvider";

export default class AWSLoginProvider extends Component<React.PropsWithChildren<Props>, State> implements LoginProvider{}