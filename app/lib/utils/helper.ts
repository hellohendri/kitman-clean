const generateRandomDeno = () => {
  const denoList = [
    '4a1267.svg',
    '13be44.svg',
    '41f332.svg',
    '69c754.svg',
    '200f1d.svg',
    'a8d827.svg',
    '3872b2.svg',
    'a133e7.svg',
    'fb3c4a.svg',
    'fb7849.svg',
  ];

  const randomIndex = Math.floor(Math.random() * denoList.length);
  return `https://deno-avatar.deno.dev/avatar/${denoList[randomIndex]}`;
};

export { generateRandomDeno };
