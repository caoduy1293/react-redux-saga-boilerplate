import React from 'react';
import { FormattedMessage } from 'react-intl';

import LocaleToggle from '../LocaleToggle';
import messages from './messages';
import {Col, Icon, Layout, Row} from "antd";

function Footer() {
    return (
        <Layout>
            <Row>
                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                    <section style={{ textAlign: 'center' }}>
                        <Icon type="copyright" /> <FormattedMessage {...messages.licenseMessage} />
                    </section>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                    <section style={{ textAlign: 'center' }}>
                        <FormattedMessage
                            {...messages.authorMessage}
                            values={{
                                author: <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/duy.q.cao">Duy Cao ❤</a>,
                            }}
                        />
                    </section>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 24 }} lg={{ span: 8 }}>
                    <section style={{ textAlign: 'center' }}>
                        <LocaleToggle />
                    </section>
                </Col>
            </Row>
        </Layout>
    );
}

export default Footer;
