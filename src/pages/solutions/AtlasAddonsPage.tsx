import React from 'react';
import { DomainSolutionTemplate } from '../../components/solutions/DomainSolutionTemplate';
import { DOMAIN_SOLUTIONS_DATA } from '../../data/domainSolutionsData';

export const AtlasAddonsPage: React.FC = () => {
  const data = DOMAIN_SOLUTIONS_DATA['atlas-addons'];
  return <DomainSolutionTemplate data={data} />;
};

export default AtlasAddonsPage;

