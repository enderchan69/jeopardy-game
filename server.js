const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
  pingInterval: 10000,
  pingTimeout: 20000, // Extended to 20s to prevent false disconnects during large Base64 deck uploads
  maxHttpBufferSize: 1e8 // 100 MB buffer for audio/image Base64 payloads
});

const HOST_PIN = process.env.HOST_PIN || '1337';

// Security Isolation: Serve only index.html & health check; never expose server.js or package.json
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

/* -------------------------------------------------------------
   AUTHORITATIVE DEFAULT DECK (CONFIDENTIAL ANSWERS KEPT ON SERVER)
-------------------------------------------------------------- */
const DEFAULT_DECK = [
  {
    category: "RETRO COMPUTING",
    clues: [
      { value: 200, type: "text", q: "What does the 'DOS' in MS-DOS stand for?", a: "Disk Operating System" },
      { value: 400, type: "text", q: "This classic DOS command displays the files and folders in the current directory.", a: "DIR" },
      { value: 600, type: "text", q: "In conventional MS-DOS architecture, conventional RAM was famously capped at this amount.", a: "640 KB" },
      { value: 800, type: "text", q: "Alongside CONFIG.SYS, this batch file ran automatically every time an MS-DOS machine booted.", a: "AUTOEXEC.BAT" },
      { value: 1000, type: "text", q: "Which computer pioneer created Norton Utilities, Norton Commander, and the famous Speed Disk defragmenter?", a: "Peter Norton" }
    ]
  },
  {
    category: "WORLD GEOGRAPHY",
    clues: [
      { value: 200, type: "text", q: "What is the capital city of France?", a: "Paris" },
      { value: 400, type: "text", q: "This North African country borders both the Mediterranean Sea and the Atlantic Ocean.", a: "Morocco" },
      { value: 600, type: "text", q: "What is the largest hot desert in the world, stretching across North Africa?", a: "Sahara Desert" },
      { value: 800, type: "text", q: "Mount Kilimanjaro, Africa's highest free-standing mountain, is located in which nation?", a: "Tanzania" },
      { value: 1000, type: "text", q: "Which island country is also designated as an entire continent?", a: "Australia" }
    ]
  },
  {
    category: "CINEMA ICONS",
    clues: [
      { value: 200, type: "text", q: "Which 1999 sci-fi movie features red pills, blue pills, and agent Smith?", a: "The Matrix" },
      { value: 400, type: "image", mediaUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80", q: "Identify the sci-fi franchise and weapon type depicted in this glowing energy blade.", a: "Lightsaber / Star Wars" },
      { value: 600, type: "text", q: "Who directed 'Inception', 'Interstellar', and 'Oppenheimer'?", a: "Christopher Nolan" },
      { value: 800, type: "text", q: "In Pulp Fiction, what fictional Hawaiian-themed fast-food burger does Jules taste?", a: "Big Kahuna Burger" },
      { value: 1000, type: "text", q: "Which film won the Best Picture Academy Award in 1994, beating The Shawshank Redemption and Pulp Fiction?", a: "Forrest Gump" }
    ]
  },
  {
    category: "SYNTH & AUDIO",
    clues: [
      { value: 200, type: "audio", mediaUrl: "synth:c_major_scale", q: "Listen to the synthetic frequency sequence. Identify the foundational musical scale being played.", a: "C Major Scale" },
      { value: 400, type: "audio", mediaUrl: "synth:80s_arpeggio", q: "Listen to this chiptune progression. Which decade revolutionized this 8-bit sound in arcades?", a: "1980s" },
      { value: 600, type: "text", q: "Established in 1983, this acronym represents the universal electronic instrument communication standard.", a: "MIDI" },
      { value: 800, type: "text", q: "Which electronics company introduced the world-famous Walkman portable cassette player in 1979?", a: "Sony" },
      { value: 1000, type: "text", q: "What was the legendary 3-voice sound synthesis chip that powered the Commodore 64?", a: "SID (MOS Technology 6581)" }
    ]
  },
  {
    category: "SCIENCE & NATURE",
    clues: [
      { value: 200, type: "text", q: "What chemical element has the atomic number 8 and the symbol 'O'?", a: "Oxygen" },
      { value: 400, type: "text", q: "Approximately what is the speed of light in vacuum in kilometers per second?", a: "300,000 km/s (299,792 km/s)" },
      { value: 600, type: "text", q: "Which gas makes up roughly 78 percent of Earth's atmosphere?", a: "Nitrogen" },
      { value: 800, type: "text", q: "What subatomic particle carries a negative electrical charge and orbits the atomic nucleus?", a: "Electron" },
      { value: 1000, type: "text", q: "Often termed the 'powerhouse of the cell', which organelle produces ATP?", a: "Mitochondria" }
    ]
  },
  {
    category: "GAMING LEGENDS",
    clues: [
      { value: 200, type: "text", q: "What color is Nintendo's plumber hero Mario's cap and shirt?", a: "Red" },
      { value: 400, type: "text", q: "In 1993, id Software sparked a revolution in PC gaming by unleashing this demonic FPS.", a: "DOOM" },
      { value: 600, type: "text", q: "What is the name of the green-clad protagonist in Nintendo's The Legend of Zelda?", a: "Link" },
      { value: 800, type: "text", q: "In Minecraft, what indestructible block is generated when running water touches lava source blocks?", a: "Obsidian" },
      { value: 1000, type: "text", q: "Released in 1972 by Ralph Baer, what was the first commercial home video game console?", a: "Magnavox Odyssey" }
    ]
  }
];

let authoritativeDeck = JSON.parse(JSON.stringify(DEFAULT_DECK));

// Normalize any incoming 6-category deck so all 6x5 clues are guaranteed non-null objects
function sanitizeDeckStructure(rawDeck) {
  const tiers = [200, 400, 600, 800, 1000];
  return [0, 1, 2, 3, 4, 5].map((catIdx) => {
    const rawCat = (Array.isArray(rawDeck) && rawDeck[catIdx] && typeof rawDeck[catIdx] === 'object')
      ? rawDeck[catIdx]
      : DEFAULT_DECK[catIdx];
    const rawClues = Array.isArray(rawCat.clues) ? rawCat.clues : [];
    return {
      category: String(rawCat.category || `CAT 0${catIdx + 1}`).trim().slice(0, 40) || `CAT 0${catIdx + 1}`,
      clues: tiers.map((val, cIdx) => {
        const c = (rawClues[cIdx] && typeof rawClues[cIdx] === 'object') ? rawClues[cIdx] : {};
        return {
          value: val,
          type: ['text', 'image', 'audio'].includes(c.type) ? c.type : 'text',
          q: String(c.q ?? ''),
          a: String(c.a ?? ''),
          mediaUrl: String(c.mediaUrl ?? '')
        };
      })
    };
  });
}

// Strip confidential `a`, `q`, and heavy `mediaUrl` strings from public board deck
function getPublicDeck() {
  return authoritativeDeck.map(cat => ({
    category: cat.category,
    clues: cat.clues.map(c => ({
      value: Number(c.value) || 200,
      type: c.type || 'text'
    }))
  }));
}

function createInitialGameState() {
  return {
    isGameLaunched: false, // Default to Standby Waiting Room
    scores: { blue: 0, red: 0 },
    selectingTeam: 'blue',
    selectionTimer: 20,
    selectionTimerRunning: false,
    selectionTimerWasRunning: false,
    isShuffleRunning: false,
    clearedClues: [],
    phase: 'SELECTION',
    activeClue: null,
    pendingHostClue: null,
    timer: 60,
    timerRunning: false,
    isPaused: false,
    isStealPhase: false,
    isTacticalGambleUsed: false,
    challengerTeam: null,
    turnSubmittingTeam: null,
    liveDraft: { author: "", text: "" },
    lockedSubmission: null,
    lastSelectionAttribution: null,
    tacticalAlert: null,
    arcadeCount: 3,
    mediaProgress: 0,
    logs: ["[00:00:00] SERVER ONLINE. Ready in Standby Lobby."],
    roster: {
      host: null,
      blue: [],
      red: [],
      spectators: []
    }
  };
}

let gameState = createInitialGameState();

const connectedClients = new Map(); // socket.id -> { user, role, isHost }
const pinAttemptsByIp = new Map();  // ip -> { count, lockUntil }

let mediaInterval = null;
let graceTimeout = null;
let countdownInterval = null;
let tacticalAlertTimeout = null;
let shuffleFallbackTimeout = null;

function clearTacticalAlert() {
  if (tacticalAlertTimeout) {
    clearTimeout(tacticalAlertTimeout);
    tacticalAlertTimeout = null;
  }
  if (gameState.tacticalAlert) {
    gameState.tacticalAlert = null;
  }
}

function clearPhaseTimers() {
  if (mediaInterval) { clearInterval(mediaInterval); mediaInterval = null; }
  if (graceTimeout) { clearTimeout(graceTimeout); graceTimeout = null; }
  if (countdownInterval) { clearInterval(countdownInterval); countdownInterval = null; }
  if (shuffleFallbackTimeout) { clearTimeout(shuffleFallbackTimeout); shuffleFallbackTimeout = null; }
}

function sanitizeName(str, maxLen = 28) {
  const cleaned = String(str || '').trim().slice(0, maxLen);
  return cleaned || 'Operator';
}

function addServerLog(msg) {
  const time = new Date().toTimeString().split(' ')[0];
  gameState.logs.unshift(`[${time}] ${msg}`);
  if (gameState.logs.length > 30) gameState.logs.pop();
}

function rebuildRoster() {
  const roster = { host: null, blue: [], red: [], spectators: [] };
  for (const client of connectedClients.values()) {
    if (client.role === 'host' && client.isHost) {
      roster.host = client.user;
    } else if (client.role === 'blue') {
      if (!roster.blue.includes(client.user)) roster.blue.push(client.user);
    } else if (client.role === 'red') {
      if (!roster.red.includes(client.user)) roster.red.push(client.user);
    } else {
      if (!roster.spectators.includes(client.user)) roster.spectators.push(client.user);
    }
  }
  gameState.roster = roster;
}

function getSecretAnswerForCurrentState() {
  const ref = gameState.activeClue || gameState.pendingHostClue;
  if (!ref) return null;
  const cat = authoritativeDeck[ref.catIdx];
  if (!cat || !cat.clues || !cat.clues[ref.clueIdx]) return null;
  return cat.clues[ref.clueIdx].a;
}

function getActiveClueMediaUrl() {
  if (!gameState.activeClue) return null;
  const cat = authoritativeDeck[gameState.activeClue.catIdx];
  if (!cat || !cat.clues || !cat.clues[gameState.activeClue.clueIdx]) return null;
  return cat.clues[gameState.activeClue.clueIdx].mediaUrl || '';
}

function emitStateToSocket(
  socket,
  sfx = null,
  includeDeck = false,
  includeMedia = false,
  includeFullDeckForHost = true
) {
  const client = connectedClients.get(socket.id);
  const isHost = Boolean(client && client.isHost && client.role === 'host');
  const payload = {
    type: 'STATE_UPDATE',
    state: gameState,
    sfx,
    hostSecretAnswer: isHost ? getSecretAnswerForCurrentState() : null
  };
  if (includeDeck) {
    payload.publicDeck = getPublicDeck();
    if (isHost && includeFullDeckForHost) {
      payload.fullDeck = authoritativeDeck;
    }
  }
  if (includeMedia || includeDeck) {
    const mediaUrl = getActiveClueMediaUrl();
    if (mediaUrl !== null) payload.activeClueMediaUrl = mediaUrl;
  }
  socket.emit('game_message', payload);
}

function broadcastState(
  sfx = null,
  includeDeck = false,
  includeMedia = false,
  includeFullDeckForHost = true
) {
  for (const [socketId] of connectedClients) {
    const sock = io.sockets.sockets.get(socketId);
    if (sock) {
      emitStateToSocket(sock, sfx, includeDeck, includeMedia, includeFullDeckForHost);
    }
  }
}

/* -------------------------------------------------------------
   SERVER-AUTHORITATIVE MEDIA & 3-2-1-GO SEQUENCES
-------------------------------------------------------------- */
function startServerArcadeCountdown(sendInitialMedia = false) {
  clearPhaseTimers();
  gameState.phase = 'COUNTDOWN';
  gameState.arcadeCount = 3;
  broadcastState('countdown_tick', false, sendInitialMedia);

  countdownInterval = setInterval(() => {
    if (gameState.isPaused || !gameState.isGameLaunched) return;
    gameState.arcadeCount--;
    if (gameState.arcadeCount > 0) {
      broadcastState('countdown_tick');
    } else if (gameState.arcadeCount === 0) {
      broadcastState('countdown_go');
    } else {
      clearPhaseTimers();
      gameState.phase = 'THINKING';
      gameState.timer = 60;
      gameState.timerRunning = false;
      addServerLog(`[CLUE REVEALED] Thinking phase paused at 60s. Waiting for Host.`);
      broadcastState();
    }
  }, 1000);
}

function startServerMediaSequence() {
  clearPhaseTimers();
  gameState.phase = 'MEDIA_PLAYING';
  gameState.mediaProgress = 0;
  const isAudio = gameState.activeClue && gameState.activeClue.type === 'audio';
  broadcastState(isAudio ? 'play_clue_audio' : null, false, true);

  let ticks = 0;
  const totalTicks = 25;
  mediaInterval = setInterval(() => {
    if (gameState.isPaused || !gameState.isGameLaunched) return;
    ticks++;
    gameState.mediaProgress = Math.min(100, Math.round((ticks / totalTicks) * 100));
    broadcastState(ticks % 5 === 0 ? 'media_pulse' : null);

    if (ticks >= totalTicks) {
      clearInterval(mediaInterval);
      mediaInterval = null;
      runServerMediaGrace(3);
    }
  }, 200);
}

function runServerMediaGrace(secondsLeft) {
  if (secondsLeft > 0) {
    broadcastState('grace_beep');
    graceTimeout = setTimeout(() => {
      if (gameState.phase !== 'MEDIA_PLAYING' || !gameState.isGameLaunched) return;
      runServerMediaGrace(secondsLeft - 1);
    }, 1000);
  } else {
    startServerArcadeCountdown(false);
  }
}

function finishClueRound(sfxType = 'correct') {
  clearPhaseTimers();
  clearTacticalAlert();
  if (gameState.activeClue) {
    const key = `${gameState.activeClue.catIdx}-${gameState.activeClue.clueIdx}`;
    if (!gameState.clearedClues.includes(key)) gameState.clearedClues.push(key);
  }

  gameState.selectingTeam = gameState.selectingTeam === 'blue' ? 'red' : 'blue';
  gameState.selectionTimer = 20;
  gameState.selectionTimerRunning = false;
  gameState.selectionTimerWasRunning = false;
  gameState.isShuffleRunning = false;
  gameState.phase = 'SELECTION';
  gameState.activeClue = null;
  gameState.pendingHostClue = null;
  gameState.lockedSubmission = null;
  gameState.liveDraft = { author: "", text: "" };
  gameState.isStealPhase = false;
  gameState.isTacticalGambleUsed = false;
  gameState.challengerTeam = null;

  addServerLog(`[TURN SWITCH] Selection strictly passes to TEAM ${gameState.selectingTeam.toUpperCase()}.`);

  if (gameState.clearedClues.length >= 30) {
    gameState.phase = 'GAME_OVER';
    addServerLog(`[GAME OVER] All 30 disk sectors defragmented!`);
    broadcastState('victory');
    return;
  }

  broadcastState(sfxType);
}

function lockTileForHostConfirmation(catIdx, clueIdx, playerAttributionName) {
  if (shuffleFallbackTimeout) {
    clearTimeout(shuffleFallbackTimeout);
    shuffleFallbackTimeout = null;
  }

  const cat = authoritativeDeck[catIdx];
  const clue = cat && cat.clues ? cat.clues[clueIdx] : null;
  if (!clue) return;

  gameState.pendingHostClue = {
    catIdx,
    clueIdx,
    value: clue.value,
    type: clue.type || 'text'
  };

  gameState.lastSelectionAttribution = {
    team: gameState.selectingTeam,
    player: playerAttributionName,
    catName: cat.category,
    val: clue.value
  };

  if (!gameState.isShuffleRunning) {
    gameState.selectionTimerWasRunning = gameState.selectionTimerRunning;
  }
  gameState.selectionTimerRunning = false;
  gameState.isShuffleRunning = false;
  gameState.phase = 'HOST_CONFIRM';

  addServerLog(`[TILE CLICKED] ${cat.category} $${clue.value} by ${playerAttributionName}. Awaiting Host confirmation.`);
  broadcastState();
}

/* -------------------------------------------------------------
   AUTHORITATIVE 1000ms GAME CLOCK LOOP
-------------------------------------------------------------- */
setInterval(() => {
  if (
    !gameState.isGameLaunched ||
    gameState.isPaused ||
    gameState.isShuffleRunning ||
    gameState.phase === 'HOST_CONFIRM' ||
    gameState.phase === 'GAME_OVER'
  ) return;

  if (gameState.phase === 'SELECTION' && gameState.selectionTimerRunning) {
    if (gameState.selectionTimer > 0) {
      gameState.selectionTimer--;
      const sfx = gameState.selectionTimer === 3 ? 'countdown_tick' : null;
      broadcastState(sfx);
    } else {
      gameState.selectionTimerRunning = false;
      gameState.selectionTimerWasRunning = false;
      gameState.phase = 'SELECTION_TIMEOUT';
      addServerLog(`[SELECTION EXPIRED] Time up for ${gameState.selectingTeam.toUpperCase()}. Awaiting Host.`);
      broadcastState('incorrect');
    }
  } else if (['THINKING', 'TYPING', 'STEAL_THINKING', 'STEAL_TYPING'].includes(gameState.phase) && gameState.timerRunning) {
    if (gameState.timer > 0) {
      gameState.timer--;
      const sfx = (gameState.timer <= 3 && gameState.timer > 0) ? 'countdown_tick' : null;
      broadcastState(sfx);
    } else {
      gameState.timerRunning = false;
      if (gameState.phase === 'THINKING' || gameState.phase === 'STEAL_THINKING') {
        gameState.phase = 'THINKING_TIMEOUT';
      } else if (gameState.phase === 'TYPING' || gameState.phase === 'STEAL_TYPING') {
        gameState.phase = 'TYPING_TIMEOUT';
      }
      addServerLog(`[TIME EXPIRED] Phase elapsed. Awaiting Host command.`);
      broadcastState('incorrect');
    }
  }
}, 1000);

/* -------------------------------------------------------------
   SOCKET.IO CONNECTION & MESSAGE HANDLERS
-------------------------------------------------------------- */
io.on('connection', (socket) => {
  const clientIp = socket.handshake.headers['x-forwarded-for'] || socket.handshake.address || socket.id;
  connectedClients.set(socket.id, { user: `Operator_${socket.id.slice(0, 4)}`, role: 'board', isHost: false });

  emitStateToSocket(socket, null, true, true, true);

  socket.on('game_message', (msg) => {
    if (!msg || typeof msg !== 'object') return;
    const client = connectedClients.get(socket.id);
    if (!client) return;

    switch (msg.type) {
      case 'ROSTER_JOIN': {
        const cleanUser = sanitizeName(msg.user || client.user);
        const targetRole = String(msg.role || 'board');
        client.user = cleanUser;

        if (targetRole === 'host') {
          const lockRecord = pinAttemptsByIp.get(clientIp) || { count: 0, lockUntil: 0 };
          if (Date.now() < lockRecord.lockUntil) {
            socket.emit('game_message', {
              type: 'AUTH_RESULT',
              success: false,
              lockedUntil: lockRecord.lockUntil
            });
            return;
          }

          const providedPin = String(msg.pin || '');
          if (client.isHost || providedPin === HOST_PIN) {
            const wasAlreadyHost = client.isHost;
            client.isHost = true;
            client.role = 'host';
            pinAttemptsByIp.delete(clientIp);
            rebuildRoster();
            if (!wasAlreadyHost) {
              addServerLog(`[AUTH] Host console accessed by ${cleanUser}.`);
            }
            socket.emit('game_message', {
              type: 'AUTH_RESULT',
              success: true,
              role: 'host',
              user: cleanUser,
              fullDeck: wasAlreadyHost ? undefined : authoritativeDeck
            });
            broadcastState(null, true, true, false);
          } else {
            lockRecord.count += 1;
            if (lockRecord.count >= 3) {
              lockRecord.lockUntil = Date.now() + 15 * 60 * 1000;
              lockRecord.count = 0;
              pinAttemptsByIp.set(clientIp, lockRecord);
              addServerLog(`[SECURITY] Excessive host PIN failures by ${cleanUser}. Terminal locked 15m.`);
              socket.emit('game_message', {
                type: 'AUTH_RESULT',
                success: false,
                lockedUntil: lockRecord.lockUntil
              });
              broadcastState();
            } else {
              pinAttemptsByIp.set(clientIp, lockRecord);
              socket.emit('game_message', {
                type: 'AUTH_RESULT',
                success: false,
                attempts: lockRecord.count
              });
            }
          }
          return;
        }

        client.isHost = false;
        client.role = ['blue', 'red', 'board', 'spectator'].includes(targetRole) ? targetRole : 'board';
        rebuildRoster();
        broadcastState();
        break;
      }

      case 'SELECT_TILE': {
        if (!gameState.isGameLaunched) return;
        if (gameState.phase !== 'SELECTION' && gameState.phase !== 'SELECTION_TIMEOUT') return;
        if (gameState.isShuffleRunning && !msg.fromRoulette) return;

        const canSelect = (client.role === gameState.selectingTeam) || (client.role === 'host' && client.isHost);
        if (!canSelect) return;

        const catIdx = Number(msg.catIdx);
        const clueIdx = Number(msg.clueIdx);
        if (
          !Number.isInteger(catIdx) || catIdx < 0 || catIdx >= authoritativeDeck.length ||
          !Number.isInteger(clueIdx) || clueIdx < 0 || clueIdx >= 5
        ) return;

        const key = `${catIdx}-${clueIdx}`;
        if (gameState.clearedClues.includes(key)) return;

        lockTileForHostConfirmation(catIdx, clueIdx, client.user);
        break;
      }

      case 'START_SHUFFLE_SCAN': {
        if (!gameState.isGameLaunched) return;
        if (gameState.phase !== 'SELECTION' && gameState.phase !== 'SELECTION_TIMEOUT') return;
        if (gameState.isShuffleRunning) return;
        const canTrigger = (client.role === gameState.selectingTeam) || (client.role === 'host' && client.isHost);
        if (!canTrigger) return;

        const availablePool = [];
        for (let c = 0; c < authoritativeDeck.length; c++) {
          for (let r = 0; r < 5; r++) {
            const key = `${c}-${r}`;
            if (!gameState.clearedClues.includes(key)) {
              availablePool.push({ catIdx: c, valIdx: r });
            }
          }
        }
        if (availablePool.length === 0) return;

        let chosenTarget = availablePool[Math.floor(Math.random() * availablePool.length)];
        if (msg.target && Number.isInteger(msg.target.catIdx) && Number.isInteger(msg.target.valIdx)) {
          const validMatch = availablePool.find(
            t => t.catIdx === msg.target.catIdx && t.valIdx === msg.target.valIdx
          );
          if (validMatch) chosenTarget = validMatch;
        }

        gameState.selectionTimerWasRunning = gameState.selectionTimerRunning;
        gameState.selectionTimerRunning = false;
        gameState.isShuffleRunning = true;
        addServerLog(`[DEFRAG SCAN] Sector roulette initiated by ${client.user}...`);
        broadcastState();

        io.emit('game_message', {
          type: 'START_SHUFFLE_SCAN',
          target: chosenTarget,
          pool: availablePool,
          caller: client.user,
          callerSocketId: socket.id
        });

        const callerName = client.user;
        if (shuffleFallbackTimeout) clearTimeout(shuffleFallbackTimeout);
        shuffleFallbackTimeout = setTimeout(() => {
          if (gameState.isShuffleRunning && gameState.isGameLaunched && (gameState.phase === 'SELECTION' || gameState.phase === 'SELECTION_TIMEOUT')) {
            lockTileForHostConfirmation(chosenTarget.catIdx, chosenTarget.valIdx, callerName);
          }
        }, 5750);
        break;
      }

      case 'SKIP_THINKING': {
        if (!gameState.isGameLaunched) return;
        if (gameState.phase !== 'THINKING' && gameState.phase !== 'STEAL_THINKING') return;
        const isAnswering = (client.role === gameState.turnSubmittingTeam) || (client.role === 'host' && client.isHost);
        if (!isAnswering) return;

        gameState.phase = (gameState.phase === 'STEAL_THINKING' || gameState.isStealPhase) ? 'STEAL_TYPING' : 'TYPING';
        gameState.timer = 15;
        gameState.timerRunning = true;
        addServerLog(`[READY TO ANSWER] ${gameState.turnSubmittingTeam.toUpperCase()} skipped thinking -> 15s Typing starts!`);
        broadcastState();
        break;
      }

      case 'TACTICAL_CHALLENGE': {
        if (!gameState.isGameLaunched) return;
        if (gameState.phase !== 'THINKING' || gameState.isTacticalGambleUsed) return;
        const defendingTeam = gameState.turnSubmittingTeam === 'blue' ? 'red' : 'blue';
        const canChallenge = (client.role === defendingTeam) || (client.role === 'host' && client.isHost);
        if (!canChallenge) return;

        gameState.isTacticalGambleUsed = true;
        gameState.challengerTeam = defendingTeam;
        gameState.tacticalAlert = {
          active: true,
          player: client.user,
          team: defendingTeam
        };
        gameState.phase = 'TYPING';
        gameState.timer = 15;
        gameState.timerRunning = true;

        addServerLog(`[⚠️ TACTICAL ALERT] TEAM ${defendingTeam.toUpperCase()} chose ANSWER OR SKIP by player: ${client.user}! 60s thinking aborted!`);
        broadcastState('tactical');

        if (tacticalAlertTimeout) clearTimeout(tacticalAlertTimeout);
        tacticalAlertTimeout = setTimeout(() => {
          if (gameState.tacticalAlert) {
            gameState.tacticalAlert.active = false;
            broadcastState();
          }
        }, 5000);
        break;
      }

      case 'LIVE_KEY': {
        if (!gameState.isGameLaunched) return;
        if (client.role !== gameState.turnSubmittingTeam) return;
        if (!['TYPING', 'STEAL_TYPING'].includes(gameState.phase)) return;
        const text = String(msg.liveDraft?.text || '').slice(0, 140);
        gameState.liveDraft = { author: client.user, text };
        io.emit('game_message', { type: 'LIVE_KEY', liveDraft: gameState.liveDraft });
        break;
      }

      case 'SUBMIT_ANSWER': {
        if (!gameState.isGameLaunched) return;
        if (client.role !== gameState.turnSubmittingTeam) return;
        if (!['TYPING', 'STEAL_TYPING'].includes(gameState.phase)) return;
        if (gameState.lockedSubmission) return;

        // Immediately dismiss any active 5s tactical alert banner so Host can judge unobstructed
        clearTacticalAlert();

        const rawText = String(msg.text ?? gameState.liveDraft.text ?? '').trim().slice(0, 140);
        const answerVal = rawText || "[NO ANSWER]";

        gameState.lockedSubmission = {
          team: gameState.turnSubmittingTeam,
          player: client.user,
          text: answerVal
        };
        gameState.phase = 'HOST_JUDGING';
        gameState.timerRunning = false;

        addServerLog(`[ANSWER SUBMITTED] by ${client.user} (${gameState.turnSubmittingTeam.toUpperCase()}): "${answerVal}"`);
        broadcastState();
        break;
      }

      case 'HOST_ACTION': {
        if (!client.isHost || client.role !== 'host') return;
        const { action, payload } = msg;

        switch (action) {
          case 'LAUNCH_MATCH': {
            if (gameState.isGameLaunched) return;
            if (payload?.user) {
              client.user = sanitizeName(payload.user);
              rebuildRoster();
            }
            clearPhaseTimers();
            clearTacticalAlert();
            gameState.isGameLaunched = true;
            gameState.isShuffleRunning = false;
            gameState.phase = 'SELECTION';
            gameState.selectionTimer = 20;
            gameState.selectionTimerRunning = false;
            gameState.selectionTimerWasRunning = false;
            addServerLog(`[MATCH LAUNCHED] Host ${client.user} opened cluster defragmentation matrix.`);
            broadcastState('correct');
            break;
          }

          case 'RESTART_TO_LOBBY': {
            clearPhaseTimers();
            clearTacticalAlert();
            gameState = createInitialGameState();
            gameState.isGameLaunched = false;
            rebuildRoster();
            gameState.logs = ["[RESTART] Match rebooted to Standby Lobby by Host."];
            addServerLog(`[LOBBY] Match returned to Standby Lobby. Sectors reset.`);
            broadcastState('stop_audio');
            break;
          }

          case 'CONFIRM_CLUE': {
            if (!gameState.isGameLaunched) return;
            if (gameState.phase !== 'HOST_CONFIRM' || !gameState.pendingHostClue) return;
            if (!payload?.confirmed) {
              gameState.pendingHostClue = null;
              gameState.isShuffleRunning = false;
              if (gameState.selectionTimer <= 0) {
                gameState.phase = 'SELECTION_TIMEOUT';
                gameState.selectionTimerRunning = false;
              } else {
                gameState.phase = 'SELECTION';
                gameState.selectionTimerRunning = Boolean(gameState.selectionTimerWasRunning);
              }
              addServerLog(`[HOST ABORT] Tile rejected. Selection timer ${gameState.selectionTimerRunning ? 'resumed' : 'kept paused'} at ${gameState.selectionTimer}s.`);
              broadcastState();
              return;
            }

            const { catIdx, clueIdx } = gameState.pendingHostClue;
            const fullClue = authoritativeDeck[catIdx].clues[clueIdx];

            gameState.activeClue = {
              catIdx,
              clueIdx,
              value: fullClue.value,
              q: fullClue.q,
              type: fullClue.type || 'text'
            };
            gameState.pendingHostClue = null;
            gameState.isShuffleRunning = false;
            gameState.turnSubmittingTeam = gameState.selectingTeam;
            gameState.isStealPhase = false;
            gameState.isTacticalGambleUsed = false;
            gameState.challengerTeam = null;
            gameState.liveDraft = { author: "", text: "" };
            gameState.lockedSubmission = null;

            addServerLog(`[CLUE BROADCAST] ${authoritativeDeck[catIdx].category} $${fullClue.value} confirmed by Host.`);

            if (gameState.activeClue.type === 'audio' || gameState.activeClue.type === 'image') {
              startServerMediaSequence();
            } else {
              startServerArcadeCountdown(true);
            }
            break;
          }

          case 'TOGGLE_SELECTION_TIMER': {
            if (!gameState.isGameLaunched || gameState.isShuffleRunning) return;
            const start = Boolean(payload?.start);
            gameState.selectionTimerRunning = start;
            if (start && gameState.phase === 'SELECTION_TIMEOUT') {
              if (gameState.selectionTimer <= 0) gameState.selectionTimer = 10;
              gameState.phase = 'SELECTION';
            }
            addServerLog(`[HOST] 20s Selection Timer ${start ? 'started' : 'paused'}.`);
            broadcastState();
            break;
          }

          case 'FORFEIT_SELECTION': {
            if (!gameState.isGameLaunched) return;
            clearPhaseTimers();
            gameState.isShuffleRunning = false;
            gameState.selectingTeam = gameState.selectingTeam === 'blue' ? 'red' : 'blue';
            gameState.selectionTimer = 20;
            gameState.selectionTimerRunning = false;
            gameState.selectionTimerWasRunning = false;
            gameState.phase = 'SELECTION';
            addServerLog(`[HOST] Selection forfeited. Turn passed to ${gameState.selectingTeam.toUpperCase()}.`);
            broadcastState();
            break;
          }

          case 'TOGGLE_THINKING_TIMER': {
            if (!gameState.isGameLaunched) return;
            if (!['THINKING', 'STEAL_THINKING', 'TYPING', 'STEAL_TYPING'].includes(gameState.phase)) return;
            if (gameState.timer <= 0) return;
            const start = Boolean(payload?.start);
            gameState.timerRunning = start;
            gameState.isPaused = false;
            addServerLog(`[HOST] Timer ${start ? 'started' : 'paused'}.`);
            broadcastState();
            break;
          }

          case 'PROCEED_TO_TYPING': {
            if (!gameState.isGameLaunched || !gameState.activeClue) return;
            clearPhaseTimers();
            gameState.phase = gameState.isStealPhase ? 'STEAL_TYPING' : 'TYPING';
            gameState.timer = 15;
            gameState.timerRunning = true;
            addServerLog(`[HOST] Advanced to 15s Typing Phase (${gameState.turnSubmittingTeam?.toUpperCase()}).`);
            broadcastState();
            break;
          }

          case 'FORCE_TIMEOUT_ANSWER': {
            if (!gameState.isGameLaunched || !gameState.activeClue) return;
            clearTacticalAlert();
            gameState.lockedSubmission = {
              team: gameState.turnSubmittingTeam,
              player: "SYSTEM_TIMEOUT",
              text: "[NO ANSWER / TIMEOUT]"
            };
            gameState.phase = 'HOST_JUDGING';
            gameState.timerRunning = false;
            addServerLog(`[HOST] Ruled as No Answer / Timeout.`);
            broadcastState();
            break;
          }

          case 'ADD_SECONDS': {
            if (!gameState.isGameLaunched) return;
            const sec = Number(payload?.sec) || 10;
            if (gameState.phase === 'SELECTION' || gameState.phase === 'SELECTION_TIMEOUT') {
              gameState.selectionTimer += sec;
              gameState.phase = 'SELECTION';
              gameState.selectionTimerRunning = true;
            } else {
              gameState.timer += sec;
              gameState.timerRunning = true;
              if (gameState.phase === 'THINKING_TIMEOUT') {
                gameState.phase = gameState.isStealPhase ? 'STEAL_THINKING' : 'THINKING';
              } else if (gameState.phase === 'TYPING_TIMEOUT') {
                gameState.phase = gameState.isStealPhase ? 'STEAL_TYPING' : 'TYPING';
              }
            }
            addServerLog(`[HOST] Added +${sec}s.`);
            broadcastState();
            break;
          }

          case 'AWARD_VERDICT': {
            if (!gameState.isGameLaunched || !gameState.activeClue) return;
            clearTacticalAlert();
            const isCorrect = Boolean(payload?.isCorrect);
            const clueVal = Number(gameState.activeClue.value) || 0;
            const answeringTeam = gameState.lockedSubmission ? gameState.lockedSubmission.team : gameState.turnSubmittingTeam;
            const otherTeam = answeringTeam === 'blue' ? 'red' : 'blue';

            if (isCorrect) {
              gameState.scores[answeringTeam] += clueVal;
              addServerLog(`[JUDGE: CORRECT] +$${clueVal} awarded to ${answeringTeam.toUpperCase()}!`);
              finishClueRound('correct');
            } else {
              addServerLog(`[JUDGE: INCORRECT] Submission by ${answeringTeam.toUpperCase()} ruled incorrect.`);
              if (gameState.isTacticalGambleUsed) {
                if (answeringTeam !== gameState.challengerTeam) {
                  gameState.turnSubmittingTeam = gameState.challengerTeam;
                  gameState.isStealPhase = true;
                  gameState.phase = 'STEAL_TYPING';
                  gameState.timer = 15;
                  gameState.timerRunning = true;
                  gameState.lockedSubmission = null;
                  gameState.liveDraft = { author: "", text: "" };
                  addServerLog(`[CHALLENGE STEAL] ${gameState.challengerTeam.toUpperCase()} has 15s to answer. (-$${clueVal} if missed)`);
                  broadcastState('incorrect');
                } else {
                  gameState.scores[gameState.challengerTeam] -= clueVal;
                  addServerLog(`[⚠️ FULL PENALTY] ${gameState.challengerTeam.toUpperCase()} failed tactical challenge (-$${clueVal})!`);
                  finishClueRound('incorrect');
                }
              } else {
                if (answeringTeam === gameState.selectingTeam) {
                  gameState.turnSubmittingTeam = otherTeam;
                  gameState.isStealPhase = true;
                  gameState.phase = 'STEAL_THINKING';
                  gameState.timer = 20;
                  gameState.timerRunning = false;
                  gameState.lockedSubmission = null;
                  gameState.liveDraft = { author: "", text: "" };
                  addServerLog(`[NORMAL STEAL] Opportunity shifts to ${otherTeam.toUpperCase()} (20s thinking, $0 miss).`);
                  broadcastState('incorrect');
                } else {
                  addServerLog(`[STEAL FAILED] Neither team answered correctly. $0 awarded.`);
                  finishClueRound('incorrect');
                }
              }
            }
            break;
          }

          case 'ABORT_CLUE': {
            if (!gameState.isGameLaunched) return;
            clearPhaseTimers();
            clearTacticalAlert();
            gameState.activeClue = null;
            gameState.pendingHostClue = null;
            gameState.lockedSubmission = null;
            gameState.liveDraft = { author: "", text: "" };
            gameState.isStealPhase = false;
            gameState.isTacticalGambleUsed = false;
            gameState.challengerTeam = null;
            gameState.isShuffleRunning = false;
            gameState.phase = 'SELECTION';
            gameState.selectionTimer = 20;
            gameState.selectionTimerRunning = false;
            gameState.selectionTimerWasRunning = false;
            addServerLog(`[HOST] Active clue aborted by Host. Returned to board.`);
            broadcastState('stop_audio');
            break;
          }

          case 'TOGGLE_PAUSE': {
            if (!gameState.isGameLaunched) return;
            gameState.isPaused = !gameState.isPaused;
            addServerLog(`[SYSTEM] Match ${gameState.isPaused ? 'PAUSED' : 'RESUMED'} by Host.`);
            broadcastState();
            break;
          }

          case 'VOID_SUBMISSION': {
            if (!gameState.isGameLaunched || !gameState.activeClue) return;
            clearTacticalAlert();
            gameState.lockedSubmission = null;
            gameState.liveDraft = { author: "", text: "" };
            gameState.phase = gameState.isStealPhase ? 'STEAL_TYPING' : 'TYPING';
            gameState.timer = 15;
            gameState.timerRunning = true;
            addServerLog(`[HOST VETO] Submission voided. 15s refunded to ${gameState.turnSubmittingTeam?.toUpperCase()}.`);
            broadcastState();
            break;
          }

          case 'UNDO_CLUE': {
            if (!gameState.isGameLaunched || !gameState.activeClue) return;
            clearPhaseTimers();
            clearTacticalAlert();
            gameState.phase = 'THINKING';
            gameState.timer = 60;
            gameState.timerRunning = false;
            gameState.turnSubmittingTeam = gameState.selectingTeam;
            gameState.lockedSubmission = null;
            gameState.liveDraft = { author: "", text: "" };
            gameState.isStealPhase = false;
            gameState.isTacticalGambleUsed = false;
            gameState.challengerTeam = null;
            addServerLog(`[UNDO] Host reverted clue back to 60s Thinking phase.`);
            broadcastState('stop_audio', false, true);
            break;
          }

          case 'ADJUST_SCORE': {
            const team = payload?.team === 'red' ? 'red' : 'blue';
            const delta = Number(payload?.delta) || 0;
            gameState.scores[team] += delta;
            addServerLog(`[OVERRIDE] Adjusted ${team.toUpperCase()} score by ${delta >= 0 ? '+' : ''}${delta}`);
            broadcastState();
            break;
          }

          case 'SET_SCORE': {
            const team = payload?.team === 'red' ? 'red' : 'blue';
            const val = Number(payload?.val) || 0;
            gameState.scores[team] = val;
            addServerLog(`[OVERRIDE] Host manually set ${team.toUpperCase()} balance to $${val}`);
            broadcastState();
            break;
          }

          case 'END_MATCH': {
            if (!gameState.isGameLaunched) return;
            clearPhaseTimers();
            clearTacticalAlert();
            gameState.isShuffleRunning = false;
            gameState.phase = 'GAME_OVER';
            gameState.timerRunning = false;
            gameState.selectionTimerRunning = false;
            addServerLog(`[HOST] Match concluded manually by Host.`);
            broadcastState('victory');
            break;
          }

          case 'RESET_MATCH': {
            clearPhaseTimers();
            clearTacticalAlert();
            const wasLaunched = gameState.isGameLaunched;
            gameState = createInitialGameState();
            gameState.isGameLaunched = wasLaunched;
            rebuildRoster();
            gameState.logs = ["[RESET] Match rebooted by Host. Board restored."];
            broadcastState('stop_audio');
            break;
          }

          case 'UPDATE_DECK': {
            const isRestore = Boolean(payload?.restoreDefault);
            if (isRestore) {
              authoritativeDeck = JSON.parse(JSON.stringify(DEFAULT_DECK));
              addServerLog(`[DECK] Factory default trivia deck restored by Host.`);
            } else if (Array.isArray(payload?.deck) && payload.deck.length === 6) {
              authoritativeDeck = sanitizeDeckStructure(payload.deck);
              addServerLog(`[DECK] Clue deck updated and synchronized across all terminals.`);
            }
            // Only send fullDeck back to Host if factory default was restored (avoids echoing 30MB uploads)
            broadcastState('correct', true, true, isRestore);
            break;
          }

          case 'REQUEST_FULL_DECK': {
            socket.emit('game_message', {
              type: 'DECK_SYNC',
              fullDeck: authoritativeDeck,
              publicDeck: getPublicDeck()
            });
            break;
          }
        }
        break;
      }

      case 'STATE_UPDATE': {
        if (!client.isHost || client.role !== 'host') return;
        const incoming = msg.state || {};
        const preservedRoster = gameState.roster;
        gameState = { ...gameState, ...incoming, roster: preservedRoster };
        broadcastState(msg.sfx || null);
        break;
      }
    }
  });

  socket.on('disconnect', () => {
    connectedClients.delete(socket.id);
    rebuildRoster();
    broadcastState();
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`MS-DOS Defrag Jeopardy v4.0.3 Server online on port ${PORT}`);
});
