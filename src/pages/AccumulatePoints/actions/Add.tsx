import { Button, Form, Input, Modal, Table, TableColumnsType } from "antd";
import { ChangeEvent, useState } from "react";
import { useNotification } from "../../../hooks/useNotification";
import { useNavigate } from "react-router-dom";
import PlusIcon from "../../../assets/icons/PlusIcon";
import axios from "axios";
import * as XLSX from "xlsx";
import { createAccumulationCode, createBulkAccumulationCode } from "../../../services/accumulation";

interface AddProps {
  open: boolean;
  onClose: () => void;
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}
interface FormValues {
  code: string;
}

interface DataRow {
  'Mã': string;
}

function Add(props: AddProps) {
  const { open, onClose, setRefreshKey } = props;

  const [loading, setLoading] = useState<boolean>(false);
  const [resAdded, setResAdded] = useState<{ addedCodes: string[], existingCodes: string[] }>();
  const [openModalResAdd, setOpenModalResAdd] = useState<boolean>(false);

  const [form] = Form.useForm();
  const notification = useNotification();
  const navigate = useNavigate()

  const onFinish = async (data: FormValues) => {
    setLoading(true);
    try {
      await createAccumulationCode({ code: data.code })
      notification.success('Thêm mã thành công')
      onClose();
      setRefreshKey(pre => !pre)
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.") {
          navigate('/login')
          notification.error(err.message)
        } else {
          notification.error('Thêm mã thất bại')
        }
      }
    } finally {
      setLoading(false);
    }
  }

  const [dataImport, setDataImport] = useState<DataRow[] | null>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const workbook = XLSX.read(event.target?.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData: DataRow[] = XLSX.utils.sheet_to_json(sheet, { raw: false, dateNF: 'yyy-mm-dd' });

        setDataImport(sheetData);
      };

      reader.readAsArrayBuffer(file);
    }
    e.target.value = '';
  };

  const onCloseModal = () => {
    onClose()
    setDataImport(null);
  }
  const onFinishBulk = async () => {
    setLoading(true);
    const dataSubmit = dataImport?.map(item => (
      item["Mã"]
    ));
    if (!dataSubmit) {
      notification.warning('Bạn cần import dữ liệu')
      return;
    }
    try {
      const res = await createBulkAccumulationCode({ codes: dataSubmit })
      if (res.data.existingCodes.length > 0) {
        setOpenModalResAdd(true)
        setResAdded({
          addedCodes: res.data.addedCodes,
          existingCodes: res.data.existingCodes,
        })
        return;
      }
      onClose()
          setRefreshKey(pre => !pre)
          notification.success('Thêm hàng loạt code thành công')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        notification.error(err.response?.data.message)
      } else {
        notification.error('Có lỗi xảy ra, vui lòng thử lại!')
      }
    } finally {
      setLoading(false);
    }
  }

  const columns: TableColumnsType = [
    {
      title: 'Mã',
      dataIndex: 'Mã',
      key: '2',
      align: 'center'
    },
  ]

  return (
    <>
      <Modal
        open={open}
        onCancel={onClose}
        className='!p-0 !w-4/6 !top-4'
        footer={false}
      >
        <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#84571B] rounded-t-lg uppercase font-bold">Thêm Tin tức</div>
        <div className="p-4">
          <Form form={form} onFinish={onFinishBulk}>
            <label htmlFor="import-ad-costs" className="h-full">
              <div className="flex justify-end">
                <div className="bg-[#68c2ed] rounded-md cursor-pointer h-full px-4 py-2 my-4 flex items-center justify-end hover:opacity-80 duration-300">
                  <span className="text-white">Khai báo Code hàng loạt</span>
                  <PlusIcon color="white" />
                </div>
              </div>
              <input type="file" onChange={handleFileUpload} id="import-ad-costs" className="!hidden" />
            </label>
            {dataImport && (
              <>
                <Table className="w-1/2 m-auto" dataSource={dataImport} columns={columns} rowKey={(record) => record["Mã"]} pagination={false} />
                <div className="flex justify-evenly py-4">
                  <Button type="primary" danger onClick={onCloseModal}>Hủy</Button>
                  <Button type="primary" htmlType="submit" loading={loading}>Xác nhận</Button>
                </div>
              </>
            )}
          </Form>
          {!dataImport && (
            <Form form={form} className="flex flex-col gap-6" onFinish={onFinish}>
              <div className="flex items-center h-[40px]">
                <p className="w-[120px] text-left text-[#84571B]">Mã</p>
                <Form.Item
                  className="!mb-0 w-full"
                  name="code"
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
              <div className="flex justify-evenly">
                <Button type="primary" danger onClick={onClose}>Hủy</Button>
                <Button type="primary" htmlType="submit" loading={loading}>Xác nhận</Button>
              </div>
            </Form>
          )}
        </div>
      </Modal>
      <Modal
        open={openModalResAdd}
        onCancel={() => setOpenModalResAdd(false)}
        className="modal-confirm"
        onOk={() => {
          onClose()
          setRefreshKey(pre => !pre)
          notification.success('Thêm hàng loạt code thành công')
        }}>
        <Table
          columns={[
            {
              title: 'Mã được thêm',
              // dataIndex: 'addedCodes',
              key: '1',
              align: 'center'
            },
          ]}
          dataSource={resAdded?.addedCodes}
        />
        <Table
          columns={[
            {
              title: 'Mã đã tồn tại',
              // dataIndex: 'addedCodes',
              key: '1',
              align: 'center'
            },
          ]}
          dataSource={resAdded?.existingCodes}
        />
      </Modal>

    </>
  )
}

export default Add