import { Button, Form, Modal, Table, TableColumnsType } from "antd";
import { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";
import { useNotification } from "../../../hooks/useNotification";
import axios from "axios";

interface DataRow {
  'Mã': number;
}

interface BulkCodesProps {
  open: boolean
  onClose: () => void;
}

function BulkCodes(props: BulkCodesProps) {
  const { open, onClose} = props;

  const [dataImport, setDataImport] = useState<DataRow[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const notification = useNotification()

  const handleFileUpload = (e : ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if(file) {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const workbook = XLSX.read(event.target?.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData: DataRow[] = XLSX.utils.sheet_to_json(sheet, { raw: false, dateNF: 'yyy-mm-dd'});
  
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

  const onFinish = async () => {
    setLoading(true);
    const dataSubmit = dataImport?.map(item => (
      item["Mã"]
    ));
    if(!dataSubmit) {
      notification.warning('Bạn cần import dữ liệu')
      return;
    }
    try {
      // await BankBulkCodes(dataSubmit)
      onClose()
      console.log(dataSubmit)
      notification.success('Thêm hàng loạt code thành công')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const invalidData = err.response?.data.invalidData
        for (const key in invalidData) {
          if (Array.isArray(invalidData[key]) && invalidData[key].includes("Số thẻ ngân hàng không tồn tại hoặc đã ngừng sử dụng.")) {
            const index = parseInt(key.split('.')[1], 10);
            notification.error(`Số TKNH "${dataSubmit[index]}" không tồn tại hoặc đã ngừng sử dụng.`)
            break;
          }
        }
      } else {
        notification.error('Có lỗi xảy ra, vui lòng thử lại!')
      }
    } finally {
      setLoading(false);
    }
  }

  console.log(dataImport)

  const columns: TableColumnsType = [
    {
      title: 'Mã',
      dataIndex: 'Mã',
      key: '2'
    },
  ]

  return (
    <>
      <Modal open={open} onCancel={onCloseModal} footer={false} className="!w-1/2">
        <Form form={form} onFinish={onFinish}>
          <label htmlFor="import-ad-costs" className="h-full">
            <div className="flex justify-center">
              <div className="bg-[#68c2ed] rounded-md cursor-pointer h-full px-4 py-2 my-4 flex items-center justify-center hover:opacity-80 duration-300">
                <span className="text-white">Khai báo Code</span>
              </div>
            </div>
            <input type="file" onChange={handleFileUpload} id="import-ad-costs" className="!hidden" />
          </label>
        {dataImport && (
          <>
            <Table dataSource={dataImport} columns={columns} rowKey={(record) => record["ID TKQC"]} pagination={false} />
            <div className="flex justify-evenly py-4">
              <Button type="primary" danger onClick={onCloseModal}>Hủy</Button>
              <Button type="primary" htmlType="submit" loading={loading}>Xác nhận</Button>
            </div>
          </>
        )}
        </Form>
      </Modal>
    </>
  );
}

export default BulkCodes