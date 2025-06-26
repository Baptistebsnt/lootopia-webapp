import { TLayoutPage } from '@/Layout';
import Layout from '@/Layout/Layout';
import '@/styles/animations.css';

export type THome = TLayoutPage;

const Home = () => <Layout>
    <div className="relative w-full h-full">
        <div className="absolute inset-0 z-0 pointer-events-none">
            <img src="/treasureC.png" className="fade-in-out w-12 h-12 absolute top-6 left-8 opacity-60 animate-pulse" />
            <img src="/treasureO.png" className="fade-in-out w-12 h-12 absolute top-10 right-10 opacity-60  delay-200" />
            <img src="/hook.png" className="fade-in-out w-10 h-10 absolute top-12 right-1/3"  />
            <img src="/compass.png" className="fade-in-out w-10 h-10 absolute top-20 left-1/4 opacity-40"  />
            <img src="/treasureC.png" className="fade-in-out w-12 h-12 absolute bottom-6 left-8 opacity-60 animate-pulse" />
            <img src="/treasureO.png" className="fade-in-out w-12 h-12 absolute bottom-10 right-10 opacity-60  delay-200" />
            <img src="/hook.png" className="fade-in-out w-10 h-10 absolute bottom-12 right-1/3"  />
            <img src="/compass.png" className="fade-in-out w-10 h-10 absolute bottom-20 left-1/4 opacity-40"  />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-[80vh] text-center gap-6">
          <h1 className="text-4xl font-extrabold text-black">Bienvenue sur Lootopia !</h1>
          <p className="text-lg text-black">Vous êtes prêts à trouver ce trésor 💰 ? </p>
          <img src="/map.png" alt="Carte au trésor" className="w-24 h-24 animate-bounce mt-6" />
        </div>

    </div>
</Layout>;

export default Home;
