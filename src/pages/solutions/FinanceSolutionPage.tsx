import React from 'react';
import { DomainSolutionTemplate } from '../../components/solutions/DomainSolutionTemplate';
import { DOMAIN_SOLUTIONS_DATA } from '../../data/domainSolutionsData';

export const FinanceSolutionPage: React.FC = () => {
  const data = DOMAIN_SOLUTIONS_DATA['finance-automation'];
  return <DomainSolutionTemplate data={data} />;
};

export default FinanceSolutionPage;

