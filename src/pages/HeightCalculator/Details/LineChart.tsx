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
  const c1 = [
    44.93,
    70.37,
    79.91,
    88.07,
    94.35,
    100.09,
    105.86,
    111.70,
    117.28,
    122.21,
    126.50,
    130.63,
    135.44,
    141.46,
    148.25,
    154.38,
    158.71,
    161.20,
    162.47,
    163.06,
    163.33
  ]
  const c2 = [
    45.57,
    70.98,
    80.73,
    88.89,
    95.33,
    101.21,
    107.06,
    112.96,
    118.58,
    123.60,
    127.99,
    132.22,
    137.10,
    143.28,
    150.26,
    156.44,
    160.65,
    163.02,
    164.21,
    164.78,
    165.04
  ]
  const c3 = [
    46.55,
    71.94,
    81.99,
    90.19,
    96.84,
    102.92,
    108.91,
    114.89,
    120.60,
    125.75,
    130.30,
    134.67,
    139.69,
    146.09,
    153.32,
    159.54,
    163.59,
    165.79,
    166.88,
    167.41,
    167.66
  ]
  const c4 = [
    48.19,
    73.60,
    84.10,
    92.41,
    99.38,
    105.54,
    111.99,
    118.14,
    124.02,
    129.39,
    134.21,
    138.83,
    144.08,
    150.81,
    158.36,
    164.56,
    168.37,
    170.34,
    171.30,
    171.78,
    172.02
  ]
  const c5 = [
    49.99,
    75.52,
    86.45,
    94.96,
    102.22,
    108.90,
    115.39,
    121.77,
    127.88,
    133.51,
    138.62,
    143.52,
    149.05,
    156.09,
    163.84,
    169.94,
    173.51,
    175.29,
    176.16,
    176.60,
    176.85
  ]
  const c6 = [
    51.77,
    77.54,
    88.81,
    97.61,
    105.08,
    112.02,
    118.78,
    125.43,
    131.80,
    137.71,
    143.10,
    148.29,
    154.12,
    161.41,
    169.20,
    175.12,
    178.48,
    180.14,
    180.96,
    181.40,
    181.65
  ]
  const c7 = [
    53.36,
    79.44,
    90.93,
    100.08,
    107.66,
    114.80,
    121.82,
    128.74,
    135.38,
    141.55,
    147.19,
    152.66,
    158.76,
    166.23,
    173.94,
    179.63,
    182.83,
    184.43,
    185.24,
    185.69,
    185.96
  ]
  const c8 = [
    54.31,
    80.62,
    92.20,
    101.60,
    109.22,
    116.46,
    123.63,
    130.73,
    137.55,
    143.88,
    149.67,
    155.30,
    161.58,
    169.12,
    176.74,
    182.27,
    185.37,
    186.96,
    187.79,
    188.25,
    188.53
  ]
  const c9 = [
    54.92,
    81.40,
    93.02,
    102.60,
    110.23,
    117.53,
    124.81,
    132.03,
    138.97,
    145.40,
    151.29,
    157.03,
    163.43,
    171.01,
    178.54,
    183.96,
    187.00,
    188.59,
    189.43,
    189.91,
    190.19
  ]


const LineChart = (props: { dataLine: number[] }) => {
  const { dataLine } = props;
  // Dữ liệu cho biểu đồ
  const data: ChartData<"line", number[], string> = {
    labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
    datasets: [
      {
        label: 'Đường chiều cao của con',
        data: dataLine,
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
          }
        },
      },
      {
        label: 'Đường chiều cao chuẩn',
        data: c5,
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
        data: c1,
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
        data: c2,
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
        data: c3,
        fill: false,
        borderColor: '#ef8e00',
        tension: 0.1,
        pointRadius: 0,
        backgroundColor: '#ef8e00',
        datalabels: {
          display: false
        }
      },
      {
        label: 'Dưới chuẩn độ 1',
        data: c4,
        fill: false,
        borderColor: '#ffd655',
        tension: 0.1,
        pointRadius: 0,
        backgroundColor: '#ffd655',
        datalabels: {
          display: false
        }
      },
      {
        label: 'Trên chuẩn độ 1',
        data: c6,
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
        data: c7,
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
        data: c8,
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
        data: c9,
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
          size: 36,
          weight: 'bold' as const,
        }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tuổi',
        },
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
