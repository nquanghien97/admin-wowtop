import { Modal } from 'antd'
import { useEffect, useRef, useState } from 'react';
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
import html2canvas from 'html2canvas';
import ArrowUp from '../../../assets/icons/ArrowUp';
import { Link } from 'react-router-dom';

interface DeleteProductProps {
  open?: boolean;
  onCancel?: () => void;
  id?: number;
}

function Details(props: DeleteProductProps) {
  const { open, onCancel, id } = props
  const [showOptionsDownload, setShowOptionsDownload] = useState(false)

  const elementRef1 = useRef<HTMLDivElement | null>(null);
  const elementRef2 = useRef<HTMLDivElement | null>(null);
  const elementRef3 = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<HeightCalculatorEntity>();
  const { toPDF, targetRef } = usePDF({ filename: 'phác đồ.pdf' });
  // const [loading, setLoading] = useState(false)
  const downloadImage = (elementRef: React.RefObject<HTMLDivElement>, fileName: string, formatImage: string) => {
    if (elementRef.current) {
      html2canvas(elementRef.current).then((canvas) => {
        const dataUrl = canvas.toDataURL(`image/${formatImage}`, 1.0);
        const link = document.createElement('a');
        link.download = fileName;
        link.href = dataUrl;
        link.click();
      }).catch((error) => {
        console.error('Could not generate image:', error);
      });
    }
  };


  const handleDownloadAll = (formatImage: string) => {
    downloadImage(elementRef1, 'image1', formatImage);
    downloadImage(elementRef2, 'image2', formatImage);
    downloadImage(elementRef3, 'image3', formatImage);
  };

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

  let totalKcal = 0;
  if (data_dinh_duong) {
    Object.values(data_dinh_duong).forEach(kcal => {
      if (kcal) {
        kcal.forEach((item: {
          menu: string;
          nang_luong: string;
        }) => {
          totalKcal += parseInt(item.nang_luong)
        })
      }
    })
  }

  return (
    <Modal
      open={open}
      className="!p-0 !w-2/3 !h-screen !top-2"
      onCancel={onCancel}
      footer={false}
      wrapClassName='!p-0'
    >
      <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#84571B] rounded-t-lg uppercase font-bold text-white">Thông tin chi tiết dự đoán chiều cao</div>
      <div
        className="pb-8 px-4 bg-[length:100%_100%] py-8"
        ref={(el) => {
          targetRef.current = el; // gán cho targetRef để tải PDF
          // elementRef.current = el;
        }}
      >
        <div className="py-4" ref={elementRef1}>
          <div className="flex justify-center mb-4">
            <img src="/logo-ngang.png" width={400} height={150} />
          </div>
          <h1 className="text-center text-4xl text-[#143cad] font-bold mb-8">
            Phác đồ dự đoán chiều cao của
            <br />
            <p>{data.fullName}</p>
          </h1>
          <div className="flex justify-around gap-4 max-w-5xl m-auto mb-4">
            <div className="w-1/2 flex-1 custom-bg p-4 rounded-2xl">
              <h3 className="uppercase text-2xl text-[#143cad] text-center mb-4 font-semibold">Thông tin phụ huynh</h3>
              <div className="font-semibold">
                <p className="pb-1">Họ tên phụ huynh: <span className="text-[#143cad]">{data.parentName}</span></p>
                <p className="pb-1">Số điện thoại: <span className="text-[#143cad]">{data.phoneNumber}</span></p>
                <p className="pb-1">Địa chỉ: <span className="text-[#143cad]">{`${data.address}, ${data.ward}, ${data.district}, ${data.province}`}</span></p>
                <p className="pb-1">Chiều cao của bố: <span className="text-[#143cad]">{data.fatherHeight} cm</span></p>
                <p className="pb-1">Chiều cao của mẹ: <span className="text-[#143cad]">{data.motherHeight} cm</span></p>
                <p className="pb-1">Ngày lập phác đồ: <span className="text-[#143cad]">{formatDate(data.createdAt)}</span></p>
                <p className="pt-1">Mã phác đồ: <span className="text-[#143cad]">{data.code}</span></p>
              </div>
            </div>
            <div className="w-1/2 flex-1 custom-bg p-4 rounded-2xl">
              <h3 className="uppercase text-2xl text-[#143cad] text-center mb-4 font-semibold">Thông tin của con</h3>
              <div className="font-semibold">
                <p className="pb-1">Họ tên: <span className="text-[#143cad]">{data.fullName}</span></p>
                <p className="pb-1">Giới tính: <span className="text-[#143cad]">{genderConfig[data.gender]}</span></p>
                <p className="pb-1">Ngày sinh: <span className="text-[#143cad]">{data.date_of_birth}</span></p>
                <p className="pb-1">Tuổi: <span className="text-[#143cad]">{dateToNow(data.date_of_birth)}</span></p>
                <p className="pb-1">Chiều cao hiện tại: <span className="text-[#143cad]">{data.currentHeight} cm</span></p>
                <p className="pb-1">Cân nặng hiện tại: <span className="text-[#143cad]">{data.currentWeight} kg</span></p>
                <p className="pt-1">Hiện bé đang sử dụng sản phẩm chiều cao: <span className="text-[#143cad]">{data.currentProduct}</span></p>
                <p className="pb-1">Thời gian vận động: <span className="text-[#143cad]">{data.sport}</span></p>
                <p className="pb-1">Thời gian ngủ: <span className="text-[#143cad]">{data.timeSleep}</span></p>
              </div>
            </div>
          </div>
          <h2 className="uppercase text-4xl font-bold text-center text-[#143cad]">Kết quả</h2>
          <div className="max-w-4xl m-auto h-[500px] mb-4">
            <LineChart dataLine={resultCalculator?.heightsByAge as number[]} date_of_birth={data.date_of_birth} />
          </div>
          <div className="max-w-4xl m-auto ">
            <p className="italic text-center text-lg mb-4">Đây là kết quả dự đoán chiều cao dựa trên số đo, độ tuổi, giới tính và sinh hoạt hiện tại, thực tế có thể thay đổi phụ thuộc vào chế độ sinh hoạt, tập luyện và dinh dưỡng của con.</p>
            <p className="italic text-center text-lg">Bổ sung <strong>CBP, CPP</strong> giúp <strong>xây dựng khung xương dài ra</strong> và <strong>tăng cường khả năng hấp thụ canxi cùng các dưỡng chất thiết yếu</strong> cho tăng trưởng và giúp xương chắc khỏe hơn, để <strong>con đạt chiều cao tối ưu.</strong></p>
            <p className="italic text-center text-lg">Vào Group <Link to="#" className="underline">"BÊN CON PHÁT TRIỂN TẬN CÙNG"</Link> để cập nhật các phương pháp tăng chiều cao khoa học nhất</p>
          </div>
        </div>
        <div className="max-w-5xl m-auto p-4" ref={elementRef2}>
          <div className="mb-4">
            <h2 className="text-xl text-center mb-4 font-bold text-[#143cad]">CÂN NẶNG THEO THANG ĐO (kg)</h2>
            <div className="flex justify-center">
              <table className="w-full">
                <thead className="bg-[#0D2D95] text-white">
                  <tr className="">
                    <th className="border border-[#0D2D95] border-r-[white] text-center p-2">Dưới -2SD <br />(bé đang trong tình trạng suy dinh dưỡng thể thiếu cân hoặc thấp còi)</th>
                    <th className="border border-[#0D2D95] border-r-[white] text-center p-2">Chuẩn <br />(bé có thể trạng đạt chuẩn trung bình)</th>
                    <th className="border-[#0D2D95] border text-center p-2">Trên +2SD <br />(bé đang thừa cân béo phì (theo cân nặng) hoặc rất cao (theo chiều cao))</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="rounded-b-xl">
                    <td className="border border-[#0D2D95] rounded-bl-xl bg-white text-center p-2">
                      {(Number(data.currentWeight) - dataCurrentWeight(nho_hon_TB[data.gender], data.date_of_birth)) > 0 ? `Bé nặng hơn mức -2SD: ${(Number(data.currentWeight) - dataCurrentWeight(nho_hon_TB[data.gender], data.date_of_birth)).toFixed(1)} kg` : `Bé nhẹ hơn mức -2SD: ${(dataCurrentWeight(nho_hon_TB[data.gender], data.date_of_birth) - Number(data.currentWeight)).toFixed(1)} kg`}
                    </td>
                    <td className="border border-[#0D2D95] bg-white text-center p-2">
                      {(Number(data.currentWeight) - dataCurrentWeight(can_nang_chuan[data.gender], data.date_of_birth)) > 0 ? `Bé nặng hơn mức chuẩn: ${(Number(data.currentWeight) - dataCurrentWeight(can_nang_chuan[data.gender], data.date_of_birth)).toFixed(1)} kg` : `Bé nhẹ hơn mức chuẩn: ${(dataCurrentWeight(can_nang_chuan[data.gender], data.date_of_birth) - Number(data.currentWeight)).toFixed(1)} kg`}
                    </td>
                    <td className="border border-[#0D2D95] rounded-br-xl bg-white text-center p-2">
                      {(Number(data.currentWeight) - dataCurrentWeight(lon_hon_TB[data.gender], data.date_of_birth)) > 0 ? `Bé nặng hơn mức 2SD: ${(Number(data.currentWeight) - dataCurrentWeight(lon_hon_TB[data.gender], data.date_of_birth)).toFixed(1)} kg` : `Bé nhẹ hơn mức 2SD: ${(dataCurrentWeight(lon_hon_TB[data.gender], data.date_of_birth) - Number(data.currentWeight)).toFixed(1)} kg`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className=" flex justify-center flex-col mb-4">
            <h2 className="text-xl text-center mb-4 font-bold text-[#143cad]">CHIỀU CAO THEO THANG ĐO (cm)</h2>
            <div className="flex justify-center">
              <table className="w-full">
                <thead className="bg-[#0C63C6] text-white">
                  <tr>
                    <th className="border border-[#0C63C6] border-r-[white] text-center px-6 py-2">Dưới chuẩn 3</th>
                    <th className="border border-[#0C63C6] border-r-[white] text-center px-6 py-2">Dưới chuẩn 2</th>
                    <th className="border border-[#0C63C6] border-r-[white] text-center px-6 py-2">Dưới chuẩn 1</th>
                    <th className="border border-[#0C63C6] border-r-[white] text-center px-6 py-2">Chuẩn</th>
                    <th className="border border-[#0C63C6] border-r-[white] text-center px-6 py-2">Trên chuẩn 1</th>
                    <th className="border border-[#0C63C6] border-r-[white] text-center px-6 py-2">Trên chuẩn 2</th>
                    <th className="border border-[#0C63C6] text-center px-6 py-2">Trên chuẩn 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#0C63C6] text-center py-2">{(+data.currentHeight - dataCurrentHeight(duoi_chuan_do_3, data.date_of_birth)).toFixed(1)} cm</td>
                    <td className="border border-[#0C63C6] text-center py-2">{(+data.currentHeight - dataCurrentHeight(duoi_chuan_do_2, data.date_of_birth)).toFixed(1)} cm</td>
                    <td className="border border-[#0C63C6] text-center py-2">{(+data.currentHeight - dataCurrentHeight(duoi_chuan_do_1, data.date_of_birth)).toFixed(1)} cm</td>
                    <td className="border border-[#0C63C6] text-center py-2">{(+data.currentHeight - dataCurrentHeight(duong_chieu_cao_chuan, data.date_of_birth)).toFixed(1)} cm</td>
                    <td className="border border-[#0C63C6] text-center py-2">{(+data.currentHeight - dataCurrentHeight(tren_chuan_do_1, data.date_of_birth)).toFixed(1)} cm</td>
                    <td className="border border-[#0C63C6] text-center py-2">{(+data.currentHeight - dataCurrentHeight(tren_chuan_do_2, data.date_of_birth)).toFixed(1)} cm</td>
                    <td className="border border-[#0C63C6] text-center py-2">{(+data.currentHeight - dataCurrentHeight(tren_chuan_do_3, data.date_of_birth)).toFixed(1)} cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mb-16 max-w-4xl px-4 m-auto">
            <p className="italic text-center text-[18px]">Đây là kết quả dự đoán chiều cao dựa trên số đo, độ tuổi, giới tính và sinh hoạt hiện tại, thực tế có thể thay đổi phụ thuộc vào chế độ sinh hoạt, tập luyện và dinh dưỡng của con.</p>
          </div>
          <div className="text-2xl mb-8 max-w-5xl m-auto text-center custom-bg rounded-2xl py-2">
            <h3 className="uppercase text-[#0D2D95] font-bold text-4xl">Nhận xét</h3>
            <p className="text-2xl py-2">
              <span className="text-[#84571B] font-bold">
                <strong>Chiều cao</strong> của con <span className="text-[#0D2D95]"><strong>{+data.currentHeight - dataCurrentHeight(duong_chieu_cao_chuan, data.date_of_birth) > 0 ? 'cao hơn chỉ số tiêu chuẩn' : 'thấp hơn chỉ số tiêu chuẩn'}</strong></span> và
                <strong> cân nặng</strong> của con</span> <span className="text-[#0D2D95] font-bold"><strong>{(Number(data.currentWeight) - dataCurrentWeight(can_nang_chuan[data.gender], data.date_of_birth)) > 0 ? 'cao hơn chỉ số tiêu chuẩn.' : 'thấp hơn chỉ số tiêu chuẩn.'}</strong></span>
            </p>
            <p className="font-bold text-[#84571B]"><strong>Dự báo chiều cao tuổi 20: {resultCalculator?.predictedHeightAt20} cm</strong></p>
          </div>
        </div>
        <div ref={elementRef3} className="max-w-5xl m-auto p-4">
          <div className="max-w-5xl m-auto">
            <h3 className="uppercase text-[#0D2D95] text-xl font-bold mb-2">Lời khuyên dành cho bố mẹ</h3>
            {getComment()}
          </div>
          <div className="max-w-5xl m-auto mb-8">
            <div className="relative top-6 flex justify-center">
              <div className="bg-[#0D2D95] rounded-full px-8 py-2 flex items-center">
                <h3 className="uppercase text-2xl font-bold text-white">Các yếu tố cần đảm bảo để con đạt chiều cao lý tưởng</h3>
              </div>
            </div>
            <div className="px-8 pt-8 pb-4 border-[1px] border-[#0D2D95]">
              <ul className="font-semibold text-xl">
                <li className="mb-1">1. Dinh dưỡng đủ, tỷ lệ Đạm - Đường - Béo phù hợp độ tuổi</li>
                <li className="mb-1">2. Tận dụng giai đoạn vàng tăng chiều cao để thúc đẩy chiều cao cho con</li>
                <li className="mb-1">3. Bổ sung hoạt chất CBP để kích thích nguyên bào xương phát triển, thúc đẩy khung xương cao lớn</li>
                <li className="mb-1">4. Bổ sung khoáng chất (Canxi, Magie, Phosphor, ...) để xương chắc khỏe</li>
                <li>5. Ngủ sớm trước 22h00 và tập các bài tập kéo dãn cơ</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center flex-col">
            <h2 className="uppercase text-2xl text-center mb-4 font-bold">DINH DƯỠNG GIÚP TĂNG CHIỀU CAO TỐI ƯU CHO TRẺ<br /><span className="text-[#143cad]">{data.fullName}</span></h2>
            <div className="flex justify-center">
              <table className="w-full">
                <thead className="bg-liner text-white">
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
                          <li key={item.menu} className="px-4 py-2 last:border-t last:border-[#ccc]">{item.menu}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="border-[1px] text-center">
                      <ul>
                        {data_dinh_duong?.['bua_sang'].map(item => (
                          <li key={item.menu} className="px-4 py-2 last:border-t last:border-[#ccc]">{item.nang_luong}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                  <tr className="bg-[#B6E2FF]">
                    <td className="border-[1px] text-center px-4 py-2">Bữa phụ sáng</td>
                    <td className="border-[1px] text-center">
                      <ul>
                        {data_dinh_duong?.['bua_phu_sang'].map(item => (
                          <li key={item.menu} className="px-4 py-2">{item.menu}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="border-[1px] text-center">
                      <ul>
                        {data_dinh_duong?.['bua_phu_sang'].map(item => (
                          <li key={item.menu} className="px-4 py-2">{item.nang_luong}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                  <tr className="bg-[#FFF9DE]">
                    <td className="border-[1px] text-center px-4 py-2">Bữa trưa</td>
                    <td className="border-[1px] text-center">
                      <ul>
                        {data_dinh_duong?.['bua_trua'].map(item => (
                          <li key={item.menu} className="px-4 py-2">{item.menu}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="border-[1px] text-center">
                      <ul>
                        {data_dinh_duong?.['bua_trua'].map(item => (
                          <li key={item.menu} className="px-4 py-2">{item.nang_luong}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                  <tr className="bg-[#B6E2FF]">
                    <td className="border-[1px] text-center px-4 py-2">Bữa phụ chiều</td>
                    <td className="text-center">
                      <ul>
                        {data_dinh_duong?.['bua_phu_chieu'].map(item => (
                          <li key={item.menu} className="px-4 py-2 last:border-t last:border-[#ccc]">{item.menu}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="border-[1px] text-center">
                      <ul>
                        {data_dinh_duong?.['bua_phu_chieu'].map(item => (
                          <li key={item.menu} className="px-4 py-2 last:border-t last:border-[#ccc]">{item.nang_luong}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                  <tr className="bg-[#FFF9DE]">
                    <td className="border-[1px] text-center px-4 py-2">Bữa tối</td>
                    <td className="border-[1px] text-center">
                      <ul>
                        {data_dinh_duong?.['bua_toi'].map(item => (
                          <li key={item.menu} className="px-4 py-2">{item.menu}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="border-[1px] text-center">
                      <ul>
                        {data_dinh_duong?.['bua_toi'].map(item => (
                          <li key={item.menu} className="px-4 py-2">{item.nang_luong}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                  {data_dinh_duong?.['bua_phu_toi'] && (
                    <tr className="bg-[#B6E2FF]">
                      <td className="border-[1px] text-center px-4 py-2">Bữa phụ tối</td>
                      <td className="border-[1px] text-center">
                        <ul>
                          {data_dinh_duong?.['bua_phu_toi'].map(item => (
                            <li key={item.menu} className="px-4 py-2">{item.menu}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="border-[1px] text-center">
                        <ul>
                          {data_dinh_duong?.['bua_phu_toi'].map(item => (
                            <li key={item.menu} className="px-4 py-2">{item.nang_luong}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot className="bg-[#FFF9DE] w-full">
                  <tr className=" w-full">
                    <td className="border-[1px] text-center px-4 py-2 font-bold">Tổng năng lượng</td>
                    <td colSpan={2} className="border-[1px] text-center px-4 py-2 font-bold">{totalKcal} kcal</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end relative">
        <div className="flex flex-col justify-end mr-8 pb-4">
          <button
            className="px-4 py-2 custom-bg rounded-md text-[#0D2D95] uppercase font-bold text-xl hover:opacity-85 duration-300 flex justify-center items-center mb-2 min-w-[170px]"
            onClick={() => setShowOptionsDownload(pre => !pre)}
          >
            Tải về
            <ArrowUp width={24} height={24} className={showOptionsDownload ? 'rotate-180 duration-300' : 'duration-300'} />
          </button>
          {showOptionsDownload && (
            <div className="flex flex-col gap-2 p-2 bg-[#ccc] rounded-md">
              <button onClick={() => toPDF()} className="px-4 py-2 custom-bg rounded-md text-[#0D2D95] font-bold hover:opacity-85 duration-300 flex justify-center items-center">
                <span className="mr-2">Tải về PDF</span>
                <DownloadIcon width={16} height={16} />
              </button>
              <button onClick={() => handleDownloadAll('png')} className="px-4 py-2 custom-bg rounded-md text-[#0D2D95] font-bold hover:opacity-85 duration-300 flex justify-center items-center">
                <span className="mr-2">Tải về ảnh png</span>
                <DownloadIcon width={16} height={16} />
              </button>
              <button onClick={() => handleDownloadAll('jpeg')} className="px-4 py-2 custom-bg rounded-md text-[#0D2D95] font-bold hover:opacity-85 duration-300 flex justify-center items-center">
                <span className="mr-2">Tải về ảnh jpg</span>
                <DownloadIcon width={16} height={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default Details