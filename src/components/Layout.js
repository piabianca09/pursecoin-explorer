import React, { Component } from "react";
import { BrowserRouter as Route, Link, Switch } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import HomeComponent from "./Home";
import FaucetComponent from "./Faucet";
import CreateWalletComponent from "./wallet/CreateWallet";
import ViewWalletComponent from "./wallet/ViewWallet";
import ConfirmedTransactionsComponent from "./transaction/confirmed_transactions";
import PendingTransactionsComponent from "./transaction/pending_transactions";
import BlocksComponent from "./Blocks";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

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
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          style={{ background: "#fff", padding: "5px" }}
        >
          <div className="logo" />
          <Menu theme="light" mode="inline" defaultSelectedKeys={["4"]}>
            <Menu.Item key="home">
              <span>
                <Icon type="file-done" />
                <span>
                  <Link to="/"> HOME </Link>
                </span>
              </span>
            </Menu.Item>
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
                  <span>
                    <Link to="/transactions/confirmed">
                      Confirmed Transaction
                    </Link>
                  </span>
                </span>
              </Menu.Item>
              <Menu.Item key="pending_transaction">
                <span>
                  <Icon type="file-exclamation" />
                  <span>
                    <Link to="/transactions/pending">Pending Transaction</Link>
                  </span>
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
                  <span>
                    <Link to="/wallet/creat-wallet"> Create Wallet </Link>
                  </span>
                </span>
              </Menu.Item>
              <Menu.Item key="view_wallet">
                <span>
                  <Icon type="folder-open" />
                  <span>
                    <Link to="/wallet/view-wallet"> View Wallet </Link>
                  </span>
                </span>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="faucet">
              <Icon type="money-collect" />
              <span className="nav-text">
                <Link to="/faucet">FAUCET</Link>
              </span>
            </Menu.Item>
            <Menu.Item key="blocks">
              <span>
                <Icon type="build" />
                <span>
                  <Link to="/blocks"> BLOCKS </Link>
                </span>
              </span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: 25, backgroundColor:'#FFF'}}>
          <Content>
              <Switch>
                <Route exact path="/" component={HomeComponent} />
                <Route path="/faucet" component={FaucetComponent} />
                <Route
                  path="/wallet/creat-wallet"
                  component={CreateWalletComponent}
                />
                <Route
                  path="/wallet/view-wallet"
                  component={ViewWalletComponent}
                />
                <Route path="/blocks" component={BlocksComponent} />
                <Route
                  path="/transactions/pending"
                  component={PendingTransactionsComponent}
                />
                <Route
                  path="/transactions/confirmed"
                  component={ConfirmedTransactionsComponent}
                />
              </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default LayoutComponent;
