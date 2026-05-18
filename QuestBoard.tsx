import { useState } from "react";

type Quest = {
  id: number;
  title: string;
  status: "pending" | "approved" | "done";
};

type Props = {
  quests: Quest[];
  setQuests: React.Dispatch<React.SetStateAction<Quest[]>>;
  approveQuest?: (id: number) => void;
  completeQuest?: (quest: Quest) => void;
  adminMode: boolean;
};

export default function QuestBoard({
  quests = [],
  setQuests,
  approveQuest,
  completeQuest,
  adminMode,
}: Props) {
  const [input, setInput] = useState("");

  const submitQuest = (title: string) => {
    if (!title?.trim()) return;

    setQuests((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: title.trim(),
        status: "pending",
      },
    ]);
  };

  return (
    <div>
      <h2>⚔ 의뢰 게시판</h2>

      {/* 입력 */}
      <div style={{ marginBottom: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="의뢰 입력"
        />
        <button
          onClick={() => {
            submitQuest(input);
            setInput("");
          }}
        >
          제출
        </button>
      </div>

      {/* 승인된 퀘스트 */}
      <div>
        {(quests || [])
          .filter((q) => q.status === "approved")
          .map((q) => (
            <div key={q.id} style={styles.card}>
              <p>{q.title}</p>
              <button onClick={() => completeQuest?.(q)}>
                완료
              </button>
            </div>
          ))}
      </div>

      {/* 관리자 */}
      {adminMode && (
        <div style={{ marginTop: 20 }}>
          <h3>ADMIN</h3>

          {(quests || [])
            .filter((q) => q.status === "pending")
            .map((q) => (
              <div key={q.id} style={styles.card}>
                <p>{q.title}</p>
                <button onClick={() => approveQuest?.(q.id)}>
                  승인
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    padding: 10,
    margin: 10,
    background: "#1c1c1c",
    border: "1px solid #333",
  },
};
