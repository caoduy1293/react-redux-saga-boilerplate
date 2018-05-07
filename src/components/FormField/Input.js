import React from "react";
import {Form} from "antd";
import {formItemLayout} from "../constants";
const FormItem = Form.Item;

const FormFieldForInput = Component => ({
                                    input,
                                    meta,
                                    children,
                                    hasFeedback,
                                    label,
                                    ...rest
                                }) => {
    const hasError = meta.touched && meta.invalid;
    return (
        <FormItem
            {...formItemLayout}
            label={label}
            validateStatus={hasError ? "error" : "success"}
            hasFeedback={hasFeedback && hasError}
            help={hasError && meta.error}
        >
            <Component {...input} {...rest} children={children} />
        </FormItem>
    );
};

export default FormFieldForInput;

