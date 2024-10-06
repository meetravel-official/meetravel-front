import { create } from "zustand";

import { DailyPlan } from "@/api/interfaces/travel";

interface ITravelPlanState {
  travelKeyword: string[];
  dailyPlans: DailyPlan[];
  selectedDateIndex: number;
  setTravelKeyword: (travelKeyword: string[]) => void;
  setDailyPlans: (dailyPlanList: DailyPlan[]) => void;
  setSelectedDateIndex: (index: number) => void;
}

export const useTravelPlan = create<ITravelPlanState>((set) => ({
  travelKeyword: [],
  dailyPlans: [],
  selectedDateIndex: 0,
  setTravelKeyword: (travelKeyword) => set({ travelKeyword }),
  setDailyPlans: (dailyPlanList) => set({ dailyPlans: dailyPlanList }),
  setSelectedDateIndex: (index) => set({ selectedDateIndex: index }),
}));
