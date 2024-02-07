import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getCloningLogs from '@wasp/queries/getCloningLogs';
import updateCloningStatus from '@wasp/actions/updateCloningStatus';

export function CloningProgress() {
  const { clonedSiteId } = useParams();
  const { data: cloningLogs, isLoading, error } = useQuery(getCloningLogs, { clonedSiteId });
  const updateCloningStatusFn = useAction(updateCloningStatus);

  useEffect(() => {
    // Subscribe to real-time cloning progress updates
  }, []);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {cloningLogs.map((log) => (
        <div key={log.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>Status: {log.status}</div>
          <div>Timestamp: {log.timestamp}</div>
        </div>
      ))}
    </div>
  );
}