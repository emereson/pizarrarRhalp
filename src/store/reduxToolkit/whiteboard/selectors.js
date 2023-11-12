import { createDraftSafeSelector } from '@reduxjs/toolkit';

const commonSelector = state => state;

export const getNavigationHistory = createDraftSafeSelector(
  commonSelector,
  state => state.whiteBoardToolkit.navigationHistory
);
