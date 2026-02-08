import React from 'react';
import '../styles/Conditions.scss';

const Conditions = () => {
  return (
    <div className="conditions-page">
      <div className="conditions-container">
        <h1>Conditions Générales de Vente</h1>
        
        <div className="cgv-section">
          <h2>📜 Propriété intellectuelle et contenu</h2>
          <p>⚖️ Toute utilisation non autorisée du contenu du site internet ou de ses droits de propriété intellectuelle est passible de poursuites judiciaires.</p>
        </div>

        <div className="cgv-section">
          <h2>⚠️ Nature des prestations</h2>
          <p>🩺 Les interprétations des tirages ne peuvent en aucun cas se substituer à l'avis éclairé d'un professionnel qualifié correspondant au domaine de questionnement du client.</p>
          <p>ℹ️ Les interprétations de tirage de runes sont fournies à titre informatif et ne constituent pas des vérités absolues. Chaque consultant doit assumer la responsabilité de son parcours de vie et faire preuve d'esprit critique.</p>
          <p>⚠️ Ce type de demande pouvant entraîner une forme de dépendance, je décline toute responsabilité en cas d'utilisation excessive.</p>
        </div>

        <div className="cgv-section">
          <h2>🔮 Responsabilités et limites</h2>
          <p>🔄 Je ne suis pas responsable si mes interprétations diffèrent des prédictions issues d'autres pratiques ou arts divinatoires consultés en parallèle.</p>
          <p>🚫 Je ne pourrai en aucun cas être tenue responsable des choix et des décisions de mes clients, ni des problèmes, directs ou indirects, qui pourraient découler de leurs prises de décision suite à un tirage.</p>
          <p>🎯 Je m'engage à fournir un effort de moyens plutôt qu'un résultat garanti. L'avenir dépend avant tout de vos actions, et je ne peux donc pas être tenue responsable si les résultats escomptés ne se concrétisent pas, ou s'ils se produisent malgré vos efforts pour les éviter. De plus, je ne saurais être responsable des décisions que vous prendrez ou ne prendrez pas en fonction de mes prédictions ou conseils.</p>
          <p>📧 Je ne pourrai pas être tenue responsable en cas de non-réception d'un e-mail du résultat du tirage, dû à une coupure internet ou tout autre évènement hors de mon contrôle.</p>
        </div>

        <div className="cgv-section">
          <h2>📝 Engagements du client</h2>
          <p>🤝 Le client s'engage à formuler ses questions de manière claire et honnête, afin que je puisse lui fournir des réponses précises lors de mon interprétation.</p>
        </div>

        <div className="cgv-section">
          <h2>✅ Nos engagements</h2>
          <p>⏱️ Je m'engage à faire tout mon possible pour vous répondre dans les meilleurs délais, dans la limite du raisonnable et de mes disponibilités.</p>
        </div>

        <div className="cgv-section">
          <h2>💳 Conditions commerciales</h2>
          <p>📅 Par ce contrat de fourniture de service, vous acceptez que le résultat de votre tirage vous soit transmis avant la fin du droit légal de rétractation de 14 jours, ce qui annule votre droit de rétractation.</p>
          <p><strong>❌ Aucun remboursement ne sera possible si vous n'êtes pas satisfait de mon travail.</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Conditions;
