import { Alert, Button, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useNotification } from "../../../hooks/useNotification";
import { useNavigate } from "react-router-dom";
import { getAccumulationCode, updateAccumulationCode } from "../../../services/accumulation";
import { AccumulatePointsEntity, StatusCode } from "../../../entities/Accumulation";

interface EditNewsProps {
  open: boolean;
  onClose: () => void;
  code: string
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormValues {
  status: StatusCode;
  new_code: string
}

function Edit(props: EditNewsProps) {
  const { open, onClose, code, setRefreshKey } = props;

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<AccumulatePointsEntity>()

  const notification = useNotification();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const res = await getAccumulationCode({ code })
      const data = res.data.data as AccumulatePointsEntity
      setData(res.data.data)
      form.setFieldsValue({
        status: data.status,
        code: data.code
      });
    })()
  }, [form, code]);

  const onFinish = async (data: FormValues) => {
    setLoading(true);

    try {
      await updateAccumulationCode({ code, status: data.status, new_code: data.new_code })
      notification.success('Sửa code thành công')
      onClose();
      setRefreshKey(pre => !pre)
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.") {
          navigate('/login')
          notification.error(err.message)
        } else {
          notification.error('Sửa code thất bại')
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
      <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#84571B] rounded-t-lg uppercase font-bold">Xem Bản tin</div>
      <div className="p-4">
        <Form form={form} className="flex flex-col gap-6" onFinish={onFinish}>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#84571B]">Mã code cũ</p>
            <Form.Item
              className="!mb-0 w-full"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                },
              ]}
            >
              <Alert message={data?.code || "Chưa có thông tin"} className="w-full" />
            </Form.Item>
          </div>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#84571B]">Trạng thái</p>
            <Form.Item
              className="!mb-0 w-full"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                },
              ]}
            >
              <Select options={[{ label: 'Chưa sử dụng', value: 'UNUSED' }, { label: 'Đã sử dụng', value: 'USED' }, { label: 'Hết hạn', value: 'EXPIRED' }]} />
            </Form.Item>
          </div>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#84571B]">Mã code mới</p>
            <Form.Item
              className="!mb-0 w-full"
              name="new_code"
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