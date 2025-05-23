import { List, Card, Image, Typography,Badge, Rate ,Button, message, Spin,Select} from "antd";
import { useEffect, useState } from "react";
import {getAllProducts,  AddToCart} from '/src/API/index.jsx';
import '@ant-design/v5-patch-for-react-19';
import { getProductByCategory } from "../../../API";
import { useParams } from "react-router-dom";


function Products() {
  const [loading,setLoading]=useState(false);
  const param=useParams();
  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("az");
  useEffect(() => {
    setLoading(true);
    (param ?. categoryId ?
       getProductByCategory(param.categoryId):getAllProducts()).then((res) => {
      setItems(res.products);
      setLoading(false);
    });
  }, [param.categoryId]);
  const getSortedItems = () => {
    const sortedItems = [...items];
    sortedItems.sort((a, b) => {
const alowerCaseTitle= a.title.toLowerCase();
const blowerCaseTitle= b.title.toLowerCase();

      if (sortOrder === "az") {
        return alowerCaseTitle>blowerCaseTitle ? 1:alowerCaseTitle=== blowerCaseTitle ?0:-1;
      } 
      else if (sortOrder === "za") {
        return alowerCaseTitle<blowerCaseTitle ? 1:alowerCaseTitle === blowerCaseTitle ?0:-1;
      }
      else if (sortOrder === "lowHigh") {
        return a.price>b.price ? 1:a.price === b.price ?0:-1;
      } 
      else if (sortOrder === "Highlow") {
        return a.price<b.price ? 1:a.price === b.price ?0:-1;
      } 
    })
    return sortedItems;
  }
  if(loading){
    return(
      <Spin spinning />
    )
  }
  return (
    <div className="productContainer">
      <div>
        <Typography.Text>View items sorted by:</Typography.Text>
        <Select 
        onChange={(value)=>{
          setSortOrder(value);
        }}
        defaultValue={'az'}
        options={[{
          label:'Alphabetically a-z',
          value:'az'
        },
        {
          label:'Alphabetically z-a',
          value:'za'
        },
        {
          label:'Price low to high',
          value:'lowHigh'
        },
        {
          label:'Price  high to low  ',
          value:'Highlow'
        },
        ]}>

        </Select>
      </div>
      <List
        grid={{ column: 3 }}
        renderItem={(product, index) => {
          return (
            <Badge.Ribbon className="itemCardBadge" text={product.discountPercentage} color="pink">
            <Card
             className="itemCard"
              title={product.title}
              key={index}
              cover={<Image  className="itemCardImage" src={product.thumbnail} />}
              actions={[
                <Rate allowHalf disabled defaultValue={product.rating}/>,
               <AddToCartButton item={product}/>
              ]}
            >
              <Card.Meta
                title={
                  <Typography.Paragraph>
                    Price: ${" "}
                    <Typography.Text delete type="danger">
                      {product.price.toFixed(2)}
                    </Typography.Text>{" "}
                    <Typography.Text type="success">
                      $
                      {(
                        product.price *
                        (1 - product.discountPercentage / 100)
                      ).toFixed(2)}
                    </Typography.Text>
                  </Typography.Paragraph>
                }
                description={<Typography.Paragraph ellipsis={{rows:2, expandable:true, symbol:'more' }} >{product.description}</Typography.Paragraph> }
              />
            </Card>
            </Badge.Ribbon>
          );
        }}
        dataSource={getSortedItems()}
      ></List>
    </div>
  );
}

function AddToCartButton({item}){
    const [loading,setLoading]=useState(false);
const AddProductToCart=()=>{
    setLoading(true);
    AddToCart(item.id).then(()=>{
        message.success(`${item.title} added to cart`);
        setLoading(false);
    })
}
    return(
        <Button type="link" loading={loading} onClick={()=>
            AddProductToCart()
        } >Add to cart</Button>
    )
}

export default Products;
