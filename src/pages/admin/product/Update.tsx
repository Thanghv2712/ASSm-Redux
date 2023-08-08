






import { Button, Checkbox, Form, Input, message, Upload } from 'antd';
import { SyntheticEvent, useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters  , AiOutlineDownload} from 'react-icons/ai';
import {  useNavigate, useParams } from 'react-router-dom';
import { useGetProductByIdQuery, useGetProductsQuery, useUpdateProductMutation, useUploadFileMutation } from '../../../api/product';
import { IProduct } from '../../../interfaces/product';


type FieldType = {
 name? :string ;
 price?: string;
 image?:string;
};

const UpdateProduct = () => {

        const navigate =  useNavigate() ;
        const [form] = Form.useForm();
        
        const [uploadFile] = useUploadFileMutation(); 
        const [image, setImage] = useState<string>('');
        const { idProduct } = useParams<{ idProduct: string }>();
        const [updateProduct , {isLoading : isupdateLoading}] = useUpdateProductMutation(); 
        const {data:productData} = useGetProductByIdQuery(idProduct || "");

        const [messageApi, contextHolder] = message.useMessage();

        useEffect(()=>{
               // lấy dữ liệu từ api và fill vào form
               form.setFieldsValue(productData) 
        }, [productData]);
       
        const onFinish = (values: any) => {
            updateProduct({ id: idProduct , image , ...values  })
            .unwrap()
            .then( () => {
                form.resetFields();
                messageApi.open({
                    type: "success",
                    content: "Sửa sản phẩm thành công. Chuyển trang sau 1s",
                });
                setTimeout(() => {
                    navigate("/admin/product");
                }, 1000);
            });
        };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  const uploadFileSubmit = async (e: SyntheticEvent) => {
    const formData = new FormData();
    let target = e.target as HTMLInputElement;

    const file = target.files?.[0];

    formData.append('file', file as any);
    formData.append('upload_preset', 'uploads');

    try {
        const uploaded: any = await uploadFile(formData);

        const { url } = uploaded.data;

        setImage(url);
    } catch (error) {
        console.log(error);
    }
};
  return (
    <>
        {contextHolder}
    <Form
    form={form}
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Tên Sản Phẩm"
      name="name"
      rules={[{ required: true, message: 'Vui long nhập tên sản phẩm' },
      {min : 4, message: 'sản phẩm ít nhất 4 ký tự' }
    ]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Giá Sản Phẩm"
      name="price"
    >
        <Input />
    </Form.Item>
    <input type="file" onChange={uploadFileSubmit}/>

        

   

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        
    <Button type="primary" danger htmlType="submit">
                        {isupdateLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Sửa sản phẩm"
                        )}
                    </Button>
    </Form.Item>
  </Form>
  </>
  );
 
};

export default UpdateProduct;
