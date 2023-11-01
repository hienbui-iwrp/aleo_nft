import React, { useState } from "react";
import { Col, Row, Button, Table, Input, Space } from "antd";

const dataSourceCollection = [
  {
    key: "1",
    name: "FCTC",
    symbol: "FCTC",
    programId: "nft_fctc.aleo",
    total: 11,
    baseUri: "fctc.vip",
    owner: "aaaa",
  },
  {
    key: "2",
    name: "FCTC",
    symbol: "FCTC",
    programId: "nft_fctc.aleo",
    total: 11,
    baseUri: "fctc.vip",
    owner: "aaaa",
  },
];

const columnsCollection = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Symbol",
    dataIndex: "symbol",
    key: "symbol",
  },
  {
    title: "Program ID",
    dataIndex: "programId",
    key: "programId",
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
  },
  {
    title: "Base URI",
    dataIndex: "baseUri",
    key: "baseUri",
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner",
  },
];

const dataSourceNFTs = [
  {
    key: "1",
    token_id: "FCTC",
    owner: "owner",
  },
  {
    key: "2",
    token_id: "FCTC",
    owner: "owner",
  },
];

const columnsNFT = [
  {
    title: "Token ID",
    dataIndex: "token_id",
    key: "token_id",
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner",
  },
];

export const Something = () => {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [uri, setURI] = useState("");
  return (
    <>
      <Row>
        <Row style={{ marginTop: 10 }}>
          <Col style={{ marginLeft: 10 }}>
            <b>Name</b>
            <Input
              placeholder="Basic usage"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col style={{ marginLeft: 10 }}>
            <b>Symbol</b>
            <Input
              placeholder="Basic usage"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
          </Col>
          <Col style={{ marginLeft: 10 }}>
            <b>Total Supply </b>
            <Input
              placeholder="Basic usage"
              value={totalSupply}
              onChange={(e) => setTotalSupply(e.target.value)}
            />
          </Col>
          <Col style={{ marginLeft: 10 }}>
            <b>URI</b>
            <Input
              placeholder="Basic usage"
              value={uri}
              onChange={(e) => setURI(e.target.value)}
            />
          </Col>
        </Row>
        <Col
          span={24}
          style={{ display: "flex", justifyContent: "flex-start", margin: 20 }}
        >
          <Button type="primary">Init collection</Button>
        </Col>

        <Col span={24}>
          <Table
            dataSource={dataSourceCollection}
            columns={columnsCollection}
            bordered
          />
          ;
        </Col>
      </Row>
      <Row>
        <Row>
          <b>Token Id:</b>
          <Input placeholder="Basic usage" />
        </Row>
        <Col
          span={24}
          style={{ display: "flex", justifyContent: "flex-start", margin: 20 }}
        >
          <Button type="primary">Mint</Button>
        </Col>

        <Col span={24}>
          <Table dataSource={dataSourceNFTs} columns={columnsNFT} bordered />;
        </Col>
      </Row>
    </>
  );
};
