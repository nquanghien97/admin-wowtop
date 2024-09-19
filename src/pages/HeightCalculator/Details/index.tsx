import { Modal } from 'antd'
import { useEffect, useState } from 'react';
import { HeightCalculatorEntity } from '../../../entities/HeightCalculator';
import { getInformation } from '../../../services/heightCalculator';
import { dataCurrentHeight, heightCalculator } from '../../../utils/heightCalculator';
import { ageCalculator } from '../../../utils/ageCalculator';
import LineChart from './LineChart';
import { formatDate } from '../../../utils/formatDate';
import { usePDF } from 'react-to-pdf';
import DownloadIcon from '../../../assets/icons/DownloadIcon';
import { dataCurrentWeight } from '../../../utils/weightCalculator';
import { duoi_chuan_do_1, duoi_chuan_do_2, duoi_chuan_do_3, duong_chieu_cao_chuan, tren_chuan_do_1, tren_chuan_do_2, tren_chuan_do_3 } from '../../../config/height';
import { menu_dinh_duong } from '../../../config/dinh_duong';
import { can_nang_chuan, lon_hon_TB, nho_hon_TB } from '../../../config/weight';
import { dateToNow } from '../../../utils/dateToNow';
import { case_comment } from '../../../config/case_comment';

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

  const resultCalculator = heightCalculator(+data?.currentHeight, ageCalculator(data?.date_of_birth).years, ageCalculator(data?.date_of_birth).months, +data.fatherHeight, +data.motherHeight, data.gender)
  const genderConfig = {
    BOY: "Nam",
    GIRL: "Nữ"
  }
  //menu dinh dưỡng theo tuổi của bé
  const dinh_duong = menu_dinh_duong(ageCalculator(data.date_of_birth).years).find(condition => condition.condition)
  const data_dinh_duong = +data.currentWeight < dataCurrentWeight(nho_hon_TB[data.gender], data.date_of_birth) ? dinh_duong?.dinh_duong['thieu_can'] : (+data.currentWeight > dataCurrentWeight(lon_hon_TB[data.gender], data.date_of_birth) ? dinh_duong?.dinh_duong['thua_can'] : dinh_duong?.dinh_duong['can_nang_chuan'])

  //nhận xét
  const getComment = () => {
    const matchedCondition = case_comment(dataCurrentHeight(duong_chieu_cao_chuan, data.date_of_birth), dataCurrentWeight(can_nang_chuan[data.gender], data.date_of_birth)).find(condition => condition.condition({
      currentHeight: +12,
      currentAge: ageCalculator(data.date_of_birth).years,
      currentWeight: +1,
      gender: data.gender
    }))
    return matchedCondition?.content
  }
  console.log(getComment())
  return (
    <Modal
      open={open}
      className="!p-0 !w-2/3 !h-screen !top-2"
      onCancel={onCancel}
      footer={false}
      wrapClassName='!p-0'
    >
      <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#0071BA] rounded-t-lg uppercase font-bold text-white">Thông tin chi tiết dự đoán chiều cao</div>
      <div className="pb-8 bg-[url('/bg-detail.png')] bg-[length:100%_100%]" ref={targetRef}>
        <div className="flex justify-center mb-4">
          <img src="/logo2.png" width={561} height={150} />
        </div>
        <h1 className="text-center text-4xl text-[#2074A5] font-bold mb-8">
          Phác đồ dự đoán chiều cao của
          <br />
          <p>{data.fullName}</p>
        </h1>
        <div className="flex justify-around gap-4 max-w-4xl m-auto mb-4">
          <div className="w-1/2 flex-1 bg-[#92F0F5] p-4 rounded-2xl">
            <h3 className="uppercase text-2xl text-[#2074A5] text-center mb-4 font-semibold">Thông tin phụ huynh</h3>
            <div className="font-semibold">
              <p className="pb-1">Họ tên phụ huynh: <span className="text-[#2074A5]">{data.parentName}</span></p>
              <p className="pb-1">Số điện thoại: <span className="text-[#2074A5]">{data.phoneNumber}</span></p>
              <p className="pb-1">Địa chỉ: <span className="text-[#2074A5]">{`${data.address}, ${data.ward}, ${data.district}, ${data.province}`}</span></p>
              <p className="pb-1">Chiều cao của bố: <span className="text-[#2074A5]">{data.fatherHeight} cm</span></p>
              <p className="pb-1">Chiều cao của mẹ: <span className="text-[#2074A5]">{data.motherHeight} cm</span></p>
              <p className="pb-1">Ngày lập phác đồ: <span className="text-[#2074A5]">{formatDate(data.createdAt)}</span></p>
              <p className="pt-1">Mã phác đồ: <span className="text-[#2074A5]">{data.code}</span></p>
            </div>
          </div>
          <div className="w-1/2 flex-1 bg-[#92F0F5] p-4 rounded-2xl">
            <h3 className="uppercase text-2xl text-[#2074A5] text-center mb-4 font-semibold">Thông tin của con</h3>
            <div className="font-semibold">
              <p className="pb-1">Họ tên: <span className="text-[#2074A5]">{data.fullName}</span></p>
              <p className="pb-1">Giới tính: <span className="text-[#2074A5]">{genderConfig[data.gender]}</span></p>
              <p className="pb-1">Ngày sinh: <span className="text-[#2074A5]">{data.date_of_birth}</span></p>
              <p className="pb-1">Tuổi: <span className="text-[#2074A5]">{dateToNow(data.date_of_birth)}</span></p>
              <p className="pb-1">Chiều cao hiện tại: <span className="text-[#2074A5]">{data.currentHeight} cm</span></p>
              <p className="pb-1">Cân nặng hiện tại: <span className="text-[#2074A5]">{data.currentWeight} kg</span></p>
              <p className="pt-1">Hiện bé đang sử dụng sản phẩm chiều cao: <span className="text-[#2074A5]">{data.currentProduct}</span></p>
              <p className="pb-1">Thời gian vận động: <span className="text-[#2074A5]">{data.sport}</span></p>
              <p className="pb-1">Thời gian ngủ: <span className="text-[#2074A5]">{data.timeSleep}</span></p>
            </div>
          </div>
        </div>
        <h2 className="uppercase text-4xl font-bold text-center text-[#2074A5]">Kết quả</h2>
        <div className="max-w-4xl m-auto h-[500px] mb-4">
          <LineChart dataLine={resultCalculator?.heightsByAge as number[]} />
        </div>
        <div className="mb-4 max-w-4xl m-auto">
          <div className="mb-4">
            <h2 className="text-xl text-center mb-4 font-bold text-[#2074A5]">CÂN NẶNG THEO THANG ĐO (kg)</h2>
            <div className="flex justify-center">
              <table>
                <thead className="bg-[#005D96] text-white">
                  <tr className="rounded-t-md">
                    <th className="border-[1px] text-center p-2">Dưới -2SD <br />(bé đang trong tình trạng suy dinh dưỡng thể thiếu cân hoặc thấp còi)</th>
                    <th className="border-[1px] text-center p-2">Chuẩn <br />(bé có thể trạng đạt chuẩn trung bình)</th>
                    <th className="border-[1px] text-center p-2">Trên +2SD <br />(bé đang thừa cân béo phì (theo cân nặng) hoặc rất cao (theo chiều cao))</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-[1px] text-center p-2">
                      {(Number(data.currentWeight) - dataCurrentWeight(nho_hon_TB[data.gender], data.date_of_birth)) > 0 ? `Bé nặng hơn mức -2SD: ${(Number(data.currentWeight) - dataCurrentWeight(nho_hon_TB[data.gender], data.date_of_birth)).toFixed(1)} kg` : `Bé nhẹ hơn mức -2SD: ${(dataCurrentWeight(nho_hon_TB[data.gender], data.date_of_birth) - Number(data.currentWeight)).toFixed(1)} kg`}
                    </td>
                    <td className="border-[1px] text-center p-2">
                      {(Number(data.currentWeight) - dataCurrentWeight(can_nang_chuan[data.gender], data.date_of_birth)) > 0 ? `Bé nặng hơn mức chuẩn: ${(Number(data.currentWeight) - dataCurrentWeight(can_nang_chuan[data.gender], data.date_of_birth)).toFixed(1)} kg` : `Bé nhẹ hơn mức chuẩn: ${(dataCurrentWeight(can_nang_chuan[data.gender], data.date_of_birth) - Number(data.currentWeight)).toFixed(1)} kg`}
                    </td>
                    <td className="border-[1px] text-center p-2">
                      {(Number(data.currentWeight) - dataCurrentWeight(lon_hon_TB[data.gender], data.date_of_birth)) > 0 ? `Bé nặng hơn mức 2SD: ${(Number(data.currentWeight) - dataCurrentWeight(lon_hon_TB[data.gender], data.date_of_birth)).toFixed(1)} kg` : `Bé nhẹ hơn mức 2SD: ${(dataCurrentWeight(lon_hon_TB[data.gender], data.date_of_birth) - Number(data.currentWeight)).toFixed(1)} kg`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className=" flex justify-center flex-col">
            <h2 className="text-xl text-center mb-4 font-bold text-[#2074A5]">CHIỀU CAO THEO THANG ĐO (cm)</h2>
            <div className="flex justify-center">
              <table>
                <thead className="bg-[#6BBAF9] text-white">
                  <tr>
                    <th className="border-[1px] text-center px-6 py-2">Dưới chuẩn 3</th>
                    <th className="border-[1px] text-center px-6 py-2">Dưới chuẩn 2</th>
                    <th className="border-[1px] text-center px-6 py-2">Dưới chuẩn 1</th>
                    <th className="border-[1px] text-center px-6 py-2">Chuẩn</th>
                    <th className="border-[1px] text-center px-6 py-2">Trên chuẩn 1</th>
                    <th className="border-[1px] text-center px-6 py-2">Trên chuẩn 2</th>
                    <th className="border-[1px] text-center px-6 py-2">Trên chuẩn 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-[1px] text-center py-2">{(+data.currentHeight - dataCurrentHeight(duoi_chuan_do_3, data.date_of_birth)).toFixed(1)} cm</td>
                    <td className="border-[1px] text-center py-2">{(+data.currentHeight - dataCurrentHeight(duoi_chuan_do_2, data.date_of_birth)).toFixed(1)} cm</td>
                    <td className="border-[1px] text-center py-2">{(+data.currentHeight - dataCurrentHeight(duoi_chuan_do_1, data.date_of_birth)).toFixed(1)} cm</td>
                    <td className="border-[1px] text-center py-2">{(+data.currentHeight - dataCurrentHeight(duong_chieu_cao_chuan, data.date_of_birth)).toFixed(1)} cm</td>
                    <td className="border-[1px] text-center py-2">{(+data.currentHeight - dataCurrentHeight(tren_chuan_do_1, data.date_of_birth)).toFixed(1)} cm</td>
                    <td className="border-[1px] text-center py-2">{(+data.currentHeight - dataCurrentHeight(tren_chuan_do_2, data.date_of_birth)).toFixed(1)} cm</td>
                    <td className="border-[1px] text-center py-2">{(+data.currentHeight - dataCurrentHeight(tren_chuan_do_3, data.date_of_birth)).toFixed(1)} cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mb-8 max-w-4xl px-4 m-auto">
          <p className="italic text-center text-[18px]">Đây là kết quả dự đoán chiều cao dựa trên số đo, độ tuổi, giới tính và sinh hoạt hiện tại, thực tế có thể thay đổi phụ thuộc vào chế độ sinh hoạt, tập luyện và dinh dưỡng của con.</p>
        </div>
        <div className="text-2xl mb-8 max-w-4xl m-auto text-center bg-liner rounded-2xl py-2">
          <h3 className="uppercase text-[#005D96] font-bold">Nhận xét</h3>
          <p className="text-xl py-2">
            <span className="text-white">
              <strong>Chiều cao</strong> của con <span className="text-[#005D96]"><strong>{+data.currentHeight - dataCurrentHeight(duong_chieu_cao_chuan, data.date_of_birth) > 0 ? 'cao hơn chỉ số tiêu chuẩn' : 'thấp hơn chỉ số tiêu chuẩn'}</strong></span> và 
              <strong> cân nặng</strong> của con</span> <span className="text-[#005D96]"><strong>{(Number(data.currentWeight) - dataCurrentWeight(can_nang_chuan[data.gender], data.date_of_birth)) > 0 ? 'cao hơn chỉ số tiêu chuẩn.' : 'thấp hơn chỉ số tiêu chuẩn.'}</strong></span>
          </p>
          <p className="font-bold text-white">Dự báo chiều cao tuổi 20: {resultCalculator?.predictedHeightAt20} cm</p>
        </div>
        <div className="max-w-4xl m-auto">
          <h3 className="uppercase text-[#005D96] text-xl font-bold mb-2">Lời khuyên dành cho bố mẹ</h3>
          {getComment()}
        </div>
        <div className="max-w-4xl m-auto mb-8">
          <div className="relative top-6 flex justify-center">
            <div className="bg-[#005D96] rounded-full px-8 py-2">
              <h3 className="uppercase text-2xl font-bold text-white">Các yếu tố cần đảm bảo để con đạt chiều cao lý tưởng</h3>
            </div>
          </div>
          <div className="px-8 pt-8 pb-4 border-[1px] border-[#005D96]">
            <ul className="list-decimal font-semibold">
              <li className="mb-1">Dinh dưỡng đủ, tỷ lệ Đạm - Đường - Béo phù hợp độ tuổi</li>
              <li className="mb-1">Tận dụng giai đoạn vàng tăng chiều cao để thúc đẩy chiều cao cho con</li>
              <li className="mb-1">Bổ sung hoạt chất CBP để kích thích nguyên bào xương phát triển, thúc đẩy khung xương cao lớn</li>
              <li className="mb-1">Bổ sung khoáng chất (Canxi, Magie, Phosphor, ...) để xương chắc khỏe</li>
              <li>Ngủ sớm trước 22h00 và tập các bài tập kéo dãn cơ</li>
            </ul>
          </div>
        </div>
        <div className=" flex justify-center flex-col">
          <h2 className="uppercase text-2xl text-center mb-4 font-bold">Tham khảo thực đơn dinh dưỡng mẫu giúp tăng chiều cao<br />dành riêng cho bé <span className="text-[#2074A5]">{data.fullName}</span></h2>
          <div className="flex justify-center">
            <table>
              <thead className="bg-liner">
                <tr>
                  <th className="border-[1px] text-center px-20 py-2">Bữa ăn</th>
                  <th className="border-[1px] text-center px-20 py-2">Menu</th>
                  <th className="border-[1px] text-center px-20 py-2">Năng lượng (Kcal)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#FFF9DE]">
                  <td className="border-[1px] text-center px-4 py-2">Bữa sáng</td>
                  <td className="border-[1px] text-center">
                    <ul>
                      {data_dinh_duong?.['bua_sang'].map(item => (
                        <li className="px-4 py-2">{item.menu}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border-[1px] text-center">
                    <ul>
                      {data_dinh_duong?.['bua_sang'].map(item => (
                        <li className="px-4 py-2">{item.nang_luong}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr className="bg-[#B6E2FF]">
                  <td className="border-[1px] text-center px-4 py-2">Bữa phụ sáng</td>
                  <td className="border-[1px] text-center">
                    {data_dinh_duong?.['bua_phu_sang'].map(item => item.menu)}
                  </td>
                  <td className="border-[1px] text-center">
                    {data_dinh_duong?.['bua_phu_sang'].map(item => item.nang_luong)}
                  </td>
                </tr>
                <tr className="bg-[#FFF9DE]">
                  <td className="border-[1px] text-center px-4 py-2">Bữa trưa</td>
                  <td className="border-[1px] text-center">
                    <ul>
                      {data_dinh_duong?.['bua_trua'].map(item => (
                        <li className="px-4 py-2">{item.menu}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border-[1px] text-center">
                    <ul>
                      {data_dinh_duong?.['bua_trua'].map(item => (
                        <li className="px-4 py-2">{item.nang_luong}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
                <tr className="bg-[#B6E2FF]">
                  <td className="border-[1px] text-center px-4 py-2">Bữa phụ chiều</td>
                  <td className="text-center">
                    {data_dinh_duong?.['bua_phu_chieu'].map(item => item.menu)}
                  </td>
                  <td className="border-[1px] text-center">
                    {data_dinh_duong?.['bua_phu_chieu'].map(item => item.nang_luong)}
                  </td>
                </tr>
                <tr className="bg-[#FFF9DE]">
                  <td className="border-[1px] text-center px-4 py-2">Bữa tối</td>
                  <td className="border-[1px] text-center">
                    <ul>
                      {data_dinh_duong?.['bua_toi'].map(item => (
                        <li className="px-4 py-2">{item.menu}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border-[1px] text-center">
                    <ul>
                      {data_dinh_duong?.['bua_toi'].map(item => (
                        <li className="px-4 py-2">{item.nang_luong}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-end mr-8 pb-4">
        <button onClick={() => toPDF()} className="px-4 py-2 bg-liner rounded-md text-white hover:opacity-85 duration-300 flex justify-center items-center">
          <span className="mr-2">Tải về</span>
          <DownloadIcon width={16} height={16} />
        </button>
      </div>
    </Modal>
  )
}

export default Details