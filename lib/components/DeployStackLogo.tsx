import React from 'react';
import Image from 'next/image';

export const DeployStackLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => {
  return (
    <Image
      src="/logo-deploystack.png"
      alt="DeployStack Logo"
      width={22}
      height={24}
      className={className}
    />
  );
};
