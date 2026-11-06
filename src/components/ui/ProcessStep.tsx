import React from 'react';
import { ImageCard } from './ImageFeatureSlider';
import { cardImage } from '../../data/cardImagePools';

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
  image?: string;
}

// Default photo per step: discover (people) -> design/implement (systems) -> optimize (automation)
const STEP_IMAGES = [
  cardImage('people', 4),
  cardImage('technology', 0),
  cardImage('technology', 2),
  cardImage('automation', 0),
];

export const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description, image }) => (
  <ImageCard
    className="h-full"
    item={{
      title,
      description,
      eyebrow: `Step ${String(number).padStart(2, '0')}`,
      image: image || STEP_IMAGES[(number - 1) % STEP_IMAGES.length],
    }}
  />
);
