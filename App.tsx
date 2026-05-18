import { useState } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";

import { addExp } from "./utils/levelSystem";

export default function App() {
  const [user, setUser] =
    useState<any>(null);

  const [quests, setQuests] =
    useState<any[]>([]);

  const [adminMode, setAdminMode] =
    useState(false);

  const completeQuest = (quest: any) => {
    setUser((prev: any) => {
      if (!prev) return prev;

      return {
        ...addExp(
          prev,
          quest.rewardExp || 0
        ),

        gold:
          prev.gold +
          (quest.rewardGold || 0),
      };
    });

    setQuests((prev) =>
      prev.map((q) =>
        q.id === quest.id
          ? {
              ...q,
              status: "done",
            }
          : q
      )
    );
  };

  const approveQuest = (id: number) => {
    setQuests((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              status: "approved",
              rewardGold: 50,
              rewardExp: 20,
            }
          : q
      )
    );
  };

  return user ? (
    <>
      <button
        onClick={() =>
          setAdminMode(!adminMode)
        }
      >
        ADMIN MODE
      </button>

      <Home
        user={user}
        setUser={setUser}
        quests={quests}
        setQuests={setQuests}
        approveQuest={approveQuest}
        completeQuest={completeQuest}
        adminMode={adminMode}
      />
    </>
  ) : (
    <Login onLogin={setUser} />
  );
}
