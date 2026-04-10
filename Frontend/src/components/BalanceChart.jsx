import  { useState } from 'react'
import { Line } from 'react-chartjs-2'
import downicon from '../assets/images/downicon.svg'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  CategoryScale,
  Title,
  Tooltip,
  Legend
)

const BalanceChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Month')
  const [isOpen, setIsOpen] = useState(false)
  const [chartData, setChartData] = useState({
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Balance',
        data: [1, 1.2, 0.8, 1.5],
        borderColor: '#9CABFF',
        backgroundColor: '#9CABFF',
        fill: true,
        borderWidth: 2,
        borderJoinStyle: 'round',
        tension: 0.4,
        pointStyle: 'circle',
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  })

  const shadowPlugin = {
    id: 'customShadow',
    beforeDraw: chart => {
      const ctx = chart.ctx
      chart.data.datasets.forEach((dataset, i) => {
        const meta = chart.getDatasetMeta(i)
        meta.data.forEach(point => {
          ctx.save()
          ctx.shadowColor = '#9CABFF'
          ctx.shadowBlur = 10
          ctx.shadowOffsetX = 2
          ctx.shadowOffsetY = 2
          ctx.fill()
          ctx.restore()
        })
      })
    }
  }

  const chartOptions = {
    plugins: [shadowPlugin],
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => value + 'k'
        }
      }
    }
  }

  const handleToggleDropdown = () => {
    setIsOpen(prev => !prev)
  }

  const handleOptionClick = option => {
    setSelectedPeriod(option)
    setIsOpen(false)
    updateChartData(option)
  }

  const updateChartData = period => {
    switch (period) {
      case 'Last week':
        setChartData({
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Balance',
              data: [0.1, 0.2, 0.15, 0.3, 0.25, 0.4, 0.35],
              borderColor: '#9CABFF',
              backgroundColor: '#9CABFF',
              boxshadow: '2.72px 2.72px 9.78px 0px #9CABFF',
              fill: true,
              borderWidth: 2,
              borderJoinStyle: 'round',
              tension: 0.4,
              pointStyle: 'circle',
              pointRadius: 6,
              pointHoverRadius: 8
            }
          ]
        })
        break
      case 'Last month':
        setChartData({
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Balance',
              data: [1.2, 1.5, 1.3, 1.6],
              borderColor: '#9CABFF',
              backgroundColor: '#9CABFF',
              boxshadow: '2.72px 2.72px 9.78px 0px #9CABFF',
              fill: true,
              borderWidth: 2,
              borderJoinStyle: 'round',
              tension: 0.4,
              pointStyle: 'circle',
              pointRadius: 6,
              pointHoverRadius: 8
            }
          ]
        })
        break
      case 'Last year':
        setChartData({
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [
            {
              label: 'Balance',
              data: [3, 4, 3.5, 5],
              borderColor: '#9CABFF',
              backgroundColor: '#9CABFF',
              fill: true,
              borderWidth: 2,
              borderJoinStyle: 'round',
              tension: 0.4,
              pointStyle: 'circle',
              pointRadius: 6,
              pointHoverRadius: 8,
              pointBorderColor: '#FFFFFF',
              pointBorderWidth: 2
            }
          ]
        })
        break
      default:
        break
    }
  }

  return (
    <div className='p-[20px] bg-white rounded-[15px]  mt-[-12px] '>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-lg font-semibold'>Total Balance</h3>
        <div className='relative'>
          <button
            onClick={handleToggleDropdown}
            className='border border-gray-300 rounded-lg ps-[14px] py-1 text-[] flex justify-between items-center w-[120px] text-[15px] h-[44px] capitalize font-semibold'
          >
            {selectedPeriod}{' '}
            <img src={downicon} className='mr-[10px] text-[12px] text-[#202224] ' />
          </button>
          {isOpen && (
            <div className='absolute z-10 left-[-39px] bg-white rounded-lg shadow-[0px_0px_40px_0px_#0000000D] mt-1 w-[160px] py-[15px]'>
              {['Select Month', 'Last week', 'Month', 'Last year'].map(
                (option) => (
                  <div
                    key={option}
                    onClick={
                      option === 'Select Month'
                        ? null
                        : () => handleOptionClick(option)
                    }
                    className={`flex items-center bg-white cursor-pointer mb-[10px] ps-[15px] ${
                      option === 'Select Month'
                        ? 'text-gray-400 cursor-not-allowed'
                        : selectedPeriod === option
                        ? 'font-semibold text-black'
                        : 'text-gray-600'
                    }`}
                  >
                    <input
                      type='radio'
                      name='period'
                      checked={selectedPeriod === option}
                      onChange={() => handleOptionClick(option)}
                      className='custom-radio mr-2'
                      disabled={option === 'Select Month'}
                    />
                    {option}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
      <div className='h-64 w-full'>
        <Line
          data={chartData}
          options={chartOptions}
          width={600}
          height={250}
        />
      </div>
    </div>
  )
}

export default BalanceChart
