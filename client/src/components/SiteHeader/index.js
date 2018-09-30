import React from 'react';
import { Link } from "react-router-dom";
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

const SiteHeader= ({className}) => (
  <Row className={`header ${className || null}`}>
    <Col span={20}>
      <Link to="/">
        <h1>Tiny me</h1>
      </Link>
    </Col>
    <Col span={4}>
      <Link to="/">
        <h5>Contact us</h5>
      </Link>
    </Col>
  </Row>
);

export default SiteHeader;
