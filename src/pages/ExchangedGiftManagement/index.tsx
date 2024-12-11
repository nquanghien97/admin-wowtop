import { ConfigProvider, Image, Select, Table, TableColumnsType } from "antd";
import { useCallback, useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import Header from "./Header";
import { UserEntity } from "../../entities/User";
import { changeStatusExchangeGift, exchangedGift } from "../../services/gift";
import { ExchangeGiftEntity, GiftStatus } from "../../entities/Gift";
import { useNotification } from "../../hooks/useNotification";

export interface SearchFormType {
  page?: number;
  page_size?: number;
  full_name?: string;
  gift_name?: string;
}

const optionsStatus = [
  {
    label: "Chờ xác nhận",
    value: "PENDING"
  },
  {
    label: "Đang giao hàng",
    value: "SHIPPING"
  },
  {
    label: "Hoàn tất",
    value: "COMPLETED"
  },
  {
    label: "Hủy",
    value: "CANCELLED"
  }
]

function ExchangedGiftManagement() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserEntity[]>([]);
  const [paging, setPaging] = useState({
    page: 1,
    page_size: 10,
    total: 10
  })
  const [searchForm, setSearchForm] = useState<SearchFormType>({
    page: paging.page,
    page_size: paging.page_size,
    full_name: '',
    gift_name: ''
  })
  const [refreshKey, setRefreshKey] = useState(false);
  const [valueStatus, setValueStatus] = useState<Record<number, GiftStatus>>({})

  const notification = useNotification();
  useEffect(() => {
    document.title = "Quản lý đổi quà"
  }, []);
  
  const onChangeStatus = async (e: GiftStatus, value: ExchangeGiftEntity) => {
    try {
      await changeStatusExchangeGift({ id: value.id, status: e})
      setValueStatus(pre => ({ ...pre, [value.id]: e }))
      setRefreshKey(pre => !pre)
      notification.success('Cập nhật trạng thái thành công')
    } catch (err) {
      console.error(err)
      notification.error('Cập nhật trạng thái thất bại')
    }
  }

  const columns: TableColumnsType = [
    {
      title: "Thời gian tạo",
      dataIndex: 'created_at',
      key: 0,
      render(value) {
        return formatDate(value)
      }
    },
    {
      title: "Họ tên",
      dataIndex: 'user',
      key: 1,
      render(value) {
        return value?.full_name || '-'
      }
    },
    {
      title: "Số điện thoại",
      dataIndex: 'user',
      key: 2,
      render(value) {
        return value?.phone_number || '-'
      }
    },
    {
      title: "Tên sản phẩm",
      dataIndex: 'gift',
      key: 3,
      render(value) {
        return value?.name || '-'
      }
    },
    {
      title: "Hình ảnh",
      dataIndex: 'gift',
      key: 4,
      render(value) {
        return (
          <div className="flex flex-wrap justify-center w-full py-4 gap-4 eee">
            <Image.PreviewGroup
            >
              <Image className="border-2 m-auto cursor-pointer" width={200} src={`${import.meta.env.VITE_API_URL}${value.imageUrl}`} alt="preview avatar" />
            </Image.PreviewGroup>
          </div>
        )
      }
    },
    {
      title: "Trạng thái",
      // dataIndex: 'status',
      key: 4,
      render(value: ExchangeGiftEntity) {
        return (
          <div>
            <Select
              options={optionsStatus}
              className="w-full"
              value={valueStatus[value.id] || value.status}
              onChange={(e) => onChangeStatus(e, value)} />
          </div>
        )
      }
    },
  ]


  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await exchangedGift(searchForm);
      setData(res.data.data);
      setPaging(res.data.paging)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [searchForm])

  useEffect(() => {
    (async () => {
      await fetchData()
    })()
  }, [fetchData, refreshKey])

  const onChangePaging = async (page: number, page_size: number) => {
    setSearchForm({ ...searchForm, page, page_size })
  }

  return (
    <div className="h-full p-4">
      <Header setSearchForm={setSearchForm} setLoading={setLoading} />
      <div className="flex mb-4">
        <div className="m-auto">
          <span className="px-6 p-2 rounded-full bg-[#84571B] uppercase font-bold text-2xl">Quản lý đổi quà</span>
        </div>
      </div>
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 8,
          },
          components: {
            Table: {
              borderColor: "black",
              headerBg: "#84571B !important",
              headerColor: "white",
            }
          }
        }}
      >
        <Table
          dataSource={data}
          columns={columns}
          rowHoverable={false}
          rowKey={record => record.id}
          rowClassName={(_, index) => index % 2 === 0 ? 'bg-[#e9e9e9]' : 'bg-white'}
          bordered
          loading={loading}
          pagination={{
            total: paging.total,
            pageSize: paging.page_size,
            onChange: onChangePaging,
            showSizeChanger: true
          }}
          scroll={{ y: 560 }}
        />
      </ConfigProvider>
    </div>
  )
}

export default ExchangedGiftManagement