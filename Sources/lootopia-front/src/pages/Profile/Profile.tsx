import { TLayoutPage } from '@/Layout';
import Layout from '@/Layout/Layout';

export type TProfile = TLayoutPage;

const Profile = () => {
  // Données simulées
  const user = {
    name: 'Malik Explorateur',
    email: 'malik@example.com',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Malik',
    badges: ['Découvreur', 'Survivant', 'Maître du temps'],
    stats: {
      inscrits: 12,
      abandonnes: 3,
      termines: 9,
    },
  };

  return (
    <Layout>
      <div>
        {/* Infos utilisateur */}
        <section>
          <h2>Profil</h2>
          <img src={user.avatarUrl} alt="Avatar" />
          <p>Nom : {user.name}</p>
          <p>Email : {user.email}</p>
        </section>

        {/* Badges */}
        <section>
          <h2>Badges</h2>
          {user.badges.length > 0 ? (
            <ul>
              {user.badges.map((badge, index) => (
                <li key={index}>{badge}</li>
              ))}
            </ul>
          ) : (
            <p>Aucun badge débloqué.</p>
          )}
        </section>

        {/* Statistiques */}
        <section>
          <h2>Statistiques</h2>
          <ul>
            <li>Trésors inscrits : {user.stats.inscrits}</li>
            <li>Trésors abandonnés : {user.stats.abandonnes}</li>
            <li>Trésors terminés : {user.stats.termines}</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default Profile;
