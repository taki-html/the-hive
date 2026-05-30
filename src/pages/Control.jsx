import React, { useState } from 'react';
import Hexagon from '../components/Hexagon';

export default function Control() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  
  // State mapping directly to the new SQL 'comandos_hardware' table
  const [commandData, setCommandData] = useState({
    device_token: 'TX_001', // Default token based on the PHP fallback
    tipo: 'MUDAR_ID', 
    novo_id_maquina: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommandData(prev => ({ ...prev, [name]: value }));
  };

  const sendCommand = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('https://api-maquinas-1.onrender.com/hardware/enviar_comando.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_token: commandData.device_token,
          tipo: commandData.tipo,
          novo_id_maquina: commandData.tipo === 'MUDAR_ID' ? parseInt(commandData.novo_id_maquina) : null
        })
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Falha ao enviar comando");

      setStatus({ type: 'success', message: 'Comando adicionado à fila com sucesso! (Status: PENDENTE)' });
      setCommandData(prev => ({ ...prev, novo_id_maquina: '' })); // Reset ID field
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-hive-text">
          Terminal de Controle
        </h1>
        <p className="text-gray-400 mt-2">Envio de instruções assíncronas para o hardware via MQTT/HTTP.</p>
      </header>

      <div className="bg-hive-brown border border-hive-gold/20 rounded-xl p-6 shadow-lg">
        <form onSubmit={sendCommand} className="flex flex-col gap-5">
          
          {/* Device Token Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-hive-gold">
              Token do Dispositivo (Receptor)
            </label>
            <input 
              type="text" 
              name="device_token"
              value={commandData.device_token}
              onChange={handleInputChange}
              required
              className="bg-hive-black border border-gray-700 rounded p-3 text-hive-text focus:border-hive-yellow focus:outline-none"
              placeholder="Ex: TX_001"
            />
          </div>

          {/* Tipo de Comando Dropdown */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-hive-gold">
              Tipo de Comando
            </label>
            <select 
              name="tipo"
              value={commandData.tipo}
              onChange={handleInputChange}
              className="bg-hive-black border border-gray-700 rounded p-3 text-hive-text focus:border-hive-yellow focus:outline-none"
            >
              <option value="MUDAR_ID">Trocar ID da Máquina (MUDAR_ID)</option>
              <option value="REINICIAR">Reiniciar Sensor (REINICIAR)</option>
              <option value="CALIBRAR">Calibrar Microfone (CALIBRAR)</option>
            </select>
          </div>

          {/* Novo ID da Máquina (Condicional) */}
          {commandData.tipo === 'MUDAR_ID' && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-hive-gold">
                Novo ID da Máquina
              </label>
              <input 
                type="number" 
                name="novo_id_maquina"
                value={commandData.novo_id_maquina}
                onChange={handleInputChange}
                required
                min="1"
                className="bg-hive-black border border-gray-700 rounded p-3 text-hive-text focus:border-hive-yellow focus:outline-none"
                placeholder="Digite o novo ID numérico"
              />
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className={`mt-4 font-bold py-3 px-6 rounded transition-all ${
              loading 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                : 'bg-hive-yellow text-hive-black hover:bg-yellow-400 hover:shadow-[0_0_15px_rgba(255,193,7,0.4)]'
            }`}
          >
            {loading ? 'Processando na Hive...' : 'Gravar Comando na Fila'}
          </button>
        </form>

        {/* Status Messages */}
        {status.message && (
          <div className={`mt-6 p-4 rounded border ${
            status.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
            <p>{status.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}