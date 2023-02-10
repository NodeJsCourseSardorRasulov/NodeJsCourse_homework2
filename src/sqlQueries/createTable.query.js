export const createUserTableQuery = `
  CREATE TABLE Users (
    id VARCHAR(255) NOT NULL,
    login VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    password VARCHAR(255) NOT NULL,
    isDeleted BOOLEAN DEFAULT false
  )
`;
