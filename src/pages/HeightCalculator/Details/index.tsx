import { Modal } from 'antd'
import { useEffect, useState } from 'react';
import { HeightCalculatorEntity } from '../../../entities/HeightCalculator';
import { getInformation } from '../../../services/heightCalculator';
import { heightCalculator } from '../../../utils/heightCalculator';
import { ageCalculator } from '../../../utils/ageCalculator';
import LineChart from './LineChart';
import { formatDate } from '../../../utils/formatDate';
import { dateToNow } from '../../../utils/dateToNow';
import { usePDF } from 'react-to-pdf';

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
      <div className="flex justify-end mr-8 mt-4">
        <button onClick={() => toPDF()} className="px-4 py-2 bg-[#4096ff] rounded-md text-white hover:opacity-85 duration-300">Tải PDF</button>
      </div>
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
          <div className="w-2/3 flex justify-center mt-8">
            <div className="mb-8 text-[#3e5569]">
              <p><strong>Tuổi (đến thời gian tạo phác đồ): </strong><span className="text-[#7F4806]">{dateToNow(data.date_of_birth)}</span></p>
              {/* <p><strong>Tình trạng chiều cao hiện tại: </strong><span className="text-[#7F4806]"></span></p> */}
              <p><strong>Dự báo chiều cao tuổi 20: </strong><span className="text-[#7F4806]">{resultCalculator?.heightsByAge[20]} cm</span></p>
            </div>
          </div>
          <div className="text-[#3e5569]">
            <p className="text-center mb-8">Đây là kết quả dự đoán chiều cao dựa trên số đo, độ tuổi, giới tính và sinh hoạt hiện tại, thực tế có thể thay đổi
              phụ thuộc vào chế độ sinh hoạt, tập luyện và dinh dưỡng của con.</p>
            <p className="text-center">Bổ sung <strong>CBP, CPP</strong> giúp <strong>xây dựng khung xương dài ra và tăng cường khả năng hấp thụ canxi cùng các
              dưỡng chất thiết yếu</strong> cho tăng trưởng và giúp xương chắc khỏe hơn, để <strong>con đạt chiều cao tối ưu.</strong></p>
          </div>
        </div>
        <p className="text-center text-[#3e5569]">Vào Group <a className="underline" href='/'><strong>"CHO CON CAO LỚN TRƯỞNG THÀNH TẬN CÙNG"</strong></a> để cập nhật các phương pháp tăng chiều cao khoa học nhất.</p>
      </div>
    </Modal>
  )
}

export default Details