import { useAppDispatch, useAppSelector } from "../store/hook";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useGetProductsQuery } from "../api/product";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
import { add } from "../slices/cart";
import { Link } from "react-router-dom";

const ProductList = () => {
    const dispatch = useAppDispatch();
    const { data: products, error, isLoading } = useGetProductsQuery();
    if (isLoading) return <Skeleton count={3} />;
    if (error) {
        if ("data" in error && "status" in error) {
            return (
                <div>
                    {error.status} - {JSON.stringify(error.data)}
                </div>
            );
        }
    }
    return (
        // <div classNameName="max-w-7xl mx-auto">
        //     {products?.map((product: any) => (
        //         <div key={product.id} className="mb-3">
        //             {product.name}{" "}
        //             <img src={product.image} width="100px" alt="" />
                    
        //         </div>
        //     ))}
        //     {/* <Button onClick={() => dispatch(addProduct({ name: "Product Added 1" }))}>Thêm</Button> */}
        //     {/* <Button onClick={() => dispatch(removeProduct(3))}>Delete</Button> */}
        // </div>
        <Grid className="grid grid-cols-3 my-5">
            {products?.map((product:any)=>(
                <Grid key={product.id}>
                              <Card sx={{ maxWidth: 345 }}>
        <CardMedia
        
          sx={{ height: 140 }}
          component="img"
          image={product.image}
          
          title="green iguana"
          
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="#ab003c">
                    {product.price}
          </Typography>
        </CardContent>
        <CardActions>
        <Button  onClick={() => dispatch(add({ ...product, quantity: 1 }))} >
          <Link to={"/cart"}>Thêm giỏ hàng</Link>
        </Button>
          
        </CardActions>
      </Card> 
                </Grid>
            ))}
      
        </Grid>
       
    );
};

export default ProductList