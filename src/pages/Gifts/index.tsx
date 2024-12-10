import { Button, ConfigProvider, Image, Table, TableColumnsType } from "antd";
import Delete from "./actions/Delete";
import { useCallback, useEffect, useState } from "react";
import CloseIcon from "../../assets/icons/CloseIcon";
import { formatDate } from "../../utils/formatDate";
import EditIcon from "../../assets/icons/EditIcon";
import Edit from "./actions/Edit";
import Header from "./Header";
import { UserEntity } from "../../entities/User";
import { getAllGifts } from "../../services/gift";
import PlusIcon from "../../assets/icons/PlusIcon";
import Add from "./actions/Add";

export interface SearchFormType {
  page?: number;
  page_size?: number;
  name?: string;
}

function GiftsManagement() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
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
    name: '',
  })
  const [refreshKey, setRefreshKey] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    document.title = "Quản lý quà"
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
      title: "Tên",
      dataIndex: 'name',
      key: 2,
    },
    {
      title: "Hình ảnh",
      dataIndex: 'imageUrl',
      key: 3,
      render(value) {
        return (
          <div className="flex flex-wrap justify-center w-full py-4 gap-4 eee">
            <Image.PreviewGroup
            >
              <Image className="border-2 m-auto cursor-pointer" width={200} src={`${import.meta.env.VITE_API_URL}${value}`} alt="preview avatar" />
            </Image.PreviewGroup>
          </div>
        )
      }
    },
    {
      title: "Điểm",
      dataIndex: 'point',
      render(value) {
        return (
          <div>{value} điểm</div>
        )
      },
      key: 4,
    },
    {
      title: "Số lượng",
      dataIndex: 'quantity',
      render(value) {
        return (
          <div>{value} sản phẩm</div>
        )
      },
      key: 5,
    },
    {
      title: "Người đổi quà",
      dataIndex: 'user',
      render(value) {
        return (
          <div>{value?.full_name || 'Chưa có thông tin'}</div>
        )
      },
      key: 6,
    },
    {
      title: "Thời gian đổi quà",
      dataIndex: 'exchange_time',
      key: 7,
      render(value) {
        return formatDate(value) || 'Chưa có thông tin'
      }
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
      const res = await getAllGifts(searchForm);
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
      {openAddModal && <Add open={openAddModal} onClose={() => setOpenAddModal(false)} setRefreshKey={setRefreshKey} />}
      {openDeleteModal && <Delete open={openDeleteModal} onCancel={() => setOpenDeleteModal(false)} id={id} setRefreshKey={setRefreshKey} />}
      {openEditModal && <Edit open={openEditModal} onClose={() => setOpenEditModal(false)} id={id} setRefreshKey={setRefreshKey} />}
    </div>
  )
}

export default GiftsManagement