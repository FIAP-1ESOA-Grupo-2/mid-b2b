import React, { useState } from 'react';

export const StepperSign = () => {
  const [currentIndex, setCurrentIndex] = useState(2);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <div data-hs-stepper={`{ "currentIndex": ${currentIndex} }`}>
      <ul className="relative flex flex-row gap-x-2">
        {/* Render stepper items based on your data */}
        {/* You can map through an array of steps to make it dynamic */}
        <li className={`flex items-center gap-x-2 shrink basis-0 flex-1 group ${currentIndex === 1 ? 'success' : ''}`} data-hs-stepper-nav-item='{ "index": 1, "isCompleted": true }'>
          {/* ... Content for Step 1 */}
        </li>

        <li className={`flex items-center gap-x-2 shrink basis-0 flex-1 group ${currentIndex === 2 ? 'active' : ''}`} data-hs-stepper-nav-item='{ "index": 2 }'>
          {/* ... Content for Step 2 */}
        </li>

        <li className="flex items-center gap-x-2 shrink basis-0 flex-1 group" data-hs-stepper-nav-item='{ "index": 3 }'>
          {/* ... Content for Step 3 */}
        </li>
      </ul>

      <div className="mt-5 sm:mt-8">
        {/* Render content based on the current index */}
        {/* You can map through an array of content items to make it dynamic */}
        <div data-hs-stepper-content-item='{ "index": 1, "isCompleted": true }' className={`success ${currentIndex !== 1 ? 'hidden' : ''}`}>
          {/* ... Content for Step 1 */}
        </div>

        <div data-hs-stepper-content-item='{ "index": 2 }' className={`active ${currentIndex !== 2 ? 'hidden' : ''}`}>
          {/* ... Content for Step 2 */}
        </div>

        <div data-hs-stepper-content-item='{ "index": 3 }' className={`hidden ${currentIndex !== 3 ? 'hidden' : ''}`}>
          {/* ... Content for Step 3 */}
        </div>

        {/* Render button group */}
        <div className="mt-5 flex justify-between items-center gap-x-2">
          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50" onClick={handleBack} disabled={currentIndex === 1}>
            {/* ... Content for Back button */}
          </button>

          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700" onClick={handleNext} disabled={currentIndex === 3}>
            {/* ... Content for Next button */}
          </button>

          <button type="button" className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700" data-hs-stepper-finish-btn style={{ display: currentIndex === 3 ? 'block' : 'none' }}>
            {/* ... Content for Finish button */}
          </button>

          <button type="reset" className="py-2 px-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700" data-hs-stepper-reset-btn style={{ display: currentIndex !== 1 ? 'block' : 'none' }}>
            {/* ... Content for Reset button */}
          </button>
        </div>
      </div>
    </div>
  );
};
