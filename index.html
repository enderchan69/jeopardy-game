<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>MS-DOS DEFRAG JEOPARDY v4.0</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=VT323&display=swap" rel="stylesheet">
  <!-- SOCKET.IO CLIENT -->
  <script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
  
  <style>
    :root {
      --dos-blue: #0000A8;
      --dos-dark-blue: #000068;
      --dos-cyan: #55FFFF;
      --dos-yellow: #FFFF55;
      --dos-white: #FFFFFF;
      --dos-grey: #AAAAAA;
      --dos-dark-grey: #555555;
      --dos-ribbon: #B0B0B0;
      --dos-red: #FF4444;
      --dos-magenta: #FF55FF;
      --dos-green: #55FF55;
    }

    body {
      background-color: var(--dos-blue);
      color: var(--dos-white);
      font-family: 'Share Tech Mono', 'VT323', monospace;
      margin: 0;
      padding: 0;
      user-select: none;
      -webkit-font-smoothing: none;
      overflow-x: hidden;
    }

    /* Subtle CRT Scanline overlay */
    .crt::after {
      content: " ";
      display: block;
      position: fixed;
      top: 0; left: 0; bottom: 0; right: 0;
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.28) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
      z-index: 99;
      background-size: 100% 3px, 3px 100%;
      pointer-events: none;
      opacity: 0.6;
    }

    /* Authentic DOS UI boxes */
    .dos-box {
      border: 2px solid var(--dos-cyan);
      box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.65);
      background-color: var(--dos-blue);
    }

    .dos-box-yellow {
      border: 2px solid var(--dos-yellow);
      box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.65);
      background-color: var(--dos-blue);
    }

    .dos-box-red {
      border: 2px solid var(--dos-red);
      box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.65);
      background-color: var(--dos-blue);
    }

    /* Retro DOS Buttons */
    .dos-btn {
      background-color: #000078;
      border: 2px solid var(--dos-cyan);
      color: var(--dos-white);
      font-weight: bold;
      transition: all 0.06s;
      cursor: pointer;
      text-transform: uppercase;
      outline: none;
    }
    .dos-btn:hover {
      background-color: var(--dos-cyan);
      color: #000055;
    }
    .dos-btn:active {
      transform: translate(2px, 2px);
      box-shadow: none;
    }
    .dos-btn-yellow { border-color: var(--dos-yellow); color: var(--dos-yellow); }
    .dos-btn-yellow:hover { background-color: var(--dos-yellow); color: #000055; }
    .dos-btn-red { border-color: var(--dos-red); color: var(--dos-red); }
    .dos-btn-red:hover { background-color: var(--dos-red); color: #FFFFFF; }
    .dos-btn-green { border-color: var(--dos-green); color: var(--dos-green); }
    .dos-btn-green:hover { background-color: var(--dos-green); color: #000055; }
    .dos-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
      border-color: var(--dos-dark-grey);
      color: var(--dos-grey);
      background-color: #000038;
      transform: none !important;
    }

    /* Blinking terminal cursor */
    @keyframes blink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
    .dos-cursor {
      display: inline-block;
      width: 9px;
      height: 18px;
      background-color: var(--dos-yellow);
      vertical-align: middle;
      animation: blink 0.75s infinite;
    }

    /* Arcade Pulse */
    @keyframes arcadePulse {
      0% { transform: scale(0.7); opacity: 0; }
      50% { transform: scale(1.15); opacity: 1; }
      100% { transform: scale(1.0); opacity: 1; }
    }
    .pulse-arcade { animation: arcadePulse 0.4s ease-out; }

    ::-webkit-scrollbar { width: 10px; height: 10px; background: #000050; }
    ::-webkit-scrollbar-thumb { background: var(--dos-cyan); }
  </style>
</head>
<body class="crt min-h-screen flex flex-col justify-between selection:bg-yellow-300 selection:text-black">

  <!-- ========================================== -->
  <!-- 1. TOP SYSTEM MENU RIBBON (NORTON STYLE)   -->
  <!-- ========================================== -->
  <header class="bg-[#B0B0B0] text-black px-3 py-1 flex flex-wrap justify-between items-center text-xs sm:text-sm font-bold border-b-2 border-black tracking-wider select-none z-30">
    <div class="flex items-center space-x-3 sm:space-x-4">
      <span class="hover:bg-black hover:text-[#B0B0B0] px-1 cursor-pointer" onclick="openDeckModal()"><span class="text-red-700">M</span>ain Menu</span>
      <span class="hover:bg-black hover:text-[#B0B0B0] px-1 cursor-pointer" onclick="triggerHostPause()"><span class="text-red-700">S</span>ystem [PAUSE: F2]</span>
      <span class="text-blue-900 bg-blue-200 px-1.5 py-0.5 border border-blue-900 font-mono">ROOM: #DEFRAG-40</span>
      <span class="hidden md:inline text-black">SECTORS: <span id="headerTilesLeft" class="text-blue-900">30/30</span></span>
    </div>

    <!-- Active View Switcher / Session Badge / Host & Spectator Readouts -->
    <div class="flex items-center space-x-2 sm:space-x-3 text-xs">
      <span class="bg-black text-yellow-300 px-2 py-0.5 border border-yellow-400 font-mono">HOST: <span id="headerHostName">None</span></span>
      <span class="bg-black text-green-300 px-2 py-0.5 border border-green-400 font-mono">SPECS: <span id="headerSpectatorCount">0</span></span>
      <span id="playerRolePill" class="hidden sm:inline bg-black text-cyan-300 px-2 py-0.5 border border-cyan-400 font-mono">ROLE: UNASSIGNED</span>
      <button onclick="openLobbyModal()" class="bg-[#000080] text-white px-2 py-0.5 border border-black hover:bg-black hover:text-cyan-300 font-mono">[ 🔄 SWITCH ROLE ]</button>
      <button onclick="resetClientSession()" class="bg-[#780000] text-white px-2 py-0.5 border border-black hover:bg-red-600 font-mono">[ 🔄 RESET CACHE ]</button>
      <span id="dosClock" class="text-black font-mono font-bold">12:00:00</span>
    </div>
  </header>

  <!-- ========================================== -->
  <!-- 2. MAIN APPLICATION CONTAINER              -->
  <!-- ========================================== -->
  <main class="flex-1 p-2 sm:p-3 max-w-7xl w-full mx-auto flex flex-col justify-between">

    <!-- SUB-BAR / STATUS TELEMETRY -->
    <div class="flex flex-wrap justify-between items-center border border-cyan-400 bg-[#000078] px-2.5 py-1 mb-2 text-xs sm:text-sm">
      <div class="flex items-center space-x-2">
        <span class="text-yellow-300 font-bold">TURN AUTHORITY:</span>
        <span id="turnIndicatorBadge" class="px-2 py-0.5 font-bold uppercase border border-cyan-400 bg-cyan-950 text-cyan-300">TEAM BLUE (SELECTING)</span>
        <span id="turnTimerBadge" class="text-yellow-300 font-mono font-bold ml-1 sm:ml-2">[ 20s PAUSED ]</span>
      </div>

      <!-- Minimized Clue Floating Indicator (Visible if Clue Stage is Minimized) -->
      <div id="minimizedClueBanner" class="hidden items-center space-x-2 bg-yellow-400 text-black px-2 py-0.5 border border-black font-bold font-mono text-xs">
        <span>ACTIVE CLUE: <span id="minimizedClueTitle">--</span></span>
        <button onclick="toggleClueMinimize(false)" class="bg-black text-yellow-300 px-1.5 py-0.2 hover:bg-gray-800">[ 🗖 EXPAND CLUE ]</button>
      </div>

      <div id="gameStatusAlert" class="text-cyan-200 truncate max-w-sm sm:max-w-md hidden sm:block">SYSTEM INTEGRITY 100% // FAT CLUSTERS VERIFIED</div>
      <div class="flex items-center space-x-2 sm:space-x-3">
        <button onclick="toggleAudioMute()" id="muteBtn" class="text-xs text-yellow-300 hover:underline">[ 🔊 AUDIO: ON ]</button>
        <button onclick="openDeckModal()" class="text-xs text-cyan-300 hover:underline">[ 📁 DECK MANAGER ]</button>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- VIEW A: MAIN INTERACTIVE BOARD VIEW                      -->
    <!-- ======================================================== -->
    <div id="viewBoard" class="flex flex-col gap-2 flex-1">
      
      <!-- TOP SCORE & MATCH TELEMETRY -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
        
        <!-- TEAM BLUE TERMINAL WITH LIVE ROSTER -->
        <div id="hudBlueBox" class="dos-box p-2 transition-colors border-cyan-400">
          <div class="flex justify-between items-center border-b border-cyan-400 pb-1 mb-1">
            <span class="text-cyan-300 font-bold tracking-widest text-xs sm:text-sm">┌─ TEAM BLUE [SECTOR 01] ─┐</span>
            <span id="badgeBlueActive" class="text-[10px] bg-cyan-400 text-black font-bold px-1.5 hidden">ACTIVE</span>
          </div>
          <div class="flex justify-between items-end">
            <div>
              <div class="text-[10px] text-gray-300">STORED ASSETS:</div>
              <div id="boardBlueScore" class="text-2xl sm:text-3xl font-bold text-yellow-300 font-mono">$ 0</div>
            </div>
            <div class="text-right text-xs text-cyan-200">
              <div>STATUS: <span id="boardBlueStatus" class="text-white font-bold">STANDBY</span></div>
              <div class="text-[10px] text-gray-400">STRICT ALTERNATION</div>
            </div>
          </div>
          <div class="text-[11px] text-cyan-200 mt-1 border-t border-cyan-800 pt-1 font-mono truncate">
            PLAYERS: <span id="boardBlueRoster" class="text-white font-bold">(None connected)</span>
          </div>
        </div>

        <!-- CENTER STAKES & CLOCK TELEMETRY (DYNAMIC TIMELINE MONITOR) -->
        <div class="dos-box p-2 flex flex-col justify-center items-center text-center bg-[#000068] border-yellow-300">
          <div class="text-xs text-yellow-300 font-bold">── TIMELINE MONITOR ──</div>
          <div id="boardPhaseClock" class="text-3xl sm:text-4xl font-mono font-bold text-white my-0.5">00:20</div>
          <div id="boardPhaseDesc" class="text-xs text-cyan-300 tracking-wider">TEAM BLUE CHOOSING A CLUSTER...</div>
        </div>

        <!-- TEAM RED TERMINAL WITH LIVE ROSTER -->
        <div id="hudRedBox" class="dos-box p-2 transition-colors border-red-400">
          <div class="flex justify-between items-center border-b border-red-400 pb-1 mb-1">
            <span class="text-red-400 font-bold tracking-widest text-xs sm:text-sm">┌─ TEAM RED [SECTOR 02] ─┐</span>
            <span id="badgeRedActive" class="text-[10px] bg-red-400 text-black font-bold px-1.5 hidden">ACTIVE</span>
          </div>
          <div class="flex justify-between items-end">
            <div>
              <div class="text-[10px] text-gray-300">STORED ASSETS:</div>
              <div id="boardRedScore" class="text-2xl sm:text-3xl font-bold text-yellow-300 font-mono">$ 0</div>
            </div>
            <div class="text-right text-xs text-red-200">
              <div>STATUS: <span id="boardRedStatus" class="text-white font-bold">STANDBY</span></div>
              <div class="text-[10px] text-gray-400">DEFENDING TACTICAL</div>
            </div>
          </div>
          <div class="text-[11px] text-red-200 mt-1 border-t border-red-800 pt-1 font-mono truncate">
            PLAYERS: <span id="boardRedRoster" class="text-white font-bold">(None connected)</span>
          </div>
        </div>
      </div>

      <!-- MAIN JEOPARDY DEFRAG CLUSTER MATRIX (6 x 5) -->
      <div class="dos-box p-2 flex-1 flex flex-col">
        <div class="flex justify-between items-center mb-1 text-xs border-b border-cyan-400 pb-1">
          <span class="text-yellow-300 font-bold">╔══ DATA DRIVE D: CLUSTER MATRIX [6x5 DISK SECTORS] ══╗</span>
          <span id="boardActionAttribution" class="text-cyan-300 text-xs truncate">READY FOR CATEGORY SELECTION</span>
        </div>

        <div id="boardCategoryHeaders" class="grid grid-cols-6 gap-1 sm:gap-2 mb-1 text-center font-bold text-xs sm:text-sm"></div>
        <div id="boardTilesGrid" class="grid grid-cols-6 gap-1 sm:gap-2 flex-1 font-mono text-center"></div>
      </div>

      <!-- PERSISTENT DIRECT INPUT BAR (SYNCED WITH POPUP INPUT) -->
      <div id="persistentInputContainer" class="dos-box p-2 bg-[#000078] transition-colors border-cyan-400">
        <div class="flex justify-between items-center text-xs text-yellow-300 font-bold border-b border-cyan-400 pb-1 mb-1.5">
          <span id="persistentBarTitle">─ SQUADRON TRANSMISSION TERMINAL ─</span>
          <span id="persistentLiveTyperBadge" class="text-red-400 font-mono text-[11px] animate-pulse hidden">● LIVE TEAM DRAFT</span>
        </div>

        <div id="persistentDraftRow" class="text-xs text-cyan-300 mb-1 flex items-center space-x-1 font-mono">
          <span>&gt;</span>
          <span id="persistentLiveAuthor" class="text-yellow-300 font-bold">Drafting:</span>
          <span id="persistentLiveText" class="text-white truncate">...</span>
          <span class="dos-cursor"></span>
        </div>

        <div class="flex flex-wrap sm:flex-nowrap gap-2 items-center">
          <input type="text" id="persistentAnswerInput" placeholder="[ INPUT DISABLED — AWAITING YOUR SQUADRON'S TURN ]" disabled
                 class="bg-black text-white border-2 border-cyan-400 p-2 text-xs sm:text-sm font-mono flex-1 focus:outline-none focus:border-yellow-300 disabled:opacity-50 disabled:bg-[#000030]">
          
          <button onclick="submitAnswerFromAnywhere()" id="btnPersistentSubmit" disabled class="dos-btn dos-btn-green py-2 px-4 text-xs font-bold whitespace-nowrap">
            [ ↵ SUBMIT ANSWER ]
          </button>
          <button onclick="playerTriggerSkipThinking()" id="btnPersistentSkip" class="dos-btn dos-btn-yellow py-2 px-3 text-xs font-bold whitespace-nowrap hidden">
            [ ⏩ READY TO ANSWER ]
          </button>
          <button onclick="playerTriggerTacticalChallenge()" id="btnPersistentChallenge" class="dos-btn dos-btn-red py-2 px-3 text-xs font-bold whitespace-nowrap animate-pulse hidden">
            [ ⚠️ ANSWER OR SKIP! ]
          </button>
        </div>
      </div>

      <!-- BOTTOM DEFRAG TELEMETRY & SYSTEM LOGS -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
        <div class="dos-box p-2 bg-[#000078]">
          <div class="text-yellow-300 font-bold border-b border-cyan-400 pb-0.5 mb-1">─ SECTOR ESTIMATE ─</div>
          <div class="flex justify-between"><span>CURRENT STAKE:</span> <span id="telemetryValue" class="text-yellow-300 font-bold font-mono">$ 0</span></div>
          <div class="flex justify-between"><span>TACTICAL RISK:</span> <span id="telemetryRisk" class="text-green-400">NORMAL ($0 MISS)</span></div>
          <div class="flex justify-between"><span>LAST SELECTION:</span> <span id="telemetryLastPick" class="text-cyan-200 truncate">None</span></div>
        </div>

        <div class="dos-box p-2 bg-[#000078] flex flex-col justify-between">
          <div class="flex justify-between text-yellow-300 font-bold border-b border-cyan-400 pb-0.5">
            <span id="centerMeterTitle">─ MEDIA BUFFER METER ─</span>
            <span id="mediaPercentLabel" class="font-mono">0%</span>
          </div>
          <div id="segmentedAsciiBar" class="text-sm font-mono tracking-widest text-cyan-300 my-1 truncate">
            [░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]
          </div>
          <div class="flex justify-between text-[11px] text-gray-300">
            <span id="mediaStatusSub">IDLE - READY</span>
            <span id="mediaTimeSub">00:00 / 00:00</span>
          </div>
        </div>

        <div class="dos-box p-2 bg-[#000078] flex flex-col">
          <div class="text-yellow-300 font-bold border-b border-cyan-400 pb-0.5 mb-1">─ REALTIME SYSTEM LOGS ─</div>
          <div id="dosEventLogs" class="font-mono text-[11px] flex-1 overflow-hidden space-y-0.5 text-cyan-200">
            <div>[00:00] DEFRAG ENGINE ONLINE. Ready.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- VIEW B: SIMPLIFIED DYNAMIC HOST CONTROL PANEL (PIN: 1337) -->
    <!-- ======================================================== -->
    <div id="viewHost" class="hidden flex-col gap-3 flex-1">
      
      <!-- DYNAMIC HOST COMMAND CONSOLE -->
      <div class="dos-box p-3 bg-[#000060] border-yellow-300">
        <div class="text-yellow-300 font-bold text-sm border-b border-yellow-400 pb-1 mb-2 flex justify-between items-center">
          <span>─ ACTIVE MATCH COMMAND DESK ─</span>
          <span id="hostPhaseTitleBadge" class="bg-yellow-400 text-black px-2 py-0.5 text-xs font-mono font-bold uppercase">PHASE: SELECTION</span>
        </div>

        <div id="hostDynamicActionBox" class="p-3 bg-black border border-cyan-400 mb-3"></div>

        <div id="hostAnswerTelemetryBox" class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono border-t border-cyan-800 pt-2">
          <div class="p-2 bg-[#000040] border border-cyan-500">
            <div class="text-yellow-300 font-bold mb-1">CONFIDENTIAL OFFICIAL ANSWER (HOST ONLY):</div>
            <div id="hostSecretAnswerPreview" class="text-sm font-bold text-white">[ NO ACTIVE CLUE ]</div>
          </div>
          <div class="p-2 bg-[#000040] border border-cyan-500">
            <div class="text-cyan-300 font-bold mb-1">PLAYER SUBMISSION:</div>
            <div id="hostSubmittedAnswerPreview" class="text-sm font-bold text-yellow-300">[ WAITING FOR INPUT ]</div>
          </div>
        </div>
      </div>

      <!-- PERMANENT HOST UTILITIES & SCORE OVERRIDE -->
      <div class="dos-box p-3 bg-[#000078] border-cyan-400">
        <div class="text-yellow-300 font-bold text-xs border-b border-cyan-400 pb-1 mb-2 flex justify-between">
          <span>─ PERMANENT MATCH OVERRIDES & CONTROLS ─</span>
          <span class="text-gray-300 text-[11px]">MANUAL OVERRIDE DESK</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-3">
          <div class="border border-cyan-400 p-2 bg-[#000050]">
            <div class="text-cyan-300 font-bold mb-1">TEAM BLUE BALANCE</div>
            <div class="flex items-center space-x-2 mb-2">
              <span>SCORE:</span>
              <input type="number" id="hostOverrideBlueInput" class="bg-black text-yellow-300 border border-cyan-300 p-1 font-mono text-center w-28 text-sm" value="0">
              <button onclick="hostApplyManualScore('blue')" class="dos-btn text-xs px-2.5 py-1">[ SET ]</button>
            </div>
            <div class="flex flex-wrap gap-1">
              <button onclick="hostAdjustQuickScore('blue', 200)" class="dos-btn px-2 py-0.5">+200</button>
              <button onclick="hostAdjustQuickScore('blue', -200)" class="dos-btn px-2 py-0.5">-200</button>
              <button onclick="hostAdjustQuickScore('blue', 400)" class="dos-btn px-2 py-0.5">+400</button>
              <button onclick="hostAdjustQuickScore('blue', -400)" class="dos-btn px-2 py-0.5">-400</button>
            </div>
          </div>

          <div class="border border-red-400 p-2 bg-[#000050]">
            <div class="text-red-400 font-bold mb-1">TEAM RED BALANCE</div>
            <div class="flex items-center space-x-2 mb-2">
              <span>SCORE:</span>
              <input type="number" id="hostOverrideRedInput" class="bg-black text-yellow-300 border border-red-300 p-1 font-mono text-center w-28 text-sm" value="0">
              <button onclick="hostApplyManualScore('red')" class="dos-btn text-xs px-2.5 py-1">[ SET ]</button>
            </div>
            <div class="flex flex-wrap gap-1">
              <button onclick="hostAdjustQuickScore('red', 200)" class="dos-btn px-2 py-0.5">+200</button>
              <button onclick="hostAdjustQuickScore('red', -200)" class="dos-btn px-2 py-0.5">-200</button>
              <button onclick="hostAdjustQuickScore('red', 400)" class="dos-btn px-2 py-0.5">+400</button>
              <button onclick="hostAdjustQuickScore('red', -400)" class="dos-btn px-2 py-0.5">-400</button>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap justify-between items-center gap-2 pt-2 border-t border-cyan-800 text-xs">
          <div class="flex items-center space-x-2">
            <button onclick="triggerHostPause()" id="hostPauseBtn" class="dos-btn dos-btn-yellow px-3 py-1 font-bold">[ ⏸ PAUSE CLOCK ]</button>
            <button onclick="triggerHostVoidSubmission()" class="dos-btn dos-btn-red px-3 py-1 font-bold">[ ↩ VOID SUBMISSION ]</button>
            <button onclick="triggerHostUndoClue()" class="dos-btn px-2.5 py-1">[ 🔄 RE-OPEN CLUE ]</button>
          </div>
          <div class="flex items-center space-x-2">
            <button onclick="triggerHostEndMatch()" class="dos-btn dos-btn-yellow px-3 py-1">[ 🏆 END MATCH ]</button>
            <button onclick="triggerHostResetMatch()" class="dos-btn text-red-300 px-3 py-1">[ ⚠️ RESET MATCH ]</button>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- ======================================================== -->
  <!-- 3. RETRO MODALS & OVERLAYS                               -->
  <!-- ======================================================== -->

  <!-- MODAL 1: 5-SECOND TACTICAL CHALLENGE POPUP BANNER -->
  <div id="modalTacticalBanner" class="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 hidden">
    <div class="dos-box-red max-w-xl w-full p-4 sm:p-6 bg-[#320008] text-center shadow-2xl animate-pulse">
      <div class="text-red-400 font-mono text-sm sm:text-base font-bold mb-2">
        ╔═══════════════════════════════════════════════════════════╗<br>
        ║  [!] TACTICAL ALERT: ANSWER OR SKIP ACTIVATED!            ║<br>
        ╚═══════════════════════════════════════════════════════════╝
      </div>
      <div id="tacticalBannerTeam" class="text-xl sm:text-2xl font-bold font-mono text-yellow-300 my-2">
        TEAM RED HAS FORCED THE CLOCK!
      </div>
      <div class="text-sm sm:text-base font-mono text-white mb-2">
        TRIGGERED BY PLAYER: &gt;&gt; <span id="tacticalBannerPlayer" class="text-cyan-300 font-bold">Player</span> &lt;&lt;
      </div>
      <div class="p-2 border border-red-500 bg-black text-xs text-red-200 font-mono">
        [!] THINKING TIME ABORTED — 15 SECONDS TO ANSWER!
      </div>
    </div>
  </div>

  <!-- MODAL 2: HOST ANTI-MISCLICK CONFIRMATION DIALOG -->
  <div id="modalHostConfirm" class="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 hidden">
    <div class="dos-box-yellow max-w-md w-full p-4 bg-[#0000A8]">
      <div class="text-yellow-300 font-bold text-center border-b-2 border-yellow-400 pb-1 text-sm sm:text-base mb-3">
        ╔══ CONFIRM CLUE EXECUTION [HOST CHECK] ══╗
      </div>
      <div class="text-xs text-gray-200 space-y-2 mb-4 font-mono">
        <div>CATEGORY : <span id="confirmModalCategory" class="text-cyan-300 font-bold">GEOGRAPHY</span></div>
        <div>POINT STAKE: <span id="confirmModalValue" class="text-yellow-300 font-bold">$ 400</span></div>
        <div>CHOOSING SQUAD: <span id="confirmModalTeam" class="text-white font-bold">TEAM BLUE</span></div>
        <div>SELECTED BY: <span id="confirmModalPlayer" class="text-yellow-200 font-bold">Player</span></div>
        <div class="pt-2 border-t border-cyan-500 text-gray-300" id="confirmModalStatusText">
          Broadcast this cluster to all player terminals?
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-3" id="confirmModalHostButtons">
        <button onclick="hostConfirmClueExecution(true)" class="dos-btn dos-btn-green py-2 text-xs sm:text-sm font-bold">
          [ ENTER: REVEAL ]
        </button>
        <button onclick="hostConfirmClueExecution(false)" class="dos-btn dos-btn-red py-2 text-xs sm:text-sm font-bold">
          [ ESC: ABORT ]
        </button>
      </div>
      <div id="confirmModalNonHostNotice" class="text-center text-xs text-yellow-300 py-2 border border-yellow-400 bg-black hidden font-mono">
        [ WAITING FOR HOST TO VERIFY AND REVEAL CLUSTER... ]
      </div>
    </div>
  </div>

  <!-- MODAL 3: INTERACTIVE CLUE STAGE OVERLAY (SELF-CONTAINED ARENA) -->
  <div id="modalClueStage" class="fixed inset-0 bg-black/90 flex items-center justify-center p-2 sm:p-5 z-40 hidden">
    <div class="dos-box max-w-4xl w-full p-3 sm:p-5 bg-[#0000A8] flex flex-col justify-between max-h-[95vh] overflow-y-auto">
      
      <!-- STAGE HEADER WITH MINIMIZE / ABORT CONTROLS -->
      <div class="flex flex-wrap justify-between items-center border-b-2 border-cyan-400 pb-2 mb-2 sm:mb-3 gap-2">
        <div>
          <span id="stageCategoryName" class="text-cyan-300 font-bold text-sm sm:text-base">CATEGORY NAME</span>
          <span class="text-gray-400 mx-2">//</span>
          <span id="stageClueValue" class="text-yellow-300 font-mono font-bold text-base sm:text-xl">$ 400</span>
        </div>
        <div class="flex items-center space-x-2">
          <span id="stagePhaseBadge" class="text-xs bg-yellow-300 text-black font-bold px-2 py-0.5 uppercase">3-2-1 READY</span>
          <span id="stageTimerClock" class="text-xl sm:text-2xl font-mono font-bold text-white">00:60</span>
          
          <!-- Minimize & Abort Buttons -->
          <button onclick="toggleClueMinimize(true)" class="dos-btn px-2 py-0.5 text-xs text-yellow-300" title="Minimize to view board below">[ 🗕 MINIMIZE ]</button>
          <button onclick="hostAbortClueFromModal()" id="btnHostAbortClue" class="dos-btn dos-btn-red px-2 py-0.5 text-xs hidden" title="Cancel clue and return to board">[ ✕ ABORT CLUE ]</button>
        </div>
      </div>

      <!-- 3-2-1-GO ARCADE COUNTDOWN LAYER -->
      <div id="stageArcadeCountdown" class="my-6 text-center py-6">
        <div id="arcadeBigNumber" class="text-6xl sm:text-8xl font-mono font-bold text-yellow-300 pulse-arcade tracking-widest">3</div>
        <div class="text-xs sm:text-sm text-cyan-300 mt-3 tracking-widest">SYNCHRONIZING TERMINALS...</div>
      </div>

      <!-- CLUE CONTENT & INTERACTIVE ARENA LAYER -->
      <div id="stageContentLayer" class="hidden flex-col gap-3 my-1">
        
        <!-- MEDIA WRAPPER -->
        <div id="stageMediaContainer" class="hidden flex-col items-center justify-center border-2 border-cyan-300 p-2 bg-[#000060]">
          <img id="stageClueImage" src="" alt="Clue Photo" class="max-h-52 object-contain border border-white mb-2 hidden">
          <div id="stageClueAudioWrapper" class="w-full text-center hidden">
            <div class="text-yellow-300 text-xs font-mono mb-1 font-bold">─── RETRO AUDIO FREQUENCY DECODE ───</div>
            <div class="flex justify-center items-center space-x-1 text-cyan-300 font-mono text-sm py-1.5">
              <span>░▒▓█</span><span class="text-yellow-300">████▓▒</span><span>░▒▓█</span><span class="text-green-400">███▒░</span><span>░▒▓█</span>
            </div>
            <button onclick="replayAudioTrack()" class="dos-btn text-xs px-3 py-1">[ 🔁 REPLAY AUDIO TRACK ]</button>
          </div>
          <div class="w-full mt-2 font-mono text-xs">
            <div class="flex justify-between text-yellow-300 mb-0.5">
              <span>TRANSMISSION BUFFER:</span>
              <span id="stageMediaPct">0%</span>
            </div>
            <div id="stageMediaAscii" class="text-cyan-300 tracking-wider overflow-hidden truncate">
              [░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]
            </div>
          </div>
        </div>

        <!-- MAIN QUESTION TEXT -->
        <div class="p-3 sm:p-4 bg-[#000078] border-2 border-white text-center font-mono">
          <div class="text-xs text-yellow-300 mb-1 font-bold">── CLUE TRANSCRIPT ──</div>
          <div id="stageCluePrompt" class="text-base sm:text-xl font-bold text-white leading-relaxed">
            Clue question will be rendered here.
          </div>
        </div>

        <!-- DIRECT PLAYER INPUT SECTION (INSIDE THE POPUP!) -->
        <div class="dos-box p-2 bg-[#000060] border-cyan-400">
          <div class="flex justify-between text-xs text-yellow-300 border-b border-cyan-700 pb-1 mb-1 font-mono">
            <span id="modalInputSquadTitle">SQUADRON INPUT:</span>
            <span id="modalInputDraftBadge" class="text-red-400 animate-pulse font-bold">● LIVE TEAM DRAFT</span>
          </div>
          <div class="text-xs text-cyan-300 mb-1 truncate font-mono">
            &gt; <span id="modalDraftAuthor">Drafting:</span> <span id="modalDraftText" class="text-white font-bold">...</span><span class="dos-cursor"></span>
          </div>
          <div class="flex flex-wrap sm:flex-nowrap gap-2 items-center">
            <input type="text" id="modalStageAnswerInput" placeholder="[ INPUT DISABLED — AWAITING YOUR SQUADRON'S TURN ]" disabled
                   class="bg-black text-white border-2 border-cyan-400 p-2 text-xs sm:text-sm font-mono flex-1 focus:outline-none focus:border-yellow-300 disabled:opacity-50 disabled:bg-[#000030]">
            <button onclick="submitAnswerFromAnywhere()" id="btnModalStageSubmit" disabled class="dos-btn dos-btn-green py-2 px-3 text-xs font-bold whitespace-nowrap">
              [ ↵ SUBMIT ANSWER ]
            </button>
            <button onclick="playerTriggerSkipThinking()" id="btnModalStageSkip" class="dos-btn dos-btn-yellow py-2 px-3 text-xs font-bold whitespace-nowrap hidden">
              [ ⏩ READY TO ANSWER ]
            </button>
            <button onclick="playerTriggerTacticalChallenge()" id="btnModalStageChallenge" class="dos-btn dos-btn-red py-2 px-3 text-xs font-bold whitespace-nowrap animate-pulse hidden">
              [ ⚠️ ANSWER OR SKIP! ]
            </button>
          </div>
        </div>

        <!-- DIRECT HOST COMMAND SECTION (INSIDE THE POPUP!) -->
        <div id="modalHostCommandSection" class="p-2.5 bg-black border border-yellow-400 font-mono text-xs hidden">
          <div class="text-yellow-300 font-bold border-b border-gray-700 pb-1 mb-2 flex justify-between">
            <span>👑 HOST COMMAND DESK (POPUP CONTROLS)</span>
            <span id="modalHostSecretAnswer" class="text-yellow-300 font-bold">ANSWER: [ ... ]</span>
          </div>
          <div class="flex flex-wrap gap-2 items-center">
            <button onclick="hostToggleThinkingTimer(!gameState.timerRunning)" class="dos-btn dos-btn-green px-2.5 py-1 font-bold" id="btnModalHostPlayPause">
              [ ▶ START 60s TIMER ]
            </button>
            <button onclick="hostProceedToTyping()" class="dos-btn dos-btn-yellow px-2 py-1">[ ⚡ FORCE 15s TYPING ]</button>
            <button onclick="hostAddSeconds(10)" class="dos-btn px-2 py-1">[ +10s TIME ]</button>
            <div class="border-l border-gray-600 pl-2 flex gap-1.5">
              <button onclick="hostAwardVerdict(true)" class="dos-btn dos-btn-green px-2.5 py-1 font-bold">[ ✅ CORRECT ]</button>
              <button onclick="hostAwardVerdict(false)" class="dos-btn dos-btn-red px-2.5 py-1 font-bold">[ ❌ INCORRECT ]</button>
              <button onclick="triggerHostVoidSubmission()" class="dos-btn dos-btn-yellow px-2 py-1">[ ↩ VOID ]</button>
            </div>
          </div>
        </div>

      </div>

      <!-- STAGE FOOTER -->
      <div class="border-t border-cyan-400 pt-2 flex flex-wrap justify-between items-center text-xs text-gray-300 gap-2 mt-2">
        <div>ACTIVE SQUAD: <span id="stageActiveSquad" class="text-yellow-300 font-bold uppercase">TEAM BLUE</span></div>
        <div id="stageTacticalWarning" class="text-red-400 font-bold"></div>
        <div class="text-cyan-300">MS-DOS JEOPARDY v4.0</div>
      </div>
    </div>
  </div>

  <!-- MODAL 4: LOBBY & ROLE SELECTOR -->
  <div id="modalLobby" class="fixed inset-0 bg-black/90 flex items-center justify-center p-3 sm:p-4 z-50 hidden">
    <div class="dos-box-yellow max-w-md w-full p-4 sm:p-5 bg-[#0000A8]">
      <div class="text-yellow-300 font-bold text-center border-b-2 border-yellow-400 pb-1 text-sm sm:text-base mb-3">
        ╔══ SELECT MATCH TERMINAL & ROLE ══╗
      </div>

      <div class="space-y-3 font-mono text-xs">
        <div>
          <span class="text-gray-200">YOUR CALLSIGN / NAME:</span>
          <input type="text" id="lobbyPlayerNameInput" value="Operator_1" class="bg-black text-cyan-300 border-2 border-cyan-400 p-2 font-mono text-sm w-full mt-1 focus:outline-none">
        </div>

        <div class="text-gray-300 pt-1">CHOOSE TERMINAL ASSIGNMENT:</div>
        
        <div class="grid grid-cols-1 gap-2">
          <button onclick="joinRole('blue')" class="dos-btn py-2 text-cyan-300 border-cyan-400 font-bold flex justify-between px-3">
            <span>[ 🔵 JOIN TEAM BLUE ]</span>
            <span class="text-gray-400 text-[10px]">CYAN SQUADRON</span>
          </button>
          
          <button onclick="joinRole('red')" class="dos-btn py-2 text-red-400 border-red-400 font-bold flex justify-between px-3">
            <span>[ 🔴 JOIN TEAM RED ]</span>
            <span class="text-gray-400 text-[10px]">CRIMSON SQUADRON</span>
          </button>

          <button onclick="joinRole('board')" class="dos-btn dos-btn-yellow py-2 font-bold">
            [ 🖥️ SPECTATOR / BOARD VIEW (DISCORD STREAM) ]
          </button>

          <div class="border-t border-cyan-500 pt-2 mt-1">
            <div class="text-[11px] text-yellow-300 mb-1">HOST ACCESS (PIN PROTECTED):</div>
            <div class="flex space-x-2">
              <input type="password" id="lobbyHostPinInput" placeholder="PIN (1337)" class="bg-black text-yellow-300 border border-yellow-400 p-1.5 text-center text-xs w-24">
              <button onclick="joinRole('host')" class="dos-btn flex-1 py-1 text-xs">
                [ 👑 ENTER HOST CONSOLE ]
              </button>
            </div>
          </div>
        </div>

        <div class="text-[10px] text-gray-400 border-t border-gray-700 pt-2">
          Note: You can switch between teams freely anytime.
        </div>
      </div>
    </div>
  </div>

  <!-- MODAL 5: BRUTE FORCE LOCKOUT DIALOG -->
  <div id="modalNahUhLockout" class="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-50 hidden">
    <div class="dos-box-red max-w-md w-full p-5 bg-[#000078] text-center font-mono">
      <div class="text-red-400 font-bold border-b-2 border-red-500 pb-1 text-sm mb-3">
        [!] SECURITY VIOLATION: AUTHENTICATION FAILED (3/3)
      </div>
      <div class="text-2xl text-yellow-300 font-bold my-3">
        Nah uh... You are not the Host.
      </div>
      <div class="p-3 bg-black border border-red-400 text-xs text-red-300 mb-3 leading-relaxed">
        TERMINAL LOCKED FOR 15 MINUTES.<br>
        TRY AGAIN AT: <span id="nahUhUnlockTime" class="text-white font-bold font-mono">12:15:00</span>
      </div>
      <button onclick="closeNahUhModal()" class="dos-btn px-4 py-1.5 text-xs">
        [ RETURN TO PLAYER TERMINAL ]
      </button>
    </div>
  </div>

  <!-- MODAL 6: MESSAGE MODAL -->
  <div id="modalDosMessage" class="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 hidden">
    <div class="dos-box-yellow max-w-sm w-full p-4 bg-[#0000A8] text-center font-mono text-xs">
      <div id="dosMessageTitle" class="text-yellow-300 font-bold border-b border-yellow-400 pb-1 mb-2">SYSTEM NOTICE</div>
      <div id="dosMessageBody" class="text-gray-200 my-3 leading-relaxed">Notification text</div>
      <div id="dosMessageActions" class="flex justify-center space-x-3 pt-2">
        <button onclick="closeDosMessageModal()" class="dos-btn px-4 py-1 text-xs font-bold">[ OK ]</button>
      </div>
    </div>
  </div>

  <!-- MODAL 7: DECK MANAGER -->
  <div id="modalDeckManager" class="fixed inset-0 bg-black/90 flex items-center justify-center p-2 sm:p-4 z-50 hidden">
    <div class="dos-box-yellow max-w-4xl w-full p-4 bg-[#0000A8] max-h-[92vh] flex flex-col justify-between">
      <div class="flex justify-between items-center border-b-2 border-yellow-400 pb-1 mb-2">
        <span class="text-yellow-300 font-bold text-sm sm:text-base">╔══ CLUE DECK MANAGER [FAT TABLE] ══╗</span>
        <button onclick="closeDeckModal()" class="text-red-400 font-bold hover:text-white text-xs">[ ESC: CLOSE ]</button>
      </div>
      <div class="flex flex-wrap gap-2 justify-between items-center text-xs mb-2 bg-[#000078] p-2 border border-cyan-400 font-mono">
        <div>Configure categories, prompts, secret answers & media URLs.</div>
        <div class="flex space-x-2">
          <button onclick="exportDeckToJson()" class="dos-btn dos-btn-yellow px-2 py-0.5">[ 💾 EXPORT JSON ]</button>
          <label class="dos-btn px-2 py-0.5 cursor-pointer">
            [ 📂 IMPORT JSON ]
            <input type="file" id="jsonDeckInput" accept=".json" onchange="importDeckFromJson(event)" class="hidden">
          </label>
          <button onclick="restoreDefaultDeck()" class="dos-btn px-2 py-0.5 text-cyan-300">[ 🔄 FACTORY DECK ]</button>
        </div>
      </div>
      <div id="deckCategoryTabs" class="flex flex-wrap gap-1 text-xs mb-2"></div>
      <div id="deckCluesEditor" class="flex-1 overflow-y-auto space-y-2 pr-1 text-xs font-mono"></div>
      <div class="border-t border-cyan-400 pt-2 mt-2 flex justify-between items-center text-xs">
        <span class="text-gray-400">Total Sectors: 30 / 30</span>
        <button onclick="saveAndApplyDeckChanges()" class="dos-btn dos-btn-green px-4 py-1.5 font-bold">
          [ 💾 SAVE & APPLY DECK TO GAME ]
        </button>
      </div>
    </div>
  </div>

  <!-- MODAL 8: VICTORY CEREMONY -->
  <div id="modalVictory" class="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 hidden">
    <div class="dos-box-yellow max-w-xl w-full p-5 bg-[#0000A8] text-center font-mono">
      <div class="text-yellow-300 text-lg font-bold mb-2">
        ╔═══════════════════════════════════════════════════════╗<br>
        ║        GAME OVER // DEFRAG CEREMONY COMPLETE          ║<br>
        ╚═══════════════════════════════════════════════════════╝
      </div>
      <pre class="text-yellow-300 text-xs font-mono my-2 select-none leading-none">
        ___________
       '._==_==_=_.'
       .-\:      /-.
      | (|:.     |) |
       '-|:.     |-'
         \::.    /
          '::. .'
            ) (
          _.' '._
         `"""""""`
      </pre>
      <div id="victoryWinnerBanner" class="text-2xl sm:text-3xl font-bold text-white mb-2">CHAMPION: TEAM BLUE</div>
      <div id="victoryFinalScores" class="text-base sm:text-lg text-cyan-300 mb-3">FINAL ASSETS: BLUE: $0  │  RED: $0</div>
      <div class="flex justify-center space-x-3">
        <button onclick="triggerHostResetMatch(); closeVictoryModal();" class="dos-btn dos-btn-yellow px-5 py-1.5 font-bold">
          [ 🔄 PLAY AGAIN (RESET) ]
        </button>
        <button onclick="closeVictoryModal()" class="dos-btn px-4 py-1.5">[ CLOSE BANNER ]</button>
      </div>
    </div>
  </div>

  <!-- ========================================== -->
  <!-- 4. BOTTOM FUNCTION KEY RIBBON              -->
  <!-- ========================================== -->
  <footer class="bg-[#B0B0B0] text-black px-2 py-1 text-xs font-mono font-bold flex flex-wrap justify-between border-t-2 border-black select-none z-30">
    <div class="flex flex-wrap gap-2">
      <span class="hover:bg-black hover:text-white px-1 cursor-pointer" onclick="openDeckModal()">F1:Deck</span>
      <span class="hover:bg-black hover:text-white px-1 cursor-pointer" onclick="triggerHostPause()">F2:Pause</span>
      <span class="hover:bg-black hover:text-white px-1 cursor-pointer" onclick="quickSwitchView('board')">F3:Board</span>
      <span class="hover:bg-black hover:text-white px-1 cursor-pointer" onclick="quickSwitchView('host')">F4:Host</span>
      <span class="hover:bg-black hover:text-white px-1 cursor-pointer" onclick="joinRole('blue')">F5:TeamBlue</span>
      <span class="hover:bg-black hover:text-white px-1 cursor-pointer" onclick="joinRole('red')">F6:TeamRed</span>
    </div>
    <div class="text-gray-800">
      MS-DOS DEFRAG ENGINE v4.0 &bull; NORTON UTILITIES SIMULATOR
    </div>
  </footer>

  <!-- ========================================== -->
  <!-- 5. JAVASCRIPT GAME ENGINE                  -->
  <!-- ========================================== -->
  <script>
    /* -------------------------------------------------------------
       AUDIO SYNTHESIZER
    -------------------------------------------------------------- */
    let audioCtx = null;
    let isSoundMuted = false;

    function initAudio() {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    function playTone(freq, duration = 0.08, type = 'square', gainVal = 0.1) {
      if (isSoundMuted) return;
      try {
        initAudio();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch (e) {}
    }

    window.sfxKeyClick = function() { playTone(550 + Math.random() * 200, 0.02, 'triangle', 0.04); };
    window.sfxCountdown = function(val) {
      if (val > 0) playTone(440, 0.12, 'square', 0.18);
      else { playTone(880, 0.22, 'square', 0.2); setTimeout(() => playTone(1174, 0.35, 'square', 0.2), 60); }
    };
    window.sfxCorrect = function() {
      playTone(523.25, 0.1, 'square', 0.15);
      setTimeout(() => playTone(659.25, 0.1, 'square', 0.15), 100);
      setTimeout(() => playTone(783.99, 0.1, 'square', 0.15), 200);
      setTimeout(() => playTone(1046.50, 0.25, 'square', 0.2), 300);
    };
    window.sfxIncorrect = function() {
      playTone(180, 0.2, 'sawtooth', 0.25);
      setTimeout(() => playTone(130, 0.3, 'sawtooth', 0.25), 150);
    };
    window.sfxTacticalAlert = function() {
      playTone(900, 0.15, 'sawtooth', 0.25);
      setTimeout(() => playTone(700, 0.15, 'sawtooth', 0.25), 140);
      setTimeout(() => playTone(900, 0.15, 'sawtooth', 0.25), 280);
      setTimeout(() => playTone(700, 0.15, 'sawtooth', 0.25), 420);
    };
    window.sfxVictory = function() {
      const notes = [523, 523, 523, 659, 783, 659, 783, 1046];
      notes.forEach((f, i) => setTimeout(() => playTone(f, 0.18, 'square', 0.15), i * 150));
    };
    window.toggleAudioMute = function() {
      isSoundMuted = !isSoundMuted;
      document.getElementById('muteBtn').innerText = isSoundMuted ? '[ 🔇 AUDIO: OFF ]' : '[ 🔊 AUDIO: ON ]';
    };

    /* -------------------------------------------------------------
       DEFAULT DECK CONFIGURATION
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

    /* -------------------------------------------------------------
       STATE MANAGEMENT & MULTI-DEVICE SOCKET ENGINE
    -------------------------------------------------------------- */
    const socket = (typeof io !== 'undefined') ? io() : null;

    let myRole = localStorage.getItem('dos_player_role') || 'board';
    let myPlayerName = localStorage.getItem('dos_player_name') || ("Operator_" + Math.floor(100 + Math.random() * 900));
    let hostPin = '1337';
    let isHostAuthenticated = (localStorage.getItem('dos_is_host') === 'true');
    let isClueMinimized = false;

    let gameDeck = JSON.parse(localStorage.getItem('dos_jeopardy_deck') || JSON.stringify(DEFAULT_DECK));

    let gameState = {
      scores: { blue: 0, red: 0 },
      selectingTeam: 'blue',
      selectionTimer: 20,
      selectionTimerRunning: false,
      clearedClues: [],
      phase: 'SELECTION', // 'SELECTION', 'SELECTION_TIMEOUT', 'HOST_CONFIRM', 'COUNTDOWN', 'MEDIA_PLAYING', 'THINKING', 'THINKING_TIMEOUT', 'TYPING', 'TYPING_TIMEOUT', 'STEAL_THINKING', 'STEAL_TYPING', 'HOST_JUDGING', 'GAME_OVER'
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
      logs: ["[00:00:00] MS-DOS DEFRAG ENGINE v4.0 READY. Render Socket Online."],
      roster: { host: null, blue: [], red: [], spectators: [] }
    };

    function syncState(broadcastSound = null) {
      renderAll();
      const payload = { type: 'STATE_UPDATE', state: gameState, sfx: broadcastSound };
      if (socket && socket.connected) {
        socket.emit('game_message', payload);
      }
    }

    if (socket) {
      socket.on('connect', () => {
        socket.emit('game_message', { type: 'ROSTER_JOIN', user: myPlayerName, role: myRole });
      });

      socket.on('game_message', (data) => {
        if (!data) return;
        if (data.type === 'STATE_UPDATE') {
          gameState = data.state;
          if (data.sfx === 'tactical') window.sfxTacticalAlert();
          if (data.sfx === 'correct') window.sfxCorrect();
          if (data.sfx === 'incorrect') window.sfxIncorrect();
          if (data.sfx === 'victory') window.sfxVictory();
          renderAll();
        } else if (data.type === 'LIVE_KEY') {
          gameState.liveDraft = data.liveDraft;
          renderLiveTypingDrafts();
        }
      });
    }

    window.resetClientSession = function() {
      if (confirm("Reset callsign, role, and PIN lockout cache?")) {
        localStorage.clear();
        location.reload();
      }
    };

    /* -------------------------------------------------------------
       CUSTOM RETRO DOS MODAL DIALOGS
    -------------------------------------------------------------- */
    window.showDosModal = function(title, body, onConfirm = null, onCancel = null) {
      document.getElementById('dosMessageTitle').innerText = title;
      document.getElementById('dosMessageBody').innerText = body;
      const actions = document.getElementById('dosMessageActions');

      if (onConfirm && onCancel) {
        actions.innerHTML = `
          <button id="modalBtnConfirm" class="dos-btn dos-btn-green px-4 py-1 text-xs font-bold">[ ENTER: CONFIRM ]</button>
          <button id="modalBtnCancel" class="dos-btn dos-btn-red px-4 py-1 text-xs font-bold">[ ESC: CANCEL ]</button>
        `;
        document.getElementById('modalBtnConfirm').onclick = () => { closeDosMessageModal(); onConfirm(); };
        document.getElementById('modalBtnCancel').onclick = () => { closeDosMessageModal(); onCancel(); };
      } else {
        actions.innerHTML = `<button onclick="closeDosMessageModal()" class="dos-btn px-5 py-1 text-xs font-bold">[ OK ]</button>`;
      }
      document.getElementById('modalDosMessage').classList.remove('hidden');
    };

    window.closeDosMessageModal = function() {
      document.getElementById('modalDosMessage').classList.add('hidden');
    };

    /* -------------------------------------------------------------
       ANTI-BRUTE-FORCE PIN LOCKOUT
    -------------------------------------------------------------- */
    function checkPinLockoutActive() {
      const lockoutUntil = parseInt(localStorage.getItem('dos_pin_lockout_until') || '0', 10);
      if (Date.now() < lockoutUntil) {
        const remainingDate = new Date(lockoutUntil).toTimeString().split(' ')[0];
        document.getElementById('nahUhUnlockTime').innerText = remainingDate;
        document.getElementById('modalNahUhLockout').classList.remove('hidden');
        return true;
      }
      return false;
    }

    window.closeNahUhModal = function() {
      document.getElementById('modalNahUhLockout').classList.add('hidden');
      switchViewRole('board');
    };

    function registerFailedPinAttempt() {
      let attempts = parseInt(localStorage.getItem('dos_pin_failed_attempts') || '0', 10) + 1;
      localStorage.setItem('dos_pin_failed_attempts', attempts);

      if (attempts >= 3) {
        const lockUntil = Date.now() + 15 * 60 * 1000;
        localStorage.setItem('dos_pin_lockout_until', lockUntil);
        localStorage.setItem('dos_pin_failed_attempts', '0');
        window.sfxIncorrect();
        checkPinLockoutActive();
        addEventLog("[SECURITY] Excessive host PIN failures. Terminal locked 15m.");
      } else {
        window.sfxIncorrect();
        window.showDosModal("ACCESS DENIED", `Invalid Host Master PIN. Attempt ${attempts} of 3 before lockout.`);
      }
    }

    /* -------------------------------------------------------------
       ROLE MANAGEMENT WITH ACCURATE SOCKET ROSTER REGISTRATION
    -------------------------------------------------------------- */
    window.openLobbyModal = function() {
      window.sfxKeyClick();
      document.getElementById('lobbyPlayerNameInput').value = myPlayerName;
      document.getElementById('modalLobby').classList.remove('hidden');
    };

    window.closeLobbyModal = function() {
      document.getElementById('modalLobby').classList.add('hidden');
    };

    window.joinRole = function(targetRole) {
      window.sfxKeyClick();
      const enteredName = document.getElementById('lobbyPlayerNameInput').value.trim();
      if (enteredName) {
        myPlayerName = enteredName;
        localStorage.setItem('dos_player_name', myPlayerName);
      }

      if (targetRole === 'host') {
        if (checkPinLockoutActive()) return;
        const pinEntered = document.getElementById('lobbyHostPinInput').value.trim();
        if (pinEntered === hostPin) {
          isHostAuthenticated = true;
          localStorage.setItem('dos_is_host', 'true');
          localStorage.setItem('dos_pin_failed_attempts', '0');
          window.sfxCorrect();
          closeLobbyModal();
          switchViewRole('host');
          addEventLog(`[AUTH] Host console accessed by ${myPlayerName}.`);
          return;
        } else {
          registerFailedPinAttempt();
          return;
        }
      }

      localStorage.setItem('dos_player_role', targetRole);
      closeLobbyModal();
      switchViewRole(targetRole);
    };

    window.quickSwitchView = function(role) {
      if (role === 'host' && !isHostAuthenticated) {
        openLobbyModal();
      } else {
        switchViewRole(role);
      }
    };

    function switchViewRole(role) {
      myRole = role;
      localStorage.setItem('dos_player_role', role);

      if (socket && socket.connected) {
        socket.emit('game_message', { type: 'ROSTER_JOIN', user: myPlayerName, role: myRole });
      }

      document.getElementById('viewBoard').classList.remove('hidden');
      const hostConsole = document.getElementById('viewHost');
      const pill = document.getElementById('playerRolePill');

      if (role === 'host') {
        hostConsole.classList.remove('hidden');
        pill.innerText = "ROLE: 👑 HOST MASTER";
        pill.className = "hidden sm:inline bg-black text-red-400 px-2 py-0.5 border border-red-500 font-mono";
      } else {
        hostConsole.classList.add('hidden');
        if (role === 'board') {
          pill.innerText = "ROLE: BOARD (SPECTATOR)";
          pill.className = "hidden sm:inline bg-black text-yellow-300 px-2 py-0.5 border border-yellow-400 font-mono";
        } else {
          pill.innerText = `ROLE: ${role === 'blue' ? '🔵 TEAM BLUE' : '🔴 TEAM RED'}`;
          pill.className = role === 'blue'
            ? "hidden sm:inline bg-black text-cyan-300 px-2 py-0.5 border border-cyan-400 font-mono"
            : "hidden sm:inline bg-black text-red-400 px-2 py-0.5 border border-red-400 font-mono";
        }
      }
      renderAll();
    }

    /* -------------------------------------------------------------
       AUTHORITATIVE HOST-ONLY TIMER CLOCK LOOP
    -------------------------------------------------------------- */
    setInterval(() => {
      const now = new Date();
      document.getElementById('dosClock').innerText = now.toTimeString().split(' ')[0];

      // ONLY the Host computes the active clock countdown
      if (myRole !== 'host') return;
      if (gameState.isPaused || gameState.phase === 'HOST_CONFIRM' || gameState.phase === 'GAME_OVER') return;

      // Selection Timer
      if (gameState.phase === 'SELECTION' && gameState.selectionTimerRunning) {
        if (gameState.selectionTimer > 0) {
          gameState.selectionTimer--;
          if (gameState.selectionTimer === 3) window.sfxCountdown(3);
          syncState();
        } else {
          gameState.selectionTimerRunning = false;
          gameState.phase = 'SELECTION_TIMEOUT';
          addEventLog(`[SELECTION EXPIRED] Time up for ${gameState.selectingTeam.toUpperCase()}. Awaiting Host.`);
          syncState();
        }
      }
      // Clue Timers (Thinking / Typing)
      else if (['THINKING', 'TYPING', 'STEAL_THINKING', 'STEAL_TYPING'].includes(gameState.phase) && gameState.timerRunning) {
        if (gameState.timer > 0) {
          gameState.timer--;
          if (gameState.timer <= 3 && gameState.timer > 0) window.sfxCountdown(gameState.timer);
          syncState();
        } else {
          gameState.timerRunning = false;
          if (gameState.phase === 'THINKING') gameState.phase = 'THINKING_TIMEOUT';
          else if (gameState.phase === 'TYPING' || gameState.phase === 'STEAL_TYPING') gameState.phase = 'TYPING_TIMEOUT';
          else if (gameState.phase === 'STEAL_THINKING') gameState.phase = 'THINKING_TIMEOUT';
          window.sfxIncorrect();
          addEventLog(`[TIME EXPIRED] Phase elapsed. Awaiting Host command.`);
          syncState();
        }
      }
    }, 1000);

    function addEventLog(msg) {
      const time = new Date().toTimeString().split(' ')[0];
      gameState.logs.unshift(`[${time}] ${msg}`);
      if (gameState.logs.length > 30) gameState.logs.pop();
      renderLogs();
    }

    function renderLogs() {
      const box = document.getElementById('dosEventLogs');
      if (!box) return;
      box.innerHTML = gameState.logs.slice(0, 5).map(l => `<div class="truncate">${escapeHtml(l)}</div>`).join('');
    }

    /* -------------------------------------------------------------
       RENDERING ENGINE
    -------------------------------------------------------------- */
    function renderAll() {
      renderBoardHUD();
      renderBoardGrid();
      renderPersistentInputBar();
      renderHostDashboard();
      renderHostConfirmModal();
      renderTacticalAlertModal();
      renderClueStage();
      renderLogs();
    }

    function renderBoardHUD() {
      document.getElementById('boardBlueScore').innerText = `$ ${gameState.scores.blue}`;
      document.getElementById('boardRedScore').innerText = `$ ${gameState.scores.red}`;

      // Update Live Rosters on Board
      const bluePlayers = gameState.roster?.blue || [];
      const redPlayers = gameState.roster?.red || [];
      document.getElementById('boardBlueRoster').innerText = bluePlayers.length > 0 ? bluePlayers.join(', ') : '(None connected)';
      document.getElementById('boardRedRoster').innerText = redPlayers.length > 0 ? redPlayers.join(', ') : '(None connected)';

      // Update Ribbon Host & Spectator telemetry
      document.getElementById('headerHostName').innerText = gameState.roster?.host || 'None';
      document.getElementById('headerSpectatorCount').innerText = (gameState.roster?.spectators || []).length;

      const isBlue = gameState.selectingTeam === 'blue';
      const hudBlue = document.getElementById('hudBlueBox');
      const hudRed = document.getElementById('hudRedBox');
      const badgeBlue = document.getElementById('badgeBlueActive');
      const badgeRed = document.getElementById('badgeRedActive');

      if (isBlue) {
        hudBlue.classList.add('border-yellow-300', 'bg-[#000080]');
        hudRed.classList.remove('border-yellow-300', 'bg-[#000080]');
        badgeBlue.classList.remove('hidden');
        badgeRed.classList.add('hidden');
        document.getElementById('boardBlueStatus').innerText = "CHOOSING";
        document.getElementById('boardRedStatus').innerText = "DEFENDING";
      } else {
        hudRed.classList.add('border-yellow-300', 'bg-[#000080]');
        hudBlue.classList.remove('border-yellow-300', 'bg-[#000080]');
        badgeRed.classList.remove('hidden');
        badgeBlue.classList.add('hidden');
        document.getElementById('boardRedStatus').innerText = "CHOOSING";
        document.getElementById('boardBlueStatus').innerText = "DEFENDING";
      }

      const turnBadge = document.getElementById('turnIndicatorBadge');
      turnBadge.innerText = `${gameState.selectingTeam.toUpperCase()} (SELECTING)`;
      turnBadge.className = isBlue
        ? "px-2 py-0.5 font-bold uppercase border border-cyan-400 bg-cyan-950 text-cyan-300"
        : "px-2 py-0.5 font-bold uppercase border border-red-400 bg-red-950 text-red-300";

      let timerBadgeText = `[ ${gameState.selectionTimer}s ${gameState.selectionTimerRunning ? 'RUNNING' : 'PAUSED'} ]`;
      if (gameState.phase === 'SELECTION_TIMEOUT') timerBadgeText = "[ 00s TIME EXPIRED — WAITING HOST ]";
      else if (gameState.phase !== 'SELECTION') timerBadgeText = `[ ${gameState.phase.replace('_', ' ')} ]`;
      document.getElementById('turnTimerBadge').innerText = timerBadgeText;

      // CRITICAL FIX: Synchronize the BIG CLOCK (TIMELINE MONITOR) in real-time
      const boardClock = document.getElementById('boardPhaseClock');
      const boardDesc = document.getElementById('boardPhaseDesc');

      if (gameState.phase === 'SELECTION' || gameState.phase === 'SELECTION_TIMEOUT') {
        const sec = gameState.selectionTimer;
        if (boardClock) boardClock.innerText = `00:${sec < 10 ? '0' : ''}${sec}`;
        if (boardDesc) {
          if (gameState.phase === 'SELECTION_TIMEOUT') {
            boardDesc.innerText = `[EXPIRED] WAITING FOR HOST COMMAND...`;
            boardDesc.className = "text-xs text-red-400 font-bold animate-pulse";
          } else if (gameState.selectionTimerRunning) {
            boardDesc.innerText = `TEAM ${gameState.selectingTeam.toUpperCase()} CHOOSING A CLUSTER...`;
            boardDesc.className = "text-xs text-cyan-300 tracking-wider";
          } else {
            boardDesc.innerText = `[PAUSED] WAITING FOR HOST TO START (20s)...`;
            boardDesc.className = "text-xs text-yellow-300 tracking-wider";
          }
        }
      } else {
        const sec = gameState.timer;
        if (boardClock) boardClock.innerText = `00:${sec < 10 ? '0' : ''}${sec}`;
        if (boardDesc) {
          boardDesc.innerText = `ACTIVE: ${gameState.turnSubmittingTeam ? gameState.turnSubmittingTeam.toUpperCase() : 'NONE'} (${gameState.phase.replace('_', ' ')})`;
          boardDesc.className = "text-xs text-yellow-300 tracking-wider";
        }
      }

      const activeVal = gameState.activeClue ? gameState.activeClue.value : 0;
      document.getElementById('telemetryValue').innerText = `$ ${activeVal}`;

      const riskLabel = document.getElementById('telemetryRisk');
      if (gameState.isTacticalGambleUsed) {
        riskLabel.innerText = `HIGH RISK (-$${activeVal} ON MISS)`;
        riskLabel.className = "text-red-400 font-bold animate-pulse";
      } else {
        riskLabel.innerText = "NORMAL ($0 MISS)";
        riskLabel.className = "text-green-400";
      }

      if (gameState.lastSelectionAttribution) {
        const att = gameState.lastSelectionAttribution;
        document.getElementById('telemetryLastPick').innerText = `${att.player} (${att.catName} $${att.val})`;
        document.getElementById('boardActionAttribution').innerText = `SELECTED BY: [${att.player} (${att.team.toUpperCase()})] -> [${att.catName} // $${att.val}]`;
      }

      const cleared = gameState.clearedClues.length;
      document.getElementById('headerTilesLeft').innerText = `${30 - cleared}/30`;
    }

    function renderBoardGrid() {
      const headersBox = document.getElementById('boardCategoryHeaders');
      const tilesBox = document.getElementById('boardTilesGrid');
      if (!headersBox || !tilesBox) return;

      headersBox.innerHTML = gameDeck.map((cat, i) => `
        <div class="bg-[#000060] border border-cyan-400 p-1 truncate text-yellow-300">
          <div class="text-[9px] text-gray-400">CAT 0${i + 1}</div>
          <div class="truncate uppercase text-xs">${escapeHtml(cat.category)}</div>
        </div>
      `).join('');

      let html = '';
      const values = [200, 400, 600, 800, 1000];
      const canClick = (myRole === gameState.selectingTeam || myRole === 'host') && 
                       (gameState.phase === 'SELECTION' || gameState.phase === 'SELECTION_TIMEOUT');

      values.forEach((val, valIdx) => {
        gameDeck.forEach((cat, catIdx) => {
          const key = `${catIdx}-${valIdx}`;
          const isCleared = gameState.clearedClues.includes(key);
          const clue = cat.clues[valIdx];

          if (isCleared) {
            html += `
              <div class="bg-[#00003c] border border-gray-700 text-gray-600 p-2 sm:p-3 flex items-center justify-center font-bold text-xs select-none">
                ░░░░
              </div>
            `;
          } else {
            html += `
              <button onclick="handleTileClick(${catIdx}, ${valIdx})" ${canClick ? '' : 'disabled style="pointer-events: none; opacity: 0.8;"'} 
                class="dos-btn p-2 sm:p-3 flex flex-col items-center justify-center font-bold text-xs sm:text-sm text-yellow-300 hover:scale-105 transition-transform ${canClick ? 'border-yellow-300' : 'border-cyan-400'}">
                <span>$ ${val}</span>
                <span class="text-[8px] text-cyan-300 font-normal">
                  ${clue.type === 'audio' ? '♫ AUDIO' : clue.type === 'image' ? '🖼 PHOTO' : 'TXT'}
                </span>
              </button>
            `;
          }
        });
      });

      tilesBox.innerHTML = html;
    }

    function renderPersistentInputBar() {
      const barTitle = document.getElementById('persistentBarTitle');
      const input = document.getElementById('persistentAnswerInput');
      const btnSubmit = document.getElementById('btnPersistentSubmit');
      const btnSkip = document.getElementById('btnPersistentSkip');
      const btnChallenge = document.getElementById('btnPersistentChallenge');

      const isAnsweringSquad = (myRole === gameState.turnSubmittingTeam);
      const isDefendingSquad = (myRole === (gameState.turnSubmittingTeam === 'blue' ? 'red' : 'blue'));

      const isTypingPhase = (gameState.phase === 'TYPING' || gameState.phase === 'STEAL_TYPING');
      const isThinkingPhase = (gameState.phase === 'THINKING' || gameState.phase === 'STEAL_THINKING');

      if (isAnsweringSquad && isTypingPhase) {
        barTitle.innerText = `─ SQUADRON ${myRole.toUpperCase()} INPUT [15s TYPING ACTIVE] ─`;
        input.disabled = !!gameState.lockedSubmission;
        input.placeholder = gameState.lockedSubmission ? "[ ANSWER LOCKED IN ]" : "Type your answer and press ENTER...";
        btnSubmit.disabled = !!gameState.lockedSubmission;
      } else if (isAnsweringSquad && isThinkingPhase) {
        barTitle.innerText = `─ SQUADRON ${myRole.toUpperCase()} INPUT [THINKING PHASE] ─`;
        input.disabled = true;
        input.placeholder = "[ 60s THINKING — DISCUSS WITH TEAM OR CLICK READY TO ANSWER ]";
        btnSubmit.disabled = true;
      } else {
        barTitle.innerText = `─ SQUADRON TRANSMISSION TERMINAL [STANDBY] ─`;
        input.disabled = true;
        input.placeholder = "[ INPUT DISABLED — AWAITING YOUR SQUADRON'S TURN ]";
        btnSubmit.disabled = true;
      }

      if (isAnsweringSquad && isThinkingPhase) btnSkip.classList.remove('hidden');
      else btnSkip.classList.add('hidden');

      if (isDefendingSquad && isThinkingPhase && !gameState.isTacticalGambleUsed) btnChallenge.classList.remove('hidden');
      else btnChallenge.classList.add('hidden');

      renderLiveTypingDrafts();
    }

    function renderLiveTypingDrafts() {
      const draft = gameState.liveDraft;
      const persistentAuthor = document.getElementById('persistentLiveAuthor');
      const persistentText = document.getElementById('persistentLiveText');
      const persistentBadge = document.getElementById('persistentLiveTyperBadge');

      const modalAuthor = document.getElementById('modalDraftAuthor');
      const modalText = document.getElementById('modalDraftText');
      const modalBadge = document.getElementById('modalInputDraftBadge');

      if (draft && draft.text) {
        if (persistentAuthor) persistentAuthor.innerText = `${draft.author}:`;
        if (persistentText) persistentText.innerText = draft.text;
        if (persistentBadge) persistentBadge.classList.remove('hidden');

        if (modalAuthor) modalAuthor.innerText = `${draft.author}:`;
        if (modalText) modalText.innerText = draft.text;
        if (modalBadge) modalBadge.classList.remove('hidden');
      } else {
        if (persistentAuthor) persistentAuthor.innerText = "Drafting:";
        if (persistentText) persistentText.innerText = "...";
        if (persistentBadge) persistentBadge.classList.add('hidden');

        if (modalAuthor) modalAuthor.innerText = "Drafting:";
        if (modalText) modalText.innerText = "...";
        if (modalBadge) modalBadge.classList.add('hidden');
      }
    }

    /* -------------------------------------------------------------
       SIMPLIFIED DYNAMIC HOST ACTION DESK
    -------------------------------------------------------------- */
    function renderHostDashboard() {
      const hostConsole = document.getElementById('viewHost');
      if (myRole !== 'host') {
        hostConsole.classList.add('hidden');
        return;
      }
      hostConsole.classList.remove('hidden');

      document.getElementById('hostPhaseTitleBadge').innerText = `PHASE: ${gameState.phase.replace('_', ' ')}`;
      const actionBox = document.getElementById('hostDynamicActionBox');

      const blueInput = document.getElementById('hostOverrideBlueInput');
      const redInput = document.getElementById('hostOverrideRedInput');
      if (document.activeElement !== blueInput) blueInput.value = gameState.scores.blue;
      if (document.activeElement !== redInput) redInput.value = gameState.scores.red;

      const pauseBtn = document.getElementById('hostPauseBtn');
      pauseBtn.innerText = gameState.isPaused ? "[ ▶ RESUME CLOCK ]" : "[ ⏸ PAUSE CLOCK ]";

      // Secret Answer Preview
      if (gameState.activeClue) {
        const cat = gameDeck[gameState.activeClue.catIdx];
        document.getElementById('hostSecretAnswerPreview').innerText = cat.clues[gameState.activeClue.clueIdx].a;
      } else if (gameState.pendingHostClue) {
        const cat = gameDeck[gameState.pendingHostClue.catIdx];
        document.getElementById('hostSecretAnswerPreview').innerText = cat.clues[gameState.pendingHostClue.clueIdx].a;
      } else {
        document.getElementById('hostSecretAnswerPreview').innerText = "[ NO ACTIVE CLUE ]";
      }

      // Submission Preview
      if (gameState.lockedSubmission) {
        document.getElementById('hostSubmittedAnswerPreview').innerText = `"${gameState.lockedSubmission.text}" by ${gameState.lockedSubmission.player} (${gameState.lockedSubmission.team.toUpperCase()})`;
      } else {
        document.getElementById('hostSubmittedAnswerPreview').innerText = "[ NO SUBMISSION YET ]";
      }

      let html = '';

      if (gameState.phase === 'SELECTION') {
        html = `
          <div class="text-xs text-yellow-300 font-bold mb-2">
            TURN: SQUADRON ${gameState.selectingTeam.toUpperCase()} IS CHOOSING A TILE (${gameState.selectionTimer}s remaining)
          </div>
          <div class="flex flex-wrap gap-2">
            ${gameState.selectionTimerRunning 
              ? `<button onclick="hostToggleSelectionTimer(false)" class="dos-btn dos-btn-yellow px-3 py-1.5">[ ⏸ PAUSE 20s TIMER ]</button>`
              : `<button onclick="hostToggleSelectionTimer(true)" class="dos-btn dos-btn-green px-3 py-1.5">[ ▶ START 20s SELECTION TIMER ]</button>`}
            <button onclick="hostAddSeconds(10)" class="dos-btn px-3 py-1.5">[ +10s TIME ]</button>
            <button onclick="hostForfeitSelection()" class="dos-btn dos-btn-red px-3 py-1.5">[ ⏩ PASS TURN TO ${gameState.selectingTeam === 'blue' ? 'RED' : 'BLUE'} ]</button>
          </div>
        `;
      } 
      else if (gameState.phase === 'SELECTION_TIMEOUT') {
        html = `
          <div class="text-xs text-red-400 font-bold mb-2 animate-pulse">
            ⚠️ 20s SELECTION TIME EXPIRED! ${gameState.selectingTeam.toUpperCase()} DID NOT PICK A TILE.
          </div>
          <div class="flex flex-wrap gap-2">
            <button onclick="hostForfeitSelection()" class="dos-btn dos-btn-red px-3 py-1.5 font-bold">[ ⏩ FORFEIT -> PASS TURN TO ${gameState.selectingTeam === 'blue' ? 'RED' : 'BLUE'} ]</button>
            <button onclick="hostAddSeconds(10)" class="dos-btn dos-btn-yellow px-3 py-1.5">[ +10s MORE TIME ]</button>
          </div>
        `;
      }
      else if (gameState.phase === 'HOST_CONFIRM') {
        const cat = gameDeck[gameState.pendingHostClue?.catIdx];
        html = `
          <div class="text-xs text-yellow-300 font-bold mb-2">
            ⚠️ TILE SELECTED: <span class="text-white">${cat?.category} $${gameState.pendingHostClue?.value}</span> by <span class="text-cyan-300">${gameState.lastSelectionAttribution?.player} (${gameState.selectingTeam.toUpperCase()})</span>
          </div>
          <div class="flex flex-wrap gap-3">
            <button onclick="hostConfirmClueExecution(true)" class="dos-btn dos-btn-green px-4 py-2 font-bold text-sm">[ ✅ CONFIRM & REVEAL CLUE (ENTER) ]</button>
            <button onclick="hostConfirmClueExecution(false)" class="dos-btn dos-btn-red px-4 py-2 font-bold text-sm">[ ❌ REJECT SELECTION (ESC) ]</button>
          </div>
        `;
      }
      else if (gameState.phase === 'THINKING') {
        html = `
          <div class="text-xs text-yellow-300 font-bold mb-2">
            🧠 60s THINKING PHASE FOR SQUADRON ${gameState.turnSubmittingTeam.toUpperCase()} (Clock: ${gameState.timer}s)
          </div>
          <div class="flex flex-wrap gap-2">
            ${gameState.timerRunning 
              ? `<button onclick="hostToggleThinkingTimer(false)" class="dos-btn dos-btn-yellow px-3 py-1.5">[ ⏸ PAUSE 60s TIMER ]</button>`
              : `<button onclick="hostToggleThinkingTimer(true)" class="dos-btn dos-btn-green px-3 py-1.5 font-bold">[ ▶ START 60s TIMER ]</button>`}
            <button onclick="hostProceedToTyping()" class="dos-btn dos-btn-yellow px-3 py-1.5">[ ⚡ FORCE 15s TYPING NOW ]</button>
            <button onclick="hostAddSeconds(10)" class="dos-btn px-3 py-1.5">[ +10s TIME ]</button>
          </div>
        `;
      }
      else if (gameState.phase === 'THINKING_TIMEOUT') {
        html = `
          <div class="text-xs text-red-400 font-bold mb-2 animate-pulse">
            ⚠️ 60s THINKING TIME EXPIRED!
          </div>
          <div class="flex flex-wrap gap-2">
            <button onclick="hostProceedToTyping()" class="dos-btn dos-btn-green px-4 py-1.5 font-bold">[ ⚡ PROCEED TO 15s TYPING ]</button>
            <button onclick="hostAddSeconds(10)" class="dos-btn dos-btn-yellow px-3 py-1.5">[ +10s MORE THINKING ]</button>
          </div>
        `;
      }
      else if (gameState.phase === 'TYPING' || gameState.phase === 'STEAL_TYPING') {
        html = `
          <div class="text-xs text-yellow-300 font-bold mb-2">
            ⌨️ 15s TYPING COUNTDOWN: SQUADRON ${gameState.turnSubmittingTeam.toUpperCase()} (Remaining: ${gameState.timer}s)
          </div>
          <div class="flex flex-wrap gap-2">
            <button onclick="hostToggleThinkingTimer(!gameState.timerRunning)" class="dos-btn dos-btn-yellow px-3 py-1.5">${gameState.timerRunning ? '[ ⏸ PAUSE ]' : '[ ▶ RESUME ]'}</button>
            <button onclick="hostAddSeconds(10)" class="dos-btn px-3 py-1.5">[ +10s TIME ]</button>
            <button onclick="hostForceTimeoutAnswer()" class="dos-btn dos-btn-red px-3 py-1.5">[ ⏰ FORCE TIMEOUT / NO ANSWER ]</button>
          </div>
        `;
      }
      else if (gameState.phase === 'TYPING_TIMEOUT') {
        html = `
          <div class="text-xs text-red-400 font-bold mb-2 animate-pulse">
            ⚠️ 15s TYPING EXPIRED WITH NO ANSWER LOCKED IN!
          </div>
          <div class="flex flex-wrap gap-2">
            <button onclick="hostForceTimeoutAnswer()" class="dos-btn dos-btn-red px-4 py-1.5 font-bold">[ ❌ RULE AS INCORRECT / TIMEOUT ]</button>
            <button onclick="hostAddSeconds(10)" class="dos-btn dos-btn-yellow px-3 py-1.5">[ +10s GRACE TIME ]</button>
          </div>
        `;
      }
      else if (gameState.phase === 'HOST_JUDGING') {
        html = `
          <div class="text-xs text-yellow-300 font-bold mb-2">
            ⚖️ VERDICT REQUIRED FOR SQUADRON ${gameState.lockedSubmission?.team.toUpperCase()}
          </div>
          <div class="flex flex-wrap gap-3">
            <button onclick="hostAwardVerdict(true)" class="dos-btn dos-btn-green px-4 py-2 font-bold text-sm">[ ✅ CORRECT (+$$$) ]</button>
            <button onclick="hostAwardVerdict(false)" class="dos-btn dos-btn-red px-4 py-2 font-bold text-sm">[ ❌ INCORRECT (NEXT/STEAL) ]</button>
            <button onclick="triggerHostVoidSubmission()" class="dos-btn dos-btn-yellow px-3 py-2 text-xs">[ ↩ VOID & REFUND 15s ]</button>
          </div>
        `;
      }
      else {
        html = `<div class="text-xs text-gray-300">SYSTEM IDLE // STANDBY</div>`;
      }

      actionBox.innerHTML = html;
    }

    function renderHostConfirmModal() {
      const modal = document.getElementById('modalHostConfirm');
      if (gameState.phase === 'HOST_CONFIRM' && gameState.pendingHostClue) {
        modal.classList.remove('hidden');
        const cat = gameDeck[gameState.pendingHostClue.catIdx];
        document.getElementById('confirmModalCategory').innerText = cat.category;
        document.getElementById('confirmModalValue').innerText = `$ ${gameState.pendingHostClue.value}`;
        document.getElementById('confirmModalTeam').innerText = gameState.selectingTeam.toUpperCase();
        document.getElementById('confirmModalPlayer').innerText = gameState.lastSelectionAttribution?.player || "Player";

        const hostBtns = document.getElementById('confirmModalHostButtons');
        const nonHostNotice = document.getElementById('confirmModalNonHostNotice');

        if (myRole === 'host') {
          hostBtns.classList.remove('hidden');
          nonHostNotice.classList.add('hidden');
        } else {
          hostBtns.classList.add('hidden');
          nonHostNotice.classList.remove('hidden');
        }
      } else {
        modal.classList.add('hidden');
      }
    }

    /* -------------------------------------------------------------
       INTERACTIVE CLUE STAGE (SELF-CONTAINED POPUP ARENA)
    -------------------------------------------------------------- */
    function renderClueStage() {
      const modal = document.getElementById('modalClueStage');
      const minBanner = document.getElementById('minimizedClueBanner');
      const hasActiveClue = ['COUNTDOWN', 'MEDIA_PLAYING', 'THINKING', 'THINKING_TIMEOUT', 'TYPING', 'TYPING_TIMEOUT', 'STEAL_THINKING', 'STEAL_TYPING', 'HOST_JUDGING'].includes(gameState.phase);

      if (!hasActiveClue) {
        modal.classList.add('hidden');
        minBanner.classList.add('hidden');
        isClueMinimized = false;
        return;
      }

      if (!gameState.activeClue) return;

      const cat = gameDeck[gameState.activeClue.catIdx];
      document.getElementById('stageCategoryName').innerText = cat.category;
      document.getElementById('stageClueValue').innerText = `$ ${gameState.activeClue.value}`;
      document.getElementById('minimizedClueTitle').innerText = `${cat.category} $${gameState.activeClue.value}`;

      let timerStr = `00:${gameState.timer < 10 ? '0' : ''}${gameState.timer}`;
      if (!gameState.timerRunning) timerStr += " [PAUSED]";
      document.getElementById('stageTimerClock').innerText = timerStr;
      document.getElementById('stagePhaseBadge').innerText = gameState.phase.replace('_', ' ');
      document.getElementById('stageActiveSquad').innerText = gameState.turnSubmittingTeam ? gameState.turnSubmittingTeam.toUpperCase() : "NONE";

      const warn = document.getElementById('stageTacticalWarning');
      if (gameState.isTacticalGambleUsed) {
        warn.innerText = `⚠️ TACTICAL CHALLENGE EXECUTED BY ${gameState.challengerTeam.toUpperCase()}! (-$${gameState.activeClue.value} RISK)`;
      } else {
        warn.innerText = "";
      }

      const arcade = document.getElementById('stageArcadeCountdown');
      const content = document.getElementById('stageContentLayer');

      if (gameState.phase === 'COUNTDOWN') {
        arcade.classList.remove('hidden');
        content.classList.add('hidden');
      } else {
        arcade.classList.add('hidden');
        content.classList.remove('hidden');
        document.getElementById('stageCluePrompt').innerText = gameState.activeClue.q;
        setupMediaStage();

        // 1. UPDATE MODAL INPUT BAR FOR PLAYERS
        const modalInput = document.getElementById('modalStageAnswerInput');
        const modalSubmit = document.getElementById('btnModalStageSubmit');
        const modalSkip = document.getElementById('btnModalStageSkip');
        const modalChallenge = document.getElementById('btnModalStageChallenge');
        const modalSquadTitle = document.getElementById('modalInputSquadTitle');

        const isAnsweringSquad = (myRole === gameState.turnSubmittingTeam);
        const isDefendingSquad = (myRole === (gameState.turnSubmittingTeam === 'blue' ? 'red' : 'blue'));
        const isTypingPhase = (gameState.phase === 'TYPING' || gameState.phase === 'STEAL_TYPING');
        const isThinkingPhase = (gameState.phase === 'THINKING' || gameState.phase === 'STEAL_THINKING');

        if (isAnsweringSquad && isTypingPhase) {
          modalSquadTitle.innerText = `SQUADRON ${myRole.toUpperCase()} INPUT [15s TYPING ACTIVE]:`;
          modalInput.disabled = !!gameState.lockedSubmission;
          modalInput.placeholder = gameState.lockedSubmission ? "[ ANSWER LOCKED IN ]" : "Type your answer and press ENTER...";
          modalSubmit.disabled = !!gameState.lockedSubmission;
        } else if (isAnsweringSquad && isThinkingPhase) {
          modalSquadTitle.innerText = `SQUADRON ${myRole.toUpperCase()} INPUT [THINKING]:`;
          modalInput.disabled = true;
          modalInput.placeholder = "[ 60s THINKING — DISCUSS WITH TEAM OR CLICK READY TO ANSWER ]";
          modalSubmit.disabled = true;
        } else {
          modalSquadTitle.innerText = `SQUADRON INPUT [STANDBY]:`;
          modalInput.disabled = true;
          modalInput.placeholder = `[ AWAITING ${gameState.turnSubmittingTeam ? gameState.turnSubmittingTeam.toUpperCase() : 'TEAM'}'S ANSWER ]`;
          modalSubmit.disabled = true;
        }

        if (isAnsweringSquad && isThinkingPhase) modalSkip.classList.remove('hidden');
        else modalSkip.classList.add('hidden');

        if (isDefendingSquad && isThinkingPhase && !gameState.isTacticalGambleUsed) modalChallenge.classList.remove('hidden');
        else modalChallenge.classList.add('hidden');

        // 2. UPDATE MODAL HOST COMMAND DESK FOR HOST
        const modalHostDesk = document.getElementById('modalHostCommandSection');
        const btnAbortClue = document.getElementById('btnHostAbortClue');

        if (myRole === 'host') {
          modalHostDesk.classList.remove('hidden');
          btnAbortClue.classList.remove('hidden');

          document.getElementById('modalHostSecretAnswer').innerText = `KEY: "${cat.clues[gameState.activeClue.clueIdx].a}"`;
          const btnPlayPause = document.getElementById('btnModalHostPlayPause');
          btnPlayPause.innerText = gameState.timerRunning ? "[ ⏸ PAUSE TIMER ]" : "[ ▶ START TIMER ]";
        } else {
          modalHostDesk.classList.add('hidden');
          btnAbortClue.classList.add('hidden');
        }
      }

      // Handle Minimizing/Expanding
      if (isClueMinimized) {
        modal.classList.add('hidden');
        minBanner.classList.remove('hidden');
      } else {
        modal.classList.remove('hidden');
        minBanner.classList.add('hidden');
      }
    }

    window.toggleClueMinimize = function(minimize) {
      isClueMinimized = minimize;
      renderClueStage();
    };

    window.hostAbortClueFromModal = function() {
      if (myRole !== 'host') return;
      window.showDosModal(
        "CONFIRM ABORT CLUE",
        "Abort this clue, return to board, and refund turn to active squadron?",
        () => {
          gameState.activeClue = null;
          gameState.pendingHostClue = null;
          gameState.lockedSubmission = null;
          gameState.phase = 'SELECTION';
          gameState.selectionTimer = 20;
          gameState.selectionTimerRunning = false;
          addEventLog("[HOST] Active clue aborted by Host. Returned to board.");
          syncState();
        },
        () => {}
      );
    };

    /* -------------------------------------------------------------
       TILE CLICK & STATE-ROUTED HOST CONFIRMATION
    -------------------------------------------------------------- */
    window.handleTileClick = function(catIdx, valIdx) {
      if (gameState.phase !== 'SELECTION' && gameState.phase !== 'SELECTION_TIMEOUT') return;
      window.sfxKeyClick();

      const clue = gameDeck[catIdx].clues[valIdx];
      gameState.pendingHostClue = {
        catIdx,
        clueIdx: valIdx,
        value: clue.value,
        q: clue.q,
        type: clue.type || 'text',
        mediaUrl: clue.mediaUrl || ''
      };

      gameState.lastSelectionAttribution = {
        team: gameState.selectingTeam,
        player: myPlayerName,
        catName: gameDeck[catIdx].category,
        val: clue.value
      };

      gameState.selectionTimerRunning = false;
      gameState.phase = 'HOST_CONFIRM';
      addEventLog(`[TILE CLICKED] ${gameDeck[catIdx].category} $${clue.value} by ${myPlayerName}. Awaiting Host confirmation.`);
      syncState();
    };

    window.hostConfirmClueExecution = function(confirmed) {
      if (myRole !== 'host') return;
      window.sfxKeyClick();

      if (!confirmed) {
        gameState.pendingHostClue = null;
        gameState.phase = 'SELECTION';
        gameState.selectionTimerRunning = true;
        addEventLog("[HOST ABORT] Tile rejected. Selection timer resumed.");
        syncState();
        return;
      }

      gameState.activeClue = { ...gameState.pendingHostClue };
      gameState.pendingHostClue = null;
      gameState.turnSubmittingTeam = gameState.selectingTeam;
      gameState.isTacticalGambleUsed = false;
      gameState.challengerTeam = null;
      gameState.liveDraft = { author: "", text: "" };
      gameState.lockedSubmission = null;
      isClueMinimized = false;

      addEventLog(`[CLUE BROADCAST] ${gameDeck[gameState.activeClue.catIdx].category} $${gameState.activeClue.value} confirmed by Host.`);

      if (gameState.activeClue.type === 'audio' || gameState.activeClue.type === 'image') {
        startMediaPlaybackSequence();
      } else {
        startArcadeCountdown();
      }
    };

    /* -------------------------------------------------------------
       MEDIA BUFFER ENGINE
    -------------------------------------------------------------- */
    let mediaInterval = null;

    function startMediaPlaybackSequence() {
      gameState.phase = 'MEDIA_PLAYING';
      syncState();

      let progress = 0;
      const totalTicks = 25;
      const stageAscii = document.getElementById('stageMediaAscii');
      const smallAscii = document.getElementById('segmentedAsciiBar');

      if (gameState.activeClue.type === 'audio') synthesizeChiptuneAudio();

      if (mediaInterval) clearInterval(mediaInterval);
      mediaInterval = setInterval(() => {
        if (gameState.isPaused) return;

        progress++;
        const pct = Math.min(100, Math.round((progress / totalTicks) * 100));
        const filled = Math.round((pct / 100) * 32);
        const barStr = '[' + '█'.repeat(filled) + '░'.repeat(32 - filled) + ']';

        if (stageAscii) stageAscii.innerText = barStr;
        if (smallAscii) smallAscii.innerText = barStr;

        document.getElementById('stageMediaPct').innerText = `${pct}%`;
        document.getElementById('mediaPercentLabel').innerText = `${pct}%`;
        document.getElementById('mediaTimeSub').innerText = `00:0${Math.floor(progress / 5)} / 00:05`;

        if (progress % 5 === 0) playTone(700, 0.03, 'sine', 0.04);

        if (progress >= totalTicks) {
          clearInterval(mediaInterval);
          runMediaGraceBuffer(3);
        }
      }, 200);
    }

    function runMediaGraceBuffer(seconds) {
      if (seconds > 0) {
        playTone(520, 0.06, 'triangle', 0.08);
        setTimeout(() => runMediaGraceBuffer(seconds - 1), 1000);
      } else {
        startArcadeCountdown();
      }
    }

    function synthesizeChiptuneAudio() {
      initAudio();
      const notes = [261.6, 329.6, 392.0, 523.2, 659.2, 783.9, 1046.5];
      notes.forEach((freq, idx) => setTimeout(() => playTone(freq, 0.22, 'square', 0.15), idx * 240));
    }

    window.replayAudioTrack = function() {
      if (gameState.activeClue && gameState.activeClue.type === 'audio') synthesizeChiptuneAudio();
    };

    function setupMediaStage() {
      const container = document.getElementById('stageMediaContainer');
      const img = document.getElementById('stageClueImage');
      const audioWrap = document.getElementById('stageClueAudioWrapper');

      if (!gameState.activeClue || gameState.activeClue.type === 'text') {
        container.classList.add('hidden');
        return;
      }
      container.classList.remove('hidden');

      if (gameState.activeClue.type === 'image') {
        img.classList.remove('hidden');
        audioWrap.classList.add('hidden');
        img.src = gameState.activeClue.mediaUrl || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80";
      } else if (gameState.activeClue.type === 'audio') {
        img.classList.add('hidden');
        audioWrap.classList.remove('hidden');
      }
    }

    /* -------------------------------------------------------------
       ARCADE 3-2-1-GO & PAUSED 60S THINKING
    -------------------------------------------------------------- */
    function startArcadeCountdown() {
      gameState.phase = 'COUNTDOWN';
      syncState();

      let count = 3;
      const bigNum = document.getElementById('arcadeBigNumber');
      bigNum.innerText = count;
      window.sfxCountdown(count);

      const interval = setInterval(() => {
        count--;
        if (count > 0) {
          bigNum.innerText = count;
          window.sfxCountdown(count);
        } else if (count === 0) {
          bigNum.innerText = "GO!";
          window.sfxCountdown(0);
        } else {
          clearInterval(interval);
          gameState.phase = 'THINKING';
          gameState.timer = 60;
          gameState.timerRunning = false;
          addEventLog(`[CLUE REVEALED] Thinking phase paused at 60s. Waiting for Host.`);
          syncState();
        }
      }, 1000);
    }

    /* -------------------------------------------------------------
       HOST MANUAL TIMERS & ACTIONS
    -------------------------------------------------------------- */
    window.hostToggleSelectionTimer = function(start) {
      if (myRole !== 'host') return;
      window.sfxKeyClick();
      gameState.selectionTimerRunning = start;
      if (start) gameState.phase = 'SELECTION';
      addEventLog(`[HOST] 20s Selection Timer ${start ? 'started' : 'paused'}.`);
      syncState();
    };

    window.hostToggleThinkingTimer = function(start) {
      if (myRole !== 'host') return;
      window.sfxKeyClick();
      gameState.timerRunning = start;
      gameState.isPaused = false;
      addEventLog(`[HOST] Timer ${start ? 'started' : 'paused'}.`);
      syncState();
    };

    window.hostProceedToTyping = function() {
      if (myRole !== 'host') return;
      window.sfxKeyClick();
      gameState.phase = 'TYPING';
      gameState.timer = 15;
      gameState.timerRunning = true;
      addEventLog(`[HOST] Advanced to 15s Typing Phase.`);
      syncState();
    };

    window.hostForceTimeoutAnswer = function() {
      if (myRole !== 'host') return;
      window.sfxKeyClick();
      gameState.lockedSubmission = {
        team: gameState.turnSubmittingTeam,
        player: "SYSTEM_TIMEOUT",
        text: "[NO ANSWER / TIMEOUT]"
      };
      gameState.phase = 'HOST_JUDGING';
      gameState.timerRunning = false;
      addEventLog(`[HOST] Ruled as No Answer / Timeout.`);
      syncState();
    };

    window.hostAddSeconds = function(sec) {
      if (myRole !== 'host') return;
      window.sfxKeyClick();
      if (gameState.phase === 'SELECTION' || gameState.phase === 'SELECTION_TIMEOUT') {
        gameState.selectionTimer += sec;
        gameState.phase = 'SELECTION';
        gameState.selectionTimerRunning = true;
      } else {
        gameState.timer += sec;
        gameState.timerRunning = true;
        if (gameState.phase === 'THINKING_TIMEOUT') gameState.phase = 'THINKING';
        if (gameState.phase === 'TYPING_TIMEOUT') gameState.phase = 'TYPING';
      }
      addEventLog(`[HOST] Added +${sec}s.`);
      syncState();
    };

    window.hostForfeitSelection = function() {
      if (myRole !== 'host') return;
      window.sfxKeyClick();
      gameState.selectingTeam = gameState.selectingTeam === 'blue' ? 'red' : 'blue';
      gameState.selectionTimer = 20;
      gameState.selectionTimerRunning = false;
      gameState.phase = 'SELECTION';
      addEventLog(`[HOST] Selection forfeited. Turn passed to ${gameState.selectingTeam.toUpperCase()}.`);
      syncState();
    };

    /* -------------------------------------------------------------
       TACTICAL "ANSWER OR SKIP" (GLOBAL 5S BANNER)
    -------------------------------------------------------------- */
    window.playerTriggerSkipThinking = function() {
      const isAnswering = (myRole === gameState.turnSubmittingTeam || myRole === 'host');
      if (!isAnswering) return;
      window.sfxKeyClick();
      gameState.phase = gameState.phase === 'STEAL_THINKING' ? 'STEAL_TYPING' : 'TYPING';
      gameState.timer = 15;
      gameState.timerRunning = true;
      addEventLog(`[READY TO ANSWER] ${gameState.turnSubmittingTeam.toUpperCase()} skipped thinking -> 15s Typing starts!`);
      syncState();
    };

    window.playerTriggerTacticalChallenge = function() {
      const defending = gameState.turnSubmittingTeam === 'blue' ? 'red' : 'blue';
      if (myRole !== defending && myRole !== 'host') return;

      gameState.isTacticalGambleUsed = true;
      gameState.challengerTeam = defending;

      gameState.tacticalAlert = {
        active: true,
        player: myPlayerName,
        team: defending
      };

      gameState.phase = 'TYPING';
      gameState.timer = 15;
      gameState.timerRunning = true;

      addEventLog(`[⚠️ TACTICAL ALERT] TEAM ${defending.toUpperCase()} chose ANSWER OR SKIP by player: ${myPlayerName}! 60s thinking aborted!`);
      syncState('tactical');

      setTimeout(() => {
        if (gameState.tacticalAlert) gameState.tacticalAlert.active = false;
        syncState();
      }, 5000);
    };

    function renderTacticalAlertModal() {
      const banner = document.getElementById('modalTacticalBanner');
      if (gameState.tacticalAlert && gameState.tacticalAlert.active) {
        document.getElementById('tacticalBannerTeam').innerText = `TEAM ${gameState.tacticalAlert.team.toUpperCase()} HAS FORCED THE CLOCK!`;
        document.getElementById('tacticalBannerPlayer').innerText = gameState.tacticalAlert.player;
        banner.classList.remove('hidden');
      } else {
        banner.classList.add('hidden');
      }
    }

    /* -------------------------------------------------------------
       DUAL-INPUT SYNC & SUBMISSION (ENTER-KEY ENABLED EVERYWHERE)
    -------------------------------------------------------------- */
    const persistentInput = document.getElementById('persistentAnswerInput');
    const modalInput = document.getElementById('modalStageAnswerInput');

    function handleLiveTypingInput(val) {
      if (myRole !== gameState.turnSubmittingTeam) return;
      window.sfxKeyClick();

      // Mirror both input values seamlessly
      if (persistentInput && persistentInput.value !== val) persistentInput.value = val;
      if (modalInput && modalInput.value !== val) modalInput.value = val;

      gameState.liveDraft = { author: myPlayerName, text: val };
      if (socket && socket.connected) {
        socket.emit('game_message', { type: 'LIVE_KEY', liveDraft: gameState.liveDraft });
      }
      renderLiveTypingDrafts();
    }

    if (persistentInput) {
      persistentInput.addEventListener('input', (e) => handleLiveTypingInput(e.target.value));
      persistentInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitAnswerFromAnywhere(); });
    }

    if (modalInput) {
      modalInput.addEventListener('input', (e) => handleLiveTypingInput(e.target.value));
      modalInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitAnswerFromAnywhere(); });
    }

    window.submitAnswerFromAnywhere = function() {
      if (myRole !== gameState.turnSubmittingTeam) return;
      if (!['TYPING', 'STEAL_TYPING'].includes(gameState.phase)) return;

      const rawVal = modalInput?.value || persistentInput?.value || gameState.liveDraft.text;
      const answerVal = rawVal.trim() || "[NO ANSWER]";
      window.sfxKeyClick();

      gameState.lockedSubmission = {
        team: gameState.turnSubmittingTeam,
        player: myPlayerName,
        text: answerVal
      };
      gameState.phase = 'HOST_JUDGING';
      gameState.timerRunning = false;

      if (persistentInput) persistentInput.value = '';
      if (modalInput) modalInput.value = '';

      addEventLog(`[ANSWER SUBMITTED] by ${myPlayerName} (${gameState.turnSubmittingTeam.toUpperCase()}): "${answerVal}"`);
      syncState();
    };

    /* -------------------------------------------------------------
       HOST JUDGING & TACTICAL RESOLUTION
    -------------------------------------------------------------- */
    window.hostAwardVerdict = function(isCorrect) {
      if (myRole !== 'host') return;
      if (!gameState.activeClue) return;

      const clueVal = gameState.activeClue.value;
      const answeringTeam = gameState.lockedSubmission ? gameState.lockedSubmission.team : gameState.turnSubmittingTeam;
      const otherTeam = answeringTeam === 'blue' ? 'red' : 'blue';

      if (isCorrect) {
        window.sfxCorrect();
        gameState.scores[answeringTeam] += clueVal;
        addEventLog(`[JUDGE: CORRECT] +$${clueVal} awarded to ${answeringTeam.toUpperCase()}!`);
        finishClueRound();
      } else {
        window.sfxIncorrect();
        addEventLog(`[JUDGE: INCORRECT] Submission by ${answeringTeam.toUpperCase()} ruled incorrect.`);

        if (gameState.isTacticalGambleUsed) {
          if (answeringTeam !== gameState.challengerTeam) {
            gameState.turnSubmittingTeam = gameState.challengerTeam;
            gameState.phase = 'STEAL_TYPING';
            gameState.timer = 15;
            gameState.timerRunning = true;
            gameState.lockedSubmission = null;
            gameState.liveDraft = { author: "", text: "" };
            addEventLog(`[CHALLENGE STEAL] ${gameState.challengerTeam.toUpperCase()} has 15s to answer. (-$${clueVal} if missed)`);
            syncState('incorrect');
          } else {
            gameState.scores[gameState.challengerTeam] -= clueVal;
            addEventLog(`[⚠️ FULL PENALTY] ${gameState.challengerTeam.toUpperCase()} failed tactical challenge (-$${clueVal})!`);
            finishClueRound('incorrect');
          }
        } else {
          if (answeringTeam === gameState.selectingTeam) {
            gameState.turnSubmittingTeam = otherTeam;
            gameState.phase = 'STEAL_THINKING';
            gameState.timer = 20;
            gameState.timerRunning = false;
            gameState.lockedSubmission = null;
            gameState.liveDraft = { author: "", text: "" };
            addEventLog(`[NORMAL STEAL] Opportunity shifts to ${otherTeam.toUpperCase()} (20s thinking, $0 miss).`);
            syncState('incorrect');
          } else {
            addEventLog(`[STEAL FAILED] Neither team answered correctly. $0 awarded.`);
            finishClueRound('incorrect');
          }
        }
      }
    };

    function finishClueRound(sfxType = 'correct') {
      if (gameState.activeClue) {
        const key = `${gameState.activeClue.catIdx}-${gameState.activeClue.clueIdx}`;
        if (!gameState.clearedClues.includes(key)) gameState.clearedClues.push(key);
      }

      document.getElementById('modalClueStage').classList.add('hidden');
      isClueMinimized = false;

      gameState.selectingTeam = gameState.selectingTeam === 'blue' ? 'red' : 'blue';
      gameState.selectionTimer = 20;
      gameState.selectionTimerRunning = false;
      gameState.phase = 'SELECTION';
      gameState.activeClue = null;
      gameState.lockedSubmission = null;
      gameState.liveDraft = { author: "", text: "" };
      gameState.isTacticalGambleUsed = false;
      gameState.challengerTeam = null;

      addEventLog(`[TURN SWITCH] Selection strictly passes to TEAM ${gameState.selectingTeam.toUpperCase()}.`);

      if (gameState.clearedClues.length >= 30) {
        setTimeout(triggerHostEndMatch, 1000);
      }
      syncState(sfxType);
    }

    /* -------------------------------------------------------------
       HOST OVERRIDES & UTILITIES
    -------------------------------------------------------------- */
    window.triggerHostPause = function() {
      if (myRole !== 'host') return;
      gameState.isPaused = !gameState.isPaused;
      window.sfxKeyClick();
      addEventLog(`[SYSTEM] Match ${gameState.isPaused ? 'PAUSED' : 'RESUMED'} by Host.`);
      syncState();
    };

    window.triggerHostVoidSubmission = function() {
      if (myRole !== 'host') return;
      window.showDosModal(
        "CONFIRM VOID SUBMISSION",
        "Erase current locked submission, refund the 15-second timer, and re-open typing input for the team?",
        () => {
          window.sfxKeyClick();
          gameState.lockedSubmission = null;
          gameState.liveDraft = { author: "", text: "" };
          gameState.phase = 'TYPING';
          gameState.timer = 15;
          gameState.timerRunning = true;
          addEventLog(`[HOST VETO] Submission voided. 15s refunded to ${gameState.turnSubmittingTeam.toUpperCase()}`);
          syncState();
        },
        () => {}
      );
    };

    window.triggerHostUndoClue = function() {
      if (myRole !== 'host') return;
      window.showDosModal(
        "CONFIRM RE-OPEN CLUE",
        "Re-open active clue into 60s Thinking phase?",
        () => {
          window.sfxKeyClick();
          if (gameState.activeClue) {
            gameState.phase = 'THINKING';
            gameState.timer = 60;
            gameState.timerRunning = false;
            gameState.lockedSubmission = null;
            gameState.isTacticalGambleUsed = false;
            isClueMinimized = false;
            addEventLog("[UNDO] Host reverted clue back to 60s Thinking phase.");
            syncState();
          }
        },
        () => {}
      );
    };

    window.hostAdjustQuickScore = function(team, delta) {
      if (myRole !== 'host') return;
      window.sfxKeyClick();
      gameState.scores[team] += delta;
      addEventLog(`[OVERRIDE] Adjusted ${team.toUpperCase()} score by ${delta >= 0 ? '+' : ''}${delta}`);
      syncState();
    };

    window.hostApplyManualScore = function(team) {
      if (myRole !== 'host') return;
      const input = document.getElementById(team === 'blue' ? 'hostOverrideBlueInput' : 'hostOverrideRedInput');
      const val = parseInt(input.value, 10) || 0;
      window.sfxKeyClick();
      gameState.scores[team] = val;
      addEventLog(`[OVERRIDE] Host manually set ${team.toUpperCase()} balance to $${val}`);
      syncState();
    };

    window.triggerHostResetMatch = function() {
      if (myRole !== 'host') return;
      window.showDosModal(
        "CONFIRM MATCH RESET",
        "Reset entire match, board, and scores back to zero?",
        () => {
          window.sfxKeyClick();
          gameState = {
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
            logs: ["[RESET] Match rebooted by Host. Board restored."],
            roster: gameState.roster
          };
          isClueMinimized = false;
          syncState();
        },
        () => {}
      );
    };

    window.triggerHostEndMatch = function() {
      window.sfxVictory();
      gameState.phase = 'GAME_OVER';

      const winner = gameState.scores.blue > gameState.scores.red
        ? "TEAM BLUE"
        : gameState.scores.red > gameState.scores.blue
        ? "TEAM RED"
        : "TIE (BOTH SQUADS)";

      document.getElementById('victoryWinnerBanner').innerText = `CHAMPION: ${winner}`;
      document.getElementById('victoryFinalScores').innerText = `FINAL ASSETS: BLUE: $${gameState.scores.blue}  │  RED: $${gameState.scores.red}`;
      document.getElementById('modalVictory').classList.remove('hidden');
      syncState('victory');
    };

    window.closeVictoryModal = function() {
      document.getElementById('modalVictory').classList.add('hidden');
    };

    /* -------------------------------------------------------------
       DECK BUILDER / JSON MANAGER
    -------------------------------------------------------------- */
    let activeDeckTab = 0;

    window.openDeckModal = function() {
      window.sfxKeyClick();
      activeDeckTab = 0;
      renderDeckEditor();
      document.getElementById('modalDeckManager').classList.remove('hidden');
    };

    window.closeDeckModal = function() {
      window.sfxKeyClick();
      document.getElementById('modalDeckManager').classList.add('hidden');
    };

    function renderDeckEditor() {
      const tabsBox = document.getElementById('deckCategoryTabs');
      tabsBox.innerHTML = gameDeck.map((cat, i) => `
        <button onclick="switchDeckTab(${i})" class="px-2 py-0.5 border text-xs font-bold ${activeDeckTab === i ? 'bg-yellow-300 text-black border-white' : 'bg-[#000060] text-cyan-300 border-cyan-400'}">
          CAT 0${i + 1}: ${escapeHtml(cat.category)}
        </button>
      `).join('');

      const cat = gameDeck[activeDeckTab];
      const editorBox = document.getElementById('deckCluesEditor');

      let html = `
        <div class="bg-[#000060] p-2 border border-cyan-300 mb-2 flex items-center space-x-2">
          <span class="text-yellow-300 font-bold">CATEGORY NAME:</span>
          <input type="text" id="deckCatInput" value="${escapeHtml(cat.category)}" class="bg-black text-white border border-cyan-400 p-1 font-mono text-xs flex-1">
        </div>
      `;

      cat.clues.forEach((clue, idx) => {
        html += `
          <div class="border border-cyan-400 p-2 bg-[#000078] space-y-1">
            <div class="flex justify-between items-center text-yellow-300 font-bold">
              <span>TILE $${clue.value}</span>
              <div class="flex items-center space-x-2">
                <span class="text-[10px] text-gray-300">TYPE:</span>
                <select id="deckTypeSelect_${idx}" class="bg-black text-cyan-300 border border-cyan-400 p-0.5 text-xs">
                  <option value="text" ${clue.type === 'text' ? 'selected' : ''}>TEXT</option>
                  <option value="image" ${clue.type === 'image' ? 'selected' : ''}>IMAGE (PHOTO)</option>
                  <option value="audio" ${clue.type === 'audio' ? 'selected' : ''}>AUDIO (URL/SYNTH)</option>
                </select>
              </div>
            </div>
            <div>
              <span class="text-gray-300">QUESTION PROMPT:</span>
              <input type="text" id="deckQInput_${idx}" value="${escapeHtml(clue.q)}" class="bg-black text-white border border-cyan-400 p-1 w-full font-mono text-xs">
            </div>
            <div>
              <span class="text-yellow-300">OFFICIAL SECRET ANSWER:</span>
              <input type="text" id="deckAInput_${idx}" value="${escapeHtml(clue.a)}" class="bg-black text-yellow-300 border border-cyan-400 p-1 w-full font-mono text-xs">
            </div>
            <div>
              <span class="text-gray-300">MEDIA URL (FOR IMAGE / AUDIO):</span>
              <input type="text" id="deckMediaInput_${idx}" value="${escapeHtml(clue.mediaUrl || '')}" placeholder="https://image-url or audio url" class="bg-black text-cyan-200 border border-cyan-400 p-1 w-full font-mono text-xs">
            </div>
          </div>
        `;
      });

      editorBox.innerHTML = html;
    }

    window.switchDeckTab = function(idx) {
      saveActiveDeckTab();
      activeDeckTab = idx;
      renderDeckEditor();
    };

    function saveActiveDeckTab() {
      const catInput = document.getElementById('deckCatInput');
      if (!catInput) return;
      gameDeck[activeDeckTab].category = catInput.value.trim() || `CAT 0${activeDeckTab + 1}`;

      gameDeck[activeDeckTab].clues.forEach((clue, idx) => {
        const qElem = document.getElementById(`deckQInput_${idx}`);
        const aElem = document.getElementById(`deckAInput_${idx}`);
        const typeElem = document.getElementById(`deckTypeSelect_${idx}`);
        const mediaElem = document.getElementById(`deckMediaInput_${idx}`);

        if (qElem) clue.q = qElem.value;
        if (aElem) clue.a = aElem.value;
        if (typeElem) clue.type = typeElem.value;
        if (mediaElem) clue.mediaUrl = mediaElem.value;
      });
    }

    window.saveAndApplyDeckChanges = function() {
      saveActiveDeckTab();
      localStorage.setItem('dos_jeopardy_deck', JSON.stringify(gameDeck));
      window.sfxCorrect();
      closeDeckModal();
      addEventLog("[DECK] Clue deck updated and applied.");
      renderAll();
    };

    window.exportDeckToJson = function() {
      saveActiveDeckTab();
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(gameDeck, null, 2));
      const a = document.createElement('a');
      a.setAttribute("href", dataStr);
      a.setAttribute("download", "dos_jeopardy_deck.json");
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.sfxKeyClick();
    };

    window.importDeckFromJson = function(e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (Array.isArray(parsed) && parsed.length === 6) {
            gameDeck = parsed;
            localStorage.setItem('dos_jeopardy_deck', JSON.stringify(gameDeck));
            window.sfxCorrect();
            renderDeckEditor();
            renderAll();
            addEventLog("[DECK] Custom JSON trivia deck loaded.");
          } else {
            window.sfxIncorrect();
            window.showDosModal("DECK ERROR", "Invalid deck format. File must contain exactly 6 categories.");
          }
        } catch (err) {
          window.sfxIncorrect();
          window.showDosModal("PARSING ERROR", "Failed to parse JSON trivia file.");
        }
      };
      reader.readAsText(file);
    };

    window.restoreDefaultDeck = function() {
      window.showDosModal(
        "CONFIRM RESTORE",
        "Restore factory default trivia questions and categories?",
        () => {
          gameDeck = JSON.parse(JSON.stringify(DEFAULT_DECK));
          localStorage.setItem('dos_jeopardy_deck', JSON.stringify(gameDeck));
          window.sfxCorrect();
          renderDeckEditor();
          renderAll();
          addEventLog("[DECK] Factory default trivia deck restored.");
        },
        () => {}
      );
    };

    /* -------------------------------------------------------------
       KEYBOARD SHORTCUTS
    -------------------------------------------------------------- */
    window.addEventListener('keydown', (e) => {
      // Don't intercept shortcuts if typing in any text input
      if (e.target.tagName === 'INPUT' && e.key === 'Enter') return;

      if (e.key === 'F1') { e.preventDefault(); openDeckModal(); }
      if (e.key === 'F2') { e.preventDefault(); triggerHostPause(); }
      if (e.key === 'F3') { e.preventDefault(); quickSwitchView('board'); }
      if (e.key === 'F4') { e.preventDefault(); quickSwitchView('host'); }
      if (e.key === 'F5') { e.preventDefault(); joinRole('blue'); }
      if (e.key === 'F6') { e.preventDefault(); joinRole('red'); }
      if (e.key === 'Escape') {
        if (myRole === 'host' && gameState.phase === 'HOST_CONFIRM') {
          hostConfirmClueExecution(false);
        }
        document.getElementById('modalDeckManager').classList.add('hidden');
        document.getElementById('modalLobby').classList.add('hidden');
        closeDosMessageModal();
      }
      if (e.key === 'Enter') {
        if (myRole === 'host' && gameState.phase === 'HOST_CONFIRM') {
          hostConfirmClueExecution(true);
        }
      }
    });

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    // Initialize application
    window.addEventListener('load', () => {
      switchViewRole(myRole);
      renderAll();
      addEventLog("[READY] DOS Defrag Terminal Online.");
    });
  </script>
</body>
</html>
