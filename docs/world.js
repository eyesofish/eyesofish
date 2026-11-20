// Original pixel scenery. Each level has a cached background and foreground.
// Moving details are drawn between them; the camera travels down the stack.
const clamp = (n, low, high) => Math.max(low, Math.min(n, high));
const snap = Math.round;

function random(seed) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function layer(w, h, paint) {
  const image = document.createElement("canvas");
  image.width = w;
  image.height = h;
  paint(image.getContext("2d"));
  return image;
}

function rect(g, color, x, y, w, h) {
  g.fillStyle = color;
  g.fillRect(snap(x), snap(y), snap(x + w) - snap(x), snap(y + h) - snap(y));
}

function poly(g, color, points) {
  g.fillStyle = color;
  g.beginPath();
  for (let i = 0; i < points.length; i += 2) {
    if (i === 0) g.moveTo(snap(points[i]), snap(points[i + 1]));
    else g.lineTo(snap(points[i]), snap(points[i + 1]));
  }
  g.closePath();
  g.fill();
}

function box(g, x, y, width, height, depth, top, front, side) {
  const rise = snap(depth * .57);
  poly(g, side, [x + width, y, x + width + depth, y - rise,
    x + width + depth, y + height - rise, x + width, y + height]);
  rect(g, front, x, y, width, height);
  poly(g, top, [x, y, x + depth, y - rise, x + width + depth, y - rise, x + width, y]);
}

function wash(g, w, h, stops) {
  const gradient = g.createLinearGradient(0, 0, 0, h);
  for (const [at, color] of stops) gradient.addColorStop(at, color);
  g.fillStyle = gradient;
  g.fillRect(0, 0, w, h);
}

// A terraced ridge. Coordinates are fractions of the scene so its peaks can
// be art-directed around the cabin at both portrait and landscape widths.
function ridge(g, w, h, points, color, step = 3) {
  for (let i = 1; i < points.length; i++) {
    const [ax, ay] = points[i - 1];
    const [bx, by] = points[i];
    const a = snap(ax * w), b = snap(bx * w);
    for (let x = a; x < b; x += step) {
      const y = step * snap(h * (ay + (by - ay) * (x - a) / (b - a)) / step);
      rect(g, color, x, y, Math.min(step, b - x), h - y);
    }
  }
}

function pine(g, x, y, size, colors) {
  const [dark, middle, light] = colors;
  rect(g, dark, x - size, y - 10 * size, 2 * size, 10 * size);
  for (const [width, offset] of [[6, 5], [5, 9], [3, 13], [1, 16]]) {
    rect(g, dark, x - width * size, y - offset * size, (2 * width + 1) * size, 3 * size);
    rect(g, middle, x - (width - 1) * size, y - (offset + 2) * size, (2 * width - 1) * size, 3 * size);
    rect(g, light, x - (width - 1) * size, y - (offset + 2) * size, width * size, size);
  }
}

function oak(g, x, y, s, light = true) {
  const colors = light ? ["#6eab63", "#467f4f", "#285f45"] : ["#3f7655", "#315f4b", "#224c42"];
  box(g, x, y - 25 * s, 4 * s, 25 * s, 3 * s, "#896548", "#76543b", "#533e32");
  rect(g, "#a0794d", x + s, y - 12 * s, s, 7 * s);
  for (const [dx, dy, n, high] of [[-11,-33,16,10],[-1,-40,13,12],[4,-30,13,10],[-6,-27,13,8]]) {
    const a = x + dx * s, b = y + dy * s;
    box(g, a, b, n * s, high * s, 6 * s, ...colors);
    for (const [u,v] of [[2,3],[6,1],[4,6],[9,4]]) {
      rect(g, colors[0], a + u*s, b + v*s, 2*s, s);
    }
  }
}

function cottage(g, x, y, s) {
  g.save();
  g.translate(snap(x), snap(y));
  g.scale(s, s);
  box(g, -2,-3, 45,4,13, "#aaa483","#827f6d","#62675b");
  box(g, 0,-25, 41,22,12, "#d6a36e","#bd895d","#946448");
  for (let dy = -22; dy < -3; dy += 4) {
    rect(g,"#dca66b",1,dy,40,1);
    poly(g,"#a27350",[41,dy,53,dy-7,53,dy-6,41,dy+1]);
  }
  for (const a of [0, 21, 38]) rect(g,"#624934",a,-25,3,22);
  rect(g,"#71523c",27,-18,8,15);
  rect(g,"#986746",28,-17,6,13);
  rect(g,"#ecc16f",32,-11,1,1);
  for (const a of [4, 12]) {
    rect(g,"#554333",a,-19,8,10);
    rect(g,"#c5dbca",a+1,-18,6,8);
    rect(g,"#87aaa9",a+1,-14,6,4);
    rect(g,"#835638",a+3,-18,1,8);
  }
  box(g,3,-9,18,2,2,"#ddae79","#975936","#774c35");
  poly(g,"#89a9a4",[45,-19,50,-22,50,-13,45,-10]);
  box(g,28,-38,5,12,4,"#c2a090","#986d5d","#755546");
  // Each roof course is a pair of stair blocks with a visible shingle edge.
  for (let row = 0; row < 8; row++) {
    const left = 9 - 2 * row, top = -40 + row * 2, apex = 11 + 2 * row;
    rect(g,"#cb9664",left,top,apex-left,2);
    rect(g,"#f0ae72",left,top,3,1);
    poly(g, row % 2 ? "#a95b3e" : "#c0734c",
      [apex,top,apex+12,top-7,apex+33,top-7,apex+21,top,apex+21,top+2,apex,top+2]);
    for (let shingle = 4 + row % 3; shingle < 26; shingle += 8) {
      rect(g,"#d78b58",apex+shingle,top,3,1);
    }
  }
  rect(g,"#674536",-5,-24,55,2);
  rect(g,"#775039",9,-32,5,5);
  rect(g,"#efbf78",10,-31,3,3);
  box(g,24,-2,12,2,4,"#be9b69","#947349","#6a553c");
  g.restore();
}

function surface(w, fullHeight) {
  // On phones the landscape sits above the bottom-aligned profile introduction.
  const h = w < fullHeight * .9 ? snap(fullHeight * .61) : fullHeight;
  const scale = clamp(Math.min(w / 295, h / 152), .82, 1.85);
  const home = { x: snap(w * .66 - 7 * scale), y: snap(h * .72), scale };
  const shore = snap(h * .61);
  const base = layer(w, h, g => {
    wash(g,w,h,[[0,"#60afc8"],[.3,"#a3d4d5"],[.52,"#f8deb1"],[.68,"#e8bd91"],[1,"#75abb0"]]);
    const side = snap(h * .103), x = snap(w * .72), y = snap(h * .19);
    rect(g,"#f6d6a0",x-4,y-4,side+8,side+8);
    rect(g,"#ffe2a3",x-2,y-2,side+4,side+4);
    rect(g,"#fff3c5",x,y,side,side);
  });
  const nightSky = layer(w,h,g => {
    wash(g,w,h,[[0,"#273556"],[.3,"#4a5978"],[.6,"#859298"],[1,"#748b90"]]);
    const r=random(343), side=snap(h*.064), mx=w*.82, my=h*.14;
    rect(g,"#b8c9c3",mx-1,my-1,side+2,side+2);
    rect(g,"#e2e4c8",mx,my,side,side);
    rect(g,"#c5d1c2",mx+side*.48,my+side*.56,side*.25,side*.23);
    for(let i=0;i<w/9;i++) rect(g,i%3?"#becbcb":"#eef0d3",r()*w,h*(.05+r()*.38),1,1);
  });
  const valley = layer(w, h, g => {
    ridge(g,w,h,[[0,.49],[.08,.44],[.18,.48],[.28,.33],[.34,.40],[.47,.21],[.55,.34],[.60,.30],[.72,.5],[.86,.34],[1,.46]],"#89b0b3");
    poly(g,"#a5c6c2",[.27*w,.38*h,.29*w,.36*h,.32*w,.405*h,.34*w,.41*h,
      .47*w,.21*h,.45*w,.3*h,.475*w,.34*h,.445*w,.36*h,.47*w,.40*h,.41*w,.47*h,.30*w,.47*h]);
    poly(g,"#9bbdba",[.60*w,.30*h,.58*w,.36*h,.60*w,.39*h,.59*w,.42*h,.55*w,.46*h,.49*w,.45*h]);
    // Mountain caps remain small, with square cuts as the snowline descends.
    for (const [x,y,k] of [[.47,.218,1],[.28,.335,.52],[.60,.315,.46],[.86,.355,.52]]) {
      const sx=snap(x*w), sy=snap(y*h), n=clamp(snap(k*h*.065),4,21);
      for (let i=0; i<6; i++) {
        const width=snap((i+1)*n/5);
        rect(g,i%3 === 0 ? "#e9e9ce" : "#d5dfcf",sx-width,sy+i*2,width*1.8,2);
        rect(g,"#b9ceca",sx+1,sy+i*2,Math.max(1,width*.7),2);
      }
    }
    ridge(g,w,h,[[0,.41],[.09,.42],[.20,.5],[.29,.47],[.38,.53],[.48,.41],[.58,.51],[.72,.47],[.87,.54],[1,.43]],"#629998");
    const r = random(84);
    for (let x=-7; x<w+7; x+=3) {
      const y = h*(.56 + .025*Math.sin(x*.041) + .012*Math.sin(x*.105));
      rect(g,"#467e79",x,y,4,shore-y+1);
      pine(g,x,y+1,.22+r()*.32,["#477e79","#518882","#60938a"]);
    }
    rect(g,"#548f94",0,shore,w,h-shore);
    for (let y=shore; y<h; y+=3) {
      for (let x=-8; x<w; x+=6+r()*19) {
        rect(g,r()>.55?"#79b2ad":"#559797",x,y,2+r()*10,1);
      }
    }
    for (let y=shore+1; y<h*.83; y+=3) {
      const cx=w*.73, spread=(y-shore)*.43+4;
      rect(g,"#b9c4a3",cx+(r()-.5)*spread*2,y,3+r()*spread,1);
    }
  });
  const front = layer(w,fullHeight,g => {
    const r=random(72);
    const heights=[[0,.75],[.075,.78],[.14,.81],[.21,.86],[.28,.93],[.34,.95],[.4,.91],
      [.44,.87],[.49,.83],[.53,.8],[.58,.76],[.63,.72],[.84,.735],[.88,.69],[.94,.67],[1,.65]];
    // Exposed stone and dirt beneath the grassy ledges.
    for (let i=0; i<heights.length-1; i++){
      const x=snap(heights[i][0]*w), next=snap(heights[i+1][0]*w), y=snap(heights[i][1]*h);
      rect(g,"#626550",x,y,next-x,h-y);
      rect(g,"#87674b",x,y,next-x,Math.min(h-y,8+5*(i%3)));
      let level = y + 16;
      while(level<h){
        for(let bx=x; bx<next-2; bx+=8+snap(r()*10)){
          const len=Math.min(next-bx-1,4+snap(r()*9));
          rect(g,"#555c4e",bx,level,len,1);
          rect(g,"#6e715a",bx,level+1,len,1);
        }
        level+=5+snap(r()*6);
      }
      for(let j=0;j<(next-x)*(h-y)/35;j++){
        const px=x+snap(r()*Math.max(0,next-x-3)),py=y+3+snap(r()*(h-y));
        const soil=py<y+12;
        rect(g,soil?(r()>.5?"#ad855c":"#735b48"):(r()>.5?"#777a60":"#535a4b"),px,py,1+r()*4,1+r()*2);
      }
      rect(g,"#92af59",x,y,next-x,2);
      rect(g,"#729153",x,y+2,next-x,2);
      for(let gx=x+3;gx<next-2;gx+=4+snap(r()*5)){
        rect(g,"#6d8651",gx,y+4,2,1+r()*3);
        if(r()>.6)rect(g,"#afc579",gx,y-1,2,2);
      }
    }
    // The grass shelf bears the house and has a shallow, visible top plane.
    const sx=snap(w*.63), ex=snap(w*.88), sy=home.y;
    poly(g,"#9faf63",[sx,sy, sx+8,sy-6, ex+6,sy-6, ex,sy, ex,sy+2,sx,sy+2]);
    for(let x=sx+5;x<ex-2;x+=6) rect(g,"#bfd081",x,sy-3,2,1);
    for(const [x,y,k] of [[.04,.75,.9],[.12,.78,.62],[.155,.81,.4],[.60,.76,.54],[.92,.69,.72]]){
      pine(g,w*x,h*y,k*scale,["#2d5649","#3b7153","#5f8f60"]);
    }
    oak(g,w*.92,h*.69,.85*scale);
    cottage(g,home.x,home.y,scale);
    for(const [x,y] of [[.58,.76],[.60,.76],[.63,.72],[.86,.735],[.94,.67]]){
      rect(g,"#586f42",x*w,y*h-4,1,4);
      rect(g,"#edb978",x*w-1,y*h-4,3,2);
    }
    // Dark, close trees frame the typography and the edges of the lake.
    pine(g,-2,h*.83,1.65*scale,["#213e35","#2b5140","#3d6550"]);
    pine(g,w*.065,h*.89,1.18*scale,["#244438","#2e5943","#457052"]);
    oak(g,w+3,h*.74,.98*scale,false);
    if(h<fullHeight){
      const fading=g.createLinearGradient(0,h,0,fullHeight);
      fading.addColorStop(0,"#5d604f"); fading.addColorStop(.62,"#3d4941"); fading.addColorStop(1,"#394943");
      g.fillStyle=fading; g.fillRect(0,h,w,fullHeight-h);
      for(let i=0;i<(fullHeight-h)*w/75;i++){
        const px=r()*w,py=h+r()*(fullHeight-h);
        rect(g,r()>.4?"#566050":"#3c493f",px,py,2+r()*8,1+r()*2);
      }
    }
  });
  return (g,t) => {
    const cycle=t%24;
    const shade=clamp(Math.min((cycle-6)/5,(22-cycle)/5),0,1);
    const dusk=4*shade*(1-shade);
    g.drawImage(base,0,0);
    if(shade){
      g.globalAlpha=shade; g.drawImage(nightSky,0,0); g.globalAlpha=1;
    }
    const spacing=Math.max(66,snap(w*.24));
    for(let i=-1;i<=Math.ceil(w/spacing);i++){
      const x=i*spacing+(t*1.35)%spacing;
      const y=h*.24;
      for(const [dx,dy,n] of [[0,0,.14],[.021,-.012,.08],[.102,.013,.045]]){
        const size=Math.max(3,w*n*.48);
        box(g,x+dx*w,y+dy*h,size,Math.max(2,size*.15),Math.max(2,size*.23),"#f5ebce","#e9dfc4","#c7d6c6");
      }
      box(g,x+spacing*.5,h*.112,spacing*.095,2,3,"#eff0da","#d6e5d6","#bdd6cf");
    }
    g.drawImage(valley,0,0);
    for(let i=0;i<22;i++){
      const x=(w*(i*.373%1) + t*(i%3+1))%w, y=shore+4+(i*7)%Math.max(7,snap(h*.23));
      rect(g,i%4 ? "#90b9ad" : "#d3cba4",x,y,2+i%6,1);
    }
    g.drawImage(front,0,0);
    if(dusk){
      g.globalAlpha=dusk*.26; rect(g,"#e79562",0,0,w,fullHeight);
    }
    if(shade){
      g.globalAlpha=shade*.60; rect(g,"#101e3a",0,0,w,fullHeight); g.globalAlpha=1;
    }
    if(shade>.55){
      g.save();
      g.translate(home.x,home.y); g.scale(scale,scale);
      const lamp=clamp((shade-.55)*7,0,1);
      g.globalAlpha=lamp;
      glow(g,12,-14,17,"rgba(255,168,66,.37)");
      for(const x of [4,12]){
        rect(g,"#ffdb83",x+1,-18,6,8);
        rect(g,"#f4ab62",x+1,-14,6,4);
        rect(g,"#875638",x+3,-18,1,8);
      }
      poly(g,"#edb374",[45,-19,50,-22,50,-13,45,-10]);
      g.restore();
    }
    for(let i=0;i<4;i++){
      const p=(t*.14+i/4)%1;
      g.globalAlpha=(1-p)*.62;
      const size=(2+p*3)*scale;
      rect(g,"#e2d5bf",home.x+(31+p*9)*scale,home.y-(40+p*16)*scale,size,size);
    }
    g.globalAlpha=1;
  };
}

function glow(g, x, y, radius, color) {
  const fade = g.createRadialGradient(x,y,1,x,y,radius);
  fade.addColorStop(0,color);
  fade.addColorStop(1,"rgba(0,0,0,0)");
  g.fillStyle=fade;
  g.fillRect(x-radius,y-radius,radius*2,radius*2);
}

function cavernWalls(g,w,h,lake) {
  const r=random(lake?13:120);
  const colors=lake ? ["#264b53","#37616a","#467071","#5c8882"] : ["#394b4a","#4c5b52","#5c6859","#74806a"];
  for (let x=-6; x<w+6; x+=5) {
    const ceiling=h*(.10+.065*Math.sin(x*.018)+.03*Math.cos(x*.069)+r()*.03);
    const floor=h*(.76+.07*Math.sin(x*.021)+r()*.02);
    rect(g,colors[0],x,0,6,ceiling);
    rect(g,colors[0],x,floor,6,h-floor);
    if (r()<.31) {
      const n=2+Math.floor(r()*5);
      for(let i=0;i<n;i++) rect(g,colors[0],x+i,ceiling+i*2,(n-i)*2,3);
    }
  }
  for(let i=0;i<w/4;i++){
    const x=r()*w,y=r()*h*.09;
    rect(g,colors[1],x,y,r()*9+2,2);
    rect(g,colors[2],x,y,r()*3+1,1);
  }
  for(let i=0;i<w/9;i++){
    const x=r()*w,y=h*(.88+r()*.12);
    box(g,x,y,4+r()*9,2+r()*2,3,colors[2],colors[1],colors[0]);
  }
}

function rock(g,x,y,w,h,shade){
  const [edge,face,side]=shade;
  poly(g,face,[x,y+h*.4,x+w*.16,y+h*.4,x+w*.16,y+h*.13,x+w*.39,y+h*.13,
    x+w*.39,y,x+w*.69,y,x+w*.69,y+h*.16,x+w*.88,y+h*.16,x+w*.88,y+h*.34,
    x+w,y+h*.34,x+w,y+h,x,y+h]);
  poly(g,side,[x+w*.59,y,x+w*.69,y,x+w*.69,y+h*.16,x+w*.88,y+h*.16,x+w*.88,y+h*.34,
    x+w,y+h*.34,x+w,y+h,x+w*.69,y+h,x+w*.69,y+h*.65,x+w*.59,y+h*.65]);
  rect(g,edge,x+w*.39,y,w*.2,1);
  rect(g,edge,x+w*.16,y+h*.13,w*.23,1);
}

function crystals(g,x,y,s,teal=true) {
  const [lit,mid,dark]=teal ? ["#a3d9c3","#62a99f","#386d78"] : ["#e5b375","#b68159","#715750"];
  for(const [dx,n,wide] of [[0,9,3],[3,15,4],[8,7,3],[-3,5,2]]){
    const left=x+dx*s, top=y-n*s;
    poly(g,mid,[left,top+2*s,left+wide*s*.6,top,left+wide*s,top+2*s,left+wide*s,y,left,y]);
    rect(g,lit,left,top+2*s,s,n*s-2*s);
    rect(g,dark,left+(wide-1)*s,top+3*s,s,(n-3)*s);
  }
}

function lantern(g,x,y,s){
  rect(g,"#56483d",x-s,y-4*s,s*3,s*4);
  rect(g,"#b17b41",x-3*s,y-1*s,7*s,2*s);
  rect(g,"#594335",x-3*s,y+1*s,7*s,7*s);
  rect(g,"#ffbc59",x-2*s,y+1*s,5*s,5*s);
  rect(g,"#fff1a2",x-s,y+2*s,2*s,3*s);
  rect(g,"#ac713b",x-3*s,y+7*s,7*s,s);
}

function mine(w,fullHeight){
  const h=w<fullHeight*.9 ? snap(fullHeight*.39) : fullHeight;
  const s=clamp(Math.min(w/300,h/180),.8,1.65);
  const rail=snap(h*.72), lamps=[[.19,.28],[.58,.28],[.87,.28]];
  const back=layer(w,fullHeight,g=>{
    wash(g,w,fullHeight,[[0,"#394943"],[.36,"#263e3c"],[.68,"#344a42"],[1,"#354b4a"]]);
    // Stepped openings reveal successively deeper mineral seams.
    for(const [x,p,e] of [[.23,.34,.19],[.54,.45,.15],[.79,.32,.23],[.98,.43,.09]]){
      const cx=w*x, top=h*p, span=w*e;
      rect(g,"#253835",cx-span/2,top,span,h*.3);
      rect(g,"#21322f",cx-span*.38,top-4,span*.75,h*.32);
      rect(g,"#1d2d2b",cx-span*.24,top-8,span*.48,h*.31);
    }
    cavernWalls(g,w,h,false);
    const stone=["#667466","#475c55","#354b47"];
    for(const [x,y,ww,hh] of [[-.04,.44,.15,.26],[.02,.56,.16,.14],
      [.39,.57,.14,.16],[.64,.50,.11,.2],[.93,.47,.14,.24]]){
      rock(g,x*w,y*h,ww*w,hh*h,stone);
    }
    const r=random(219);
    for(let i=0;i<w/3;i++){
      const x=r()*w, y=h*(.38+r()*.28);
      rect(g,"#46534a",x,y,2+r()*5,1+r()*2);
      if(i%5===0) rect(g,"#92795b",x+2,y,2,1);
    }
    for(const [x,y] of [[.06,.51],[.32,.47],[.73,.42],[.94,.57]]){
      crystals(g,w*x,h*y,s*.64,false);
    }
    for(const [x,y] of lamps) {
      const px=snap(w*x),py=snap(h*y);
      glow(g,px,py+5*s,h*.23,"rgba(238,154,72,.32)");
      rect(g,"#574b3d",px-15*s,py+5*s,4*s,h*.48);
      rect(g,"#785e40",px-15*s,py+5*s,2*s,h*.48);
      rect(g,"#664e38",px+15*s,py+5*s,4*s,h*.48);
      box(g,px-18*s,py,40*s,5*s,3*s,"#9a784e","#806343","#584d3b");
      poly(g,"#756043",[px-11*s,py+5*s,px-4*s,py+5*s,px-11*s,py+13*s]);
      poly(g,"#665139",[px+15*s,py+5*s,px+9*s,py+5*s,px+15*s,py+13*s]);
      rect(g,"#515246",px,py+4*s,s,5*s);
      lantern(g,px,py+13*s,s*.65);
    }
    rect(g,"#444e43",0,rail+3*s,w,5*s);
    for(let x=0;x<w;x+=9*s){
      poly(g,"#9a7753",[x,rail+1*s,x+3*s,rail+1*s,x+8*s,rail-3*s,x+5*s,rail-3*s]);
    }
    rect(g,"#9e9875",0,rail+1*s,w,s);
    rect(g,"#625e4d",0,rail+2*s,w,2*s);
    rect(g,"#817f65",0,rail-3*s,w,s);
    for(const [x,y,n] of [[.02,.89,.83],[.48,.85,.65],[.92,.8,.8]]){
      crystals(g,x*w,y*h,s*n,true);
    }
    if(h<fullHeight){
      for(let y=h; y<fullHeight;y+=14){
        for(let x=-5;x<w;x+=13+r()*24){
          rock(g,x,y+r()*8,4+r()*15,2+r()*5,["#58675a","#48594f","#3c4c43"]);
        }
      }
    }
  });
  return (g,t)=>{
    g.drawImage(back,0,0);
    const cx=(t*4+w*.72)%(w+34*s)-15*s, cy=rail;
    for(const dx of [-7,6]){
      rect(g,"#202c2c",cx+dx*s,cy-3*s,5*s,4*s);
      rect(g,"#968a69",cx+(dx+1)*s,cy-2*s,2*s,2*s);
    }
    poly(g,"#829386",[cx-12*s,cy-12*s,cx+13*s,cy-12*s,cx+9*s,cy-3*s,cx-7*s,cy-3*s]);
    rect(g,"#b2bd9f",cx-13*s,cy-12*s,27*s,2*s);
    rect(g,"#566d66",cx-7*s,cy-6*s,17*s,2*s);
    for(const dx of [-6,0,6]) box(g,cx+dx*s,cy-13*s,5*s,2*s,2*s,"#a4865c","#89724f","#6d614a");
    for(const [x,y] of lamps){
      const phase=t*2+x*9;
      g.globalAlpha=.42+Math.sin(phase)*.16;
      rect(g,"#ffe294",w*x+Math.sin(phase*.5)*2*s,h*y+7*s-(phase%4)*s,s,s);
    }
    g.globalAlpha=1;
    motes(g,w,h,t,"#c5b78b");
  };
}

function motes(g,w,h,t,color){
  for(let i=0;i<16;i++){
    const x=w*((i*.61803+t*.0017)%1);
    const y=h*(.29+.42*((i*.173 + t*.008)%1));
    g.globalAlpha=.32+.28*Math.sin(t+i);
    rect(g,color,x,y,1+(i%5===0),1);
  }
  g.globalAlpha=1;
}

function grotto(w,fullHeight){
  const h=w<fullHeight*.9 ? snap(fullHeight*.56) : fullHeight;
  const s=clamp(Math.min(w/270,h/185),.8,1.6);
  const water=snap(h*.62), pier=snap(w*.77), fire=snap(w*.84);
  const back=layer(w,fullHeight,g=>{
    wash(g,w,fullHeight,[[0,"#213944"],[.34,"#284a58"],[.63,"#40646c"],[1,"#172d38"]]);
    cavernWalls(g,w,h,true);
    for(const [x,y,ww,hh] of [[-.03,.43,.2,.23],[.17,.54,.13,.13],[.44,.47,.19,.2],
      [.655,.39,.18,.27],[.72,.52,.2,.15],[.91,.46,.12,.25]]){
      rock(g,w*x,h*y,w*ww,h*hh,["#56777b","#375a63","#2a4b58"]);
    }
    // A subterranean cascade gathers in the still water.
    rock(g,w*.56,h*.115,w*.15,h*.1,["#647e7f","#365562","#2d4a58"]);
    rect(g,"#3c7478",w*.60,h*.21,w*.09,water-h*.21);
    rect(g,"#538987",w*.645,h*.21,w*.018,water-h*.21);
    rect(g,"#659a93",w*.606,h*.21,w*.008,water-h*.21);
    glow(g,w*.66,water,h*.26,"rgba(125,207,178,.20)");
    rect(g,"#37636c",0,water,w,fullHeight-water);
    const r=random(31);
    for(let y=water+2;y<fullHeight;y+=3){
      for(let x=-4;x<w;x+=8+r()*16)rect(g,r()<.65?"#416f73":"#315962",x,y,2+r()*10,1);
    }
    glow(g,fire,water-20*s,h*.26,"rgba(250,164,81,.48)");
    for(const f of [.74,.84,.94]){
      rect(g,"#46504a",w*f,water-3*s,3*s,14*s);
      rect(g,"#6b6954",w*f,water-3*s,s,12*s);
    }
    box(g,pier-12*s,water-5*s,w-pier+17*s,3*s,6*s,"#a68b62","#76664f","#574d43");
    for(let x=pier-10*s;x<w;x+=6*s){
      poly(g,"#806e56",[x,water-5*s,x+s,water-5*s,x+7*s,water-9*s,x+6*s,water-9*s]);
    }
    box(g,fire+8*s,water-40*s,3*s,34*s,2*s,"#aa8c64","#806c52","#5c5648");
    box(g,fire-3*s,water-40*s,14*s,3*s,2*s,"#be9b6b","#907251","#695b47");
    rect(g,"#697568",fire,water-38*s,s,8*s);
    lantern(g,fire,water-31*s,s);
    for(const [x,y,k] of [[.02,.72,.81],[.23,.84,.58],[.52,.62,.68],[.97,.59,1.2]]){
      crystals(g,w*x,h*y,k*s,true);
    }
  });
  return (g,t)=>{
    g.drawImage(back,0,0);
    const length=water-h*.2;
    for(let i=0;i<9;i++){
      const x=w*(.603+(i%4)*.018);
      rect(g,"#80b1a3",x,h*.2+(t*(8+i%3)+i*13)%length,1,2+i%3);
    }
    for(let i=0;i<14;i++){
      const y=water+4+i*(h-water)/18;
      const wobble=Math.sin(i*.9+t*1.6);
      const width=(2+i*.42)*(1+.25*Math.sin(t+i));
      g.globalAlpha=.88-i*.047;
      rect(g,"#e8ab73",fire+wobble*(2+i*.17)-width/2,y,width,1);
      rect(g,"#9ab7a6",w*.63+wobble*5,y,3+i*.45,1);
    }
    g.globalAlpha=1;
    motes(g,w,h,t,"#b5d5af");
  };
}

export function mountWorld(canvas) {
  const g=canvas.getContext("2d",{alpha:false});
  if(!g) return null;
  let scenes=[], depth=0, elapsed=0, tick=null, previous=0;
  let paused=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function draw(){
    if(!scenes.length) return;
    const h=canvas.height;
    const top=Math.floor(depth), slide=snap((depth-top)*h);
    g.save();
    g.translate(0,-slide);
    scenes[top](g,elapsed);
    if(slide && top+1<scenes.length) {
      g.translate(0,h);
      scenes[top+1](g,elapsed);
    }
    g.restore();
  }
  function animate(now){
    tick=null;
    if(paused || document.hidden) { previous=0; return; }
    if(!previous) previous=now;
    const delta=now-previous;
    if(delta>=1000/24) {
      elapsed+=Math.min(delta,100)/1000;
      previous=now;
      draw();
    }
    tick=requestAnimationFrame(animate);
  }
  function playback(){
    if(tick!==null) cancelAnimationFrame(tick);
    previous=0;
    tick=!paused && !document.hidden ? requestAnimationFrame(animate) : null;
  }
  function resize(){
    const {width,height}=canvas.getBoundingClientRect();
    if(!width||!height) return;
    const pixel=Math.max(2,width/640,height/360);
    const w=Math.max(1,snap(width/pixel)),h=Math.max(1,snap(height/pixel));
    if(scenes.length && w===canvas.width && h===canvas.height) return;
    canvas.width=w;
    canvas.height=h;
    g.imageSmoothingEnabled=false;
    scenes=[surface(w,h),mine(w,h),grotto(w,h)];
    draw();
  }
  resize();
  new ResizeObserver(resize).observe(canvas);
  document.addEventListener("visibilitychange",playback);
  playback();
  return {
    setDepth(value){
      const next=clamp(value,0,2);
      if(Math.abs(depth-next)<.0001) return;
      depth=next;
      draw();
    },
    setPaused(value){
      if(paused===value) return;
      paused=value;
      playback();
    }
  };
}
