import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAction } from '@wasp/actions';
import { useQuery } from '@wasp/queries';
import createClonedSite from '@wasp/actions/createClonedSite';
import getClonedSites from '@wasp/queries/getClonedSites';

export function HomePage() {
  const createClonedSiteFn = useAction(createClonedSite);
  const { data: clonedSites, isLoading, error } = useQuery(getClonedSites);
  const [url, setUrl] = useState('');
  const [selectedPages, setSelectedPages] = useState([]);

  const handleCreateClonedSite = () => {
    createClonedSiteFn({ url, selectedPages });
    setUrl('');
    setSelectedPages([]);
  };

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <label htmlFor='url'>Website URL:</label>
        <input
          type='text'
          id='url'
          className='border p-1 rounded'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <label>Select Pages to Clone:</label>
        {selectedPages.map((page) => (
          <div key={page}>
            <input
              type='checkbox'
              id={page}
              value={page}
              checked={selectedPages.includes(page)}
              onChange={() => {
                setSelectedPages((prevSelectedPages) => prevSelectedPages.filter((p) => p !== page));
              }}
            />
            <label htmlFor={page}>{page}</label>
          </div>
        ))}
      </div>
      <button
        onClick={handleCreateClonedSite}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Clone Website
      </button>
      <div className='mt-4'>
        {clonedSites.map((site) => (
          <div key={site.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
            <div>{site.url}</div>
            <div>Selected Pages: {site.selectedPages.join(', ')}</div>
            <Link to={`/cloningProgress/${site.id}`}>Cloning Progress</Link>
          </div>
        ))}
      </div>
    </div>
  );
}