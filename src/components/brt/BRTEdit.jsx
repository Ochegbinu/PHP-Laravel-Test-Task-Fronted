import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const BrtList = () => {
  const [brts, setBrts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBrts();
  }, []);

  const fetchBrts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/brts`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setBrts(data);
      } else {
        throw new Error('Failed to fetch BRTs');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your BRTs</h1>
        <Link
          to="/brts/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Create New BRT
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brts.map((brt) => (
          <Card key={brt.id}>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">{brt.brt_code}</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  Reserved Amount: {brt.reserved_amount} BLU
                </p>
                <p className="text-gray-600">
                  Status: <span className={`font-medium ${
                    brt.status === 'active' ? 'text-green-600' : 'text-red-600'
                  }`}>{brt.status}</span>
                </p>
                <p className="text-gray-600">
                  Created: {new Date(brt.created_at).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BrtList;
