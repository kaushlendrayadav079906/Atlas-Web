import React from 'react';
import { DomainSolutionTemplate } from '../../components/solutions/DomainSolutionTemplate';
import { DOMAIN_SOLUTIONS_DATA } from '../../data/domainSolutionsData';

export const WarehouseSolutionPage: React.FC = () => {
  const data = DOMAIN_SOLUTIONS_DATA['warehouse-management'];
  return <DomainSolutionTemplate data={data} />;
};

export default WarehouseSolutionPage;

