import { Button, Form, Input, Select, Tooltip } from "antd";
import SearchIcon from "../../assets/icons/SearchIcon";
import { SearchFormType } from ".";

interface HeaderProps {
  setSearchForm: React.Dispatch<React.SetStateAction<SearchFormType>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

function Header(props: HeaderProps) {
  const { setSearchForm, setLoading } = props;
  const [form] = Form.useForm();

  const onFinish = async (data: SearchFormType) => {
    setLoading(true);
    setSearchForm(pre => ({...pre, code: data.code, page: 1, status: data.status}));
  }

  return (
    <Form onFinish={onFinish} className="flex py-2 justify-between" form={form}>
      <div className="flex gap-2 items-center">
        <Form.Item
          className="w-[160px]"
          name="code"
        >
          <Input
            placeholder="Mã"
            className=""
            allowClear
          />
        </Form.Item>
        <Form.Item
          className="w-[160px]"
          name="status"
        >
          <Select
            placeholder="Chọn trạng thái"
            options={[{ label: 'Chưa sử dụng', value: 'UNUSED' }, { label: 'Đã sử dụng', value: 'USED' }, { label: 'Hết hạn', value: 'EXPIRED' }]}
            allowClear
          />
        </Form.Item>
        <Form.Item>
          <Tooltip title="Tìm kiếm">
            <Button
              htmlType="submit"
              className="bg-[#84571B] hover:!bg-[#c58229] duration-300"
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

