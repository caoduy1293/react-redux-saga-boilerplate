import React from 'react';
import propTypes from 'prop-types';
import {FIELDS, ROLES_USER, USER_FORM_ID} from "../constants";
import {Field, formValueSelector, reduxForm} from "redux-form";
import FormFieldForInput from "../../../components/FormField/Input";
import {Form, Input, Select} from "antd";
import {connect} from "react-redux";
import {get} from "lodash";

const { Option } = Select;
const AInput = FormFieldForInput(Input);
const ASelect = FormFieldForInput(Select);
class UserForm extends React.Component{
    componentWillReceiveProps(nextProps){
        let selectedUser = nextProps.selectedUser;
        nextProps.reset();
        if(selectedUser ) {

        }
        if(selectedUser) {
            this.props.change(FIELDS.name.id, get(selectedUser, 'name', ''));
            this.props.change(FIELDS.email.id, get(selectedUser, 'email', ''));
            this.props.change(FIELDS.role.id, get(selectedUser, 'role', ''));
        }
        this.setState({
            selectedUser: nextProps.selectedUser,
        });
    }
    state = {
        selectedUser: this.props.selectedUser,
        roles: ROLES_USER
    };
    render() {
        const {
            handleSubmit,
            selectedUser,
            name,
            email,
            password,
            role,
        } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <Field
                    label={FIELDS.name.label}
                    name={FIELDS.name.id}
                    component={AInput}
                    placeholder={FIELDS.name.label}
                    hasFeedback/>
                <Field
                    label={FIELDS.email.label}
                    name={FIELDS.email.id}
                    component={AInput}
                    placeholder={FIELDS.email.label}
                    hasFeedback/>
                <Field label={FIELDS.role.label}
                       name={FIELDS.role.id}
                       component={ASelect}
                       placeholder={FIELDS.role.label}
                       hasFeedback>
                    {this.state.roles.map((value) => (<Option key={value} value={value}>{value}</Option>))}
                </Field>
            </Form>
        );
    }
}

UserForm.propTypes = {
    //form state
    // name: propTypes.string,
    // email: propTypes.string,
    // password: propTypes.string,
    // role: propTypes.string,
    change: propTypes.func,

    //HOC prop
    selectedUser: propTypes.object,
    handleSubmit: propTypes.any,
};

const validate = values => {
    const errors = {};
    if (!values[FIELDS.name.id]) {
        errors[FIELDS.name.id] = 'Required'
    }
    if (!values[FIELDS.email.id]) {
        errors[FIELDS.email.id] = 'Required'
    }
    if (!values[FIELDS.password.id]) {
        errors[FIELDS.password.id] = 'Required'
    }
    if (!values[FIELDS.role.id]) {
        errors[FIELDS.role.id] = 'Required'
    }
    return errors;
};

UserForm = reduxForm({
    form: USER_FORM_ID,
    validate
})(UserForm);

// const selectorUserForm = formValueSelector(USER_FORM_ID);

// UserForm = connect(state => {
//     const { name, email } = selectorUserForm(state, FIELDS.name.id, FIELDS.email.id);
//     const password = selectorUserForm(state, FIELDS.password.id);
//     const role = selectorUserForm(state, FIELDS.role.id);
//     return {
//         name,
//         email,
//         password,
//         role,
//     };
// })(UserForm);

export default UserForm;