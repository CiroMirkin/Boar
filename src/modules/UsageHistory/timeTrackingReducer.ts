import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UsageHistory, UsageDuration } from './model/usageHistory'
import { updateDailyUsageRecord } from './useCase/updateDailyUsageRecord'

interface InitialState {
	timeTracking: UsageHistory
}

const initialState: InitialState = {
	timeTracking: [],
}

export const timeTrackingSlice = createSlice({
	name: 'time-tracking',
	initialState,
	reducers: {
		addNewTracking: (state, action: PayloadAction<UsageDuration>) => {
			state.timeTracking = updateDailyUsageRecord({
				duration: action.payload,
				usageHistory: state.timeTracking,
			})
		},
	},
})

export const { addNewTracking } = timeTrackingSlice.actions
export default timeTrackingSlice.reducer
