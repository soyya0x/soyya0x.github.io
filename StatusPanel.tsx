import { useState } from "react";
import { ui, colors } from "../styles/globalStyles";

interface User {
  title?: string;
  nickname: string;
  level: number;
  exp: number;

  str?: number;
  agi?: number;
  vit?: number;
  divine?: number;

  status?: string;
  country?: string;

  gold?: number;
  diamond?: number;

  equippedCloth?: string;
}

interface StatusPanelProps {
  user: User;
}

export default function StatusPanel({
  user,
}: StatusPanelProps) {
  const [openBag, setOpenBag] =
    useState<boolean>(false);

  return (
    <div style={styles.panel}>
      {/* 칭호 */}
      <p style={styles.title}>
        {user.title || "무명"}
      </p>

      {/* 이름 */}
      <h2 style={styles.name}>
        {user.nickname}
      </h2>

      {/* 캐릭터 */}
      <div style={styles.char}>
        🧍
        <p style={styles.cloth}>
          {user.equippedCloth}
        </p>
      </div>

      {/* 레벨 */}
      <p style={styles.level}>
        Lv. {user.level}
      </p>

      {/* 경험치 바 */}
      <div style={ui.expBarBackground}>
        <div
          style={{
            ...ui.expBarFill,
            width: `${user.exp || 0}%`,
          }}
        />
      </div>

      <p style={styles.expText}>
        EXP {user.exp || 0} / 100
      </p>

      {/* 스탯 */}
      <div style={styles.stats}>
        <p>힘 {user.str || 0}</p>
        <p>민첩 {user.agi || 0}</p>
        <p>체력 {user.vit || 0}</p>
        <p>신성력 {user.divine || 0}</p>
      </div>

      {/* 상태 */}
      <div style={styles.section}>
        <p>
          상태 :
          {" "}
          {user.status || "평민"}
        </p>

        <p>
          소속 :
          {" "}
          {user.country || "무소속"}
        </p>
      </div>

      {/* 재화 */}
      <div style={styles.moneyBox}>
        <p>
          💰 Gold :
          {" "}
          {user.gold || 0}
        </p>

        <p>
          💎 Diamond :
          {" "}
          {user.diamond || 0}
        </p>
      </div>

      {/* 가방 버튼 */}
      <button
        style={styles.bagButton}
        onClick={() =>
          setOpenBag(!openBag)
        }
      >
        🎒 가방
      </button>

      {/* 인벤토리 */}
      {openBag && (
        <div style={styles.inventory}>
          <h3 style={styles.inventoryTitle}>
            INVENTORY
          </h3>

          <div style={styles.item}>
            🧪 포션 x3
          </div>

          <div style={styles.item}>
            🗡 낡은 검
          </div>

          <div style={styles.item}>
            👕 기본 의상
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  panel: {
    width: "280px",
    padding: "24px",

    background: colors.panel,

    border: `1px solid ${colors.mint}`,

    borderRadius: "16px",

    color: colors.text,

    boxShadow:
      "0 0 15px rgba(111,255,233,0.15)",
  },

  title: {
    color: colors.gold,

    fontSize: "12px",

    textAlign: "center" as const,

    letterSpacing: "2px",
  },

  name: {
    textAlign: "center" as const,

    marginTop: "5px",

    marginBottom: "15px",
  },

  char: {
    fontSize: "52px",

    textAlign: "center" as const,

    marginBottom: "10px",
  },

  cloth: {
    fontSize: "12px",

    color: colors.subText,

    marginTop: "8px",
  },

  level: {
    marginTop: "10px",

    fontWeight: "bold",
  },

  expText: {
    fontSize: "12px",

    color: colors.subText,

    marginTop: "6px",
  },

  stats: {
    marginTop: "20px",

    display: "flex",

    flexDirection: "column" as const,

    gap: "8px",

    fontSize: "14px",
  },

  section: {
    marginTop: "20px",

    paddingTop: "15px",

    borderTop: `1px solid ${colors.border}`,

    color: colors.subText,

    fontSize: "14px",
  },

  moneyBox: {
    marginTop: "20px",

    padding: "14px",

    background: "#101010",

    border: `1px solid ${colors.border}`,

    borderRadius: "12px",

    display: "flex",

    flexDirection: "column" as const,

    gap: "8px",
  },

  bagButton: {
    width: "100%",

    marginTop: "20px",

    padding: "12px",

    background: "#1c1c1c",

    border: `1px solid ${colors.mint}`,

    color: colors.text,

    borderRadius: "10px",

    cursor: "pointer",

    fontWeight: "bold",
  },

  inventory: {
    marginTop: "20px",

    padding: "16px",

    background: "#101010",

    border: `1px solid ${colors.border}`,

    borderRadius: "14px",
  },

  inventoryTitle: {
    color: colors.mint,

    marginBottom: "10px",
  },

  item: {
    padding: "10px",

    marginTop: "10px",

    background: "#1a1a1a",

    border: `1px solid ${colors.border}`,

    borderRadius: "8px",
  },
};
