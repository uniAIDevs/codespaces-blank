import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getClonedSites from '@wasp/queries/getClonedSites';

export function ClonedSites() {
  const { data: clonedSites, isLoading, error } = useQuery(getClonedSites);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {clonedSites.map((site) => (
        <div
          key={site.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{site.url}</div>
          <div>{site.selectedPages}</div>
          <div>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Download
            </button>
            <button
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              Host
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}