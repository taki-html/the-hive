import { useState, useEffect, useCallback } from 'react';

export function useHiveData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize the function so it doesn't cause unnecessary re-renders
  const fetchData = useCallback(async () => {
    // Only show loading indicator if we have no data yet (Initial Load)
    if (data.length === 0) {
      setLoading(true);
    }
    
    try {
      const response = await fetch("https://api-maquinas-1.onrender.com/dashboard/dashboard.php");
      if (!response.ok) throw new Error("Network response was not ok");
      
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [data.length]); // Dependency array

  useEffect(() => {
    fetchData();
    // Silent background poll every 10 seconds
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}