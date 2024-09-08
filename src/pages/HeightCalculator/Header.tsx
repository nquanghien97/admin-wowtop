import { Button, Form, Input, Tooltip } from "antd";
import SearchIcon from "../../assets/icons/SearchIcon";
import { SearchFormType } from ".";
import { getInformations } from "../../services/heightCalculator";
import { HeightCalculatorEntity } from "../../entities/HeightCalculator";

interface HeaderProps {
  setSearchForm: React.Dispatch<React.SetStateAction<SearchFormType | undefined>>
  setData: React.Dispatch<React.SetStateAction<HeightCalculatorEntity[]>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

function Header(props: HeaderProps) {
  const { setSearchForm, setData, setLoading } = props;
  const [form] = Form.useForm();

  const onFinish = async (data: SearchFormType) => {
    setLoading(true);
    setSearchForm(data);
    try {
      const res = await getInformations(data);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form onFinish={onFinish} className="flex py-2 justify-between" form={form}>
      <div className="flex gap-2 items-center">
        <Form.Item
          className="w-[160px]"
          name="code"
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
          name="parentName"
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

