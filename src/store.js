// Progress saved on this device only. Every access is guarded: storage can be blocked.
const STORE_KEY = "mates-progress-v1";

const store = {
  load() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY)) || {};
    } catch {
      return {};
    }
  },

  save(data) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(data));
    } catch {
      // storage unavailable: progress lasts only for this session
    }
  },

  topic(id) {
    return { ok: 0, total: 0, read: false, ...this.load()[id] };
  },

  update(id, change) {
    const data = this.load();
    data[id] = { ...this.topic(id), ...change };
    this.save(data);
  },

  recordAttempt(id, correct) {
    const t = this.topic(id);
    this.update(id, { ok: t.ok + (correct ? 1 : 0), total: t.total + 1 });
  },

  // "new" | "learning" | "mastered"
  status(id) {
    const t = this.topic(id);
    if (t.total >= 10 && t.ok / t.total >= 0.8) return "mastered";
    return t.total > 0 || t.read ? "learning" : "new";
  },
};
