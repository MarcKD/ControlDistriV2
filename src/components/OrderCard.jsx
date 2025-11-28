// src/components/OrderCard.jsx
import React from 'react';

export const OrderCard = ({ order, onSelect }) => {
  const progress = Math.round(
    (order.items.reduce((acc, item) => acc + item.scanned, 0) / 
    order.items.reduce((acc, item) => acc + item.qty, 0)) * 100
  );

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
    completed: 'bg-green-100 text-green-800 border-green-200'
  };

  return (
    <div 
      onClick={() => onSelect(order)}
      className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer active:scale-95"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-slate-800">{order.id}</h3>
          <p className="text-sm text-slate-500">{order.customer}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${statusColors[order.status]}`}>
          {order.status === 'in_progress' ? 'En Proceso' : order.status === 'pending' ? 'Pendiente' : 'Completado'}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-600">
          <span>Progreso</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              progress === 100 ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};