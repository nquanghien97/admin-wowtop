import { Modal } from 'antd'
import { useEffect, useState } from 'react';
import { HeightCalculatorEntity } from '../../../entities/HeightCalculator';
import { getInformation } from '../../../services/heightCalculator';
import { heightCalculator } from '../../../utils/heightCalculator';
import { ageCalculator } from '../../../utils/ageCalculator';
import LineChart from './LineChart';
import { formatDate } from '../../../utils/formatDate';
// import { dateToNow } from '../../../utils/dateToNow';
import { usePDF } from 'react-to-pdf';
import DownloadIcon from '../../../assets/icons/DownloadIcon';

interface DeleteProductProps {
  open?: boolean;
  onCancel?: () => void;
  id?: number;
}

function Details(props: DeleteProductProps) {
  const { open, onCancel, id } = props

  const [data, setData] = useState<HeightCalculatorEntity>();
  const { toPDF, targetRef } = usePDF({ filename: 'phác đồ.pdf' });
  // const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      if (id) {
        const res = await getInformation(id)
        setData(res.data.data)
      }
    })()
  }, [id])
  if (!data) return

  const resultCalculator = heightCalculator(data?.currentHeight, ageCalculator(data?.date_of_birth).years, ageCalculator(data?.date_of_birth).months, data.fatherHeight, data.motherHeight, data.gender)
  const gender = {
    BOY: "Nam",
    GIRL: "Nữ"
  }
  return (
    <Modal
      open={open}
      className='!p-0 !w-2/3 !h-screen !top-2'
      onCancel={onCancel}
      footer={false}
      wrapClassName='!p-0'
    >
      <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#0071BA] rounded-t-lg uppercase font-bold text-white">Thông tin chi tiết dự đoán chiều cao</div>
      <div className="pb-8" ref={targetRef}>
        <div className="flex justify-center mb-4">
          <img src="/logo-mini.png" />
        </div>
        <h1 className="text-center text-5xl text-[#3e5569] mb-8">
          Phác đồ dự đoán chiều cao của
          <br />
          <strong>{data.fullName}</strong>
        </h1>
        <p className="text-center text-3xl text-[#3e5569] mb-8">Mã phác đồ: {data.code}</p>
        <div className="flex justify-around max-w-xl m-auto">
          <div className="w-1/2 flex-1">
            <p className="py-1">Thời gian tạo: {formatDate(data.createdAt)}</p>
            <p className="py-1">Giới tính: {gender[data.gender]}</p>
            <p className="py-1">Ngày sinh: {data.date_of_birth}</p>
            <p className="py-1">Chiều cao: {data.currentHeight} cm</p>
          </div>
          <div className="w-1/2 flex-1">
            <p className="py-1">Cân nặng: {data.currentWeight} kg</p>
            <p className="py-1"></p>
          </div>
        </div>
        <h2 className="uppercase text-4xl font-bold text-center text-[#3e5569]">Kết quả</h2>
        <div className="max-w-4xl m-auto h-[900px]">
          <LineChart dataLine={resultCalculator?.heightsByAge as number[]} />
        </div>
        <div className="max-w-xl m-auto">
          {/* <div className="w-2/3 flex justify-center mt-8">
            <div className="mb-8 text-[#3e5569]">
              <p><strong>Tuổi (đến thời gian tạo phác đồ): </strong><span className="text-[#7F4806]">{dateToNow(data.date_of_birth)}</span></p>
              <p><strong>Dự báo chiều cao tuổi 20: </strong><span className="text-[#7F4806]">{resultCalculator?.heightsByAge[20]} cm</span></p>
            </div>
          </div> */}
          <div className="text-[#3e5569]">
            <p className="text-center mb-8">Đây là kết quả dự đoán chiều cao dựa trên số đo, độ tuổi, giới tính và sinh hoạt hiện tại, thực tế có thể thay đổi
              phụ thuộc vào chế độ sinh hoạt, tập luyện và dinh dưỡng của con.</p>
            <p className="text-center">Bổ sung <strong>CBP, CPP</strong> giúp <strong>xây dựng khung xương dài ra và tăng cường khả năng hấp thụ canxi cùng các
              dưỡng chất thiết yếu</strong> cho tăng trưởng và giúp xương chắc khỏe hơn, để <strong>con đạt chiều cao tối ưu.</strong></p>
          </div>
        </div>
        <p className="text-center text-[#3e5569] mb-8">Vào Group <a className="underline" href='/'><strong>"CHO CON CAO LỚN TRƯỞNG THÀNH TẬN CÙNG"</strong></a> để cập nhật các phương pháp tăng chiều cao khoa học nhất.</p>
        <div className="mb-8 max-w-4xl m-auto">
          <div className="mb-4">
            <h2 className="uppercase text-2xl text-center mb-4">Cân nặng theo thang đo (kg)</h2>
            <div className="flex justify-center">
              <table>
                <thead className="bg-[#005D96] text-white">
                  <tr className="rounded-t-md">
                    <th className="border-[1px] text-center px-4 py-2">Dưới chuẩn 3</th>
                    <th className="border-[1px] text-center px-4 py-2">Dưới chuẩn 2</th>
                    <th className="border-[1px] text-center px-4 py-2">Dưới chuẩn 1</th>
                    <th className="border-[1px] text-center px-4 py-2">Chuẩn</th>
                    <th className="border-[1px] text-center px-4 py-2">Tiêu chuẩn 1</th>
                    <th className="border-[1px] text-center px-4 py-2">Tiêu chuẩn 2</th>
                    <th className="border-[1px] text-center px-4 py-2">Tiêu chuẩn 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-[1px] text-center">8.72</td>
                    <td className="border-[1px] text-center">8.72</td>
                    <td className="border-[1px] text-center">8.72</td>
                    <td className="border-[1px] text-center">8.72</td>
                    <td className="border-[1px] text-center">8.72</td>
                    <td className="border-[1px] text-center">8.72</td>
                    <td className="border-[1px] text-center">8.72</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className=" flex justify-center flex-col">
            <h2 className="uppercase text-2xl text-center mb-4">Chiều cao theo thang đo (cm)</h2>
            <div className="flex justify-center">
              <table>
                <thead className="bg-[#6BBAF9]">
                  <tr>
                    <th className="border-[1px] text-center px-4 py-2">Dưới chuẩn 3</th>
                    <th className="border-[1px] text-center px-4 py-2">Dưới chuẩn 2</th>
                    <th className="border-[1px] text-center px-4 py-2">Dưới chuẩn 1</th>
                    <th className="border-[1px] text-center px-4 py-2">Chuẩn</th>
                    <th className="border-[1px] text-center px-4 py-2">Tiêu chuẩn 1</th>
                    <th className="border-[1px] text-center px-4 py-2">Tiêu chuẩn 2</th>
                    <th className="border-[1px] text-center px-4 py-2">Tiêu chuẩn 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-[1px] text-center">8.72</td>
                    <td className="border-[1px] text-center">8.72</td>
                    <td className="border-[1px] text-center">8.72</td>
                    <td className="border-[1px] text-center">8.72</td>
                    <td className="border-[1px] text-center">8.72</td>
                    <td className="border-[1px] text-center">8.72</td>
                    <td className="border-[1px] text-center">8.72</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className=" flex justify-center flex-col">
          <h2 className="uppercase text-4xl text-center mb-4">Chiều cao theo thang đo (cm)</h2>
          <div className="flex justify-center">
            <table>
              <thead className="bg-liner">
                <tr>
                  <th className="border-[1px] text-center px-4 py-2">Bữa ăn</th>
                  <th className="border-[1px] text-center px-4 py-2">Tỷ lệ %</th>
                  <th className="border-[1px] text-center px-4 py-2">Thành phần</th>
                  <th className="border-[1px] text-center px-4 py-2">Tỷ lệ %</th>
                  <th className="border-[1px] text-center px-4 py-2">Lượng calo/ngày</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#FFF9DE]">
                  <td className="border-[1px] text-center px-4 py-2">Bữa sáng</td>
                  <td className="border-[1px] text-center">25%</td>
                  <td className="border-[1px] text-center">
                    <ul>
                      <li className="border-b-[1px] px-4 py-2">Đạm</li>
                      <li className="border-b-[1px] px-4 py-2">Đường</li>
                      <li className="border-b-[1px] px-4 py-2">Béo</li>
                      <li className="px-4 py-2">1 cốc sữa OZ Farm Kid's Care Plus</li>
                    </ul>
                  </td>
                  <td className="border-[1px] text-center">
                    <ul>
                      <li className="border-b-[1px] px-4 py-2">15%</li>
                      <li className="border-b-[1px] px-4 py-2">35%</li>
                      <li className="border-b-[1px] px-4 py-2">25%</li>
                      <li className="px-4 py-2">25%</li>
                    </ul>
                  </td>
                  <td className="border-[1px] text-center">
                    <ul>
                      <li className="border-b-[1px] px-4 py-2">200</li>
                      <li className="border-b-[1px] px-4 py-2">200</li>
                      <li className="border-b-[1px] px-4 py-2">200</li>
                      <li className="px-4 py-2">200</li>
                    </ul>
                  </td>
                </tr>
                <tr className="bg-[#B6E2FF]">
                  <td className="border-[1px] text-center px-4 py-2">Bữa trưa</td>
                  <td className="border-[1px] text-center">30%</td>
                  <td className="border-[1px] text-center">
                    <ul>
                      <li className="border-b-[1px] px-4 py-2">Đạm</li>
                      <li className="border-b-[1px] px-4 py-2">Đường</li>
                      <li className="px-4 py-2">Béo</li>
                    </ul>
                  </td>
                  <td className="border-[1px] text-center">
                    <ul>
                      <li className="border-b-[1px] px-4 py-2">15%</li>
                      <li className="border-b-[1px] px-4 py-2">35%</li>
                      <li className="px-4 py-2">25%</li>
                    </ul>
                  </td>
                  <td className="border-[1px] text-center">
                    <ul>
                      <li className="border-b-[1px] px-4 py-2">200</li>
                      <li className="border-b-[1px] px-4 py-2">200</li>
                      <li className="px-4 py-2">200</li>
                    </ul>
                  </td>
                </tr>
                <tr className="bg-[#B6E2FF]">
                  <td className="border-[1px] text-center px-4 py-2">Bữa phụ</td>
                  <td className="border-[1px] text-center">15%</td>
                  <td className="text-center">
                    <ul>
                      <li className="border-b-[1px] px-4 py-2">Đạm</li>
                      <li className="border-b-[1px] px-4 py-2">Đường</li>
                      <li className="px-4 py-2">Béo</li>
                    </ul>
                  </td>
                  <td className="border-[1px] text-center">
                    <ul>
                      <li className="border-b-[1px] px-4 py-2">15%</li>
                      <li className="border-b-[1px] px-4 py-2">35%</li>
                      <li className="px-4 py-2">25%</li>
                    </ul>
                  </td>
                  <td className="border-[1px] text-center">
                    <ul>
                      <li className="border-b-[1px] px-4 py-2">200</li>
                      <li className="border-b-[1px] px-4 py-2">200</li>
                      <li className="px-4 py-2">200</li>
                    </ul>
                  </td>
                </tr>
                <tr className="bg-[#FFF9DE]">
                  <td className="border-[1px] text-center px-4 py-2">Bữa tối</td>
                  <td className="border-[1px] text-center">25%</td>
                  <td className="border-[1px] text-center">
                    <ul>
                      <li className="border-b-[1px] px-4 py-2">Đạm</li>
                      <li className="border-b-[1px] px-4 py-2">Đường</li>
                      <li className="border-b-[1px] px-4 py-2">Béo</li>
                      <li className="px-4 py-2">1 cốc sữa OZ Farm Kid's Care Plus</li>
                    </ul>
                  </td>
                  <td className="border-[1px] text-center">
                    <ul>
                      <li className="border-b-[1px] px-4 py-2">15%</li>
                      <li className="border-b-[1px] px-4 py-2">35%</li>
                      <li className="border-b-[1px] px-4 py-2">25%</li>
                      <li className="px-4 py-2">25%</li>
                    </ul>
                  </td>
                  <td className="border-[1px] text-center">
                    <ul>
                      <li className="border-b-[1px] px-4 py-2">200</li>
                      <li className="border-b-[1px] px-4 py-2">200</li>
                      <li className="border-b-[1px] px-4 py-2">200</li>
                      <li className="px-4 py-2">200</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end mr-8 mt-4">
          <button onClick={() => toPDF()} className="px-4 py-2 bg-liner rounded-md text-white hover:opacity-85 duration-300 flex justify-center items-center">
            <span className="mr-2">Tải về</span>
            <DownloadIcon width={16} height={16} />
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default Details