export const TILE = 16;
export const COLS = 32;
export const ROWS = 22;

// Tile IDs
export const T = { LAND:0, PATH:1, TREE:2, MOUN:3, WATR:4, CITY:5 };

// Expressionist Berlin palette
export const PAL = {
  land:  '#1e2416',
  land2: '#222a18',
  path:  '#3c3428',
  path2: '#322c22',
  tree:  '#0e180a',
  tree2: '#162010',
  moun:  '#26202e',
  moun2: '#302638',
  watr:  '#0e1620',
  watr2: '#121e2a',
  city:  '#2a2418',
  sky:   '#111018',
};

export const CITIES = [
  { id:'berlin', name:'Berlin',            col:16, row:6,  color:'#4a7aaa', done_color:'#2a3a4a' },
  { id:'weimar', name:'Weimar',            col:5,  row:11, color:'#c87840', done_color:'#4a3218' },
  { id:'prag',   name:'Prag',              col:24, row:10, color:'#3a8848', done_color:'#1a3820' },
  { id:'wien',   name:'Wien',              col:22, row:18, color:'#b83838', done_color:'#481818' },
];

// Full chapter name for UI (the id maps to CHAPTERS)
export const CITY_FULL_NAMES = {
  berlin: 'Berlin',
  weimar: 'Weimarer Republik',
  prag:   'Prag',
  wien:   'Wien',
};

export const SPECIALS = [
  { id: 'matching', name: 'Redaktion', col: 13, row: 16, color: '#c09040' },
];

function bresenham(map, r1, c1, r2, c2) {
  let dr = Math.abs(r2-r1), dc = Math.abs(c2-c1);
  let sr = r1<r2 ? 1:-1, sc = c1<c2 ? 1:-1;
  let err = (dc>dr ? dc:-dr)/2, r=r1, c=c1;
  for (;;) {
    if (r>=0&&r<ROWS&&c>=0&&c<COLS) map[r][c] = T.PATH;
    if (r===r2&&c===c2) break;
    let e2=err;
    if (e2>-dc){err-=dr;c+=sc;}
    if (e2< dr){err+=dc;r+=sr;}
  }
}

export function buildMap() {
  const map = Array.from({length:ROWS}, ()=>new Array(COLS).fill(T.LAND));

  // Border water
  for (let r=0;r<ROWS;r++) for (let c=0;c<COLS;c++)
    if (r<=1||r>=ROWS-2||c<=1||c>=COLS-2) map[r][c]=T.WATR;

  // Forest clusters (set BEFORE paths so paths override them)
  const forests = [
    [2,2,5,6],[2,20,6,30],[8,2,14,4],
    [12,16,17,20],[14,26,19,30],[3,27,6,30],
  ];
  forests.forEach(([r1,c1,r2,c2])=>{
    for (let r=r1;r<=r2;r++) for (let c=c1;c<=c2;c++)
      if (map[r][c]===T.LAND) map[r][c]=T.TREE;
  });

  // Mountain cluster
  [[15,2,20,8],[2,10,5,14]].forEach(([r1,c1,r2,c2])=>{
    for (let r=r1;r<=r2;r++) for (let c=c1;c<=c2;c++)
      if (map[r][c]===T.LAND) map[r][c]=T.MOUN;
  });

  // Paths between cities (override forests/mountains)
  bresenham(map, 6,16, 11,5);   // Berlin  → Weimar
  bresenham(map, 6,16, 10,24);  // Berlin  → Prag
  bresenham(map, 11,5, 10,24);  // Weimar  → Prag
  bresenham(map, 10,24,18,22);  // Prag    → Wien
  bresenham(map, 11,5, 18,22);  // Weimar  → Wien

  // City pads (3×3 walkable area around each city center)
  CITIES.forEach(({col,row})=>{
    for (let dr=-1;dr<=1;dr++) for (let dc=-1;dc<=1;dc++){
      const r=row+dr,c=col+dc;
      if (r>1&&r<ROWS-2&&c>1&&c<COLS-2) map[r][c]=T.CITY;
    }
  });

  // Special location pads
  SPECIALS.forEach(({col,row})=>{
    for (let dr=-1;dr<=1;dr++) for (let dc=-1;dc<=1;dc++){
      const r=row+dr,c=col+dc;
      if (r>1&&r<ROWS-2&&c>1&&c<COLS-2) map[r][c]=T.CITY;
    }
  });

  return map;
}

export const MAP = buildMap();

export function isWalkable(c,r){
  if (c<0||c>=COLS||r<0||r>=ROWS) return false;
  const t=MAP[r][c];
  return t===T.LAND||t===T.PATH||t===T.CITY;
}
