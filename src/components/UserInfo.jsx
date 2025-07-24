import React, { useState } from 'react';
import '../styles/UserInfo.scss';

const UserInfo = ({ onNext }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    genre: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form className='user-info-form' onSubmit={handleSubmit}>
      <h2>Informations personnelles</h2>

      <input
        type="text"
        name="nom"
        placeholder="Nom"
        value={formData.nom}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="prenom"
        placeholder="Prénom"
        value={formData.prenom}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="telephone"
        placeholder="Téléphone (optionnel)"
        value={formData.telephone}
        onChange={handleChange}
      />

      <select
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        required
      >
        <option value="">Genre</option>
        <option value="Femme">Femme</option>
        <option value="Homme">Homme</option>
        <option value="Autre">Autre / Préfère ne pas dire</option>
      </select>

      <div className="disclaimer">
        <p>⚠️ <strong>Veuillez noter :</strong></p>
        <ul>
          <li>❌ Le domaine de la santé, la mort ou la disparition d’une personne ne seront pas traités.</li>
          <li>❌ Aucun tirage ne sera réalisé à la place d’un tiers.</li>
          <li>❌ Aucun tirage ne sera effectué concernant un mineur, une personne sous tutelle ou curatelle.</li>
          <li>✅ Je procède à l’interprétation de votre tirage et vous envoie le résultat par email.</li>
          <li>📧 Il est essentiel de fournir un email valide pour recevoir votre tirage. Pensez à vérifier votre dossier spam ou indésirable.</li>
        </ul>
      </div>

      <button className='btn next' type="submit">Suivant</button>
    </form>
  );
};

export default UserInfo;