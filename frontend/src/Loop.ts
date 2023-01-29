export const randomColor = (): string[] => {
  let a = setInterval(() => {
    Math.floor(Math.random() * 400);
  }, 1000);
  let b = Math.floor(Math.random() * 400);
  let c = Math.floor(Math.random() * 400);

  let str = `rgba(${a},${b},${c},0.05)`;
  let stralpha = `rgba(${a},${b},${c},0.1)`;
  return [str, stralpha];
};
