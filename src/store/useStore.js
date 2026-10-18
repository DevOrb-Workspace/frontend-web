import { create } from 'zustand'
import { users, issues, pullRequests, repos, channels, messages } from '../data/mock'

let nextIssueId = Math.max(...issues.map((i) => i.id)) + 1
let nextMsgId = 100

const useStore = create((set, get) => ({
  users,
  issues,
  pullRequests,
  repos,
  channels,
  messages,

  // ---------- helpers ----------
  getUser: (id) => get().users.find((u) => u.id === id),
  getIssue: (id) => get().issues.find((i) => i.id === Number(id)),

  // ---------- Board (Jira) ----------
  addIssue: (data) =>
    set((s) => ({
      issues: [
        ...s.issues,
        { id: nextIssueId++, status: 'todo', priority: 'medium', labels: [], description: '', assignee: null, ...data },
      ],
    })),

  updateIssue: (id, patch) =>
    set((s) => ({ issues: s.issues.map((i) => (i.id === id ? { ...i, ...patch } : i)) })),

  moveIssue: (id, status) =>
    set((s) => ({ issues: s.issues.map((i) => (i.id === id ? { ...i, status } : i)) })),

  // ---------- Code (GitHub) ----------
  // Cross-link: merging a PR moves the linked issue to Done
  mergePR: (prId) =>
    set((s) => {
      const pr = s.pullRequests.find((p) => p.id === prId)
      if (!pr) return s
      return {
        pullRequests: s.pullRequests.map((p) => (p.id === prId ? { ...p, status: 'merged' } : p)),
        issues: s.issues.map((i) => (i.id === pr.closes ? { ...i, status: 'done' } : i)),
      }
    }),

  closePR: (prId) =>
    set((s) => ({
      pullRequests: s.pullRequests.map((p) => (p.id === prId ? { ...p, status: 'closed' } : p)),
    })),

  // ---------- Chat (Slack) ----------
  sendMessage: (channel, user, text) =>
    set((s) => ({
      messages: [
        ...s.messages,
        {
          id: 'm' + nextMsgId++,
          channel,
          user,
          text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          reactions: {},
        },
      ],
    })),

  addReaction: (msgId, emoji) =>
    set((s) => ({
      messages: s.messages.map((m) =>
        m.id === msgId ? { ...m, reactions: { ...m.reactions, [emoji]: (m.reactions[emoji] || 0) + 1 } } : m
      ),
    })),
}))

export default useStore