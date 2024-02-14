import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../cssFiles/Graph.css'; 
import chartColors from '../chartConfig'; 

export default function Graph({ data, type }) {
  const COLORS = chartColors[type] || ['#8884d8'];

  const processedData = data.map(item => ({
    ...item,
    totalAmount: Math.abs(item.totalAmount),
    percent: ((Math.abs(item.totalAmount) / Math.abs(data.reduce((acc, curr) => acc + curr.totalAmount, 0))) * 100).toFixed(2) + '%',
  }));

  return (
    <div className="graph-container">
      <h3 className="graph-title">{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={processedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="totalAmount"
            nameKey="category"
            label={({ name, percent }) => `${name}: ${percent}`}
          >
            {processedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
