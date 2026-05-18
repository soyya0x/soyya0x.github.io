export const getRequiredExp = (level) => {
  if (level >= 99) return Infinity;

  if (level < 10) return 10;
  if (level < 20) return 20;
  if (level < 30) return 40;
  if (level < 40) return 80;
  if (level < 50) return 160;
  if (level < 60) return 320;
  if (level < 70) return 640;
  if (level < 80) return 1280;

  return 2560;
};

export const addExp = (user, expGain) => {
  if (!user) return user;

  let level = user.level || 1;
  let exp = (user.exp || 0) + (expGain || 0);

  while (level < 99) {
    const need = getRequiredExp(level);

    if (exp >= need) {
      exp -= need;
      level += 1;
    } else {
      break;
    }
  }

  return {
    ...user,
    level,
    exp,
  };
};
