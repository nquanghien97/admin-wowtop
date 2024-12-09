import { Button, ConfigProvider, Table, TableColumnsType } from "antd";
import Delete from "./actions/Delete";
import { useCallback, useEffect, useState } from "react";
import CloseIcon from "../../assets/icons/CloseIcon";
import { formatDate } from "../../utils/formatDate";
import EditIcon from "../../assets/icons/EditIcon";
import Edit from "./actions/Edit";
import Header from "./Header";
import { UserEntity } from "../../entities/User";
import { getAllUsers } from "../../services/user";

export interface SearchFormType {
  page?: number;
  page_size?: number;
  phone_number?: string;
  full_name?: string
}

function UsersManagement() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
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
    phone_number: '',
    full_name: ''
  })
  const [refreshKey, setRefreshKey] = useState(false);
  const [id, setId] = useState('');

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
      title: "Họ tên",
      dataIndex: 'full_name',
      key: 2,
    },
    {
      title: "Số điện thoại",
      dataIndex: 'phone_number',
      key: 3,
    },
    {
      title: "Điểm tích lũy",
      dataIndex: 'points_accumulation',
      render(value) {
        return (
          <div>{value} điểm</div>
        )
      },
      key: 4,
    },
    {
      title: "Sinh nhật mẹ",
      dataIndex: 'mother_dob',
      render(value) {
        return (
          <div>{formatDate(value)}</div>
        )
      },
      key: 5,
    },
    {
      title: "Sinh nhật con",
      dataIndex: 'child_dob',
      render(value) {
        return (
          <div>{formatDate(value)}</div>
        )
      },
      key: 6,
    },
    {
      title: "Tỉnh thành",
      dataIndex: 'province',
      key: 7,
    },
    {
      title: "Quận huyện",
      dataIndex: 'district',
      key: 8,
    },
    {
      title: "Phường xã",
      dataIndex: 'ward',
      key: 9,
    },
    {
      title: "Địa chỉ",
      dataIndex: 'address',
      key: 10,
    },
    {
      title: "Thao tác",
      dataIndex: 11,
      width: 150,
      render(_, record) {
        return (
          <div className="flex flex-col justify-between gap-2">
            <div
              className="flex items-center"
              onClick={() => {
                setOpenEditModal(true)
                setId(record.id)
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
                  setId(record.id)
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
      const res = await getAllUsers(searchForm);
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
          <span className="px-6 p-2 rounded-full bg-[#84571B] uppercase font-bold text-2xl">Quản lý người dùng</span>
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
      {openDeleteModal && <Delete open={openDeleteModal} onCancel={() => setOpenDeleteModal(false)} id={id} setRefreshKey={setRefreshKey} />}
      {openEditModal && <Edit open={openEditModal} onClose={() => setOpenEditModal(false)} id={id} setRefreshKey={setRefreshKey} />}
    </div>
  )
}

export default UsersManagement