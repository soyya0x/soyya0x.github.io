import { useState } from "react";

import StatusPanel from "../components/StatusPanel";
import QuestBoard from "../components/QuestBoard";

export default function Home({
  user,
  setUser,
  quests,
  setQuests,
  approveQuest,
  completeQuest,
  adminMode,
}) {
  const [page, setPage] =
    useState(0);

  const [menuPage, setMenuPage] =
    useState(null);

  const [posts, setPosts] =
    useState([]);

  const [postInput, setPostInput] =
    useState("");

  const [
    currentLocation,
    setCurrentLocation,
  ] = useState("중앙 광장");

  const next = () => {
    setPage((p) =>
      p === 0 ? 1 : 0
    );
  };

  const prev = () => {
    setPage((p) =>
      p === 0 ? 1 : 0
    );
  };

  return (
    <div style={styles.wrapper}>
      {/* ================= */}
      {/* 화면 1 */}
      {/* ================= */}

      {page === 0 && (
        <div style={styles.centerScreen}>
          <StatusPanel user={user} />
        </div>
      )}

      {/* ================= */}
      {/* 화면 2 */}
      {/* ================= */}

      {page === 1 && (
        <div style={styles.content}>
          {!menuPage && (
            <div>
              <h2>
                📍 {currentLocation}
              </h2>

              <div
                style={styles.buttonGrid}
              >
                <button
                  onClick={() =>
                    setMenuPage(
                      "quest"
                    )
                  }
                >
                  ⚔ 의뢰 게시판
                </button>

                <button
                  onClick={() =>
                    setMenuPage(
                      "town"
                    )
                  }
                >
                  🏰 광장 이동
                </button>

                <button
                  onClick={() =>
                    setMenuPage(
                      "board"
                    )
                  }
                >
                  💬 자유 게시판
                </button>

                <button
                  onClick={() =>
                    setMenuPage(
                      "gacha"
                    )
                  }
                >
                  🎰 의상 뽑기
                </button>

                <button
                  onClick={() =>
                    setMenuPage(
                      "wardrobe"
                    )
                  }
                >
                  🎒 옷장
                </button>

                <button
                  onClick={() =>
                    setMenuPage(
                      "mission"
                    )
                  }
                >
                  📜 진행중 미션
                </button>
              </div>
            </div>
          )}

          {/* 의뢰 */}

          {menuPage === "quest" && (
            <div>
              <QuestBoard
                quests={quests}
                setQuests={
                  setQuests
                }
                approveQuest={
                  approveQuest
                }
                completeQuest={
                  completeQuest
                }
                adminMode={
                  adminMode
                }
              />

              <button
                onClick={() =>
                  setMenuPage(
                    null
                  )
                }
              >
                뒤로
              </button>
            </div>
          )}

          {/* 지도 */}

          {menuPage === "town" && (
            <div>
              <h2>
                🗺 세계 지도
              </h2>

              <div
                style={styles.mapGrid}
              >
                <button
                  onClick={() => {
                    setCurrentLocation(
                      "제국 광장"
                    );

                    setMenuPage(
                      "empire"
                    );
                  }}
                >
                  제국
                </button>

                <button
                  onClick={() => {
                    setCurrentLocation(
                      "왕국 광장"
                    );

                    setMenuPage(
                      "kingdom"
                    );
                  }}
                >
                  왕국
                </button>

                <button
                  onClick={() => {
                    setCurrentLocation(
                      "신성제국 광장"
                    );

                    setMenuPage(
                      "holy"
                    );
                  }}
                >
                  신성제국
                </button>
              </div>

              <button
                onClick={() =>
                  setMenuPage(
                    null
                  )
                }
              >
                뒤로
              </button>
            </div>
          )}

          {/* 광장 */}

          {menuPage === "empire" && (
            <div>
              <h2>
                🏛 제국 광장
              </h2>

              <button
                onClick={() =>
                  setMenuPage(
                    "town"
                  )
                }
              >
                지도로
              </button>
            </div>
          )}

          {menuPage ===
            "kingdom" && (
            <div>
              <h2>
                👑 왕국 광장
              </h2>

              <button
                onClick={() =>
                  setMenuPage(
                    "town"
                  )
                }
              >
                지도로
              </button>
            </div>
          )}

          {menuPage === "holy" && (
            <div>
              <h2>
                ✨ 신성제국 광장
              </h2>

              <button
                onClick={() =>
                  setMenuPage(
                    "town"
                  )
                }
              >
                지도로
              </button>
            </div>
          )}

          {/* 게시판 */}

          {menuPage === "board" && (
            <div>
              <h2>
                💬 자유 게시판
              </h2>

              <div
                style={styles.writeBox}
              >
                <input
                  value={
                    postInput
                  }
                  placeholder="글 입력..."
                  onChange={(e) =>
                    setPostInput(
                      e.target
                        .value
                    )
                  }
                  style={
                    styles.input
                  }
                />

                <button
                  onClick={() => {
                    if (
                      !postInput.trim()
                    )
                      return;

                    setPosts(
                      (prev) => [
                        {
                          id: Date.now(),
                          writer:
                            user.nickname,
                          text: postInput,
                        },

                        ...prev,
                      ]
                    );

                    setPostInput(
                      ""
                    );
                  }}
                >
                  작성
                </button>
              </div>

              <div
                style={{
                  marginTop:
                    "20px",
                }}
              >
                {posts.map(
                  (post) => (
                    <div
                      key={
                        post.id
                      }
                      style={
                        styles.postCard
                      }
                    >
                      <h4>
                        {
                          post.writer
                        }
                      </h4>

                      <p>
                        {
                          post.text
                        }
                      </p>
                    </div>
                  )
                )}
              </div>

              <button
                onClick={() =>
                  setMenuPage(
                    null
                  )
                }
              >
                뒤로
              </button>
            </div>
          )}

          {/* 가챠 */}

          {menuPage === "gacha" && (
            <div>
              <h2>
                🎰 의상 뽑기
              </h2>

              <button
                onClick={() => {
                  if (
                    user.gold <
                    100
                  ) {
                    alert(
                      "골드 부족"
                    );

                    return;
                  }

                  const clothes =
                    [
                      "검은 코트",
                      "붉은 망토",
                      "기사 갑옷",
                      "마법사 로브",
                    ];

                  const randomCloth =
                    clothes[
                      Math.floor(
                        Math.random() *
                          clothes.length
                      )
                    ];

                  setUser(
                    (prev) => ({
                      ...prev,

                      gold:
                        prev.gold -
                        100,

                      ownedClothes:
                        [
                          ...prev.ownedClothes,
                          randomCloth,
                        ],
                    })
                  );

                  alert(
                    `${randomCloth} 획득!`
                  );
                }}
              >
                100 GOLD 뽑기
              </button>

              <button
                onClick={() =>
                  setMenuPage(
                    null
                  )
                }
              >
                뒤로
              </button>
            </div>
          )}

          {/* 옷장 */}

          {menuPage ===
            "wardrobe" && (
            <div>
              <h2>🎒 옷장</h2>

              {user.ownedClothes?.map(
                (
                  cloth,
                  i
                ) => (
                  <div key={i}>
                    <button
                      onClick={() => {
                        setUser(
                          (
                            prev
                          ) => ({
                            ...prev,

                            equippedCloth:
                              cloth,
                          })
                        );
                      }}
                    >
                      착용 :
                      {cloth}
                    </button>
                  </div>
                )
              )}

              <button
                onClick={() =>
                  setMenuPage(
                    null
                  )
                }
              >
                뒤로
              </button>
            </div>
          )}

          {/* 미션 */}

          {menuPage ===
            "mission" && (
            <div>
              <h2>
                📜 진행중 미션
              </h2>

              {quests
                .filter(
                  (q) =>
                    q.status ===
                    "approved"
                )
                .map((q) => (
                  <div
                    key={q.id}
                    style={
                      styles.questCard
                    }
                  >
                    <h3>
                      {q.title}
                    </h3>

                    <p>
                      💰{" "}
                      {
                        q.rewardGold
                      }{" "}
                      GOLD
                    </p>

                    <p>
                      ✨{" "}
                      {
                        q.rewardExp
                      }{" "}
                      EXP
                    </p>

                    <button
                      onClick={() =>
                        completeQuest(
                          q
                        )
                      }
                    >
                      완료
                    </button>
                  </div>
                ))}

              <button
                onClick={() =>
                  setMenuPage(
                    null
                  )
                }
              >
                뒤로
              </button>
            </div>
          )}
        </div>
      )}

      {/* 이동 버튼 */}

      <div style={styles.nav}>
        <button
          onClick={prev}
          style={styles.arrow}
        >
          ◀
        </button>

        <button
          onClick={next}
          style={styles.arrow}
        >
          ▶
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: "100vh",
    background: "#0b0b0b",
    color: "white",
    position: "relative",
  },

  centerScreen: {
    height: "100%",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",
  },

  content: {
    padding: "20px",
  },

  nav: {
    position: "absolute",

    bottom: 20,

    left: "50%",

    transform:
      "translateX(-50%)",

    display: "flex",

    gap: "20px",
  },

  arrow: {
    fontSize: "30px",

    background: "none",

    border: "none",

    color: "white",

    cursor: "pointer",
  },

  buttonGrid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(2, 1fr)",

    gap: "10px",

    marginTop: "20px",
  },

  mapGrid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(3, 1fr)",

    gap: "15px",

    marginTop: "20px",
  },

  writeBox: {
    display: "flex",

    gap: "10px",

    marginTop: "20px",
  },

  input: {
    flex: 1,

    padding: "10px",

    background: "#111",

    border: "1px solid #333",

    color: "white",
  },

  postCard: {
    marginTop: "10px",

    padding: "15px",

    background: "#111",

    border: "1px solid #333",

    borderRadius: "10px",
  },

  questCard: {
    marginTop: "15px",

    padding: "15px",

    background: "#111",

    border: "1px solid #333",

    borderRadius: "10px",
  },
};
