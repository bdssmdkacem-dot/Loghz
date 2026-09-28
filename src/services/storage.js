import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  BEST_SCORE: "riddle_game_best_score",
  BEST_TOTAL: "riddle_game_best_total",
  GAMES_PLAYED: "riddle_game_games_played",
};

export async function getStats() {
  try {
    const [bestScore, bestTotal, gamesPlayed] = await Promise.all([
      AsyncStorage.getItem(KEYS.BEST_SCORE),
      AsyncStorage.getItem(KEYS.BEST_TOTAL),
      AsyncStorage.getItem(KEYS.GAMES_PLAYED),
    ]);
    return {
      bestScore: bestScore ? parseInt(bestScore, 10) : 0,
      bestTotal: bestTotal ? parseInt(bestTotal, 10) : 0,
      gamesPlayed: gamesPlayed ? parseInt(gamesPlayed, 10) : 0,
    };
  } catch (e) {
    return { bestScore: 0, bestTotal: 0, gamesPlayed: 0 };
  }
}

export async function recordGameResult(score, total) {
  try {
    const stats = await getStats();
    const isNewBest = score > stats.bestScore;

    await AsyncStorage.setItem(KEYS.GAMES_PLAYED, String(stats.gamesPlayed + 1));

    if (isNewBest) {
      await AsyncStorage.setItem(KEYS.BEST_SCORE, String(score));
      await AsyncStorage.setItem(KEYS.BEST_TOTAL, String(total));
    }

    return isNewBest;
  } catch (e) {
    return false;
  }
}

export async function resetStats() {
  try {
    await AsyncStorage.multiRemove([
      KEYS.BEST_SCORE,
      KEYS.BEST_TOTAL,
      KEYS.GAMES_PLAYED,
    ]);
  } catch (e) {}
}
