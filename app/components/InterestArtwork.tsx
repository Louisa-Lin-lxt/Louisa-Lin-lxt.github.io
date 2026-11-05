// Small, consistent pixel illustrations for the three personal collections.
export function InterestArtwork({index}:{index:number}) {
  return <svg className="interest-artwork" viewBox="0 0 112 88" aria-hidden="true" shapeRendering="crispEdges">
    {index===0?<>
      <path fill="#d9e8f0" d="M12 12h88v60H12z"/><path fill="#b7cfdf" d="M12 72h88v4H12z"/>
      <path fill="#263e54" d="M36 20h24v4h8v8h4v24h-4v8h-8v4H36v-4h-8v-8h-4V32h4v-8h8z"/>
      <path fill="#49667e" d="M36 28h24v4H36zm-4 8h4v16h-4zm8 24h16v4H40z"/>
      <path fill="#e6c76a" d="M44 36h12v4h4v12h-4v4H44v-4h-4V40h4z"/><path fill="#fafcfd" d="M48 44h4v4h-4z"/>
      <path fill="#7196b0" d="M84 20h8v8h-4v24h-4v4h-8v-4h4V24h4z"/><path fill="#d0ac42" d="M84 64h8v4h-8z"/>
    </>:index===1?<>
      {/* Taotao: ivory curls, drop ears, dark eyes and a patterned blue harness. */}
      <path fill="#d7cdbd" d="M40 52h32v4h4v20h-4v8H40v-8h-4V56h4z"/>
      <path fill="#eee7d9" d="M44 52h24v8h4v16H40V60h4z"/>
      <path fill="#c9bea9" d="M32 20h48v8h8v8h4v16h-4v8H72v4H40v-4H24v-8h-4V36h4v-8h8z"/>
      <path fill="#eae3d3" d="M28 28h12v24h-4v4H24V40h4zm44 0h12v12h4v16H76v-4h-4z"/>
      <path fill="#f8f4e9" d="M40 8h32v4h8v8h4v12h-4v16h-8v12H40V48h-8V32h-4V20h4v-8h8z"/>
      <path fill="#fffdf5" d="M40 16h8v4h-8zm16-4h8v4h-8zm12 8h8v4h-8zm-32 8h8v4h-8z"/>
      <path fill="#c8b59a" d="M44 40h24v4h4v12h-8v4H48v-4h-8V44h4z"/>
      <path fill="#e4d6bf" d="M44 44h8v8h-8zm16 0h8v8h-8z"/>
      <path fill="#302d2b" d="M40 32h8v8h-8zm24 0h8v8h-8zM52 44h12v8h-4v4h-4v-4h-4zM52 56h8v4h-8z"/>
      <path fill="#fffdf5" d="M40 32h4v4h-4zm24 0h4v4h-4z"/>
      <path fill="#4e6385" d="M36 60h8v4h8v4h12v-4h8v-4h4v8h-8v4h-8v12h-8V72h-8v-4h-8z"/>
      <path fill="#aab7c9" d="M40 60h4v4h-4zm8 8h4v4h-4zm20-4h4v4h-4zm-12 12h4v4h-4z"/>
      <path fill="#f5eee0" d="M36 72h12v12H36zm28 0h12v12H64z"/>
    </>:<>
      <path fill="#486d8a" d="M44 12h24v4h4v12h-8V20H48v8h-8V16h4z"/>
      <path fill="#7fa6c2" d="M20 28h72v4h4v40h-4v4H20v-4h-4V32h4z"/>
      <path fill="#527d9d" d="M16 60h80v12h-4v4H20v-4h-4z"/>
      <path fill="#e6cb83" d="M32 28h8v48h-8zm40 0h8v48h-8z"/>
      <path fill="#f9fcfd" d="M48 40h16v16H48z"/><path fill="#9ec2d7" d="M52 44h8v8h-8z"/>
      <path fill="#263e54" d="M24 76h8v4h-8zm56 0h8v4h-8z"/>
    </>}
  </svg>;
}
