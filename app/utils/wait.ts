export const wait = async (t: number) => {
  await await new Promise((resolve) => setTimeout(resolve, t))
}
