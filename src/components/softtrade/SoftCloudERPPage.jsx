import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon, IconChip } from '../design/Icon';

export default function SoftCloudERPPage() {
  return (
    <div className="design-page">
      <section style={{padding:'152px 32px 100px', textAlign:'center', background:'linear-gradient(180deg,#F1EADB 0%,#FBF8F1 100%)'}}>
        <div className="container">
          <span className="eyebrow"><span className="dot"></span>Products · SoftCloud-ERP</span>
          <h1 className="serif" style={{fontSize:'clamp(48px,6vw,84px)', marginTop:24, fontWeight:600}}>
            SoftCloud-ERP
          </h1>
          <p style={{fontSize:18, color:'var(--ink-soft)', marginTop:16}}>Page under construction — sections coming in next prompt.</p>
        </div>
      </section>
    </div>
  );
}
