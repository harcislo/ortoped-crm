export default (date: string) => {
    const arrDate = date.split('.')
    const year = arrDate[2]
    const month = arrDate[1]
    const day = arrDate[0]
    return `${year}.${month}.${day}`
}