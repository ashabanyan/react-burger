export const convertDataToOrder = (data) => {

  const order = [
    data.find(item => item.type === 'bun'),
    ...data.filter(item => item.type !== 'bun')
  ]
  return order;
}