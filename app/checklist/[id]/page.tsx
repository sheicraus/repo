import CheckListMore from '@/app/components/modals/CheckListMore';
import React from 'react'
import CheckListItems from './CheckListItems';
import AddItem from './AddItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSadCry, faSadTear } from '@fortawesome/free-solid-svg-icons';

export default async function Checklist({ params: { id } }: { params: { id: string } }) {
  // const id = `4627fe26-d9b1-4cee-a3f5-2e031197dc77`;
  const response = await fetch(`http://localhost:3000/api/checklist/${id}`, {
    method: 'GET',
    cache: 'no-cache',
    next: {
      tags: ["checklist"]
    }
  });

  const result = await response.json();
  // // console.log(response)
  console.log(result)

  if (result.data){
    return (
      <div className="min-h-screen w-screen bg-primaryBg">
        <div className="px-3 bg-secondary-50 text-white flex flex-row items-center justify-between">
          <div className='col-span-8'>
            <h1 className="font-bold text-2xl line-clamp-1 px-2 py-1">{result.data[0].title}</h1>
          </div>
          <CheckListMore/>
        </div>
        <AddItem checklistId={id}/>
        <CheckListItems items={result.data[0].checklist_items} />
      </div>
    )
  } else {
    return (
      <div className="min-h-screen w-screen bg-primaryBg flex justify-center items-center">
          <FontAwesomeIcon icon={faSadTear} width={32} height={32} />
          Oops! Checklist not found.
      </div>
    )
  }
}
