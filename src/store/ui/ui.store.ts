import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type TripWorkspaceUiStore = {
  collapsedHeroTripIds: Record<string, boolean>;
  isTripHeroExpanded: (tripId: string) => boolean;
  setTripHeroExpanded: (tripId: string, expanded: boolean) => void;
};

export const useTripWorkspaceUiStore = create<TripWorkspaceUiStore>()(
  devtools(
    persist(
      (set, get) => ({
        collapsedHeroTripIds: {},
        isTripHeroExpanded: (tripId) => !get().collapsedHeroTripIds[tripId],
        setTripHeroExpanded: (tripId, expanded) => {
          set(
            (state) => {
              const collapsedHeroTripIds = { ...state.collapsedHeroTripIds };

              if (expanded) {
                delete collapsedHeroTripIds[tripId];
              } else {
                collapsedHeroTripIds[tripId] = true;
              }

              return { collapsedHeroTripIds };
            },
            false,
            'tripWorkspaceUi/setTripHeroExpanded'
          );
        },
      }),
      {
        name: 'tripsync-trip-workspace-ui',
        storage: createJSONStorage(() => localStorage),
      }
    ),
    {
      name: 'TripSync Trip Workspace UI Store',
    }
  )
);
