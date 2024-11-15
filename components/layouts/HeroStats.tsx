import React from 'react';
import Image from 'next/image';

const HeroStats = () => {
  return (
    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg p-4 flex gap-4 items-center">
      <div className="flex -space-x-2">
        <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
          <Image
            src="/testimonials/adidas2.png"
            alt="Adidas"
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
          <Image
            src="/testimonials/pwc2.png"
            alt="PWC"
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
          <Image
            src="/testimonials/jp-morgan2.png"
            alt="JP Morgan"
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="pr-4 border-r border-gray-200">
        <div className="text-xl font-bold">35+</div>
        <div className="text-gray-500 text-sm">Happy Clients</div>
      </div>
      <div>
        <div className="flex items-center text-xl font-bold">
          4.8/5
          <span className="ml-1 text-yellow-400">★★★★★</span>
        </div>
        <div className="text-gray-500 text-sm">Rating</div>
      </div>
    </div>
  );
};

export default HeroStats;