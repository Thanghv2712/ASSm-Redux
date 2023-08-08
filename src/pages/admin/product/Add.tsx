




import { Button, Checkbox, Form, Input, message, Upload } from 'antd';
import { SyntheticEvent, useState } from 'react';
import { AiOutlineLoading3Quarters  , AiOutlineDownload} from 'react-icons/ai';
import {  useNavigate } from 'react-router-dom';
import { useAddProductMutation, useUploadFileMutation } from '../../../api/product';
import { IProduct } from '../../../interfaces/product';


type FieldType = {
 name? :string ;
 price?: string;
 image?:string;
};

const AddProduct = () => {

        const navigate =  useNavigate() ;
        const [form] = Form.useForm();
        const [addProduct , {isLoading : isAddLoading}] = useAddProductMutation();  
        const [uploadFile] = useUploadFileMutation(); 
        const [image, setImage] = useState<string>('');

        const [messageApi, contextHolder] = message.useMessage();
       
        const onFinish = (values: any) => {
            addProduct({
              image,
               ...values
            })
            .unwrap()
            .then( () => {
                form.resetFields();
                messageApi.open({
                    type: "success",
                    content: "Thêm sản phẩm thành công. Chuyển trang sau 1s",
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
        console.log(url);
        
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
                        {isAddLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Thêm sản phẩm"
                        )}
                    </Button>
    </Form.Item>
  </Form>
  </>
  );
 
};

export default AddProduct;
