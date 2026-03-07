import ScrollVelocity from './ScrollVelocity';

function MyPage() {
  return (
    <main>
      <div className="mb-20 overflow-hidden opacity-30 select-none pointer-events-none">
                      <ScrollVelocity
                          texts={['Next-Gen Automation', 'Zero Code Logic', 'Rapid Deployment']} 
                          velocity={60}
                          className="font-orbitron text-gray-900 uppercase font-black italic text-6xl md:text-9xl tracking-tighter"
                      />
                  </div>
    </main>
  );
}

export default MyPage;