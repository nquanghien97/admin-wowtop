import { Button, Form, Input, Modal, Image } from "antd";
import { useEffect, useState } from "react";
import { useNotification } from "../../../hooks/useNotification";
import { useNavigate } from "react-router-dom";
import { getGift, updateGift } from "../../../services/gift";
import { GiftEntity } from "../../../entities/Gift";

interface EditProps {
  open: boolean;
  onClose: () => void;
  id: string
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormValues {
  name: string;
  point: string;
  quantity: string;
}

function Edit(props: EditProps) {
  const { open, onClose, id, setRefreshKey } = props;

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false)
  const [dataGift, setDataGift] = useState<GiftEntity>();
  const [file, setFile] = useState<File>();

  const notification = useNotification();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const res = await getGift(+id)
      const data = res.data.data as GiftEntity
      setDataGift(res.data.data)
      form.setFieldsValue({
        name: data.name,
        point: data.point,
        quantity: data.quantity
      });
    })()
  }, [form, id]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target || !e.target.files) return;
    const newFiles = e.target.files[0]
    try {
      setFile(newFiles)
    } catch(err) {
      console.log(err)
    }
  }

  const onFinish = async (data: FormValues) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', data.name || dataGift?.name || '');
      formData.append('point', data.point || dataGift?.point || '');
      formData.append('quantity', data.quantity || dataGift?.quantity || '');
      formData.append('file', file!)
      await updateGift({ id, data: formData})
      notification.success('Sửa thông tin quà thành công')
      onClose();
      setRefreshKey(pre => !pre)
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.") {
          navigate('/login')
          notification.error(err.message)
        } else {
          notification.error('Sửa thất bại')
        }
      }
    } finally {
      setLoading(false);
    }
  }
  if (!dataGift) return;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      className='!p-0 !w-4/6 !top-4'
      footer={false}
    >
      <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#84571B] rounded-t-lg uppercase font-bold">Xem Bản tin</div>
      <div className="p-4">
      <Form form={form} className="flex flex-col gap-6" onFinish={onFinish}>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#84571B]">Tên</p>
            <Form.Item
              className="!mb-0 w-full"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                },
              ]}
            >
              <Input className="py-2" />
            </Form.Item>
          </div>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#84571B]">Điểm</p>
            <Form.Item
              className="!mb-0 w-full"
              name="point"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                },
              ]}
            >
              <Input className="py-2" type="number" />
            </Form.Item>
          </div>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#84571B]">Số lượng</p>
            <Form.Item
              className="!mb-0 w-full"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                },
              ]}
            >
              <Input className="py-2" type="number" />
            </Form.Item>
          </div>
          <div className="flex items-center flex-col">
            <div className="flex items-center w-full h-full">
              <p className="w-[120px] text-left text-[#84571B]">Hình ảnh</p>
              <Form.Item
                className="!mb-0 w-full"
                name="images"
              >
                <Input type="file" className="py-2" onChange={onFileChange} />
              </Form.Item>
            </div>
            {file ? (
              <div className="flex flex-wrap justify-center w-full py-4 gap-4">
                <Image.PreviewGroup
                >
                  <Image className="border-2 m-auto cursor-pointer" width={200} src={URL.createObjectURL(file)} alt="preview avatar" />
                </Image.PreviewGroup>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center w-full py-4 gap-4 eee">
                <Image.PreviewGroup
                >
                  <Image className="border-2 m-auto cursor-pointer" width={200} src={`${import.meta.env.VITE_API_URL}${dataGift.imageUrl}`} alt="preview avatar" />
                </Image.PreviewGroup>
              </div>
            )}
          </div>
          <div className="flex justify-evenly">
            <Button type="primary" danger onClick={onClose}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={loading}>Xác nhận</Button>
          </div>
        </Form>
      </div>
    </Modal>
  )
}

export default Edit