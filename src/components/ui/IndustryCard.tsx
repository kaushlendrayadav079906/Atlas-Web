import React from 'react';
import { ImageCard } from './ImageFeatureSlider';

interface IndustryCardProps {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  targetRoute?: string;
}

export const IndustryCard: React.FC<IndustryCardProps> = ({
  id,
  title,
  description,
  imageSrc,
  targetRoute = `/industries/${id}`,
}) => (
  <ImageCard
    className="h-full"
    item={{
      title,
      description,
      image: imageSrc,
      href: targetRoute,
      actionLabel: `View ${title} solutions`,
    }}
  />
);
