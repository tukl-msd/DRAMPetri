// Matthias Jung

var blinker = 0;
var tCKinRT = 1000; // ms

var tCK = 2.5;
var tCCD = 10;
var tRCD = 12.5;
var tRP = 12.5;
var tRAS = 37.5;
var tRL = 5*tCK;
var tWL = 5*tCK;
var tRTP = 4*tCK;
var tWTR = 4*tCK;
var tRRD = 4*tCK;
var tWR = 15;
var tFAW = 40;
var tRFC = 110;
var tREFI = 7800;
var tREFMAX = 9*tREFI ;

var tRC = tRAS + tRP;
var tRDWR = tRL + tCCD + 2*tCK - tWL;
var tWRRD = tWL + tCCD + tWTR ;
var tRDAACT = tRTP + tRP;
var tWRPRE = tWL + tCCD + tWR;
var tWRAACT = tWRPRE + tRP;

var tXP = 3*tCK;
var tXS = tRFC + 10;
var tXSDLL = 512*tCK;
var tCKE = 3*tCK;
var tCKESR = tCKE + tCK;
var tPD = tCKE ;
var tRDPDEN = tRL + 5*tCK;
var tWRPDEN = tWL + 4*tCK + tWR;
var tWRAPDEN = tWL + 5*tCK + tWR;
var tREFPDEN = tCK;
var tACTPDEN = tCK;
var tPRPDEN = tCK;


var petriNet = {
  places: [
    { id: 0, name: "IDLE"   , tokens: 2 },
    { id: 1, name: "BANK_0" , tokens: 0 },
    { id: 2, name: "BANK_1" , tokens: 0 },
    { id: 3, name: "PDNA"   , tokens: 0 },
    { id: 4, name: "PDNP"   , tokens: 0 },
    { id: 5, name: "SREF"   , tokens: 0 },
  ],

  transitions: [
    { id:  6, name: "ACT_0"    , enabled: 0 , inhibited: 0, timedInhibited: 0 },
    { id:  7, name: "ACT_1"    , enabled: 0 , inhibited: 0, timedInhibited: 0 },
    { id:  8, name: "PREA"     , enabled: 0 , inhibited: 0, timedInhibited: 0 },
    { id:  9, name: "REFA"     , enabled: 0 , inhibited: 0, timedInhibited: 0 },
    { id: 10, name: "SREFEN"   , enabled: 0 , inhibited: 0, timedInhibited: 0 },
    { id: 11, name: "PDEP"     , enabled: 0 , inhibited: 0, timedInhibited: 0 },
    { id: 12, name: "RD_0"     , enabled: 0 , inhibited: 0, timedInhibited: 0 },
    { id: 13, name: "WR_0"     , enabled: 0 , inhibited: 0, timedInhibited: 0 },
    { id: 14, name: "WRA_0"    , enabled: 0 , inhibited: 0, timedInhibited: 0 },
    { id: 15, name: "RDA_0"    , enabled: 0 , inhibited: 0, timedInhibited: 0 },
    { id: 16, name: "PRE_0"    , enabled: 0 , inhibited: 0, timedInhibited: 0 },
    { id: 17, name: "RD_1"     , enabled: 0 , inhibited: 0, timedInhibited: 0 },
    { id: 18, name: "WR_1"     , enabled: 0 , inhibited: 0, timedInhibited: 0 },
    { id: 19, name: "WRA_1"    , enabled: 0 , inhibited: 0, timedInhibited: 0 },
    { id: 20, name: "RDA_1"    , enabled: 0 , inhibited: 0, timedInhibited: 0 },
    { id: 21, name: "PRE_1"    , enabled: 0 , inhibited: 0, timedInhibited: 0 },
    { id: 22, name: "PDXA"     , enabled: 0 , inhibited: 0, timedInhibited: 0 },
    { id: 23, name: "PDXP"     , enabled: 0 , inhibited: 0, timedInhibited: 0 },
    { id: 24, name: "PDEA"     , enabled: 0 , inhibited: 0, timedInhibited: 0 },
    { id: 25, name: "SREFEX"   , enabled: 0 , inhibited: 0, timedInhibited: 0 }
  ],

  arcs: [
    //// Invisible arcs connected to 'AIR':
    { source: -1, target: 24, type: "normal",    weight: 0 },  // PDEA
    { source: -1, target:  8, type: "normal",    weight: 0 },  // PREA 

    //// Normal arcs:
    // IDLE:
    { source:  0, target:  6, type: "normal",    weight: 1 },  // IDLE     -> ACT_0
    { source:  0, target:  7, type: "normal",    weight: 1 },  // IDLE     -> ACT_1

    // BANK_0:
    { source:  6, target:  1, type: "normal",    weight: 1 },  // ACT_0    -> BANK_0
    { source:  1, target: 12, type: "normal",    weight: 1 },  // BANK_0   -> RD_0
    { source: 12, target:  1, type: "normal",    weight: 1 },  // RD_0     -> BANK_0
    { source:  1, target: 13, type: "normal",    weight: 1 },  // BANK_0   -> WR_0
    { source: 13, target:  1, type: "normal",    weight: 1 },  // WR_0     -> BANK_0
    { source:  1, target: 16, type: "normal",    weight: 1 },  // BANK_0   -> PRE_0
    { source:  1, target: 15, type: "normal",    weight: 1 },  // BANK_0   -> RDA_0
    { source:  1, target: 14, type: "normal",    weight: 1 },  // BANK_0   -> WRA_0
    { source: 16, target:  0, type: "normal",    weight: 1 },  // PRE_0    -> IDLE
    { source: 15, target:  0, type: "normal",    weight: 1 },  // RDA_0    -> IDLE
    { source: 14, target:  0, type: "normal",    weight: 1 },  // WRA_0    -> IDLE

    // BANK_0:
    { source:  7, target:  2, type: "normal",    weight: 1 },  // ACT_1    -> BANK_1
    { source:  2, target: 17, type: "normal",    weight: 1 },  // BANK_1   -> RD_1
    { source: 17, target:  2, type: "normal",    weight: 1 },  // RD_1     -> BANK_1
    { source:  2, target: 18, type: "normal",    weight: 1 },  // BANK_1   -> WR_1
    { source: 18, target:  2, type: "normal",    weight: 1 },  // WR_1     -> BANK_1
    { source:  2, target: 21, type: "normal",    weight: 1 },  // BANK_1   -> PRE_1
    { source:  2, target: 20, type: "normal",    weight: 1 },  // BANK_1   -> RDA_1
    { source:  2, target: 19, type: "normal",    weight: 1 },  // BANK_1   -> WRA_1
    { source: 21, target:  0, type: "normal",    weight: 1 },  // PRE_1    -> IDLE
    { source: 20, target:  0, type: "normal",    weight: 1 },  // RDA_1    -> IDLE
    { source: 19, target:  0, type: "normal",    weight: 1 },  // WRA_1    -> IDLE

    // PREA:
    { source:  8, target:  0, type: "normal",    weight: 2 },  // PREA     -> IDLE

    // Refresh:
    { source:  0, target:  9, type: "normal",    weight: 2 },  // IDLE     -> REFA
    { source:  9, target:  0, type: "normal",    weight: 2 },  // REFA     -> IDLE

    // Powerdown:
    { source: 24, target:  3, type: "normal",    weight: 1 },  // PDEA     -> PDNA
    { source:  3, target: 22, type: "normal",    weight: 1 },  // PDNA     -> PDXA

    { source:  0, target: 10, type: "normal",    weight: 2 },  // IDLE     -> SREFEN
    { source: 10, target:  5, type: "normal",    weight: 1 },  // SREFEN   -> SREF
    { source:  5, target: 25, type: "normal",    weight: 1 },  // SREF     -> SREFEX
    { source: 25, target:  0, type: "normal",    weight: 2 },  // SREFEX   -> IDLE

    { source:  0, target: 11, type: "normal",    weight: 2 },  // IDLE     -> PDEP
    { source: 11, target:  4, type: "normal",    weight: 1 },  // PDEP     -> PDNP
    { source:  4, target: 23, type: "normal",    weight: 1 },  // PDNP     -> PDXP
    { source: 23, target:  0, type: "normal",    weight: 2 },  // PDXP     -> IDLE

    //// Inhibitor Arcs:
    // BANK_0
    { source:  1, target:  6, type: "inhibitor", weight: 1 },  // BANK_0  -o ACT_0
    { source:  3, target:  6, type: "inhibitor", weight: 1 },  // PDNA    -o ACT_0
    { source:  3, target: 12, type: "inhibitor", weight: 1 },  // PDNA    -o RD_0
    { source:  3, target: 13, type: "inhibitor", weight: 1 },  // PDNA    -o WR_0
    { source:  3, target: 16, type: "inhibitor", weight: 1 },  // PDNA    -o PRE_0
    { source:  3, target: 14, type: "inhibitor", weight: 1 },  // PDNA    -o WRA_0
    { source:  3, target: 15, type: "inhibitor", weight: 1 },  // PDNA    -o RDA_0

    // BANK_1
    { source:  2, target:  7, type: "inhibitor", weight: 1 },  // BANK_1  -o ACT_1
    { source:  3, target:  7, type: "inhibitor", weight: 1 },  // PDNA    -o ACT_1
    { source:  3, target: 17, type: "inhibitor", weight: 1 },  // PDNA    -o RD_1
    { source:  3, target: 18, type: "inhibitor", weight: 1 },  // PDNA    -o WR_1
    { source:  3, target: 21, type: "inhibitor", weight: 1 },  // PDNA    -o PRE_1
    { source:  3, target: 19, type: "inhibitor", weight: 1 },  // PDNA    -o WRA_1
    { source:  3, target: 20, type: "inhibitor", weight: 1 },  // PDNA    -o RDA_1

    // PREA:
    { source:  3, target:  8, type: "inhibitor", weight: 1 },  // PDNA    -o PREA
    { source:  4, target:  8, type: "inhibitor", weight: 1 },  // PDNP    -o PREA
    { source:  5, target:  8, type: "inhibitor", weight: 1 },  // SREF    -o PREA

    // REFA:
    { source:  3, target:  9, type: "inhibitor", weight: 1 },  // PDNA    -o REFA

    // Powerdown
    { source:  3, target: 11, type: "inhibitor", weight: 1 },  // PDNA    -o PDEP
    { source:  3, target: 10, type: "inhibitor", weight: 1 },  // PDNA    -o SREFEN
    { source:  3, target: 24, type: "inhibitor", weight: 1 },  // PDNA    -o PDEA
    { source:  5, target: 24, type: "inhibitor", weight: 1 },  // SREF    -o PDEA
    { source:  4, target: 24, type: "inhibitor", weight: 1 },  // PDNP    -o PDEA
    { source:  0, target: 24, type: "inhibitor", weight: 2 },  // IDLE    -o PDEA

    //// Reset arcs:
    { source:  0, target:  8, type: "reset",     weight: 1 },  // IDLE    >> PREA
    { source:  1, target:  8, type: "reset",     weight: 1 },  // BANK_0  >> PREA
    { source:  2, target:  8, type: "reset",     weight: 1 },  // BANK_1  >> PREA

    //// Timed arcs:
    // Timing constraints from ACT
    { id:   0, source:   6, target:  16,  type: "timed", name: "tRAS",         delay: tRAS,           age: -1 },  // ACT_0  -<> PRE_0
    { id:  10, source:   7, target:  21,  type: "timed", name: "tRAS",         delay: tRAS,           age: -1 },  // ACT_1  -<> PRE_1
    { id: 156, source:   6, target:   8,  type: "timed", name: "tRAS",         delay: tRAS,           age: -1 },  // ACT_0  -<> PREA
    { id: 157, source:   7, target:   8,  type: "timed", name: "tRAS",         delay: tRAS,           age: -1 },  // ACT_1  -<> PREA
    { id:   1, source:   6, target:  12,  type: "timed", name: "tRCD",         delay: tRCD,           age: -1 },  // ACT_0  -<> RD_0
    { id:  11, source:   7, target:  17,  type: "timed", name: "tRCD",         delay: tRCD,           age: -1 },  // ACT_1  -<> RD_1
    { id:   2, source:   6, target:  13,  type: "timed", name: "tRCD",         delay: tRCD,           age: -1 },  // ACT_0  -<> WR_0
    { id:  12, source:   7, target:  18,  type: "timed", name: "tRCD",         delay: tRCD,           age: -1 },  // ACT_1  -<> WR_1
    { id:   3, source:   6, target:  15,  type: "timed", name: "tRCD",         delay: tRCD,           age: -1 },  // ACT_0  -<> RDA_0
    { id:  13, source:   7, target:  20,  type: "timed", name: "tRCD",         delay: tRCD,           age: -1 },  // ACT_1  -<> RDA_1
    { id:   4, source:   6, target:  14,  type: "timed", name: "tRCD",         delay: tRCD,           age: -1 },  // ACT_0  -<> WRA_0
    { id:  14, source:   7, target:  19,  type: "timed", name: "tRCD",         delay: tRCD,           age: -1 },  // ACT_1  -<> WRA_1
    { id: 152, source:   6, target:   6,  type: "timed", name: "tRC",          delay: tRC,            age: -1 },  // ACT_0  -<> ACT_0
    { id: 153, source:   7, target:   7,  type: "timed", name: "tRC",          delay: tRC,            age: -1 },  // ACT_1  -<> ACT_1
    { id: 108, source:   6, target:   7,  type: "timed", name: "tRRD",         delay: tRRD,           age: -1 },  // ACT_0  -<> ACT_1
    { id: 109, source:   7, target:   6,  type: "timed", name: "tRRD",         delay: tRRD,           age: -1 },  // ACT_1  -<> ACT_0 
    { id:  34, source:   6, target:  24,  type: "timed", name: "tACTPDEN",     delay: tACTPDEN,       age: -1 },  // ACT_0  -<> PDEA
    { id:  35, source:   7, target:  24,  type: "timed", name: "tACTPDEN",     delay: tACTPDEN,       age: -1 },  // ACT_1  -<> PDEA
    { id: 154, source:   6, target:   9,  type: "timed", name: "tRC",          delay: tRC,            age: -1 },  // ACT_0  -<> REFA
    { id: 155, source:   7, target:   9,  type: "timed", name: "tRC",          delay: tRC,            age: -1 },  // ACT_1  -<> REFA
  
    // Timing constraints from RD/RDA
    { id:   5, source:  12, target:  16,  type: "timed", name: "tRTP",         delay: tRTP,           age: -1 },  // RD_0   -<> PRE_0
    { id:  15, source:  17, target:  21,  type: "timed", name: "tRTP",         delay: tRTP,           age: -1 },  // RD_1   -<> PRE_1
    { id:  88, source:  12, target:   8,  type: "timed", name: "tRTP",         delay: tRTP,           age: -1 },  // RD_0   -<> PREA
    { id:  89, source:  17, target:   8,  type: "timed", name: "tRTP",         delay: tRTP,           age: -1 },  // RD_1   -<> PREA
    { id:  38, source:  12, target:  24,  type: "timed", name: "tRDPDEN",      delay: tRDPDEN,        age: -1 },  // RD_0   -<> PDEA
    { id:  39, source:  17, target:  24,  type: "timed", name: "tRDPDEN",      delay: tRDPDEN,        age: -1 },  // RD_1   -<> PDEA
    { id:  40, source:  12, target:  11,  type: "timed", name: "tRDPDEN",      delay: tRDPDEN,        age: -1 },  // RD_0   -<> PDEP
    { id:  41, source:  17, target:  11,  type: "timed", name: "tRDPDEN",      delay: tRDPDEN,        age: -1 },  // RD_1   -<> PDEP
    { id:  42, source:  15, target:  24,  type: "timed", name: "tRDPDEN",      delay: tRDPDEN,        age: -1 },  // RDA_0  -<> PDEA
    { id:  43, source:  20, target:  24,  type: "timed", name: "tRDPDEN",      delay: tRDPDEN,        age: -1 },  // RDA_1  -<> PDEA
    { id:  44, source:  15, target:  11,  type: "timed", name: "tRDPDEN",      delay: tRDPDEN,        age: -1 },  // RDA_0  -<> PDEP
    { id:  45, source:  20, target:  11,  type: "timed", name: "tRDPDEN",      delay: tRDPDEN,        age: -1 },  // RDA_1  -<> PDEP
    { id:  72, source:  12, target:  12,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // RD_0   -<> RD_0
    { id:  75, source:  17, target:  17,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // RD_1   -<> RD_1
    { id:  73, source:  12, target:  17,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // RD_0   -<> RD_1
    { id:  74, source:  17, target:  12,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // RD_1   -<> RD_0
    { id:  80, source:  12, target:  15,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // RD_0   -<> RDA_0
    { id:  83, source:  17, target:  20,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // RD_1   -<> RDA_1
    { id:  81, source:  12, target:  20,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // RD_0   -<> RDA_1
    { id:  82, source:  17, target:  15,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // RD_1   -<> RDA_0
    { id: 110, source:  15, target:  17,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // RDA_0  -<> RD_1
    { id: 111, source:  20, target:  12,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // RDA_1  -<> RD_0
    { id: 114, source:  15, target:  20,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // RDA_0  -<> RDA_1
    { id: 115, source:  20, target:  15,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // RDA_1  -<> RDA_0
    { id:  76, source:  12, target:  13,  type: "timed", name: "tRDWR",        delay: tRDWR,          age: -1 },  // RD_0   -<> WR_0
    { id:  79, source:  17, target:  18,  type: "timed", name: "tRDWR",        delay: tRDWR,          age: -1 },  // RD_1   -<> WR_1
    { id:  77, source:  12, target:  18,  type: "timed", name: "tRDWR",        delay: tRDWR,          age: -1 },  // RD_0   -<> WR_1
    { id:  78, source:  17, target:  13,  type: "timed", name: "tRDWR",        delay: tRDWR,          age: -1 },  // RD_1   -<> WR_0
    { id:  84, source:  12, target:  14,  type: "timed", name: "tRDWR",        delay: tRDWR,          age: -1 },  // RD_0   -<> WRA_0
    { id:  87, source:  17, target:  19,  type: "timed", name: "tRDWR",        delay: tRDWR,          age: -1 },  // RD_1   -<> WRA_1
    { id:  85, source:  12, target:  19,  type: "timed", name: "tRDWR",        delay: tRDWR,          age: -1 },  // RD_0   -<> WRA_1
    { id:  86, source:  17, target:  14,  type: "timed", name: "tRDWR",        delay: tRDWR,          age: -1 },  // RD_1   -<> WRA_0
    { id: 112, source:  15, target:  18,  type: "timed", name: "tRDWR",        delay: tRDWR,          age: -1 },  // RDA_0  -<> WR_1
    { id: 113, source:  20, target:  13,  type: "timed", name: "tRDWR",        delay: tRDWR,          age: -1 },  // RDA_1  -<> WR_0
    { id: 116, source:  15, target:  19,  type: "timed", name: "tRDWR",        delay: tRDWR,          age: -1 },  // RDA_0  -<> WRA_1
    { id: 117, source:  20, target:  14,  type: "timed", name: "tRDWR",        delay: tRDWR,          age: -1 },  // RDA_1  -<> WRA_0
    { id:   6, source:  15, target:   6,  type: "timed", name: "tRDAACT",      delay: tRDAACT,        age: -1 },  // RDA_0  -<> ACT_0
    { id:  16, source:  20, target:   7,  type: "timed", name: "tRDAACT" ,     delay: tRDAACT,        age: -1 },  // RDA_1  -<> ACT_1
    { id:  46, source:  15, target:   9,  type: "timed", name: "tRTP + tRP",   delay: (tRTP + tRP),   age: -1 },  // RDA_0  -<> REFA
    { id:  47, source:  20, target:   9,  type: "timed", name: "tRTP + tRP",   delay: (tRTP + tRP),   age: -1 },  // RDA_1  -<> REFA
    { id:  48, source:  15, target:  10,  type: "timed", name: "tRDPDEN",      delay: tRDPDEN,        age: -1 },  // RDA_0  -<> SREFEN
    { id:  49, source:  20, target:  10,  type: "timed", name: "tRDPDEN",      delay: tRDPDEN,        age: -1 },  // RDA_1  -<> SREFEN
    { id: 158, source:  15, target:   8,  type: "timed", name: "tRTP",         delay: tRTP,           age: -1 },  // RDA_0  -<> PREA
    { id: 159, source:  20, target:   8,  type: "timed", name: "tRTP",         delay: tRTP,           age: -1 },  // RDA_1  -<> PREA

    // Timing constraints from WR/WRA
    { id:   7, source:  13, target:  16,  type: "timed", name: "tWRPRE",       delay: tWRPRE,         age: -1 },  // WR_0   -<> PRE_0
    { id:  17, source:  18, target:  21,  type: "timed", name: "tWRPRE",       delay: tWRPRE,         age: -1 },  // WR_1   -<> PRE_1
    { id: 106, source:  13, target:   8,  type: "timed", name: "tWRPRE",       delay: tWRPRE,         age: -1 },  // WR_0   -<> PREA
    { id: 107, source:  18, target:   8,  type: "timed", name: "tWRPRE",       delay: tWRPRE,         age: -1 },  // WR_1   -<> PREA
    { id:  50, source:  13, target:  24,  type: "timed", name: "tWRPDEN",      delay: tWRPDEN,        age: -1 },  // WR_0   -<> PDEA
    { id:  51, source:  18, target:  24,  type: "timed", name: "tWRPDEN",      delay: tWRPDEN,        age: -1 },  // WR_1   -<> PDEA
    { id:  52, source:  14, target:  24,  type: "timed", name: "tWRAPDEN",     delay: tWRAPDEN,       age: -1 },  // WRA_0  -<> PDEA
    { id:  53, source:  19, target:  24,  type: "timed", name: "tWRAPDEN",     delay: tWRAPDEN,       age: -1 },  // WRA_1  -<> PDEA
    { id:  54, source:  14, target:  11,  type: "timed", name: "tWRAPDEN",     delay: tWRAPDEN,       age: -1 },  // WRA_0  -<> PDEP
    { id:  55, source:  19, target:  11,  type: "timed", name: "tWRAPDEN",     delay: tWRAPDEN,       age: -1 },  // WRA_1  -<> PDEP
    { id:  90, source:  13, target:  13,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // WR_0   -<> WR_0
    { id:  93, source:  18, target:  18,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // WR_1   -<> WR_1
    { id:  91, source:  13, target:  18,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // WR_0   -<> WR_1
    { id:  92, source:  18, target:  13,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // WR_1   -<> WR_0
    { id:  98, source:  13, target:  14,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // WR_0   -<> WRA_0
    { id: 101, source:  18, target:  19,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // WR_1   -<> WRA_1
    { id:  99, source:  13, target:  19,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // WR_0   -<> WRA_1
    { id: 100, source:  18, target:  14,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // WR_1   -<> WRA_0
    { id: 118, source:  14, target:  18,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // WRA_0  -<> WR_1
    { id: 119, source:  14, target:  13,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // WRA_1  -<> WR_0
    { id: 122, source:  14, target:  19,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // WRA_0  -<> WRA_1
    { id: 123, source:  14, target:  14,  type: "timed", name: "tCCD",         delay: tCCD,           age: -1 },  // WRA_1  -<> WRA_0
    { id:  94, source:  13, target:  12,  type: "timed", name: "tWRRD",        delay: tWRRD,          age: -1 },  // WR_0   -<> RD_0
    { id:  97, source:  18, target:  17,  type: "timed", name: "tWRRD",        delay: tWRRD,          age: -1 },  // WR_1   -<> RD_1
    { id:  95, source:  13, target:  17,  type: "timed", name: "tWRRD",        delay: tWRRD,          age: -1 },  // WR_0   -<> RD_1
    { id:  96, source:  18, target:  12,  type: "timed", name: "tWRRD",        delay: tWRRD,          age: -1 },  // WR_1   -<> RD_0
    { id: 102, source:  13, target:  15,  type: "timed", name: "tWRRD",        delay: tWRRD,          age: -1 },  // WR_0   -<> RDA_0
    { id: 105, source:  18, target:  20,  type: "timed", name: "tWRRD",        delay: tWRRD,          age: -1 },  // WR_1   -<> RDA_1
    { id: 103, source:  13, target:  20,  type: "timed", name: "tWRRD",        delay: tWRRD,          age: -1 },  // WR_0   -<> RDA_1
    { id: 104, source:  18, target:  15,  type: "timed", name: "tWRRD",        delay: tWRRD,          age: -1 },  // WR_1   -<> RDA_0
    { id: 120, source:  14, target:  17,  type: "timed", name: "tWRRD",        delay: tWRRD,          age: -1 },  // WRA_0  -<> RD_1
    { id: 121, source:  14, target:  12,  type: "timed", name: "tWRRD",        delay: tWRRD,          age: -1 },  // WRA_1  -<> RD_0
    { id: 124, source:  14, target:  20,  type: "timed", name: "tWRRD",        delay: tWRRD,          age: -1 },  // WRA_0  -<> RDA_1
    { id: 125, source:  14, target:  15,  type: "timed", name: "tWRRD",        delay: tWRRD,          age: -1 },  // WRA_1  -<> RDA_0
    { id:   8, source:  14, target:   6,  type: "timed", name: "tWRAACT",      delay: tWRAACT,        age: -1 },  // WRA_0  -<> ACT_0
    { id:  18, source:  19, target:   7,  type: "timed", name: "tWRAACT",      delay: tWRAACT,        age: -1 },  // WRA_1  -<> ACT_1
    { id:  56, source:  14, target:   9,  type: "timed", name: "tWRPRE + tRP", delay: (tWRPRE + tRP), age: -1 },  // WRA_0  -<> REFA
    { id:  57, source:  19, target:   9,  type: "timed", name: "tWRPRE + tRP", delay: (tWRPRE + tRP), age: -1 },  // WRA_1  -<> REFA
    { id:  58, source:  14, target:  10,  type: "timed", name: "tWRPRE + tRP", delay: (tWRPRE + tRP), age: -1 },  // WRA_0  -<> SREFEN
    { id:  59, source:  19, target:  10,  type: "timed", name: "tWRPRE + tRP", delay: (tWRPRE + tRP), age: -1 },  // WRA_1  -<> SREFEN
    { id: 160, source:  14, target:   8,  type: "timed", name: "tWRPRE",       delay: tWRPRE,         age: -1 },  // WRA_0  -<> PREA
    { id: 161, source:  19, target:   8,  type: "timed", name: "tWRPRE",       delay: tWRPRE,         age: -1 },  // WRA_1  -<> PREA
  
    // Timing constraints from PRE/PREA
    { id:   9, source:  16, target:   6,  type: "timed", name: "tRP",          delay: tRP,            age: -1 },  // PRE_0  -<> ACT_0
    { id:  19, source:  21, target:   7,  type: "timed", name: "tRP",          delay: tRP,            age: -1 },  // PRE_1  -<> ACT_1
    { id: 126, source:  16, target:   9,  type: "timed", name: "tRP",          delay: tRP,            age: -1 },  // PRE_0  -<> REFA
    { id: 127, source:  21, target:   9,  type: "timed", name: "tRP",          delay: tRP,            age: -1 },  // PRE_1  -<> REFA
    { id:  36, source:  16, target:  24,  type: "timed", name: "tPRPDEN",      delay: tPRPDEN,        age: -1 },  // PRE_0  -<> PDEA
    { id:  37, source:  21, target:  24,  type: "timed", name: "tPRPDEN",      delay: tPRPDEN,        age: -1 },  // PRE_1  -<> PDEA
    { id: 128, source:  16, target:  11,  type: "timed", name: "tPRPDEN",      delay: tPRPDEN,        age: -1 },  // PRE_0  -<> PDEP
    { id: 129, source:  21, target:  11,  type: "timed", name: "tPRPDEN",      delay: tPRPDEN,        age: -1 },  // PRE_1  -<> PDEP
    { id: 130, source:  16, target:  10,  type: "timed", name: "tRP",          delay: tRP,            age: -1 },  // PRE_0  -<> SREFEN
    { id: 131, source:  21, target:  10,  type: "timed", name: "tRP",          delay: tRP,            age: -1 },  // PRE_1  -<> SREFEN
    { id: 148, source:   8, target:   6,  type: "timed", name: "tRP",          delay: tRP,            age: -1 },  // PREA   -<> ACT_0
    { id: 149, source:   8, target:   7,  type: "timed", name: "tRP",          delay: tRP,            age: -1 },  // PREA   -<> ACT_1
    { id: 134, source:   8, target:   9,  type: "timed", name: "tRP",          delay: tRP,            age: -1 },  // PREA   -<> REFA
    { id: 143, source:   8, target:  11,  type: "timed", name: "tPRPDEN",      delay: tPRPDEN,        age: -1 },  // PREA   -<> PDEP
    { id: 144, source:   8, target:  10,  type: "timed", name: "tRP",          delay: tRP,            age: -1 },  // PREA   -<> SREFEN
  
    // Timing constraints from PDN
    { id: 135, source:  11, target:  23,  type: "timed", name: "tPD",          delay: tPD,            age: -1 },  // PDEP   -<> PDXP
    { id: 136, source:  24, target:  22,  type: "timed", name: "tPD",          delay: tPD,            age: -1 },  // PDEA   -<> PDXA
    { id: 140, source:  22, target:  24,  type: "timed", name: "tCKE",         delay: tCKE,           age: -1 },  // PDXA   -<> PDEA
    { id: 137, source:  23, target:  11,  type: "timed", name: "tCKE",         delay: tCKE,           age: -1 },  // PDXP   -<> PDEP
    { id: 138, source:  23, target:   9,  type: "timed", name: "tXP",          delay: tXP,            age: -1 },  // PDXP   -<> REFA
    { id: 139, source:  23, target:  10,  type: "timed", name: "tXP",          delay: tXP,            age: -1 },  // PDXP   -<> SREFEN
    { id:  60, source:  22, target:   6,  type: "timed", name: "tXP",          delay: tXP,            age: -1 },  // PDXA   -<> ACT_0
    { id:  61, source:  22, target:   7,  type: "timed", name: "tXP",          delay: tXP,            age: -1 },  // PDXA   -<> ACT_1
    { id:  22, source:  23, target:   6,  type: "timed", name: "tXP",          delay: tXP,            age: -1 },  // PDXP   -<> ACT_0
    { id:  23, source:  23, target:   7,  type: "timed", name: "tXP",          delay: tXP,            age: -1 },  // PDXP   -<> ACT_1
    { id:  70, source:  22, target:  16,  type: "timed", name: "tXP",          delay: tXP,            age: -1 },  // PDXA   -<> PRE_0
    { id:  71, source:  22, target:  21,  type: "timed", name: "tXP",          delay: tXP,            age: -1 },  // PDXA   -<> PRE_1
    { id: 141, source:  22, target:   8,  type: "timed", name: "tXP",          delay: tXP,            age: -1 },  // PDXA   -<> PREA
    { id:  62, source:  22, target:  12,  type: "timed", name: "tXP",          delay: tXP,            age: -1 },  // PDXA   -<> RD_0
    { id:  63, source:  22, target:  17,  type: "timed", name: "tXP",          delay: tXP,            age: -1 },  // PDXA   -<> RD_1
    { id:  66, source:  22, target:  15,  type: "timed", name: "tXP",          delay: tXP,            age: -1 },  // PDXA   -<> RDA_0
    { id:  67, source:  22, target:  20,  type: "timed", name: "tXP",          delay: tXP,            age: -1 },  // PDXA   -<> RDA_1
    { id:  64, source:  22, target:  13,  type: "timed", name: "tXP",          delay: tXP,            age: -1 },  // PDXA   -<> WR_0
    { id:  65, source:  22, target:  18,  type: "timed", name: "tXP",          delay: tXP,            age: -1 },  // PDXA   -<> WR_1
    { id:  68, source:  22, target:  14,  type: "timed", name: "tXP",          delay: tXP,            age: -1 },  // PDXA   -<> WRA_0
    { id:  69, source:  22, target:  19,  type: "timed", name: "tXP",          delay: tXP,            age: -1 },  // PDXA   -<> WRA_1
    
    // Timing constraints from REFA/SREF
    { id:  20, source:   9, target:   6,  type: "timed", name: "tRFC" ,        delay: tRFC,           age: -1 },  // REFA   -<> ACT_0
    { id:  21, source:   9, target:   7,  type: "timed", name: "tRFC",         delay: tRFC,           age: -1 },  // REFA   -<> ACT_1
    { id: 132, source:   9, target:   9,  type: "timed", name: "tRFC",         delay: tRFC,           age: -1 },  // REFA   -<> REFA
    { id: 150, source:   9, target:   8,  type: "timed", name: "tRFC",         delay: tRFC,           age: -1 },  // REFA   -<> PREA
    { id: 151, source:   9, target:  10,  type: "timed", name: "tRFC",         delay: tRFC,           age: -1 },  // REFA   -<> SREFEN
    { id: 133, source:   9, target:  11,  type: "timed", name: "tREFPDEN",     delay: tREFPDEN,       age: -1 },  // REFA   -<> PDEP
    { id:  24, source:  25, target:   6,  type: "timed", name: "tXS",          delay: tXS,            age: -1 },  // SREFEX -<> ACT_0
    { id:  25, source:  25, target:   7,  type: "timed", name: "tXS",          delay: tXS,            age: -1 },  // SREFEX -<> ACT_1
    { id: 145, source:  25, target:   9,  type: "timed", name: "tXS",          delay: tXS,            age: -1 },  // SREFEX -<> REFA
    { id: 146, source:  25, target:  11,  type: "timed", name: "tXS",          delay: tXS,            age: -1 },  // SREFEX -<> PDEP
    { id: 147, source:  25, target:  10,  type: "timed", name: "tXS",          delay: tXS,            age: -1 },  // SREFEX -<> SREFEN
    { id:  26, source:  25, target:  12,  type: "timed", name: "tXSDLL",       delay: tXSDLL,         age: -1 },  // SREFEX -<> RD_0
    { id:  27, source:  25, target:  17,  type: "timed", name: "tXSDLL",       delay: tXSDLL,         age: -1 },  // SREFEX -<> RD_1
    { id:  28, source:  25, target:  15,  type: "timed", name: "tXSDLL",       delay: tXSDLL,         age: -1 },  // SREFEX -<> RDA_0
    { id:  29, source:  25, target:  20,  type: "timed", name: "tXSDLL",       delay: tXSDLL,         age: -1 },  // SREFEX -<> RDA_1
    { id:  30, source:  25, target:  13,  type: "timed", name: "tXSDLL",       delay: tXSDLL,         age: -1 },  // SREFEX -<> WR_0
    { id:  31, source:  25, target:  18,  type: "timed", name: "tXSDLL",       delay: tXSDLL,         age: -1 },  // SREFEX -<> WR_1
    { id:  32, source:  25, target:  14,  type: "timed", name: "tXSDLL",       delay: tXSDLL,         age: -1 },  // SREFEX -<> WRA_0
    { id:  33, source:  25, target:  19,  type: "timed", name: "tXSDLL",       delay: tXSDLL,         age: -1 },  // SREFEX -<> WRA_1
    { id: 142, source:  10, target:  25,  type: "timed", name: "tCKESR",       delay: tCKESR,         age: -1 },  // SREFEN -<> SREFEX    
 ]    
};

function fireTransition(node) {
    
    // Get Clicked Transition:
    var transition = petriNet.transitions.filter(function(d) {
        return d.name == node;
    })[0];
    
    //console.log(transition);

    if(transition.enabled == 1 && transition.inhibited == 0 && transition.timedInhibited == 0)
    {
        // Clear connected Places with reset arcs:
        petriNet.arcs.filter(function(d) { // Get all input arcs:
            return (d.target == transition.id) && (d.type == "reset");
        }).forEach(function(arc, i) { // Foreach input arc get the source place:
            var place = petriNet.places.filter(function(f) {
                return f.id == arc.source;
            })[0];
            place.tokens = 0;
        });
        
        // Clear connected input place:
        petriNet.arcs.filter(function(d) { // Get all input arcs:
            return (d.target == transition.id) && (d.type == "normal");
        }).forEach(function(arc, i) { // Foreach input arc get the source place:
            if(arc.source != -1)
            {
                var place = petriNet.places.filter(function(f) {
                    return f.id == arc.source;
                })[0];
                place.tokens -= arc.weight;
            }
        });

        // Set connected output place:
        petriNet.arcs.filter(function(d) { // Get all input arcs:
            return (d.source == transition.id) && (d.type == "normal");
        }).forEach(function(arc, i) { // Foreach input arc get the source place:
            var place = petriNet.places.filter(function(f) {
                return f.id == arc.target;
            })[0];
            place.tokens += arc.weight;
        });
        
        // Set all connected timing arcs to age of 0:
        petriNet.arcs.filter(function(arc) { // Get all timed arcs:
            return (arc.source == transition.id) && (arc.type == "timed");
        }).forEach(function(arc, i) { // Foreach connected timed arc set the age to zero
            console.log("FOUND");
            arc.age = 0;
        });    
          
        checkEnabled();
        checkInhibited();
        checkTimed();
        
        display();
    }
}

function checkTimed()
{
    petriNet.transitions.forEach(function(trans, i) {    
        timedInhibited = 0;
        petriNet.arcs.filter(function(arc) {
                return trans.id == arc.target;
        }).forEach(function(arc, i) {
            timedArrow = document.getElementById("timedArrow-" + arc.id);
            timedArrowText = document.getElementById("timedArrowText-" + arc.id);
            
            if(timedArrow != null) {
                timedArrow.style.visibility = 'hidden';
                timedArrowText.style.visibility = 'hidden';
            }
            
            if(arc.age < arc.delay && arc.age != -1) {
                timedInhibited++;
                if(timedArrow != null) {
                    timedArrow.style.visibility = 'visible';
                    timedArrowText.style.visibility = 'visible';
                }    
            }
        });
        
        if(timedInhibited == 0) {
            trans.timedInhibited = 0;
        } else {
            trans.timedInhibited = 1;
        }
    });
}

function checkInhibited()
{
    // Mark all enabled transitions:
    petriNet.transitions.forEach(function(transition, j) {
        transition.inhibited = 0;
        petriNet.arcs.filter(function(d) { // Get all input arcs:
            return (d.target == transition.id) && (d.type == "inhibitor");
        }).forEach(function(arc, i) { // Foreach input arc get the source place:
            petriNet.places.filter(function(f) {
                return f.id == arc.source;
            }).forEach(function(place, k) {
                // TODO
                if (place.tokens >= arc.weight) {
                    transition.inhibited = 1;
                }
            });
        });
    });
}

function checkEnabled()
{
    // Mark all enabled transitions:
    petriNet.transitions.forEach(function(transition, j) {
        petriNet.arcs.filter(function(d) { // Get all input arcs:
            return (d.target == transition.id) && (d.type == "normal");
        }).forEach(function(arc, i) { // Foreach input arc get the source place:
            if(arc.source != -1) {
                var place = petriNet.places.filter(function(f) {
                    return f.id == arc.source;
                })[0];

                // The transition is enabled when the connected
                // place has more or equal tokens as the weight
                if(place.tokens >= arc.weight) {
                    transition.enabled = 1;
                } else {    
                    transition.enabled = 0;
                }
            } else {
                transition.enabled = 1;
            }
        });
    });
}


function drawline (id, name, x1, x2, y1, y2) {
    var svg = document.getElementById("svg4141");
    NS = svg.getAttribute('xmlns');
    var pt1 = svg.createSVGPoint();
    var pt2 = svg.createSVGPoint();

    pt1.x = x1;
    pt1.y = y1;
    pt2.x = x2;
    pt2.y = y2;

    var pt1b = pt1.matrixTransform(svg.getScreenCTM().inverse());
    var pt2b = pt2.matrixTransform(svg.getScreenCTM().inverse());

    if (x1 == x2 && y1 == y2) {
        var ellipticLine = document.createElementNS(NS, 'path');
        ellipticLine.setAttributeNS(null, 'id', "timedArrow-" + id);    //M = start coordinate , rx = 14 , ry = 8 , x-rotation(in degree)/large-arc-flag/sweep-flag = 0 , last statement = end coordinate
        ellipticLine.setAttributeNS(null, 'd',"M " + pt1b.x + "," + pt1b.y + " A 14 8 0 0 0 " + pt1b.x + "," + (pt1b.y + 32));
        ellipticLine.setAttributeNS(null, "stroke", "blue");
        ellipticLine.setAttributeNS(null, "fill", "none");
        ellipticLine.setAttributeNS(null, "marker-end", "url(#DiamondL)");
        ellipticLine.setAttributeNS(null, "visibility", "hidden");
        svg.append(ellipticLine);
    } else {
        var newLine = document.createElementNS(NS, 'line');
        newLine.setAttributeNS(null, 'id', "timedArrow-" + id);
        newLine.setAttributeNS(null, 'x1', pt1b.x + 16);
        newLine.setAttributeNS(null, 'y1', pt1b.y + 16);
        newLine.setAttributeNS(null, 'x2', pt2b.x + 16);
        newLine.setAttributeNS(null, 'y2', pt2b.y + 16);
        newLine.setAttributeNS(null, "stroke", "blue");
        newLine.setAttributeNS(null, "marker-end", "url(#DiamondL)");
        newLine.setAttributeNS(null, "visibility", "hidden");
        svg.append(newLine);
    }        
    var newText = document.createElementNS(NS, "text");
    if (x1 == x2 && y1 == y2) {
        newText.setAttributeNS(null, "x", (pt1b.x - 16));        
        newText.setAttributeNS(null, "y", (pt1b.y - 12));
    } else {
        newText.setAttributeNS(null, "x", (pt1b.x - pt2b.x) / 2 + pt2b.x);
        newText.setAttributeNS(null, "y", (pt1b.y - pt2b.y) / 2 + pt2b.y);
    }
    newText.setAttributeNS(null, "font-size", "16");
    newText.setAttributeNS(null, "fill", "blue");
    newText.setAttributeNS(null, 'id', "timedArrowText-" + id);
    newText.setAttributeNS(null, "visibility", "hidden");

    var textNode = document.createTextNode(name);
    newText.appendChild(textNode);

    svg.append(newText);
}

function init(evt) {
    checkEnabled();
    checkInhibited();
    display();
    setTimeout(clock, tCKinRT);
    
    petriNet.arcs.filter(function(arc) { // Get all timed arcs:
    return (arc.type == "timed");
    }).forEach(function(arc, i) {
        var transSource = petriNet.transitions.filter(function(f) {
                return f.id == arc.source;
        })[0];
        
        var transTarget = petriNet.transitions.filter(function(f) {
                return f.id == arc.target;
        })[0];
        
        var rect1 = document.getElementById(transSource.name).getBoundingClientRect();
        var rect2 = document.getElementById(transTarget.name).getBoundingClientRect();
        drawline(arc.id, arc.name, rect1.left, rect2.left, rect1.top, rect2.top);
    })
    
    
    
    // Register the click handler for all Transitions:
    for (i = 0; i < petriNet.transitions.length; i++) {
        (function(name) {
           document.getElementById(name).addEventListener('click', function() {
                clickHandler(name);
           });
        })(petriNet.transitions[i].name);
    }
}

function clickHandler(node)
{
    fireTransition(node)
}

function display()
{
    petriNet.transitions.forEach(function(transition, j) {
        if(transition.enabled == 1 && transition.inhibited == 0 && transition.timedInhibited == 0) {
            document.getElementById(transition.name).style.fill = '#55d400';
        } else {
            document.getElementById(transition.name).style.fill = '#d40000';
        }
    });

    // Clear Tokens:
    document.getElementById("T_0").style.visibility = 'hidden';
    document.getElementById("T_1").style.visibility = 'hidden';
    document.getElementById("T_IDLE_0").style.visibility  = 'hidden';
    document.getElementById("T_IDLE_1").style.visibility  = 'hidden';
    document.getElementById("T_PDNA").style.visibility = 'hidden';
    document.getElementById("T_SREF").style.visibility = 'hidden';
    document.getElementById("T_PDNP").style.visibility = 'hidden';

    // Show Tokens:
    petriNet.places.forEach(function(place, j) {
        if(place.name == "BANK_0" && place.tokens == 1) {
            document.getElementById("T_0").style.visibility = 'visible';
        } else if(place.name == "BANK_1" && place.tokens == 1) {
            document.getElementById("T_1").style.visibility = 'visible';
        } else if(place.name == "IDLE" && place.tokens == 1) {
            document.getElementById("T_IDLE_0").style.visibility = 'visible';
        } else if(place.name == "IDLE" && place.tokens == 2) {
            document.getElementById("T_IDLE_0").style.visibility = 'visible';
            document.getElementById("T_IDLE_1").style.visibility = 'visible';
        } else if(place.name == "PDNA" && place.tokens == 1) {
            document.getElementById("T_PDNA").style.visibility = 'visible';
        } else if(place.name == "SREF" && place.tokens == 1) {
            document.getElementById("T_SREF").style.visibility = 'visible';
        } else if(place.name == "PDNP" && place.tokens == 1) {
            document.getElementById("T_PDNP").style.visibility = 'visible';
        }
    });

    // Heart Beat
    if (blinker == 0 ) {
        document.getElementById("heart").style.fill = 'white';
        blinker = 1;
    } else {
        document.getElementById("heart").style.fill = 'red';
        blinker = 0;
    }
}

function clock() {
    //console.log(document.getElementById("REFA").style.fill);

    petriNet.arcs.filter(function(d) { // Get all timing arcs:
        return (d.type == "timed");
    }).forEach(function(arc, i) { // Foreach timed arc increase the age:
        if(arc.age != -1) {
            arc.age += tCK;
        }
    });
    
    checkTimed();
    display();

    setTimeout(clock, tCKinRT);
}
