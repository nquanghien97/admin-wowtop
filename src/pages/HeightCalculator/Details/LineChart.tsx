import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  duoi_chuan_do_4,
  duoi_chuan_do_3,
  duoi_chuan_do_2,
  duoi_chuan_do_1,
  duong_chieu_cao_chuan,
  tren_chuan_do_1,
  tren_chuan_do_2,
  tren_chuan_do_3,
  tren_chuan_do_4
} from '../../../config/height';
import { ageCalculator } from '../../../utils/ageCalculator';

// Đăng ký các thành phần mà Chart.js sử dụng
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const LineChart = (props: { dataLine: number[], date_of_birth: string }) => {
  const { dataLine, date_of_birth } = props;
  // Dữ liệu cho biểu đồ
  const year = ageCalculator(date_of_birth).years
  const sliceData = (data: number[]) => data.slice(year)
  const labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
  const data: ChartData<"line", number[], string> = {
    labels: labels.slice(year),
    datasets: [
      {
        label: 'Đường chiều cao của con',
        data: sliceData(dataLine),
        fill: false,
        borderColor: '#006cd8',
        tension: 0.1,
        backgroundColor: '#006cd8',
        datalabels: {
          color: '#006cd8', // Màu chữ của dữ liệu
          anchor: 'end', // Vị trí của nhãn dữ liệu
          align: 'top', // Căn chỉnh nhãn dữ liệu
          borderColor: '#006cd8',
          font: {
            weight: 'bold',
          },
        },
      },
      {
        label: 'Đường chiều cao chuẩn',
        data: sliceData(duong_chieu_cao_chuan),
        fill: false,
        borderColor: '#a082e8',
        tension: 0.1,
        pointRadius: 0,
        backgroundColor: '#a082e8',
        datalabels: {
          display: false
        }
      },
      {
        label: 'Dưới chuẩn độ 4',
        data: sliceData(duoi_chuan_do_4),
        fill: false,
        borderColor: '#ee2820',
        tension: 0.1,
        pointRadius: 0,
        backgroundColor: '#ee2820',
        datalabels: {
          display: false
        }
      },
      {
        label: 'Dưới chuẩn độ 3',
        data: sliceData(duoi_chuan_do_3),
        fill: false,
        borderColor: '#b20400',
        tension: 0.1,
        pointRadius: 0,
        backgroundColor: '#b20400',
        datalabels: {
          display: false
        }
      },
      {
        label: 'Dưới chuẩn độ 2',
        data: sliceData(duoi_chuan_do_2),
        fill: false,
        borderColor: '#ab6702',
        tension: 0.1,
        pointRadius: 0,
        backgroundColor: '#ab6702',
        datalabels: {
          display: false
        }
      },
      {
        label: 'Dưới chuẩn độ 1',
        data: sliceData(duoi_chuan_do_1),
        fill: false,
        borderColor: '#ffd655',
        tension: 0.1,
        pointRadius: 0,
        backgroundColor: '#ffd655',
        datalabels: {
          display: false
        },
      },
      {
        label: 'Trên chuẩn độ 1',
        data: sliceData(tren_chuan_do_1),
        fill: false,
        borderColor: '#beea53',
        tension: 0.1,
        pointRadius: 0,
        backgroundColor: '#beea53',
        datalabels: {
          display: false
        }
      },
      {
        label: 'Trên chuẩn độ 2',
        data: sliceData(tren_chuan_do_2),
        fill: false,
        borderColor: '#4a9e2b',
        tension: 0.1,
        pointRadius: 0,
        backgroundColor: '#4a9e2b',
        datalabels: {
          display: false
        }
      },
      {
        label: 'Trên chuẩn độ 3',
        data: sliceData(tren_chuan_do_3),
        fill: false,
        borderColor: '#1e7a00',
        tension: 0.1,
        pointRadius: 0,
        backgroundColor: '#1e7a00',
        datalabels: {
          display: false
        }
      },
      {
        label: 'Trên chuẩn độ 4',
        data: sliceData(tren_chuan_do_4),
        fill: false,
        borderColor: '#6bbaf9',
        tension: 0.1,
        pointRadius: 0,
        backgroundColor: '#6bbaf9',
        datalabels: {
          display: false
        }
      },
    ],
  };
  
  // Tùy chọn cho biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: true,
        text: 'BẢNG DỰ ĐOÁN CHIỀU CAO ĐẾN TUỔI TRƯỞNG THÀNH',
        font: {
          size: 20,
          weight: 'bold' as const,
        },
        color: '#2074A5'
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tuổi',
        },
        offset: true, // Thêm khoảng trống ở đầu và cuối của trục X
      },
      y: {
        title: {
          display: true,
          text: 'Chiếu cao (cm)',
        },
      },
    },
    maintainAspectRatio: false
  };

  return <Line data={data} options={options}className="w-2/3" />;
};

export default LineChart;
