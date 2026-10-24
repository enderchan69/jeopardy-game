const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.static(__dirname));

let gameState = {
  scores: { blue: 0, red: 0 },
  selectingTeam: 'blue',
  selectionTimer: 20,
  selectionTimerRunning: false,
  clearedClues: [],
  phase: 'SELECTION',
  activeClue: null,
  pendingHostClue: null,
  timer: 60,
  timerRunning: false,
  isPaused: false,
  isTacticalGambleUsed: false,
  challengerTeam: null,
  turnSubmittingTeam: null,
  liveDraft: { author: "", text: "" },
  lockedSubmission: null,
  lastSelectionAttribution: null,
  tacticalAlert: null,
  logs: ["[00:00:00] SERVER ONLINE. Ready for match."],
  roster: {
    host: null,
    blue: [],
    red: [],
    spectators: []
  }
};

io.on('connection', (socket) => {
  // Sync full existing state immediately upon connect/refresh
  socket.emit('game_message', { type: 'STATE_UPDATE', state: gameState });

  socket.on('game_message', (msg) => {
    switch (msg.type) {
      case 'ROSTER_JOIN': {
        const { user, role } = msg;
        socket.userData = { user, role };

        // Clean previous instances to prevent duplicates
        if (gameState.roster.host === user) gameState.roster.host = null;
        gameState.roster.blue = gameState.roster.blue.filter(u => u !== user);
        gameState.roster.red = gameState.roster.red.filter(u => u !== user);
        gameState.roster.spectators = gameState.roster.spectators.filter(u => u !== user);

        if (role === 'host') gameState.roster.host = user;
        else if (role === 'blue') gameState.roster.blue.push(user);
        else if (role === 'red') gameState.roster.red.push(user);
        else if (role === 'board' || role === 'spectator') gameState.roster.spectators.push(user);

        io.emit('game_message', { type: 'STATE_UPDATE', state: gameState });
        break;
      }

      case 'STATE_UPDATE': {
        gameState = { ...gameState, ...msg.state };
        socket.broadcast.emit('game_message', { type: 'STATE_UPDATE', state: gameState, sfx: msg.sfx });
        break;
      }

      case 'LIVE_KEY': {
        gameState.liveDraft = msg.liveDraft;
        socket.broadcast.emit('game_message', msg);
        break;
      }
    }
  });

  socket.on('disconnect', () => {
    if (socket.userData) {
      const { user, role } = socket.userData;
      if (gameState.roster.host === user) gameState.roster.host = null;
      gameState.roster.blue = gameState.roster.blue.filter(u => u !== user);
      gameState.roster.red = gameState.roster.red.filter(u => u !== user);
      gameState.roster.spectators = gameState.roster.spectators.filter(u => u !== user);
      io.emit('game_message', { type: 'STATE_UPDATE', state: gameState });
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server online on port ${PORT}`);
});
