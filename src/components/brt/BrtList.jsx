import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const BrtList = () => {
  const [brts, setBrts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Static data to simulate the API response
    const staticBRTs = [
      {
        id: 1,
        brt_code: 'BRT001',
        reserved_amount: 500,
        status: 'active',
        created_at: '2024-01-01T10:00:00Z'
      },
      {
        id: 2,
        brt_code: 'BRT002',
        reserved_amount: 300,
        status: 'inactive',
        created_at: '2024-02-15T14:30:00Z'
      },
      {
        id: 3,
        brt_code: 'BRT003',
        reserved_amount: 800,
        status: 'active',
        created_at: '2024-03-10T09:45:00Z'
      }
    ];

    // Simulate API delay
    setTimeout(() => {
      setBrts(staticBRTs);
      setLoading(false);
    }, 1000); // 1 second delay to simulate loading state
  }, []);

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
