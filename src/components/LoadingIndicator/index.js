import React from 'react';

import {Layout, Spin} from "antd";

const LoadingIndicator = () => (
    <Spin size="large">
        <Layout style={{ minHeight: "350px" }} />
    </Spin>
);

export default LoadingIndicator;
