"use client"

import React, { useState } from 'react';
import Image from 'next/image'; // Import Image component from next/image
import AppSub from '../../images/application-submission.png';
import Approved from '../../images/Approved.jpg';
import Prelim from '../../images/prelim.jpg';
import Detail from '../../images/detail.jpg';
import Comm from '../../images/comm.jpg';

const statusStages = [
  { label: 'Application Submission', id: 1, image: AppSub },
  { label: 'Document Verification', id: 2, image: Approved },
  { label: 'Preliminary Review', id: 3, image: Prelim },
  { label: 'Detailed Review', id: 4, image: Detail },
  { label: 'Community Review Approval', id: 5, image: Comm },
];

export default function StatusTracking() {
  const [currentStatus, setCurrentStatus] = useState(1);

  const updateStatus = (stage: number) => {
    if (stage >= 1 && stage <= statusStages.length) {
      setCurrentStatus(stage);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 text-center">
      <div>
        <h1 className="text-2xl font-bold mb-4">Status Tracking</h1>
        <div className="flex justify-between items-center mb-6">
          {statusStages.map((stage, index) => (
            <React.Fragment key={stage.id}>
              <div
                className={`flex flex-col items-center ${stage.id <= currentStatus ? 'text-green-600' : 'text-red'}`}
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full border-4 ${stage.id <= currentStatus ? 'border-green-600' : 'border-red-600'}`}
                >
                  {stage.id <= currentStatus ? '✔️' : stage.id}
                </div>
                <div className="mt-2 mb-2">
                  <Image
                    src={stage.image}
                    alt={stage.label}
                    width={150}
                    height={150}
                    className={`object-cover ${stage.id <= currentStatus ? 'opacity-100' : 'opacity-50'}`}
                  />
                </div>
                <p className="mt-2">{stage.label}</p>
              </div>

              {/* Add arrow between stages, except for the last stage */}
              {index < statusStages.length - 1 && (
                <div
                  className={`flex-grow mx-4 h-1 border-t-4 ${index + 1 < currentStatus ? 'border-green-600' : 'border-red-600'}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Buttons at the bottom of the container */}
      <div className="flex justify-center gap-4 mt-auto">
        <button
          onClick={() => updateStatus(currentStatus - 1)}
          disabled={currentStatus === 1}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => updateStatus(currentStatus + 1)}
          disabled={currentStatus === statusStages.length}
          className="px-4 py-2 bg-green-600 text-white rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
