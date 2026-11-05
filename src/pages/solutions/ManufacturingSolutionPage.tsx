import React from 'react';
import { DomainSolutionTemplate } from '../../components/solutions/DomainSolutionTemplate';
import { DOMAIN_SOLUTIONS_DATA } from '../../data/domainSolutionsData';

export const ManufacturingSolutionPage: React.FC = () => {
  const data = DOMAIN_SOLUTIONS_DATA['manufacturing'];
  return <DomainSolutionTemplate data={data} />;
};

export default ManufacturingSolutionPage;

