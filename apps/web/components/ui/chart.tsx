import type React from "react"

// Define proper types for the chart components
type BarChartProps = React.SVGProps<SVGSVGElement> & {
  data?: any[]
  children?: React.ReactNode
}

type AxisProps = React.SVGProps<SVGSVGElement> & {
  dataKey?: string
  domain?: any[]
  tickFormatter?: (value: any) => string
  tick?: boolean | React.ReactNode
  axisLine?: boolean | object
  tickLine?: boolean | object
}

type BarProps = React.SVGProps<SVGRectElement> & {
  dataKey?: string
  fill?: string
  radius?: number | number[]
  stackId?: string
}

type LineProps = React.SVGProps<SVGPathElement> & {
  type?: string
  dataKey?: string
  stroke?: string
  strokeWidth?: number
  dot?: boolean | object
  activeDot?: boolean | object
}

type PieProps = React.SVGProps<SVGPathElement> & {
  data?: any[]
  dataKey?: string
  nameKey?: string
  cx?: string | number
  cy?: string | number
  innerRadius?: number
  outerRadius?: number
  paddingAngle?: number
  labelLine?: boolean | object
  label?: boolean | object | Function
}

type CellProps = React.SVGProps<SVGPathElement> & {
  fill?: string
}

type TooltipProps = {
  formatter?: (value: any, name: string, props: any) => React.ReactNode
  labelFormatter?: (label: any) => React.ReactNode
  cursor?: boolean | object
}

type ResponsiveContainerProps = {
  width?: string | number
  height?: string | number
  children?: React.ReactNode
}

type CartesianGridProps = React.SVGProps<SVGSVGElement> & {
  strokeDasharray?: string
  horizontal?: boolean
  vertical?: boolean
}

type LegendProps = {
  layout?: "horizontal" | "vertical"
  align?: "left" | "center" | "right"
  verticalAlign?: "top" | "middle" | "bottom"
}

export const BarChart: React.FC<BarChartProps> = ({ children, ...props }) => {
  return <svg {...props}>{children}</svg>
}

export const Bar: React.FC<BarProps> = (props) => {
  return <rect {...props} />
}

export const XAxis: React.FC<AxisProps> = () => {
  return null
}

export const YAxis: React.FC<AxisProps> = () => {
  return null
}

export const CartesianGrid: React.FC<CartesianGridProps> = () => {
  return null
}

export const Tooltip: React.FC<TooltipProps> = () => {
  return null
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  width = "100%",
  height = "100%",
}) => {
  return <div style={{ width, height }}>{children}</div>
}

export const LineChart: React.FC<BarChartProps> = ({ children, ...props }) => {
  return <svg {...props}>{children}</svg>
}

export const Line: React.FC<LineProps> = (props) => {
  return <path {...props} />
}

export const PieChart: React.FC<BarChartProps> = ({ children, ...props }) => {
  return <svg {...props}>{children}</svg>
}

export const Pie: React.FC<PieProps> = (props) => {
  return <path {...props} />
}

export const Cell: React.FC<CellProps> = (props) => {
  return <path {...props} />
}

export const Legend: React.FC<LegendProps> = () => {
  return null
}
