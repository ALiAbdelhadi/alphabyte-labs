export const fadeIn = (delay = 0, duration = 0.5) => ({
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      delay,
      duration,
      ease: "easeOut",
    },
  },
})
