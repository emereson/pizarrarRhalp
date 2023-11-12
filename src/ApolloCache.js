import { InMemoryCache } from '@apollo/client';
import { ExamPolicy } from './components/Exam/typePolicies';

export const cache = new InMemoryCache({
  typePolicies: {
    ...ExamPolicy
  }
});
