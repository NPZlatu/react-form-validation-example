import React from "react";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.errors = {
            name: "Name is required!!",
            email: "Email is required!!",
            password: "Password is required!!",
            confirm_password: "Confirm Password is required"
        };
        this.enterOnChange = false;
        this.validateKeyValue = {
            name: "Name",
            email: "Email",
            password: "Password",
            confirm_password: "Confirm Password"
        };

        this.state = {
            fields: {
                name: "",
                email: "",
                password: "",
                confirm_password: ""
            },
            errors: {
                name: "Name is required!!",
                email: "Email is required!!",
                password: "Password is required!!",
                confirm_password: "Confirm Password is required"
            },
            formSubmitted: false
        };
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleOnChange(event) {
        this.enterOnChange = true;
        const { id, value } = event.target;
        this.checkValidation(id, value);
        this.setState(function(prevState) {
            const fields = prevState.fields;
            fields[id] = value;
            return {
                fields: fields,
                errors: this.errors
            };
        });
    }

    handleSignUp() {
        this.formSubmitted = true;
        const isEmptyErrors =
            Object.keys(this.errors).length === 0 &&
            this.errors.constructor === Object;
        if (!isEmptyErrors) {
            this.setState(
                () => {
                    return {
                        errors: this.errors,
                        formSubmitted: true
                    };
                },
                () => {
                    this.scrollToError();
                }
            );
        } else if (!this.enterOnChange) {
            this.setState(
                prevState => {
                    return {
                        errors: prevState.errors,
                        formSubmitted: true
                    };
                },
                () => {
                    this.scrollToError();
                }
            );
        } else {
            this.props.onSubmit(true);
        }
    }

    checkValidation(field, value) {
        const { password, confirm_password } = this.state.fields;
        if (!value) {
            this.errors[field] =
                this.validateKeyValue[field] + " is required!!";
        } else if (value) {
            if (field === "email" && !this.isEmail(value))
                this.errors[field] = "Enter a valid email address";
            else if (
                field === "confirm_password" &&
                password &&
                value !== password
            )
                this.errors[
                    field
                ] = `Password and Confirm Password doesn't match`;
            else if (
                field === "password" &&
                confirm_password &&
                value !== confirm_password
            ) {
                delete this.errors[field];
                this.errors[
                    "confirm_password"
                ] = `Password and Confirm Password doesn't match`;
            } else {
                delete this.errors[field];
                if (field == "password" && confirm_password)
                    delete this.errors["confirm_password"];
            }
        }
    }

    isEmail = (email = null) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    };

    scrollToError() {
        const errorElements = document.getElementsByClassName("error-text");
        const firstErrorElement = errorElements[0];
        firstErrorElement.scrollIntoView();
    }

    render() {
        const { name, email, password, confirm_password } = this.state.fields;
        const { errors, formSubmitted } = this.state;
        const errorNameElement = {};

        if (formSubmitted) {
            for (let key in this.validateKeyValue) {
                if (errors && errors[key])
                    errorNameElement[key] = (
                        <small className="error-text">{errors[key]}</small>
                    );
            }
        }

        return (
            <div className="container">
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={this.handleOnChange}
                            id="name"
                        />
                        {errorNameElement.name}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={this.handleOnChange}
                        />
                        {errorNameElement.email}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={this.handleOnChange}
                        />
                        {errorNameElement.password}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirm_password"
                            value={confirm_password}
                            onChange={this.handleOnChange}
                        />
                        {errorNameElement.confirm_password}
                    </div>

                    <button
                        type="button"
                        onClick={this.handleSignUp}
                        className="btn btn-primary"
                    >
                        Submit And Log In
                    </button>
                </form>
            </div>
        );
    }
}

export { Form };
