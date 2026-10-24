const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.static(__dirname));

// Single source of truth stored on the server
let gameState = {
  gameStarted: false,
  activeTurn: "blue",
  scores: { blue: 0, red: 0 },
  clearedTiles: {},
  currentClue: null,
  phase: "LOBBY",
  timerRemaining: 0,
  timerTotal: 0,
  activeChallenger: null,
  submittedAnswer: "",
  submittedBy: "",
  isPaused: false,
  roster: {
    host: null,
    blue: [],
    red: [],
    spectators: []
  }
};

io.on('connection', (socket) => {
  // 1. Send the full existing state immediately upon connection or refresh
  socket.emit('game_message', { type: 'STATE_UPDATE', state: gameState });

  // 2. Handle incoming actions
  socket.on('game_message', (msg) => {
    switch (msg.type) {
      case 'ROSTER_JOIN': {
        socket.userData = { user: msg.user, role: msg.role };

        if (msg.role === 'host') {
          gameState.roster.host = msg.user;
        } else if (msg.role === 'blue' || msg.role === 'red') {
          if (!gameState.roster[msg.role].includes(msg.user)) {
            gameState.roster[msg.role].push(msg.user);
          }
        } else if (msg.role === 'spectator') {
          if (!gameState.roster.spectators.includes(msg.user)) {
            gameState.roster.spectators.push(msg.user);
          }
        }
        // Broadcast the updated roster to every connected device
        io.emit('game_message', { type: 'STATE_UPDATE', state: gameState });
        break;
      }

      case 'KICK_PLAYER': {
        const { targetUser, role } = msg;
        if (role && gameState.roster[role]) {
          gameState.roster[role] = gameState.roster[role].filter(u => u !== targetUser);
        }
        io.emit('game_message', { type: 'STATE_UPDATE', state: gameState });
        break;
      }

      case 'LAUNCH_MATCH': {
        gameState.gameStarted = true;
        gameState.phase = 'SELECTING';
        gameState.timerRemaining = 20;
        gameState.timerTotal = 20;
        io.emit('game_message', { type: 'LAUNCH_MATCH', state: gameState });
        break;
      }

      case 'STATE_UPDATE': {
        // Merge updates from Host
        gameState = { ...gameState, ...msg.state };
        socket.broadcast.emit('game_message', { type: 'STATE_UPDATE', state: gameState });
        break;
      }

      case 'LIVE_TYPING':
      case 'CHALLENGE_TRIGGERED': {
        // Fast relay for keystrokes and alarm sirens
        socket.broadcast.emit('game_message', msg);
        break;
      }
    }
  });

  // 3. Handle player disconnection
  socket.on('disconnect', () => {
    if (socket.userData) {
      const { user, role } = socket.userData;
      if (role === 'host' && gameState.roster.host === user) {
        gameState.roster.host = null;
      } else if ((role === 'blue' || role === 'red') && gameState.roster[role]) {
        gameState.roster[role] = gameState.roster[role].filter(u => u !== user);
      } else if (role === 'spectator') {
        gameState.roster.spectators = gameState.roster.spectators.filter(u => u !== user);
      }
      // Notify all remaining clients of the departure
      io.emit('game_message', { type: 'STATE_UPDATE', state: gameState });
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server online on port ${PORT}`);
});
