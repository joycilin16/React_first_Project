import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Form,
  Drawer,
  Input,
  InputNumber,
  Menu,
  Table,
  Checkbox,
  message,
} from "antd";
import Typography from "antd/es/typography/Typography";
import { useEffect, useState } from "react";
import { getCart } from "../../../API";
function AppHeader() {
  const navigate = useNavigate();

  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };
  return (
    <div className="AppHeader">
      <Menu
      className="appMenu"
        onClick={onMenuClick}
        mode="horizontal"
        items={[
          {
            label: <HomeFilled />,
            key: "",
          },
          {
            label: "Women",
            key: "women",
            children: [
              {
                label: "Women-Dresses",
                key: "women-dresses",
              },
              {
                label: "Women-Shoes",
                key: "women-shoes",
              },
              {
                label: "Women-Accessories",
                key: "women-accessories",
              },
              {
                label: "Women-Watches",
                key: "women-watches",
              },
            ],
          },
          {
            label: "Men",
            key: "men",
            children: [
              {
                label: "Men-Shirts",
                key: "men-shirts",
              },
              {
                label: "Men-Shoes",
                key: "men-shoes",
              },
              {
                label: "Men-Accessories",
                key: "men-accessories",
              },
              {
                label: "Men-Watches",
                key: "men-watches",
              },
            ],
          },
          {
            label: "Beauty",
            key: "beauty",
          },
          {
            label: "Services",
            key: "services",
          },
        ]}
      />
      <Typography.Title className="TitleName">Trendora</Typography.Title>
      <AppCart />
    </div>
  );
}

function AppCart() {
  const [CartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    getCart().then((res) => {
      setCartItems(res.products);
    });
  }, []);

  const onconfirmOrder=(values)=>{
console.log({values});
setCartDrawerOpen(false);
setCheckoutDrawerOpen(false);
message.success("Order Confirmed");
  }
  return (
    <div>
      <Badge
        count={8}
        onClick={() => {
          setCartDrawerOpen(true);
        }}
        className="ShoppingCartIcon"
      >
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        open={CartDrawerOpen}
        onClose={() => {
          setCartDrawerOpen(false);
        }}
        title="Shopping Cart"
        width={600}
      >
        <Table
          pagination={false}
          columns={[
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              render: (value, record) => {
                return (
                  <InputNumber
                    min={0}
                    value={record.quantity}
                    onChange={(newQuantity) => {
                      setCartItems((prev) =>
                        prev.map((cart) => {
                          if (cart.id === record.id) {
                            return {
                              ...cart,
                              quantity: newQuantity,
                              total: cart.price * newQuantity,
                            };
                          }
                          return cart;
                        })
                      );
                    }}
                  />
                );
              },
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => {
                return <span>${value}</span>;
              },
            },
            {
              title: "Total Price",
              dataIndex: "total",
              render: (value, record) => {
                const total = record.price * record.quantity;
                return <span>${total.toFixed(2)}</span>;
              },
            },
          ]}
          dataSource={cartItems}
          summary={(data) => {
            const total = data.reduce(
              (prev, current) => prev + current.total,
              0
            );
            return <span>Total: ${total.toFixed(2)}</span>;
          }}
        />

        <Button
          onClick={() => {
            setCheckoutDrawerOpen(true);
          }}
          type="primary"
        >
          Checkout Your Cart
        </Button>
      </Drawer>
      <Drawer
        open={checkoutDrawerOpen}
        onClose={() => {
          setCheckoutDrawerOpen(false);
        }}
        //   title="Confirm Your Order"
      >
        <Form onFinish={onconfirmOrder}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter Your Name..." />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input placeholder="Enter Your Email..." />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input placeholder="Enter Your Address..." />
          </Form.Item>
          <Form.Item>
            <Checkbox  defaultChecked disabled  >Cash on Delivery</Checkbox>
          </Form.Item>
          <Typography.Paragraph type="secondary" > More option</Typography.Paragraph>
          <Button type="primary" htmlType="submit">
            Confirm Your Order
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}

export default AppHeader;
