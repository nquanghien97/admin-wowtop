import { useState } from "react";
import { Button, Form, Input, Tooltip } from "antd";
import SearchIcon from "../../assets/icons/SearchIcon";

interface FormValues {
  search: string;
  system_id: number;
  group_id: number;
  user: {
    label: string;
    value: number;
  };
  channel_id: number;
  date: Date[]
}


function Header() {

  const [loadingUser, setLoadingUser] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (data: FormValues) => {
   
  }

  return (
    <Form onFinish={onFinish} className="flex py-2 justify-between" form={form}>
      <div className="flex gap-2 items-center">
        <Form.Item
          className="w-[160px]"
          name="idPhacDo"
        >
          <Input
            placeholder="Mã Phác Đồ"
            className="py-2"
            rootClassName="border-[1px] border-[#007bb5] rounded-lg"
          />
        </Form.Item>
        <Form.Item
          className="w-[160px]"
          name="phoneNumber"
        >
          <Input
            placeholder="Số điện thoại"
            className="py-2"
            rootClassName="border-[1px] border-[#007bb5] rounded-lg"
          />
        </Form.Item>
        <Form.Item
          className="w-[160px]"
          name="fullNameParent"
        >
          <Input
            placeholder="Họ tên phụ huynh"
            className="py-2"
            rootClassName="border-[1px] border-[#007bb5] rounded-lg"
          />
        </Form.Item>
        <Form.Item
          className="w-[160px]"
          name="fullName"
        >
          <Input
            placeholder="Họ tên con"
            className="py-2"
            rootClassName="border-[1px] border-[#007bb5] rounded-lg"
          />
        </Form.Item>
        <Form.Item>
          <Tooltip title="Tìm kiếm">
            <Button
              htmlType="submit"
              type="primary"
              shape="circle"
              icon={<SearchIcon color="white" />}
            />
          </Tooltip>
        </Form.Item>
      </div>
    </Form>
  )
}

export default Header;

