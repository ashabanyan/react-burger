export const convertDataToOrder = (data) => {

  const order = [
    data.find(item => item.type === 'bun'),
    ...data.filter(item => item.type !== 'bun')
  ]

  return order;
  // const bun = data.find(item => item.type === 'bun')

  // const main = data.filter(item => item.type !== 'bun');

  // return {
  //   "top_bun": bun,
  //   "bottom_bun": bun, 
  //   "other": main,
  // }
}