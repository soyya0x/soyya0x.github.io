import { useState } from "react";

export default function Login({
  onLogin,
}) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = () => {
    if (!id || !pw) {
      alert("ID / PW 입력");
      return;
    }

    onLogin({
      id,

      nickname: id,

      level: 1,

      hp: 100,

      exp: 0,

      gold: 500,

      job: "Novice",

      title: "무명",

      str: 5,

      agi: 5,

      vit: 5,

      divine: 0,

      diamond: 0,

      country: "무소속",

      status: "평민",

      inventory: [],

      ownedClothes: ["기본 의상"],

      equippedCloth: "기본 의상",
    });
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.box}>
        <h2>⚔ RPG LOGIN</h2>

        <input
          placeholder="ID"
          value={id}
          autoComplete="off"
          onChange={(e) =>
            setId(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
          style={styles.input}
        />

        <input
          placeholder="PASSWORD"
          type="password"
          value={pw}
          autoComplete="off"
          onChange={(e) =>
            setPw(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
          style={styles.input}
        />

        <button
          onClick={handleLogin}
          style={styles.button}
        >
          ENTER WORLD
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: "100vh",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    background: "#0b0b0b",

    color: "white",
  },

  box: {
    width: 300,

    padding: 20,

    background: "#1c1c1c",

    border: "1px solid #333",

    borderRadius: 10,

    display: "flex",

    flexDirection: "column",

    gap: 10,
  },

  input: {
    padding: 10,

    background: "#111",

    border: "1px solid #333",

    color: "white",
  },

  button: {
    padding: 10,

    background: "gold",

    border: "none",

    cursor: "pointer",

    fontWeight: "bold",
  },
};
