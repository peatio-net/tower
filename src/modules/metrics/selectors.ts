import {AppState} from '../index';

export const selectMetrics = (state: AppState) => state.metrics.metrics;
