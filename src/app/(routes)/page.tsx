'use server';

import React from 'react';

/**
 * Dungeon Builder Home Page.
 * @returns A promise that resolves to the rendered component.
 */
const HomePage = async () => {
  return (
    <>
      <h1>Welcome to Dungeon Builder</h1>
      <section>
        <h2>STATUS: Initial Development</h2>
        <p>
          This application is currently under initial development. Please check back later for updates.
        </p>
      </section>
    </>
  );
};

export default HomePage;
