export const emailValidation = (data) => {
  const regex = /\w+@\w+\.\w+/;
  return regex.test(data)
}
export const passwordValidation = (data) => {
  const regex = /\w{6}/;
  return regex.test(data)
}