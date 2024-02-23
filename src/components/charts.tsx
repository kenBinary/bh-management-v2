import {
    LineChart, Line,
    XAxis, YAxis,
    CartesianGrid, Tooltip,
    Legend, ResponsiveContainer,
    PieChart, Pie, Cell,
    BarChart, Bar,
} from 'recharts';

interface Chart {
    data: Array<object>;
}
export function MyLineChart({ data }: Chart) {
    let [name, value] = ['', ''];
    if (data.length > 0) {
        [name, value] = Object.keys(data[0]);
    }
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={name} />
                <YAxis domain={[0, 'dataMax+500']} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={value} stroke="#003f5c" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}

interface PieChartLabel {
    cx: string;
    cy: string;
    midAngle: string;
    outerRadius: number;
    innerRadius: number;
    value: string;
}
export function MyPieChart({ data }: Chart) {
    let [name, value] = ['', ''];
    if (data.length > 0) {
        [name, value] = Object.keys(data[0]);
    }
    const COLORS = ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }: PieChartLabel) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {value}
            </text>
        );
    };
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    nameKey={name}
                    dataKey={value}
                    cx="50%"
                    cy="50%"
                    fill="#8884d8"
                    // label
                    labelLine={false}
                    label={renderCustomizedLabel}
                    legendType="diamond"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );

}
export function MyBarChart({ data }: Chart) {
    let [name, value] = ['', ''];
    if (data.length > 0) {
        [name, value] = Object.keys(data[0]);
    }
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart width={400} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={name} />
                <YAxis domain={[0, 'dataMax+200']} />
                <Tooltip />
                <Legend />
                <Bar barSize={70} dataKey={value} fill="#003f5c" />
            </BarChart>
        </ResponsiveContainer>
    );
}