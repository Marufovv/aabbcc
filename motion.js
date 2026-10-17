// Optional motion libraries. All essential content and controls work without them.
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(pointer:fine)').matches;
if(!reduced){
 if(fine){
  const cursor=document.querySelector('.cursor');
  addEventListener('pointermove',e=>{cursor.style.opacity='1';cursor.style.transform=`translate(${e.clientX-8}px,${e.clientY-8}px)`;},{passive:true});
  document.querySelectorAll('button,a').forEach(el=>{el.addEventListener('pointerenter',()=>cursor.classList.add('active'));el.addEventListener('pointerleave',()=>cursor.classList.remove('active'));});
  document.querySelectorAll('[data-tilt]').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--rx',`${-(e.clientY-r.top-r.height/2)/r.height*7}deg`);el.style.setProperty('--ry',`${(e.clientX-r.left-r.width/2)/r.width*9}deg`);},{passive:true});el.addEventListener('pointerleave',()=>{el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg');});});
 }
 import('https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js').then(THREE=>{
  const canvas=document.querySelector('#world');let renderer;
  try{renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:false,powerPreference:'low-power'});}catch{return;}
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(45,innerWidth/innerHeight,.1,40);camera.position.z=9;
  renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<760?1.25:2));renderer.setSize(innerWidth,innerHeight);
  const count=innerWidth<760?42:100,geo=new THREE.BufferGeometry(),pts=new Float32Array(count*3);
  for(let i=0;i<count;i++){pts[i*3]=(Math.random()-.5)*16;pts[i*3+1]=(Math.random()-.5)*15;pts[i*3+2]=(Math.random()-.5)*7;}
  geo.setAttribute('position',new THREE.BufferAttribute(pts,3));const material=new THREE.PointsMaterial({color:0xc9a45c,size:.035,transparent:true,opacity:.65});const dust=new THREE.Points(geo,material);scene.add(dust);
  const ringMaterial=new THREE.MeshStandardMaterial({color:0xc9a45c,metalness:.8,roughness:.3,transparent:true,opacity:.28});
  const group=new THREE.Group();for(let i=0;i<2;i++){const ring=new THREE.Mesh(new THREE.TorusGeometry(.9,.035,12,64),ringMaterial);ring.position.x=i? .45:-.45;ring.rotation.y=i?-.65:.65;group.add(ring);}group.position.set(3,0,-1);scene.add(group);scene.add(new THREE.AmbientLight(0xffffff,2));const light=new THREE.DirectionalLight(0xffead1,4);light.position.set(2,3,5);scene.add(light);
  let frame,last=0,slow=0,adapted=false;let on=true;
  function animate(t){if(!on)return;const dt=t-last;last=t;if(dt>38)slow++;else slow=Math.max(0,slow-1);if(slow>45&&!adapted){adapted=true;renderer.setPixelRatio(1);geo.setDrawRange(0,24);}const progress=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight);dust.rotation.y=t*.000025;dust.position.y=progress*1.2;group.rotation.z=t*.00008;group.rotation.y=progress*2;camera.position.x=Math.sin(progress*Math.PI)*.5;renderer.render(scene,camera);frame=requestAnimationFrame(animate);}
  frame=requestAnimationFrame(animate);document.addEventListener('visibilitychange',()=>{on=!document.hidden;if(on){last=performance.now();frame=requestAnimationFrame(animate);}else cancelAnimationFrame(frame);});
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();on=false;cancelAnimationFrame(frame);canvas.style.display='none';});
  addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);},{passive:true});
 }).catch(()=>{});
}
