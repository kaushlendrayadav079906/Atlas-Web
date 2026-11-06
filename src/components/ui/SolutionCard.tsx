import React from 'react';
import { ImageCard } from './ImageFeatureSlider';

interface ServiceCardProps {
  id: string;
  title: string;
  bullets: string[];
  ctaText?: string;
  ctaTarget?: string;
}

// Photo behind each service card
const SERVICE_IMAGES: Record<string, string> = {
  'sap-b1': '/images/partners/partners_sap_monitor.jpg',
  boyum: '/images/partners/partners_beas.jpg',
  uipath: '/images/partners/partners_uipath_robot.jpg',
  atlas: '/images/solutions/solutions_gate_entry_truck.jpg',
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  bullets,
  ctaText = 'Learn More',
  ctaTarget = '/contact',
}) => (
  <ImageCard
    className="h-full"
    item={{
      title,
      bullets,
      image: SERVICE_IMAGES[id] || SERVICE_IMAGES['sap-b1'],
      href: ctaTarget,
      actionLabel: `${ctaText}: ${title}`,
    }}
  />
);
