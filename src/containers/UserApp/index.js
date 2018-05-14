import React from 'react';
import {Table, Icon, Divider, Button, Popconfirm, Modal, Spin} from 'antd';
import propTypes from "prop-types";
import {Helmet} from "react-helmet";
import {compose} from "redux";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect/es";

import injectReducer from "../../utils/injectReducer";
import injectSaga from "../../utils/injectSaga";
import {SELECTOR_ID_PAGE} from "./constants";
import reducer from './reducer';
import saga from './saga';
import {getUsers} from "./actions";
import {getLoadingAppState, getUserFormLoadingState, getUsersState} from "./selectors";
import UserForm from "./UserFom/UserForm";


class UserAppModule extends React.Component {
    state = {
        visibleUserForm: false,
        titleUserForm: 'Add User',
        selectedUser: null,
    };

    componentWillMount() {
        this.props.getUsersFn();
    }

    onDeleteRecord = (record) => {
        console.log(record);
    };
    onAddAndEditRecord = (record = null) => {
        let isAddMode = !record;
        this.setState({
            titleUserForm: isAddMode? 'Add user' : 'Edit User',
            visibleUserForm: true,
            selectedUser: record
        });
    };
    handleCancelForm = (e) => {
        this.setState({
            visibleUserForm: false,
            selectedUser: null
        });
        // setTimeout(() => {console.log(this.state)})
    };

    columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="javascript:;">{text}</a>,
        },{
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },{
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },{
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Popconfirm title="Sure to delete?" onConfirm={() => {this.onDeleteRecord(record)}}>
                      <Button type="primary" shape="circle" icon="delete" />
                    </Popconfirm>

                  <Divider type="vertical" />
                  <Button onClick={() => {this.onAddAndEditRecord(record)}} type="primary" shape="circle" icon="edit" />
                </span>
            ),
        }
    ];
    submitEventBooking = (values) => {
        console.log(values);
    };
    render() {
        let users = this.props.users ? this.props.users : [];
        for(let i = 0; i < users.length; i++) {
            users[i]['key'] = i;
        }
        return (
            <div>
                <Helmet>
                    <title>User Management Page</title>
                    <meta name="description" content="A React.js Boilerplate application homepage"/>
                </Helmet>
                <Button className="editable-add-btn" onClick={ ()=> {this.onAddAndEditRecord()}}>Add</Button>
                <Spin spinning={this.props.loading} >
                    <Table rowKey="id" columns={this.columns} dataSource={users} />
                </Spin>
                <Modal
                    title={this.state.titleUserForm}
                    visible={this.state.visibleUserForm}
                    onCancel={this.handleCancelForm}
                    footer={null}
                >
                    <Spin spinning={this.props.userFormLoading} >
                        {/*onSubmit={this.submitEventBooking}*/}
                        <UserForm onSubmit={this.submitEventBooking} selectedUser={this.state.selectedUser}/>
                    </Spin>
                </Modal>
            </div>
        );
    }
}

UserAppModule.propTypes = {
    // reducer state
    getUsersFn: propTypes.func,
    users: propTypes.array,
    loading: propTypes.bool,
    userFormLoading: propTypes.bool,
};

export function mapDispatchToProps(dispatch) {
    return {
        getUsersFn: () => dispatch(getUsers()),
    };
}

const mapStateToProps = createStructuredSelector({
    users: getUsersState(),
    loading: getLoadingAppState(),
    userFormLoading: getUserFormLoadingState(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: SELECTOR_ID_PAGE, reducer });
const withSaga = injectSaga({ key: SELECTOR_ID_PAGE, saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(UserAppModule);
