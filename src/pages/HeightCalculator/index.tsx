import { useCallback, useEffect, useState } from 'react'
import Header from './Header'
import { Button, ConfigProvider, Table, TableColumnsType } from 'antd'
import CloseIcon from '../../assets/icons/CloseIcon'
import { HeightCalculatorEntity } from '../../entities/HeightCalculator'
import { getInformations, SearchFormType } from '../../services/heightCalculator'
import DataIcon from '../../assets/icons/DataIcon'
import withAuth from '../../hocs/withAuth'
import Details from './Details'
import Delete from './actions/Delete';

const optionsGender = {
  GIRL: "Nữ",
  BOY: "Nam",
}

function HeightCalculator() {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<HeightCalculatorEntity[]>([]);
  const [paging, setPaging] = useState({
    page: 1,
    pageSize: 10,
    total: 10
  });
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [id, setId] = useState(0);
  const [refreshKey, setRefreshKey] = useState(false);
  const [searchForm, setSearchForm] = useState<SearchFormType>({
    page: 1,
    pageSize: 10,
    code: '',
    phoneNumber: '',
    parentName: '',
    fullName: ''
  })

  const columns: TableColumnsType<HeightCalculatorEntity> = [
    {
      title: "ID",
      dataIndex: 'id',
      key: 1,
      width: 50
    },
    {
      title: "Mã phác đồ",
      dataIndex: 'code',
      key: 2,
      width: 150
    },
    {
      title: "Họ tên phụ huynh",
      dataIndex: 'parentName',
      key: 3,
      width: 150
    },
    {
      title: "Chiều cao bố (cm)",
      dataIndex: "fatherHeight",
      key: 4,
      width: 100
    },
    {
      title: "Chiều cao mẹ (cm)",
      dataIndex: "motherHeight",
      key: 6,
      width: 100
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: 7,
      width: 150
    },
    {
      title: "Họ tên con",
      dataIndex: "fullName",
      key: 8,
      width: 150
    },
    {
      title: "Ngày sinh",
      dataIndex: "date_of_birth",
      key: 9,
      width: 150
    },
    {
      title: "Cân nặng",
      dataIndex: "currentWeight",
      key: 10,
      width: 80
    },
    {
      title: "Chiều cao",
      dataIndex: "currentHeight",
      key: 11,
      width: 80
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: 12,
      render(value: keyof typeof optionsGender) {
        return optionsGender[value]
      },
      width: 100
    },
    {
      title: "Tỉnh thành",
      dataIndex: "province",
      key: 13,
      width: 150
    },
    {
      title: "Thao tác",
      dataIndex: 14,
      width: 150,
      render(_, record) {
        return (
          <div className="flex flex-col justify-between gap-2">
            <div
              className="flex items-center"
              onClick={() => {
                setOpenDetailModal(true)
                setId(record.id)
              }
              }
            >
              <Button
                className="w-full px-4"
                type="primary"
                icon={<DataIcon width={16} height={16} />}
              >
                <p>Xem</p>
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

  const fetchData = useCallback(async ({ page, pageSize }: { page?: number, pageSize?: number }) => {
      const res = await getInformations({ page, pageSize, ...searchForm });
      return res
  }, [searchForm]);

  useEffect(() => {
    document.title = "Dự đoán chiều cao"
  }, []);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const res = await getInformations(searchForm)
      setData(res.data.data);
      setPaging(res.data.paging)
      setLoading(false)
    })()
  }, [fetchData, refreshKey, searchForm]);

  const onChangePaging = async (page: number, pageSize: number) => {
    setLoading(true);
    setSearchForm({ ...searchForm, page, pageSize });
  }
  console.log(searchForm)

  return (
    <div className="px-4">
      <Header setSearchForm={setSearchForm} setLoading={setLoading} />
      <div>
        <ConfigProvider
          theme={{
            token: {
              borderRadius: 8,
            },
            components: {
              Table: {
                borderColor: "black",
                headerBg: "#0071BA !important",
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
              pageSize: paging.pageSize,
              onChange: onChangePaging,
              showSizeChanger: true
            }}
            scroll={{ y: 700 }}
          />
        </ConfigProvider>
      </div>
      <Details id={id} onCancel={() => setOpenDetailModal(false)} open={openDetailModal} />
      <Delete id={id} onCancel={() => setOpenDeleteModal(false)} open={openDeleteModal} setRefreshKey={setRefreshKey} />
    </div>
  )
}

const HeightCalculatorWithAuth = withAuth(HeightCalculator)

export default HeightCalculatorWithAuth