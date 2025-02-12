export interface BarChartProps {
  data: { name: string; total: number }[]
  index: string
  categories: string[]
  colors: string[]
  valueFormatter?: (value: number) => string
  className?: string
}

export interface LineChartProps {
  data: { name: string; total: number }[]
  index: string
  categories: string[]
  colors: string[]
  valueFormatter?: (value: number) => string
  className?: string
}

export interface PieChartProps {
  data: { name: string; value: number }[]
  index: string
  category: string
  colors: string[]
  valueFormatter?: (value: number) => string
  className?: string
}

