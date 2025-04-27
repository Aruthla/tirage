import React, { useState } from 'react';
import '../styles/UserInfo.scss';

const UserInfo = ({ nextStep, data, onChange }) => {
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    onChange({ [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!data.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!data.prenom.trim()) newErrors.prenom = 'Le prénom est requis';
    if (!data.email.trim()) {
      newErrors.email = 'L’email est requis';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Email invalide';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      nextStep();
    }
  };

  return (
    <form className="user-info-form" onSubmit={handleSubmit}>
      <h2>🧾 Informations personnelles</h2>

      <div className="form-group">
        <label htmlFor="nom">Nom *</label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={data.nom}
          onChange={handleInputChange}
        />
        {errors.nom && <span className="error">{errors.nom}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="prenom">Prénom *</label>
        <input
          type="text"
          id="prenom"
          name="prenom"
          value={data.prenom}
          onChange={handleInputChange}
        />
        {errors.prenom && <span className="error">{errors.prenom}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Adresse e-mail *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={data.email}
          onChange={handleInputChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="telephone">Téléphone (optionnel)</label>
        <input
          type="tel"
          id="telephone"
          name="telephone"
          value={data.telephone}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit" className="btn next">Suivant</button>
    </form>
  );
};

export default UserInfo;
