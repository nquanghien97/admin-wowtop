import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useNotification } from "../../../hooks/useNotification";
import { useNavigate } from "react-router-dom";
import { getUser, updateUser } from "../../../services/user";
import { UserEntity } from "../../../entities/User";

interface EditNewsProps {
  open: boolean;
  onClose: () => void;
  id: string
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormValues {
  full_name: string;
}

function Edit(props: EditNewsProps) {
  const { open, onClose, id, setRefreshKey } = props;

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<UserEntity>()

  const notification = useNotification();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const res = await getUser(+id)
      const data = res.data.data as UserEntity
      setData(res.data.data)
      form.setFieldsValue({
        full_name: data.full_name,
      });
    })()
  }, [form, id]);

  const onFinish = async (data: FormValues) => {
    setLoading(true);

    try {
      await updateUser({ id: +id, data })
      notification.success('Sửa người dùng thành công')
      onClose();
      setRefreshKey(pre => !pre)
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.") {
          navigate('/login')
          notification.error(err.message)
        } else {
          notification.error('Sửa người dùng thất bại')
        }
      }
    } finally {
      setLoading(false);
    }
  }
  if (!data) return;
  console.log(data);
  return (
    <Modal
      open={open}
      onCancel={onClose}
      className='!p-0 !w-4/6 !top-4'
      footer={false}
    >
      <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#84571B] rounded-t-lg uppercase font-bold">Chỉnh sửa người dùng</div>
      <div className="p-4">
        <Form form={form} className="flex flex-col gap-6" onFinish={onFinish}>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#84571B]">Tên người dùng</p>
            <Form.Item
              className="!mb-0 w-full"
              name="full_name"
            >
              <Input className="py-2" />
            </Form.Item>
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