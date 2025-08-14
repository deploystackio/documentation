import React from 'react';
import Image from 'next/image';

export const DeployStackLogo: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => {
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
