import { useState, useEffect } from 'react';

export function useHiveData() {
  const [data, setData] = useState(null); // Changed to null to easily check if we have initial data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (isBackgroundSync = false) => {
    // Only show the loading spinner if this is the very first load or a manual click
    if (!isBackgroundSync) setLoading(true); 

    try {
      const response = await fetch("https://api-maquinas-1.onrender.com/dashboard/dashboard.php");
      
      if (!response.ok) {
        throw new Error("Falha na conexão com o servidor (Status: " + response.status + ")");
      }
      
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      if (!isBackgroundSync) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Initial load

    // Poll every 10 seconds silently in the background
    const interval = setInterval(() => fetchData(true), 10000); 
    
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refetch: () => fetchData(false) };
}