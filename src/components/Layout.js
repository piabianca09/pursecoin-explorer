import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { relative } from "path";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class LayoutComponent extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Layout style={{ height: "100vh" }}>
        <Sider
          width="18vw"
          style={{ background: "#fff", padding: "5px" }}
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <h1>PURSECOIN</h1>
          <Menu theme="light" mode="inline" defaultSelectedKeys={["4"]}>
            <SubMenu
              key="transaction"
              title={
                <span>
                  <Icon type="swap" />
                  <span>TRANSACTION</span>
                </span>
              }
            >
              <Menu.Item key="confirmed_transaction">
                <span>
                  <Icon type="file-done" />
                  <span> Confirmed Transaction </span>
                </span>
              </Menu.Item>
              <Menu.Item key="pending_transaction">
                <span>
                  <Icon type="file-exclamation" />
                  <span> Pending Transaction </span>
                </span>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="wallet"
              title={
                <span>
                  <Icon type="wallet" />
                  <span>WALLET</span>
                </span>
              }
            >
              <Menu.Item key="create_wallet">
                <span>
                  <Icon type="plus" />
                  <span> Create Wallet </span>
                </span>
              </Menu.Item>
              <Menu.Item key="view_wallet">
                <span>
                  <Icon type="folder-open" />
                  <span> View Wallet </span>
                </span>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="faucet">
              <Icon type="money-collect" />
              <span className="nav-text">FAUCET</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              content
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default LayoutComponent;
