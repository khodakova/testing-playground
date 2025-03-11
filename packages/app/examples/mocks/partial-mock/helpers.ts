export function getFullName (name: string) {
  return localStorage.getItem(name);
}

function capitalizeWord (word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function capitalizeFullName (fullName: string) {
  const [
    lastName = '',
    firstName = '',
    middleName = ''
  ] = fullName.split(' ');

  return `${capitalizeWord(lastName)} ${capitalizeWord(firstName)} ${capitalizeWord(middleName)}`.trim();
}
