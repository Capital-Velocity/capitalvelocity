import React, { useState, useEffect } from "react";
// import "antd/dist/antd.css";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import themes from "../themes";
import { signout } from "../actions/userActions";
import { listProductCategories } from "../actions/productActions";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import MenuSideBarCallout from "../components/MenuSideBarCallout";
import Divider from "@mui/material/Divider";
import {
  SettingOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  FileAddOutlined,
  ArrowRightOutlined,
  DesktopOutlined,
  MailOutlined,
  ShoppingCartOutlined,
  PlusOutlined,
  HomeOutlined,
  FileDoneOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  EditOutlined,
  DashboardOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Button, Menu, Layout } from "antd";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("Option 3", "3", <ContainerOutlined />),
  getItem("Navigation One", "sub1", <MailOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Option 7", "7"),
    getItem("Option 8", "8"),
  ]),
  getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ]),
];

const AntDesignSideBarUser = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const cart = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/name/${name}` || ``);
    console.log(userInfo);
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  const customization = useSelector((state) => state.customization);
  const [isLoading, setLoading] = useState(true);
  return (
    <div
      style={{
        width: 230,
        height: "100vh",
      }}
    >
      {/* <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button> */}
      <Menu
        style={{ height: "100vh" }}
        width={9000}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        inlineCollapsed={collapsed}
      >
        <Menu.Item>
          <p style={{ fontWeight: "bold" }}>User Dashboard</p>
        </Menu.Item>
        <Menu.Item
          style={{ marginBottom: 27 }}
          icon={
            <DashboardOutlined style={{ fontSize: "20px", color: "grey" }} />
          }
        >
          <Link href="/userDash" style={{ fontSize: "14px", color: "grey" }}>
            Dashboard
          </Link>
        </Menu.Item>
        <Divider />
        <Menu.Item
          style={{ marginBottom: 27 }}
          icon={<PlusOutlined style={{ fontSize: "20px", color: "grey" }} />}
        >
          <Link
            href="/userDashFile"
            style={{ fontSize: "14px", color: "grey" }}
          >
            Submit Files
          </Link>
        </Menu.Item>

        <Menu.Item
          style={{ marginBottom: 27 }}
          icon={
            <ShoppingCartOutlined style={{ fontSize: "20px", color: "grey" }} />
          }
        >
          <Link
            href="/loan-form-realestate"
            style={{ fontSize: "14px", color: "grey" }}
          >
            Market Place
          </Link>
        </Menu.Item>

        {userInfo && userInfo.isSeller && (
          <>
            <Menu.Item
              style={{ marginBottom: 27 }}
              icon={
                <FileAddOutlined style={{ fontSize: "20px", color: "grey" }} />
              }
            >
              <Link
                href="/addProduct"
                style={{ fontSize: "14px", color: "grey" }}
              >
                Add a Listing
              </Link>
            </Menu.Item>
            <Menu.Item
              style={{ marginBottom: 27 }}
              icon={
                <EditOutlined style={{ fontSize: "20px", color: "grey" }} />
              }
            >
              <Link
                href="/productlist/seller"
                style={{ fontSize: "14px", color: "grey" }}
              >
                Edit Listing
              </Link>
            </Menu.Item>
            <Menu.Item
              style={{ marginBottom: 27 }}
              icon={
                <ShopOutlined style={{ fontSize: "20px", color: "grey" }} />
              }
            >
              <Link
                href="/orderedlist"
                style={{ fontSize: "14px", color: "grey" }}
              >
                Customer Order
              </Link>
            </Menu.Item>
          </>
        )}
        <Divider />
        <Menu.Item
          icon={
            <ArrowRightOutlined style={{ fontSize: "20px", color: "grey" }} />
          }
          onClick={signoutHandler}
        >
          <p style={{ fontSize: "14px", color: "grey" }}>SignOut</p>
        </Menu.Item>

        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={themes(customization)}>
            <MenuSideBarCallout isLoading={isLoading} />
          </ThemeProvider>
        </StyledEngineProvider>
      </Menu>
    </div>
  );
};

export default AntDesignSideBarUser;
