import React from "react";
import { Nav } from "./Nav";
import { Form } from "./Form";
import { Home } from "./Home";

export default class Todo extends React.Component {
    constructor() {
        super();
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.state = {
            status: "Logged Out",
            isLoggedIn: false
        };
    }

    handleOnSubmit(isLoggedIn) {
        const status = isLoggedIn ? "Logged In" : "Logged Out";
        this.setState(function() {
            return {
                status: "Logged In",
                isLoggedIn: true
            };
        });
    }

    render() {
        let element = (
            <div>
                <Form onSubmit={this.handleOnSubmit} />
            </div>
        );
        if (this.state.isLoggedIn) element = <Home />;
        return (
            <div className="">
                <Nav />
                {element}
            </div>
        );
    }
}
