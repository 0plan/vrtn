import { Area, AreaChart, CartesianGrid, Pie, PieChart, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export function TrendChart({ daily, title, visits, number }: {
  daily: { label: string; visits: number }[]; title: string; visits: string; number: Intl.NumberFormat;
}) {
  return (
    <ChartContainer className="traffic-trend" config={{ visits: { label: visits } }}>
      <AreaChart data={daily} title={title} margin={{ top: 12, right: 12, bottom: 0, left: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 5" />
        <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)' }}
          tickMargin={10} minTickGap={24} interval="preserveStartEnd" />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)' }}
          tickMargin={8} width={42} tickCount={5} tickFormatter={value => number.format(value)} />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Area dataKey="visits" type="linear" stroke="var(--primary)" strokeWidth={3}
          fill="var(--muted)" fillOpacity={1} isAnimationActive={false} />
      </AreaChart>
    </ChartContainer>
  );
}

export function DeviceChart({ devices, title }: { devices: { name: string; value: number; fill: string }[]; title: string }) {
  return (
    <ChartContainer className="traffic-donut" config={{}}>
      <PieChart title={title}>
        <Pie data={devices} dataKey="value" nameKey="name" innerRadius="76%" outerRadius="96%"
          startAngle={90} endAngle={-270} stroke="var(--card)" strokeWidth={3} isAnimationActive={false} />
      </PieChart>
    </ChartContainer>
  );
}
