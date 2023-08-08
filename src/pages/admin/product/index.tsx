import React from 'react';
import { Button, message, Popconfirm, Skeleton, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useGetProductsQuery, useRemoveProductMutation } from '../../../api/product';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';






const AdminProduct = () => {
        const {data , isLoading : isProductLoading} = useGetProductsQuery() ;
        const [removeProduct ] = useRemoveProductMutation();
        const [messageApi, contextHolder] = message.useMessage();

        const dataSource = data?.map((item: any) => ({
            key: item.id,
            name: item.name,
            price: item.price,
            image : item.image
        }));
        // console.log(dataSource);
        
        const columns: ColumnsType<any> = [
            {
              title: 'Tên Sản Phẩm',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Giá',
              dataIndex: 'price',
              key: 'price',
            },
            {
              title: 'Ảnh',
              dataIndex: 'image',
              key: 'image',
              render:(image:string)=> <img src={image} width="100px" alt="" />
            },
           
            {
              title: 'Action',
              key: 'action',
              render: ({key : id}:{key:number | string}) => (
                <Popconfirm

                
                title="Delete Sản Phẩm"
                description="Người anh em có chắc muốn xoá không nào ?"
                icon={<AiFillDelete style={{ color: 'red' }} />}

                onConfirm = {()=>{
                    removeProduct(id).unwrap()
                    .then(() => {
                        messageApi.open({
                            type: "success",
                            content: "Xóa sản phẩm thành công",
                        });
                    });
                }}
              >
                  
                <Button danger>Delete</Button>
                <Button type="primary" className="" danger>
                  
                  <Link to={`/admin/product/${id}/update`} >Sửa</Link>
                </Button>
              </Popconfirm>
              
              ),
            }
          ];

        return (

                    
            <div>
                <Button type="primary" danger>
                    <Link to="/admin/product/add">Thêm sản phẩm</Link>
                </Button>
                {contextHolder}
                {isProductLoading ? (
                <Skeleton active /> // Hiển thị Skeleton khi đang tải dữ liệu
            ) : (
                <Table dataSource={dataSource} columns={columns} />
            )}
            </div>
          
        )
}

export default AdminProduct;