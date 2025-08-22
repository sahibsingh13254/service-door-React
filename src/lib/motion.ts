export const parallax = (i: number, y: number) => {
const amt = (i % 2 ? 1 : -1) * Math.min(10, y * 0.02);
return `translate3d(0, ${amt}px, 0)`;
};
