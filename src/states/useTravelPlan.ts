import { create } from "zustand";

import { DailyPlan, TravelKeywords } from "@/api/interfaces/travel";

interface ITravelPlanState {
  travelKeyword: TravelKeywords;
  dailyPlans: DailyPlan[];
  selectedDateIndex: number;
  setTravelKeyword: (travelKeyword: TravelKeywords) => void;
  setDailyPlans: (dailyPlanList: DailyPlan[]) => void;
  setDailyPlan: (DailyPlan: DailyPlan) => void;
  setSelectedDateIndex: (index: number) => void;
}

export const useTravelPlan = create<ITravelPlanState>((set, get) => ({
  travelKeyword: [],
  dailyPlans: [],
  selectedDateIndex: 0,
  setTravelKeyword: (travelKeyword) => set({ travelKeyword }),
  setDailyPlans: (dailyPlanList) => set({ dailyPlans: dailyPlanList }),
  setDailyPlan: (dailyPlan) => {
    const newDailyPlans = get().dailyPlans;
    newDailyPlans[get().selectedDateIndex] = dailyPlan;
    return set({
      dailyPlans: [...newDailyPlans],
    });
  },
  setSelectedDateIndex: (index) => set({ selectedDateIndex: index }),
}));
