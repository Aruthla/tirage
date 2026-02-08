import React from 'react';
import '../styles/PolitiqueConfidentialite.scss';

const PolitiqueConfidentialite = () => {
  return (
    <div className="politique-confidentialite">
      <div className="politique-container">
        <h1>Politique de Confidentialité & RGPD</h1>
        <p className="date-maj">Dernière mise à jour : 5 novembre 2025</p>

        <section>
          <h2>1. Responsable du traitement des données</h2>
          <p>
            <strong>Le Murmure des Runes</strong><br />
            Responsable : Isabelle<br />
            Email : <a href="mailto:lemurmuredesrunes@outlook.fr">lemurmuredesrunes@outlook.fr</a>
          </p>
        </section>

        <section>
          <h2>2. Données collectées</h2>
          <p>Dans le cadre de nos services de tirage de runes, nous collectons les données personnelles suivantes :</p>
          
          <h3>2.1 Données obligatoires</h3>
          <ul>
            <li><strong>Prénom</strong> : pour personnaliser votre tirage</li>
            <li><strong>Adresse e-mail</strong> : pour vous envoyer le résultat de votre tirage et communiquer avec vous</li>
            <li><strong>Questions posées</strong> : pour réaliser votre tirage personnalisé</li>
            <li><strong>Type de tirage choisi</strong> : pour traiter votre demande</li>
          </ul>

          <h3>2.2 Données de paiement</h3>
          <ul>
            <li>Les paiements sont traités de manière sécurisée par <strong>Stripe</strong></li>
            <li>Nous ne conservons aucune donnée bancaire</li>
            <li>Seul Stripe stocke vos informations de paiement de manière sécurisée</li>
          </ul>

          <h3>2.3 Données facultatives</h3>
          <ul>
            <li><strong>Consentement marketing</strong> : pour recevoir nos actualités (optionnel)</li>
          </ul>
        </section>

        <section>
          <h2>3. Finalités du traitement</h2>
          <p>Vos données personnelles sont collectées pour :</p>
          <ul>
            <li>Réaliser votre tirage de runes personnalisé</li>
            <li>Vous envoyer par e-mail le résultat de votre tirage</li>
            <li>Traiter votre paiement via Stripe</li>
            <li>Vous envoyer des codes promotionnels suite à votre premier achat</li>
            <li>Vous contacter en cas de question sur votre commande</li>
            <li>Avec votre consentement : vous envoyer nos actualités et offres (possibilité de se désabonner à tout moment)</li>
          </ul>
        </section>

        <section>
          <h2>4. Base légale du traitement</h2>
          <p>Le traitement de vos données repose sur :</p>
          <ul>
            <li><strong>L'exécution du contrat</strong> : réalisation du tirage que vous avez commandé</li>
            <li><strong>Le consentement</strong> : pour l'envoi de communications marketing (révocable à tout moment)</li>
            <li><strong>L'intérêt légitime</strong> : amélioration de nos services et programme de fidélité</li>
          </ul>
        </section>

        <section>
          <h2>5. Durée de conservation</h2>
          <ul>
            <li><strong>Données de commande</strong> : conservées pendant 3 ans à compter de votre dernier achat</li>
            <li><strong>Historique des achats</strong> : conservé pour le programme de fidélité et codes promo</li>
            <li><strong>Données de paiement</strong> : traitées par Stripe selon leur propre politique de confidentialité</li>
            <li><strong>Consentement marketing</strong> : jusqu'à retrait de votre consentement</li>
          </ul>
        </section>

        <section>
          <h2>6. Destinataires des données</h2>
          <p>Vos données personnelles peuvent être transmises à :</p>
          <ul>
            <li><strong>Stripe</strong> : pour le traitement sécurisé des paiements</li>
            <li><strong>EmailJS</strong> : pour l'envoi des résultats de tirage par e-mail</li>
            <li><strong>Render.com</strong> : hébergement de notre backend (serveurs situés en Europe - Frankfurt)</li>
            <li>Aucune donnée n'est vendue ou transmise à des tiers à des fins commerciales</li>
          </ul>
        </section>

        <section>
          <h2>7. Vos droits RGPD</h2>
          <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</p>
          
          <h3>7.1 Droit d'accès</h3>
          <p>Vous pouvez demander une copie de toutes les données personnelles que nous détenons sur vous.</p>

          <h3>7.2 Droit de rectification</h3>
          <p>Vous pouvez demander la correction de données inexactes ou incomplètes.</p>

          <h3>7.3 Droit à l'effacement ("droit à l'oubli")</h3>
          <p>Vous pouvez demander la suppression de vos données personnelles, sauf si nous avons une obligation légale de les conserver.</p>

          <h3>7.4 Droit à la limitation du traitement</h3>
          <p>Vous pouvez demander la limitation du traitement de vos données dans certaines circonstances.</p>

          <h3>7.5 Droit à la portabilité</h3>
          <p>Vous pouvez recevoir vos données dans un format structuré et lisible par machine, ou demander leur transfert direct à un autre responsable de traitement.</p>

          <h3>7.6 Droit d'opposition</h3>
          <p>Vous pouvez vous opposer au traitement de vos données à des fins de marketing direct à tout moment.</p>

          <h3>7.7 Droit de retirer votre consentement</h3>
          <p>Vous pouvez retirer votre consentement à tout moment pour les communications marketing.</p>

          <h3>7.8 Exercer vos droits</h3>
          <p>
            Pour exercer l'un de ces droits, contactez-nous à :<br />
            <strong>Email :</strong> <a href="mailto:lemurmuredesrunes@outlook.fr">lemurmuredesrunes@outlook.fr</a><br />
            Nous vous répondrons dans un délai maximum de 1 mois.
          </p>
        </section>

        <section>
          <h2>8. Sécurité des données</h2>
          <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :</p>
          <ul>
            <li>Connexions sécurisées HTTPS/SSL</li>
            <li>Paiements sécurisés via Stripe (certifié PCI DSS)</li>
            <li>Hébergement sécurisé en Europe (Render.com - Frankfurt)</li>
            <li>Accès aux données limité et contrôlé</li>
            <li>Mises à jour de sécurité régulières</li>
          </ul>
        </section>

        <section>
          <h2>9. Cookies et technologies similaires</h2>
          <p>Notre site web n'utilise pas de cookies de notre part.</p>
          <ul>
            <li><strong>Aucun cookie</strong> n'est déposé ou stocké par notre site</li>
            <li><strong>Aucun suivi</strong> publicitaire ou analytique</li>
            <li><strong>Stripe</strong> : Lors du paiement, vous êtes redirigé vers la plateforme sécurisée de Stripe qui peut utiliser ses propres cookies conformément à leur politique de confidentialité</li>
            <li>Notre site fonctionne entièrement sans cookies et respecte votre vie privée</li>
          </ul>
        </section>

        <section>
          <h2>10. Transferts internationaux</h2>
          <p>
            Vos données sont principalement stockées et traitées au sein de l'Union Européenne.<br />
            Certains prestataires (Stripe, EmailJS) peuvent traiter vos données en dehors de l'UE, avec des garanties appropriées conformes au RGPD.
          </p>
        </section>

        <section>
          <h2>11. Droit de réclamation</h2>
          <p>
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL :<br />
            <strong>Commission Nationale de l'Informatique et des Libertés (CNIL)</strong><br />
            3 Place de Fontenoy - TSA 80715<br />
            75334 PARIS CEDEX 07<br />
            Téléphone : 01 53 73 22 22<br />
            Site web : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>
          </p>
        </section>

        <section>
          <h2>12. Modifications de la politique</h2>
          <p>
            Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.<br />
            La date de dernière mise à jour est indiquée en haut de cette page.<br />
            Toute modification substantielle vous sera notifiée par e-mail.
          </p>
        </section>

        <section>
          <h2>13. Contact</h2>
          <p>
            Pour toute question concernant cette politique de confidentialité ou vos données personnelles :<br />
            <strong>Email :</strong> <a href="mailto:lemurmuredesrunes@outlook.fr">lemurmuredesrunes@outlook.fr</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PolitiqueConfidentialite;
