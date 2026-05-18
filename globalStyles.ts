export const colors = {
  background: "#0b0b0b",
  panel: "#151515",
  border: "#2d2d2d",

  mint: "#6fffe9",
  gold: "#ffd447",

  text: "#ffffff",
  subText: "#aaaaaa",
};

export const ui = {
  panel: {
    background: colors.panel,
    border: `1px solid ${colors.border}`,
    borderRadius: "14px",
    padding: "20px",
  },

  button: {
    background: "#1c1c1c",
    border: `1px solid ${colors.border}`,
    color: colors.text,
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
  },

  mintButton: {
    background: colors.mint,
    color: "#000",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  title: {
    color: colors.mint,
    fontSize: "22px",
    fontWeight: "bold",
  },

  subText: {
    color: colors.subText,
    fontSize: "13px",
  },

  expBarBackground: {
    width: "100%",
    height: "10px",
    background: "#222",
    borderRadius: "999px",
    overflow: "hidden",
    marginTop: "8px",
  },

  expBarFill: {
    height: "100%",
    background: colors.mint,
    borderRadius: "999px",
  },
};
