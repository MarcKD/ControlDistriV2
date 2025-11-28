// src/App.jsx
import React, { useState, useEffect } from 'react';
import { MOCK_ORDERS } from './data/mockData';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { PickingInterface } from './pages/PickingInterface';

export default function App() {
  const [user, setUser] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);
  const [orders, setOrders] = useState(MOCK_ORDERS);

  // Simular carga inicial
  useEffect(() => {
    // Aquí iría la llamada al backend: fetch('/api/orders')
  }, []);

  const handleOrderComplete = () => {
    // 1. Actualizar estado local
    const updatedOrders = orders.map(o => 
      o.id === activeOrder.id ? { ...o, status: 'completed' } : o
    );
    setOrders(updatedOrders);
    
    // 2. Simular llamada a Odoo (Backend)
    console.log(`[SYNC] Enviando orden ${activeOrder.id} a Odoo a través de FastAPI...`);
    
    // 3. Volver al dashboard
    setActiveOrder(null);
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  if (activeOrder) {
    return (
      <PickingInterface 
        order={activeOrder} 
        onBack={() => setActiveOrder(null)}
        onComplete={handleOrderComplete}
      />
    );
  }

  return (
    <Dashboard 
      user={user} 
      orders={orders} 
      onSelectOrder={setActiveOrder}
      onLogout={() => setUser(null)}
    />
  );
}