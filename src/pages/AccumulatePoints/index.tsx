import { Button, ConfigProvider, Table, TableColumnsType } from "antd";
import Delete from "./actions/Delete";
import { useCallback, useEffect, useState } from "react";
import CloseIcon from "../../assets/icons/CloseIcon";
import { formatDate } from "../../utils/formatDate";
import { getAllAccumulationCode } from "../../services/accumulation";
import EditIcon from "../../assets/icons/EditIcon";
import Edit from "./actions/Edit";
import { AccumulatePointsEntity, StatusCode } from "../../entities/Accumulation";
import Header from "./Header";
import PlusIcon from "../../assets/icons/PlusIcon";
import Add from "./actions/Add";

export interface SearchFormType {
  code?: string;
  page?: number;
  page_size?: number;
  status?: StatusCode
}

const optionStatus = {
  UNUSED: "Chưa sử dụng",
  USED: "Đã sử dụng",
  EXPIRED: "Hết hạn"
}

function AccumulatePoints() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AccumulatePointsEntity[]>([]);
  const [paging, setPaging] = useState({
    page: 1,
    page_size: 10,
    total: 10
  })
  const [searchForm, setSearchForm] = useState<SearchFormType>({
    page: paging.page,
    page_size: paging.page_size,
    code: '',
    status: StatusCode.UNUSED
  })
  console.log(searchForm)
  const [refreshKey, setRefreshKey] = useState(false);
  const [code, setCode] = useState('');

  useEffect(() => {
    document.title = "Mã tích điểm"
  }, []);

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
      title: "ID",
      dataIndex: 'id',
      key: 1,
    },
    {
      title: "Mã",
      dataIndex: 'code',
      key: 2,
    },
    {
      title: "Trạng thái",
      dataIndex: 'status',
      render(value: keyof typeof optionStatus) {
        return optionStatus[value]
      },
      key: 3,
    },
    {
      title: "Người tạo mã",
      dataIndex: 'user',
      render(value) {
        return (
          <div>{value?.full_name}</div>
        )
      },
      key: 4,
    },
    {
      title: "Người áp mã",
      dataIndex: 'user_by',
      render(value) {
        return (
          <div>{value?.full_name || 'Chưa được sử dụng'}</div>
        )
      },
      key: 5,
    },
    {
      title: "Thời gian áp mã",
      dataIndex: 'used_at',
      render(value) {
        return (
          <div>{formatDate(value) || 'Chưa được sử dụng'}</div>
        )
      },
      key: 6,
    },
    {
      title: "Thao tác",
      dataIndex: 7,
      width: 150,
      render(_, record) {
        return (
          <div className="flex flex-col justify-between gap-2">
            <div
              className="flex items-center"
              onClick={() => {
                setOpenEditModal(true)
                setCode(record.code)
              }
              }
            >
              <Button
                className="w-full"
                type="primary"
                icon={<EditIcon width={16} height={16} fill='white' />}
              >
                <p className="text-white">Sửa</p>
              </Button>
            </div>
            <div className="flex items-center min-w-[120px]">
              <Button
                icon={<CloseIcon />}
                type="primary"
                danger
                className="w-full"
                onClick={() => {
                  setOpenDeleteModal(true)
                  setCode(record.code)
                }}
              >
                <p>Xóa</p>
              </Button>
            </div>
          </div>
        )
      },
    }
  ]


  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllAccumulationCode(searchForm);
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
          <span className="px-6 p-2 rounded-full bg-[#84571B] uppercase font-bold text-2xl">Quản lý Mã tích điểm</span>
        </div>
        <div
          className="bg-[#84571B] rounded-md cursor-pointer h-full px-4 py-2 flex items-center justify-center hover:opacity-80 duration-300 text-white"
          onClick={() => setOpenAddModal(true)}
        >
          Thêm mới
          <PlusIcon color="white" />
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
      {openDeleteModal && <Delete open={openDeleteModal} onCancel={() => setOpenDeleteModal(false)} code={code} setRefreshKey={setRefreshKey} />}
      {openEditModal && <Edit open={openEditModal} onClose={() => setOpenEditModal(false)} code={code} setRefreshKey={setRefreshKey} />}
      {openAddModal && <Add open={openAddModal} onClose={() => setOpenAddModal(false)} setRefreshKey={setRefreshKey} />}
    </div>
  )
}

export default AccumulatePoints