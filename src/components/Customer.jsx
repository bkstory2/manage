import React from 'react';

const Customer = ({ id, name, image, birthday, gender, job }) => (
  <div>
    <CustomerProfile id={id} name={name} image={image} />
    <CustomerInfo birthday={birthday} gender={gender} job={job} />
  </div>
);

const CustomerProfile = ({ id, name, image }) => (
  <div>
    <h2>{id} - {name}</h2>
    <img src={image} alt="profile" />
  </div>
);

const CustomerInfo = ({ birthday, gender, job }) => (
  <div>
    <p>{birthday}</p>
    <p>{gender}</p>
    <p>{job}</p>
  </div>
);

export default Customer;
